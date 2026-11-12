import type { Industry } from './industry.model';

export const banhoETosa: Industry = {
  slug: 'banho-e-tosa',
  name: 'Banho e tosa',
  title: 'Conheça o pet antes de marcar.',
  intro:
    'Uma página com seus serviços e condições, e uma primeira resposta que pergunta porte, pelagem e vacinas. Você passa o valor sabendo qual pet vem.',
  images: {
    hero: {
      src: 'assets/images/segments/banho-e-tosa/hero.svg',
      alt: 'Tosadora de avental secando com soprador um cachorro de pelo longo sobre a mesa de tosa, com a banheira e uma prateleira de frascos ao fundo',
    },
    routine: {
      src: 'assets/images/segments/banho-e-tosa/routine.svg',
      alt: 'Celular cheio de mensagens, uma delas com o espaço da foto vazio, ao lado de uma escova de tosa, um tufo de pelo embolado e uma coleira',
    },
    closing: {
      src: 'assets/images/segments/banho-e-tosa/closing.svg',
      alt: 'Tosadora entrega pela guia um cachorro de bandana, já de banho tomado, à tutora, com uma caixa de transporte ao lado',
    },
  },
  routine: {
    quote: 'oi, quanto tá o banho? tem horário sábado de manhã?',
    context:
      'Mensagem no WhatsApp de um banho e tosa de bairro, numa quinta às 21h, sem raça, porte nem pelagem.',
    body: 'Você responde com o preço do porte pequeno e marca. No sábado chega um cachorro grande com o pelo cheio de nós, que toma o dobro do tempo. A conversa sobre o desembolo acontece no balcão, com outro tutor esperando.',
  },
  problems: [
    {
      title: 'Preço sem ver o pet',
      today:
        'Pedem "quanto é o banho?" sem dizer raça, porte ou como está o pelo. O valor que você passou não cobre o desembolo, e o tutor se sente enganado na retirada.',
      change:
        'A primeira resposta pergunta raça, porte, última tosa e pede uma foto da pelagem. O site explica que porte e nós mudam tempo e valor, antes de marcar.',
    },
    {
      title: 'Horário vazio no sábado',
      today:
        'Você segurou duas horas para um pet grande e o tutor não apareceu nem respondeu. No mesmo horário, você recusou outro cliente.',
      change:
        'Na véspera, o tutor recebe um lembrete para confirmar ou remarcar. Se ele desmarca, você fica sabendo a tempo de oferecer o horário a outra pessoa.',
    },
    {
      title: '"Já tá pronto?"',
      today:
        'Com o soprador ligado, o celular não para: tutor perguntando se já pode buscar e endereço do leva e traz mandado por áudio.',
      change:
        'O endereço e a janela de busca ficam registrados no agendamento. Quando o pet fica pronto, o tutor recebe o aviso de retirada.',
    },
  ],
  contrast: [
    {
      today: 'A carteira de vacinação é pedida no balcão, com o pet já na sua mão.',
      withSite: 'As vacinas que você exige aparecem no site e a foto da carteira chega antes.',
    },
    {
      today: 'Você descobre na mesa de tosa que o cachorro morde ou tem medo do soprador.',
      withSite: 'O tutor conta o temperamento no agendamento, e você reserva o tempo certo.',
    },
    {
      today: 'O tutor pergunta por mensagem se a ferida na pele é alergia.',
      withSite: 'A resposta diz que questões de saúde são com o médico-veterinário.',
    },
    {
      today: 'O próximo banho depende de o tutor lembrar de chamar.',
      withSite: 'Ele recebe um lembrete no intervalo que combinou com você.',
    },
  ],
  chat: {
    title: 'Uma resposta que pergunta, não avalia',
    body: 'A resposta automática coleta o que você precisa para dar o valor: porte, pelagem, foto e vacinas. Ela não fala sobre saúde do pet e não passa preço final.',
    lines: [
      {
        from: 'client',
        text: 'Oi, quanto fica banho e tosa no meu shih tzu? Ele tá com uns nós e coçando muito a orelha, será que é alergia?',
      },
      {
        from: 'reply',
        text: 'Oi! Recebemos sua mensagem. Sobre a coceira, quem avalia é o médico-veterinário, então não orientamos sobre saúde por aqui. Qual a idade dele e quando foi a última tosa?',
      },
      {
        from: 'client',
        text: '4 anos, a última foi faz uns 3 meses.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Pode mandar uma foto da pelagem, mostrando os nós, e outra da carteira de vacinação?',
      },
      {
        from: 'client',
        text: 'Mandei as duas.',
      },
      {
        from: 'reply',
        text: 'Recebidas. A tosadora responde hoje até as 18h com o valor, que depende do desembolo, e os horários livres.',
      },
    ],
  },
  steps: [
    {
      title: 'Perfil do pet',
      text: 'O tutor informa raça, porte, temperamento e envia fotos da pelagem e da carteira de vacinação.',
    },
    {
      title: 'Valor e horário',
      text: 'Você passa o valor e reserva o tempo que aquele pet pede, com leva e traz se for o caso.',
    },
    {
      title: 'Confirmação na véspera',
      text: 'O tutor confirma ou remarca, e o endereço de busca fica por escrito.',
    },
    {
      title: 'Retirada e próximo banho',
      text: 'O tutor recebe o aviso de que o pet está pronto e, depois, o lembrete do próximo banho.',
    },
  ],
  faq: [
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer:
        'Sim. O site leva para o seu número de sempre. A primeira resposta e as perguntas sobre o pet saem pelo WhatsApp Business ou por um formulário curto, e você assume a conversa quando quiser.',
    },
    {
      question: 'E quando o tutor pergunta sobre a saúde do pet?',
      answer:
        'A resposta automática não orienta: diz que questões de saúde são com o médico-veterinário, como prevê o CFMV. Se você trabalha com um veterinário, o site pode indicar o contato dele.',
    },
    {
      question: 'Quanto custa manter depois de pronto?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Mudanças na tabela, nos serviços ou nas regras de vacina você pede quando precisar, e o valor a gente combina antes, por escrito.',
    },
  ],
  closing: {
    title: 'Saiba qual pet vem antes de ele chegar.',
    body: 'Me conte como os agendamentos chegam hoje e como funciona seu leva e traz. A gente vê junto o que vale automatizar e o que fica com você.',
  },
  queries: [
    'banho e tosa',
    'pet shop',
    'petshop',
    'tosador',
    'tosadora',
    'groomer',
    'estética animal',
    'taxi dog',
    'site para pet shop',
    'agendamento de banho e tosa',
  ],
  source: {
    label: 'CFMV · Resolução nº 878/2008 (serviços de estética, banho e tosa)',
    url: 'https://manual.cfmv.gov.br/arquivos/resolucao/878.pdf',
  },
};
