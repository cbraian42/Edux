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
