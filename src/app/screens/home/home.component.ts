import { Component } from '@angular/core';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { NavigationModule } from '../../components/navigation/navigation.module';
import { PortfolioFeedModule } from './portfolio-feed/portfolio-feed.module';

registerLocaleData(localePT);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
      NavigationModule,
      PortfolioFeedModule,
    ]
})
export class HomeComponent {
}
