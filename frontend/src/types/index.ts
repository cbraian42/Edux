export type Gender = "female" | "male" | "other" | "unspecified";

export interface Teacher {
  id: string;
  cognitoSub: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Course {
  id: string;
  teacherId: string;
  name: string;
  level: "Inicial" | "Intermedio" | "Avanzado";
  dayOfWeek: "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado";
  timeSlot: string; // e.g. "17:30 - 19:00"
  isActive: boolean;
  studentCount: number;
  meetingCount: number;
  description?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string; // ISO format "YYYY-MM-DD"
  gender: Gender;
  enrolledCourseIds: string[];
}

export interface StudentObservation {
  studentId: string;
  studentName: string;
  observation: string;
}

export interface Meeting {
  id: string;
  courseId: string;
  date: string; // ISO format "YYYY-MM-DD"
  teacherLog: string; // Natural language raw text written by the teacher
  topics: string[];
  generalObservation: string | null;
  studentObservations: StudentObservation[];
  createdAt: string;
}

export interface CourseAnalysis {
  id: string;
  courseId: string;
  generatedAt: string; // ISO date string
  summary: string;
  recommendations: string[];
}
