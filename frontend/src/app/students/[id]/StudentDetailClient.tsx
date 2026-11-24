"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  BookOpen,
  Sparkles,
  UserCheck,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/Badge";
import {
  mockCourses,
  mockMeetings,
} from "@/lib/mock-data";
import { formatDate, calculateAge } from "@/lib/utils";
import { Student } from "@/types";

interface StudentDetailClientProps {
  student: Student;
}

export function StudentDetailClient({ student }: StudentDetailClientProps) {
  const enrolledCourses = mockCourses.filter((c) =>
    student.enrolledCourseIds.includes(c.id)
  );

  // Extract all observations across all meetings for this student
  const studentObservationsList: {
    meetingId: string;
    courseId: string;
    courseName: string;
    date: string;
    observation: string;
    teacherLog: string;
  }[] = [];

  mockMeetings.forEach((meeting) => {
    meeting.studentObservations.forEach((obs) => {
      if (obs.studentId === student.id) {
        const course = mockCourses.find((c) => c.id === meeting.courseId);
        studentObservationsList.push({
          meetingId: meeting.id,
          courseId: meeting.courseId,
          courseName: course?.name || "Curso",
          date: meeting.date,
          observation: obs.observation,
          teacherLog: meeting.teacherLog,
        });
      }
    });
  });

  // Sort descending by meeting date
  studentObservationsList.sort((a, b) => b.date.localeCompare(a.date));

  const age = calculateAge(student.birthDate);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/students" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver a Alumnos</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">
            {student.firstName} {student.lastName}
          </span>
        </div>

        {/* Student Profile Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-600 to-emerald-500 text-white font-bold text-xl shadow-sm">
                {student.firstName[0]}
                {student.lastName[0]}
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  {age} años • Fecha de nacimiento: {formatDate(student.birthDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="blue" size="md">
                {studentObservationsList.length} observaciones registradas
              </Badge>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 mr-2">
              Comisiones vinculadas:
            </span>
            {enrolledCourses.map((c) => (
              <Link key={c.id} href={`/courses/${c.id}`}>
                <Badge variant="celeste" size="md" className="hover:bg-sky-100">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {c.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Cumulative History Section */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Historial Pedagógico Individual (Cronológico)
            </h2>
            <p className="text-xs text-slate-500">
              Observaciones extraídas automáticamente de los encuentros donde participó el alumno
            </p>
          </div>

          {studentObservationsList.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <UserCheck className="h-10 w-10 text-slate-400 mx-auto" />
              <h3 className="mt-3 text-sm font-bold text-slate-800">
                Sin observaciones individuales registradas
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                Las observaciones se detectan y asocian automáticamente al registrar bitácoras docentes que mencionen al alumno.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {studentObservationsList.map((entry, idx) => (
                <article
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                        {entry.courseName}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {formatDate(entry.date)}
                      </span>
                    </div>

                    <Link
                      href={`/courses/${entry.courseId}`}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1"
                    >
                      <span>Ver clase completa</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Extracted observation */}
                  <div className="rounded-lg bg-sky-50/60 p-3.5 border border-sky-100">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-900 mb-1">
                      <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                      <span>Observación individual extraída por IA:</span>
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      {entry.observation}
                    </p>
                  </div>

                  {/* Original Teacher Log Context */}
                  <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <span className="font-semibold text-slate-600 block mb-0.5">
                      Texto original de la docente en el encuentro:
                    </span>
                    <p className="italic text-slate-600">&ldquo;{entry.teacherLog}&rdquo;</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
