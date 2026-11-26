import type { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the mvp-e-saas page. */
export const mvpESaasCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Desenvolvimento de MVP e SaaS para startups',
      description:
        'MVP de SaaS em semanas: login, assinatura com Pix e cartão, painel e o fluxo principal do seu produto. Arquitetura serverless na AWS que cresce com os clientes.',
    },
    hero: {
      title: 'Seis meses construindo. Nenhum cliente testou.',
      subtitle: 'Eu transformo a sua ideia num MVP que vai para as mãos de clientes reais em semanas, não semestres.',
      note: 'usuários ativos: 0',
      cta: 'Validar minha ideia',
    },
    problem: {
      title: 'Por que tantos produtos morrem antes de nascer',
      items: [
        'Escopo que só cresce: "só mais essa funcionalidade antes de lançar".',
        'Orçamento gasto em infraestrutura para um milhão de usuários que ainda não existem.',
        'Agência que entrega e some, sem ninguém que entenda o código.',
        'Cobrança recorrente, Pix e nota fiscal deixados para "depois".',
      ],
    },
    solution: {
      title: 'O menor produto que prova a sua tese',
      text: 'Corto o escopo até o fluxo que gera valor, construo com o que é padrão de mercado e deixo o produto pronto para medir uso desde o primeiro dia.',
      items: [
        'Login, organizações e permissões',
        'Assinaturas com Pix, boleto e cartão',
        'O fluxo principal do produto, bem feito',
        'Analytics de produto e funil de ativação',
        'Infra serverless que custa quase nada até crescer',
      ],
    },
    steps: {
      title: 'Do rascunho ao primeiro cliente pagante',
      items: [
        { title: 'Semana 1 — Escopo', text: 'Hipóteses, métricas de sucesso e o que fica fora.' },
        { title: 'Semanas 2–3 — Protótipo', text: 'Telas navegáveis para testar com 5 clientes.' },
        { title: 'Semanas 4–8 — Construção', text: 'Entregas semanais em ambiente de teste.' },
        { title: 'Lançamento', text: 'Produto no ar, cobrança ativa e métricas rodando.' },
      ],
    },
    proof: {
      title: 'Feito por quem já sustenta produto em produção',
      items: [
        { value: '8 sem', label: 'prazo típico até o primeiro cliente usar' },
        { value: 'IA', label: 'pronta para entrar no produto (streaming, agentes)' },
        { value: '0', label: 'lock-in: código e contas no seu nome' },
      ],
    },
    outcome: 'Fechamos os dez primeiros clientes com o MVP e captamos com números reais.',
    price: {
      prefix: 'a partir de',
      amount: 'R$ 25.000',
      includes: ['Escopo, protótipo e MVP', 'Cobrança recorrente integrada', '60 dias de suporte pós-lançamento'],
      note: 'Pagamento por etapas. Possível continuar como CTO fracionado.',
    },
    faq: [
      { question: 'No-code não resolve?', answer: 'Para validar, às vezes sim — e eu falo isso. Quando o produto tem regra própria, integra com IA ou precisa escalar, código evita reescrever tudo depois.' },
      { question: 'Vocês ajudam a definir o escopo?', answer: 'É a parte mais importante. Saio da primeira semana com uma lista do que entra, do que fica para depois e de como saber se deu certo.' },
      { question: 'Quem mantém depois?', answer: 'Eu posso continuar, ou entrego documentação e faço a passagem para o seu time. Código padrão de mercado, sem mágica.' },
      { question: 'Dá para incluir IA?', answer: 'Sim. Trabalho com orquestração de IA em produção: geração de conteúdo, validação, streaming em tempo real e agentes.' },
    ],
    form: {
      title: 'Me conte a ideia em uma frase',
      text: 'Eu respondo com perguntas que ajudam a cortar o escopo.',
      heading: 'Olá, Breno! Vim pela página de MVP e SaaS e quero tirar uma ideia do papel.',
      fields: [
        nameField.pt,
        { name: 'ideia', label: 'A ideia em uma frase', type: 'text', required: true, placeholder: 'Ex.: agenda online para personal trainers' },
        { name: 'fase', label: 'Em que fase está?', type: 'select', required: true, placeholder: 'Escolha', options: ['Só a ideia', 'Tenho protótipo / no-code', 'Tenho clientes esperando', 'Já tenho produto e quero refazer'] },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'MVP and SaaS development for startups',
      description:
        'A SaaS MVP in weeks: login, subscriptions, dashboard and your product’s core flow. Serverless AWS architecture that grows with your customers.',
    },
    hero: {
      title: 'Six months building. No customer has tried it.',
      subtitle: 'I turn your idea into an MVP in real customers’ hands in weeks, not semesters.',
      note: 'active users: 0',
      cta: 'Validate my idea',
    },
    problem: {
      title: 'Why so many products die before launch',
      items: [
        'Scope that only grows: "just one more feature before launch".',
        'Budget spent on infrastructure for a million users who don’t exist yet.',
        'An agency that delivers and disappears, leaving nobody who knows the code.',
        'Recurring billing and invoicing left for "later".',
      ],
    },
    solution: {
      title: 'The smallest product that proves your thesis',
      text: 'I cut scope to the flow that creates value, build with mainstream tools and measure usage from day one.',
      items: [
        'Login, organizations and permissions',
        'Subscriptions with card and local payment methods',
        'Your product’s core flow, done right',
        'Product analytics and activation funnel',
        'Serverless infra that costs almost nothing until you grow',
      ],
    },
    steps: {
      title: 'From sketch to first paying customer',
      items: [
        { title: 'Week 1 — Scope', text: 'Hypotheses, success metrics and what stays out.' },
        { title: 'Weeks 2–3 — Prototype', text: 'Clickable screens to test with 5 customers.' },
        { title: 'Weeks 4–8 — Build', text: 'Weekly deliveries to a staging environment.' },
        { title: 'Launch', text: 'Live product, billing on and metrics running.' },
      ],
    },
    proof: {
      title: 'Built by someone who runs products in production',
      items: [
        { value: '8 wks', label: 'typical time to first customer usage' },
        { value: 'AI', label: 'ready to plug in (streaming, agents)' },
        { value: '0', label: 'lock-in: code and accounts in your name' },
      ],
    },
    outcome: 'We closed our first ten customers on the MVP and raised with real numbers.',
    price: {
      prefix: 'from',
      amount: 'US$ 8,000',
      includes: ['Scope, prototype and MVP', 'Recurring billing integrated', '60 days of post-launch support'],
      note: 'Paid in stages. Can continue as a fractional CTO.',
    },
    faq: [
      { question: 'Wouldn’t no-code do?', answer: 'For validation, sometimes yes — and I’ll say so. When the product has its own rules, uses AI or must scale, code avoids a rewrite later.' },
      { question: 'Do you help define scope?', answer: 'It’s the most important part. Week one ends with a list of what’s in, what’s later and how we’ll know it worked.' },
      { question: 'Who maintains it afterwards?', answer: 'I can stay on, or hand it over to your team with documentation. Mainstream code, no magic.' },
      { question: 'Can it include AI?', answer: 'Yes. I run AI orchestration in production: content generation, validation, real-time streaming and agents.' },
    ],
    form: {
      title: 'Tell me the idea in one sentence',
      text: 'I’ll reply with questions that help trim the scope.',
      heading: 'Hi Breno! I came from the MVP and SaaS page and want to get an idea off the ground.',
      fields: [
        nameField.en,
        { name: 'idea', label: 'The idea in one sentence', type: 'text', required: true, placeholder: 'e.g. online scheduling for personal trainers' },
        { name: 'stage', label: 'What stage is it in?', type: 'select', required: true, placeholder: 'Choose', options: ['Just an idea', 'Prototype / no-code', 'Customers waiting', 'Existing product to rebuild'] },
        detailsField.en,
      ],
    },
  },
};
