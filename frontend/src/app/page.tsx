import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  PenSquare,
  Sparkles,
  Bot,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/Badge";
import {
  mockCourses,
  mockStudents,
  mockMeetings,
  mockCourseAnalyses,
  mockTeacher,
} from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const activeCourses = mockCourses.filter((c) => c.isActive);
  const recentMeetings = mockMeetings.slice(0, 3);
  const featuredAnalysis = mockCourseAnalyses["course-1"];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome & Context Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900 p-6 sm:p-8 text-white shadow-md">
          <div className="absolute right-0 top-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 -mb-8 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sky-200 backdrop-blur-sm border border-white/10">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                <span>Copiloto de Robótica y Tecnología</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Bienvenida, {mockTeacher.name.split(" ")[1]}
              </h1>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Registrá tus bitácoras de clase en lenguaje natural. EduX organiza los contenidos trabajados,
                detecta dificultades y genera resúmenes evolutivos por comisión con IA.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/meetings/new"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-blue-900"
              >
                <PenSquare className="h-4 w-4" />
                <span>Registrar Bitácora</span>
              </Link>
              <Link
                href="/analysis"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <Sparkles className="h-4 w-4 text-sky-300" />
                <span>Análisis de Cursos</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Cursos Activos"
            value={activeCourses.length}
            subtitle={`${mockCourses.length} comisiones registradas en total`}
            icon={BookOpen}
            variant="blue"
          />
          <StatCard
            title="Alumnos Registrados"
            value={mockStudents.length}
            subtitle="Con vinculaciones activas"
            icon={Users}
            variant="celeste"
          />
          <StatCard
            title="Bitácoras de Encuentros"
            value={mockMeetings.length}
            subtitle="Textos docentes procesados con IA"
            icon={MessageSquare}
            variant="green"
          />
          <StatCard
            title="Asistente de IA"
            value="Activo"
            subtitle="Amazon Bedrock (Claude / Titan)"
            icon={Bot}
            variant="slate"
          />
        </section>

        {/* Main Content: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Recent Class Meetings (2 Cols span) */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Encuentros Recientes y Extracción de IA
                </h2>
                <p className="text-xs text-slate-500">
                  Bitácoras docentes originales junto a los temas y observaciones estructuradas
                </p>
              </div>
              <Link
                href="/courses"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Ver todos los cursos
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentMeetings.map((meeting) => {
                const course = mockCourses.find((c) => c.id === meeting.courseId);
                return (
                  <article
                    key={meeting.id}
                    className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs hover:border-slate-300 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          {course?.name}
                        </span>
                        <Badge variant="blue" size="sm">
                          {course?.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{formatDate(meeting.date)}</span>
                      </div>
                    </div>

                    {/* Teacher's raw note */}
                    <div className="mt-3.5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Registro Docente (Original)
                      </h3>
                      <p className="text-sm text-slate-700 bg-slate-50/70 p-3 rounded-lg border border-slate-100 italic leading-relaxed">
                        &ldquo;{meeting.teacherLog}&rdquo;
                      </p>
                    </div>

                    {/* AI Structured Extraction */}
                    <div className="mt-4 space-y-3 rounded-lg bg-sky-50/40 p-3.5 border border-sky-100">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-800">
                        <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                        <span>Extracción de IA (AWS Bedrock)</span>
                      </div>

                      {/* Topics */}
                      {meeting.topics.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-xs text-slate-500 font-medium mr-1">
                            Temas tratados:
                          </span>
                          {meeting.topics.map((topic, i) => (
                            <Badge key={i} variant="celeste" size="sm">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* General Observation */}
                      {meeting.generalObservation && (
                        <div className="text-xs text-slate-700 bg-white/80 p-2.5 rounded-md border border-sky-100">
                          <span className="font-semibold text-slate-900 block mb-0.5">
                            Observación general del grupo:
                          </span>
                          {meeting.generalObservation}
                        </div>
                      )}

                      {/* Individual Student Observations */}
                      {meeting.studentObservations.length > 0 ? (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-xs font-semibold text-slate-700 block">
                            Observaciones individuales detectadas:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {meeting.studentObservations.map((obs, i) => (
                              <div
                                key={i}
                                className="text-xs bg-white p-2 rounded border border-slate-200/70"
                              >
                                <span className="font-semibold text-blue-900 block">
                                  {obs.studentName}
                                </span>
                                <span className="text-slate-600 text-[11px] leading-relaxed">
                                  {obs.observation}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-500 italic">
                          Sin observaciones individuales específicas registradas en este encuentro.
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Right Column: Active Courses & IA Analysis Preview */}
          <aside className="space-y-6">
            {/* Active Courses List */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900">
                  Tus Cursos / Comisiones
                </h2>
                <Link
                  href="/courses"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  Gestionar
                </Link>
              </div>

              <div className="divide-y divide-slate-100 mt-2">
                {mockCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="group block py-3 hover:bg-slate-50 rounded-lg px-2 transition-colors -mx-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {course.name}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span>
                            {course.dayOfWeek} {course.timeSlot}
                          </span>
                        </div>
                      </div>
                      <Badge
                        variant={course.isActive ? "green" : "gray"}
                        size="sm"
                      >
                        {course.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                      <span>{course.studentCount} alumnos</span>
                      <span>•</span>
                      <span>{course.meetingCount} encuentros</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Course Analysis Preview Card */}
            {featuredAnalysis && (
              <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-sky-50/40 p-5 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span>Último Análisis del Curso (IA)</span>
                </div>
                <h3 className="mt-2 text-sm font-bold text-slate-900">
                  Robótica con Spike Prime
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {featuredAnalysis.summary}
                </p>

                <div className="mt-3 pt-3 border-t border-emerald-100/80">
                  <span className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                    Recomendaciones pedagógicas destacadas:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {featuredAnalysis.recommendations.slice(0, 2).map((rec, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/analysis"
                  className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white border border-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-xs"
                >
                  <span>Ver análisis completo del curso</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">EduX</span>
            <span>—</span>
            <span>TPI Desarrollo de Software Cloud (UTN FRLP, 2026)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Next.js en Vercel</span>
            <span>•</span>
            <span>AWS Lambda & Bedrock</span>
            <span>•</span>
            <span>Supabase PostgreSQL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
