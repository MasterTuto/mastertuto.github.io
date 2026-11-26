import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerChevronDown, tablerCopy, tablerEraser } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { autofocus, money, moneyField, moneyValue, onMoneyInput, percent, selectOnFocus, tidyMoney } from '../pro-tools/money-field';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import { MINIMUM_WAGE, PUBLIC_BRACKETS, contractFees, sucumbencia } from './fees.logic';

const DEFAULTS = {
  base: '150.000',
  publicTreasury: false,
  rate: '10',
  position: 0,
  appeal: 0,
  wage: '1.621',
  contractRate: '',
  fixed: '',
  more: false,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:honorarios';

const POSITIONS = [
  { value: 0, label: 'Mínimo' },
  { value: 0.5, label: 'Médio' },
  { value: 1, label: 'Máximo' },
];

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular honorários de sucumbência?',
    answer:
      'Entre particulares, aplique de 10% a 20% sobre o valor da condenação; se não houver condenação, sobre o proveito econômico obtido; se ele não puder ser medido, sobre o valor atualizado da causa (CPC, art. 85, § 2º). O juiz fixa o percentual considerando o zelo do profissional, o lugar da prestação, a natureza e a importância da causa e o trabalho e o tempo exigidos.',
  },
  {
    question: 'Como ficam os honorários contra a Fazenda Pública?',
    answer:
      'O § 3º do art. 85 cria cinco faixas em salários mínimos: de 10% a 20% até 200 salários; 8% a 10% de 200 a 2.000; 5% a 8% de 2.000 a 20.000; 3% a 5% de 20.000 a 100.000; e 1% a 3% acima disso. Pelo § 5º, as faixas são aplicadas em cascata: a primeira alíquota sobre a parte até 200 salários, a segunda sobre o que passa disso, e assim por diante.',
  },
  {
    question: 'O que é a majoração de honorários no recurso?',
    answer:
      'Pelo § 11 do art. 85, o tribunal, ao julgar o recurso, aumenta os honorários fixados antes, levando em conta o trabalho adicional na fase recursal. O total não pode passar dos limites dos §§ 2º e 3º (20% entre particulares, ou o teto de cada faixa contra a Fazenda). O STJ exige que o recurso seja integralmente desprovido ou não conhecido (Tema 1059) e que já houvesse honorários fixados na instância anterior.',
  },
  {
    question: 'Quando o juiz pode fixar honorários por equidade?',
    answer:
      'Só quando o proveito econômico for inestimável ou irrisório, ou o valor da causa for muito baixo (§ 8º). No Tema 1076, o STJ decidiu que valores altos não autorizam a equidade: nesses casos aplicam-se os percentuais dos §§ 2º e 3º. Na equidade, o juiz deve observar a tabela da OAB ou os limites do § 2º (§ 8º-A, incluído pela Lei 14.365/2022).',
  },
  {
    question: 'Qual o salário mínimo usado nas faixas contra a Fazenda?',
    answer:
      'O vigente na data da sentença líquida ou, se ela for ilíquida, na data da decisão de liquidação (§ 4º, IV). Em 2026 o salário mínimo é de R$ 1.621,00, o que coloca a primeira faixa em R$ 324.200 e a segunda em R$ 3,242 milhões. A calculadora permite trocar o valor.',
  },
  {
    question: 'Honorários de sucumbência são do advogado ou do cliente?',
    answer:
      'Do advogado. O art. 23 do Estatuto da Advocacia (Lei 8.906/1994) e o § 14 do art. 85 do CPC dizem que eles pertencem ao advogado, têm natureza alimentar e não podem ser compensados com os do advogado da outra parte. Por isso somam-se aos honorários contratuais combinados com o cliente.',
  },
  {
    question: 'Quanto cobrar de honorários contratuais?',
    answer:
      'Não há percentual fixo em lei. O Código de Ética da OAB pede moderação e as tabelas das seccionais trazem referências; em ações com êxito, 20% a 30% do proveito do cliente é comum. Pelo art. 50 do Código de Ética, os contratuais da cláusula quota litis somados à sucumbência não podem superar a vantagem obtida pelo cliente. A calculadora mostra quanto fica com cada um.',
  },
];

