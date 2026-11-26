/**
 * What I build and from how much, as shown on every region page ("Quanto custa fazer um site em …").
 * Starting prices mirror each service page (`screens/services/landings/content/<slug>.ts`, Portuguese
 * `price`); `scripts/test-region-pages.mjs` fails if they drift apart.
 */
export interface RegionOffer {
  slug: string;
  /** Anchor text of the link to the service page (a search term, not just the service name). */
  label: string;
  description: string;
  amount: string;
  period?: string;
}

export const regionOffers: RegionOffer[] = [
  { slug: 'sites-para-autonomos', label: 'Criação de site para autônomos e pequenas empresas', description: 'Site próprio que aparece no Google e leva o cliente direto para o seu WhatsApp.', amount: 'R$ 1.500' },
  { slug: 'landing-pages', label: 'Criação de landing page', description: 'Página com um único objetivo, rápida e ligada ao WhatsApp, para transformar anúncio em cliente.', amount: 'R$ 1.900' },
  { slug: 'blogs-e-portfolios', label: 'Criação de blog ou portfólio', description: 'Seu trabalho organizado como estudos de caso e artigos que ranqueiam.', amount: 'R$ 2.200' },
  { slug: 'lojas-virtuais', label: 'Criação de loja virtual', description: 'Loja rápida com Pix, frete na página do produto e estoque integrado ao ERP.', amount: 'R$ 4.500' },
  { slug: 'seo-e-geo', label: 'SEO local (auditoria)', description: 'Seu negócio no Google, no Google Maps e nas respostas do ChatGPT e do Gemini.', amount: 'R$ 1.500' },
  { slug: 'agentes-de-ia', label: 'Agente de IA no WhatsApp', description: 'Atendimento 24h no WhatsApp com IA que consulta seus dados e agenda.', amount: 'R$ 3.500', period: '+ R$ 600/mês' },
  { slug: 'automacao-de-processos', label: 'Automação de processos', description: 'Relatórios, cobranças e planilhas que rodam sozinhos.', amount: 'R$ 1.200', period: 'por fluxo' },
  { slug: 'integracoes', label: 'Integração de sistemas', description: 'Site, WhatsApp, CRM, ERP e pagamentos conversando sem copiar e colar.', amount: 'R$ 900', period: 'por integração' },
  { slug: 'sistemas-sob-medida', label: 'Desenvolvimento de sistema sob medida', description: 'Sistema web que tira a operação da planilha, com permissões e relatórios.', amount: 'R$ 12.000' },
  { slug: 'mvp-e-saas', label: 'Desenvolvimento de MVP e SaaS', description: 'Do rascunho ao primeiro cliente pagante em semanas.', amount: 'R$ 25.000' },
];

/** "em Santos" → "de Santos", "na Praia Grande" → "da Praia Grande", "no Guarujá" → "do Guarujá". */
export function ofPlace(where: string): string {
  return where.replace(/^em /, 'de ').replace(/^na /, 'da ').replace(/^no /, 'do ');
}
