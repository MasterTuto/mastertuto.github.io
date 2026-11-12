import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProToolFooterComponent } from '../pro-tools/pro-tool-footer.component';
import { useProToolSeo } from '../pro-tools/pro-tool-seo';
import { proTools } from '../pro-tools/pro-tools.data';

/** TODO(agent): implement the tool. */
@Component({
  selector: 'app-simples',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProToolFooterComponent],
  template: `<article class="pro-tool" lang="pt-BR"><header class="pro-hero"><p class="pro-eyebrow">{{ tool.audience }}</p><h1>{{ tool.name }}</h1><p>{{ tool.description }}</p></header><app-pro-tool-footer [slug]="tool.slug" /></article>`,
})
export class SimplesCalculatorComponent {
  readonly tool = proTools[3];

  constructor() {
    useProToolSeo(this.tool);
  }
}
