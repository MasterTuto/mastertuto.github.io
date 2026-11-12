/** An illustration of the segment page, in `assets/images/segments/<slug>/`. */
export interface IndustryImage {
  src: string;
  alt: string;
}

/** A concrete problem of the niche: how it happens today and what changes with a site and automation. */
export interface IndustryProblem {
  /** Short tab label, 2 to 5 words. */
  title: string;
  today: string;
  change: string;
}

/** One row of the before/after table. */
export interface IndustryContrast {
  today: string;
  withSite: string;
}

/** One message of the example conversation: from the client, or the automatic reply. */
export interface IndustryChatLine {
  from: 'client' | 'reply';
  text: string;
}

export interface IndustryStep {
  title: string;
  text: string;
}

export interface IndustryQuestion {
  question: string;
  answer: string;
}

/** Content of a segment page (`/para/<slug>`). Portuguese only. */
export interface Industry {
  slug: string;
  /** Segment name as shown in menus and links (e.g. "Eletricistas"). */
  name: string;
  /** Hero title, a promise in a few words. */
  title: string;
  /** Hero paragraph, 1 or 2 sentences. Also used in the segment index and the command palette. */
  intro: string;
  images: { hero: IndustryImage; routine: IndustryImage; closing: IndustryImage };
  /** A message a client typically sends today, the context it comes from, and the routine behind it. */
  routine: { quote: string; context: string; body: string };
  /** Exactly 3, shown as tabs. */
  problems: IndustryProblem[];
  /** 3 or 4 rows. */
  contrast: IndustryContrast[];
  /** Example conversation with the automatic first reply. 4 to 6 lines. */
  chat: { title: string; body: string; lines: IndustryChatLine[] };
  /** 3 or 4 steps, from the first contact to the service. */
  steps: IndustryStep[];
  /** Exactly 3. */
  faq: IndustryQuestion[];
  closing: { title: string; body: string };
  /** Search terms for the command palette. */
  queries: string[];
  /** Public reference used for the content (council, regulation, association). */
  source: { label: string; url: string };
}
