import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import { PARTS } from './parts';

/** Elegante: centered serif letterhead, double rules, small caps and a quiet frame. */
@Component({
  selector: 'inv-tpl-elegant',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [PARTS],
  template: `
    <div class="e-frame">
      <header class="e-head">
        <inv-logo [doc]="doc()" />
        <p class="e-brand">{{ doc().emitter.name || '—' }}</p>
        <p class="e-lines">
          @for (line of doc().emitter.lines; track $index) {
            <span>{{ line }}</span>
          }
          @if (doc().emitter.taxId) {
            <span>{{ doc().emitter.taxId }}</span>
          }
          @if (doc().emitter.email) {
            <span>{{ doc().emitter.email }}</span>
          }
          @if (doc().emitter.phone) {
            <span>{{ doc().emitter.phone }}</span>
          }
        </p>
      </header>
      <h1>{{ doc().title }}</h1>
      <div class="e-info">
        <inv-party [party]="doc().client" [label]="doc().t.billTo" />
        <inv-meta [doc]="doc()" />
      </div>
      <inv-items [doc]="doc()" />
      <div class="e-totals"><inv-totals [doc]="doc()" /></div>
      <div class="e-foot">
        <inv-pay [doc]="doc()" />
        <inv-notes [doc]="doc()" />
      </div>
      <p class="e-thanks">{{ doc().t.thanks }}</p>
    </div>
  `,
  styles: `
    inv-tpl-elegant { display: block; min-height: 1123px; padding: 36px; font-family: 'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, 'Times New Roman', serif; color: #2b2b2b; }
    .tpl-elegant .e-frame { display: flex; flex-direction: column; min-height: 1051px; padding: 44px 48px 36px; border: 1px solid var(--brand); outline: 1px solid var(--brand-soft); outline-offset: -7px; }
    .tpl-elegant .e-head { display: grid; justify-items: center; gap: 6px; text-align: center; }
    .tpl-elegant .ilogo { max-height: 64px; margin-bottom: 6px; }
    .tpl-elegant .e-brand { color: var(--brand-deep); font-size: 22px; font-variant: small-caps; letter-spacing: .12em; }
    .tpl-elegant .e-lines { display: flex; flex-wrap: wrap; justify-content: center; gap: 2px 14px; color: #6b6b6b; font-size: 11.5px; font-style: italic; }
    .tpl-elegant h1 { margin: 26px 0 28px; padding: 10px 0; border-block: 3px double var(--brand); color: var(--brand-deep); font-size: 30px; font-style: italic; font-weight: 400; letter-spacing: .04em; text-align: center; }
    .tpl-elegant .e-info { display: flex; justify-content: space-between; gap: 32px; margin-bottom: 28px; }
    .tpl-elegant .ip-label, .tpl-elegant .ipay-title, .tpl-elegant .in-title { color: var(--brand-deep); font-size: 12px; font-variant: small-caps; font-weight: 400; letter-spacing: .14em; text-transform: lowercase; }
    .tpl-elegant .ip-name { color: #1a1a1a; font-size: 16px; font-weight: 600; }
    .tpl-elegant .im { min-width: 230px; gap: 4px; }
    .tpl-elegant .im dt { font-style: italic; }
    .tpl-elegant .ii th { border-block: 1px solid var(--brand); color: var(--brand-deep); font-size: 12px; font-variant: small-caps; font-weight: 400; letter-spacing: .12em; text-transform: lowercase; }
    .tpl-elegant .ii td { border-bottom: 1px dotted #c8c8c8; font-size: 13.5px; }
    .tpl-elegant .e-totals { display: flex; justify-content: flex-end; margin-top: 18px; }
    .tpl-elegant .it-total { border-top: 1px solid #2b2b2b; border-bottom: 3px double #2b2b2b; color: var(--brand-deep); font-size: 19px; font-weight: 600; }
    .tpl-elegant .e-foot { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 36px; }
    .tpl-elegant .ipay-body { flex-direction: column; }
    .tpl-elegant .e-thanks { margin-top: auto; padding-top: 28px; color: var(--brand-deep); font-size: 15px; font-style: italic; text-align: center; }
  `,
})
export class TplElegantComponent {
  readonly doc = input.required<DocView>();
}
