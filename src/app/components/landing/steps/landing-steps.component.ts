import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { BcsTextDirective } from '@bcs/directives/text/text.directive';

export interface LandingStep {
  readonly title: string;
  readonly text: string;
}

export type LandingStepsComponentLayout = 'vertical' | 'horizontal';

/** Numbered process (Goal-Gradient effect: the visitor sees how short the path is). */
@Component({
  selector: 'app-landing-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BcsTextDirective],
  host: { class: 'landing-steps', '[attr.data-layout]': 'layout()' },
  templateUrl: './landing-steps.component.html',
  styleUrl: './landing-steps.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LandingStepsComponent {
  readonly items = input.required<readonly LandingStep[]>();
  readonly layout = input<LandingStepsComponentLayout>('vertical');
}
