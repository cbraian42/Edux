# Reglas y Estándares para Agentes de IA en EDUX

Este documento establece las directrices y estándares comunes para cualquier asistente o agente de desarrollo basado en IA (Codex, Antigravity, Cursor, Claude Code, GitHub Copilot, etc.) que opere en el repositorio de **EDUX**.

Las configuraciones específicas de cada herramienta (por ejemplo `.cursorrules`, configuración de Antigravity o sidecars) deben **complementar** este archivo y nunca contradecirlo.

---

## 1. Contexto del Proyecto

* **Propósito:** EDUX es una plataforma SaaS diseñada como copiloto pedagógico para docentes de robótica y tecnología. Permite registrar bitácoras de clase en lenguaje natural, estructurar resúmenes mediante IA (temas, dificultades, sugerencias) y hacer seguimiento evolutivo por comisión.
* **Marco:** Trabajo Práctico Integrador de *Desarrollo de Software Cloud (UTN FRLP, 2026)*.
* **Prioridad:** Calidad arquitectónica, justificación de costos/escalabilidad en la nube, seguridad y mantenibilidad.

---

## 2. Fuentes de Verdad Documentales y Especificación

Ante cualquier duda sobre alcance, decisiones previas o diseño técnico, el agente debe consultar obligatoriamente la documentación técnica vigente:
1. `README.md`: Visión del producto, alcance del MVP, arquitectura general y forma de trabajo.
2. `docs/functional-specification.md`: Especificación funcional, casos de uso (CU-01 a CU-07), criterios de aceptación y reglas de negocio del MVP.
3. `docs/data-model.md`: Modelo conceptual y lógico de datos, entidades, relaciones y diagrama ER oficial.
4. `docs/architecture/`: Diagramas de arquitectura cloud oficiales (`.drawio`, `.pdf`).
5. Código fuente y contratos en `backend/` y `frontend/`.

> **Rol de `AI-DECISIONS.md`:** Es una **bitácora académica y registro histórico de trazabilidad** para documentar propuestas asistidas por IA y su validación humana, **no una especificación técnica vigente**. Debe seguir siendo obligatorio registrar allí las decisiones técnicas y cambios arquitectónicos relevantes.

---

## 3. Restricciones Arquitectónicas y Tecnológicas

* **Frontend:**
  * Next.js con TypeScript.
  * Despliegue objetivo: Vercel.
  * Estilos limpios y componentes desacoplados.
* **Backend:**
  * Node.js con TypeScript estructurado para AWS Lambda.
  * Exposición de endpoints mediante Amazon API Gateway (HTTP/REST).
  * Enfoque serverless: funciones stateless, livianas y de inicio rápido.
* **Persistencia:**
  * PostgreSQL gestionado en Supabase (utilizado como base de datos relacional administrada, no como proveedor de autenticación).
  * Sin secretos o credenciales en código fuente (uso estricto de variables de entorno y `.env.example`).
* **Inteligencia Artificial y Seguridad:**
  * Amazon Bedrock consumido **exclusivamente desde el backend (AWS Lambda)**.
  * El cliente web **nunca** debe interactuar directamente con los servicios de IA ni exponer credenciales cloud.
  * Autenticación y autorización gestionada vía Amazon Cognito.

---

## 4. Convenciones de Desarrollo y Código

* **Estrategia y Nombrado de Ramas:**
  Las ramas de trabajo deben seguir obligatoriamente la convención desde su creación:
  ```text
  <tipo>/<nro-issue>-<descripcion-corta>
  ```
  * `feat/<issue>-<descripcion>`: Nuevas funcionalidades (ej: `feat/4-inicializar-backend`).
  * `fix/<issue>-<descripcion>`: Corrección de errores.
  * `docs/<issue>-<descripcion>`: Documentación o especificación (ej: `docs/12-estandarizar-agentes-ia`).
  * `chore/<issue>-<descripcion>`: Tareas de mantenimiento o configuración.
* **Idioma:**
  * Código, variables, nombres de funciones y rutas en **inglés**.
  * Documentación, issues, mensajes de commit y comentarios explicativos en **español**.
* **Tipado estricto:** TypeScript en modo estricto en frontend y backend. Prohibido el uso de `any` sin justificación explícita.
* **Mensajes de Commit:** Seguir la especificación de **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
* **Manejo de Git por Agentes:**
  * **PROHIBICIÓN ESTRICTA:** El agente NO debe realizar `git commit` ni `git push` automáticos salvo autorización expresa del usuario. El usuario revisará, comiteará y pusheará los cambios.

---

## 5. Estrategia de Testing y Calidad

* Antes de dar por finalizada una tarea en código, el agente debe validar localmente (o solicitar al usuario validar):
  * Typecheck (`npm run typecheck` o `tsc --noEmit`).
  * Linter (`npm run lint`).
  * Compilación (`npm run build`).
  * Tests automatizados (`npm test`) a medida que se incorporen suites de prueba.
* No se deben alterar pruebas existentes para forzar que pasen sin justificación técnica válida.

---

## 6. Comportamiento Esperado y Gobernanza

1. **Revisión y Aprobación Cruzada Obligatoria:** Ninguna rama de trabajo se integrará a `main` sin la apertura de un Pull Request, la solicitud de review al otro integrante del equipo y su **aprobación formal expresa**.
2. **Vinculación de Issues en PRs:** Todo Pull Request debe incluir en su descripción la referencia de cierre automático mediante `Closes #<nro>` cuando resuelva el issue por completo.
3. **Claridad sobre velocidad:** Antes de realizar refactorizaciones mayores o tocar múltiples módulos, presentar un plan o borrador.
4. **Registro de IA:** Cuando la intervención del agente derive en una decisión técnica relevante o cambio de arquitectura, se debe redactar o actualizar la entrada correspondiente en `AI-DECISIONS.md`.
5. **Mínimo impacto necesario:** Modificar únicamente los archivos asociados al issue asignado, evitando reescrituras de archivos adyacentes o formateos globales innecesarios.
