/**
 * Concrete for site mixing: volume of common elements, cement content by the absolute-volume
 * formula C = (1000 − ar) / (1/γc + a/γa + p/γp + a/c), materials in bags, m³ and 18 L cans, and the
 * durability limits of ABNT NBR 6118 (table 7.1) and NBR 12655 (minimum cement). No Angular imports.
 */

export type Shape = 'slab' | 'beam' | 'footing' | 'pile';

export interface ElementInput {
  shape: Shape;
  /** Metres. Slab: length × width × thickness; beam/column and footing: length × width × height. */
  length: number;
  width: number;
  depth: number;
  /** Pile/broca: diameter in metres; `depth` is the depth. */
  diameter: number;
  count: number;
}

export function elementVolume(input: ElementInput): number {
  const count = Math.max(0, Math.floor(input.count || 0));
  if (!count) return 0;
  if (input.shape === 'pile') {
    if (!(input.diameter > 0) || !(input.depth > 0)) return 0;
    return Math.PI * (input.diameter / 2) ** 2 * input.depth * count;
  }
  if (!(input.length > 0) || !(input.width > 0) || !(input.depth > 0)) return 0;
  return input.length * input.width * input.depth * count;
}

export interface Mix {
  /** Loose volume parts per 1 part of cement: sand and gravel. */
  sand: number;
  gravel: number;
  /** Water/cement ratio by mass. */
  waterCement: number;
}

export interface MixPreset extends Mix {
  id: string;
  label: string;
  use: string;
}

/**
 * Mixes in volume used on small sites (ABCP guide for small works: 1 bag : 4 cans of sand : 6 cans of
 * gravel : 1½ can of water is the 1 : 2 : 3 mix with w/c ≈ 0,54).
 */
export const MIX_PRESETS: MixPreset[] = [
  { id: 'structural', label: '1 : 2 : 3', use: 'Lajes, vigas e pilares', sand: 2, gravel: 3, waterCement: 0.55 },
  { id: 'foundation', label: '1 : 2,5 : 3,5', use: 'Sapatas, baldrames e calçadas', sand: 2.5, gravel: 3.5, waterCement: 0.6 },
  { id: 'sidewalk', label: '1 : 3 : 4', use: 'Contrapiso de concreto e pisos externos', sand: 3, gravel: 4, waterCement: 0.65 },
  { id: 'lean', label: '1 : 4 : 8', use: 'Concreto magro (lastro)', sand: 4, gravel: 8, waterCement: 0.9 },
];

/** Material constants (kg/dm³). Specific gravity: γ; loose unit weight: δ. */
export const MATERIALS = {
  cement: { gamma: 3.1, delta: 1.39 },
  sand: { gamma: 2.65, delta: 1.5 },
  gravel: { gamma: 2.7, delta: 1.45 },
} as const;
/** Entrapped air in hand or mixer-made concrete, litres per m³. */
export const AIR_LITRES = 20;
/** Average swelling of moist sand (NBR 6467): the same mass takes ~25% more volume. */
export const SAND_SWELLING = 1.25;
export const CAN_LITRES = 18;
export const BAG_KG = 50;

export interface MixInMass {
  sand: number;
  gravel: number;
}

/** Converts volume parts to mass parts per 1 kg of cement: a = a_vol × δa / δc. */
export function massParts(mix: Mix, moistSand: boolean): MixInMass {
  const sandDelta = MATERIALS.sand.delta / (moistSand ? SAND_SWELLING : 1);
  return {
    sand: (mix.sand * sandDelta) / MATERIALS.cement.delta,
    gravel: (mix.gravel * MATERIALS.gravel.delta) / MATERIALS.cement.delta,
  };
}

