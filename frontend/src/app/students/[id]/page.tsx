import { notFound } from "next/navigation";
import { Suspense } from "react";
import { mockStudents } from "@/lib/mock-data";
import { StudentDetailClient } from "./StudentDetailClient";

export function generateStaticParams() {
  return mockStudents.map((s) => ({
    id: s.id,
  }));
}

interface StudentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = await params;
  const student = mockStudents.find((s) => s.id === id);

  if (!student) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando alumno...</div>}>
      <StudentDetailClient student={student} />
    </Suspense>
  );
}
