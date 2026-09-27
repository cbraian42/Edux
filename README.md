# EDUX

**EDUX** es una propuesta de plataforma SaaS para docentes de robótica y tecnología. Funciona como un copiloto para registrar lo ocurrido en cada clase, recuperar el progreso de cada comisión y planificar el siguiente encuentro con ayuda de inteligencia artificial.

Este repositorio contiene la base del proyecto desarrollado para el Trabajo Práctico Integrador de **Desarrollo de Software Cloud (UTN FRLP, 2026)**. La descripción funcional se basa en el *EDUX One-Pager* del equipo; la arquitectura y el alcance del MVP se ajustarán durante el desarrollo.

## Problema

Un docente puede estar a cargo de varias comisiones de robótica infantil durante la semana. Recordar dónde quedó cada grupo en el temario y qué dificultades técnicas aparecieron en cada clase supone una carga importante. Cuando esa información queda solo en la memoria del docente, se dificulta seguir la evolución de los grupos y preparar los próximos encuentros.

## Propuesta de valor

Al terminar una clase, el docente escribe un resumen en lenguaje natural. EDUX propone utilizar IA para identificar los temas trabajados y las dificultades observadas, y sugerir posibles pasos para la siguiente sesión. Los registros forman una memoria digital consultable a lo largo del tiempo. El docente mantiene el control del contenido y de las decisiones pedagógicas; las sugerencias de IA son apoyo para su trabajo.

La propuesta contempla una arquitectura desacoplada para permitir, a futuro, una posible integración con un robot físico en el aula. Esa integración **no forma parte del MVP inicial**.

## Usuarios objetivo

Profesores y docentes a cargo de talleres de robótica y tecnología, especialmente quienes coordinan varias comisiones o grupos.

## Alcance funcional propuesto para el MVP

1. Autenticar a los docentes y proteger el acceso a sus registros.
2. Organizar el progreso por comisión y clase.
3. Registrar un resumen docente en lenguaje natural después de cada encuentro.
4. Procesar ese resumen con IA para obtener temas tratados, dificultades detectadas y sugerencias para la próxima clase.
5. Consultar el historial de clases y la evolución de cada grupo.

Esta lista traduce el one-pager a capacidades iniciales; las pantallas, el modelo de datos y los criterios de aceptación se definirán en los issues de implementación. La propuesta menciona historiales de alumnos, pero el nivel de detalle individual que tendrá el MVP todavía debe decidirse.

## Arquitectura y stack propuestos

| Componente | Tecnología o servicio | Motivo de la propuesta |
| --- | --- | --- |
| Cliente web | Next.js en Vercel | Despliegue gestionado y menor carga operativa. |
| API y lógica de negocio | Node.js en AWS Lambda, expuesto mediante Amazon API Gateway | Escalado según demanda y costo acorde con los picos de uso después de las clases. |
| Autenticación | Amazon Cognito | Gestión de usuarios y protección de la API mediante tokens. |
| Persistencia | PostgreSQL en Supabase | Relaciones entre comisiones, clases e historiales. |
| Procesamiento de lenguaje natural | Amazon Bedrock | Extracción de información y generación de sugerencias a partir de las notas docentes. |
| Observabilidad | Amazon CloudWatch | Logs y métricas del backend. |

El flujo previsto es **docente → cliente web → API → lógica de negocio → persistencia/IA**. La IA se consume desde el backend, no directamente desde el navegador. El [issue #2](https://github.com/cbraian42/Edux/issues/2) documentará esta arquitectura en un diagrama editable. Cada elección tecnológica deberá justificarse por escalabilidad, costos y necesidades del producto, como exige la consigna del TPI.

## Estructura del repositorio

```text
.
├── .github/             # Configuración de GitHub y futuros workflows
├── backend/             # API y lógica de negocio
├── docs/
│   └── architecture/    # Fuentes y exportaciones del diagrama cloud
├── frontend/            # Aplicación web
├── AI-DECISIONS.md      # Registro de decisiones asistidas por IA
├── .gitignore
└── README.md
```

Los directorios todavía vacíos contienen archivos `.gitkeep` temporales para que Git los conserve hasta que tengan contenido propio.

## Backend local

El [README del backend](backend/README.md) explica los requisitos, la instalación con `npm ci`, los scripts de desarrollo y validación, y cómo invocar localmente la función Lambda mínima.

## Forma de trabajo

- Tomar tareas de los issues y gestionar su avance en GitHub Projects.
- Desarrollar en ramas de trabajo y abrir pull requests para revisión cruzada antes de integrar en `main`.
- Usar Conventional Commits, por ejemplo `feat:`, `fix:` y `docs:`.
- Registrar en [AI-DECISIONS.md](AI-DECISIONS.md) las propuestas generadas con IA y su validación humana.
- Incorporar pruebas, observabilidad y automatización con GitHub Actions a medida que se implemente la aplicación.
