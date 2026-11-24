export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

const MONTH_NAMES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

export function formatDate(dateString: string): string {
  try {
    const [year, month, day] = dateString.split("-").map(Number);
    if (!year || !month || !day) return dateString;
    const monthName = MONTH_NAMES[month - 1] || "";
    return `${day} ${monthName} ${year}`;
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateTimeString: string): string {
  try {
    const [datePart, timePart] = dateTimeString.split("T");
    if (!datePart) return dateTimeString;
    const [year, month, day] = datePart.split("-").map(Number);
    const monthName = MONTH_NAMES[(month || 1) - 1] || "";
    const time = timePart ? timePart.slice(0, 5) : "";
    return `${day} ${monthName} ${year}${time ? `, ${time} hs` : ""}`;
  } catch {
    return dateTimeString;
  }
}

export function calculateAge(birthDate: string, referenceDate: string = "2026-11-24"): number {
  try {
    const [bYear, bMonth, bDay] = birthDate.split("-").map(Number);
    const [rYear, rMonth, rDay] = referenceDate.split("-").map(Number);
    let age = rYear - bYear;
    if (rMonth < bMonth || (rMonth === bMonth && rDay < bDay)) {
      age--;
    }
    return age;
  } catch {
    return 10;
  }
}
