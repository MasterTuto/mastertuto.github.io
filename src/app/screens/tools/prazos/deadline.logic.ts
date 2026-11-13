/**
 * Counting of procedural deadlines under the CPC/2015 (pure logic, no Angular, testable with Node).
 *
 * Dates are whole days counted from 1970-01-01 ("day numbers"), built from the calendar fields with
 * `Date.UTC`, so there is no time zone or daylight-saving off-by-one anywhere.
 *
 * Rules:
 * - art. 224: the start day is excluded and the end day included; counting starts on the first business
 *   day after the intimação/publicação, and an end on a day without business moves to the next one.
 * - art. 219: business days only (default); "corridos" counts every calendar day (material/criminal).
 * - Lei 11.419/2006 art. 4º §§ 3º–4º (and art. 224 §§ 2º–3º): the publication is the first business day
 *   after the disponibilização in the DJe; counting starts on the business day after that.
 * - art. 220: deadlines are suspended from 20 December to 20 January. 20/12–06/01 is also the recesso
 *   forense (no court business, so no publication); 07/01–20/01 only suspends the counting.
 * - arts. 183, 186 and 229: deadline in double.
 */

export type DayNum = number;
export type CountMode = 'uteis' | 'corridos';

export interface DeadlineInput {
  /** Day of the intimação/publicação, or of the disponibilização in the DJe when `dje` is true. */
  start: DayNum;
  dje: boolean;
  days: number;
  mode: CountMode;
  double: boolean;
  /** Carnaval (Monday and Tuesday) and Corpus Christi, "pontos facultativos" without court business. */
  optional: boolean;
  /** Holy Wednesday/Thursday and the days of Lei 5.010/1966 art. 62 (11/08, 01/11, 08/12). */
  forensic: boolean;
  /** Suspension of art. 220 (20/12–20/01). */
  recess: boolean;
  /** Local holidays and suspensions of the court. */
  custom: readonly DayNum[];
}

export type DayKind = 'start' | 'publication' | 'counted' | 'weekend' | 'holiday' | 'recess' | 'suspended' | 'custom';

export interface TimelineDay {
  day: DayNum;
  kind: DayKind;
  /** Position in the count, for counted days. */
  n?: number;
  /** Holiday name, or a short description. */
  label?: string;
  /** Counted day that is not a business day (counting in calendar days). */
  nonBusiness?: boolean;
  /** Day the end was moved past because it had no court business. */
  moved?: boolean;
}

export interface DeadlineResult {
  start: DayNum;
  publication: DayNum | null;
  firstCounted: DayNum;
  end: DayNum;
  /** Days actually counted (after doubling). */
  total: number;
  /** Last counted day when the end was moved to the next business day (calendar-day counting). */
  movedFrom: DayNum | null;
  timeline: TimelineDay[];
  /** Holidays and local suspensions skipped inside the period (not weekends or the recess). */
  skipped: { day: DayNum; label: string }[];
}

export const MAX_DAYS = 365;
const DAY_MS = 86_400_000;
const WEEKDAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
const WEEKDAYS_SHORT = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

export function dayNum(year: number, month: number, day: number): DayNum {
  return Math.round(Date.UTC(year, month - 1, day) / DAY_MS);
}

export function dayParts(day: DayNum): { year: number; month: number; day: number; weekday: number } {
  const date = new Date(day * DAY_MS);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate(), weekday: date.getUTCDay() };
}

/** Today in the user's local time zone. */
export function today(now = new Date()): DayNum {
  return dayNum(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

/** "dd/mm/aaaa" → day number, or null when incomplete or not a real date. */
export function parseBrDate(text: string): DayNum | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text.trim());
  if (!match) return null;
  const [d, m, y] = [Number(match[1]), Number(match[2]), Number(match[3])];
  if (y < 1900 || y > 2200 || m < 1 || m > 12 || d < 1) return null;
  const n = dayNum(y, m, d);
  return dayParts(n).day === d ? n : null;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function formatBr(day: DayNum): string {
  const p = dayParts(day);
  return `${pad(p.day)}/${pad(p.month)}/${p.year}`;
}

/** "2026-02-04", for `<input type="date">`. */
export function formatIso(day: DayNum): string {
  const p = dayParts(day);
  return `${p.year}-${pad(p.month)}-${pad(p.day)}`;
}

export function parseIso(text: string): DayNum | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  return match ? parseBrDate(`${match[3]}/${match[2]}/${match[1]}`) : null;
}

