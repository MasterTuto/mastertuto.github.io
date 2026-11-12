/**
 * Simples Nacional (LC 123/2006 with the tables of LC 155/2016, in force since 2018). Pure logic, no
 * Angular, testable with Node.
 *
 * Alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) / RBT12; DAS = receita do mês × efetiva.
 * Fator R = folha de salários dos 12 meses (com pró-labore e encargos) / RBT12; ≥ 28% → Anexo III, senão V.
 */

export type AnnexId = 'I' | 'II' | 'III' | 'IV' | 'V';
export type TaxId = 'IRPJ' | 'CSLL' | 'Cofins' | 'PIS' | 'CPP' | 'IPI' | 'ICMS' | 'ISS';

export interface Bracket {
  /** Upper limit of RBT12 for the bracket. */
  limit: number;
  /** Nominal rate, as a fraction (0.112 = 11,2%). */
  rate: number;
  deduction: number;
  /** Share of each tax in the effective rate, in percent (sums to 100). */
  split: Partial<Record<TaxId, number>>;
}

export interface Annex {
  id: AnnexId;
  name: string;
  short: string;
  /** Taxes in the order of the official repartition table. */
  taxes: TaxId[];
  brackets: Bracket[];
}

export const LIMITS = [180_000, 360_000, 720_000, 1_800_000, 3_600_000, 4_800_000];
export const SUBLIMIT = 3_600_000;
export const LIMIT = 4_800_000;
export const FATOR_R_MIN = 0.28;
/** Maximum effective ISS inside the DAS (notes of Anexos III and IV, 5ª faixa). */
export const ISS_CAP = 0.05;

type Row = [rate: number, deduction: number, ...split: number[]];

function annex(id: AnnexId, name: string, short: string, taxes: TaxId[], rows: Row[]): Annex {
  return {
    id,
    name,
    short,
    taxes,
    brackets: rows.map(([rate, deduction, ...split], i) => ({
      limit: LIMITS[i],
      rate: Number((rate / 100).toFixed(6)),
      deduction,
      split: Object.fromEntries(taxes.map((tax, j) => [tax, split[j] ?? 0]).filter(([, v]) => v)) as Bracket['split'],
    })),
  };
}

