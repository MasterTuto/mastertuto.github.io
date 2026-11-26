import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerChevronDown, tablerCopy, tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { autofocus, selectOnFocus } from '../pro-tools/money-field';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import { FINISHES, Finish, K_VALUES, LAMP_PRESETS, MAINTENANCE, ROOM_PRESETS, UTILIZATION, Upkeep, lighting } from './lighting.logic';

const CUSTOM = 'custom';
const DEFAULTS = {
  room: 'escritorio',
  length: '5',
  width: '4',
  ceiling: '2,8',
  lamp: 'plafon24',
  lumens: '2.200',
  watts: '24',
  perLuminaire: 1,
  finish: 'claro' as Finish,
  upkeep: 'limpo' as Upkeep,
  lux: '',
  plane: '',
  suspension: '0',
  more: false,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:luminotecnico';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular quantas lâmpadas um ambiente precisa?',
    answer:
      'Pelo método dos lúmens: fluxo total = lux desejado × área ÷ (fator de utilização × fator de manutenção). Divida o fluxo pelos lúmens de cada luminária e arredonde para cima. Um escritório de 20 m² com 500 lux, U de 0,6 e FM de 0,8 precisa de cerca de 20.800 lm, ou 10 plafons de 2.200 lm.',
  },
  {
    question: 'Quantos lux cada ambiente precisa?',
    answer:
      'A NBR ISO/CIE 8995-1 pede 500 lux para escritórios, leitura e digitação, 300 lux para salas de aula e lojas, 750 lux para desenho técnico, 200 lux para restaurantes e 100 a 150 lux para corredores e escadas. Em casa, a referência usual é 150 lux em salas e quartos, 300 lux na cozinha e 500 lux na bancada de trabalho ou estudo.',
  },
  {
    question: 'Qual a diferença entre lúmen, lux e watt?',
    answer:
      'Lúmen (lm) é a quantidade de luz que a lâmpada emite. Lux (lx) é a luz que chega a uma superfície: 1 lux é 1 lúmen por metro quadrado. Watt (W) é a potência elétrica consumida. Com LED, a eficiência fica entre 90 e 120 lm/W, por isso compare lâmpadas pelos lúmens, não pelos watts.',
  },
  {
    question: 'O que é o fator de utilização?',
    answer:
      'É a fração do fluxo das lâmpadas que chega ao plano de trabalho. Depende da luminária (para onde ela joga a luz), da geometria do ambiente (índice do recinto K) e das cores de teto, paredes e piso. Ambientes grandes e claros aproveitam mais a luz; salas pequenas e escuras, menos. O valor exato vem da tabela fotométrica do fabricante.',
  },
  {
    question: 'O que é o fator de manutenção?',
    answer:
      'É a perda de luz ao longo do tempo pela depreciação das lâmpadas e pelo acúmulo de sujeira. Com LED e limpeza regular, 0,8 é o usual; ambientes empoeirados ou com pouca manutenção pedem 0,6 a 0,7. Projetar com o fator de manutenção garante o nível de lux mesmo depois de anos de uso.',
  },
  {
    question: 'Como distribuir as luminárias no teto?',
    answer:
      'Em grade, com espaçamento parecido nos dois sentidos e metade do espaçamento entre a última luminária e a parede. Para uma iluminação uniforme, o espaçamento não deve passar de cerca de 1,5 vez a altura entre a luminária e o plano de trabalho. A calculadora monta a grade e avisa quando o espaçamento fica grande demais.',
  },
  {
    question: 'Quantos watts de LED por metro quadrado?',
    answer:
      'Com LED de 100 lm/W, um escritório de 500 lux fica entre 6 e 9 W/m², uma sala de estar de 150 lux entre 2 e 3 W/m². Valores muito acima disso indicam lâmpadas pouco eficientes ou excesso de pontos. A calculadora mostra a densidade de potência do projeto.',
  },
];

