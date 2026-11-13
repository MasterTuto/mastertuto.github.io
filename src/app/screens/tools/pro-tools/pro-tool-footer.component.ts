import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { industries } from 'src/app/data/industries.data';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { TOOLS_PER_SEGMENT, allProTools, invoiceTool, toolSegments } from './pro-tools.data';

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
      @if (sameSegment().length) {
        <nav [attr.aria-label]="'Mais ferramentas para ' + group()!.name" class="mt-10">
          <h2 class="text-sm font-semibold text-foreground">Mais para {{ group()!.name.toLowerCase() }}</h2>
          <ul class="mt-2 divide-y divide-foreground/10 border-y border-foreground/10">
            @for (tool of sameSegment(); track tool.slug) {
              <li>
                <a class="group flex items-center justify-between gap-4 py-3 text-foreground" [routerLink]="'tools/' + tool.slug | langLink">
                  {{ tool.name }}
                  <span aria-hidden="true" class="text-foreground-emphasis transition-transform group-hover:translate-x-1">→</span>
                </a>
              </li>
            }
          </ul>
          @if (sameSegmentMore() > 0) {
            <a class="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-foreground-emphasis" [routerLink]="'tools' | langLink" [fragment]="group()!.slug">Ver mais {{ sameSegmentMore() }}</a>
          }
        </nav>
      }
      <nav aria-label="Outras ferramentas grátis" class="mt-8 text-sm leading-loose text-foreground-light">
        <span class="font-semibold text-foreground">Outras ferramentas grátis:</span>
        @for (tool of others(); track tool.slug) {
          <a class="text-foreground underline decoration-foreground/20 underline-offset-4 transition hover:decoration-foreground-emphasis" [routerLink]="'tools/' + tool.slug | langLink">{{ tool.name }}</a><span aria-hidden="true">{{ ' · ' }}</span>
        }
        <a class="font-semibold text-foreground-emphasis" [routerLink]="'tools' | langLink">Ver todas →</a>
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
  /** The segment group of the current tool, if it belongs to one. */
  readonly group = computed(() => toolSegments.find((segment) => segment.tools.some((tool) => tool.slug === this.slug())));
  private readonly siblings = computed(() => this.group()?.tools.filter((tool) => tool.slug !== this.slug()) ?? []);
  /** Other tools of the same segment, up to the per-segment limit. */
  readonly sameSegment = computed(() => this.siblings().slice(0, TOOLS_PER_SEGMENT));
  readonly sameSegmentMore = computed(() => this.siblings().length - this.sameSegment().length);
  /** The invoice generator and the first tool of each other segment, at most four links. */
  readonly others = computed(() =>
    [invoiceTool, ...toolSegments.filter((segment) => segment !== this.group()).map((segment) => segment.tools[0])]
      .filter((tool) => tool.slug !== this.slug())
      .slice(0, 4),
  );
}
