import { DestroyRef, inject, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** Current router URL path (no query or fragment), updated after every navigation. Must run in an injection context. */
export function injectCurrentPath(onChange?: (url: string) => void): Signal<string> {
  const router = inject(Router);
  const path = (url: string) => url.split(/[?#]/)[0];
  const current = signal(path(router.url));
  router.events
    .pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed(inject(DestroyRef)))
    .subscribe(() => {
      current.set(path(router.url));
      onChange?.(router.url);
    });
  onChange?.(router.url);
  return current.asReadonly();
}
