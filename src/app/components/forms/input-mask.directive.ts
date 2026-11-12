import { Directive, ElementRef, effect, inject, input } from '@angular/core';

import { focusNextField } from './form-flow';

/**
 * Pattern syntax: `0` a digit, `A` a letter, `*` a letter or digit; anything else is a literal that is
 * inserted automatically. Presets pick the pattern from what was typed so far.
 */
export type MaskPreset = 'cpf' | 'cnpj' | 'cpf-cnpj' | 'phone-br' | 'cep' | 'date' | 'month-year' | 'time';

const PRESETS: Record<MaskPreset, (digits: string) => string> = {
  cpf: () => '000.000.000-00',
  cnpj: () => '00.000.000/0000-00',
  'cpf-cnpj': (d) => (d.length <= 11 ? '000.000.000-000' : '00.000.000/0000-00'),
  'phone-br': (d) => (d.length <= 10 ? '(00) 0000-00000' : '(00) 00000-0000'),
  cep: () => '00000-000',
  date: () => '00/00/0000',
  'month-year': () => '00/0000',
  time: () => '00:00',
};
/** Masks whose last placeholder only exists to let the user keep typing into the longer variant. */
const COMPLETE_LENGTH: Partial<Record<MaskPreset, number[]>> = {
  'cpf-cnpj': [14],
  'phone-br': [11],
};

const isSlot = (ch: string) => ch === '0' || ch === 'A' || ch === '*';
const fits = (slot: string, ch: string) =>
  slot === '0' ? /\d/.test(ch) : slot === 'A' ? /\p{L}/u.test(ch) : /[\p{L}\d]/u.test(ch);

/** Formats `raw` (only slot characters) with `pattern`; stops at the last typed character. */
export function applyMask(raw: string, pattern: string): string {
  let out = '';
  let i = 0;
  for (const slot of pattern) {
    if (i >= raw.length) break;
    if (isSlot(slot)) {
      while (i < raw.length && !fits(slot, raw[i])) i++;
      if (i >= raw.length) break;
      out += raw[i++];
    } else {
      out += slot;
    }
  }
  return out;
}

/** Characters of `value` that can fill a slot of `pattern` (digits and/or letters). */
export function unmask(value: string, pattern: string): string {
  const letters = /[A*]/.test(pattern);
  return value.replace(letters ? /[^\p{L}\d]/gu : /\D/g, '');
}

/** Formats a value with a preset or a pattern, e.g. when restoring saved data. */
export function formatMasked(value: string, mask: MaskPreset | string): string {
  const preset = PRESETS[mask as MaskPreset];
  const digits = value.replace(/\D/g, '');
  const pattern = preset ? preset(digits) : mask;
  return applyMask(unmask(value, pattern), pattern);
}

/**
 * Input mask for `<input>`: `appMask="cpf-cnpj"` or a pattern like `appMask="00/00/0000"`.
 *
 * Formats while typing and keeps the caret after the same character. It runs in the capture phase,
 * so a `(input)` handler on the same element already reads the formatted value. Digit-only masks get
 * `inputmode="numeric"`. When a mask is completed by typing at the end, focus moves to the next field
 * (disable with `[maskAutoAdvance]="false"`).
 */
@Directive({ selector: 'input[appMask]' })
export class InputMaskDirective {
  readonly appMask = input.required<MaskPreset | string>();
  readonly maskAutoAdvance = input(true);
  private el = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;

  constructor() {
    this.el.addEventListener('input', (event) => this.onInput(event as InputEvent), { capture: true });
    effect(() => {
      const pattern = this.pattern('99999999999999');
      if (!/[A*]/.test(pattern)) this.el.inputMode = 'numeric';
      this.el.maxLength = pattern.length;
      this.el.autocomplete ||= 'off';
    });
  }

  private pattern(digits: string): string {
    const mask = this.appMask();
    const preset = PRESETS[mask as MaskPreset];
    return preset ? preset(digits) : mask;
  }

  private onInput(event: InputEvent): void {
    const el = this.el;
    const before = el.value;
    const caret = el.selectionStart ?? before.length;
    const atEnd = caret >= before.length;
    const probe = this.pattern(before.replace(/\D/g, ''));
    const raw = unmask(before, probe);
    const pattern = this.pattern(raw.replace(/\D/g, ''));
    // How many slot characters sit before the caret, to put it back after the same one.
    const slotsBeforeCaret = unmask(before.slice(0, caret), pattern).length;
    const formatted = applyMask(raw, pattern);
    if (formatted !== before) {
      el.value = formatted;
      let pos = 0;
      let seen = 0;
      while (pos < formatted.length && seen < slotsBeforeCaret) {
        if (isSlot(pattern[pos] ?? '')) seen++;
        pos++;
      }
      if (atEnd) pos = formatted.length;
      el.setSelectionRange(pos, pos);
    }
    const typed = event.inputType?.startsWith('insert');
    if (typed && atEnd && this.maskAutoAdvance() && this.isComplete(formatted, pattern, raw)) {
      // Let the (input) handlers run with the final value before moving on.
      queueMicrotask(() => focusNextField(el));
    }
  }

  private isComplete(formatted: string, pattern: string, raw: string): boolean {
    const lengths = COMPLETE_LENGTH[this.appMask() as MaskPreset];
    if (lengths) return lengths.includes(raw.length);
    return formatted.length === pattern.length;
  }
}
