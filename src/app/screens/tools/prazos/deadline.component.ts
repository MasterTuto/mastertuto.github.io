import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCalendar, tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus, tablerX } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { InputMaskDirective } from 'src/app/components/forms/input-mask.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  CountMode,
  DayNum,
  DeadlineInput,
  MAX_DAYS,
  TimelineRow,
  businessDaysBetween,
  compactTimeline,
  computeDeadline,
  dayParts,
  formatBr,
  formatIso,
  holidaysOf,
  parseBrDate,
  parseIso,
  today,
  weekdayName,
  weekdayShort,
} from './deadline.logic';

const DEFAULTS = {
  dje: false,
  date: '',
  days: 15,
  mode: 'uteis' as CountMode,
  double: false,
  optional: true,
  forensic: false,
  recess: true,
  custom: [] as string[],
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:prazos';

const FAQ: FaqItem[] = [
  {
    question: 'Como contar um prazo processual pelo CPC?',
    answer:
      'Exclui-se o dia da intimação e inclui-se o último dia (art. 224). A contagem começa no primeiro dia útil seguinte e só os dias úteis entram na conta (art. 219). Se o último dia não tiver expediente forense, o prazo vence no próximo dia útil.',
  },
  {
    question: 'Qual a diferença entre disponibilização e publicação no DJe?',
    answer:
      'A data de publicação é o primeiro dia útil seguinte ao da disponibilização da decisão no Diário de Justiça eletrônico (Lei 11.419/2006, art. 4º, § 3º, e CPC, art. 224, § 2º). O prazo começa a correr no primeiro dia útil depois da publicação. Por isso, a partir da disponibilização são dois dias úteis até o primeiro dia contado.',
  },
  {
    question: 'O prazo corre durante o recesso de fim de ano?',
    answer:
      'Não. O art. 220 do CPC suspende os prazos processuais de 20 de dezembro a 20 de janeiro, inclusive. Os dias contados antes do dia 20 de dezembro valem, e a contagem retoma em 21 de janeiro (ou no primeiro dia útil seguinte).',
  },
  {
    question: 'Quem tem prazo em dobro?',
    answer:
      'A Fazenda Pública (União, estados, municípios, autarquias e fundações públicas, art. 183), a Defensoria Pública (art. 186) e os litisconsortes com procuradores diferentes, de escritórios distintos, em autos físicos (art. 229). O dobro não se aplica quando a lei fixa prazo próprio para o ente público.',
  },
  {
    question: 'Carnaval e Corpus Christi suspendem os prazos?',
    answer:
      'Não são feriados nacionais por lei, mas a maioria dos tribunais não tem expediente nesses dias (ponto facultativo), e então eles não contam. Por isso a calculadora já os exclui; desligue a opção se o seu tribunal funcionar normalmente. A Quarta-feira de Cinzas costuma ter expediente só à tarde: confira a portaria do tribunal.',
  },
];

@Component({
  selector: 'app-deadline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, InputMaskDirective, NgIconComponent],
  providers: [provideIcons({ tablerCalendar, tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus, tablerX })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover { background: rgb(68 74 81 / .07); }
    .step input { width: 3rem; height: 44px; background: transparent; text-align: center; font-size: 16px; font-weight: 650; font-variant-numeric: tabular-nums; }
    .sw { position: relative; flex-shrink: 0; width: 44px; height: 26px; border-radius: 999px; background: rgb(68 74 81 / .22); transition: background-color .15s; }
    .sw::after { content: ''; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 999px; background: #fff; box-shadow: 0 1px 2px rgb(0 0 0 / .2); transition: transform .15s; }
    .sw[aria-checked=true] { background: #7a70e1; }
    .sw[aria-checked=true]::after { transform: translateX(18px); }
    .tl li { display: grid; grid-template-columns: 4.6rem 1.75rem minmax(0, 1fr); align-items: center; gap: .5rem; padding: .35rem 0; border-top: 1px solid rgb(68 74 81 / .08); font-size: .875rem; }
    .tl b { display: grid; place-items: center; width: 1.6rem; height: 1.6rem; border-radius: 999px; font-size: .72rem; font-variant-numeric: tabular-nums; }
    details > summary::-webkit-details-marker { display: none; }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Informe a data da intimação e o prazo: a contagem segue o CPC (dias úteis, art. 219), pula feriados nacionais,
          Carnaval, Corpus Christi e o recesso de 20/12 a 20/01, e mostra o último dia e cada dia contado.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (result(); as r) {
              <span>Vence em</span>
              <strong>{{ short(r.end) }} {{ br(r.end) }}</strong>
              <span class="text-xs font-semibold" [class.text-green-300]="status()?.tone === 'ok'" [class.text-amber-300]="status()?.tone === 'warn'" [class.text-red-300]="status()?.tone === 'bad'">{{ status()?.short }}</span>
            } @else {
              <span>Informe a data da intimação</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <span class="pro-label" id="dl-kind">A data é da</span>
              <div class="pro-segmented" role="group" aria-labelledby="dl-kind">
                <button type="button" [attr.aria-pressed]="!dje()" (click)="dje.set(false)">Intimação</button>
                <button type="button" [attr.aria-pressed]="dje()" (click)="dje.set(true)">DJe</button>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="dl-date">{{ dje() ? 'Disponibilização no DJe' : 'Intimação' }} <small class="sm:hidden">dd/mm/aaaa</small></label>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <div class="pro-input-wrap min-w-0 flex-1 sm:max-w-[13rem]">
                    <input id="dl-date" class="pro-input" appMask="date" placeholder="dd/mm/aaaa" [value]="date()"
                      (input)="date.set(val($event))" (focus)="select($event)" [attr.aria-invalid]="dateInvalid()" aria-describedby="dl-date-hint" />
                    <span class="absolute right-1 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg text-foreground-light hover:bg-foreground/5">
                      <ng-icon name="tablerCalendar" size="1.2rem" aria-hidden="true" />
                      <input type="date" tabindex="-1" aria-label="Escolher no calendário" class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        [value]="isoDate()" (change)="pickDate($event)" (click)="openPicker($event)" />
                    </span>
                  </div>
                  <div class="pro-chips shrink-0" role="group" aria-label="Datas rápidas">
                    <button type="button" class="pro-chip" [attr.aria-pressed]="startDay() === todayNum()" (click)="setDay(todayNum())">Hoje</button>
                    <button type="button" class="pro-chip" [attr.aria-pressed]="startDay() === todayNum() - 1" (click)="setDay(todayNum() - 1)">Ontem</button>
                  </div>
                </div>
                <p id="dl-date-hint" class="pro-hint mt-1.5" [class.!text-red-600]="dateInvalid()">
                  @if (dateInvalid()) { Data inválida. Use dd/mm/aaaa. }
                  @else if (startDay() !== null) { {{ weekday(startDay()!) }}{{ dje() ? ' · publicação no 1º dia útil seguinte' : '' }} }
                  @else { Digite só os números: 15122025 }
                </p>
              </div>
            </div>

            <div class="f">
              <label class="pro-label" for="dl-days">Prazo</label>
              <div class="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                <div class="step" role="group" aria-label="Prazo em dias">
                  <button type="button" aria-label="Menos um dia" (click)="setDays(days() - 1)"><ng-icon name="tablerMinus" /></button>
                  <input id="dl-days" inputmode="numeric" autocomplete="off" maxlength="3" aria-label="Dias de prazo" [value]="days() || ''"
                    (input)="onDays($event)" (focus)="select($event)" />
                  <button type="button" aria-label="Mais um dia" (click)="setDays(days() + 1)"><ng-icon name="tablerPlus" /></button>
                </div>
                <div class="pro-chips min-w-0" role="group" aria-label="Prazos comuns">
                  @for (n of presets; track n) {
                    <button type="button" class="pro-chip !px-3.5" [attr.aria-pressed]="days() === n" (click)="setDays(n)">{{ n }}</button>
                  }
                </div>
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="dl-mode">Contagem</span>
              <div>
                <div class="pro-segmented" role="group" aria-labelledby="dl-mode">
                  <button type="button" [attr.aria-pressed]="mode() === 'uteis'" (click)="mode.set('uteis')">Dias úteis (CPC)</button>
                  <button type="button" [attr.aria-pressed]="mode() === 'corridos'" (click)="mode.set('corridos')">Dias corridos</button>
                </div>
                <p class="pro-hint mt-1.5">
                  {{ mode() === 'uteis' ? 'Prazos processuais civis, trabalhistas e dos juizados (art. 219 do CPC).' : 'Prazos penais (CPP, art. 798) e prazos de direito material. O vencimento em dia sem expediente passa ao próximo dia útil.' }}
                </p>
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="dl-double">Prazo em dobro</span>
              <label class="flex cursor-pointer items-center justify-between gap-3">
                <span class="pro-hint">Fazenda Pública (art. 183), Defensoria (art. 186) ou litisconsortes com advogados diferentes em autos físicos (art. 229)</span>
                <button type="button" role="switch" class="sw" aria-labelledby="dl-double" [attr.aria-checked]="double()" (click)="double.set(!double())"></button>
              </label>
            </div>

            <details class="f group !block">
              <summary class="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3">
                <span class="pro-label">Feriados e suspensões</span>
                <span class="text-right text-sm text-foreground-light">
                  {{ calendarSummary() }}
                  <span class="ml-1 inline-block transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
                </span>
              </summary>
              <div class="mt-1 grid">
                @for (opt of options; track opt.key) {
                  <label class="flex cursor-pointer items-center justify-between gap-4 border-t border-foreground/10 py-3 first:border-t-0">
                    <span class="min-w-0">
                      <span class="block text-sm font-semibold text-foreground" [id]="'dl-opt-' + opt.key">{{ opt.label }}</span>
                      <span class="pro-hint block">{{ opt.hint }}</span>
                    </span>
                    <button type="button" role="switch" class="sw" [attr.aria-labelledby]="'dl-opt-' + opt.key" [attr.aria-checked]="opt.value()" (click)="opt.value.set(!opt.value())"></button>
                  </label>
                }
                <div class="border-t border-foreground/10 py-3" data-flow-skip>
                  <label class="block text-sm font-semibold text-foreground" for="dl-custom">Feriados locais e suspensões do tribunal</label>
                  <span class="pro-hint block">Feriados estaduais e municipais, portarias de suspensão, indisponibilidade do sistema.</span>
                  <div class="mt-2 flex gap-2">
                    <input id="dl-custom" class="pro-input max-w-[13rem]" appMask="date" [maskAutoAdvance]="false" placeholder="dd/mm/aaaa"
                      [value]="customText()" (input)="customText.set(val($event))" (keydown.enter)="addCustom($event)" />
                    <button type="button" class="pro-btn ghost shrink-0" [disabled]="customDay() === null" (click)="addCustom()">
                      <ng-icon name="tablerPlus" aria-hidden="true" /> Adicionar
                    </button>
                  </div>
                  @if (customDays().length) {
                    <ul class="mt-3 flex flex-wrap gap-2" aria-label="Datas adicionadas">
                      @for (day of customDays(); track day) {
                        <li class="inline-flex items-center gap-1 rounded-full bg-surface-decoration py-1 pl-3 pr-1 text-sm font-medium text-surface-decoration-foreground">
                          {{ short(day) }} {{ br(day) }}
                          <button type="button" class="grid h-8 w-8 place-items-center rounded-full hover:bg-white/60" [attr.aria-label]="'Remover ' + br(day)" (click)="removeCustom(day)">
                            <ng-icon name="tablerX" size="0.95rem" />
                          </button>
                        </li>
                      }
                    </ul>
                  }
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

        <aside class="pro-result min-[960px]:row-span-2" aria-live="polite" aria-label="Resultado">
          @if (result(); as r) {
            <div class="flex items-start justify-between gap-3">
              <p class="pro-result-label">Último dia do prazo</p>
              @if (status(); as s) {
                <span class="pro-pill" [class.ok]="s.tone === 'ok'" [class.warn]="s.tone === 'warn'" [class.bad]="s.tone === 'bad'">{{ s.short }}</span>
              }
            </div>
            <p class="pro-result-main">{{ br(r.end) }}</p>
            <p class="pro-result-sub">
              {{ cap(weekday(r.end)) }} · {{ status()?.long }}
            </p>
            <dl class="pro-result-list">
              <div><dt>{{ dje() ? 'Disponibilização' : 'Intimação' }}</dt><dd>{{ br(r.start) }}</dd></div>
              @if (r.publication !== null) {
                <div><dt>Publicação</dt><dd>{{ br(r.publication) }}</dd></div>
              }
              <div><dt>Início da contagem</dt><dd>{{ br(r.firstCounted) }}</dd></div>
              <div><dt>Prazo</dt><dd>{{ r.total }} {{ mode() === 'uteis' ? 'dias úteis' : 'dias corridos' }}{{ double() ? ' (em dobro)' : '' }}</dd></div>
              <div><dt>Dias no calendário</dt><dd>{{ r.end - r.firstCounted + 1 }}</dd></div>
              @if (r.movedFrom !== null) {
                <div><dt>Prorrogado de</dt><dd>{{ br(r.movedFrom) }}</dd></div>
              }
              @if (skippedText()) {
                <div><dt>Não contados</dt><dd class="max-w-[60%]">{{ skippedText() }}</dd></div>
              }
            </dl>
            <div class="mt-4 flex flex-wrap gap-2">
              <button type="button" class="pro-btn" (click)="copy()">
                <ng-icon [name]="copied() ? 'tablerCheck' : 'tablerCopy'" aria-hidden="true" /> {{ copied() ? 'Copiado' : 'Copiar resumo' }}
              </button>
            </div>
          } @else {
            <p class="pro-result-label">Último dia do prazo</p>
            <p class="pro-result-empty">
              {{ startDay() === null ? 'Informe a data da intimação ou da disponibilização no DJe.' : 'Informe um prazo entre 1 e ' + maxDays + ' dias.' }}
            </p>
          }
        </aside>

        @if (result(); as r) {
          <details class="group min-w-0 border-y border-foreground/10" [open]="timelineOpen()" (toggle)="timelineOpen.set($any($event.target).open)">
            <summary class="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3">
              <span class="font-semibold text-foreground">Contagem dia a dia</span>
              <span class="text-sm text-foreground-light">
                {{ r.total }} contados · {{ r.end - r.firstCounted + 1 }} no calendário
                <span class="ml-1 inline-block transition-transform group-open:rotate-180" aria-hidden="true">▾</span>
              </span>
            </summary>
            <ol class="tl pb-3" aria-label="Dias do prazo">
              @for (row of rows(); track row.day) {
                <li [class.opacity-60]="row.kind === 'weekend'">
                  <span class="tabular-nums text-foreground-light">{{ short(row.day) }} <span class="text-foreground">{{ dm(row.day) }}</span></span>
                  @switch (row.kind) {
                    @case ('counted') {
                      <b [class]="row.day === r.end ? 'bg-foreground-emphasis text-white' : 'bg-primary text-primary-foreground'">{{ row.n ?? '✓' }}</b>
                    }
                    @case ('holiday') { <b class="bg-amber-100 text-amber-700" aria-hidden="true">F</b> }
                    @case ('custom') { <b class="bg-amber-100 text-amber-700" aria-hidden="true">L</b> }
                    @case ('recess') { <b class="bg-surface-decoration text-surface-decoration-foreground" aria-hidden="true">R</b> }
                    @case ('suspended') { <b class="bg-surface-decoration text-surface-decoration-foreground" aria-hidden="true">S</b> }
                    @case ('weekend') { <b class="text-foreground-light" aria-hidden="true">–</b> }
                    @default { <b class="border border-foreground/25 text-foreground" aria-hidden="true">0</b> }
                  }
                  <span class="min-w-0 text-foreground">
                    @if (row.until) {
                      até {{ dm(row.until) }} · {{ row.label }} <span class="text-foreground-light">({{ row.count }} dias)</span>
                    } @else if (row.kind === 'counted') {
                      {{ row.day === r.end ? 'Último dia do prazo' : 'Dia ' + row.n }}{{ row.label ? ' · ' + row.label : '' }}
                    } @else {
                      {{ row.label }}{{ row.kind === 'weekend' || row.kind === 'holiday' || row.kind === 'custom' ? ' · não conta' : '' }}
                    }
                  </span>
                </li>
              }
            </ol>
          </details>
        }
      </div>

      <p class="pro-notice max-w-3xl">
        <strong>Confira sempre o calendário do seu tribunal.</strong> A calculadora considera feriados nacionais, as opções
        marcadas e as datas que você adicionar. Feriados estaduais e municipais, portarias de suspensão, expediente
        reduzido e regras especiais (prazos em horas, ECA, Lei de Falências, prazos materiais) mudam o resultado. Nos
        juizados especiais cíveis o prazo também é em dias úteis (Lei 9.099/1995, art. 12-A); no processo penal, em
        dias corridos.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Escolha se a data é da <strong>intimação</strong> (ou publicação) ou da <strong>disponibilização no DJe</strong>.</li>
            <li>Digite a data só com números (o campo completa as barras) ou toque no calendário.</li>
            <li>Escolha o prazo: 5, 8, 10, 15 ou 30 dias, ou ajuste com os botões − e +.</li>
            <li>Ligue o prazo em dobro se for o caso e revise os feriados e as suspensões do seu tribunal.</li>
            <li>Copie o resumo para mandar ao cliente ou registrar na agenda do escritório.</li>
          </ol>
        </section>

        <section>
          <h2>Como o prazo é contado no CPC</h2>
          <dl class="grid gap-x-6 sm:grid-cols-[11rem_minmax(0,1fr)]">
            <dt class="font-semibold">Dias úteis</dt>
            <dd class="mb-3">Na contagem em dias, só os dias úteis entram (art. 219). Sábados, domingos, feriados e dias sem expediente forense ficam de fora.</dd>
            <dt class="font-semibold">Início e fim</dt>
            <dd class="mb-3">Exclui-se o dia do começo e inclui-se o do vencimento (art. 224). A contagem começa no primeiro dia útil após a intimação; se o começo ou o fim cair em dia sem expediente, passa ao dia útil seguinte (§ 1º).</dd>
            <dt class="font-semibold">DJe</dt>
            <dd class="mb-3">Considera-se publicada a decisão no primeiro dia útil seguinte ao da disponibilização (art. 224, § 2º; Lei 11.419/2006, art. 4º, § 3º).</dd>
            <dt class="font-semibold">Recesso</dt>
            <dd class="mb-3">Os prazos ficam suspensos de 20 de dezembro a 20 de janeiro (art. 220). Entre 20/12 e 6/1 também não há expediente forense.</dd>
            <dt class="font-semibold">Prazo em dobro</dt>
            <dd class="mb-3">Fazenda Pública (art. 183), Defensoria Pública (art. 186) e litisconsortes com procuradores de escritórios diferentes em autos físicos (art. 229).</dd>
          </dl>
          <h3>Exemplo: intimação em 15/12/2025, prazo de 15 dias úteis</h3>
          <p>
            A contagem começa em 16/12 (terça). Contam 16, 17, 18 e 19/12: <strong>4 dias</strong>. De 20/12 a 20/01 o prazo
            fica suspenso. A contagem volta em 21/01/2026 e os 11 dias restantes terminam em
            <strong>04/02/2026, quarta-feira</strong>. Sem o recesso, o prazo venceria em 07/01/2026.
          </p>
        </section>

        <section>
          <h2>Feriados nacionais e dias sem expediente forense</h2>
          <div class="pro-segmented mb-3 max-w-xs" role="group" aria-label="Ano">
            @for (year of years(); track year) {
              <button type="button" [attr.aria-pressed]="tableYear() === year" (click)="tableYear.set(year)">{{ year }}</button>
            }
          </div>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead><tr><th scope="col">Data</th><th scope="col">Dia</th><th scope="col">Feriado</th><th scope="col">Tipo</th></tr></thead>
              <tbody>
                @for (h of holidayTable(); track h.day) {
                  <tr>
                    <td>{{ br(h.day) }}</td>
                    <td>{{ short(h.day) }}</td>
                    <td>{{ h.name }}</td>
                    <td class="text-foreground-light">{{ h.group === 'national' ? 'Nacional' : h.group === 'optional' ? 'Ponto facultativo' : 'Forense (Lei 5.010/66)' }}</td>
                  </tr>
                }
                <tr><td>20/12 a 20/01</td><td>–</td><td>Recesso e suspensão dos prazos</td><td class="text-foreground-light">CPC, art. 220</td></tr>
              </tbody>
            </table>
          </div>
          <p class="pro-hint mt-2">
            Carnaval e Corpus Christi são pontos facultativos, sem expediente na maioria dos tribunais. Os feriados da
            Lei 5.010/1966 (Semana Santa, 11/08, 01/11 e 08/12) valem na Justiça Federal e em vários tribunais estaduais.
            O Dia da Consciência Negra é feriado nacional desde 2024 (Lei 14.759/2023).
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
            <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm" target="_blank" rel="noopener">Código de Processo Civil (Lei 13.105/2015)</a>, arts. 183, 186, 219, 220, 224 e 229.</li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11419.htm" target="_blank" rel="noopener">Lei 11.419/2006</a> (processo eletrônico), art. 4º.</li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/leis/l5010.htm" target="_blank" rel="noopener">Lei 5.010/1966</a>, art. 62 (feriados da Justiça Federal).</li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/leis/l9099.htm" target="_blank" rel="noopener">Lei 9.099/1995</a>, art. 12-A (juizados especiais).</li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14759.htm" target="_blank" rel="noopener">Lei 14.759/2023</a> (Dia Nacional de Zumbi e da Consciência Negra).</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
})
export class DeadlineCalculatorComponent {
  readonly tool = proTools[2];
  readonly faq = FAQ;
  readonly presets = [5, 8, 10, 15, 30];
  readonly maxDays = MAX_DAYS;

  readonly todayNum = signal(today());
  readonly dje = signal(DEFAULTS.dje);
  readonly date = signal(formatBr(this.todayNum()));
  readonly days = signal(DEFAULTS.days);
  readonly mode = signal(DEFAULTS.mode);
  readonly double = signal(DEFAULTS.double);
  readonly optional = signal(DEFAULTS.optional);
  readonly forensic = signal(DEFAULTS.forensic);
  readonly recess = signal(DEFAULTS.recess);
  readonly custom = signal<string[]>(DEFAULTS.custom);
  readonly customText = signal('');
  readonly copied = signal(false);
  readonly timelineOpen = signal(false);
  readonly tableYear = signal(dayParts(this.todayNum()).year);

  readonly options = [
    { key: 'optional', label: 'Carnaval e Corpus Christi', hint: 'Pontos facultativos sem expediente na maioria dos tribunais', value: this.optional },
    { key: 'forensic', label: 'Semana Santa e feriados forenses', hint: 'Quarta e Quinta-feira Santas, 11/08, 01/11 e 08/12 (Lei 5.010/66, Justiça Federal)', value: this.forensic },
    { key: 'recess', label: 'Recesso de 20/12 a 20/01', hint: 'Suspensão dos prazos do art. 220 do CPC', value: this.recess },
  ];

  readonly startDay = computed(() => parseBrDate(this.date()));
  readonly dateInvalid = computed(() => this.date().length === 10 && this.startDay() === null);
  readonly isoDate = computed(() => {
    const day = this.startDay();
    return day === null ? '' : formatIso(day);
  });
  readonly customDays = computed(() =>
    [...new Set(this.custom().map(parseIso).filter((d): d is DayNum => d !== null))].sort((a, b) => a - b),
  );
  readonly customDay = computed(() => parseBrDate(this.customText()));

  private readonly input = computed<DeadlineInput | null>(() => {
    const start = this.startDay();
    if (start === null) return null;
    return {
      start,
      dje: this.dje(),
      days: this.days(),
      mode: this.mode(),
      double: this.double(),
      optional: this.optional(),
      forensic: this.forensic(),
      recess: this.recess(),
      custom: this.customDays(),
    };
  });

  readonly result = computed(() => {
    const input = this.input();
    return input ? computeDeadline(input) : null;
  });

  readonly rows = computed<TimelineRow[]>(() => compactTimeline(this.result()?.timeline ?? []));

  readonly status = computed(() => {
    const r = this.result();
    const input = this.input();
    if (!r || !input) return null;
    const diff = r.end - this.todayNum();
    if (diff < 0) return { tone: 'bad', short: 'Vencido', long: `venceu há ${diff === -1 ? '1 dia' : -diff + ' dias'}` };
    if (diff === 0) return { tone: 'warn', short: 'Vence hoje', long: 'vence hoje' };
    const business = businessDaysBetween(input, this.todayNum(), r.end);
    const long = `faltam ${diff === 1 ? '1 dia' : diff + ' dias'} (${business === 1 ? '1 útil' : business + ' úteis'})`;
    return { tone: diff <= 2 ? 'warn' : 'ok', short: 'No prazo', long };
  });

  readonly skippedText = computed(() => {
    const r = this.result();
    if (!r) return '';
    const counted = new Set(r.timeline.filter((t) => t.kind === 'counted').map((t) => t.day));
    const weekends = r.timeline.filter((t) => t.kind === 'weekend' && t.day >= r.firstCounted).length;
    const holidays = r.skipped.filter((s) => s.day >= r.firstCounted && !counted.has(s.day)).length;
    const recess = r.timeline.some((t) => t.kind === 'recess' || t.kind === 'suspended');
    return [
      weekends ? `${weekends} em fins de semana` : '',
      holidays ? `${holidays} ${holidays === 1 ? 'feriado' : 'feriados'}` : '',
      recess ? 'recesso' : '',
    ]
      .filter(Boolean)
      .join(', ');
  });

  readonly calendarSummary = computed(() => {
    const parts = ['Nacionais'];
    if (this.optional()) parts.push('Carnaval');
    if (this.forensic()) parts.push('JF');
    if (this.recess()) parts.push('recesso');
    if (this.customDays().length) parts.push(`+${this.customDays().length}`);
    return parts.join(' · ');
  });

  readonly years = computed(() => {
    const year = dayParts(this.todayNum()).year;
    return [year, year + 1];
  });
  readonly holidayTable = computed(() => holidaysOf(this.tableYear()));

  private readonly restored = signal(false);

  constructor() {
    useProToolSeo(this.tool, this.faq);
    afterNextRender(() => {
      this.todayNum.set(today());
      this.tableYear.set(dayParts(this.todayNum()).year);
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<State> | null;
        this.apply({ ...DEFAULTS, ...saved });
      } catch {
        this.apply(DEFAULTS);
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

  /** Selects the field on focus so typing replaces it, unless the user already started typing. */
  select(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value;
    setTimeout(() => {
      if (el.ownerDocument.activeElement === el && el.value === value) el.select();
    });
  }

  br(day: DayNum): string {
    return formatBr(day);
  }

  dm(day: DayNum): string {
    return formatBr(day).slice(0, 5);
  }

  short(day: DayNum): string {
    return weekdayShort(day);
  }

  cap(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  weekday(day: DayNum): string {
    return weekdayName(day);
  }

  setDay(day: DayNum): void {
    this.date.set(formatBr(day));
  }

  setDays(value: number): void {
    this.days.set(Math.min(MAX_DAYS, Math.max(1, Math.round(value) || 1)));
  }

  onDays(event: Event): void {
    const el = event.target as HTMLInputElement;
    const digits = el.value.replace(/\D/g, '').slice(0, 3);
    if (digits !== el.value) el.value = digits;
    this.days.set(Math.min(MAX_DAYS, Number(digits) || 0));
  }

  pickDate(event: Event): void {
    const day = parseIso((event.target as HTMLInputElement).value);
    if (day !== null) this.setDay(day);
  }

  openPicker(event: Event): void {
    const el = event.target as HTMLInputElement & { showPicker?: () => void };
    try {
      el.showPicker?.();
    } catch {
      /* not allowed: the browser opens its own picker */
    }
  }

  addCustom(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();
    const day = this.customDay();
    if (day === null) return;
    const iso = formatIso(day);
    if (!this.custom().includes(iso)) this.custom.set([...this.custom(), iso]);
    this.customText.set('');
  }

  removeCustom(day: DayNum): void {
    const iso = formatIso(day);
    this.custom.set(this.custom().filter((d) => d !== iso));
  }

  async copy(): Promise<void> {
    const r = this.result();
    if (!r) return;
    const counting = this.mode() === 'uteis' ? 'dias úteis (CPC, art. 219)' : 'dias corridos';
    const lines = [
      'Prazo processual',
      `${this.dje() ? 'Disponibilização no DJe' : 'Intimação'}: ${formatBr(r.start)} (${weekdayName(r.start)})`,
      ...(r.publication !== null ? [`Publicação: ${formatBr(r.publication)}`] : []),
      `Prazo: ${r.total} ${counting}${this.double() ? ', em dobro' : ''}`,
      `Início da contagem: ${formatBr(r.firstCounted)}`,
      `Último dia: ${formatBr(r.end)} (${weekdayName(r.end)})`,
      ...(r.skipped.length ? [`Feriados e suspensões no período: ${r.skipped.map((s) => `${formatBr(s.day).slice(0, 5)} ${s.label}`).join('; ')}`] : []),
      ...(r.timeline.some((t) => t.kind === 'recess' || t.kind === 'suspended') ? ['Considerada a suspensão de 20/12 a 20/01 (CPC, art. 220).'] : []),
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug} — confira o calendário do tribunal.`,
    ];
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  clear(): void {
    this.apply(DEFAULTS);
    this.customText.set('');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  private snapshot(): State {
    return {
      dje: this.dje(),
      date: this.date(),
      days: this.days(),
      mode: this.mode(),
      double: this.double(),
      optional: this.optional(),
      forensic: this.forensic(),
      recess: this.recess(),
      custom: this.custom(),
    };
  }

  private apply(state: State): void {
    this.dje.set(!!state.dje);
    this.date.set(state.date || formatBr(this.todayNum()));
    this.days.set(Number(state.days) || DEFAULTS.days);
    this.mode.set(state.mode === 'corridos' ? 'corridos' : 'uteis');
    this.double.set(!!state.double);
    this.optional.set(state.optional !== false);
    this.forensic.set(!!state.forensic);
    this.recess.set(state.recess !== false);
    this.custom.set(Array.isArray(state.custom) ? state.custom.filter((d) => typeof d === 'string') : []);
  }
}
