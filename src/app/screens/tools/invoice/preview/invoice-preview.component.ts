import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, computed, inject, input, signal, viewChild } from '@angular/core';

import type { DocView } from '../invoice.view';
import { InvoiceDocumentComponent } from '../templates/invoice-document.component';

export const PAGE_WIDTH = 794;
export const PAGE_HEIGHT = 1123;

/** The invoice paper scaled to the column width, with dashed marks where PDF pages break. */
@Component({
  selector: 'app-invoice-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InvoiceDocumentComponent],
  template: `
    <div #frame class="frame" [style.height.px]="measured() ? height() * scale() : null">
      <div #paper id="inv-paper" class="paper" [style.transform]="'scale(' + scale() + ')'">
        <app-invoice-document [doc]="doc()" />
      </div>
      @for (n of breaks(); track n) {
        <div class="break" [style.top.px]="n * pageHeight * scale()" aria-hidden="true"><span>{{ n + 1 }}</span></div>
      }
    </div>
  `,
  styles: `
    :host { display: block; }
    .frame { position: relative; width: 100%; aspect-ratio: 210 / 297; overflow: hidden; border-radius: 6px; background: #fff; box-shadow: 0 1px 2px rgb(0 0 0 / .06), 0 24px 48px -24px rgb(21 28 37 / .35); }
    .frame[style*=height] { aspect-ratio: auto; }
    .paper { position: absolute; top: 0; left: 0; width: 794px; transform-origin: 0 0; }
    .break { position: absolute; left: 0; right: 0; border-top: 1px dashed rgb(122 112 225 / .7); pointer-events: none; }
    .break span { position: absolute; right: 6px; top: 2px; padding: 0 6px; border-radius: 999px; background: #7a70e1; color: #fff; font-size: 10px; font-weight: 600; }
  `,
})
export class InvoicePreviewComponent {
  readonly doc = input.required<DocView>();
  readonly pageHeight = PAGE_HEIGHT;
  private readonly frame = viewChild.required<ElementRef<HTMLElement>>('frame');
  private readonly paper = viewChild.required<ElementRef<HTMLElement>>('paper');
  readonly scale = signal(0.5);
  readonly height = signal(PAGE_HEIGHT);
  readonly measured = signal(false);
  readonly breaks = computed(() => {
    const pages = Math.ceil(this.height() / PAGE_HEIGHT - 0.01);
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => i + 1);
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const observer = new ResizeObserver(() => {
        const width = this.frame().nativeElement.clientWidth;
        if (width) this.scale.set(width / PAGE_WIDTH);
        this.height.set(Math.max(PAGE_HEIGHT, this.paper().nativeElement.offsetHeight));
        this.measured.set(true);
      });
      observer.observe(this.frame().nativeElement);
      observer.observe(this.paper().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
