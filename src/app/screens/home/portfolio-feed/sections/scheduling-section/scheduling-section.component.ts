import { afterNextRender, Component } from '@angular/core';
import { SectionComponent } from 'src/app/components/section/section.component';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

interface CalApi {
  (...args: unknown[]): void;
  q: unknown[][];
  ns: Record<string, CalApi>;
  loaded?: boolean;
  config?: { forwardQueryParams?: boolean };
}

@Component({
  selector: 'app-scheduling-section',
  imports: [SectionComponent, TranslatePipe],
  templateUrl: './scheduling-section.component.html',
})
export class SchedulingSectionComponent {
  constructor() {
    afterNextRender(() => {
      const calWindow = window as Window & { Cal?: CalApi };
      if (!calWindow.Cal) {
        const cal = ((...args: unknown[]) => {
          if (args[0] === 'init' && typeof args[1] === 'string') {
            const namespace = args[1];
            if (!cal.ns[namespace]) {
              const api = ((...commands: unknown[]) => { api.q.push(commands); }) as CalApi;
              api.q = [];
              cal.ns[namespace] = api;
            }
            cal.ns[namespace].q.push(args);
            cal.q.push(['initNamespace', namespace]);
            return;
          }
          cal.q.push(args);
        }) as CalApi;
        cal.q = [];
        cal.ns = {};
        cal.loaded = true;
        calWindow.Cal = cal;
        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed/embed.js';
        script.async = true;
        document.head.appendChild(script);
      }

      const cal = calWindow.Cal;
      cal('init', '30min', { origin: 'https://app.cal.com' });
      cal.config = { ...cal.config, forwardQueryParams: true };
      cal.ns['30min']('inline', {
        elementOrSelector: '#my-cal-inline-30min',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        calLink: 'brenocs.dev/30min',
      });
      cal.ns['30min']('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    });
  }
}
