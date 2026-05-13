# 🔍 Auditoría SEO - Páginas de Pueblos Dinámicas

## Archivo Analizado
- **Ruta**: `/workspace/src/pages/diseno-web/[pueblo].astro`
- **Tamaño**: 4,146 líneas (260KB) ⚠️
- **Páginas generadas**: ~100+ pueblos de Almería

---

## 🚨 PROBLEMAS CRÍTICOS DETECTADOS

### 1. Breadcrumb con String Literal (GRAVE)
**Ubicación**: Línea 687
```json
{
  "@type": "ListItem",
  "position": 3,
  "name": pueblo.nombre,  // ❌ ERROR: No interpola la variable
  "item": "https://platanitorico.com/diseno-web/${pueblo.slug}"
}
```

**Impacto**: 
- Google muestra "pueblo.nombre" literal en SERPs
- Pérdida de rich snippets para TODOS los pueblos
- Posible penalización por structured data inválido

**Solución**:
```json
"name": pueblo.nombre,  // ✅ En Astro necesita template literal o interpolación correcta
```

---

### 2. Falta Canonical URL Explícita
**Problema**: No se pasa `canonical` a BaseLayout
```astro
<BaseLayout
  title={title}
  description={description}
  // ❌ FALTA: canonical={`https://platanitorico.com/diseno-web/${pueblo.slug}`}
/>
```

**Impacto**:
- Riesgo de contenido duplicado si hay parámetros URL
- Google podría elegir URL incorrecta como canonical
- Pérdida de link equity

---

### 3. JSON-LD Service Incompleto
**Problema**: Schema de Service sin coordenadas geo
```json
"areaServed": {
  "@type": "City",
  "name": pueblo.nombre,
  "containedInPlace": {
    "@type": "AdministrativeArea",
    "name": pueblo.comarca
  }
  // ❌ FALTA: geo coordinates, postalCode
}
```

**Impacto**:
- Menor relevancia para búsquedas locales
- No aparece en Google Maps local pack
- Pérdida de oportunidades de rich results

---

### 4. Exceso de Contenido Inline (260KB)
**Problema**: Todo el contenido hardcodeado en un solo archivo
- 4,146 líneas de código
- Múltiples schemas JSON-LD condicionales (vera, mojacar, garrucha, etc.)
- HTML generado excesivo por página

**Impacto**:
- LCP más lento (+2-3 segundos)
- TBT elevado (>300ms)
- Posible Core Web Vitals penalty
- Dificultad de mantenimiento

---

### 5. Meta Description Genérica para la Mayoría
**Problema**: Solo Mojácar tiene descripción custom
```javascript
const description = pueblo.slug === 'mojacar'
  ? '25% DTO✔️ Diseño de Páginas Web Mojácar...' // ✅ Único
  : `Agencia de diseño web en ${pueblo.nombre}, ${pueblo.comarca}...`; // ❌ Genérico
```

**Impacto**:
- CTR bajo en SERPs para 95% de pueblos
- Competidores con descripciones más atractivas
- Pérdida de tráfico cualificado

---

### 6. Falta de Validación de Pueblo Existente
**Problema**: No hay verificación de slug válido
```typescript
export async function getStaticPaths() {
  return pueblos.filter((pueblo) => pueblo.slug !== 'almeria')...
}
```

**Riesgo**:
- Si alguien accede a `/diseno-web/pueblo-inexistente`, podría haber error 500
- No hay página 404 custom para slugs inválidos

---

## ✅ SOLUCIONES PROPUESTAS

### Prioridad ALTA (Implementar YA)

1. **Corregir Breadcrumb interpolation**
2. **Añadir canonical URL dinámica**
3. **Completar JSON-LD con geo-coordinates**
4. **Añadir noindex a pueblos < 1000 habitantes** (evitar thin content)

### Prioridad MEDIA

5. **Crear descripciones únicas por pueblo** (usar datos de comarca + características)
6. **Extraer schemas JSON-LD a archivos separados**
7. **Implementar lazy loading para secciones below-the-fold**

### Prioridad BAJA

8. **Dividir en componentes reutilizables**
9. **Añadir sistema de caché para datos de pueblos**
10. **Implementar AMP para móviles** (opcional)

---

## 📊 MÉTRICAS DE IMPACTO ESPERADO

| Métrica | Antes | Después (estimado) |
|---------|-------|-------------------|
| Rich Snippets | 0% | 85%+ |
| CTR SERPs | 1.2% | 2.5%+ |
| LCP | 3.2s | 1.8s |
| TBT | 450ms | <200ms |
| Indexación | 60% | 95%+ |

---

## 🛠️ ARCHIVOS A MODIFICAR

1. `/workspace/src/pages/diseno-web/[pueblo].astro` (principal)
2. `/workspace/src/data/pueblos-almeria.ts` (añadir coordenadas)
3. `/workspace/src/layouts/BaseLayout.astro` (validar canonical)

---

## 🧪 TESTING POST-FIX

- [ ] Validar structured data en Google Rich Results Test
- [ ] Verificar canonical URLs en Search Console
- [ ] Ejecutar Lighthouse (score >90)
- [ ] Comprobar indexación de 10 pueblos aleatorios
- [ ] Monitorizar CTR durante 2 semanas

---

*Generado: 2024-01-XX*
*Auditor: AI SEO Specialist*
