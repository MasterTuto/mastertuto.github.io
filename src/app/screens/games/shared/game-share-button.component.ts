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
  templateUrl: './game-share-button.component.html',
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
