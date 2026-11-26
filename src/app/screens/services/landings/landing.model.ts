import { LandingFormField } from 'src/app/components/landing/whatsapp-form/landing-whatsapp-form.component';

export interface LandingFaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface LandingStep {
  readonly title: string;
  readonly text: string;
}

export type LandingLanguage = 'pt' | 'en';

/** Every word of one service page, in one language. Layout lives in the page component, words live here. */
export interface LandingCopy {
  readonly seo: { readonly title: string; readonly description: string };
  /** Problem first, then a hint of the solution. `note` is the symptom, drawn by each layout its own way. */
  readonly hero: { readonly title: string; readonly subtitle: string; readonly note: string; readonly cta: string };
  readonly problem: { readonly title: string; readonly items: readonly string[] };
  readonly solution: { readonly title: string; readonly text: string; readonly items: readonly string[] };
  readonly steps: { readonly title: string; readonly items: readonly LandingStep[] };
  readonly proof: { readonly title: string; readonly items: readonly { readonly value: string; readonly label: string }[] };
  /** A sentence the visitor wants to be able to say after the project (not a testimonial). */
  readonly outcome: string;
  readonly price: {
    readonly prefix: string;
    readonly amount: string;
    readonly period?: string;
    readonly includes: readonly string[];
    readonly note: string;
  };
  readonly faq: readonly LandingFaqItem[];
  readonly form: {
    readonly title: string;
    readonly text: string;
    /** First line of the WhatsApp message. */
    readonly heading: string;
    readonly fields: readonly LandingFormField[];
  };
}

/** Words shared by every service page. */
export interface LandingCommon {
  readonly priceLabel: string;
  readonly faqTitle: string;
  readonly relatedTitle: string;
  readonly allServices: string;
  readonly submit: string;
  readonly formNote: string;
  readonly messages: { readonly required: string; readonly email: string; readonly tel: string; readonly select: string };
}

export interface Landing {
  readonly slug: string;
  /** Key under `servicesPage` in the translations (name, shortDescription, tagline). */
  readonly key: string;
  readonly icon: string;
  /** Services linked at the bottom of the page (internal links, chosen by topic). */
  readonly related: readonly string[];
}

/** All words of one page, per language. */
export type LandingContent = Readonly<Record<LandingLanguage, LandingCopy>>;
