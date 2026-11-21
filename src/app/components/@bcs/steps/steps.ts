import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BcsText } from '@bcs/text';

export interface BcsStep {
  readonly title: string;
  readonly text: string;
}

export type BcsStepsLayout = 'vertical' | 'horizontal';

/** Numbered process (Goal-Gradient effect: the visitor sees how short the path is). */
@Component({
  selector: 'bcs-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsText],
  host: { class: 'bcs-steps', '[attr.data-layout]': 'layout()' },
  template: `
    <ol class="bcs-steps__items">
      @for (step of items(); track step.title; let index = $index) {
        <li class="bcs-steps__item">
          <span class="bcs-steps__index" aria-hidden="true">{{ index + 1 }}</span>
          <div class="bcs-steps__body">
            <h3 bcs-text="h4">{{ step.title }}</h3>
            <p bcs-text="small" tone="muted">{{ step.text }}</p>
          </div>
        </li>
      }
    </ol>
  `,
})
export class BcsSteps {
  readonly items = input.required<readonly BcsStep[]>();
  readonly layout = input<BcsStepsLayout>('vertical');
}
