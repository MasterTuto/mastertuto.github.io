import type { Industry } from './industry.model';

export const advogado: Industry = {
  slug: 'advogado',
  name: 'Advocacia',
  title: 'Primeiro contato claro, dentro das regras.',
  intro:
    'Um site informativo e uma resposta automática que organizam quem chega, separam clientes de novos contatos e deixam a análise do caso com você.',
  images: {
    hero: {
      src: 'assets/images/segments/advogado/hero.svg',
      alt: 'Advogada em sua mesa de trabalho com notebook e pastas, estante de livros e janela ao fundo',
    },
    routine: {
      src: 'assets/images/segments/advogado/routine.svg',
      alt: 'Celular cheio de mensagens de áudio e de texto ao lado de uma pilha de pastas de processos',
    },
    closing: {
      src: 'assets/images/segments/advogado/closing.svg',
      alt: 'Advogado e cliente conversando em uma mesa de reunião organizada, com pasta, agenda e notebook',
    },
  },
  routine: {
    quote:
      'Boa noite doutora, desculpa o horário, é rapidinho: meu ex parou de pagar a pensão, posso não deixar ele ver as crianças? Te mandei um áudio explicando',
    context: 'Mensagem típica no WhatsApp de uma advogada de família, num domingo às 21h',
    body: 'Responder ali é dar parecer sem documentos, sem contrato e sem conhecer o caso. Não responder parece descaso. A mensagem fica aberta até segunda, junto com outros áudios longos de gente que você nunca atendeu.',
  },
  problems: [
    {
      title: 'Consulta pelo WhatsApp',
      today:
        'Alguém manda um áudio longo contando o caso e pergunta se tem direito. Responder é dar parecer sem documentos; ignorar parece descaso.',
      change:
        'A resposta automática explica que a análise acontece em reunião e pergunta a área e o melhor horário. Você retoma a conversa já sabendo do que se trata.',
    },
    {
      title: 'Cliente cobrando andamento',
      today:
        'Clientes com processo em curso escrevem toda semana perguntando se tem novidade, no mesmo número que recebe novos contatos. Você para o que está fazendo para dizer que o processo aguarda o juiz.',
      change:
        'A primeira mensagem separa quem já é cliente de quem está chegando. Uma página do site explica as fases do processo e por que há períodos sem movimentação.',
    },
    {
      title: 'Golpe do falso advogado',
      today:
        'Golpistas usam sua foto e o número do processo para pedir PIX de “custas” aos seus clientes. Alguns ligam para conferir, outros pagam.',
      change:
        'O site lista seus canais oficiais e sua inscrição na OAB. A resposta automática lembra como o escritório faz cobranças, para o cliente conferir antes de pagar.',
    },
  ],
  contrast: [
    {
      today: 'Chegam pedidos de áreas que você não atende, e você explica caso a caso.',
      withSite: 'A página de áreas de atuação e a pergunta inicial indicam o assunto antes da conversa.',
    },
    {
      today: 'Você manda a mesma lista de documentos antes de cada reunião.',
      withSite: 'A lista do que levar fica numa página e segue junto com o lembrete.',
    },
    {
      today: 'O cliente esquece a reunião ou perde o link da videochamada.',
      withSite: 'Um lembrete automático chega na véspera, com endereço ou link.',
    },
    {
      today: 'Quem procura seu nome no Google encontra um perfil antigo, sem horário.',
      withSite: 'Perfil no Google e site com endereço, horário, áreas de atuação e inscrição na OAB.',
    },
  ],
  chat: {
    title: 'Acolher sem dar parecer',
    body: 'A resposta automática recebe a pessoa a qualquer hora, sem opinar sobre o caso. Ela pergunta o essencial e entrega a conversa para você decidir o próximo passo.',
    lines: [
      {
        from: 'client',
        text: 'Oi, fui demitido ontem e não pagaram minha rescisão. Tenho direito a quê?',
      },
      {
        from: 'reply',
        text: 'Olá, aqui é o atendimento automático do escritório. A análise de cada caso é feita pelo advogado, em reunião. Você já é cliente ou este é o primeiro contato?',
      },
      {
        from: 'client',
        text: 'Primeiro contato.',
      },
      {
        from: 'reply',
        text: 'Certo. O assunto é trabalhista, família, consumidor ou outro? E qual o melhor horário para retornarmos?',
      },
      {
        from: 'client',
        text: 'Trabalhista. De manhã, pode ser.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Repassei ao advogado responsável, que retorna pessoalmente no próximo dia útil.',
      },
    ],
  },
  steps: [
    {
      title: 'Assunto e contato',
      text: 'A pessoa informa a área do assunto e como prefere ser contatada, pelo site ou pelo WhatsApp.',
    },
    {
      title: 'Leitura por você',
      text: 'Você lê o resumo e decide se o caso é da sua área ou se indica um colega.',
    },
    {
      title: 'Reunião agendada',
      text: 'A pessoa escolhe um horário livre na sua agenda e recebe a lista do que levar.',
    },
    {
      title: 'Lembrete e atendimento',
      text: 'Na véspera chega o lembrete com endereço ou link, e a conversa jurídica acontece com você.',
    },
  ],
  faq: [
    {
      question: 'Isso respeita o Provimento 205/2021 da OAB?',
      answer:
        'O site é informativo: áreas de atuação, trajetória, inscrição e contato, sem promessa de resultado, valores ou casos concretos. A resposta automática só coleta dados, como o provimento admite para chatbots. O texto final é revisado e aprovado por você.',
    },
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer:
        'Sim. No WhatsApp Business dá para configurar saudação, mensagem de ausência e respostas rápidas no seu próprio número. Fluxos com mais etapas usam a API oficial do WhatsApp, que tem custo próprio, e isso fica claro antes de começar.',
    },
    {
      question: 'E o sigilo do que o cliente conta?',
      answer:
        'O formulário pede só o assunto geral e o contato, não os detalhes do caso. As mensagens chegam ao seu e-mail ou WhatsApp, não ficam públicas, e o site traz um aviso de privacidade conforme a LGPD.',
    },
  ],
  closing: {
    title: 'Menos triagem no celular, mais tempo para os casos.',
    body: 'Me conte como chegam seus contatos hoje e quais áreas você atende. Desenhamos juntos um primeiro atendimento que respeita as regras da OAB.',
  },
  queries: [
    'advogado',
    'advogada',
    'advocacia',
    'escritório de advocacia',
    'site para advogado',
    'site para escritório de advocacia',
    'whatsapp para advogado',
    'atendimento jurídico',
    'oab',
    'direito',
  ],
  source: {
    label: 'OAB · Provimento 205/2021 (publicidade na advocacia)',
    url: 'https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021',
  },
};
