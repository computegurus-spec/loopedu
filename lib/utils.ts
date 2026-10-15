import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatInr(paise: number): string {
  const rupees = Math.round(paise / 100);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rupees);
}

/**
 * Defend against CSV / Spreadsheet formula injection (CWE-1236).
 * Prepends a single quote if the first character is an executable prefix (=, +, -, @, tab, cr).
 */
export function sanitizeCsvField(field: unknown): string {
  if (field === null || field === undefined) return '""';
  let str = String(field);
  
  // Neutralize formula injection
  const dangerousPrefixes = ['=', '+', '-', '@', '\t', '\r'];
  if (dangerousPrefixes.some((p) => str.startsWith(p))) {
    str = "'" + str;
  }

  // Escape inner double quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Mask email for privacy-safe watermarks and UI displays
 * e.g. "student.name@example.com" -> "s***e@example.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return 'user@***';
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return `${localPart[0]}*@${domain}`;
  }
  const first = localPart[0];
  const last = localPart[localPart.length - 1];
  return `${first}***${last}@${domain}`;
}

/**
 * Generate personalized watermark string for protected reader
 */
export function generateWatermark(email: string, userId: string, subjectSlug: string): string {
  const masked = maskEmail(email);
  const shortId = userId.slice(0, 8);
  return `LoopEdu • ${masked} • [License ID: ${shortId}] • Independent Practice`;
}
