import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';

/** Route wrapper for /services: the shared page shell. */
@Component({
  selector: 'app-services-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageShellComponent, RouterOutlet],
  template: `<app-page-shell><router-outlet /></app-page-shell>`,
})
export class ServicesLayoutComponent {
}
