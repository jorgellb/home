import { describe, it, expect, vi, afterEach } from 'vitest';
import { chatText } from './openrouter';

/* El tramo gratuito de OpenRouter se limita POR CUENTA Y POR DÍA: 50 peticiones,
   20 por minuto. Cada modelo que se prueba gasta una del mismo bote, así que la
   regla que estos tests protegen es "no malgastar cupo": ante el tope diario hay
   que parar en seco, no seguir probando modelos ni reintentar. */

const MODELOS = ['modelo-a', 'modelo-b'];
const opciones = { apiKey: 'k', title: 't', messages: [{ role: 'user' as const, content: 'hola' }] };

const respuesta = (texto: string) =>
  new Response(JSON.stringify({ choices: [{ message: { content: texto } }] }), { status: 200 });
const fallo = (status: number) => new Response('vaya', { status });
const topeDiario = () => new Response('rate limit exceeded: free-models-per-day', { status: 429 });
const topePorMinuto = (dentroDeMs: number) =>
  new Response('rate limit exceeded', {
    status: 429,
    headers: { 'x-ratelimit-reset': String(Date.now() + dentroDeMs) },
  });

afterEach(() => { vi.restoreAllMocks(); });

describe('chatText', () => {
  it('se queda con el primer modelo que responde y no gasta cupo en los demás', async () => {
    const fetchSimulado = vi.fn().mockResolvedValueOnce(respuesta('todo bien'));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r).toEqual({ ok: true, text: 'todo bien' });
    expect(fetchSimulado).toHaveBeenCalledTimes(1);
  });

  it('pasa al siguiente modelo si el primero es el proveedor el que falla', async () => {
    const fetchSimulado = vi.fn()
      .mockResolvedValueOnce(fallo(503))
      .mockResolvedValueOnce(respuesta('el segundo sí'));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r).toEqual({ ok: true, text: 'el segundo sí' });
    expect(fetchSimulado).toHaveBeenCalledTimes(2);
  });

  it('ante el tope DIARIO para en seco: el límite es de la cuenta, otro modelo no salva nada', async () => {
    const fetchSimulado = vi.fn().mockResolvedValue(topeDiario());
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.motivo).toBe('cupo-diario');
    /* La prueba de que no se malgasta cupo: una sola llamada, no dos. */
    expect(fetchSimulado).toHaveBeenCalledTimes(1);
  });

  it('ante el tope POR MINUTO espera lo que pide OpenRouter y reintenta', async () => {
    const fetchSimulado = vi.fn()
      .mockResolvedValueOnce(topePorMinuto(60))
      .mockResolvedValueOnce(respuesta('ya se despejó'));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r).toEqual({ ok: true, text: 'ya se despejó' });
  });

  it('una espera larga se trata como tope diario, no se aguarda media hora', async () => {
    const fetchSimulado = vi.fn().mockResolvedValue(topePorMinuto(1_800_000));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.motivo).toBe('cupo-diario');
    expect(fetchSimulado).toHaveBeenCalledTimes(1);
  });

  it('descarta un modelo colgado en vez de esperarlo para siempre', async () => {
    const fetchSimulado = vi.fn()
      .mockRejectedValueOnce(Object.assign(new Error('timeout'), { name: 'TimeoutError' }))
      .mockResolvedValueOnce(respuesta('el vivo contesta'));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r).toEqual({ ok: true, text: 'el vivo contesta' });
  });

  it('distingue un fallo de cupo de un error de programación', async () => {
    const fetchSimulado = vi.fn().mockResolvedValue(fallo(400));
    vi.stubGlobal('fetch', fetchSimulado);

    const r = await chatText(opciones, MODELOS);

    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.motivo).toBe('error');
  });
});
