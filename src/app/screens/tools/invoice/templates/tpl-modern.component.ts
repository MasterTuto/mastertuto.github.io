import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './parts';

/** Moderno: full-height brand sidebar with logo, details and payment; content on white. */
@Component({
  selector: 'inv-tpl-modern',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  template: `
    <aside class="m-side">
      <div class="m-logo"><inv-logo [doc]="doc()" [monogram]="true" /></div>
      <h1>{{ doc().title }}</h1>
      <p class="m-num">{{ doc().number }}</p>
      <inv-meta [doc]="doc()" />
      <div class="m-due">
        <span>{{ doc().t.amountDue }}</span>
        <strong>{{ doc().total }}</strong>
      </div>
      <inv-pay [doc]="doc()" />
    </aside>
    <main class="m-main">
      <div class="m-parties">
        <inv-party [party]="doc().emitter" [label]="doc().t.from" />
        <inv-party [party]="doc().client" [label]="doc().t.billTo" />
      </div>
      <inv-items [doc]="doc()" />
      <div class="m-totals"><inv-totals [doc]="doc()" /></div>
      <inv-notes [doc]="doc()" />
    </main>
  `,
  styles: `
    inv-tpl-modern { display: grid; grid-template-columns: 250px 1fr; min-height: 1123px; }
    .tpl-modern .m-side { display: flex; flex-direction: column; gap: 18px; padding: 48px 28px; background: var(--brand); color: var(--brand-ink); }
    .tpl-modern .m-logo .ilogo { max-width: 100%; padding: 10px; border-radius: 12px; background: #fff; }
    .tpl-modern .m-logo .ilogo-mono { background: var(--brand-ink); color: var(--brand); }
    .tpl-modern h1 { margin-top: 12px; font-size: 30px; font-weight: 750; line-height: 1; letter-spacing: -.02em; }
    .tpl-modern .m-num { margin-top: -10px; font-size: 14px; opacity: .8; }
    .tpl-modern .im { gap: 8px; }
    .tpl-modern .im-row { display: grid; gap: 0; }
    .tpl-modern .im dt, .tpl-modern .ipay-title, .tpl-modern .ipay-row dt { color: inherit; opacity: .7; font-size: 10.5px; text-transform: uppercase; letter-spacing: .08em; }
    .tpl-modern .im dd { color: inherit; }
    .tpl-modern .m-due { display: grid; padding: 14px 0; border-block: 1px solid color-mix(in srgb, var(--brand-ink) 25%, transparent); }
    .tpl-modern .m-due span { font-size: 10.5px; letter-spacing: .08em; text-transform: uppercase; opacity: .7; }
    .tpl-modern .m-due strong { font-size: 22px; }
    .tpl-modern inv-pay { margin-top: auto; }
    .tpl-modern .ipay-body { flex-direction: column; }
    .tpl-modern .ipay-row { grid-template-columns: 1fr; gap: 0; }
    .tpl-modern .ipay-rows { gap: 8px; }
    .tpl-modern .ipay-qr { width: 100%; padding: 10px; border-radius: 10px; background: #fff; color: #374151; }
    .tpl-modern .ipay-qr svg { width: 130px; height: 130px; }
    .tpl-modern .m-main { display: flex; flex-direction: column; gap: 32px; padding: 56px 44px 48px; }
    .tpl-modern .m-parties { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
    .tpl-modern .ip-label { color: var(--brand); }
    .tpl-modern .ii th { background: var(--brand-tint); color: #374151; }
    .tpl-modern .ii th:first-child { border-radius: 6px 0 0 6px; }
    .tpl-modern .ii th:last-child { border-radius: 0 6px 6px 0; }
    .tpl-modern .m-totals { display: flex; justify-content: flex-end; margin-top: -12px; }
    .tpl-modern .it-total { border-top-color: var(--brand); color: var(--brand); font-size: 20px; }
  `,
})
export class TplModernComponent {
  readonly doc = input.required<DocView>();
}
