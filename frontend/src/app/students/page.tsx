"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/Badge";
import { mockStudents, mockCourses } from "@/lib/mock-data";
import { formatDate, calculateAge } from "@/lib/utils";
import { Student, Gender } from "@/types";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New student form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("2014-06-15");
  const [gender, setGender] = useState<Gender>("unspecified");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const filteredStudents = students.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleToggleCourse = (courseId: string) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    const newStudent: Student = {
      id: `student-${Date.now()}`,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      birthDate,
      gender,
      enrolledCourseIds: selectedCourses,
    };

    setStudents([...students, newStudent]);
    setIsModalOpen(false);
    setFirstName("");
    setLastName("");
    setSelectedCourses([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Directorio de Alumnos
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Registro de estudiantes, vinculaciones entre comisiones e historiales pedagógicos individuales
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <Plus className="h-4 w-4" />
            <span>Registrar Alumno</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o apellido..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
          />
        </div>

        {/* Students List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStudents.map((student) => {
            const age = calculateAge(student.birthDate);
            const enrolledCourses = mockCourses.filter((c) =>
              student.enrolledCourseIds.includes(c.id)
            );

            return (
              <div
                key={student.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-sky-100 text-blue-800 font-bold text-sm border border-sky-200">
                        {student.firstName[0]}
                        {student.lastName[0]}
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          {student.firstName} {student.lastName}
                        </h2>
                        <p className="text-xs text-slate-500">
                          {age} años • Nac.: {formatDate(student.birthDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 block mb-2">
                      Cursos / Comisiones asociadas:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {enrolledCourses.length > 0 ? (
                        enrolledCourses.map((c) => (
                          <Badge key={c.id} variant="blue" size="sm">
                            {c.name}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          Sin comisiones asignadas
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {student.enrolledCourseIds.length} comisión(es)
                  </span>
                  <Link
                    href={`/students/${student.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    <span>Ver historial individual</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modal: Registrar Alumno */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">
              Registrar Nuevo Alumno
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Ingresá los datos del alumno y vinculalo a los cursos de robótica correspondientes
            </p>

            <form onSubmit={handleCreateStudent} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej: Mateo"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej: Silva"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fecha de Nacimiento *
                  </label>
                  <input
                    type="date"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Género
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="male">Masculino</option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                    <option value="unspecified">No especificado</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Vincular a Comisiones / Cursos:
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto rounded-lg border border-slate-200 p-2.5 bg-slate-50/50">
                  {mockCourses.map((course) => (
                    <label
                      key={course.id}
                      className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer p-1 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleToggleCourse(course.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium">{course.name}</span>
                      <span className="text-slate-400">({course.dayOfWeek})</span>
                    </label>
                  ))}
                </div>
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
                  Guardar Alumno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
