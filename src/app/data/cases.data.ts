/** What I did on a project; each one has a label under `cases.roles`. */
export type CaseRole = 'design' | 'implementation' | 'hosting' | 'maintenance';

/** One role and the decisions explained under `cases.items.<key>.work.<role>.decisions.<n>`. */
export interface CaseWork {
  role: CaseRole;
  decisions: string[];
}

/** A layer of the stack, explained under `cases.items.<key>.tech.<key>`. Tool names are not translated. */
export interface CaseTechGroup {
  key: string;
  tools: string[];
}

export interface ProjectCase {
  /** URL segment of the case page (`cases/<slug>`). */
  slug: string;
  /** Translation namespace under `cases.items`. */
  key: 'jingle' | 'supervegetariano';
  name: string;
  domain: string;
  url: string;
  desktop: string;
  mobile: string;
  work: CaseWork[];
  /** Keys under `cases.items.<key>.highlights`. */
  highlights: string[];
  tech?: CaseTechGroup[];
  /** Brand colors of the client, used for accents and the glow behind the screenshots. */
  accent: string;
  tint: string;
}

export const projectCases: ProjectCase[] = [
  {
    slug: 'jingle-ia-br',
    key: 'jingle',
    name: 'jingle.ia.br',
    domain: 'jingle.ia.br',
    url: 'https://jingle.ia.br/',
    desktop: 'assets/images/cases/jingle-desktop.webp',
    mobile: 'assets/images/cases/jingle-mobile.webp',
    work: [
      { role: 'design', decisions: ['1', '2', '3'] },
      { role: 'implementation', decisions: ['1', '2', '3'] },
      { role: 'hosting', decisions: ['1', '2'] },
      { role: 'maintenance', decisions: ['1', '2'] },
    ],
    highlights: ['1', '2', '3', '4'],
    tech: [
      { key: 'frontend', tools: ['Angular', 'Monorepo'] },
      { key: 'backend', tools: ['Node.js', 'AWS Lambda', 'DynamoDB'] },
      { key: 'ai', tools: ['OpenAI', 'Gemini', 'Replicate', 'ElevenLabs'] },
      { key: 'payments', tools: ['Asaas'] },
      { key: 'infra', tools: ['AWS', 'CloudFront', 'Cloudflare', 'Registro.br'] },
    ],
    accent: '#0b7a3b',
    tint: '#eaf5ee',
  },
  {
    slug: 'supervegetariano',
    key: 'supervegetariano',
    name: 'Super Vegetariano',
    domain: 'supervegetariano.com.br',
    url: 'https://supervegetariano.com.br/',
    desktop: 'assets/images/cases/supervegetariano-desktop.webp',
    mobile: 'assets/images/cases/supervegetariano-mobile.webp',
    work: [{ role: 'hosting', decisions: ['1', '2', '3'] }],
    highlights: ['1', '2', '3', '4'],
    accent: '#8a0d59',
    tint: '#f8edf3',
  },
];
