import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
import {
  SEGMENTS_ON_PAGE,
  TOOLS_PER_SEGMENT,
  invoiceTool,
  toolSegments,
} from './pro-tools/pro-tools.data';
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
  readonly segments = toolSegments;
  readonly toolLimit = TOOLS_PER_SEGMENT;
  readonly segmentLimit = SEGMENTS_ON_PAGE;
  readonly invoice = invoiceTool;
  private readonly route = inject(ActivatedRoute);
  readonly isDevTools = this.route.snapshot.routeConfig?.path === 'dev-tools';
  /** Segments whose tools past the limit are shown. */
  readonly expanded = signal<ReadonlySet<string>>(new Set());
  /** Segments past `segmentLimit` are shown. */
  readonly allSegments = signal(false);
  /** Three invoice sheets in different template colors for the illustration. */
  readonly papers = [
    { accent: '#7a70e1', tilt: -7 },
    { accent: '#151c25', tilt: 0 },
    { accent: '#e0844a', tilt: 7 },
  ];

  toggleSegment(slug: string): void {
    this.expanded.update((current) => {
      const next = new Set(current);
      if (!next.delete(slug)) next.add(slug);
      return next;
    });
  }

  constructor() {
    // A link to /tools#<segment> (header menu, segment pages) must reveal a group past the limit.
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    this.route.fragment.pipe(takeUntilDestroyed()).subscribe((target) => {
      const index = this.segments.findIndex((segment) => segment.slug === target);
      if (index < 0) return;
      if (index >= this.segmentLimit) this.allSegments.set(true);
      if (isBrowser) setTimeout(() => document.getElementById(target!)?.scrollIntoView({ block: 'start' }));
    });
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
