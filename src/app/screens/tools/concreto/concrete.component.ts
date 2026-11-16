import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  AIR_LITRES,
  EXPOSURE_CLASSES,
  Exposure,
  MATERIALS,
  MIX_PRESETS,
  Mix,
  SAND_SWELLING,
  Shape,
  concreteMaterials,
  durability,
  elementVolume,
} from './concrete.logic';

const SHAPES: { id: Shape; label: string; fields: [string, string, string] }[] = [
  { id: 'slab', label: 'Laje / piso', fields: ['Comprimento', 'Largura', 'Espessura'] },
  { id: 'beam', label: 'Viga / pilar', fields: ['Comprimento', 'Largura', 'Altura'] },
  { id: 'footing', label: 'Sapata', fields: ['Comprimento', 'Largura', 'Altura'] },
  { id: 'pile', label: 'Broca / estaca', fields: ['Diâmetro', '', 'Profundidade'] },
];
const CUSTOM = 'custom';

const DEFAULTS = {
  byVolume: false,
  volume: '1',
  shape: 'slab' as Shape,
  length: '4',
  width: '3',
  depth: '0,1',
  diameter: '0,25',
  count: 1,
  mix: MIX_PRESETS[0].id,
  sand: '2',
  gravel: '3',
  waterCement: '0,55',
  moist: true,
  waste: '5',
  exposure: 2 as Exposure,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:concreto';

const FAQ: FaqItem[] = [
  {
    question: 'Quantos sacos de cimento vão em 1 m³ de concreto?',
    answer:
      'No traço 1 : 2 : 3 (cimento : areia : brita, em volume) com fator água/cimento 0,55, cerca de 7 sacos de 50 kg por m³, ou 340 a 370 kg de cimento conforme a umidade da areia. Traços mais magros, como o 1 : 4 : 8 de lastro, ficam perto de 3 a 4 sacos.',
  },
  {
    question: 'Qual o traço de concreto para laje?',
    answer:
      'Feito em obra, o usual é 1 : 2 : 3, que em latas de 18 L dá 1 saco de cimento, 4 latas de areia, 6 latas de brita e cerca de 1½ lata de água. A NBR 6118 pede pelo menos C25 em área urbana: para garantir essa resistência, prefira concreto usinado ou dosado em laboratório.',
  },
  {
    question: 'Como calcular o volume de concreto de uma laje?',
    answer:
      'Multiplique comprimento × largura × espessura, tudo em metros. Uma laje maciça de 4 × 3 m com 10 cm de espessura tem 4 × 3 × 0,10 = 1,2 m³. Acrescente de 5% a 10% de perda para o que fica na betoneira, nas formas e no transporte.',
  },
  {
    question: 'Por que a areia úmida muda o traço?',
    answer:
      'A areia úmida incha: a mesma massa de areia ocupa cerca de 25% mais volume. Medindo em latas, entra menos areia de verdade e o concreto fica mais rico em cimento. A calculadora corrige isso quando você marca areia úmida.',
  },
  {
    question: 'Posso colocar mais água para o concreto ficar mais mole?',
    answer:
      'Não. Água a mais aumenta o fator água/cimento, reduz a resistência e a durabilidade e aumenta as fissuras. A NBR 6118 limita o fator a/c a 0,60 em área urbana (classe II) e a 0,55 perto do mar ou de indústrias.',
  },
];

@Component({
  selector: 'app-concrete',
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
    .mix { display: grid; gap: .35rem; }
    @media (min-width: 480px) { .mix { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    .mix button { display: grid; gap: .1rem; min-height: 56px; padding: .55rem .8rem; border: 1px solid rgb(68 74 81 / .15); border-radius: .8rem; text-align: left; }
    .mix button[aria-pressed=true] { border-color: currentColor; box-shadow: inset 0 0 0 1px currentColor; }
    .mix b { font-variant-numeric: tabular-nums; }
    .mix span { font-size: .78rem; opacity: .75; }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Quanto concreto a peça leva e quanto material comprar? Informe as medidas e o traço: a calculadora dá os sacos
          de cimento, a areia, a brita e a água, em m³ e em latas por betonada, e confere o traço com a NBR 6118.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (materials(); as m) {
              <span>{{ fmt(m.volume, 2) }} m³ →</span><strong>{{ fmt(ceil(m.bags)) }} sacos</strong>
            } @else {
              <span>Informe as medidas</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <div class="flex items-center justify-between gap-3 sm:block">
                <span class="pro-label">Volume</span>
                <div class="pro-segmented w-44 sm:mt-2 sm:w-full" role="group" aria-label="Informar volume por">
                  <button type="button" [attr.aria-pressed]="!byVolume()" (click)="byVolume.set(false)">Medidas</button>
                  <button type="button" [attr.aria-pressed]="byVolume()" (click)="byVolume.set(true)">m³</button>
                </div>
              </div>
              <div class="min-w-0">
                @if (byVolume()) {
                  <div class="pro-input-wrap">
                    <input id="ct-first" class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Volume em metros cúbicos" [value]="volume()" (input)="volume.set(val($event))" />
                    <span class="pro-suffix">m³</span>
                  </div>
                } @else {
                  <div class="pro-segmented" role="group" aria-label="Peça">
                    @for (s of shapes; track s.id) {
                      <button type="button" [attr.aria-pressed]="shape() === s.id" (click)="shape.set(s.id)">{{ s.label }}</button>
                    }
                  </div>
                  <div class="mt-3 grid gap-2" [class.grid-cols-3]="shape() !== 'pile'" [class.grid-cols-2]="shape() === 'pile'">
                    @if (shape() === 'pile') {
                      <label class="pro-field"><span class="pro-hint">Diâmetro</span>
                        <span class="pro-input-wrap"><input id="ct-first" class="pro-input" inputmode="decimal" autocomplete="off" [value]="diameter()" (input)="diameter.set(val($event))" /><span class="pro-suffix">m</span></span>
                      </label>
                    } @else {
                      <label class="pro-field"><span class="pro-hint">{{ fields()[0] }}</span>
                        <span class="pro-input-wrap"><input id="ct-first" class="pro-input" inputmode="decimal" autocomplete="off" [value]="length()" (input)="length.set(val($event))" /><span class="pro-suffix">m</span></span>
                      </label>
                      <label class="pro-field"><span class="pro-hint">{{ fields()[1] }}</span>
                        <span class="pro-input-wrap"><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="width()" (input)="width.set(val($event))" /><span class="pro-suffix">m</span></span>
                      </label>
                    }
                    <label class="pro-field"><span class="pro-hint">{{ fields()[2] }}</span>
                      <span class="pro-input-wrap"><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="depth()" (input)="depth.set(val($event))" /><span class="pro-suffix">m</span></span>
                    </label>
                  </div>
                  <div class="mt-3 flex items-center gap-3">
                    <span class="text-sm text-foreground-light" id="ct-count">Quantidade</span>
                    <div class="step" role="group" aria-labelledby="ct-count">
                      <button type="button" aria-label="Uma peça a menos" [disabled]="count() <= 1" (click)="count.set(clamp(count() - 1))"><ng-icon name="tablerMinus" /></button>
                      <output aria-live="polite">{{ count() }}</output>
                      <button type="button" aria-label="Uma peça a mais" (click)="count.set(clamp(count() + 1))"><ng-icon name="tablerPlus" /></button>
                    </div>
                    @if (volumeValue() > 0) {
                      <span class="pro-hint">= {{ fmt(volumeValue(), 3) }} m³</span>
                    }
                  </div>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label">Traço <small>cimento : areia : brita</small></span>
              <div class="min-w-0">
                <div class="mix" role="group" aria-label="Traço em volume">
                  @for (p of presets; track p.id) {
                    <button type="button" [attr.aria-pressed]="mix() === p.id" (click)="mix.set(p.id)"><b>{{ p.label }}</b><span>{{ p.use }}</span></button>
                  }
                </div>
                <button type="button" class="pro-chip mt-2" [attr.aria-pressed]="mix() === custom" (click)="mix.set(custom)">Outro traço</button>
                @if (mix() === custom) {
                  <div class="mt-2 grid grid-cols-3 gap-2">
                    <label class="pro-field"><span class="pro-hint">Areia</span><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="sand()" (input)="sand.set(val($event))" /></label>
                    <label class="pro-field"><span class="pro-hint">Brita</span><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="gravel()" (input)="gravel.set(val($event))" /></label>
                    <label class="pro-field"><span class="pro-hint">Água/cimento</span><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="waterCement()" (input)="waterCement.set(val($event))" /></label>
                  </div>
                } @else {
                  <p class="pro-hint mt-1.5">Fator água/cimento {{ fmt(mixValue().waterCement, 2) }}</p>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="ct-sand">Areia</span>
              <div class="pro-segmented" role="group" aria-labelledby="ct-sand">
                <button type="button" [attr.aria-pressed]="moist()" (click)="moist.set(true)">Úmida (de obra)</button>
                <button type="button" [attr.aria-pressed]="!moist()" (click)="moist.set(false)">Seca</button>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="ct-waste">Perda</label>
              <div class="flex flex-wrap items-center gap-2">
                <div class="pro-input-wrap w-28 shrink-0">
                  <input id="ct-waste" class="pro-input" inputmode="decimal" autocomplete="off" [value]="waste()" (input)="waste.set(val($event))" />
                  <span class="pro-suffix">%</span>
                </div>
                <div class="pro-chips" role="group" aria-label="Perdas comuns">
                  @for (w of wasteChips; track w) {
                    <button type="button" class="pro-chip" [attr.aria-pressed]="wasteValue() === w" (click)="waste.set(w + '')">{{ w }}%</button>
                  }
                </div>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="ct-exposure">Ambiente <small>NBR 6118</small></label>
              <select id="ct-exposure" class="pro-select" (change)="setExposure(val($event))">
                @for (e of exposures; track e.id) {
                  <option [value]="e.id" [selected]="exposure() === e.id">{{ e.name }} · {{ e.environment }}</option>
                }
              </select>
            </div>
          </div>

          <div class="mt-2 flex justify-end">
            <button type="button" class="pro-btn ghost !min-h-[40px] !px-3 text-sm" (click)="clear()">
              <ng-icon name="tablerEraser" aria-hidden="true" /> Limpar
            </button>
          </div>
        </div>

        <aside class="pro-result" aria-live="polite" aria-label="Resultado">
          <p class="pro-result-label">Cimento</p>
          @if (materials(); as m) {
            <p class="pro-result-main">{{ fmt(ceil(m.bags)) }}<small>{{ ceil(m.bags) === 1 ? 'saco' : 'sacos' }} de 50 kg</small></p>
            <p class="pro-result-sub">{{ fmt(m.volume, 2) }} m³ de concreto com {{ fmt(wasteValue(), 1) }}% de perda · {{ fmt(m.cementPerM3) }} kg/m³</p>
            <dl class="pro-result-list">
              <div><dt>Areia média</dt><dd>{{ fmt(m.sandM3, 2) }} m³ <span class="font-normal opacity-70">({{ fmt(ceil(m.sandCans)) }} latas)</span></dd></div>
              <div><dt>Brita 1</dt><dd>{{ fmt(m.gravelM3, 2) }} m³ <span class="font-normal opacity-70">({{ fmt(ceil(m.gravelCans)) }} latas)</span></dd></div>
              <div><dt>Água</dt><dd>{{ fmt(m.waterLitres) }} L</dd></div>
            </dl>
            <p class="mt-4 text-xs font-semibold uppercase tracking-wider opacity-70">Por saco de cimento</p>
            <p class="mt-1 text-sm leading-relaxed">
              {{ fmt(m.perBag.sandCans, 1) }} latas de areia + {{ fmt(m.perBag.gravelCans, 1) }} latas de brita + {{ fmt(m.perBag.waterLitres) }} L de água
              → {{ fmt(m.yieldPerBag * 1000) }} L de concreto
            </p>
            @if (check(); as c) {
              <div class="mt-4 flex flex-wrap gap-2">
                <span class="pro-pill" [class.ok]="c.waterOk" [class.bad]="!c.waterOk">a/c {{ fmt(mixValue().waterCement, 2) }} {{ c.waterOk ? '≤' : '>' }} {{ fmt(c.exposure.maxWaterCement, 2) }}</span>
                <span class="pro-pill" [class.ok]="c.cementOk" [class.bad]="!c.cementOk">{{ fmt(m.cementPerM3) }} {{ c.cementOk ? '≥' : '<' }} {{ c.exposure.minCement }} kg/m³</span>
              </div>
              <p class="mt-2 text-sm opacity-80">
                Classe {{ c.exposure.name.split(' ')[0] }} pede concreto armado C{{ c.exposure.minClass }} ou mais.
                @if (!c.waterOk || !c.cementOk) { Este traço não atende a estrutura: use para peças sem armadura ou ajuste. }
              </p>
            }
            <button type="button" class="pro-btn mt-4 w-full" (click)="copy()">
              <ng-icon [name]="flag.copied() ? 'tablerCheck' : 'tablerCopy'" aria-hidden="true" />
              {{ flag.copied() ? 'Lista copiada!' : 'Copiar lista de material' }}
            </button>
          } @else {
            <p class="pro-result-empty">Informe as medidas da peça ou o volume em m³ e um traço válido.</p>
          }
        </aside>
      </div>

      <p class="pro-notice max-w-3xl">
        <strong>Traço de obra, medido em latas.</strong> A conversão usa massas unitárias típicas (cimento
        {{ fmt(m.cement.delta, 2) }}, areia {{ fmt(m.sand.delta, 2) }} e brita {{ fmt(m.gravel.delta, 2) }} kg/L),
        inchamento de {{ fmt((swelling - 1) * 100) }}% na areia úmida e {{ air }} L de ar por m³. A resistência real
        depende dos materiais e da cura: estruturas pedem projeto, concreto usinado ou dosagem em laboratório
        (NBR 12655) e ensaio de corpos de prova.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Escolha a peça (laje, viga ou pilar, sapata ou broca) e digite as medidas em metros, ou informe o volume direto em m³.</li>
            <li>Toque no traço indicado para o uso. Para um traço do projeto, use <em>Outro traço</em>.</li>
            <li>Marque se a areia está úmida (o normal na obra) ou seca e ajuste a perda.</li>
            <li>Escolha o ambiente da obra para conferir o traço com a NBR 6118 e copie a lista de material.</li>
          </ol>
        </section>

        <section>
          <h2>Como o cálculo é feito</h2>
          <p>O traço em volume (latas) é convertido para massa pelas massas unitárias, e o consumo de cimento sai da fórmula do volume absoluto:</p>
          <p><strong>C = (1000 − ar) ÷ (1/γc + a/γa + p/γp + a/c)</strong></p>
          <ul>
            <li><strong>C</strong>: kg de cimento por m³ de concreto;</li>
            <li><strong>a</strong> e <strong>p</strong>: kg de areia e de brita por kg de cimento;</li>
            <li><strong>γ</strong>: massas específicas (cimento {{ fmt(m.cement.gamma, 2) }}, areia {{ fmt(m.sand.gamma, 2) }}, brita {{ fmt(m.gravel.gamma, 2) }} kg/dm³);</li>
            <li><strong>a/c</strong>: fator água/cimento, em massa.</li>
          </ul>
          <h3>Exemplo: laje de 4 × 3 m com 10 cm, traço 1 : 2 : 3</h3>
          <p>
            Volume: 4 × 3 × 0,10 = 1,2 m³, e com 5% de perda, 1,26 m³. Com areia seca, o traço consome cerca de 344 kg de
            cimento por m³, ou <strong>9 sacos</strong>. Em cada betonada: 1 saco, 4 latas de areia, 6 latas de brita e
            27,5 L de água.
          </p>
        </section>

        <section>
          <h2>Limites da NBR 6118 para concreto armado</h2>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead><tr><th scope="col">Classe</th><th scope="col">Ambiente</th><th scope="col">a/c máx.</th><th scope="col">Concreto</th><th scope="col">Cimento mín.</th></tr></thead>
              <tbody>
                @for (e of exposures; track e.id) {
                  <tr><td>{{ e.name }}</td><td>{{ e.environment }}</td><td>{{ fmt(e.maxWaterCement, 2) }}</td><td>≥ C{{ e.minClass }}</td><td>{{ e.minCement }} kg/m³</td></tr>
                }
              </tbody>
            </table>
          </div>
          <p class="pro-hint mt-2">Tabela 7.1 da NBR 6118 e consumo mínimo de cimento da NBR 12655.</p>
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
            <li>ABNT NBR 6118:2023 — Projeto de estruturas de concreto (classes de agressividade, tabela 7.1).</li>
            <li>ABNT NBR 12655:2022 — Concreto de cimento Portland: preparo, controle, recebimento e aceitação.</li>
            <li>ABNT NBR 6467 — Agregados: determinação do inchamento de agregado miúdo.</li>
            <li>ABCP — Guia básico de utilização do cimento Portland e traços para obras de pequeno porte.</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
})
export class ConcreteCalculatorComponent {
  readonly tool = proTools[6];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly custom = CUSTOM;
  readonly shapes = SHAPES;
  readonly presets = MIX_PRESETS;
  readonly exposures = EXPOSURE_CLASSES;
  readonly wasteChips = [5, 10];
  readonly m = MATERIALS;
  readonly swelling = SAND_SWELLING;
  readonly air = AIR_LITRES;
  readonly flag = copiedFlag();

  readonly byVolume = signal(DEFAULTS.byVolume);
  readonly volume = signal(DEFAULTS.volume);
  readonly shape = signal(DEFAULTS.shape);
  readonly length = signal(DEFAULTS.length);
  readonly width = signal(DEFAULTS.width);
  readonly depth = signal(DEFAULTS.depth);
  readonly diameter = signal(DEFAULTS.diameter);
  readonly count = signal(DEFAULTS.count);
  readonly mix = signal(DEFAULTS.mix);
  readonly sand = signal(DEFAULTS.sand);
  readonly gravel = signal(DEFAULTS.gravel);
  readonly waterCement = signal(DEFAULTS.waterCement);
  readonly moist = signal(DEFAULTS.moist);
  readonly waste = signal(DEFAULTS.waste);
  readonly exposure = signal<Exposure>(DEFAULTS.exposure);

  readonly fields = computed(() => SHAPES.find((s) => s.id === this.shape())?.fields ?? SHAPES[0].fields);
  readonly wasteValue = computed(() => num(this.waste()));
  readonly volumeValue = computed(() =>
    this.byVolume()
      ? Math.max(0, num(this.volume()))
      : elementVolume({
          shape: this.shape(),
          length: num(this.length()),
          width: num(this.width()),
          depth: num(this.depth()),
          diameter: num(this.diameter()),
          count: this.count(),
        }),
  );
  readonly mixValue = computed<Mix>(() => {
    if (this.mix() === CUSTOM) return { sand: num(this.sand()), gravel: num(this.gravel()), waterCement: num(this.waterCement()) };
    return MIX_PRESETS.find((p) => p.id === this.mix()) ?? MIX_PRESETS[0];
  });
  readonly materials = computed(() => concreteMaterials(this.volumeValue(), this.mixValue(), this.moist(), this.wasteValue()));
  readonly check = computed(() => {
    const m = this.materials();
    return m ? durability(this.mixValue(), m.cementPerM3, this.exposure()) : null;
  });

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
  }

  val = inputValue;

  ceil(value: number): number {
    return Math.ceil(value - 1e-9);
  }

  setExposure(value: string): void {
    const id = Number(value) as Exposure;
    if (EXPOSURE_CLASSES.some((e) => e.id === id)) this.exposure.set(id);
  }

  clamp(value: number): number {
    return Math.min(500, Math.max(1, value));
  }

  mixLabel(): string {
    const mix = this.mixValue();
    return `1 : ${fmt(mix.sand, 2)} : ${fmt(mix.gravel, 2)} (a/c ${fmt(mix.waterCement, 2)})`;
  }

  summaryText(): string {
    const m = this.materials();
    if (!m) return '';
    const shape = SHAPES.find((s) => s.id === this.shape());
    const piece = this.byVolume() ? 'Volume informado' : `${shape?.label}${this.count() > 1 ? ` × ${this.count()}` : ''}`;
    return [
      '*Material de concreto*',
      `${piece}: ${fmt(this.volumeValue(), 3)} m³ + ${fmt(this.wasteValue(), 1)}% de perda = ${fmt(m.volume, 2)} m³`,
      `Traço ${this.mixLabel()}, areia ${this.moist() ? 'úmida' : 'seca'}`,
      '',
      `• ${fmt(this.ceil(m.bags))} sacos de cimento 50 kg (${fmt(m.cementPerM3)} kg/m³)`,
      `• ${fmt(m.sandM3, 2)} m³ de areia média (${fmt(this.ceil(m.sandCans))} latas de 18 L)`,
      `• ${fmt(m.gravelM3, 2)} m³ de brita 1 (${fmt(this.ceil(m.gravelCans))} latas de 18 L)`,
      `• ${fmt(m.waterLitres)} L de água`,
      '',
      `Por saco: ${fmt(m.perBag.sandCans, 1)} latas de areia, ${fmt(m.perBag.gravelCans, 1)} de brita e ${fmt(m.perBag.waterLitres)} L de água.`,
    ].join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, volume: '', length: '', width: '', depth: '', diameter: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('ct-first')?.focus();
  }

  private snapshot(): State {
    return {
      byVolume: this.byVolume(),
      volume: this.volume(),
      shape: this.shape(),
      length: this.length(),
      width: this.width(),
      depth: this.depth(),
      diameter: this.diameter(),
      count: this.count(),
      mix: this.mix(),
      sand: this.sand(),
      gravel: this.gravel(),
      waterCement: this.waterCement(),
      moist: this.moist(),
      waste: this.waste(),
      exposure: this.exposure(),
    };
  }

  private apply(state: State): void {
    this.byVolume.set(Boolean(state.byVolume));
    this.volume.set(state.volume);
    this.shape.set(SHAPES.some((s) => s.id === state.shape) ? state.shape : DEFAULTS.shape);
    this.length.set(state.length);
    this.width.set(state.width);
    this.depth.set(state.depth);
    this.diameter.set(state.diameter);
    this.count.set(this.clamp(Number(state.count) || 1));
    this.mix.set(state.mix === CUSTOM || MIX_PRESETS.some((p) => p.id === state.mix) ? state.mix : DEFAULTS.mix);
    this.sand.set(state.sand);
    this.gravel.set(state.gravel);
    this.waterCement.set(state.waterCement);
    this.moist.set(Boolean(state.moist));
    this.waste.set(state.waste);
    this.exposure.set(EXPOSURE_CLASSES.some((e) => e.id === state.exposure) ? state.exposure : DEFAULTS.exposure);
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}
