import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  BREAKERS,
  CircuitKind,
  InstallMethod,
  Material,
  comparisonRows,
  parseNumberBR,
  sizeCable,
} from './wire-gauge.logic';

type SystemId = 'mono127' | 'mono220' | 'bi220' | 'tri220' | 'tri380' | 'custom';

const SYSTEMS: { id: SystemId; label: string; phases: 1 | 3; voltage: number }[] = [
  { id: 'mono127', label: '127 V mono', phases: 1, voltage: 127 },
  { id: 'bi220', label: '220 V bifásico', phases: 1, voltage: 220 },
  { id: 'mono220', label: '220 V mono', phases: 1, voltage: 220 },
  { id: 'tri220', label: '220 V trifásico', phases: 3, voltage: 220 },
  { id: 'tri380', label: '380 V trifásico', phases: 3, voltage: 380 },
  { id: 'custom', label: 'Outra', phases: 1, voltage: 0 },
];

const LOADS: { label: string; watts: number; pf: number; kind: CircuitKind }[] = [
  { label: 'Chuveiro 5.500 W', watts: 5500, pf: 1, kind: 'power' },
  { label: 'Chuveiro 7.500 W', watts: 7500, pf: 1, kind: 'power' },
  { label: 'Ar 9.000 BTU', watts: 900, pf: 0.92, kind: 'power' },
  { label: 'Ar 12.000 BTU', watts: 1200, pf: 0.92, kind: 'power' },
  { label: 'Forno 3.000 W', watts: 3000, pf: 1, kind: 'power' },
  { label: 'Cooktop 7.000 W', watts: 7000, pf: 1, kind: 'power' },
  { label: 'Tomadas TUG 1.270 W', watts: 1270, pf: 1, kind: 'power' },
  { label: 'Iluminação 600 W', watts: 600, pf: 1, kind: 'lighting' },
];

const METHODS: { id: InstallMethod; label: string; hint: string }[] = [
  { id: 'B1', label: 'Eletroduto embutido', hint: 'B1 · condutores isolados em eletroduto na parede' },
  { id: 'C', label: 'Cabo na parede', hint: 'C · cabo fixado direto na parede ou canaleta aberta' },
  { id: 'D', label: 'Enterrado', hint: 'D · cabo em eletroduto enterrado no solo' },
];

