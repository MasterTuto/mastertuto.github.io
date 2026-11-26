import { WritableSignal, afterNextRender } from '@angular/core';

import { formatMoneyTyping, moneyField, parseMoney } from '../simples/simples.logic';

export { moneyField, parseMoney };

const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** "R$ 1.234,56". */
export function money(value: number): string {
  return BRL.format(Number.isFinite(value) ? value : 0);
}

/** Money text → number, 0 when empty or invalid. */
export function moneyValue(text: string): number {
  const value = parseMoney(text ?? '');
  return Number.isFinite(value) ? value : 0;
}

/** "12,5%" with up to `digits` decimals. */
export function percent(fraction: number, digits = 2): string {
  return `${(fraction * 100).toLocaleString('pt-BR', { maximumFractionDigits: digits })}%`;
}

/**
 * `(input)` handler of a money field: groups thousands while typing, keeps one comma and two decimals,
 * turns a dot typed at the end into the decimal comma, and keeps the caret in place.
 */
export function onMoneyInput(target: WritableSignal<string>, event: Event): void {
  const el = event.target as HTMLInputElement;
  const before = el.value;
  const caret = el.selectionStart ?? before.length;
  const atEnd = caret >= before.length;
  const typedDot = (event as InputEvent).data === '.' && atEnd;
  const after = before.slice(caret).replace(/[^\d,]/g, '').length;
  const formatted = formatMoneyTyping(before, typedDot);
  if (formatted !== before) {
    el.value = formatted;
    let pos = formatted.length;
    for (let seen = 0; pos > 0 && seen < after; pos--) if (/[\d,]/.test(formatted[pos - 1])) seen++;
    if (!atEnd) el.setSelectionRange(pos, pos);
  }
  target.set(formatted);
}

/** On blur, completes the cents ("1.234,5" → "1.234,50"). */
export function tidyMoney(target: WritableSignal<string>): void {
  const value = parseMoney(target());
  if (Number.isFinite(value)) target.set(moneyField(value));
}

/** Selects a field's text on focus so typing replaces it. */
export function selectOnFocus(event: Event): void {
  const el = event.target as HTMLInputElement;
  const value = el.value;
  setTimeout(() => {
    if (el.ownerDocument.activeElement === el && el.value === value) el.select();
  });
}

/**
 * Focuses the main field after the first render on devices with a mouse (on phones the keyboard would
 * cover the page) and only when the page was not scrolled or focused elsewhere. Call from a constructor.
 */
export function autofocus(id: string): void {
  afterNextRender(() => {
    setTimeout(() => {
      if (!matchMedia('(pointer: fine)').matches || window.scrollY > 120) return;
      const active = document.activeElement;
      if (active && active !== document.body) return;
      const el = document.getElementById(id) as HTMLInputElement | null;
      el?.focus({ preventScroll: true });
      el?.select?.();
    }, 60);
  });
}
