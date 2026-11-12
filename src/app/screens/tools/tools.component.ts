import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerAirConditioning,
  tablerBabyCarriage,
  tablerBolt,
  tablerFileInvoice,
  tablerGavel,
  tablerReportMoney,
  tablerTools,
} from '@ng-icons/tabler-icons';
import { invoiceTool, proTools } from './pro-tools/pro-tools.data';
import { devTools } from './dev-tools/dev-tools.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import { usePageSeo } from 'src/app/seo/page-seo';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, TranslatePipe, LangLinkPipe, RouterLink],
  providers: [
    provideIcons({ tablerTools, tablerBolt, tablerAirConditioning, tablerGavel, tablerReportMoney, tablerBabyCarriage, tablerFileInvoice }),
  ],
})
export class ToolsComponent {
  readonly tools = devTools;
  readonly proTools = proTools;
  readonly invoice = invoiceTool;
  readonly isDevTools = inject(ActivatedRoute).snapshot.routeConfig?.path === 'dev-tools';

  constructor() {
    const translate = inject(TranslateService);
    const t = (path: string) => translate.translate(path);
    usePageSeo(() =>
      this.isDevTools
        ? {
            // The dev tools are written in English only: one canonical URL for every language prefix.
            title: 'Free Developer Tools: JSON Formatter and JWT Decoder',
            description:
              'Free browser-based developer tools. Format, validate and minify JSON or decode JWT headers, payloads and expiration claims locally.',
            path: '/tools/dev-tools',
            fixedLanguage: 'en',
            breadcrumbs: [['Home', '/'], ['Tools', '/tools'], ['Dev Tools', '/tools/dev-tools']],
          }
        : {
            title: t('catalog.toolsTitle'),
            description: t('catalog.toolsIntro'),
            path: '/tools',
            breadcrumbs: [[t('home.nav.home'), '/'], [t('tools.label'), '/tools']],
          },
    );
  }
}
