import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { pareceRazonamiento } from './sse-stream';

/* Las muestras son respuestas REALES capturadas del asistente en producción
   el 16-09-2026: dos con el razonamiento del modelo filtrado (venían de
   openai/gpt-oss-120b) y dos correctas. Si alguien vuelve a meter en la cadena
   un modelo que filtre, estos tests lo cazan. */
const muestra = (nombre: string) => readFileSync(new URL(`./__fixtures__/${nombre}`, import.meta.url), 'utf8');

describe('pareceRazonamiento', () => {
  it('detecta las dos fugas reales capturadas en producción', () => {
    expect(pareceRazonamiento(muestra('fuga-razonamiento-1.txt'))).toBe(true);
    expect(pareceRazonamiento(muestra('fuga-razonamiento-2.txt'))).toBe(true);
  });

  it('deja pasar las respuestas correctas del asistente', () => {
    expect(pareceRazonamiento(muestra('respuesta-limpia-1.txt'))).toBe(false);
    expect(pareceRazonamiento(muestra('respuesta-limpia-2.txt'))).toBe(false);
  });

  it('detecta el andamiaje interno en cualquier posición', () => {
    expect(pareceRazonamiento('¡Hola! …texto… assistantfinal respuesta')).toBe(true);
    expect(pareceRazonamiento('<think>debería preguntar el sector</think> ¡Hola!')).toBe(true);
    expect(pareceRazonamiento('<|channel|>analysis<|message|>hmm')).toBe(true);
  });

  it('detecta deliberación en inglés aunque no traiga marcas', () => {
    expect(pareceRazonamiento('Okay, the user wants a quote for an online store. Let me check the services.')).toBe(true);
    expect(pareceRazonamiento('The user asked in Spanish, so I should reply in Spanish.')).toBe(true);
    expect(pareceRazonamiento('Analysis: the visitor needs pricing before anything else.')).toBe(true);
  });

  it('no marca respuestas legítimas que mencionen palabras parecidas', () => {
    expect(pareceRazonamiento('¡Claro! Te hago un análisis de tu web sin compromiso. ¿Qué necesitas?')).toBe(false);
    expect(pareceRazonamiento('Okay es una palabra que usamos poco, pero te ayudo encantada.')).toBe(false);
    expect(pareceRazonamiento('Sure! We build online stores from ~700€. What do you sell?')).toBe(false);
    expect(pareceRazonamiento('')).toBe(false);
  });
});
