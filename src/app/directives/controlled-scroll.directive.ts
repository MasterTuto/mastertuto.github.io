import { Directive, effect, ElementRef, inject, input } from "@angular/core";

import { SectionStateService } from "../service/section-state.service";

@Directive({
    selector: '[scrollNavigatedTo]',
    standalone: false
})
export class ControlledScrollDirective {
  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  sectionService = inject(SectionStateService);

  controls = input<string>('', {
    alias: 'scrollNavigatedTo'
  });

  constructor() {
    effect(() => {
      const controls = this.controls();
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            this.sectionService.goToSectionByHash(controls);
          }
        });
      });

      intersectionObserver.observe(this.elementRef.nativeElement);

      return () => {
        intersectionObserver.disconnect();
      };
    });
  }
}
