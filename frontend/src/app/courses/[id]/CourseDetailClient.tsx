"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  PenSquare,
  Sparkles,
  ChevronRight,
  AlertCircle,
  FileText,
  UserCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/Badge";
import {
  mockMeetings,
  mockStudents,
  mockCourseAnalyses,
} from "@/lib/mock-data";
import { formatDate, formatDateTime, calculateAge } from "@/lib/utils";
import { Course, CourseAnalysis } from "@/types";

interface CourseDetailClientProps {
  course: Course;
}

export function CourseDetailClient({ course }: CourseDetailClientProps) {
  const [activeTab, setActiveTab] = useState<"meetings" | "students" | "analysis">("meetings");
  const [analysis, setAnalysis] = useState<CourseAnalysis | null>(mockCourseAnalyses[course.id] || null);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  const meetings = mockMeetings.filter((m) => m.courseId === course.id);
  const students = mockStudents.filter((s) => s.enrolledCourseIds.includes(course.id));

  const handleGenerateAnalysis = () => {
    setIsGeneratingAnalysis(true);
    setTimeout(() => {
      const newAnalysis: CourseAnalysis = {
        id: `analysis-${Date.now()}`,
        courseId: course.id,
        generatedAt: new Date().toISOString(),
        summary: `Análisis actualizado a partir de los ${meetings.length} encuentros registrados. La comisión muestra una sólida asimilación de conceptos prácticos de robótica y algoritmia. Se recomienda profundizar en la resolución autónoma de problemas de hardware y reforzar la calibración precisa de sensores en grupos rotativos.`,
        recommendations: [
          "Introducir mini-retos de depuración (debugging) de 15 minutos en duplas para encontrar fallas simuladas en el código.",
          "Fortalecer la documentación visual de los montajes robóticos antes del desmontaje final de piezas.",
          "Proponer un proyecto integrador que combine dos o más sensores diferentes simultáneamente.",
        ],
      };
      setAnalysis(newAnalysis);
      setIsGeneratingAnalysis(false);
      setActiveTab("analysis");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/courses" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver a Cursos</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{course.name}</span>
        </div>

        {/* Course Header Banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="blue" size="sm">
                  {course.level}
                </Badge>
                <Badge variant={course.isActive ? "green" : "gray"} size="sm">
                  {course.isActive ? "Comisión Activa" : "Comisión Inactiva (Histórico)"}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {course.name}
              </h1>
              {course.description && (
                <p className="text-sm text-slate-600 leading-relaxed">
                  {course.description}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              {course.isActive && (
                <Link
                  href={`/meetings/new?courseId=${course.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
                >
                  <PenSquare className="h-4 w-4" />
                  <span>+ Registrar Encuentro</span>
                </Link>
              )}
              <button
                type="button"
                onClick={handleGenerateAnalysis}
                disabled={isGeneratingAnalysis}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span>
                  {isGeneratingAnalysis ? "Generando análisis..." : "Generar análisis con IA"}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <span>
                <strong>Horario:</strong> {course.dayOfWeek} {course.timeSlot}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <span>
                <strong>Alumnos vinculados:</strong> {students.length} estudiantes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span>
                <strong>Encuentros registrados:</strong> {meetings.length} clases
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab("meetings")}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "meetings"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Encuentros y Bitácoras ({meetings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "students"
                ? "border-blue-600 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Alumnos ({students.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("analysis")}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === "analysis"
                ? "border-emerald-600 text-emerald-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Último Análisis de IA</span>
            {analysis && (
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            )}
          </button>
        </div>

        {/* Tab 1: Meetings & Logs */}
        {activeTab === "meetings" && (
          <div className="space-y-4">
            {meetings.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <Calendar className="h-10 w-10 text-slate-400 mx-auto" />
                <h3 className="mt-3 text-sm font-bold text-slate-800">
                  Aún no hay encuentros cargados
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  Registrá lo ocurrido en la primera clase en lenguaje natural para comenzar el seguimiento.
                </p>
                <Link
                  href={`/meetings/new?courseId=${course.id}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  <PenSquare className="h-3.5 w-3.5" />
                  <span>Registrar Primer Encuentro</span>
                </Link>
              </div>
            ) : (
              meetings.map((meeting) => (
                <article
                  key={meeting.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-bold text-slate-900">
                        Clase del {formatDate(meeting.date)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      Registrado el {formatDateTime(meeting.createdAt)}
                    </span>
                  </div>

                  {/* Teacher Original Text */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      Registro Docente en Lenguaje Natural
                    </h4>
                    <p className="text-sm text-slate-800 bg-slate-50/80 p-3.5 rounded-lg border border-slate-100 italic leading-relaxed">
                      &ldquo;{meeting.teacherLog}&rdquo;
                    </p>
                  </div>

                  {/* AI Extracted Structure */}
                  <div className="rounded-lg bg-sky-50/50 p-4 border border-sky-100 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                      <Sparkles className="h-4 w-4 text-sky-600" />
                      <span>Estructuración por IA (Extracción de Clase)</span>
                    </div>

                    {/* Topics */}
                    <div>
                      <span className="text-xs font-medium text-slate-600 block mb-1">
                        Temas tratados en el encuentro:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {meeting.topics.map((t, idx) => (
                          <Badge key={idx} variant="celeste" size="sm">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* General observation */}
                    {meeting.generalObservation && (
                      <div className="text-xs text-slate-700 bg-white p-3 rounded border border-sky-100">
                        <span className="font-semibold text-slate-900 block mb-0.5">
                          Observación general de la clase / grupo:
                        </span>
                        {meeting.generalObservation}
                      </div>
                    )}

                    {/* Student observations */}
                    {meeting.studentObservations.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-medium text-slate-700 block">
                          Observaciones individuales vinculadas a alumnos:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {meeting.studentObservations.map((obs, idx) => (
                            <div
                              key={idx}
                              className="text-xs bg-white p-2.5 rounded border border-slate-200"
                            >
                              <Link
                                href={`/students/${obs.studentId}`}
                                className="font-semibold text-blue-700 hover:underline block mb-0.5"
                              >
                                {obs.studentName} →
                              </Link>
                              <span className="text-slate-600 text-[11px] leading-relaxed">
                                {obs.observation}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Enrolled Students */}
        {activeTab === "students" && (
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Estudiantes Vinculados
                </h3>
                <p className="text-xs text-slate-500">
                  Alumnos inscritos en esta comisión y acceso a su historial individual acumulado
                </p>
              </div>
              <Link
                href="/students"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Directorio general de alumnos →
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {students.map((student) => {
                const age = calculateAge(student.birthDate);
                return (
                  <div
                    key={student.id}
                    className="p-4 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-800 font-semibold text-xs border border-sky-200">
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {student.firstName} {student.lastName}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {age} años • Nacimiento: {formatDate(student.birthDate)}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/students/${student.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <span>Ver historial del alumno</span>
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: AI Analysis */}
        {activeTab === "analysis" && (
          <div className="space-y-6">
            {analysis ? (
              <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 via-white to-sky-50/30 p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-emerald-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-emerald-600" />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Último Análisis del Curso
                      </h3>
                      <p className="text-xs text-slate-500">
                        Último análisis de IA generado el: <strong>{formatDateTime(analysis.generatedAt)}</strong>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateAnalysis}
                    disabled={isGeneratingAnalysis}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Regenerar análisis</span>
                  </button>
                </div>

                {/* Synthesis */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Resumen General de Evolución del Curso
                  </h4>
                  <p className="text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-emerald-100/80 shadow-2xs">
                    {analysis.summary}
                  </p>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Propuestas y Recomendaciones Pedagógicas Sugeridas
                  </h4>
                  <div className="space-y-2.5">
                    {analysis.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {rec}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-3 text-[11px] text-slate-500 border border-slate-200 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>
                    El análisis de IA es una herramienta de apoyo pedagógico. Cada nuevo análisis generado reemplaza al anterior conservando la fecha de emisión.
                  </span>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-emerald-300 bg-white p-12 text-center">
                <Sparkles className="h-10 w-10 text-emerald-500 mx-auto" />
                <h3 className="mt-3 text-sm font-bold text-slate-800">
                  No hay análisis generado todavía para esta comisión
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  La IA analizará todo el historial disponible para responder: ¿cómo venimos y qué podríamos mejorar?
                </p>
                <button
                  type="button"
                  onClick={handleGenerateAnalysis}
                  disabled={isGeneratingAnalysis}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Generar Resumen General y Recomendaciones</span>
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
