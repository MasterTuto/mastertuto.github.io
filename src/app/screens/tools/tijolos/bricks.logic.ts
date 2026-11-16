/**
 * Bricks and blocks for a masonry wall: units per m² from the face of the block plus the joint,
 * net area after openings, laying mortar by the volume of the joints, and the dry materials of a
 * cement–lime–sand mortar measured in 18 L cans. No Angular imports.
 */

export type BlockFamily = 'ceramic' | 'concrete' | 'solid';

export interface BlockPreset {
  id: string;
  family: BlockFamily;
  label: string;
  /** Width (wall thickness without render), height and length in cm, as sold: L × H × C. */
  width: number;
  height: number;
  length: number;
  /** Laid on its side: the face is width × height and the wall is as thick as the length ("uma vez"). */
  across?: boolean;
}

/**
 * Common sizes. Ceramic sealing blocks follow the modular sizes of ABNT NBR 15270-1 (M = 10 cm minus
 * a 1 cm joint); concrete blocks the 39 cm family of ABNT NBR 6136; the solid brick is the common
 * 19 × 9 × 5,7 cm.
 */
export const BLOCK_PRESETS: BlockPreset[] = [
  { id: 'cer-9x19x19', family: 'ceramic', label: 'Cerâmico 9 × 19 × 19', width: 9, height: 19, length: 19 },
  { id: 'cer-9x19x29', family: 'ceramic', label: 'Cerâmico 9 × 19 × 29', width: 9, height: 19, length: 29 },
  { id: 'cer-9x19x39', family: 'ceramic', label: 'Cerâmico 9 × 19 × 39', width: 9, height: 19, length: 39 },
  { id: 'cer-11x19x29', family: 'ceramic', label: 'Cerâmico 11,5 × 19 × 29', width: 11.5, height: 19, length: 29 },
  { id: 'cer-14x19x29', family: 'ceramic', label: 'Cerâmico 14 × 19 × 29', width: 14, height: 19, length: 29 },
  { id: 'cer-14x19x39', family: 'ceramic', label: 'Cerâmico 14 × 19 × 39', width: 14, height: 19, length: 39 },
  { id: 'con-9x19x39', family: 'concrete', label: 'Concreto 9 × 19 × 39', width: 9, height: 19, length: 39 },
  { id: 'con-14x19x39', family: 'concrete', label: 'Concreto 14 × 19 × 39', width: 14, height: 19, length: 39 },
  { id: 'con-19x19x39', family: 'concrete', label: 'Concreto 19 × 19 × 39', width: 19, height: 19, length: 39 },
  { id: 'sol-half', family: 'solid', label: 'Maciço 19 × 9 × 5,7 — meia vez', width: 9, height: 5.7, length: 19 },
  { id: 'sol-full', family: 'solid', label: 'Maciço 19 × 9 × 5,7 — uma vez', width: 9, height: 5.7, length: 19, across: true },
];

export interface Wall {
  length: number;
  height: number;
}

export interface Opening {
  width: number;
  height: number;
  count: number;
}

export interface MortarMix {
  id: string;
  label: string;
  /** Loose volume parts: cement : lime : sand. */
  cement: number;
  lime: number;
  sand: number;
}

/** Mixes in volume used for sealing masonry. Lime keeps the mortar workable and less rigid than the block. */
export const MORTAR_MIXES: MortarMix[] = [
  { id: '1:2:8', label: '1 : 2 : 8 (cimento : cal : areia)', cement: 1, lime: 2, sand: 8 },
  { id: '1:1:6', label: '1 : 1 : 6 (cimento : cal : areia)', cement: 1, lime: 1, sand: 6 },
  { id: '1:0.5:4.5', label: '1 : ½ : 4½ (cimento : cal : areia)', cement: 1, lime: 0.5, sand: 4.5 },
];

/** A 50 kg bag of cement or a 20 kg bag of hydrated lime fills about two 18 L cans. */
export const CAN_LITRES = 18;
export const CEMENT_BAG_LITRES = 36;
export const LIME_BAG_LITRES = 36;
/** Extra mortar for droppings, mortar that falls into the holes and uneven joints. */
export const MORTAR_WASTE = 0.2;

export interface BlockFace {
  /** Size of the face seen on the wall, in cm. */
  faceLength: number;
  faceHeight: number;
  /** Wall thickness (raw, without render), in cm. */
  thickness: number;
}

