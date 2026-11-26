/** A local opportunity: why a site or automation pays off in this place specifically. */
export interface RegionOpportunity {
  title: string;
  text: string;
}

/** A service recommended for the region, with the local reason (links to `/services/<slug>`). */
export interface RegionService {
  slug: string;
  why: string;
}

export interface RegionQuestion {
  question: string;
  answer: string;
}

/** Content of a region page (`/regioes/<slug>`). Portuguese only. */
export interface Region {
  slug: string;
  /** Place name as shown in menus and links (e.g. "Praia Grande"). */
  name: string;
  /** The name with its preposition, as used in a sentence: "em Santos", "na Praia Grande", "no Guarujá". */
  where: string;
  /** Where the place sits in the index. */
  group: 'baixada' | 'sp';
  /** True for a region made of several cities (its `places` are cities, not neighborhoods). */
  isRegion?: boolean;
  /** Hero title. */
  title: string;
  /** Hero paragraph, 1 or 2 sentences. Also the meta description. */
  intro: string;
  /** How the local economy works and how people there look for a service. 2 or 3 sentences. */
  context: string;
  /** Neighborhoods (or cities, for a region) that people type in their searches. 6 to 12. */
  places: string[];
  /** Examples of local searches, as a visitor would type them. Exactly 4. */
  searches: string[];
  /** Exactly 3. */
  opportunities: RegionOpportunity[];
  /** Exactly 3, slugs from the service catalog. */
  services: RegionService[];
  /** 3 to 5 segment slugs (`/para/<slug>`) with demand in the place. */
  segments: string[];
  /** Exactly 3. */
  faq: RegionQuestion[];
  /** 3 or 4 other region slugs, linked at the end of the page. */
  nearby: string[];
}
