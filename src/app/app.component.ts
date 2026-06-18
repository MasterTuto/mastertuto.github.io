import { Component } from '@angular/core';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PosthogService } from './service/posthog.service';

registerLocaleData(localePT);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
      RouterModule
    ]
})
export class AppComponent {
  constructor(
    posthogService: PosthogService
  ) {}
}
