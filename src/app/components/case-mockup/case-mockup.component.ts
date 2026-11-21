import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProjectCase } from 'src/app/data/cases.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

/**
 * Desktop screenshot in a browser frame, with the mobile screenshot overlapping its corner and a soft glow
 * in the client's color behind them. Shares a view transition name with the same case elsewhere, so it
 * morphs between the home page and the case page.
 */
@Component({
  selector: 'app-case-mockup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  host: {
    class: 'relative isolate block pb-10 pr-6 sm:pr-12',
    '[style.view-transition-name]': "'case-' + project().slug",
  },
  templateUrl: './case-mockup.component.html',
})
export class CaseMockupComponent {
  readonly project = input.required<ProjectCase>();
  readonly eager = input(false, { transform: booleanAttribute });
}
