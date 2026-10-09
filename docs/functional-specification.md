# EduX — Especificación funcional del MVP

**Propósito:** definir el comportamiento esperado del producto, sin establecer el modelo físico de datos, detalles de PostgreSQL/Supabase ni el diagrama entidad-relación.

## 1. Objetivo del MVP

Ayudar a la docente a registrar lo ocurrido en sus clases y consultar el progreso de sus grupos y alumnos. A partir de registros en lenguaje natural, EduX utiliza IA para organizar temas, observaciones generales de la clase o del grupo y observaciones individuales. Cuando la docente lo solicita, analiza el historial de un curso para responder: **¿cómo venimos y qué podríamos mejorar?**

La IA facilita la organización y la interpretación de los registros; las decisiones pedagógicas corresponden a la docente.

## 2. Actor principal

**Docente:** accede a su espacio, crea cursos/comisiones y alumnos, los vincula, registra encuentros, consulta historiales y solicita análisis del curso. El MVP protege el acceso a sus registros y no contempla otros roles operativos.

## 3. Alcance funcional

- Autenticación de docentes y acceso protegido a su información.
- Creación y consulta de cursos/comisiones, con materia o nombre, nivel, día, horario y estado activo/inactivo.
- Creación y consulta de alumnos con nombre, fecha de nacimiento y género, y su asociación a uno o varios cursos.
- Registro de encuentros concretos, con un único registro docente en lenguaje natural por encuentro.
- Extracción mediante IA de temas tratados, observaciones generales relevantes sobre la clase o el grupo y observaciones individuales.
- Consulta del historial de encuentros de cada curso y del historial individual de cada alumno.
- Generación bajo demanda de un resumen general y recomendaciones a partir del historial del curso, conservando únicamente el último análisis generado.

### Cursos inactivos y encuentros

Un curso inactivo deja de considerarse vigente, pero conserva sus alumnos vinculados, encuentros e historial para consulta. Desactivarlo no elimina su información.

El día y horario del curso representan su horario habitual. Los encuentros se crean al registrar lo ocurrido en una fecha concreta; no se precrean sesiones futuras ni se gestionan estados de encuentro como programado, completado o cancelado. La agenda detallada queda fuera del MVP.

## 4. Conceptos del dominio

| Concepto | Significado funcional |
| --- | --- |
| Curso o comisión | Grupo con continuidad en el tiempo, a cargo de una docente, con materia, nivel y horario. En este documento ambos términos designan el mismo concepto. |
| Alumno | Persona registrada por la docente con nombre, fecha de nacimiento y género, que puede participar en más de un curso. |
| Vinculación alumno–curso | Asociación que identifica a los alumnos que participan en un curso. |
| Encuentro o clase puntual | Ocurrencia de un curso en una fecha concreta. Se distingue del curso recurrente. |
| Registro docente | Único texto original escrito por la docente sobre un encuentro. Es la fuente humana del procesamiento. |
| Tema tratado | Contenido identificado por la IA en el registro de un encuentro. |
| Observación general | Información relevante sobre la clase o el grupo extraída del registro de un encuentro. Se vincula a ese encuentro y a su fuente; no constituye un análisis acumulado del curso. |
| Observación individual | Información sobre un alumno extraída de un registro, vinculada al alumno y al encuentro de origen. |
| Historial individual | Conjunto cronológico de observaciones de un alumno, con su contexto de curso y encuentro. No requiere redactar manualmente un texto acumulativo. |
| Análisis del curso | Resultado de IA solicitado por la docente: resumen general de la evolución y recomendaciones sustentadas en el historial disponible. Se guarda únicamente el último resultado, que reemplaza al anterior. |

## 5. Casos de uso