export function weekdayName(day: DayNum): string {
  return WEEKDAYS[dayParts(day).weekday];
}

export function weekdayShort(day: DayNum): string {
  return WEEKDAYS_SHORT[dayParts(day).weekday];
}

/** Easter Sunday (anonymous Gregorian algorithm). */
export function easter(year: number): DayNum {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return dayNum(year, month, day);
}

export type HolidayGroup = 'national' | 'optional' | 'forensic';

export interface Holiday {
  day: DayNum;
  name: string;
  group: HolidayGroup;
}

/** National holidays, "pontos facultativos" without court business and forensic holidays of a year. */
export function holidaysOf(year: number): Holiday[] {
  const e = easter(year);
  const fixed = (month: number, day: number, name: string, group: HolidayGroup = 'national'): Holiday => ({
    day: dayNum(year, month, day),
    name,
    group,
  });
  const list: Holiday[] = [
    fixed(1, 1, 'Confraternização Universal'),
    { day: e - 48, name: 'Carnaval (segunda-feira)', group: 'optional' },
    { day: e - 47, name: 'Carnaval (terça-feira)', group: 'optional' },
    { day: e - 4, name: 'Quarta-feira Santa', group: 'forensic' },
    { day: e - 3, name: 'Quinta-feira Santa', group: 'forensic' },
    { day: e - 2, name: 'Sexta-feira Santa', group: 'national' },
    fixed(4, 21, 'Tiradentes'),
    fixed(5, 1, 'Dia do Trabalho'),
    { day: e + 60, name: 'Corpus Christi', group: 'optional' },
    fixed(8, 11, 'Criação dos cursos jurídicos', 'forensic'),
    fixed(9, 7, 'Independência do Brasil'),
    fixed(10, 12, 'Nossa Senhora Aparecida'),
    fixed(11, 1, 'Todos os Santos', 'forensic'),
    fixed(11, 2, 'Finados'),
    fixed(11, 15, 'Proclamação da República'),
    fixed(12, 8, 'Dia da Justiça', 'forensic'),
    fixed(12, 25, 'Natal'),
  ];
  // Lei 14.759/2023: national holiday from 2024 on.
  if (year >= 2024) list.push(fixed(11, 20, 'Dia Nacional de Zumbi e da Consciência Negra'));
  return list.sort((x, y) => x.day - y.day);
}

interface Calendar {
  /** Why a day has no court business, or null for a business day. */
  closed(day: DayNum): { kind: DayKind; label: string } | null;
  /** Whether deadlines are suspended (art. 220). */
  suspended(day: DayNum): boolean;
}

function calendar(input: DeadlineInput): Calendar {
  const holidayCache = new Map<number, Map<DayNum, string>>();
  const holidays = (year: number) => {
    let map = holidayCache.get(year);
    if (!map) {
      map = new Map();
      for (const h of holidaysOf(year)) {
        if (h.group === 'optional' && !input.optional) continue;
        if (h.group === 'forensic' && !input.forensic) continue;
        map.set(h.day, h.name);
      }
      holidayCache.set(year, map);
    }
    return map;
  };
  const custom = new Set(input.custom);
  const inSuspension = (day: DayNum) => {
    if (!input.recess) return false;
    const { month, day: d } = dayParts(day);
    return (month === 12 && d >= 20) || (month === 1 && d <= 20);
  };
  const inRecess = (day: DayNum) => {
    if (!input.recess) return false;
    const { month, day: d } = dayParts(day);
    return (month === 12 && d >= 20) || (month === 1 && d <= 6);
  };
  return {
    closed(day) {
      if (inRecess(day)) return { kind: 'recess', label: 'Recesso forense' };
      const p = dayParts(day);
      const holiday = holidays(p.year).get(day);
      if (holiday) return { kind: 'holiday', label: holiday };
      if (custom.has(day)) return { kind: 'custom', label: 'Feriado local / suspensão' };
      if (p.weekday === 0 || p.weekday === 6) return { kind: 'weekend', label: p.weekday === 0 ? 'Domingo' : 'Sábado' };
      return null;
    },
    suspended: inSuspension,
  };
}

