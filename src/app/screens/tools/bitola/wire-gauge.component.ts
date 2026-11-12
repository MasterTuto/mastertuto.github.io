import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  BREAKERS,
  CircuitKind,
  InstallMethod,
  Material,
  comparisonRows,
  parseNumberBR,
  sizeCable,
} from './wire-gauge.logic';

type SystemId = 'mono127' | 'mono220' | 'bi220' | 'tri220' | 'tri380' | 'custom';

const SYSTEMS: { id: SystemId; label: string; phases: 1 | 3; voltage: number }[] = [
  { id: 'mono127', label: '127 V mono', phases: 1, voltage: 127 },
  { id: 'bi220', label: '220 V bifásico', phases: 1, voltage: 220 },
  { id: 'mono220', label: '220 V mono', phases: 1, voltage: 220 },
  { id: 'tri220', label: '220 V trifásico', phases: 3, voltage: 220 },
  { id: 'tri380', label: '380 V trifásico', phases: 3, voltage: 380 },
  { id: 'custom', label: 'Outra', phases: 1, voltage: 0 },
];

const LOADS: { label: string; watts: number; pf: number; kind: CircuitKind }[] = [
  { label: 'Chuveiro 5.500 W', watts: 5500, pf: 1, kind: 'power' },
  { label: 'Chuveiro 7.500 W', watts: 7500, pf: 1, kind: 'power' },
  { label: 'Ar 9.000 BTU', watts: 900, pf: 0.92, kind: 'power' },
  { label: 'Ar 12.000 BTU', watts: 1200, pf: 0.92, kind: 'power' },
  { label: 'Forno 3.000 W', watts: 3000, pf: 1, kind: 'power' },
  { label: 'Cooktop 7.000 W', watts: 7000, pf: 1, kind: 'power' },
  { label: 'Tomadas TUG 1.270 W', watts: 1270, pf: 1, kind: 'power' },
  { label: 'Iluminação 600 W', watts: 600, pf: 1, kind: 'lighting' },
];

const METHODS: { id: InstallMethod; label: string; hint: string }[] = [
  { id: 'B1', label: 'Eletroduto embutido', hint: 'B1 · condutores isolados em eletroduto na parede' },
  { id: 'C', label: 'Cabo na parede', hint: 'C · cabo fixado direto na parede ou canaleta aberta' },
  { id: 'D', label: 'Enterrado', hint: 'D · cabo em eletroduto enterrado no solo' },
];

