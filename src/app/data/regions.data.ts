/** Region pages (`/regioes/<slug>`), in index order: the Baixada Santista from north to south, then São Paulo. */
import type { Region } from './regions/region.model';

export type { Region } from './regions/region.model';

const baixadaSantista: Region = {
  slug: 'baixada-santista',
  name: 'Baixada Santista',
  where: 'na Baixada Santista',
  group: 'baixada',
  isRegion: true,
  intro:
    'Criação de sites, landing pages, lojas virtuais e sistemas para empresas das nove cidades da Baixada Santista. Sites rápidos, que aparecem no Google e levam o cliente direto para o seu WhatsApp.',
  context:
    'Na Baixada muita gente mora numa cidade, trabalha em outra e contrata serviço na terceira. O movimento muda com a temporada, o porto e o polo industrial, e a busca no Google quase sempre leva o nome da cidade ou do bairro.',
  places: ['Bertioga', 'Guarujá', 'Santos', 'São Vicente', 'Cubatão', 'Praia Grande', 'Mongaguá', 'Itanhaém', 'Peruíbe'],
  opportunities: [
    {
      title: 'Página para cada cidade atendida',
      text: 'Quem atende Santos, São Vicente e Praia Grande precisa aparecer nas três buscas. Páginas por cidade, com bairros e exemplos reais, fazem isso sem parecer spam.',
    },
    {
      title: 'Atendimento automático na temporada',
      text: 'De dezembro a fevereiro a procura sobe nas cidades de praia. Um agente no WhatsApp responde preço e disponibilidade enquanto você está no serviço.',
    },
    {
      title: 'Sites institucionais para empresas do porto e da indústria',
      text: 'Fornecedores de logística e manutenção vendem para outras empresas. Site institucional claro, portfólio e integrações com o sistema do cliente pesam na escolha.',
    },
  ],
  segments: ['eletricista', 'ar-condicionado', 'advogado', 'contador', 'fotografo'],
  faq: [
    {
      question: 'Quais cidades da Baixada Santista você atende?',
      answer: 'Todas as nove: Bertioga, Guarujá, Santos, São Vicente, Cubatão, Praia Grande, Mongaguá, Itanhaém e Peruíbe. O trabalho é feito à distância, por WhatsApp e videochamada.',
    },
    {
      question: 'Vale a pena ter uma página para cada cidade?',
      answer: 'Vale quando cada página tem conteúdo próprio: bairros atendidos, prazos, fotos de trabalhos naquela cidade. Páginas copiadas trocando só o nome não ajudam e podem atrapalhar.',
    },
    {
      question: 'Meu cliente é de fora e só vem na temporada. Como ele me encontra?',
      answer: 'Pelo Google e pelo Google Maps, quase sempre buscando o serviço com o nome da cidade. Por isso o site e o perfil no Google precisam citar a cidade e os bairros que você atende.',
    },
  ],
  nearby: ['santos', 'praia-grande', 'guaruja', 'sao-vicente'],
};

const bertioga: Region = {
  slug: 'bertioga',
  name: 'Bertioga',
  where: 'em Bertioga',
  group: 'baixada',
  intro:
    'Criação de sites para prestadores de serviço, pousadas e comércios de Bertioga, da Riviera de São Lourenço a Boracéia. Site rápido, encontrado no Google e com orçamento direto pelo WhatsApp.',
  context:
    'Bertioga vive de casas de veraneio, condomínios e turismo, da Riviera de São Lourenço a Boracéia. Muitos proprietários moram na capital e procuram jardineiro, piscineiro ou eletricista pela internet antes de descer a serra.',
  places: ['Centro', 'Riviera de São Lourenço', 'Indaiá', 'Maitinga', 'Vista Linda', 'Rio da Praia', 'Costa do Sol', 'Boracéia'],
  opportunities: [
    {
      title: 'Site para quem contrata à distância',
      text: 'O cliente não está na cidade para pedir indicação ao vizinho. Fotos de trabalhos, preços de referência e avaliações fazem o papel da conversa no portão.',
    },
    {
      title: 'Planos de manutenção pelo site',
      text: 'Casa de temporada precisa de cuidado o ano todo. Um site com planos mensais e lembretes automáticos no WhatsApp transforma serviço avulso em contrato.',
    },
    {
      title: 'Sites para pousadas e passeios',
      text: 'Quem viaja compara opções no celular. Página rápida, fotos boas e reserva pelo WhatsApp evitam pagar comissão em tudo.',
    },
  ],
  segments: ['jardineiro', 'limpador-de-vidros', 'ar-condicionado', 'pintor'],
  faq: [
    {
      question: 'Meus clientes moram em São Paulo. O site ajuda mesmo assim?',
      answer: 'Ajuda mais: quem não está na cidade depende do que encontra na internet. Mostre os bairros e condomínios que você atende, fotos e como funciona o serviço com a casa fechada.',
    },
    {
      question: 'Dá para oferecer planos de manutenção pelo site?',
      answer: 'Sim. O site apresenta os planos e um fluxo automático pode lembrar o cliente das visitas e cobrar a mensalidade por Pix.',
    },
    {
      question: 'Atende também Guarujá e o litoral norte?',
      answer: 'Sim, o trabalho é remoto. Se você atende mais de uma cidade, o site pode ter uma página para cada uma.',
    },
  ],
  nearby: ['guaruja', 'santos', 'baixada-santista'],
};

