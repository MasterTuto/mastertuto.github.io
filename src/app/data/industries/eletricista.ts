import type { Industry } from './industry.model';

export const eletricista: Industry = {
  slug: 'eletricista',
  name: 'Eletricistas',
  title: 'Veja o serviço antes da visita.',
  intro:
    'Uma página com seus serviços e bairros, e uma primeira resposta que pede fotos e detalhes. Você decide a visita com o pedido em mãos.',
  images: {
    hero: {
      src: 'assets/images/segments/eletricista/hero.svg',
      alt: 'Eletricista de capacete e luvas trabalhando num quadro de disjuntores aberto, com a escada e a caixa de ferramentas ao lado',
    },
    routine: {
      src: 'assets/images/segments/eletricista/routine.svg',
      alt: 'Celular à noite cheio de mensagens, uma delas com o espaço da foto vazio, ao lado de um rolo de fio, uma tomada solta e um alicate',
    },
    closing: {
      src: 'assets/images/segments/eletricista/closing.svg',
      alt: 'Eletricista com caixa de ferramentas cumprimenta o cliente sob uma luminária acesa, ao lado de um quadro de disjuntores fechado',
    },
  },
  routine: {
    quote: 'boa noite, quanto vc cobra pra trocar uma tomada? é rapidinho',
    context: 'Mensagem no WhatsApp de um eletricista autônomo, às 22h40 de uma terça, sem foto e sem bairro.',
    body: 'Você responde no dia seguinte com quatro perguntas, entre um serviço e outro. Quando chega lá, a "tomada" é um ponto novo com fio passando pela parede. Ou o cliente já fechou com outro.',
  },
  problems: [
    {
      title: 'Pedido sem foto',
      today:
        'Chega "quanto custa um chuveiro?" sem foto, sem bairro e sem dizer se é troca ou ponto novo. Você gasta várias mensagens só para entender o pedido.',
      change:
        'A primeira resposta pergunta bairro, tipo de imóvel e pede fotos. Você abre a conversa com o básico já na tela.',
    },
    {
      title: 'Visita que não fecha',
      today:
        'Você atravessa a cidade para orçar e descobre que era uma tomada só. Ou que o cliente queria apenas comparar preço.',
      change:
        'O site diz quais bairros você atende e se a visita é cobrada, antes de marcar. Com as fotos, você decide se precisa ir.',
    },
    {
      title: 'Celular tocando no serviço',
      today:
        'Você está com as mãos no quadro quando chegam três pedidos. Responde à noite, e um deles já chamou outro eletricista.',
      change:
        'Cada pedido recebe resposta na hora, com o prazo em que você vai retornar. Você termina o serviço com a atenção no que está fazendo.',
    },
  ],
  contrast: [
    {
      today: 'O cliente acha seu número num grupo do bairro e não sabe o que você faz.',
      withSite: 'Uma página lista seus serviços, bairros e horários.',
    },
    {
      today: 'Seu preço é comparado com o de quem não tem formação.',
      withSite: 'A página mostra sua formação e fotos de serviços que você fez.',
    },
    {
      today: 'Endereço e horário combinados por áudio se perdem na conversa.',
      withSite: 'A visita fica confirmada por escrito, com lembrete no dia anterior.',
    },
    {
      today: 'A taxa de visita só é explicada na porta do cliente.',
      withSite: 'A condição da visita aparece antes do agendamento.',
    },
  ],
  chat: {
    title: 'Uma resposta que coleta, não orienta',
    body: 'A resposta automática pede o que você perguntaria: bairro, tipo de imóvel e fotos. Ela não dá diagnóstico, não ensina o cliente a mexer na instalação e não passa preço.',
    lines: [
      {
        from: 'client',
        text: 'Boa noite, o chuveiro parou de esquentar e o disjuntor desarma. Dá pra eu mesmo trocar a resistência?',
      },
      {
        from: 'reply',
        text: 'Boa noite! Recebemos seu pedido. Por segurança, não damos orientação técnica por mensagem: quem avalia é o eletricista. Qual é o seu bairro?',
      },
      {
        from: 'client',
        text: 'Jardim América. É casa.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Pode mandar uma foto do chuveiro e outra do quadro de disjuntores?',
      },
      {
        from: 'client',
        text: 'Mandei as duas.',
      },
      {
        from: 'reply',
        text: 'Recebidas. O eletricista responde amanhã até as 9h com o horário possível e a condição da visita.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido com fotos',
      text: 'O cliente envia pelo site ou WhatsApp o bairro, o tipo de imóvel e fotos do que precisa.',
    },
    {
      title: 'Você avalia',
      text: 'Com as fotos, você decide se já dá para passar uma estimativa ou se precisa ver no local.',
    },
    {
      title: 'Visita marcada',
      text: 'Endereço, horário e condição da visita ficam por escrito, com lembrete no dia anterior.',
    },
    {
      title: 'Serviço e avaliação',
      text: 'Depois do serviço, o cliente recebe uma mensagem pedindo avaliação no seu perfil do Google.',
    },
  ],
  faq: [
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer:
        'Sim. O site leva para o seu número de sempre. A primeira resposta e as perguntas iniciais saem pelo WhatsApp Business ou por um formulário curto no site, e você assume a conversa quando quiser.',
    },
    {
      question: 'A resposta automática pode passar preço ou orientar o cliente?',
      answer:
        'Não. Ela só coleta bairro, serviço e fotos. Diagnóstico, orientação de segurança e valor ficam com você, que é quem vê a instalação.',
    },
    {
      question: 'Quanto custa manter depois de pronto?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Mudanças de bairros, serviços ou fotos você pede quando precisar, e o valor a gente combina antes, por escrito.',
    },
  ],
  closing: {
    title: 'Atenda sem largar o serviço.',
    body: 'Me conte como os pedidos chegam hoje e quais bairros você atende. A gente vê junto o que vale automatizar e o que fica com você.',
  },
  queries: [
    'eletricista',
    'eletricista autônomo',
    'eletricista residencial',
    'eletricista predial',
    'site para eletricista',
    'empresa de instalação elétrica',
    'manutenção elétrica',
    'instalação elétrica',
    'orçamento de eletricista',
    'quadro elétrico',
  ],
  source: {
    label: 'MTE · NR-10 (segurança em instalações e serviços em eletricidade)',
    url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-10-nr-10',
  },
};
