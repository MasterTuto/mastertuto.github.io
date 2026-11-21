import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, input, model, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCalendar, tablerCheck, tablerCopy, tablerEraser } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { InputMaskDirective } from 'src/app/components/forms/input-mask.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  ConceptionKind,
  DayNumber,
  Method,
  PrenatalWindow,
  formatDateBR,
  formatWeeks,
  fromIsoDate,
  gestation,
  lmpFromConception,
  lmpFromUltrasound,
  parseDateBR,
  toIsoDate,
  today,
  weekdayBR,
} from './gestational.logic';
import { GestDateFieldComponent } from './gest-date-field.component';

const METHODS: { id: Method; label: string }[] = [
  { id: 'lmp', label: 'DUM' },
  { id: 'ultrasound', label: 'Ultrassom' },
  { id: 'conception', label: 'Concepção/FIV' },
];
const CONCEPTION: { id: ConceptionKind; label: string }[] = [
  { id: 'conception', label: 'Concepção' },
  { id: 'ivf3', label: 'FIV · embrião D3' },
  { id: 'ivf5', label: 'FIV · blastocisto D5' },
];

const DEFAULTS = {
  method: 'lmp' as Method,
  lmp: '',
  usDate: '',
  usWeeks: '',
  usDays: '',
  conceptionDate: '',
  conceptionKind: 'conception' as ConceptionKind,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:gestacional';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular a data provável do parto (DPP)?',
    answer:
      'Pela regra de Naegele, some 280 dias (40 semanas) à data da última menstruação (DUM). Na prática: some 7 dias ao primeiro dia da DUM, subtraia 3 meses e some 1 ano. DUM em 01/01/2026 resulta em DPP em 08/10/2026.',
  },
  {
    question: 'DUM ou ultrassom: qual usar para datar a gestação?',
    answer:
      'O ultrassom do 1º trimestre (comprimento cabeça-nádega até 13s6d) é o método mais preciso. Pelas recomendações do ACOG, a datação pela DUM é mantida quando a diferença para o ultrassom é pequena (até 5 dias antes de 9 semanas e até 7 dias entre 9s e 13s6d); acima disso, prevalece o ultrassom.',
  },
  {
    question: 'Como calcular a idade gestacional em gestação por FIV?',
    answer:
      'Use a data da transferência: a DUM equivalente é a data da transferência menos 14 dias e menos a idade do embrião (3 dias para embrião D3, 5 dias para blastocisto D5). A DPP é essa DUM equivalente mais 280 dias, ou a transferência de D5 mais 261 dias.',
  },
  {
    question: 'Quando começa cada trimestre da gestação?',
    answer:
      'O 1º trimestre vai até 13 semanas e 6 dias, o 2º trimestre de 14s0d a 27s6d e o 3º trimestre a partir de 28 semanas. A gestação é a termo de 37s0d a 41s6d: termo precoce até 38s6d, termo completo de 39s0d a 40s6d e termo tardio a partir de 41s0d.',
  },
  {
    question: 'Quando fazer a vacina dTpa e o TOTG na gestação?',
    answer:
      'O Ministério da Saúde recomenda a dTpa a partir da 20ª semana, em cada gestação. O teste oral de tolerância à glicose de 75 g é feito entre 24 e 28 semanas nas gestantes sem diagnóstico prévio de diabetes.',
  },
];