const guaruja: Region = {
  slug: 'guaruja',
  name: 'Guarujá',
  where: 'no Guarujá',
  group: 'baixada',
  intro:
    'Criação de sites, lojas virtuais e SEO local para empresas do Guarujá e de Vicente de Carvalho. Site profissional, rápido e com orçamento direto pelo WhatsApp.',
  context:
    'O Guarujá tem dois ritmos: o turismo e as casas de veraneio da orla, de Pitangueiras a Pernambuco, e o comércio do dia a dia em Vicente de Carvalho. Os dois procuram serviço no Google, mas com buscas e expectativas bem diferentes.',
  places: ['Pitangueiras', 'Enseada', 'Astúrias', 'Tombo', 'Guaiúba', 'Pernambuco', 'Centro', 'Santa Rosa', 'Vicente de Carvalho', 'Perequê'],
  opportunities: [
    {
      title: 'Site profissional para clientes de alto padrão',
      text: 'Quem contrata serviço para casa de alto padrão escolhe pelo cuidado que enxerga. Um site bem feito, rápido e com portfólio já filtra o orçamento.',
    },
    {
      title: 'Páginas para Vicente de Carvalho e para a orla',
      text: 'Morador de Vicente de Carvalho e veranista da Enseada buscam coisas diferentes. Páginas separadas falam com cada um sem confundir o outro.',
    },
    {
      title: 'Atendimento automático no WhatsApp',
      text: 'No verão as mensagens chegam todas no sábado. Atendimento automático responde, qualifica e agenda sem você largar o serviço.',
    },
  ],
  segments: ['limpador-de-vidros', 'jardineiro', 'ar-condicionado', 'eletricista', 'fotografo'],
  faq: [
    {
      question: 'Vale fazer anúncio só na temporada?',
      answer: 'Pode valer, desde que o anúncio leve para uma página feita para ele, com uma oferta e um botão. Fora da temporada, o SEO local mantém o fluxo de contatos sem pagar por clique.',
    },
    {
      question: 'O site precisa estar em inglês ou espanhol?',
      answer: 'Depende do seu cliente. Para turismo e hospedagem, uma versão em inglês ou espanhol costuma valer. Para serviços residenciais, o português resolve.',
    },
    {
      question: 'Atende Vicente de Carvalho?',
      answer: 'Sim, e vale ter uma página própria: quem mora lá costuma buscar pelo nome do distrito, não por Guarujá.',
    },
  ],
  nearby: ['santos', 'bertioga', 'baixada-santista'],
};

