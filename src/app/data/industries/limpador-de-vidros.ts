import { Industry } from './industry.model';

export const limpadorDeVidros: Industry = {
  slug: 'limpador-de-vidros',
  name: 'Limpeza de vidros',
  title: 'Saiba a altura antes do orçamento.',
  intro:
    'Uma página com o que você limpa e onde atende, e uma primeira resposta que pede andar, quantidade e fotos. Você orça sabendo onde vai trabalhar.',
  images: {
    hero: {
      src: 'assets/images/segments/limpador-de-vidros/hero.svg',
      alt: 'Limpador de vidros de capacete passa o rodo com cabo extensor na vitrine de uma loja, com um balde e um borrifador no chão',
    },
    routine: {
      src: 'assets/images/segments/limpador-de-vidros/routine.svg',
      alt: 'Celular cheio de mensagens, uma delas com o espaço da foto vazio, diante de um prédio alto sob uma nuvem de chuva, com um rodo e um balde ao lado',
    },
    closing: {
      src: 'assets/images/segments/limpador-de-vidros/closing.svg',
      alt: 'Limpador de vidros com balde cumprimenta a cliente ao lado de uma janela grande limpa e com reflexos',
    },
  },
  routine: {
    quote: 'oi, quanto vc cobra pra limpar as janelas? é só passar um pano por fora',
    context: 'Mensagem no WhatsApp de um limpador de vidros autônomo, num domingo à noite, sem andar e sem foto.',
    body: 'Na segunda você pergunta o andar, quantos vidros e como a janela abre. Só então descobre que "por fora" é a face externa de um apartamento no 11º andar, que pede equipamento, ancoragem e autorização do condomínio. Enquanto isso, o cliente pediu preço para mais três.',
  },
  problems: [
    {
      title: 'Pedido sem andar',
      today:
        'Chega "quanto pra limpar as janelas?" sem andar, sem quantidade e sem dizer se o lado de fora se alcança por dentro. Você troca várias mensagens antes de saber o tamanho do serviço.',
      change:
        'A primeira resposta pergunta bairro, tipo de imóvel, andar e quantidade de vidros, e pede fotos de como as janelas abrem. Você lê o pedido com isso já na tela.',
    },
    {
      title: 'Chuva desmarca o dia',
      today:
        'Com chuva ou vento forte, trabalho em altura para. Você liga para cada cliente do dia e remarca um por um, no meio de outro serviço.',
      change:
        'Os horários ficam numa agenda online. Num dia de chuva, você manda um aviso aos clientes do dia com um link para escolher outra data.',
    },
    {
      title: 'Síndico pede documentos',
      today:
        'Antes de fechar uma fachada, o síndico quer saber da sua capacitação NR-35, do seguro e de como você vai trabalhar. Você explica tudo de novo a cada condomínio.',
      change:
        'Uma página para condomínios explica como você trabalha em altura, quais documentos apresenta e quando faz vistoria. O síndico já chega sabendo o que pedir.',
    },
  ],
  contrast: [
    {
      today: 'O cliente não sabe se você atende apartamento, loja ou fachada.',
      withSite: 'O site separa residências, vitrines e condomínios, com a região que você atende.',
    },
    {
      today: 'A loja que limpava a vitrine todo mês esquece de chamar.',
      withSite: 'Clientes fixos recebem um lembrete perto da data combinada.',
    },
    {
      today: 'Seu preço é comparado com o de quem sobe sem equipamento.',
      withSite: 'A página mostra seus equipamentos e quando o serviço exige vistoria.',
    },
    {
      today: 'A foto do vidro limpo fica só no seu celular.',
      withSite: 'Fotos de serviços feitos vão para o site, e o cliente recebe um pedido de avaliação no Google.',
    },
  ],
  chat: {
    title: 'Primeiro o andar, depois o preço',
    body: 'A resposta automática pede o que você perguntaria: bairro, andar, quantidade de vidros e fotos de como as janelas abrem. Ela não passa preço e não orienta o cliente a limpar sozinho pelo lado de fora.',
    lines: [
      {
        from: 'client',
        text: 'Oi! Quanto fica pra limpar os vidros do meu apê? É no 9º andar e a sacada é toda fechada com vidro.',
      },
      {
        from: 'reply',
        text: 'Olá! Recebemos seu pedido. O valor é passado pelo profissional depois de ver o serviço. Qual é o seu bairro e quantas janelas são, mais ou menos?',
      },
      {
        from: 'client',
        text: 'Vila Mariana. Umas cinco janelas e a sacada.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Pode mandar fotos das janelas e da sacada, mostrando como elas abrem?',
      },
      {
        from: 'client',
        text: 'Mandei.',
      },
      {
        from: 'reply',
        text: 'Recebidas. O profissional responde hoje até as 18h. Se for preciso trabalhar pelo lado de fora do prédio, ele explica também o que o condomínio precisa autorizar.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido com fotos',
      text: 'O cliente informa bairro, tipo de imóvel, andar e quantidade de vidros, e envia fotos.',
    },
    {
      title: 'Você avalia',
      text: 'Com as fotos, você decide se já dá para orçar ou se o acesso em altura pede vistoria no local.',
    },
    {
      title: 'Data confirmada',
      text: 'Endereço e horário ficam por escrito, com lembrete na véspera e remarcação por link se chover.',
    },
    {
      title: 'Próxima limpeza',
      text: 'Lojas e condomínios fixos recebem um lembrete quando a próxima limpeza se aproxima.',
    },
  ],
  faq: [
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer:
        'Sim. O site leva para o seu número de sempre. A primeira resposta sai pelo WhatsApp Business ou por um formulário curto no site, e você assume a conversa quando quiser.',
    },
    {
      question: 'O que o site diz sobre trabalho em altura?',
      answer:
        'Só o que você faz e comprova: capacitação NR-35 em dia, equipamentos, seguro se tiver e os serviços que você não pega. Nada de "qualquer altura". A avaliação de cada caso continua com você.',
    },
    {
      question: 'Quanto custa manter depois de pronto?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Mudanças de região, serviços ou fotos você pede quando precisar, e o valor a gente combina antes, por escrito.',
    },
  ],
  closing: {
    title: 'Mais tempo no vidro, menos no celular.',
    body: 'Me conte como os pedidos chegam hoje e se você atende lojas e condomínios fixos. A gente vê junto o que vale automatizar e o que fica com você.',
  },
  queries: [
    'limpeza de vidros',
    'limpador de vidros',
    'limpeza de janelas',
    'limpeza de vitrine',
    'limpeza de fachada de vidro',
    'limpeza de vidros em altura',
    'limpeza de vidros para condomínio',
    'lavar janela de apartamento',
    'site para limpeza de vidros',
  ],
  source: {
    label: 'MTE · NR-35 (trabalho em altura)',
    url: 'https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/participacao-social/conselhos-e-orgaos-colegiados/comissao-tripartite-partitaria-permanente/normas-regulamentadora/normas-regulamentadoras-vigentes/norma-regulamentadora-no-35-nr-35',
  },
};
