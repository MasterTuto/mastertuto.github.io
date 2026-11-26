/**
 * Brazilian payroll taxes withheld from employees in 2026. Pure logic, no Angular, testable with Node.
 *
 * INSS (employee, domestic and casual workers): progressive table of Portaria Interministerial MPS/MF
 * nº 13/2026, each rate applied only to the slice of the salary inside its bracket, capped at the ceiling.
 *
 * IRRF: monthly progressive table of Lei 15.191/2025 (from May 2025), simplified monthly discount of
 * R$ 607,20 when it beats the legal deductions, and the reduction of Lei 15.270/2025 (art. 3º-A of
 * Lei 9.250/1995), from January 2026: up to R$ 312,89 for taxable income up to R$ 5.000 (tax becomes zero)
 * and R$ 978,62 − 0,133145 × taxable income between R$ 5.000,01 and R$ 7.350.
 */

export const MINIMUM_WAGE_2026 = 1621;

export interface InssBracket {
  upTo: number;
  rate: number;
}

export const INSS_2026: InssBracket[] = [
  { upTo: 1621.0, rate: 0.075 },
  { upTo: 2902.84, rate: 0.09 },
  { upTo: 4354.27, rate: 0.12 },
  { upTo: 8475.55, rate: 0.14 },
];
export const INSS_CEILING = INSS_2026[INSS_2026.length - 1].upTo;

export interface IrrfBracket {
  upTo: number;
  rate: number;
  deduction: number;
}

export const IRRF_2026: IrrfBracket[] = [
  { upTo: 2428.8, rate: 0, deduction: 0 },
  { upTo: 2826.65, rate: 0.075, deduction: 182.16 },
  { upTo: 3751.05, rate: 0.15, deduction: 394.16 },
  { upTo: 4664.68, rate: 0.225, deduction: 675.49 },
  { upTo: Infinity, rate: 0.275, deduction: 908.73 },
];
export const DEPENDENT_DEDUCTION = 189.59;
export const SIMPLIFIED_DISCOUNT = 607.2;
export const REDUCTION_FULL_UP_TO = 5000;
export const REDUCTION_MAX = 312.89;
export const REDUCTION_PARTIAL_UP_TO = 7350;
export const REDUCTION_A = 978.62;
export const REDUCTION_B = 0.133145;

/** Rounds to cents, half up (121,575 → 121,58), immune to binary noise like 121,57499…. */
export function round2(value: number): number {
  return Math.round(Number((value * 100).toFixed(6))) / 100;
}

export interface InssSlice {
  from: number;
  to: number;
  rate: number;
  base: number;
  value: number;
}

export interface InssResult {
  total: number;
  slices: InssSlice[];
  /** Effective rate over the salary (total ÷ salary). */
  effective: number;
  capped: boolean;
}

/** Progressive INSS of an employee on a monthly salary of contribution. */
export function inss(salary: number): InssResult {
  const gross = Math.max(0, salary || 0);
  const slices: InssSlice[] = [];
  let from = 0;
  let total = 0;
  for (const bracket of INSS_2026) {
    if (gross <= from) break;
    const base = Math.min(gross, bracket.upTo) - from;
    const value = base * bracket.rate;
    slices.push({ from, to: bracket.upTo, rate: bracket.rate, base: round2(base), value: round2(value) });
    total += value;
    from = bracket.upTo;
  }
  const rounded = round2(total);
  return { total: rounded, slices, effective: gross > 0 ? rounded / gross : 0, capped: gross > INSS_CEILING };
}

export function irrfBracketIndex(base: number): number {
  return IRRF_2026.findIndex((bracket) => base <= bracket.upTo);
}

/** Tax of the progressive table before the 2026 reduction. */
export function irrfTable(base: number): number {
  if (!(base > 0)) return 0;
  const bracket = IRRF_2026[irrfBracketIndex(base)];
  return Math.max(0, round2(base * bracket.rate - bracket.deduction));
}

