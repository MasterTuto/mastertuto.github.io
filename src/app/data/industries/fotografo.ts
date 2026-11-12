import { Industry } from './industry.model';

export const fotografo: Industry = {
  slug: 'fotografo',
  name: 'Fotografia',
  title: 'Da reserva à galeria, tudo combinado.',
  intro:
    'Um portfólio separado por tipo de ensaio e uma primeira resposta que pergunta data, cidade e tipo de evento. Você responde já sabendo se a agenda permite.',
  images: {
    hero: {
      src: 'assets/images/segments/fotografo/hero.svg',
      alt: 'Fotógrafa com a câmera no rosto fotografando um casal de noivos sob um arco de folhas e flores, com uma luz de estúdio ao lado',
    },
    routine: {
      src: 'assets/images/segments/fotografo/routine.svg',
      alt: 'Celular à noite cheio de mensagens, ao lado de um calendário com o mesmo dia marcado por dois clientes e de uma câmera',
    },
    closing: {
      src: 'assets/images/segments/fotografo/closing.svg',
      alt: 'Fotógrafa mostra a galeria de fotos num notebook a um casal sentado à mesa, com um álbum e a câmera ao lado',
    },
  },
  routine: {
    quote: 'oi! vc tem disponível 14/06 do ano que vem? casamento em Atibaia, quanto fica o pacote completo?',
    context:
      'Mensagem no WhatsApp de uma fotógrafa de casamentos, num domingo às 23h, sem horário, número de convidados ou nome.',
    body: 'Você abre a agenda, vê que o sábado está livre e manda o PDF dos pacotes. A noiva diz que vai ver com o noivo e some. Três semanas depois, outro casal pede a mesma data, e você não sabe se ela ainda está segura.',
  },
  problems: [
    {
      title: 'Data segurada sem sinal',
      today:
        'O casal pede para você "segurar" o sábado enquanto decide. Outro casal pede a mesma data, e você fica sem saber a quem responder.',
      change:
        'O site e a primeira resposta explicam que a data só fica reservada com contrato assinado e sinal pago. Quem pergunta conhece a regra antes de pedir para segurar.',
    },
    {
      title: 'Já ficaram prontas?',
      today:
        'Duas semanas depois do ensaio, a família pergunta pelas fotos. Você para a edição para responder, e a mesma pergunta volta na semana seguinte.',
      change:
        'O prazo de entrega fica no contrato e no site. Uma mensagem avisa quando a seleção abre e quando a galeria é publicada, com o link.',
    },
    {
      title: 'Foto postada sem crédito',
      today:
        'O cliente posta a foto com filtro e corta sua assinatura. A loja usa a foto do produto num panfleto que não estava no combinado.',
      change:
        'Uma página explica, em linguagem simples, o que o cliente pode fazer com as fotos e como dar o crédito que a lei pede. O link vai junto com o contrato e a galeria.',
    },
  ],
  contrast: [
    {
      today: 'Seu Instagram mistura casamento, aniversário e produto no mesmo feed.',
      withSite: 'O portfólio separa casamentos, família e produtos, cada um com trabalhos completos.',
    },
    {
      today: 'O cliente só descobre na assinatura o que o pacote inclui.',
      withSite: 'Cada tipo de ensaio mostra duração, quantidade média de fotos e prazo de entrega.',
    },
    {
      today: 'A gestante procura depois do parto, quando a agenda do mês já fechou.',
      withSite: 'O formulário pede a data provável do parto, e você combina a janela do ensaio ainda na gestação.',
    },
    {
      today: 'Local, horário e roteiro do ensaio ficam espalhados em áudios.',
      withSite: 'O ensaio fica confirmado por escrito, com lembrete na véspera.',
    },
  ],
  chat: {
    title: 'Uma resposta que pergunta antes de orçar',
    body: 'A resposta automática pede o que você perguntaria primeiro: data, cidade, horário e o que o casal quer cobrir. Ela não confirma a data nem passa valor; isso fica com você, que vê a agenda.',
    lines: [
      {
        from: 'client',
        text: 'Oi! Vocês fotografam casamento dia 14 de junho? Quanto fica?',
      },
      {
        from: 'reply',
        text: 'Oi! Recebemos sua mensagem. Para a fotógrafa conferir a agenda, qual é a cidade e o horário da cerimônia?',
      },
      {
        from: 'client',
        text: 'Atibaia, às 16h. Uns 120 convidados.',
      },
      {
        from: 'reply',
        text: 'Obrigada. Vocês querem making of e álbum, ou só a cerimônia e a festa?',
      },
      {
        from: 'client',
        text: 'Making of também. Álbum ainda não sei.',
      },
      {
        from: 'reply',
        text: 'Anotado. A fotógrafa responde até amanhã às 12h com a disponibilidade e a proposta. A data só fica reservada com contrato e sinal.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido com a data',
      text: 'O cliente envia pelo site ou WhatsApp a data, a cidade e o tipo de ensaio ou evento.',
    },
    {
      title: 'Proposta e reserva',
      text: 'Você confere a agenda e manda a proposta; a data fica reservada com o contrato assinado e o sinal pago.',
    },
    {
      title: 'Lembrete e ensaio',
      text: 'Local, horário e roteiro ficam por escrito, com lembrete na véspera.',
    },
    {
      title: 'Seleção e galeria',
      text: 'O cliente é avisado quando a seleção abre e quando a galeria sai, junto com as regras de uso das fotos.',
    },
  ],
  faq: [
    {
      question: 'Funciona com meu WhatsApp e com a plataforma de galerias que eu já uso?',
      answer:
        'Sim. O site leva para o seu número de sempre, e os avisos de entrega apontam para o link da sua galeria, seja qual for o serviço. Eu não troco sua plataforma de entrega; organizo o caminho até ela.',
    },
    {
      question: 'Posso mostrar fotos de clientes no portfólio do site?',
      answer:
        'Pode, quando a pessoa fotografada autorizou o uso da imagem, de preferência por escrito no contrato. Em ensaios com crianças, quem autoriza são os responsáveis. Sem autorização, a foto fica fora do portfólio.',
    },
    {
      question: 'Quanto custa manter depois de pronto?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Trocas de fotos, pacotes ou datas bloqueadas você pede quando precisar, e o valor a gente combina antes, por escrito.',
    },
  ],
  closing: {
    title: 'Mais tempo para editar.',
    body: 'Me conte como os pedidos chegam hoje, que ensaios você faz e onde entrega as galerias. A gente vê junto o que vale automatizar e o que fica com você.',
  },
  queries: [
    'fotógrafo',
    'fotógrafa',
    'fotografia',
    'fotógrafo de casamento',
    'fotógrafo de eventos',
    'ensaio newborn',
    'ensaio de família',
    'fotografia de produto',
    'site para fotógrafo',
    'portfólio de fotografia',
  ],
  source: {
    label: 'Planalto · Lei 9.610/98, art. 79 (direitos autorais sobre a fotografia)',
    url: 'https://www.planalto.gov.br/ccivil_03/leis/l9610.htm',
  },
};
