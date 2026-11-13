import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
  PLATFORM_ID,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerArrowBackUp,
  tablerArrowsShuffle,
  tablerBulb,
  tablerCalendar,
  tablerCornerDownLeft,
  tablerRefresh,
} from '@ng-icons/tabler-icons';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from 'src/app/pipes/translate/translate.pipe';
import { TranslationInitializer } from 'src/app/service/translation.initializer';
import { PosthogService } from 'src/app/service/posthog.service';
import {
  findShortestPath,
  getDailyPuzzle,
  isOneLetterApart,
  isWinningMove,
  isValidWord,
  normalizeWord,
  pickRandomPuzzle,
  todayKey,
  WordLadderDifficulty,
  WordLadderPuzzle,
} from 'src/app/utils/word-ladder/word-ladder';
import { TranslateService } from 'src/app/service/translate.service';
import { useGameSeo } from '../game-seo';
import { GameTimer } from '../shared/game-timer';
import { GameShareButtonComponent } from '../shared/game-share-button.component';

type GameMode = 'classic' | 'daily';
type GameStatus = 'idle' | 'playing' | 'won';

const STORAGE_KEY = 'wl.progress.v1';

interface Progress {
  best: Partial<Record<WordLadderDifficulty, number>>;
  dailyBest: number | null;
  streak: number;
  lastCompletedDateKey: number | null;
  difficulty: WordLadderDifficulty;
}

