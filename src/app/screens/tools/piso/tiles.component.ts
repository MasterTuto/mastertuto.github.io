import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  ADHESIVE_BAG_KG,
  ADHESIVE_RULES,
  DOUBLE_SPREAD_CM2,
  GROUT_DENSITY,
  LAYOUT_WASTE,
  Layout,
  Place,
  groutPerSquareMetre,
  suggestedJoint,
  tiles,
} from './tiles.logic';

const LAYOUTS: { id: Layout; label: string }[] = [
  { id: 'straight', label: 'Reta' },
  { id: 'staggered', label: 'Amarrada' },
  { id: 'diagonal', label: 'Diagonal' },
  { id: 'herringbone', label: 'Espinha' },
];
const PLACES: { id: Place; label: string }[] = [
  { id: 'floor-in', label: 'Piso interno' },
  { id: 'floor-out', label: 'Piso externo' },
  { id: 'wall-in', label: 'Parede interna' },
  { id: 'wall-out', label: 'Fachada' },
];
const SIZES: [number, number][] = [
  [30, 30],
  [45, 45],
  [60, 60],
  [60, 120],
  [90, 90],
  [20, 120],
];

const DEFAULTS = {
  byMeasures: true,
  area: '12',
  depth: '4',
  width: '3',
  tileLength: '60',
  tileWidth: '60',
  thickness: '9',
  boxArea: '1,44',
  joint: '2',
  layout: 'straight' as Layout,
  waste: '10',
  place: 'floor-in' as Place,
  porcelain: true,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:piso';

const FAQ: FaqItem[] = [
  {
    question: 'Quanto de perda devo comprar de piso?',
    answer:
      'O usual é 10% para paginação reta, 12% para amarrada (meia-junta), 15% na diagonal e de 15% a 20% em espinha de peixe. Cômodos pequenos, com muitos recortes ou peças grandes pedem a faixa de cima. Compre tudo do mesmo lote (tonalidade e calibre).',
  },
  {
    question: 'Quando é obrigatória a dupla colagem?',
    answer:
      'Em placas com área acima de 900 cm² (maiores que 30 × 30 cm), a argamassa vai na base e no verso da peça, com a desempenadeira dentada. É o que pedem as normas de execução (NBR 13753 para pisos e NBR 13754 para paredes) e os fabricantes de argamassa.',
  },
  {
    question: 'Qual argamassa usar: AC-I, AC-II ou AC-III?',
    answer:
      'Pela NBR 14081-1, AC-I serve para pisos e paredes internos com cerâmica comum; AC-II para áreas externas e porcelanato em área interna; AC-III para porcelanato em área externa, fachadas, piscinas e peças grandes. Na dúvida, siga a embalagem do revestimento.',
  },
  {
    question: 'Como calcular quanto rejunte comprar?',
    answer:
      'Os fabricantes usam a fórmula kg/m² = (C + L) ÷ (C × L) × J × E × densidade, com o comprimento C, a largura L, a junta J e a espessura E da peça em mm. Para 60 × 60 cm, 9 mm de espessura e junta de 2 mm, dá cerca de 0,1 kg/m².',
  },
  {
    question: 'Quantas caixas de porcelanato 60 × 60 para 12 m²?',
    answer:
      'Com 10% de perda, são 13,2 m². Se a caixa tem 1,44 m² (4 peças), 13,2 ÷ 1,44 = 9,2, então 10 caixas. Sempre arredonde para cima: caixa não se compra pela metade.',
  },
];

@Component({
  selector: 'app-tiles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .check { display: inline-flex; align-items: center; gap: .6rem; min-height: 44px; font-size: .9rem; cursor: pointer; }
    .check input { width: 1.15rem; height: 1.15rem; accent-color: rgb(21 28 37); }
  `,
  templateUrl: './tiles.component.html',
})
export class TilesCalculatorComponent {
  readonly tool = proTools[7];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly layouts = LAYOUTS;
  readonly places = PLACES;
  readonly sizes = SIZES;
  readonly rules = ADHESIVE_RULES;
  readonly layoutWaste = LAYOUT_WASTE;
  readonly jointChips = [1.5, 2, 3, 5];
  readonly bagKg = ADHESIVE_BAG_KG;
  readonly groutDensity = GROUT_DENSITY;
  readonly doubleSpread = DOUBLE_SPREAD_CM2;
  readonly example = groutPerSquareMetre(60, 60, 9, 2);
  readonly flag = copiedFlag();

  readonly byMeasures = signal(DEFAULTS.byMeasures);
  readonly area = signal(DEFAULTS.area);
  readonly depth = signal(DEFAULTS.depth);
  readonly width = signal(DEFAULTS.width);
  readonly tileLength = signal(DEFAULTS.tileLength);
  readonly tileWidth = signal(DEFAULTS.tileWidth);
  readonly thickness = signal(DEFAULTS.thickness);
  readonly boxArea = signal(DEFAULTS.boxArea);
  readonly joint = signal(DEFAULTS.joint);
  readonly layout = signal(DEFAULTS.layout);
  readonly waste = signal(DEFAULTS.waste);
  readonly place = signal(DEFAULTS.place);
  readonly porcelain = signal(DEFAULTS.porcelain);

  readonly areaValue = computed(() => {
    const value = this.byMeasures() ? num(this.depth()) * num(this.width()) : num(this.area());
    return value > 0 ? value : 0;
  });
  readonly wasteValue = computed(() => num(this.waste()));
  readonly suggested = computed(() => fmt(suggestedJoint(this.place(), num(this.tileLength()), num(this.tileWidth())), 1));
  readonly result = computed(() =>
    tiles({
      area: this.areaValue(),
      tileLength: num(this.tileLength()),
      tileWidth: num(this.tileWidth()),
      thicknessMm: num(this.thickness()),
      boxArea: num(this.boxArea()),
      jointMm: num(this.joint()),
      wastePct: this.wasteValue(),
      place: this.place(),
      porcelain: this.porcelain(),
    }),
  );

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
  }

  val = inputValue;
  num = num;

  checked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  fmtJoint(value: number): string {
    return fmt(value, 1);
  }

  isSize(size: [number, number]): boolean {
    return num(this.tileLength()) === size[0] && num(this.tileWidth()) === size[1];
  }

  setSize(size: [number, number]): void {
    this.tileLength.set(String(size[0]));
    this.tileWidth.set(String(size[1]));
  }

  setLayout(layout: Layout): void {
    this.layout.set(layout);
    this.waste.set(String(LAYOUT_WASTE[layout]));
  }

  bandLabel(index: number): string {
    const from = index === 0 ? 0 : ADHESIVE_RULES[index - 1].upTo;
    const to = ADHESIVE_RULES[index].upTo;
    if (!from) return `até ${fmt(to)} cm²`;
    if (to === Infinity) return `acima de ${fmt(from)} cm²`;
    return `${fmt(from)} a ${fmt(to)} cm²`;
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const place = PLACES.find((p) => p.id === this.place())?.label ?? '';
    const layout = LAYOUTS.find((l) => l.id === this.layout())?.label.toLowerCase() ?? '';
    return [
      '*Material de revestimento*',
      `${place}: ${fmt(this.areaValue(), 2)} m², paginação ${layout} (${fmt(this.wasteValue(), 1)}% de perda)`,
      `Peça ${fmt(num(this.tileLength()), 1)} × ${fmt(num(this.tileWidth()), 1)} cm${this.porcelain() ? ' (porcelanato)' : ''}, junta de ${fmt(num(this.joint()), 1)} mm`,
      '',
      r.boxes ? `• ${fmt(r.boxes)} caixas de ${fmt(num(this.boxArea()), 2)} m² (${fmt(r.boughtArea, 2)} m², ~${fmt(r.tiles)} peças)` : `• ${fmt(r.tiles)} peças`,
      `• ${fmt(r.adhesiveBags)} sacos de argamassa ${r.adhesiveType} de ${ADHESIVE_BAG_KG} kg (${r.adhesive.double ? 'dupla colagem' : 'colagem simples'}, ${r.adhesive.trowel})`,
      `• ${fmt(Math.ceil(r.groutKg * 10) / 10, 1)} kg de rejunte`,
    ].join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, area: '', depth: '', width: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('pi-first')?.focus();
  }

  private snapshot(): State {
    return {
      byMeasures: this.byMeasures(),
      area: this.area(),
      depth: this.depth(),
      width: this.width(),
      tileLength: this.tileLength(),
      tileWidth: this.tileWidth(),
      thickness: this.thickness(),
      boxArea: this.boxArea(),
      joint: this.joint(),
      layout: this.layout(),
      waste: this.waste(),
      place: this.place(),
      porcelain: this.porcelain(),
    };
  }

  private apply(state: State): void {
    this.byMeasures.set(Boolean(state.byMeasures));
    this.area.set(state.area);
    this.depth.set(state.depth);
    this.width.set(state.width);
    this.tileLength.set(state.tileLength);
    this.tileWidth.set(state.tileWidth);
    this.thickness.set(state.thickness);
    this.boxArea.set(state.boxArea);
    this.joint.set(state.joint);
    this.layout.set(state.layout in LAYOUT_WASTE ? state.layout : DEFAULTS.layout);
    this.waste.set(state.waste);
    this.place.set(PLACES.some((p) => p.id === state.place) ? state.place : DEFAULTS.place);
    this.porcelain.set(Boolean(state.porcelain));
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}
