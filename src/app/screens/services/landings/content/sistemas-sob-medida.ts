import { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the sistemas-sob-medida page. */
export const sistemasSobMedidaCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Desenvolvimento de sistemas web sob medida e painéis administrativos',
      description:
        'Sistema web sob medida para trocar planilhas: cadastro, estoque, agenda, ordens de serviço, financeiro e dashboards. Feito em Angular, Node.js e AWS, com você dono do código.',
    },
    hero: {
      title: 'A empresa cresceu. A planilha não aguenta mais.',
      subtitle: 'Sistemas web feitos para o jeito que a sua operação já funciona: um lugar só, com permissões, histórico e relatórios.',
      note: 'controle_FINAL (3) - cópia.xlsx — 14 abas',
      cta: 'Tirar a empresa da planilha',
    },
    problem: {
      title: 'Sinais de que a planilha virou gargalo',
      items: [
        'Duas pessoas editam ao mesmo tempo e uma sobrescreve a outra.',
        'Ninguém sabe quem mudou aquele valor, nem quando.',
        'O relatório do mês leva um dia inteiro para fechar.',
        'Sistemas prontos cobram por usuário e não fazem o que você precisa.',
      ],
    },
    solution: {
      title: 'Software que cabe na sua operação',
      text: 'Começo pelo fluxo mais doloroso, entrego em semanas e evoluo por partes. Você acompanha cada entrega e é dono do código e dos dados.',
      items: [
        'Cadastros, ordens de serviço, estoque, agenda e financeiro',
        'Perfis de acesso e histórico de cada alteração',
        'Dashboards com os números que você olha todo dia',
        'Exportação para PDF, Excel e integração com ERP',
        'Funciona no navegador e no celular, sem instalar nada',
      ],
    },
    steps: {
      title: 'Entregas pequenas, valor desde a primeira',
      items: [
        { title: 'Imersão', text: 'Acompanho a operação e mapeio o fluxo mais crítico.' },
        { title: 'Protótipo navegável', text: 'Você clica nas telas antes de uma linha de código.' },
        { title: 'Primeira versão em uso', text: 'O fluxo principal no ar em 4 a 8 semanas.' },
        { title: 'Evolução contínua', text: 'Novos módulos a cada ciclo, priorizados com você.' },
      ],
    },
    proof: {
      title: 'Experiência que vem de produção',
      items: [
        { value: '5+ anos', label: 'construindo sistemas web em Angular, Node.js e Java' },
        { value: 'AWS', label: 'serverless: custo baixo quando o uso é baixo' },
        { value: '100%', label: 'do código e dos dados com você' },
      ],
    },
    outcome: 'Fechei o mês em dez minutos e sei exatamente quem fez cada coisa.',
    price: {
      prefix: 'a partir de',
      amount: 'R$ 12.000',
      includes: ['Protótipo navegável', 'Primeira versão com o fluxo principal', '3 meses de suporte'],
      note: 'Projetos maiores são divididos em etapas com preço fechado cada uma.',
    },
    faq: [
      { question: 'Por que não um sistema pronto?', answer: 'Se um sistema pronto atende 90% do que você faz, use-o — eu até ajudo a integrar. Sob medida vale quando o seu processo é o seu diferencial ou quando você paga caro por usuário.' },
      { question: 'Quanto tempo leva?', answer: 'A primeira versão útil sai entre 4 e 8 semanas. Depois, evolui em ciclos curtos.' },
      { question: 'E se eu precisar mudar algo?', answer: 'Mudança é esperada. Cada ciclo começa revendo prioridades com você.' },
      { question: 'Quais tecnologias?', answer: 'Angular ou React no front, Node.js no back, PostgreSQL ou DynamoDB e AWS. Escolhas comuns no mercado, para que qualquer bom dev consiga manter.' },
    ],
    form: {
      title: 'Qual processo mais dói hoje?',
      text: 'Me conte e eu sugiro por onde começar.',
      heading: 'Olá, Breno! Vim pela página de sistemas sob medida e quero conversar sobre um sistema.',
      fields: [
        nameField.pt,
        { name: 'empresa', label: 'Empresa', type: 'text', autocomplete: 'organization' },
        { name: 'processo', label: 'Processo que precisa de sistema', type: 'text', required: true, placeholder: 'Ex.: ordens de serviço e estoque' },
        { name: 'usuarios', label: 'Quantas pessoas vão usar?', type: 'select', placeholder: 'Escolha', options: ['1 a 5', '6 a 20', '21 a 100', 'Mais de 100'] },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'Custom web software and admin dashboards',
      description:
        'Custom web systems that replace spreadsheets: records, inventory, scheduling, work orders, finance and dashboards. Built with Angular, Node.js and AWS — you own the code.',
    },
    hero: {
      title: 'The company grew. The spreadsheet can’t keep up.',
      subtitle: 'Web systems built around how your operation already works: one place, with permissions, history and reports.',
      note: 'tracking_FINAL (3) - copy.xlsx — 14 tabs',
      cta: 'Get off the spreadsheet',
    },
    problem: {
      title: 'Signs the spreadsheet became the bottleneck',
      items: [
        'Two people edit at once and one overwrites the other.',
        'Nobody knows who changed that value, or when.',
        'Monthly reporting takes a full day.',
        'Off-the-shelf tools charge per seat and still don’t fit.',
      ],
    },
    solution: {
      title: 'Software that fits your operation',
      text: 'I start with the most painful flow, ship in weeks and grow it piece by piece. You follow every delivery and own the code and data.',
      items: [
        'Records, work orders, inventory, scheduling and finance',
        'Access roles and a history of every change',
        'Dashboards with the numbers you check daily',
        'PDF/Excel export and ERP integration',
        'Works in the browser and on mobile, nothing to install',
      ],
    },
    steps: {
      title: 'Small deliveries, value from the first one',
      items: [
        { title: 'Immersion', text: 'I shadow the operation and map the most critical flow.' },
        { title: 'Clickable prototype', text: 'You click through screens before any code.' },
        { title: 'First version in use', text: 'The main flow live in 4 to 8 weeks.' },
        { title: 'Continuous evolution', text: 'New modules every cycle, prioritized with you.' },
      ],
    },
    proof: {
      title: 'Experience from production',
      items: [
        { value: '5+ years', label: 'building web systems in Angular, Node.js and Java' },
        { value: 'AWS', label: 'serverless: low cost while usage is low' },
        { value: '100%', label: 'of the code and data stay with you' },
      ],
    },
    outcome: 'I closed the month in ten minutes and know exactly who did what.',
    price: {
      prefix: 'from',
      amount: 'US$ 4,000',
      includes: ['Clickable prototype', 'First version with the main flow', '3 months of support'],
      note: 'Larger projects are split into fixed-price stages.',
    },
    faq: [
      { question: 'Why not an off-the-shelf tool?', answer: 'If one covers 90% of what you do, use it — I can even integrate it. Custom pays off when your process is your edge or per-seat pricing gets expensive.' },
      { question: 'How long does it take?', answer: 'The first useful version ships in 4 to 8 weeks, then grows in short cycles.' },
      { question: 'What if I need changes?', answer: 'Change is expected. Every cycle starts by reviewing priorities with you.' },
      { question: 'Which technologies?', answer: 'Angular or React, Node.js, PostgreSQL or DynamoDB, AWS. Mainstream choices so any good developer can maintain it.' },
    ],
    form: {
      title: 'Which process hurts the most?',
      text: 'Tell me and I’ll suggest where to start.',
      heading: 'Hi Breno! I came from the custom software page and want to talk about a system.',
      fields: [
        nameField.en,
        { name: 'company', label: 'Company', type: 'text', autocomplete: 'organization' },
        { name: 'process', label: 'Process that needs a system', type: 'text', required: true, placeholder: 'e.g. work orders and inventory' },
        { name: 'users', label: 'How many people will use it?', type: 'select', placeholder: 'Choose', options: ['1 to 5', '6 to 20', '21 to 100', 'Over 100'] },
        detailsField.en,
      ],
    },
  },
};
