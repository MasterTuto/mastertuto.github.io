import { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the agentes-de-ia page. */
export const agentesDeIaCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Agente de IA para WhatsApp: atendimento, vendas e agendamento 24h',
      description:
        'Agentes de IA que atendem no WhatsApp, respondem com base nos seus documentos, agendam, qualificam leads e consultam seu sistema. Com passagem para humano e LGPD.',
    },
    hero: {
      title: '23h47. Um cliente perguntou o preço. Ninguém respondeu.',
      subtitle: 'Agentes de IA que atendem no WhatsApp a qualquer hora, respondem com os seus dados e passam para você só o que precisa de você.',
      note: 'visto por último hoje às 18:02',
      cta: 'Quero um agente',
    },
    problem: {
      title: 'O atendimento que não escala',
      items: [
        'Metade das mensagens são as mesmas cinco perguntas.',
        'Lead que chega à noite esfria até de manhã.',
        'Chatbot de menu ("digite 1") que irrita mais do que ajuda.',
        'A equipe não consegue consultar estoque, agenda e pedido ao mesmo tempo.',
      ],
    },
    solution: {
      title: 'Um agente que entende, consulta e age',
      text: 'Não é um menu de opções: é um modelo de linguagem com regras suas, acesso controlado às suas ferramentas e limites claros do que pode fazer.',
      items: [
        'Responde com base nos seus documentos, preços e políticas (RAG)',
        'Consulta agenda, estoque e status de pedido pela API do seu sistema',
        'Agenda, qualifica o lead e registra tudo no CRM',
        'Passa para um humano quando o assunto pede, com o resumo da conversa',
        'Painel com conversas, custos e perguntas sem resposta',
      ],
    },
    steps: {
      title: 'Do zero ao agente em produção',
      items: [
        { title: 'Base de conhecimento', text: 'Reunimos perguntas reais, documentos e regras de negócio.' },
        { title: 'Ferramentas', text: 'Defino o que o agente pode consultar e fazer — e o que não pode.' },
        { title: 'Testes com casos difíceis', text: 'Perguntas fora do tema, pressão por desconto, dados pessoais.' },
        { title: 'Lançamento gradual', text: 'Começa num horário ou num número, com você acompanhando.' },
      ],
    },
    proof: {
      title: 'Construído por quem coloca IA em produção',
      items: [
        { value: '24h', label: 'de atendimento, todos os dias' },
        { value: 'API', label: 'oficial do WhatsApp, sem risco de banimento' },
        { value: '100%', label: 'das conversas registradas e auditáveis' },
      ],
    },
    outcome: 'Acordei com três horários marcados e nenhuma mensagem para responder.',
    price: {
      prefix: 'implantação a partir de',
      amount: 'R$ 3.500',
      period: '+ R$ 600/mês',
      includes: ['Agente com base de conhecimento', 'Integração com WhatsApp oficial e CRM', 'Monitoramento e melhorias mensais'],
      note: 'Custos de uso da IA e da API do WhatsApp são repassados sem margem.',
    },
    faq: [
      { question: 'A IA pode inventar resposta?', answer: 'O agente só responde com base no que você aprovou e é instruído a dizer que não sabe — e passar para um humano — quando a resposta não está na base.' },
      { question: 'Qual IA vocês usam?', answer: 'Escolho o modelo pelo caso: custo, velocidade e qualidade em português. A arquitetura permite trocar de modelo sem refazer o agente.' },
      { question: 'Meu número pode ser bloqueado?', answer: 'Com a API oficial da Meta, não há risco de banimento por automação. Soluções não oficiais têm esse risco e eu não as uso.' },
      { question: 'E a LGPD?', answer: 'Dados pessoais são minimizados, o cliente é informado de que fala com uma IA e os registros ficam na sua conta.' },
    ],
    form: {
      title: 'Como é o seu atendimento hoje?',
      text: 'Com isso eu já consigo desenhar o primeiro agente.',
      heading: 'Olá, Breno! Vim pela página de agentes de IA e quero um agente para o meu atendimento.',
      fields: [
        nameField.pt,
        { name: 'negocio', label: 'Tipo de negócio', type: 'text', required: true, placeholder: 'Ex.: clínica, imobiliária, loja' },
        { name: 'mensagens', label: 'Mensagens por dia', type: 'select', required: true, placeholder: 'Escolha', options: ['Até 30', '30 a 150', '150 a 500', 'Mais de 500'] },
        { name: 'tarefa', label: 'O que o agente deve fazer?', type: 'select', placeholder: 'Escolha', options: ['Tirar dúvidas', 'Agendar', 'Vender / qualificar leads', 'Suporte pós-venda', 'Tudo isso'] },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'AI agents for WhatsApp: 24/7 support, sales and scheduling',
      description:
        'AI agents that answer on WhatsApp from your own documents, book appointments, qualify leads and query your systems — with human handoff and privacy built in.',
    },
    hero: {
      title: '11:47 pm. A customer asked for a price. Nobody answered.',
      subtitle: 'AI agents that answer on WhatsApp at any hour, reply with your data and only hand you what needs you.',
      note: 'last seen today at 6:02 pm',
      cta: 'I want an agent',
    },
    problem: {
      title: 'Support that doesn’t scale',
      items: [
        'Half of all messages are the same five questions.',
        'Leads that arrive at night go cold by morning.',
        'Menu chatbots ("press 1") that annoy more than help.',
        'The team can’t check stock, calendar and orders at the same time.',
      ],
    },
    solution: {
      title: 'An agent that understands, looks things up and acts',
      text: 'Not an options menu: a language model with your rules, controlled access to your tools and clear limits on what it can do.',
      items: [
        'Answers from your documents, prices and policies (RAG)',
        'Checks calendar, stock and order status through your system’s API',
        'Books, qualifies leads and logs everything in your CRM',
        'Hands off to a human when needed, with a conversation summary',
        'Dashboard with conversations, costs and unanswered questions',
      ],
    },
    steps: {
      title: 'From zero to an agent in production',
      items: [
        { title: 'Knowledge base', text: 'Real questions, documents and business rules gathered.' },
        { title: 'Tools', text: 'I define what the agent can look up and do — and what it can’t.' },
        { title: 'Hard-case testing', text: 'Off-topic questions, discount pressure, personal data.' },
        { title: 'Gradual launch', text: 'Starts on one schedule or one number, with you watching.' },
      ],
    },
    proof: {
      title: 'Built by someone who ships AI to production',
      items: [
        { value: '24h', label: 'of support, every day' },
        { value: 'API', label: 'official WhatsApp API, no ban risk' },
        { value: '100%', label: 'of conversations logged and auditable' },
      ],
    },
    outcome: 'I woke up to three bookings and zero messages to answer.',
    price: {
      prefix: 'setup from',
      amount: 'US$ 1,200',
      period: '+ US$ 200/month',
      includes: ['Agent with knowledge base', 'Official WhatsApp and CRM integration', 'Monthly monitoring and improvements'],
      note: 'AI and WhatsApp API usage costs passed through at cost.',
    },
    faq: [
      { question: 'Can the AI make things up?', answer: 'The agent only answers from what you approved and is told to say it doesn’t know — and hand off — when the answer isn’t in the base.' },
      { question: 'Which AI do you use?', answer: 'I pick the model per case: cost, speed and quality in your language. The architecture lets you switch models without rebuilding the agent.' },
      { question: 'Can my number get banned?', answer: 'With Meta’s official API there is no ban risk for automation. Unofficial solutions carry that risk and I don’t use them.' },
      { question: 'What about privacy?', answer: 'Personal data is minimized, customers are told they are talking to an AI, and logs stay in your account.' },
    ],
    form: {
      title: 'What does your support look like today?',
      text: 'With this I can already sketch the first agent.',
      heading: 'Hi Breno! I came from the AI agents page and want an agent for my customer support.',
      fields: [
        nameField.en,
        { name: 'business', label: 'Type of business', type: 'text', required: true, placeholder: 'e.g. clinic, real estate, store' },
        { name: 'messages', label: 'Messages per day', type: 'select', required: true, placeholder: 'Choose', options: ['Up to 30', '30 to 150', '150 to 500', 'Over 500'] },
        { name: 'job', label: 'What should the agent do?', type: 'select', placeholder: 'Choose', options: ['Answer questions', 'Book appointments', 'Sell / qualify leads', 'After-sales support', 'All of it'] },
        detailsField.en,
      ],
    },
  },
};
