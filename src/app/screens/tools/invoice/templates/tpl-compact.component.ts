import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './parts';

/** Compacto: dense three-column header and small type, fits long item lists on one page. */
@Component({
  selector: 'inv-tpl-compact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  template: `
    <header class="p-head">
      <div class="p-title">
        <inv-logo [doc]="doc()" />
        <h1>{{ doc().title }} <span>{{ doc().number }}</span></h1>
      </div>
      <div class="p-total"><span>{{ doc().t.total }}</span><strong>{{ doc().total }}</strong></div>
    </header>
    <div class="p-grid">
      <inv-party [party]="doc().emitter" [label]="doc().t.from" />
      <inv-party [party]="doc().client" [label]="doc().t.billTo" />
      <inv-meta [doc]="doc()" />
    </div>
    <inv-items [doc]="doc()" [numbered]="true" />
    <div class="p-sum">
      <div class="p-left">
        <inv-pay [doc]="doc()" />
        <inv-notes [doc]="doc()" />
      </div>
      <inv-totals [doc]="doc()" />
    </div>
  `,
  styles: `
    inv-tpl-compact { display: flex; flex-direction: column; gap: 16px; min-height: 1123px; padding: 36px 40px; font-size: 11.5px; }
    .tpl-compact .p-head { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding-bottom: 12px; border-bottom: 2px solid #111827; }
    .tpl-compact .p-title { display: flex; align-items: center; gap: 14px; }
    .tpl-compact .ilogo { max-height: 40px; max-width: 120px; }
    .tpl-compact h1 { font-size: 20px; font-weight: 750; text-transform: uppercase; letter-spacing: .04em; }
    .tpl-compact h1 span { margin-left: 6px; color: var(--brand); }
    .tpl-compact .p-total { display: grid; text-align: right; }
    .tpl-compact .p-total span { color: #6b7280; font-size: 10px; text-transform: uppercase; letter-spacing: .08em; }
    .tpl-compact .p-total strong { font-size: 18px; }
    .tpl-compact .p-grid { display: grid; grid-template-columns: 1fr 1fr 210px; gap: 16px; padding: 12px 14px; border-radius: 6px; background: var(--brand-tint); }
    .tpl-compact .ip-name { font-size: 12.5px; }
    .tpl-compact .ip-line, .tpl-compact .in-text, .tpl-compact .ipay-rows { font-size: 11px; }
    .tpl-compact .ip-label, .tpl-compact .ipay-title, .tpl-compact .in-title { color: var(--brand-deep); font-size: 9.5px; }
    .tpl-compact .im { font-size: 11px; }
    .tpl-compact .ii th { padding: 6px 8px; border-bottom: 1px solid #111827; font-size: 9.5px; }
    .tpl-compact .ii td { padding: 5px 8px; }
    .tpl-compact .ii .ii-n { width: 28px; }
    .tpl-compact .p-sum { display: flex; justify-content: space-between; gap: 28px; }
    .tpl-compact .p-left { display: grid; flex: 1; gap: 12px; align-content: start; }
    .tpl-compact .ipay-row { grid-template-columns: 110px 1fr; }
    .tpl-compact .ipay-qr, .tpl-compact .ipay-qr svg { width: 92px; }
    .tpl-compact .ipay-qr svg { height: 92px; }
    .tpl-compact .it { min-width: 230px; }
    .tpl-compact .it-row { padding: 3px 0; }
    .tpl-compact .it-total { font-size: 14px; border-top-width: 1px; color: var(--brand-deep); }
  `,
})
export class TplCompactComponent {
  readonly doc = input.required<DocView>();
}
