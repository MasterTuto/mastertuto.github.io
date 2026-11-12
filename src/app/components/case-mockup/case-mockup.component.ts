import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProjectCase } from 'src/app/data/cases.data';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';

/**
 * Desktop screenshot in a browser frame, with the mobile screenshot overlapping its corner and a soft glow
 * in the client's color behind them. Shares a view transition name with the same case elsewhere, so it
 * morphs between the home page and the case page.
 */
@Component({
  selector: 'app-case-mockup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslatePipe],
  host: {
    class: 'relative isolate block pb-10 pr-6 sm:pr-12',
    '[style.view-transition-name]': "'case-' + project().slug",
  },
  template: `
    <div
      aria-hidden="true"
      class="pointer-events-none absolute -inset-10 -z-10"
      [style.background]="'radial-gradient(closest-side, ' + project().accent + '1a, transparent)'"
    ></div>
    <figure class="overflow-hidden rounded-xl border border-foreground/10 bg-surface shadow-2xl shadow-foreground/10">
      <div class="flex items-center gap-3 border-b border-foreground/10 px-4 py-2.5">
        <span class="flex gap-1.5" aria-hidden="true">
          <span class="size-2.5 rounded-full bg-foreground/15"></span>
          <span class="size-2.5 rounded-full bg-foreground/15"></span>
          <span class="size-2.5 rounded-full bg-foreground/15"></span>
        </span>
        <span class="truncate rounded-md bg-background px-3 py-0.5 text-xs text-foreground-light">{{ project().domain }}</span>
      </div>
      <img
        [src]="project().desktop"
        [alt]="project().name + ' — ' + ('cases.desktop' | translate)"
        [attr.loading]="eager() ? null : 'lazy'"
        width="1440"
        height="900"
        class="aspect-[16/10] w-full object-cover object-top"
      >
    </figure>
    <img
      [src]="project().mobile"
      [alt]="project().name + ' — ' + ('cases.mobile' | translate)"
      [attr.loading]="eager() ? null : 'lazy'"
      width="390"
      height="844"
      class="absolute bottom-0 right-0 aspect-[390/700] w-[26%] rounded-2xl border-4 border-primary object-cover object-top shadow-xl"
    >
  `,
})
export class CaseMockupComponent {
  readonly project = input.required<ProjectCase>();
  readonly eager = input(false, { transform: booleanAttribute });
}
