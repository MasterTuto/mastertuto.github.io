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
import { MINIMUM_WAGE_2026, netSalary } from '../salario/payroll.logic';
import { CostGroup, REGIMES, Regime, employeeCost } from './employee-cost.logic';

const DEFAULTS = {
  salary: '3.000',
  regime: 'simples' as Regime,
  rat: 2,
  fap: '1',
  thirdParty: '5,8',
  transport: '',
  meal: '',
  health: '',
  provisionFine: true,
  more: false,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:custo-funcionario';

const GROUPS: { id: CostGroup; label: string; color: string }[] = [
  { id: 'salary', label: 'Salário', color: '#86efac' },
  { id: 'provisions', label: 'Provisões', color: '#a5b4fc' },
  { id: 'taxes', label: 'Encargos', color: '#fcd34d' },
  { id: 'benefits', label: 'Benefícios', color: '#fca5a5' },
];

const FAQ: FaqItem[] = [
  {
    question: 'Quanto custa um funcionário CLT para a empresa?',
    answer:
      'No Simples Nacional (Anexos I, II, III e V), cerca de 1,3 vez o salário: o salário, mais 13º e férias com 1/3 provisionados (19,4%) e FGTS de 8% sobre tudo, sem contar benefícios. No Lucro Presumido ou Real, somam-se ainda 20% de INSS patronal, RAT e terceiros (cerca de 27,8%), e o custo passa de 1,6 vez o salário.',
  },
  {
    question: 'Quanto custa um funcionário que ganha um salário mínimo?',
    answer:
      'Com o mínimo de R$ 1.621 em 2026, uma empresa do Simples gasta cerca de R$ 2.150 por mês (sem benefícios e com provisão da multa do FGTS), e uma do Lucro Presumido, perto de R$ 2.690. Vale-transporte, vale-refeição e plano de saúde vêm por cima.',
  },
  {
    question: 'Empresa do Simples Nacional paga INSS patronal?',
    answer:
      'Nos Anexos I, II, III e V, não sobre a folha: a contribuição patronal previdenciária (CPP) já está dentro do DAS. No Anexo IV (construção civil, vigilância, limpeza, serviços advocatícios) a CPP fica fora do DAS e a empresa recolhe 20% de INSS mais o RAT sobre a folha, mas não as contribuições a terceiros.',
  },
  {
    question: 'O que são RAT e FAP?',
    answer:
      'O RAT (ou GILRAT) é a contribuição para os benefícios de acidente de trabalho: 1%, 2% ou 3% da folha, conforme o grau de risco da atividade principal no Anexo V do Decreto 3.048/1999. O FAP é um multiplicador de 0,5 a 2,0 calculado pela Previdência para cada empresa, conforme os acidentes registrados. A alíquota final é RAT × FAP.',
  },
  {
    question: 'O que entra em "terceiros" na folha?',
    answer:
      'Contribuições recolhidas junto com o INSS e repassadas a outras entidades: salário-educação (2,5%), INCRA (0,2%), SENAI ou SENAC (1,0%), SESI ou SESC (1,5%) e SEBRAE (0,6%), somando 5,8% para a maioria das empresas de indústria e comércio. Outros setores têm combinações diferentes (cooperativas, transporte, agro).',
  },
  {
    question: 'Por que provisionar 13º, férias e a multa do FGTS?',
    answer:
      'Porque são custos que se acumulam todo mês e vencem de uma vez: o 13º em novembro e dezembro, as férias a cada 12 meses e a multa de 40% do FGTS na demissão sem justa causa. Separar 1/12 por mês evita sustos no caixa e mostra o custo real da contratação.',
  },
  {
    question: 'O vale-transporte é custo da empresa?',
    answer:
      'Só a parte que passa de 6% do salário do empregado. Se o vale custa R$ 300 e o salário é R$ 3.000, o empregado paga R$ 180 (6%) e a empresa, R$ 120. O vale-transporte não tem INSS nem FGTS, assim como o vale-refeição concedido pelo PAT.',
  },
];

@Component({
  selector: 'app-employee-cost',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent, RouterLink, LangLinkPipe],
  providers: [provideIcons({ tablerCheck, tablerChevronDown, tablerCopy, tablerEraser })],
  templateUrl: './employee-cost.component.html',
})
export class EmployeeCostCalculatorComponent {
  readonly tool = proTools[10];
  readonly faq = FAQ;
  readonly money = money;
  readonly percent = percent;
  readonly regimes = REGIMES;
  readonly groups = GROUPS;
  readonly ratOptions = [1, 2, 3];
  readonly presets = [MINIMUM_WAGE_2026, 2500, 3000, 5000, 8000];
  readonly flag = copiedFlag();
  readonly selectOnFocus = selectOnFocus;
  readonly tidy = tidyMoney;
  readonly onMoney = onMoneyInput;
  readonly val = inputValue;

