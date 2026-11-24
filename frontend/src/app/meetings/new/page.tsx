"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Bot,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/Badge";
import { mockCourses, mockStudents } from "@/lib/mock-data";

function NewMeetingContent() {
  const searchParams = useSearchParams();
  const initialCourseId = searchParams.get("courseId") || mockCourses[0].id;

  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [meetingDate, setMeetingDate] = useState("2026-11-24");
  const [teacherLog, setTeacherLog] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Extracted preview state
  const [previewResult, setPreviewResult] = useState<{
    topics: string[];
    generalObservation: string | null;
    studentObservations: { studentName: string; observation: string }[];
  } | null>(null);

  const courseStudents = mockStudents.filter((s) =>
    s.enrolledCourseIds.includes(selectedCourseId)
  );

  const samplePresets = [
    {
      title: "Sensores y trabajo en equipo",
      text: "Hoy trabajamos con sensores ultrasónicos en Spike Prime. El grupo participó con mucho entusiasmo resolviendo la calibración de umbrales. A Juan le costó conectar el sensor a los puertos correctos del hub, mientras que Romina completó la actividad con rapidez y apoyó a sus compañeros.",
    },
    {
      title: "Mecánica y bucles",
      text: "Construcción de chasis móvil con dos motores y trayectorias en bucle continuo. El grupo trabajó enfocado durante toda la clase. Mateo tuvo dificultades con el encastre de los engranajes pero logró que el robot avance en línea recta.",
    },
    {
      title: "Desafío grupal sin menciones individuales",
      text: "Prueba integral de algoritmos de evasión de obstáculos con lectura continua de distancia. Clase muy dinámica, todas las parejas alcanzaron el objetivo sin inconvenientes técnicos.",
    },
  ];

  const handleApplyPreset = (presetText: string) => {
    setTeacherLog(presetText);
    setPreviewResult(null);
  };

  const handleSimulateExtraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherLog.trim()) return;

    setIsProcessing(true);

    // Simulate Bedrock extraction latency
    setTimeout(() => {
      // Heuristic parsing for rich demo
      const lower = teacherLog.toLowerCase();
      const topics: string[] = [];
      if (lower.includes("sensor") || lower.includes("ultrasónico")) {
        topics.push("Sensores ultrasónicos", "Medición de distancias");
      }
      if (lower.includes("chasis") || lower.includes("motor") || lower.includes("engranaje")) {
        topics.push("Mecánica & Chasis", "Servomotores", "Relación de transmisión");
      }
      if (lower.includes("bucle") || lower.includes("algoritmo")) {
        topics.push("Estructuras de repetición (bucles)", "Lógica algorítmica");
      }
      if (topics.length === 0) {
        topics.push("Programación por bloques", "Robótica experimental");
      }

      let generalObservation: string | null = null;
      if (lower.includes("entusiasmo") || lower.includes("dinámica") || lower.includes("enfocado")) {
        generalObservation = "El grupo demostró gran concentración y articulación colaborativa en los desafíos propuestos.";
      } else {
        generalObservation = "Desarrollo general de clase acorde a los tiempos planificados.";
      }

      const studentObservations: { studentName: string; observation: string }[] = [];
      if (lower.includes("juan")) {
        studentObservations.push({
          studentName: "Juan Pérez",
          observation: "Mostró dudas iniciales en la conexión física del sensor; se acompañó el procedimiento.",
        });
      }
      if (lower.includes("romina")) {
        studentObservations.push({
          studentName: "Romina Gómez",
          observation: "Alta velocidad de resolución y proactividad para guiar al resto de los integrantes.",
        });
      }
      if (lower.includes("mateo")) {
        studentObservations.push({
          studentName: "Mateo Silva",
          observation: "Dificultad mecánica con el alineado de engranajes; superada tras ajuste asistido.",
        });
      }

      setPreviewResult({
        topics,
        generalObservation,
        studentObservations,
      });

      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/courses" className="hover:text-blue-600 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Volver a Cursos</span>
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Nueva Bitácora Docente</span>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Extracción de IA con Amazon Bedrock</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Registrar Encuentro de Clase
          </h1>
          <p className="text-sm text-slate-500">
            Escribí en lenguaje natural lo ocurrido durante el encuentro. EduX conservará tu registro original y la IA extraerá temas y observaciones.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
          <form onSubmit={handleSimulateExtraction} className="space-y-5">
            {/* Course & Date selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Comisión / Curso *
                </label>
                <select
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    setPreviewResult(null);
                  }}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  {mockCourses
                    .filter((c) => c.isActive)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.dayOfWeek} {c.timeSlot})
                      </option>
                    ))}
                </select>
                <p className="mt-1 text-[11px] text-slate-500">
                  {courseStudents.length} alumnos matriculados en esta comisión
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Fecha del Encuentro *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-500">
                  Fecha real en la que se dictó la clase
                </p>
              </div>
            </div>

            {/* Quick Presets for easy testing */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2">
                <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                <span>Cargar ejemplo para probar:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset.text)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-800 hover:border-sky-200 transition-colors"
                  >
                    {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Natural language textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bitácora Docente en Lenguaje Natural *
              </label>
              <textarea
                required
                rows={5}
                value={teacherLog}
                onChange={(e) => {
                  setTeacherLog(e.target.value);
                }}
                placeholder="Escribí aquí lo que ocurrió en la clase... (ej: Hoy vimos sensores ultrasónicos. El grupo participó con entusiasmo. A Juan le costó conectar el sensor...)"
                className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                <span>
                  Cada encuentro admite un único registro docente. Se preserva íntegramente tu redacción original.
                </span>
                <span>{teacherLog.length} caracteres</span>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={isProcessing || !teacherLog.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Bot className="h-4 w-4 animate-spin" />
                    <span>Procesando con IA (Bedrock)...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-sky-200" />
                    <span>Guardar Encuentro y Estructurar con IA</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* AI Result Preview Panel */}
          {previewResult && (
            <div className="mt-6 rounded-xl border border-sky-200 bg-gradient-to-br from-sky-50/70 via-white to-emerald-50/40 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm font-bold text-slate-900">
                    ¡Bitácora Procesada y Guardada con Éxito!
                  </span>
                </div>
                <Badge variant="green" size="sm">
                  Guardado
                </Badge>
              </div>

              {/* Topics */}
              <div>
                <span className="text-xs font-semibold text-slate-600 block mb-1">
                  Temas extraídos (`topics`):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {previewResult.topics.map((t, idx) => (
                    <Badge key={idx} variant="celeste" size="sm">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* General observation */}
              {previewResult.generalObservation && (
                <div className="rounded-lg bg-white p-3 border border-sky-100 text-xs text-slate-700">
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    Observación general del grupo (`generalObservation`):
                  </span>
                  {previewResult.generalObservation}
                </div>
              )}

              {/* Student observations */}
              <div>
                <span className="text-xs font-semibold text-slate-600 block mb-1">
                  Observaciones individuales (`studentObservations`):
                </span>
                {previewResult.studentObservations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {previewResult.studentObservations.map((obs, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-white p-2.5 border border-slate-200 text-xs"
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
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Sin observaciones individuales detectadas en este encuentro.
                  </p>
                )}
              </div>

              {/* Action buttons after save */}
              <div className="pt-3 border-t border-sky-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Las observaciones individuales ya quedaron añadidas al historial de cada alumno.
                </span>
                <Link
                  href={`/courses/${selectedCourseId}`}
                  className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Ver en el curso →
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function NewMeetingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando...</div>}>
      <NewMeetingContent />
    </Suspense>
  );
}
