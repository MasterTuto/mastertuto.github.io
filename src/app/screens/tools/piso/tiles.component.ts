import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  ADHESIVE_BAG_KG,
  ADHESIVE_RULES,
  DOUBLE_SPREAD_CM2,
  GROUT_DENSITY,
  LAYOUT_WASTE,
  Layout,
  Place,
  groutPerSquareMetre,
  suggestedJoint,
  tiles,
} from './tiles.logic';

const LAYOUTS: { id: Layout; label: string }[] = [
  { id: 'straight', label: 'Reta' },
  { id: 'staggered', label: 'Amarrada' },
  { id: 'diagonal', label: 'Diagonal' },
  { id: 'herringbone', label: 'Espinha' },
];
const PLACES: { id: Place; label: string }[] = [
  { id: 'floor-in', label: 'Piso interno' },
  { id: 'floor-out', label: 'Piso externo' },
  { id: 'wall-in', label: 'Parede interna' },
  { id: 'wall-out', label: 'Fachada' },
];
const SIZES: [number, number][] = [
  [30, 30],
  [45, 45],
  [60, 60],
  [60, 120],
  [90, 90],
  [20, 120],
];

const DEFAULTS = {
  byMeasures: true,
  area: '12',
  depth: '4',
  width: '3',
  tileLength: '60',
  tileWidth: '60',
  thickness: '9',
  boxArea: '1,44',
  joint: '2',
  layout: 'straight' as Layout,
  waste: '10',
  place: 'floor-in' as Place,
  porcelain: true,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:piso';

const FAQ: FaqItem[] = [
  {
    question: 'Quanto de perda devo comprar de piso?',
    answer:
      'O usual é 10% para paginação reta, 12% para amarrada (meia-junta), 15% na diagonal e de 15% a 20% em espinha de peixe. Cômodos pequenos, com muitos recortes ou peças grandes pedem a faixa de cima. Compre tudo do mesmo lote (tonalidade e calibre).',
  },
  {
    question: 'Quando é obrigatória a dupla colagem?',
    answer:
      'Em placas com área acima de 900 cm² (maiores que 30 × 30 cm), a argamassa vai na base e no verso da peça, com a desempenadeira dentada. É o que pedem as normas de execução (NBR 13753 para pisos e NBR 13754 para paredes) e os fabricantes de argamassa.',
  },
  {
    question: 'Qual argamassa usar: AC-I, AC-II ou AC-III?',
    answer:
      'Pela NBR 14081-1, AC-I serve para pisos e paredes internos com cerâmica comum; AC-II para áreas externas e porcelanato em área interna; AC-III para porcelanato em área externa, fachadas, piscinas e peças grandes. Na dúvida, siga a embalagem do revestimento.',
  },
  {
    question: 'Como calcular quanto rejunte comprar?',
    answer:
      'Os fabricantes usam a fórmula kg/m² = (C + L) ÷ (C × L) × J × E × densidade, com o comprimento C, a largura L, a junta J e a espessura E da peça em mm. Para 60 × 60 cm, 9 mm de espessura e junta de 2 mm, dá cerca de 0,1 kg/m².',
  },
  {
    question: 'Quantas caixas de porcelanato 60 × 60 para 12 m²?',
    answer:
      'Com 10% de perda, são 13,2 m². Se a caixa tem 1,44 m² (4 peças), 13,2 ÷ 1,44 = 9,2, então 10 caixas. Sempre arredonde para cima: caixa não se compra pela metade.',
  },
];

@Component({
  selector: 'app-tiles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .check { display: inline-flex; align-items: center; gap: .6rem; min-height: 44px; font-size: .9rem; cursor: pointer; }
    .check input { width: 1.15rem; height: 1.15rem; accent-color: rgb(21 28 37); }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Quantas caixas de piso comprar, qual argamassa usar e quanto rejunte levar? Informe a área, a peça e o m² da
          caixa: a calculadora soma a perda da paginação, indica AC-I, AC-II ou AC-III e a dupla colagem.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (result(); as r) {
              <span>{{ fmt(areaValue(), 2) }} m² →</span><strong>{{ r.boxes ? fmt(r.boxes) + ' caixas' : fmt(r.tiles) + ' peças' }}</strong>
            } @else {
              <span>Informe a área</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <div class="flex items-center justify-between gap-3 sm:block">
                <span class="pro-label">Área</span>
                <div class="pro-segmented w-44 sm:mt-2 sm:w-full" role="group" aria-label="Informar área por">
                  <button type="button" [attr.aria-pressed]="byMeasures()" (click)="byMeasures.set(true)">Medidas</button>
                  <button type="button" [attr.aria-pressed]="!byMeasures()" (click)="byMeasures.set(false)">m²</button>
                </div>
              </div>
              <div class="min-w-0">
                @if (byMeasures()) {
                  <div class="flex items-center gap-2">
                    <label class="pro-input-wrap flex-1">
                      <input id="pi-first" class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Comprimento em metros" [value]="depth()" (input)="depth.set(val($event))" />
                      <span class="pro-suffix">m</span>
                    </label>
                    <span class="text-foreground-light" aria-hidden="true">×</span>
                    <label class="pro-input-wrap flex-1">
                      <input class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Largura em metros" [value]="width()" (input)="width.set(val($event))" />
                      <span class="pro-suffix">m</span>
                    </label>
                  </div>
                  @if (areaValue() > 0) {
                    <p class="pro-hint mt-1.5">= {{ fmt(areaValue(), 2) }} m²</p>
                  }
                } @else {
                  <div class="pro-input-wrap">
                    <input id="pi-first" class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Área em metros quadrados" [value]="area()" (input)="area.set(val($event))" />
                    <span class="pro-suffix">m²</span>
                  </div>
                  <p class="pro-hint mt-1.5">Paredes: some a área de cada uma e desconte portas e janelas.</p>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="pi-place">Onde</span>
              <div class="pro-segmented" role="group" aria-labelledby="pi-place">
                @for (p of places; track p.id) {
                  <button type="button" [attr.aria-pressed]="place() === p.id" (click)="place.set(p.id)">{{ p.label }}</button>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label">Peça <small>comprimento × largura</small></span>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <label class="pro-input-wrap flex-1">
                    <input class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Comprimento da peça em centímetros" [value]="tileLength()" (input)="tileLength.set(val($event))" />
                    <span class="pro-suffix">cm</span>
                  </label>
                  <span class="text-foreground-light" aria-hidden="true">×</span>
                  <label class="pro-input-wrap flex-1">
                    <input class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Largura da peça em centímetros" [value]="tileWidth()" (input)="tileWidth.set(val($event))" />
                    <span class="pro-suffix">cm</span>
                  </label>
                </div>
                <div class="pro-chips mt-2" role="group" aria-label="Tamanhos comuns">
                  @for (size of sizes; track size[0] + 'x' + size[1]) {
                    <button type="button" class="pro-chip" [attr.aria-pressed]="isSize(size)" (click)="setSize(size)">{{ size[0] }} × {{ size[1] }}</button>
                  }
                </div>
                <label class="check mt-1"><input type="checkbox" [checked]="porcelain()" (change)="porcelain.set(checked($event))" /> Porcelanato</label>
              </div>
            </div>

            <div class="f">
              <span class="pro-label">Caixa e espessura</span>
              <div class="grid grid-cols-2 gap-3">
                <label class="pro-field"><span class="pro-hint">m² por caixa</span>
                  <span class="pro-input-wrap"><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="boxArea()" (input)="boxArea.set(val($event))" /><span class="pro-suffix">m²</span></span>
                </label>
                <label class="pro-field"><span class="pro-hint">Espessura da peça</span>
                  <span class="pro-input-wrap"><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="thickness()" (input)="thickness.set(val($event))" /><span class="pro-suffix">mm</span></span>
                </label>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="pi-joint">Junta</label>
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <div class="pro-input-wrap w-28 shrink-0">
                    <input id="pi-joint" class="pro-input" inputmode="decimal" autocomplete="off" [value]="joint()" (input)="joint.set(val($event))" />
                    <span class="pro-suffix">mm</span>
                  </div>
                  <div class="pro-chips" role="group" aria-label="Juntas comuns">
                    @for (j of jointChips; track j) {
                      <button type="button" class="pro-chip" [attr.aria-pressed]="num(joint()) === j" (click)="joint.set(j + '')">{{ fmtJoint(j) }} mm</button>
                    }
                  </div>
                </div>
                <p class="pro-hint mt-1.5">Sugerida para esta peça e local: a partir de {{ suggested() }} mm (confira a embalagem).</p>
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="pi-layout">Paginação</span>
              <div class="min-w-0">
                <div class="pro-segmented" role="group" aria-labelledby="pi-layout">
                  @for (l of layouts; track l.id) {
                    <button type="button" [attr.aria-pressed]="layout() === l.id" (click)="setLayout(l.id)">{{ l.label }}</button>
                  }
                </div>
                <div class="mt-2 flex items-center gap-3">
                  <div class="pro-input-wrap w-28 shrink-0">
                    <input class="pro-input" inputmode="decimal" autocomplete="off" aria-label="Perda em porcentagem" [value]="waste()" (input)="waste.set(val($event))" />
                    <span class="pro-suffix">%</span>
                  </div>
                  <span class="pro-hint">de perda ({{ fmtJoint(layoutWaste[layout()]) }}% é o usual nesta paginação)</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-2 flex justify-end">
            <button type="button" class="pro-btn ghost !min-h-[40px] !px-3 text-sm" (click)="clear()">
              <ng-icon name="tablerEraser" aria-hidden="true" /> Limpar
            </button>
          </div>
        </div>

        <aside class="pro-result" aria-live="polite" aria-label="Resultado">
          <p class="pro-result-label">{{ result()?.boxes ? 'Caixas' : 'Peças' }}</p>
          @if (result(); as r) {
            @if (r.boxes) {
              <p class="pro-result-main">{{ fmt(r.boxes) }}<small>{{ r.boxes === 1 ? 'caixa' : 'caixas' }}</small></p>
              <p class="pro-result-sub">{{ fmt(r.boughtArea, 2) }} m² · cerca de {{ fmt(r.tiles) }} peças</p>
            } @else {
              <p class="pro-result-main">{{ fmt(r.tiles) }}<small>peças</small></p>
              <p class="pro-result-sub">Informe o m² da caixa para ver quantas caixas</p>
            }
            <dl class="pro-result-list">
              <div><dt>Área com {{ fmt(wasteValue(), 1) }}% de perda</dt><dd>{{ fmt(r.areaWithWaste, 2) }} m²</dd></div>
              <div><dt>Argamassa {{ r.adhesiveType }}</dt><dd>{{ fmt(r.adhesiveBags) }} {{ r.adhesiveBags === 1 ? 'saco' : 'sacos' }} de {{ bagKg }} kg</dd></div>
              <div><dt>Consumo</dt><dd>~{{ fmt(r.adhesive.kgPerM2) }} kg/m² · {{ fmt(r.adhesiveKg) }} kg</dd></div>
              <div><dt>Rejunte</dt><dd>{{ fmt(r.groutKg, 1) }} kg <span class="font-normal opacity-70">({{ fmt(r.groutPerM2, 2) }} kg/m²)</span></dd></div>
            </dl>
            <p class="mt-4 text-sm leading-relaxed">
              <span class="pro-pill" [class.warn]="r.adhesive.double" [class.ok]="!r.adhesive.double">{{ r.adhesive.double ? 'Dupla colagem' : 'Colagem simples' }}</span>
              <span class="ml-1 opacity-80">Desempenadeira com {{ r.adhesive.trowel }}.</span>
            </p>
            <button type="button" class="pro-btn mt-4 w-full" (click)="copy()">
              <ng-icon [name]="flag.copied() ? 'tablerCheck' : 'tablerCopy'" aria-hidden="true" />
              {{ flag.copied() ? 'Lista copiada!' : 'Copiar lista de material' }}
            </button>
          } @else {
            <p class="pro-result-empty">Informe a área e o tamanho da peça.</p>
          }
        </aside>
      </div>

      <p class="pro-notice max-w-3xl">
        <strong>Consumo médio de fichas técnicas.</strong> Argamassa e rejunte variam com a base, a desempenadeira e a
        marca; a lista soma 10% para sobras. O rejunte usa densidade {{ fmt(groutDensity, 2) }} kg/dm³ (cimentício);
        rejunte epóxi rende diferente. Juntas de movimentação e de dessolidarização seguem a NBR 13753 e o projeto.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Digite as medidas do cômodo ou a área em m². Para paredes, some as áreas e desconte os vãos.</li>
            <li>Escolha onde o revestimento vai e o tamanho da peça. Marque se é porcelanato.</li>
            <li>Copie da caixa o m² por caixa e a espessura da peça.</li>
            <li>Confira a junta e a paginação: a perda muda sozinha, mas você pode ajustar.</li>
          </ol>
        </section>

        <section>
          <h2>Como o cálculo é feito</h2>
          <ul>
            <li><strong>Caixas</strong> = área × (1 + perda) ÷ m² por caixa, arredondado para cima;</li>
            <li><strong>Argamassa colante</strong> = consumo por faixa de tamanho da peça × área + 10%;</li>
            <li><strong>Rejunte (kg/m²)</strong> = (C + L) ÷ (C × L) × J × E × {{ fmt(groutDensity, 2) }}, com C, L, J e E em mm.</li>
          </ul>
          <h3>Exemplo: porcelanato 60 × 60 em 12 m²</h3>
          <p>
            Com 10% de perda, 13,2 m² ÷ 1,44 m² por caixa = 9,2, então <strong>10 caixas</strong>. A peça tem 3.600 cm²,
            acima de {{ fmt(doubleSpread) }} cm²: <strong>dupla colagem</strong>, cerca de 8 kg/m², ou 106 kg com a sobra
            (6 sacos de 20 kg de AC-II). Rejunte com junta de 2 mm: (600 + 600) ÷ 360.000 × 2 × 9 × 1,6 =
            <strong>{{ fmt(example, 3) }} kg/m²</strong>.
          </p>
        </section>

        <section>
          <h2>Consumo de argamassa colante por tamanho de peça</h2>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead><tr><th scope="col">Área da peça</th><th scope="col">Desempenadeira</th><th scope="col">Colagem</th><th scope="col">Consumo</th></tr></thead>
              <tbody>
                @for (rule of rules; track rule.upTo; let i = $index) {
                  <tr>
                    <td>{{ bandLabel(i) }}</td>
                    <td>{{ rule.trowel }}</td>
                    <td>{{ rule.double ? 'Dupla' : 'Simples' }}</td>
                    <td>~{{ rule.kgPerM2 }} kg/m²</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <p class="pro-hint mt-2">30 × 30 cm = 900 cm²; 60 × 60 cm = 3.600 cm²; 90 × 90 cm = 8.100 cm².</p>
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
            <li>ABNT NBR 13753 — Revestimento de piso interno ou externo com placas cerâmicas e com utilização de argamassa colante.</li>
            <li>ABNT NBR 13754 — Revestimento de paredes internas com placas cerâmicas e com utilização de argamassa colante.</li>
            <li>ABNT NBR 14081-1 — Argamassa colante industrializada para assentamento de placas cerâmicas (tipos AC-I, AC-II e AC-III).</li>
            <li>ABNT NBR 14992 — Argamassa à base de cimento Portland para rejuntamento de placas cerâmicas.</li>
            <li>Fichas técnicas de argamassas e rejuntes de fabricantes nacionais (consumo por faixa e fórmula do rejunte).</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
})
export class TilesCalculatorComponent {
  readonly tool = proTools[7];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly layouts = LAYOUTS;
  readonly places = PLACES;
  readonly sizes = SIZES;
  readonly rules = ADHESIVE_RULES;
  readonly layoutWaste = LAYOUT_WASTE;
  readonly jointChips = [1.5, 2, 3, 5];
  readonly bagKg = ADHESIVE_BAG_KG;
  readonly groutDensity = GROUT_DENSITY;
  readonly doubleSpread = DOUBLE_SPREAD_CM2;
  readonly example = groutPerSquareMetre(60, 60, 9, 2);
  readonly flag = copiedFlag();

  readonly byMeasures = signal(DEFAULTS.byMeasures);
  readonly area = signal(DEFAULTS.area);
  readonly depth = signal(DEFAULTS.depth);
  readonly width = signal(DEFAULTS.width);
  readonly tileLength = signal(DEFAULTS.tileLength);
  readonly tileWidth = signal(DEFAULTS.tileWidth);
  readonly thickness = signal(DEFAULTS.thickness);
  readonly boxArea = signal(DEFAULTS.boxArea);
  readonly joint = signal(DEFAULTS.joint);
  readonly layout = signal(DEFAULTS.layout);
  readonly waste = signal(DEFAULTS.waste);
  readonly place = signal(DEFAULTS.place);
  readonly porcelain = signal(DEFAULTS.porcelain);

  readonly areaValue = computed(() => {
    const value = this.byMeasures() ? num(this.depth()) * num(this.width()) : num(this.area());
    return value > 0 ? value : 0;
  });
  readonly wasteValue = computed(() => num(this.waste()));
  readonly suggested = computed(() => fmt(suggestedJoint(this.place(), num(this.tileLength()), num(this.tileWidth())), 1));
  readonly result = computed(() =>
    tiles({
      area: this.areaValue(),
      tileLength: num(this.tileLength()),
      tileWidth: num(this.tileWidth()),
      thicknessMm: num(this.thickness()),
      boxArea: num(this.boxArea()),
      jointMm: num(this.joint()),
      wastePct: this.wasteValue(),
      place: this.place(),
      porcelain: this.porcelain(),
    }),
  );

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
  }

  val = inputValue;
  num = num;

  checked(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  fmtJoint(value: number): string {
    return fmt(value, 1);
  }

  isSize(size: [number, number]): boolean {
    return num(this.tileLength()) === size[0] && num(this.tileWidth()) === size[1];
  }

  setSize(size: [number, number]): void {
    this.tileLength.set(String(size[0]));
    this.tileWidth.set(String(size[1]));
  }

  setLayout(layout: Layout): void {
    this.layout.set(layout);
    this.waste.set(String(LAYOUT_WASTE[layout]));
  }

  bandLabel(index: number): string {
    const from = index === 0 ? 0 : ADHESIVE_RULES[index - 1].upTo;
    const to = ADHESIVE_RULES[index].upTo;
    if (!from) return `até ${fmt(to)} cm²`;
    if (to === Infinity) return `acima de ${fmt(from)} cm²`;
    return `${fmt(from)} a ${fmt(to)} cm²`;
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const place = PLACES.find((p) => p.id === this.place())?.label ?? '';
    const layout = LAYOUTS.find((l) => l.id === this.layout())?.label.toLowerCase() ?? '';
    return [
      '*Material de revestimento*',
      `${place}: ${fmt(this.areaValue(), 2)} m², paginação ${layout} (${fmt(this.wasteValue(), 1)}% de perda)`,
      `Peça ${fmt(num(this.tileLength()), 1)} × ${fmt(num(this.tileWidth()), 1)} cm${this.porcelain() ? ' (porcelanato)' : ''}, junta de ${fmt(num(this.joint()), 1)} mm`,
      '',
      r.boxes ? `• ${fmt(r.boxes)} caixas de ${fmt(num(this.boxArea()), 2)} m² (${fmt(r.boughtArea, 2)} m², ~${fmt(r.tiles)} peças)` : `• ${fmt(r.tiles)} peças`,
      `• ${fmt(r.adhesiveBags)} sacos de argamassa ${r.adhesiveType} de ${ADHESIVE_BAG_KG} kg (${r.adhesive.double ? 'dupla colagem' : 'colagem simples'}, ${r.adhesive.trowel})`,
      `• ${fmt(Math.ceil(r.groutKg * 10) / 10, 1)} kg de rejunte`,
    ].join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, area: '', depth: '', width: '' });
    forgetState(STORAGE_KEY);
    document.getElementById('pi-first')?.focus();
  }

  private snapshot(): State {
    return {
      byMeasures: this.byMeasures(),
      area: this.area(),
      depth: this.depth(),
      width: this.width(),
      tileLength: this.tileLength(),
      tileWidth: this.tileWidth(),
      thickness: this.thickness(),
      boxArea: this.boxArea(),
      joint: this.joint(),
      layout: this.layout(),
      waste: this.waste(),
      place: this.place(),
      porcelain: this.porcelain(),
    };
  }

  private apply(state: State): void {
    this.byMeasures.set(Boolean(state.byMeasures));
    this.area.set(state.area);
    this.depth.set(state.depth);
    this.width.set(state.width);
    this.tileLength.set(state.tileLength);
    this.tileWidth.set(state.tileWidth);
    this.thickness.set(state.thickness);
    this.boxArea.set(state.boxArea);
    this.joint.set(state.joint);
    this.layout.set(state.layout in LAYOUT_WASTE ? state.layout : DEFAULTS.layout);
    this.waste.set(state.waste);
    this.place.set(PLACES.some((p) => p.id === state.place) ? state.place : DEFAULTS.place);
    this.porcelain.set(Boolean(state.porcelain));
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}
