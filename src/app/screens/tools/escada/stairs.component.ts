import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import { CRITERIA, Criterion, HEADROOM, StairPlan, planStair } from './stairs.logic';

const DEFAULTS = {
  rise: '288',
  space: '',
  criterion: 'private' as Criterion,
  slab: '12',
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:escada';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular quantos degraus uma escada precisa?',
    answer:
      'Divida a altura de piso a piso pela altura de espelho desejada (perto de 17 cm) e arredonde: 288 cm ÷ 17 ≈ 17 espelhos de 16,9 cm. A escada reta tem um piso a menos que espelhos, porque o último degrau é o próprio andar de cima: 16 pisos.',
  },
  {
    question: 'O que é a fórmula de Blondel?',
    answer:
      'É a relação entre o passo humano e o degrau: duas alturas de espelho mais um piso devem ficar perto de 63 a 64 cm (2e + p). A NBR 9050 aceita de 63 a 65 cm e a NBR 9077, de 63 a 64 cm. Fora dessa faixa, a escada cansa ou faz tropeçar.',
  },
  {
    question: 'Qual a altura máxima do degrau?',
    answer:
      'Em escadas de uso comum ou acessíveis (NBR 9050) e em saídas de emergência (NBR 9077), o espelho fica entre 16 e 18 cm, e o piso entre 28 e 32 cm. Em escadas privativas de casa, muitos códigos de obras aceitam até 19 cm de espelho e 25 cm de piso: confira o do seu município.',
  },
  {
    question: 'Quando a escada precisa de patamar?',
    answer:
      'Pela NBR 9050, a cada 3,20 m de altura vencida e sempre que a escada muda de direção, com pelo menos 1,20 m de comprimento. Pela NBR 9077, o lance máximo é de 3,70 m. A calculadora divide os degraus em lances iguais e soma o patamar ao comprimento.',
  },
  {
    question: 'Qual o tamanho do vão na laje para a escada?',
    answer:
      'O vão precisa deixar 2,10 m livres entre a linha dos degraus e a laje de cima. Para isso, o comprimento do vão é (2,10 m + espessura da laje) × piso ÷ espelho, medido a partir do último degrau. Com espelho de 17 cm, piso de 29 cm e laje de 12 cm, são cerca de 3,8 m.',
  },
];

