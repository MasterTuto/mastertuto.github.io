import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCalendar, tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus, tablerX } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { InputMaskDirective } from 'src/app/components/forms/input-mask.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  CountMode,
  DayNum,
  DeadlineInput,
  MAX_DAYS,
  TimelineRow,
  businessDaysBetween,
  compactTimeline,
  computeDeadline,
  dayParts,
  formatBr,
  formatIso,
  holidaysOf,
  parseBrDate,
  parseIso,
  today,
  weekdayName,
  weekdayShort,
} from './deadline.logic';

const DEFAULTS = {
  dje: false,
  date: '',
  days: 15,
  mode: 'uteis' as CountMode,
  double: false,
  optional: true,
  forensic: false,
  recess: true,
  custom: [] as string[],
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:prazos';

const FAQ: FaqItem[] = [
  {
    question: 'Como contar um prazo processual pelo CPC?',
    answer:
      'Exclui-se o dia da intimação e inclui-se o último dia (art. 224). A contagem começa no primeiro dia útil seguinte e só os dias úteis entram na conta (art. 219). Se o último dia não tiver expediente forense, o prazo vence no próximo dia útil.',
  },
  {
    question: 'Qual a diferença entre disponibilização e publicação no DJe?',
    answer:
      'A data de publicação é o primeiro dia útil seguinte ao da disponibilização da decisão no Diário de Justiça eletrônico (Lei 11.419/2006, art. 4º, § 3º, e CPC, art. 224, § 2º). O prazo começa a correr no primeiro dia útil depois da publicação. Por isso, a partir da disponibilização são dois dias úteis até o primeiro dia contado.',
  },
  {
    question: 'O prazo corre durante o recesso de fim de ano?',
    answer:
      'Não. O art. 220 do CPC suspende os prazos processuais de 20 de dezembro a 20 de janeiro, inclusive. Os dias contados antes do dia 20 de dezembro valem, e a contagem retoma em 21 de janeiro (ou no primeiro dia útil seguinte).',
  },
  {
    question: 'Quem tem prazo em dobro?',
    answer:
      'A Fazenda Pública (União, estados, municípios, autarquias e fundações públicas, art. 183), a Defensoria Pública (art. 186) e os litisconsortes com procuradores diferentes, de escritórios distintos, em autos físicos (art. 229). O dobro não se aplica quando a lei fixa prazo próprio para o ente público.',
  },
  {
    question: 'Carnaval e Corpus Christi suspendem os prazos?',
    answer:
      'Não são feriados nacionais por lei, mas a maioria dos tribunais não tem expediente nesses dias (ponto facultativo), e então eles não contam. Por isso a calculadora já os exclui; desligue a opção se o seu tribunal funcionar normalmente. A Quarta-feira de Cinzas costuma ter expediente só à tarde: confira a portaria do tribunal.',
  },
];

@Component({
  selector: 'app-deadline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, InputMaskDirective, NgIconComponent],
  providers: [provideIcons({ tablerCalendar, tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus, tablerX })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover { background: rgb(68 74 81 / .07); }
    .step input { width: 3rem; height: 44px; background: transparent; text-align: center; font-size: 16px; font-weight: 650; font-variant-numeric: tabular-nums; }
    .step input:focus-visible { outline-offset: -4px; border-radius: .75rem; }
    .sw { position: relative; flex-shrink: 0; width: 44px; height: 26px; border-radius: 999px; background: rgb(68 74 81 / .22); transition: background-color .15s; }
    .sw::after { content: ''; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 999px; background: #fff; box-shadow: 0 1px 2px rgb(0 0 0 / .2); transition: transform .15s; }
    .sw[aria-checked=true] { background: #7a70e1; }
    .sw[aria-checked=true]::after { transform: translateX(18px); }
    .tl li { display: grid; grid-template-columns: 4.6rem 1.75rem minmax(0, 1fr); align-items: center; gap: .5rem; padding: .35rem 0; border-top: 1px solid rgb(68 74 81 / .08); font-size: .875rem; }
    .tl b { display: grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 999px; font-size: .72rem; font-variant-numeric: tabular-nums; }
    details > summary::-webkit-details-marker { display: none; }
  `,
  templateUrl: './deadline.component.html',
})
export class DeadlineCalculatorComponent {
  readonly tool = proTools[2];
  readonly faq = FAQ;
  readonly presets = [5, 8, 10, 15, 30];
  readonly maxDays = MAX_DAYS;

  readonly todayNum = signal(today());
  readonly dje = signal(DEFAULTS.dje);
  readonly date = signal(formatBr(this.todayNum()));
  readonly days = signal(DEFAULTS.days);
  readonly mode = signal(DEFAULTS.mode);
  readonly double = signal(DEFAULTS.double);
  readonly optional = signal(DEFAULTS.optional);
  readonly forensic = signal(DEFAULTS.forensic);
  readonly recess = signal(DEFAULTS.recess);
  readonly custom = signal<string[]>(DEFAULTS.custom);
  readonly customText = signal('');
  readonly copied = signal(false);
  readonly timelineOpen = signal(false);
  readonly tableYear = signal(dayParts(this.todayNum()).year);

  readonly options = [
    { key: 'optional', label: 'Carnaval e Corpus Christi', hint: 'Pontos facultativos sem expediente na maioria dos tribunais', value: this.optional },
    { key: 'forensic', label: 'Semana Santa e feriados forenses', hint: 'Quarta e Quinta-feira Santas, 11/08, 01/11 e 08/12 (Lei 5.010/66, Justiça Federal)', value: this.forensic },
    { key: 'recess', label: 'Recesso de 20/12 a 20/01', hint: 'Suspensão dos prazos do art. 220 do CPC', value: this.recess },
  ];

  readonly startDay = computed(() => parseBrDate(this.date()));
  readonly dateInvalid = computed(() => this.date().length === 10 && this.startDay() === null);
  readonly isoDate = computed(() => {
    const day = this.startDay();
    return day === null ? '' : formatIso(day);
  });
  readonly customDays = computed(() =>
    [...new Set(this.custom().map(parseIso).filter((d): d is DayNum => d !== null))].sort((a, b) => a - b),
  );
  readonly customDay = computed(() => parseBrDate(this.customText()));

  private readonly input = computed<DeadlineInput | null>(() => {
    const start = this.startDay();
    if (start === null) return null;
    return {
      start,
      dje: this.dje(),
      days: this.days(),
      mode: this.mode(),
      double: this.double(),
      optional: this.optional(),
      forensic: this.forensic(),
      recess: this.recess(),
      custom: this.customDays(),
    };
  });

  readonly result = computed(() => {
    const input = this.input();
    return input ? computeDeadline(input) : null;
  });

  readonly rows = computed<TimelineRow[]>(() => compactTimeline(this.result()?.timeline ?? []));

  readonly status = computed(() => {
    const r = this.result();
    const input = this.input();
    if (!r || !input) return null;
    const diff = r.end - this.todayNum();
    if (diff < 0) return { tone: 'bad', short: 'Vencido', long: `venceu há ${diff === -1 ? '1 dia' : -diff + ' dias'}` };
    if (diff === 0) return { tone: 'warn', short: 'Vence hoje', long: 'vence hoje' };
    const business = businessDaysBetween(input, this.todayNum(), r.end);
    const long = `faltam ${diff === 1 ? '1 dia' : diff + ' dias'} (${business === 1 ? '1 útil' : business + ' úteis'})`;
    return { tone: diff <= 2 ? 'warn' : 'ok', short: 'No prazo', long };
  });

  readonly skippedText = computed(() => {
    const r = this.result();
    if (!r) return '';
    const counted = new Set(r.timeline.filter((t) => t.kind === 'counted').map((t) => t.day));
    const weekends = r.timeline.filter((t) => t.kind === 'weekend' && t.day >= r.firstCounted).length;
    const holidays = r.skipped.filter((s) => s.day >= r.firstCounted && !counted.has(s.day)).length;
    const recess = r.timeline.some((t) => t.kind === 'recess' || t.kind === 'suspended');
    return [
      weekends ? `${weekends} em fins de semana` : '',
      holidays ? `${holidays} ${holidays === 1 ? 'feriado' : 'feriados'}` : '',
      recess ? 'recesso' : '',
    ]
      .filter(Boolean)
      .join(', ');
  });

  readonly calendarSummary = computed(() => {
    const parts = ['Nacionais'];
    if (this.optional()) parts.push('Carnaval');
    if (this.forensic()) parts.push('JF');
    if (this.recess()) parts.push('recesso');
    if (this.customDays().length) parts.push(`+${this.customDays().length}`);
    return parts.join(' · ');
  });

  readonly years = computed(() => {
    const year = dayParts(this.todayNum()).year;
    return [year, year + 1];
  });
  readonly holidayTable = computed(() => holidaysOf(this.tableYear()));

  private readonly restored = signal(false);

  constructor() {
    useProToolSeo(this.tool, this.faq);
    afterNextRender(() => {
      this.todayNum.set(today());
      this.tableYear.set(dayParts(this.todayNum()).year);
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<State> | null;
        this.apply({ ...DEFAULTS, ...saved });
      } catch {
        this.apply(DEFAULTS);
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

  /** Selects the field on focus so typing replaces it, unless the user already started typing. */
  select(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value;
    setTimeout(() => {
      if (el.ownerDocument.activeElement === el && el.value === value) el.select();
    });
  }

  br(day: DayNum): string {
    return formatBr(day);
  }

  dm(day: DayNum): string {
    return formatBr(day).slice(0, 5);
  }

  short(day: DayNum): string {
    return weekdayShort(day);
  }

  cap(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  weekday(day: DayNum): string {
    return weekdayName(day);
  }

  setDay(day: DayNum): void {
    this.date.set(formatBr(day));
  }

  setDays(value: number): void {
    this.days.set(Math.min(MAX_DAYS, Math.max(1, Math.round(value) || 1)));
  }

  onDays(event: Event): void {
    const el = event.target as HTMLInputElement;
    const digits = el.value.replace(/\D/g, '').slice(0, 3);
    if (digits !== el.value) el.value = digits;
    this.days.set(Math.min(MAX_DAYS, Number(digits) || 0));
  }

  pickDate(event: Event): void {
    const day = parseIso((event.target as HTMLInputElement).value);
    if (day !== null) this.setDay(day);
  }

  openPicker(event: Event): void {
    const el = event.target as HTMLInputElement & { showPicker?: () => void };
    try {
      el.showPicker?.();
    } catch {
      /* not allowed: the browser opens its own picker */
    }
  }

  addCustom(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    const day = this.customDay();
    if (day === null) return;
    const iso = formatIso(day);
    if (!this.custom().includes(iso)) this.custom.set([...this.custom(), iso]);
    this.customText.set('');
  }

  removeCustom(day: DayNum): void {
    const iso = formatIso(day);
    this.custom.set(this.custom().filter((d) => d !== iso));
  }

  async copy(): Promise<void> {
    const r = this.result();
    if (!r) return;
    const counting = this.mode() === 'uteis' ? 'dias úteis (CPC, art. 219)' : 'dias corridos';
    const lines = [
      'Prazo processual',
      `${this.dje() ? 'Disponibilização no DJe' : 'Intimação'}: ${formatBr(r.start)} (${weekdayName(r.start)})`,
      ...(r.publication !== null ? [`Publicação: ${formatBr(r.publication)}`] : []),
      `Prazo: ${r.total} ${counting}${this.double() ? ', em dobro' : ''}`,
      `Início da contagem: ${formatBr(r.firstCounted)}`,
      `Último dia: ${formatBr(r.end)} (${weekdayName(r.end)})`,
      ...(r.skipped.length ? [`Feriados e suspensões no período: ${r.skipped.map((s) => `${formatBr(s.day).slice(0, 5)} ${s.label}`).join('; ')}`] : []),
      ...(r.timeline.some((t) => t.kind === 'recess' || t.kind === 'suspended') ? ['Considerada a suspensão de 20/12 a 20/01 (CPC, art. 220).'] : []),
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug} — confira o calendário do tribunal.`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  clear(): void {
    this.apply(DEFAULTS);
    this.customText.set('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  private snapshot(): State {
    return {
      dje: this.dje(),
      date: this.date(),
      days: this.days(),
      mode: this.mode(),
      double: this.double(),
      optional: this.optional(),
      forensic: this.forensic(),
      recess: this.recess(),
      custom: this.custom(),
    };
  }

  private apply(state: State): void {
    this.dje.set(!!state.dje);
    this.date.set(state.date || formatBr(this.todayNum()));
    this.days.set(Number(state.days) || DEFAULTS.days);
    this.mode.set(state.mode === 'corridos' ? 'corridos' : 'uteis');
    this.double.set(!!state.double);
    this.optional.set(state.optional !== false);
    this.forensic.set(!!state.forensic);
    this.recess.set(state.recess !== false);
    this.custom.set(Array.isArray(state.custom) ? state.custom.filter((d) => typeof d === 'string') : []);
  }
}
