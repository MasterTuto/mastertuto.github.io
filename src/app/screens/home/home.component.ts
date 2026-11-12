import { Component } from '@angular/core';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { PortfolioFeedModule } from './portfolio-feed/portfolio-feed.module';
import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';

registerLocaleData(localePT);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
      PageShellComponent,
      PortfolioFeedModule,
    ]
})
export class HomeComponent {
}
