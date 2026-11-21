import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

let nextGroup = 0;

/**
 * Vertical set of disclosure panels (`bcs-accordion-item`). Built on native `<details>`, so it works
 * with keyboard and screen readers without script. `single` keeps at most one panel open.
 */
@Component({
  selector: 'bcs-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bcs-accordion' },
})
export class BcsAccordionComponent {
  readonly single = input(true, { transform: booleanAttribute });
  readonly group = `bcs-accordion-${nextGroup++}`;
}
