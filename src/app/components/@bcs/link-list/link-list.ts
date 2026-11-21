import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BcsLinkItem {
  readonly label: string;
  /** Absolute app path, already localized (e.g. `/pt/services/automacao-de-processos`). */
  readonly path: string;
  readonly description?: string;
}

/** Internal links with descriptive anchors: they help visitors and spread ranking between pages. */
@Component({
  selector: 'bcs-link-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  host: { class: 'bcs-link-list' },
  template: `
    <ul role="list" class="bcs-link-list__items">
      @for (item of items(); track item.path) {
        <li>
          <a class="bcs-link-list__link" [routerLink]="item.path">
            <span class="bcs-link-list__label">{{ item.label }}</span>
            @if (item.description) {
              <span class="bcs-link-list__description">{{ item.description }}</span>
            }
          </a>
        </li>
      }
    </ul>
  `,
})
export class BcsLinkList {
  readonly items = input.required<readonly BcsLinkItem[]>();
}
