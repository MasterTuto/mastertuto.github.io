import { Component } from '@angular/core';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PosthogService } from './service/posthog.service';
import { CommandPalleteComponent } from './components/command-pallete/command-pallete.component';

registerLocaleData(localePT);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
      RouterModule,
      CommandPalleteComponent
    ]
})
export class AppComponent {
  constructor(
    posthogService: PosthogService
  ) {}
}