const santos: Region = {
  slug: 'santos',
  name: 'Santos',
  where: 'em Santos',
  group: 'baixada',
  intro:
    'Criação de sites, landing pages, lojas virtuais, sistemas e automação para empresas e profissionais de Santos. Desenvolvedor web da cidade, com atendimento direto pelo WhatsApp.',
  context:
    'Santos concentra o comércio e os serviços da Baixada: clínicas e escritórios no Gonzaga e no Boqueirão, empresas ligadas ao porto no Macuco e no Centro, e prestadores que atendem a ilha inteira. A disputa por atenção é por bairro, e quase sempre começa no Google ou no Maps.',
  places: ['Gonzaga', 'Boqueirão', 'Ponta da Praia', 'Embaré', 'Aparecida', 'José Menino', 'Pompeia', 'Campo Grande', 'Vila Mathias', 'Marapé', 'Macuco', 'Centro'],
  opportunities: [
    {
      title: 'SEO local por bairro',
      text: 'Em Santos, ninguém quer atravessar a cidade. Mostrar o bairro onde você atende, com endereço e mapa, decide entre você e o concorrente da outra quadra.',
    },
    {
      title: 'Sites e integrações para empresas do porto',
      text: 'Despachantes, transportadoras e prestadores portuários vendem para outras empresas. Site institucional bilíngue e integrações entre sistemas encurtam a negociação.',
    },
    {
      title: 'Agendamento automático para consultórios e escritórios',
      text: 'Clínicas e escritórios recebem as mesmas perguntas todo dia. Agendamento automático e respostas prontas devolvem horas para a equipe.',
    },
  ],
  segments: ['advogado', 'ginecologista', 'contador', 'ar-condicionado', 'eletricista'],
  faq: [
    {
      question: 'Dá para fazer uma reunião presencial em Santos?',
      answer: 'Moro em Santos, então dá para combinar quando o projeto pede. Na maioria das vezes, WhatsApp e uma videochamada resolvem mais rápido.',
    },
    {
      question: 'Em quanto tempo meu site aparece no Google para "meu serviço + Santos"?',
      answer: 'O site entra no índice em dias, mas subir para a primeira página leva de 3 a 6 meses, dependendo da concorrência. O perfil no Google Meu Negócio costuma trazer contatos antes.',
    },
    {
      question: 'Vale a pena ter uma página para cada bairro?',
      answer: 'Para quem atende a ilha toda, páginas para os bairros com mais procura funcionam bem, desde que cada uma tenha conteúdo próprio e não apenas o nome trocado.',
    },
  ],
  nearby: ['sao-vicente', 'guaruja', 'cubatao', 'baixada-santista'],
};

const saoVicente: Region = {
  slug: 'sao-vicente',
  name: 'São Vicente',
  where: 'em São Vicente',
  group: 'baixada',
  intro:
    'Criação de sites para empresas, comércios e prestadores de serviço de São Vicente, da ilha à área continental. Site rápido, que aparece no Google e leva o cliente para o seu WhatsApp.',
  context:
    'A primeira vila do Brasil divide a ilha com Santos e tem um comércio de bairro forte, do Itararé à área continental. Como Santos domina as buscas da região, quem é de São Vicente precisa dizer com todas as letras onde atende.',
  places: ['Centro', 'Itararé', 'Gonzaguinha', 'Boa Vista', 'Vila Valença', 'Parque Bitaru', 'Catiapoã', 'Jardim Independência', 'Humaitá', 'Parque das Bandeiras'],
  opportunities: [
    {
      title: 'Aparecer na busca com o nome de São Vicente',
      text: 'Para buscas com "São Vicente", um site que cita a cidade, os bairros e mostra trabalhos feitos ali passa na frente de empresas que só falam de Santos.',
    },
    {
      title: 'Sites para empresas da área continental',
      text: 'Bairros como Humaitá e Parque das Bandeiras ficam longe da ilha e têm poucos prestadores na internet. Quem aparece primeiro ali leva o cliente.',
    },
    {
      title: 'Site com botão de WhatsApp para negócios de bairro',
      text: 'Muito serviço na cidade vive do boca a boca. Um site simples com o botão do WhatsApp transforma a indicação em contato com um toque.',
    },
  ],
  segments: ['pedreiro', 'pintor', 'eletricista', 'banho-e-tosa', 'montador-de-moveis'],
  faq: [
    {
      question: 'Atendo São Vicente e Santos. Faço um site ou dois?',
      answer: 'Um site com uma página para cada cidade. Assim você aparece nas duas buscas sem dividir a sua autoridade em dois domínios.',
    },
    {
      question: 'Funciona para quem atende a área continental?',
      answer: 'Sim, e vale destacar os bairros de lá: a concorrência na internet é menor e quem mora ali prefere quem está perto.',
    },
    {
      question: 'Quanto tempo leva para criar um site em São Vicente?',
      answer: 'Um site para autônomo ou pequena empresa fica pronto em cerca de uma semana depois da primeira conversa. Lojas virtuais e sistemas levam algumas semanas, entregues por partes.',
    },
  ],
  nearby: ['santos', 'praia-grande', 'cubatao', 'baixada-santista'],
};

