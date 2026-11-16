import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser, tablerPlus, tablerX } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { copiedFlag, fmt, forgetState, inputValue, parseNumberBR, persistState } from '../pro-tools/pro-tool-utils';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  BLOCK_PRESETS,
  BlockPreset,
  MORTAR_MIXES,
  MORTAR_WASTE,
  blockFace,
  blocksPerSquareMetre,
  bricks,
} from './bricks.logic';

interface WallRow {
  length: string;
  height: string;
}
interface OpeningRow {
  width: string;
  height: string;
  count: string;
}

const CUSTOM = 'custom';
const DEFAULTS = {
  walls: [{ length: '4', height: '2,8' }] as WallRow[],
  openings: [{ width: '0,8', height: '2,1', count: '1' }] as OpeningRow[],
  block: 'cer-9x19x19',
  customWidth: '9',
  customHeight: '19',
  customLength: '29',
  joint: '10',
  waste: '5',
  mix: MORTAR_MIXES[0].id,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:tijolos';

const OPENING_PRESETS = [
  { label: 'Porta 0,80 × 2,10', width: '0,8', height: '2,1' },
  { label: 'Janela 1,20 × 1,00', width: '1,2', height: '1' },
  { label: 'Basculante 0,60 × 0,60', width: '0,6', height: '0,6' },
];

const FAQ: FaqItem[] = [
  {
    question: 'Quantos tijolos de 9 × 19 × 19 vão em 1 m² de parede?',
    answer:
      'Com junta de 1 cm, cada bloco ocupa 20 × 20 cm na parede, então são 1 ÷ (0,20 × 0,20) = 25 blocos por m². Some a perda (5% é o usual para quebras e cortes) e arredonde para cima.',
  },
  {
    question: 'Quantos blocos de concreto 14 × 19 × 39 por m²?',
    answer:
      'Com junta de 1 cm, cada bloco ocupa 40 × 20 cm, ou 0,08 m², o que dá 12,5 blocos por m². O mesmo vale para os blocos de 9 e 19 cm de largura da família 39, porque a face vista é igual.',
  },
  {
    question: 'Preciso descontar portas e janelas?',
    answer:
      'Para comprar material, sim: o bloco não vai no vão. A calculadora desconta todos os vãos informados. Se você cobra mão de obra por m², combine com o cliente se os vãos pequenos entram ou não na medição.',
  },
  {
    question: 'Qual a espessura certa da junta de assentamento?',
    answer:
      'O usual em alvenaria de vedação é 10 mm na horizontal e na vertical. Juntas mais grossas gastam mais argamassa e deixam a parede menos resistente; juntas finas demais não acomodam as diferenças de tamanho dos blocos.',
  },
  {
    question: 'Quanto cimento vai na argamassa de assentamento?',
    answer:
      'No traço 1 : 2 : 8 (cimento : cal : areia, em volume), cada m³ de argamassa leva cerca de 3,5 sacos de cimento de 50 kg, 7 sacos de cal de 20 kg e 1 m³ de areia. Uma parede de 9 × 19 × 19 gasta perto de 0,01 m³ de argamassa por m².',
  },
];

@Component({
  selector: 'app-bricks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser, tablerPlus, tablerX })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: start; gap: 1rem; } .f > .pro-label { padding-top: .8rem; } }
    .row { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) 44px; align-items: center; gap: .5rem; }
    .row.three { grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) 4.5rem 44px; }
    .row + .row { margin-top: .5rem; }
    .x { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .x:hover { background: rgb(68 74 81 / .07); }
    .add { display: inline-flex; align-items: center; gap: .35rem; min-height: 44px; font-size: .875rem; font-weight: 600; }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Quantos tijolos a parede leva? Informe as paredes, desconte portas e janelas e escolha o bloco: a calculadora
          dá os blocos com perda, a argamassa de assentamento e quanto comprar de cimento, cal e areia.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (result(); as r) {
              <span>{{ fmt(r.net, 2) }} m² →</span><strong>{{ fmt(r.total) }} blocos</strong>
            } @else {
              <span>Informe as paredes</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <span class="pro-label">Paredes <small>comprimento × altura</small></span>
              <div class="min-w-0">
                @for (wall of walls(); track $index; let i = $index) {
                  <div class="row">
                    <div class="pro-input-wrap">
                      <input class="pro-input" inputmode="decimal" autocomplete="off" [attr.id]="i === 0 ? 'tj-wall' : null" [attr.aria-label]="'Comprimento da parede ' + (i + 1) + ' em metros'" [value]="wall.length" (input)="setWall(i, 'length', val($event))" />
                      <span class="pro-suffix">m</span>
                    </div>
                    <span class="text-foreground-light" aria-hidden="true">×</span>
                    <div class="pro-input-wrap">
                      <input class="pro-input" inputmode="decimal" autocomplete="off" [attr.aria-label]="'Altura da parede ' + (i + 1) + ' em metros'" [value]="wall.height" (input)="setWall(i, 'height', val($event))" />
                      <span class="pro-suffix">m</span>
                    </div>
                    <button type="button" class="x" [attr.aria-label]="'Remover parede ' + (i + 1)" [disabled]="walls().length === 1" [class.invisible]="walls().length === 1" (click)="removeWall(i)"><ng-icon name="tablerX" /></button>
                  </div>
                }
                <button type="button" class="add text-foreground-emphasis" (click)="addWall()"><ng-icon name="tablerPlus" aria-hidden="true" /> Adicionar parede</button>
                @if (result(); as r) {
                  <p class="pro-hint">Área bruta: {{ fmt(r.gross, 2) }} m²</p>
                }
              </div>
            </div>

            <div class="f">
              <span class="pro-label">Portas e janelas <small>largura × altura × qtd.</small></span>
              <div class="min-w-0">
                @for (item of openings(); track $index; let i = $index) {
                  <div class="row three">
                    <div class="pro-input-wrap">
                      <input class="pro-input" inputmode="decimal" autocomplete="off" [attr.aria-label]="'Largura do vão ' + (i + 1) + ' em metros'" [value]="item.width" (input)="setOpening(i, 'width', val($event))" />
                      <span class="pro-suffix">m</span>
                    </div>
                    <span class="text-foreground-light" aria-hidden="true">×</span>
                    <div class="pro-input-wrap">
                      <input class="pro-input" inputmode="decimal" autocomplete="off" [attr.aria-label]="'Altura do vão ' + (i + 1) + ' em metros'" [value]="item.height" (input)="setOpening(i, 'height', val($event))" />
                      <span class="pro-suffix">m</span>
                    </div>
                    <div class="pro-input-wrap">
                      <input class="pro-input !pr-7" inputmode="numeric" autocomplete="off" [attr.aria-label]="'Quantidade do vão ' + (i + 1)" [value]="item.count" (input)="setOpening(i, 'count', val($event))" />
                      <span class="pro-suffix !right-3">×</span>
                    </div>
                    <button type="button" class="x" [attr.aria-label]="'Remover vão ' + (i + 1)" (click)="removeOpening(i)"><ng-icon name="tablerX" /></button>
                  </div>
                }
                <div class="pro-chips mt-2" role="group" aria-label="Adicionar vão comum">
                  @for (preset of openingPresets; track preset.label) {
                    <button type="button" class="pro-chip" (click)="addOpening(preset.width, preset.height)">+ {{ preset.label }}</button>
                  }
                  <button type="button" class="pro-chip" (click)="addOpening('', '')">+ Outro</button>
                </div>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="tj-block">Bloco ou tijolo</label>
              <div class="min-w-0">
                <select id="tj-block" class="pro-select" [value]="block()" (change)="block.set(val($event))">
                  @for (group of blockGroups; track group.label) {
                    <optgroup [label]="group.label">
                      @for (item of group.items; track item.id) {
                        <option [value]="item.id" [selected]="item.id === block()">{{ item.label }} cm</option>
                      }
                    </optgroup>
                  }
                  <option [value]="custom" [selected]="block() === custom">Outro tamanho…</option>
                </select>
                @if (block() === custom) {
                  <div class="mt-2 grid grid-cols-3 gap-2">
                    <label class="pro-field"><span class="pro-hint">Largura</span>
                      <span class="pro-input-wrap"><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="customWidth()" (input)="customWidth.set(val($event))" /><span class="pro-suffix">cm</span></span>
                    </label>
                    <label class="pro-field"><span class="pro-hint">Altura</span>
                      <span class="pro-input-wrap"><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="customHeight()" (input)="customHeight.set(val($event))" /><span class="pro-suffix">cm</span></span>
                    </label>
                    <label class="pro-field"><span class="pro-hint">Comprimento</span>
                      <span class="pro-input-wrap"><input class="pro-input" inputmode="decimal" autocomplete="off" [value]="customLength()" (input)="customLength.set(val($event))" /><span class="pro-suffix">cm</span></span>
                    </label>
                  </div>
                }
                @if (face(); as fc) {
                  <p class="pro-hint mt-1.5">Face na parede {{ fmt(fc.faceLength, 1) }} × {{ fmt(fc.faceHeight, 1) }} cm · parede de {{ fmt(fc.thickness, 1) }} cm sem reboco</p>
                }
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="tj-joint">Junta</label>
              <div class="flex flex-wrap items-center gap-2">
                <div class="pro-input-wrap w-28 shrink-0">
                  <input id="tj-joint" class="pro-input" inputmode="decimal" autocomplete="off" [value]="joint()" (input)="joint.set(val($event))" />
                  <span class="pro-suffix">mm</span>
                </div>
                <div class="pro-chips" role="group" aria-label="Juntas comuns">
                  @for (j of jointChips; track j) {
                    <button type="button" class="pro-chip" [attr.aria-pressed]="jointValue() === j" (click)="joint.set(j + '')">{{ j }} mm</button>
                  }
                </div>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="tj-waste">Perda</label>
              <div class="flex flex-wrap items-center gap-2">
                <div class="pro-input-wrap w-28 shrink-0">
                  <input id="tj-waste" class="pro-input" inputmode="decimal" autocomplete="off" [value]="waste()" (input)="waste.set(val($event))" />
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
              <span class="pro-label" id="tj-mix">Traço da argamassa</span>
              <div class="pro-segmented" role="group" aria-labelledby="tj-mix">
                @for (m of mixes; track m.id) {
                  <button type="button" [attr.aria-pressed]="mix() === m.id" (click)="mix.set(m.id)">{{ mixShort(m.id) }}</button>
                }
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
          <p class="pro-result-label">Comprar</p>
          @if (result(); as r) {
            <p class="pro-result-main">{{ fmt(r.total) }}<small>{{ isSolid() ? 'tijolos' : 'blocos' }}</small></p>
            <p class="pro-result-sub">{{ fmt(r.perSquareMetre, 2) }} por m² × {{ fmt(r.net, 2) }} m² + {{ fmt(wasteValue(), 1) }}% de perda</p>
            <dl class="pro-result-list">
              <div><dt>Área das paredes</dt><dd>{{ fmt(r.gross, 2) }} m²</dd></div>
              <div><dt>Vãos descontados</dt><dd>− {{ fmt(r.openings, 2) }} m²</dd></div>
              <div><dt>Área de alvenaria</dt><dd>{{ fmt(r.net, 2) }} m²</dd></div>
              <div><dt>Argamassa de assentamento</dt><dd>{{ fmt(r.mortar, 3) }} m³</dd></div>
              @if (r.materials; as mt) {
                <div><dt>Cimento (50 kg)</dt><dd>{{ fmt(ceil(mt.cementBags)) }} {{ ceil(mt.cementBags) === 1 ? 'saco' : 'sacos' }}</dd></div>
                @if (mt.limeBags > 0) {
                  <div><dt>Cal hidratada (20 kg)</dt><dd>{{ fmt(ceil(mt.limeBags)) }} {{ ceil(mt.limeBags) === 1 ? 'saco' : 'sacos' }}</dd></div>
                }
                <div><dt>Areia média</dt><dd>{{ fmt(mt.sand, 2) }} m³ <span class="font-normal opacity-70">({{ fmt(ceil(mt.sandCans)) }} latas)</span></dd></div>
              }
            </dl>
            <button type="button" class="pro-btn mt-4 w-full" (click)="copy()">
              <ng-icon [name]="flag.copied() ? 'tablerCheck' : 'tablerCopy'" aria-hidden="true" />
              {{ flag.copied() ? 'Lista copiada!' : 'Copiar lista de material' }}
            </button>
          } @else {
            <p class="pro-result-empty">Informe pelo menos uma parede com comprimento e altura.</p>
          }
        </aside>
      </div>

      <p class="pro-notice max-w-3xl">
        <strong>Estimativa de compra.</strong> A argamassa é o volume das juntas mais {{ fmt(mortarWaste * 100) }}% para
        sobras e a massa que cai nos furos; o traço em volume considera 1 saco de cimento ou de cal ≈ 2 latas de 18 L.
        Paredes com função estrutural seguem o projeto do engenheiro.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Digite o comprimento e a altura de cada parede. Use <em>Adicionar parede</em> para o cômodo inteiro.</li>
            <li>Adicione as portas e janelas com um toque nos tamanhos comuns ou digite as medidas do vão.</li>
            <li>Escolha o bloco ou tijolo. Para tamanhos fora da lista, use <em>Outro tamanho</em>.</li>
            <li>Confira a junta (10 mm é o padrão) e a perda, e copie a lista de material para mandar ao depósito ou ao cliente.</li>
          </ol>
        </section>

        <section>
          <h2>Como o cálculo é feito</h2>
          <p>Cada bloco ocupa na parede a sua face mais a junta. Por isso:</p>
          <ul>
            <li><strong>Blocos por m² = 1 ÷ [(comprimento + junta) × (altura + junta)]</strong>, com as medidas em metros;</li>
            <li><strong>Área de alvenaria</strong> = soma das paredes − portas e janelas;</li>
            <li><strong>Total</strong> = blocos por m² × área × (1 + perda), arredondado para cima;</li>
            <li><strong>Argamassa</strong> = (1 m² − área das faces dos blocos) × espessura da parede, por m², mais {{ fmt(mortarWaste * 100) }}%.</li>
          </ul>
          <h3>Exemplo: parede de 4 × 2,8 m com uma porta, bloco 9 × 19 × 19</h3>
          <p>
            Área: 11,2 − 1,68 = 9,52 m². Com junta de 1 cm, são 25 blocos por m²: 9,52 × 25 = 238 blocos, e com 5% de
            perda, <strong>250 blocos</strong>. As juntas somam 0,0975 m² por m² de parede, × 0,09 m de espessura =
            0,0088 m³/m², ou cerca de <strong>0,1 m³ de argamassa</strong> com a sobra.
          </p>
        </section>

        <section>
          <h2>Tabela de blocos por m²</h2>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead><tr><th scope="col">Bloco (cm)</th><th scope="col">Por m²</th><th scope="col">Parede</th></tr></thead>
              <tbody>
                @for (row of table; track row.label) {
                  <tr><td>{{ row.label }}</td><td>{{ fmt(row.perM2, 1) }}</td><td>{{ fmt(row.thickness, 1) }} cm</td></tr>
                }
              </tbody>
            </table>
          </div>
          <p class="pro-hint mt-2">Com junta de 10 mm, sem perda. Espessura da parede sem reboco.</p>
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
            <li>ABNT NBR 15270-1 — Componentes cerâmicos: blocos e tijolos para alvenaria (dimensões modulares e tolerâncias).</li>
            <li>ABNT NBR 6136 — Blocos vazados de concreto simples para alvenaria (família 39 × 19 cm).</li>
            <li>ABNT NBR 8545 — Execução de alvenaria sem função estrutural de tijolos e blocos cerâmicos.</li>
            <li>ABNT NBR 13281 — Argamassa para assentamento e revestimento de paredes e tetos.</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
})
export class BricksCalculatorComponent {
  readonly tool = proTools[5];
  readonly faq = FAQ;
  readonly fmt = fmt;
  readonly custom = CUSTOM;
  readonly mixes = MORTAR_MIXES;
  readonly mortarWaste = MORTAR_WASTE;
  readonly openingPresets = OPENING_PRESETS;
  readonly jointChips = [10, 12, 15];
  readonly wasteChips = [3, 5, 10];
  readonly blockGroups = [
    { label: 'Bloco cerâmico de vedação', items: BLOCK_PRESETS.filter((item) => item.family === 'ceramic') },
    { label: 'Bloco de concreto', items: BLOCK_PRESETS.filter((item) => item.family === 'concrete') },
    { label: 'Tijolo maciço', items: BLOCK_PRESETS.filter((item) => item.family === 'solid') },
  ];
  readonly table = BLOCK_PRESETS.map((item) => {
    const face = blockFace(item);
    return { label: item.label, perM2: blocksPerSquareMetre(face, 10), thickness: face.thickness };
  });
  readonly flag = copiedFlag();

  readonly walls = signal<WallRow[]>(DEFAULTS.walls);
  readonly openings = signal<OpeningRow[]>(DEFAULTS.openings);
  readonly block = signal(DEFAULTS.block);
  readonly customWidth = signal(DEFAULTS.customWidth);
  readonly customHeight = signal(DEFAULTS.customHeight);
  readonly customLength = signal(DEFAULTS.customLength);
  readonly joint = signal(DEFAULTS.joint);
  readonly waste = signal(DEFAULTS.waste);
  readonly mix = signal(DEFAULTS.mix);

  readonly jointValue = computed(() => num(this.joint()));
  readonly wasteValue = computed(() => num(this.waste()));
  readonly selected = computed<Pick<BlockPreset, 'width' | 'height' | 'length' | 'across'>>(() => {
    if (this.block() === CUSTOM) {
      return { width: num(this.customWidth()), height: num(this.customHeight()), length: num(this.customLength()) };
    }
    return BLOCK_PRESETS.find((item) => item.id === this.block()) ?? BLOCK_PRESETS[0];
  });
  readonly isSolid = computed(() => BLOCK_PRESETS.find((item) => item.id === this.block())?.family === 'solid');
  readonly face = computed(() => {
    const face = blockFace(this.selected());
    return face.faceLength > 0 && face.faceHeight > 0 && face.thickness > 0 ? face : null;
  });

  readonly result = computed(() =>
    bricks({
      walls: this.walls().map((wall) => ({ length: num(wall.length), height: num(wall.height) })),
      openings: this.openings().map((item) => ({ width: num(item.width), height: num(item.height), count: num(item.count) })),
      block: this.selected(),
      jointMm: this.jointValue(),
      wastePct: this.wasteValue(),
      mix: MORTAR_MIXES.find((item) => item.id === this.mix()) ?? MORTAR_MIXES[0],
    }),
  );

  constructor() {
    useProToolSeo(this.tool, this.faq);
    persistState<State>(STORAGE_KEY, DEFAULTS, () => this.snapshot(), (state) => this.apply(state));
  }

  val = inputValue;

  ceil(value: number): number {
    return Math.ceil(value - 1e-9);
  }

  mixShort(id: string): string {
    return id.replace('0.5', '½').replace('4.5', '4½');
  }

  setWall(index: number, key: keyof WallRow, value: string): void {
    this.walls.update((rows) => rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  }

  addWall(): void {
    const last = this.walls()[this.walls().length - 1];
    this.walls.update((rows) => [...rows, { length: '', height: last?.height ?? '' }]);
  }

  removeWall(index: number): void {
    this.walls.update((rows) => (rows.length > 1 ? rows.filter((_, i) => i !== index) : rows));
  }

  setOpening(index: number, key: keyof OpeningRow, value: string): void {
    this.openings.update((rows) => rows.map((row, i) => (i === index ? { ...row, [key]: value } : row)));
  }

  addOpening(width: string, height: string): void {
    const existing = this.openings().findIndex((row) => width && row.width === width && row.height === height);
    if (existing >= 0) {
      this.setOpening(existing, 'count', String((num(this.openings()[existing].count) || 0) + 1));
      return;
    }
    this.openings.update((rows) => [...rows, { width, height, count: '1' }]);
  }

  removeOpening(index: number): void {
    this.openings.update((rows) => rows.filter((_, i) => i !== index));
  }

  summaryText(): string {
    const r = this.result();
    if (!r) return '';
    const name = this.block() === CUSTOM
      ? `${fmt(this.selected().width, 1)} × ${fmt(this.selected().height, 1)} × ${fmt(this.selected().length, 1)} cm`
      : `${BLOCK_PRESETS.find((item) => item.id === this.block())?.label} cm`;
    const lines = [
      '*Material de alvenaria*',
      `Área de parede: ${fmt(r.gross, 2)} m² − vãos ${fmt(r.openings, 2)} m² = ${fmt(r.net, 2)} m²`,
      `Bloco: ${name}, junta de ${fmt(this.jointValue(), 1)} mm`,
      '',
      `• ${fmt(r.total)} ${this.isSolid() ? 'tijolos' : 'blocos'} (${fmt(r.perSquareMetre, 2)}/m² + ${fmt(this.wasteValue(), 1)}% de perda)`,
    ];
    if (r.materials) {
      lines.push(
        `• Argamassa ${this.mixShort(this.mix())}: ${fmt(r.mortar, 3)} m³`,
        `  – ${fmt(this.ceil(r.materials.cementBags))} saco(s) de cimento 50 kg`,
        ...(r.materials.limeBags > 0 ? [`  – ${fmt(this.ceil(r.materials.limeBags))} saco(s) de cal hidratada 20 kg`] : []),
        `  – ${fmt(r.materials.sand, 2)} m³ de areia média (${fmt(this.ceil(r.materials.sandCans))} latas de 18 L)`,
      );
    }
    return lines.join('\n');
  }

  copy(): void {
    void this.flag.copy(this.summaryText());
  }

  clear(): void {
    this.apply({ ...DEFAULTS, walls: [{ length: '', height: '' }], openings: [] });
    forgetState(STORAGE_KEY);
    document.getElementById('tj-wall')?.focus();
  }

  private snapshot(): State {
    return {
      walls: this.walls(),
      openings: this.openings(),
      block: this.block(),
      customWidth: this.customWidth(),
      customHeight: this.customHeight(),
      customLength: this.customLength(),
      joint: this.joint(),
      waste: this.waste(),
      mix: this.mix(),
    };
  }

  private apply(state: State): void {
    this.walls.set(Array.isArray(state.walls) && state.walls.length ? state.walls : DEFAULTS.walls);
    this.openings.set(Array.isArray(state.openings) ? state.openings : []);
    this.block.set(state.block === CUSTOM || BLOCK_PRESETS.some((item) => item.id === state.block) ? state.block : DEFAULTS.block);
    this.customWidth.set(state.customWidth);
    this.customHeight.set(state.customHeight);
    this.customLength.set(state.customLength);
    this.joint.set(state.joint);
    this.waste.set(state.waste);
    this.mix.set(MORTAR_MIXES.some((item) => item.id === state.mix) ? state.mix : DEFAULTS.mix);
  }
}

function num(text: string): number {
  const value = parseNumberBR(text);
  return Number.isFinite(value) ? value : 0;
}
