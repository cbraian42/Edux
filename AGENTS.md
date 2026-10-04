# Reglas y Estándares para Agentes de IA en EDUX

Este documento establece las directrices y estándares comunes para cualquier asistente o agente de desarrollo basado en IA (Codex, Antigravity, Cursor, Claude Code, GitHub Copilot, etc.) que opere en el repositorio de **EDUX**.

Las configuraciones específicas de cada herramienta (por ejemplo `.cursorrules`, configuración de Antigravity o sidecars) deben **complementar** este archivo y nunca contradecirlo.

---

## 1. Contexto del Proyecto

* **Propósito:** EDUX es una plataforma SaaS diseñada como copiloto pedagógico para docentes de robótica y tecnología. Permite registrar bitácoras de clase en lenguaje natural, estructurar resúmenes mediante IA (temas, dificultades, sugerencias) y hacer seguimiento evolutivo por comisión.
* **Marco:** Trabajo Práctico Integrador de *Desarrollo de Software Cloud (UTN FRLP, 2026)*.
* **Prioridad:** Calidad arquitectónica, justificación de costos/escalabilidad en la nube, seguridad y mantenibilidad.

---

## 2. Fuentes de Verdad Documentales

Ante cualquier duda sobre alcance, decisiones previas o diseño técnico, el agente debe consultar obligatoriamente:
1. `README.md`: Visión del producto, alcance del MVP, arquitectura general y forma de trabajo.
2. `AI-DECISIONS.md`: Registro histórico de decisiones técnicas asistidas por IA y su justificación.
3. `docs/architecture/`: Diagramas de arquitectura cloud oficiales (`.drawio`, `.pdf`).
4. Issues y PRs en GitHub: Requisitos funcionales detallados y criterios de aceptación específicos de cada tarea.

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
  * PostgreSQL gestionado en Supabase.
  * Sin secretos o credenciales en código fuente (uso estricto de variables de entorno / `.env.example`).
* **Inteligencia Artificial y Seguridad:**
  * Amazon Bedrock consumido **exclusivamente desde el backend (AWS Lambda)**.
  * El cliente web **nunca** debe interactuar directamente con los servicios de IA ni exponer credenciales cloud.
  * Autenticación y autorización gestionada vía Amazon Cognito.

---

## 4. Convenciones de Desarrollo y Código

* **Idioma:**
  * Código, variables, nombres de funciones y rutas en **inglés** o según el estándar preexistente en el módulo.
  * Documentación, issues, commits y comentarios explicativos en **español**.
* **Tipado estricto:** TypeScript en modo estricto en frontend y backend. Prohibido el uso indiscriminado de `any`.
* **Mensajes de Commit:** Seguir la especificación de **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
* **Manejo de Git por Agentes:**
  * **PROHIBICIÓN ESTRICTA:** El agente NO debe realizar `git commit` ni `git push` automáticos salvo autorización expresa del usuario.
  * El usuario revisará, comiteará y pusheará los cambios en las ramas correspondientes.

---

## 5. Estrategia de Testing y Calidad

* Antes de dar por finalizada una tarea en código, el agente debe validar localmente (o solicitar al usuario validar):
  * Typecheck (`npm run typecheck` o `tsc --noEmit`).
  * Linter (`npm run lint`).
  * Compilación (`npm run build`).
  * Tests automatizados (`npm test`) a medida que se incorporen suites de prueba.
* No se deben alterar pruebas existentes para forzar que pasen sin justificación técnica válida.

---

## 6. Comportamiento Esperado del Agente

1. **Claridad sobre velocidad:** Antes de realizar refactorizaciones mayores o tocar múltiples módulos, presentar un plan o borrador.
2. **Registro de IA:** Cuando la intervención del agente derive en una decisión técnica relevante o cambio de arquitectura, se debe redactar o actualizar la entrada correspondiente en `AI-DECISIONS.md`.
3. **Mínimo impacto necesario:** Modificar únicamente los archivos asociados al issue asignado, evitando reescrituras de archivos adyacentes o formateos globales innecesarios.