const cubatao: Region = {
  slug: 'cubatao',
  name: 'Cubatão',
  where: 'em Cubatão',
  group: 'baixada',
  intro:
    'Desenvolvimento de sistemas, automação e criação de sites institucionais para empresas de Cubatão, dos fornecedores do polo industrial ao comércio local.',
  context:
    'Cubatão abriga um dos maiores polos industriais do país, com refinaria, siderurgia e fábricas de fertilizantes. Em volta delas existe uma rede de fornecedores de manutenção, transporte e segurança do trabalho que vende para outras empresas e ainda controla muita coisa em planilha.',
  places: ['Centro', 'Vila Nova', 'Jardim Casqueiro', 'Vila Natal', 'Parque Fernando Jorge', 'Vila Couto', 'Jardim Nova República'],
  opportunities: [
    {
      title: 'Site institucional para fornecedores da indústria',
      text: 'Compradores de indústria pesquisam o fornecedor antes da visita técnica. Site institucional com serviços, certificações e obras realizadas pesa na lista de homologação.',
    },
    {
      title: 'Sistema de ordens de serviço',
      text: 'Equipes em campo, turnos e relatórios para o cliente: um sistema web simples substitui a planilha compartilhada e o grupo de WhatsApp.',
    },
    {
      title: 'Automação de relatórios',
      text: 'Medições, horas e checklists viram relatório em PDF no fim do dia, sem alguém juntar tudo à mão.',
    },
  ],
  segments: ['eletricista', 'ar-condicionado', 'contador', 'advogado'],
  faq: [
    {
      question: 'Você faz sistema para empresa pequena?',
      answer: 'Sim. Começo pelo processo que mais dói, entrego em semanas e evoluo por partes. Sistemas sob medida começam em R$ 12.000.',
    },
    {
      question: 'Dá para integrar com o sistema do meu cliente?',
      answer: 'Quando o cliente tem API ou aceita arquivos em formato padrão, sim. Relatórios, medições e notas podem ser enviados automaticamente.',
    },
    {
      question: 'Meu negócio é comércio local, não indústria. Atende também?',
      answer: 'Atende. Para comércio e serviços do dia a dia, um site simples com WhatsApp e perfil no Google costuma ser o primeiro passo.',
    },
  ],
  nearby: ['santos', 'sao-vicente', 'baixada-santista'],
};

const praiaGrande: Region = {
  slug: 'praia-grande',
  name: 'Praia Grande',
  where: 'na Praia Grande',
  group: 'baixada',
  intro:
    'Criação de sites, landing pages e atendimento automático no WhatsApp para empresas e prestadores de serviço da Praia Grande, do Canto do Forte ao Solemar.',
  context:
    'A Praia Grande é uma das cidades que mais crescem na Baixada, com prédios novos do Canto do Forte ao Solemar. Quem acabou de se mudar ainda não tem a quem pedir indicação: procura reforma, móveis, ar-condicionado e pet shop no celular.',
  places: ['Canto do Forte', 'Boqueirão', 'Guilhermina', 'Aviação', 'Tupi', 'Ocian', 'Mirim', 'Caiçara', 'Real', 'Maracanã', 'Vila Sônia', 'Solemar'],
  opportunities: [
    {
      title: 'Sites para prestadores de serviço residencial',
      text: 'Quem recebe as chaves precisa de montador, pintor, eletricista e ar-condicionado na mesma semana. Aparecer nessa busca é cliente certo.',
    },
    {
      title: 'Bairros atendidos no site',
      text: 'Do Canto do Forte ao Solemar são muitos quilômetros de orla. Dizer quais bairros você atende evita orçamento perdido e deslocamento à toa.',
    },
    {
      title: 'Atendimento automático na temporada',
      text: 'No verão a cidade enche e as mensagens dobram. Atendimento automático no WhatsApp responde enquanto você trabalha.',
    },
  ],
  segments: ['montador-de-moveis', 'pintor', 'ar-condicionado', 'pedreiro', 'banho-e-tosa'],
  faq: [
    {
      question: 'Atendo só alguns bairros da Praia Grande. O site mostra isso?',
      answer: 'Sim, e deve mostrar: uma lista clara dos bairros atendidos e, se fizer sentido, uma taxa de deslocamento por região.',
    },
    {
      question: 'Anúncio no Google ou no Instagram vale a pena aqui?',
      answer: 'Vale quando leva para uma página feita para o anúncio, com uma oferta e um botão de WhatsApp. Mandar o clique para o perfil do Instagram desperdiça boa parte dele.',
    },
    {
      question: 'Você atende também Mongaguá e São Vicente?',
      answer: 'Sim. Se você atende cidades vizinhas, o site pode ter uma página para cada uma.',
    },
  ],
  nearby: ['sao-vicente', 'mongagua', 'santos', 'baixada-santista'],
};