@Component({
  selector: 'app-stairs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .crit { display: grid; gap: .35rem; }
    .crit button { display: grid; gap: .1rem; min-height: 56px; padding: .55rem .8rem; border: 1px solid rgb(68 74 81 / .15); border-radius: .8rem; text-align: left; }
    .crit button[aria-pressed=true] { border-color: currentColor; box-shadow: inset 0 0 0 1px currentColor; }
    .crit span { font-size: .78rem; opacity: .75; }
    .profile { width: 100%; height: auto; margin-top: 1rem; }
    .pro-table th, .pro-table td { white-space: nowrap; }
    tr.best td { font-weight: 650; }
    tr.off td { opacity: .5; }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Quantos degraus a escada leva e de que tamanho? Informe a altura de piso a piso e, se quiser, o espaço que você
          tem: a calculadora acha o espelho e o piso pela fórmula de Blondel, dentro da NBR 9050 ou da NBR 9077.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (best(); as b) {
              <span>{{ b.risers }} espelhos de {{ fmt(b.riser, 1) }} cm</span><strong>piso {{ fmt(b.tread, 1) }} cm</strong>
            } @else {
              <span>Informe a altura</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <label class="pro-label" for="es-rise">Altura a vencer <small>piso a piso, acabado</small></label>
              <div class="min-w-0">
                <div class="pro-input-wrap">
                  <input id="es-rise" class="pro-input" inputmode="decimal" autocomplete="off" [value]="rise()" (input)="rise.set(val($event))" />
                  <span class="pro-suffix">cm</span>
                </div>
                <div class="pro-chips mt-2" role="group" aria-label="Alturas comuns">
                  @for (h of riseChips; track h) {
                    <button type="button" class="pro-chip" [attr.aria-pressed]="riseValue() === h" (click)="rise.set(h + '')">{{ fmt(h / 100, 2) }} m</button>
                  }
                </div>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="es-space">Espaço disponível <small>opcional</small></label>
              <div class="min-w-0">
                <div class="pro-input-wrap">
                  <input id="es-space" class="pro-input" inputmode="decimal" autocomplete="off" placeholder="sem limite" [value]="space()" (input)="space.set(val($event))" />
                  <span class="pro-suffix">cm</span>
                </div>
                <p class="pro-hint mt-1.5">Comprimento em planta para os degraus de uma escada reta.</p>
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="es-crit">Critério</span>
              <div class="crit" role="group" aria-labelledby="es-crit">
                @for (c of criteria; track c.id) {
                  <button type="button" [attr.aria-pressed]="criterion() === c.id" (click)="criterion.set(c.id)">
                    <b>{{ c.name }}</b>
                    <span>Espelho {{ c.riserMin }}–{{ c.riserMax }} cm · piso {{ c.treadMin }}–{{ c.treadMax }} cm · {{ c.blondelMin }} ≤ 2e + p ≤ {{ c.blondelMax }}</span>
                  </button>
                }
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="es-slab">Laje de cima <small>com contrapiso</small></label>
              <div class="flex items-center gap-3">
                <div class="pro-input-wrap w-28 shrink-0">
                  <input id="es-slab" class="pro-input" inputmode="decimal" autocomplete="off" [value]="slab()" (input)="slab.set(val($event))" />
                  <span class="pro-suffix">cm</span>
                </div>
                <span class="pro-hint">Para o vão que deixa {{ fmt(headroom / 100, 2) }} m livres sobre os degraus.</span>
              </div>
            </div>
          </div>

          @if (best(); as b) {
            <svg class="profile" [attr.viewBox]="profile().viewBox" role="img" [attr.aria-label]="'Corte da escada: ' + b.risers + ' espelhos de ' + fmt(b.riser, 1) + ' cm e ' + b.treads + ' pisos de ' + fmt(b.tread, 1) + ' cm'">
              <path [attr.d]="profile().fill" fill="rgb(122 112 225 / .14)" />
              <path [attr.d]="profile().line" fill="none" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke" class="text-surface-0-foreground" />
              @for (r of profile().slabs; track r.x) {
                <rect [attr.x]="r.x" y="0" [attr.width]="r.width" [attr.height]="profile().slab" fill="rgb(68 74 81 / .28)" />
              }
            </svg>
            <p class="pro-hint">Corte da escada reta, em escala. Em cinza, a laje de cima com o vão de {{ fmt(b.opening / 100, 2) }} m.</p>
          }

          <div class="mt-2 flex justify-end">
            <button type="button" class="pro-btn ghost !min-h-[40px] !px-3 text-sm" (click)="clear()">
              <ng-icon name="tablerEraser" aria-hidden="true" /> Limpar
            </button>
          </div>
        </div>

        <aside class="pro-result" aria-live="polite" aria-label="Resultado">
          <p class="pro-result-label">Degraus</p>
          @if (best(); as b) {
            <p class="pro-result-main">{{ b.risers }}<small>espelhos de {{ fmt(b.riser, 1) }} cm</small></p>
            <p class="pro-result-sub">{{ b.treads }} pisos de {{ fmt(b.tread, 1) }} cm · 2e + p = {{ fmt(b.blondel, 1) }} cm</p>
            <dl class="pro-result-list">
              <div><dt>Comprimento dos degraus</dt><dd>{{ fmt(b.run / 100, 2) }} m</dd></div>
              @if (b.flights > 1) {
                <div><dt>Lances</dt><dd>{{ flightsLabel(b) }}</dd></div>
                <div><dt>Patamar</dt><dd>≥ {{ fmt(b.landing / 100, 2) }} m</dd></div>
                <div><dt>Comprimento total (reta)</dt><dd>{{ fmt(b.totalRun / 100, 2) }} m</dd></div>
              }
              <div><dt>Inclinação</dt><dd>{{ fmt(b.slopeDeg, 1) }}°</dd></div>
              <div><dt>Vão na laje</dt><dd>{{ fmt(b.opening / 100, 2) }} m</dd></div>
            </dl>
            @if (b.fitted) {
              <p class="mt-3 text-sm opacity-80">Piso reduzido para caber nos {{ fmt(spaceValue() / 100, 2) }} m disponíveis.</p>
            }
            @if (spaceValue() > 0 && b.totalRun > spaceValue() + 0.001) {
              <p class="mt-3 text-sm opacity-80">Com o patamar, a escada reta passa do espaço: faça em L ou em U, com o patamar na virada.</p>
            }
            <button type="button" class="pro-btn mt-4 w-full" (click)="copy()">
              <ng-icon [name]="flag.copied() ? 'tablerCheck' : 'tablerCopy'" aria-hidden="true" />
              {{ flag.copied() ? 'Medidas copiadas!' : 'Copiar medidas da escada' }}
            </button>
          } @else if (riseValue() > 0 && plan().options.length) {
            <p class="pro-result-empty">
              Não cabe em {{ fmt(spaceValue() / 100, 2) }} m com este critério: a escada reta precisa de pelo menos
              {{ fmt(plan().shortestRun / 100, 2) }} m. Considere escada em L, em U ou outro critério.
            </p>
          } @else {
            <p class="pro-result-empty">Informe a altura de piso a piso em centímetros.</p>
          }
        </aside>
      </div>

      @if (plan().options.length > 1) {
        <section class="mt-8 max-w-3xl" aria-labelledby="es-options">
          <h2 id="es-options" class="text-base font-semibold text-surface-0-foreground">Outras combinações para {{ fmt(riseValue() / 100, 2) }} m</h2>
          <div class="pro-table-scroll mt-2">
            <table class="pro-table">
              <thead><tr><th scope="col">Espelhos</th><th scope="col">Espelho</th><th scope="col">Piso</th><th scope="col">2e + p</th><th scope="col">Degraus</th><th scope="col">Inclinação</th></tr></thead>
              <tbody>
                @for (o of plan().options; track o.risers) {
                  <tr [class.best]="o.risers === best()?.risers" [class.off]="!o.fits">
                    <td>{{ o.risers }}</td><td>{{ fmt(o.riser, 1) }} cm</td><td>{{ fmt(o.tread, 1) }} cm</td><td>{{ fmt(o.blondel, 1) }}</td><td>{{ fmt(o.run / 100, 2) }} m</td><td>{{ fmt(o.slopeDeg, 1) }}°</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </section>
      }

      <p class="pro-notice max-w-3xl">
        <strong>Pré-dimensionamento de escada reta.</strong> Meça a altura com o piso acabado dos dois andares. Mantenha
        todos os espelhos iguais (diferença máxima de 0,5 cm), prefira corrimão dos dois lados (a NBR 9050 pede alturas de
        0,92 m e 0,70 m) e siga o código de obras da cidade e o projeto estrutural da laje.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Meça a altura de piso acabado a piso acabado, em centímetros.</li>
            <li>Se o espaço for apertado, informe o comprimento disponível em planta.</li>
            <li>Escolha o critério: NBR 9050 para áreas comuns e acessíveis, NBR 9077 para saídas de emergência, ou residencial privativa.</li>
            <li>Confira os degraus, o vão na laje e a tabela com as outras combinações possíveis.</li>
          </ol>
        </section>

        <section>
          <h2>Como o cálculo é feito</h2>
          <ul>
            <li><strong>Espelho</strong> = altura ÷ número de espelhos, dentro dos limites do critério;</li>
            <li><strong>Piso</strong>: o mais perto do centro da faixa de Blondel (2e + p), dentro dos limites do critério;</li>
            <li><strong>Degraus</strong>: a escada reta tem um piso a menos que espelhos;</li>
            <li><strong>Escolha</strong>: o espelho mais perto de {{ fmt(rule().idealRiser, 1) }} cm que cabe no espaço;</li>
            <li><strong>Vão na laje</strong> = ({{ fmt(headroom) }} + laje) × piso ÷ espelho.</li>
          </ul>
          <h3>Exemplo: pé-direito de 2,88 m</h3>
          <p>
            288 ÷ 17 = 16,9 cm de espelho. Pela NBR 9050, 2 × 16,9 + p = 64 → piso de 30,1 cm. São
            <strong>17 espelhos e 16 pisos</strong>, e os degraus ocupam 16 × 30,1 = <strong>4,82 m</strong>.
          </p>
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
            <li>ABNT NBR 9050:2020 — Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos (escadas, degraus, patamares e corrimãos).</li>
            <li>ABNT NBR 9077 — Saídas de emergência em edifícios (dimensionamento de degraus e patamares).</li>
            <li>Instruções técnicas de saídas de emergência dos corpos de bombeiros estaduais.</li>
            <li>Códigos de obras municipais, para escadas privativas de residências.</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
})
export class StairsCalculatorComponent {
  readonly tool = proTools[8];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly criteria = Object.values(CRITERIA);
  readonly riseChips = [270, 280, 288, 300, 320];
  readonly headroom = HEADROOM;
  readonly flag = copiedFlag();

  readonly rise = signal(DEFAULTS.rise);
  readonly space = signal(DEFAULTS.space);
  readonly criterion = signal<Criterion>(DEFAULTS.criterion);
  readonly slab = signal(DEFAULTS.slab);

  readonly riseValue = computed(() => Math.max(0, num(this.rise())));
  readonly spaceValue = computed(() => Math.max(0, num(this.space())));
  readonly rule = computed(() => CRITERIA[this.criterion()]);
  readonly plan = computed(() =>
    planStair({ rise: this.riseValue(), space: this.spaceValue(), criterion: this.criterion(), slab: num(this.slab()) }),
  );
  readonly best = computed(() => this.plan().best);

  /** Side view in cm (y grows downwards: lower floor at `rise`, upper floor at 0), landings drawn flat. */
  readonly profile = computed(() => {
    const b = this.best();
    const empty = { viewBox: '0 0 1 1', line: '', fill: '', slabs: [] as { x: number; width: number }[], slab: 0 };
    if (!b) return empty;
    const rise = this.riseValue();
    const slab = Math.max(0, num(this.slab()));
    const margin = 10;
    let x = 0;
    let y = rise;
    const points: [number, number][] = [[x, y]];
    b.risersPerFlight.forEach((count, flight) => {
      for (let i = 0; i < count; i++) {
        y -= b.riser;
        points.push([x, y]);
        const last = flight === b.risersPerFlight.length - 1 && i === count - 1;
        if (!last) {
          x += i === count - 1 ? b.landing : b.tread;
          points.push([x, y]);
        }
      }
    });
    const end = x + 80;
    points.push([end, 0]);
    const line = points.map(([px, py], i) => `${i ? 'L' : 'M'}${fmtSvg(px)} ${fmtSvg(py)}`).join(' ');
    const fill = `${line} L${fmtSvg(end)} ${fmtSvg(rise)} Z`;
    // The upper slab covers the first steps up to the opening, and the upper floor after the last step.
    const slabs = [{ x, width: end - x }];
    const before = x - b.opening;
    if (before > 0.5) slabs.unshift({ x: 0, width: before });
    return {
      viewBox: `${-margin} ${-margin} ${fmtSvg(end + 2 * margin)} ${fmtSvg(rise + 2 * margin)}`,
      line,
      fill,
      slabs: slab > 0 ? slabs.map((r) => ({ x: Number(fmtSvg(r.x)), width: Number(fmtSvg(r.width)) })) : [],
      slab,
    };
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
  }

  val = inputValue;

  flightsLabel(plan: StairPlan): string {
    return `${plan.flights} (${plan.risersPerFlight.join(' + ')} espelhos)`;
  }

  summaryText(): string {
    const b = this.best();
    if (!b) return '';
    const lines = [
      '*Escada reta*',
      `Altura de piso a piso: ${fmt(this.riseValue(), 1)} cm (${this.rule().short})`,
      '',
      `• ${b.risers} espelhos de ${fmt(b.riser, 1)} cm`,
      `• ${b.treads} pisos de ${fmt(b.tread, 1)} cm (2e + p = ${fmt(b.blondel, 1)} cm)`,
      `• Degraus: ${fmt(b.run / 100, 2)} m em planta, inclinação de ${fmt(b.slopeDeg, 1)}°`,
    ];
    if (b.flights > 1) {
      lines.push(`• ${this.flightsLabel(b)}, patamar ≥ ${fmt(b.landing / 100, 2)} m, total ${fmt(b.totalRun / 100, 2)} m`);
    }
    lines.push(`• Vão na laje: ${fmt(b.opening / 100, 2)} m para ${fmt(HEADROOM / 100, 2)} m livres`);
    return lines.join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, rise: '', space: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('es-rise')?.focus();
  }

  private snapshot(): State {
    return { rise: this.rise(), space: this.space(), criterion: this.criterion(), slab: this.slab() };
  }

  private apply(state: State): void {
    this.rise.set(state.rise);
    this.space.set(state.space);
    this.criterion.set(state.criterion in CRITERIA ? state.criterion : DEFAULTS.criterion);
    this.slab.set(state.slab);
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}

function fmtSvg(value: number): string {
  return String(Math.round(value * 10) / 10);
}
