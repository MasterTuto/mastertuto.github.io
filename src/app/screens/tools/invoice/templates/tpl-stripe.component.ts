import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './parts';

/** Faixa lateral: a brand stripe with the title written vertically and an "amount due" box on top. */
@Component({
  selector: 'inv-tpl-stripe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  template: `
    <div class="s-band" aria-hidden="true"><span>{{ doc().title }}</span></div>
    <div class="s-main">
      <header class="s-head">
        <div class="s-from">
          <inv-logo [doc]="doc()" />
          <inv-party [party]="doc().emitter" />
        </div>
        <div class="s-due">
          <span>{{ doc().t.amountDue }}</span>
          <strong>{{ doc().total }}</strong>
          @if (doc().dueDate) {
            <small>{{ doc().t.dueDate }}: {{ doc().dueDate }}</small>
          }
        </div>
      </header>
      <h1 class="s-title">{{ doc().title }} <span>{{ doc().number }}</span></h1>
      <div class="s-info">
        <inv-party [party]="doc().client" [label]="doc().t.billTo" />
        <inv-meta [doc]="doc()" />
      </div>
      <inv-items [doc]="doc()" />
      <div class="s-totals"><inv-totals [doc]="doc()" /></div>
      <div class="s-foot">
        <inv-pay [doc]="doc()" />
        <inv-notes [doc]="doc()" />
      </div>
    </div>
  `,
  styles: `
    inv-tpl-stripe { display: grid; grid-template-columns: 64px 1fr; min-height: 1123px; }
    .tpl-stripe .s-band { position: relative; background: var(--brand); }
    .tpl-stripe .s-band span { position: absolute; top: 60px; left: 50%; color: var(--brand-ink); font-size: 30px; font-weight: 800; letter-spacing: .3em; text-transform: uppercase; white-space: nowrap; transform: translateX(-50%) rotate(180deg); writing-mode: vertical-rl; opacity: .9; }
    .tpl-stripe .s-main { display: flex; flex-direction: column; gap: 26px; padding: 52px 52px 44px 44px; }
    .tpl-stripe .s-head { display: flex; justify-content: space-between; gap: 28px; }
    .tpl-stripe .s-from { display: grid; gap: 10px; }
    .tpl-stripe .s-due { display: grid; align-content: start; min-width: 220px; padding: 16px 18px; border-left: 4px solid var(--brand); background: var(--brand-tint); text-align: right; }
    .tpl-stripe .s-due span { color: #4b5563; font-size: 10.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
    .tpl-stripe .s-due strong { color: var(--brand-deep); font-size: 26px; letter-spacing: -.02em; }
    .tpl-stripe .s-due small { color: #6b7280; font-size: 11.5px; }
    .tpl-stripe .s-title { color: #111827; font-size: 22px; font-weight: 700; }
    .tpl-stripe .s-title span { color: var(--brand); }
    .tpl-stripe .s-info { display: flex; justify-content: space-between; gap: 28px; }
    .tpl-stripe .im { min-width: 230px; }
    .tpl-stripe .ii th { border-bottom: 1px solid #d1d5db; color: #6b7280; }
    .tpl-stripe .ii td:first-child { border-left: 3px solid var(--brand-soft); }
    .tpl-stripe .s-totals { display: flex; justify-content: flex-end; }
    .tpl-stripe .it-total { border-top-color: var(--brand); }
    .tpl-stripe .s-foot { display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; margin-top: auto; padding-top: 18px; border-top: 1px solid #e5e7eb; }
  `,
})
export class TplStripeComponent {
  readonly doc = input.required<DocView>();
}
