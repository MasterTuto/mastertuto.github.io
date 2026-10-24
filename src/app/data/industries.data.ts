import type { EditorialColor, EditorialVariant } from '../components/editorial/editorial.types';
export interface Industry {
 slug: string; name: string; title: string; intro: string; variant: EditorialVariant; color: EditorialColor;
 presence: string[]; automation: string[]; steps: string[]; images: string[]; statement: string; body: string; queries: string[];
 source: { label: string; url: string }; sections: ('story' | 'needs' | 'gallery' | 'workflow')[];
 grid: 'bento' | 'masonry'; listVariant: 'columns' | 'rows';
}
export const industries: Industry[] = [
  {
    "slug": "advogado",
    "name": "Advocacia",
    "title": "Autoridade começa com clareza.",
    "intro": "Um site que explica sua atuação e organiza o primeiro contato com o escritório.",
    "variant": "editorial",
    "color": "primary",
    "presence": [
      "Apresentar áreas de atuação, trajetória e identificação na OAB.",
      "Publicar conteúdo informativo, sem promessa de resultado.",
      "Explicar modalidades de atendimento, localização e como solicitar uma conversa."
    ],
    "automation": [
      "Separar contatos por área jurídica e disponibilidade.",
      "Agendar reuniões e enviar lembretes discretos.",
      "Encaminhar documentos para um canal reservado, com acesso controlado."
    ],
    "steps": [
      "Área de interesse e contato",
      "Revisão humana da solicitação",
      "Agendamento com o escritório"
    ],
    "images": [
      "Advogado em seu escritório, mesa com livros jurídicos e janela ao fundo",
      "Detalhe de estante de livros e mesa preparada para uma reunião",
      "Sala de reunião de escritório de advocacia preparada para receber um cliente"
    ],
    "statement": "Uma boa primeira conversa começa antes da reunião.",
    "body": "O visitante precisa entender se o escritório atua na sua demanda. O site apresenta esse caminho; a avaliação jurídica continua com o profissional.",
    "queries": [
      "advogada",
      "escritório jurídico",
      "direito",
      "oab",
      "site para advogado"
    ],
    "source": {
      "label": "OAB · publicidade na advocacia",
      "url": "https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021"
    },
    "sections": [
      "story",
      "needs",
      "gallery",
      "workflow"
    ],
    "grid": "bento",
    "listVariant": "rows"
  },
  {
    "slug": "ginecologista",
    "name": "Ginecologia",
    "title": "Acolhimento desde o primeiro contato.",
    "intro": "Presença digital para apresentar seu consultório e facilitar o agendamento com discrição.",
    "variant": "split",
    "color": "secondary",
    "presence": [
      "Apresentar formação, CRM e RQE quando aplicável.",
      "Explicar consultas, convênios, localização e acessibilidade.",
      "Oferecer informações de preparo revisadas pela médica ou pelo médico."
    ],
    "automation": [
      "Solicitar horário sem pedir histórico íntimo em formulário público.",
      "Enviar confirmação e facilitar remarcação.",
      "Organizar lembretes de retorno conforme orientação profissional."
    ],
    "steps": [
      "Escolha da modalidade de consulta",
      "Confirmação pela recepção",
      "Orientações e lembrete discreto"
    ],
    "images": [
      "Consultório de ginecologia acolhedor com poltronas e luz natural",
      "Profissional de saúde conversando com paciente em sala reservada",
      "Entrada de consultório de ginecologia com recepção e sinalização"
    ],
    "statement": "Uma agenda organizada deixa espaço para cuidar.",
    "body": "O site resolve dúvidas práticas. A recepção acompanha os pedidos e as informações clínicas ficam no canal adequado.",
    "queries": [
      "ginecologia",
      "ginecologista",
      "consultório",
      "consulta",
      "médica",
      "agendamento médico",
      "agendar consulta",
      "marcar consulta",
      "site para médica"
    ],
    "source": {
      "label": "CFM · publicidade médica",
      "url": "https://publicidademedica.cfm.org.br/"
    },
    "sections": [
      "needs",
      "workflow",
      "story",
      "gallery"
    ],
    "grid": "bento",
    "listVariant": "columns"
  },
  {
    "slug": "eletricista",
    "name": "Eletricistas",
    "title": "Seu próximo chamado começa aqui.",
    "intro": "Seja encontrado na região certa e receba pedidos com informações úteis antes de sair para a visita.",
    "variant": "banner",
    "color": "warning",
    "presence": [
      "Informar bairros atendidos e horários reais de disponibilidade.",
      "Diferenciar instalação, manutenção e diagnóstico.",
      "Apresentar experiência, qualificações e serviços realizados."
    ],
    "automation": [
      "Coletar bairro, tipo de imóvel e descrição do problema.",
      "Separar pedidos de instalação e manutenção para análise humana.",
      "Organizar visitas, propostas e acompanhamento após o serviço."
    ],
    "steps": [
      "Bairro e descrição do serviço",
      "Avaliação e definição da visita",
      "Proposta e confirmação"
    ],
    "images": [
      "Eletricista qualificado inspecionando quadro elétrico com equipamentos de proteção",
      "Ferramentas isoladas organizadas ao lado de um projeto elétrico",
      "Eletricista conversando com cliente sobre o planejamento de uma instalação"
    ],
    "statement": "Menos mensagens para descobrir o básico.",
    "body": "Um pedido bem organizado informa local e necessidade. O diagnóstico e o orçamento final dependem da avaliação do profissional.",
    "queries": [
      "elétrica",
      "eletricista",
      "instalação elétrica",
      "tomada",
      "quadro elétrico",
      "manutenção elétrica"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "workflow",
      "needs",
      "gallery",
      "story"
    ],
    "grid": "bento",
    "listVariant": "rows"
  },
  {
    "slug": "pintor",
    "name": "Pintura",
    "title": "Seu acabamento merece ser visto.",
    "intro": "Um portfólio que mostra os detalhes do seu trabalho e transforma interesse em pedidos de orçamento.",
    "variant": "gallery",
    "color": "secondary",
    "presence": [
      "Mostrar projetos por ambiente, acabamento e tipo de pintura.",
      "Explicar preparação, proteção do imóvel e limpeza final.",
      "Informar região atendida e como funciona a visita técnica."
    ],
    "automation": [
      "Receber medidas aproximadas, fotos e estado das superfícies.",
      "Organizar propostas por mão de obra, materiais e prazo.",
      "Agendar visitas e acompanhar aprovação de cores e orçamento."
    ],
    "steps": [
      "Ambientes, medidas e referências",
      "Visita e proposta de escopo",
      "Aprovação e data de início"
    ],
    "images": [
      "Sala recém-pintada com parede de destaque e acabamento visível",
      "Detalhe de recorte preciso entre parede e teto",
      "Pintor protegendo o piso antes de iniciar a pintura"
    ],
    "statement": "O cliente enxerga o cuidado, não só a cor.",
    "body": "Fotos de preparação e acabamento explicam o valor do serviço. O orçamento considera a condição das paredes e o resultado desejado.",
    "queries": [
      "pintora",
      "pintura",
      "pintor",
      "pintar casa",
      "pintura residencial",
      "orçamento pintura",
      "mostrar meus trabalhos",
      "portfólio de pintura"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "gallery",
      "story",
      "needs",
      "workflow"
    ],
    "grid": "masonry",
    "listVariant": "columns"
  },
  {
    "slug": "pedreiro",
    "name": "Alvenaria e reformas",
    "title": "Cada etapa da obra, bem explicada.",
    "intro": "Apresente suas reformas com contexto e organize pedidos para começar com um escopo claro.",
    "variant": "timeline",
    "color": "primary",
    "presence": [
      "Mostrar obras por tipo de intervenção e etapa executada.",
      "Explicar escopo, responsabilidades e necessidade de visita.",
      "Apresentar região atendida e disponibilidade para novos projetos."
    ],
    "automation": [
      "Coletar endereço aproximado, medidas e objetivo da reforma.",
      "Organizar levantamento, proposta e aceite por etapas.",
      "Compartilhar andamento e registrar solicitações de mudança."
    ],
    "steps": [
      "Levantamento e visita",
      "Escopo, materiais e cronograma",
      "Acompanhamento por etapa"
    ],
    "images": [
      "Reforma residencial em andamento com etapas de alvenaria visíveis",
      "Detalhe de revestimento assentado com juntas alinhadas",
      "Pedreiro conferindo medidas de uma parede com trena e nível"
    ],
    "statement": "Clareza antes da primeira parede.",
    "body": "Um escopo documentado ajuda cliente e profissional a combinar materiais, etapas e mudanças sem perder informações nas conversas.",
    "queries": [
      "pedreiro",
      "pedreira",
      "obra",
      "reforma",
      "alvenaria",
      "revestimento"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "workflow",
      "gallery",
      "needs",
      "story"
    ],
    "grid": "bento",
    "listVariant": "rows"
  },
  {
    "slug": "montador-de-moveis",
    "name": "Montagem de móveis",
    "title": "Do móvel na caixa à agenda confirmada.",
    "intro": "Receba as informações da montagem de uma vez e apresente seu cuidado com cada peça.",
    "variant": "split",
    "color": "warning",
    "presence": [
      "Listar móveis atendidos, montagem e desmontagem.",
      "Mostrar detalhes de montagem, organização e proteção do ambiente.",
      "Informar bairros, condições de acesso e como solicitar orçamento."
    ],
    "automation": [
      "Coletar marca, modelo, quantidade e foto ou link do produto.",
      "Conferir acesso, deslocamento e tempo estimado antes de agendar.",
      "Confirmar visita e enviar orientações para liberar o espaço."
    ],
    "steps": [
      "Modelo do móvel e endereço",
      "Análise de peças e acesso",
      "Orçamento e horário combinado"
    ],
    "images": [
      "Montador organizando ferragens e peças de um armário sobre proteção no piso",
      "Guarda-roupa montado com portas alinhadas em quarto organizado",
      "Detalhe das mãos de montador ajustando uma dobradiça de armário"
    ],
    "statement": "Qual móvel? Quantas peças? Em qual endereço?",
    "body": "As perguntas certas evitam várias rodadas de mensagens e ajudam a reservar tempo suficiente para cada montagem.",
    "queries": [
      "montador",
      "montadora",
      "montagem",
      "montador de moveis",
      "montador de móveis",
      "guarda roupa",
      "desmontagem"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "story",
      "workflow",
      "needs",
      "gallery"
    ],
    "grid": "bento",
    "listVariant": "columns"
  },
  {
    "slug": "limpador-de-vidros",
    "name": "Limpeza de vidros",
    "title": "Transparência também no orçamento.",
    "intro": "Mostre os ambientes que atende e organize visitas pontuais ou contratos recorrentes.",
    "variant": "banner",
    "color": "primary",
    "presence": [
      "Distinguir vitrines, janelas residenciais e fachadas.",
      "Explicar limitações de acesso e avaliação das condições de trabalho.",
      "Apresentar região atendida e possibilidades de manutenção periódica."
    ],
    "automation": [
      "Coletar fotos, quantidade de vidros, altura e condições de acesso.",
      "Encaminhar serviços que exigem vistoria antes de precificar.",
      "Organizar recorrência, lembretes e reagendamento por clima."
    ],
    "steps": [
      "Superfície, altura e acesso",
      "Vistoria quando necessária",
      "Execução e próxima manutenção"
    ],
    "images": [
      "Vitrine de loja limpa refletindo a rua e o interior organizado",
      "Profissional limpando janela térrea com rodo e equipamentos adequados",
      "Janelas residenciais limpas vistas do interior de uma sala"
    ],
    "statement": "Uma vitrine limpa pode virar um serviço recorrente.",
    "body": "Organizar periodicidade e acesso facilita o atendimento a lojas, escritórios e residências, com avaliação prévia de cada ambiente.",
    "queries": [
      "limpeza de vidros",
      "limpador de vidros",
      "vidraceiro limpeza",
      "vitrine",
      "fachada",
      "lavar janela"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "needs",
      "gallery",
      "workflow",
      "story"
    ],
    "grid": "bento",
    "listVariant": "rows"
  },
  {
    "slug": "jardineiro",
    "name": "Jardinagem",
    "title": "Seu trabalho cresce quando é visto.",
    "intro": "Um portfólio vivo para conquistar novos jardins e organizar a manutenção dos atuais.",
    "variant": "gallery",
    "color": "secondary",
    "presence": [
      "Mostrar jardins por tamanho, contexto e tipo de manutenção.",
      "Explicar poda, cuidado de canteiros e serviços incluídos.",
      "Informar região atendida e frequência combinada de visitas."
    ],
    "automation": [
      "Coletar área aproximada, fotos e necessidade do jardim.",
      "Planejar visitas recorrentes por região.",
      "Registrar cuidados realizados e reagendar conforme o clima."
    ],
    "steps": [
      "Fotos e necessidades do jardim",
      "Plano de cuidados e frequência",
      "Visitas e registro de manutenção"
    ],
    "images": [
      "Jardim residencial com canteiros bem cuidados e caminho de pedras",
      "Mãos de jardineiro cuidando de plantas em um canteiro",
      "Área verde de condomínio com gramado e arbustos podados"
    ],
    "statement": "Manutenção que continua depois da primeira visita.",
    "body": "Apresente os cuidados que fazem parte do serviço e mantenha um histórico simples para cada jardim.",
    "queries": [
      "jardineiro",
      "jardineira",
      "jardinagem",
      "jardim",
      "poda",
      "gramado"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "gallery",
      "needs",
      "story",
      "workflow"
    ],
    "grid": "masonry",
    "listVariant": "columns"
  },
  {
    "slug": "ar-condicionado",
    "name": "Climatização",
    "title": "Uma agenda no clima certo.",
    "intro": "Presença local para instalação e manutenção, com pedidos que já chegam organizados.",
    "variant": "timeline",
    "color": "primary",
    "presence": [
      "Separar instalação, limpeza e manutenção corretiva.",
      "Informar marcas e tipos de equipamento atendidos.",
      "Mostrar região de atendimento e o que é avaliado na visita."
    ],
    "automation": [
      "Coletar marca, modelo, capacidade, quantidade e descrição da demanda.",
      "Organizar visitas por região e disponibilidade técnica.",
      "Programar lembretes de manutenção conforme avaliação e uso."
    ],
    "steps": [
      "Equipamento e necessidade",
      "Avaliação técnica e proposta",
      "Serviço e acompanhamento"
    ],
    "images": [
      "Técnico inspecionando unidade interna de ar-condicionado com ambiente protegido",
      "Detalhe de filtros e ferramentas preparados para manutenção",
      "Unidade externa de ar-condicionado instalada em área ventilada"
    ],
    "statement": "Cada equipamento conta uma história.",
    "body": "Identificar modelo e histórico ajuda a preparar a visita. A avaliação técnica define a solução e a periodicidade de manutenção.",
    "queries": [
      "ar condicionado",
      "climatização",
      "split",
      "limpeza de ar",
      "instalação de ar",
      "refrigeração"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "workflow",
      "story",
      "gallery",
      "needs"
    ],
    "grid": "bento",
    "listVariant": "rows"
  },
  {
    "slug": "fotografo",
    "name": "Fotografia",
    "title": "Um portfólio que abre conversas.",
    "intro": "Dê espaço às suas imagens e organize o caminho entre inspiração, briefing e reserva.",
    "variant": "gallery",
    "color": "warning",
    "presence": [
      "Organizar ensaios por especialidade e intenção do cliente.",
      "Explicar entregáveis, edição, prazo e condições de uso das imagens.",
      "Apresentar disponibilidade, região e processo de contratação."
    ],
    "automation": [
      "Coletar data, local, tipo de ensaio e referências.",
      "Organizar proposta, contrato e confirmação da reserva.",
      "Acompanhar seleção e entrega em galerias com acesso reservado."
    ],
    "steps": [
      "Data e briefing criativo",
      "Proposta e reserva",
      "Seleção e entrega das imagens"
    ],
    "images": [
      "Fotógrafo dirigindo um ensaio de retrato em estúdio",
      "Casal caminhando em um ensaio externo",
      "Composição de produtos em mesa de fotografia"
    ],
    "statement": "A imagem atrai. O processo transmite confiança.",
    "body": "O visitante entende seu olhar e sabe o que acontece depois de pedir um orçamento, até receber as fotografias.",
    "queries": [
      "fotógrafo",
      "fotografo",
      "fotógrafa",
      "fotografia",
      "ensaio",
      "fotografia de casamento",
      "portfólio"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "gallery",
      "workflow",
      "story",
      "needs"
    ],
    "grid": "masonry",
    "listVariant": "columns"
  },
  {
    "slug": "contador",
    "name": "Contabilidade",
    "title": "Mais clareza para quem empreende.",
    "intro": "Apresente os serviços do escritório e organize a entrada de novos clientes e documentos.",
    "variant": "editorial",
    "color": "primary",
    "presence": [
      "Explicar serviços por perfil de empresa e necessidade.",
      "Apresentar identificação profissional e registro no CRC.",
      "Publicar conteúdo prático com escopo e responsabilidades claros."
    ],
    "automation": [
      "Qualificar contatos por atividade, porte e serviço desejado.",
      "Organizar checklist de entrada e envio em canal reservado.",
      "Acompanhar documentos pendentes e lembretes de prazos."
    ],
    "steps": [
      "Perfil da empresa e demanda",
      "Proposta e checklist de entrada",
      "Rotina de documentos e acompanhamento"
    ],
    "images": [
      "Contador em reunião com empreendedor analisando documentos sem dados legíveis",
      "Mesa organizada com planejamento mensal e computador",
      "Equipe de contabilidade organizando o planejamento mensal"
    ],
    "statement": "Menos documentos perdidos. Mais contexto para atender.",
    "body": "Um processo de entrada orienta cada cliente sobre os próximos passos e deixa pendências visíveis para a equipe.",
    "queries": [
      "contador",
      "contadora",
      "contabilidade",
      "escritório contábil",
      "abrir empresa",
      "documentos fiscais"
    ],
    "source": {
      "label": "CFC · identificação em publicidade",
      "url": "https://cfc.org.br/fiscalizacao-etica-e-disciplina/perguntas-frequentes/assinatura-de-pecas-contabeis/"
    },
    "sections": [
      "needs",
      "story",
      "workflow",
      "gallery"
    ],
    "grid": "bento",
    "listVariant": "rows"
  },
  {
    "slug": "banho-e-tosa",
    "name": "Banho e tosa",
    "title": "Cuidado que começa na reserva.",
    "intro": "Mostre seu espaço e facilite a rotina de quem confia o pet à sua equipe.",
    "variant": "split",
    "color": "secondary",
    "presence": [
      "Apresentar estrutura, equipe e serviços por porte e pelagem.",
      "Explicar duração estimada, horários e condições de atendimento.",
      "Mostrar localização, cuidados do processo e formas de contato."
    ],
    "automation": [
      "Coletar porte, pelagem, serviço e observações relevantes do tutor.",
      "Organizar horários conforme duração e capacidade da equipe.",
      "Confirmar reserva, avisar retirada e sugerir próximo agendamento."
    ],
    "steps": [
      "Perfil do pet e serviço",
      "Confirmação do horário",
      "Aviso de retirada e retorno"
    ],
    "images": [
      "Profissional de banho e tosa cuidando de um cachorro em ambiente organizado",
      "Recepção de banho e tosa com espaço acolhedor para tutores e pets",
      "Cachorro após banho e tosa aguardando seu tutor em espaço confortável"
    ],
    "statement": "Uma rotina mais tranquila para pets e tutores.",
    "body": "Informações antes da visita ajudam a equipe a reservar o tempo adequado. O tutor acompanha os combinados sem precisar perguntar a todo momento.",
    "queries": [
      "banho e tosa",
      "pet shop",
      "petshop",
      "cachorro",
      "tosa",
      "agendamento pet"
    ],
    "source": {
      "label": "Google · negócios com área de atendimento",
      "url": "https://support.google.com/business/answer/9157481?hl=pt-BR"
    },
    "sections": [
      "story",
      "gallery",
      "needs",
      "workflow"
    ],
    "grid": "bento",
    "listVariant": "columns"
  }
];
