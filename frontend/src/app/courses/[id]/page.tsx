import { notFound } from "next/navigation";
import { Suspense } from "react";
import { mockCourses } from "@/lib/mock-data";
import { CourseDetailClient } from "./CourseDetailClient";

export function generateStaticParams() {
  return mockCourses.map((c) => ({
    id: c.id,
  }));
}

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = mockCourses.find((c) => c.id === id);

  if (!course) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando curso...</div>}>
      <CourseDetailClient course={course} />
    </Suspense>
  );
}