  readonly salary = signal(DEFAULTS.salary);
  readonly regime = signal<Regime>(DEFAULTS.regime);
  readonly rat = signal(DEFAULTS.rat);
  readonly fap = signal(DEFAULTS.fap);
  readonly thirdParty = signal(DEFAULTS.thirdParty);
  readonly transport = signal(DEFAULTS.transport);
  readonly meal = signal(DEFAULTS.meal);
  readonly health = signal(DEFAULTS.health);
  readonly provisionFine = signal(DEFAULTS.provisionFine);
  readonly more = signal(DEFAULTS.more);

  readonly salaryValue = computed(() => moneyValue(this.salary()));
  readonly regimeHint = computed(() => REGIMES.find((r) => r.id === this.regime())?.hint ?? '');
  private readonly input = computed(() => ({
    salary: this.salaryValue(),
    rat: this.rat() / 100,
    fap: num(this.fap(), 1),
    thirdParty: num(this.thirdParty(), 5.8) / 100,
    transport: moneyValue(this.transport()),
    meal: moneyValue(this.meal()),
    health: moneyValue(this.health()),
    provisionFine: this.provisionFine(),
  }));
  readonly result = computed(() => employeeCost({ ...this.input(), regime: this.regime() }));
  readonly comparison = computed(() =>
    REGIMES.map((r) => ({ ...r, result: employeeCost({ ...this.input(), regime: r.id }) })).filter((r) => r.result),
  );
  readonly net = computed(() => netSalary({ gross: this.salaryValue(), dependents: 0, transport: false }));
  readonly bar = computed(() => {
    const r = this.result();
    if (!r) return [];
    return GROUPS.map((g) => ({ ...g, value: r.byGroup[g.id], pct: (r.byGroup[g.id] / r.monthly) * 100 })).filter((g) => g.value > 0);
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
    autofocus('cf-salary');
  }

  setSalary(value: number): void {
    this.salary.set(moneyField(value));
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const regime = REGIMES.find((item) => item.id === this.regime())!;
    return [
      '*Custo de funcionário CLT*',
      `Salário: ${money(this.salaryValue())} · ${regime.label}`,
      '',
      ...r.lines.map((line) => `• ${line.label}: ${money(line.value)}`),
      '',
      `*Custo mensal: ${money(r.monthly)}* (${r.multiplier.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}× o salário)`,
      `Custo anual: ${money(r.yearly)}`,
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug}`,
    ].join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, salary: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('cf-salary')?.focus();
  }

  times(value: number): string {
    return `${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}×`;
  }

  private snapshot(): State {
    return {
      salary: this.salary(),
      regime: this.regime(),
      rat: this.rat(),
      fap: this.fap(),
      thirdParty: this.thirdParty(),
      transport: this.transport(),
      meal: this.meal(),
      health: this.health(),
      provisionFine: this.provisionFine(),
      more: this.more(),
    };
  }

  private apply(state: State): void {
    this.salary.set(String(state.salary ?? ''));
    this.regime.set(REGIMES.some((r) => r.id === state.regime) ? state.regime : DEFAULTS.regime);
    this.rat.set([1, 2, 3].includes(Number(state.rat)) ? Number(state.rat) : DEFAULTS.rat);
    this.fap.set(String(state.fap ?? DEFAULTS.fap));
    this.thirdParty.set(String(state.thirdParty ?? DEFAULTS.thirdParty));
    this.transport.set(String(state.transport ?? ''));
    this.meal.set(String(state.meal ?? ''));
    this.health.set(String(state.health ?? ''));
    this.provisionFine.set(state.provisionFine !== false);
    this.more.set(!!state.more);
  }
}

function num(text: string, fallback: number): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : fallback;
}