export const ANNEXES: Record<AnnexId, Annex> = {
  I: annex('I', 'Anexo I', 'Comércio', ['IRPJ', 'CSLL', 'Cofins', 'PIS', 'CPP', 'ICMS'], [
    [4, 0, 5.5, 3.5, 12.74, 2.76, 41.5, 34],
    [7.3, 5_940, 5.5, 3.5, 12.74, 2.76, 41.5, 34],
    [9.5, 13_860, 5.5, 3.5, 12.74, 2.76, 42, 33.5],
    [10.7, 22_500, 5.5, 3.5, 12.74, 2.76, 42, 33.5],
    [14.3, 87_300, 5.5, 3.5, 12.74, 2.76, 42, 33.5],
    [19, 378_000, 13.5, 10, 28.27, 6.13, 42.1, 0],
  ]),
  II: annex('II', 'Anexo II', 'Indústria', ['IRPJ', 'CSLL', 'Cofins', 'PIS', 'CPP', 'IPI', 'ICMS'], [
    [4.5, 0, 5.5, 3.5, 11.51, 2.49, 37.5, 7.5, 32],
    [7.8, 5_940, 5.5, 3.5, 11.51, 2.49, 37.5, 7.5, 32],
    [10, 13_860, 5.5, 3.5, 11.51, 2.49, 37.5, 7.5, 32],
    [11.2, 22_500, 5.5, 3.5, 11.51, 2.49, 37.5, 7.5, 32],
    [14.7, 85_500, 5.5, 3.5, 11.51, 2.49, 37.5, 7.5, 32],
    [30, 720_000, 8.5, 7.5, 20.96, 4.54, 23.5, 35, 0],
  ]),
  III: annex('III', 'Anexo III', 'Serviços', ['IRPJ', 'CSLL', 'Cofins', 'PIS', 'CPP', 'ISS'], [
    [6, 0, 4, 3.5, 12.82, 2.78, 43.4, 33.5],
    [11.2, 9_360, 4, 3.5, 14.05, 3.05, 43.4, 32],
    [13.5, 17_640, 4, 3.5, 13.64, 2.96, 43.4, 32.5],
    [16, 35_640, 4, 3.5, 13.64, 2.96, 43.4, 32.5],
    [21, 125_640, 4, 3.5, 12.82, 2.78, 43.4, 33.5],
    [33, 648_000, 35, 15, 16.03, 3.47, 30.5, 0],
  ]),
  IV: annex('IV', 'Anexo IV', 'Serviços sem CPP', ['IRPJ', 'CSLL', 'Cofins', 'PIS', 'ISS'], [
    [4.5, 0, 18.8, 15.2, 17.67, 3.83, 44.5],
    [9, 8_100, 19.8, 15.2, 20.55, 4.45, 40],
    [10.2, 12_420, 20.8, 15.2, 19.73, 4.27, 40],
    [14, 39_780, 17.8, 19.2, 18.9, 4.1, 40],
    [22, 183_780, 18.8, 19.2, 18.08, 3.92, 40],
    [33, 828_000, 53.5, 21.5, 20.55, 4.45, 0],
  ]),
  V: annex('V', 'Anexo V', 'Serviços (Fator R < 28%)', ['IRPJ', 'CSLL', 'Cofins', 'PIS', 'CPP', 'ISS'], [
    [15.5, 0, 25, 15, 14.1, 3.05, 28.85, 14],
    [18, 4_500, 23, 15, 14.1, 3.05, 27.85, 17],
    [19.5, 9_900, 24, 15, 14.92, 3.23, 23.85, 19],
    [20.5, 17_100, 21, 15, 15.74, 3.41, 23.85, 21],
    [23, 62_100, 23, 12.5, 14.1, 3.05, 23.85, 23.5],
    [30.5, 540_000, 35, 15.5, 16.44, 3.56, 29.5, 0],
  ]),
};

export const TAX_NAMES: Record<TaxId, string> = {
  IRPJ: 'IRPJ',
  CSLL: 'CSLL',
  Cofins: 'Cofins',
  PIS: 'PIS/Pasep',
  CPP: 'CPP (INSS patronal)',
  IPI: 'IPI',
  ICMS: 'ICMS',
  ISS: 'ISS',
};

export interface TaxShare {
  tax: TaxId;
  /** Share of the DAS, in percent. */
  percent: number;
  /** Rate on the month's revenue, as a fraction. */
  rate: number;
  value: number;
}

export interface SimplesResult {
  annex: Annex;
  /** Bracket index, 0-based. */
  bracket: number;
  rbt12: number;
  nominal: number;
  deduction: number;
  effective: number;
  revenue: number;
  das: number;
  split: TaxShare[];
  /** RBT12 above R$ 3,6 mi: ICMS/ISS paid outside the DAS. */
  overSublimit: boolean;
  /** ISS share limited to 5% of the revenue. */
  issCapped: boolean;
}

/** Bracket index for an RBT12, or -1 above R$ 4,8 mi. */
export function bracketIndex(rbt12: number): number {
  return LIMITS.findIndex((limit) => rbt12 <= limit);
}

export function effectiveRate(annexId: AnnexId, rbt12: number): number {
  const i = bracketIndex(rbt12);
  if (rbt12 <= 0 || i < 0) return NaN;
  const b = ANNEXES[annexId].brackets[i];
  return (rbt12 * b.rate - b.deduction) / rbt12;
}

