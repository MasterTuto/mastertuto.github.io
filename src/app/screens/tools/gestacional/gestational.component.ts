import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, input, model, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCalendar, tablerCheck, tablerCopy, tablerEraser } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { InputMaskDirective } from 'src/app/components/forms/input-mask.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  ConceptionKind,
  DayNumber,
  Method,
  PrenatalWindow,
  formatDateBR,
  formatWeeks,
  fromIsoDate,
  gestation,
  lmpFromConception,
  lmpFromUltrasound,
  parseDateBR,
  toIsoDate,
  today,
  weekdayBR,
} from './gestational.logic';

/** Masked dd/mm/aaaa field with a native calendar behind the icon (an invisible date input over it). */
@Component({
  selector: 'app-gest-date',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMaskDirective, NgIconComponent],
  providers: [provideIcons({ tablerCalendar })],
  template: `
    <div class="pro-input-wrap">
      <input [id]="inputId()" class="pro-input !pr-14" appMask="date" placeholder="dd/mm/aaaa" autocomplete="off"
        [value]="value()" (input)="value.set($any($event.target).value)"
        [attr.aria-invalid]="invalid()" [attr.aria-describedby]="invalid() ? inputId() + '-err' : null" />
      <span class="absolute right-1.5 grid h-10 w-10 place-items-center rounded-lg text-foreground-light hover:bg-foreground/5" data-flow-skip>
        <ng-icon name="tablerCalendar" size="1.25rem" aria-hidden="true" />
        <input type="date" tabindex="-1" class="absolute inset-0 h-full w-full cursor-pointer opacity-0" [attr.aria-label]="'Abrir calendário: ' + label()"
          [value]="iso()" (click)="openPicker($event)" (change)="fromPicker($event)" />
      </span>
    </div>
    @if (invalid()) {
      <p class="pro-error mt-1" [id]="inputId() + '-err'">Data inválida. Use dd/mm/aaaa.</p>
    }
  `,
})
export class GestDateFieldComponent {
  readonly value = model('');
  readonly inputId = input.required<string>();
  readonly label = input('');
  readonly invalid = computed(() => this.value().length === 10 && parseDateBR(this.value()) === null);
  readonly iso = computed(() => {
    const day = parseDateBR(this.value());
    return day === null ? '' : toIsoDate(day);
  });

  openPicker(event: Event): void {
    const el = event.target as HTMLInputElement & { showPicker?: () => void };
    try {
      el.showPicker?.();
    } catch {
      /* not allowed without a user gesture in some browsers */
    }
  }

  fromPicker(event: Event): void {
    const day = fromIsoDate((event.target as HTMLInputElement).value);
    if (day !== null) this.value.set(formatDateBR(day));
  }
}

const METHODS: { id: Method; label: string }[] = [
  { id: 'lmp', label: 'DUM' },
  { id: 'ultrasound', label: 'Ultrassom' },
  { id: 'conception', label: 'Concepção/FIV' },
];
const CONCEPTION: { id: ConceptionKind; label: string }[] = [
  { id: 'conception', label: 'Concepção' },
  { id: 'ivf3', label: 'FIV · embrião D3' },
  { id: 'ivf5', label: 'FIV · blastocisto D5' },
];

