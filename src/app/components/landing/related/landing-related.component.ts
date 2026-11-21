import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BcsTextDirective } from '@bcs/directives/text/text.directive';
import { LandingLinkItem, LandingLinkListComponent } from '../link-list/landing-link-list.component';

/** Closing internal links: related services plus the full catalog. */
@Component({
  selector: 'app-landing-related',
  templateUrl: './landing-related.component.html',
  styleUrl: './landing-related.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsTextDirective, LandingLinkListComponent, RouterLink],
  host: { class: 'landing-related' },
})
export class LandingRelatedComponent {
  readonly heading = input.required<string>();
  readonly items = input.required<readonly LandingLinkItem[]>();
  readonly allLabel = input.required<string>();
  readonly allPath = input.required<string>();
}
