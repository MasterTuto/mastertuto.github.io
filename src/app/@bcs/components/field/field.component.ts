import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { BCS_FIELD, BcsFieldContext } from './field.token';

let nextId = 0;

/**
 * Label + control + hint + error, always in that order. The control (`bcs-input`) receives its id,
 * `aria-describedby`, `aria-invalid` and `required` from here.
 *
 *   <bcs-field label="Name" hint="How should we call you?" required>
 *     <input bcs-input name="name" />
 *   </bcs-field>
 */
@Component({
  selector: 'bcs-field',
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: BCS_FIELD, useExisting: BcsFieldComponent }],
  host: { class: 'bcs-field', '[attr.data-invalid]': 'invalid() || null' },
})
export class BcsFieldComponent implements BcsFieldContext {
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