@Component({
  selector: 'app-gestational',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, InputMaskDirective, NgIconComponent, GestDateFieldComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .bar { position: relative; height: .5rem; margin-top: 1.1rem; border-radius: 999px; background: rgb(255 255 255 / .14); }
    .bar > i { position: absolute; inset: 0 auto 0 0; border-radius: inherit; background: #a59cf0; }
    .bar > b { position: absolute; top: -.2rem; bottom: -.2rem; width: 1px; background: rgb(255 255 255 / .35); }
    .tl { position: relative; padding-left: 1.6rem; }
    .tl::before { content: ''; position: absolute; left: .45rem; top: 0; bottom: 0; width: 2px; background: rgb(68 74 81 / .12); }
    .tl li { position: relative; display: grid; gap: .1rem .75rem; padding: .7rem 0; border-bottom: 1px solid rgb(68 74 81 / .08); }
    @media (min-width: 640px) { .tl li { grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; } }
    .tl li::before { content: ''; position: absolute; left: -1.5rem; top: 1.05rem; width: .8rem; height: .8rem; border: 2px solid #8e9095; border-radius: 999px; background: rgb(244 242 242); }
    .tl li.past { opacity: .55; }
    .tl li.past::before { border-color: #8e9095; background: #8e9095; }
    .tl li.current::before { border-color: #7a70e1; background: #7a70e1; box-shadow: 0 0 0 4px rgb(122 112 225 / .2); }
  `,
  templateUrl: './gestational.component.html',
})
export class GestationalCalculatorComponent {
  readonly tool = proTools[4];
  readonly faq = FAQ;
  readonly methods = METHODS;
  readonly conceptionKinds = CONCEPTION;

  readonly method = signal(DEFAULTS.method);
  readonly lmp = signal(DEFAULTS.lmp);
  readonly usDate = signal(DEFAULTS.usDate);
  readonly usWeeks = signal(DEFAULTS.usWeeks);
  readonly usDays = signal(DEFAULTS.usDays);
  readonly conceptionDate = signal(DEFAULTS.conceptionDate);
  readonly conceptionKind = signal(DEFAULTS.conceptionKind);
  /** Empty until the browser fills in today's date. */
  readonly reference = signal('');
  readonly copied = signal(false);

  readonly usWeeksInvalid = computed(() => this.usWeeks() !== '' && !(Number(this.usWeeks()) >= 4 && Number(this.usWeeks()) <= 42));
  readonly usDaysInvalid = computed(() => this.usDays() !== '' && !(Number(this.usDays()) <= 6));

  readonly lmpDay = computed<DayNumber | null>(() => {
    switch (this.method()) {
      case 'lmp':
        return parseDateBR(this.lmp());
      case 'ultrasound': {
        const exam = parseDateBR(this.usDate());
        if (exam === null || this.usWeeks() === '' || this.usWeeksInvalid() || this.usDaysInvalid()) return null;
        return lmpFromUltrasound(exam, Number(this.usWeeks()), Number(this.usDays() || 0));
      }
      case 'conception': {
        const date = parseDateBR(this.conceptionDate());
        return date === null ? null : lmpFromConception(date, this.conceptionKind());
      }
    }
  });
  readonly referenceDay = computed(() => parseDateBR(this.reference()));

  readonly result = computed(() => {
    const lmp = this.lmpDay();
    const reference = this.referenceDay();
    return lmp === null || reference === null ? null : gestation(lmp, reference);
  });

  readonly emptyHint = computed(() =>
    this.method() === 'lmp'
      ? 'Digite a data da última menstruação para ver a IG, a DPP e as janelas do pré-natal.'
      : this.method() === 'ultrasound'
        ? 'Informe a data do ultrassom e a IG medida no exame.'
        : 'Informe a data da concepção ou da transferência do embrião.',
  );

  private readonly restored = signal(false);
  private todayDay: DayNumber | null = null;
  private copiedTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    useProToolSeo(this.tool, this.faq);
    afterNextRender(() => {
      this.todayDay = today();
      this.reference.set(formatDateBR(this.todayDay));
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

  date(day: DayNumber): string {
    return formatDateBR(day);
  }

  weekday(day: DayNumber): string {
    return weekdayBR(day);
  }

  weeks(days: number): number {
    return Math.floor(Math.max(0, days) / 7);
  }

  restDays(days: number): number {
    return Math.max(0, days) % 7;
  }

  weeksLabel(days: number): string {
    return formatWeeks(days);
  }

  abs(value: number): number {
    return Math.abs(value);
  }

  isToday(): boolean {
    return this.todayDay !== null && this.referenceDay() === this.todayDay;
  }

  setToday(): void {
    this.todayDay = today();
    this.reference.set(formatDateBR(this.todayDay));
  }

  range(w: PrenatalWindow): string {
    if (w.endDays === null) return `a partir de ${formatWeeks(w.startDays)}`;
    if (w.endDays === w.startDays) return formatWeeks(w.startDays);
    return `${formatWeeks(w.startDays)} a ${formatWeeks(w.endDays)}`;
  }

  dates(w: PrenatalWindow): string {
    if (w.end === null) return `desde ${formatDateBR(w.start)}`;
    if (w.end === w.start) return formatDateBR(w.start);
    return `${formatDateBR(w.start).slice(0, 5)} a ${formatDateBR(w.end)}`;
  }

  recordText(): string {
    const r = this.result();
    if (!r) return '';
    const basis =
      this.method() === 'lmp'
        ? `DUM ${formatDateBR(r.lmp)}`
        : this.method() === 'ultrasound'
          ? `USG de ${this.usDate()} com IG ${Number(this.usWeeks())}s ${Number(this.usDays() || 0)}d (DUM equivalente ${formatDateBR(r.lmp)})`
          : `${CONCEPTION.find((k) => k.id === this.conceptionKind())?.label} em ${this.conceptionDate()} (DUM equivalente ${formatDateBR(r.lmp)})`;
    const state = { past: 'realizada/encerrada', current: 'em curso', future: 'a seguir' };
    const lines = [
      `IG: ${r.ageLabel} em ${formatDateBR(r.reference)}${r.trimester ? ` (${r.trimester}º trimestre)` : ''}`,
      `DPP: ${formatDateBR(r.dueDate)} (Naegele)`,
      `Base: ${basis}`,
      '',
      'Janelas do pré-natal:',
      ...r.windows
        .filter((w) => w.state !== 'past')
        .map((w) => `- ${w.label}: ${this.range(w)} (${this.dates(w)}) — ${state[w.state]}`),
    ];
    return lines.join('\n');
  }

  async copy(): Promise<void> {
    const text = this.recordText();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    this.copied.set(true);
    clearTimeout(this.copiedTimer);
    this.copiedTimer = setTimeout(() => this.copied.set(false), 2200);
  }

  clear(): void {
    this.apply({ ...DEFAULTS, method: this.method() });
    this.setToday();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    const first = { lmp: 'g-lmp', ultrasound: 'g-us-date', conception: 'g-conc' }[this.method()];
    document.getElementById(first)?.focus();
  }

  private snapshot(): State {
    return {
      method: this.method(),
      lmp: this.lmp(),
      usDate: this.usDate(),
      usWeeks: this.usWeeks(),
      usDays: this.usDays(),
      conceptionDate: this.conceptionDate(),
      conceptionKind: this.conceptionKind(),
    };
  }

  private apply(state: State): void {
    this.method.set(state.method);
    this.lmp.set(state.lmp);
    this.usDate.set(state.usDate);
    this.usWeeks.set(state.usWeeks);
    this.usDays.set(state.usDays);
    this.conceptionDate.set(state.conceptionDate);
    this.conceptionKind.set(state.conceptionKind);
  }
}
