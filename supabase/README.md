# PostgreSQL de desarrollo en Supabase

Implementación del [issue #9](https://github.com/cbraian42/Edux/issues/9). El proyecto `edux-dev` pertenece a `cbraian42's Org` y se ubica en São Paulo (`sa-east-1`). No se utiliza Supabase Auth: la autenticación futura corresponde a Cognito.

Proyecto de desarrollo: [`rjmvyfyajfxvbshdeznx`](https://supabase.com/dashboard/project/rjmvyfyajfxvbshdeznx). Es una referencia pública, no una credencial.

## Archivos

- `migrations/`: cambios de esquema versionados; el primer archivo crea las ocho tablas del modelo aprobado.
- `config.toml`: configuración de la CLI para el entorno local, con PostgreSQL 17. No configura ni cambia la organización o región del proyecto cloud.
- `.env.example`: variables de administración, sin secretos. No define todavía la conexión del backend.
- `seed.sql`: datos opcionales y ficticios de dos docentes, tres cursos y dos alumnos; una docente reutiliza el mismo alumno en dos cursos.
- `tests/initial-schema.sql`: comprobaciones SQL dentro de una transacción que se revierte.

## Preparar el acceso

1. Acceder al proyecto de desarrollo desde el [Dashboard](https://supabase.com/dashboard). Invitar al otro integrante a la organización/proyecto mediante los mecanismos de Supabase; no compartir credenciales personales.
2. Guardar la contraseña de PostgreSQL en un gestor de contraseñas. Si el proyecto fue creado mediante MCP y no se dispone de ella, establecerla desde la configuración de base de datos antes de usar la conexión directa o la CLI. No enviarla por chat ni incorporarla a Git.
3. Instalar la [CLI oficial](https://supabase.com/docs/guides/local-development/cli/getting-started) y consultar `supabase --version` y la ayuda de la versión instalada.
4. Copiar `.env.example` a `.env` solo si se necesitan variables locales. Ese archivo está ignorado por Git. No asumir que PowerShell carga el archivo automáticamente.

La CLI usa credenciales de administración. El rol y la cadena de conexión que utilizará el backend se resolverán en el [issue #18](https://github.com/cbraian42/Edux/issues/18), incluyendo pooling, SSL y permisos. El navegador no debe recibir la contraseña de PostgreSQL ni una clave administrativa.

## Aplicar y mantener migraciones

El proyecto cloud debe inspeccionarse antes de modificarlo. La migración inicial está pensada para un esquema `public` sin tablas EDUX; si existen tablas con esos nombres, investigar la diferencia antes de aplicar. No se usa `IF NOT EXISTS` para ocultar divergencias.

Se puede aplicar mediante el MCP oficial, pasando exactamente el contenido del archivo a `apply_migration` con nombre `create_initial_schema`. Ese mecanismo registra la migración en Supabase. Después hay que consultar el historial y alinear el prefijo numérico del archivo local con la versión realmente asignada, conservando el mismo SQL. No aplicar nuevamente el mismo cambio por otra vía.

Como alternativa, con la CLI autenticada y desde la raíz del repositorio, el flujo tradicional es:

```powershell
supabase login
supabase link --project-ref <referencia-del-proyecto-de-desarrollo>
supabase migration list
supabase db push --dry-run
supabase db push
```

Verificar siempre el destino y las migraciones pendientes; si la versión instalada usa opciones de destino distintas, seguir su ayuda oficial. No incluir el seed al publicar migraciones. No ejecutar un reset remoto: este proyecto se mantiene mediante migraciones incrementales.

No editar una migración ya aplicada ni crear cambios de esquema desde el Table Editor. Agregar un nuevo archivo para cada cambio posterior y revisar su impacto en los datos existentes. [Guía oficial de migraciones](https://supabase.com/docs/guides/deployment/database-migrations).

## Esquema físico inicial

Referencia funcional: [modelo de datos](../docs/data-model.md) y [especificación](../docs/functional-specification.md).

| Tabla | Entidad y restricciones relevantes |
| --- | --- |
| `teachers` | Teacher; `cognito_sub` único. |
| `courses` | Course; docente propietaria, estado `active`/`inactive`. |
| `students` | Student; docente propietaria, sin edad persistida. |
| `course_students` | CourseStudent; clave primaria compuesta evita duplicados. |
| `class_sessions` | ClassSession; único encuentro por curso y fecha. |
| `class_observations` | ClassObservation; único registro por encuentro, con texto original. |
| `student_observations` | StudentObservation; única observación por alumno y encuentro. |
| `course_analyses` | CourseAnalysis; único último análisis por curso. |

Decisiones físicas propuestas para revisión:

- UUID generados por PostgreSQL y nombres en plural/snake_case.
- `day_of_week` como entero ISO de 1 (lunes) a 7 (domingo), y horas habituales como `time` sin zona. La fecha del encuentro es `date`; el backend definirá la conversión horaria cuando corresponda.
- `text` para nombre, nivel y género; no se define un catálogo de género que el modelo no haya acordado.
- `text[] NOT NULL` para temas y recomendaciones. Una colección vacía se inserta explícitamente, no se interpreta como un procesamiento pendiente ni fallido.
- `general_observation` admite `null`; una cadena vacía no representa ausencia de información.
- `timestamptz` para creación y generación. `generated_at` se recibe explícitamente para representar cuándo se generó el análisis.
- Borrado referencial restringido, sin cascadas que eliminen historial. Desactivar un curso solo cambia su estado.

Las claves foráneas garantizan existencia de referencias; no comprueban por sí solas que alumno y curso pertenezcan a la misma docente o que una observación corresponda a un alumno vinculado. Esas validaciones y su ubicación definitiva se trabajan en #19 y en los casos de uso. Tampoco se crea un análisis válido solo por cumplir el DDL: el backend debe comprobar que haya registros y un resultado de IA válido.

RLS está habilitada sin políticas y se revocan permisos de las ocho tablas a `PUBLIC`, `anon`, `authenticated` y `service_role`. Es una barrera inicial para no exponer las tablas mediante la Data API. **No implementa aislamiento por docente** y no restringe al propietario/administrador de PostgreSQL, que puede omitir RLS. El acceso del backend requiere una decisión explícita en #18; no se debe resolver desactivando RLS ni concediendo acceso al navegador. [Permisos y seguridad de la Data API](https://supabase.com/docs/guides/api/securing-your-api).

## Datos y comprobaciones de desarrollo

`tests/initial-schema.sql` se ejecuta como administrador de la base de desarrollo mediante el SQL Editor o el MCP. Inserta datos ficticios con identificadores nuevos, prueba unicidad, referencias, nulos, valores básicos y permisos, y finaliza con `ROLLBACK`. Un error debe considerarse una comprobación fallida; no confirma cambios. Estas comprobaciones no sustituyen las pruebas de autorización del #19.

`seed.sql` es opcional y se ejecuta una sola vez en desarrollo como administrador. Usa identificadores fijos para reconocer los datos de prueba y es atómico; si ya existen, falla sin sobrescribirlos. No cargarlo sobre un proyecto con esos identificadores ni usarlo en producción. Los `cognito_sub` con prefijo `local-test-` son marcadores ficticios y no autentican a nadie.

Para reconstruir únicamente una base local descartable, con Docker y la CLI preparados, se podrá usar `supabase start` y aplicar el flujo local de migraciones. `db.seed.enabled = false` evita la carga automática de datos. No se exige ejecutar un stack completo de Supabase local para consumir el PostgreSQL cloud desde el backend.

## Estado y pendientes del issue

El 2026-11-09 se creó el proyecto, se comprobó que no tenía tablas EDUX y se aplicó la migración `20261109203525_create_initial_schema` mediante MCP. El archivo local usa la misma versión registrada en el historial remoto.

Se ejecutó `tests/initial-schema.sql` sin errores en PostgreSQL 17.11 de Supabase y se verificó que no dejó docentes, cursos ni alumnos persistidos. En PGlite 0.3.14 (PostgreSQL 17.5 embebido, con roles de Supabase simulados) también se comprobaron la migración, los tests, la carga del seed y el rechazo de una segunda carga. PGlite se utilizó desde una carpeta temporal, sin agregar dependencias al repositorio. El seed no se cargó en el proyecto cloud.

El asesor de seguridad informó únicamente ocho avisos `INFO` de RLS habilitada sin políticas, uno por tabla. Es el bloqueo inicial previsto; no se agregan políticas permisivas para suprimir ese aviso. [Explicación del aviso](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy).

No se ejecutó el flujo de CLI ni el stack completo de Supabase local: la CLI no está instalada y el motor Docker no estaba disponible. El esquema sí se verificó en el proyecto cloud real. La trazabilidad queda en `AI-DECISIONS.md`; el cierre del issue todavía requiere integrar estos archivos mediante un PR revisado.

Quedan fuera de esta entrega el cliente de base de datos del backend (#18), la autorización por docente (#19), Cognito, RLS definitiva, pruebas HTTP con SAM (#17) y despliegues AWS/Vercel.
