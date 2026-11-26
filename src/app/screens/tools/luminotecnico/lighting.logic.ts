/**
 * Lighting design by the lumen method (método dos lúmens). Pure logic, no Angular, testable with Node.
 *
 * Φ = E × A ÷ (U × FM): the luminous flux needed for an average illuminance E (lux) on the work plane of area
 * A, given the utilization factor U of the luminaire in that room and the maintenance factor FM.
 * Room index K = C × L ÷ (h × (C + L)), with h the height from the work plane to the luminaires.
 * Illuminance targets follow ABNT NBR ISO/CIE 8995-1:2013 for workplaces; homes, which the standard does
 * not cover, use the usual values of the former NBR 5413.
 */

export interface RoomPreset {
  id: string;
  group: 'Casa' | 'Trabalho' | 'Comércio e serviços';
  label: string;
  lux: number;
  /** Work plane height, m (0 for floors and circulation). */
  plane: number;
}

export const ROOM_PRESETS: RoomPreset[] = [
  { id: 'sala', group: 'Casa', label: 'Sala de estar', lux: 150, plane: 0.75 },
  { id: 'quarto', group: 'Casa', label: 'Quarto', lux: 150, plane: 0.75 },
  { id: 'cozinha', group: 'Casa', label: 'Cozinha', lux: 300, plane: 0.85 },
  { id: 'banheiro', group: 'Casa', label: 'Banheiro', lux: 200, plane: 0.75 },
  { id: 'servico', group: 'Casa', label: 'Área de serviço', lux: 200, plane: 0.85 },
  { id: 'homeoffice', group: 'Casa', label: 'Home office', lux: 500, plane: 0.75 },
  { id: 'garagem', group: 'Casa', label: 'Garagem', lux: 75, plane: 0 },
  { id: 'escritorio', group: 'Trabalho', label: 'Escritório (leitura, digitação)', lux: 500, plane: 0.75 },
  { id: 'reuniao', group: 'Trabalho', label: 'Sala de reunião', lux: 500, plane: 0.75 },
  { id: 'desenho', group: 'Trabalho', label: 'Desenho técnico', lux: 750, plane: 0.75 },
  { id: 'aula', group: 'Trabalho', label: 'Sala de aula', lux: 300, plane: 0.75 },
  { id: 'aula-noturna', group: 'Trabalho', label: 'Sala de aula noturna / adultos', lux: 500, plane: 0.75 },
  { id: 'circulacao', group: 'Trabalho', label: 'Corredor e circulação', lux: 100, plane: 0 },
  { id: 'escada', group: 'Trabalho', label: 'Escada', lux: 150, plane: 0 },
  { id: 'deposito', group: 'Trabalho', label: 'Depósito e almoxarifado', lux: 100, plane: 0 },
  { id: 'industria', group: 'Trabalho', label: 'Oficina / montagem média', lux: 300, plane: 0.85 },
  { id: 'loja', group: 'Comércio e serviços', label: 'Loja (área de vendas)', lux: 300, plane: 0.85 },
  { id: 'caixa', group: 'Comércio e serviços', label: 'Caixa / balcão', lux: 500, plane: 0.85 },
  { id: 'recepcao', group: 'Comércio e serviços', label: 'Recepção', lux: 300, plane: 0.75 },
  { id: 'restaurante', group: 'Comércio e serviços', label: 'Restaurante', lux: 200, plane: 0.75 },
  { id: 'consultorio', group: 'Comércio e serviços', label: 'Consultório', lux: 500, plane: 0.75 },
  { id: 'exame', group: 'Comércio e serviços', label: 'Sala de exame / procedimentos', lux: 1000, plane: 0.85 },
  { id: 'salao', group: 'Comércio e serviços', label: 'Salão de beleza', lux: 500, plane: 0.85 },
];

export interface LampPreset {
  id: string;
  label: string;
  /** Lumens per lamp. */
  lumens: number;
  watts: number;
}

export const LAMP_PRESETS: LampPreset[] = [
  { id: 'bulbo9', label: 'Bulbo LED 9 W', lumens: 810, watts: 9 },
  { id: 'bulbo12', label: 'Bulbo LED 12 W', lumens: 1100, watts: 12 },
  { id: 'bulbo15', label: 'Bulbo LED 15 W', lumens: 1400, watts: 15 },
  { id: 'plafon18', label: 'Plafon/painel LED 18 W', lumens: 1600, watts: 18 },
  { id: 'plafon24', label: 'Plafon/painel LED 24 W', lumens: 2200, watts: 24 },
  { id: 'painel36', label: 'Painel LED 60 × 60 36 W', lumens: 3600, watts: 36 },
  { id: 't8', label: 'Tubular LED T8 1,20 m 18 W', lumens: 1850, watts: 18 },
  { id: 'spot7', label: 'Spot LED 7 W', lumens: 560, watts: 7 },
];

export type Finish = 'claro' | 'medio' | 'escuro';
export const FINISHES: { id: Finish; label: string; detail: string }[] = [
  { id: 'claro', label: 'Claro', detail: 'Teto branco, paredes claras (70/50/20)' },
  { id: 'medio', label: 'Médio', detail: 'Teto claro, paredes em tons médios (50/30/10)' },
  { id: 'escuro', label: 'Escuro', detail: 'Teto e paredes escuros ou madeira (30/10/10)' },
];

/** Room index values of the utilization table. */
export const K_VALUES = [0.6, 0.8, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5];
/**
 * Utilization factor of a typical direct-distribution LED luminaire (downlight, plafon, embedded panel),
 * by room index and reflectances (ceiling/walls/floor). Typical catalogue values; use the manufacturer's
 * photometric table for a specific luminaire.
 */
