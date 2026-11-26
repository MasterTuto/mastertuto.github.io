/**
 * Honorários advocatícios de sucumbência (CPC/2015, art. 85). Pure logic, no Angular, testable with Node.
 *
 * - Between private parties (§ 2º): 10% to 20% of the award, of the economic benefit or, when neither can
 *   be measured, of the updated value of the claim.
 * - Against the Public Treasury (§ 3º), in brackets of minimum wages applied progressively (§ 5º): the
 *   first bracket's rate on the part up to 200 minimum wages, the second's on the part from 200 to 2.000,
 *   and so on — like an income tax table.
 * - Appeal (§ 11): the court raises the fees already set, within the same limits (20% or the § 3º maxima).
 */

export const MINIMUM_WAGE = 1621;

export interface PublicBracket {
  /** Upper limit in minimum wages. */
  upToWages: number;
  min: number;
  max: number;
  /** Roman numeral of the inciso of § 3º. */
  inciso: string;
}

export const PUBLIC_BRACKETS: PublicBracket[] = [
  { upToWages: 200, min: 0.1, max: 0.2, inciso: 'I' },
  { upToWages: 2000, min: 0.08, max: 0.1, inciso: 'II' },
  { upToWages: 20000, min: 0.05, max: 0.08, inciso: 'III' },
  { upToWages: 100000, min: 0.03, max: 0.05, inciso: 'IV' },
  { upToWages: Infinity, min: 0.01, max: 0.03, inciso: 'V' },
];

export const PRIVATE_MIN = 0.1;
export const PRIVATE_MAX = 0.2;

export interface BracketShare {
  inciso: string;
  from: number;
  to: number;
  base: number;
  rate: number;
  min: number;
  max: number;
  value: number;
}

export interface FeesResult {
  base: number;
  /** Fees of the first instance. */
  fees: number;
  /** Effective rate (fees ÷ base). */
  effective: number;
  /** Fees after the § 11 increase on appeal. */
  appealFees: number;
  appealEffective: number;
  /** The increase hit the legal ceiling. */
  appealCapped: boolean;
  minFees: number;
  maxFees: number;
  shares: BracketShare[];
}

const round2 = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Splits the base across the § 3º brackets; `position` 0 = every minimum, 1 = every maximum. */
export function publicShares(base: number, wage: number, position: number): BracketShare[] {
  const shares: BracketShare[] = [];
  let from = 0;
  for (const bracket of PUBLIC_BRACKETS) {
    if (base <= from) break;
    const to = bracket.upToWages * wage;
    const part = Math.min(base, to) - from;
    const rate = bracket.min + (bracket.max - bracket.min) * clamp(position, 0, 1);
    shares.push({ inciso: bracket.inciso, from, to, base: round2(part), rate, min: bracket.min, max: bracket.max, value: round2(part * rate) });
    from = to;
  }
  return shares;
}

export interface FeesInput {
  base: number;
  publicTreasury: boolean;
  /** Private: the rate (0.10–0.20). Public: the position inside each bracket (0–1). */
  rate: number;
  position: number;
  /** Appeal increase in percentage points of the base (private) or of the position (public). */
  appealPoints: number;
  wage: number;
}

export function sucumbencia(input: FeesInput): FeesResult | null {
  const base = Math.max(0, input.base || 0);
  if (!(base > 0)) return null;
  if (!input.publicTreasury) {
    const rate = clamp(input.rate, PRIVATE_MIN, PRIVATE_MAX);
    const wanted = rate + Math.max(0, input.appealPoints || 0);
    const appealRate = Math.min(PRIVATE_MAX, wanted);
    return {
      base,
      fees: round2(base * rate),
      effective: rate,
      appealFees: round2(base * appealRate),
      appealEffective: appealRate,
      appealCapped: wanted > PRIVATE_MAX + 1e-9,
      minFees: round2(base * PRIVATE_MIN),
      maxFees: round2(base * PRIVATE_MAX),
      shares: [],
    };
  }
  const wage = input.wage > 0 ? input.wage : MINIMUM_WAGE;
  const position = clamp(input.position, 0, 1);
  const shares = publicShares(base, wage, position);
  const fees = round2(shares.reduce((sum, share) => sum + share.value, 0));
  // On appeal, each bracket's rate moves up by the same points, without passing its maximum.
  const points = Math.max(0, input.appealPoints || 0);
  let capped = false;
  const appealFees = round2(
    shares.reduce((sum, share) => {
      const wanted = share.rate + points;
      if (wanted > share.max + 1e-9) capped = true;
      return sum + share.base * Math.min(share.max, wanted);
    }, 0),
  );
  const sum = (key: 'min' | 'max') => round2(shares.reduce((total, share) => total + share.base * share[key], 0));
  return {
    base,
    fees,
    effective: fees / base,
    appealFees,
    appealEffective: appealFees / base,
    appealCapped: capped && points > 0,
    minFees: sum('min'),
    maxFees: sum('max'),
    shares,
  };
}

export interface ContractInput {
  /** What the client receives from the case (award paid by the losing party). */
  award: number;
  /** Contract fee rate on the award ("ad exitum"), 0–0.5. */
  rate: number;
  /** Fixed fee already agreed (pro labore). */
  fixed: number;
}

export function contractFees(input: ContractInput) {
  const award = Math.max(0, input.award || 0);
  const success = round2(award * clamp(input.rate || 0, 0, 0.5));
  const fixed = Math.max(0, input.fixed || 0);
  return { success, fixed, total: round2(success + fixed), client: round2(award - success) };
}