const mongagua: Region = {
  slug: 'mongagua',
  name: 'Mongaguá',
  where: 'em Mongaguá',
  group: 'baixada',
  intro:
    'Criação de sites para prestadores de serviço e comércios de Mongaguá. Site simples, rápido e seu, que aparece no Google e leva o cliente para o seu WhatsApp.',
  context:
    'Mongaguá é uma cidade de perfil residencial e de veraneio, conhecida pela plataforma de pesca, que enche na temporada. Pouca empresa local tem site, então quem cria uma presença bem feita hoje ocupa o primeiro lugar com pouca disputa.',
  places: ['Centro', 'Agenor de Campos', 'Vera Cruz', 'Itaóca', 'Flórida Mirim', 'Jussara'],
  opportunities: [
    {
      title: 'Primeira página do Google com menos concorrência',
      text: 'Em cidades menores, um site com o nome da cidade e dos bairros chega à primeira página muito mais rápido do que em Santos ou na capital.',
    },
    {
      title: 'Página para cada cidade atendida',
      text: 'Quem atende também Itanhaém e Praia Grande ganha com uma página por cidade, mostrando a região inteira que você cobre.',
    },
    {
      title: 'Sites para quem cuida de casas de veraneio',
      text: 'Proprietários que moram fora procuram manutenção e limpeza pela internet antes de chegar. Mostre que você cuida da casa enquanto eles estão longe.',
    },
  ],
  segments: ['pedreiro', 'eletricista', 'jardineiro', 'banho-e-tosa'],
  faq: [
    {
      question: 'Cidade pequena precisa de site?',
      answer: 'Precisa ainda mais: com pouca concorrência na internet, quem aparece primeiro recebe quase todas as buscas, inclusive as de quem vem de fora na temporada.',
    },
    {
      question: 'Só tenho Instagram. Por que fazer um site?',
      answer: 'O Instagram quase não aparece nas buscas do Google. O site aparece, e o Instagram continua lá para mostrar o dia a dia.',
    },
    {
      question: 'Quanto tempo leva para ficar pronto?',
      answer: 'Um site para autônomo fica pronto em cerca de uma semana depois da primeira conversa.',
    },
  ],
  nearby: ['praia-grande', 'itanhaem', 'baixada-santista'],
};

