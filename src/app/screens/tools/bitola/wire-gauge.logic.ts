/**
 * Cable sizing for low-voltage circuits following the criteria of ABNT NBR 5410:
 * current-carrying capacity (PVC 70 °C, ambient 30 °C / soil 20 °C), voltage drop and the minimum
 * sections, plus the breaker that protects the chosen cable. Pure functions, no Angular imports.
 */

export type Material = 'cu' | 'al';
export type InstallMethod = 'B1' | 'C' | 'D';
export type CircuitKind = 'lighting' | 'power';

export interface WireInput {
  /** 1 = single-phase load (F-N or F-F), 3 = three-phase. */
  phases: 1 | 3;
  /** Circuit voltage in volts (line voltage for three-phase). */
  voltage: number;
  /** Load as power (W) or as current (A). */
  mode: 'power' | 'current';
  power: number;
  current: number;
  powerFactor: number;
  /** One-way length in metres. */
  length: number;
  /** Maximum voltage drop in percent. */
  maxDropPct: number;
  material: Material;
  method: InstallMethod;
  /** Circuits grouped in the same conduit or tray (1 = alone). */
  grouped: number;
  kind: CircuitKind;
}

export interface SectionRow {
  section: number;
  /** Corrected current-carrying capacity (A). */
  iz: number;
  dropV: number;
  dropPct: number;
  ampacityOk: boolean;
  dropOk: boolean;
}

export interface WireResult {
  current: number;
  loadedConductors: 2 | 3;
  groupingFactor: number;
  /** Minimum section by current-carrying capacity, null when no table section is enough. */
  byAmpacity: number | null;
  /** Minimum section by voltage drop, null when no table section is enough. */
  byDrop: number | null;
  /** Minimum section required by NBR 5410 for the kind of circuit (copper). */
  byMinimum: number;
  recommended: number | null;
  /** Which criterion decided the recommended section. */
  decidedBy: 'ampacity' | 'drop' | 'minimum' | 'breaker' | null;
  iz: number | null;
  dropV: number | null;
  dropPct: number | null;
  /** Smallest standard breaker with Ib ≤ In ≤ Iz. */
  breaker: number | null;
  /** Largest standard breaker still protecting the chosen cable (In ≤ Iz). */
  breakerMax: number | null;
  /** Longest one-way length that keeps the drop within the limit with the chosen cable. */
  maxLength: number | null;
  status: 'ok' | 'warn' | 'bad';
  messages: string[];
  rows: SectionRow[];
}

/** Resistivity in Ω·mm²/m (20 °C). */
export const RESISTIVITY: Record<Material, number> = { cu: 0.0172, al: 0.0282 };

export const SECTIONS = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240] as const;

export const BREAKERS = [10, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100, 125] as const;

/**
 * NBR 5410, table 36 (PVC insulation, 70 °C): [2 loaded conductors, 3 loaded conductors] per section.
 * B1 = insulated conductors in conduit in or on a wall; C = cable fixed on a wall; D = cable in a
 * buried conduit. Aluminium starts at 16 mm².
 */
const AMPACITY: Record<Material, Record<InstallMethod, (readonly [number, number] | null)[]>> = {
  cu: {
    B1: [[17.5, 15.5], [24, 21], [32, 28], [41, 36], [57, 50], [76, 68], [101, 89], [125, 110], [151, 134], [192, 171], [232, 207], [269, 239], [309, 275], [353, 314], [415, 370]],
    C: [[19.5, 17.5], [27, 24], [36, 32], [46, 41], [63, 57], [85, 76], [112, 96], [138, 119], [168, 144], [213, 184], [258, 223], [299, 259], [344, 299], [392, 341], [461, 403]],
    D: [[22, 18], [29, 24], [38, 31], [47, 39], [63, 52], [81, 67], [104, 86], [125, 103], [148, 122], [183, 151], [216, 179], [246, 203], [278, 230], [312, 258], [361, 297]],
  },
  al: {
    B1: [null, null, null, null, null, [60, 53], [79, 70], [97, 86], [118, 104], [150, 133], [181, 161], [210, 186], [241, 214], [275, 245], [324, 288]],
    C: [null, null, null, null, null, [66, 59], [83, 73], [103, 90], [125, 110], [160, 140], [195, 170], [226, 197], [261, 227], [298, 259], [352, 305]],
    D: [null, null, null, null, null, [62, 52], [80, 66], [96, 80], [113, 94], [140, 117], [166, 138], [189, 157], [213, 178], [240, 200], [277, 230]],
  },
};

