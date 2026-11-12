import { PERSON_REF, usePageSeo } from 'src/app/seo/page-seo';
import { ProTool } from './pro-tools.data';

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * SEO of a Portuguese tool page: fixed language, one canonical URL, breadcrumbs, a free
 * WebApplication and, when given, an FAQPage built from the same questions shown on the page.
 */
export function useProToolSeo(tool: ProTool, faq: readonly FaqItem[] = []): void {
  const path = `/tools/${tool.slug}`;
  usePageSeo(() => ({
    title: `${tool.name}: ${capitalize(tool.keyword)} grátis`,
    description: tool.description,
    path,
    fixedLanguage: 'pt',
    breadcrumbs: [
      ['Início', '/'],
      ['Ferramentas', '/tools'],
      [tool.name, path],
    ],
    jsonLd: [
      {
        '@type': 'WebApplication',
        name: tool.name,
        description: tool.description,
        applicationCategory: tool.segment ? 'BusinessApplication' : 'FinanceApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        inLanguage: 'pt-BR',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
        audience: { '@type': 'Audience', audienceType: tool.audience },
        author: PERSON_REF,
      },
      ...(faq.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: faq.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            },
          ]
        : []),
    ],
  }));
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
