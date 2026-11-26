/**
 * Verbas rescisórias of a CLT employment contract. Pure logic, no Angular, testable with Node.
 *
 * - Saldo de salário: salary ÷ 30 × days worked in the last month (commercial month of 30 days).
 * - Aviso prévio (CLT art. 487; Lei 12.506/2011): 30 days + 3 per complete year of service, up to 90.
 *   When paid instead of worked it counts as service time (art. 487, § 1º; OJ 82 SDI-1): 13º and férias
 *   are counted up to the projected date.
 * - 13º proporcional (Lei 4.090/1962): 1/12 per month of the year with 15 days or more of work.
 * - Férias proporcionais (art. 146–147): 1/12 per month of the current acquisition period, a fraction of
 *   more than 14 days counting as a month, plus 1/3 (CF art. 7º, XVII). Not due on dismissal for cause
 *   (Súmula 171 TST); due on resignation even under one year (Súmula 261 TST).
 * - Acordo (art. 484-A): half of the paid notice and of the FGTS fine (20%), 80% of the FGTS can be withdrawn.
 * - FGTS fine: 40% of all deposits of the contract (Lei 8.036/1990, art. 18, § 1º).
 * Dates are integers (days since 1970-01-01), like the gestational calculator.
 */
import { type DayNumber, dayNumber, fromDayNumber } from '../gestacional/gestational.logic';
import { inss, irrf, round2 } from '../salario/payroll.logic';

export type Reason = 'sem-justa-causa' | 'pedido' | 'acordo' | 'justa-causa' | 'termino';
export type Notice = 'indenizado' | 'trabalhado' | 'dispensado' | 'nao-cumprido';

export const REASONS: { id: Reason; label: string; hint: string }[] = [
  { id: 'sem-justa-causa', label: 'Demissão sem justa causa', hint: 'A empresa dispensou: aviso prévio, multa de 40% do FGTS, saque do FGTS e seguro-desemprego.' },
  { id: 'pedido', label: 'Pedido de demissão', hint: 'O empregado pediu para sair: sem multa e sem saque do FGTS. O aviso de 30 dias é do empregado.' },
  { id: 'acordo', label: 'Acordo (art. 484-A)', hint: 'Demissão consensual: metade do aviso indenizado, multa de 20% e saque de 80% do FGTS, sem seguro-desemprego.' },
  { id: 'justa-causa', label: 'Justa causa', hint: 'Falta grave (art. 482): só saldo de salário e férias vencidas com 1/3.' },
  { id: 'termino', label: 'Fim do contrato a prazo', hint: 'Término do contrato de experiência ou por prazo determinado na data prevista: sem aviso e sem multa, com saque do FGTS.' },
];

export interface SeveranceInput {
  salary: number;
  admission: DayNumber;
  end: DayNumber;
  reason: Reason;
  notice: Notice;
  /** Complete vacation periods not taken (0–2). With 2, the older one is paid in double (art. 137). */
  overdueVacations: number;
  /** FGTS balance for the fine; 0 or less → estimated as 8% of the salary per month of contract. */
  fgtsBalance: number;
  dependents: number;
  /** 13º salário already advanced this year (first installment). */
  advance13: number;
}

export interface SeveranceLine {
  id: string;
  label: string;
  reference: string;
  value: number;
  /** Subject to INSS/IRRF in this estimate. */
  taxed: 'salary' | 'thirteenth' | 'none';
}

export interface SeveranceResult {
  years: number;
  noticeDays: number;
  /** Days of notice paid (indemnified) by the employer. */
  paidNoticeDays: number;
  projected: DayNumber;
  monthDays: number;
  thirteenthAvos: number;
  vacationAvos: number;
  earnings: SeveranceLine[];
  deductions: SeveranceLine[];
  gross: number;
  totalDeductions: number;
  net: number;
  fgts: {
    estimated: boolean;
    balance: number;
    /** Deposits due on the severance pay (saldo, aviso indenizado and 13º). */
    onSeverance: number;
    fineRate: number;
    fine: number;
    withdrawRate: number;
    withdraw: number;
  };
  unemploymentInsurance: boolean;
  paymentDeadline: DayNumber;
}


export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Same day `months` later, clamped to the end of the month (31/01 + 1 → 28/02). */
export function addMonths(day: DayNumber, months: number): DayNumber {
  const d = fromDayNumber(day);
  const total = d.year * 12 + (d.month - 1) + months;
  const year = Math.floor(total / 12);
  const month = (total % 12) + 1;
  return dayNumber(year, month, Math.min(d.day, daysInMonth(year, month)));
}

/** Complete years between two dates (anniversaries reached on or before `to`). */
export function completeYears(from: DayNumber, to: DayNumber): number {
  if (to < from) return 0;
  let years = fromDayNumber(to).year - fromDayNumber(from).year;
  while (years > 0 && addMonths(from, years * 12) > to) years--;
  return Math.max(0, years);
}

