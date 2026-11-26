/**
 * Monthly cost of a CLT employee to the employer. Pure logic, no Angular, testable with Node.
 *
 * The salary drives the provisions: 13º salário (1/12 per month), férias (1/12) plus the constitutional
 * 1/3 (1/36). FGTS (8%, Lei 8.036/1990) and, outside the Simples Nacional, the employer's INSS (20%,
 * Lei 8.212/1991, art. 22, I), RAT/GILRAT × FAP (1–3% × 0,5–2) and third-party contributions (Sistema S,
 * salário-educação, INCRA: 5,8% for most companies) fall on the salary and on these provisions.
 * In the Simples Nacional the CPP is paid inside the DAS, except in Anexo IV (LC 123/2006, art. 18, § 5º-C),
 * which pays the 20% + RAT but no third-party contributions.
 */

export type Regime = 'simples' | 'simples-iv' | 'presumido';

export const REGIMES: { id: Regime; label: string; short: string; hint: string }[] = [
  { id: 'simples', label: 'Simples Nacional', short: 'Anexos I, II, III e V', hint: 'A contribuição patronal (CPP) já está no DAS: sobre a folha fica só o FGTS.' },
  { id: 'simples-iv', label: 'Simples · Anexo IV', short: 'Obras, limpeza, vigilância, advocacia', hint: 'CPP fora do DAS: 20% de INSS patronal + RAT sobre a folha, sem terceiros.' },
  { id: 'presumido', label: 'Lucro Presumido ou Real', short: 'Regime normal', hint: '20% de INSS patronal + RAT × FAP + terceiros (Sistema S, salário-educação e INCRA).' },
];

export const EMPLOYER_INSS = 0.2;
export const FGTS_RATE = 0.08;
export const FGTS_FINE = 0.4;
export const DEFAULT_THIRD_PARTY = 0.058;
export const TRANSPORT_SHARE = 0.06;

export interface EmployeeCostInput {
  salary: number;
  regime: Regime;
  /** RAT/GILRAT rate, 0.01 to 0.03. */
  rat: number;
  /** FAP multiplier, 0.5 to 2. */
  fap: number;
  /** Third-party contributions, 0 to ~0.058. */
  thirdParty: number;
  /** Monthly transport voucher cost; the employee pays up to 6% of the salary. */
  transport: number;
  /** Meal or food voucher per month (employer share). */
  meal: number;
  /** Health plan and other benefits per month (employer share). */
  health: number;
  /** Provision for the 40% FGTS fine on dismissal without cause. */
  provisionFine: boolean;
}

export type CostGroup = 'salary' | 'provisions' | 'taxes' | 'benefits';

export interface CostLine {
  id: string;
  label: string;
  detail: string;
  group: CostGroup;
  value: number;
}

export interface EmployeeCostResult {
  lines: CostLine[];
  monthly: number;
  yearly: number;
  /** Total cost ÷ salary. */
  multiplier: number;
  /** Salary-based remuneration including provisions (salary + 13º + férias + 1/3). */
  remuneration: number;
  /** Rate of the payroll charges (INSS + RAT + third parties) over the remuneration. */
  chargesRate: number;
  byGroup: Record<CostGroup, number>;
  /** What the employee pays of the transport voucher. */
  transportEmployee: number;
}

const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const pct = (value: number) => `${(value * 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}%`;

export function chargeRates(regime: Regime, rat: number, fap: number, thirdParty: number) {
  const ratFap = clamp(rat, 0, 0.03) * clamp(fap, 0.5, 2);
  if (regime === 'simples') return { inss: 0, ratFap: 0, thirdParty: 0 };
  if (regime === 'simples-iv') return { inss: EMPLOYER_INSS, ratFap, thirdParty: 0 };
  return { inss: EMPLOYER_INSS, ratFap, thirdParty: clamp(thirdParty, 0, 0.2) };
}

export function employeeCost(input: EmployeeCostInput): EmployeeCostResult | null {
  const salary = Math.max(0, input.salary || 0);
  if (!(salary > 0)) return null;
  const thirteenth = salary / 12;
  const vacation = salary / 12;
  const vacationThird = salary / 36;
  const remuneration = salary + thirteenth + vacation + vacationThird;
  const rates = chargeRates(input.regime, input.rat, input.fap, input.thirdParty);
  const fgts = remuneration * FGTS_RATE;
  const fine = input.provisionFine ? fgts * FGTS_FINE : 0;
  const transportEmployee = Math.min(Math.max(0, input.transport || 0), salary * TRANSPORT_SHARE);
  const transport = Math.max(0, (input.transport || 0) - transportEmployee);

  const lines: CostLine[] = [
    { id: 'salary', label: 'Salário', detail: 'Remuneração mensal', group: 'salary', value: salary },
    { id: 'thirteenth', label: '13º salário', detail: 'Provisão de 1/12 por mês', group: 'provisions', value: thirteenth },
    { id: 'vacation', label: 'Férias', detail: 'Provisão de 1/12 por mês', group: 'provisions', value: vacation },
    { id: 'third', label: '1/3 de férias', detail: '1/3 da provisão de férias', group: 'provisions', value: vacationThird },
    { id: 'fgts', label: 'FGTS', detail: '8% sobre salário e provisões', group: 'taxes', value: fgts },
  ];
  if (rates.inss) lines.push({ id: 'inss', label: 'INSS patronal', detail: '20% sobre salário e provisões', group: 'taxes', value: remuneration * rates.inss });
  if (rates.ratFap) lines.push({ id: 'rat', label: 'RAT × FAP', detail: `${pct(input.rat)} × ${input.fap.toLocaleString('pt-BR')} = ${pct(rates.ratFap)}`, group: 'taxes', value: remuneration * rates.ratFap });
  if (rates.thirdParty) lines.push({ id: 'others', label: 'Terceiros', detail: `Sistema S, salário-educação, INCRA: ${pct(rates.thirdParty)}`, group: 'taxes', value: remuneration * rates.thirdParty });
  if (fine) lines.push({ id: 'fine', label: 'Multa do FGTS', detail: 'Provisão de 40% do FGTS do mês', group: 'provisions', value: fine });
  if (transport) lines.push({ id: 'transport', label: 'Vale-transporte', detail: 'Custo menos 6% do salário pago pelo empregado', group: 'benefits', value: transport });
  if (input.meal > 0) lines.push({ id: 'meal', label: 'Vale-refeição/alimentação', detail: 'Parte da empresa', group: 'benefits', value: input.meal });
  if (input.health > 0) lines.push({ id: 'health', label: 'Plano de saúde e outros', detail: 'Parte da empresa', group: 'benefits', value: input.health });

  const rounded = lines.map((line) => ({ ...line, value: round2(line.value) }));
  const monthly = round2(rounded.reduce((sum, line) => sum + line.value, 0));
  const byGroup: Record<CostGroup, number> = { salary: 0, provisions: 0, taxes: 0, benefits: 0 };
  for (const line of rounded) byGroup[line.group] = round2(byGroup[line.group] + line.value);
  return {
    lines: rounded,
    monthly,
    yearly: round2(monthly * 12),
    multiplier: monthly / salary,
    remuneration: round2(remuneration),
    chargesRate: rates.inss + rates.ratFap + rates.thirdParty,
    byGroup,
    transportEmployee: round2(transportEmployee),
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}