export const UTILIZATION: Record<Finish, number[]> = {
  claro: [0.44, 0.52, 0.58, 0.64, 0.68, 0.74, 0.78, 0.81, 0.85, 0.87],
  medio: [0.37, 0.45, 0.51, 0.57, 0.61, 0.67, 0.71, 0.74, 0.78, 0.8],
  escuro: [0.32, 0.4, 0.46, 0.52, 0.56, 0.62, 0.66, 0.69, 0.73, 0.75],
};

export type Upkeep = 'limpo' | 'normal' | 'sujo';
/** Maintenance factors (lamp depreciation and dirt, CIE 97). */
export const MAINTENANCE: Record<Upkeep, { factor: number; label: string; detail: string }> = {
  limpo: { factor: 0.8, label: 'Limpo', detail: 'Escritório, casa, consultório' },
  normal: { factor: 0.7, label: 'Normal', detail: 'Loja, sala de aula, oficina leve' },
  sujo: { factor: 0.6, label: 'Sujo', detail: 'Indústria, cozinha industrial, garagem' },
};

export function roomIndex(length: number, width: number, height: number): number {
  if (!(length > 0 && width > 0 && height > 0)) return 0;
  return (length * width) / (height * (length + width));
}

/** Utilization factor, linearly interpolated in the table; clamped to the table ends. */
export function utilization(k: number, finish: Finish): number {
  const row = UTILIZATION[finish] ?? UTILIZATION.medio;
  if (k <= K_VALUES[0]) return row[0];
  if (k >= K_VALUES[K_VALUES.length - 1]) return row[row.length - 1];
  const i = K_VALUES.findIndex((value) => value >= k);
  const t = (k - K_VALUES[i - 1]) / (K_VALUES[i] - K_VALUES[i - 1]);
  return row[i - 1] + (row[i] - row[i - 1]) * t;
}

/** Grid of `count` or more luminaires that follows the room's proportions. */
export function layout(count: number, length: number, width: number): { rows: number; cols: number } {
  if (count <= 0) return { rows: 0, cols: 0 };
  let cols = Math.max(1, Math.round(Math.sqrt((count * length) / width)));
  cols = Math.min(cols, count);
  const rows = Math.ceil(count / cols);
  // Try the neighbour column counts: extra luminaires (relative to the count) weigh against spacings that
  // differ between the two directions (relative to the larger one).
  let best = { rows, cols, score: Infinity };
  for (const c of [cols - 1, cols, cols + 1]) {
    if (c < 1) continue;
    const r = Math.ceil(count / c);
    const extra = r * c - count;
    const sx = length / c;
    const sy = width / r;
    const score = (extra / count) * 3 + Math.abs(sx - sy) / Math.max(sx, sy);
    if (score < best.score) best = { rows: r, cols: c, score };
  }
  return { rows: best.rows, cols: best.cols };
}

export interface LightingInput {
  length: number;
  width: number;
  ceiling: number;
  plane: number;
  /** Suspension of the luminaire below the ceiling, m (0 when embedded or surface-mounted). */
  suspension: number;
  lux: number;
  finish: Finish;
  upkeep: Upkeep;
  lumens: number;
  watts: number;
  lampsPerLuminaire: number;
}

export interface LightingResult {
  area: number;
  height: number;
  k: number;
  u: number;
  fm: number;
  flux: number;
  needed: number;
  rows: number;
  cols: number;
  count: number;
  achievedLux: number;
  watts: number;
  /** Lighting power density, W/m². */
  density: number;
  /** W/m² per 100 lux. */
  densityPer100: number;
  spacingLength: number;
  spacingWidth: number;
  /** Spacing ÷ mounting height: above ~1,5 the light gets uneven between luminaires. */
  spacingRatio: number;
  efficacy: number;
}

export function lighting(input: LightingInput): LightingResult | null {
  const { length, width, ceiling, lux } = input;
  const height = ceiling - Math.max(0, input.plane || 0) - Math.max(0, input.suspension || 0);
  const perLuminaire = Math.max(0, input.lumens || 0) * Math.max(1, Math.floor(input.lampsPerLuminaire || 1));
  if (!(length > 0 && width > 0 && height > 0 && lux > 0 && perLuminaire > 0)) return null;
  const area = length * width;
  const k = roomIndex(length, width, height);
  const u = utilization(k, input.finish);
  const fm = MAINTENANCE[input.upkeep]?.factor ?? 0.8;
  const flux = (lux * area) / (u * fm);
  const needed = Math.max(1, Math.ceil(flux / perLuminaire - 1e-9));
  const grid = layout(needed, length, width);
  const count = grid.rows * grid.cols;
  const watts = count * Math.max(0, input.watts || 0) * Math.max(1, Math.floor(input.lampsPerLuminaire || 1));
  const spacingLength = length / grid.cols;
  const spacingWidth = width / grid.rows;
  return {
    area,
    height,
    k,
    u,
    fm,
    flux,
    needed,
    rows: grid.rows,
    cols: grid.cols,
    count,
    achievedLux: (count * perLuminaire * u * fm) / area,
    watts,
    density: watts / area,
    densityPer100: watts / area / (lux / 100),
    spacingLength,
    spacingWidth,
    spacingRatio: Math.max(spacingLength, spacingWidth) / height,
    efficacy: input.watts > 0 ? input.lumens / input.watts : 0,
  };
}