/** Lei 12.506/2011: 30 days + 3 per complete year, at most 90. */
export function noticeDaysFor(years: number): number {
  return 30 + 3 * Math.min(20, Math.max(0, Math.floor(years)));
}

/** Days of salary in the last month: the day of the month, 30 when the month is complete. */
export function monthBalanceDays(end: DayNumber, admission: DayNumber): number {
  const e = fromDayNumber(end);
  const first = dayNumber(e.year, e.month, 1);
  const start = Math.max(first, admission);
  if (start === first && e.day === daysInMonth(e.year, e.month)) return 30;
  return Math.min(30, end - start + 1);
}

/** Avos of 13º in the calendar year of `to`: months of that year with 15 days or more inside [from, to]. */
export function thirteenthAvosInYear(from: DayNumber, to: DayNumber, year: number): number {
  let avos = 0;
  for (let month = 1; month <= 12; month++) {
    const first = dayNumber(year, month, 1);
    const last = dayNumber(year, month, daysInMonth(year, month));
    const days = Math.min(last, to) - Math.max(first, from) + 1;
    if (days >= 15) avos++;
  }
  return avos;
}

/** Start of the acquisition period that contains `to` (last anniversary of the admission). */
export function acquisitionStart(admission: DayNumber, to: DayNumber): DayNumber {
  return addMonths(admission, completeYears(admission, to) * 12);
}

/** Avos of férias proporcionais: complete months since the period start, plus one for more than 14 days. */
export function vacationAvos(admission: DayNumber, to: DayNumber): number {
  if (to < admission) return 0;
  const start = acquisitionStart(admission, to);
  let months = 0;
  while (months < 12 && addMonths(start, months + 1) <= to + 1) months++;
  const rest = to + 1 - addMonths(start, months);
  return Math.min(12, months + (rest > 14 ? 1 : 0));
}

function avos(n: number): string {
  return `${n}/12`;
}

