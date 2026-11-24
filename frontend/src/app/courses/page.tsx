"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Clock,
  Users,
  Calendar,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/Badge";
import { mockCourses } from "@/lib/mock-data";
import { Course } from "@/types";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New course form state
  const [newName, setNewName] = useState("");
  const [newLevel, setNewLevel] = useState<"Inicial" | "Intermedio" | "Avanzado">("Inicial");
  const [newDay, setNewDay] = useState<"Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado">("Lunes");
  const [newTime, setNewTime] = useState("17:30 - 19:00");
  const [newDescription, setNewDescription] = useState("");

  const filteredCourses = courses.filter((c) => {
    if (filter === "active") return c.isActive;
    if (filter === "inactive") return !c.isActive;
    return true;
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      teacherId: "teacher-1",
      name: newName.trim(),
      level: newLevel,
      dayOfWeek: newDay,
      timeSlot: newTime.trim(),
      isActive: true,
      studentCount: 0,
      meetingCount: 0,
      description: newDescription.trim() || undefined,
    };

    setCourses([newCourse, ...courses]);
    setIsModalOpen(false);
    setNewName("");
    setNewDescription("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Cursos y Comisiones
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Administrá tus grupos de robótica, revisá encuentros cargados y generá análisis pedagógicos
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva Comisión</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Filter className="h-4 w-4 text-slate-400 mr-1" />
          <span className="text-xs font-semibold text-slate-600 mr-2">Filtrar:</span>
          {(
            [
              { id: "all", label: "Todos los cursos" },
              { id: "active", label: "Activos" },
              { id: "inactive", label: "Inactivos (históricos)" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === tab.id
                  ? "bg-sky-100 text-sky-800 font-semibold"
                  : "text-slate-600 hover:bg-slate-200/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="blue" size="sm">
                    {course.level}
                  </Badge>
                  <Badge
                    variant={course.isActive ? "green" : "gray"}
                    size="sm"
                  >
                    {course.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </div>

                <h2 className="mt-3 text-lg font-bold text-slate-900 leading-snug">
                  {course.name}
                </h2>

                {course.description && (
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                )}

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>
                      {course.dayOfWeek} • {course.timeSlot}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      {course.studentCount} alumnos vinculados
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {course.meetingCount} encuentros
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/courses/${course.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Ver detalle y bitácoras</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>

                {course.isActive && (
                  <Link
                    href={`/meetings/new?courseId=${course.id}`}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200 transition-colors"
                  >
                    <span>+ Bitácora</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal: Nueva Comisión */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              Crear Nueva Comisión
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Definí el nombre de la comisión, nivel y su horario de cursada habitual
            </p>

            <form onSubmit={handleCreateCourse} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre de la Comisión / Taller *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej: Robótica con Spike Prime — Nivel 1"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nivel
                  </label>
                  <select
                    value={newLevel}
                    onChange={(e) =>
                      setNewLevel(
                        e.target.value as "Inicial" | "Intermedio" | "Avanzado"
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Inicial">Inicial</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Día habitual
                  </label>
                  <select
                    value={newDay}
                    onChange={(e) =>
                      setNewDay(
                        e.target.value as
                          | "Lunes"
                          | "Martes"
                          | "Miércoles"
                          | "Jueves"
                          | "Viernes"
                          | "Sábado"
                      )
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Horario
                </label>
                <input
                  type="text"
                  placeholder="ej: 17:30 - 19:00"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Descripción pedagógica (opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Objetivos del taller, kits de robótica utilizados..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Guardar Comisión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
