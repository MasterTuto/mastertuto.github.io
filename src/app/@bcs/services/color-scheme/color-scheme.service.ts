import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type BcsColorScheme = 'light' | 'dark';

const STORAGE_KEY = 'bcs-color-scheme';

/**
 * Light/dark mode. The choice is stored and written to `<html data-scheme>`; the tokens do the rest.
 * The inline script in `index.html` applies the stored scheme before first paint, so there is no flash.
 */
@Injectable({ providedIn: 'root' })
export class BcsColorSchemeService {
  private document = inject(DOCUMENT);
  private browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly scheme = signal<BcsColorScheme>(this.initial());

  constructor() {
    effect(() => {
      const scheme = this.scheme();
      if (!this.browser) return;
      this.document.documentElement.setAttribute('data-scheme', scheme);
      try {
        localStorage.setItem(STORAGE_KEY, scheme);
      } catch {
        // Private mode or storage disabled: the choice lasts for this visit only.
      }
    });
  }

  toggle(): void {
    this.scheme.update((scheme) => (scheme === 'dark' ? 'light' : 'dark'));
  }

  private initial(): BcsColorScheme {
    if (!this.browser) return 'light';
    return this.document.documentElement.getAttribute('data-scheme') === 'dark' ? 'dark' : 'light';
  }
}
