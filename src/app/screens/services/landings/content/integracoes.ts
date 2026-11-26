import type { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the integracoes page. */
export const integracoesCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Integração de sistemas e APIs: WhatsApp, CRM, ERP e pagamentos',
      description:
        'Integração entre site, WhatsApp, CRM, ERP (Bling, Omie, Tiny), meios de pagamento (Pix, Stripe, Mercado Pago) e planilhas. Dados que andam sozinhos, sem copiar e colar.',
    },
    hero: {
      title: 'Seus sistemas não conversam. Quem conversa é você, copiando e colando.',
      subtitle: 'Eu conecto site, WhatsApp, CRM, ERP e pagamentos para que cada dado seja digitado uma vez só.',
      note: 'Ctrl+C · Ctrl+V · Ctrl+C · Ctrl+V',
      cta: 'Conectar meus sistemas',
    },
    problem: {
      title: 'Sem integração',
      items: [
        'O lead chega no site e alguém precisa passar para a planilha.',
        'O pedido pago no Pix não aparece no ERP até alguém lançar.',
        'O cliente pergunta o status no WhatsApp e ninguém sabe responder.',
        'Erro de digitação vira nota fiscal errada.',
      ],
    },
    solution: {
      title: 'Com integração',
      text: 'Webhooks, APIs oficiais e filas que reprocessam o que falhar. Cada evento importante dispara o próximo passo sozinho — e deixa rastro.',
      items: [
        'Lead do site cai no CRM com origem da campanha',
        'Pagamento confirmado gera pedido e nota no ERP',
        'Mensagem automática no WhatsApp a cada mudança de status',
        'Painel com logs: você vê o que passou e o que falhou',
        'Alerta quando uma API externa sai do ar',
      ],
    },
    steps: {
      title: 'Como eu integro',
      items: [
        { title: 'Mapa do fluxo', text: 'Desenho quem gera cada dado e quem precisa dele.' },
        { title: 'Conexão', text: 'APIs oficiais sempre que existirem, com credenciais suas.' },
        { title: 'Teste com dados reais', text: 'Rodamos em paralelo antes de desligar o processo manual.' },
        { title: 'Monitoramento', text: 'Logs, alertas e reprocessamento automático.' },
      ],
    },
    proof: {
      title: 'Ferramentas que eu já conecto',
      items: [
        { value: 'WhatsApp', label: 'Cloud API oficial da Meta' },
        { value: 'ERP', label: 'Bling, Omie, Tiny e APIs REST' },
        { value: 'Pix', label: 'Mercado Pago, Asaas, Stripe, Pagar.me' },
      ],
    },
    outcome: 'Faz três meses que ninguém digita pedido aqui.',
    price: {
      prefix: 'a partir de',
      amount: 'R$ 900',
      period: 'por integração',
      includes: ['Mapeamento do fluxo', 'Integração com logs e reprocessamento', 'Documentação do que foi feito'],
      note: 'Monitoramento mensal opcional a partir de R$ 250/mês.',
    },
    faq: [
      { question: 'E se o sistema não tiver API?', answer: 'Existem alternativas: webhooks, exportação agendada, e-mail estruturado ou automação de navegador. Eu indico a mais estável para o seu caso.' },
      { question: 'Usa n8n, Make ou Zapier?', answer: 'Quando fizer sentido, sim — e eu deixo tudo no seu nome. Para volume alto ou regra complexa, código próprio sai mais barato no mês.' },
      { question: 'Meus dados ficam seguros?', answer: 'As credenciais ficam na sua conta, com acesso mínimo necessário, e os dados pessoais seguem a LGPD.' },
      { question: 'Quanto tempo leva?', answer: 'Uma integração simples fica pronta em poucos dias. Fluxos com várias etapas, de duas a quatro semanas.' },
    ],
    form: {
      title: 'Quais sistemas você usa?',
      text: 'Liste o que precisa conversar e eu digo como conectar.',
      heading: 'Olá, Breno! Vim pela página de integrações e quero conectar meus sistemas.',
      fields: [
        nameField.pt,
        { name: 'sistemas', label: 'Sistemas que precisam conversar', type: 'text', required: true, placeholder: 'Ex.: site + RD Station + Bling' },
        { name: 'volume', label: 'Volume por dia', type: 'select', placeholder: 'Escolha', options: ['Até 20 registros', '20 a 200', 'Mais de 200', 'Não sei'] },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'System and API integration: WhatsApp, CRM, ERP and payments',
      description:
        'Connect your website, WhatsApp, CRM, ERP, payment providers (Stripe, PayPal) and spreadsheets. Data that moves on its own — no more copy and paste.',
    },
    hero: {
      title: 'Your systems don’t talk. You do, copying and pasting.',
      subtitle: 'I connect website, WhatsApp, CRM, ERP and payments so every piece of data is typed once.',
      note: 'Ctrl+C · Ctrl+V · Ctrl+C · Ctrl+V',
      cta: 'Connect my systems',
    },
    problem: {
      title: 'Without integration',
      items: [
        'A lead arrives on the site and someone has to retype it into a spreadsheet.',
        'A paid order does not show in the ERP until someone enters it.',
        'Customers ask for order status on WhatsApp and nobody knows.',
        'A typo becomes a wrong invoice.',
      ],
    },
    solution: {
      title: 'With integration',
      text: 'Webhooks, official APIs and queues that retry what fails. Every important event triggers the next step on its own — and leaves a trail.',
      items: [
        'Website leads land in the CRM with campaign source',
        'Confirmed payment creates the order and invoice',
        'Automatic WhatsApp message at every status change',
        'Log dashboard: see what went through and what failed',
        'Alerts when an external API goes down',
      ],
    },
    steps: {
      title: 'How I integrate',
      items: [
        { title: 'Flow map', text: 'Who creates each piece of data and who needs it.' },
        { title: 'Connection', text: 'Official APIs whenever they exist, with your own credentials.' },
        { title: 'Real-data test', text: 'Runs in parallel before the manual process is switched off.' },
        { title: 'Monitoring', text: 'Logs, alerts and automatic retries.' },
      ],
    },
    proof: {
      title: 'Tools I already connect',
      items: [
        { value: 'WhatsApp', label: 'Meta’s official Cloud API' },
        { value: 'CRM', label: 'HubSpot, Pipedrive, RD Station' },
        { value: 'Payments', label: 'Stripe, PayPal, Mercado Pago' },
      ],
    },
    outcome: 'Nobody has typed an order here in three months.',
    price: {
      prefix: 'from',
      amount: 'US$ 300',
      period: 'per integration',
      includes: ['Flow mapping', 'Integration with logs and retries', 'Written documentation'],
      note: 'Optional monthly monitoring from US$ 80/month.',
    },
    faq: [
      { question: 'What if the system has no API?', answer: 'There are options: webhooks, scheduled exports, structured email or browser automation. I recommend the most stable one for your case.' },
      { question: 'Do you use n8n, Make or Zapier?', answer: 'When it makes sense, yes — all under your account. For high volume or complex rules, custom code is cheaper per month.' },
      { question: 'Is my data safe?', answer: 'Credentials stay in your account with least-privilege access, and personal data is handled under GDPR/LGPD.' },
      { question: 'How long does it take?', answer: 'A simple integration takes a few days. Multi-step flows take two to four weeks.' },
    ],
    form: {
      title: 'Which systems do you use?',
      text: 'List what needs to talk and I’ll tell you how to connect it.',
      heading: 'Hi Breno! I came from the integrations page and want to connect my systems.',
      fields: [
        nameField.en,
        { name: 'systems', label: 'Systems that need to talk', type: 'text', required: true, placeholder: 'e.g. website + HubSpot + QuickBooks' },
        { name: 'volume', label: 'Daily volume', type: 'select', placeholder: 'Choose', options: ['Up to 20 records', '20 to 200', 'Over 200', 'Not sure'] },
        detailsField.en,
      ],
    },
  },
};