| ID | Caso de uso | Resultado esperado |
| --- | --- | --- |
| CU-01 | Acceder al espacio docente | La docente autenticada puede consultar y operar sobre su información. |
| CU-02 | Crear y consultar cursos | La docente identifica sus comisiones y accede al detalle y al historial de cada una. |
| CU-03 | Registrar y vincular alumnos | La docente registra nombre, fecha de nacimiento y género de cada alumno y lo asocia a los cursos correspondientes, reutilizando al mismo alumno si participa en varios. |
| CU-04 | Registrar un encuentro | La docente selecciona un curso, indica la fecha y guarda un texto sobre lo ocurrido. La IA extrae temas, una observación general y observaciones individuales cuando haya información relevante en cada categoría. |
| CU-05 | Consultar el historial del curso | La docente recorre sus encuentros y consulta los textos originales y los datos extraídos. |
| CU-06 | Consultar el historial de un alumno | La docente consulta las observaciones acumuladas del alumno, identificando fecha, curso y registro de origen. |
| CU-07 | Solicitar y consultar el último análisis del curso | La docente utiliza «Generar resumen general y recomendaciones». El resultado queda guardado como último análisis del curso y puede consultarse después; cada nuevo análisis reemplaza al anterior. |

## 6. Flujo de registro de clase

1. La docente ingresa al curso/comisión correspondiente.
2. Identifica el encuentro mediante su fecha.
3. Escribe un registro en lenguaje natural con los contenidos trabajados y las observaciones que considere relevantes.
4. Guarda el registro. EduX conserva el texto original como único registro docente del encuentro; no se admite un segundo registro para el mismo encuentro.
5. La IA procesa ese texto con el contexto necesario para identificar a los alumnos del curso.
6. EduX conserva y muestra los temas extraídos, la observación general sobre la clase o el grupo y las observaciones individuales vinculadas a los alumnos identificados, cuando corresponda.
7. Las observaciones individuales quedan disponibles en los historiales correspondientes, sin que la docente deba volver a cargarlas.

Este flujo **no genera recomendaciones ni un análisis general del curso**. Una clase sin dificultades o sin menciones individuales sigue siendo un registro válido.

### IA a nivel clase: extracción

Al procesar el registro docente de una clase, la IA deberá transformar el texto libre en información estructurada compuesta por:

- **Temas tratados (`topics`):** colección de contenidos que surgen del registro.
- **Observación general (`generalObservation`):** texto con las observaciones generales relevantes sobre la clase o el grupo expresadas en el registro.
- **Observaciones individuales (`studentObservations`):** colección de dificultades, avances u otras observaciones relevantes asociadas a alumnos identificables.

La ausencia de información relevante en alguna categoría deberá representarse mediante una colección vacía (`[]`) para `topics` o `studentObservations`, o un valor nulo (`null`) para `generalObservation`, sin generar contenido artificial para completar la estructura.

Por ejemplo, ante «Hoy vimos sensores ultrasónicos. El grupo participó con entusiasmo. A Juan le costó conectar el sensor y Romina completó la actividad», la IA puede identificar el tema «Sensores ultrasónicos», la observación general «El grupo participó con entusiasmo» y una observación para cada alumno mencionado. No debe inferir calificaciones ni causas que la docente no haya expresado.

Una observación general del grupo no se convierte automáticamente en una observación para cada alumno. `generalObservation` corresponde únicamente al encuentro registrado; el resumen general del curso se genera por separado, bajo demanda, a partir del historial.

## 7. Historial individual de alumnos

El historial reúne las observaciones extraídas de los encuentros en los que se menciona al alumno. Cada entrada permite reconocer su fecha, curso y fuente original. Si el alumno participa en varios cursos de la misma docente, se conserva ese contexto para interpretar cada observación.

La ausencia de observaciones no implica ausencia, buen desempeño ni dificultades. El historial permite a la docente revisar la evolución registrada; una síntesis individual generada por IA es una posible extensión y no forma parte del alcance acordado.

## 8. Análisis bajo demanda del curso

Desde el detalle de un curso, la docente consulta sus registros y puede activar **«Generar resumen general y recomendaciones»**. Solo esa solicitud inicia el análisis; abrir el detalle o registrar una clase no lo genera automáticamente.

