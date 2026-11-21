import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  BTU_PER_M2,
  COMMERCIAL_SIZES,
  RoomKind,
  SunExposure,
  btuBreakdown,
  consumption,
  parseNumberBR,
  recommend,
} from './btu.logic';

const ROOMS: { id: RoomKind; label: string }[] = [
  { id: 'bedroom', label: 'Quarto' },
  { id: 'living', label: 'Sala' },
  { id: 'office', label: 'Escritório' },
  { id: 'kitchen', label: 'Cozinha' },
];
const SUN: { id: SunExposure; label: string }[] = [
  { id: 'none', label: 'Sem sol' },
  { id: 'morning', label: 'Manhã' },
  { id: 'afternoon', label: 'Tarde' },
];

const DEFAULTS = {
  byMeasures: false,
  area: '12',
  width: '',
  depth: '',
  room: 'bedroom' as RoomKind,
  sun: 'morning' as SunExposure,
  people: 1,
  devices: 0,
  ceiling: '2,7',
  hours: '8',
  tariff: '0,85',
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:btu';

const FAQ: FaqItem[] = [
  {
    question: 'Quantos BTUs preciso para um quarto de 12 m²?',
    answer:
      'Sem sol ou com sol só de manhã: 12 × 600 = 7.200 BTU/h, então um aparelho de 7.500 ou 9.000 BTU/h. Com sol da tarde: 12 × 800 = 9.600 BTU/h, o que pede 12.000 BTU/h. Cada pessoa além da primeira e cada aparelho que esquenta somam 600 BTU/h.',
  },
  {
    question: 'Como calcular BTU por metro quadrado?',
    answer:
      'A regra prática usada no Brasil é 600 BTU/h por m² para ambientes sem sol ou com sol da manhã e 800 BTU/h por m² com sol da tarde. Depois some 600 BTU/h por pessoa extra e por equipamento eletrônico ligado no ambiente.',
  },
  {
    question: 'Ar-condicionado maior que o necessário é problema?',
    answer:
      'Sim. Um aparelho superdimensionado liga e desliga muitas vezes, desumidifica mal e custa mais. Subdimensionado, trabalha no máximo o tempo todo e não chega à temperatura. Por isso a calculadora indica o menor modelo comercial que cobre a carga.',
  },
  {
    question: 'Quanto gasta um ar-condicionado de 12.000 BTUs por mês?',
    answer:
      'Usando 8 horas por dia, um modelo convencional fica perto de 210 kWh/mês e um inverter perto de 155 kWh/mês. Com tarifa de R$ 0,85/kWh, isso dá cerca de R$ 180 e R$ 130. O valor real depende da classe de eficiência, do isolamento e da temperatura escolhida.',
  },
  {
    question: 'A regra prática substitui o cálculo de carga térmica?',
    answer:
      'Para quartos, salas e escritórios comuns, a regra atende bem. Ambientes com muito vidro, cobertura sem laje, cozinhas industriais, servidores ou pé-direito duplo pedem um cálculo de carga térmica completo feito pelo técnico.',
  },
];

@Component({
  selector: 'app-btu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover:not(:disabled) { background: rgb(68 74 81 / .07); }
    .step button:disabled { opacity: .35; }
    .step output { min-width: 2rem; text-align: center; font-weight: 650; font-variant-numeric: tabular-nums; }
    .stat { display: grid; gap: .1rem; padding: .25rem 0; }
    .stat + .stat { padding-left: 1rem; border-left: 1px solid rgb(68 74 81 / .12); }
    .stat b { font-size: 1.5rem; font-weight: 700; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
  `,
  templateUrl: './btu.component.html',
})
export class BtuCalculatorComponent {
  readonly tool = proTools[1];
  readonly faq = FAQ;
  readonly rooms = ROOMS;
  readonly sunOptions = SUN;
  readonly areas = [9, 12, 15, 20, 25, 30];
  readonly hourChips = [4, 8, 12];
  readonly tableAreas = [9, 12, 15, 20, 25, 30, 40, 50];
  readonly perM2 = BTU_PER_M2;
  readonly sizes = COMMERCIAL_SIZES.map((s) => s.toLocaleString('pt-BR')).join(', ');

  readonly byMeasures = signal(DEFAULTS.byMeasures);
  readonly area = signal(DEFAULTS.area);
  readonly width = signal(DEFAULTS.width);
  readonly depth = signal(DEFAULTS.depth);
  readonly room = signal(DEFAULTS.room);
  readonly sun = signal(DEFAULTS.sun);
  readonly people = signal(DEFAULTS.people);
  readonly devices = signal(DEFAULTS.devices);
  readonly ceiling = signal(DEFAULTS.ceiling);
  readonly hours = signal(DEFAULTS.hours);
  readonly tariff = signal(DEFAULTS.tariff);
  readonly copied = signal(false);

  readonly areaValue = computed(() => {
    const value = this.byMeasures() ? parseNumberBR(this.width()) * parseNumberBR(this.depth()) : parseNumberBR(this.area());
    return value > 0 ? value : 0;
  });
  readonly hoursValue = computed(() => parseNumberBR(this.hours()) || 0);

  readonly breakdown = computed(() =>
    btuBreakdown({
      area: this.areaValue(),
      people: this.people(),
      devices: this.devices(),
      sun: this.sun(),
      room: this.room(),
      ceiling: parseNumberBR(this.ceiling()) || 0,
    }),
  );
  readonly pick = computed(() => recommend(this.breakdown()?.total ?? 0));

  readonly usage = computed(() => {
    const p = this.pick();
    if (!p) return null;
    const total = p.units * p.capacity;
    const tariff = parseNumberBR(this.tariff()) || 0;
    const inverter = consumption(total, 'inverter', this.hoursValue(), tariff);
    const conventional = consumption(total, 'conventional', this.hoursValue(), tariff);
    return inverter && conventional ? { inverter, conventional } : null;
  });

  private readonly restored = signal(false);
  private copiedTimer: ReturnType<typeof setTimeout> | undefined;

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
  }

  val(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  fmt(value: number, digits = 0): string {
    return value.toLocaleString('pt-BR', { maximumFractionDigits: digits });
  }

  money(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  size(btu: number): number {
    return recommend(btu)?.capacity ?? 0;
  }

  summaryText(): string {
    const b = this.breakdown();
    const p = this.pick();
    if (!b || !p) return '';
    const room = ROOMS.find((r) => r.id === this.room())?.label ?? 'Ambiente';
    const sun = { none: 'sem sol', morning: 'sol da manhã', afternoon: 'sol da tarde' }[this.sun()];
    const u = this.usage();
    const lines = [
      '*Dimensionamento de ar-condicionado*',
      `${room} de ${this.fmt(this.areaValue(), 1)} m² (${sun})`,
      `Pessoas: ${this.people()} · Aparelhos: ${this.devices()}`,
      `Carga térmica estimada: ${this.fmt(b.total)} BTU/h`,
      `Aparelho indicado: *${p.units > 1 ? p.units + ' × ' : ''}${this.fmt(p.capacity)} BTU/h*`,
    ];
    if (u) {
      lines.push(
        '',
        `Consumo estimado (${this.fmt(this.hoursValue(), 1)} h/dia, ${this.money(parseNumberBR(this.tariff()) || 0)}/kWh):`,
        `• Inverter: ${this.fmt(u.inverter.kwhMonth)} kWh/mês ≈ ${this.money(u.inverter.costMonth)}`,
        `• Convencional: ${this.fmt(u.conventional.kwhMonth)} kWh/mês ≈ ${this.money(u.conventional.costMonth)}`,
      );
    }
    lines.push('', `Cálculo: ${this.fmt(b.perSquareMetre)} BTU/h por m² + 600 por pessoa extra e por aparelho.`);
    return lines.join('\n');
  }

  async copy(): Promise<void> {
    const text = this.summaryText();
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
    this.apply({ ...DEFAULTS, area: '', width: '', depth: '' });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    document.getElementById(this.byMeasures() ? 'btu-depth' : 'btu-area')?.focus();
  }

  private snapshot(): State {
    return {
      byMeasures: this.byMeasures(),
      area: this.area(),
      width: this.width(),
      depth: this.depth(),
      room: this.room(),
      sun: this.sun(),
      people: this.people(),
      devices: this.devices(),
      ceiling: this.ceiling(),
      hours: this.hours(),
      tariff: this.tariff(),
    };
  }

  private apply(state: State): void {
    this.byMeasures.set(state.byMeasures);
    this.area.set(state.area);
    this.width.set(state.width);
    this.depth.set(state.depth);
    this.room.set(state.room);
    this.sun.set(state.sun);
    this.people.set(state.people);
    this.devices.set(state.devices);
    this.ceiling.set(state.ceiling);
    this.hours.set(state.hours);
    this.tariff.set(state.tariff);
  }
}