export function blockFace(block: Pick<BlockPreset, 'width' | 'height' | 'length' | 'across'>): BlockFace {
  return block.across
    ? { faceLength: block.width, faceHeight: block.height, thickness: block.length }
    : { faceLength: block.length, faceHeight: block.height, thickness: block.width };
}

/** Units per m²: 1 / ((C + j) × (H + j)), sizes and joint in metres. */
export function blocksPerSquareMetre(face: BlockFace, jointMm: number): number {
  const joint = Math.max(0, jointMm) / 10;
  const length = face.faceLength + joint;
  const height = face.faceHeight + joint;
  if (!(length > 0) || !(height > 0)) return 0;
  return 10000 / (length * height);
}

/** Mortar of the joints per m² of wall, in m³: thickness × (1 m² − area covered by the blocks). */
export function mortarPerSquareMetre(face: BlockFace, jointMm: number): number {
  const perM2 = blocksPerSquareMetre(face, jointMm);
  if (!perM2) return 0;
  const blockArea = (face.faceLength * face.faceHeight) / 10000;
  return Math.max(0, 1 - perM2 * blockArea) * (face.thickness / 100);
}

export function grossArea(walls: readonly Wall[]): number {
  return walls.reduce((sum, wall) => sum + (wall.length > 0 && wall.height > 0 ? wall.length * wall.height : 0), 0);
}

export function openingsArea(openings: readonly Opening[]): number {
  return openings.reduce(
    (sum, item) => sum + (item.width > 0 && item.height > 0 ? item.width * item.height * Math.max(0, Math.floor(item.count || 0)) : 0),
    0,
  );
}

export interface MortarMaterials {
  /** 50 kg bags of cement. */
  cementBags: number;
  /** 20 kg bags of hydrated lime. */
  limeBags: number;
  /** Loose sand, m³. */
  sand: number;
  /** Sand in 18 L cans. */
  sandCans: number;
}

/**
 * Dry materials of `volume` m³ of mortar. Rule of practice: the binders fill the voids of the sand,
 * so the mortar yields about the loose volume of sand that went into it.
 */
export function mortarMaterials(volume: number, mix: MortarMix): MortarMaterials | null {
  if (!(volume > 0) || !(mix.sand > 0)) return null;
  const sand = volume;
  const cementLitres = (sand * 1000 * mix.cement) / mix.sand;
  const limeLitres = (sand * 1000 * mix.lime) / mix.sand;
  return {
    cementBags: cementLitres / CEMENT_BAG_LITRES,
    limeBags: limeLitres / LIME_BAG_LITRES,
    sand,
    sandCans: (sand * 1000) / CAN_LITRES,
  };
}

export interface BrickResult {
  gross: number;
  openings: number;
  net: number;
  perSquareMetre: number;
  /** Units without waste, unrounded. */
  exact: number;
  /** Units to buy: with waste, rounded up. */
  total: number;
  /** Mortar volume with `MORTAR_WASTE`, m³. */
  mortar: number;
  materials: MortarMaterials | null;
  face: BlockFace;
}

export interface BrickInput {
  walls: readonly Wall[];
  openings: readonly Opening[];
  block: Pick<BlockPreset, 'width' | 'height' | 'length' | 'across'>;
  jointMm: number;
  wastePct: number;
  mix: MortarMix;
}

export function bricks(input: BrickInput): BrickResult | null {
  const face = blockFace(input.block);
  if (!(face.faceLength > 0) || !(face.faceHeight > 0) || !(face.thickness > 0)) return null;
  const gross = grossArea(input.walls);
  if (!(gross > 0)) return null;
  const openings = Math.min(gross, openingsArea(input.openings));
  const net = gross - openings;
  const perSquareMetre = blocksPerSquareMetre(face, input.jointMm);
  const exact = net * perSquareMetre;
  const waste = Math.max(0, input.wastePct || 0) / 100;
  const mortar = net * mortarPerSquareMetre(face, input.jointMm) * (1 + MORTAR_WASTE);
  return {
    gross,
    openings,
    net,
    perSquareMetre,
    exact,
    total: Math.ceil(exact * (1 + waste) - 1e-9),
    mortar,
    materials: mortarMaterials(mortar, input.mix),
    face,
  };
}
