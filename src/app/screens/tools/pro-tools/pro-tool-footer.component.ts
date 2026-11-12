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
    <footer class="mt-16 border-t border-foreground/10 pt-10">
      @if (segment(); as segment) {
        <div class="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <p class="font-title text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
            {{ segment.title }}
            <span class="block text-lg font-normal text-foreground-light sm:text-xl">Site profissional e atendimento automático para {{ segment.name.toLowerCase() }}.</span>
          </p>
          <a class="group inline-flex w-fit items-center gap-2 font-semibold text-foreground-emphasis md:justify-self-end" [routerLink]="'para/' + segment.slug | langLink">
            Ver como funciona
            <span aria-hidden="true" class="transition group-hover:translate-x-1">→</span>
          </a>
        </div>
      }
      <nav aria-label="Outras ferramentas grátis" class="mt-10 text-sm leading-loose text-foreground-light">
        <span class="font-semibold text-foreground">Outras ferramentas grátis:</span>
        @for (tool of others(); track tool.slug; let last = $last) {
          <a class="text-foreground underline decoration-foreground/20 underline-offset-4 transition hover:decoration-foreground-emphasis" [routerLink]="'tools/' + tool.slug | langLink">{{ tool.name }}</a>@if (!last) {<span aria-hidden="true">{{ ' · ' }}</span>}
        }
      </nav>
    </footer>
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
