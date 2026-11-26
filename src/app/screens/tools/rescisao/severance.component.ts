import { ChangeDetectionStrategy, Component, afterNextRender, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerChevronDown, tablerCopy, tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { GestDateFieldComponent } from '../gestacional/gest-date-field.component';
import { formatDateBR, parseDateBR, today, weekdayBR } from '../gestacional/gestational.logic';
import { autofocus, money, moneyField, moneyValue, onMoneyInput, selectOnFocus, tidyMoney } from '../pro-tools/money-field';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, forgetState, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import { MINIMUM_WAGE_2026 } from '../salario/payroll.logic';
import { Notice, REASONS, Reason, noticeDaysFor, severance } from './severance.logic';

const NOTICE_OPTIONS: Record<Reason, { id: Notice; label: string }[]> = {
  'sem-justa-causa': [{ id: 'indenizado', label: 'Indenizado' }, { id: 'trabalhado', label: 'Trabalhado' }],
  acordo: [{ id: 'indenizado', label: 'Indenizado' }, { id: 'trabalhado', label: 'Trabalhado' }],
  pedido: [{ id: 'trabalhado', label: 'Cumprido' }, { id: 'dispensado', label: 'Dispensado' }, { id: 'nao-cumprido', label: 'Não cumprido' }],
  'justa-causa': [],
  termino: [],
};

const DEFAULTS = {
  salary: '3.000',
  admission: '10/03/2022',
  end: '',
  reason: 'sem-justa-causa' as Reason,
  notice: 'indenizado' as Notice,
  overdue: 0,
  fgts: '',
  dependents: 0,
  advance13: '',
  more: false,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:rescisao';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular a rescisão de quem foi demitido sem justa causa?',
    answer:
      'Some o saldo de salário (salário ÷ 30 × dias trabalhados no mês), o aviso prévio indenizado (30 dias + 3 por ano completo, até 90), o 13º proporcional e as férias proporcionais com 1/3 contados até o fim do aviso, e as férias vencidas, se houver. Desconte INSS e IRRF sobre o saldo e o 13º. À parte, o empregado saca o FGTS com a multa de 40%.',
  },
  {
    question: 'Quantos dias de aviso prévio tenho direito?',
    answer:
      'Pela Lei 12.506/2011, 30 dias até completar um ano de empresa, mais 3 dias por ano completo de serviço, até o máximo de 90 dias (com 20 anos). Com 5 anos completos, por exemplo, são 45 dias. O acréscimo vale só a favor do empregado: no pedido de demissão, o aviso dele continua sendo de 30 dias.',
  },
  {
    question: 'O que é a projeção do aviso prévio?',
    answer:
      'O aviso prévio indenizado conta como tempo de serviço (CLT, art. 487, § 1º). Por isso o 13º e as férias proporcionais são calculados até a data em que o aviso terminaria, e essa data projetada é a que vai na carteira de trabalho (OJ 82 da SDI-1 do TST). Um aviso de 45 dias pode render mais 1 ou 2 avos de 13º e de férias.',
  },
  {
    question: 'Quem pede demissão recebe o quê?',
    answer:
      'Saldo de salário, 13º proporcional, férias proporcionais com 1/3 (mesmo com menos de um ano, pela Súmula 261 do TST) e férias vencidas. Não há multa do FGTS, saque do FGTS nem seguro-desemprego. Se o empregado não cumprir o aviso de 30 dias e não for dispensado dele, a empresa pode descontar um salário (art. 487, § 2º).',
  },
  {
    question: 'Como funciona a demissão por acordo (art. 484-A)?',
    answer:
      'Criada pela Reforma Trabalhista (Lei 13.467/2017), a rescisão por acordo paga metade do aviso prévio indenizado e metade da multa do FGTS (20%), e as demais verbas por inteiro. O empregado pode sacar 80% do FGTS, mas não recebe seguro-desemprego.',
  },
  {
    question: 'O que recebe quem é demitido por justa causa?',
    answer:
      'Só o saldo de salário e as férias vencidas com 1/3. Perde o aviso prévio, o 13º proporcional, as férias proporcionais (Súmula 171 do TST), a multa e o saque do FGTS e o seguro-desemprego. As hipóteses de justa causa estão no art. 482 da CLT.',
  },
  {
    question: 'Qual o prazo para pagar a rescisão?',
    answer:
      'Até 10 dias corridos contados do término do contrato, em qualquer modalidade (CLT, art. 477, § 6º, com a redação da Lei 13.467/2017). Atrasou, a empresa paga ao empregado uma multa de um salário (art. 477, § 8º), além de correção.',
  },
  {
    question: 'Tem desconto de INSS e Imposto de Renda na rescisão?',
    answer:
      'Sim, sobre as verbas de natureza salarial: saldo de salário e 13º (este com cálculo separado, tributação exclusiva). Aviso prévio indenizado e férias indenizadas com 1/3 não têm INSS nem IRRF, por serem indenizações. O FGTS e a multa de 40% também são isentos.',
  },
];

@Component({
  selector: 'app-severance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent, GestDateFieldComponent, RouterLink, LangLinkPipe],
  providers: [provideIcons({ tablerCheck, tablerChevronDown, tablerCopy, tablerEraser, tablerMinus, tablerPlus })],
  templateUrl: './severance.component.html',
})
export class SeveranceCalculatorComponent {
  readonly tool = proTools[11];
  readonly faq = FAQ;
  readonly money = money;
  readonly reasons = REASONS;
  readonly formatDate = formatDateBR;
  readonly weekday = weekdayBR;
  readonly presets = [MINIMUM_WAGE_2026, 2500, 3000, 5000];
  readonly noticeTable = [0, 1, 2, 3, 5, 10, 15, 20].map((years) => ({ years, days: noticeDaysFor(years) }));
  readonly flag = copiedFlag();
  readonly selectOnFocus = selectOnFocus;
  readonly tidy = tidyMoney;
  readonly onMoney = onMoneyInput;