@Component({
  selector: 'app-lighting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent, RouterLink, LangLinkPipe],
  providers: [provideIcons({ tablerCheck, tablerChevronDown, tablerCopy, tablerEraser, tablerMinus, tablerPlus })],
  templateUrl: './lighting.component.html',
})
export class LightingCalculatorComponent {
  readonly tool = proTools[14];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly custom = CUSTOM;
  readonly lamps = LAMP_PRESETS;
  readonly finishes = FINISHES;
  readonly upkeeps = (Object.keys(MAINTENANCE) as Upkeep[]).map((id) => ({ id, ...MAINTENANCE[id] }));
  readonly kValues = K_VALUES;
  readonly utilizationTable = UTILIZATION;
  readonly roomGroups = (['Casa', 'Trabalho', 'Comércio e serviços'] as const).map((group) => ({
    group,
    items: ROOM_PRESETS.filter((room) => room.group === group),
  }));
  readonly luxTable = ROOM_PRESETS;
  readonly ceilingChips = ['2,6', '2,8', '3', '3,5'];
  readonly flag = copiedFlag();
  readonly selectOnFocus = selectOnFocus;
  readonly val = inputValue;

  readonly room = signal(DEFAULTS.room);
  readonly length = signal(DEFAULTS.length);
  readonly width = signal(DEFAULTS.width);
  readonly ceiling = signal(DEFAULTS.ceiling);
  readonly lamp = signal(DEFAULTS.lamp);
  readonly lumens = signal(DEFAULTS.lumens);
  readonly watts = signal(DEFAULTS.watts);
  readonly perLuminaire = signal(DEFAULTS.perLuminaire);
  readonly finish = signal<Finish>(DEFAULTS.finish);
  readonly upkeep = signal<Upkeep>(DEFAULTS.upkeep);
  readonly lux = signal(DEFAULTS.lux);
  readonly plane = signal(DEFAULTS.plane);
  readonly suspension = signal(DEFAULTS.suspension);
  readonly more = signal(DEFAULTS.more);

  readonly roomData = computed(() => ROOM_PRESETS.find((r) => r.id === this.room()) ?? ROOM_PRESETS[0]);
  readonly luxValue = computed(() => num(this.lux()) || this.roomData().lux);
  readonly planeValue = computed(() => (this.plane().trim() === '' ? this.roomData().plane : num(this.plane())));
  readonly lampData = computed(() => {
    if (this.lamp() === CUSTOM) return { lumens: num(this.lumens()), watts: num(this.watts()) };
    const preset = LAMP_PRESETS.find((l) => l.id === this.lamp()) ?? LAMP_PRESETS[0];
    return { lumens: preset.lumens, watts: preset.watts };
  });
  readonly heightInvalid = computed(() => {
    const c = num(this.ceiling());
    return c > 0 && c - this.planeValue() - num(this.suspension()) <= 0;
  });

  readonly result = computed(() =>
    lighting({
      length: num(this.length()),
      width: num(this.width()),
      ceiling: num(this.ceiling()),
      plane: this.planeValue(),
      suspension: num(this.suspension()),
      lux: this.luxValue(),
      finish: this.finish(),
      upkeep: this.upkeep(),
      lumens: this.lampData().lumens,
      watts: this.lampData().watts,
      lampsPerLuminaire: this.perLuminaire(),
    }),
  );

