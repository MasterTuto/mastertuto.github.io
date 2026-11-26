/**
 * Sizing and payback of a grid-tied photovoltaic system (micro and minigeração distribuída).
 * Pure logic, no Angular, testable with Node.
 *
 * kWp = energy to offset ÷ (HSP × 30,4 × PR), where HSP is the daily solar irradiation on the panel plane
 * (kWh/m²·dia, "horas de sol pleno") and PR the performance ratio (temperature, inverter, wiring, dirt).
 * The bill never goes below the availability cost (REN ANEEL 1.000/2021, art. 291: 30, 50 or 100 kWh for
 * single, two and three-phase connections), so that part is not offset.
 * Lei 14.300/2022: for systems connected from 2023, the energy injected into the grid and used later pays
 * a growing share of the "Fio B" (distribution wire) component: 15% in 2023 … 60% in 2026 … 90% in 2028.
 */

export interface City {
  uf: string;
  name: string;
  /** Annual average daily irradiation on a plane tilted at the latitude, kWh/m²·dia (rounded). */
  hsp: number;
}

/**
 * State capitals, from CRESESB SunData v3 (Atlas Brasileiro de Energia Solar, INPE 2017), annual average
 * on the tilted plane with the highest yearly average, rounded to 0,1. Good enough for a pre-sizing; the
 * exact value for an address comes from SunData.
 */
export const CITIES: City[] = [
  { uf: 'AC', name: 'Rio Branco', hsp: 4.7 },
  { uf: 'AL', name: 'Maceió', hsp: 5.5 },
  { uf: 'AP', name: 'Macapá', hsp: 5.1 },
  { uf: 'AM', name: 'Manaus', hsp: 4.7 },
  { uf: 'BA', name: 'Salvador', hsp: 5.4 },
  { uf: 'CE', name: 'Fortaleza', hsp: 5.7 },
  { uf: 'DF', name: 'Brasília', hsp: 5.6 },
  { uf: 'ES', name: 'Vitória', hsp: 5.1 },
  { uf: 'GO', name: 'Goiânia', hsp: 5.5 },
  { uf: 'MA', name: 'São Luís', hsp: 5.2 },
  { uf: 'MT', name: 'Cuiabá', hsp: 5.3 },
  { uf: 'MS', name: 'Campo Grande', hsp: 5.4 },
  { uf: 'MG', name: 'Belo Horizonte', hsp: 5.5 },
  { uf: 'PA', name: 'Belém', hsp: 4.9 },
  { uf: 'PB', name: 'João Pessoa', hsp: 5.7 },
  { uf: 'PR', name: 'Curitiba', hsp: 4.6 },
  { uf: 'PE', name: 'Recife', hsp: 5.6 },
  { uf: 'PI', name: 'Teresina', hsp: 5.7 },
  { uf: 'RJ', name: 'Rio de Janeiro', hsp: 5.1 },
  { uf: 'RN', name: 'Natal', hsp: 5.8 },
  { uf: 'RS', name: 'Porto Alegre', hsp: 4.7 },
  { uf: 'RO', name: 'Porto Velho', hsp: 4.8 },
  { uf: 'RR', name: 'Boa Vista', hsp: 5.1 },
  { uf: 'SC', name: 'Florianópolis', hsp: 4.6 },
  { uf: 'SP', name: 'São Paulo', hsp: 4.7 },
  { uf: 'SE', name: 'Aracaju', hsp: 5.5 },
  { uf: 'TO', name: 'Palmas', hsp: 5.5 },
];

export type Connection = 'mono' | 'bi' | 'tri';
export const AVAILABILITY_KWH: Record<Connection, number> = { mono: 30, bi: 50, tri: 100 };

/** Share of the Fio B paid on compensated energy, by year (Lei 14.300/2022, art. 27). */
export const FIO_B_SCHEDULE: Record<number, number> = { 2023: 0.15, 2024: 0.3, 2025: 0.45, 2026: 0.6, 2027: 0.75, 2028: 0.9 };
export function fioBShare(year: number): number {
  if (year < 2023) return 0;
  return FIO_B_SCHEDULE[year] ?? 1;
}

export const DAYS_PER_MONTH = 365 / 12;
/** Standard inverter sizes, kW. */
export const INVERTER_SIZES = [2, 3, 3.6, 4, 5, 6, 7.5, 8, 10, 12, 15, 20, 25, 30, 36, 40, 50, 60, 75];
/** Module area per watt-peak at ~22,5% efficiency (a 2,28 × 1,13 m module of 580 Wp). */
export const MODULE_EFFICIENCY = 0.225;

/** Reference turnkey price in R$/Wp by system size (late 2026 market, installed, before discounts). */
export function referencePricePerWp(kwp: number): number {
  if (kwp <= 3) return 3.6;
  if (kwp <= 6) return 3.1;
  if (kwp <= 10) return 2.8;
  if (kwp <= 20) return 2.6;
  if (kwp <= 50) return 2.4;
  return 2.2;
}

