import { DestroyRef, computed, inject, signal } from '@angular/core';

/**
 * Elapsed-time clock shared by the games. It stays at 0:00 until `start()` is called, which games do
 * on the player's first move, so reading the rules or choosing a level never costs time. Calling
 * `start()` again while running is a no-op. The clock pauses while the tab is hidden and resumes
 * when it is visible again. Must be created in an injection context (a field initializer).
 */
export class GameTimer {
  /** Whole seconds counted so far. */
  readonly elapsed = signal(0);
  readonly running = signal(false);
  /** `m:ss`, or `h:mm:ss` past one hour. */
  readonly label = computed(() => formatDuration(this.elapsed()));

  private startedAt = 0;
  private accumulated = 0;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private stopped = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    const onVisibility = () => {
      if (!this.running()) return;
      if (document.hidden) this.suspend();
      else this.resume();
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onVisibility);
      destroyRef.onDestroy(() => document.removeEventListener('visibilitychange', onVisibility));
    }
    destroyRef.onDestroy(() => this.clear());
  }

  /** Starts counting if the clock is idle. Ignored after `stop()` until `reset()`. */
  start(): void {
    if (this.running() || this.stopped || typeof window === 'undefined') return;
    this.running.set(true);
    this.resume();
  }

  /** Freezes the clock (on a win or a loss). The elapsed value is kept. */
  stop(): void {
    if (this.running()) this.suspend();
    this.running.set(false);
    this.stopped = true;
  }

  /** Back to 0:00 and idle, for a new game. */
  reset(): void {
    this.clear();
    this.running.set(false);
    this.stopped = false;
    this.accumulated = 0;
    this.elapsed.set(0);
  }

  private resume(): void {
    this.clear();
    this.startedAt = Date.now();
    this.timerId = setInterval(() => this.tick(), 250);
  }

  private suspend(): void {
    this.tick();
    this.accumulated = this.elapsed() * 1000 + ((Date.now() - this.startedAt) % 1000);
    this.clear();
  }

  private tick(): void {
    this.elapsed.set(Math.floor((this.accumulated + Date.now() - this.startedAt) / 1000));
  }

  private clear(): void {
    if (this.timerId !== null) clearInterval(this.timerId);
    this.timerId = null;
  }
}

export function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${ss}` : `${m}:${ss}`;
}
