# EduX — Cliente Web (Frontend)

Este directorio contiene el cliente web de **EduX**, la plataforma SaaS diseñada como copiloto pedagógico para docentes de robótica y tecnología.

Desarrollado para el Trabajo Práctico Integrador de **Desarrollo de Software Cloud (UTN FRLP, 2026)**.

---

## 🎨 Identidad Visual y Diseño

La interfaz sigue una **estética minimalista, limpia y enfocada en el contenido pedagógico**, basada en una paleta armónica:

- **Azules (Navy / Slate Blue):** Estructura institucional, tipografía jerárquica y acciones principales.
- **Celestes (Sky / Cyan):** Acentos tecnológicos, badges de temas extraídos por IA y pestañas activas.
- **Blancos y Slate Claro:** Fondos despejados, tarjetas con alto contraste y amplia legibilidad.
- **Verdes (Emerald):** Indicadores de progreso, estado activo de comisiones y sugerencias pedagógicas de IA.

---

## 🛠️ Stack Tecnológico

| Herramienta | Versión | Rol |
| :--- | :--- | :--- |
| **Next.js** | 16 (App Router) | Framework React para frontend y SSR/SSG |
| **React** | 19 | Biblioteca de componentes de interfaz |
| **TypeScript** | 5 (Modo estricto) | Tipado estático y seguridad de contratos |
| **Tailwind CSS** | 4 | Sistema de estilos utility-first con tema minimalista |
| **Lucide React** | ^1.79 | Iconografía limpia y consistente |

---

## 📂 Estructura del Proyecto

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Layout raíz (idioma es, tipografía limpia del sistema)
│   │   ├── globals.css        # Estilos globales y Tailwind CSS
│   │   ├── page.tsx           # Dashboard principal con métricas y resumen de bitácoras
│   │   ├── courses/
│   │   │   ├── page.tsx       # Catálogo de comisiones (activas e históricas)
│   │   │   └── [id]/page.tsx  # Detalle de comisión: encuentros, alumnos y análisis IA
│   │   ├── students/
│   │   │   ├── page.tsx       # Directorio y registro de alumnos
│   │   │   └── [id]/page.tsx  # Ficha de alumno con historial cronológico acumulado
│   │   ├── meetings/
│   │   │   └── new/page.tsx   # Registro de bitácora docente en lenguaje natural + IA
│   │   └── analysis/
│   │       └── page.tsx       # Generación bajo demanda del análisis del curso
│   ├── components/
│   │   ├── Navbar.tsx         # Barra superior de navegación y perfil docente
│   │   ├── Badge.tsx          # Componente reutilizable de etiquetas con variantes temáticas
│   │   └── StatCard.tsx       # Tarjetas de estadísticas y métricas
│   ├── lib/
│   │   ├── mock-data.ts       # Datos realistas de prueba alineados a la especificación funcional
│   │   └── utils.ts           # Funciones auxiliares de formateo de fechas y cálculo de edad
│   └── types/
│       └── index.ts           # Interfaces TypeScript estrictas (Teacher, Course, Student, Meeting, CourseAnalysis)
├── package.json
└── tsconfig.json
```

---

## 🚀 Ejecución Local

### 1. Requisitos previos

- Node.js >= 22 (recomendado v24+)
- npm >= 10

### 2. Instalación de dependencias

Desde la raíz del repositorio o dentro de `frontend/`:

```bash
cd frontend
npm install
```

### 3. Servidor de desarrollo

```bash
npm run dev
```

La aplicación quedará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🔍 Comandos de Calidad y Verificación

Antes de abrir o integrar un Pull Request, ejecutar las validaciones requeridas por las directrices del proyecto:

```bash
# Verificación estricta de tipos TypeScript
npm run typecheck

# Análisis estático de código con ESLint
npm run lint

# Compilación optimizada para producción (Turbopack)
npm run build
```

---

## 📋 Alineación con la Especificación Funcional (MVP)

- **CU-01 (Espacio docente):** Navegación protegida con contexto de docente activo.
- **CU-02 (Cursos/Comisiones):** Creación, filtrado por estado activo/inactivo y consulta de horarios.
- **CU-03 (Alumnos):** Registro con nombre, fecha de nacimiento, género y vinculación a múltiples cursos.
- **CU-04 (Registro de encuentro):** Carga en lenguaje natural con único texto por fecha y extracción estructurada por IA (`topics`, `generalObservation`, `studentObservations`).
- **CU-05 (Historial del curso):** Recorrido cronológico de bitácoras y datos estructurados.
- **CU-06 (Historial del alumno):** Consulta transversal de observaciones acumuladas con referencia al encuentro original.
- **CU-07 (Análisis bajo demanda):** Generación de resumen general y recomendaciones que reemplazan al resultado anterior con fecha de emisión.
