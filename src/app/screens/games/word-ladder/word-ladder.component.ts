import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
  PLATFORM_ID,
} from "@angular/core";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Meta, Title } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "src/app/pipes/translate/translate.pipe";
import { TranslateService } from "src/app/service/translate.service";
import { PosthogService } from "src/app/service/posthog.service";
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
} from "src/app/utils/word-ladder/word-ladder";

type GameMode = "classic" | "daily";
type GameStatus = "idle" | "playing" | "won";

const STORAGE_KEY = "wl.progress.v1";
const SITE_URL = "https://brenocs.dev.br";

interface Progress {
  best: Partial<Record<WordLadderDifficulty, number>>;
  dailyBest: number | null;
  streak: number;
  lastCompletedDateKey: number | null;
  difficulty: WordLadderDifficulty;
}

@Component({
  selector: "word-ladder",
  templateUrl: "./word-ladder.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, TranslatePipe],
})
export class WordLadderComponent {
  private platformId = inject(PLATFORM_ID);
  private translateService = inject(TranslateService);
  private posthog = inject(PosthogService);
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  readonly moveInput = viewChild<ElementRef<HTMLInputElement>>("moveInput");

  difficulties: WordLadderDifficulty[] = ["easy", "medium", "hard"];
  modes: GameMode[] = ["classic", "daily"];

  mode = signal<GameMode>("classic");
  difficulty = signal<WordLadderDifficulty>("easy");
  puzzle = signal<WordLadderPuzzle | null>(null);
  path = signal<string[]>([]);
  guess = signal("");
  error = signal<string | null>(null);
  status = signal<GameStatus>("idle");
  hintsRemaining = signal(3);
  hintsUsed = signal(0);
  elapsed = signal(0);

  best = signal<Partial<Record<WordLadderDifficulty, number>>>({});
  dailyBest = signal<number | null>(null);
  streak = signal(0);
  dailyCompleted = signal(false);

  hintText = signal<string | null>(null);
  shareMessage = signal<string | null>(null);
  lastLiveAnnouncement = signal<string | null>(null);

  faqKeys: { question: string; answer: string }[] = [
    { question: "wordLadder.faq-q1", answer: "wordLadder.faq-a1" },
    { question: "wordLadder.faq-q2", answer: "wordLadder.faq-a2" },
    { question: "wordLadder.faq-q3", answer: "wordLadder.faq-a3" },
    { question: "wordLadder.faq-q4", answer: "wordLadder.faq-a4" },
    { question: "wordLadder.faq-q5", answer: "wordLadder.faq-a5" },
    { question: "wordLadder.faq-q6", answer: "wordLadder.faq-a6" },
    { question: "wordLadder.faq-q7", answer: "wordLadder.faq-a7" },
  ];

  private progress: Progress | null = null;
  private timerId: ReturnType<typeof setInterval> | null = null;
  private startedAt = 0;
  private optimalPathCache: string[] | null = null;

  get lang(): string | null {
    return this.translateService.currentLang;
  }

  get wordLength(): number {
    return this.puzzle()?.start.length ?? 4;
  }

  get moves(): number {
    return Math.max(0, this.path().length - 1);
  }

  chainWords(): string[] {
    const path = this.path();
    if (this.status() === "won") {
      return path.slice(1, path.length - 1);
    }
    return path.slice(1);
  }

  onGuessInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.guess.set(target.value);
  }

  get timeLabel(): string {
    const total = this.elapsed();
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  get currentBest(): number | null {
    if (this.mode() === "daily") return this.dailyBest();
    return this.best()[this.difficulty()] ?? null;
  }

  constructor() {
    this.setupSeo();

    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      this.loadProgress();
      this.attachVisibilityHandler();
      this.startGame();
    });
  }

  setMode(mode: GameMode): void {
    this.mode.set(mode);
    this.startGame();
  }

  setDifficulty(difficulty: WordLadderDifficulty): void {
    this.difficulty.set(difficulty);
    this.savePreference();
    this.posthog.capture("word_ladder_difficulty_selected", { difficulty });
    if (this.mode() === "classic") {
      this.startGame();
    }
  }

  startGame(): void {
    const mode = this.mode();
    const puzzle =
      mode === "daily"
        ? this.ensureDailyPuzzle()
        : pickRandomPuzzle(this.difficulty());

    this.puzzle.set(puzzle);
    this.path.set([puzzle.start]);
    this.guess.set("");
    this.error.set(null);
    this.hintText.set(null);
    this.shareMessage.set(null);
    this.hintsRemaining.set(3);
    this.hintsUsed.set(0);
    this.optimalPathCache = null;
    this.stopTimer();
    this.elapsed.set(0);
    this.startedAt = 0;

    if (mode === "daily" && this.dailyCompleted()) {
      this.status.set("won");
      return;
    }

    this.status.set("playing");
    this.posthog.capture("word_ladder_started", { mode, difficulty: puzzle.difficulty });
    this.focusInput();
  }

  submitMove(): void {
    if (this.status() !== "playing") return;
    const puzzle = this.puzzle();
    if (!puzzle) return;

    const raw = this.guess();
    const normalized = normalizeWord(raw);

    if (normalized.length === 0) {
      this.error.set(this.translateService.translate("wordLadder.err-empty"));
      return;
    }
    if (normalized.length !== puzzle.start.length) {
      this.error.set(this.translateService.translate("wordLadder.err-length"));
      return;
    }
    if (!isValidWord(normalized)) {
      this.error.set(this.translateService.translate("wordLadder.err-dictionary"));
      return;
    }

    const path = this.path();
    const previous = path[path.length - 1];

    if (normalized === previous) {
      this.error.set(this.translateService.translate("wordLadder.err-one-letter"));
      return;
    }
    if (!isOneLetterApart(previous, normalized)) {
      this.error.set(this.translateService.translate("wordLadder.err-one-letter"));
      return;
    }

    this.error.set(null);
    this.hintText.set(null);
    this.optimalPathCache = null;
    this.path.set([...path, normalized]);
    this.guess.set("");
    this.announce(
      this.translateService
        .translate("wordLadder.live-move")
        .replace("{word}", normalized),
    );

    if (this.startedAt === 0) {
      this.startedAt = Date.now();
      this.startTimer();
    }

    this.posthog.capture("word_ladder_move", {
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
    if (this.status() !== "playing") return;
    const path = this.path();
    if (path.length <= 1) return;
    this.path.set(path.slice(0, -1));
    this.guess.set("");
    this.error.set(null);
    this.hintText.set(null);
    this.optimalPathCache = null;
    this.announce(this.translateService.translate("wordLadder.live-undo"));
    this.focusInput();
  }

  useHint(): void {
    if (this.status() !== "playing") return;
    if (this.hintsRemaining() <= 0) return;
    const puzzle = this.puzzle();
    if (!puzzle) return;

    const nextWord = this.nextOptimalWord();
    if (!nextWord) return;

    const used = this.hintsUsed() + 1;
    this.hintsRemaining.update((h) => h - 1);
    this.hintsUsed.set(used);

    const path = this.path();
    const previous = path[path.length - 1];

    if (used === 1) {
      this.hintText.set(
        this.translateService.translate("wordLadder.hint-1").replace("{letter}", nextWord[0]),
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
        this.translateService.translate("wordLadder.hint-2").replace("{position}", String(position + 1)),
      );
    } else {
      this.hintText.set(
        this.translateService.translate("wordLadder.hint-3").replace("{word}", nextWord),
      );
    }

    const hint = this.hintText();
    if (hint) {
      this.announce(hint);
    }
  }

  async shareResult(): Promise<void> {
    const puzzle = this.puzzle();
    if (!puzzle) return;
    const text = `${puzzle.target} in ${this.moves} moves · Word Ladder`;
    if (isPlatformBrowser(this.platformId) && "share" in navigator) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // User cancelled or sharing unavailable — fall through to clipboard.
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      this.shareMessage.set(this.translateService.translate("wordLadder.share-copied"));
    } catch {
      this.shareMessage.set(null);
    }
  }

  nextPuzzle(): void {
    if (this.mode() === "daily") return;
    this.startGame();
  }

  private completePuzzle(): void {
    const puzzle = this.puzzle();
    if (!puzzle) return;
    const moves = this.moves;
    this.status.set("won");
    this.stopTimer();
    this.saveResult(moves);
    this.announce(this.translateService.translate("wordLadder.complete"));

    this.posthog.capture("word_ladder_completed", {
      mode: this.mode(),
      difficulty: puzzle.difficulty,
      moves,
      optimal: puzzle.optimalMoves,
    });
  }

  private saveResult(moves: number): void {
    const progress = this.ensureProgress();

    if (this.mode() === "daily") {
      const today = todayKey();
      progress.dailyBest =
        progress.dailyBest === null ? moves : Math.min(progress.dailyBest, moves);
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
        difficulty: "easy",
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
          difficulty: parsed.difficulty ?? "easy",
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
    const el = this.moveInput()?.nativeElement;
    if (el) {
      el.focus();
    }
  }

  private announce(text: string): void {
    this.lastLiveAnnouncement.set(text);
  }

  private attachVisibilityHandler(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.addEventListener("visibilitychange", () => {
      if (this.status() === "playing" && this.startedAt > 0) {
        this.elapsed.set(Math.floor((Date.now() - this.startedAt) / 1000));
      }
    });
  }

  private startTimer(): void {
    this.stopTimer();
    this.timerId = setInterval(() => {
      if (this.status() === "playing" && this.startedAt > 0) {
        this.elapsed.set(Math.floor((Date.now() - this.startedAt) / 1000));
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private setupSeo(): void {
    const url = `${SITE_URL}/games/word-ladder`;
    this.title.setTitle("Word Ladder Game – Play Free Online Word Puzzles");
    this.meta.updateTag({
      name: "description",
      content:
        "Play a free Word Ladder Game online. Change one letter at a time to transform the starting word into the target word. Daily puzzles, three difficulty levels.",
    });
    this.meta.updateTag({
      property: "og:title",
      content: "Word Ladder Game – Play Free Online Word Puzzles",
    });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Change one letter at a time to turn the starting word into the target word. Play word ladder puzzles online for free.",
    });
    this.meta.updateTag({ property: "og:type", content: "website" });
    this.meta.updateTag({ property: "og:url", content: url });

    const doc = this.document;
    const existingLink = doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (existingLink) existingLink.remove();
    const link = doc.createElement("link");
    link.rel = "canonical";
    link.href = url;
    doc.head.appendChild(link);

    const existing = doc.getElementById("word-ladder-jsonld");
    if (existing) existing.remove();
    const script = doc.createElement("script");
    script.id = "word-ladder-jsonld";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(this.buildJsonLd(url));
    doc.head.appendChild(script);
  }

  private buildJsonLd(url: string): object {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          name: "Word Ladder Game",
          url,
          applicationCategory: "GameApplication",
          operatingSystem: "Web",
          browserRequirements: "Requires JavaScript",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "Game",
          name: "Word Ladder Game",
          url,
          genre: "Word Puzzle",
          numberOfPlayers: "1",
          description:
            "Transform the starting word into the target word by changing exactly one letter at a time. Every intermediate word must be a real word. Play online for free with daily puzzles and three difficulty levels.",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            {
              "@type": "ListItem",
              position: 2,
              name: "Games",
              item: `${SITE_URL}/games`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Word Ladder Game",
              item: url,
            },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is a Word Ladder game?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A word ladder is a word puzzle where you transform a starting word into a target word by changing exactly one letter at a time, using a real English word after every change.",
              },
            },
            {
              "@type": "Question",
              name: "How do you play Word Ladder?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Start from the given word, then enter a new word that differs from it by exactly one letter. Keep going until you reach the target word. Try to finish in as few moves as possible.",
              },
            },
            {
              "@type": "Question",
              name: "What are the rules of Word Ladder?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Every word must be a real English word of the same length as the start and target words, and each move may change exactly one letter. You cannot repeat your previous word or skip letters.",
              },
            },
            {
              "@type": "Question",
              name: "Can you change more than one letter?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Each move may change exactly one letter. Changing two or more letters in a single move is not allowed in a word ladder.",
              },
            },
            {
              "@type": "Question",
              name: "What makes a Word Ladder difficult?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Difficulty comes from the distance between the words, the number of available intermediate words, and how many different paths exist between the start and target.",
              },
            },
            {
              "@type": "Question",
              name: "Are Word Ladder puzzles good for kids?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Short word ladders with common words help children practise spelling and vocabulary, and they are often used in classrooms as a word-building activity.",
              },
            },
            {
              "@type": "Question",
              name: "Can I play Word Ladder online for free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. This Word Ladder game is completely free to play online in your browser, with no registration and no downloads.",
              },
            },
          ],
        },
      ],
    };
  }
}