/** Cement content in kg/m³ by the absolute-volume formula. */
export function cementContent(mix: Mix, moistSand = false): number {
  if (!(mix.sand >= 0) || !(mix.gravel >= 0) || !(mix.waterCement > 0)) return 0;
  const parts = massParts(mix, moistSand);
  const denominator =
    1 / MATERIALS.cement.gamma + parts.sand / MATERIALS.sand.gamma + parts.gravel / MATERIALS.gravel.gamma + mix.waterCement;
  return (1000 - AIR_LITRES) / denominator;
}

export interface ConcreteMaterials {
  volume: number;
  cementKg: number;
  bags: number;
  sandM3: number;
  gravelM3: number;
  waterLitres: number;
  sandCans: number;
  gravelCans: number;
  /** Per 50 kg bag of cement: cans of sand, cans of gravel and litres of water. */
  perBag: { sandCans: number; gravelCans: number; waterLitres: number };
  /** Concrete made with one bag, m³. */
  yieldPerBag: number;
  cementPerM3: number;
}

export function concreteMaterials(volume: number, mix: Mix, moistSand: boolean, wastePct: number): ConcreteMaterials | null {
  const cementPerM3 = cementContent(mix, moistSand);
  if (!(volume > 0) || !(cementPerM3 > 0)) return null;
  const total = volume * (1 + Math.max(0, wastePct || 0) / 100);
  const cementKg = cementPerM3 * total;
  const sandDelta = MATERIALS.sand.delta / (moistSand ? SAND_SWELLING : 1);
  const parts = massParts(mix, moistSand);
  const sandM3 = (cementKg * parts.sand) / sandDelta / 1000;
  const gravelM3 = (cementKg * parts.gravel) / MATERIALS.gravel.delta / 1000;
  const cementBagLitres = BAG_KG / MATERIALS.cement.delta;
  return {
    volume: total,
    cementKg,
    bags: cementKg / BAG_KG,
    sandM3,
    gravelM3,
    waterLitres: cementKg * mix.waterCement,
    sandCans: (sandM3 * 1000) / CAN_LITRES,
    gravelCans: (gravelM3 * 1000) / CAN_LITRES,
    perBag: {
      sandCans: (mix.sand * cementBagLitres) / CAN_LITRES,
      gravelCans: (mix.gravel * cementBagLitres) / CAN_LITRES,
      waterLitres: BAG_KG * mix.waterCement,
    },
    yieldPerBag: BAG_KG / cementPerM3,
    cementPerM3,
  };
}

export type Exposure = 1 | 2 | 3 | 4;

export interface ExposureClass {
  id: Exposure;
  name: string;
  environment: string;
  /** Reinforced concrete (CA). */
  maxWaterCement: number;
  minClass: number;
  minCement: number;
}

/** ABNT NBR 6118 table 7.1 (reinforced concrete) and NBR 12655 minimum cement content. */
export const EXPOSURE_CLASSES: ExposureClass[] = [
  { id: 1, name: 'I — Fraca', environment: 'Rural ou submerso', maxWaterCement: 0.65, minClass: 20, minCement: 260 },
  { id: 2, name: 'II — Moderada', environment: 'Urbano', maxWaterCement: 0.6, minClass: 25, minCement: 280 },
  { id: 3, name: 'III — Forte', environment: 'Marinho ou industrial', maxWaterCement: 0.55, minClass: 30, minCement: 320 },
  { id: 4, name: 'IV — Muito forte', environment: 'Industrial químico ou respingos de maré', maxWaterCement: 0.45, minClass: 40, minCement: 360 },
];

export interface Durability {
  exposure: ExposureClass;
  waterOk: boolean;
  cementOk: boolean;
}

export function durability(mix: Mix, cementPerM3: number, exposure: Exposure): Durability {
  const item = EXPOSURE_CLASSES.find((entry) => entry.id === exposure) ?? EXPOSURE_CLASSES[1];
  return {
    exposure: item,
    waterOk: mix.waterCement <= item.maxWaterCement + 1e-9,
    cementOk: cementPerM3 >= item.minCement - 1e-9,
  };
}
