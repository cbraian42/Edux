# Decisiones y uso de IA

Este archivo registra decisiones técnicas en las que se utilizó asistencia de IA. Cada entrada debe indicar qué se propuso, qué se verificó y quién aprobó la decisión. La asistencia de IA no reemplaza la revisión del equipo.

## Plantilla para nuevas entradas

```markdown
### AD-XXX — Título

- Fecha:
- Issue o pull request:
- Estado: propuesta / aprobada / descartada / reemplazada
- Contexto y problema:
- Aporte de la IA:
- Alternativas consideradas:
- Verificación realizada:
- Decisión y motivos:
- Responsable de la revisión:
```

## Registro

### AD-001 — Estructura inicial del repositorio

- Fecha: 2026-09-26
- Issue: [#1 Configurar estructura inicial del repositorio](https://github.com/cbraian42/Edux/issues/1)
- Estado: aprobada
- Contexto y problema: se necesita separar el cliente, el backend y la documentación antes de iniciar el desarrollo.
- Aporte de la IA: se propuso la estructura de carpetas, el README inicial, este registro y el `.gitignore` a partir de los issues #1 y #2.
- Alternativas consideradas: un solo directorio de aplicación; se prefirió la separación indicada en el issue.
- Verificación realizada: revisión local de la estructura y del estado de Git; no se ejecutaron pruebas de aplicación porque todavía no existe código de aplicación; se modificó un poco el readme.
- Decisión y motivos: mantener `frontend/`, `backend/`, `docs/architecture/` y `.github/` como base para el MVP.
- Responsable de la revisión: Braian.

### AD-002 — Estandarización de reglas para agentes de IA (AGENTS.md)

- Fecha: 2026-10-04
- Issue o pull request: [#12 Estandarizar instrucciones para agentes de IA](https://github.com/cbraian42/Edux/issues/12)
- Estado: propuesta
- Contexto y problema: Al utilizar múltiples agentes o asistentes de IA (Codex, Antigravity, etc.) para el desarrollo de EduX, surge la necesidad de unificar criterios sobre fuentes de verdad, límites de arquitectura cloud, convenciones de código y restricciones operativas (como no comitear automáticamente) para evitar discrepancias o deuda técnica.
- Aporte de la IA: Se redactó el documento base `AGENTS.md` alineado con la arquitectura serverless (AWS Lambda, Supabase, Next.js, Bedrock) definida en el `README.md`, estableciendo pautas de seguridad, flujo de trabajo y límites de intervención de los agentes.
- Alternativas consideradas: 
  - Reglas dispersas por herramienta (`.cursorrules`, prompts manuales). Se descartó por redundancia y riesgo de desactualización.
  - Dejar las convenciones únicamente en el `README.md`. Se descartó para no sobrecargar la lectura del repositorio y permitir que las herramientas de IA tengan un punto de anclaje dedicado.
- Verificación realizada: Revisión contra los criterios de aceptación del issue #12 y consistencia con las definiciones de `README.md`.
- Decisión y motivos: Adoptar `AGENTS.md` como estándar central versionado en la raíz del repositorio, complementable pero no anulable por configuraciones específicas de cada herramienta.
- Responsable de la revisión: Braian.

