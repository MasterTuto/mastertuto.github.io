import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, input, output } from '@angular/core';

import { TEMPLATE_IDS, TEMPLATE_NAMES } from '../invoice.logic';
import type { TemplateId } from '../invoice.types';
import type { DocView } from '../invoice.view';
import { InvoiceDocumentComponent } from '../templates/invoice-document.component';

/** Horizontal strip of real, scaled-down renders of each template with the current invoice. */
@Component({
  selector: 'app-template-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InvoiceDocumentComponent],
  template: `
    <div class="strip" role="radiogroup" aria-label="Modelo do documento">
      @for (id of ids; track id) {
        <button type="button" role="radio" class="thumb" [attr.aria-checked]="id === selected()" [attr.data-template]="id" (click)="pick.emit(id)">
          <span class="mini" aria-hidden="true"><span class="scale"><app-invoice-document [doc]="doc()" [template]="id" /></span></span>
          <span class="name">{{ names[id] }}</span>
        </button>
      }
    </div>
  `,
  styles: `
    :host { display: block; min-width: 0; }
    .strip { display: flex; gap: .75rem; overflow-x: auto; padding: .25rem .1rem .6rem; scroll-snap-type: x proximity; scrollbar-width: thin; -webkit-overflow-scrolling: touch; }
    .thumb { display: grid; flex-shrink: 0; gap: .4rem; justify-items: center; scroll-snap-align: start; }
    .mini { position: relative; display: block; width: 96px; height: 136px; overflow: hidden; border-radius: 6px; background: #fff; box-shadow: 0 0 0 1px rgb(68 74 81 / .14), 0 6px 14px -8px rgb(21 28 37 / .3); transition: box-shadow .15s, transform .15s; }
    .scale { position: absolute; top: 0; left: 0; width: 794px; transform: scale(.1209); transform-origin: 0 0; pointer-events: none; }
    .thumb:hover .mini { transform: translateY(-2px); }
    .thumb[aria-checked=true] .mini { box-shadow: 0 0 0 2px #7a70e1, 0 8px 18px -8px rgb(122 112 225 / .6); }
    .name { color: #8e9095; font-size: .78rem; font-weight: 600; }
    .thumb[aria-checked=true] .name { color: #151c25; }
  `,
})
export class TemplateStripComponent {
  readonly doc = input.required<DocView>();
  readonly selected = input.required<TemplateId>();
  readonly pick = output<TemplateId>();
  readonly ids = TEMPLATE_IDS;
  readonly names = TEMPLATE_NAMES;

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    // Bring the selected template into view inside the strip (without scrolling the page).
    afterNextRender(() => {
      const strip = host.querySelector<HTMLElement>('.strip');
      const current = host.querySelector<HTMLElement>('[aria-checked=true]');
      if (strip && current) strip.scrollLeft = current.offsetLeft - strip.clientWidth / 2 + current.clientWidth / 2;
    });
  }
}