/** Counts a deadline. Returns null for an invalid number of days. */
export function computeDeadline(input: DeadlineInput): DeadlineResult | null {
  const base = Math.floor(input.days);
  if (!Number.isFinite(base) || base < 1 || base > MAX_DAYS) return null;
  const total = input.double ? base * 2 : base;
  const cal = calendar(input);
  const timeline: TimelineDay[] = [];
  const skipped: { day: DayNum; label: string }[] = [];
  const nonCounted = (day: DayNum): TimelineDay => {
    const closed = cal.closed(day);
    if (closed?.kind === 'recess') return { day, kind: 'recess', label: 'Recesso forense (art. 220)' };
    if (cal.suspended(day)) return { day, kind: 'suspended', label: 'Prazos suspensos (art. 220)' };
    if (!closed) return { day, kind: 'suspended', label: 'Prazos suspensos' };
    if (closed.kind !== 'weekend') skipped.push({ day, label: closed.label });
    return { day, kind: closed.kind, label: closed.label };
  };
  /** A day on which the count can start or end: court business and no suspension. */
  const usable = (day: DayNum) => !cal.closed(day) && !cal.suspended(day);

  timeline.push({ day: input.start, kind: 'start', label: input.dje ? 'Disponibilização no DJe' : 'Intimação / publicação' });
  let day = input.start;
  let publication: DayNum | null = null;
  if (input.dje) {
    // Publication: first day with court business after the disponibilização (suspension does not matter).
    day++;
    while (cal.closed(day)) timeline.push(nonCounted(day++));
    publication = day;
    timeline.push({ day, kind: 'publication', label: 'Publicação (1º dia útil seguinte)' });
  }

  day++;
  while (!usable(day)) timeline.push(nonCounted(day++));
  const firstCounted = day;
  let counted = 0;
  let end = day;
  for (;;) {
    const countable = input.mode === 'corridos' ? !cal.suspended(day) : usable(day);
    if (countable) {
      counted++;
      const closed = cal.closed(day);
      timeline.push({ day, kind: 'counted', n: counted, ...(closed ? { nonBusiness: true, label: closed.label } : {}) });
      if (counted === total) {
        end = day;
        break;
      }
    } else {
      timeline.push(nonCounted(day));
    }
    day++;
  }

  let movedFrom: DayNum | null = null;
  if (!usable(end)) {
    movedFrom = end;
    day = end + 1;
    while (!usable(day)) timeline.push({ ...nonCounted(day++), moved: true });
    end = day;
    timeline.push({ day, kind: 'counted', label: 'Vencimento prorrogado (art. 224, § 1º)' });
  }
  return { start: input.start, publication, firstCounted, end, total, movedFrom, timeline, skipped };
}

/** Business days from `from` (exclusive) to `to` (inclusive) under the same calendar, for "dias úteis restantes". */
export function businessDaysBetween(input: DeadlineInput, from: DayNum, to: DayNum): number {
  if (to <= from) return 0;
  const cal = calendar(input);
  let count = 0;
  for (let day = from + 1; day <= to; day++) if (!cal.closed(day) && !cal.suspended(day)) count++;
  return count;
}

export interface TimelineRow extends TimelineDay {
  /** Last day of a run of equal non-counted days merged into one row. */
  until?: DayNum;
  count?: number;
}

/** Merges runs of three or more equal non-counted days (e.g. the recess) into one row. */
export function compactTimeline(days: readonly TimelineDay[]): TimelineRow[] {
  const rows: TimelineRow[] = [];
  for (const item of days) {
    const last = rows[rows.length - 1];
    const mergeable = item.kind === 'recess' || item.kind === 'suspended';
    if (last && mergeable && last.kind === item.kind && (last.until ?? last.day) === item.day - 1) {
      last.until = item.day;
      last.count = (last.count ?? 1) + 1;
    } else {
      rows.push({ ...item });
    }
  }
  return rows;
}
