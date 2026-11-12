import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './parts';

/** Recibo: a centered paper ticket with torn edges, stacked items, a big total and the PIX QR code. */
@Component({
  selector: 'inv-tpl-receipt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  template: `
    <div class="q-ticket">
      <header class="q-head">
        <inv-logo [doc]="doc()" [monogram]="true" />
        <inv-party [party]="doc().emitter" />
      </header>
      <h1>{{ doc().title }} · {{ doc().number }}</h1>
      <inv-meta [doc]="doc()" />
      <inv-party [party]="doc().client" [label]="doc().t.billTo" />
      <inv-items [doc]="doc()" [stack]="true" />
      <inv-totals [doc]="doc()" />
      <inv-pay [doc]="doc()" />
      <inv-notes [doc]="doc()" />
      <p class="q-thanks">{{ doc().t.thanks }}</p>
    </div>
  `,
  styles: `
    inv-tpl-receipt { display: flex; justify-content: center; min-height: 1123px; padding: 48px 0; background: var(--brand-tint); }
    .tpl-receipt .q-ticket { position: relative; display: flex; flex-direction: column; gap: 16px; width: 460px; padding: 40px 36px; background: #fff; box-shadow: 0 1px 0 #e5e7eb; }
    .tpl-receipt .q-ticket::before, .tpl-receipt .q-ticket::after { content: ''; position: absolute; left: 0; right: 0; height: 10px; background: radial-gradient(circle at 8px 10px, var(--brand-tint) 7px, transparent 7.5px) 0 0 / 16px 10px repeat-x; }
    .tpl-receipt .q-ticket::before { top: 0; }
    .tpl-receipt .q-ticket::after { bottom: 0; transform: rotate(180deg); }
    .tpl-receipt .q-head { display: grid; justify-items: center; gap: 8px; padding-bottom: 14px; border-bottom: 2px dashed #d1d5db; text-align: center; }
    .tpl-receipt .ilogo { max-height: 56px; }
    .tpl-receipt h1 { color: var(--brand-deep); font-size: 15px; font-weight: 750; letter-spacing: .08em; text-align: center; text-transform: uppercase; }
    .tpl-receipt .im { padding: 10px 0; border-block: 1px dashed #d1d5db; font-size: 12px; }
    .tpl-receipt .ii-stack { border-bottom: 2px dashed #d1d5db; }
    .tpl-receipt .ii-srow + .ii-srow { border-top: 1px dotted #e5e7eb; }
    .tpl-receipt .it { min-width: 0; }
    .tpl-receipt .it-total { padding: 12px 14px; border: 0; border-radius: 8px; background: var(--brand); color: var(--brand-ink); font-size: 20px; }
    .tpl-receipt .ipay-body { flex-direction: column-reverse; align-items: center; }
    .tpl-receipt .ipay-title { text-align: center; }
    .tpl-receipt .ipay-rows { width: 100%; }
    .tpl-receipt .ipay-qr, .tpl-receipt .ipay-qr svg { width: 150px; }
    .tpl-receipt .ipay-qr svg { height: 150px; }
    .tpl-receipt .q-thanks { padding-top: 14px; border-top: 2px dashed #d1d5db; color: #6b7280; font-size: 12px; text-align: center; }
  `,
})
export class TplReceiptComponent {
  readonly doc = input.required<DocView>();
}