/** NBR 5410 tables 42 (bundled / in conduit; single layer on a wall) and 45 (buried conduits). */
const GROUPING: Record<InstallMethod, number[]> = {
  B1: [1, 0.8, 0.7, 0.65, 0.6, 0.57, 0.54, 0.52, 0.5, 0.5, 0.5, 0.45, 0.45, 0.45, 0.45, 0.41, 0.41, 0.41, 0.41, 0.38],
  C: [1, 0.85, 0.79, 0.75, 0.73, 0.72, 0.72, 0.71, 0.7],
  D: [1, 0.85, 0.75, 0.7, 0.65, 0.6],
};

export function groupingFactor(method: InstallMethod, circuits: number): number {
  const table = GROUPING[method];
  const n = Math.max(1, Math.floor(circuits || 1));
  return table[Math.min(n, table.length) - 1];
}

/** Table capacity (A) of a section, null when the table has no value for it. */
export function ampacity(material: Material, method: InstallMethod, loaded: 2 | 3, section: number): number | null {
  const index = SECTIONS.indexOf(section as (typeof SECTIONS)[number]);
  const pair = index >= 0 ? AMPACITY[material][method][index] : null;
  return pair ? pair[loaded === 2 ? 0 : 1] : null;
}

/** Design current Ib: P / (V·cos φ) single-phase, P / (√3·V·cos φ) three-phase. */
export function designCurrent(power: number, voltage: number, phases: 1 | 3, powerFactor: number): number {
  if (!(power > 0) || !(voltage > 0)) return 0;
  const pf = powerFactor > 0 && powerFactor <= 1 ? powerFactor : 1;
  return power / ((phases === 3 ? Math.sqrt(3) : 1) * voltage * pf);
}

/** Voltage drop in volts: 2·ρ·L·I/S single-phase, √3·ρ·L·I/S three-phase (resistive, conservative). */
export function voltageDrop(current: number, length: number, section: number, material: Material, phases: 1 | 3): number {
  const k = phases === 3 ? Math.sqrt(3) : 2;
  return (k * RESISTIVITY[material] * length * current) / section;
}

const EPS = 1e-9;