const itanhaem: Region = {
  slug: 'itanhaem',
  name: 'Itanhaém',
  where: 'em Itanhaém',
  group: 'baixada',
  intro:
    'Criação de sites para empresas, comércios e prestadores de serviço de Itanhaém. Site rápido, que aparece no Google e leva o cliente direto para o seu WhatsApp.',
  context:
    'Fundada no século 16, Itanhaém mistura centro histórico, praias e bairros residenciais que crescem a cada ano, com muitas famílias e aposentados que chegam de outras cidades. São clientes que procuram tudo pela internet e valorizam quem responde rápido.',
  places: ['Centro', 'Satélite', 'Suarão', 'Cibratel', 'Belas Artes', 'Gaivota', 'Loty', 'Praia dos Sonhos', 'Jardim Sabaúna'],
  opportunities: [
    {
      title: 'Sites para prestadores de serviço',
      text: 'Quem acabou de se mudar da capital não conhece ninguém na cidade. O primeiro prestador que aparece no Google com fotos e preço leva o serviço.',
    },
    {
      title: 'Sites para obras e reformas',
      text: 'Casas novas e reformas em loteamentos geram procura constante por pedreiro, pintor e eletricista, quase sempre com o nome do bairro na busca.',
    },
    {
      title: 'Resposta automática no WhatsApp',
      text: 'Cliente que manda mensagem para três prestadores fecha com quem responde primeiro. Respostas automáticas fazem isso por você.',
    },
  ],
  segments: ['pedreiro', 'pintor', 'ar-condicionado', 'contador', 'banho-e-tosa'],
  faq: [
    {
      question: 'Atende também Mongaguá e Peruíbe?',
      answer: 'Sim. O trabalho é remoto e o site pode ter uma página para cada cidade que você atende.',
    },
    {
      question: 'Preciso de loja virtual ou só de um site?',
      answer: 'Para serviços, um site com WhatsApp resolve. Loja virtual faz sentido quando você vende produtos com estoque e entrega.',
    },
    {
      question: 'Consigo atualizar o site sozinho?',
      answer: 'Sim. Fotos de trabalhos, preços e textos podem ser trocados por você, ou por mim dentro do período de ajustes.',
    },
  ],
  nearby: ['mongagua', 'peruibe', 'baixada-santista'],
};

const peruibe: Region = {
  slug: 'peruibe',
  name: 'Peruíbe',
  where: 'em Peruíbe',
  group: 'baixada',
  intro:
    'Criação de sites para pousadas, passeios, comércios e prestadores de serviço de Peruíbe, com reservas e orçamentos direto pelo WhatsApp.',
  context:
    'Peruíbe vive do turismo de natureza, da Estação Ecológica Juréia-Itatins ao Guaraú, e de uma população que cresce com quem escolhe morar no litoral sul. O visitante planeja tudo pelo celular; o morador procura serviço como em qualquer cidade.',
  places: ['Centro', 'Guaraú', 'Oásis', 'Stella Maris', 'Parque Turístico', 'Caraguava', 'Jardim Ribamar'],
  opportunities: [
    {
      title: 'Reservas direto pelo site',
      text: 'Pousadas e passeios pagam comissão alta em plataformas. Um site rápido com fotos, calendário e reserva pelo WhatsApp traz parte desse cliente direto para você.',
    },
    {
      title: 'Blog para atrair turistas',
      text: 'Quem planeja a viagem pesquisa trilhas, praias e passeios. Páginas que respondem essas perguntas colocam o seu negócio no caminho do turista.',
    },
    {
      title: 'Sites para prestadores de serviço',
      text: 'Fora da temporada, os moradores procuram reforma, manutenção e serviços pessoais. Um site simples mantém o movimento o ano todo.',
    },
  ],
  segments: ['fotografo', 'eletricista', 'jardineiro', 'pedreiro'],
  faq: [
    {
      question: 'Dá para receber reservas pelo site?',
      answer: 'Sim. O mais simples é um formulário que abre o WhatsApp com datas e número de pessoas. Se o volume pedir, dá para integrar um calendário e pagamento por Pix.',
    },
    {
      question: 'Um blog ajuda a trazer turista?',
      answer: 'Ajuda quando responde dúvidas reais de quem planeja a viagem, com informação útil e atualizada. É um trabalho de médio prazo, mas que continua trazendo visitas.',
    },
    {
      question: 'Atende também Itanhaém?',
      answer: 'Sim. Se você atende as duas cidades, o site pode ter uma página para cada uma.',
    },
  ],
  nearby: ['itanhaem', 'mongagua', 'baixada-santista'],
};

