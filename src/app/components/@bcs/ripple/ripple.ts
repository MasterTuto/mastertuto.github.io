import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Material-style ink ripple from the pointer (or from the center for keyboard activation).
 * Purely decorative: it is `aria-hidden`, skipped under `prefers-reduced-motion` and removed when done.
 */
@Directive({
  selector: '[bcs-ripple]',
  host: {
    class: 'bcs-ripple-host',
    '(pointerdown)': 'spawn($event)',
    '(keydown.enter)': 'spawn()',
    '(keydown.space)': 'spawn()',
  },
})
export class BcsRipple {
  private host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private document = inject(DOCUMENT);

  spawn(event?: PointerEvent): void {
    const view = this.document.defaultView;
    if (!view || view.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = this.host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event ? event.clientX - rect.left : rect.width / 2;
    const y = event ? event.clientY - rect.top : rect.height / 2;
    const wave = this.document.createElement('span');
    wave.className = 'bcs-ripple';
    wave.setAttribute('aria-hidden', 'true');
    wave.style.setProperty('--_size', `${size}px`);
    wave.style.setProperty('--_x', `${x}px`);
    wave.style.setProperty('--_y', `${y}px`);
    wave.addEventListener('animationend', () => wave.remove(), { once: true });
    this.host.appendChild(wave);
  }
}
