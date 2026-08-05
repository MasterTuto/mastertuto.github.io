import { Component } from '@angular/core';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { PortfolioFeedModule } from './portfolio-feed/portfolio-feed.module';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

registerLocaleData(localePT);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
      NavigationComponent,
      PortfolioFeedModule,
      FooterComponent,
    ]
})
export class HomeComponent {
}
