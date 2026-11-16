import { afterNextRender, effect, signal } from '@angular/core';

export { parseNumberBR } from '../btu/btu.logic';

/** Brazilian number formatting with at most `digits` decimals. */
export function fmt(value: number, digits = 0): string {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: digits });
}

export function inputValue(event: Event): string {
  return (event.target as HTMLInputElement).value;
}

/** Copies text, falling back to a hidden textarea where the Clipboard API is blocked. */
export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
}

/**
 * Restores the form from localStorage after the first render (so the prerendered HTML keeps the
 * defaults) and saves it on every change. Call from a constructor.
 */
export function persistState<T extends object>(key: string, defaults: T, snapshot: () => T, apply: (state: T) => void): void {
  const restored = signal(false);
  afterNextRender(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key) ?? 'null') as Partial<T> | null;
      if (saved && typeof saved === 'object') apply({ ...defaults, ...saved });
    } catch {
      /* storage unavailable or corrupted */
    }
    restored.set(true);
  });
  effect(() => {
    const state = snapshot();
    if (!restored()) return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* private mode */
    }
  });
}

export function forgetState(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** "Copied!" flag that resets after a moment. */
export function copiedFlag() {
  const copied = signal(false);
  let timer: ReturnType<typeof setTimeout> | undefined;
  return {
    copied: copied.asReadonly(),
    async copy(text: string): Promise<void> {
      if (!text) return;
      await copyText(text);
      copied.set(true);
      clearTimeout(timer);
      timer = setTimeout(() => copied.set(false), 2200);
    },
  };
}
