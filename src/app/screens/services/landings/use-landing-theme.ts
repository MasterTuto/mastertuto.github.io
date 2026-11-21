import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject } from '@angular/core';

import { BcsColorSchemeService } from '@bcs/services/color-scheme/color-scheme.service';

import { Landing } from './landing.model';

/**
 * Applies a service page's theme to the whole document (navigation and footer included) and loads its
 * fonts. Runs while prerendering too, so the static HTML is already themed — no flash of the site theme.
 */
export function useLandingTheme(landing: Landing): void {
  const document = inject(DOCUMENT);
  const root = document.documentElement;
  const scheme = inject(BcsColorSchemeService);
  root.setAttribute('data-theme', landing.theme);
  scheme.fix(true);

  const id = `font-${landing.theme}`;
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${landing.fonts}&display=swap`;
    document.head.appendChild(link);
  }

  inject(DestroyRef).onDestroy(() => {
    scheme.fix(false);
    if (root.getAttribute('data-theme') === landing.theme) root.removeAttribute('data-theme');
  });
}