/** Returns null when RBT12 is not positive or above the R$ 4,8 mi limit. */
export function computeSimples(annexId: AnnexId, rbt12: number, revenue: number): SimplesResult | null {
  const i = bracketIndex(rbt12);
  if (!(rbt12 > 0) || i < 0) return null;
  const annex = ANNEXES[annexId];
  const b = annex.brackets[i];
  const effective = (rbt12 * b.rate - b.deduction) / rbt12;
  const month = Math.max(0, revenue || 0);
  const das = round2(month * effective);

  // Effective rate of each tax; ISS limited to 5%, the excess spread over the other taxes in proportion.
  let rates = annex.taxes.filter((t) => b.split[t]).map((tax) => ({ tax, rate: (effective * (b.split[tax] ?? 0)) / 100 }));
  let issCapped = false;
  const iss = rates.find((r) => r.tax === 'ISS');
  if (iss && iss.rate > ISS_CAP) {
    issCapped = true;
    const excess = iss.rate - ISS_CAP;
    const others = rates.filter((r) => r.tax !== 'ISS').reduce((sum, r) => sum + r.rate, 0);
    rates = rates.map((r) => (r.tax === 'ISS' ? { ...r, rate: ISS_CAP } : { ...r, rate: r.rate + (excess * r.rate) / others }));
  }
  const split = rates.map(({ tax, rate }) => ({
    tax,
    rate,
    percent: effective > 0 ? (rate / effective) * 100 : 0,
    value: round2(month * rate),
  }));
  return {
    annex,
    bracket: i,
    rbt12,
    nominal: b.rate,
    deduction: b.deduction,
    effective,
    revenue: month,
    das,
    split,
    overSublimit: rbt12 > SUBLIMIT,
    issCapped,
  };
}

export function fatorR(payroll: number, rbt12: number): number {
  return rbt12 > 0 ? Math.max(0, payroll) / rbt12 : NaN;
}

/** Anexo III when Fator R ≥ 28%, else V. */
export function annexByFatorR(payroll: number, rbt12: number): AnnexId {
  return fatorR(payroll, rbt12) >= FATOR_R_MIN ? 'III' : 'V';
}

/**
 * RBT12 of a company with fewer than 12 months (LC 123, art. 18, §§ 1º-A e 2º): in the first month the
 * revenue of the month × 12; afterwards the average of the previous months × 12.
 */
export function proportionalRbt12(previousMonths: number, previousRevenue: number, monthRevenue: number): number {
  const months = Math.floor(previousMonths);
  if (months <= 0) return Math.max(0, monthRevenue) * 12;
  return (Math.max(0, previousRevenue) / months) * 12;
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** pt-BR money text ("300.000,50", "R$ 1.234", "1234.5") → number; NaN when empty or invalid. */
export function parseMoney(text: string): number {
  let t = text.replace(/[R$\s]/g, '');
  if (!t) return NaN;
  if (!t.includes(',') && /\.\d{1,2}$/.test(t)) t = t.replace(/\.(?=\d{1,2}$)/, ',');
  t = t.replace(/\./g, '').replace(',', '.');
  return /^\d*\.?\d*$/.test(t) && /\d/.test(t) ? Number(t) : NaN;
}

/**
 * Formats money while typing: keeps digits and one comma, groups thousands with dots and allows two
 * decimals. A dot typed at the end (English keyboards) becomes the decimal comma.
 */
export function formatMoneyTyping(text: string, typedDot = false): string {
  let t = text;
  if (typedDot && t.endsWith('.') && !t.includes(',')) t = t.slice(0, -1) + ',';
  t = t.replace(/[^\d,]/g, '');
  const comma = t.indexOf(',');
  let int = comma >= 0 ? t.slice(0, comma) : t;
  const dec = comma >= 0 ? t.slice(comma + 1).replace(/,/g, '').slice(0, 2) : null;
  int = int.replace(/^0+(?=\d)/, '');
  if (int.length > 12) int = int.slice(0, 12);
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return dec === null ? grouped : `${grouped || '0'},${dec}`;
}

/** Formats a number for a money field: "300.000" or "300.000,50". */
export function moneyField(value: number): string {
  if (!Number.isFinite(value)) return '';
  const cents = Math.round(value * 100) % 100;
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 }).format(value);
}
