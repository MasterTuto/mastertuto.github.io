import { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the cloud-e-devops page. */
export const cloudEDevopsCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Consultoria AWS e DevOps: redução de custos, CI/CD e serverless',
      description:
        'Consultoria em AWS e DevOps: reduzir a conta da nuvem, automatizar deploy (CI/CD), infraestrutura como código, monitoramento e arquitetura serverless.',
    },
    hero: {
      title: 'A conta da AWS chegou. Ninguém sabe explicar.',
      subtitle: 'Eu reviso a sua nuvem, corto o que sobra e deixo o deploy automático, monitorado e documentado.',
      note: 'Estimated charges: US$ 4.812,37 ▲',
      cta: 'Revisar minha nuvem',
    },
    problem: {
      title: 'Sintomas comuns',
      items: [
        'Máquinas ligadas 24h para um sistema usado em horário comercial.',
        'Deploy manual, por uma pessoa só, na sexta à tarde.',
        'Você descobre que o site caiu pelo cliente.',
        'Ninguém sabe o que cada recurso faz — então ninguém apaga.',
      ],
    },
    solution: {
      title: 'Nuvem enxuta, deploy sem medo',
      text: 'Começo com um diagnóstico de custos e riscos. Depois, entrego infraestrutura como código, pipeline de deploy e alertas que acordam a pessoa certa.',
      items: [
        'Relatório de custos com economia estimada por item',
        'Arquitetura serverless (Lambda, API Gateway, EventBridge) quando faz sentido',
        'CI/CD com testes, revisão e rollback',
        'Infraestrutura como código (CloudFormation / CDK / Terraform)',
        'Logs, métricas e alertas no CloudWatch',
      ],
    },
    steps: {
      title: 'Engajamento',
      items: [
        { title: 'Acesso de leitura', text: 'Permissão mínima para auditar, sem mexer em nada.' },
        { title: 'Diagnóstico em 5 dias', text: 'Custos, segurança (IAM, OWASP) e confiabilidade.' },
        { title: 'Plano priorizado', text: 'O que fazer primeiro, quanto economiza e quanto custa.' },
        { title: 'Execução', text: 'Eu implemento ou acompanho o seu time.' },
      ],
    },
    proof: {
      title: 'Rotina de quem opera AWS em produção',
      items: [
        { value: 'IaC', label: 'tudo versionado e reproduzível' },
        { value: 'IAM', label: 'acesso mínimo necessário, revisado' },
        { value: 'OWASP', label: 'Top 10 como checklist de segurança' },
      ],
    },
    outcome: 'A conta caiu e o deploy virou um botão que qualquer um aperta.',
    price: {
      prefix: 'diagnóstico a partir de',
      amount: 'R$ 2.500',
      includes: ['Auditoria de custos, segurança e confiabilidade', 'Relatório com economia estimada', 'Reunião de apresentação do plano'],
      note: 'Execução por hora (a partir de R$ 180/h) ou por pacote fechado.',
    },
    faq: [
      { question: 'Só AWS?', answer: 'AWS é a minha especialidade. Para GCP e Azure faço diagnóstico e CI/CD; para mudanças profundas, indico parceiros.' },
      { question: 'Preciso dar acesso total?', answer: 'Não. O diagnóstico usa uma função de leitura com permissões mínimas, que você revoga quando quiser.' },
      { question: 'Quanto dá para economizar?', answer: 'Depende do ponto de partida. O relatório mostra a economia estimada item a item antes de qualquer mudança.' },
      { question: 'Vocês ficam de plantão?', answer: 'Posso montar o monitoramento e um plano de resposta. Plantão 24h é contratado à parte.' },
    ],
    form: {
      title: 'Como está a sua infraestrutura?',
      text: 'Três respostas e eu digo se o diagnóstico vale para você.',
      heading: 'Olá, Breno! Vim pela página de cloud e DevOps e quero revisar minha infraestrutura.',
      fields: [
        nameField.pt,
        { name: 'nuvem', label: 'Onde está hospedado?', type: 'select', required: true, placeholder: 'Escolha', options: ['AWS', 'Google Cloud', 'Azure', 'VPS / servidor próprio', 'Não sei'] },
        { name: 'gasto', label: 'Gasto mensal aproximado', type: 'select', placeholder: 'Escolha', options: ['Até R$ 1.000', 'R$ 1.000 a 10.000', 'Mais de R$ 10.000'] },
        { name: 'dor', label: 'Maior dor', type: 'select', placeholder: 'Escolha', options: ['Custo', 'Deploy manual', 'Quedas / lentidão', 'Segurança'] },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'AWS and DevOps consulting: cost reduction, CI/CD and serverless',
      description:
        'AWS and DevOps consulting: lower your cloud bill, automate deploys (CI/CD), infrastructure as code, monitoring and serverless architecture.',
    },
    hero: {
      title: 'The AWS bill arrived. Nobody can explain it.',
      subtitle: 'I review your cloud, cut what’s idle and leave deploys automated, monitored and documented.',
      note: 'Estimated charges: US$ 4,812.37 ▲',
      cta: 'Review my cloud',
    },
    problem: {
      title: 'Common symptoms',
      items: [
        'Servers running 24/7 for a system used during office hours.',
        'Manual deploys by one person on Friday afternoon.',
        'You learn the site is down from a customer.',
        'Nobody knows what each resource does — so nobody deletes anything.',
      ],
    },
    solution: {
      title: 'Lean cloud, fearless deploys',
      text: 'It starts with a cost and risk review. Then infrastructure as code, a deploy pipeline and alerts that wake the right person.',
      items: [
        'Cost report with estimated savings per item',
        'Serverless architecture (Lambda, API Gateway, EventBridge) where it fits',
        'CI/CD with tests, review and rollback',
        'Infrastructure as code (CloudFormation / CDK / Terraform)',
        'Logs, metrics and alerts in CloudWatch',
      ],
    },
    steps: {
      title: 'Engagement',
      items: [
        { title: 'Read-only access', text: 'Least privilege to audit, nothing touched.' },
        { title: '5-day review', text: 'Cost, security (IAM, OWASP) and reliability.' },
        { title: 'Prioritized plan', text: 'What first, how much it saves and what it costs.' },
        { title: 'Execution', text: 'I implement it or coach your team.' },
      ],
    },
    proof: {
      title: 'Daily routine of someone running AWS in production',
      items: [
        { value: 'IaC', label: 'everything versioned and reproducible' },
        { value: 'IAM', label: 'least-privilege access, reviewed' },
        { value: 'OWASP', label: 'Top 10 as the security checklist' },
      ],
    },
    outcome: 'The bill went down and deploying became a button anyone can press.',
    price: {
      prefix: 'review from',
      amount: 'US$ 800',
      includes: ['Cost, security and reliability audit', 'Report with estimated savings', 'Plan walkthrough meeting'],
      note: 'Execution hourly (from US$ 50/h) or as a fixed package.',
    },
    faq: [
      { question: 'AWS only?', answer: 'AWS is my specialty. For GCP and Azure I do reviews and CI/CD; for deep changes I refer partners.' },
      { question: 'Do I need to give full access?', answer: 'No. The review uses a least-privilege read-only role you can revoke at any time.' },
      { question: 'How much can I save?', answer: 'It depends on the starting point. The report shows estimated savings item by item before any change.' },
      { question: 'Do you do on-call?', answer: 'I can set up monitoring and an incident plan. 24/7 on-call is contracted separately.' },
    ],
    form: {
      title: 'How is your infrastructure set up?',
      text: 'Three answers and I’ll tell you if the review is worth it.',
      heading: 'Hi Breno! I came from the cloud and DevOps page and want to review my infrastructure.',
      fields: [
        nameField.en,
        { name: 'cloud', label: 'Where is it hosted?', type: 'select', required: true, placeholder: 'Choose', options: ['AWS', 'Google Cloud', 'Azure', 'VPS / own server', 'Not sure'] },
        { name: 'spend', label: 'Approximate monthly spend', type: 'select', placeholder: 'Choose', options: ['Up to US$ 200', 'US$ 200 to 2,000', 'Over US$ 2,000'] },
        { name: 'pain', label: 'Biggest pain', type: 'select', placeholder: 'Choose', options: ['Cost', 'Manual deploys', 'Downtime / slowness', 'Security'] },
        detailsField.en,
      ],
    },
  },
};
