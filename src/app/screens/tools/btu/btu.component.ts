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
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover:not(:disabled) { background: rgb(68 74 81 / .07); }
    .step button:disabled { opacity: .35; }
    .step output { min-width: 2rem; text-align: center; font-weight: 650; font-variant-numeric: tabular-nums; }
    .stat { display: grid; gap: .1rem; padding: .25rem 0; }
    .stat + .stat { padding-left: 1rem; border-left: 1px solid rgb(68 74 81 / .12); }
    .stat b { font-size: 1.5rem; font-weight: 700; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Quantos BTUs o ambiente precisa? Informe a área, quem usa e o sol que bate: a calculadora indica o modelo
          comercial certo, estima o consumo na conta de luz e gera um resumo pronto para mandar ao cliente.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (pick(); as p) {
              <span>{{ fmt(breakdown()!.total) }} BTU/h →</span>
              <strong>{{ p.units > 1 ? p.units + ' × ' : '' }}{{ fmt(p.capacity) }} BTU/h</strong>
            } @else {
              <span>Informe a área</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <div class="flex items-center justify-between gap-3 sm:block">
                <label class="pro-label" [attr.for]="byMeasures() ? 'btu-depth' : 'btu-area'">Área</label>
                <div class="pro-segmented w-44 sm:mt-2 sm:w-full" role="group" aria-label="Informar área por">
                  <button type="button" [attr.aria-pressed]="!byMeasures()" (click)="byMeasures.set(false)">m²</button>
                  <button type="button" [attr.aria-pressed]="byMeasures()" (click)="byMeasures.set(true)">Medidas</button>
                </div>
              </div>
              <div class="min-w-0">
                @if (byMeasures()) {
                  <div class="flex items-center gap-2">
                    <label class="pro-input-wrap flex-1">
                      <span class="sr-only">Comprimento</span>
                      <input id="btu-depth" class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Comprimento em metros" [value]="depth()" (input)="depth.set(val($event))" />
                      <span class="pro-suffix">m</span>
                    </label>
                    <span class="text-foreground-light" aria-hidden="true">×</span>
                    <label class="pro-input-wrap flex-1">
                      <span class="sr-only">Largura</span>
                      <input class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Largura em metros" [value]="width()" (input)="width.set(val($event))" />
                      <span class="pro-suffix">m</span>
                    </label>
                  </div>
                  @if (areaValue() > 0) {
                    <p class="pro-hint mt-1.5">= {{ fmt(areaValue(), 1) }} m²</p>
                  }
                } @else {
                  <div class="pro-input-wrap">
                    <input id="btu-area" class="pro-input" inputmode="decimal" autocomplete="off" [value]="area()" (input)="area.set(val($event))" />
                    <span class="pro-suffix">m²</span>
                  </div>
                  <div class="pro-chips mt-2" role="group" aria-label="Áreas comuns">
                    @for (value of areas; track value) {
                      <button type="button" class="pro-chip" [attr.aria-pressed]="areaValue() === value" (click)="area.set(value + '')">{{ value }} m²</button>
                    }
                  </div>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="btu-sun">Sol no ambiente</span>
              <div class="pro-segmented" role="group" aria-labelledby="btu-sun">
                @for (s of sunOptions; track s.id) {
                  <button type="button" [attr.aria-pressed]="sun() === s.id" (click)="sun.set(s.id)">{{ s.label }}</button>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="btu-room">Ambiente</span>
              <div class="pro-segmented" role="group" aria-labelledby="btu-room">
                @for (r of rooms; track r.id) {
                  <button type="button" [attr.aria-pressed]="room() === r.id" (click)="room.set(r.id)">{{ r.label }}</button>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label">Ocupação</span>
              <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div class="flex items-center gap-3">
                  <span class="text-sm text-foreground" id="btu-people">Pessoas</span>
                  <div class="step" role="group" aria-labelledby="btu-people">
                    <button type="button" aria-label="Menos uma pessoa" [disabled]="people() <= 1" (click)="people.set(clamp(people() - 1, 1, 50))"><ng-icon name="tablerMinus" /></button>
                    <output aria-live="polite">{{ people() }}</output>
                    <button type="button" aria-label="Mais uma pessoa" (click)="people.set(clamp(people() + 1, 1, 50))"><ng-icon name="tablerPlus" /></button>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm text-foreground" id="btu-devices">Aparelhos <small class="text-foreground-light">TV, PC…</small></span>
                  <div class="step" role="group" aria-labelledby="btu-devices">
                    <button type="button" aria-label="Menos um aparelho" [disabled]="devices() <= 0" (click)="devices.set(clamp(devices() - 1, 0, 50))"><ng-icon name="tablerMinus" /></button>
                    <output aria-live="polite">{{ devices() }}</output>
                    <button type="button" aria-label="Mais um aparelho" (click)="devices.set(clamp(devices() + 1, 0, 50))"><ng-icon name="tablerPlus" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="btu-ceiling">Pé-direito <small>acima de 3 m ajusta</small></label>
              <div class="pro-input-wrap w-36">
                <input id="btu-ceiling" class="pro-input" inputmode="decimal" autocomplete="off" [value]="ceiling()" (input)="ceiling.set(val($event))" />
                <span class="pro-suffix">m</span>
              </div>
            </div>

            <div class="mt-6 border-t-2 border-foreground/80 pt-4">
              <h2 class="text-base font-semibold text-foreground">Consumo estimado</h2>
              <div class="mt-3 grid grid-cols-2 gap-3">
                <div class="pro-field">
                  <label class="pro-label" for="btu-hours">Uso por dia</label>
                  <div class="pro-input-wrap">
                    <input id="btu-hours" class="pro-input" inputmode="decimal" autocomplete="off" [value]="hours()" (input)="hours.set(val($event))" />
                    <span class="pro-suffix">h</span>
                  </div>
                </div>
                <div class="pro-field">
                  <label class="pro-label" for="btu-tariff">Tarifa</label>
                  <div class="pro-input-wrap">
                    <input id="btu-tariff" class="pro-input !pr-14" inputmode="decimal" autocomplete="off" [value]="tariff()" (input)="tariff.set(val($event))" />
                    <span class="pro-suffix">R$/kWh</span>
                  </div>
                </div>
              </div>
              <div class="pro-chips mt-2" role="group" aria-label="Horas por dia">
                @for (h of hourChips; track h) {
                  <button type="button" class="pro-chip" [attr.aria-pressed]="hoursValue() === h" (click)="hours.set(h + '')">{{ h }} h/dia</button>
                }
              </div>
              @if (usage(); as u) {
                <div class="mt-4 grid grid-cols-2 border-y border-foreground/10 py-3" aria-live="polite">
                  <div class="stat">
                    <span class="text-xs font-semibold text-foreground-light">Inverter</span>
                    <b class="text-foreground">{{ money(u.inverter.costMonth) }}</b>
                    <span class="text-sm text-foreground-light">{{ fmt(u.inverter.kwhMonth) }} kWh/mês</span>
                  </div>
                  <div class="stat">
                    <span class="text-xs font-semibold text-foreground-light">Convencional</span>
                    <b class="text-foreground">{{ money(u.conventional.costMonth) }}</b>
                    <span class="text-sm text-foreground-light">{{ fmt(u.conventional.kwhMonth) }} kWh/mês</span>
                  </div>
                </div>
                <p class="pro-hint mt-2">
                  Inverter economiza cerca de {{ money(u.conventional.costMonth - u.inverter.costMonth) }} por mês
                  ({{ money((u.conventional.costMonth - u.inverter.costMonth) * 12) }} por ano) neste uso.
                </p>
              }
            </div>
          </div>

          <div class="mt-2 flex justify-end">
            <button type="button" class="pro-btn ghost !min-h-[40px] !px-3 text-sm" (click)="clear()">
              <ng-icon name="tablerEraser" aria-hidden="true" /> Limpar
            </button>
          </div>
        </div>

        <aside class="pro-result" aria-live="polite" aria-label="Resultado">
          <p class="pro-result-label">Aparelho indicado</p>
          @if (pick(); as p) {
            <p class="pro-result-main">{{ p.units > 1 ? p.units + ' × ' : '' }}{{ fmt(p.capacity) }}<small>BTU/h</small></p>
            <p class="pro-result-sub">Carga térmica estimada: <strong>{{ fmt(breakdown()!.total) }} BTU/h</strong></p>
            @if (p.units > 1) {
              <p class="mt-3 text-sm leading-relaxed opacity-80">
                Acima de 60.000 BTU/h, divida o ambiente entre {{ p.units }} aparelhos ou avalie um sistema multi-split, piso-teto ou VRF.
              </p>
            }
            @if (breakdown(); as b) {
              <dl class="pro-result-list">
                <div><dt>{{ fmt(areaValue(), 1) }} m² × {{ fmt(b.perSquareMetre) }}{{ b.ceilingFactor > 1 ? ' × ' + fmt(b.ceilingFactor, 2) : '' }}</dt><dd>{{ fmt(b.areaShare) }}</dd></div>
                <div><dt>Pessoas extras ({{ people() - 1 }})</dt><dd>+ {{ fmt(b.peopleShare) }}</dd></div>
                <div><dt>Aparelhos ({{ devices() }})</dt><dd>+ {{ fmt(b.devicesShare) }}</dd></div>
                @if (b.kitchenShare) {
                  <div><dt>Cozinha (fogão e geladeira)</dt><dd>+ {{ fmt(b.kitchenShare) }}</dd></div>
                }
              </dl>
            }
            <button type="button" class="pro-btn mt-4 w-full" (click)="copy()">
              <ng-icon [name]="copied() ? 'tablerCheck' : 'tablerCopy'" aria-hidden="true" />
              {{ copied() ? 'Resumo copiado!' : 'Copiar resumo para o cliente' }}
            </button>
          } @else {
            <p class="pro-result-empty">Informe a área do ambiente para ver a capacidade indicada.</p>
          }
        </aside>
      </div>

      <p class="pro-notice max-w-3xl">
        <strong>Estimativa pela regra prática.</strong> O consumo usa eficiência típica (COP 3,2 com o compressor
        ligado 80% do tempo no convencional; índice sazonal 5,5 no inverter) e 30 dias por mês. Ambientes com muito
        vidro, cobertura sem laje ou fontes de calor fortes pedem cálculo de carga térmica completo.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Digite a área em m² ou troque para <em>Medidas</em> e informe comprimento e largura.</li>
            <li>Marque o sol que bate no ambiente: sol da tarde aquece paredes e vidros e pesa mais.</li>
            <li>Ajuste quantas pessoas costumam ficar no ambiente e os aparelhos que esquentam (TV, computador, geladeira).</li>
            <li>Confira o modelo indicado, o consumo e toque em <em>Copiar resumo</em> para enviar ao cliente pelo WhatsApp.</li>
          </ol>
        </section>

        <section>
          <h2>Como o cálculo é feito</h2>
          <p>A calculadora usa a regra prática adotada por instaladores e fabricantes no Brasil:</p>
          <ul>
            <li><strong>{{ fmt(perM2.none) }} BTU/h por m²</strong> em ambientes sem sol ou com sol da manhã;</li>
            <li><strong>{{ fmt(perM2.afternoon) }} BTU/h por m²</strong> com sol da tarde;</li>
            <li><strong>+600 BTU/h</strong> por pessoa além da primeira e por aparelho eletrônico;</li>
            <li><strong>+1.200 BTU/h</strong> em cozinhas (fogão e geladeira);</li>
            <li>pé-direito acima de 3 m aumenta a parcela da área na mesma proporção (ex.: 3,6 m → × 1,2).</li>
          </ul>
          <p>O resultado é arredondado para o menor modelo comercial que cobre a carga.</p>
          <h3>Exemplo: quarto de 12 m² com sol da tarde e 2 pessoas</h3>
          <p>
            12 × 800 = 9.600 BTU/h, mais 600 da segunda pessoa = <strong>10.200 BTU/h</strong>. Como 9.000 não cobre,
            o aparelho indicado é o de <strong>12.000 BTU/h</strong>.
          </p>
        </section>

        <section>
          <h2>Tabela rápida de BTU por área</h2>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead><tr><th scope="col">Área</th><th scope="col">Sem sol / manhã</th><th scope="col">Sol da tarde</th></tr></thead>
              <tbody>
                @for (a of tableAreas; track a) {
                  <tr><td>{{ a }} m²</td><td>{{ fmt(size(a * perM2.none)) }} BTU/h</td><td>{{ fmt(size(a * perM2.afternoon)) }} BTU/h</td></tr>
                }
              </tbody>
            </table>
          </div>
          <p class="pro-hint mt-2">Para 1 pessoa e nenhum aparelho. Modelos considerados: {{ sizes }} BTU/h.</p>
        </section>

        <section>
          <h2>Perguntas frequentes</h2>
          @for (item of faq; track item.question) {
            <details>
              <summary>{{ item.question }}</summary>
              <p>{{ item.answer }}</p>
            </details>
          }
        </section>

        <section>
          <h2>Fontes</h2>
          <ul>
            <li>ABNT NBR 16401-1:2008 — Instalações de ar-condicionado: projetos das instalações (cálculo de carga térmica).</li>
            <li>INMETRO — Programa Brasileiro de Etiquetagem de condicionadores de ar (índice IDRS e tabelas de consumo).</li>
            <li>PROCEL — orientações de escolha e uso eficiente de ar-condicionado.</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
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
