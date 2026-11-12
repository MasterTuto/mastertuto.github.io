import type { Industry } from './industry.model';

export const pedreiro: Industry = {
  slug: 'pedreiro',
  name: 'Alvenaria e reformas',
  title: 'Escopo claro antes do primeiro tijolo.',
  intro:
    'Uma página com as obras que você faz e uma primeira resposta que pede medidas, fotos e bairro. Mudanças no meio da obra ficam registradas por escrito.',
  images: {
    hero: {
      src: 'assets/images/segments/pedreiro/hero.svg',
      alt: 'Pedreiro de capacete assentando um tijolo no alto de uma parede em construção, com nível sobre a parede, balde de massa, carrinho de mão e sacos de cimento ao redor',
    },
    routine: {
      src: 'assets/images/segments/pedreiro/routine.svg',
      alt: 'Celular cheio de mensagens, com áudios e dois espaços de foto vazios, ao lado de uma trena aberta, uma colher de pedreiro e um tijolo',
    },
    closing: {
      src: 'assets/images/segments/pedreiro/closing.svg',
      alt: 'Pedreiro e cliente diante de uma parede de azulejos terminada, olhando juntos a prancheta do orçamento, com a caixa de ferramentas no chão',
    },
  },
  routine: {
    quote: 'boa tarde, quanto vc cobra o metro pra colocar piso? é um banheiro pequeno',
    context:
      'Mensagem no WhatsApp de um pedreiro autônomo, num sábado à tarde, sem foto, sem medida e sem dizer se tem piso velho para tirar.',
    body: 'Você responde com perguntas: tamanho, casa ou apartamento, se precisa quebrar o piso antigo. Marca a visita, mede tudo e faz o orçamento à noite. Dois dias depois, o cliente fechou com quem passou preço sem ver o banheiro.',
  },
  problems: [
    {
      title: 'Preço sem medida',
      today:
        'Chega "quanto é o metro do piso?" sem foto e sem medida. Você vai até o local, mede e orça, e o cliente só queria comparar preço.',
      change:
        'A primeira resposta pede bairro, medidas aproximadas e fotos do local. Você decide se vale a visita com o pedido em mãos.',
    },
    {
      title: 'Obra que muda no meio',
      today:
        'No terceiro dia vem o "já que você está aqui, faz a churrasqueira também". Fica combinado por áudio, e no fim cada um lembra de um valor.',
      change:
        'Um link de pedido de mudança registra o que o cliente quer, com foto. Você responde com valor e prazo, e ele aprova por escrito antes de você começar.',
    },
    {
      title: 'Condomínio sem documentos',
      today:
        'Você chega para quebrar o piso e a portaria barra: falta o plano de reforma, ou a obra pede um engenheiro ou arquiteto que ninguém contratou. A semana estava reservada para essa obra.',
      change:
        'A primeira resposta pergunta se é apartamento e o que vai ser mexido. A página explica o que o condomínio costuma pedir, antes de marcar a data.',
    },
  ],
  contrast: [
    {
      today: 'As fotos das suas obras estão perdidas na galeria do celular.',
      withSite: 'Uma página mostra suas obras por tipo: banheiro, piso, muro, área externa.',
    },
    {
      today: 'O cliente não sabe se você pega só acabamento ou a obra toda.',
      withSite: 'A página diz o que você faz e o que você indica para outro profissional.',
    },
    {
      today: 'A data de início é combinada por áudio e o material não chega a tempo.',
      withSite: 'Início, material e liberação do condomínio ficam por escrito, com lembrete dias antes.',
    },
    {
      today: 'A obra termina e o cliente não deixa nenhuma indicação.',
      withSite: 'Depois da entrega, o cliente recebe um pedido de avaliação no seu perfil do Google.',
    },
  ],
  chat: {
    title: 'Quem avalia a parede é você',
    body: 'A resposta automática pede bairro, fotos e medidas, e avisa que obra em apartamento pode precisar de responsável técnico. Ela não diz se a parede pode sair e não passa preço.',
    lines: [
      {
        from: 'client',
        text: 'Oi, quero tirar a parede entre a cozinha e a sala do meu apê. Dá pra tirar né? Quanto fica mais ou menos?',
      },
      {
        from: 'reply',
        text: 'Olá! Recebemos seu pedido. Se a parede pode sair e quanto custa, só o pedreiro diz, depois de ver o local. Em qual bairro fica o apartamento?',
      },
      {
        from: 'client',
        text: 'Vila Mariana. Prédio antigo, tenho a planta.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Pode mandar a planta, fotos da parede dos dois lados e a medida aproximada? Em condomínio, obra em parede costuma pedir plano de reforma e engenheiro ou arquiteto responsável.',
      },
      {
        from: 'client',
        text: 'Mandei tudo.',
      },
      {
        from: 'reply',
        text: 'Recebido. O pedreiro responde até amanhã às 18h para combinar a visita.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido com fotos',
      text: 'O cliente envia pelo site ou WhatsApp o bairro, se é casa ou apartamento, as medidas e fotos do local.',
    },
    {
      title: 'Visita e orçamento escrito',
      text: 'Você visita quando faz sentido e manda o orçamento com mão de obra, material, prazo e o que fica de fora.',
    },
    {
      title: 'Início combinado',
      text: 'Data, material e documentos do condomínio ficam confirmados por escrito, com lembrete dias antes.',
    },
    {
      title: 'Mudanças e entrega',
      text: 'Cada pedido extra fica registrado com o valor aprovado, e na entrega o cliente recebe o pedido de avaliação.',
    },
  ],
  faq: [
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer:
        'Sim. O site leva para o seu número de sempre. A primeira resposta sai pelo WhatsApp Business ou por um formulário curto no site, e você assume a conversa quando quiser.',
    },
    {
      question: 'Eu não emito ART. O site pode falar de obra em parede?',
      answer:
        'Pode, sem prometer o que não é seu. Se você trabalha com engenheiro ou arquiteto parceiro, a página diz isso. Se não, ela explica que obras em parede ou estrutura podem exigir um responsável técnico contratado pelo cliente.',
    },
    {
      question: 'Quanto custa manter, e como entram as fotos de obras novas?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Você manda as fotos pelo WhatsApp, com a autorização do cliente e sem mostrar endereço, e eu coloco no site. O valor dessas atualizações a gente combina antes, por escrito.',
    },
  ],
  closing: {
    title: 'Combine a obra por escrito desde o começo.',
    body: 'Me conte como os pedidos chegam hoje e que tipo de obra você pega. A gente vê junto o que vale automatizar e o que continua com você.',
  },
  queries: [
    'pedreiro',
    'pedreiro autônomo',
    'mestre de obras',
    'empreiteiro',
    'alvenaria',
    'reforma de apartamento',
    'reforma de banheiro',
    'assentamento de piso',
    'orçamento de reforma',
    'site para pedreiro',
  ],
  source: {
    label: 'CAU/SP · Norma de reformas ABNT (NBR 16280) para condomínios e moradores',
    url: 'https://causp.gov.br/norma-de-reformas-abnt-conheca-as-regras-para-condominios-e-moradores/',
  },
};
