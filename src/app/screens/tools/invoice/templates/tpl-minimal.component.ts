import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './parts';

/** Minimalista: light type, wide margins, hairlines only; the brand appears as one small mark. */
@Component({
  selector: 'inv-tpl-minimal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  template: `
    <header class="n-head">
      <h1>{{ doc().title }}<span class="n-dot">.</span></h1>
      <inv-logo [doc]="doc()" />
    </header>
    <div class="n-grid">
      <inv-party [party]="doc().emitter" [label]="doc().t.from" />
      <inv-party [party]="doc().client" [label]="doc().t.billTo" />
      <inv-meta [doc]="doc()" />
    </div>
    <inv-items [doc]="doc()" />
    <div class="n-totals"><inv-totals [doc]="doc()" /></div>
    <div class="n-foot">
      <inv-pay [doc]="doc()" />
      <inv-notes [doc]="doc()" />
    </div>
  `,
  styles: `
    inv-tpl-minimal { display: flex; flex-direction: column; min-height: 1123px; padding: 72px 76px 56px; color: #374151; }
    .tpl-minimal .n-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; margin-bottom: 56px; }
    .tpl-minimal h1 { color: #111827; font-size: 44px; font-weight: 300; letter-spacing: -.03em; line-height: 1; text-transform: lowercase; }
    .tpl-minimal .n-dot { color: var(--brand); font-weight: 800; }
    .tpl-minimal .ilogo { max-height: 48px; }
    .tpl-minimal .n-grid { display: grid; grid-template-columns: 1fr 1fr 190px; gap: 28px; margin-bottom: 52px; }
    .tpl-minimal .ip-label, .tpl-minimal .ipay-title, .tpl-minimal .in-title { color: #9ca3af; font-weight: 500; letter-spacing: .02em; text-transform: none; font-size: 11px; }
    .tpl-minimal .ip-name { font-weight: 550; font-size: 13px; }
    .tpl-minimal .im { gap: 6px; }
    .tpl-minimal .im-row { display: grid; gap: 0; }
    .tpl-minimal .im dt { color: #9ca3af; font-size: 11px; }
    .tpl-minimal .im dd { font-weight: 500; }
    .tpl-minimal .ii th { padding-inline: 0; border-bottom: 1px solid #111827; color: #9ca3af; font-weight: 500; letter-spacing: .02em; text-transform: none; font-size: 11px; }
    .tpl-minimal .ii td { padding: 14px 0; }
    .tpl-minimal .ii .ii-num { padding-left: 18px; }
    .tpl-minimal .ii-amount { font-weight: 500; color: #111827; }
    .tpl-minimal .n-totals { display: flex; justify-content: flex-end; margin-top: 24px; }
    .tpl-minimal .it { min-width: 280px; }
    .tpl-minimal .it-total { border-top: 1px solid #111827; font-size: 22px; font-weight: 400; color: #111827; }
    .tpl-minimal .it-total .it-value { border-bottom: 3px solid var(--brand); }
    .tpl-minimal .n-foot { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: auto; padding-top: 48px; }
    .tpl-minimal .ipay-body { flex-direction: column; }
    .tpl-minimal .ipay-row { grid-template-columns: 1fr; gap: 0; }
    .tpl-minimal .ipay-rows { gap: 6px; }
  `,
})
export class TplMinimalComponent {
  readonly doc = input.required<DocView>();
}
