import { fromEvent, map, startWith } from 'rxjs';
import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { sections } from 'src/app/data/sections.data';
import { ScrollService } from 'src/app/service/scroll.service';
import { SectionStateService } from 'src/app/service/section-state.service';
import { SectionService } from 'src/app/service/section.service';

const ANIMATION_THRESHOLD = 120;

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    host: {
      class: 'sticky top-0 left-0 z-50'
    },
    standalone: false
})
export class NavigationComponent {
  sectionService = inject(SectionService);
  sectionStateService = inject(SectionStateService);
  scrollService = inject(ScrollService);
  destroyRef = inject(DestroyRef);

  selected = toSignal(this.sectionStateService.currentSection$);
  navItems = sections;

  isAtBottom = signal(false);

  sizeStyling = computed(() => {
    switch (this.isAtBottom()) {
      case true:
        // class=""
        return 'px-2 text-xs';
      default:
        return 'h-full';
    }
  });

  logoStyling = computed(() => {
    switch (this.isAtBottom()) {
      case true:
        return 'h-8 w-8';
      default:
        return 'h-16 w-16';
    }
  });

  constructor() {
    afterNextRender( () => {
      let hash = window.location.hash;
      this.navItems
        .forEach((item, index) => {
          if (item.href === hash) {
            this.sectionStateService.currentSection = index;
          }
        });

      fromEvent(window, 'scroll')
        .pipe(
          startWith(null),
          map(() => {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            if (window.scrollY >= viewportHeight - ANIMATION_THRESHOLD) {
              return true;
            }
            return false;
          }),
          takeUntilDestroyed(this.destroyRef),
      ).subscribe((isAtBottom) => this.isAtBottom.set(isAtBottom));
    })
  }

  changeSelectedSection(sectionIndex: number): void {
    this.sectionStateService.currentSection = sectionIndex;
  }
}
