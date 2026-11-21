import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import { CRITERIA, Criterion, HEADROOM, StairPlan, planStair } from './stairs.logic';

const DEFAULTS = {
  rise: '288',
  space: '',
  criterion: 'private' as Criterion,
  slab: '12',
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:escada';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular quantos degraus uma escada precisa?',
    answer:
      'Divida a altura de piso a piso pela altura de espelho desejada (perto de 17 cm) e arredonde: 288 cm ÷ 17 ≈ 17 espelhos de 16,9 cm. A escada reta tem um piso a menos que espelhos, porque o último degrau é o próprio andar de cima: 16 pisos.',
  },
  {
    question: 'O que é a fórmula de Blondel?',
    answer:
      'É a relação entre o passo humano e o degrau: duas alturas de espelho mais um piso devem ficar perto de 63 a 64 cm (2e + p). A NBR 9050 aceita de 63 a 65 cm e a NBR 9077, de 63 a 64 cm. Fora dessa faixa, a escada cansa ou faz tropeçar.',
  },
  {
    question: 'Qual a altura máxima do degrau?',
    answer:
      'Em escadas de uso comum ou acessíveis (NBR 9050) e em saídas de emergência (NBR 9077), o espelho fica entre 16 e 18 cm, e o piso entre 28 e 32 cm. Em escadas privativas de casa, muitos códigos de obras aceitam até 19 cm de espelho e 25 cm de piso: confira o do seu município.',
  },
  {
    question: 'Quando a escada precisa de patamar?',
    answer:
      'Pela NBR 9050, a cada 3,20 m de altura vencida e sempre que a escada muda de direção, com pelo menos 1,20 m de comprimento. Pela NBR 9077, o lance máximo é de 3,70 m. A calculadora divide os degraus em lances iguais e soma o patamar ao comprimento.',
  },
  {
    question: 'Qual o tamanho do vão na laje para a escada?',
    answer:
      'O vão precisa deixar 2,10 m livres entre a linha dos degraus e a laje de cima. Para isso, o comprimento do vão é (2,10 m + espessura da laje) × piso ÷ espelho, medido a partir do último degrau. Com espelho de 17 cm, piso de 29 cm e laje de 12 cm, são cerca de 3,8 m.',
  },
];

@Component({
  selector: 'app-stairs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .crit { display: grid; gap: .35rem; }
    .crit button { display: grid; gap: .1rem; min-height: 56px; padding: .55rem .8rem; border: 1px solid rgb(68 74 81 / .15); border-radius: .8rem; text-align: left; }
    .crit button[aria-pressed=true] { border-color: currentColor; box-shadow: inset 0 0 0 1px currentColor; }
    .crit span { font-size: .78rem; opacity: .75; }
    .profile { width: 100%; height: auto; margin-top: 1rem; }
    .pro-table th, .pro-table td { white-space: nowrap; }
    tr.best td { font-weight: 650; }
    tr.off td { opacity: .5; }
  `,
  templateUrl: './stairs.component.html',
})
export class StairsCalculatorComponent {
  readonly tool = proTools[8];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly criteria = Object.values(CRITERIA);
  readonly riseChips = [270, 280, 288, 300, 320];
  readonly headroom = HEADROOM;
  readonly flag = copiedFlag();

  readonly rise = signal(DEFAULTS.rise);
  readonly space = signal(DEFAULTS.space);
  readonly criterion = signal<Criterion>(DEFAULTS.criterion);
  readonly slab = signal(DEFAULTS.slab);

  readonly riseValue = computed(() => Math.max(0, num(this.rise())));
  readonly spaceValue = computed(() => Math.max(0, num(this.space())));
  readonly rule = computed(() => CRITERIA[this.criterion()]);
  readonly plan = computed(() =>
    planStair({ rise: this.riseValue(), space: this.spaceValue(), criterion: this.criterion(), slab: num(this.slab()) }),
  );
  readonly best = computed(() => this.plan().best);

  /** Side view in cm (y grows downwards: lower floor at `rise`, upper floor at 0), landings drawn flat. */
  readonly profile = computed(() => {
    const b = this.best();
    const empty = { viewBox: '0 0 1 1', line: '', fill: '', slabs: [] as { x: number; width: number }[], slab: 0 };
    if (!b) return empty;
    const rise = this.riseValue();
    const slab = Math.max(0, num(this.slab()));
    const margin = 10;
    let x = 0;
    let y = rise;
    const points: [number, number][] = [[x, y]];
    b.risersPerFlight.forEach((count, flight) => {
      for (let i = 0; i < count; i++) {
        y -= b.riser;
        points.push([x, y]);
        const last = flight === b.risersPerFlight.length - 1 && i === count - 1;
        if (!last) {
          x += i === count - 1 ? b.landing : b.tread;
          points.push([x, y]);
        }
      }
    });
    const end = x + 80;
    points.push([end, 0]);
    const line = points.map(([px, py], i) => `${i ? 'L' : 'M'}${fmtSvg(px)} ${fmtSvg(py)}`).join(' ');
    const fill = `${line} L${fmtSvg(end)} ${fmtSvg(rise)} Z`;
    // The upper slab covers the first steps up to the opening, and the upper floor after the last step.
    const slabs = [{ x, width: end - x }];
    const before = x - b.opening;
    if (before > 0.5) slabs.unshift({ x: 0, width: before });
    return {
      viewBox: `${-margin} ${-margin} ${fmtSvg(end + 2 * margin)} ${fmtSvg(rise + 2 * margin)}`,
      line,
      fill,
      slabs: slab > 0 ? slabs.map((r) => ({ x: Number(fmtSvg(r.x)), width: Number(fmtSvg(r.width)) })) : [],
      slab,
    };
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
  }

  val = inputValue;

  flightsLabel(plan: StairPlan): string {
    return `${plan.flights} (${plan.risersPerFlight.join(' + ')} espelhos)`;
  }

  summaryText(): string {
    const b = this.best();
    if (!b) return '';
    const lines = [
      '*Escada reta*',
      `Altura de piso a piso: ${fmt(this.riseValue(), 1)} cm (${this.rule().short})`,
      '',
      `• ${b.risers} espelhos de ${fmt(b.riser, 1)} cm`,
      `• ${b.treads} pisos de ${fmt(b.tread, 1)} cm (2e + p = ${fmt(b.blondel, 1)} cm)`,
      `• Degraus: ${fmt(b.run / 100, 2)} m em planta, inclinação de ${fmt(b.slopeDeg, 1)}°`,
    ];
    if (b.flights > 1) {
      lines.push(`• ${this.flightsLabel(b)}, patamar ≥ ${fmt(b.landing / 100, 2)} m, total ${fmt(b.totalRun / 100, 2)} m`);
    }
    lines.push(`• Vão na laje: ${fmt(b.opening / 100, 2)} m para ${fmt(HEADROOM / 100, 2)} m livres`);
    return lines.join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, rise: '', space: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('es-rise')?.focus();
  }

  private snapshot(): State {
    return { rise: this.rise(), space: this.space(), criterion: this.criterion(), slab: this.slab() };
  }

  private apply(state: State): void {
    this.rise.set(state.rise);
    this.space.set(state.space);
    this.criterion.set(state.criterion in CRITERIA ? state.criterion : DEFAULTS.criterion);
    this.slab.set(state.slab);
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}

function fmtSvg(value: number): string {
  return String(Math.round(value * 10) / 10);
}