export function severance(input: SeveranceInput): SeveranceResult | null {
  const salary = Math.max(0, input.salary || 0);
  const { admission, end, reason } = input;
  if (!(salary > 0) || !Number.isFinite(admission) || !Number.isFinite(end) || end < admission) return null;

  const daily = salary / 30;
  const years = completeYears(admission, end);
  const fullNotice = noticeDaysFor(years);
  // Which notice the employer pays and how far it projects the contract.
  let noticeDays = 0;
  let paidNoticeDays = 0;
  let noticeDiscount = false;
  if (reason === 'sem-justa-causa') {
    noticeDays = fullNotice;
    paidNoticeDays = input.notice === 'trabalhado' ? fullNotice - 30 : fullNotice;
  } else if (reason === 'acordo') {
    noticeDays = fullNotice;
    paidNoticeDays = input.notice === 'trabalhado' ? 0 : Math.floor(fullNotice / 2);
  } else if (reason === 'pedido') {
    noticeDays = 30;
    noticeDiscount = input.notice === 'nao-cumprido';
  }
  const projected = end + paidNoticeDays;
  const monthDays = monthBalanceDays(end, admission);

  const earnings: SeveranceLine[] = [];
  const deductions: SeveranceLine[] = [];
  earnings.push({ id: 'saldo', label: 'Saldo de salário', reference: `${monthDays} ${monthDays === 1 ? 'dia' : 'dias'}`, value: round2(daily * monthDays), taxed: 'salary' });
  if (paidNoticeDays > 0) {
    earnings.push({
      id: 'aviso',
      label: reason === 'acordo' ? 'Aviso prévio indenizado (metade)' : input.notice === 'trabalhado' ? 'Aviso prévio proporcional indenizado' : 'Aviso prévio indenizado',
      reference: `${paidNoticeDays} dias`,
      value: round2(daily * paidNoticeDays),
      taxed: 'none',
    });
  }

  const forCause = reason === 'justa-causa';
  let thirteenthAvos = 0;
  if (!forCause) {
    const endYear = fromDayNumber(end).year;
    const projectedYear = fromDayNumber(projected).year;
    thirteenthAvos = thirteenthAvosInYear(admission, projected, endYear);
    if (projectedYear > endYear) thirteenthAvos += thirteenthAvosInYear(admission, projected, projectedYear);
    if (thirteenthAvos > 0) {
      earnings.push({ id: '13', label: '13º salário proporcional', reference: avos(thirteenthAvos), value: round2((salary / 12) * thirteenthAvos), taxed: 'thirteenth' });
    }
  }

  const overdue = Math.max(0, Math.min(2, Math.floor(input.overdueVacations || 0)));
  for (let i = 0; i < overdue; i++) {
    const double = overdue === 2 && i === 0;
    const base = salary * (double ? 2 : 1);
    earnings.push({ id: `venc${i}`, label: double ? 'Férias vencidas em dobro' : 'Férias vencidas', reference: double ? '12/12 × 2' : '12/12', value: round2(base), taxed: 'none' });
    earnings.push({ id: `venc${i}t`, label: '1/3 sobre férias vencidas', reference: '1/3', value: round2(base / 3), taxed: 'none' });
  }

  let vacAvos = 0;
  if (!forCause) {
    vacAvos = vacationAvos(admission, projected);
    if (vacAvos > 0) {
      const value = (salary / 12) * vacAvos;
      earnings.push({ id: 'ferias', label: 'Férias proporcionais', reference: avos(vacAvos), value: round2(value), taxed: 'none' });
      earnings.push({ id: 'feriast', label: '1/3 sobre férias proporcionais', reference: '1/3', value: round2(value / 3), taxed: 'none' });
    }
  }

  // Withholdings: INSS and IRRF on the balance of salary and, separately, on the 13º.
  const salaryBase = earnings.filter((line) => line.taxed === 'salary').reduce((sum, line) => sum + line.value, 0);
  const thirteenthBase = earnings.filter((line) => line.taxed === 'thirteenth').reduce((sum, line) => sum + line.value, 0);
  if (salaryBase > 0) {
    const contribution = inss(salaryBase).total;
    const tax = irrf({ taxable: salaryBase, inss: contribution, dependents: input.dependents }).tax;
    if (contribution) deductions.push({ id: 'inss', label: 'INSS sobre saldo de salário', reference: 'tabela 2026', value: contribution, taxed: 'none' });
    if (tax) deductions.push({ id: 'irrf', label: 'IRRF sobre saldo de salário', reference: 'tabela 2026', value: tax, taxed: 'none' });
  }
  if (thirteenthBase > 0) {
    const contribution = inss(thirteenthBase).total;
    const tax = irrf({ taxable: thirteenthBase, inss: contribution, dependents: input.dependents, allowSimplified: false }).tax;
    if (contribution) deductions.push({ id: 'inss13', label: 'INSS sobre 13º', reference: 'tabela 2026', value: contribution, taxed: 'none' });
    if (tax) deductions.push({ id: 'irrf13', label: 'IRRF sobre 13º', reference: 'exclusivo na fonte', value: tax, taxed: 'none' });
  }
  if (input.advance13 > 0 && thirteenthBase > 0) {
    deductions.push({ id: 'adiant', label: 'Adiantamento do 13º', reference: '1ª parcela', value: round2(Math.min(input.advance13, thirteenthBase)), taxed: 'none' });
  }
  if (noticeDiscount) {
    deductions.push({ id: 'aviso-desc', label: 'Aviso prévio não cumprido', reference: '30 dias (art. 487, § 2º)', value: round2(salary), taxed: 'none' });
  }

  const gross = round2(earnings.reduce((sum, line) => sum + line.value, 0));
  const totalDeductions = round2(deductions.reduce((sum, line) => sum + line.value, 0));

  // FGTS on the severance: saldo, aviso indenizado (Súmula 305 TST) and 13º; not on férias indenizadas (OJ 195).
  const fgtsBase = earnings.filter((line) => ['saldo', 'aviso', '13'].includes(line.id)).reduce((sum, line) => sum + line.value, 0);
  const onSeverance = round2(fgtsBase * 0.08);
  const estimated = !(input.fgtsBalance > 0);
  const monthsOfContract = Math.max(0, (end - admission + 1) / (365.25 / 12));
  // Estimate: 8% of the salary per month plus 8% of the 13º of each year (13 salaries a year).
  const balance = estimated ? round2(salary * 0.08 * monthsOfContract * (13 / 12)) : round2(input.fgtsBalance);
  const fineRate = reason === 'sem-justa-causa' ? 0.4 : reason === 'acordo' ? 0.2 : 0;
  const fine = round2((balance + onSeverance) * fineRate);
  const withdrawRate = reason === 'sem-justa-causa' || reason === 'termino' ? 1 : reason === 'acordo' ? 0.8 : 0;
  const withdraw = round2((balance + onSeverance) * withdrawRate);

  return {
    years,
    noticeDays,
    paidNoticeDays,
    projected,
    monthDays,
    thirteenthAvos,
    vacationAvos: vacAvos,
    earnings,
    deductions,
    gross,
    totalDeductions,
    net: round2(gross - totalDeductions),
    fgts: { estimated, balance, onSeverance, fineRate, fine, withdrawRate, withdraw },
    unemploymentInsurance: reason === 'sem-justa-causa',
    paymentDeadline: end + 10,
  };
}

