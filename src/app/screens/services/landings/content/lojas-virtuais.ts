import type { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the lojas-virtuais page. */
export const lojasVirtuaisCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Loja virtual e e-commerce: Shopify, Nuvemshop e sob medida',
      description:
        'Criação e otimização de loja virtual: checkout com Pix, integração com ERP e frete, carrinho abandonado no WhatsApp e páginas de produto que vendem.',
    },
    hero: {
      title: 'O carrinho estava cheio. O checkout ficou vazio.',
      subtitle: 'Lojas virtuais rápidas, com Pix em um toque, frete calculado na hora e recuperação de carrinho no WhatsApp.',
      note: 'carrinhos abandonados hoje: 37',
      cta: 'Vender mais na loja',
    },
    problem: {
      title: 'Onde a loja perde a venda',
      items: [
        'Página de produto lenta, com fotos pesadas e descrição genérica.',
        'Frete que só aparece no final e assusta o cliente.',
        'Checkout com cadastro obrigatório e cinco etapas.',
        'Pedido que precisa ser digitado de novo no ERP.',
      ],
    },
    solution: {
      title: 'Uma loja que vende enquanto você embala',
      text: 'Plataforma certa para o seu tamanho (Shopify, Nuvemshop ou sob medida) e o trabalho que faz diferença: velocidade, checkout e integrações.',
      items: [
        'Páginas de produto rápidas, com fotos otimizadas e avaliações',
        'Pix, cartão e boleto com checkout curto',
        'Frete calculado na página do produto',
        'Recuperação de carrinho por WhatsApp e e-mail',
        'Pedidos e estoque sincronizados com o ERP (Bling, Tiny)',
      ],
    },
    steps: {
      title: 'Como trabalho',
      items: [
        { title: 'Diagnóstico do funil', text: 'Onde o cliente desiste: produto, carrinho ou pagamento.' },
        { title: 'Plataforma', text: 'Escolha ou migração sem perder produtos, clientes e SEO.' },
        { title: 'Loja nova ou otimizada', text: 'Tema, checkout e integrações.' },
        { title: 'Acompanhamento', text: 'Métricas de conversão e ajustes no primeiro mês.' },
      ],
    },
    proof: {
      title: 'Foco no que move o faturamento',
      items: [
        { value: 'Pix', label: 'em um toque, com QR e copia-e-cola' },
        { value: 'ERP', label: 'estoque e pedidos sem digitação' },
        { value: 'GA4', label: 'eventos de e-commerce configurados' },
      ],
    },
    outcome: 'O cliente vê o frete, paga no Pix e o pedido já aparece no estoque.',
    price: {
      prefix: 'a partir de',
      amount: 'R$ 4.500',
      includes: ['Loja configurada ou migrada', 'Checkout com Pix e frete', 'Integração com ERP ou planilha'],
      note: 'Otimização de loja existente a partir de R$ 1.800. Taxas da plataforma à parte.',
    },
    faq: [
      { question: 'Shopify, Nuvemshop ou sob medida?', answer: 'Para a maioria das lojas, uma plataforma pronta é o melhor custo-benefício. Sob medida vale para regras de negócio específicas, B2B ou volume alto.' },
      { question: 'Vocês migram minha loja?', answer: 'Sim, com produtos, clientes, pedidos e redirecionamento de URLs para não perder posições no Google.' },
      { question: 'Fazem marketplace (Mercado Livre, Shopee)?', answer: 'Integro a loja aos marketplaces via ERP ou hub, para o estoque ficar em um lugar só.' },
      { question: 'E o tráfego?', answer: 'Eu deixo a loja pronta para converter e medir. Para anúncios, trabalho junto com o seu gestor de tráfego.' },
    ],
    form: {
      title: 'Como está a sua loja hoje?',
      text: 'Com isso eu já sei por onde começar o diagnóstico.',
      heading: 'Olá, Breno! Vim pela página de lojas virtuais e quero vender mais.',
      fields: [
        nameField.pt,
        { name: 'situacao', label: 'Situação', type: 'select', required: true, placeholder: 'Escolha', options: ['Ainda não tenho loja', 'Tenho loja e quero otimizar', 'Quero migrar de plataforma'] },
        { name: 'loja', label: 'Link da loja (se tiver)', type: 'text', placeholder: 'minhaloja.com.br' },
        { name: 'produtos', label: 'O que você vende?', type: 'text', placeholder: 'Ex.: roupas, cosméticos, peças' },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'Online store and e-commerce development: Shopify and custom',
      description:
        'Build and optimize your online store: fast product pages, short checkout, shipping up front, abandoned-cart recovery and inventory synced with your ERP.',
    },
    hero: {
      title: 'The cart was full. The checkout stayed empty.',
      subtitle: 'Fast online stores with one-tap payments, shipping shown up front and cart recovery on WhatsApp.',
      note: 'abandoned carts today: 37',
      cta: 'Sell more online',
    },
    problem: {
      title: 'Where the store loses the sale',
      items: [
        'Slow product pages with heavy photos and generic copy.',
        'Shipping that only shows at the end and scares people off.',
        'Mandatory sign-up and a five-step checkout.',
        'Orders retyped into the ERP by hand.',
      ],
    },
    solution: {
      title: 'A store that sells while you pack',
      text: 'The right platform for your size (Shopify or custom) and the work that matters: speed, checkout and integrations.',
      items: [
        'Fast product pages with optimized photos and reviews',
        'Wallets, cards and local methods with a short checkout',
        'Shipping calculated on the product page',
        'Cart recovery via WhatsApp and email',
        'Orders and stock synced with your ERP',
      ],
    },
    steps: {
      title: 'How I work',
      items: [
        { title: 'Funnel diagnosis', text: 'Where people quit: product, cart or payment.' },
        { title: 'Platform', text: 'Choice or migration without losing products, customers or SEO.' },
        { title: 'New or optimized store', text: 'Theme, checkout and integrations.' },
        { title: 'Follow-up', text: 'Conversion metrics and tweaks in the first month.' },
      ],
    },
    proof: {
      title: 'Focused on what moves revenue',
      items: [
        { value: '1 tap', label: 'payments with wallets' },
        { value: 'ERP', label: 'stock and orders without retyping' },
        { value: 'GA4', label: 'e-commerce events configured' },
      ],
    },
    outcome: 'Customers see shipping, pay in one tap and the order is already in stock control.',
    price: {
      prefix: 'from',
      amount: 'US$ 1,500',
      includes: ['Store set up or migrated', 'Checkout and shipping', 'ERP or spreadsheet integration'],
      note: 'Optimizing an existing store from US$ 600. Platform fees not included.',
    },
    faq: [
      { question: 'Shopify or custom?', answer: 'For most stores a hosted platform is the best value. Custom pays off for specific business rules, B2B or high volume.' },
      { question: 'Can you migrate my store?', answer: 'Yes, with products, customers, orders and URL redirects so you keep your Google rankings.' },
      { question: 'Do you do marketplaces (Amazon, eBay)?', answer: 'I connect the store to marketplaces through your ERP or a hub so stock lives in one place.' },
      { question: 'What about traffic?', answer: 'I get the store ready to convert and measure. For ads, I work with your media buyer.' },
    ],
    form: {
      title: 'How is your store doing today?',
      text: 'That tells me where to start the diagnosis.',
      heading: 'Hi Breno! I came from the online stores page and want to sell more.',
      fields: [
        nameField.en,
        { name: 'situation', label: 'Situation', type: 'select', required: true, placeholder: 'Choose', options: ['No store yet', 'I have a store to optimize', 'I want to switch platforms'] },
        { name: 'store', label: 'Store link (if any)', type: 'text', placeholder: 'mystore.com' },
        { name: 'products', label: 'What do you sell?', type: 'text', placeholder: 'e.g. apparel, cosmetics, parts' },
        detailsField.en,
      ],
    },
  },
};
