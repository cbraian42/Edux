import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EDUX — Copiloto Pedagógico de Robótica y Tecnología",
  description: "Plataforma SaaS para registro pedagógico y seguimiento evolutivo con IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900">
        {children}
      </body>
    </html>
  );
}