/** Reduction of Lei 15.270/2025 for a taxable income (gross taxable amount, before deductions). */
export function irrfReduction(taxableIncome: number, tax: number): number {
  if (!(tax > 0)) return 0;
  if (taxableIncome <= REDUCTION_FULL_UP_TO) return Math.min(tax, REDUCTION_MAX);
  if (taxableIncome <= REDUCTION_PARTIAL_UP_TO) return Math.min(tax, Math.max(0, round2(REDUCTION_A - REDUCTION_B * taxableIncome)));
  return 0;
}

export interface IrrfInput {
  /** Taxable income of the month (salary, overtime, commissions…). */
  taxable: number;
  inss: number;
  dependents?: number;
  alimony?: number;
  /** Private pension (PGBL/Funpresp) contributions, deductible. */
  pension?: number;
  /** Allow the simplified discount (monthly salary: yes; 13º salário: no). */
  allowSimplified?: boolean;
}

export interface IrrfResult {
  /** Deductions used: legal ones or the simplified discount. */
  method: 'legal' | 'simplified';
  legalDeductions: number;
  deductions: number;
  base: number;
  bracket: number;
  rate: number;
  tableTax: number;
  reduction: number;
  tax: number;
}

export function irrf(input: IrrfInput): IrrfResult {
  const taxable = Math.max(0, input.taxable || 0);
  const legal = round2(
    Math.max(0, input.inss || 0) +
      Math.max(0, Math.floor(input.dependents || 0)) * DEPENDENT_DEDUCTION +
      Math.max(0, input.alimony || 0) +
      Math.max(0, input.pension || 0),
  );
  const simplified = input.allowSimplified !== false && SIMPLIFIED_DISCOUNT > legal;
  const deductions = simplified ? SIMPLIFIED_DISCOUNT : legal;
  const base = Math.max(0, round2(taxable - deductions));
  const bracket = irrfBracketIndex(base);
  const tableTax = irrfTable(base);
  const reduction = irrfReduction(taxable, tableTax);
  return {
    method: simplified ? 'simplified' : 'legal',
    legalDeductions: legal,
    deductions,
    base,
    bracket,
    rate: IRRF_2026[bracket].rate,
    tableTax,
    reduction: round2(reduction),
    tax: round2(tableTax - reduction),
  };
}

export interface NetSalaryInput {
  gross: number;
  dependents: number;
  /** Discount the 6% transport voucher. */
  transport: boolean;
  /** Monthly cost of the transport voucher; the discount is 6% of the salary, at most this cost. 0 = no cap. */
  transportCost?: number;
  alimony?: number;
  pension?: number;
  /** Other discounts after tax (health plan, meal voucher share, loans…). */
  other?: number;
}

export interface NetSalaryResult {
  gross: number;
  inss: InssResult;
  irrf: IrrfResult;
  transport: number;
  alimony: number;
  pension: number;
  other: number;
  discounts: number;
  net: number;
  /** FGTS deposited by the employer (8%), not discounted. */
  fgts: number;
  /** IRRF without the 2026 reduction, to show the saving. */
  irrfWithoutReduction: number;
}

export function netSalary(input: NetSalaryInput): NetSalaryResult | null {
  const gross = Math.max(0, input.gross || 0);
  if (!(gross > 0)) return null;
  const contribution = inss(gross);
  const alimony = Math.max(0, input.alimony || 0);
  const pension = Math.max(0, input.pension || 0);
  const tax = irrf({ taxable: gross, inss: contribution.total, dependents: input.dependents, alimony, pension });
  const sixPct = round2(gross * 0.06);
  const cost = Math.max(0, input.transportCost || 0);
  const transport = input.transport ? (cost > 0 ? Math.min(sixPct, cost) : sixPct) : 0;
  const other = Math.max(0, input.other || 0);
  const discounts = round2(contribution.total + tax.tax + transport + alimony + pension + other);
  return {
    gross,
    inss: contribution,
    irrf: tax,
    transport,
    alimony,
    pension,
    other,
    discounts,
    net: round2(gross - discounts),
    fgts: round2(gross * 0.08),
    irrfWithoutReduction: tax.tableTax,
  };
}
