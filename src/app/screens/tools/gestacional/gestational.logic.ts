/**
 * Gestational age and estimated due date (Naegele: LMP + 280 days) from the last menstrual period,
 * an ultrasound or the conception/embryo transfer date, plus the usual prenatal windows.
 * Dates are calendar days counted as integers (days since 1970-01-01), so time zones and daylight
 * saving never shift a result by one day. No Angular imports.
 */

/** A calendar date as days since 1970-01-01. */
export type DayNumber = number;

export type Method = 'lmp' | 'ultrasound' | 'conception';
/** Conception date, or embryo transfer of a day-3 or day-5 embryo (IVF). */
export type ConceptionKind = 'conception' | 'ivf3' | 'ivf5';

export const PREGNANCY_DAYS = 280;
const MS_PER_DAY = 86_400_000;

export function dayNumber(year: number, month: number, day: number): DayNumber {
  return Math.round(Date.UTC(year, month - 1, day) / MS_PER_DAY);
}

export function fromDayNumber(n: DayNumber): { year: number; month: number; day: number } {
  const date = new Date(n * MS_PER_DAY);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
}

/** Today in the local time zone of the device. */
export function today(now: Date = new Date()): DayNumber {
  return dayNumber(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

/** Parses "dd/mm/aaaa" (also "d/m/aaaa"); null if incomplete or not a real date. */
export function parseDateBR(text: string | null | undefined): DayNumber | null {
  const match = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(text ?? '');
  if (!match) return null;
  const [day, month, year] = [Number(match[1]), Number(match[2]), Number(match[3])];
  if (month < 1 || month > 12 || day < 1 || year < 1900 || year > 2200) return null;
  const n = dayNumber(year, month, day);
  const back = fromDayNumber(n);
  return back.day === day && back.month === month ? n : null;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function formatDateBR(n: DayNumber): string {
  const { year, month, day } = fromDayNumber(n);
  return `${pad(day)}/${pad(month)}/${year}`;
}

/** "aaaa-mm-dd", the value of `<input type="date">`. */
export function toIsoDate(n: DayNumber): string {
  const { year, month, day } = fromDayNumber(n);
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function fromIsoDate(text: string): DayNumber | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  return match ? parseDateBR(`${match[3]}/${match[2]}/${match[1]}`) : null;
}

const WEEKDAYS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
export function weekdayBR(n: DayNumber): string {
  return WEEKDAYS[new Date(n * MS_PER_DAY).getUTCDay()];
}

/** "24s 3d" for 171 days. */
export function formatWeeks(days: number): string {
  const weeks = Math.floor(days / 7);
  return `${weeks}s ${days - weeks * 7}d`;
}

/** Equivalent LMP (DUM) from the chosen method. */
export function lmpFromUltrasound(examDate: DayNumber, weeks: number, days: number): DayNumber {
  return examDate - (Math.floor(weeks) * 7 + Math.floor(days));
}

export function lmpFromConception(date: DayNumber, kind: ConceptionKind): DayNumber {
  const embryoAge = kind === 'ivf3' ? 3 : kind === 'ivf5' ? 5 : 0;
  return date - embryoAge - 14;
}

export type WindowState = 'past' | 'current' | 'future';

export interface PrenatalWindow {
  label: string;
  detail: string;
  /** Gestational age in days at the start and end (inclusive); end null = open-ended. */
  startDays: number;
  endDays: number | null;
  start: DayNumber;
  end: DayNumber | null;
  state: WindowState;
}

/** Commonly cited windows (Ministério da Saúde, FEBRASGO, ACOG). Milestones have start = end. */
export const WINDOWS: { label: string; detail: string; from: [number, number]; to: [number, number] | null }[] = [
  { label: 'Ultrassom do 1º trimestre / translucência nucal', detail: 'Datação e rastreio de aneuploidias', from: [11, 0], to: [13, 6] },
  { label: 'Ultrassom morfológico do 2º trimestre', detail: 'Avaliação anatômica fetal', from: [20, 0], to: [24, 6] },
  { label: 'Vacina dTpa', detail: 'A partir de 20 semanas, em cada gestação', from: [20, 0], to: null },
  { label: 'TOTG 75 g', detail: 'Rastreio de diabetes gestacional', from: [24, 0], to: [28, 6] },
  { label: 'Ultrassom do 3º trimestre', detail: 'Crescimento fetal e líquido amniótico', from: [28, 0], to: [32, 6] },
  { label: 'Cultura para estreptococo do grupo B', detail: 'Swab vaginal e retal', from: [36, 0], to: [37, 6] },
  { label: 'Termo precoce', detail: '37s 0d', from: [37, 0], to: [37, 0] },
  { label: 'Termo completo', detail: '39s 0d', from: [39, 0], to: [39, 0] },
  { label: 'Data provável do parto', detail: '40s 0d', from: [40, 0], to: [40, 0] },
  { label: 'Termo tardio', detail: '41s 0d: avaliar vitalidade e indução', from: [41, 0], to: [41, 0] },
];

export interface GestationResult {
  lmp: DayNumber;
  reference: DayNumber;
  dueDate: DayNumber;
  /** Gestational age in days on the reference date (may be negative or above 280). */
  ageDays: number;
  ageLabel: string;
  trimester: 1 | 2 | 3 | null;
  daysToDue: number;
  /** 0–1 along 40 weeks. */
  progress: number;
  windows: PrenatalWindow[];
  warnings: string[];
}

export function trimesterOf(ageDays: number): 1 | 2 | 3 | null {
  if (ageDays < 0) return null;
  if (ageDays < 14 * 7) return 1;
  if (ageDays < 28 * 7) return 2;
  return 3;
}

export function gestation(lmp: DayNumber, reference: DayNumber): GestationResult {
  const ageDays = reference - lmp;
  const dueDate = lmp + PREGNANCY_DAYS;
  const warnings: string[] = [];
  if (ageDays < 0) warnings.push('A DUM calculada é posterior à data de referência.');
  else if (ageDays > 44 * 7) warnings.push('Idade gestacional acima de 44 semanas: confira as datas.');
  const windows = WINDOWS.map(({ label, detail, from, to }) => {
    const startDays = from[0] * 7 + from[1];
    const endDays = to ? to[0] * 7 + to[1] : null;
    const state: WindowState =
      ageDays < startDays ? 'future' : endDays !== null && ageDays > endDays ? 'past' : 'current';
    return { label, detail, startDays, endDays, start: lmp + startDays, end: endDays === null ? null : lmp + endDays, state };
  });
  return {
    lmp,
    reference,
    dueDate,
    ageDays,
    ageLabel: formatWeeks(Math.max(0, ageDays)),
    trimester: trimesterOf(ageDays),
    daysToDue: dueDate - reference,
    progress: Math.min(1, Math.max(0, ageDays / PREGNANCY_DAYS)),
    windows,
    warnings,
  };
}