La IA considera todo el historial disponible del curso al iniciar la generación: registros docentes, temas, observaciones generales de los encuentros y observaciones individuales, manteniendo su procedencia. En el MVP no se seleccionan rangos de fechas ni encuentros individuales para el análisis. Produce:

- **Resumen general:** síntesis del avance y de los patrones observables en el período considerado.
- **Recomendaciones:** propuestas pedagógicas relacionadas con ese historial, que la docente puede tomar en cuenta para próximos encuentros.

No es obligatorio producir recomendaciones si no hay motivos suficientes; en ese caso se representan como una colección vacía (`recommendations: []`). Cuando falte información, el resultado debe indicarlo sin inventar tendencias. Si no existen registros, se informa que todavía no hay base para el análisis y no se crea un análisis vacío.

El resultado queda guardado y disponible en el detalle como **«Último análisis del curso»**, incluyendo el resumen general y las recomendaciones. Cada nuevo análisis generado reemplaza al anterior: no se conservan versiones ni un historial de análisis.

El resultado conserva la fecha y hora de generación, que la UI muestra junto al resumen como **«Último análisis de IA: [fecha]»**. Su alcance es todo el historial disponible al iniciar esa generación; la fecha mostrada indica cuándo se produjo el resultado, no la fecha del último encuentro. Nuevos registros, incluidos encuentros cargados con fecha anterior, no actualizan automáticamente el último análisis guardado: se requiere otra solicitud. El MVP no conserva una instantánea ni una lista de los registros incluidos en cada análisis.

## 9. Datos fuente humanos y datos derivados por IA

| Origen | Información | Tratamiento esperado |
| --- | --- | --- |
| Humano | Datos de cursos, alumnos y vinculaciones; fecha del encuentro; texto docente | Se conserva como información ingresada por la docente. El texto original permanece consultable. |
| IA: extracción | Temas, observación general y observaciones individuales | Se presenta como información derivada y se vincula al registro que la originó. |
| IA: análisis | Resumen general y recomendaciones del curso | Se presenta como interpretación o propuesta de IA, con referencia al historial considerado. |

Un resultado de IA no reemplaza el texto original ni se presenta como una afirmación escrita por la docente. Las recomendaciones no modifican por sí mismas los registros, el perfil del alumno ni la planificación del curso.

## 10. Reglas de negocio

1. Cada docente accede únicamente a los cursos, alumnos, registros y resultados que le corresponden.
2. Un curso puede tener varios alumnos y un alumno puede participar en varios cursos.
3. Cada encuentro pertenece a un curso y admite un único registro docente, que conserva el contexto del encuentro al que corresponde.
4. Toda observación individual debe tener un alumno identificado y un registro de origen. La IA no crea alumnos ni vinculaciones por detectar un nombre.
5. Los datos extraídos deben estar sustentados en el registro. Sin información relevante, `topics` y `studentObservations` se representan como colecciones vacías y `generalObservation` como nulo. No se genera contenido artificial para completar la estructura ni se fuerzan recomendaciones en el análisis del curso.
6. La extracción por encuentro y el análisis del curso son operaciones funcionalmente distintas. La observación general pertenece al encuentro; el resumen de evolución y las recomendaciones pertenecen al análisis bajo demanda del curso.
7. El alumno se registra con nombre, fecha de nacimiento y género. La edad se obtiene a partir de la fecha de nacimiento para análisis futuros.
8. Se guarda únicamente el último análisis del curso. Un nuevo análisis reemplaza al anterior, sin versionado.

## 11. Fuera de alcance del MVP

