import { Industry } from './industry.model';

export const arCondicionado: Industry = {
  slug: 'ar-condicionado',
  name: 'Climatização',
  title: 'Conheça o local antes de orçar.',
  intro:
    'Uma página com seus serviços, bairros e atendimento a empresas, e uma primeira resposta que pede aparelho, local e fotos. Você orça com o pedido completo.',
  images: {
    hero: {
      src: 'assets/images/segments/ar-condicionado/hero.svg',
      alt: 'Técnico numa escadinha instalando a unidade interna de um ar-condicionado split na parede, com a unidade externa visível pela janela e a caixa de ferramentas no chão',
    },
    routine: {
      src: 'assets/images/segments/ar-condicionado/routine.svg',
      alt: 'Celular cheio de mensagens, algumas com o espaço da foto vazio, sob um sol forte, ao lado de um termômetro no alto e de uma trena aberta',
    },
    closing: {
      src: 'assets/images/segments/ar-condicionado/closing.svg',
      alt: 'Técnico com a caixa de ferramentas cumprimenta a cliente numa sala sob o ar-condicionado ligado, com um calendário de manutenção marcado na parede',
    },
  },
  routine: {
    quote: 'oi, quanto fica pra instalar um split de 12 mil? já comprei, chega sexta',
    context: 'Mensagem no WhatsApp de um técnico de climatização, num sábado de calor em dezembro, sem foto e sem endereço.',
    body: 'Você não sabe o andar, a distância entre as unidades, se existe ponto elétrico nem onde vai a condensadora. Para descobrir, são várias perguntas por áudio. Enquanto isso, chegam outros pedidos iguais.',
  },
  problems: [
    {
      title: 'Orçamento sem medidas',
      today:
        'Chega "quanto é pra instalar um 12 mil?" sem andar, sem distância entre as unidades e sem saber se há ponto elétrico. No local, a tubulação é maior do que você imaginou e o preço muda na frente do cliente.',
      change:
        'O formulário pede capacidade do aparelho, andar, fotos das paredes interna e externa e se já existe ponto elétrico próprio. Você monta a estimativa com o local na tela.',
    },
    {
      title: 'Pico do verão',
      today:
        'Na primeira onda de calor, os pedidos chegam todos na mesma semana. Você responde à noite, e quem esperou já chamou outro técnico.',
      change:
        'Cada pedido recebe na hora o prazo real da sua agenda. Clientes de limpeza recebem lembrete nos meses mais calmos, antes do calor voltar.',
    },
    {
      title: 'Empresas e PMOC',
      today:
        'Um escritório ou uma clínica procura quem faça o PMOC e só encontra seu perfil com fotos de split em quarto. As visitas periódicas dos contratos ficam anotadas no caderno.',
      change:
        'Uma página explica como você atende empresas e pede número de aparelhos e tipo de imóvel. Cada visita do plano gera lembrete para você e para o cliente.',
    },
  ],
  contrast: [
    {
      today: 'O cliente compra o aparelho antes de saber se a capacidade serve para o cômodo.',
      withSite: 'O site avisa que a capacidade se define na avaliação, e o formulário pede o tamanho do cômodo.',
    },
    {
      today: 'No dia da instalação, o condomínio não autoriza a condensadora na fachada.',
      withSite: 'Para apartamento, a primeira resposta pede que o cliente confira a regra do condomínio antes da data.',
    },
    {
      today: 'A taxa de visita vira discussão quando o problema era só o controle remoto.',
      withSite: 'A condição da visita aparece antes do agendamento.',
    },
    {
      today: 'A garantia da instalação é combinada por áudio e ninguém lembra o prazo.',
      withSite: 'Data do serviço e condições de garantia vão por escrito para o cliente.',
    },
  ],
  chat: {
    title: 'Perguntas antes, avaliação depois',
    body: 'A resposta automática pergunta o que você perguntaria: bairro, tipo de aparelho e uma foto da etiqueta. Ela não diz se é falta de gás, não ensina a mexer no aparelho e não passa preço.',
    lines: [
      {
        from: 'client',
        text: 'Boa tarde, meu ar liga mas não gela. Acho que acabou o gás, quanto é pra completar?',
      },
      {
        from: 'reply',
        text: 'Boa tarde! Recebemos sua mensagem. Por aqui não fazemos diagnóstico nem passamos valor: quem avalia é o técnico. Qual é o seu bairro e o tipo de aparelho?',
      },
      {
        from: 'client',
        text: 'Centro. Split de 12 mil, em apartamento.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Pode mandar uma foto da etiqueta da unidade interna e dizer quando foi a última limpeza?',
      },
      {
        from: 'client',
        text: 'Mandei a foto. Limpeza faz uns dois anos.',
      },
      {
        from: 'reply',
        text: 'Recebido. O técnico responde até amanhã às 10h com os horários de visita e a condição da avaliação.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido com fotos',
      text: 'Pelo site ou WhatsApp, o cliente informa bairro, serviço, aparelho e fotos do local.',
    },
    {
      title: 'Você avalia',
      text: 'Com as fotos e medidas, você decide se já dá uma estimativa ou se precisa ver no local.',
    },
    {
      title: 'Visita confirmada',
      text: 'Endereço, horário e condição da visita ficam por escrito, com lembrete no dia anterior.',
    },
    {
      title: 'Serviço e próxima limpeza',
      text: 'Depois do serviço, o cliente recebe um pedido de avaliação no Google e, se quiser, o lembrete da próxima manutenção.',
    },
  ],
  faq: [
    {
      question: 'A resposta automática pode dizer que é falta de gás ou passar preço?',
      answer:
        'Não. Ela só coleta bairro, tipo de aparelho, fotos e o que o cliente relata. Diagnóstico, orientação técnica e valor ficam com você, que vê o equipamento.',
    },
    {
      question: 'Dá para ter uma parte do site só para empresas e PMOC?',
      answer:
        'Sim. Uma página explica como você trabalha com plano de manutenção para escritórios, lojas e clínicas, e pede número de aparelhos e tipo de imóvel. O que cada cliente precisa cumprir quem orienta é você, no atendimento.',
    },
    {
      question: 'Quanto custa manter depois de pronto?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Mudanças de serviços, bairros ou fotos você pede quando precisar, e o valor a gente combina antes, por escrito.',
    },
  ],
  closing: {
    title: 'Chegue ao verão com a agenda em ordem.',
    body: 'Me conte como os pedidos chegam hoje, que regiões você atende e se trabalha com empresas. A gente vê junto o que vale automatizar e o que fica com você.',
  },
  queries: [
    'ar-condicionado',
    'técnico de ar-condicionado',
    'instalador de ar-condicionado',
    'climatização',
    'refrigeração',
    'instalação de split',
    'limpeza de ar-condicionado',
    'manutenção de ar-condicionado',
    'PMOC',
    'site para técnico de ar-condicionado',
  ],
  source: {
    label: 'Planalto · Lei nº 13.589/2018 (PMOC em ambientes climatizados)',
    url: 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13589.htm',
  },
};
