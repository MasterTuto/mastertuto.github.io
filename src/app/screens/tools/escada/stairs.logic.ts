/**
 * Straight stairs by Blondel's formula (2e + p between the limits of each standard): number of
 * risers, riser and tread, run, slope, landings and the slab opening for 2,10 m of headroom.
 * No Angular imports.
 */

export type Criterion = 'nbr9050' | 'nbr9077' | 'private';

export interface CriterionRule {
  id: Criterion;
  name: string;
  short: string;
  riserMin: number;
  riserMax: number;
  treadMin: number;
  treadMax: number;
  blondelMin: number;
  blondelMax: number;
  /** Riser used to pick the recommended option when several fit. */
  idealRiser: number;
  /** Maximum rise of one flight before a landing, cm. */
  maxFlightRise: number;
}

/** All sizes in cm. */
export const CRITERIA: Record<Criterion, CriterionRule> = {
  nbr9050: {
    id: 'nbr9050',
    name: 'NBR 9050 — acessibilidade',
    short: 'NBR 9050',
    riserMin: 16,
    riserMax: 18,
    treadMin: 28,
    treadMax: 32,
    blondelMin: 63,
    blondelMax: 65,
    idealRiser: 17,
    maxFlightRise: 320,
  },
  nbr9077: {
    id: 'nbr9077',
    name: 'NBR 9077 — saída de emergência',
    short: 'NBR 9077',
    riserMin: 16,
    riserMax: 18,
    treadMin: 27,
    treadMax: 32,
    blondelMin: 63,
    blondelMax: 64,
    idealRiser: 17,
    maxFlightRise: 370,
  },
  private: {
    id: 'private',
    name: 'Residencial privativa — conforto',
    short: 'Privativa',
    riserMin: 15,
    riserMax: 19,
    treadMin: 25,
    treadMax: 32,
    blondelMin: 60,
    blondelMax: 66,
    idealRiser: 17,
    maxFlightRise: 370,
  },
};

/** The step most people find natural: 2e + p = 64 cm. */
export const BLONDEL_TARGET = 64;

/** Minimum clear height over the pitch line, cm. */
export const HEADROOM = 210;

export interface StairInput {
  /** Floor-to-floor rise, cm. */
  rise: number;
  /** Horizontal space available for the run, cm (0 = no limit). */
  space: number;
  criterion: Criterion;
  /** Upper slab thickness including finishes, cm. */
  slab: number;
}

export interface StairOption {
  risers: number;
  treads: number;
  riser: number;
  tread: number;
  blondel: number;
  /** Horizontal run of the steps, without landings, cm. */
  run: number;
  slopeDeg: number;
  /** The tread was shortened to fit `space`. */
  fitted: boolean;
  fits: boolean;
}

export interface StairPlan extends StairOption {
  flights: number;
  /** Risers in each flight (straight stair with intermediate landings). */
  risersPerFlight: number[];
  landing: number;
  /** Run with landings, cm. */
  totalRun: number;
  /** Length of the opening in the upper slab for `HEADROOM`, cm. */
  opening: number;
}

export interface StairResult {
  rule: CriterionRule;
  options: StairOption[];
  best: StairPlan | null;
  /** No option fits the space: the shortest valid run, for the message. */
  shortestRun: number;
}

function treadRange(rule: CriterionRule, riser: number): [number, number] {
  return [Math.max(rule.treadMin, rule.blondelMin - 2 * riser), Math.min(rule.treadMax, rule.blondelMax - 2 * riser)];
}

/** Every number of risers whose riser height fits the rule, with the most comfortable tread for it. */
export function stairOptions(rise: number, criterion: Criterion, space = 0): StairOption[] {
  const rule = CRITERIA[criterion];
  if (!(rise > 0)) return [];
  const options: StairOption[] = [];
  const first = Math.max(1, Math.ceil(rise / rule.riserMax - 1e-9));
  const last = Math.floor(rise / rule.riserMin + 1e-9);
  for (let risers = first; risers <= last && risers <= 200; risers++) {
    const riser = rise / risers;
    const [low, high] = treadRange(rule, riser);
    if (low > high + 1e-9) continue;
    const target = Math.min(rule.blondelMax, Math.max(rule.blondelMin, BLONDEL_TARGET)) - 2 * riser;
    let tread = Math.min(high, Math.max(low, target));
    const treads = risers - 1;
    let fitted = false;
    let fits = true;
    if (space > 0 && treads > 0 && treads * tread > space + 1e-9) {
      const shortest = space / treads;
      if (shortest >= low - 1e-9) {
        tread = shortest;
        fitted = true;
      } else {
        fits = false;
      }
    }
    options.push({
      risers,
      treads,
      riser,
      tread,
      blondel: 2 * riser + tread,
      run: treads * tread,
      slopeDeg: (Math.atan(riser / tread) * 180) / Math.PI,
      fitted,
      fits,
    });
  }
  return options;
}

/** Splits `risers` into the fewest flights whose rise stays within the rule, as evenly as possible. */
export function splitFlights(risers: number, riser: number, maxFlightRise: number): number[] {
  const perFlight = Math.max(1, Math.floor(maxFlightRise / riser + 1e-9));
  const flights = Math.max(1, Math.ceil(risers / perFlight));
  const base = Math.floor(risers / flights);
  const extra = risers % flights;
  return Array.from({ length: flights }, (_, index) => base + (index < extra ? 1 : 0));
}

/** Landing depth: NBR 9050 asks at least 1,20 m; NBR 9077 p = (2h + b)·n + b with n = 1; private: one stride. */
export function landingDepth(rule: CriterionRule, riser: number, tread: number): number {
  if (rule.id === 'nbr9050') return 120;
  if (rule.id === 'nbr9077') return 2 * riser + tread + tread;
  return Math.max(80, 2 * riser + tread);
}

export function planStair(input: StairInput): StairResult {
  const rule = CRITERIA[input.criterion];
  const options = stairOptions(input.rise, input.criterion, input.space);
  const pick = options.filter((option) => option.fits).reduce<StairOption | null>((best, option) => {
    if (!best) return option;
    const delta = Math.abs(option.riser - rule.idealRiser) - Math.abs(best.riser - rule.idealRiser);
    if (Math.abs(delta) > 1e-9) return delta < 0 ? option : best;
    return option.risers < best.risers ? option : best;
  }, null);
  const unconstrained = stairOptions(input.rise, input.criterion);
  const shortestRun = unconstrained.length ? Math.min(...unconstrained.map((option) => option.treads * Math.max(treadRange(rule, option.riser)[0], 0))) : 0;
  if (!pick) return { rule, options, best: null, shortestRun };
  const risersPerFlight = splitFlights(pick.risers, pick.riser, rule.maxFlightRise);
  const flights = risersPerFlight.length;
  const landing = landingDepth(rule, pick.riser, pick.tread);
  const totalRun = pick.run + (flights - 1) * landing;
  const slab = Math.max(0, input.slab || 0);
  const opening = Math.min(totalRun, ((HEADROOM + slab) * pick.tread) / pick.riser);
  return { rule, options, best: { ...pick, flights, risersPerFlight, landing, totalRun, opening }, shortestRun };
}
