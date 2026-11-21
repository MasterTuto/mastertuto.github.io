import { effect, inject, untracked } from '@angular/core';

import { BcsConfettiService } from '@bcs/services/confetti/confetti.service';

/**
 * Fires confetti once each time a game goes from "not won" to "won". The state the game starts in
 * (e.g. a daily puzzle already solved earlier) does not celebrate again.
 */
export function useWinConfetti(isWon: () => boolean): void {
  const confetti = inject(BcsConfettiService);
  let previous: boolean | null = null;
  effect(() => {
    const won = isWon();
    if (previous === false && won) untracked(() => confetti.fire());
    previous = won;
  });
}
