import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerDeviceDesktop,
  tablerGlobe,
  tablerPencil,
  tablerPlugConnected,
} from '@ng-icons/tabler-icons';

import { services } from 'src/app/data/services.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslationInitializer } from 'src/app/service/translation.initializer';

/** Cross-links to the remaining services, shown at the end of each service page. */
@Component({
  selector: 'app-other-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIconComponent, TranslatePipe],
  providers: [
    provideIcons({ tablerArrowRight, tablerDeviceDesktop, tablerGlobe, tablerPencil, tablerPlugConnected }),
  ],
  template: `
    <section class="flex flex-col gap-6">
      <h2 class="text-2xl font-semibold text-foreground sm:text-3xl">
        {{ 'servicesPage.common.otherServices' | translate }}
      </h2>
      <div class="grid gap-4 md:grid-cols-3">
        @for (other of others(); track other.slug) {
          <a
            [routerLink]="['/', lang, 'services', other.slug]"
            class="group flex flex-col gap-3 rounded-xl bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span class="grid size-11 place-items-center rounded-lg bg-surface-decoration text-xl text-surface-decoration-foreground">
              <ng-icon [name]="other.icon" />
            </span>
            <h3 class="font-semibold text-foreground">{{ other.nameKey | translate }}</h3>
            <p class="text-sm text-foreground-light">{{ other.descriptionKey | translate }}</p>
            <span class="mt-auto flex items-center gap-1 text-sm font-semibold text-foreground-emphasis">
              {{ 'servicesPage.index.viewAll' | translate }}
              <ng-icon name="tablerArrowRight" class="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        }
      </div>
    </section>
  `,
})
export class OtherServicesComponent {
  private translationInitializer = inject(TranslationInitializer);

  readonly current = input.required<string>();
  readonly others = computed(() => services.filter((service) => service.slug !== this.current()));

  get lang(): string | null {
    return this.translationInitializer.currentLang;
  }
}
