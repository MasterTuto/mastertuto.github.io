import { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the landing-pages page. */
export const landingPagesCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Criação de landing pages que convertem anúncios em clientes',
      description:
        'Landing page de alta conversão para anúncios, lançamentos e captação de leads: rápida, com um único objetivo, integrada ao WhatsApp, pixel e CRM. Orçamento em 24h.',
    },
    hero: {
      title: 'Você paga pelo clique. A página deixa ele ir embora.',
      subtitle: 'Landing pages com um único objetivo, que carregam em menos de um segundo e levam o visitante até o botão certo.',
      note: '1.240 visitas · 3 contatos',
      cta: 'Quero mais contatos',
    },
    problem: {
      title: 'Onde o anúncio perde dinheiro',
      items: [
        'A página demora para abrir no 4G e o visitante volta antes de ver a oferta.',
        'Tem menu, blog e cinco botões diferentes: ninguém sabe o que fazer primeiro.',
        'O formulário pede dados demais e para no meio.',
        'Ninguém sabe quantos leads vieram de cada campanha.',
      ],
    },
    solution: {
      title: 'Uma página, um objetivo',
      text: 'Copy direta, prova social perto da decisão e um caminho só até a conversão — medido do clique ao WhatsApp.',
      items: [
        'Estrutura pensada para a sua oferta e o seu público',
        'Carregamento abaixo de 1 segundo e nota alta no Core Web Vitals',
        'Formulário curto ligado ao WhatsApp, e-mail ou CRM',
        'Pixel da Meta, Google Ads e GA4 configurados',
        'Variações para teste A/B do título e do botão',
      ],
    },
    steps: {
      title: 'Do briefing ao ar em até 10 dias',
      items: [
        { title: 'Briefing de 30 minutos', text: 'Oferta, público, objeções e a única ação que importa.' },
        { title: 'Texto e estrutura', text: 'Você aprova a copy e o esqueleto antes de qualquer design.' },
        { title: 'Design e desenvolvimento', text: 'Página publicada em ambiente de teste para revisar no celular.' },
        { title: 'No ar e medindo', text: 'Domínio, pixel e eventos de conversão funcionando no dia 1.' },
      ],
    },
    proof: {
      title: 'O que você recebe medido',
      items: [
        { value: '< 1s', label: 'para a primeira dobra aparecer no celular' },
        { value: '1', label: 'objetivo por página, sem distrações' },
        { value: '100%', label: 'do código e do domínio no seu nome' },
      ],
    },
    outcome: 'Agora eu sei quanto custa cada cliente que vem do anúncio.',
    price: {
      prefix: 'a partir de',
      amount: 'R$ 1.900',
      includes: ['Copy, design e desenvolvimento', 'Integração com WhatsApp e pixel', '30 dias de ajustes após publicar'],
      note: 'Hospedagem rápida incluída no primeiro ano. Valor final depende de seções e integrações.',
    },
    faq: [
      { question: 'Landing page ou site completo?', answer: 'Se o tráfego vem de anúncio e existe uma ação principal (agendar, comprar, pedir orçamento), landing page converte mais. Se você precisa ser encontrado no Google por vários serviços, um site faz mais sentido — e as duas coisas convivem.' },
      { question: 'Vocês escrevem o texto?', answer: 'Sim. A copy é escrita a partir do briefing, com foco em objeções reais do seu público. Você revisa e aprova antes do design.' },
      { question: 'Funciona com Hotmart, Kiwify e RD Station?', answer: 'Sim. Botões de checkout, formulários e eventos de conversão são integrados à plataforma que você já usa.' },
      { question: 'Posso editar depois?', answer: 'Pode. Textos e imagens ficam em arquivos simples, e pequenas alterações nos primeiros 30 dias estão incluídas.' },
    ],
    form: {
      title: 'Conte da sua oferta',
      text: 'Três respostas e a conversa começa no WhatsApp com tudo o que eu preciso.',
      heading: 'Olá, Breno! Vim pela página de landing pages e quero um orçamento.',
      fields: [
        nameField.pt,
        { name: 'objetivo', label: 'O que a página precisa gerar?', type: 'select', required: true, placeholder: 'Escolha', options: ['Leads para o comercial', 'Vendas de infoproduto', 'Agendamentos', 'Inscrições em evento', 'Lista de espera'] },
        { name: 'trafego', label: 'De onde vem o tráfego?', type: 'select', placeholder: 'Escolha', options: ['Meta Ads', 'Google Ads', 'Orgânico / redes sociais', 'Ainda não anuncio'] },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'Landing page design that turns ad clicks into customers',
      description:
        'High-converting landing pages for ads, launches and lead generation: fast, single-goal, wired to WhatsApp, pixels and your CRM. Quote within 24 hours.',
    },
    hero: {
      title: 'You pay for the click. The page lets it walk away.',
      subtitle: 'Single-goal landing pages that load in under a second and walk visitors straight to the right button.',
      note: '1,240 visits · 3 leads',
      cta: 'I want more leads',
    },
    problem: {
      title: 'Where ad money leaks',
      items: [
        'The page is slow on mobile data and visitors leave before seeing the offer.',
        'A menu, a blog and five different buttons: nobody knows what to do first.',
        'The form asks too much and people quit halfway.',
        'Nobody knows how many leads each campaign brought in.',
      ],
    },
    solution: {
      title: 'One page, one goal',
      text: 'Direct copy, social proof next to the decision and a single path to conversion — tracked from click to message.',
      items: [
        'Structure built around your offer and your audience',
        'Under one second to load, strong Core Web Vitals',
        'Short form wired to WhatsApp, email or your CRM',
        'Meta Pixel, Google Ads and GA4 set up',
        'Headline and button variants ready for A/B tests',
      ],
    },
    steps: {
      title: 'From brief to live in up to 10 days',
      items: [
        { title: '30-minute brief', text: 'Offer, audience, objections and the one action that matters.' },
        { title: 'Copy and wireframe', text: 'You approve the words and structure before any design.' },
        { title: 'Design and build', text: 'A staging link to review on your own phone.' },
        { title: 'Live and measured', text: 'Domain, pixel and conversion events working on day one.' },
      ],
    },
    proof: {
      title: 'What you get, measured',
      items: [
        { value: '< 1s', label: 'until the first screen shows on mobile' },
        { value: '1', label: 'goal per page, no distractions' },
        { value: '100%', label: 'of the code and domain in your name' },
      ],
    },
    outcome: 'Now I know exactly what each customer from ads costs me.',
    price: {
      prefix: 'from',
      amount: 'US$ 600',
      includes: ['Copy, design and development', 'WhatsApp and pixel integration', '30 days of tweaks after launch'],
      note: 'Fast hosting included for the first year. Final price depends on sections and integrations.',
    },
    faq: [
      { question: 'Landing page or full website?', answer: 'If traffic comes from ads and there is one main action (book, buy, request a quote), a landing page converts better. If you need to be found on Google for several services, a website fits — and both can live together.' },
      { question: 'Do you write the copy?', answer: 'Yes. The copy is written from the brief around your audience’s real objections. You review and approve it before design starts.' },
      { question: 'Does it work with Stripe, Gumroad or HubSpot?', answer: 'Yes. Checkout buttons, forms and conversion events are wired to the platform you already use.' },
      { question: 'Can I edit it later?', answer: 'Yes. Texts and images live in simple files, and small changes in the first 30 days are included.' },
    ],
    form: {
      title: 'Tell me about your offer',
      text: 'Three answers and the conversation starts on WhatsApp with everything I need.',
      heading: 'Hi Breno! I came from the landing pages page and would like a quote.',
      fields: [
        nameField.en,
        { name: 'goal', label: 'What should the page generate?', type: 'select', required: true, placeholder: 'Choose', options: ['Sales leads', 'Digital product sales', 'Bookings', 'Event sign-ups', 'Waitlist'] },
        { name: 'traffic', label: 'Where does traffic come from?', type: 'select', placeholder: 'Choose', options: ['Meta Ads', 'Google Ads', 'Organic / social', 'I don’t run ads yet'] },
        detailsField.en,
      ],
    },
  },
};
