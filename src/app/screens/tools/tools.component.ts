import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  /** Selected profession tab. */
  readonly active = signal(0);
  /** Three invoice sheets in different template colors for the illustration. */
  readonly papers = [
    { accent: '#7a70e1', tilt: -7 },
    { accent: '#151c25', tilt: 0 },
    { accent: '#e0844a', tilt: 7 },
  ];

  /** Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern). */
  onTabKey(event: KeyboardEvent): void {
    const last = this.proTools.length - 1;
    const current = this.active();
    const next =
      event.key === 'ArrowRight' ? (current === last ? 0 : current + 1)
      : event.key === 'ArrowLeft' ? (current === 0 ? last : current - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    this.active.set(next);
    (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role=tab]')[next]?.focus();
  }

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
