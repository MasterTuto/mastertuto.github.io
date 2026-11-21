import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { BCS_FIELD, BcsFieldContext } from './field-context';

let nextId = 0;

/**
 * Label + control + hint + error, always in that order. The control (`bcs-input`) receives its id,
 * `aria-describedby`, `aria-invalid` and `required` from here.
 *
 *   <bcs-field label="Seu nome" hint="Como prefere ser chamado" required>
 *     <input bcs-input name="name" />
 *   </bcs-field>
 */
@Component({
  selector: 'bcs-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BCS_FIELD, useExisting: BcsField }],
  host: { class: 'bcs-field', '[attr.data-invalid]': 'invalid() || null' },
  template: `
    <label class="bcs-field__label" [attr.for]="id">
      {{ label() }}
      @if (required()) {
        <span class="bcs-field__required" aria-hidden="true">*</span>
      }
    </label>
    <ng-content />
    @if (hint() && !error()) {
      <p class="bcs-field__hint" [id]="id + '-hint'">{{ hint() }}</p>
    }
    @if (error()) {
      <p class="bcs-field__error" [id]="id + '-error'" aria-live="polite">{{ error() }}</p>
    }
  `,
})
export class BcsField implements BcsFieldContext {
  readonly label = input.required<string>();
  readonly hint = input<string>('');
  readonly error = input<string>('');
  readonly required = input(false, { transform: booleanAttribute });

  readonly id = `bcs-field-${nextId++}`;
  readonly invalid = computed(() => !!this.error());
  readonly describedBy = computed(() =>
    this.error() ? `${this.id}-error` : this.hint() ? `${this.id}-hint` : null,
  );
}
