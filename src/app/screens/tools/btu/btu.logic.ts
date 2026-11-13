/**
 * Air-conditioning capacity by the rule of thumb used in Brazil (600/800 BTU/h per m², +600 per extra
 * person and per heat-emitting appliance), commercial size and estimated energy use. No Angular imports.
 */

export type SunExposure = 'none' | 'morning' | 'afternoon';
export type RoomKind = 'bedroom' | 'living' | 'office' | 'kitchen';

export interface BtuInput {
  area: number;
  people: number;
  devices: number;
  sun: SunExposure;
  room: RoomKind;
  /** Ceiling height in metres; above 3 m the area share grows in proportion. */
  ceiling: number;
}

export interface BtuBreakdown {
  perSquareMetre: number;
  areaShare: number;
  ceilingFactor: number;
  peopleShare: number;
  devicesShare: number;
  kitchenShare: number;
  total: number;
}

export interface Recommendation {
  /** Number of units. */
  units: number;
  /** Capacity of each unit in BTU/h. */
  capacity: number;
}

export const BTU_PER_M2: Record<SunExposure, number> = { none: 600, morning: 600, afternoon: 800 };
export const BTU_PER_PERSON = 600;
export const BTU_PER_DEVICE = 600;
/** Kitchen: stove and fridge counted as two extra appliances. */
export const BTU_KITCHEN = 1200;
export const CEILING_LIMIT = 3;

/** Wall/split sizes commonly sold in Brazil (BTU/h). */
export const COMMERCIAL_SIZES = [7500, 9000, 12000, 18000, 22000, 24000, 30000, 36000, 48000, 60000] as const;

/** 1 BTU/h in watts. */
export const WATTS_PER_BTU_H = 0.29307107;

/**
 * Average electric power as a fraction of the cooling capacity (W/W). Conventional (on/off): nominal
 * COP ≈ 3.2 with the compressor running ~80% of the time → 0.8/3.2 = 0.25. Inverter: seasonal
 * performance (IDRS) ≈ 5.5, which already accounts for the reduced speed at part load → 1/5.5.
 */
export const POWER_RATIO = { conventional: 0.8 / 3.2, inverter: 1 / 5.5 } as const;

export function btuBreakdown(input: BtuInput): BtuBreakdown | null {
  if (!(input.area > 0)) return null;
  const perSquareMetre = BTU_PER_M2[input.sun];
  const ceilingFactor = input.ceiling > CEILING_LIMIT ? input.ceiling / CEILING_LIMIT : 1;
  const areaShare = input.area * perSquareMetre * ceilingFactor;
  const peopleShare = Math.max(0, Math.floor(input.people || 0) - 1) * BTU_PER_PERSON;
  const devicesShare = Math.max(0, Math.floor(input.devices || 0)) * BTU_PER_DEVICE;
  const kitchenShare = input.room === 'kitchen' ? BTU_KITCHEN : 0;
  return {
    perSquareMetre,
    areaShare,
    ceilingFactor,
    peopleShare,
    devicesShare,
    kitchenShare,
    total: Math.round(areaShare + peopleShare + devicesShare + kitchenShare),
  };
}

/** Smallest commercial size that covers the load; above 60.000 BTU/h, split it between equal units. */
export function recommend(btu: number): Recommendation | null {
  if (!(btu > 0)) return null;
  const largest = COMMERCIAL_SIZES[COMMERCIAL_SIZES.length - 1];
  const units = Math.max(1, Math.ceil(btu / largest));
  const each = btu / units;
  const capacity = COMMERCIAL_SIZES.find((size) => size >= each) ?? largest;
  return { units, capacity };
}

export interface Consumption {
  watts: number;
  kwhMonth: number;
  costMonth: number;
}

/** Estimated monthly use for `hours` a day over 30 days. */
export function consumption(totalBtu: number, kind: keyof typeof POWER_RATIO, hours: number, tariff: number): Consumption | null {
  if (!(totalBtu > 0) || !(hours > 0)) return null;
  const watts = totalBtu * WATTS_PER_BTU_H * POWER_RATIO[kind];
  const kwhMonth = (watts * Math.min(hours, 24) * 30) / 1000;
  return { watts, kwhMonth, costMonth: tariff > 0 ? kwhMonth * tariff : 0 };
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
