import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser, tablerPlus, tablerX } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  BLOCK_PRESETS,
  BlockPreset,
  MORTAR_MIXES,
  MORTAR_WASTE,
  blockFace,
  blocksPerSquareMetre,
  bricks,
} from './bricks.logic';

interface WallRow {
  length: string;
  height: string;
}
interface OpeningRow {
  width: string;
  height: string;
  count: string;
}

const CUSTOM = 'custom';
const DEFAULTS = {
  walls: [{ length: '4', height: '2,8' }] as WallRow[],
  openings: [{ width: '0,8', height: '2,1', count: '1' }] as OpeningRow[],
  block: 'cer-9x19x19',
  customWidth: '9',
  customHeight: '19',
  customLength: '29',
  joint: '10',
  waste: '5',
  mix: MORTAR_MIXES[0].id,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:tijolos';

const OPENING_PRESETS = [
  { label: 'Porta 0,80 × 2,10', width: '0,8', height: '2,1' },
  { label: 'Janela 1,20 × 1,00', width: '1,2', height: '1' },
  { label: 'Basculante 0,60 × 0,60', width: '0,6', height: '0,6' },
];

const FAQ: FaqItem[] = [
  {
    question: 'Quantos tijolos de 9 × 19 × 19 vão em 1 m² de parede?',
    answer:
      'Com junta de 1 cm, cada bloco ocupa 20 × 20 cm na parede, então são 1 ÷ (0,20 × 0,20) = 25 blocos por m². Some a perda (5% é o usual para quebras e cortes) e arredonde para cima.',
  },
  {
    question: 'Quantos blocos de concreto 14 × 19 × 39 por m²?',
    answer:
      'Com junta de 1 cm, cada bloco ocupa 40 × 20 cm, ou 0,08 m², o que dá 12,5 blocos por m². O mesmo vale para os blocos de 9 e 19 cm de largura da família 39, porque a face vista é igual.',
  },
  {
    question: 'Preciso descontar portas e janelas?',
    answer:
      'Para comprar material, sim: o bloco não vai no vão. A calculadora desconta todos os vãos informados. Se você cobra mão de obra por m², combine com o cliente se os vãos pequenos entram ou não na medição.',
  },
  {
    question: 'Qual a espessura certa da junta de assentamento?',
    answer:
      'O usual em alvenaria de vedação é 10 mm na horizontal e na vertical. Juntas mais grossas gastam mais argamassa e deixam a parede menos resistente; juntas finas demais não acomodam as diferenças de tamanho dos blocos.',
  },
  {
    question: 'Quanto cimento vai na argamassa de assentamento?',
    answer:
      'No traço 1 : 2 : 8 (cimento : cal : areia, em volume), cada m³ de argamassa leva cerca de 3,5 sacos de cimento de 50 kg, 7 sacos de cal de 20 kg e 1 m³ de areia. Uma parede de 9 × 19 × 19 gasta perto de 0,01 m³ de argamassa por m².',
  },
];

@Component({
  selector: 'app-bricks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser, tablerPlus, tablerX })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: start; gap: 1rem; } .f > .pro-label { padding-top: .8rem; } }
    .row { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) 44px; align-items: center; gap: .5rem; }
    .row.three { grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) 4.5rem 44px; }
    .row + .row { margin-top: .5rem; }
    .x { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .x:hover { background: rgb(68 74 81 / .07); }
    .add { display: inline-flex; align-items: center; gap: .35rem; min-height: 44px; font-size: .875rem; font-weight: 600; }
  `,
  templateUrl: './bricks.component.html',
})
export class BricksCalculatorComponent {
  readonly tool = proTools[5];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly custom = CUSTOM;
  readonly mixes = MORTAR_MIXES;
  readonly mortarWaste = MORTAR_WASTE;
  readonly openingPresets = OPENING_PRESETS;
  readonly jointChips = [10, 12, 15];
  readonly wasteChips = [3, 5, 10];
  readonly blockGroups = [
    { label: 'Bloco cerâmico de vedação', items: BLOCK_PRESETS.filter((item) => item.family === 'ceramic') },
    { label: 'Bloco de concreto', items: BLOCK_PRESETS.filter((item) => item.family === 'concrete') },
    { label: 'Tijolo maciço', items: BLOCK_PRESETS.filter((item) => item.family === 'solid') },
  ];
  readonly table = BLOCK_PRESETS.map((item) => {
    const face = blockFace(item);
    return { label: item.label, perM2: blocksPerSquareMetre(face, 10), thickness: face.thickness };
  });
  readonly flag = copiedFlag();

  readonly walls = signal<WallRow[]>(DEFAULTS.walls);
  readonly openings = signal<OpeningRow[]>(DEFAULTS.openings);
  readonly block = signal(DEFAULTS.block);
  readonly customWidth = signal(DEFAULTS.customWidth);
  readonly customHeight = signal(DEFAULTS.customHeight);
  readonly customLength = signal(DEFAULTS.customLength);
  readonly joint = signal(DEFAULTS.joint);
  readonly waste = signal(DEFAULTS.waste);
  readonly mix = signal(DEFAULTS.mix);

  readonly jointValue = computed(() => num(this.joint()));
  readonly wasteValue = computed(() => num(this.waste()));
  readonly selected = computed<Pick<BlockPreset, 'width' | 'height' | 'length' | 'across'>>(() => {
    if (this.block() === CUSTOM) {
      return { width: num(this.customWidth()), height: num(this.customHeight()), length: num(this.customLength()) };
    }
    return BLOCK_PRESETS.find((item) => item.id === this.block()) ?? BLOCK_PRESETS[0];
  });
  readonly isSolid = computed(() => BLOCK_PRESETS.find((item) => item.id === this.block())?.family === 'solid');
  readonly face = computed(() => {
    const face = blockFace(this.selected());
    return face.faceLength > 0 && face.faceHeight > 0 && face.thickness > 0 ? face : null;
  });

  readonly result = computed(() =>
    bricks({
      walls: this.walls().map((wall) => ({ length: num(wall.length), height: num(wall.height) })),
      openings: this.openings().map((item) => ({ width: num(item.width), height: num(item.height), count: num(item.count) })),
      block: this.selected(),
      jointMm: this.jointValue(),
      wastePct: this.wasteValue(),
      mix: MORTAR_MIXES.find((item) => item.id === this.mix()) ?? MORTAR_MIXES[0],
    }),
  );

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
  }

  val = inputValue;

  ceil(value: number): number {
    return Math.ceil(value - 1e-9);
  }

  mixShort(id: string): string {
    return id.replace('0.5', '½').replace('4.5', '4½');
  }

  setWall(index: number, key: keyof WallRow, value: string): void {
    this.walls.update((rows) => rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  }

  addWall(): void {
    const last = this.walls()[this.walls().length - 1];
    this.walls.update((rows) => [...rows, { length: '', height: last?.height ?? '' }]);
  }

  removeWall(index: number): void {
    this.walls.update((rows) => (rows.length > 1 ? rows.filter((_, i) => i !== index) : rows));
  }

  setOpening(index: number, key: keyof OpeningRow, value: string): void {
    this.openings.update((rows) => rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  }

  addOpening(width: string, height: string): void {
    const existing = this.openings().findIndex((row) => width && row.width === width && row.height === height);
    if (existing >= 0) {
      this.setOpening(existing, 'count', String((num(this.openings()[existing].count) || 0) + 1));
      return;
    }
    this.openings.update((rows) => [...rows, { width, height, count: '1' }]);
  }

  removeOpening(index: number): void {
    this.openings.update((rows) => rows.filter((_, i) => i !== index));
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const name = this.block() === CUSTOM
      ? `${fmt(this.selected().width, 1)} × ${fmt(this.selected().height, 1)} × ${fmt(this.selected().length, 1)} cm`
      : `${BLOCK_PRESETS.find((item) => item.id === this.block())?.label} cm`;
    const lines = [
      '*Material de alvenaria*',
      `Área de parede: ${fmt(r.gross, 2)} m² − vãos ${fmt(r.openings, 2)} m² = ${fmt(r.net, 2)} m²`,
      `Bloco: ${name}, junta de ${fmt(this.jointValue(), 1)} mm`,
      '',
      `• ${fmt(r.total)} ${this.isSolid() ? 'tijolos' : 'blocos'} (${fmt(r.perSquareMetre, 2)}/m² + ${fmt(this.wasteValue(), 1)}% de perda)`,
    ];
    if (r.materials) {
      lines.push(
        `• Argamassa ${this.mixShort(this.mix())}: ${fmt(r.mortar, 3)} m³`,
        `  – ${fmt(this.ceil(r.materials.cementBags))} saco(s) de cimento 50 kg`,
        ...(r.materials.limeBags > 0 ? [`  – ${fmt(this.ceil(r.materials.limeBags))} saco(s) de cal hidratada 20 kg`] : []),
        `  – ${fmt(r.materials.sand, 2)} m³ de areia média (${fmt(this.ceil(r.materials.sandCans))} latas de 18 L)`,
      );
    }
    return lines.join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, walls: [{ length: '', height: '' }], openings: [] });
    forgetState(STORAGE_KEY);
    document.getElementById('tj-wall')?.focus();
  }

  private snapshot(): State {
    return {
      walls: this.walls(),
      openings: this.openings(),
      block: this.block(),
      customWidth: this.customWidth(),
      customHeight: this.customHeight(),
      customLength: this.customLength(),
      joint: this.joint(),
      waste: this.waste(),
      mix: this.mix(),
    };
  }

  private apply(state: State): void {
    this.walls.set(Array.isArray(state.walls) && state.walls.length ? state.walls : DEFAULTS.walls);
    this.openings.set(Array.isArray(state.openings) ? state.openings : []);
    this.block.set(state.block === CUSTOM || BLOCK_PRESETS.some((item) => item.id === state.block) ? state.block : DEFAULTS.block);
    this.customWidth.set(state.customWidth);
    this.customHeight.set(state.customHeight);
    this.customLength.set(state.customLength);
    this.joint.set(state.joint);
    this.waste.set(state.waste);
    this.mix.set(MORTAR_MIXES.some((item) => item.id === state.mix) ? state.mix : DEFAULTS.mix);
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}
