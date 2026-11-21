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
      { role: 'design', decisions: ['1', '2', '3', '4', '5'] },
      { role: 'implementation', decisions: ['1', '2', '3', '4', '5', '6'] },
      { role: 'hosting', decisions: ['1', '2', '3'] },
      { role: 'maintenance', decisions: ['1', '2', '3'] },
    ],
    highlights: ['1', '2', '3', '4', '5', '6'],
    tech: [
      { key: 'frontend', tools: ['Angular', 'Angular Material', 'Monorepo'] },
      { key: 'backend', tools: ['Node.js', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'SQS'] },
      { key: 'ai', tools: ['Replicate', 'Claude', 'GPT', 'Gemini', 'Nano Banana', 'ElevenLabs Music'] },
      { key: 'audio', tools: ['ffmpeg', 'LUFS', 'WAV/MP3/MP4'] },
      { key: 'auth', tools: ['Cognito', 'Google OAuth', 'SES'] },
      { key: 'payments', tools: ['Asaas', 'Pix', 'Webhooks', 'DynamoDB Streams'] },
      { key: 'infra', tools: ['AWS', 'CloudFront', 'Cloudflare', 'Registro.br'] },
      { key: 'ci', tools: ['CloudFormation', 'SAM', 'CodeBuild'] },
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