const DEFAULTS = {
  system: 'bi220' as SystemId,
  customVoltage: '',
  customPhases: 1 as 1 | 3,
  mode: 'power' as 'power' | 'current',
  power: '5500',
  current: '',
  pf: 1,
  kind: 'power' as CircuitKind,
  length: '20',
  maxDrop: 4,
  material: 'cu' as Material,
  method: 'B1' as InstallMethod,
  grouped: 1,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:bitola';

const FAQ: FaqItem[] = [
  {
    question: 'Qual a bitola do fio para um chuveiro de 5.500 W em 220 V?',
    answer:
      'A corrente é 5.500 ÷ 220 = 25 A. Em eletroduto embutido (método B1), o cabo de 2,5 mm² conduz 24 A, então o mínimo é 4 mm² (32 A), com disjuntor de 25 A ou 32 A. Em circuitos longos, a queda de tensão pode exigir 6 mm².',
  },
  {
    question: 'Qual a queda de tensão máxima permitida pela NBR 5410?',
    answer:
      'Nos circuitos terminais a queda não deve passar de 4% a partir do quadro de distribuição. Somando o trecho desde o ponto de entrega, o limite total é de 5% (alimentação por rede pública em baixa tensão) ou 7% (com transformador ou geração própria).',
  },
  {
    question: 'Por que a calculadora indica um cabo maior do que a corrente pede?',
    answer:
      'O cabo indicado é o maior entre três critérios: capacidade de condução, queda de tensão e seção mínima da norma (1,5 mm² para iluminação e 2,5 mm² para tomadas). Também precisa existir um disjuntor padronizado entre a corrente do circuito e a capacidade do cabo.',
  },
  {
    question: 'Como escolher o disjuntor do circuito?',
    answer:
      'O disjuntor precisa ter corrente nominal maior ou igual à corrente de projeto e menor ou igual à capacidade de condução do cabo já corrigida (Ib ≤ In ≤ Iz). Assim ele não desarma em uso normal e protege o cabo contra sobrecarga.',
  },
  {
    question: 'A calculadora substitui um projeto elétrico?',
    answer:
      'Não. Ela dá uma estimativa rápida para conferência em campo. Temperatura ambiente, cabos de outro isolamento (EPR/XLPE), harmônicas e coordenação com DR e DPS exigem projeto de um profissional habilitado, com ART ou TRT.',
  },
];

@Component({
  selector: 'app-wire-gauge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerEraser, tablerMinus, tablerPlus })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover { background: rgb(68 74 81 / .07); }
    .step output { min-width: 2.25rem; text-align: center; font-weight: 650; font-variant-numeric: tabular-nums; }
    tr.on td { background: rgb(122 112 225 / .1); font-weight: 650; }
    details > summary::-webkit-details-marker { display: none; }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Informe a carga, a tensão e a distância do quadro: a calculadora aplica os critérios da NBR 5410
          (capacidade de condução, queda de tensão e seção mínima) e indica o cabo e o disjuntor na hora.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (result(); as r) {
              <span>Cabo · disjuntor</span>
              <strong>{{ r.recommended ? sec(r.recommended) + ' mm² · ' + r.breaker + ' A' : 'Sem solução' }}</strong>
            } @else {
              <span>Preencha carga e distância</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <span class="pro-label" id="wg-system">Sistema</span>
              <div class="min-w-0">
                <div class="pro-chips" role="group" aria-labelledby="wg-system">
                  @for (s of systems; track s.id) {
                    <button type="button" class="pro-chip" [attr.aria-pressed]="system() === s.id" (click)="system.set(s.id)">{{ s.label }}</button>
                  }
                </div>
                @if (system() === 'custom') {
                  <div class="mt-3 grid grid-cols-2 gap-3">
                    <label class="pro-input-wrap">
                      <span class="sr-only">Tensão</span>
                      <input class="pro-input" inputmode="decimal" autocomplete="off" [value]="customVoltage()" (input)="customVoltage.set(val($event))" placeholder="Tensão" />
                      <span class="pro-suffix">V</span>
                    </label>
                    <div class="pro-segmented" role="group" aria-label="Fases">
                      <button type="button" [attr.aria-pressed]="customPhases() === 1" (click)="customPhases.set(1)">Mono/bi</button>
                      <button type="button" [attr.aria-pressed]="customPhases() === 3" (click)="customPhases.set(3)">Trifásico</button>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="f">
              <div class="flex items-center justify-between gap-3 sm:block">
                <label class="pro-label" for="wg-load">Carga</label>
                <div class="pro-segmented w-44 sm:mt-2 sm:w-full" role="group" aria-label="Informar carga por">
                  <button type="button" [attr.aria-pressed]="mode() === 'power'" (click)="mode.set('power')">Potência</button>
                  <button type="button" [attr.aria-pressed]="mode() === 'current'" (click)="mode.set('current')">Corrente</button>
                </div>
              </div>
              <div class="min-w-0">
                <div class="pro-input-wrap">
                  @if (mode() === 'power') {
                    <input id="wg-load" class="pro-input" inputmode="decimal" autocomplete="off" [value]="power()" (input)="power.set(val($event))" />
                    <span class="pro-suffix">W</span>
                  } @else {
                    <input id="wg-load" class="pro-input" inputmode="decimal" autocomplete="off" [value]="current()" (input)="current.set(val($event))" />
                    <span class="pro-suffix">A</span>
                  }
                </div>
                @if (mode() === 'power') {
                  <div class="pro-chips mt-2" role="group" aria-label="Cargas típicas">
                    @for (load of loads; track load.label) {
                      <button type="button" class="pro-chip" [attr.aria-pressed]="isLoad(load)" (click)="pickLoad(load)">{{ load.label }}</button>
                    }
                  </div>
                  <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span class="pro-hint" id="wg-pf">Fator de potência</span>
                    <div class="pro-chips" role="group" aria-labelledby="wg-pf">
                      @for (value of pfs; track value) {
                        <button type="button" class="pro-chip !min-h-[34px] !px-3 !py-1" [attr.aria-pressed]="pf() === value" (click)="pf.set(value)">{{ fmt(value, 2) }}</button>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="wg-length">Distância <small>só ida, do quadro</small></label>
              <div class="flex items-center gap-3">
                <div class="pro-input-wrap w-32 shrink-0">
                  <input id="wg-length" class="pro-input" inputmode="decimal" autocomplete="off" [value]="length()" (input)="length.set(val($event))" />
                  <span class="pro-suffix">m</span>
                </div>
                <input type="range" min="1" max="100" step="1" class="h-2 min-w-0 flex-1 cursor-pointer accent-foreground-emphasis" aria-label="Distância em metros"
                  [value]="lengthValue() || 1" (input)="length.set(val($event))" />
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="wg-drop">Queda máxima</span>
              <div class="pro-segmented" role="group" aria-labelledby="wg-drop">
                @for (value of drops; track value) {
                  <button type="button" [attr.aria-pressed]="maxDrop() === value" (click)="maxDrop.set(value)">{{ value }}%</button>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="wg-kind">Circuito</span>
              <div class="pro-segmented" role="group" aria-labelledby="wg-kind">
                <button type="button" [attr.aria-pressed]="kind() === 'power'" (click)="kind.set('power')">Tomadas e força</button>
                <button type="button" [attr.aria-pressed]="kind() === 'lighting'" (click)="kind.set('lighting')">Iluminação</button>
              </div>
            </div>

            <details class="f group !block">
              <summary class="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3">
                <span class="pro-label">Instalação</span>
                <span class="text-right text-sm text-foreground-light">
                  {{ material() === 'cu' ? 'Cobre' : 'Alumínio' }} · {{ method() }} · {{ grouped() }} {{ grouped() === 1 ? 'circuito' : 'circuitos' }}
                  <span class="ml-1 inline-block transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                </span>
              </summary>
              <div class="mt-3 grid gap-4">
                <div class="pro-segmented" role="group" aria-label="Material do condutor">
                  <button type="button" [attr.aria-pressed]="material() === 'cu'" (click)="material.set('cu')">Cobre</button>
                  <button type="button" [attr.aria-pressed]="material() === 'al'" (click)="material.set('al')">Alumínio</button>
                </div>
                <div>
                  <div class="pro-segmented" role="group" aria-label="Método de instalação">
                    @for (m of methods; track m.id) {
                      <button type="button" [attr.aria-pressed]="method() === m.id" (click)="method.set(m.id)">{{ m.label }}</button>
                    }
                  </div>
                  <p class="pro-hint mt-1.5">{{ methodHint() }}</p>
                </div>
                <div class="flex items-center justify-between gap-3">
                  <span class="pro-label" id="wg-group">Circuitos no mesmo eletroduto <small>agrupamento</small></span>
                  <div class="step" role="group" aria-labelledby="wg-group">
                    <button type="button" aria-label="Menos um circuito" (click)="grouped.set(clamp(grouped() - 1, 1, 20))"><ng-icon name="tablerMinus" /></button>
                    <output aria-live="polite">{{ grouped() }}</output>
                    <button type="button" aria-label="Mais um circuito" (click)="grouped.set(clamp(grouped() + 1, 1, 20))"><ng-icon name="tablerPlus" /></button>
                  </div>
                </div>
              </div>
            </details>
          </div>

          <div class="mt-2 flex justify-end">
            <button type="button" class="pro-btn ghost !min-h-[40px] !px-3 text-sm" (click)="clear()">
              <ng-icon name="tablerEraser" aria-hidden="true" /> Limpar
            </button>
          </div>
        </div>

        <aside class="pro-result" aria-live="polite" aria-label="Resultado">
          @if (result(); as r) {
            <div class="flex items-start justify-between gap-3">
              <p class="pro-result-label">Cabo recomendado</p>
              <span class="pro-pill" [class.ok]="r.status === 'ok'" [class.warn]="r.status === 'warn'" [class.bad]="r.status === 'bad'">
                {{ r.status === 'ok' ? 'Atende à NBR 5410' : r.status === 'warn' ? 'Atenção' : 'Revise o circuito' }}
              </span>
            </div>
            @if (r.recommended) {
              <p class="pro-result-main">{{ sec(r.recommended) }}<small>mm²</small></p>
              <p class="pro-result-sub">
                {{ material() === 'cu' ? 'Cobre' : 'Alumínio' }}, isolação PVC · disjuntor <strong>{{ r.breaker }} A</strong>
                @if (r.breakerMax && r.breakerMax !== r.breaker) { (até {{ r.breakerMax }} A) }
              </p>
              <dl class="pro-result-list">
                <div><dt>Corrente de projeto</dt><dd>{{ fmt(r.current, 1) }} A</dd></div>
                <div><dt>Por capacidade de condução</dt><dd>{{ r.byAmpacity ? sec(r.byAmpacity) + ' mm²' : '> 240 mm²' }}</dd></div>
                <div><dt>Por queda de tensão</dt><dd>{{ r.byDrop ? sec(r.byDrop) + ' mm²' : '> 240 mm²' }}</dd></div>
                <div><dt>Mínimo da norma</dt><dd>{{ sec(r.byMinimum) }} mm²</dd></div>
                <div><dt>Queda com {{ sec(r.recommended) }} mm²</dt><dd>{{ fmt(r.dropV!, 2) }} V · {{ fmt(r.dropPct!, 2) }}%</dd></div>
                <div><dt>Capacidade do cabo (Iz)</dt><dd>{{ fmt(r.iz!, 1) }} A</dd></div>
                <div><dt>Distância máx. com este cabo</dt><dd>{{ fmt(r.maxLength!, 0) }} m</dd></div>
              </dl>
            } @else {
              <p class="pro-result-main">–</p>
              <p class="pro-result-sub">Corrente de projeto: {{ fmt(r.current, 1) }} A</p>
            }
            @for (message of r.messages; track message) {
              <p class="mt-3 text-sm leading-relaxed opacity-80">{{ message }}</p>
            }
          } @else {
            <p class="pro-result-label">Cabo recomendado</p>
            <p class="pro-result-empty">Informe a {{ mode() === 'power' ? 'potência' : 'corrente' }}, a tensão e a distância para ver o cabo e o disjuntor.</p>
          }
        </aside>
      </div>

      @if (result(); as r) {
        <section class="mt-8 max-w-3xl" aria-labelledby="wg-compare">
          <h2 id="wg-compare" class="text-base font-semibold text-foreground">Comparativo de seções</h2>
          <p class="pro-hint mt-1">
            {{ fmt(r.current, 1) }} A em {{ fmt(lengthValue(), 0) }} m · {{ r.loadedConductors }} condutores carregados
            @if (r.groupingFactor < 1) { · fator de agrupamento {{ fmt(r.groupingFactor, 2) }} }
          </p>
          <div class="pro-table-scroll mt-3">
            <table class="pro-table">
              <thead><tr><th scope="col">Seção</th><th scope="col">Iz</th><th scope="col">Queda</th><th scope="col">Situação</th></tr></thead>
              <tbody>
                @for (row of rows(); track row.section) {
                  <tr [class.on]="row.section === r.recommended">
                    <td>{{ sec(row.section) }} mm²</td>
                    <td>{{ fmt(row.iz, 1) }} A</td>
                    <td>{{ fmt(row.dropPct, 2) }}%</td>
                    <td>
                      @if (row.section === r.recommended) { <span class="pro-pill ok">Indicado</span> }
                      @else if (!row.ampacityOk) { <span class="text-foreground-light">Aquece (Iz &lt; Ib)</span> }
                      @else if (!row.dropOk) { <span class="text-foreground-light">Queda acima de {{ maxDrop() }}%</span> }
                      @else if (row.section < r.byMinimum) { <span class="text-foreground-light">Abaixo do mínimo</span> }
                      @else { <span class="text-foreground-light">Atende (folga)</span> }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      }

      <p class="pro-notice max-w-3xl">
        <strong>Estimativa para conferência.</strong> Considera cabos de cobre ou alumínio com isolação PVC (70 °C),
        temperatura ambiente de 30 °C e o método de instalação escolhido. Não substitui o projeto e a ART/TRT de um
        profissional habilitado, que também verifica DR, DPS, aterramento e a coordenação com o quadro.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Escolha o sistema: 127 V ou 220 V monofásico, 220 V bifásico (fase-fase) ou trifásico.</li>
            <li>Digite a potência do aparelho em watts ou toque em uma carga típica. Se já mediu, troque para <em>Corrente</em>.</li>
            <li>Informe a distância do quadro até a carga, só ida. A calculadora já considera a volta.</li>
            <li>Mantenha 4% de queda para circuitos terminais e ajuste a instalação se o cabo não for embutido.</li>
          </ol>
        </section>

        <section>
          <h2>Como o cabo é dimensionado</h2>
          <p>
            Primeiro vem a <strong>corrente de projeto</strong>: Ib = P ÷ (V × cos φ) em circuitos monofásicos e bifásicos,
            e Ib = P ÷ (√3 × V × cos φ) em trifásicos. Depois a calculadora testa cada seção comercial em três critérios
            e fica com a maior delas:
          </p>
          <ul>
            <li><strong>Capacidade de condução</strong> (tabela 36 da NBR 5410, PVC 70 °C): o cabo precisa conduzir Ib sem
              aquecer, já multiplicado pelo fator de agrupamento quando há outros circuitos no mesmo eletroduto.</li>
            <li><strong>Queda de tensão</strong>: ΔV = 2 × ρ × L × I ÷ S (mono e bifásico) ou √3 × ρ × L × I ÷ S (trifásico),
              com ρ = 0,0172 Ω·mm²/m no cobre e 0,0282 no alumínio.</li>
            <li><strong>Seção mínima</strong>: 1,5 mm² para iluminação e 2,5 mm² para tomadas e força.</li>
          </ul>
          <p>
            Por fim, escolhe o disjuntor padronizado que respeita <strong>Ib ≤ In ≤ Iz</strong>. Se nenhum couber entre
            os dois valores, sobe uma seção.
          </p>
          <h3>Exemplo: chuveiro de 5.500 W em 220 V a 20 m</h3>
          <p>
            Ib = 5.500 ÷ 220 = <strong>25 A</strong>. Em eletroduto embutido, 2,5 mm² conduz 24 A (não serve) e 4 mm²
            conduz 32 A. A queda com 4 mm² é 2 × 0,0172 × 20 × 25 ÷ 4 = 4,3 V, ou <strong>1,95%</strong>, abaixo de 4%.
            Resultado: cabo de <strong>4 mm²</strong> com disjuntor de 25 A (ou 32 A).
          </p>
        </section>

        <section>
          <h2>Capacidade de condução dos cabos de cobre (PVC, 30 °C)</h2>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead>
                <tr><th scope="col">Seção</th><th scope="col">B1 · 2 cond.</th><th scope="col">B1 · 3 cond.</th><th scope="col">C · 2 cond.</th><th scope="col">C · 3 cond.</th></tr>
              </thead>
              <tbody>
                @for (row of referenceTable; track row[0]) {
                  <tr><td>{{ sec(row[0]) }} mm²</td><td>{{ sec(row[1]) }} A</td><td>{{ sec(row[2]) }} A</td><td>{{ sec(row[3]) }} A</td><td>{{ sec(row[4]) }} A</td></tr>
                }
              </tbody>
            </table>
          </div>
          <p class="pro-hint mt-2">Fonte: ABNT NBR 5410:2004, tabela 36. Disjuntores padronizados considerados: {{ breakers }} A.</p>
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
            <li>ABNT NBR 5410:2004 — Instalações elétricas de baixa tensão (tabelas 36, 42 e 45; itens 6.2.6 e 6.2.7).</li>
            <li>IEC 60364-5-52 — Selection and erection of electrical equipment: wiring systems.</li>
            <li>Catálogos técnicos de fabricantes de cabos (Prysmian, Nexans, Cobrecom) para resistividade e capacidade.</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
})
export class WireGaugeCalculatorComponent {
  readonly tool = proTools[0];
  readonly faq = FAQ;
  readonly systems = SYSTEMS;
  readonly loads = LOADS;
  readonly methods = METHODS;
  readonly pfs = [1, 0.92, 0.85, 0.8];
  readonly drops = [2, 4, 5, 7];
  readonly breakers = BREAKERS.join(', ');
  readonly referenceTable: [number, number, number, number, number][] = [
    [1.5, 17.5, 15.5, 19.5, 17.5], [2.5, 24, 21, 27, 24], [4, 32, 28, 36, 32], [6, 41, 36, 46, 41],
    [10, 57, 50, 63, 57], [16, 76, 68, 85, 76], [25, 101, 89, 112, 96], [35, 125, 110, 138, 119],
  ];

  readonly system = signal(DEFAULTS.system);
  readonly customVoltage = signal(DEFAULTS.customVoltage);
  readonly customPhases = signal(DEFAULTS.customPhases);
  readonly mode = signal(DEFAULTS.mode);
  readonly power = signal(DEFAULTS.power);
  readonly current = signal(DEFAULTS.current);
  readonly pf = signal(DEFAULTS.pf);
  readonly kind = signal(DEFAULTS.kind);
  readonly length = signal(DEFAULTS.length);
  readonly maxDrop = signal(DEFAULTS.maxDrop);
  readonly material = signal(DEFAULTS.material);
  readonly method = signal(DEFAULTS.method);
  readonly grouped = signal(DEFAULTS.grouped);

  readonly lengthValue = computed(() => parseNumberBR(this.length()) || 0);
  readonly methodHint = computed(() => METHODS.find((m) => m.id === this.method())?.hint ?? '');

  readonly result = computed(() => {
    const system = SYSTEMS.find((s) => s.id === this.system()) ?? SYSTEMS[1];
    const custom = system.id === 'custom';
    return sizeCable({
      phases: custom ? this.customPhases() : system.phases,
      voltage: custom ? parseNumberBR(this.customVoltage()) : system.voltage,
      mode: this.mode(),
      power: parseNumberBR(this.power()),
      current: parseNumberBR(this.current()),
      powerFactor: this.pf(),
      length: this.lengthValue(),
      maxDropPct: this.maxDrop(),
      material: this.material(),
      method: this.method(),
      grouped: this.grouped(),
      kind: this.kind(),
    });
  });

  readonly rows = computed(() => {
    const r = this.result();
    return r ? comparisonRows(r) : [];
  });

  private readonly restored = signal(false);

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
    return value.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  sec(section: number): string {
    return section.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
  }

  isLoad(load: (typeof LOADS)[number]): boolean {
    return parseNumberBR(this.power()) === load.watts && this.pf() === load.pf && this.kind() === load.kind;
  }

  pickLoad(load: (typeof LOADS)[number]): void {
    this.power.set(String(load.watts));
    this.pf.set(load.pf);
    this.kind.set(load.kind);
  }

  clear(): void {
    this.apply({ ...DEFAULTS, power: '', current: '', length: '' });
    (document.getElementById('wg-load') as HTMLInputElement | null)?.focus();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  private snapshot(): State {
    return {
      system: this.system(),
      customVoltage: this.customVoltage(),
      customPhases: this.customPhases(),
      mode: this.mode(),
      power: this.power(),
      current: this.current(),
      pf: this.pf(),
      kind: this.kind(),
      length: this.length(),
      maxDrop: this.maxDrop(),
      material: this.material(),
      method: this.method(),
      grouped: this.grouped(),
    };
  }

  private apply(state: State): void {
    this.system.set(state.system);
    this.customVoltage.set(state.customVoltage);
    this.customPhases.set(state.customPhases);
    this.mode.set(state.mode);
    this.power.set(state.power);
    this.current.set(state.current);
    this.pf.set(state.pf);
    this.kind.set(state.kind);
    this.length.set(state.length);
    this.maxDrop.set(state.maxDrop);
    this.material.set(state.material);
    this.method.set(state.method);
    this.grouped.set(state.grouped);
  }
}
