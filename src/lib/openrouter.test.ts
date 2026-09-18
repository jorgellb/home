import { describe, it, expect, vi, afterEach } from 'vitest';
import { chatText } from './openrouter';

/* La cadena de modelos es lo único que sostiene las demos sobre el tramo
   gratuito de OpenRouter, que responde 429 cuando hay cola. Estos tests fijan
   el comportamiento que evita que una cola pasajera se le muestre al visitante
   como un error. */

const MODELOS = ['modelo-a', 'modelo-b'];
const opciones = { apiKey: 'k', title: 't', messages: [{ role: 'user' as const, content: 'hola' }] };

const respuesta = (texto: string) =>
  new Response(JSON.stringify({ choices: [{ message: { content: texto } }] }), { status: 200 });
const fallo = (status: number) => new Response('cola llena', { status });

afterEach(() => { vi.restoreAllMocks(); });

describe('chatText', () => {
  it('se queda con el primer modelo que responde y no gasta los demás', async () => {
    const fetchSimulado = vi.fn().mockResolvedValueOnce(respuesta('todo bien'));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r).toEqual({ ok: true, text: 'todo bien' });
    expect(fetchSimulado).toHaveBeenCalledTimes(1);
  });

  it('pasa al siguiente modelo cuando el primero está saturado', async () => {
    const fetchSimulado = vi.fn()
      .mockResolvedValueOnce(fallo(429))
      .mockResolvedValueOnce(respuesta('el segundo sí'));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r).toEqual({ ok: true, text: 'el segundo sí' });
    expect(fetchSimulado).toHaveBeenCalledTimes(2);
  });

  it('reintenta la cadena entera una vez si toda ella se satura, y lo salva', async () => {
    const fetchSimulado = vi.fn()
      .mockResolvedValueOnce(fallo(429))
      .mockResolvedValueOnce(fallo(429))
      .mockResolvedValueOnce(respuesta('a la segunda vuelta'));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r).toEqual({ ok: true, text: 'a la segunda vuelta' });
    expect(fetchSimulado).toHaveBeenCalledTimes(3);
  });

  it('no reintenta cuando el fallo no es pasajero: esperar no arregla un 400', async () => {
    const fetchSimulado = vi.fn().mockResolvedValue(fallo(400));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r.ok).toBe(false);
    /* Una sola pasada: dos modelos, no cuatro. */
    expect(fetchSimulado).toHaveBeenCalledTimes(2);
  });

  it('descarta un modelo colgado en vez de esperarlo para siempre', async () => {
    const fetchSimulado = vi.fn()
      .mockRejectedValueOnce(Object.assign(new Error('timeout'), { name: 'TimeoutError' }))
      .mockResolvedValueOnce(respuesta('el vivo contesta'));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r).toEqual({ ok: true, text: 'el vivo contesta' });
  });
});
