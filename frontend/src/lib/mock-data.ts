import { Teacher, Course, Student, Meeting, CourseAnalysis } from "@/types";

export const mockTeacher: Teacher = {
  id: "teacher-1",
  cognitoSub: "cognito-usr-7489-milagros",
  name: "Prof. Milagros Martínez",
  email: "milagros.martinez@edux.edu.ar",
};

export const mockCourses: Course[] = [
  {
    id: "course-1",
    teacherId: "teacher-1",
    name: "Robótica con Spike Prime — Comisión A",
    level: "Inicial",
    dayOfWeek: "Jueves",
    timeSlot: "17:30 - 19:00",
    isActive: true,
    studentCount: 4,
    meetingCount: 3,
    description: "Taller introductorio de robótica educativa, mecanismos básicos, sensores y programación por bloques.",
  },
  {
    id: "course-2",
    teacherId: "teacher-1",
    name: "Arduino & Sensores IoT — Nivel 2",
    level: "Intermedio",
    dayOfWeek: "Martes",
    timeSlot: "18:00 - 19:30",
    isActive: true,
    studentCount: 3,
    meetingCount: 2,
    description: "Desarrollo de circuitos electrónicos, microcontroladores y prototipado con sensores digitales y analógicos.",
  },
  {
    id: "course-3",
    teacherId: "teacher-1",
    name: "LEGO WeDo 2.0 — Creativos",
    level: "Inicial",
    dayOfWeek: "Sábado",
    timeSlot: "10:00 - 11:30",
    isActive: false,
    studentCount: 2,
    meetingCount: 4,
    description: "Ciclo anterior finalizado. Comisión conservada en modo consulta histórica.",
  },
];

export const mockStudents: Student[] = [
  {
    id: "student-1",
    firstName: "Juan",
    lastName: "Pérez",
    birthDate: "2014-05-12",
    gender: "male",
    enrolledCourseIds: ["course-1", "course-2"],
  },
  {
    id: "student-2",
    firstName: "Romina",
    lastName: "Gómez",
    birthDate: "2013-11-20",
    gender: "female",
    enrolledCourseIds: ["course-1"],
  },
  {
    id: "student-3",
    firstName: "Mateo",
    lastName: "Silva",
    birthDate: "2015-02-14",
    gender: "male",
    enrolledCourseIds: ["course-1"],
  },
  {
    id: "student-4",
    firstName: "Lucía",
    lastName: "Díaz",
    birthDate: "2014-08-30",
    gender: "female",
    enrolledCourseIds: ["course-2"],
  },
  {
    id: "student-5",
    firstName: "Tomás",
    lastName: "Benítez",
    birthDate: "2013-09-05",
    gender: "male",
    enrolledCourseIds: ["course-1", "course-2", "course-3"],
  },
];

export const mockMeetings: Meeting[] = [
  {
    id: "meeting-1",
    courseId: "course-1",
    date: "2026-11-19",
    teacherLog:
      "Hoy vimos sensores ultrasónicos. El grupo participó con entusiasmo y probamos distancias mínimas de detección. A Juan le costó conectar el sensor a los puertos correctos, pero Romina completó la actividad con rapidez y ayudó a sus compañeros a calibrar los umbrales.",
    topics: ["Sensores ultrasónicos", "Medición de distancias", "Trabajo colaborativo", "Calibración de puertos"],
    generalObservation:
      "El grupo demostró gran motivación y comprensión del concepto de eco y tiempo de respuesta del sensor.",
    studentObservations: [
      {
        studentId: "student-1",
        studentName: "Juan Pérez",
        observation: "Presentó dudas con el mapeo de puertos de entrada en el hub, necesitando asistencia guiada para el conexionado.",
      },
      {
        studentId: "student-2",
        studentName: "Romina Gómez",
        observation: "Resolvió la programación del sensor antes del tiempo estimado y ejerció un rol de liderazgo pedagógico con sus pares.",
      },
    ],
    createdAt: "2026-11-19T19:15:00Z",
  },
  {
    id: "meeting-2",
    courseId: "course-1",
    date: "2026-11-12",
    teacherLog:
      "Construcción de chasis móvil con tracción diferencial y dos servomotores. Explicamos bucles infinitos en Scratch. Mateo tuvo dificultades con el encastre de engranajes desmultiplicadores, pero logró que el móvil avance en línea recta.",
    topics: ["Tracción diferencial", "Servomotores", "Bucles de repetición", "Relación de transmisión mecánica"],
    generalObservation:
      "Buena dinámica general en el ensamble de las piezas mecánicas estructurales. Todos los equipos terminaron su chasis funcional.",
    studentObservations: [
      {
        studentId: "student-3",
        studentName: "Mateo Silva",
        observation: "Requirió apoyo en la alineación de ejes y engranajes coronados para evitar fricción mecánica.",
      },
      {
        studentId: "student-1",
        studentName: "Juan Pérez",
        observation: "Comprendió con claridad la lógica de giro invirtiendo el sentido de rotación de un motor.",
      },
    ],
    createdAt: "2026-11-12T19:10:00Z",
  },
  {
    id: "meeting-3",
    courseId: "course-1",
    date: "2026-11-05",
    teacherLog:
      "Introducción al entorno de programación y primer parpadeo de matriz de luces LED. Dinámica muy participativa, sin incidencias de hardware.",
    topics: ["Entorno de programación", "Matriz LED 5x5", "Eventos de inicio"],
    generalObservation:
      "Clase fluida y dinámica. Todos los alumnos asimilaron la carga de código en el hub sin dificultades individuales significativas.",
    studentObservations: [],
    createdAt: "2026-11-05T19:05:00Z",
  },
  {
    id: "meeting-4",
    courseId: "course-2",
    date: "2026-11-17",
    teacherLog:
      "Lectura analógica con potenciómetros y modulación PWM en LEDs. Tomás comprendió la conversión ADC rápidamente. Lucía necesitó afianzar el código de cálculo de escala con map().",
    topics: ["Potenciómetros", "Entradas analógicas (ADC)", "Modulación PWM", "Función map()"],
    generalObservation:
      "Excelente nivel de concentración; el trabajo con protoboard demandó orden en el cableado de jumpers.",
    studentObservations: [
      {
        studentId: "student-5",
        studentName: "Tomás Benítez",
        observation: "Destacada comprensión de los valores de 0 a 1023 y su mapeo al rango de 8 bits.",
      },
      {
        studentId: "student-4",
        studentName: "Lucía Díaz",
        observation: "Dificultades iniciales con la sintaxis de la función map(); se reforzó con ejemplos gráficos.",
      },
    ],
    createdAt: "2026-11-17T19:40:00Z",
  },
];

export const mockCourseAnalyses: Record<string, CourseAnalysis> = {
  "course-1": {
    id: "analysis-1",
    courseId: "course-1",
    generatedAt: "2026-11-20T10:30:00Z",
    summary:
      "La comisión muestra un ritmo sostenido de evolución en la comprensión algorítmica y la aplicación práctica de componentes robóticos. Las principales fortalezas radican en la cooperación y la resolución de desafíos con sensores. Se observa una oportunidad de mejora en la precisión mecánica y conexionado físico inicial de cables en algunos alumnos.",
    recommendations: [
      "Dedicar los primeros 10 minutos de la próxima clase a un mini-taller de verificación de puertos y cableado antes de programar.",
      "Emparejar a estudiantes con mayor solvencia mecánica con quienes necesitan más tiempo en el encastre de piezas.",
      "Introducir condicionales simples basados en las lecturas del sensor ultrasónico ya asimilado.",
    ],
  },
};
