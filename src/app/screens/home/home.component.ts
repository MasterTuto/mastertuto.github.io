import { Component, inject } from '@angular/core';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { PortfolioFeedModule } from './portfolio-feed/portfolio-feed.module';
import { PageShellComponent } from 'src/app/components/page-shell/page-shell.component';
import { usePageSeo } from 'src/app/seo/page-seo';
import { TranslateService } from 'src/app/service/translate.service';

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
  constructor() {
    const translate = inject(TranslateService);
    usePageSeo(() => ({
      title: translate.translate('seo.home.title'),
      description: translate.translate('seo.home.description'),
      path: '/',
    }));
  }
}
