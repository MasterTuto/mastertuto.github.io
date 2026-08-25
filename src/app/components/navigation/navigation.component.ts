import { fromEvent, map, startWith } from 'rxjs';
import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerArrowRight } from '@ng-icons/tabler-icons';

import { sections } from 'src/app/data/sections.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslateService } from 'src/app/service/translate.service';
import { ButtonComponent } from '../@my/button/button.component';
import { createWhatsAppLink } from 'src/app/utils/html';

const ANIMATION_THRESHOLD = 120;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  host: {
    class: 'sticky top-0 left-0 z-50'
  },
  providers: [provideIcons({
      tablerArrowRight
    })],
  imports: [
    TranslatePipe,
    ButtonComponent,
    NgIconComponent
  ]
})
export class NavigationComponent {
  destroyRef = inject(DestroyRef);
  private translateService = inject(TranslateService);

  navItems = sections;

  isAtBottom = signal(false);

  get whatsappLink(): string {
    return createWhatsAppLink(this.translateService.translate("home.whatsappMessage"));
  }

  sizeStyling = computed(() => {
    switch (this.isAtBottom()) {
      case true:
        return 'px-2 text-xs bg-surface/50';
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
}
