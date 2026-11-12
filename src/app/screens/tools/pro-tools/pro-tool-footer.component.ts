import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { industries } from 'src/app/data/industries.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { allProTools } from './pro-tools.data';

/**
 * Bottom of a tool page: a link to the matching segment page (sites and automation for that
 * profession) and the other tools. `slug` is the current tool.
 */
@Component({
  selector: 'app-pro-tool-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LangLinkPipe],
  template: `
    @if (segment(); as segment) {
      <aside class="pro-card mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="pro-eyebrow !mb-1">Para {{ segment.name.toLowerCase() }}</p>
          <p class="text-base font-semibold text-foreground">{{ segment.title }}</p>
          <p class="mt-1 text-sm text-foreground-light">Site profissional e atendimento automático para a sua rotina.</p>
        </div>
        <a class="pro-btn shrink-0" [routerLink]="'para/' + segment.slug | langLink">Conhecer <span aria-hidden="true">→</span></a>
      </aside>
    }
    <section class="mt-10" aria-labelledby="pro-related-heading">
      <h2 id="pro-related-heading" class="text-lg font-semibold text-foreground">Outras ferramentas grátis</h2>
      <div class="pro-related">
        @for (tool of others(); track tool.slug) {
          <a class="catalog-card" [routerLink]="'tools/' + tool.slug | langLink">
            <span class="text-xs font-semibold uppercase tracking-wider text-foreground-emphasis">{{ tool.audience }}</span>
            <h3 class="font-semibold">{{ tool.name }}</h3>
            <span class="catalog-card-action">Abrir <span aria-hidden="true">→</span></span>
          </a>
        }
      </div>
    </section>
  `,
})
export class ProToolFooterComponent {
  readonly slug = input.required<string>();
  readonly segment = computed(() => {
    const tool = allProTools.find((item) => item.slug === this.slug());
    return industries.find((item) => item.slug === tool?.segment);
  });
  readonly others = computed(() => allProTools.filter((item) => item.slug !== this.slug()));
}