const DEFAULTS = {
  method: 'lmp' as Method,
  lmp: '',
  usDate: '',
  usWeeks: '',
  usDays: '',
  conceptionDate: '',
  conceptionKind: 'conception' as ConceptionKind,
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:gestacional';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular a data provável do parto (DPP)?',
    answer:
      'Pela regra de Naegele, some 280 dias (40 semanas) à data da última menstruação (DUM). Na prática: some 7 dias ao primeiro dia da DUM, subtraia 3 meses e some 1 ano. DUM em 01/01/2026 resulta em DPP em 08/10/2026.',
  },
  {
    question: 'DUM ou ultrassom: qual usar para datar a gestação?',
    answer:
      'O ultrassom do 1º trimestre (comprimento cabeça-nádega até 13s6d) é o método mais preciso. Pelas recomendações do ACOG, a datação pela DUM é mantida quando a diferença para o ultrassom é pequena (até 5 dias antes de 9 semanas e até 7 dias entre 9s e 13s6d); acima disso, prevalece o ultrassom.',
  },
  {
    question: 'Como calcular a idade gestacional em gestação por FIV?',
    answer:
      'Use a data da transferência: a DUM equivalente é a data da transferência menos 14 dias e menos a idade do embrião (3 dias para embrião D3, 5 dias para blastocisto D5). A DPP é essa DUM equivalente mais 280 dias, ou a transferência de D5 mais 261 dias.',
  },
  {
    question: 'Quando começa cada trimestre da gestação?',
    answer:
      'O 1º trimestre vai até 13 semanas e 6 dias, o 2º trimestre de 14s0d a 27s6d e o 3º trimestre a partir de 28 semanas. A gestação é a termo de 37s0d a 41s6d: termo precoce até 38s6d, termo completo de 39s0d a 40s6d e termo tardio a partir de 41s0d.',
  },
  {
    question: 'Quando fazer a vacina dTpa e o TOTG na gestação?',
    answer:
      'O Ministério da Saúde recomenda a dTpa a partir da 20ª semana, em cada gestação. O teste oral de tolerância à glicose de 75 g é feito entre 24 e 28 semanas nas gestantes sem diagnóstico prévio de diabetes.',
  },
];