const saoPaulo: Region = {
  slug: 'sao-paulo',
  name: 'São Paulo',
  where: 'em São Paulo',
  group: 'sp',
  intro:
    'Criação de sites, landing pages, SEO, sistemas e automação para empresas e profissionais de São Paulo, com atendimento remoto e conversa direta com o programador.',
  context:
    'São Paulo é o mercado mais disputado do país: anúncio caro, muitos concorrentes e clientes que comparam três opções antes de responder a uma. A busca é por bairro, por zona ou "perto do metrô", e o que decide é a velocidade da página e da resposta.',
  places: ['Pinheiros', 'Vila Madalena', 'Itaim Bibi', 'Moema', 'Vila Mariana', 'Perdizes', 'Lapa', 'Santana', 'Tatuapé', 'Mooca', 'Butantã', 'Santo Amaro'],
  opportunities: [
    {
      title: 'Landing pages para anúncios',
      text: 'Com o clique caro, a página do anúncio precisa carregar rápido, ter uma oferta só e registrar de onde veio cada contato.',
    },
    {
      title: 'SEO local por bairro e por zona',
      text: 'Ninguém busca "advogado São Paulo" e liga para o primeiro. Páginas para os bairros e as zonas onde você atende disputam buscas menores e mais decididas.',
    },
    {
      title: 'Automação de processos',
      text: 'Equipes maiores repetem cadastros, cobranças e relatórios. Automação e integrações liberam gente para atender cliente.',
    },
  ],
  segments: ['advogado', 'ginecologista', 'contador', 'fotografo'],
  faq: [
    {
      question: 'Você atende empresas de São Paulo morando em Santos?',
      answer: 'Sim. O trabalho todo é remoto: conversa por WhatsApp, reuniões por vídeo e acompanhamento das entregas por link. Quando o projeto pede, dá para combinar um encontro.',
    },
    {
      question: 'SEO funciona com tanta concorrência?',
      answer: 'Funciona melhor quando foca em buscas específicas: o serviço com o bairro, a zona ou a especialidade. A busca genérica fica para os anúncios.',
    },
    {
      question: 'Tenho um negócio em São Paulo e outro no litoral. Dá para cuidar dos dois?',
      answer: 'Sim. Cada negócio tem as suas páginas e as suas buscas locais, e a automação pode ser compartilhada entre eles.',
    },
  ],
  nearby: ['abc-paulista', 'santos', 'baixada-santista'],
};

const abcPaulista: Region = {
  slug: 'abc-paulista',
  name: 'ABC Paulista',
  where: 'no ABC Paulista',
  group: 'sp',
  isRegion: true,
  intro:
    'Criação de sites institucionais, desenvolvimento de sistemas e integrações para empresas de Santo André, São Bernardo, São Caetano, Diadema, Mauá e região.',
  context:
    'O ABC é um dos polos industriais mais tradicionais do país, com uma rede grande de pequenas indústrias, oficinas e fornecedores. Em volta delas, cada cidade tem seu comércio e seus serviços, e as buscas quase sempre levam o nome da cidade.',
  places: ['Santo André', 'São Bernardo do Campo', 'São Caetano do Sul', 'Diadema', 'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra'],
  opportunities: [
    {
      title: 'Site institucional para indústrias e fornecedores',
      text: 'O comprador da indústria pesquisa o fornecedor antes de pedir cotação. Site com capacidade produtiva, certificações e clientes atendidos abre a porta.',
    },
    {
      title: 'Sistema de pedidos integrado ao ERP',
      text: 'Pequenas indústrias controlam pedidos por e-mail e planilha. Um sistema web simples, integrado ao ERP, reduz erro e retrabalho.',
    },
    {
      title: 'Página para cada cidade do ABC',
      text: 'Prestadores que atendem várias cidades do ABC ganham com uma página para cada uma, citando os bairros e os trabalhos feitos ali.',
    },
  ],
  segments: ['eletricista', 'ar-condicionado', 'contador', 'advogado'],
  faq: [
    {
      question: 'Quais cidades do ABC você atende?',
      answer: 'Todas: Santo André, São Bernardo do Campo, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra. O trabalho é remoto.',
    },
    {
      question: 'Você integra o site com o ERP que eu já uso?',
      answer: 'Na maioria dos casos, sim: Bling, Omie, Tiny e outros sistemas com API. Antes de orçar, verifico o que o seu ERP permite.',
    },
    {
      question: 'Site institucional para indústria precisa de muitas páginas?',
      answer: 'Precisa das certas: capacidade, serviços ou processos, setores atendidos, certificações e contato. Poucas páginas bem feitas valem mais que um catálogo desatualizado.',
    },
  ],
  nearby: ['sao-paulo', 'santos', 'baixada-santista'],
};

export const regions: Region[] = [
  baixadaSantista,
  bertioga,
  guaruja,
  santos,
  saoVicente,
  cubatao,
  praiaGrande,
  mongagua,
  itanhaem,
  peruibe,
  saoPaulo,
  abcPaulista,
];