@Component({
  selector: 'app-fees',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent, RouterLink, LangLinkPipe],
  providers: [provideIcons({ tablerCheck, tablerChevronDown, tablerCopy, tablerEraser })],
  templateUrl: './fees.component.html',
})
export class FeesCalculatorComponent {
  readonly tool = proTools[12];
  readonly faq = FAQ;
  readonly money = money;
  readonly percent = percent;
  readonly brackets = PUBLIC_BRACKETS;
  readonly positions = POSITIONS;
  readonly rateChips = [10, 12, 15, 18, 20];
  readonly appealChips = [0, 1, 2, 5];
  readonly contractChips = [20, 25, 30];
  readonly basePresets = [10000, 50000, 150000, 500000, 1000000];
  readonly flag = copiedFlag();
  readonly selectOnFocus = selectOnFocus;
  readonly tidy = tidyMoney;
  readonly onMoney = onMoneyInput;
  readonly val = inputValue;

  readonly base = signal(DEFAULTS.base);
  readonly publicTreasury = signal(DEFAULTS.publicTreasury);
  readonly rate = signal(DEFAULTS.rate);
  readonly position = signal(DEFAULTS.position);
  readonly appeal = signal(DEFAULTS.appeal);
  readonly wage = signal(DEFAULTS.wage);
  readonly contractRate = signal(DEFAULTS.contractRate);
  readonly fixed = signal(DEFAULTS.fixed);
  readonly more = signal(DEFAULTS.more);

  readonly baseValue = computed(() => moneyValue(this.base()));
  readonly wageValue = computed(() => moneyValue(this.wage()) || MINIMUM_WAGE);
  readonly rateValue = computed(() => num(this.rate()));
  readonly rateInvalid = computed(() => {
    const value = this.rateValue();
    return !this.publicTreasury() && this.rate().trim() !== '' && (value < 10 || value > 20);
  });
  readonly result = computed(() =>
    sucumbencia({
      base: this.baseValue(),
      publicTreasury: this.publicTreasury(),
      rate: this.rateValue() / 100,
      position: this.position(),
      appealPoints: this.appeal() / 100,
      wage: this.wageValue(),
    }),
  );
  readonly contract = computed(() =>
    contractFees({ award: this.baseValue(), rate: num(this.contractRate()) / 100, fixed: moneyValue(this.fixed()) }),
  );
  readonly lawyerTotal = computed(() => {
    const r = this.result();
    return r ? (this.appeal() ? r.appealFees : r.fees) + this.contract().total : 0;
  });
  readonly bracketRows = computed(() => {
    const wage = this.wageValue();
    let from = 0;
    return PUBLIC_BRACKETS.map((b) => {
      const to = b.upToWages * wage;
      const row = { ...b, from, to };
      from = to;
      return row;
    });
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
    autofocus('hn-base');
  }

  setBase(value: number): void {
    this.base.set(moneyField(value));
  }

  compact(value: number): string {
    if (!Number.isFinite(value)) return '∞';
    if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 3 })} mi`;
    return money(value).replace(',00', '');
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const c = this.contract();
    const lines = [
      '*Honorários de sucumbência (CPC, art. 85)*',
      `Base: ${money(r.base)} · ${this.publicTreasury() ? 'Fazenda Pública vencida (§ 3º)' : 'particular vencido (§ 2º)'}`,
      `Honorários: *${money(r.fees)}* (${percent(r.effective)} efetivo)`,
      `Faixa legal: ${money(r.minFees)} a ${money(r.maxFees)}`,
      ...(this.appeal() ? [`Com majoração recursal (§ 11): ${money(r.appealFees)}${r.appealCapped ? ' — limitado ao teto' : ''}`] : []),
      ...(c.total ? ['', `Contratuais: ${money(c.total)} · cliente recebe ${money(c.client)}`, `Total do advogado: ${money(this.lawyerTotal())}`] : []),
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug}`,
    ];
    return lines.join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, base: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('hn-base')?.focus();
  }

  private snapshot(): State {
    return {
      base: this.base(),
      publicTreasury: this.publicTreasury(),
      rate: this.rate(),
      position: this.position(),
      appeal: this.appeal(),
      wage: this.wage(),
      contractRate: this.contractRate(),
      fixed: this.fixed(),
      more: this.more(),
    };
  }

  private apply(state: State): void {
    this.base.set(String(state.base ?? ''));
    this.publicTreasury.set(!!state.publicTreasury);
    this.rate.set(String(state.rate ?? DEFAULTS.rate));
    this.position.set([0, 0.5, 1].includes(Number(state.position)) ? Number(state.position) : 0);
    this.appeal.set(Math.min(10, Math.max(0, Number(state.appeal) || 0)));
    this.wage.set(String(state.wage || DEFAULTS.wage));
    this.contractRate.set(String(state.contractRate ?? ''));
    this.fixed.set(String(state.fixed ?? ''));
    this.more.set(!!state.more);
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}