@Component({
  selector: 'word-ladder',
  templateUrl: './word-ladder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, TranslatePipe, NgIconComponent, GameShareButtonComponent],
  providers: [
    provideIcons({
      tablerArrowBackUp,
      tablerArrowsShuffle,
      tablerBulb,
      tablerCalendar,
      tablerCornerDownLeft,
      tablerRefresh,
    }),
  ],
  styles: [
    `:host button:focus-visible,:host a:focus-visible,:host summary:focus-visible{outline:2px solid #7a70e1;outline-offset:2px}`,
  ],
})
export class WordLadderComponent {
  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService);
  private translationInitializer = inject(TranslationInitializer);
  private posthog = inject(PosthogService);

  readonly moveInput = viewChild<ElementRef<HTMLInputElement>>('moveInput');
  readonly historyEl = viewChild<ElementRef<HTMLElement>>('historyEl');
  readonly timer = new GameTimer();

  difficulties: WordLadderDifficulty[] = ['easy', 'medium', 'hard'];
  modes: GameMode[] = ['classic', 'daily'];

  mode = signal<GameMode>('classic');
  difficulty = signal<WordLadderDifficulty>('easy');
  puzzle = signal<WordLadderPuzzle | null>(null);
  path = signal<string[]>([]);
  guess = signal('');
  error = signal<string | null>(null);
  status = signal<GameStatus>('idle');
  hintsRemaining = signal(3);
  hintsUsed = signal(0);
  /** Bumped on every rejected word so the input can replay its shake animation. */
  errorTick = signal(0);

  best = signal<Partial<Record<WordLadderDifficulty, number>>>({});
  dailyBest = signal<number | null>(null);
  streak = signal(0);
  dailyCompleted = signal(false);

  hintText = signal<string | null>(null);
  lastLiveAnnouncement = signal<string | null>(null);

  faqKeys: { question: string; answer: string }[] = [
    { question: 'wordLadder.faq-q1', answer: 'wordLadder.faq-a1' },
    { question: 'wordLadder.faq-q2', answer: 'wordLadder.faq-a2' },
    { question: 'wordLadder.faq-q3', answer: 'wordLadder.faq-a3' },
    { question: 'wordLadder.faq-q4', answer: 'wordLadder.faq-a4' },
    { question: 'wordLadder.faq-q5', answer: 'wordLadder.faq-a5' },
    { question: 'wordLadder.faq-q6', answer: 'wordLadder.faq-a6' },
    { question: 'wordLadder.faq-q7', answer: 'wordLadder.faq-a7' },
  ];

  readonly shareText = computed(() => {
    const puzzle = this.puzzle();
    if (!puzzle) return '';
    const moves = this.path().length > 1 ? this.path().length - 1 : (this.dailyBest() ?? 0);
    const label =
      this.mode() === 'daily'
        ? `${this.translateService.translate('wordLadder.mode-daily')} ${new Date().toISOString().slice(0, 10)}`
        : this.translateService.translate(`wordLadder.difficulty-${puzzle.difficulty}`);
    return this.translateService
      .translate('wordLadder.share-text')
      .replace('{label}', label)
      .replace('{start}', puzzle.start)
      .replace('{target}', puzzle.target)
      .replace('{moves}', String(moves))
      .replace('{par}', String(puzzle.optimalMoves))
      .replace('{time}', this.timer.label())
      .replace('{hints}', String(this.hintsUsed()));
  });

  private progress: Progress | null = null;
  private optimalPathCache: string[] | null = null;

  get lang(): string | null {
    return this.translationInitializer.currentLang;
  }

  get wordLength(): number {
    return this.puzzle()?.start.length ?? 4;
  }

  get moves(): number {
    return Math.max(0, this.path().length - 1);
  }

  chainWords(): string[] {
    const path = this.path();
    if (this.status() === 'won') {
      return path.slice(1, path.length - 1);
    }
    return path.slice(1);
  }

  onGuessInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (value !== target.value) target.value = value;
    this.guess.set(value);
    if (this.error()) this.error.set(null);
    // The clock starts with the first letter typed, not when the page opens.
    if (value && this.status() === 'playing') this.timer.start();
  }

  /** On phones, keep the input (and the feedback under it) above the on-screen keyboard. */
  onInputFocus(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!window.matchMedia?.('(pointer: coarse)').matches) return;
    setTimeout(() => {
      const el = this.moveInput()?.nativeElement;
      if (!el || document.activeElement !== el) return;
      const rect = el.getBoundingClientRect();
      const viewport = window.visualViewport?.height ?? window.innerHeight;
      if (rect.top < 72 || rect.bottom > viewport - 96) {
        el.scrollIntoView({ block: 'center', behavior: this.reducedMotion() ? 'auto' : 'smooth' });
      }
    }, 320);
  }

  /** Position of the letter that changed from the previous word, for highlighting. */
  changedIndex(index: number): number {
    const path = this.path();
    const word = path[index];
    const prev = path[index - 1];
    if (!word || !prev) return -1;
    for (let i = 0; i < word.length; i++) if (word[i] !== prev[i]) return i;
    return -1;
  }

  letters(word: string): string[] {
    return word.split('');
  }

  get currentBest(): number | null {
    if (this.mode() === 'daily') return this.dailyBest();
    return this.best()[this.difficulty()] ?? null;
  }

  constructor() {
    useGameSeo('word-ladder', 'wordLadder', () => this.faqJsonLd());

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.loadProgress();
      this.startGame(window.matchMedia?.('(pointer: fine)').matches ?? false);
    });
  }

  setMode(mode: GameMode): void {
    this.mode.set(mode);
    this.startGame();
  }

  setDifficulty(difficulty: WordLadderDifficulty): void {
    this.difficulty.set(difficulty);
    this.savePreference();
    this.posthog.capture('word_ladder_difficulty_selected', { difficulty });
    if (this.mode() === 'classic') {
      this.startGame();
    }
  }

  startGame(autofocus = true): void {
    const mode = this.mode();
    const puzzle =
      mode === 'daily'
        ? this.ensureDailyPuzzle()
        : pickRandomPuzzle(this.difficulty());

    this.puzzle.set(puzzle);
    this.path.set([puzzle.start]);
    this.guess.set('');
    this.error.set(null);
    this.hintText.set(null);
    this.hintsRemaining.set(3);
    this.hintsUsed.set(0);
    this.optimalPathCache = null;
    this.timer.reset();

    if (mode === 'daily' && this.dailyCompleted()) {
      this.status.set('won');
      return;
    }

    this.status.set('playing');
    this.posthog.capture('word_ladder_started', {
      mode,
      difficulty: puzzle.difficulty,
    });
    if (autofocus) this.focusInput();
  }

  submitMove(): void {
    if (this.status() !== 'playing') return;
    const puzzle = this.puzzle();
    if (!puzzle) return;

    const raw = this.guess();
    const normalized = normalizeWord(raw);

    if (normalized.length === 0) {
      this.reject('wordLadder.err-empty');
      return;
    }
    if (normalized.length !== puzzle.start.length) {
      this.reject('wordLadder.err-length');
      return;
    }
    if (!isValidWord(normalized)) {
      this.reject('wordLadder.err-dictionary');
      return;
    }

    const path = this.path();
    const previous = path[path.length - 1];

    if (normalized === previous) {
      this.reject('wordLadder.err-one-letter');
      return;
    }
    if (!isOneLetterApart(previous, normalized)) {
      this.reject('wordLadder.err-one-letter');
      return;
    }

    this.error.set(null);
    this.hintText.set(null);
    this.optimalPathCache = null;
    this.path.set([...path, normalized]);
    this.guess.set('');
    this.announce(
      this.translateService
        .translate('wordLadder.live-move')
        .replace('{word}', normalized),
    );

    this.timer.start();
    this.scrollHistoryToEnd();

    this.posthog.capture('word_ladder_move', {
      mode: this.mode(),
      word: normalized,
      moves: this.path().length - 1,
    });

    if (isWinningMove(normalized, puzzle.target)) {
      this.completePuzzle();
    } else {
      this.focusInput();
    }
  }

  undoMove(): void {
    if (this.status() !== 'playing') return;
    const path = this.path();
    if (path.length <= 1) return;
    this.path.set(path.slice(0, -1));
    this.guess.set('');
    this.error.set(null);
    this.hintText.set(null);
    this.optimalPathCache = null;
    this.timer.start();
    this.announce(this.translateService.translate('wordLadder.live-undo'));
    this.focusInput();
  }

  useHint(): void {
    if (this.status() !== 'playing') return;
    if (this.hintsRemaining() <= 0) return;
    const puzzle = this.puzzle();
    if (!puzzle) return;

    const nextWord = this.nextOptimalWord();
    if (!nextWord) return;

    this.timer.start();
    const used = this.hintsUsed() + 1;
    this.hintsRemaining.update((h) => h - 1);
    this.hintsUsed.set(used);

    const path = this.path();
    const previous = path[path.length - 1];

    if (used === 1) {
      this.hintText.set(
        this.translateService
          .translate('wordLadder.hint-1')
          .replace('{letter}', nextWord[0]),
      );
    } else if (used === 2) {
      let position = 0;
      for (let i = 0; i < previous.length; i++) {
        if (previous[i] !== nextWord[i]) {
          position = i;
          break;
        }
      }
      this.hintText.set(
        this.translateService
          .translate('wordLadder.hint-2')
          .replace('{position}', String(position + 1)),
      );
    } else {
      this.hintText.set(
        this.translateService
          .translate('wordLadder.hint-3')
          .replace('{word}', nextWord),
      );
    }

    const hint = this.hintText();
    if (hint) {
      this.announce(hint);
    }
  }

  nextPuzzle(): void {
    if (this.mode() === 'daily') return;
    this.startGame();
  }

  private completePuzzle(): void {
    const puzzle = this.puzzle();
    if (!puzzle) return;
    const moves = this.moves;
    this.status.set('won');
    this.timer.stop();
    this.saveResult(moves);
    this.announce(this.translateService.translate('wordLadder.complete'));

    this.posthog.capture('word_ladder_completed', {
      mode: this.mode(),
      difficulty: puzzle.difficulty,
      moves,
      optimal: puzzle.optimalMoves,
    });
  }

  private saveResult(moves: number): void {
    const progress = this.ensureProgress();

    if (this.mode() === 'daily') {
      const today = todayKey();
      progress.dailyBest =
        progress.dailyBest === null
          ? moves
          : Math.min(progress.dailyBest, moves);
      if (progress.lastCompletedDateKey === today) {
        // Already counted today; keep streak as-is.
      } else if (progress.lastCompletedDateKey === today - 1) {
        progress.streak += 1;
      } else {
        progress.streak = 1;
      }
      progress.lastCompletedDateKey = today;
      this.dailyBest.set(progress.dailyBest);
      this.streak.set(progress.streak);
      this.dailyCompleted.set(true);
    } else {
      const difficulty = this.puzzle()?.difficulty ?? this.difficulty();
      const current = progress.best[difficulty];
      if (current === undefined || moves < current) {
        progress.best[difficulty] = moves;
      }
      this.best.set({ ...progress.best });
    }

    this.persist(progress);
  }

  private ensureDailyPuzzle(): WordLadderPuzzle {
    const puzzle = getDailyPuzzle();
    const today = todayKey();
    const progress = this.ensureProgress();
    this.dailyCompleted.set(progress.lastCompletedDateKey === today);
    if (this.dailyCompleted()) {
      this.dailyBest.set(progress.dailyBest);
      this.streak.set(progress.streak);
    }
    return puzzle;
  }

  private ensureProgress(): Progress {
    if (this.progress === null) {
      this.progress = {
        best: {},
        dailyBest: null,
        streak: 0,
        lastCompletedDateKey: null,
        difficulty: 'easy',
      };
    }
    return this.progress;
  }

  private loadProgress(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Progress;
        this.progress = {
          best: parsed.best ?? {},
          dailyBest: parsed.dailyBest ?? null,
          streak: parsed.streak ?? 0,
          lastCompletedDateKey: parsed.lastCompletedDateKey ?? null,
          difficulty: parsed.difficulty ?? 'easy',
        };
        this.best.set(this.progress.best);
        this.dailyBest.set(this.progress.dailyBest);
        this.streak.set(this.progress.streak);
        this.difficulty.set(this.progress.difficulty);
      }
    } catch {
      this.progress = null;
    }
  }

  private persist(progress: Progress): void {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Storage unavailable — game still works for this session.
    }
  }

  private savePreference(): void {
    const progress = this.ensureProgress();
    progress.difficulty = this.difficulty();
    this.persist(progress);
  }

  private nextOptimalWord(): string | null {
    const puzzle = this.puzzle();
    if (!puzzle) return null;
    const path = this.path();
    const from = path[path.length - 1];
    if (from === puzzle.target) return null;

    if (this.optimalPathCache === null) {
      this.optimalPathCache = findShortestPath(from, puzzle.target);
    }
    const optimal = this.optimalPathCache;
    if (!optimal || optimal.length < 2) return null;
    return optimal[1];
  }

  private focusInput(): void {
    // Wait for the input to exist (it is only rendered while playing), and never scroll the page.
    setTimeout(() => this.moveInput()?.nativeElement.focus({ preventScroll: true }));
  }

  private reject(key: string): void {
    this.error.set(this.translateService.translate(key));
    this.errorTick.update((n) => n + 1);
    this.announce(this.error() ?? '');
  }

  private scrollHistoryToEnd(): void {
    setTimeout(() => {
      const el = this.historyEl()?.nativeElement;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: this.reducedMotion() ? 'auto' : 'smooth' });
    });
  }

  private reducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  }

  private announce(text: string): void {
    this.lastLiveAnnouncement.set(text);
  }

  /** FAQ about the rules, shown in search results next to the game. */
  private faqJsonLd(): Record<string, unknown>[] {
    return [
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a Word Ladder game?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A word ladder is a word puzzle where you transform a starting word into a target word by changing exactly one letter at a time, using a real English word after every change.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do you play Word Ladder?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Start from the given word, then enter a new word that differs from it by exactly one letter. Keep going until you reach the target word. Try to finish in as few moves as possible.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are the rules of Word Ladder?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every word must be a real English word of the same length as the start and target words, and each move may change exactly one letter. You cannot repeat your previous word or skip letters.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you change more than one letter?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Each move may change exactly one letter. Changing two or more letters in a single move is not allowed in a word ladder.',
            },
          },
          {
            '@type': 'Question',
            name: 'What makes a Word Ladder difficult?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Difficulty comes from the distance between the words, the number of available intermediate words, and how many different paths exist between the start and target.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are Word Ladder puzzles good for kids?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Short word ladders with common words help children practise spelling and vocabulary, and they are often used in classrooms as a word-building activity.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I play Word Ladder online for free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. This Word Ladder game is completely free to play online in your browser, with no registration and no downloads.',
            },
          },
        ],
      },
    ];
  }
}
