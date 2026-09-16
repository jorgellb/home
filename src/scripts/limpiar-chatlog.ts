#!/usr/bin/env tsx
/* Limpia las conversaciones del asistente que guardaron el razonamiento del
   modelo (fuga del 16-09-2026, ver src/lib/sse-stream.ts). Por defecto solo
   informa; hay que pedir explícitamente que modifique nada.

   Uso:
     npm run limpiar:chatlog                 informa de qué conversaciones están contaminadas
     npm run limpiar:chatlog -- --aplicar    quita los mensajes contaminados y conserva el resto
     npm run limpiar:chatlog -- --aplicar --borrar   borra la conversación entera

   Necesita UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN (o sus alias
   KV_*). En local no suelen estar: ejecútalo con las de Vercel delante, por
   ejemplo:  UPSTASH_REDIS_REST_URL=… UPSTASH_REDIS_REST_TOKEN=… npm run limpiar:chatlog */
import { listConversations, saveConversation, chatlogEnabled, type Conversation } from '../lib/chatlog';
import { pareceRazonamiento } from '../lib/sse-stream';
import { upstashUrl, upstashToken } from '../lib/env';

const aplicar = process.argv.includes('--aplicar');
const borrar = process.argv.includes('--borrar');
const INDEX_KEY = 'chatlog:index';

async function comando(c: (string | number)[]): Promise<unknown> {
  const url = upstashUrl();
  const token = upstashToken();
  if (!url || !token) return null;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(c),
  });
  return res.ok ? res.json() : null;
}

function contaminados(conv: Conversation): number {
  return conv.msgs.filter((m) => m.role === 'assistant' && pareceRazonamiento(m.content)).length;
}

async function principal(): Promise<void> {
  if (!chatlogEnabled) {
    console.error('[limpiar] Faltan las credenciales de Upstash. Pásalas por entorno (ver cabecera del script).');
    process.exitCode = 1;
    return;
  }

  const conversaciones = await listConversations(1000);
  const sucias = conversaciones.filter((c) => contaminados(c) > 0);

  console.log(`[limpiar] ${conversaciones.length} conversaciones revisadas, ${sucias.length} con razonamiento filtrado.`);
  for (const c of sucias) {
    const fecha = new Date(c.ts).toLocaleString('es-ES');
    console.log(`  · ${c.cid} (${fecha}, ${c.msgs.length} mensajes, ${contaminados(c)} contaminados)${c.hot ? ' [avisada por email]' : ''}`);
  }

  if (!sucias.length) return;
  if (!aplicar) {
    console.log('\n[limpiar] Nada modificado. Repite con --aplicar (añade --borrar para eliminar la conversación entera).');
    return;
  }

  for (const c of sucias) {
    if (borrar) {
      await comando(['DEL', `chatlog:${c.cid}`]);
      await comando(['ZREM', INDEX_KEY, c.cid]);
      console.log(`  ✂ borrada ${c.cid}`);
      continue;
    }
    const limpios = c.msgs.filter((m) => !(m.role === 'assistant' && pareceRazonamiento(m.content)));
    if (!limpios.some((m) => m.role === 'user')) {
      await comando(['DEL', `chatlog:${c.cid}`]);
      await comando(['ZREM', INDEX_KEY, c.cid]);
      console.log(`  ✂ borrada ${c.cid} (sin contenido útil tras limpiar)`);
      continue;
    }
    await saveConversation({ ...c, msgs: limpios, updated: Date.now() });
    console.log(`  ✓ limpiada ${c.cid} (${c.msgs.length} → ${limpios.length} mensajes)`);
  }

  console.log(`\n[limpiar] Listo: ${sucias.length} conversaciones tratadas.`);
}

principal().catch((error: unknown) => {
  console.error('[limpiar] Error:', error);
  process.exitCode = 1;
});
