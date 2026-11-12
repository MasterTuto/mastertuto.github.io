import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import type { DocView } from '../invoice.view';
import type { TemplateId } from '../invoice.types';
import { TplClassicComponent } from './tpl-classic.component';
import { TplModernComponent } from './tpl-modern.component';
import { TplMinimalComponent } from './tpl-minimal.component';
import { TplCorporateComponent } from './tpl-corporate.component';
import { TplElegantComponent } from './tpl-elegant.component';
import { TplCreativeComponent } from './tpl-creative.component';
import { TplCompactComponent } from './tpl-compact.component';
import { TplMonoComponent } from './tpl-mono.component';
import { TplStripeComponent } from './tpl-stripe.component';
import { TplReceiptComponent } from './tpl-receipt.component';

/**
 * The invoice paper: an A4 page (794 × 1123 CSS px, grows for long invoices) rendered with one of the ten
 * templates. Styles are global but scoped by `.inv-doc` / `.tpl-<id>`, so a cloned node keeps its look
 * when exported or printed.
 */
@Component({
  selector: 'app-invoice-document',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    TplClassicComponent, TplModernComponent, TplMinimalComponent, TplCorporateComponent, TplElegantComponent,
    TplCreativeComponent, TplCompactComponent, TplMonoComponent, TplStripeComponent, TplReceiptComponent,
  ],
  template: `
    <div class="inv-doc" [class]="'tpl-' + (template() || doc().template)" [attr.style]="doc().style" [attr.lang]="doc().locale">
      @switch (template() || doc().template) {
        @case ('classic') { <inv-tpl-classic [doc]="doc()" /> }
        @case ('modern') { <inv-tpl-modern [doc]="doc()" /> }
        @case ('minimal') { <inv-tpl-minimal [doc]="doc()" /> }
        @case ('corporate') { <inv-tpl-corporate [doc]="doc()" /> }
        @case ('elegant') { <inv-tpl-elegant [doc]="doc()" /> }
        @case ('creative') { <inv-tpl-creative [doc]="doc()" /> }
        @case ('compact') { <inv-tpl-compact [doc]="doc()" /> }
        @case ('mono') { <inv-tpl-mono [doc]="doc()" /> }
        @case ('stripe') { <inv-tpl-stripe [doc]="doc()" /> }
        @case ('receipt') { <inv-tpl-receipt [doc]="doc()" /> }
      }
      @if (doc().stamp) {
        <span class="inv-stamp" [class.is-paid]="doc().status === 'paid'">{{ doc().stamp }}</span>
      }
    </div>
  `,
  styles: `
    .inv-doc { position: relative; box-sizing: border-box; width: 794px; min-height: 1123px; overflow: hidden; background: #fff; color: #1f2937;
      font: 400 13px/1.5 Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif; font-variant-numeric: tabular-nums;
      text-align: left; letter-spacing: 0; -webkit-font-smoothing: antialiased; }
    .inv-doc *, .inv-doc *::before, .inv-doc *::after { box-sizing: border-box; }
    .inv-doc p, .inv-doc dl, .inv-doc dd, .inv-doc h1, .inv-doc h2, .inv-doc figure { margin: 0; }
    .inv-doc .ip-label, .inv-doc .in-title, .inv-doc .ipay-title { margin-bottom: 4px; color: #6b7280; font-size: 10.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; }
    .inv-doc .ip-name { color: #111827; font-size: 14px; font-weight: 650; }
    .inv-doc .ip-line { color: #4b5563; font-size: 12px; }
    .inv-doc .ip-nw { white-space: nowrap; }
    .inv-doc .im { display: grid; gap: 2px; }
    .inv-doc .im-row { display: flex; justify-content: space-between; gap: 16px; }
    .inv-doc .im dt { color: #6b7280; }
    .inv-doc .im dd { font-weight: 600; color: #111827; }
    .inv-doc .ii { width: 100%; border-collapse: collapse; }
    .inv-doc .ii th { padding: 8px 10px; font-size: 10.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; text-align: left; }
    .inv-doc .ii td { padding: 9px 10px; vertical-align: top; border-bottom: 1px solid #eef0f3; }
    .inv-doc .ii .ii-num { text-align: right; white-space: nowrap; }
    .inv-doc .ii .ii-n { width: 34px; color: #9ca3af; }
    .inv-doc .ii .ii-desc { width: 100%; white-space: pre-line; }
    .inv-doc .ii-amount { font-weight: 600; }
    .inv-doc .ii-empty { padding: 28px 10px; color: #9ca3af; text-align: center; font-style: italic; }
    .inv-doc .ii-srow { display: flex; justify-content: space-between; gap: 16px; padding: 8px 0; }
    .inv-doc .ii-sdesc { display: grid; white-space: pre-line; }
    .inv-doc .ii-sdetail { color: #6b7280; font-size: 11.5px; }
    .inv-doc .it { display: grid; min-width: 260px; }
    .inv-doc .it-row { display: flex; justify-content: space-between; gap: 24px; padding: 5px 0; }
    .inv-doc .it-value { white-space: nowrap; }
    .inv-doc .it-total { margin-top: 4px; padding-top: 10px; border-top: 2px solid currentColor; font-size: 16px; font-weight: 700; }
    .inv-doc .ipay-body { display: flex; gap: 20px; align-items: flex-start; justify-content: space-between; }
    .inv-doc .ipay-rows { display: grid; gap: 3px; font-size: 12px; }
    .inv-doc .ipay-row { display: grid; grid-template-columns: 128px 1fr; gap: 8px; }
    .inv-doc .ipay-row dt { color: #6b7280; }
    .inv-doc .ipay-row dd { overflow-wrap: anywhere; font-weight: 500; }
    .inv-doc .ipay-qr { display: grid; flex-shrink: 0; justify-items: center; gap: 4px; width: 112px; color: #4b5563; font-size: 10px; }
    .inv-doc .ipay-qr svg { width: 112px; height: 112px; }
    .inv-doc .in + .in { margin-top: 12px; }
    .inv-doc .in-text { color: #4b5563; font-size: 12px; white-space: pre-line; }
    .inv-doc .ilogo { display: block; max-width: 180px; max-height: 72px; object-fit: contain; }
    .inv-doc .ilogo-mono { display: grid; width: 52px; height: 52px; place-items: center; border-radius: 12px; background: var(--brand); color: var(--brand-ink); font-size: 20px; font-weight: 700; }
    .inv-stamp { position: absolute; top: 430px; right: 64px; z-index: 5; padding: 6px 22px; border: 4px solid #9ca3af; border-radius: 10px; color: #9ca3af;
      font: 800 34px/1 Inter, system-ui, sans-serif; letter-spacing: .14em; text-transform: uppercase; transform: rotate(-14deg); opacity: .75; pointer-events: none; }
    .inv-stamp.is-paid { border-color: #16a34a; color: #16a34a; }
  `,
})
export class InvoiceDocumentComponent {
  readonly doc = input.required<DocView>();
  /** Overrides the template of the view (thumbnails). */
  readonly template = input<TemplateId | null>(null);
}
