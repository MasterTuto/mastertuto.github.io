import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { InvoiceStore } from '../invoice.store';

/** Short confirmations with an optional action (undo). Sits above the phone action bar when it is shown. */
@Component({
  selector: 'app-invoice-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="region" role="status" aria-live="polite">
      @if (store.toast(); as toast) {
        <div class="toast" [class.raised]="raised()">
          <span>{{ toast.message }}</span>
          @if (toast.actionLabel) {
            <button type="button" (click)="store.dismissToast(true)">{{ toast.actionLabel }}</button>
          }
        </div>
      }
    </div>
  `,
  styles: `
    .region { position: fixed; left: 50%; bottom: calc(1rem + env(safe-area-inset-bottom)); z-index: 45; transform: translateX(-50%); width: max-content; max-width: calc(100vw - 1.5rem); }
    .toast { display: flex; align-items: center; gap: 1rem; padding: .75rem 1rem; border-radius: .9rem; background: #151c25; color: #e0e1df; font-size: .875rem; line-height: 1.4; box-shadow: 0 16px 40px -12px rgb(21 28 37 / .6); }
    .toast button { min-height: 36px; color: #b8b2ff; font-weight: 700; }
    @media (max-width: 959px) { .toast.raised { margin-bottom: 4.5rem; } }
  `,
})
export class InvoiceToastComponent {
  readonly store = inject(InvoiceStore);
  /** Leave room for the phone action bar. */
  readonly raised = input(false);
}
