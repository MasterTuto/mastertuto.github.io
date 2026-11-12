import type { Industry } from './industry.model';

export const pintor: Industry = {
  slug: 'pintor',
  name: 'Pintura',
  title: 'Veja a parede antes do orçamento.',
  intro:
    'Uma página com seus serviços e sua região, e uma primeira resposta que pede fotos e o estado das paredes. Você chega na visita sabendo o que vai medir.',
  images: {
    hero: {
      src: 'assets/images/segments/pintor/hero.svg',
      alt: 'Pintor com rolo de cabo longo pintando uma parede de lilás, com escada, bandeja e lata de tinta sobre o piso protegido por lona',
    },
    routine: {
      src: 'assets/images/segments/pintor/routine.svg',
      alt: 'Celular cheio de mensagens sem foto diante de uma parede com mancha de mofo e tinta descascando, com um rolo e uma lata fechada no chão',
    },
    closing: {
      src: 'assets/images/segments/pintor/closing.svg',
      alt: 'Pintor mostrando uma cartela de cores à cliente numa sala com a parede recém-pintada, ao lado de um sofá e de uma planta, com lata e rolo guardados no canto',
    },
  },
  routine: {
    quote: 'boa tarde, quanto vc cobra o metro pra pintar um ap de 70m²? a tinta eu já comprei',
    context: 'Mensagem no WhatsApp de um pintor autônomo, num sábado de manhã, sem foto e sem dizer quais cômodos.',
    body: 'Os 70 m² são de piso, não de parede, e você não sabe se tem teto, massa a corrigir ou mofo. Se chuta um valor, ele vira compromisso. Se pede para ir ver, o cliente compara com quem mandou um número na hora.',
  },
  problems: [
    {
      title: 'Metragem de piso',
      today:
        'O cliente passa a área do imóvel e pede o preço do metro. A área de parede e teto é outra, e você só descobre medindo.',
      change:
        'A primeira resposta pergunta quais ambientes, se entra teto e pede uma foto de cada um. Você tem uma ideia do tamanho do serviço antes de marcar a visita.',
    },
    {
      title: 'Mofo só na visita',
      today:
        'Você chega e a parede do quarto tem mofo e reboco soltando. O cliente queria só passar uma tinta por cima, e a conversa sobre umidade começa ali.',
      change:
        'A primeira resposta pede foto de perto de manchas, bolhas e descascados. Seu site explica que parede úmida precisa ser resolvida antes de pintar.',
    },
    {
      title: 'Orçamentos que não se comparam',
      today:
        'Seu preço parece alto porque o outro orçamento não tinha massa, teto nem proteção do piso. Você explica tudo de novo por áudio.',
      change:
        'Sua página mostra o que entra no seu serviço: preparação, demãos, proteção e limpeza. A proposta vai por escrito, separada por ambiente.',
    },
  ],
  contrast: [
    {
      today: 'As fotos das suas obras ficam no status e somem em um dia.',
      withSite: 'Uma galeria mostra seus serviços por tipo: interno, fachada, textura, comercial.',
    },
    {
      today: 'O cliente não sabe se você trabalha com material ou só mão de obra.',
      withSite: 'A página explica as duas formas e o que o cliente precisa providenciar.',
    },
    {
      today: 'Horário do condomínio e liberação na portaria combinados por áudio.',
      withSite: 'Data, horário e acesso ficam por escrito, com lembrete na véspera.',
    },
    {
      today: 'O cliente troca a cor com a primeira demão já na parede.',
      withSite: 'A cor e o código escolhidos são confirmados por mensagem antes de começar.',
    },
  ],
  chat: {
    title: 'Uma resposta que pergunta antes do preço',
    body: 'A resposta automática pede os ambientes, fotos das paredes e se o serviço é com material. Ela não passa valor por metro nem diz o que causou a mancha: isso fica com você, depois de ver.',
    lines: [
      {
        from: 'client',
        text: 'Oi, quanto vc cobra o metro pra pintar um apartamento de 70 m²?',
      },
      {
        from: 'reply',
        text: 'Oi! Recebemos sua mensagem. O valor depende da área de parede, do estado das superfícies e do material, por isso não passamos preço por aqui. Quais ambientes você quer pintar?',
      },
      {
        from: 'client',
        text: 'Sala, dois quartos e corredor. No quarto tem mofo perto da janela.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Pode mandar uma foto de cada ambiente e uma de perto da parede com mofo? E diga se prefere com material ou só mão de obra.',
      },
      {
        from: 'client',
        text: 'Mandei. Com material.',
      },
      {
        from: 'reply',
        text: 'Recebidas. O pintor vê as fotos e responde até amanhã às 18h para combinar a visita e medir no local.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido com fotos',
      text: 'O cliente manda pelo site ou WhatsApp os ambientes, o bairro e fotos das paredes, inclusive das manchas.',
    },
    {
      title: 'Visita para medir',
      text: 'A visita fica confirmada por escrito, e você mede e vê o estado das superfícies no local.',
    },
    {
      title: 'Proposta por ambiente',
      text: 'A proposta lista preparação, demãos, teto, material e prazo, e a cor escolhida fica registrada.',
    },
    {
      title: 'Serviço e avaliação',
      text: 'Com o serviço entregue, o cliente recebe uma mensagem pedindo avaliação no seu perfil do Google.',
    },
  ],
  faq: [
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer:
        'Sim. O site leva para o seu número de sempre. A primeira resposta sai pelo WhatsApp Business ou por um formulário curto no site, e você assume a conversa quando quiser.',
    },
    {
      question: 'Posso mostrar fotos das casas onde pintei?',
      answer:
        'Pode, com autorização do cliente. A gente escolhe fotos que mostram parede, recorte e textura, sem número da casa, rosto ou objetos pessoais.',
    },
    {
      question: 'Quanto custa manter depois de pronto?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Fotos novas e mudanças de serviço ou região você pede quando precisar, e o valor a gente combina antes, por escrito.',
    },
  ],
  closing: {
    title: 'Orce sabendo o que vai pintar.',
    body: 'Me conte como os pedidos chegam hoje e que tipo de serviço você faz. A gente vê junto o que vale automatizar e o que continua com você.',
  },
  queries: [
    'pintor',
    'pintora',
    'pintor de parede',
    'pintor residencial',
    'empresa de pintura',
    'pintura predial',
    'pintura de fachada',
    'site para pintor',
    'orçamento de pintura',
    'textura e grafiato',
  ],
  source: {
    label: 'ABRAFATI · Manual de aplicação e manutenção de tintas imobiliárias (ABNT NBR 13245)',
    url: 'https://abrafati.com.br/wp-content/uploads/2024/12/Manual-de-aplicacao-uso-limpeza-e-manutencao-de-Tintas-Imobiliarias-1.pdf',
  },
};
