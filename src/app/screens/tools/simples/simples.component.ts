import { ChangeDetectionStrategy, Component, afterNextRender, computed, effect, signal, WritableSignal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus } from '@ng-icons/tabler-icons';

import { FormFlowDirective } from 'src/app/components/forms/form-flow.directive';
import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { FaqItem, useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';
import {
  ANNEXES,
  AnnexId,
  FATOR_R_MIN,
  LIMIT,
  SUBLIMIT,
  TAX_NAMES,
  annexByFatorR,
  computeSimples,
  fatorR,
  formatMoneyTyping,
  moneyField,
  parseMoney,
  proportionalRbt12,
} from './simples.logic';

type Choice = AnnexId | 'R';

const CHOICES: { id: Choice; label: string; short: string; hint: string }[] = [
  { id: 'I', label: 'I', short: 'Comércio', hint: 'Anexo I · comércio e revenda de mercadorias.' },
  { id: 'II', label: 'II', short: 'Indústria', hint: 'Anexo II · fabricação e industrialização.' },
  { id: 'III', label: 'III', short: 'Serviços', hint: 'Anexo III · serviços fixos no anexo, como manutenção, agências de viagem, academias, contabilidade e locação de bens móveis.' },
  { id: 'IV', label: 'IV', short: 'Obras e limpeza', hint: 'Anexo IV · construção civil, vigilância, limpeza e advocacia. A CPP (20% sobre a folha) é paga fora do DAS.' },
  { id: 'V', label: 'V', short: 'Serviços', hint: 'Anexo V · serviços fixos no Anexo V, como auditoria, jornalismo e publicidade.' },
  { id: 'R', label: 'III ou V', short: 'Fator R', hint: 'Medicina, odontologia, engenharia, arquitetura, TI, consultoria e outras do art. 18, §§ 5º-J e 5º-M. Fator R ≥ 28% → Anexo III; abaixo → Anexo V.' },
];

const DEFAULTS = {
  choice: 'R' as Choice,
  young: false,
  months: 3,
  rbt12: '300.000',
  previous: '60.000',
  revenue: '25.000',
  payroll: '90.000',
};
type State = typeof DEFAULTS;
const STORAGE_KEY = 'brenocs:tools:simples';

const FAQ: FaqItem[] = [
  {
    question: 'Como calcular a alíquota efetiva do Simples Nacional?',
    answer:
      'Alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12. A alíquota nominal e a parcela a deduzir vêm da faixa do anexo em que a receita bruta dos últimos 12 meses (RBT12) se encaixa. O DAS do mês é a receita do mês multiplicada pela alíquota efetiva.',
  },
  {
    question: 'O que é o Fator R e quando ele se aplica?',
    answer:
      'Fator R é a folha de salários dos últimos 12 meses (salários, pró-labore, FGTS e INSS patronal) dividida pela RBT12. Para as atividades dos §§ 5º-J e 5º-M do art. 18 da LC 123, se o Fator R for igual ou maior que 28% a empresa é tributada no Anexo III; abaixo disso, no Anexo V, que é bem mais caro.',
  },
  {
    question: 'Como calcular o Simples no primeiro ano de atividade?',
    answer:
      'No primeiro mês, a RBT12 é a receita do próprio mês multiplicada por 12. Do segundo ao 12º mês, é a média da receita dos meses anteriores multiplicada por 12 (LC 123, art. 18, §§ 1º-A e 2º). A folha para o Fator R é proporcionalizada da mesma forma.',
  },
  {
    question: 'O que acontece quando a receita passa de R$ 3,6 milhões?',
    answer:
      'R$ 3,6 milhões é o sublimite estadual e municipal: acima dele, o ICMS e o ISS deixam de ser recolhidos no DAS e passam a ser pagos pelas regras normais, enquanto os tributos federais continuam no Simples até R$ 4,8 milhões. Acima de R$ 4,8 milhões no ano, a empresa é excluída do Simples Nacional.',
  },
  {
    question: 'O que é a parcela a deduzir?',
    answer:
      'É um valor fixo de cada faixa que torna a tributação progressiva: a alíquota nominal maior só pesa sobre a parte da receita que passou do limite da faixa anterior. Por isso a alíquota efetiva cresce aos poucos, sem saltos na mudança de faixa.',
  },
];

@Component({
  selector: 'app-simples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent, FormFlowDirective, NgIconComponent],
  providers: [provideIcons({ tablerCheck, tablerCopy, tablerEraser, tablerMinus, tablerPlus })],
  styles: `
    .f { display: grid; gap: .55rem; padding: .85rem 0; border-top: 1px solid rgb(68 74 81 / .12); }
    .f:first-child { border-top: 0; padding-top: 0; }
    @media (min-width: 640px) { .f { grid-template-columns: 9.5rem minmax(0, 1fr); align-items: center; gap: 1rem; } }
    .step { display: inline-flex; align-items: center; border: 1px solid rgb(68 74 81 / .15); border-radius: 999px; background: rgb(244 242 242); }
    .step button { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; }
    .step button:hover { background: rgb(68 74 81 / .07); }
    .step output { min-width: 2.25rem; text-align: center; font-weight: 650; font-variant-numeric: tabular-nums; }
    .money .pro-input { padding-left: 2.6rem; padding-right: .9rem; }
    .money > span { position: absolute; left: .9rem; pointer-events: none; color: #8e9095; font-size: .9rem; font-weight: 550; }
    .anx { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 52px; padding-inline: .4rem; line-height: 1.15; border-radius: .9rem; }
    .anx small { font-weight: 450; font-size: .72rem; opacity: .75; }
    tr.on td { background: rgb(122 112 225 / .1); font-weight: 650; }
    details > summary::-webkit-details-marker { display: none; }
  `,
  template: `
    <article class="pro-tool" lang="pt-BR">
      <header class="pro-hero">
        <h1>{{ tool.name }}</h1>
        <p>
          Informe o anexo, a receita bruta dos últimos 12 meses e a receita do mês: a calculadora aplica as tabelas da
          LC 123/2006 (redação da LC 155/2016), calcula a alíquota efetiva, o valor do DAS e o Fator R dos Anexos III e V.
        </p>
        <div class="pro-badges"><span>Grátis</span><span>Sem cadastro</span><span>Funciona no celular</span></div>
      </header>

      <div class="pro-layout">
        <div class="min-w-0">
          <div class="pro-sticky-summary mb-3" aria-hidden="true">
            @if (result(); as r) {
              <span>DAS · {{ r.annex.name }}</span>
              <strong>{{ money(r.das) }}</strong>
              <span class="text-xs opacity-80">{{ pct(r.effective) }}</span>
            } @else {
              <span>Valor do DAS</span><strong>–</strong>
            }
          </div>

          <div appFormFlow>
            <div class="f">
              <span class="pro-label" id="sn-annex">Anexo</span>
              <div class="min-w-0">
                <div class="grid grid-cols-3 gap-2 sm:grid-cols-6" role="group" aria-labelledby="sn-annex">
                  @for (c of choices; track c.id) {
                    <button type="button" class="pro-chip anx" [attr.aria-pressed]="choice() === c.id" (click)="choice.set(c.id)">
                      {{ c.label }} <small>{{ c.short }}</small>
                    </button>
                  }
                </div>
                <p class="pro-hint mt-1.5">{{ choiceHint() }}</p>
              </div>
            </div>

            <div class="f">
              <span class="pro-label" id="sn-age">Atividade</span>
              <div class="pro-segmented" role="group" aria-labelledby="sn-age">
                <button type="button" [attr.aria-pressed]="!young()" (click)="young.set(false)">12 meses ou mais</button>
                <button type="button" [attr.aria-pressed]="young()" (click)="young.set(true)">Menos de 12 meses</button>
              </div>
            </div>

            @if (young()) {
              <div class="f">
                <span class="pro-label" id="sn-months">Meses anteriores <small class="sm:hidden">antes deste</small></span>
                <div class="flex items-center gap-3">
                  <div class="step" role="group" aria-labelledby="sn-months">
                    <button type="button" aria-label="Menos um mês" (click)="months.set(clamp(months() - 1, 0, 11))"><ng-icon name="tablerMinus" /></button>
                    <output aria-live="polite">{{ months() }}</output>
                    <button type="button" aria-label="Mais um mês" (click)="months.set(clamp(months() + 1, 0, 11))"><ng-icon name="tablerPlus" /></button>
                  </div>
                  <span class="pro-hint">{{ months() === 0 ? 'Primeiro mês: RBT12 = receita do mês × 12' : 'RBT12 = média desses meses × 12' }}</span>
                </div>
              </div>
              @if (months() > 0) {
                <div class="f">
                  <label class="pro-label" for="sn-prev">Receita desses {{ months() }} {{ months() === 1 ? 'mês' : 'meses' }}</label>
                  <div class="pro-input-wrap money">
                    <span>R$</span>
                    <input id="sn-prev" class="pro-input" inputmode="decimal" autocomplete="off" [value]="previous()" (input)="onMoney(previous, $event)" (blur)="tidy(previous)" (focus)="select($event)" />
                  </div>
                </div>
              }
            } @else {
              <div class="f">
                <label class="pro-label" for="sn-rbt">RBT12 <small>receita bruta dos últimos 12 meses</small></label>
                <div class="min-w-0">
                  <div class="pro-input-wrap money">
                    <span>R$</span>
                    <input id="sn-rbt" class="pro-input" inputmode="decimal" autocomplete="off" [value]="rbt12()" (input)="onMoney(rbt12, $event)" (blur)="tidy(rbt12)" (focus)="select($event)"
                      [attr.aria-invalid]="rbtValue() > limit" aria-describedby="sn-rbt-hint" />
                  </div>
                  <p id="sn-rbt-hint" class="pro-hint mt-1.5">Sem contar o mês que está sendo apurado.</p>
                </div>
              </div>
            }

            <div class="f">
              <label class="pro-label" for="sn-month">Receita do mês</label>
              <div class="min-w-0">
                <div class="pro-input-wrap money">
                  <span>R$</span>
                  <input id="sn-month" class="pro-input" inputmode="decimal" autocomplete="off" [value]="revenue()" (input)="onMoney(revenue, $event)" (blur)="tidy(revenue)" (focus)="select($event)" />
                </div>
                @if (!young() && rbtValue() > 0) {
                  <div class="pro-chips mt-2">
                    <button type="button" class="pro-chip !min-h-[34px] !px-3 !py-1" [attr.aria-pressed]="revenueValue() === average()" (click)="revenue.set(field(average()))">
                      Média: {{ money(average()) }}
                    </button>
                  </div>
                }
              </div>
            </div>

            @if (choice() === 'R') {
              <div class="f">
                <label class="pro-label" for="sn-payroll">
                  Folha {{ young() ? (months() === 0 ? 'do mês' : 'desses meses') : '12 meses' }}
                  <small class="sm:block">salários, pró-labore, FGTS e INSS</small>
                </label>
                <div class="min-w-0">
                  <div class="pro-input-wrap money">
                    <span>R$</span>
                    <input id="sn-payroll" class="pro-input" inputmode="decimal" autocomplete="off" [value]="payroll()" (input)="onMoney(payroll, $event)" (blur)="tidy(payroll)" (focus)="select($event)" />
                  </div>
                  @if (factor(); as f) {
                    <div class="mt-3" aria-hidden="true">
                      <div class="relative h-2 rounded-full bg-foreground/10">
                        <div class="h-2 rounded-full transition-[width]" [class]="f.value >= minFactor ? 'bg-green-600' : 'bg-amber-500'" [style.width.%]="min(100, f.value * 200)"></div>
                        <div class="absolute -top-1 h-4 w-0.5 bg-foreground" style="left: 56%"></div>
                      </div>
                      <div class="relative mt-1 h-4 text-xs text-foreground-light"><span class="absolute left-0">0%</span><span class="absolute left-[56%] -translate-x-1/2">28%</span><span class="absolute right-0">50%</span></div>
                    </div>
                    <p class="mt-1 text-sm text-foreground">
                      Fator R <strong class="tabular-nums">{{ pct(f.value) }}</strong> →
                      <strong>{{ f.annex === 'III' ? 'Anexo III' : 'Anexo V' }}</strong>
                      @if (f.annex === 'V') { <span class="text-foreground-light"> · faltam {{ money(f.missing) }} de folha em 12 meses</span> }
                    </p>
                  }
                </div>
              </div>
            }
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
              <p class="pro-result-label">Valor do DAS</p>
              <span class="pro-pill" [class.ok]="!r.overSublimit" [class.warn]="r.overSublimit">{{ r.annex.name }} · {{ r.bracket + 1 }}ª faixa</span>
            </div>
            <p class="pro-result-main">{{ money(r.das) }}</p>
            <p class="pro-result-sub">Alíquota efetiva de <strong>{{ pct(r.effective, 4) }}</strong> sobre {{ money(r.revenue) }}</p>
            <dl class="pro-result-list">
              <div><dt>RBT12{{ young() ? ' proporcional' : '' }}</dt><dd>{{ money(r.rbt12) }}</dd></div>
              <div><dt>Faixa</dt><dd>{{ bracketRange(r.bracket) }}</dd></div>
              <div><dt>Alíquota nominal</dt><dd>{{ pct(r.nominal) }}</dd></div>
              <div><dt>Parcela a deduzir</dt><dd>{{ money(r.deduction) }}</dd></div>
              @if (factor(); as f) {
                <div><dt>Fator R</dt><dd>{{ pct(f.value) }} → Anexo {{ f.annex }}</dd></div>
              }
            </dl>
            @if (r.overSublimit) {
              <p class="mt-3 text-sm leading-relaxed opacity-80">RBT12 acima de R$ 3,6 milhões (sublimite): o {{ r.annex.id === 'I' || r.annex.id === 'II' ? 'ICMS' : 'ISS' }} sai do DAS e é pago pelas regras normais.</p>
            }
            @if (r.annex.id === 'IV') {
              <p class="mt-3 text-sm leading-relaxed opacity-80">No Anexo IV a CPP (INSS patronal de 20% sobre a folha) é paga fora do DAS, em GPS/DCTFWeb.</p>
            }
            <div class="mt-4 flex flex-wrap gap-2">
              <button type="button" class="pro-btn" (click)="copy()">
                <ng-icon [name]="copied() ? 'tablerCheck' : 'tablerCopy'" aria-hidden="true" /> {{ copied() ? 'Copiado' : 'Copiar resumo' }}
              </button>
            </div>
          } @else {
            <p class="pro-result-label">Valor do DAS</p>
            @if (rbtValue() > limit) {
              <p class="pro-result-main">–</p>
              <p class="pro-result-empty">
                RBT12 acima de R$ 4,8 milhões: fora das faixas do Simples Nacional. Se a receita do ano-calendário passou
                desse limite, a empresa é excluída (LC 123, art. 3º, §§ 9º a 10, e art. 30).
              </p>
            } @else {
              <p class="pro-result-empty">
                {{ young() ? 'Informe a receita do mês (e a dos meses anteriores, se houver).' : 'Informe a receita bruta dos últimos 12 meses. Empresa aberta há menos de um ano? Escolha "Menos de 12 meses".' }}
              </p>
            }
          }
        </aside>

        @if (result(); as r) {
          <div class="min-w-0">
            @if (comparison(); as c) {
              <section class="border-t border-foreground/10 py-5" aria-labelledby="sn-compare">
                <h2 id="sn-compare" class="font-semibold text-foreground">Anexo III × Anexo V</h2>
                <div class="mt-3 grid grid-cols-2 divide-x divide-foreground/10">
                  @for (side of c.sides; track side.id) {
                    <div class="px-3 first:pl-0" [class.opacity-60]="side.id !== r.annex.id">
                      <p class="text-sm text-foreground-light">Anexo {{ side.id }} {{ side.id === r.annex.id ? '· aplicado' : '' }}</p>
                      <p class="mt-1 text-2xl font-bold tabular-nums tracking-tight text-foreground">{{ money(side.das) }}</p>
                      <p class="text-sm tabular-nums text-foreground-light">{{ pct(side.effective) }} efetiva</p>
                    </div>
                  }
                </div>
                <p class="mt-3 text-sm leading-relaxed text-foreground">
                  @if (c.applied === 'III') {
                    Com Fator R de {{ pct(c.factor) }}, o Anexo III economiza <strong>{{ money(c.saving) }}</strong> neste mês.
                    A folha pode cair até {{ money(c.needed) }} em 12 meses sem perder o benefício.
                  } @else {
                    No Anexo III o DAS seria <strong>{{ money(c.saving) }} menor</strong> neste mês. Para chegar a 28%, a folha de 12 meses
                    precisa ser de {{ money(c.needed) }}: faltam <strong>{{ money(c.missing) }}</strong>, cerca de {{ money(c.missing / 12) }} por mês
                    (por exemplo, aumentando o pró-labore, que tem INSS de 11% e IRPF).
                  }
                </p>
              </section>
            }

            <section class="border-t border-foreground/10 py-5" aria-labelledby="sn-split">
              <h2 id="sn-split" class="font-semibold text-foreground">Repartição dos tributos no DAS</h2>
              <div class="pro-table-scroll mt-2">
                <table class="pro-table">
                  <thead><tr><th scope="col">Tributo</th><th scope="col">% do DAS</th><th scope="col">Alíquota</th><th scope="col" class="!text-right">Valor</th></tr></thead>
                  <tbody>
                    @for (s of r.split; track s.tax) {
                      <tr><td>{{ taxName(s.tax) }}</td><td>{{ num(s.percent, 2) }}%</td><td>{{ pct(s.rate, 3) }}</td><td class="text-right">{{ money(s.value) }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
              @if (r.issCapped) {
                <p class="pro-hint mt-2">O ISS foi limitado a 5% da receita e a diferença distribuída aos tributos federais (nota da 5ª faixa).</p>
              }
            </section>
          </div>
        }
      </div>

      <p class="pro-notice max-w-3xl">
        <strong>Estimativa para conferência.</strong> O valor oficial é o apurado no PGDAS-D. Receitas de exportação, ICMS
        por substituição tributária, monofásicos (PIS/Cofins), ISS retido ou fixo e atividades em mais de um anexo mudam
        o cálculo: nesses casos a receita é segregada e cada parcela usa o seu anexo.
      </p>

      <div class="pro-reading">
        <section>
          <h2>Como usar</h2>
          <ol>
            <li>Escolha o anexo da atividade. Para medicina, engenharia, TI, consultoria e as demais atividades sujeitas ao Fator R, escolha <strong>III ou V</strong>.</li>
            <li>Digite a RBT12: a soma das receitas brutas dos 12 meses anteriores ao mês de apuração.</li>
            <li>Digite a receita do mês. O botão <em>Média</em> preenche RBT12 ÷ 12 para uma estimativa rápida.</li>
            <li>No Fator R, informe a folha dos 12 meses com pró-labore, FGTS e INSS: o anexo aplicado aparece na hora.</li>
          </ol>
        </section>

        <section>
          <h2>Fórmula da alíquota efetiva</h2>
          <p><strong>Alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12</strong> e <strong>DAS = receita do mês × alíquota efetiva</strong>.</p>
          <h3>Exemplo: serviços do Anexo III com RBT12 de R$ 300.000,00</h3>
          <p>
            R$ 300.000 está na 2ª faixa (de R$ 180.000,01 a R$ 360.000), com alíquota nominal de 11,2% e parcela a deduzir de
            R$ 9.360. Alíquota efetiva = (300.000 × 11,2% − 9.360) ÷ 300.000 = (33.600 − 9.360) ÷ 300.000 =
            <strong>8,08%</strong>. Com receita de R$ 25.000 no mês, o DAS é de <strong>R$ 2.020,00</strong>.
          </p>
          <p>
            O <strong>Fator R</strong> é a folha dos últimos 12 meses dividida pela RBT12. Com folha de R$ 90.000, o Fator R é
            30% (≥ 28%) e a empresa fica no Anexo III. Com folha de R$ 60.000 (20%), cairia no Anexo V: alíquota efetiva de
            16,5% e DAS de R$ 4.125,00.
          </p>
        </section>

        <section>
          <h2>Tabelas dos anexos do Simples Nacional</h2>
          <div class="pro-segmented mb-3 max-w-md" role="group" aria-label="Anexo da tabela">
            @for (id of annexIds; track id) {
              <button type="button" [attr.aria-pressed]="tableAnnex() === id" (click)="tableAnnex.set(id)">{{ id }}</button>
            }
          </div>
          <p class="pro-hint mb-2">{{ annexes[tableAnnex()].name }} · {{ annexes[tableAnnex()].short }}</p>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead><tr><th scope="col">Faixa</th><th scope="col">RBT12 até</th><th scope="col">Alíquota</th><th scope="col">Parcela a deduzir</th></tr></thead>
              <tbody>
                @for (b of annexes[tableAnnex()].brackets; track b.limit; let i = $index) {
                  <tr [class.on]="result()?.annex?.id === tableAnnex() && result()?.bracket === i">
                    <td>{{ i + 1 }}ª</td><td>{{ money(b.limit) }}</td><td>{{ pct(b.rate) }}</td><td>{{ money(b.deduction) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <h3>Percentual de repartição dos tributos</h3>
          <div class="pro-table-scroll">
            <table class="pro-table">
              <thead>
                <tr>
                  <th scope="col">Faixa</th>
                  @for (tax of annexes[tableAnnex()].taxes; track tax) { <th scope="col">{{ tax === 'PIS' ? 'PIS' : tax }}</th> }
                </tr>
              </thead>
              <tbody>
                @for (b of annexes[tableAnnex()].brackets; track b.limit; let i = $index) {
                  <tr>
                    <td>{{ i + 1 }}ª</td>
                    @for (tax of annexes[tableAnnex()].taxes; track tax) { <td>{{ b.split[tax] ? num(b.split[tax]!, 2) + '%' : '–' }}</td> }
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <p class="pro-hint mt-2">
            Na 6ª faixa o ICMS e o ISS são recolhidos fora do DAS. Nos Anexos III e IV, o ISS efetivo da 5ª faixa é limitado
            a 5%, e a diferença vai para os tributos federais. No Anexo IV a CPP é paga fora do DAS.
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
            <li><a href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm" target="_blank" rel="noopener">Lei Complementar 123/2006</a>, arts. 3º, 18 e Anexos I a V.</li>
            <li><a href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp155.htm" target="_blank" rel="noopener">Lei Complementar 155/2016</a>, que trouxe as tabelas em vigor desde 2018.</li>
            <li>Resolução CGSN nº 140/2018 (regulamento do Simples Nacional), arts. 21 a 26.</li>
          </ul>
        </section>
      </div>

      <app-pro-tool-footer [slug]="tool.slug" />
    </article>
  `,
})
export class SimplesCalculatorComponent {
  readonly tool = proTools[3];
  readonly faq = FAQ;
  readonly choices = CHOICES;
  readonly annexes = ANNEXES;
  readonly annexIds: AnnexId[] = ['I', 'II', 'III', 'IV', 'V'];
  readonly limit = LIMIT;
  readonly minFactor = FATOR_R_MIN;

  readonly choice = signal<Choice>(DEFAULTS.choice);
  readonly young = signal(DEFAULTS.young);
  readonly months = signal(DEFAULTS.months);
  readonly rbt12 = signal(DEFAULTS.rbt12);
  readonly previous = signal(DEFAULTS.previous);
  readonly revenue = signal(DEFAULTS.revenue);
  readonly payroll = signal(DEFAULTS.payroll);
  readonly copied = signal(false);
  readonly tableAnnex = signal<AnnexId>('III');

  readonly choiceHint = computed(() => CHOICES.find((c) => c.id === this.choice())?.hint ?? '');
  readonly revenueValue = computed(() => this.parsed(this.revenue()));
  readonly rbtValue = computed(() => {
    if (!this.young()) return this.parsed(this.rbt12());
    return proportionalRbt12(this.months(), this.parsed(this.previous()), this.revenueValue());
  });
  readonly average = computed(() => Math.round((this.rbtValue() / 12) * 100) / 100);
  /** Payroll over 12 months, annualized like the RBT12 for young companies. */
  readonly payrollValue = computed(() => {
    const value = this.parsed(this.payroll());
    if (!this.young()) return value;
    return this.months() === 0 ? value * 12 : (value / this.months()) * 12;
  });

  readonly factor = computed(() => {
    if (this.choice() !== 'R') return null;
    const rbt = this.rbtValue();
    if (!(rbt > 0) || rbt > LIMIT) return null;
    const value = fatorR(this.payrollValue(), rbt);
    const needed = rbt * FATOR_R_MIN;
    return { value, annex: annexByFatorR(this.payrollValue(), rbt), needed, missing: Math.max(0, needed - this.payrollValue()) };
  });

  readonly result = computed(() => {
    const annex: AnnexId = this.factor()?.annex ?? (this.choice() === 'R' ? 'V' : (this.choice() as AnnexId));
    return computeSimples(annex, this.rbtValue(), this.revenueValue());
  });

  readonly comparison = computed(() => {
    const f = this.factor();
    const r = this.result();
    if (!f || !r) return null;
    const iii = computeSimples('III', r.rbt12, r.revenue);
    const v = computeSimples('V', r.rbt12, r.revenue);
    if (!iii || !v) return null;
    return {
      applied: f.annex,
      factor: f.value,
      needed: f.needed,
      missing: f.missing,
      saving: v.das - iii.das,
      sides: [
        { id: 'III' as AnnexId, das: iii.das, effective: iii.effective },
        { id: 'V' as AnnexId, das: v.das, effective: v.effective },
      ],
    };
  });

  private readonly restored = signal(false);
  private readonly money$ = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

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
    effect(() => {
      const annex = this.result()?.annex.id;
      if (annex) this.tableAnnex.set(annex);
    });
  }

  onMoney(target: WritableSignal<string>, event: Event): void {
    const el = event.target as HTMLInputElement;
    const before = el.value;
    const caret = el.selectionStart ?? before.length;
    const atEnd = caret >= before.length;
    const typedDot = (event as InputEvent).data === '.' && atEnd;
    const after = before.slice(caret).replace(/[^\d,]/g, '').length;
    const formatted = formatMoneyTyping(before, typedDot);
    if (formatted !== before) {
      el.value = formatted;
      let pos = formatted.length;
      for (let seen = 0; pos > 0 && seen < after; pos--) if (/[\d,]/.test(formatted[pos - 1])) seen++;
      if (!atEnd) el.setSelectionRange(pos, pos);
    }
    target.set(formatted);
  }

  /** Selects the field on focus so typing replaces it, unless the user already started typing. */
  /** On blur, completes the cents ("1.234,5" → "1.234,50"). */
  tidy(target: WritableSignal<string>): void {
    const value = parseMoney(target());
    if (Number.isFinite(value)) target.set(moneyField(value));
  }

  /** Selects the field on focus so typing replaces it, unless the user already started typing. */
  select(event: Event): void {
    const el = event.target as HTMLInputElement;
    const value = el.value;
    setTimeout(() => {
      if (el.ownerDocument.activeElement === el && el.value === value) el.select();
    });
  }

  clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }

  field(value: number): string {
    return moneyField(value);
  }

  money(value: number): string {
    return this.money$.format(value);
  }

  num(value: number, digits = 2): string {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }

  pct(value: number, digits = 2): string {
    return `${this.num(value * 100, digits)}%`;
  }

  taxName(tax: keyof typeof TAX_NAMES): string {
    return TAX_NAMES[tax];
  }

  bracketRange(i: number): string {
    const limits = ANNEXES.I.brackets.map((b) => b.limit);
    const from = i === 0 ? 0 : limits[i - 1] + 0.01;
    return i === 0 ? `até ${this.compact(limits[0])}` : `${this.compact(from)} a ${this.compact(limits[i])}`;
  }

  async copy(): Promise<void> {
    const r = this.result();
    if (!r) return;
    const f = this.factor();
    const lines = [
      `Simples Nacional · ${r.annex.name} (${r.annex.short}), ${r.bracket + 1}ª faixa`,
      `RBT12${this.young() ? ' proporcional' : ''}: ${this.money(r.rbt12)}`,
      ...(f ? [`Fator R: ${this.pct(f.value)} → Anexo ${f.annex}`] : []),
      `Alíquota nominal: ${this.pct(r.nominal)} · parcela a deduzir: ${this.money(r.deduction)}`,
      `Alíquota efetiva: ${this.pct(r.effective, 4)}`,
      `Receita do mês: ${this.money(r.revenue)}`,
      `DAS estimado: ${this.money(r.das)}`,
      ...(r.overSublimit ? ['RBT12 acima do sublimite de R$ 3,6 milhões: ICMS/ISS fora do DAS.'] : []),
      '',
      `Calculado em https://brenocs.dev.br/tools/${this.tool.slug} — confira no PGDAS-D.`,
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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  private compact(value: number): string {
    if (value >= 1_000_000) return `R$ ${this.num(value / 1_000_000, 1)} mi`;
    return `R$ ${this.num(Math.floor(value) / 1000, 0)} mil`;
  }

  private parsed(text: string): number {
    const value = parseMoney(text);
    return Number.isFinite(value) ? value : 0;
  }

  private snapshot(): State {
    return {
      choice: this.choice(),
      young: this.young(),
      months: this.months(),
      rbt12: this.rbt12(),
      previous: this.previous(),
      revenue: this.revenue(),
      payroll: this.payroll(),
    };
  }

  private apply(state: State): void {
    this.choice.set(CHOICES.some((c) => c.id === state.choice) ? state.choice : DEFAULTS.choice);
    this.young.set(!!state.young);
    this.months.set(this.clamp(Number(state.months) || 0, 0, 11));
    this.rbt12.set(String(state.rbt12 ?? ''));
    this.previous.set(String(state.previous ?? ''));
    this.revenue.set(String(state.revenue ?? ''));
    this.payroll.set(String(state.payroll ?? ''));
  }
}