export interface SolarInput {
  /** Average monthly consumption, kWh. */
  consumption: number;
  hsp: number;
  connection: Connection;
  /** Module power, Wp. */
  moduleWp: number;
  /** Performance ratio, 0.6–0.9. */
  pr: number;
  /** Energy price with taxes, R$/kWh. */
  tariff: number;
  /** Fio B share of the tariff (TUSD Fio B ÷ tariff), 0–0.5. */
  fioBTariffShare: number;
  /** Share of the generation used at the moment it is produced (not injected), 0–1. */
  simultaneity: number;
  /** System price, R$. 0 → reference price × kWp. */
  price: number;
  /** First operating year (for the Fio B schedule). */
  startYear: number;
  /** Yearly tariff increase, fraction. */
  tariffIncrease: number;
  /** Yearly module degradation, fraction. */
  degradation: number;
}

export interface YearRow {
  year: number;
  generation: number;
  saving: number;
  cumulative: number;
}

export interface SolarResult {
  target: number;
  availability: number;
  kwpNeeded: number;
  modules: number;
  kwp: number;
  monthly: number;
  yearly: number;
  coverage: number;
  area: number;
  inverterKw: number;
  /** DC/AC ratio with the suggested inverter. */
  dcAc: number;
  price: number;
  estimatedPrice: boolean;
  firstYearSaving: number;
  monthlySaving: number;
  billBefore: number;
  billAfter: number;
  /** Years until the cumulative saving pays the system (fractional), null if beyond 25. */
  payback: number | null;
  saving25: number;
  roi25: number;
  years: YearRow[];
}

const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

/** Smallest standard inverter for a DC/AC ratio of at most 1,3 (oversizing the panels up to 30%). */
export function inverterFor(kwp: number): number {
  const needed = kwp / 1.3;
  return INVERTER_SIZES.find((size) => size >= needed - 1e-9) ?? Math.ceil(needed);
}

/** Saving in R$ in one month for a given generation, consumption and year. */
export function monthSaving(generation: number, consumption: number, availability: number, tariff: number, input: Pick<SolarInput, 'simultaneity' | 'fioBTariffShare'>, year: number): number {
  const offsettable = Math.max(0, consumption - availability);
  const used = Math.min(generation, offsettable);
  const instant = Math.min(used, generation * clamp(input.simultaneity, 0, 1));
  const compensated = used - instant;
  const fioB = compensated * tariff * clamp(input.fioBTariffShare, 0, 0.6) * fioBShare(year);
  return used * tariff - fioB;
}

export function sizeSolar(input: SolarInput): SolarResult | null {
  const consumption = Math.max(0, input.consumption || 0);
  const hsp = clamp(input.hsp, 0, 8);
  const pr = clamp(input.pr, 0.5, 0.95);
  const moduleWp = clamp(input.moduleWp, 100, 1000);
  const availability = AVAILABILITY_KWH[input.connection] ?? 30;
  const target = consumption - availability;
  if (!(target > 0) || !(hsp > 0)) return null;
  const perKwp = hsp * DAYS_PER_MONTH * pr;
  const kwpNeeded = target / perKwp;
  const modules = Math.max(1, Math.ceil((kwpNeeded * 1000) / moduleWp - 1e-9));
  const kwp = (modules * moduleWp) / 1000;
  const monthly = kwp * perKwp;
  const inverterKw = inverterFor(kwp);
  const estimatedPrice = !(input.price > 0);
  const price = estimatedPrice ? round2(kwp * 1000 * referencePricePerWp(kwp)) : input.price;
  const tariff = Math.max(0, input.tariff || 0);

  const years: YearRow[] = [];
  let cumulative = -price;
  let payback: number | null = null;
  let saving25 = 0;
  for (let i = 0; i < 25; i++) {
    const year = input.startYear + i;
    const generation = monthly * Math.pow(1 - clamp(input.degradation, 0, 0.05), i);
    const yearTariff = tariff * Math.pow(1 + clamp(input.tariffIncrease, 0, 0.3), i);
    const saving = 12 * monthSaving(generation, consumption, availability, yearTariff, input, year);
    if (payback === null && cumulative + saving >= 0 && saving > 0) payback = i + (-cumulative / saving);
    cumulative += saving;
    saving25 += saving;
    years.push({ year, generation: generation * 12, saving: round2(saving), cumulative: round2(cumulative) });
  }
  const firstYearSaving = years[0].saving;
  const billBefore = consumption * tariff;
  return {
    target,
    availability,
    kwpNeeded,
    modules,
    kwp,
    monthly,
    yearly: monthly * 12,
    coverage: Math.min(1, monthly / target),
    area: (kwp * 1000) / (1000 * MODULE_EFFICIENCY),
    inverterKw,
    dcAc: kwp / inverterKw,
    price,
    estimatedPrice,
    firstYearSaving,
    monthlySaving: round2(firstYearSaving / 12),
    billBefore: round2(billBefore),
    billAfter: round2(Math.max(availability * tariff, billBefore - firstYearSaving / 12)),
    payback,
    saving25: round2(saving25),
    roi25: price > 0 ? (saving25 - price) / price : 0,
    years,
  };
}
