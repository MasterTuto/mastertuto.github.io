import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './parts';

/** Criativo: oversized title, bold brand shapes, rounded item rows and a big total block. */
@Component({
  selector: 'inv-tpl-creative',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  template: `
    <span class="r-blob" aria-hidden="true"></span>
    <span class="r-ring" aria-hidden="true"></span>
    <header class="r-head">
      <inv-logo [doc]="doc()" [monogram]="true" />
      <h1>{{ doc().title }}</h1>
      <span class="r-num">{{ doc().number }}</span>
    </header>
    <div class="r-info">
      <inv-party [party]="doc().emitter" [label]="doc().t.from" />
      <inv-party [party]="doc().client" [label]="doc().t.billTo" />
      <inv-meta [doc]="doc()" />
    </div>
    <inv-items [doc]="doc()" />
    <div class="r-sum">
      <inv-totals [doc]="doc()" />
      <div class="r-total"><span>{{ doc().t.amountDue }}</span><strong>{{ doc().total }}</strong></div>
    </div>
    <div class="r-foot">
      <inv-pay [doc]="doc()" />
      <inv-notes [doc]="doc()" />
    </div>
    <span class="r-wave" aria-hidden="true"></span>
  `,
  styles: `
    inv-tpl-creative { position: relative; display: flex; flex-direction: column; gap: 28px; min-height: 1123px; padding: 60px 56px 90px; }
    .tpl-creative .r-blob { position: absolute; top: -120px; right: -90px; width: 360px; height: 360px; border-radius: 42% 58% 63% 37% / 41% 44% 56% 59%; background: var(--brand); }
    .tpl-creative .r-ring { position: absolute; top: 150px; right: 210px; width: 70px; height: 70px; border: 12px solid var(--brand-soft); border-radius: 50%; }
    .tpl-creative .r-wave { position: absolute; left: 0; right: 0; bottom: 0; height: 46px; background: linear-gradient(100deg, var(--brand) 0 38%, var(--brand-soft) 38% 62%, var(--brand-tint) 62%); }
    .tpl-creative .r-head { position: relative; display: grid; justify-items: start; gap: 10px; }
    .tpl-creative h1 { color: #111827; font-size: 68px; font-weight: 850; letter-spacing: -.05em; line-height: .9; }
    .tpl-creative .r-num { padding: 4px 14px; border-radius: 999px; background: #111827; color: #fff; font-weight: 600; }
    .tpl-creative .r-info { position: relative; display: grid; grid-template-columns: 1fr 1fr 200px; gap: 24px; }
    .tpl-creative .ip-label { color: var(--brand); }
    .tpl-creative .im { padding: 12px 14px; border-radius: 14px; background: var(--brand-tint); }
    .tpl-creative .ii { border-collapse: separate; border-spacing: 0 6px; }
    .tpl-creative .ii th { color: #6b7280; }
    .tpl-creative .ii td { border: 0; background: #f6f7f9; }
    .tpl-creative .ii td:first-child { border-radius: 12px 0 0 12px; font-weight: 600; }
    .tpl-creative .ii td:last-child { border-radius: 0 12px 12px 0; }
    .tpl-creative .r-sum { display: flex; justify-content: flex-end; align-items: stretch; gap: 18px; }
    .tpl-creative .r-sum .it-total { display: none; }
    .tpl-creative .r-total { display: grid; align-content: center; min-width: 230px; padding: 18px 22px; border-radius: 20px 20px 20px 4px; background: var(--brand); color: var(--brand-ink); }
    .tpl-creative .r-total span { font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; opacity: .85; }
    .tpl-creative .r-total strong { font-size: 28px; letter-spacing: -.02em; }
    .tpl-creative .r-foot { display: grid; grid-template-columns: 1.2fr 1fr; gap: 32px; margin-top: auto; }
  `,
})
export class TplCreativeComponent {
  readonly doc = input.required<DocView>();
}
