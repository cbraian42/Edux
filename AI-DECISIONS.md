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

### AD-002 — Modelo de datos inicial del MVP

- Fecha: 2026-10-03.
- Issue: [#8 — Definir modelo de datos inicial](https://github.com/cbraian42/Edux/issues/8).
- Estado: propuesta.
- Contexto y problema: definir las entidades, atributos y relaciones del MVP, manteniendo coherencia con los casos de uso y separando la información docente de los resultados generados por IA.
- Aporte de la IA:
  - Organización del material proporcionado en [docs/functional-specification.md](docs/functional-specification.md) y [docs/data-model.md](docs/data-model.md).
  - Revisión cruzada de ambos documentos y del alcance del issue.
  - Identificación de diferencias sobre el historial considerado en los análisis, agenda, cursos inactivos y representación de valores vacíos.
  - Propuesta de conservar `generated_at` y eliminar `analyzed_until` al aclararse que la fecha requerida corresponde a la generación del último análisis.
- Alternativas consideradas:
  - Temas como entidad independiente o como colección dentro del registro de clase.
  - Historial individual persistido como texto acumulativo o reconstruido desde observaciones.
  - Análisis del curso por períodos seleccionados o sobre todo el historial disponible.
  - Identidad global del alumno o registro privado por docente; la identidad compartida se discutió como posible evolución futura.
- Verificación realizada:
  - Contraste documental con los casos de uso y criterios de aceptación del issue.
  - Revisión de entidades, relaciones, restricciones y diagrama ER.
  - Comprobación de estructura Markdown y delimitación de bloques de código.
  - No se implementaron ni probaron tablas, migraciones o lógica de aplicación.
- Decisión y motivos:
  - Mantener alumnos privados por docente, vinculables a varios cursos de esa misma docente.
  - Separar el curso recurrente del encuentro concreto, con un único registro docente por encuentro.
  - Conservar el texto original y distinguirlo de los temas y observaciones derivados por IA.
  - Guardar los temas como colección y reconstruir el historial individual desde las observaciones, consolidando como máximo una por alumno y encuentro.
  - Representar categorías sin información mediante colecciones vacías, observación general nula o ausencia de filas de observaciones individuales, según corresponda.
  - Analizar bajo demanda todo el historial disponible del curso y conservar únicamente el último resultado con su fecha de generación.
  - Excluir agenda detallada y sesiones futuras precreadas; desactivar un curso conserva su información histórica.
  - Diferir tipos físicos, migraciones y detalles de implementación para las tareas posteriores.
- Responsable de la revisión: Milagros; pendiente de aprobación mediante revisión del PR.

### AD-003 — Base inicial del backend

- Fecha: 2026-09-27
- Issue: [#4 Inicializar backend Node.js](https://github.com/cbraian42/Edux/issues/4)
- Estado: Aprobada
- Contexto y problema: hace falta una base de Node.js y TypeScript para desarrollar funciones Lambda sin definir todavía el despliegue ni la lógica de negocio.
- Aporte de la IA: se propuso configurar TypeScript, ESLint, scripts de trabajo y una función `health` mínima con respuesta compatible con API Gateway HTTP API.
- Alternativas consideradas: incorporar desde ahora un framework o herramientas de despliegue.
- Verificación realizada: `npm run typecheck`, `npm run lint`, `npm run build`¿ e invocación local del handler compilado.
- Decisión y motivos: Se mantuvo una estructura sin dependencias de ejecución hasta definir la estrategia de infraestructura. La estructura mínima permite sumar funciones sin comprometer todavía la configuración de AWS.
- Responsable de la revisión: Braian.

### AD-004 — Estandarización de reglas para agentes de IA (AGENTS.md)

- Fecha: 2026-10-04 (actualizado 2026-10-06).
- Issue o pull request: [#12 Estandarizar instrucciones para agentes de IA](https://github.com/cbraian42/Edux/issues/12).
- Estado: propuesta.
- Contexto y problema: Al utilizar múltiples asistentes de IA (Codex, Antigravity, etc.) para el desarrollo de EduX, se requiere unificar criterios sobre fuentes de verdad, límites de arquitectura cloud, convenciones de nombrado de ramas, reglas de revisión cruzada y restricciones operativas para evitar deuda técnica.
- Aporte de la IA: Se redactó el documento base `AGENTS.md` incorporando las fuentes de verdad actualizadas (`docs/data-model.md`, `docs/functional-specification.md`), la diferenciación de `AI-DECISIONS.md` como bitácora académica/trazabilidad, la convención de ramas `<tipo>/<issue>-<descripcion>` y la gobernanza de aprobación obligatoria de pares.
- Alternativas consideradas: 
  - Reglas dispersas por herramienta (`.cursorrules`, prompts manuales). Se descartó por redundancia y riesgo de desactualización.
  - Dejar las convenciones únicamente en el `README.md`. Se descartó para no sobrecargar el archivo y proveer un punto de anclaje específico para agentes.
- Verificación realizada: Revisión contra los criterios de aceptación del issue #12 y revisión cruzada de feedback recibido en PR #14.
- Decisión y motivos: Adoptar `AGENTS.md` como estándar central versionado en la raíz del repositorio, complementable pero no anulable por configuraciones específicas de cada herramienta.
- Responsable de la revisión: Braian.

### AD-006 — Esquema inicial de PostgreSQL en Supabase

- Fecha: 2026-11-09.
- Issue: [#9 — Configurar proyecto Supabase](https://github.com/cbraian42/Edux/issues/9).
- Estado: propuesta de implementación física; pendiente de revisión cruzada mediante PR. Braian autorizó crear `edux-dev` en `cbraian42's Org`.
- Contexto y problema: preparar persistencia de desarrollo antes de implementar la conexión del backend del #18; mantener el modelo aprobado en #8 sin incorporar Supabase Auth.
- Aporte de la IA: traducción de las ocho entidades a DDL, migración versionada, configuración de ejemplo sin secretos, seed ficticio opcional, pruebas de restricciones y guía de preparación/mantenimiento.
- Alternativas consideradas: arrays nativos `text[]` frente a JSONB para colecciones de textos; estado mediante `text` con CHECK frente a enum; borrado restringido frente a cascadas. Se eligieron arrays, CHECK y borrado restringido por su simplicidad y para preservar referencias históricas.
- Verificación realizada: migración, pruebas SQL con rollback, seed y rechazo de seed repetido en PGlite 0.3.14/PostgreSQL 17.5 embebido con roles simulados; migración `20261109203525_create_initial_schema` aplicada mediante MCP al proyecto `rjmvyfyajfxvbshdeznx` (`edux-dev`, `sa-east-1`); las mismas pruebas SQL pasaron en PostgreSQL 17.11 de Supabase sin dejar datos. Se verificaron las ocho tablas, el historial de migraciones y los permisos. El asesor de seguridad reportó ocho avisos informativos de RLS sin políticas, coherentes con el bloqueo inicial. El seed no fue cargado en cloud. La CLI y el stack Docker local no se ejecutaron.
- Decisión y motivos: UUID, nombres snake_case, día ISO 1–7, horas locales sin zona, fechas `date` y marcas temporales `timestamptz`. Colecciones vacías explícitas y observación general nullable; `generated_at` debe proporcionarse. RLS habilitada sin políticas y permisos de las tablas revocados a roles de la Data API, incluido `service_role`, hasta definir el acceso del backend en #18. El aislamiento por docente y las verificaciones de pertenencia siguen pendientes en #19/casos de uso; las claves foráneas por sí solas no los implementan.
- Responsable de la revisión: Milagros (`@MilaneKatz`); pendiente de aprobación formal mediante revisión del PR. Braian autorizó publicar la implementación. La creación del proyecto no equivale a aprobación del esquema físico.
