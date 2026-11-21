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
  templateUrl: './pro-tool-footer.component.html',
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
