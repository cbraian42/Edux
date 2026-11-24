"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  BookOpen,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/Badge";
import {
  mockCourses,
  mockCourseAnalyses,
  mockMeetings,
} from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import { CourseAnalysis } from "@/types";

export default function AnalysisPage() {
  const [selectedCourseId, setSelectedCourseId] = useState(mockCourses[0].id);
  const [analyses, setAnalyses] = useState<Record<string, CourseAnalysis>>(mockCourseAnalyses);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedCourse = mockCourses.find((c) => c.id === selectedCourseId);
  const currentAnalysis = analyses[selectedCourseId] || null;
  const courseMeetings = mockMeetings.filter((m) => m.courseId === selectedCourseId);

  const handleGenerateAnalysis = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const updatedAnalysis: CourseAnalysis = {
        id: `analysis-${Date.now()}`,
        courseId: selectedCourseId,
        generatedAt: new Date().toISOString(),
        summary: `Síntesis integral basada en los ${courseMeetings.length} encuentros registrados del curso "${selectedCourse?.name}". El grupo consolida un rendimiento progresivo en construcción física y programación. Se evidencia fuerte autonomía en ensamblaje y buena resolución de problemas lógicos, con necesidad de afianzar la verificación metódica de cables y conexiones de sensores.`,
        recommendations: [
          "Diseñar una rúbrica breve de autoevaluación para que cada dupla revise conexiones antes de energizar sus hubs.",
          "Fomentar desafíos de programación por tiempo limitado para agilizar la toma de decisiones algorítmicas.",
          "Integrar una sesión de cierre donde los alumnos compartan oralmente la estrategia adoptada frente a fallas imprevistas.",
        ],
      };

      setAnalyses({
        ...analyses,
        [selectedCourseId]: updatedAnalysis,
      });

      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 border border-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span>Análisis Pedagógico Asistido por IA</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            ¿Cómo venimos y qué podríamos mejorar?
          </h1>
          <p className="text-sm text-slate-500 max-w-3xl">
            Generá bajo demanda una síntesis evolutiva y recomendaciones pedagógicas a partir de todo el historial acumulado de bitácoras de la comisión.
          </p>
        </div>

        {/* Course Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <span className="text-xs font-semibold text-slate-600 mr-2">
            Seleccionar Comisión:
          </span>
          {mockCourses.map((course) => (
            <button
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all flex items-center gap-2 ${
                selectedCourseId === course.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{course.name}</span>
              {analyses[course.id] && (
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    selectedCourseId === course.id
                      ? "bg-emerald-300"
                      : "bg-emerald-500"
                  }`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Selected Course Context */}
        {selectedCourse && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-900 text-sm block">
                {selectedCourse.name}
              </span>
              <span className="text-slate-500">
                {selectedCourse.dayOfWeek} {selectedCourse.timeSlot} • Nivel {selectedCourse.level} • {courseMeetings.length} encuentros registrados
              </span>
            </div>

            <button
              onClick={handleGenerateAnalysis}
              disabled={isGenerating || courseMeetings.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-xs"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Analizando historial con Bedrock...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>
                    {currentAnalysis
                      ? "Actualizar y Generar Nuevo Análisis"
                      : "Generar Resumen y Recomendaciones"}
                  </span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Analysis Result Card */}
        {currentAnalysis ? (
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-sky-50/40 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-emerald-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Último Análisis Guardado del Curso
                  </h2>
                  <p className="text-xs text-slate-500">
                    Último análisis de IA: <strong>{formatDateTime(currentAnalysis.generatedAt)}</strong>
                  </p>
                </div>
              </div>

              <Badge variant="green" size="md">
                Vigente
              </Badge>
            </div>

            {/* General Synthesis */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Resumen General de Avance Pedagógico
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed bg-white p-4 sm:p-5 rounded-xl border border-emerald-100 shadow-2xs">
                {currentAnalysis.summary}
              </p>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Propuestas Pedagógicas para Próximos Encuentros
              </h3>
              <div className="space-y-3">
                {currentAnalysis.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {rec}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic note per spec */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80 text-xs text-slate-500 flex items-start gap-3">
              <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-slate-700 block">
                  Regla de negocio: resultado único no versionado
                </span>
                <p>
                  El resultado conserva la fecha y hora de emisión. Cada nueva solicitud de análisis reemplaza al anterior considerando todo el historial acumulado hasta ese momento.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-4">
            <Sparkles className="h-12 w-12 text-emerald-500 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Esta comisión aún no tiene un análisis generado
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                Al solicitarlo, EduX analiza las bitácoras docentes, temas extraídos y observaciones grupales e individuales disponibles.
              </p>
            </div>
            {courseMeetings.length > 0 ? (
              <button
                onClick={handleGenerateAnalysis}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                <span>Generar Análisis de la Comisión</span>
              </button>
            ) : (
              <p className="text-xs text-amber-700 bg-amber-50 inline-block px-3 py-1.5 rounded-lg border border-amber-200">
                Se requiere al menos un encuentro registrado para generar un análisis sustentado.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
