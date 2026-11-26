import type { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the seo-e-geo page. */
export const seoEGeoCopy: LandingContent = {
  pt: {
    seo: {
      title: 'SEO técnico e GEO: apareça no Google e nas respostas do ChatGPT',
      description:
        'SEO técnico, Core Web Vitals, dados estruturados e GEO (otimização para IA generativa): seu site encontrado no Google, no Google Meu Negócio e citado por ChatGPT, Gemini e Perplexity.',
    },
    hero: {
      title: 'Perguntaram ao ChatGPT quem resolve. Ele citou outro.',
      subtitle: 'SEO técnico e GEO para o seu site ser encontrado no Google e recomendado pelas IAs que as pessoas já usam para decidir.',
      note: 'página 2 do Google · 0 menções em IA',
      cta: 'Quero ser encontrado',
    },
    problem: {
      title: 'Por que bons negócios ficam invisíveis',
      items: [
        'Site lento, reprovado nas métricas de experiência do Google.',
        'Páginas sem título, descrição e dados estruturados.',
        'Conteúdo genérico que nenhuma IA tem motivo para citar.',
        'Perfil do Google Meu Negócio incompleto e sem avaliações.',
      ],
    },
    solution: {
      title: 'Encontrável por buscadores e por IAs',
      text: 'Primeiro a base técnica que todo buscador precisa ler. Depois, conteúdo com autoria, dados e respostas diretas — o formato que IAs generativas preferem citar.',
      items: [
        'Auditoria técnica: indexação, velocidade e Core Web Vitals',
        'Dados estruturados (schema.org) para serviços, FAQ e avaliações',
        'Arquitetura de páginas por serviço, cidade e intenção de busca',
        'GEO: conteúdo citável, autoria clara e presença em fontes confiáveis',
        'Google Meu Negócio e Bing Webmaster configurados',
      ],
    },
    steps: {
      title: 'Plano',
      items: [
        { title: 'Auditoria', text: 'Técnica, conteúdo e concorrentes, com notas de 0 a 100.' },
        { title: 'Correções técnicas', text: 'O que mais pesa primeiro: velocidade, indexação, schema.' },
        { title: 'Conteúdo', text: 'Páginas e respostas para as perguntas que seu cliente faz.' },
        { title: 'Medição', text: 'Search Console, posições e menções em IA todo mês.' },
      ],
    },
    proof: {
      title: 'Este site é o laboratório',
      items: [
        { value: 'SSG', label: 'páginas pré-renderizadas, lidas por qualquer robô' },
        { value: 'JSON-LD', label: 'dados estruturados em todas as páginas' },
        { value: 'OG', label: 'imagem de compartilhamento gerada por página' },
      ],
    },
    outcome: 'Perguntaram à IA e ela respondeu com o nosso nome.',
    price: {
      prefix: 'auditoria a partir de',
      amount: 'R$ 1.500',
      includes: ['Auditoria técnica e de conteúdo', 'Correções prioritárias aplicadas', 'Relatório com plano de 90 dias'],
      note: 'Acompanhamento mensal a partir de R$ 900/mês. SEO leva de 3 a 6 meses para mostrar tração.',
    },
    faq: [
      { question: 'O que é GEO?', answer: 'Generative Engine Optimization: preparar o site e a marca para serem citados por IAs como ChatGPT, Gemini, Perplexity e os resumos com IA do Google.' },
      { question: 'SEO ainda vale a pena com IA?', answer: 'Vale. As IAs buscam e citam páginas da web; quem tem base técnica e conteúdo claro aparece nos dois lugares.' },
      { question: 'Em quanto tempo vejo resultado?', answer: 'Correções técnicas aparecem em semanas. Posições e citações consistentes costumam levar de 3 a 6 meses.' },
      { question: 'Garantem primeira posição?', answer: 'Ninguém sério garante. Eu garanto o trabalho bem feito e relatórios mensais transparentes.' },
    ],
    form: {
      title: 'Qual busca você quer ganhar?',
      text: 'Me diga o site e o que seu cliente digita. Eu respondo com um primeiro diagnóstico.',
      heading: 'Olá, Breno! Vim pela página de SEO e GEO e quero ser encontrado.',
      fields: [
        nameField.pt,
        { name: 'site', label: 'Endereço do site', type: 'text', required: true, placeholder: 'meusite.com.br' },
        { name: 'busca', label: 'O que seu cliente pesquisa?', type: 'text', placeholder: 'Ex.: dentista em Santos' },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'Technical SEO and GEO: show up on Google and in ChatGPT answers',
      description:
        'Technical SEO, Core Web Vitals, structured data and GEO (generative engine optimization): get found on Google, Google Business Profile and cited by ChatGPT, Gemini and Perplexity.',
    },
    hero: {
      title: 'Someone asked ChatGPT who could help. It named someone else.',
      subtitle: 'Technical SEO and GEO so your site is found on Google and recommended by the AI people already use to decide.',
      note: 'Google page 2 · 0 AI mentions',
      cta: 'I want to be found',
    },
    problem: {
      title: 'Why good businesses stay invisible',
      items: [
        'A slow site failing Google’s page-experience metrics.',
        'Pages without titles, descriptions or structured data.',
        'Generic content no AI has a reason to cite.',
        'An incomplete Google Business Profile with no reviews.',
      ],
    },
    solution: {
      title: 'Findable by search engines and by AI',
      text: 'First, the technical base every crawler needs. Then content with authorship, data and direct answers — the format generative AI prefers to cite.',
      items: [
        'Technical audit: indexing, speed and Core Web Vitals',
        'Structured data (schema.org) for services, FAQ and reviews',
        'Page architecture by service, city and search intent',
        'GEO: citable content, clear authorship, presence on trusted sources',
        'Google Business Profile and Bing Webmaster set up',
      ],
    },
    steps: {
      title: 'Plan',
      items: [
        { title: 'Audit', text: 'Technical, content and competitors, scored 0 to 100.' },
        { title: 'Technical fixes', text: 'Biggest impact first: speed, indexing, schema.' },
        { title: 'Content', text: 'Pages and answers to the questions your clients ask.' },
        { title: 'Measurement', text: 'Search Console, rankings and AI mentions every month.' },
      ],
    },
    proof: {
      title: 'This site is the lab',
      items: [
        { value: 'SSG', label: 'prerendered pages any crawler can read' },
        { value: 'JSON-LD', label: 'structured data on every page' },
        { value: 'OG', label: 'share image generated per page' },
      ],
    },
    outcome: 'We asked the AI and it answered with our name.',
    price: {
      prefix: 'audit from',
      amount: 'US$ 500',
      includes: ['Technical and content audit', 'Priority fixes applied', 'Report with a 90-day plan'],
      note: 'Monthly retainer from US$ 300/month. SEO takes 3 to 6 months to gain traction.',
    },
    faq: [
      { question: 'What is GEO?', answer: 'Generative Engine Optimization: preparing your site and brand to be cited by AI such as ChatGPT, Gemini, Perplexity and Google’s AI summaries.' },
      { question: 'Is SEO still worth it with AI?', answer: 'Yes. AI tools search and cite web pages; sites with a solid technical base and clear content show up in both.' },
      { question: 'How soon will I see results?', answer: 'Technical fixes show within weeks. Consistent rankings and citations usually take 3 to 6 months.' },
      { question: 'Do you guarantee the top spot?', answer: 'Nobody serious does. I guarantee careful work and transparent monthly reports.' },
    ],
    form: {
      title: 'Which search do you want to win?',
      text: 'Give me the site and what your clients type. I’ll reply with a first diagnosis.',
      heading: 'Hi Breno! I came from the SEO and GEO page and want to be found.',
      fields: [
        nameField.en,
        { name: 'site', label: 'Website address', type: 'text', required: true, placeholder: 'mysite.com' },
        { name: 'search', label: 'What do your clients search for?', type: 'text', placeholder: 'e.g. dentist in Austin' },
        detailsField.en,
      ],
    },
  },
};