export function sizeCable(input: WireInput): WireResult | null {
  const voltage = input.voltage;
  const current = input.mode === 'power' ? designCurrent(input.power, voltage, input.phases, input.powerFactor) : input.current;
  if (!(current > 0) || !(voltage > 0) || !(input.length > 0) || !(input.maxDropPct > 0)) return null;

  const loaded: 2 | 3 = input.phases === 3 ? 3 : 2;
  const factor = groupingFactor(input.method, input.grouped);
  const izOf = (s: number) => {
    const base = ampacity(input.material, input.method, loaded, s);
    return base === null ? null : base * factor;
  };
  const maxDropV = (voltage * input.maxDropPct) / 100;
  const byMinimum = input.material === 'al' ? 16 : input.kind === 'lighting' ? 1.5 : 2.5;
  const minBreaker = BREAKERS.find((b) => b >= current - EPS) ?? null;

  const rows: SectionRow[] = [];
  for (const section of SECTIONS) {
    const iz = izOf(section);
    if (iz === null) continue;
    const dropV = voltageDrop(current, input.length, section, input.material, input.phases);
    rows.push({ section, iz, dropV, dropPct: (dropV / voltage) * 100, ampacityOk: iz >= current - EPS, dropOk: dropV <= maxDropV + EPS });
  }

  const byAmpacity = rows.find((r) => r.ampacityOk)?.section ?? null;
  const byDrop = rows.find((r) => r.dropOk)?.section ?? null;
  // Every criterion at once, plus a standard breaker that fits between Ib and Iz.
  const chosen = rows.find(
    (r) => r.section >= byMinimum && r.ampacityOk && r.dropOk && minBreaker !== null && minBreaker <= r.iz + EPS,
  );

  const messages: string[] = [];
  let decidedBy: WireResult['decidedBy'] = null;
  if (chosen) {
    const candidates: [WireResult['decidedBy'], number | null][] = [
      ['minimum', byMinimum],
      ['ampacity', byAmpacity],
      ['drop', byDrop],
    ];
    const largest = Math.max(...candidates.map(([, s]) => s ?? 0));
    decidedBy = chosen.section > largest ? 'breaker' : (candidates.find(([, s]) => s === chosen.section)?.[0] ?? null);
    if (decidedBy === 'minimum' && (byDrop ?? 0) === chosen.section) decidedBy = 'drop';
    if (decidedBy === 'minimum' && (byAmpacity ?? 0) === chosen.section) decidedBy = 'ampacity';
  }

  const breakerMax = chosen ? ([...BREAKERS].reverse().find((b) => b <= chosen.iz + EPS && b >= current - EPS) ?? null) : null;
  const maxLength = chosen ? (maxDropV * chosen.section) / ((input.phases === 3 ? Math.sqrt(3) : 2) * RESISTIVITY[input.material] * current) : null;

  let status: WireResult['status'] = 'ok';
  if (!chosen) {
    status = 'bad';
    if (minBreaker === null) messages.push('A corrente passa de 125 A: divida a carga ou use um quadro/alimentador dimensionado em projeto.');
    else messages.push('Nenhuma seção até 240 mm² atende a todos os critérios. Reduza a distância, divida o circuito ou eleve a tensão.');
  } else {
    if (chosen.section >= 35) {
      status = 'warn';
      messages.push('Seção grande para um circuito terminal: confira se vale dividir a carga ou aproximar o quadro.');
    }
    if (input.material === 'al') {
      status = 'warn';
      messages.push('Alumínio só é permitido pela NBR 5410 a partir de 16 mm² e em instalações industriais/comerciais (nunca em residências).');
    }
    if (current > 0.8 * chosen.iz) messages.push('Cabo trabalhando acima de 80% da capacidade: em carga contínua, considere uma seção acima.');
  }

  return {
    current,
    loadedConductors: loaded,
    groupingFactor: factor,
    byAmpacity,
    byDrop,
    byMinimum,
    recommended: chosen?.section ?? null,
    decidedBy,
    iz: chosen?.iz ?? null,
    dropV: chosen?.dropV ?? null,
    dropPct: chosen?.dropPct ?? null,
    breaker: chosen ? minBreaker : null,
    breakerMax,
    maxLength,
    status,
    messages,
    rows,
  };
}

/** Rows around the recommended section for the comparison table. */
export function comparisonRows(result: WireResult, before = 2, after = 2): SectionRow[] {
  const rows = result.rows;
  const anchor = result.recommended ?? result.byDrop ?? result.byAmpacity ?? rows[rows.length - 1]?.section;
  const index = Math.max(0, rows.findIndex((r) => r.section === anchor));
  return rows.slice(Math.max(0, index - before), index + after + 1);
}

/**
 * Parses numbers typed the Brazilian way: "1,5", "5.500", "1.234,5" and also "1.5".
 * Returns NaN for empty or invalid text.
 */
export function parseNumberBR(text: string | null | undefined): number {
  let value = String(text ?? '').trim().replace(/\s|R\$/g, '');
  if (!value) return NaN;
  if (value.includes(',')) value = value.replace(/\./g, '').replace(',', '.');
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(value)) value = value.replace(/\./g, '');
  return /^-?\d*\.?\d+$/.test(value) ? Number(value) : NaN;
}
