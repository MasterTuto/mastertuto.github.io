import { InjectionToken, Signal } from '@angular/core';

/** What a `bcs-field` tells the control inside it, so label, hint and error stay wired (WCAG 1.3.1, 3.3.1). */
export interface BcsFieldContext {
  readonly id: string;
  readonly describedBy: Signal<string | null>;
  readonly invalid: Signal<boolean>;
  readonly required: Signal<boolean>;
}

export const BCS_FIELD = new InjectionToken<BcsFieldContext>('BCS_FIELD');