@Component({
  selector: 'app-gestational',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, InputMaskDirective, NgIconComponent, GestDateFieldComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } .f > .pro-label { flex-direction: column; gap: .1rem; } }
    .bar { position: relative; height: .5rem; margin-top: 1.1rem; border-radius: 999px; background: rgb(255 255 255 / .14); }
    .bar > i { position: absolute; inset: 0 auto 0 0; border-radius: inherit; background: #a59cf0; }
    .bar > b { position: absolute; top: -.2rem; bottom: -.2rem; width: 1px; background: rgb(255 255 255 / .35); }
    .tl { position: relative; padding-left: 1.6rem; }
    .tl::before { content: ''; position: absolute; left: .45rem; top: 0; bottom: 0; width: 2px; background: rgb(68 74 81 / .12); }
    .tl li { position: relative; display: grid; gap: .1rem .75rem; padding: .7rem 0; border-bottom: 1px solid rgb(68 74 81 / .08); }
    @media (min-width: 640px) { .tl li { grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; } }
    .tl li::before { content: ''; position: absolute; left: -1.5rem; top: 1.05rem; width: .8rem; height: .8rem; border: 2px solid #8e9095; border-radius: 999px; background: rgb(244 242 242); }
    .tl li.past { opacity: .55; }
    .tl li.past::before { border-color: #8e9095; background: #8e9095; }
    .tl li.current::before { border-color: #7a70e1; background: #7a70e1; box-shadow: 0 0 0 4px rgb(122 112 225 / .2); }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Idade gestacional e data provável do parto pela DUM, por ultrassom ou pela data da concepção/FIV, com o
          trimestre e as datas das janelas dos principais exames do pré-natal, prontas para copiar no prontuário.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (result(); as r) {
              <span>IG <strong>{{ r.ageLabel }}</strong></span>
              <span>DPP <strong>{{ date(r.dueDate) }}</strong></span>
            } @else {
              <span>Informe a {{ method() === 'lmp' ? 'DUM' : 'data' }}</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <span class="pro-label" id="g-method">Calcular por</span>
              <div class="pro-segmented" role="group" aria-labelledby="g-method">
                @for (m of methods; track m.id) {
                  <button type="button" [attr.aria-pressed]="method() === m.id" (click)="method.set(m.id)">{{ m.label }}</button>
                }
              </div>
            </div>

            @switch (method()) {
              @case ('lmp') {
                <div class="f">
                  <label class="pro-label" for="g-lmp">DUM <small>1º dia da última menstruação</small></label>
                  <app-gest-date inputId="g-lmp" label="DUM" [(value)]="lmp" />
                </div>
              }
              @case ('ultrasound') {
                <div class="f">
                  <label class="pro-label" for="g-us-date">Data do exame</label>
                  <app-gest-date inputId="g-us-date" label="data do exame" [(value)]="usDate" />
                </div>
                <div class="f">
                  <label class="pro-label" for="g-us-weeks">IG no exame</label>
                  <div class="flex items-center gap-2">
                    <div class="pro-input-wrap w-28">
                      <input id="g-us-weeks" class="pro-input" appMask="00" autocomplete="off" [value]="usWeeks()" (input)="usWeeks.set(val($event))"
                        [attr.aria-invalid]="usWeeksInvalid()" />
                      <span class="pro-suffix">sem</span>
                    </div>
                    <span class="text-foreground-light" aria-hidden="true">+</span>
                    <div class="pro-input-wrap w-28">
                      <input class="pro-input" appMask="0" autocomplete="off" aria-label="Dias (0 a 6)" [value]="usDays()" (input)="usDays.set(val($event))"
                        [attr.aria-invalid]="usDaysInvalid()" />
                      <span class="pro-suffix">dias</span>
                    </div>
                  </div>
                </div>
              }
              @case ('conception') {
                <div class="f">
                  <span class="pro-label" id="g-kind">Tipo</span>
                  <div class="pro-chips" role="group" aria-labelledby="g-kind">
                    @for (k of conceptionKinds; track k.id) {
                      <button type="button" class="pro-chip" [attr.aria-pressed]="conceptionKind() === k.id" (click)="conceptionKind.set(k.id)">{{ k.label }}</button>
                    }
                  </div>
                </div>
                <div class="f">
                  <label class="pro-label" for="g-conc">{{ conceptionKind() === 'conception' ? 'Data da concepção' : 'Data da transferência' }}</label>
                  <app-gest-date inputId="g-conc" label="data" [(value)]="conceptionDate" />
                </div>
              }
            }

            <div class="f">
              <label class="pro-label" for="g-ref">Calcular para <small>data de referência</small></label>
              <div class="flex items-start gap-2">
                <app-gest-date class="min-w-0 flex-1" inputId="g-ref" label="data de referência" [(value)]="reference" />
                <button type="button" class="pro-chip !min-h-[48px]" [attr.aria-pressed]="isToday()" (click)="setToday()">Hoje</button>
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
          @if (result(); as r) {
            <div class="flex items-start justify-between gap-3">
              <p class="pro-result-label">Idade gestacional</p>
              @if (r.trimester) {
                <span class="pro-pill ok">{{ r.trimester }}º trimestre</span>
              }
            </div>
            <p class="pro-result-main">{{ weeks(r.ageDays) }}<small>sem</small> {{ restDays(r.ageDays) }}<small>d</small></p>
            <p class="pro-result-sub">em {{ date(r.reference) }} · DPP <strong>{{ date(r.dueDate) }}</strong> ({{ weekday(r.dueDate) }})</p>
            <div class="bar" role="img" [attr.aria-label]="'Progresso: ' + r.ageLabel + ' de 40 semanas'">
              <i [style.width.%]="r.progress * 100"></i>
              <b style="left: 35%"></b><b style="left: 70%"></b>
            </div>
            <div class="relative mt-1.5 h-4 text-[.7rem] opacity-60" aria-hidden="true">
              <span class="absolute left-0">0</span><span class="absolute left-[35%] -translate-x-1/2">14s</span>
              <span class="absolute left-[70%] -translate-x-1/2">28s</span><span class="absolute right-0">40s</span>
            </div>
            <dl class="pro-result-list">
              <div><dt>Data provável do parto</dt><dd>{{ date(r.dueDate) }}</dd></div>
              <div><dt>{{ r.daysToDue >= 0 ? 'Faltam' : 'Passou da DPP' }}</dt><dd>{{ abs(r.daysToDue) }} dias · {{ weeksLabel(abs(r.daysToDue)) }}</dd></div>
              @if (method() !== 'lmp') {
                <div><dt>DUM equivalente</dt><dd>{{ date(r.lmp) }}</dd></div>
              }
              <div><dt>Termo <small>37s–41s6d</small></dt><dd>{{ date(r.lmp + 259).slice(0, 5) }} a {{ date(r.lmp + 293) }}</dd></div>
            </dl>
            @for (w of r.warnings; track w) {
              <p class="mt-3 text-sm text-amber-200">{{ w }}</p>
            }
            <button type="button" class="pro-btn mt-4 w-full" (click)="copy()">
              <ng-icon [name]="copied() ? 'tablerCheck' : 'tablerCopy'" aria-hidden="true" />
              {{ copied() ? 'Copiado!' : 'Copiar para prontuário' }}
            </button>
          } @else {
            <p class="pro-result-label">Idade gestacional</p>
            <p class="pro-result-empty">{{ emptyHint() }}</p>
          }
        </aside>
      </div>

      @if (result(); as r) {
        <section class="mt-8 max-w-3xl" aria-labelledby="g-windows">
          <h2 id="g-windows" class="text-base font-semibold text-foreground">Janelas do pré-natal</h2>
          <p class="pro-hint mt-1">Datas calculadas a partir da {{ method() === 'lmp' ? 'DUM' : 'DUM equivalente' }} {{ date(r.lmp) }}.</p>
          <ol class="tl mt-3">
            @for (w of r.windows; track w.label) {
              <li [class]="w.state" [attr.aria-current]="w.state === 'current' ? 'step' : null">
                <div>
                  <p class="font-semibold text-foreground">
                    {{ w.label }}
                    @if (w.state === 'current') { <span class="pro-pill ok ml-1 align-middle">{{ w.end === w.start ? 'hoje' : 'agora' }}</span> }
                  </p>
                  <p class="text-sm text-foreground-light">{{ w.detail }} · {{ range(w) }}</p>
                </div>
                <p class="text-sm font-semibold tabular-nums text-foreground sm:text-right">{{ dates(w) }}</p>
              </li>
            }
          </ol>
        </section>
      }

      <p class="pro-notice max-w-3xl">
        <strong>Ferramenta de apoio.</strong> Não substitui o julgamento clínico nem a conduta do profissional. Confirme
        a datação pelo ultrassom do 1º trimestre e siga os protocolos da sua instituição. Os dados ficam só neste
        aparelho; use <em>Limpar</em> entre pacientes.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Escolha o método: DUM, ultrassom (data do exame e IG medida) ou data da concepção/transferência de embrião.</li>
            <li>Digite a data só com números: as barras entram sozinhas e o cursor avança. O ícone abre o calendário.</li>
            <li>A data de referência é hoje; troque para saber a IG em outro dia (ex.: data de um exame ou da consulta).</li>
            <li>Toque em <em>Copiar para prontuário</em> para levar IG, DPP e próximas janelas em texto simples.</li>
          </ol>
        </section>

        <section>
          <h2>Como o cálculo é feito</h2>
          <p>
            A idade gestacional é a diferença em dias entre a data de referência e a DUM, mostrada em semanas e dias.
            A <strong>DPP segue a regra de Naegele</strong>: DUM + 280 dias (40 semanas).
          </p>
          <ul>
            <li><strong>Ultrassom</strong>: DUM equivalente = data do exame − IG no exame.</li>
            <li><strong>Concepção</strong>: DUM equivalente = data da concepção − 14 dias.</li>
            <li><strong>FIV</strong>: DUM equivalente = data da transferência − idade do embrião (3 ou 5 dias) − 14 dias.</li>
          </ul>
          <h3>Exemplo</h3>
          <p>
            DUM em 01/01/2026: DPP = 01/01/2026 + 280 dias = <strong>08/10/2026</strong>. Em 23/06/2026 a gestante está com
            173 dias, ou <strong>24 semanas e 5 dias</strong>, no 2º trimestre e dentro da janela do TOTG.
          </p>
        </section>

        <section>
          <h2>Trimestres e termo</h2>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead><tr><th scope="col">Período</th><th scope="col">Idade gestacional</th></tr></thead>
              <tbody>
                <tr><td>1º trimestre</td><td>até 13s 6d</td></tr>
                <tr><td>2º trimestre</td><td>14s 0d a 27s 6d</td></tr>
                <tr><td>3º trimestre</td><td>a partir de 28s 0d</td></tr>
                <tr><td>Pré-termo</td><td>antes de 37s 0d</td></tr>
                <tr><td>Termo precoce</td><td>37s 0d a 38s 6d</td></tr>
                <tr><td>Termo completo</td><td>39s 0d a 40s 6d</td></tr>
                <tr><td>Termo tardio</td><td>41s 0d a 41s 6d</td></tr>
                <tr><td>Pós-termo</td><td>a partir de 42s 0d</td></tr>
              </tbody>
            </table>
          </div>
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
            <li>ACOG Committee Opinion 700 — Methods for Estimating the Due Date (2017) e 579 — Definition of Term Pregnancy.</li>
            <li>FEBRASGO — Manual de Assistência Pré-natal e protocolos de rastreamento do diabetes gestacional.</li>
            <li>Ministério da Saúde — Caderno de Atenção ao Pré-natal de Baixo Risco e Calendário Nacional de Vacinação da gestante.</li>
            <li>ACOG Committee Opinion 797 — Prevention of Group B Streptococcal Early-Onset Disease in Newborns (2020).</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
})
export class GestationalCalculatorComponent {
  readonly tool = proTools[4];
  readonly faq = FAQ;
  readonly methods = METHODS;
  readonly conceptionKinds = CONCEPTION;

  readonly method = signal(DEFAULTS.method);
  readonly lmp = signal(DEFAULTS.lmp);
  readonly usDate = signal(DEFAULTS.usDate);
  readonly usWeeks = signal(DEFAULTS.usWeeks);
  readonly usDays = signal(DEFAULTS.usDays);
  readonly conceptionDate = signal(DEFAULTS.conceptionDate);
  readonly conceptionKind = signal(DEFAULTS.conceptionKind);
  /** Empty until the browser fills in today's date. */
  readonly reference = signal('');
  readonly copied = signal(false);

  readonly usWeeksInvalid = computed(() => this.usWeeks() !== '' && !(Number(this.usWeeks()) >= 4 && Number(this.usWeeks()) <= 42));
  readonly usDaysInvalid = computed(() => this.usDays() !== '' && !(Number(this.usDays()) <= 6));

  readonly lmpDay = computed<DayNumber | null>(() => {
    switch (this.method()) {
      case 'lmp':
        return parseDateBR(this.lmp());
      case 'ultrasound': {
        const exam = parseDateBR(this.usDate());
        if (exam === null || this.usWeeks() === '' || this.usWeeksInvalid() || this.usDaysInvalid()) return null;
        return lmpFromUltrasound(exam, Number(this.usWeeks()), Number(this.usDays() || 0));
      }
      case 'conception': {
        const date = parseDateBR(this.conceptionDate());
        return date === null ? null : lmpFromConception(date, this.conceptionKind());
      }
    }
  });
  readonly referenceDay = computed(() => parseDateBR(this.reference()));

  readonly result = computed(() => {
    const lmp = this.lmpDay();
    const reference = this.referenceDay();
    return lmp === null || reference === null ? null : gestation(lmp, reference);
  });

  readonly emptyHint = computed(() =>
    this.method() === 'lmp'
      ? 'Digite a data da última menstruação para ver a IG, a DPP e as janelas do pré-natal.'
      : this.method() === 'ultrasound'
        ? 'Informe a data do ultrassom e a IG medida no exame.'
        : 'Informe a data da concepção ou da transferência do embrião.',
  );

  private readonly restored = signal(false);
  private todayDay: DayNumber | null = null;
  private copiedTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    useProToolSeo(this.tool, this.faq);
    afterNextRender(() => {
      this.todayDay = today();
      this.reference.set(formatDateBR(this.todayDay));
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

  date(day: DayNumber): string {
    return formatDateBR(day);
  }

  weekday(day: DayNumber): string {
    return weekdayBR(day);
  }

  weeks(days: number): number {
    return Math.floor(Math.max(0, days) / 7);
  }

  restDays(days: number): number {
    return Math.max(0, days) % 7;
  }

  weeksLabel(days: number): string {
    return formatWeeks(days);
  }

  abs(value: number): number {
    return Math.abs(value);
  }

  isToday(): boolean {
    return this.todayDay !== null && this.referenceDay() === this.todayDay;
  }

  setToday(): void {
    this.todayDay = today();
    this.reference.set(formatDateBR(this.todayDay));
  }

  range(w: PrenatalWindow): string {
    if (w.endDays === null) return `a partir de ${formatWeeks(w.startDays)}`;
    if (w.endDays === w.startDays) return formatWeeks(w.startDays);
    return `${formatWeeks(w.startDays)} a ${formatWeeks(w.endDays)}`;
  }

  dates(w: PrenatalWindow): string {
    if (w.end === null) return `desde ${formatDateBR(w.start)}`;
    if (w.end === w.start) return formatDateBR(w.start);
    return `${formatDateBR(w.start).slice(0, 5)} a ${formatDateBR(w.end)}`;
  }

  recordText(): string {
    const r = this.result();
    if (!r) return '';
    const basis =
      this.method() === 'lmp'
        ? `DUM ${formatDateBR(r.lmp)}`
        : this.method() === 'ultrasound'
          ? `USG de ${this.usDate()} com IG ${Number(this.usWeeks())}s ${Number(this.usDays() || 0)}d (DUM equivalente ${formatDateBR(r.lmp)})`
          : `${CONCEPTION.find((k) => k.id === this.conceptionKind())?.label} em ${this.conceptionDate()} (DUM equivalente ${formatDateBR(r.lmp)})`;
    const state = { past: 'realizada/encerrada', current: 'em curso', future: 'a seguir' };
    const lines = [
      `IG: ${r.ageLabel} em ${formatDateBR(r.reference)}${r.trimester ? ` (${r.trimester}º trimestre)` : ''}`,
      `DPP: ${formatDateBR(r.dueDate)} (Naegele)`,
      `Base: ${basis}`,
      '',
      'Janelas do pré-natal:',
      ...r.windows
        .filter((w) => w.state !== 'past')
        .map((w) => `- ${w.label}: ${this.range(w)} (${this.dates(w)}) — ${state[w.state]}`),
    ];
    return lines.join('\n');
  }

  async copy(): Promise<void> {
    const text = this.recordText();
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
    this.apply({ ...DEFAULTS, method: this.method() });
    this.setToday();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    const first = { lmp: 'g-lmp', ultrasound: 'g-us-date', conception: 'g-conc' }[this.method()];
    document.getElementById(first)?.focus();
  }

  private snapshot(): State {
    return {
      method: this.method(),
      lmp: this.lmp(),
      usDate: this.usDate(),
      usWeeks: this.usWeeks(),
      usDays: this.usDays(),
      conceptionDate: this.conceptionDate(),
      conceptionKind: this.conceptionKind(),
    };
  }

  private apply(state: State): void {
    this.method.set(state.method);
    this.lmp.set(state.lmp);
    this.usDate.set(state.usDate);
    this.usWeeks.set(state.usWeeks);
    this.usDays.set(state.usDays);
    this.conceptionDate.set(state.conceptionDate);
    this.conceptionKind.set(state.conceptionKind);
  }
}
