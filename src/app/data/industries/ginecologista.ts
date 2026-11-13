import type { Industry } from './industry.model';

export const ginecologista: Industry = {
  slug: 'ginecologista',
  name: 'Ginecologia',
  title: 'Agendamento discreto, do primeiro contato à consulta.',
  intro:
    'Site e resposta automática que marcam consultas, enviam suas orientações de preparo e mantêm sintomas e exames fora do WhatsApp da recepção.',
  images: {
    hero: {
      src: 'assets/images/segments/ginecologista/hero.svg',
      alt: 'Ginecologista de jaleco atrás da mesa do consultório conversando com uma paciente sentada, com janela, planta e maca ao fundo',
    },
    routine: {
      src: 'assets/images/segments/ginecologista/routine.svg',
      alt: 'Celular cheio de mensagens e anexos ao lado de uma agenda com horários riscados e um relógio marcando a noite',
    },
    closing: {
      src: 'assets/images/segments/ginecologista/closing.svg',
      alt: 'Médica e paciente se cumprimentando ao lado da porta do consultório, com um calendário de horários marcados na parede',
    },
  },
  routine: {
    quote:
      'Oi, boa noite, desculpa o horário. Tô com um corrimento estranho e coceira faz uns dias, é normal? A doutora consegue me encaixar essa semana?',
    context: 'Mensagem típica no WhatsApp da recepção de um consultório de ginecologia, numa quarta às 23h',
    body: 'A secretária lê de manhã e não pode dizer se é normal. O relato íntimo fica no celular da recepção, e a paciente espera uma resposta que só você pode dar, na consulta.',
  },
  problems: [
    {
      title: 'Preventivo e menstruação',
      today:
        'A paciente marca o preventivo sem conhecer o preparo e descobre na véspera que vai estar menstruada. Ela desmarca em cima da hora e o horário fica vazio.',
      change:
        'Ao marcar, ela recebe por escrito as orientações de preparo que você definiu. Dois dias antes, um lembrete repete o preparo e traz um link para remarcar.',
    },
    {
      title: 'Sintomas no WhatsApp',
      today:
        'Pacientes descrevem sangramento, corrimento ou atraso menstrual na conversa com a recepção. A secretária não pode orientar, e esses relatos ficam guardados num celular de uso comum.',
      change:
        'A resposta automática pede só nome, convênio e horário, e avisa que sintomas são conversados na consulta. Ela também orienta a procurar um pronto atendimento em caso de urgência.',
    },
    {
      title: 'Exame para dar uma olhada',
      today:
        'Sai o resultado do laboratório e a paciente manda o PDF pedindo para você dar só uma olhadinha. Você responde à noite, fora do prontuário, ou ela fica sem resposta.',
      change:
        'O site explica como funciona o retorno com exames: prazo, valor e como marcar. A resposta automática oferece um horário de retorno em vez de pedir o arquivo.',
    },
  ],
  contrast: [
    {
      today: 'A recepção repete todo dia quais convênios você atende.',
      withSite: 'Convênios aceitos e valor da consulta particular ficam numa página do site.',
    },
    {
      today: 'A paciente não sabe se o ultrassom ou o DIU é feito no consultório.',
      withSite: 'Cada serviço que você oferece tem uma página curta com o que esperar e como marcar.',
    },
    {
      today: 'Quem busca seu nome no Google acha um endereço antigo e um telefone sem resposta.',
      withSite: 'Site e perfil no Google mostram endereço, horários, acessibilidade, CRM e RQE.',
    },
    {
      today: 'A confirmação das consultas é feita por telefone, uma a uma, na véspera.',
      withSite: 'A confirmação sai sozinha, e a recepção vê quem confirmou e quem pediu para remarcar.',
    },
  ],
  chat: {
    title: 'Agendar sem expor a paciente.',
    body: 'A mensagem automática responde na hora, a qualquer hora, e pede só o necessário para agendar. Sintomas, exames e dúvidas clínicas ficam para a consulta, com você.',
    lines: [
      {
        from: 'client',
        text: 'Boa noite! Queria marcar meu preventivo. Vocês atendem pelo meu convênio?',
      },
      {
        from: 'reply',
        text: 'Olá! Esta é a resposta automática do consultório. Para agendar, envie seu nome completo, o nome do convênio e os períodos em que pode vir. Não precisa contar sintomas por aqui.',
      },
      {
        from: 'client',
        text: 'Mariana Souza, convênio da empresa, de manhã. Minha menstruação deve vir semana que vem, tem problema?',
      },
      {
        from: 'reply',
        text: 'Anotado, Mariana. A recepção confere o convênio e confirma o horário amanhã a partir das 8h, junto com as orientações de preparo do consultório. Em caso de urgência, procure um pronto atendimento.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido de horário',
      text: 'A paciente escolhe o tipo de consulta no site ou no WhatsApp e informa nome, convênio e períodos livres.',
    },
    {
      title: 'Confirmação pela recepção',
      text: 'A recepção confere convênio e agenda e confirma o horário com a paciente.',
    },
    {
      title: 'Preparo e lembrete',
      text: 'Ela recebe suas orientações de preparo e, perto da data, um lembrete com a opção de remarcar.',
    },
    {
      title: 'Consulta e retorno',
      text: 'A conversa clínica acontece na consulta, com você, e a recepção marca o retorno quando você pedir.',
    },
  ],
  faq: [
    {
      question: 'O site segue as regras de publicidade do CFM?',
      answer:
        'O texto é escrito com base na Resolução CFM 2.336/2023: nome, CRM e RQE visíveis, sem promessa de resultado e sem sensacionalismo. Você revisa tudo antes de publicar e pode consultar o seu CRM em caso de dúvida.',
    },
    {
      question: 'E os dados das pacientes, como ficam?',
      answer:
        'A automação pede só o que serve para agendar: nome, contato, convênio e horário. Dados de saúde são sensíveis pela LGPD, então sintomas e exames não passam por ela nem pelos formulários do site.',
    },
    {
      question: 'Funciona com o WhatsApp que a recepção já usa?',
      answer:
        'Sim, com o WhatsApp Business do consultório, no mesmo número. A mensagem automática faz o primeiro contato, e a recepção segue a conversa como faz hoje.',
    },
  ],
  closing: {
    title: 'Menos mensagens soltas, mais tempo de consulta.',
    body: 'Conte como a sua recepção agenda hoje. A gente desenha junto um site e uma primeira resposta que respeitam a privacidade das suas pacientes.',
  },
  queries: [
    'ginecologia',
    'ginecologista',
    'consultório de ginecologia',
    'clínica ginecológica',
    'ginecologia e obstetrícia',
    'saúde da mulher',
    'preventivo',
    'agendar consulta ginecológica',
    'site para ginecologista',
    'whatsapp para consultório médico',
  ],
  source: {
    label: 'CFM · Publicidade médica (Resolução CFM 2.336/2023)',
    url: 'https://publicidademedica.cfm.org.br/',
  },
};
