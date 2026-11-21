import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, signal, WritableSignal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  ANNEXES,
  AnnexId,
  FATOR_R_MIN,
  LIMIT,
  SUBLIMIT,
  TAX_NAMES,
  annexByFatorR,
  computeSimples,
  fatorR,
  formatMoneyTyping,
  moneyField,
  parseMoney,
  proportionalRbt12,
} from './simples.logic';

type Choice = AnnexId | 'R';

const CHOICES: { id: Choice; label: string; short: string; hint: string }[] = [
  { id: 'I', label: 'I', short: 'Comércio', hint: 'Anexo I · comércio e revenda de mercadorias.' },
  { id: 'II', label: 'II', short: 'Indústria', hint: 'Anexo II · fabricação e industrialização.' },
  { id: 'III', label: 'III', short: 'Serviços', hint: 'Anexo III · serviços fixos no anexo, como manutenção, agências de viagem, academias, contabilidade e locação de bens móveis.' },
  { id: 'IV', label: 'IV', short: 'Obras e limpeza', hint: 'Anexo IV · construção civil, vigilância, limpeza e advocacia. A CPP (20% sobre a folha) é paga fora do DAS.' },
  { id: 'V', label: 'V', short: 'Serviços', hint: 'Anexo V · serviços fixos no Anexo V, como auditoria, jornalismo e publicidade.' },
  { id: 'R', label: 'III ou V', short: 'Fator R', hint: 'Medicina, odontologia, engenharia, arquitetura, TI, consultoria e outras do art. 18, §§ 5º-J e 5º-M. Fator R ≥ 28% → Anexo III; abaixo → Anexo V.' },
];

const DEFAULTS = {
  choice: 'R' as Choice,
  young: false,
  months: 3,
  rbt12: '300.000',
  previous: '60.000',
  revenue: '25.000',
  payroll: '90.000',
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:simples';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular a alíquota efetiva do Simples Nacional?',
    answer:
      'Alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12. A alíquota nominal e a parcela a deduzir vêm da faixa do anexo em que a receita bruta dos últimos 12 meses (RBT12) se encaixa. O DAS do mês é a receita do mês multiplicada pela alíquota efetiva.',
  },
  {
    question: 'O que é o Fator R e quando ele se aplica?',
    answer:
      'Fator R é a folha de salários dos últimos 12 meses (salários, pró-labore, FGTS e INSS patronal) dividida pela RBT12. Para as atividades dos §§ 5º-J e 5º-M do art. 18 da LC 123, se o Fator R for igual ou maior que 28% a empresa é tributada no Anexo III; abaixo disso, no Anexo V, que é bem mais caro.',
  },
  {
    question: 'Como calcular o Simples no primeiro ano de atividade?',
    answer:
      'No primeiro mês, a RBT12 é a receita do próprio mês multiplicada por 12. Do segundo ao 12º mês, é a média da receita dos meses anteriores multiplicada por 12 (LC 123, art. 18, §§ 1º-A e 2º). A folha para o Fator R é proporcionalizada da mesma forma.',
  },
  {
    question: 'O que acontece quando a receita passa de R$ 3,6 milhões?',
    answer:
      'R$ 3,6 milhões é o sublimite estadual e municipal: acima dele, o ICMS e o ISS deixam de ser recolhidos no DAS e passam a ser pagos pelas regras normais, enquanto os tributos federais continuam no Simples até R$ 4,8 milhões. Acima de R$ 4,8 milhões no ano, a empresa é excluída do Simples Nacional.',
  },
  {
    question: 'O que é a parcela a deduzir?',
    answer:
      'É um valor fixo de cada faixa que torna a tributação progressiva: a alíquota nominal maior só pesa sobre a parte da receita que passou do limite da faixa anterior. Por isso a alíquota efetiva cresce aos poucos, sem saltos na mudança de faixa.',
  },
];