const DEFAULTS = {
  system: 'bi220' as SystemId,
  customVoltage: '',
  customPhases: 1 as 1 | 3,
  mode: 'power' as 'power' | 'current',
  power: '5500',
  current: '',
  pf: 1,
  kind: 'power' as CircuitKind,
  length: '20',
  maxDrop: 4,
  material: 'cu' as Material,
  method: 'B1' as InstallMethod,
  grouped: 1,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:bitola';

const FAQ: FaqItem[] = [
  {
    question: 'Qual a bitola do fio para um chuveiro de 5.500 W em 220 V?',
    answer:
      'A corrente é 5.500 ÷ 220 = 25 A. Em eletroduto embutido (método B1), o cabo de 2,5 mm² conduz 24 A, então o mínimo é 4 mm² (32 A), com disjuntor de 25 A ou 32 A. Em circuitos longos, a queda de tensão pode exigir 6 mm².',
  },
  {
    question: 'Qual a queda de tensão máxima permitida pela NBR 5410?',
    answer:
      'Nos circuitos terminais a queda não deve passar de 4% a partir do quadro de distribuição. Somando o trecho desde o ponto de entrega, o limite total é de 5% (alimentação por rede pública em baixa tensão) ou 7% (com transformador ou geração própria).',
  },
  {
    question: 'Por que a calculadora indica um cabo maior do que a corrente pede?',
    answer:
      'O cabo indicado é o maior entre três critérios: capacidade de condução, queda de tensão e seção mínima da norma (1,5 mm² para iluminação e 2,5 mm² para tomadas). Também precisa existir um disjuntor padronizado entre a corrente do circuito e a capacidade do cabo.',
  },
  {
    question: 'Como escolher o disjuntor do circuito?',
    answer:
      'O disjuntor precisa ter corrente nominal maior ou igual à corrente de projeto e menor ou igual à capacidade de condução do cabo já corrigida (Ib ≤ In ≤ Iz). Assim ele não desarma em uso normal e protege o cabo contra sobrecarga.',
  },
  {
    question: 'A calculadora substitui um projeto elétrico?',
    answer:
      'Não. Ela dá uma estimativa rápida para conferência em campo. Temperatura ambiente, cabos de outro isolamento (EPR/XLPE), harmônicas e coordenação com DR e DPS exigem projeto de um profissional habilitado, com ART ou TRT.',
  },
];

@Component({
  selector: 'app-wire-gauge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerEraser, tablerMinus, tablerPlus })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover { background: rgb(68 74 81 / .07); }
    .step output { min-width: 2.25rem; text-align: center; font-weight: 650; font-variant-numeric: tabular-nums; }
    tr.on td { background: rgb(122 112 225 / .1); font-weight: 650; }
    details > summary::-webkit-details-marker { display: none; }
  `,
  templateUrl: './wire-gauge.component.html',
})
export class WireGaugeCalculatorComponent {
  readonly tool = proTools[0];
  readonly faq = FAQ;
  readonly systems = SYSTEMS;
  readonly loads = LOADS;
  readonly methods = METHODS;
  readonly pfs = [1, 0.92, 0.85, 0.8];
  readonly drops = [2, 4, 5, 7];
  readonly breakers = BREAKERS.join(', ');
  readonly referenceTable: [number, number, number, number, number][] = [
    [1.5, 17.5, 15.5, 19.5, 17.5], [2.5, 24, 21, 27, 24], [4, 32, 28, 36, 32], [6, 41, 36, 46, 41],
    [10, 57, 50, 63, 57], [16, 76, 68, 85, 76], [25, 101, 89, 112, 96], [35, 125, 110, 138, 119],
  ];

  readonly system = signal(DEFAULTS.system);
  readonly customVoltage = signal(DEFAULTS.customVoltage);
  readonly customPhases = signal(DEFAULTS.customPhases);
  readonly mode = signal(DEFAULTS.mode);
  readonly power = signal(DEFAULTS.power);
  readonly current = signal(DEFAULTS.current);
  readonly pf = signal(DEFAULTS.pf);
  readonly kind = signal(DEFAULTS.kind);
  readonly length = signal(DEFAULTS.length);
  readonly maxDrop = signal(DEFAULTS.maxDrop);
  readonly material = signal(DEFAULTS.material);
  readonly method = signal(DEFAULTS.method);
  readonly grouped = signal(DEFAULTS.grouped);

  readonly lengthValue = computed(() => parseNumberBR(this.length()) || 0);
  readonly methodHint = computed(() => METHODS.find((m) => m.id === this.method())?.hint ?? '');

  readonly result = computed(() => {
    const system = SYSTEMS.find((s) => s.id === this.system()) ?? SYSTEMS[1];
    const custom = system.id === 'custom';
    return sizeCable({
      phases: custom ? this.customPhases() : system.phases,
      voltage: custom ? parseNumberBR(this.customVoltage()) : system.voltage,
      mode: this.mode(),
      power: parseNumberBR(this.power()),
      current: parseNumberBR(this.current()),
      powerFactor: this.pf(),
      length: this.lengthValue(),
      maxDropPct: this.maxDrop(),
      material: this.material(),
      method: this.method(),
      grouped: this.grouped(),
      kind: this.kind(),
    });
  });

  readonly rows = computed(() => {
    const r = this.result();
    return r ? comparisonRows(r) : [];
  });

  private readonly restored = signal(false);

  constructor() {
    useProToolSeo(this.tool, this.faq);
    afterNextRender(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<State> | null;
        if (saved) this.apply({ ...DEFAULTS, ...saved });
      } catch {
        /* storage unavailable or corrupted */
      }
      this.restored.set(true);
    });
    effect(() => {
      const state = this.snapshot();
      if (!this.restored()) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch {
        /* private mode */
      }
    });
  }

  val(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  fmt(value: number, digits = 0): string {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  sec(section: number): string {
    return section.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
  }

  isLoad(load: (typeof LOADS)[number]): boolean {
    return parseNumberBR(this.power()) === load.watts && this.pf() === load.pf && this.kind() === load.kind;
  }

  pickLoad(load: (typeof LOADS)[number]): void {
    this.power.set(String(load.watts));
    this.pf.set(load.pf);
    this.kind.set(load.kind);
  }

  clear(): void {
    this.apply({ ...DEFAULTS, power: '', current: '', length: '' });
    (document.getElementById('wg-load') as HTMLInputElement | null)?.focus();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  private snapshot(): State {
    return {
      system: this.system(),
      customVoltage: this.customVoltage(),
      customPhases: this.customPhases(),
      mode: this.mode(),
      power: this.power(),
      current: this.current(),
      pf: this.pf(),
      kind: this.kind(),
      length: this.length(),
      maxDrop: this.maxDrop(),
      material: this.material(),
      method: this.method(),
      grouped: this.grouped(),
    };
  }

  private apply(state: State): void {
    this.system.set(state.system);
    this.customVoltage.set(state.customVoltage);
    this.customPhases.set(state.customPhases);
    this.mode.set(state.mode);
    this.power.set(state.power);
    this.current.set(state.current);
    this.pf.set(state.pf);
    this.kind.set(state.kind);
    this.length.set(state.length);
    this.maxDrop.set(state.maxDrop);
    this.material.set(state.material);
    this.method.set(state.method);
    this.grouped.set(state.grouped);
  }
}
