/**
 * Floor and wall tiles: boxes with waste by layout, adhesive mortar by tile size (single or double
 * spreading, ABNT NBR 13753/13754) and grout by the manufacturers' formula
 * kg/m² = (C + L) / (C × L) × J × E × ρ. No Angular imports.
 */

export type Layout = 'straight' | 'staggered' | 'diagonal' | 'herringbone';
export type Place = 'floor-in' | 'floor-out' | 'wall-in' | 'wall-out';

export const LAYOUT_WASTE: Record<Layout, number> = { straight: 10, staggered: 12, diagonal: 15, herringbone: 18 };

export interface TileInput {
  /** m² to cover. */
  area: number;
  /** Tile size in cm and thickness in mm. */
  tileLength: number;
  tileWidth: number;
  thicknessMm: number;
  /** m² per box, as printed on the box. */
  boxArea: number;
  jointMm: number;
  wastePct: number;
  place: Place;
  /** Porcelain tile (absorption ≤ 0,5%): needs AC-II or AC-III. */
  porcelain: boolean;
}

/** Hardened grout density (kg/dm³) used by manufacturers for cement-based grout. */
export const GROUT_DENSITY = 1.6;
/** Area above which the mortar goes on the substrate and on the back of the tile (cm²). */
export const DOUBLE_SPREAD_CM2 = 900;
export const ADHESIVE_BAG_KG = 20;

export interface AdhesiveRule {
  /** Upper bound of the tile area band, cm². */
  upTo: number;
  trowel: string;
  kgPerM2: number;
  double: boolean;
}

/** Consumption bands from manufacturers' data sheets (Quartzolit, Votorantim, Portobello). */
export const ADHESIVE_RULES: AdhesiveRule[] = [
  { upTo: 400, trowel: 'dentes 6 × 6 × 6 mm', kgPerM2: 4, double: false },
  { upTo: DOUBLE_SPREAD_CM2, trowel: 'dentes 8 × 8 × 8 mm', kgPerM2: 5, double: false },
  { upTo: 3600, trowel: 'dentes 8 × 8 × 8 mm', kgPerM2: 8, double: true },
  { upTo: Infinity, trowel: 'dentes 10 × 10 × 10 mm', kgPerM2: 10, double: true },
];

export function adhesiveRule(tileAreaCm2: number): AdhesiveRule {
  return ADHESIVE_RULES.find((rule) => tileAreaCm2 <= rule.upTo) ?? ADHESIVE_RULES[ADHESIVE_RULES.length - 1];
}

/** Adhesive mortar type (ABNT NBR 14081-1): AC-I indoors; AC-II outdoors; AC-III for porcelain and large tiles. */
export function adhesiveType(place: Place, porcelain: boolean, tileAreaCm2: number): 'AC-I' | 'AC-II' | 'AC-III' {
  const outdoor = place === 'floor-out' || place === 'wall-out';
  if (place === 'wall-out' || tileAreaCm2 > 3600 || (porcelain && outdoor)) return 'AC-III';
  if (outdoor || porcelain) return 'AC-II';
  return 'AC-I';
}

/** Grout in kg/m²: (C + L) / (C × L) × J × E × ρ, sizes and joint in mm, ρ in kg/dm³. */
export function groutPerSquareMetre(tileLengthCm: number, tileWidthCm: number, thicknessMm: number, jointMm: number): number {
  const length = tileLengthCm * 10;
  const width = tileWidthCm * 10;
  if (!(length > 0) || !(width > 0) || !(thicknessMm > 0) || !(jointMm > 0)) return 0;
  return ((length + width) / (length * width)) * jointMm * thicknessMm * GROUT_DENSITY;
}

/** Tiles per m² counting the joint. */
export function tilesPerSquareMetre(tileLengthCm: number, tileWidthCm: number, jointMm: number): number {
  const joint = Math.max(0, jointMm) / 10;
  const length = tileLengthCm + joint;
  const width = tileWidthCm + joint;
  if (!(tileLengthCm > 0) || !(tileWidthCm > 0)) return 0;
  return 10000 / (length * width);
}

/** Minimum joint suggested by manufacturers: rectified tiles 1,5–2 mm, others 3 mm, outdoors 5 mm. */
export function suggestedJoint(place: Place, tileLengthCm: number, tileWidthCm: number): number {
  if (place === 'floor-out' || place === 'wall-out') return 5;
  return Math.max(tileLengthCm, tileWidthCm) >= 60 ? 2 : 3;
}

export interface TileResult {
  tileAreaCm2: number;
  areaWithWaste: number;
  boxes: number;
  /** Area actually bought (boxes × box area). */
  boughtArea: number;
  tiles: number;
  adhesive: AdhesiveRule;
  adhesiveType: 'AC-I' | 'AC-II' | 'AC-III';
  adhesiveKg: number;
  adhesiveBags: number;
  groutPerM2: number;
  groutKg: number;
}

export function tiles(input: TileInput): TileResult | null {
  if (!(input.area > 0) || !(input.tileLength > 0) || !(input.tileWidth > 0)) return null;
  const waste = Math.max(0, input.wastePct || 0) / 100;
  const tileAreaCm2 = input.tileLength * input.tileWidth;
  const areaWithWaste = input.area * (1 + waste);
  const boxes = input.boxArea > 0 ? Math.ceil(areaWithWaste / input.boxArea - 1e-9) : 0;
  const tileArea = tileAreaCm2 / 10000;
  const tilesPerBox = input.boxArea > 0 ? Math.max(1, Math.round(input.boxArea / tileArea)) : 0;
  const tiles = boxes ? boxes * tilesPerBox : Math.ceil(areaWithWaste / tileArea - 1e-9);
  const adhesive = adhesiveRule(tileAreaCm2);
  // Adhesive and grout: 10% for droppings and the bucket, on the area actually laid.
  const adhesiveKg = adhesive.kgPerM2 * input.area * 1.1;
  const groutPerM2 = groutPerSquareMetre(input.tileLength, input.tileWidth, input.thicknessMm, input.jointMm);
  return {
    tileAreaCm2,
    areaWithWaste,
    boxes,
    boughtArea: boxes * input.boxArea,
    tiles,
    adhesive,
    adhesiveType: adhesiveType(input.place, input.porcelain, tileAreaCm2),
    adhesiveKg,
    adhesiveBags: Math.ceil(adhesiveKg / ADHESIVE_BAG_KG - 1e-9),
    groutPerM2,
    groutKg: groutPerM2 * input.area * 1.1,
  };
}
