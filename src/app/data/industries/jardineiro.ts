import type { Industry } from './industry.model';

export const jardineiro: Industry = {
  slug: 'jardineiro',
  name: 'Jardinagem',
  title: 'Pedido com foto, visita no calendário.',
  intro:
    'Uma página com seus serviços e bairros, e uma primeira resposta que pede fotos e tamanho do espaço. Os clientes mensais recebem lembrete antes de cada visita.',
  images: {
    hero: {
      src: 'assets/images/segments/jardineiro/hero.svg',
      alt: 'Jardineiro de chapéu passando a roçadeira no gramado, entre uma árvore, arbustos redondos e um carrinho de mão cheio de galhos',
    },
    routine: {
      src: 'assets/images/segments/jardineiro/routine.svg',
      alt: 'Celular cheio de mensagens, uma delas com o espaço da foto vazio, ao lado de um calendário com dias riscados sob uma nuvem de chuva e de uma tesoura de poda',
    },
    closing: {
      src: 'assets/images/segments/jardineiro/closing.svg',
      alt: 'Jardineiro e cliente conversando no portão de um jardim aparado, com gramado, arbustos redondos e uma árvore',
    },
  },
  routine: {
    quote: 'oi boa noite, quanto vc cobra pra limpar um quintal? ta cheio de mato',
    context: 'Mensagem no WhatsApp de um jardineiro autônomo, num domingo às 21h, sem foto, sem medida e sem bairro.',
    body: 'Quintal pode ser um canto de grama ou um terreno com mato alto e galho para levar embora. Você pergunta tudo no dia seguinte, entre uma roçada e outra, ou vai até lá só para olhar. Às vezes o cliente queria apenas um número para comparar.',
  },
  problems: [
    {
      title: 'Quintal sem medida',
      today:
        'Chega "quanto pra limpar o quintal?" sem foto, sem tamanho e sem dizer se tem galho ou entulho para tirar. Você troca várias mensagens ou atravessa o bairro só para olhar.',
      change:
        'A primeira resposta pede bairro, tamanho aproximado e fotos do espaço inteiro. Você vê o mato, o acesso e o que vai sobrar antes de decidir se precisa ir.',
    },
    {
      title: 'Chuva bagunça a semana',
      today:
        'Choveu na terça e as visitas do dia caíram. Você avisa cliente por cliente e tenta encaixar todo mundo na quarta, que já estava cheia.',
      change:
        'As visitas mensais ficam num calendário. Você muda o dia e o cliente recebe a nova data por mensagem, com lembrete na véspera.',
    },
    {
      title: 'Síndico pede proposta',
      today:
        'O condomínio quer saber a frequência, o que está incluído e quem você já atende. Você explica por áudio e perde para uma empresa que mandou tudo por escrito.',
      change:
        'O site mostra fotos de jardins que você cuida e o que entra na manutenção mensal. O síndico pede a proposta já informando a área e a frequência que quer.',
    },
  ],
  contrast: [
    {
      today: 'O cliente esquece o dia e você encontra o portão fechado.',
      withSite: 'O cliente recebe lembrete na véspera e confirma se vai ter alguém para abrir.',
    },
    {
      today: 'Quem leva os galhos e a grama cortada só se discute no fim do serviço.',
      withSite: 'A página diz se a retirada dos resíduos está incluída ou é cobrada à parte.',
    },
    {
      today: 'Pedem para tirar uma árvore inteira como se fosse uma poda simples.',
      withSite: 'A página avisa que remoção de árvore pode depender de autorização da prefeitura.',
    },
    {
      today: 'Seu trabalho só aparece no status do WhatsApp, e some no dia seguinte.',
      withSite: 'As fotos dos jardins que você cuida ficam numa página que você pode enviar.',
    },
  ],
  chat: {
    title: 'Uma resposta que pergunta, não receita',
    body: 'A resposta automática pede bairro, tamanho do espaço e fotos. Ela não indica produto, não diz se a árvore pode ser cortada e não passa preço.',
    lines: [
      {
        from: 'client',
        text: 'Oi! Quero tirar uma árvore que tá levantando o muro e passar um veneno no mato do quintal. Quanto fica?',
      },
      {
        from: 'reply',
        text: 'Olá! Recebemos seu pedido. Corte de árvore pode depender de autorização da prefeitura, e o uso de qualquer produto é avaliado pelo jardineiro. Qual é o seu bairro?',
      },
      {
        from: 'client',
        text: 'Vila Mariana. É casa, o quintal tem uns 40 m².',
      },
      {
        from: 'reply',
        text: 'Obrigado. Pode mandar uma foto da árvore com o muro e outra do quintal inteiro?',
      },
      {
        from: 'client',
        text: 'Mandei as duas.',
      },
      {
        from: 'reply',
        text: 'Recebidas. O jardineiro responde amanhã até as 9h para combinar a visita.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido com fotos',
      text: 'O cliente envia pelo site ou WhatsApp o bairro, o tamanho aproximado e fotos do espaço.',
    },
    {
      title: 'Visita ou estimativa',
      text: 'Pelas fotos, você vê o mato, o acesso e os resíduos, e decide se precisa ir ao local antes de orçar.',
    },
    {
      title: 'Serviço no calendário',
      text: 'A limpeza avulsa ou a manutenção mensal entra no calendário, com lembrete ao cliente na véspera.',
    },
    {
      title: 'Fotos e avaliação',
      text: 'Depois do serviço, você envia fotos do resultado e o cliente novo recebe um pedido de avaliação no Google.',
    },
  ],
  faq: [
    {
      question: 'Preciso colocar meus preços no site?',
      answer:
        'Não. A página pode mostrar só o que entra em cada serviço e como funciona a visita. O valor continua saindo de você, depois de ver o jardim.',
    },
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer:
        'Sim. O site leva para o seu número de sempre. A primeira resposta sai pelo WhatsApp Business ou por um formulário curto no site, e você assume a conversa quando quiser.',
    },
    {
      question: 'Quanto custa manter depois de pronto?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Trocar fotos, bairros ou serviços você pede quando precisar, com o valor combinado antes, por escrito.',
    },
  ],
  closing: {
    title: 'Mais tempo no jardim, menos no celular.',
    body: 'Me conte como os pedidos chegam hoje, como você organiza os clientes mensais e quais bairros atende. A gente vê junto o que vale automatizar.',
  },
  queries: [
    'jardineiro',
    'jardineira',
    'jardinagem',
    'manutenção de jardim',
    'jardinagem para condomínio',
    'paisagista',
    'corte de grama',
    'roçada',
    'poda de arbustos',
    'site para jardineiro',
  ],
  source: {
    label: 'Câmara Municipal de São Paulo · Lei 17.267/2020 (corte e poda de árvores)',
    url: 'https://www.saopaulo.sp.leg.br/blog/lei-de-corte-e-poda-de-arvores-em-sao-paulo-e-sancionada/',
  },
};
