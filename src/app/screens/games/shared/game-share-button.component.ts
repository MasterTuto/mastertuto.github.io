import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerShare } from '@ng-icons/tabler-icons';

import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { shareResult } from './share-result';

/**
 * "Share result" button for the win screens. `text` is the full message (game, level, time, moves);
 * the page URL is appended. Shows "Link copied" for a moment when the clipboard was used.
 */
@Component({
  selector: 'app-game-share-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIconComponent, TranslatePipe],
  providers: [provideIcons({ tablerShare, tablerCheck })],
  template: `
    <button
      type="button"
      (click)="share()"
      class="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground-emphasis"
    >
      <ng-icon [name]="copied() ? 'tablerCheck' : 'tablerShare'" aria-hidden="true" />
      <span>{{ (copied() ? 'games.shareCopied' : 'games.share') | translate }}</span>
    </button>
    <span class="sr-only" role="status" aria-live="polite">{{ copied() ? ('games.shareCopied' | translate) : '' }}</span>
  `,
})
export class GameShareButtonComponent {
  readonly text = input.required<string>();
  readonly copied = signal(false);
  private resetId: ReturnType<typeof setTimeout> | undefined;

  async share(): Promise<void> {
    const outcome = await shareResult(this.text());
    if (outcome !== 'copied') return;
    this.copied.set(true);
    clearTimeout(this.resetId);
    this.resetId = setTimeout(() => this.copied.set(false), 2200);
  }
}
