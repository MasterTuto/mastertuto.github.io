import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface LandingLinkItem {
  readonly label: string;
  /** Absolute app path, already localized (e.g. `/pt/services/automacao-de-processos`). */
  readonly path: string;
  readonly description?: string;
}

/** Internal links with descriptive anchors: they help visitors and spread ranking between pages. */
@Component({
  selector: 'app-landing-link-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  host: { class: 'landing-link-list' },
  templateUrl: './landing-link-list.component.html',
  styleUrl: './landing-link-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LandingLinkListComponent {
  readonly items = input.required<readonly LandingLinkItem[]>();
}
