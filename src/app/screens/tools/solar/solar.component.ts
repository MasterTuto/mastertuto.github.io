import { ChangeDetectionStrategy, Component, afterNextRender, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerChevronDown, tablerCopy, tablerEraser } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { autofocus, money, moneyField, moneyValue, onMoneyInput, percent, selectOnFocus, tidyMoney } from '../pro-tools/money-field';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import { AVAILABILITY_KWH, CITIES, Connection, FIO_B_SCHEDULE, referencePricePerWp, sizeSolar } from './solar.logic';

const DEFAULTS = {
  byBill: false,
  consumption: '350',
  bill: '',
  city: 'SP',
  hsp: '',
  connection: 'bi' as Connection,
  moduleWp: 610,
  pr: '80',
  tariff: '0,95',
  price: '',
  simultaneity: '30',
  more: false,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:energia-solar';

const CONNECTIONS: { id: Connection; label: string }[] = [
  { id: 'mono', label: 'Monofásica' },
  { id: 'bi', label: 'Bifásica' },
  { id: 'tri', label: 'Trifásica' },
];

const FAQ: FaqItem[] = [
  {
    question: 'Quantas placas solares preciso para uma conta de 300 kWh?',
    answer:
      'Numa ligação bifásica, descontando os 50 kWh do custo de disponibilidade, sobram 250 kWh a compensar. Em São Paulo (4,7 kWh/m²·dia e rendimento de 80%), isso pede cerca de 2,2 kWp, ou 4 módulos de 610 Wp. No Nordeste, com mais sol, 3 a 4 módulos resolvem.',
  },
  {
    question: 'Como calcular a potência do sistema fotovoltaico?',
    answer:
      'kWp = consumo a compensar por mês ÷ (HSP × 30,4 × PR). HSP são as horas de sol pleno, a irradiação média diária no plano dos módulos (kWh/m²·dia); PR é o rendimento global, normalmente de 75% a 82%, que desconta temperatura, inversor, cabos e sujeira. Depois divida os watts pelo módulo escolhido e arredonde para cima.',
  },
  {
    question: 'Por que a conta de luz não zera com energia solar?',
    answer:
      'Porque o consumidor ligado à rede paga, no mínimo, o custo de disponibilidade: 30 kWh (monofásico), 50 kWh (bifásico) ou 100 kWh (trifásico), além da iluminação pública. Para sistemas conectados a partir de 2023 há também a cobrança gradual do Fio B sobre a energia injetada na rede, da Lei 14.300/2022.',
  },
  {
    question: 'O que é o Fio B da Lei 14.300?',
    answer:
      'É a parcela da tarifa que remunera a rede de distribuição. Para quem pediu conexão depois de 7 de janeiro de 2023, a energia injetada e usada depois passa a pagar uma fração crescente do Fio B: 15% em 2023, 30% em 2024, 45% em 2025, 60% em 2026, 75% em 2027 e 90% em 2028. A energia consumida na hora em que é gerada não paga nada.',
  },
  {
    question: 'Em quanto tempo a energia solar se paga?',
    answer:
      'Em sistemas residenciais, o payback costuma ficar entre 3 e 6 anos, conforme o preço do sistema, a tarifa da distribuidora, a irradiação da cidade e quanto da energia é consumida durante o dia. Como os módulos duram mais de 25 anos, a economia acumulada costuma passar de 5 vezes o investimento.',
  },
  {
    question: 'Quanto espaço no telhado um sistema de 3 kWp ocupa?',
    answer:
      'Com módulos de cerca de 22,5% de eficiência, perto de 13 m² de área de módulos, ou 5 placas de 2,28 × 1,13 m. Na prática, reserve um pouco mais para corredores de manutenção e afastamento das bordas, e prefira as águas voltadas para o norte.',
  },
  {
    question: 'Qual inversor escolher?',
    answer:
      'É comum usar um inversor com potência de 75% a 100% da potência dos módulos (relação CC/CA de 1,0 a 1,3), porque os módulos raramente entregam a potência nominal. A calculadora indica o menor inversor padrão dentro desse limite. Microinversores são outra opção para telhados com sombra ou várias orientações.',
  },
];

@Component({
  selector: 'app-solar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent, RouterLink, LangLinkPipe],
  providers: [provideIcons({ tablerCheck, tablerChevronDown, tablerCopy, tablerEraser })],
  templateUrl: './solar.component.html',
})
export class SolarCalculatorComponent {
  readonly tool = proTools[13];
  readonly faq = FAQ;
  readonly money = money;
  readonly percent = percent;
  readonly fmt = fmt;
  readonly cities = CITIES;
  readonly connections = CONNECTIONS;
  readonly availability = AVAILABILITY_KWH;
  readonly fioB = Object.entries(FIO_B_SCHEDULE).map(([year, share]) => ({ year, share }));
  readonly consumptionChips = [150, 250, 350, 500, 800];
  readonly moduleChips = [550, 585, 610, 700];
  readonly flag = copiedFlag();
  readonly selectOnFocus = selectOnFocus;
  readonly tidy = tidyMoney;
  readonly onMoney = onMoneyInput;
  readonly val = inputValue;
  readonly year = signal(2026);

  readonly byBill = signal(DEFAULTS.byBill);
  readonly consumption = signal(DEFAULTS.consumption);
  readonly bill = signal(DEFAULTS.bill);
  readonly city = signal(DEFAULTS.city);
  readonly hsp = signal(DEFAULTS.hsp);
  readonly connection = signal<Connection>(DEFAULTS.connection);
  readonly moduleWp = signal(DEFAULTS.moduleWp);
  readonly pr = signal(DEFAULTS.pr);
  readonly tariff = signal(DEFAULTS.tariff);
  readonly price = signal(DEFAULTS.price);
  readonly simultaneity = signal(DEFAULTS.simultaneity);
  readonly more = signal(DEFAULTS.more);

  readonly cityData = computed(() => CITIES.find((c) => c.uf === this.city()) ?? CITIES[0]);
  readonly hspValue = computed(() => {
    const custom = parseNumberBR(this.hsp());
    return custom > 0 ? custom : this.cityData().hsp;
  });
  readonly tariffValue = computed(() => num(this.tariff(), 0.95));
  readonly consumptionValue = computed(() => {
    if (!this.byBill()) return num(this.consumption(), 0);
    const tariff = this.tariffValue();
    return tariff > 0 ? moneyValue(this.bill()) / tariff : 0;
  });
  readonly result = computed(() =>
    sizeSolar({
      consumption: this.consumptionValue(),
      hsp: this.hspValue(),
      connection: this.connection(),
      moduleWp: this.moduleWp(),
      pr: num(this.pr(), 80) / 100,
      tariff: this.tariffValue(),
      fioBTariffShare: 0.28,
      simultaneity: num(this.simultaneity(), 30) / 100,
      price: moneyValue(this.price()),
      startYear: this.year(),
      tariffIncrease: 0.06,
      degradation: 0.005,
    }),
  );
  readonly belowAvailability = computed(() => {
    const value = this.consumptionValue();
    return value > 0 && value <= AVAILABILITY_KWH[this.connection()];
  });
  /** Cumulative cash flow bars for the chart. */
  readonly chart = computed(() => {
    const r = this.result();
    if (!r) return null;
    const values = [-r.price, ...r.years.map((y) => y.cumulative)];
    const max = Math.max(...values.map(Math.abs), 1);
    const width = 500;
    const height = 160;
    const zero = (height * Math.max(...values)) / (Math.max(...values) - Math.min(...values) || 1);
    const scale = (height - 4) / (Math.max(...values) - Math.min(...values) || max);
    const bar = width / values.length;
    return {
      width,
      height,
      zero,
      bars: values.map((value, i) => ({
        x: i * bar + 1,
        w: bar - 2,
        y: value >= 0 ? zero - value * scale : zero,
        h: Math.max(1, Math.abs(value) * scale),
        positive: value >= 0,
        label: i === 0 ? 'Investimento' : `Ano ${i}`,
        value,
      })),
    };
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
    afterNextRender(() => this.year.set(Math.max(2026, new Date().getFullYear())));
    autofocus('sv-consumption');
  }

  pickCity(uf: string): void {
    this.city.set(uf);
    this.hsp.set('');
  }

  paybackText(years: number | null): string {
    if (years === null) return 'mais de 25 anos';
    const whole = Math.floor(years);
    const months = Math.round((years - whole) * 12);
    if (months === 12) return `${whole + 1} anos`;
    return `${whole ? whole + (whole === 1 ? ' ano' : ' anos') : ''}${whole && months ? ' e ' : ''}${months ? months + (months === 1 ? ' mês' : ' meses') : ''}` || 'menos de 1 mês';
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const city = this.cityData();
    return [
      '*Pré-dimensionamento fotovoltaico*',
      `Consumo: ${fmt(this.consumptionValue())} kWh/mês · ${city.name}/${city.uf} (HSP ${fmt(this.hspValue(), 2)})`,
      `Sistema: *${fmt(r.kwp, 2)} kWp* · ${r.modules} módulos de ${this.moduleWp()} Wp · inversor de ${fmt(r.inverterKw, 1)} kW`,
      `Geração estimada: ${fmt(r.monthly)} kWh/mês (${fmt(r.yearly)} kWh/ano)`,
      `Área de módulos: ${fmt(r.area, 1)} m²`,
      `Investimento${r.estimatedPrice ? ' estimado' : ''}: ${money(r.price)}`,
      `Economia no 1º ano: ${money(r.firstYearSaving)} (${money(r.monthlySaving)}/mês)`,
      `Payback: ${this.paybackText(r.payback)} · economia em 25 anos: ${money(r.saving25)}`,
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug}`,
    ].join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, consumption: '', bill: '', city: this.city() });
    forgetState(STORAGE_KEY);
    document.getElementById('sv-consumption')?.focus();
  }

  floor(value: number): number {
    return Math.floor(value);
  }

  pricePerWp(kwp: number): string {
    return money(referencePricePerWp(kwp));
  }

  private snapshot(): State {
    return {
      byBill: this.byBill(),
      consumption: this.consumption(),
      bill: this.bill(),
      city: this.city(),
      hsp: this.hsp(),
      connection: this.connection(),
      moduleWp: this.moduleWp(),
      pr: this.pr(),
      tariff: this.tariff(),
      price: this.price(),
      simultaneity: this.simultaneity(),
      more: this.more(),
    };
  }

  private apply(state: State): void {
    this.byBill.set(!!state.byBill);
    this.consumption.set(String(state.consumption ?? ''));
    this.bill.set(String(state.bill ?? ''));
    this.city.set(CITIES.some((c) => c.uf === state.city) ? state.city : DEFAULTS.city);
    this.hsp.set(String(state.hsp ?? ''));
    this.connection.set(['mono', 'bi', 'tri'].includes(state.connection) ? state.connection : DEFAULTS.connection);
    this.moduleWp.set(Number(state.moduleWp) >= 100 && Number(state.moduleWp) <= 1000 ? Number(state.moduleWp) : DEFAULTS.moduleWp);
    this.pr.set(String(state.pr ?? DEFAULTS.pr));
    this.tariff.set(String(state.tariff ?? DEFAULTS.tariff));
    this.price.set(String(state.price ?? ''));
    this.simultaneity.set(String(state.simultaneity ?? DEFAULTS.simultaneity));
    this.more.set(!!state.more);
  }
}

function num(text: string, fallback: number): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : fallback;
}
