import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerChevronDown, tablerCopy, tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { autofocus, money, moneyField, moneyValue, onMoneyInput, percent, selectOnFocus, tidyMoney } from '../pro-tools/money-field';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, forgetState, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  DEPENDENT_DEDUCTION,
  INSS_2026,
  INSS_CEILING,
  IRRF_2026,
  MINIMUM_WAGE_2026,
  REDUCTION_A,
  REDUCTION_B,
  REDUCTION_MAX,
  SIMPLIFIED_DISCOUNT,
  netSalary,
} from './payroll.logic';

const DEFAULTS = {
  gross: '4.500',
  dependents: 0,
  transport: false,
  transportCost: '',
  alimony: '',
  pension: '',
  other: '',
  more: false,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:salario-liquido';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular o salário líquido em 2026?',
    answer:
      'Do salário bruto, desconte o INSS pela tabela progressiva (7,5%, 9%, 12% e 14% sobre cada faixa, até o teto de R$ 8.475,55). Depois calcule o IRRF sobre o bruto menos o INSS e R$ 189,59 por dependente (ou o desconto simplificado de R$ 607,20, se for maior), aplique a tabela e subtraia a redução da Lei 15.270/2025. Por fim, tire vale-transporte, pensão e outros descontos.',
  },
  {
    question: 'Quem ganha até R$ 5.000 paga Imposto de Renda em 2026?',
    answer:
      'Não. Desde janeiro de 2026, a Lei 15.270/2025 dá uma redução de até R$ 312,89 que zera o IRRF de quem tem rendimento tributável mensal de até R$ 5.000. Entre R$ 5.000,01 e R$ 7.350 a redução diminui aos poucos (R$ 978,62 − 0,133145 × rendimento); acima de R$ 7.350 vale a tabela normal.',
  },
  {
    question: 'Quanto é descontado de INSS de quem ganha R$ 3.000?',
    answer:
      'R$ 248,60: 7,5% sobre os primeiros R$ 1.621,00 (R$ 121,575), 9% sobre a parte de R$ 1.621,01 a R$ 2.902,84 (R$ 115,366) e 12% sobre os R$ 97,16 restantes (R$ 11,659). A alíquota efetiva fica em 8,29%, não 12%, porque cada alíquota pesa só sobre a sua faixa.',
  },
  {
    question: 'Qual o desconto máximo de INSS em 2026?',
    answer:
      'R$ 988,09 por mês, para salários a partir do teto de R$ 8.475,55. Acima do teto o desconto não aumenta, por isso a alíquota efetiva de quem ganha R$ 20.000 é de menos de 5%.',
  },
  {
    question: 'O que é o desconto simplificado do IRRF?',
    answer:
      'É um abatimento fixo de R$ 607,20 por mês que a fonte pagadora pode usar no lugar das deduções legais (INSS, dependentes, pensão e previdência privada) quando ele for mais vantajoso. Em salários baixos e sem dependentes, quase sempre ganha. A calculadora compara os dois e usa o maior.',
  },
  {
    question: 'Quanto desconta cada dependente no Imposto de Renda?',
    answer:
      'R$ 189,59 por mês na base de cálculo do IRRF. Podem ser dependentes filhos até 21 anos (ou 24 se estiverem na faculdade), cônjuge ou companheiro, pais sem renda tributável acima do limite e outros casos do art. 35 da Lei 9.250/1995.',
  },
  {
    question: 'O vale-transporte é descontado de quanto?',
    answer:
      'Até 6% do salário básico, limitado ao custo real das passagens (Lei 7.418/1985 e Decreto 10.854/2021). Se o vale custa menos que 6% do salário, desconta-se só o valor do vale. O desconto não reduz a base do INSS nem do IRRF.',
  },
  {
    question: 'O FGTS é descontado do salário?',
    answer:
      'Não. Os 8% do FGTS são depositados pelo empregador numa conta vinculada em nome do trabalhador, além do salário. Por isso o FGTS aparece no resultado só como informação, sem sair do líquido.',
  },
];

