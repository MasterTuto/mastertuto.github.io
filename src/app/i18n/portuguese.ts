import type { Translations } from './english';
import { minesweeper } from './games/minesweeper/pt';
import { nonogram } from './games/nonogram/pt';
import { binaryPuzzle } from './games/binary-puzzle/pt';
import { memory } from './games/memory/pt';
import { colorLink } from './games/color-link/pt';

export const portugueseTranslations: Translations = {
  minesweeper,
  nonogram,
  binaryPuzzle,
  memory,
  colorLink,
  catalog: {
    explore: 'Explorar jogos e ferramentas',
    toggle: 'Recolher ou expandir menu',
    close: 'Fechar menu',
    skip: 'Pular para o conteúdo',
    gamesTitle: 'Jogos de lógica e palavras online grátis',
    gamesIntro:
      "Jogue Sudoku, Queens, Word Ladder, Campo Minado, Nonograma, Quebra-cabeça Binário, Jogo da Memória e Ligue as Cores no navegador, grátis, no celular, tablet ou computador.",
    gamesHeading: 'Escolha seu próximo desafio',
    gamesText:
      "Treine a lógica com Sudoku, Queens, Nonograma e Quebra-cabeça Binário, exercite a memória, desvie das minas ou ligue cores e palavras. Todos têm níveis, cronômetro que começa no primeiro movimento e resultado para compartilhar.",
    toolsTitle: "Ferramentas online grátis para profissionais",
    toolsIntro:
      "Gere invoices, dimensione cabos e ar-condicionado, conte prazos processuais, calcule o Simples Nacional e a idade gestacional, ou formate JSON e decodifique JWT. Tudo grátis, direto no navegador.",
    toolsHeading: "Ferramentas para o trabalho do dia a dia",
    toolsText:
      "As calculadoras seguem as regras brasileiras e mostram o resultado enquanto você digita, com valores comuns a um toque. As ferramentas para desenvolvedores formatam JSON e decodificam tokens JWT. Na pausa, experimente nossos jogos de lógica.",
  },
  backHome: 'Voltar ao início',
  cases: {
    viewCase: "Ver case completo",
    visitSite: "Visitar o site",
    backToProjects: "Voltar para os projetos",
    myRole: "O que eu fiz",
    aboutTitle: "Sobre o projeto",
    highlightsTitle: "Destaques",
    galleryTitle: "No computador e no celular",
    techTitle: "Por baixo do capô",
    desktop: "versão para computador",
    mobile: "versão para celular",
    ctaTitle: "Tem um projeto parecido em mente?",
    ctaText: "Conte o que você precisa e eu respondo com os próximos passos.",
    ctaButton: "Conversar sobre meu projeto",
    roles: {
      design: "Design",
      implementation: "Implementação",
      hosting: "Hospedagem",
      maintenance: "Manutenção",
    },
    items: {
      jingle: {
        tagline: "Plataforma de criação de jingles com inteligência artificial",
        summary: "Uma plataforma em que qualquer pessoa transforma uma ideia em jingle: a inteligência artificial escreve a letra, cria a música e gera a voz, com download em MP3. Fiz o design, a implementação e a hospedagem, e cuido da manutenção.",
        about: "O jingle.ia.br leva o jingle para fora do estúdio. Padarias, pizzarias, mercados, rádios e agências descrevem a mensagem, escolhem um ritmo brasileiro como forró, sertanejo ou pagode, comparam três opções de letra e baixam a música pronta. A mesma plataforma atende aniversários, eventos, podcasts e campanhas, sem exigir conhecimento de composição.",
        work: {
          design: {
            intro: "O público nunca compôs uma música. Cada decisão de design tira uma dúvida do caminho.",
            decisions: {
              '1': {
                title: "Quatro etapas, uma pergunta por vez",
                text: "Ideia, tom, letra e download. Dividir o pedido em passos curtos evita a tela em branco de quem não sabe por onde começar.",
              },
              '2': {
                title: "Escolher em vez de escrever",
                text: "A pessoa compara três letras antes de gerar o áudio. Escolher é mais fácil do que escrever, e o crédito só é gasto no que ela aprovou.",
              },
              '3': {
                title: "Visual com cara de Brasil",
                text: "Verde e amarelo, megafone e ritmos regionais deixam claro, já na primeira tela, para quem é o produto.",
              },
            },
          },
          implementation: {
            intro: "Gerar música leva tempo e pode falhar. A implementação foi pensada para isso não pesar para o usuário.",
            decisions: {
              '1': {
                title: "Geração em segundo plano",
                text: "O jingle continua sendo gerado mesmo se a pessoa fechar a página. Ela acompanha o status e baixa o MP3 quando ficar pronto.",
              },
              '2': {
                title: "Falha não custa crédito",
                text: "Se a criação da letra falhar, o jingle volta ao saldo do plano e a tela explica o que aconteceu.",
              },
              '3': {
                title: "Planos por assinatura",
                text: "Três planos mensais com cota de jingles e cancelamento a qualquer momento. O plano de entrada tem marca d’água falada.",
              },
            },
          },
          hosting: {
            intro: "O uso vem em picos, como datas comemorativas e campanhas. A infraestrutura acompanha esse ritmo.",
            decisions: {
              '1': {
                title: "Paga pelo que usa",
                text: "Arquitetura serverless: sem servidor parado esperando visita, e a capacidade cresce sozinha quando o movimento aumenta.",
              },
              '2': {
                title: "Domínio que já explica",
                text: "O .ia.br diz o que o produto faz e reforça que é brasileiro, antes mesmo de abrir o site.",
              },
            },
          },
          maintenance: {
            intro: "O produto continua evoluindo depois do lançamento.",
            decisions: {
              '1': {
                title: "Evolução contínua",
                text: "Novos tipos de jingle, ideias de briefing e conteúdos entram conforme o uso real mostra o que falta.",
              },
              '2': {
                title: "Correções rápidas",
                text: "Acompanho erros e custos dos serviços de IA para corrigir problemas antes que virem reclamação.",
              },
            },
          },
        },
        tech: {
          intro: "Uma stack serverless na AWS, com orquestração de vários modelos de IA e entrega pela borda.",
          frontend: "SPA em Angular, num monorepo junto com o back-end: um repositório, um fluxo de build e deploy.",
          backend: "Back-end serverless em Node.js sobre AWS Lambda, com DynamoDB como banco NoSQL. Escala sob demanda e cobra por execução.",
          ai: "Pipeline assíncrono que orquestra LLMs da OpenAI e do Gemini, inferência de modelos no Replicate e síntese de voz com ElevenLabs.",
          payments: "Assinaturas recorrentes no Asaas, integradas por API e webhooks para liberar a cota de cada plano.",
          infra: "Assets estáticos servidos pela CDN do CloudFront, DNS e proxy na borda com Cloudflare e domínio .ia.br registrado no Registro.br.",
        },
        highlights: {
          '1': {
            value: "3",
            label: "opções de letra para cada jingle",
          },
          '2': {
            value: "8",
            label: "gêneros musicais brasileiros",
          },
          '3': {
            value: "60 s",
            label: "de jingle, com download em MP3",
          },
          '4': {
            value: "R$ 9,90",
            label: "por mês no plano de entrada",
          },
        },
      },
      supervegetariano: {
        tagline: "Restaurante vegetariano em Santos desde 1986",
        summary: "Site institucional de um restaurante vegetariano tradicional de Santos/SP. O site já existia: migrei para uma nova hospedagem em 1 dia, configurei o e-mail na KingHost e fiz pequenos ajustes.",
        about: "O Super Vegetariano serve comida caseira, saborosa e saudável em Santos desde fevereiro de 1986. O site apresenta a história da casa, as unidades, o cardápio do dia nas redes sociais e o contato pelo WhatsApp. Ele foi feito em WordPress por outra equipe.",
        work: {
          hosting: {
            intro: "O site já funcionava e os clientes já o conheciam. O objetivo era trocar a estrutura sem que ninguém percebesse.",
            decisions: {
              '1': {
                title: "Migração em 1 dia",
                text: "Arquivos, banco de dados e domínio do WordPress foram para a nova hospedagem em um único dia, mantendo conteúdo e visual.",
              },
              '2': {
                title: "E-mail na KingHost",
                text: "Configurei as contas de e-mail do domínio na KingHost, para o restaurante continuar recebendo mensagens com o próprio endereço.",
              },
              '3': {
                title: "Pequenos ajustes",
                text: "Depois da migração, corrigi detalhes pontuais sem mexer na identidade que os clientes já reconhecem.",
              },
            },
          },
        },
        highlights: {
          '1': {
            value: "40",
            label: "anos servindo comida saudável",
          },
          '2': {
            value: "2",
            label: "unidades em Santos/SP",
          },
          '3': {
            value: "1 dia",
            label: "para concluir a migração",
          },
          '4': {
            value: "1986",
            label: "ano de fundação",
          },
        },
      },
    },
  },
  scheduling: {
    title: 'Agende uma conversa',
    description:
      'Escolha um horário para uma conversa de 30 minutos sobre seu projeto.',
    openCalendar: 'Abrir agenda',
  },
  games: {
    label: 'Jogos',
    subtitle: 'Uma coleção de jogos que criei.',
    play: 'Jogar',
    share: "Compartilhar resultado",
    shareCopied: "Link copiado!",
    time: "Tempo",
    timerHint: "O relógio começa no seu primeiro movimento.",
    moves: "Jogadas",
    newGame: "Novo jogo",
    playAgain: "Jogar de novo",
    level: "Nível",
    queensDescription:
      'Um quebra-cabeça de lógica diário inspirado no problema clássico das N-Rainhas.',
    sudokuDescription:
      'Um gerador de Sudoku com grades 4×4, 6×6 e 9×9 e dificuldade ajustável.',
    wordLadderDescription:
      'Um puzzle de palavras em que você muda uma letra por vez para transformar uma palavra em outra, com puzzles diários e três níveis de dificuldade.',
  },
  tools: {
    label: 'Ferramentas',
    subtitle: 'Ferramentas úteis que criei.',
    emptyTitle: 'Nenhuma ferramenta disponível ainda',
    emptyDescription: 'Novas ferramentas estão a caminho. Volte em breve!',
  },
  home: {
    title:
      'Programador de <span class="text-foreground-emphasis">sistemas de IA</span> e <span class="text-foreground-emphasis">soluções para autônomos</span>.',
    description:
      'Sistemas agênticos, automações, sites para eletricista, médicos, advogados, sistemas de gerenciamento',
    websiteLikeThis: 'Conversar comigo',
    whatsappMessage: 'Oi, vim pelo site! Tenho um projeto para fechar contigo!',
    nav: {
      home: 'Início',
      services: 'Serviços',
      whyMe: 'Por que eu',
      projects: 'Projetos',
      testimonials: 'Depoimentos',
      allServices: "Todos os serviços",
      segments: "Segmentos",
      gamesAndTools: "Jogos e ferramentas",
    },
    services: {
      name: 'Serviços',

      title: 'Para todos os tipos de negócios',
      description:
        'Desenvolvimento estratégico focado em perfomance, design e conversão. Tudo que você precisa para ter presença, autoridade e resultados online.',

      landingPages: 'Landing Pages',
      landingPagesDescription:
        'Páginas pensadas em conversão para captar mais leads e fechar mais negócios.',

      websitesForFreelancers: 'Sites para Autônomos',
      websitesForFreelancersDescription:
        'Sites profissionais que transmitem confiança e geram novos oportunidades.',

      blogsAndPortofolios: 'Blogs e Portfólios',
      blogsAndPortofoliosDescription:
        'Mostre seu trabalho, compartilhe conhecimento e atraia seu público ideal.',

      integrations: 'Integrações',
      integrationsDescription:
        'Formulários, e-mail marketing, WhatsApp, pagamentos e muito mais.',
    },
    whyMe: {
      name: 'POR QUE TRABALHAR COMIGO?',
      title: 'Compromisso com resultados e atenção em cada detalhe',
      description:
        'Mais do que código, entrego estratégia, comunicação e um parceiro para te ajudar a alcançar seus objetivos.',
      list: {
        '1Title': 'Comunicação clara e direta',
        '1Subtitle': 'Acompanhamento em todas as etapas',
        '2Title': 'Design moderno e personalizado',
        '2Subtitle': 'Sites únicos que representam a sua marca',
        '3Title': 'Foco em perfomance',
        '3Subtitle': 'Sites rápidos que não perdem visitas',
        '4Title': 'SEO Otimizado',
        '4Subtitle': 'Mais visibilidade para o seu negócio',
      },
      yoE: '5+ anos',
      yoEDescription: 'Desenvolvendo soluções digitais',
    },
    projects: {
      name: 'PORTFOLIO',
      title: 'Projetos que geram resultados',
      description:
        'Alguns trabalhos recentes desenvolvidos para profissionais e empresas que confiaram no meu trabalho',
      viewAll: 'Ver todos os projetos',
    },
    testimonials: {
      name: 'Depoimentos',
      title: 'O que meus clientes dizem:',
      previous: 'Depoimentos anteriores',
      next: 'Próximos depoimentos',
      ctaTitle: 'Pronto para ter um site que traz resultados reais?',
      ctaDescription:
        'Vamos conversar sobre seus projetos e tirar suas ideias do papel.',
      whatsapp: 'Falar no WhatsApp',
      whatsappMessage:
        'Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.',
      requestBudget: 'Solicitar orçamento',
      items: {
        '1': {
          text: 'Breno entendeu exatamente o que eu precisava e entregou uma página rápida, bonita e que começou a trazer contatos qualificados na primeira semana.',
          name: 'Mariana Alves',
          profession: 'Arquiteta',
        },
        '2': {
          text: 'O processo foi claro do início ao fim. Finalmente tenho um site profissional que explica meu trabalho e passa confiança.',
          name: 'Rafael Costa',
          profession: 'Consultor de negócios',
        },
        '3': {
          text: 'Além do design, o cuidado com performance fez muita diferença. O site carrega rápido e funciona perfeitamente no celular.',
          name: 'Camila Torres',
          profession: 'Dona de estúdio de beleza',
        },
        '4': {
          text: 'Ele transformou uma ideia solta em uma presença digital refinada. A comunicação foi fácil e o resultado ficou fiel à minha marca.',
          name: 'Lucas Mendes',
          profession: 'Personal trainer',
        },
      },
    },
    footer: {
      ctaTitle: 'Vamos criar algo incrível juntos?',
      ctaSubtitle:
        'Estou pronto para transformar sua ideia em um site profissional, rápido e que realmente gera resultados.',
      cards: {
        closeService: {
          title: 'Atendimento próximo',
          subtitle: 'Foco no seu projeto',
        },
        transparentProcess: {
          title: 'Processo transparente',
          subtitle: 'Você acompanha cada etapa',
        },
        properSupport: {
          title: 'Suporte adequado',
          subtitle: 'Deixo do seu jeito',
        },
      },
      brandSubtitle:
        'Programador freelancer especializado em criar sites que geram resultados para autônomos e pequenos negócios.',
      navigation: 'Navegação',
      services: 'Serviços',
      letsTalk: 'Vamos conversar?',
      downloadCurriculum: 'Baixar currículo',
      rights: 'Todos os direitos reservados.',
    },
    estimateBudget: 'Solicitar um orçamento',
  },
  servicesPage: {
    common: {
      backHome: 'Voltar ao início',
      backToServices: 'Todos os serviços',
      otherServices: 'Explore outros serviços',
      requestBudget: 'Solicitar um orçamento',
      ready: 'Pronto para começar?',
      whatsappMessage:
        'Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.',
    },
    index: {
      title: 'Serviços',
      subtitle:
        'Desenvolvimento estratégico focado em performance, design e conversão.',
      description:
        'Tudo o que você precisa para ter presença, autoridade e resultados reais online. Cada serviço é criado para resolver um problema específico — rápido, moderno e otimizado para mecanismos de busca.',
      viewAll: 'Saiba mais',
      ctaTitle: 'Não sabe qual serviço atende ao que você precisa?',
      ctaSubtitle:
        'Me envie uma mensagem e eu te ajudo a escolher o melhor caminho para o seu projeto.',
    },
    landingPages: {
      proofTitle: "Projetos que já estão no ar",
      formTitle: "Peça seu orçamento",
      formSubtitle: "Só dois campos. A conversa continua no WhatsApp.",
      formName: "Seu nome",
      formOffer: "O que você quer vender ou divulgar?",
      formOfferPlaceholder: "Ex.: um curso, uma consultoria, um lançamento",
      messageIntro: "Olá, Breno! Quero uma landing page.",
      messageName: "Nome",
      messageOffer: "Oferta",
      anatomyTitle: 'Anatomia de uma página que converte',
      anatomySubtitle: 'Cada bloco tem uma função. Veja o que cada parte da sua landing page faz para levar o visitante até a ação.',
      anatomy: {
        '1': {
          title: 'Título',
          text: 'Uma promessa clara que diz ao visitante, em segundos, o que ele ganha e por que isso importa.',
        },
        '2': {
          title: 'Prova social',
          text: 'Depoimentos, logos e números que mostram que outras pessoas já confiam em você.',
        },
        '3': {
          title: 'Oferta e benefícios',
          text: 'O que está incluso, apresentado como resultado para o cliente, e não como lista de recursos.',
        },
        '4': {
          title: 'Formulário',
          text: 'Apenas os campos realmente necessários, para que preencher seja fácil.',
        },
        '5': {
          title: 'Chamada para ação',
          text: 'Uma única ação, repetida nos momentos certos, com um botão impossível de ignorar.',
        },
      },
      timeline: {
        '1': 'Dia 1',
        '2': 'Dias 2–3',
        '3': 'Dias 3–6',
        '4': 'Dia 7+',
      },
      name: 'Landing Pages',
      shortDescription:
        'Páginas de alta conversão, projetadas para transformar visitantes em leads e vendas.',
      tagline: 'Páginas focadas em conversão',
      heroTitle: 'Landing pages que transformam visitantes em clientes',
      intro:
        'Uma landing page é uma página focada, com um único propósito: guiar o visitante para uma ação clara — comprar, se cadastrar, agendar ou solicitar um orçamento. Ao contrário de um site completo, ela elimina distrações e concentra toda a energia em conversão.',
      introP2:
        'Cada elemento — título, texto, imagens, formulário e chamada para ação — é criado e testado para levar o visitante ao longo da jornada. O resultado é uma página que funciona como um vendedor que nunca dorme.',
      benefitsTitle: 'Por que investir em uma landing page',
      benefits: {
        '1': {
          title: 'Mais leads',
          text: 'Uma chamada clara e um formulário otimizado captam mais contatos com o mesmo tráfego.',
        },
        '2': {
          title: 'Melhor taxa de conversão',
          text: 'Texto e layout focados aumentam o percentual de visitantes que realmente agem.',
        },
        '3': {
          title: 'Resultados mais rápidos',
          text: 'Uma única página vai ao ar em dias, não meses — e você já pode começar a testar.',
        },
        '4': {
          title: 'Performance mensurável',
          text: 'Cada clique, visualização e envio é monitorado, então você sabe exatamente o que funciona.',
        },
      },
      detailsTitle: 'O que entrego em cada landing page',
      details: {
        '1': {
          title: 'Estratégia antes dos pixels',
          text: 'Começamos definindo sua oferta, seu público e a ação única que você deseja. A estrutura, o texto e o design são construídos em torno desse objetivo — e não em torno do que apenas parece bonito.',
        },
        '2': {
          title: 'Copywriting que vende',
          text: 'Títulos, subtítulos, bullets e chamadas são escritos para persuadir. Uso frameworks comprovados para guiar o visitante da atenção até a ação.',
        },
        '3': {
          title: 'Velocidade, SEO e mobile',
          text: 'As páginas carregam em menos de um segundo, seguem as melhores práticas de SEO e ficam impecáveis em qualquer dispositivo — porque a maior parte do seu tráfego vem do celular.',
        },
      },
      processTitle: 'Como funciona o processo',
      process: {
        '1': {
          title: 'Chamada de descoberta',
          text: 'Conversamos sobre seu negócio, seu público e seus objetivos. Eu mapeio a oferta e a mensagem principal.',
        },
        '2': {
          title: 'Design',
          text: 'Você recebe um protótipo visual da página para aprovar antes de escrever qualquer código.',
        },
        '3': {
          title: 'Desenvolvimento',
          text: 'A página é construída rápida, responsiva e otimizada para conversão.',
        },
        '4': {
          title: 'Lançamento e melhorias',
          text: 'Vamos ao ar, acompanhamos os resultados e refinamos a página para melhorar o desempenho ao longo do tempo.',
        },
      },
      faqTitle: 'Perguntas frequentes',
      faqs: {
        '1': {
          q: 'Quanto tempo leva?',
          a: 'Uma landing page típica leva de 3 a 7 dias, dependendo do escopo e do conteúdo.',
        },
        '2': {
          q: 'Preciso escrever o conteúdo?',
          a: 'Posso escrever o texto para você ou trabalhar com material que você já tem. Você aprova tudo antes do lançamento.',
        },
        '3': {
          q: 'Posso mudar depois?',
          a: 'Sim. A página é construída com uma estrutura fácil de editar e ofereço suporte após o lançamento.',
        },
      },
      ctaTitle: 'Pronto para transformar tráfego em clientes?',
      ctaSubtitle: 'Vamos criar uma landing page que se paga sozinha.',
    },
    websitesForFreelancers: {
      compareTitle: 'Só redes sociais × seu próprio site',
      compareWithoutTitle: 'Só redes sociais',
      compareWithTitle: 'Com seu próprio site',
      compareWithout: {
        '1': 'Seu alcance depende do algoritmo',
        '2': 'Informações sobre seus serviços ficam espalhadas pelos posts',
        '3': 'O cliente precisa te chamar para perguntar o básico',
        '4': 'Seu perfil pode ser limitado ou perdido a qualquer momento',
      },
      compareWith: {
        '1': 'Clientes te encontram no Google quando buscam pelo que você faz',
        '2': 'Serviços, valores e processo explicados em um só lugar',
        '3': 'Dúvidas respondidas antes da primeira mensagem',
        '4': 'Um endereço que é seu, para sempre',
      },
      pagesTitle: 'Páginas que seu site pode ter',
      pagesSubtitle: 'Uma estrutura simples que responde ao que todo cliente em potencial quer saber.',
      pages: {
        '1': {
          title: 'Início',
          text: 'Quem você é, o que faz e como te contratar — de relance.',
        },
        '2': {
          title: 'Serviços',
          text: 'Cada serviço explicado, com o que está incluso e como funciona.',
        },
        '3': {
          title: 'Sobre',
          text: 'Sua história, experiência e o seu jeito de trabalhar.',
        },
        '4': {
          title: 'Portfólio',
          text: 'Projetos e resultados reais que comprovam sua habilidade.',
        },
        '5': {
          title: 'Contato',
          text: 'WhatsApp, formulário e agendamento a um clique.',
        },
      },
      name: 'Sites para Autônomos',
      shortDescription:
        'Sites profissionais que geram confiança e conquistam mais clientes.',
      tagline: 'Seu cartão de visitas digital',
      heroTitle: 'Um site profissional que conquista clientes',
      intro:
        'Como autônomo, seu site costuma ser a primeira impressão que você causa em um cliente em potencial. Um site profissional faz mais do que parecer bonito — ele explica o que você faz, mostra provas do seu trabalho e facilita a contratação.',
      introP2:
        'A maioria dos autônomos depende do Instagram ou do boca a boca. Um site te dá um lugar central e confiável para direcionar as pessoas — e continua trabalhando enquanto você dorme, respondendo perguntas e gerando oportunidades.',
      benefitsTitle: 'O que um site faz por você',
      benefits: {
        '1': {
          title: 'Credibilidade',
          text: 'Um site profissional faz você parecer estabelecido e confiável.',
        },
        '2': {
          title: 'Leads no piloto automático',
          text: 'Visitantes te encontram, entendem seu valor e entram em contato — mesmo fora do horário comercial.',
        },
        '3': {
          title: 'Um portfólio que vende',
          text: 'Mostre seus melhores trabalhos com estudos de caso que convencem novos clientes.',
        },
        '4': {
          title: 'Tenha seu público',
          text: 'Pare de depender das redes sociais. Seu site, suas regras, seus dados.',
        },
      },
      detailsTitle: 'O que eu entrego',
      details: {
        '1': {
          title: 'Posicionamento claro',
          text: 'Definimos o que te torna diferente e colocamos isso no centro de todas as páginas.',
        },
        '2': {
          title: 'Serviços e preços',
          text: 'Páginas claras explicando seus serviços, processo e valores reduzem atritos e atraem melhores clientes.',
        },
        '3': {
          title: 'Contato e agendamento',
          text: 'Botões de WhatsApp, formulários e agendamento para o cliente te alcançar com um clique.',
        },
      },
      processTitle: 'Como funciona o processo',
      process: {
        '1': {
          title: 'Descoberta',
          text: 'Mapeamos seus serviços, seu público e seus objetivos em uma conversa curta.',
        },
        '2': {
          title: 'Design',
          text: 'Você aprova a aparência e a estrutura antes de uma única linha de código.',
        },
        '3': {
          title: 'Desenvolvimento',
          text: 'Seu site é construído rápido, responsivo e pronto para os mecanismos de busca.',
        },
        '4': {
          title: 'Lançamento',
          text: 'Publicamos, conectamos seu domínio e deixamos o site fácil de manter.',
        },
      },
      faqTitle: 'Perguntas frequentes',
      faqs: {
        '1': {
          q: 'Preciso de site se já tenho Instagram?',
          a: 'O Instagram ajuda na visibilidade, mas um site te dá credibilidade, controle e melhor conversão. Os dois funcionam melhor juntos.',
        },
        '2': {
          q: 'Você pode copiar o design do meu concorrente?',
          a: 'Crio um design único para a sua marca. Copiar prejudica sua credibilidade e seu SEO.',
        },
        '3': {
          q: 'Você ajuda com domínio e hospedagem?',
          a: 'Sim, cuido de toda a parte técnica para você focar apenas no seu trabalho.',
        },
      },
      ctaTitle: 'Vamos construir sua presença profissional',
      ctaSubtitle: 'Me envie uma mensagem e vamos planejar seu site.',
    },
    blogsAndPortfolios: {
      splitTitle: 'Dois formatos, um objetivo: ser lembrado',
      portfolio: {
        title: 'Portfólio',
        text: 'Para quando seu trabalho fala por si e precisa ser visto da melhor forma.',
        items: {
          '1': 'Páginas de projeto com imagens, contexto e resultados',
          '2': 'Filtros por categoria ou tipo de trabalho',
          '3': 'Depoimentos de clientes junto a cada projeto',
        },
      },
      blog: {
        title: 'Blog',
        text: 'Para quando seu conhecimento é o diferencial e você quer ser encontrado nas buscas.',
        items: {
          '1': 'Artigos organizados por categorias e tags',
          '2': 'Estrutura pronta para SEO em cada post',
          '3': 'Cadastro de newsletter para manter os leitores por perto',
        },
      },
      chapter: 'Capítulo',
      name: 'Blogs e Portfólios',
      shortDescription:
        'Mostre seu trabalho, compartilhe conhecimento e atraia seu público ideal.',
      tagline: 'Conteúdo e vitrine, juntos',
      heroTitle:
        'Um lugar para mostrar seu trabalho e compartilhar seu conhecimento',
      intro:
        'Um portfólio ou blog é mais do que uma coleção de projetos ou artigos — é uma ferramenta que trabalha por você. Ela atrai pessoas interessadas no que você faz, constrói autoridade na sua área e transforma leitores em clientes.',
      introP2:
        'Eu projeto e construo sites onde seu trabalho brilha: rápidos, bonitos, fáceis de atualizar e estruturados para que os mecanismos de busca te encontrem.',
      benefitsTitle: 'Por que ter um blog ou portfólio',
      benefits: {
        '1': {
          title: 'Autoridade',
          text: 'Conteúdo consistente e de qualidade posiciona você como referência na sua área.',
        },
        '2': {
          title: 'Tráfego orgânico',
          text: 'Artigos otimizados para busca atraem visitantes que já procuram pelos seus serviços.',
        },
        '3': {
          title: 'Mostre, não conte',
          text: 'Um portfólio bem estruturado prova sua habilidade melhor do que qualquer discurso.',
        },
        '4': {
          title: 'Atualizações fáceis',
          text: 'Adicionar um projeto ou post leva minutos, não um desenvolvedor.',
        },
      },
      detailsTitle: 'O que eu entrego',
      details: {
        '1': {
          title: 'Vitrines bonitas',
          text: 'Projetos apresentados com imagens, descrições e resultados — feitos para impressionar clientes e parceiros.',
        },
        '2': {
          title: 'Um blog que cresce',
          text: 'Estrutura editorial com categorias, tags e bases de SEO para que cada post continue trabalhando por você.',
        },
        '3': {
          title: 'Feito para ser mantido',
          text: 'Edição simples para que você seja dono do seu conteúdo e nunca dependa de um desenvolvedor para pequenas mudanças.',
        },
      },
      processTitle: 'Como funciona o processo',
      process: {
        '1': {
          title: 'Objetivos',
          text: 'Definimos o que você quer atrair: clientes, leitores ou os dois.',
        },
        '2': {
          title: 'Estrutura',
          text: 'Mapeio as seções, categorias e páginas que fazem sentido para o seu conteúdo.',
        },
        '3': {
          title: 'Design e construção',
          text: 'Seu site é criado pensando no seu estilo e no seu público.',
        },
        '4': {
          title: 'Treinamento',
          text: 'Você aprende a publicar e editar conteúdo por conta própria, sem código.',
        },
      },
      faqTitle: 'Perguntas frequentes',
      faqs: {
        '1': {
          q: 'Preciso saber escrever?',
          a: 'Não. Eu te ajudo a estruturar suas ideias, e você também pode me contratar para escrever os primeiros artigos.',
        },
        '2': {
          q: 'Posso atualizar sozinho?',
          a: 'Sim. O site é construído para que você adicione projetos e posts sem tocar em uma linha de código.',
        },
        '3': {
          q: 'Você também escreve o conteúdo?',
          a: 'Sim, posso criar os textos do seu portfólio e os primeiros posts do blog.',
        },
      },
      ctaTitle: 'Seu trabalho merece um palco',
      ctaSubtitle: 'Vamos criar um portfólio que traz oportunidades para você.',
    },
    integrations: {
      hubCenter: 'Seu site',
      tools: {
        '1': 'WhatsApp',
        '2': 'E-mail',
        '3': 'CRM',
        '4': 'Pagamentos',
        '5': 'Planilhas',
        '6': 'Analytics',
      },
      flowTitle: 'Como isso funciona na prática',
      flowSubtitle: 'Um único envio de formulário pode disparar tudo o que antes era feito à mão.',
      flow: {
        '1': {
          label: 'Gatilho',
          title: 'Um visitante preenche o formulário',
          text: 'Nome, contato e interesse são capturados no seu site.',
        },
        '2': {
          label: 'Automação',
          title: 'Os dados vão para onde precisam',
          text: 'O lead é salvo no seu CRM ou planilha e você recebe um alerta no WhatsApp.',
        },
        '3': {
          label: 'Resultado',
          title: 'Você responde em minutos',
          text: 'O visitante recebe um e-mail de confirmação e você faz o contato enquanto o interesse está alto.',
        },
      },
      name: 'Integrações',
      shortDescription:
        'Formulários, e-mail marketing, WhatsApp, pagamentos e muito mais.',
      tagline: 'Faça tudo trabalhar junto',
      heroTitle: 'Integrações que conectam seu site ao seu negócio',
      intro:
        'Um site bonito é só parte da equação. Para gerar resultados reais, ele precisa conversar com as ferramentas que você já usa: e-mail, CRM, pagamentos, notificações e muito mais. É exatamente para isso que servem as integrações.',
      introP2:
        'Eu conecto seu site aos serviços que movem o seu negócio — automatizando tarefas, reduzindo erros e garantindo que nenhum lead se perca.',
      benefitsTitle: 'Por que integrar seus sistemas',
      benefits: {
        '1': {
          title: 'Chega de trabalho manual',
          text: 'Os dados circulam automaticamente entre seu site e suas ferramentas.',
        },
        '2': {
          title: 'Nenhum lead perdido',
          text: 'Cada envio de formulário chega ao lugar certo, na hora.',
        },
        '3': {
          title: 'Follow-up automatizado',
          text: 'E-mails e mensagens são disparados automaticamente pelas ações do visitante.',
        },
        '4': {
          title: 'Dados em um só lugar',
          text: 'Tudo o que você precisa, sincronizado no seu CRM, planilha ou painel.',
        },
      },
      detailsTitle: 'O que posso conectar',
      details: {
        '1': {
          title: 'Formulários e e-mail marketing',
          text: 'Formulários de contato que alimentam sua lista de e-mails, automações e sequências de follow-up.',
        },
        '2': {
          title: 'WhatsApp e notificações',
          text: 'Alertas instantâneos para você nunca perder um lead, no WhatsApp, e-mail ou Telegram.',
        },
        '3': {
          title: 'Pagamentos e analytics',
          text: 'Checkout, links de pagamento, pixel e analytics para as suas campanhas.',
        },
      },
      processTitle: 'Como funciona o processo',
      process: {
        '1': {
          title: 'Auditoria',
          text: 'Listamos as ferramentas que você usa e o que precisa se comunicar entre si.',
        },
        '2': {
          title: 'Planejamento',
          text: 'Proponho a arquitetura mais simples que resolve o seu problema.',
        },
        '3': {
          title: 'Construção',
          text: 'As integrações são implementadas e testadas de ponta a ponta.',
        },
        '4': {
          title: 'Suporte',
          text: 'Você recebe documentação e suporte para tudo o que foi entregue.',
        },
      },
      faqTitle: 'Perguntas frequentes',
      faqs: {
        '1': {
          q: 'Quais ferramentas você suporta?',
          a: 'As mais populares: Google Sheets, Mailchimp, WhatsApp, Stripe, Mercado Pago, Telegram e outras.',
        },
        '2': {
          q: 'Você integra ferramentas que já uso?',
          a: 'Sim. Trabalho com o que você já tem e evito custos desnecessários.',
        },
        '3': {
          q: 'É seguro?',
          a: 'Sim. Sigo boas práticas de segurança e nunca guardo dados sensíveis sem necessidade real.',
        },
      },
      ctaTitle: 'Vamos conectar seus sistemas',
      ctaSubtitle: 'Me diga o que você usa e eu faço tudo conversar.',
    },
  },
  queens: {
    queens: 'Rainhas',
    level: 'Nível',
    'level-1': 'Iniciante',
    'level-2': 'Fácil',
    'level-3': 'Médio',
    'level-4': 'Difícil',
    'level-5': 'Expert',
    hint: 'Dica',
    congratulations: 'Parabéns! Puzzle resolvido!',
    'check-errors': 'Verifique violações das regras',
    loading: 'Carregando...',
    'how-to-play': 'Como Jogar',
    'rule-row': 'Coloque exatamente uma rainha em cada linha.',
    'rule-col': 'Coloque exatamente uma rainha em cada coluna.',
    'rule-region':
      'Coloque exatamente uma rainha em cada região colorida.',
    'rule-adjacent': 'Duas rainhas não podem se tocar, nem na diagonal.',
    'tip-tap': 'Toque ou clique numa casa uma vez para marcar ✕, de novo para colocar ♛ e mais uma vez para limpar.',
    'tip-x': 'Arraste o dedo ou o mouse sobre as casas para marcar ✕ em todas de uma só vez. Comece o traço sobre um ✕ para apagar as marcas. O traço nunca mexe nas rainhas.',
    'tip-slide': 'Ative o Auto ✕ para ver as casas que cada rainha elimina. No teclado, use as setas e o Espaço.',
    'faq-title': 'Perguntas Frequentes',
    'faq-q1': 'O que é o jogo Rainhas?',
    'faq-a1':
      'Rainhas é um quebra-cabeça de lógica onde você posiciona rainhas no tabuleiro de modo que cada linha, coluna e região colorida contenha exatamente uma rainha, e nenhuma rainha se toque.',
    'faq-q2': 'Como jogar?',
    'faq-a2': 'Toque numa casa para alternar entre marcação ✕ → rainha ♛ → vazio, ou arraste pelo tabuleiro para marcar várias casas com ✕ de uma vez. Violações das regras ficam em vermelho e você pode desfazer qualquer jogada.',
    'faq-q3': 'O que acontece se eu errar?',
    'faq-a3':
      'Rainhas em conflito são destacadas em vermelho. Revise e ajuste até que todas as regras sejam cumpridas. Não há limite de jogadas!',
    'faq-q4': 'Tem um puzzle novo todo dia?',
    'faq-a4': 'Sim! O tabuleiro Diário é gerado a partir da data, então todo mundo recebe o mesmo desafio no dia. Escolha Aleatório ou Novo jogo para tabuleiros extras ilimitados e compartilhe seu tempo ao terminar.',
    'seo-title':
      'Jogue Rainhas — Quebra-cabeça de Lógica Diário',
    'seo-p1':
      'Rainhas é um puzzle de lógica diário inspirado no problema clássico das N-Rainhas. Coloque rainhas no tabuleiro seguindo quatro regras simples: uma rainha por linha, uma por coluna, uma por região colorida, e nenhuma rainha pode se tocar.',
    'seo-p2':
      'Escolha entre 5 níveis de dificuldade — Iniciante (5×5), Fácil (6×6), Médio (7×7), Difícil (8×8) e Expert (10×10). Cada puzzle é gerado deterministicamente a partir da data, então todos recebem o mesmo desafio diário.',
    'seo-p3':
      'Jogue online gratuitamente, sem necessidade de cadastro. Treine seu raciocínio lógico e habilidades de reconhecimento de padrões. Um novo puzzle espera por você todos os dias!',
    mode: 'Tabuleiro',
    'mode-daily': 'Diário',
    'mode-random': 'Aleatório',
    undo: 'Desfazer',
    clear: 'Limpar',
    'auto-x': 'Auto ✕',
    'auto-x-title': 'Mostrar ✕ automaticamente nas casas que suas rainhas eliminam',
    'hints-left': 'Dicas restantes',
    'hints-used': 'Dicas',
    'tip-short': 'Toque: ✕ → ♛ → vazio. Arraste para marcar vários ✕.',
    'solved-summary': 'Resolvido em',
    'share-text': '👑 Resolvi o Queens ({puzzle}) em ⏱ {time} usando 💡 {hints} dicas!',
    'cell-label': 'Linha {row}, coluna {col}',
    'cell-queen': 'rainha',
    'cell-x': 'marcada com ✕',
    'cell-empty': 'vazia',
    'board-label': 'Tabuleiro do Queens. Setas movem, Espaço ou Enter alterna ✕ / rainha, Delete limpa.',
    undone: 'Jogada desfeita.',
  },
  sudoku: {
    sudoku: 'Sudoku',
    size: 'Grade',
    'size-4': '4×4 Mini',
    'size-6': '6×6',
    'size-9': '9×9 Clássico',
    difficulty: 'Dificuldade',
    'difficulty-0': 'Fácil',
    'difficulty-1': 'Médio',
    'difficulty-2': 'Difícil',
    notes: 'Notas',
    eraser: 'Apagar',
    undo: 'Desfazer',
    hint: 'Dica',
    mistakes: 'Erros',
    congratulations: 'Parabéns! Puzzle resolvido!',
    loading: 'Carregando...',
    'keyboard-hint':
      'Dica: use as setas do teclado para navegar pela grade, os números para preencher, N para alternar notas e Delete para apagar.',
    'how-to-play': 'Como Jogar',
    'rule-1':
      'Cada linha deve conter cada número de 1 a N exatamente uma vez.',
    'rule-2':
      'Cada coluna deve conter cada número de 1 a N exatamente uma vez.',
    'rule-3':
      'Cada bloco destacado deve conter cada número de 1 a N exatamente uma vez.',
    'tip-1':
      'Comece pelos blocos que já têm mais números e procure, em cada linha, coluna e bloco, células com apenas um valor possível.',
    'tip-2':
      'Use as Notas para anotar números candidatos. Elas aparecem como dígitos pequenos e ajudam a acompanhar as possibilidades.',
    'tip-3':
      'Jogue com o mouse, a tela de toque ou o teclado. Números repetidos na mesma linha, coluna ou bloco são destacados em vermelho.',
    'strategy-title': 'Dicas e Estratégias',
    'strategy-p1':
      'Procure candidatos únicos: se apenas um número cabe numa célula, preencha na hora. Essa é a técnica mais importante para iniciantes.',
    'strategy-p2':
      'Analise linhas, colunas e blocos em busca de números ausentes. Quando um número já está em dois blocos de uma linha, o terceiro costuma dar uma pista de graça.',
    'strategy-p3':
      'Use marcas de lápis. Anote todos os números possíveis em cada célula e elimine um a um conforme resolve. Isso transforma puzzles difíceis em um processo simples.',
    'strategy-p4':
      'Pratique um pouco todos os dias. Jogar Sudoku com regularidade melhora a concentração, o reconhecimento de padrões e a memória de curto prazo — e ainda relaxa.',
    'faq-title': 'Perguntas Frequentes',
    'faq-q1': 'O que é Sudoku?',
    'faq-a1':
      'Sudoku é um puzzle de lógica baseado em números. O objetivo é preencher a grade para que cada linha, coluna e bloco contenha cada número de 1 a N exatamente uma vez. Não precisa de matemática — só lógica.',
    'faq-q2': 'Como jogar Sudoku?',
    'faq-a2':
      'Escolha o tamanho da grade (4×4, 6×6 ou 9×9), selecione uma dificuldade e toque numa célula para selecioná-la. Depois digite um número usando o teclado na tela ou o teclado do computador. Cada puzzle tem exatamente uma solução.',
    'faq-q3': 'O que significam os tamanhos de grade?',
    'faq-a3':
      '4×4 é um mini-Sudoku perfeito para iniciantes e crianças, 6×6 é um desafio compacto e 9×9 é o Sudoku clássico jogado no mundo inteiro. Cada tamanho usa números de 1 a N.',
    'faq-q4': 'Sudoku faz bem para o cérebro?',
    'faq-a4':
      'Sim. O Sudoku treina raciocínio lógico, concentração e memória, e estudos sugerem que resolver puzzles com regularidade mantém a mente afiada. Também é uma pausa calma e produtiva longe das redes sociais.',
    'faq-q5': 'Este Sudoku é realmente grátis?',
    'faq-a5':
      'Sim, 100% grátis. Sem cadastro, sem downloads e sem limite de tempo. Você pode jogar Sudoku online direto no navegador, em qualquer dispositivo.',
    'seo-title':
      'Jogue Sudoku Online — Gerador de Mini Sudoku Grátis',
    'seo-p1':
      'Bem-vindo ao nosso gerador de Sudoku online grátis. Jogue Sudoku online no seu navegador com três tamanhos de grade — 4×4 mini, 6×6 e o clássico 9×9 — e três níveis de dificuldade, de aquecimentos fáceis a desafios difíceis.',
    'seo-p2':
      'Cada jogo é gerado na hora com uma solução única, então você sempre recebe um puzzle justo e solucionável. Escolha sua grade favorita, ajuste a dificuldade e clique em Novo Jogo para receber um tabuleiro novo em um segundo.',
    'seo-p3':
      'O Sudoku é um dos puzzles de lógica mais populares do mundo. Ele treina o raciocínio, afia a concentração e é perfeito para uma pausa rápida. E o melhor: nosso Sudoku funciona no celular, no tablet e no computador, sem instalar nada.',
    'seo-p4':
      'Se você quer ensinar crianças com uma grade mini 4×4, aquecer com um 6×6 fácil ou se testar com um 9×9 difícil, pode jogar Sudoku online aqui a qualquer hora. Notas, dicas, desfazer, atalhos de teclado e destaque de erros tornam cada partida fácil de aproveitar.',
    'seo-p5':
      'Salve esta página nos favoritos e volte sempre que precisar de um treino mental. Jogue Sudoku online grátis, melhore sua lógica e divirta-se — um quadro por vez.',
    'hints-left': 'Dicas restantes',
    'hints-used': 'Dicas',
    'notes-on': 'Notas ativadas: os números entram como anotações.',
    'select-first': 'Selecione uma casa primeiro.',
    'given-cell': 'Esse número faz parte do desafio.',
    empty: 'vazia',
    'cell-label': 'Linha {row}, coluna {col}',
    'board-label': 'Grade do Sudoku. Setas movem, números preenchem, N alterna notas, Delete apaga.',
    'share-text': '🧩 Resolvi um Sudoku {size} ({level}) em ⏱ {time} com {mistakes} erros e 💡 {hints} dicas!',
  },
  wordLadder: {
    name: 'Escada de Palavras',
    home: 'Início',
    intro:
      'Mude uma letra por vez para transformar a palavra inicial na palavra-alvo. Cada passo deve ser uma palavra real em inglês. Jogue grátis no navegador, com puzzles diários e três níveis de dificuldade.',
    mode: 'Modo',
    'mode-classic': 'Clássico',
    'mode-daily': 'Diário',
    difficulty: 'Dificuldade',
    'difficulty-easy': 'Fácil',
    'difficulty-medium': 'Médio',
    'difficulty-hard': 'Difícil',
    'daily-today': 'Escada de Palavras de Hoje',
    moves: 'Jogadas',
    best: 'Recorde',
    target: 'Alvo',
    'daily-done':
      'Você já resolveu o puzzle de hoje. Volte amanhã para um novo!',
    start: 'Início',
    'your-move': 'Sua próxima palavra',
    'input-placeholder': 'PALAVRA',
    submit: 'Ir',
    hint: 'Dica',
    undo: 'Desfazer',
    'err-empty': 'Digite uma palavra primeiro.',
    'err-length': 'A palavra deve ter o mesmo tamanho da palavra inicial.',
    'err-dictionary':
      'Essa palavra não está no nosso dicionário. Tente outra.',
    'err-one-letter': 'Mude exatamente uma letra.',
    'hint-text':
      'Pense em uma palavra que está a uma letra da sua palavra atual.',
    'hint-1': 'Sua próxima palavra começa com {letter}.',
    'hint-2': 'Tente mudar a letra na posição {position}.',
    'hint-3': 'Uma próxima palavra possível é {word}.',
    'live-move': 'Agora em {word}.',
    'live-undo': 'Jogada desfeita.',
    complete: 'Escada de Palavras Completa!',
    'result-moves':
      'Você transformou a palavra inicial na palavra-alvo. Excelente!',
    'daily-streak': 'Sequência diária:',
    'next-puzzle': 'Próximo Puzzle',
    'how-to-play': 'Como Jogar Escada de Palavras',
    'rule-1': 'Comece pela palavra azul no topo da escada.',
    'rule-2':
      'Digite uma nova palavra que difira da sua palavra atual em exatamente uma letra.',
    'rule-3': 'Toda palavra digitada deve ser uma palavra real em inglês.',
    'rule-4':
      'Continue, um passo por vez, até chegar à palavra-alvo em âmbar.',
    'rule-5':
      'Tente terminar com o menor número de jogadas para bater seu recorde.',
    'rules-title': 'Regras Oficiais da Escada de Palavras',
    'rules-p1':
      'Uma escada de palavras é resolvida quando você transforma a palavra inicial na palavra-alvo usando apenas palavras reais, mudando exatamente uma letra a cada passo. Por exemplo, CAT → COT → COG → DOG.',
    'rules-p2':
      'Você pode mudar a posição da letra e o seu valor, mas apenas uma letra pode mudar por jogada. Você pode usar uma dica (até três por jogo) se travar, e desfazer uma jogada a qualquer momento.',
    'rules-p3':
      'No modo Clássico você escolhe a dificuldade e joga quantos puzzles quiser. No modo Diário há um puzzle compartilhado por dia, e completá-lo mantém sua sequência.',
    'tips-title': 'Dicas e Estratégias',
    'tip-1':
      'Foque nas vogais. Palavras que diferem por uma única vogal quase sempre são válidas, e as vogais abrem mais caminhos.',
    'tip-2':
      'Trabalhe de trás para frente a partir da palavra-alvo também. Muitas vezes o melhor caminho fica claro quando você planeja das duas pontas.',
    'tip-3':
      'Preste atenção nas posições das letras. Mudar uma letra perto do fim da palavra costuma manter mais opções abertas.',
    'tip-4':
      'Procure padrões comuns como -ATE, -ING ou -IDE. Reutilizar um padrão permite cruzar várias palavras rapidamente.',
    'tip-5':
      'Use suas três dicas com sabedoria. A última dica revela a próxima palavra exata, o que é muito valioso em puzzles difíceis.',
    'whatis-title': 'O Que É uma Escada de Palavras?',
    'whatis-p1':
      'A escada de palavras é um puzzle de palavras inventado por Lewis Carroll em 1877, que o chamou de Doublets. Você começa com duas palavras do mesmo tamanho e as conecta por uma cadeia de palavras reais, mudando uma letra por vez.',
    'whatis-p2':
      'Por exemplo, transformar COLD em WARM pode ser COLD → CORD → WORD → WARD → WARM. O puzzle é popular nas escolas porque desenvolve ortografia, vocabulário e raciocínio lógico de forma divertida.',
    'levels-title': 'Níveis de Dificuldade',
    'levels-easy': 'Fácil:',
    'levels-easy-p':
      'Cadeias curtas de 2 a 4 jogadas entre palavras muito comuns. Perfeito para crianças e iniciantes.',
    'levels-medium': 'Médio:',
    'levels-medium-p':
      'Cadeias de 5 a 7 jogadas. Um bom treino diário para quem joga com frequência.',
    'levels-hard': 'Difícil:',
    'levels-hard-p':
      'Cadeias longas de 8 jogadas ou mais. Só os fãs mais afiados de palavras vão resolver estas.',
    'kids-title': 'Escada de Palavras para Crianças',
    'kids-p1':
      'Escadas de palavras são uma atividade fantástica para crianças que estão aprendendo a ler e soletrar. Cada jogada exige comparar letras, soletrar e pensar no vocabulário, tudo enquanto jogam.',
    'kids-p2':
      'Comece as crianças no modo Fácil, onde palavras curtas como CAT e DOG se conectam em poucas jogadas. É uma atividade tranquila, própria para telas e, secretamente, educativa.',
    'faq-title': 'Perguntas Frequentes',
    'faq-q1': 'O que é o jogo Escada de Palavras?',
    'faq-a1':
      'Uma escada de palavras é um puzzle em que você transforma uma palavra em outra mudando uma única letra por vez, usando uma palavra real a cada passo. Foi inventado por Lewis Carroll em 1877.',
    'faq-q2': 'Como se joga Escada de Palavras?',
    'faq-a2':
      'Comece pela palavra inicial azul e digite palavras que difiram da anterior por exatamente uma letra. Continue até chegar à palavra-alvo âmbar. Quanto menos jogadas, melhor.',
    'faq-q3': 'Quais são as regras da Escada de Palavras?',
    'faq-a3':
      'Cada jogada muda exatamente uma letra, e toda palavra deve ser uma palavra real em inglês do mesmo tamanho das palavras inicial e alvo. Você não pode repetir uma palavra que já está na sua escada.',
    'faq-q4': 'Posso mudar mais de uma letra em uma escada de palavras?',
    'faq-a4':
      'Não. Exatamente uma letra pode mudar por jogada. Mudar duas ou mais letras de uma vez quebra as regras do puzzle.',
    'faq-q5': 'O que torna uma escada de palavras difícil?',
    'faq-a5':
      'A dificuldade depende da distância entre as duas palavras, de quantas palavras reais existem entre elas e de como é fácil ficar preso em becos sem saída no caminho.',
    'faq-q6': 'Escadas de palavras são boas para crianças?',
    'faq-a6':
      'Sim. Escadas de palavras são muito usadas nas escolas para praticar ortografia, correspondência entre letra e som e vocabulário, e são uma atividade de tela calma e educativa.',
    'faq-q7': 'Este jogo de Escada de Palavras é gratuito?',
    'faq-a7':
      'Sim, completamente gratuito. Sem cadastro, sem downloads e sem limite de tempo. Jogue no navegador em qualquer dispositivo, inclusive no celular.',
    'related-title': 'Mais Jogos Online Grátis',
    'related-p':
      'Se você gosta de puzzles de palavras, experimente nossos outros jogos de lógica grátis — todos funcionam no celular e no computador.',
    'related-sudoku':
      'Puzzle de lógica clássico com três tamanhos de grade.',
    'related-queens':
      'Um puzzle de posicionamento diário inspirado nas N-Rainhas.',
    'share-text': '🪜 Escada de Palavras ({label}): {start} → {target} em {moves} jogadas (par {par}) · ⏱ {time} · 💡 {hints} dicas',
    par: 'Par',
    'par-hint': 'O número depois da barra é o par: a menor escada possível.',
    history: 'Sua escada até agora',
    'history-empty': 'Suas palavras se acumulam aqui, a mais nova logo acima do campo.',
  },
  seo: {
    cardTagline: 'Sites, landing pages e automação',
    home: {
      title: 'Breno Carvalho — Landing pages e sites que convertem',
      description: 'Landing pages e sites rápidos, modernos e otimizados para o Google, feitos para transformar visitantes em clientes. Design, desenvolvimento, hospedagem e automação.',
    },
    services: {
      title: 'Criação de sites e landing pages profissionais',
      description: 'Landing pages, sites profissionais, blogs, portfólios e integrações com WhatsApp, CRM e pagamentos. Encontre o serviço certo para o seu negócio.',
    },
    landingPages: {
      title: 'Criação de landing pages que transformam visitantes em clientes',
      description: 'Landing pages de alta conversão com texto persuasivo, prova social e chamada para ação clara. Rápidas, pensadas para o celular e prontas para anúncios.',
    },
    websitesForFreelancers: {
      title: 'Sites profissionais para autônomos e profissionais liberais',
      description: 'Um site profissional que passa confiança e traz novos clientes: serviços, portfólio, depoimentos e contato pelo WhatsApp, rápido e fácil de achar no Google.',
    },
    blogsAndPortfolios: {
      title: 'Criação de blogs e portfólios para mostrar seu trabalho',
      description: 'Um blog ou portfólio para mostrar seu trabalho, publicar conteúdo e atrair o público certo, com SEO, carregamento rápido e atualização fácil.',
    },
    integrations: {
      title: 'Integração do site com WhatsApp, CRM, e-mail e pagamentos',
      description: 'Conecte seu site ao WhatsApp, CRM, e-mail marketing, pagamentos e planilhas para captar e acompanhar contatos automaticamente, sem trabalho manual.',
    },
    sudoku: {
      title: 'Sudoku online grátis com grades 4×4, 6×6 e 9×9',
      description: 'Jogue Sudoku grátis no navegador: grades 4×4, 6×6 e 9×9, três níveis de dificuldade, anotações, dicas e desfazer. Funciona no celular e no computador.',
    },
    queens: {
      title: 'Queens — jogo de lógica online grátis',
      description: 'Coloque uma rainha em cada linha, coluna e região colorida sem que duas se toquem. Cinco níveis de dificuldade e dicas. Jogue grátis online.',
    },
    wordLadder: {
      title: 'Word Ladder — jogo de palavras online grátis',
      description: 'Troque uma letra por vez para transformar a palavra inicial na palavra final. Desafio diário e três níveis de dificuldade, grátis no navegador.',
    },
  },
};
