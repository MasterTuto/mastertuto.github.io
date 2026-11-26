import type { LandingContent } from '../landing.model';
import { nameField } from './common';

/** Words of the automacao-de-processos page. */
export const automacaoDeProcessosCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Automação de processos com n8n, planilhas e WhatsApp',
      description:
        'Automação de tarefas repetitivas: relatórios, cobranças, follow-up, planilhas, e-mails e WhatsApp. Fluxos em n8n ou código, com monitoramento e manutenção.',
    },
    hero: {
      title: 'Toda segunda-feira, alguém da sua equipe faz o trabalho de um robô.',
      subtitle: 'Eu automatizo relatórios, cobranças, follow-ups e planilhas para que as pessoas façam o que só pessoas fazem.',
      note: 'segunda · 08:00 · "atualizar planilha de vendas"',
      cta: 'Automatizar uma tarefa',
    },
    problem: {
      title: 'Tarefas que somem quando automatizadas',
      items: [
        'Montar o relatório semanal juntando três planilhas.',
        'Cobrar cliente atrasado, um por um, no WhatsApp.',
        'Mandar o mesmo e-mail de boas-vindas para cada novo cliente.',
        'Baixar notas, renomear arquivos e salvar no Drive.',
        'Conferir se o estoque bateu com as vendas do dia.',
      ],
    },
    solution: {
      title: 'Fluxos que rodam sozinhos e avisam quando algo sai do normal',
      text: 'Uso n8n quando você quer enxergar e mexer no fluxo, e código quando o volume ou a regra pedem. Em ambos os casos, com logs, alertas e documentação.',
      items: [
        'Gatilhos por horário, formulário, e-mail ou mensagem',
        'Planilhas Google e Excel lidas e atualizadas automaticamente',
        'Mensagens de cobrança e lembrete no WhatsApp',
        'Relatórios em PDF ou no e-mail toda manhã',
        'Alerta no seu celular quando algo falha',
      ],
    },
    steps: {
      title: 'Da tarefa manual ao fluxo',
      items: [
        { title: 'Você grava a tela', text: 'Mostra a tarefa sendo feita uma vez. Eu anoto cada passo.' },
        { title: 'Eu calculo o retorno', text: 'Horas economizadas por mês × custo da hora, antes de começar.' },
        { title: 'Construo e testo', text: 'Em paralelo com o processo manual, até bater 100%.' },
        { title: 'Entrego e acompanho', text: 'Documentação, treinamento e monitoramento.' },
      ],
    },
    proof: {
      title: 'O que conta é o tempo devolvido',
      items: [
        { value: '24/7', label: 'executando, inclusive feriado' },
        { value: '0', label: 'erros de digitação em tarefas automatizadas' },
        { value: 'ROI', label: 'estimado antes de você pagar' },
      ],
    },
    outcome: 'O relatório chega pronto no meu e-mail antes de eu acordar.',
    price: {
      prefix: 'a partir de',
      amount: 'R$ 1.200',
      period: 'por fluxo',
      includes: ['Fluxo com tratamento de erros', 'Alertas de falha', 'Documentação e treinamento'],
      note: 'Manutenção e monitoramento a partir de R$ 250/mês. Custos de ferramentas (n8n Cloud, APIs) à parte.',
    },
    faq: [
      { question: 'O que dá para automatizar?', answer: 'Quase tudo que segue uma regra e se repete: copiar dados, enviar mensagens, gerar documentos, conferir valores. Se a tarefa exige julgamento, um agente de IA pode ajudar.' },
      { question: 'Preciso pagar n8n ou Zapier?', answer: 'Depende. O n8n pode rodar em servidor próprio com custo baixo; Zapier e Make cobram por execução. Eu comparo o custo mensal antes.' },
      { question: 'E se o fluxo quebrar?', answer: 'Você recebe um alerta e o fluxo tenta de novo. Com o plano de manutenção, eu corrijo antes de você perceber.' },
      { question: 'Minha equipe consegue mexer?', answer: 'Em n8n, sim: o fluxo é visual. Eu deixo nomes claros e um guia de como alterar.' },
    ],
    form: {
      title: 'Qual tarefa você quer tirar da sua semana?',
      text: 'Descreva em uma linha. Eu respondo com uma estimativa de horas economizadas.',
      heading: 'Olá, Breno! Vim pela página de automação e quero automatizar uma tarefa.',
      fields: [
        nameField.pt,
        { name: 'tarefa', label: 'Qual tarefa?', type: 'text', required: true, placeholder: 'Ex.: cobrar clientes atrasados no WhatsApp' },
        { name: 'horas', label: 'Horas gastas por semana', type: 'select', required: true, placeholder: 'Escolha', options: ['Menos de 2h', '2 a 5h', '5 a 15h', 'Mais de 15h'] },
        { name: 'ferramentas', label: 'Ferramentas envolvidas', type: 'text', placeholder: 'Ex.: Google Sheets, Gmail, Bling' },
      ],
    },
  },
  en: {
    seo: {
      title: 'Business process automation with n8n, spreadsheets and WhatsApp',
      description:
        'Automate repetitive work: reports, payment reminders, follow-ups, spreadsheets, email and WhatsApp. Flows in n8n or code, monitored and maintained.',
    },
    hero: {
      title: 'Every Monday, someone on your team does a robot’s job.',
      subtitle: 'I automate reports, payment reminders, follow-ups and spreadsheets so people do what only people can.',
      note: 'monday · 08:00 · "update sales spreadsheet"',
      cta: 'Automate a task',
    },
    problem: {
      title: 'Tasks that disappear once automated',
      items: [
        'Building the weekly report from three spreadsheets.',
        'Chasing late payments one by one on WhatsApp.',
        'Sending the same welcome email to every new client.',
        'Downloading invoices, renaming files and saving them to Drive.',
        'Checking whether stock matches the day’s sales.',
      ],
    },
    solution: {
      title: 'Flows that run on their own and speak up when something is off',
      text: 'n8n when you want to see and tweak the flow, code when volume or rules demand it. Either way with logs, alerts and documentation.',
      items: [
        'Triggers by schedule, form, email or message',
        'Google Sheets and Excel read and updated automatically',
        'Payment and reminder messages on WhatsApp',
        'PDF or email reports every morning',
        'Phone alert when something fails',
      ],
    },
    steps: {
      title: 'From manual task to flow',
      items: [
        { title: 'You record your screen', text: 'Show the task once. I note every step.' },
        { title: 'I estimate the return', text: 'Hours saved per month × hourly cost, before we start.' },
        { title: 'Build and test', text: 'Side by side with the manual process until it matches 100%.' },
        { title: 'Hand over and monitor', text: 'Documentation, training and monitoring.' },
      ],
    },
    proof: {
      title: 'What counts is time given back',
      items: [
        { value: '24/7', label: 'running, holidays included' },
        { value: '0', label: 'typos in automated tasks' },
        { value: 'ROI', label: 'estimated before you pay' },
      ],
    },
    outcome: 'The report is in my inbox before I wake up.',
    price: {
      prefix: 'from',
      amount: 'US$ 400',
      period: 'per flow',
      includes: ['Flow with error handling', 'Failure alerts', 'Documentation and training'],
      note: 'Maintenance and monitoring from US$ 80/month. Tool costs (n8n Cloud, APIs) not included.',
    },
    faq: [
      { question: 'What can be automated?', answer: 'Almost anything rule-based and repetitive: moving data, sending messages, generating documents, checking values. If it needs judgment, an AI agent can help.' },
      { question: 'Do I need to pay for n8n or Zapier?', answer: 'It depends. n8n can run self-hosted at low cost; Zapier and Make charge per run. I compare monthly costs first.' },
      { question: 'What if the flow breaks?', answer: 'You get an alert and the flow retries. With the maintenance plan, I fix it before you notice.' },
      { question: 'Can my team edit it?', answer: 'In n8n, yes: flows are visual. I use clear names and leave a how-to guide.' },
    ],
    form: {
      title: 'Which task do you want off your week?',
      text: 'Describe it in one line. I’ll reply with an estimate of hours saved.',
      heading: 'Hi Breno! I came from the automation page and want to automate a task.',
      fields: [
        nameField.en,
        { name: 'task', label: 'Which task?', type: 'text', required: true, placeholder: 'e.g. chase late payments on WhatsApp' },
        { name: 'hours', label: 'Hours spent per week', type: 'select', required: true, placeholder: 'Choose', options: ['Under 2h', '2 to 5h', '5 to 15h', 'Over 15h'] },
        { name: 'tools', label: 'Tools involved', type: 'text', placeholder: 'e.g. Google Sheets, Gmail, QuickBooks' },
      ],
    },
  },
};