  readonly salary = signal(DEFAULTS.salary);
  readonly admission = signal(DEFAULTS.admission);
  readonly end = signal(DEFAULTS.end);
  readonly reason = signal<Reason>(DEFAULTS.reason);
  readonly notice = signal<Notice>(DEFAULTS.notice);
  readonly overdue = signal(DEFAULTS.overdue);
  readonly fgts = signal(DEFAULTS.fgts);
  readonly dependents = signal(DEFAULTS.dependents);
  readonly advance13 = signal(DEFAULTS.advance13);
  readonly more = signal(DEFAULTS.more);
  readonly todayText = signal('');

  readonly salaryValue = computed(() => moneyValue(this.salary()));
  readonly admissionDay = computed(() => parseDateBR(this.admission()));
  readonly endDay = computed(() => parseDateBR(this.end()));
  readonly datesInverted = computed(() => {
    const a = this.admissionDay();
    const e = this.endDay();
    return a !== null && e !== null && e < a;
  });
  readonly reasonHint = computed(() => REASONS.find((r) => r.id === this.reason())?.hint ?? '');
  readonly noticeOptions = computed(() => NOTICE_OPTIONS[this.reason()]);
  readonly effectiveNotice = computed<Notice>(() => {
    const options = this.noticeOptions();
    return options.some((o) => o.id === this.notice()) ? this.notice() : (options[0]?.id ?? 'indenizado');
  });

  readonly result = computed(() => {
    const admission = this.admissionDay();
    const end = this.endDay();
    if (admission === null || end === null) return null;
    return severance({
      salary: this.salaryValue(),
      admission,
      end,
      reason: this.reason(),
      notice: this.effectiveNotice(),
      overdueVacations: this.overdue(),
      fgtsBalance: moneyValue(this.fgts()),
      dependents: this.dependents(),
      advance13: moneyValue(this.advance13()),
    });
  });
  readonly service = computed(() => {
    const a = this.admissionDay();
    const e = this.endDay();
    if (a === null || e === null || e < a) return '';
    const r = this.result();
    const years = r?.years ?? 0;
    const months = Math.floor(((e - a + 1) / 30.4375) % 12);
    return `${years} ${years === 1 ? 'ano' : 'anos'}${months ? ` e ${months} ${months === 1 ? 'mês' : 'meses'}` : ''} de empresa`;
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
    afterNextRender(() => {
      this.todayText.set(formatDateBR(today()));
      if (!this.end()) this.end.set(this.todayText());
    });
    autofocus('rs-salary');
  }

  setSalary(value: number): void {
    this.salary.set(moneyField(value));
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const reason = REASONS.find((item) => item.id === this.reason())!;
    return [
      '*Cálculo de rescisão*',
      `${reason.label} · salário ${money(this.salaryValue())}`,
      `Admissão ${this.admission()} · saída ${this.end()}${r.paidNoticeDays ? ` · projeção ${formatDateBR(r.projected)}` : ''}`,
      '',
      ...r.earnings.map((line) => `+ ${line.label} (${line.reference}): ${money(line.value)}`),
      ...r.deductions.map((line) => `− ${line.label}: ${money(line.value)}`),
      '',
      `Total bruto: ${money(r.gross)} · descontos: ${money(r.totalDeductions)}`,
      `*Líquido a receber: ${money(r.net)}*`,
      ...(r.fgts.fine ? [`Multa do FGTS (${r.fgts.fineRate * 100}%): ${money(r.fgts.fine)}`] : []),
      ...(r.fgts.withdraw ? [`FGTS para saque${r.fgts.estimated ? ' (estimado)' : ''}: ${money(r.fgts.withdraw)}`] : []),
      `Prazo de pagamento: ${formatDateBR(r.paymentDeadline)}`,
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug} — estimativa, confira no TRCT.`,
    ].join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, salary: '', admission: '', end: this.todayText() });
    forgetState(STORAGE_KEY);
    document.getElementById('rs-salary')?.focus();
  }

  private snapshot(): State {
    return {
      salary: this.salary(),
      admission: this.admission(),
      // The exit date is not kept: it opens on today's date.
      end: '',
      reason: this.reason(),
      notice: this.notice(),
      overdue: this.overdue(),
      fgts: this.fgts(),
      dependents: this.dependents(),
      advance13: this.advance13(),
      more: this.more(),
    };
  }

  private apply(state: State): void {
    this.salary.set(String(state.salary ?? ''));
    this.admission.set(String(state.admission ?? ''));
    this.end.set(String(state.end ?? ''));
    this.reason.set(REASONS.some((r) => r.id === state.reason) ? state.reason : DEFAULTS.reason);
    this.notice.set(['indenizado', 'trabalhado', 'dispensado', 'nao-cumprido'].includes(state.notice) ? state.notice : DEFAULTS.notice);
    this.overdue.set(this.clamp(Number(state.overdue) || 0, 0, 2));
    this.fgts.set(String(state.fgts ?? ''));
    this.dependents.set(this.clamp(Number(state.dependents) || 0, 0, 15));
    this.advance13.set(String(state.advance13 ?? ''));
    this.more.set(!!state.more);
  }
}
