import type { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the blogs-e-portfolios page. */
export const blogsEPortfoliosCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Criação de blog e portfólio profissional com SEO',
      description:
        'Blog e portfólio rápidos, bonitos e fáceis de publicar: textos que ranqueiam no Google e são citados por IAs, projetos apresentados como estudos de caso.',
    },
    hero: {
      title: 'Seu melhor trabalho está escondido num PDF.',
      subtitle: 'Portfólios e blogs que contam a história certa, ranqueiam no Google e deixam você publicar sem pedir ajuda.',
      note: 'portfolio_final_v7_AGORA_VAI.pdf',
      cta: 'Quero mostrar meu trabalho',
    },
    problem: {
      title: 'O que trava quem produz conteúdo',
      items: [
        'Portfólio espalhado entre Drive, Behance e PDF enviado por e-mail.',
        'Blog em plataforma lenta, cheia de anúncios e plugins quebrando.',
        'Textos bons que ninguém encontra porque o Google não entende a página.',
        'Medo de mexer e quebrar o layout.',
      ],
    },
    solution: {
      title: 'Escrever, publicar, ser encontrado',
      text: 'Uma casa só para o seu trabalho: estudos de caso com contexto e resultado, artigos com estrutura que o Google e as IAs conseguem ler, e um editor simples.',
      items: [
        'Projetos como estudos de caso (problema, processo, resultado)',
        'Editor em Markdown ou painel visual, sem plugins',
        'SEO técnico: dados estruturados, sitemap e imagens otimizadas',
        'Newsletter e RSS para quem quiser acompanhar',
        'Domínio próprio e carregamento instantâneo',
      ],
    },
    steps: {
      title: 'Processo',
      items: [
        { title: 'Curadoria', text: 'Escolhemos os trabalhos e assuntos que trazem o cliente que você quer.' },
        { title: 'Arquitetura', text: 'Categorias, tags e páginas organizadas para pessoas e buscadores.' },
        { title: 'Design', text: 'Tipografia e ritmo de leitura que deixam o conteúdo aparecer.' },
        { title: 'Publicação', text: 'Migração do que já existe e treinamento de 30 minutos.' },
      ],
    },
    proof: {
      title: 'Construído para durar',
      items: [
        { value: '0', label: 'plugins para atualizar ou quebrar' },
        { value: '100', label: 'de nota de acessibilidade como meta' },
        { value: '∞', label: 'artigos sem custo extra de plataforma' },
      ],
    },
    outcome: 'Mandei o link e o cliente já chegou sabendo como eu trabalho.',
    price: {
      prefix: 'a partir de',
      amount: 'R$ 2.200',
      includes: ['Portfólio ou blog com até 10 projetos/artigos migrados', 'Editor simples para publicar sozinho', 'SEO técnico configurado'],
      note: 'Migração de WordPress, Medium ou Notion inclusa.',
    },
    faq: [
      { question: 'Consigo publicar sozinho?', answer: 'Sim. Você escreve num editor simples (ou em Markdown) e o site se atualiza. Sem painel cheio de opções.' },
      { question: 'Dá para migrar meu WordPress?', answer: 'Dá. Posts, imagens e URLs antigas são levados, com redirecionamentos para não perder posições no Google.' },
      { question: 'Serve para fotógrafo, arquiteto e designer?', answer: 'Serve. Galerias pesadas são otimizadas para carregar rápido sem perder qualidade.' },
      { question: 'E para aparecer no ChatGPT?', answer: 'Conteúdo bem estruturado, com autoria clara e dados estruturados, é mais fácil de ser citado por buscas com IA. Isso entra no projeto.' },
    ],
    form: {
      title: 'Me conte o que você quer mostrar',
      text: 'Leva menos de um minuto.',
      heading: 'Olá, Breno! Vim pela página de blogs e portfólios e quero um orçamento.',
      fields: [
        nameField.pt,
        { name: 'tipo', label: 'O que você precisa?', type: 'select', required: true, placeholder: 'Escolha', options: ['Portfólio', 'Blog', 'Portfólio + blog', 'Migrar o que já tenho'] },
        { name: 'area', label: 'Sua área', type: 'text', placeholder: 'Ex.: arquitetura, fotografia, consultoria' },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'Professional blog and portfolio websites with SEO',
      description:
        'Fast, beautiful blogs and portfolios you can publish to yourself: articles that rank on Google and get cited by AI, projects presented as case studies.',
    },
    hero: {
      title: 'Your best work is hiding in a PDF.',
      subtitle: 'Portfolios and blogs that tell the right story, rank on Google and let you publish without asking for help.',
      note: 'portfolio_final_v7_REALLY_FINAL.pdf',
      cta: 'I want to show my work',
    },
    problem: {
      title: 'What holds creators back',
      items: [
        'Work scattered across Drive, Behance and emailed PDFs.',
        'A slow blog platform full of ads and breaking plugins.',
        'Good articles nobody finds because Google cannot read the page.',
        'Fear of touching anything and breaking the layout.',
      ],
    },
    solution: {
      title: 'Write, publish, get found',
      text: 'One home for your work: case studies with context and results, articles structured for Google and AI to read, and a simple editor.',
      items: [
        'Projects as case studies (problem, process, result)',
        'Markdown or visual editor, no plugins',
        'Technical SEO: structured data, sitemap, optimized images',
        'Newsletter and RSS for followers',
        'Your own domain and instant loading',
      ],
    },
    steps: {
      title: 'Process',
      items: [
        { title: 'Curation', text: 'We pick the work and topics that bring the clients you want.' },
        { title: 'Architecture', text: 'Categories, tags and pages organized for people and search engines.' },
        { title: 'Design', text: 'Typography and reading rhythm that let the content shine.' },
        { title: 'Publishing', text: 'Migration of what exists and a 30-minute walkthrough.' },
      ],
    },
    proof: {
      title: 'Built to last',
      items: [
        { value: '0', label: 'plugins to update or break' },
        { value: '100', label: 'accessibility score as the target' },
        { value: '∞', label: 'articles with no extra platform fees' },
      ],
    },
    outcome: 'I sent the link and the client already knew how I work.',
    price: {
      prefix: 'from',
      amount: 'US$ 700',
      includes: ['Portfolio or blog with up to 10 projects/articles migrated', 'Simple editor to publish yourself', 'Technical SEO set up'],
      note: 'Migration from WordPress, Medium or Notion included.',
    },
    faq: [
      { question: 'Can I publish on my own?', answer: 'Yes. You write in a simple editor (or Markdown) and the site updates. No dashboard full of options.' },
      { question: 'Can you migrate my WordPress?', answer: 'Yes. Posts, images and old URLs move over with redirects so you keep your Google rankings.' },
      { question: 'Does it work for photographers, architects and designers?', answer: 'Yes. Heavy galleries are optimized to load fast without losing quality.' },
      { question: 'What about showing up in ChatGPT?', answer: 'Well-structured content with clear authorship and structured data is easier for AI search to cite. That is part of the project.' },
    ],
    form: {
      title: 'Tell me what you want to show',
      text: 'Takes less than a minute.',
      heading: 'Hi Breno! I came from the blogs and portfolios page and would like a quote.',
      fields: [
        nameField.en,
        { name: 'type', label: 'What do you need?', type: 'select', required: true, placeholder: 'Choose', options: ['Portfolio', 'Blog', 'Portfolio + blog', 'Migrate what I have'] },
        { name: 'field', label: 'Your field', type: 'text', placeholder: 'e.g. architecture, photography, consulting' },
        detailsField.en,
      ],
    },
  },
};
