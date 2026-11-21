import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output, signal } from '@angular/core';

import { BcsButton } from '@bcs/button';
import { BcsColor } from '@bcs/core';
import { BcsField } from '@bcs/field';
import { BcsInput } from '@bcs/input';

export type BcsWhatsAppFieldType = 'text' | 'tel' | 'email' | 'select' | 'textarea';

export interface BcsWhatsAppField {
  /** Key of the value; also the input `name`. */
  readonly name: string;
  readonly label: string;
  readonly type: BcsWhatsAppFieldType;
  readonly required?: boolean;
  readonly placeholder?: string;
  readonly hint?: string;
  readonly options?: readonly string[];
  /** Browser autofill hint (`name`, `organization`, `tel`, `email`…). */
  readonly autocomplete?: string;
}

export interface BcsWhatsAppMessages {
  readonly required: string;
  readonly email: string;
  readonly tel: string;
  readonly select: string;
}

export interface BcsWhatsAppSubmit {
  readonly values: Readonly<Record<string, string>>;
  readonly message: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Short qualifying form that sends nothing to a server: on submit it opens WhatsApp with a message
 * already written from the answers, so the visitor only presses "send".
 *
 * The message is `heading`, a blank line, then one `Label: value` line per answered field.
 * Validation is inline and announced (WCAG 3.3.1); the first invalid field receives focus.
 */
@Component({
  selector: 'bcs-whatsapp-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsField, BcsInput, BcsButton],
  host: { class: 'bcs-whatsapp-form' },
  template: `
    <form class="bcs-whatsapp-form__form" novalidate (submit)="submit($event)">
      @for (field of fields(); track field.name) {
        <bcs-field
          [label]="field.label"
          [hint]="field.hint ?? ''"
          [error]="errors()[field.name] ?? ''"
          [required]="!!field.required"
          [class.bcs-whatsapp-form__wide]="field.type === 'textarea'"
        >
          @switch (field.type) {
            @case ('select') {
              <select bcs-input [color]="color()" [name]="field.name" (change)="update(field, $event)">
                <option value="">{{ field.placeholder ?? '' }}</option>
                @for (option of field.options ?? []; track option) {
                  <option [value]="option">{{ option }}</option>
                }
              </select>
            }
            @case ('textarea') {
              <textarea
                bcs-input
                [color]="color()"
                [name]="field.name"
                [attr.placeholder]="field.placeholder ?? null"
                rows="3"
                (input)="update(field, $event)"
              ></textarea>
            }
            @default {
              <input
                bcs-input
                [color]="color()"
                [type]="field.type"
                [name]="field.name"
                [attr.placeholder]="field.placeholder ?? null"
                [attr.autocomplete]="field.autocomplete ?? null"
                [attr.inputmode]="field.type === 'tel' ? 'tel' : null"
                (input)="update(field, $event)"
              />
            }
          }
        </bcs-field>
      }
      <div class="bcs-whatsapp-form__footer">
        <button bcs-button type="submit" size="lg" [color]="color()">{{ submitLabel() }}</button>
        @if (note()) {
          <p class="bcs-whatsapp-form__note">{{ note() }}</p>
        }
      </div>
    </form>
  `,
})
export class BcsWhatsAppForm {
  private document = inject(DOCUMENT);
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly fields = input.required<readonly BcsWhatsAppField[]>();
  /** Digits only, with country code (e.g. 5513999999999). */
  readonly phone = input.required<string>();
  /** First line of the message. */
  readonly heading = input.required<string>();
  readonly submitLabel = input.required<string>();
  readonly messages = input.required<BcsWhatsAppMessages>();
  readonly note = input<string>('');
  readonly color = input<BcsColor>('accent');

  readonly sent = output<BcsWhatsAppSubmit>();

  private readonly values = signal<Record<string, string>>({});
  protected readonly errors = signal<Record<string, string>>({});
  private submitted = false;

  protected update(field: BcsWhatsAppField, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.values.update((values) => ({ ...values, [field.name]: value }));
    if (this.submitted) this.errors.set(this.validate());
  }

  protected submit(event: Event): void {
    event.preventDefault();
    this.submitted = true;
    const errors = this.validate();
    this.errors.set(errors);
    const firstInvalid = this.fields().find((field) => errors[field.name]);
    if (firstInvalid) {
      this.host.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    const values = this.values();
    const lines = this.fields()
      .filter((field) => values[field.name]?.trim())
      .map((field) => `${field.label}: ${values[field.name].trim()}`);
    const message = [this.heading(), '', ...lines].join('\n');
    this.sent.emit({ values, message });
    const url = `https://wa.me/${this.phone()}?text=${encodeURIComponent(message)}`;
    const view = this.document.defaultView;
    if (!view?.open(url, '_blank', 'noopener')) view?.location.assign(url);
  }

  private validate(): Record<string, string> {
    const values = this.values();
    const messages = this.messages();
    const errors: Record<string, string> = {};
    for (const field of this.fields()) {
      const value = (values[field.name] ?? '').trim();
      if (!value) {
        if (field.required) errors[field.name] = field.type === 'select' ? messages.select : messages.required;
      } else if (field.type === 'email' && !EMAIL.test(value)) {
        errors[field.name] = messages.email;
      } else if (field.type === 'tel' && value.replace(/\D/g, '').length < 10) {
        errors[field.name] = messages.tel;
      }
    }
    return errors;
  }
}