  /** Floor plan: luminaires centred in equal cells. */
  readonly plan = computed(() => {
    const r = this.result();
    if (!r) return null;
    const length = num(this.length());
    const width = num(this.width());
    const scale = 300 / Math.max(length, width);
    const w = length * scale;
    const h = width * scale;
    const points: { x: number; y: number }[] = [];
    for (let row = 0; row < r.rows; row++) {
      for (let col = 0; col < r.cols; col++) {
        points.push({ x: ((col + 0.5) * w) / r.cols, y: ((row + 0.5) * h) / r.rows });
      }
    }
    return { w, h, points, pad: 28, dot: Math.max(4, Math.min(12, (Math.min(w / r.cols, h / r.rows)) / 4)), length, width };
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
    autofocus('lt-length');
  }

  pickRoom(id: string): void {
    this.room.set(id);
    this.lux.set('');
    this.plane.set('');
  }

  pickLamp(id: string): void {
    this.lamp.set(id);
    const preset = LAMP_PRESETS.find((l) => l.id === id);
    if (preset) {
      this.lumens.set(preset.lumens.toLocaleString('pt-BR'));
      this.watts.set(String(preset.watts));
    }
  }

  /** Number typed in a field (pt-BR), 0 when empty. */
  num2(text: string): number {
    return num(text);
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  lampLabel(): string {
    if (this.lamp() === CUSTOM) return `${fmt(this.lampData().lumens)} lm / ${fmt(this.lampData().watts, 1)} W`;
    return LAMP_PRESETS.find((l) => l.id === this.lamp())?.label ?? '';
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    return [
      '*Cálculo luminotécnico (método dos lúmens)*',
      `${this.roomData().label}: ${fmt(num(this.length()), 2)} × ${fmt(num(this.width()), 2)} m = ${fmt(r.area, 2)} m², pé-direito ${fmt(num(this.ceiling()), 2)} m`,
      `Iluminância: ${fmt(this.luxValue())} lux · K = ${fmt(r.k, 2)} · U = ${fmt(r.u, 2)} · FM = ${fmt(r.fm, 2)}`,
      `Fluxo necessário: ${fmt(r.flux)} lm`,
      `*${r.count} luminárias* (${r.rows} × ${r.cols}) de ${this.lampLabel()}${this.perLuminaire() > 1 ? ` com ${this.perLuminaire()} lâmpadas` : ''}`,
      `Lux médio: ${fmt(r.achievedLux)} lx · potência: ${fmt(r.watts)} W (${fmt(r.density, 1)} W/m²)`,
      `Espaçamento: ${fmt(r.spacingLength, 2)} m × ${fmt(r.spacingWidth, 2)} m`,
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug}`,
    ].join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, length: '', width: '', room: this.room() });
    forgetState(STORAGE_KEY);
    document.getElementById('lt-length')?.focus();
  }

  private snapshot(): State {
    return {
      room: this.room(),
      length: this.length(),
      width: this.width(),
      ceiling: this.ceiling(),
      lamp: this.lamp(),
      lumens: this.lumens(),
      watts: this.watts(),
      perLuminaire: this.perLuminaire(),
      finish: this.finish(),
      upkeep: this.upkeep(),
      lux: this.lux(),
      plane: this.plane(),
      suspension: this.suspension(),
      more: this.more(),
    };
  }

  private apply(state: State): void {
    this.room.set(ROOM_PRESETS.some((r) => r.id === state.room) ? state.room : DEFAULTS.room);
    this.length.set(String(state.length ?? ''));
    this.width.set(String(state.width ?? ''));
    this.ceiling.set(String(state.ceiling ?? DEFAULTS.ceiling));
    this.lamp.set(state.lamp === CUSTOM || LAMP_PRESETS.some((l) => l.id === state.lamp) ? state.lamp : DEFAULTS.lamp);
    this.lumens.set(String(state.lumens ?? DEFAULTS.lumens));
    this.watts.set(String(state.watts ?? DEFAULTS.watts));
    this.perLuminaire.set(this.clamp(Number(state.perLuminaire) || 1, 1, 8));
    this.finish.set(['claro', 'medio', 'escuro'].includes(state.finish) ? state.finish : DEFAULTS.finish);
    this.upkeep.set(['limpo', 'normal', 'sujo'].includes(state.upkeep) ? state.upkeep : DEFAULTS.upkeep);
    this.lux.set(String(state.lux ?? ''));
    this.plane.set(String(state.plane ?? ''));
    this.suspension.set(String(state.suspension ?? '0'));
    this.more.set(!!state.more);
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}
