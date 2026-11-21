import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';

/** Route wrapper for /services: the shared page shell. */
@Component({
  selector: 'app-services-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageShellComponent, RouterOutlet],
  templateUrl: './services-layout.component.html',
})
export class ServicesLayoutComponent {
}