@Component({
  selector: 'app-simples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover { background: rgb(68 74 81 / .07); }
    .step output { min-width: 2.25rem; text-align: center; font-weight: 650; font-variant-numeric: tabular-nums; }
    .money .pro-input { padding-left: 2.6rem; padding-right: .9rem; }
    .money > span { position: absolute; left: .9rem; pointer-events: none; color: #8e9095; font-size: .9rem; font-weight: 550; }
    .anx { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 52px; padding-inline: .4rem; line-height: 1.15; border-radius: .9rem; }
    .anx small { font-weight: 450; font-size: .72rem; opacity: .75; }
    tr.on td { background: rgb(122 112 225 / .1); font-weight: 650; }
    details > summary::-webkit-details-marker { display: none; }
  `,
  templateUrl: './simples.component.html',
})
export class SimplesCalculatorComponent {
  readonly tool = proTools[3];
  readonly faq = FAQ;
  readonly choices = CHOICES;
  readonly annexes = ANNEXES;
  readonly annexIds: AnnexId[] = ['I', 'II', 'III', 'IV', 'V'];
  readonly limit = LIMIT;
  readonly minFactor = FATOR_R_MIN;

  readonly choice = signal<Choice>(DEFAULTS.choice);
  readonly young = signal(DEFAULTS.young);
  readonly months = signal(DEFAULTS.months);
  readonly rbt12 = signal(DEFAULTS.rbt12);
  readonly previous = signal(DEFAULTS.previous);
  readonly revenue = signal(DEFAULTS.revenue);
  readonly payroll = signal(DEFAULTS.payroll);
  readonly copied = signal(false);
  readonly tableAnnex = signal<AnnexId>('III');

  readonly choiceHint = computed(() => CHOICES.find((c) => c.id === this.choice())?.hint ?? '');
  readonly revenueValue = computed(() => this.parsed(this.revenue()));
  readonly rbtValue = computed(() => {
    if (!this.young()) return this.parsed(this.rbt12());
    return proportionalRbt12(this.months(), this.parsed(this.previous()), this.revenueValue());
  });
  readonly average = computed(() => Math.round((this.rbtValue() / 12) * 100) / 100);
  /** Payroll over 12 months, annualized like the RBT12 for young companies. */
  readonly payrollValue = computed(() => {
    const value = this.parsed(this.payroll());
    if (!this.young()) return value;
    return this.months() === 0 ? value * 12 : (value / this.months()) * 12;
  });

  readonly factor = computed(() => {
    if (this.choice() !== 'R') return null;
    const rbt = this.rbtValue();
    if (!(rbt > 0) || rbt > LIMIT) return null;
    const value = fatorR(this.payrollValue(), rbt);
    const needed = rbt * FATOR_R_MIN;
    return { value, annex: annexByFatorR(this.payrollValue(), rbt), needed, missing: Math.max(0, needed - this.payrollValue()) };
  });

  readonly result = computed(() => {
    const annex: AnnexId = this.factor()?.annex ?? (this.choice() === 'R' ? 'V' : (this.choice() as AnnexId));
    return computeSimples(annex, this.rbtValue(), this.revenueValue());
  });

  readonly comparison = computed(() => {
    const f = this.factor();
    const r = this.result();
    if (!f || !r) return null;
    const iii = computeSimples('III', r.rbt12, r.revenue);
    const v = computeSimples('V', r.rbt12, r.revenue);
    if (!iii || !v) return null;
    return {
      applied: f.annex,
      factor: f.value,
      needed: f.needed,
      missing: f.missing,
      saving: v.das - iii.das,
      sides: [
        { id: 'III' as AnnexId, das: iii.das, effective: iii.effective },
        { id: 'V' as AnnexId, das: v.das, effective: v.effective },
      ],
    };
  });

  private readonly restored = signal(false);
  private readonly money$ = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

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
    effect(() => {
      const annex = this.result()?.annex.id;
      if (annex) this.tableAnnex.set(annex);
    });
  }

  onMoney(target: WritableSignal<string>, event: Event): void {
    const el = event.target as HTMLInputElement;
    const before = el.value;
    const caret = el.selectionStart ?? before.length;
    const atEnd = caret >= before.length;
    const typedDot = (event as InputEvent).data === '.' && atEnd;
    const after = before.slice(caret).replace(/[^\d,]/g, '').length;
    const formatted = formatMoneyTyping(before, typedDot);
    if (formatted !== before) {
      el.value = formatted;
      let pos = formatted.length;
      for (let seen = 0; pos > 0 && seen < after; pos--) if (/[\d,]/.test(formatted[pos - 1])) seen++;
      if (!atEnd) el.setSelectionRange(pos, pos);
    }
    target.set(formatted);
  }

  /** Selects the field on focus so typing replaces it, unless the user already started typing. */
  /** On blur, completes the cents ("1.234,5" → "1.234,50"). */
  tidy(target: WritableSignal<string>): void {
    const value = parseMoney(target());
    if (Number.isFinite(value)) target.set(moneyField(value));
  }

  /** Selects the field on focus so typing replaces it, unless the user already started typing. */
  select(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value;
    setTimeout(() => {
      if (el.ownerDocument.activeElement === el && el.value === value) el.select();
    });
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  field(value: number): string {
    return moneyField(value);
  }

  money(value: number): string {
    return this.money$.format(value);
  }

  num(value: number, digits = 2): string {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  pct(value: number, digits = 2): string {
    return `${this.num(value * 100, digits)}%`;
  }

  taxName(tax: keyof typeof TAX_NAMES): string {
    return TAX_NAMES[tax];
  }

  bracketRange(i: number): string {
    const limits = ANNEXES.I.brackets.map((b) => b.limit);
    const from = i === 0 ? 0 : limits[i - 1] + 0.01;
    return i === 0 ? `até ${this.compact(limits[0])}` : `${this.compact(from)} a ${this.compact(limits[i])}`;
  }

  async copy(): Promise<void> {
    const r = this.result();
    if (!r) return;
    const f = this.factor();
    const lines = [
      `Simples Nacional · ${r.annex.name} (${r.annex.short}), ${r.bracket + 1}ª faixa`,
      `RBT12${this.young() ? ' proporcional' : ''}: ${this.money(r.rbt12)}`,
      ...(f ? [`Fator R: ${this.pct(f.value)} → Anexo ${f.annex}`] : []),
      `Alíquota nominal: ${this.pct(r.nominal)} · parcela a deduzir: ${this.money(r.deduction)}`,
      `Alíquota efetiva: ${this.pct(r.effective, 4)}`,
      `Receita do mês: ${this.money(r.revenue)}`,
      `DAS estimado: ${this.money(r.das)}`,
      ...(r.overSublimit ? ['RBT12 acima do sublimite de R$ 3,6 milhões: ICMS/ISS fora do DAS.'] : []),
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug} — confira no PGDAS-D.`,
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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  private compact(value: number): string {
    if (value >= 1_000_000) return `R$ ${this.num(value / 1_000_000, 1)} mi`;
    return `R$ ${this.num(Math.floor(value) / 1000, 0)} mil`;
  }

  private parsed(text: string): number {
    const value = parseMoney(text);
    return Number.isFinite(value) ? value : 0;
  }

  private snapshot(): State {
    return {
      choice: this.choice(),
      young: this.young(),
      months: this.months(),
      rbt12: this.rbt12(),
      previous: this.previous(),
      revenue: this.revenue(),
      payroll: this.payroll(),
    };
  }

  private apply(state: State): void {
    this.choice.set(CHOICES.some((c) => c.id === state.choice) ? state.choice : DEFAULTS.choice);
    this.young.set(!!state.young);
    this.months.set(this.clamp(Number(state.months) || 0, 0, 11));
    this.rbt12.set(String(state.rbt12 ?? ''));
    this.previous.set(String(state.previous ?? ''));
    this.revenue.set(String(state.revenue ?? ''));
    this.payroll.set(String(state.payroll ?? ''));
  }
}
