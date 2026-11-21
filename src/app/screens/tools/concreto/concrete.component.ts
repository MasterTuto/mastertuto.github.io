import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  AIR_LITRES,
  EXPOSURE_CLASSES,
  Exposure,
  MATERIALS,
  MIX_PRESETS,
  Mix,
  SAND_SWELLING,
  Shape,
  concreteMaterials,
  durability,
  elementVolume,
} from './concrete.logic';

const SHAPES: { id: Shape; label: string; fields: [string, string, string] }[] = [
  { id: 'slab', label: 'Laje / piso', fields: ['Comprimento', 'Largura', 'Espessura'] },
  { id: 'beam', label: 'Viga / pilar', fields: ['Comprimento', 'Largura', 'Altura'] },
  { id: 'footing', label: 'Sapata', fields: ['Comprimento', 'Largura', 'Altura'] },
  { id: 'pile', label: 'Broca / estaca', fields: ['Diâmetro', '', 'Profundidade'] },
];
const CUSTOM = 'custom';

const DEFAULTS = {
  byVolume: false,
  volume: '1',
  shape: 'slab' as Shape,
  length: '4',
  width: '3',
  depth: '0,1',
  diameter: '0,25',
  count: 1,
  mix: MIX_PRESETS[0].id,
  sand: '2',
  gravel: '3',
  waterCement: '0,55',
  moist: true,
  waste: '5',
  exposure: 2 as Exposure,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:concreto';

const FAQ: FaqItem[] = [
  {
    question: 'Quantos sacos de cimento vão em 1 m³ de concreto?',
    answer:
      'No traço 1 : 2 : 3 (cimento : areia : brita, em volume) com fator água/cimento 0,55, cerca de 7 sacos de 50 kg por m³, ou 340 a 370 kg de cimento conforme a umidade da areia. Traços mais magros, como o 1 : 4 : 8 de lastro, ficam perto de 3 a 4 sacos.',
  },
  {
    question: 'Qual o traço de concreto para laje?',
    answer:
      'Feito em obra, o usual é 1 : 2 : 3, que em latas de 18 L dá 1 saco de cimento, 4 latas de areia, 6 latas de brita e cerca de 1½ lata de água. A NBR 6118 pede pelo menos C25 em área urbana: para garantir essa resistência, prefira concreto usinado ou dosado em laboratório.',
  },
  {
    question: 'Como calcular o volume de concreto de uma laje?',
    answer:
      'Multiplique comprimento × largura × espessura, tudo em metros. Uma laje maciça de 4 × 3 m com 10 cm de espessura tem 4 × 3 × 0,10 = 1,2 m³. Acrescente de 5% a 10% de perda para o que fica na betoneira, nas formas e no transporte.',
  },
  {
    question: 'Por que a areia úmida muda o traço?',
    answer:
      'A areia úmida incha: a mesma massa de areia ocupa cerca de 25% mais volume. Medindo em latas, entra menos areia de verdade e o concreto fica mais rico em cimento. A calculadora corrige isso quando você marca areia úmida.',
  },
  {
    question: 'Posso colocar mais água para o concreto ficar mais mole?',
    answer:
      'Não. Água a mais aumenta o fator água/cimento, reduz a resistência e a durabilidade e aumenta as fissuras. A NBR 6118 limita o fator a/c a 0,60 em área urbana (classe II) e a 0,55 perto do mar ou de indústrias.',
  },
];

@Component({
  selector: 'app-concrete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover:not(:disabled) { background: rgb(68 74 81 / .07); }
    .step button:disabled { opacity: .35; }
    .step output { min-width: 2rem; text-align: center; font-weight: 650; font-variant-numeric: tabular-nums; }
    .mix { display: grid; gap: .35rem; }
    @media (min-width: 480px) { .mix { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .mix button { display: grid; gap: .1rem; min-height: 56px; padding: .55rem .8rem; border: 1px solid rgb(68 74 81 / .15); border-radius: .8rem; text-align: left; }
    .mix button[aria-pressed=true] { border-color: currentColor; box-shadow: inset 0 0 0 1px currentColor; }
    .mix b { font-variant-numeric: tabular-nums; }
    .mix span { font-size: .78rem; opacity: .75; }
  `,
  templateUrl: './concrete.component.html',
})
export class ConcreteCalculatorComponent {
  readonly tool = proTools[6];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly custom = CUSTOM;
  readonly shapes = SHAPES;
  readonly presets = MIX_PRESETS;
  readonly exposures = EXPOSURE_CLASSES;
  readonly wasteChips = [5, 10];
  readonly m = MATERIALS;
  readonly swelling = SAND_SWELLING;
  readonly air = AIR_LITRES;
  readonly flag = copiedFlag();

  readonly byVolume = signal(DEFAULTS.byVolume);
  readonly volume = signal(DEFAULTS.volume);
  readonly shape = signal(DEFAULTS.shape);
  readonly length = signal(DEFAULTS.length);
  readonly width = signal(DEFAULTS.width);
  readonly depth = signal(DEFAULTS.depth);
  readonly diameter = signal(DEFAULTS.diameter);
  readonly count = signal(DEFAULTS.count);
  readonly mix = signal(DEFAULTS.mix);
  readonly sand = signal(DEFAULTS.sand);
  readonly gravel = signal(DEFAULTS.gravel);
  readonly waterCement = signal(DEFAULTS.waterCement);
  readonly moist = signal(DEFAULTS.moist);
  readonly waste = signal(DEFAULTS.waste);
  readonly exposure = signal<Exposure>(DEFAULTS.exposure);

  readonly fields = computed(() => SHAPES.find((s) => s.id === this.shape())?.fields ?? SHAPES[0].fields);
  readonly wasteValue = computed(() => num(this.waste()));
  readonly volumeValue = computed(() =>
    this.byVolume()
      ? Math.max(0, num(this.volume()))
      : elementVolume({
          shape: this.shape(),
          length: num(this.length()),
          width: num(this.width()),
          depth: num(this.depth()),
          diameter: num(this.diameter()),
          count: this.count(),
        }),
  );
  readonly mixValue = computed<Mix>(() => {
    if (this.mix() === CUSTOM) return { sand: num(this.sand()), gravel: num(this.gravel()), waterCement: num(this.waterCement()) };
    return MIX_PRESETS.find((p) => p.id === this.mix()) ?? MIX_PRESETS[0];
  });
  readonly materials = computed(() => concreteMaterials(this.volumeValue(), this.mixValue(), this.moist(), this.wasteValue()));
  readonly check = computed(() => {
    const m = this.materials();
    return m ? durability(this.mixValue(), m.cementPerM3, this.exposure()) : null;
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
  }

  val = inputValue;

  ceil(value: number): number {
    return Math.ceil(value - 1e-9);
  }

  setExposure(value: string): void {
    const id = Number(value) as Exposure;
    if (EXPOSURE_CLASSES.some((e) => e.id === id)) this.exposure.set(id);
  }

  clamp(value: number): number {
    return Math.min(500, Math.max(1, value));
  }

  mixLabel(): string {
    const mix = this.mixValue();
    return `1 : ${fmt(mix.sand, 2)} : ${fmt(mix.gravel, 2)} (a/c ${fmt(mix.waterCement, 2)})`;
  }

  summaryText(): string {
    const m = this.materials();
    if (!m) return '';
    const shape = SHAPES.find((s) => s.id === this.shape());
    const piece = this.byVolume() ? 'Volume informado' : `${shape?.label}${this.count() > 1 ? ` × ${this.count()}` : ''}`;
    return [
      '*Material de concreto*',
      `${piece}: ${fmt(this.volumeValue(), 3)} m³ + ${fmt(this.wasteValue(), 1)}% de perda = ${fmt(m.volume, 2)} m³`,
      `Traço ${this.mixLabel()}, areia ${this.moist() ? 'úmida' : 'seca'}`,
      '',
      `• ${fmt(this.ceil(m.bags))} sacos de cimento 50 kg (${fmt(m.cementPerM3)} kg/m³)`,
      `• ${fmt(m.sandM3, 2)} m³ de areia média (${fmt(this.ceil(m.sandCans))} latas de 18 L)`,
      `• ${fmt(m.gravelM3, 2)} m³ de brita 1 (${fmt(this.ceil(m.gravelCans))} latas de 18 L)`,
      `• ${fmt(m.waterLitres)} L de água`,
      '',
      `Por saco: ${fmt(m.perBag.sandCans, 1)} latas de areia, ${fmt(m.perBag.gravelCans, 1)} de brita e ${fmt(m.perBag.waterLitres)} L de água.`,
    ].join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, volume: '', length: '', width: '', depth: '', diameter: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('ct-first')?.focus();
  }

  private snapshot(): State {
    return {
      byVolume: this.byVolume(),
      volume: this.volume(),
      shape: this.shape(),
      length: this.length(),
      width: this.width(),
      depth: this.depth(),
      diameter: this.diameter(),
      count: this.count(),
      mix: this.mix(),
      sand: this.sand(),
      gravel: this.gravel(),
      waterCement: this.waterCement(),
      moist: this.moist(),
      waste: this.waste(),
      exposure: this.exposure(),
    };
  }

  private apply(state: State): void {
    this.byVolume.set(Boolean(state.byVolume));
    this.volume.set(state.volume);
    this.shape.set(SHAPES.some((s) => s.id === state.shape) ? state.shape : DEFAULTS.shape);
    this.length.set(state.length);
    this.width.set(state.width);
    this.depth.set(state.depth);
    this.diameter.set(state.diameter);
    this.count.set(this.clamp(Number(state.count) || 1));
    this.mix.set(state.mix === CUSTOM || MIX_PRESETS.some((p) => p.id === state.mix) ? state.mix : DEFAULTS.mix);
    this.sand.set(state.sand);
    this.gravel.set(state.gravel);
    this.waterCement.set(state.waterCement);
    this.moist.set(Boolean(state.moist));
    this.waste.set(state.waste);
    this.exposure.set(EXPOSURE_CLASSES.some((e) => e.id === state.exposure) ? state.exposure : DEFAULTS.exposure);
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}