@Component({
  selector: 'app-net-salary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent, RouterLink, LangLinkPipe],
  providers: [provideIcons({ tablerCheck, tablerChevronDown, tablerCopy, tablerEraser, tablerMinus, tablerPlus })],
  templateUrl: './net-salary.component.html',
})
export class NetSalaryCalculatorComponent {
  readonly tool = proTools[9];
  readonly faq = FAQ;
  readonly money = money;
  readonly percent = percent;
  readonly inssTable = INSS_2026;
  readonly irrfTable = IRRF_2026;
  readonly ceiling = INSS_CEILING;
  readonly dependentDeduction = DEPENDENT_DEDUCTION;
  readonly simplified = SIMPLIFIED_DISCOUNT;
  readonly reductionA = REDUCTION_A;
  readonly reductionB = REDUCTION_B;
  readonly reductionMax = REDUCTION_MAX;
  readonly presets = [MINIMUM_WAGE_2026, 3000, 5000, 7350, 10000];
  readonly examples = [MINIMUM_WAGE_2026, 2500, 3500, 5000, 6000, 7350, 10000, 15000].map((gross) => ({
    gross,
    result: netSalary({ gross, dependents: 0, transport: false })!,
  }));
  readonly flag = copiedFlag();
  readonly selectOnFocus = selectOnFocus;
  readonly tidy = tidyMoney;
  readonly onMoney = onMoneyInput;

  readonly gross = signal(DEFAULTS.gross);
  readonly dependents = signal(DEFAULTS.dependents);
  readonly transport = signal(DEFAULTS.transport);
  readonly transportCost = signal(DEFAULTS.transportCost);
  readonly alimony = signal(DEFAULTS.alimony);
  readonly pension = signal(DEFAULTS.pension);
  readonly other = signal(DEFAULTS.other);
  readonly more = signal(DEFAULTS.more);

  readonly grossValue = computed(() => moneyValue(this.gross()));
  readonly result = computed(() =>
    netSalary({
      gross: this.grossValue(),
      dependents: this.dependents(),
      transport: this.transport(),
      transportCost: moneyValue(this.transportCost()),
      alimony: moneyValue(this.alimony()),
      pension: moneyValue(this.pension()),
      other: moneyValue(this.other()),
    }),
  );
  /** Shares of the gross salary for the bar: net, INSS, IRRF, other discounts. */
  readonly split = computed(() => {
    const r = this.result();
    if (!r) return [];
    const others = r.transport + r.alimony + r.pension + r.other;
    return [
      { label: 'Líquido', value: Math.max(0, r.net), color: '#86efac' },
      { label: 'INSS', value: r.inss.total, color: '#a5b4fc' },
      { label: 'IRRF', value: r.irrf.tax, color: '#fcd34d' },
      { label: 'Outros', value: others, color: '#fca5a5' },
    ].filter((part) => part.value > 0).map((part) => ({ ...part, pct: (part.value / r.gross) * 100 }));
  });
  readonly extras = computed(() => [this.transport(), this.alimony(), this.pension(), this.other()].filter(Boolean).length);

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
    autofocus('sl-gross');
  }

  setGross(value: number): void {
    this.gross.set(moneyField(value));
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  rangeLabel(list: { upTo: number }[], index: number): string {
    const from = index === 0 ? 0 : list[index - 1].upTo + 0.01;
    const to = list[index].upTo;
    if (!Number.isFinite(to)) return `Acima de ${money(from - 0.01)}`;
    return index === 0 ? `Até ${money(to)}` : `${money(from)} a ${money(to)}`;
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const lines = [
      '*Salário líquido 2026*',
      `Salário bruto: ${money(r.gross)}${this.dependents() ? ` · ${this.dependents()} dependente(s)` : ''}`,
      `INSS: − ${money(r.inss.total)} (${percent(r.inss.effective)} efetivo)`,
      `IRRF: − ${money(r.irrf.tax)}${r.irrf.reduction ? ` (redução da Lei 15.270: ${money(r.irrf.reduction)})` : ''}`,
      ...(r.transport ? [`Vale-transporte: − ${money(r.transport)}`] : []),
      ...(r.alimony ? [`Pensão alimentícia: − ${money(r.alimony)}`] : []),
      ...(r.pension ? [`Previdência privada: − ${money(r.pension)}`] : []),
      ...(r.other ? [`Outros descontos: − ${money(r.other)}`] : []),
      `*Salário líquido: ${money(r.net)}*`,
      `FGTS depositado pela empresa: ${money(r.fgts)}`,
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug}`,
    ];
    return lines.join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, gross: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('sl-gross')?.focus();
  }

  private snapshot(): State {
    return {
      gross: this.gross(),
      dependents: this.dependents(),
      transport: this.transport(),
      transportCost: this.transportCost(),
      alimony: this.alimony(),
      pension: this.pension(),
      other: this.other(),
      more: this.more(),
    };
  }

  private apply(state: State): void {
    this.gross.set(String(state.gross ?? ''));
    this.dependents.set(this.clamp(Number(state.dependents) || 0, 0, 15));
    this.transport.set(!!state.transport);
    this.transportCost.set(String(state.transportCost ?? ''));
    this.alimony.set(String(state.alimony ?? ''));
    this.pension.set(String(state.pension ?? ''));
    this.other.set(String(state.other ?? ''));
    this.more.set(!!state.more);
  }
}
