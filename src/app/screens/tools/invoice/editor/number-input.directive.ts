import { Directive, ElementRef, effect, inject, input, output } from '@angular/core';

import { formatMoneyTyping, parseMoneyTyping, parseNumberText, roundTo } from '../invoice.logic';

/**
 * Numeric field formatted while typing, Brazilian style ("1.234,56"): `<input appNumber [value]="n"
 * [decimals]="2" (valueChange)="n = $event">`. A typed dot becomes the decimal comma (phone keypads
 * show either). With `fixed`, the value is shown with all decimals when the field loses focus
 * (money); otherwise trailing zeros are dropped (quantities, percentages).
 */
@Directive({
  selector: 'input[appNumber]',
  host: {
    type: 'text',
    inputmode: 'decimal',
    autocomplete: 'off',
    spellcheck: 'false',
    '(input)': 'onInput($any($event))',
    '(blur)': 'render()',
    '(focus)': 'onFocus()',
  },
})
export class NumberInputDirective {
  readonly value = input<number>(0);
  readonly decimals = input(2);
  readonly fixed = input(true);
  /** Show an empty field instead of zero. */
  readonly blankZero = input(true);
  readonly max = input<number | null>(null);
  readonly valueChange = output<number>();

  private readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;

  constructor() {
    effect(() => {
      this.value();
      this.decimals();
      if (this.el.ownerDocument?.activeElement !== this.el) this.render();
    });
  }

  onFocus(): void {
    // Drop the zero padding so editing "150,00" starts from "150".
    if (!this.fixed()) return;
    const value = this.value();
    if (value && Number.isInteger(value)) this.el.value = formatMoneyTyping(String(value), this.decimals());
  }

  onInput(event: InputEvent): void {
    const el = this.el;
    let text = el.value;
    let caret = el.selectionStart ?? text.length;
    if (event.data === '.' && text[caret - 1] === '.') {
      text = text.slice(0, caret - 1) + ',' + text.slice(caret);
    }
    if (this.decimals() === 0) text = text.replace(/,/g, '');
    else if ((text.match(/,/g) ?? []).length > 1) {
      // Keep only the comma just typed.
      const keep = event.data === ',' || event.data === '.' ? caret - 1 : text.indexOf(',');
      text = text.replace(/,/g, (match, offset: number) => (offset === keep ? match : ''));
    }
    if (event.inputType === 'insertFromPaste') {
      const pasted = parseNumberText(text);
      text = formatMoneyTyping(String(roundTo(pasted, this.decimals())).replace('.', ','), this.decimals());
      caret = text.length;
    }
    const significant = (s: string) => s.replace(/[^\d,]/g, '').length;
    const before = significant(text.slice(0, caret));
    const formatted = formatMoneyTyping(text, this.decimals());
    if (formatted !== el.value) {
      el.value = formatted;
      caret = 0;
      let seen = 0;
      while (caret < formatted.length && seen < before) {
        if (/[\d,]/.test(formatted[caret])) seen++;
        caret++;
      }
      el.setSelectionRange(caret, caret);
    }
    let value = parseMoneyTyping(formatted);
    const max = this.max();
    if (max !== null && value > max) value = max;
    this.valueChange.emit(value);
  }

  render(): void {
    const value = Number(this.value()) || 0;
    if (!value && this.blankZero()) {
      this.el.value = '';
      return;
    }
    const decimals = this.decimals();
    this.el.value = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: this.fixed() ? decimals : 0,
      maximumFractionDigits: decimals,
    }).format(roundTo(value, decimals));
  }
}