- Recomendaciones automáticas obligatorias después de cada clase.
- Síntesis o análisis individual de alumnos generado por IA bajo demanda.
- Planificación automática de clases o ejecución automática de recomendaciones.
- Versionado y consulta de análisis anteriores del curso.
- Selección manual de períodos o encuentros para el análisis del curso.
- Agenda detallada, sesiones futuras precreadas y estados de encuentro.
- Gestión de asistencia, calificaciones, pagos y comunicaciones con familias.
- Acceso de alumnos o familias y colaboración entre múltiples docentes sobre un mismo curso.

Estas exclusiones delimitan el borrador y pueden revisarse en futuras iteraciones. La definición física de PostgreSQL/Supabase, contratos técnicos y diagrama ER corresponden a documentación posterior.

## 12. Criterios funcionales de aceptación

| ID | Situación | Criterio observable |
| --- | --- | --- |
| CA-01 | Acceso al espacio docente | Una docente autenticada puede acceder a su información y no a los registros de otra. |
| CA-02 | Organización de cursos y alumnos | Se puede crear un curso, registrar un alumno con nombre, fecha de nacimiento y género y vincularlo con más de un curso sin duplicarlo. |
| CA-03 | Registro de un encuentro | Al guardar una fecha y un texto en un curso, el registro queda disponible en su historial y mantiene el texto original. No se admite un segundo registro docente para el mismo encuentro. |
| CA-04 | Extracción de información | Un texto con un tema, una observación general del grupo y una observación sobre un alumno inequívocamente identificado produce `topics`, `generalObservation` y `studentObservations`, asociados al encuentro y a su fuente. |
| CA-05 | Registro sin menciones individuales | Se guarda correctamente con `studentObservations: []`. Las observaciones del grupo se conservan en `generalObservation` y no se atribuyen automáticamente a cada alumno. |
| CA-06 | Historial individual | Las observaciones de varios encuentros se consultan en orden cronológico, con fecha, curso y acceso al registro de origen. |
| CA-07 | Separación de operaciones | Guardar un registro o consultar el detalle de un curso no genera automáticamente un análisis ni recomendaciones. |
| CA-08 | Análisis solicitado | Al solicitarlo sobre un curso con registros, se analiza todo el historial disponible al iniciar la generación, sin selección manual de períodos o encuentros. Se obtiene un resumen y recomendaciones cuando corresponda, o `recommendations: []` si no hay propuestas sustentadas. |
| CA-09 | Evidencia insuficiente | Un curso sin registros informa esa condición; un historial insuficiente no produce tendencias inventadas ni recomendaciones forzadas. |
| CA-10 | Procedencia visible | La docente puede distinguir el texto humano de las extracciones y los análisis generados por IA. |
| CA-11 | Consulta del último análisis | Después de generar un análisis y volver al detalle del curso, su resumen, recomendaciones y fecha de generación siguen disponibles como último análisis de IA, sin necesidad de generarlo otra vez. Cargar nuevos registros no modifica ese resultado ni su fecha. |
| CA-12 | Reemplazo del análisis | Al generar otro análisis del mismo curso, el nuevo resultado reemplaza al guardado; no se ofrecen versiones anteriores. |
| CA-13 | Categorías sin información relevante | Cada categoría sin información se representa como `topics: []`, `generalObservation: null` o `studentObservations: []`, según corresponda, sin inventar contenido para completarla. |
| CA-14 | Curso inactivo | Al desactivar un curso, deja de considerarse vigente y conserva sus alumnos vinculados, encuentros e historial para consulta. |
| CA-15 | Encuentros sin agenda | Definir el horario habitual de un curso no crea sesiones futuras. Un encuentro se registra mediante una fecha y su texto docente, sin estados de agenda. |

## 13. Decisiones pendientes para la próxima iteración

- Edición de registros, revisión/corrección de resultados de IA y efecto de esos cambios sobre los datos derivados.
- Resolución de menciones ambiguas de alumnos.
- Comportamiento del procesamiento cuando falle la IA, incluidos los reintentos.

Estas decisiones no cambian el núcleo del MVP: registrar información humana, extraer temas y observaciones, consultar historiales y analizar el curso únicamente bajo demanda.
