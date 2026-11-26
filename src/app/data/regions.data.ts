/** Region pages (`/regioes/<slug>`), in index order: the Baixada Santista from north to south, then São Paulo. */
import type { Region } from './regions/region.model';

export type { Region } from './regions/region.model';

const baixadaSantista: Region = {
  slug: 'baixada-santista',
  name: 'Baixada Santista',
  where: 'na Baixada Santista',
  group: 'baixada',
  isRegion: true,
  title: 'Nove cidades, uma só região. Seu cliente procura em todas.',
  intro:
    'Sites, automação e agentes de IA para negócios da Baixada Santista, feitos por quem mora em Santos e conhece o jeito como a região compra e contrata.',
  context:
    'Na Baixada muita gente mora numa cidade, trabalha em outra e contrata serviço na terceira. O movimento muda com a temporada, o porto e o polo industrial, e a busca no Google quase sempre leva o nome da cidade ou do bairro.',
  places: ['Bertioga', 'Guarujá', 'Santos', 'São Vicente', 'Cubatão', 'Praia Grande', 'Mongaguá', 'Itanhaém', 'Peruíbe'],
  searches: [
    'eletricista na baixada santista',
    'contador santos ou são vicente',
    'manutenção de ar-condicionado praia grande',
    'fotógrafo de casamento guarujá',
  ],
  opportunities: [
    {
      title: 'Uma página para cada cidade que você atende',
      text: 'Quem atende Santos, São Vicente e Praia Grande precisa aparecer nas três buscas. Páginas por cidade, com bairros e exemplos reais, fazem isso sem parecer spam.',
    },
    {
      title: 'Temporada sem perder mensagem',
      text: 'De dezembro a fevereiro a procura sobe nas cidades de praia. Um agente no WhatsApp responde preço e disponibilidade enquanto você está no serviço.',
    },
    {
      title: 'Empresas que atendem o porto e a indústria',
      text: 'Fornecedores de logística e manutenção vendem para outras empresas. Site institucional claro, portfólio e integrações com o sistema do cliente pesam na escolha.',
    },
  ],
  services: [
    { slug: 'sites-para-autonomos', why: 'Para prestadores que atendem várias cidades e dependem do Google e da indicação.' },
    { slug: 'seo-e-geo', why: 'Páginas por cidade e por bairro, Google Meu Negócio e respostas que as IAs conseguem citar.' },
    { slug: 'agentes-de-ia', why: 'Atendimento no WhatsApp a qualquer hora, sem perder cliente no pico da temporada.' },
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
  title: 'O dono da casa está em São Paulo. Ele te procura pelo celular.',
  intro:
    'Sites e atendimento automático para quem presta serviço em Bertioga, onde boa parte dos clientes tem casa de temporada e contrata à distância.',
  context:
    'Bertioga vive de casas de veraneio, condomínios e turismo, da Riviera de São Lourenço a Boracéia. Muitos proprietários moram na capital e procuram jardineiro, piscineiro ou eletricista pela internet antes de descer a serra.',
  places: ['Centro', 'Riviera de São Lourenço', 'Indaiá', 'Maitinga', 'Vista Linda', 'Rio da Praia', 'Costa do Sol', 'Boracéia'],
  searches: [
    'jardineiro riviera de são lourenço',
    'limpeza de casa de praia bertioga',
    'instalação de ar-condicionado bertioga',
    'eletricista em bertioga',
  ],
  opportunities: [
    {
      title: 'Contratação à distância',
      text: 'O cliente não está na cidade para pedir indicação ao vizinho. Fotos de trabalhos, preços de referência e avaliações fazem o papel da conversa no portão.',
    },
    {
      title: 'Manutenção recorrente de casas fechadas',
      text: 'Casa de temporada precisa de cuidado o ano todo. Um site com planos mensais e lembretes automáticos no WhatsApp transforma serviço avulso em contrato.',
    },
    {
      title: 'Pousadas e passeios',
      text: 'Quem viaja compara opções no celular. Página rápida, fotos boas e reserva pelo WhatsApp evitam pagar comissão em tudo.',
    },
  ],
  services: [
    { slug: 'sites-para-autonomos', why: 'Para prestadores que atendem casas de temporada e condomínios.' },
    { slug: 'agentes-de-ia', why: 'Responde orçamento e agenda visita enquanto você está em outra casa.' },
    { slug: 'seo-e-geo', why: 'Aparecer na busca com o nome do bairro ou do condomínio.' },
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
  title: 'No Guarujá, a temporada dura três meses. A concorrência, o ano inteiro.',
  intro:
    'Sites, SEO local e agentes de IA para negócios do Guarujá e de Vicente de Carvalho, do comércio de bairro aos serviços para casas de alto padrão.',
  context:
    'O Guarujá tem dois ritmos: o turismo e as casas de veraneio da orla, de Pitangueiras a Pernambuco, e o comércio do dia a dia em Vicente de Carvalho. Os dois procuram serviço no Google, mas com buscas e expectativas bem diferentes.',
  places: ['Pitangueiras', 'Enseada', 'Astúrias', 'Tombo', 'Guaiúba', 'Pernambuco', 'Centro', 'Santa Rosa', 'Vicente de Carvalho', 'Perequê'],
  searches: [
    'eletricista enseada guarujá',
    'limpeza de vidros guarujá',
    'fotógrafo de família praia guarujá',
    'contador vicente de carvalho',
  ],
  opportunities: [
    {
      title: 'Cliente exigente, decisão pela aparência',
      text: 'Quem contrata serviço para casa de alto padrão escolhe pelo cuidado que enxerga. Um site bem feito, rápido e com portfólio já filtra o orçamento.',
    },
    {
      title: 'Dois públicos, duas páginas',
      text: 'Morador de Vicente de Carvalho e veranista da Enseada buscam coisas diferentes. Páginas separadas falam com cada um sem confundir o outro.',
    },
    {
      title: 'Pico de mensagens no fim de semana',
      text: 'No verão as mensagens chegam todas no sábado. Atendimento automático responde, qualifica e agenda sem você largar o serviço.',
    },
  ],
  services: [
    { slug: 'sites-para-autonomos', why: 'Para prestadores que atendem as casas da orla e os condomínios.' },
    { slug: 'seo-e-geo', why: 'Aparecer quando a busca leva o nome da praia ou do bairro.' },
    { slug: 'agentes-de-ia', why: 'Para não perder o cliente que chama no sábado de temporada.' },
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
  title: 'Em Santos, todo mundo indica alguém. Faça o Google indicar você.',
  intro:
    'Sites, SEO local, automação e agentes de IA para negócios de Santos, feitos por um desenvolvedor que mora na cidade.',
  context:
    'Santos concentra o comércio e os serviços da Baixada: clínicas e escritórios no Gonzaga e no Boqueirão, empresas ligadas ao porto no Macuco e no Centro, e prestadores que atendem a ilha inteira. A disputa por atenção é por bairro, e quase sempre começa no Google ou no Maps.',
  places: ['Gonzaga', 'Boqueirão', 'Ponta da Praia', 'Embaré', 'Aparecida', 'José Menino', 'Pompeia', 'Campo Grande', 'Vila Mathias', 'Marapé', 'Macuco', 'Centro'],
  searches: [
    'criação de site em santos',
    'ginecologista no gonzaga',
    'advogado trabalhista santos',
    'conserto de ar-condicionado boqueirão',
  ],
  opportunities: [
    {
      title: 'Busca por bairro',
      text: 'Em Santos, ninguém quer atravessar a cidade. Mostrar o bairro onde você atende, com endereço e mapa, decide entre você e o concorrente da outra quadra.',
    },
    {
      title: 'Empresas do porto e do comércio exterior',
      text: 'Despachantes, transportadoras e prestadores portuários vendem para outras empresas. Site institucional bilíngue e integrações entre sistemas encurtam a negociação.',
    },
    {
      title: 'Consultórios e escritórios cheios de mensagem',
      text: 'Clínicas e escritórios recebem as mesmas perguntas todo dia. Agendamento automático e respostas prontas devolvem horas para a equipe.',
    },
  ],
  services: [
    { slug: 'seo-e-geo', why: 'Aparecer no Google e no Maps quando a busca leva o nome do bairro.' },
    { slug: 'sites-para-autonomos', why: 'Para profissionais liberais e prestadores que hoje vivem só de indicação.' },
    { slug: 'integracoes', why: 'Para empresas do porto e do comércio que ainda copiam dados entre sistemas.' },
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
  title: 'Seu cliente mora em São Vicente. O primeiro resultado é de Santos.',
  intro:
    'Sites e automação para negócios de São Vicente, da ilha à área continental, para que quem mora perto encontre você antes de atravessar o canal.',
  context:
    'A primeira vila do Brasil divide a ilha com Santos e tem um comércio de bairro forte, do Itararé à área continental. Como Santos domina as buscas da região, quem é de São Vicente precisa dizer com todas as letras onde atende.',
  places: ['Centro', 'Itararé', 'Gonzaguinha', 'Boa Vista', 'Vila Valença', 'Parque Bitaru', 'Catiapoã', 'Jardim Independência', 'Humaitá', 'Parque das Bandeiras'],
  searches: [
    'pedreiro em são vicente',
    'banho e tosa itararé',
    'montador de móveis são vicente',
    'eletricista área continental são vicente',
  ],
  opportunities: [
    {
      title: 'Ganhar do resultado de Santos',
      text: 'Para buscas com "São Vicente", um site que cita a cidade, os bairros e mostra trabalhos feitos ali passa na frente de empresas que só falam de Santos.',
    },
    {
      title: 'Área continental',
      text: 'Bairros como Humaitá e Parque das Bandeiras ficam longe da ilha e têm poucos prestadores na internet. Quem aparece primeiro ali leva o cliente.',
    },
    {
      title: 'Negócio de indicação que quer crescer',
      text: 'Muito serviço na cidade vive do boca a boca. Um site simples com o botão do WhatsApp transforma a indicação em contato com um toque.',
    },
  ],
  services: [
    { slug: 'sites-para-autonomos', why: 'Um site simples, rápido e seu, com os bairros que você atende.' },
    { slug: 'landing-pages', why: 'Para anunciar um serviço ou uma promoção com uma página feita para isso.' },
    { slug: 'agentes-de-ia', why: 'Respostas automáticas no WhatsApp para preço, horário e endereço.' },
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
      question: 'Quanto custa um site simples?',
      answer: 'Sites para autônomos começam em R$ 1.500, com domínio, página de serviços e botão de WhatsApp. O valor exato depende do número de páginas.',
    },
  ],
  nearby: ['santos', 'praia-grande', 'cubatao', 'baixada-santista'],
};

const cubatao: Region = {
  slug: 'cubatao',
  name: 'Cubatão',
  where: 'em Cubatão',
  group: 'baixada',
  title: 'Cubatão funciona em turno. Seu processo ainda funciona em planilha.',
  intro:
    'Sistemas sob medida, automação e sites institucionais para empresas de Cubatão, dos fornecedores do polo industrial ao comércio do Centro.',
  context:
    'Cubatão abriga um dos maiores polos industriais do país, com refinaria, siderurgia e fábricas de fertilizantes. Em volta delas existe uma rede de fornecedores de manutenção, transporte e segurança do trabalho que vende para outras empresas e ainda controla muita coisa em planilha.',
  places: ['Centro', 'Vila Nova', 'Jardim Casqueiro', 'Vila Natal', 'Parque Fernando Jorge', 'Vila Couto', 'Jardim Nova República'],
  searches: [
    'manutenção industrial cubatão',
    'empresa de segurança do trabalho cubatão',
    'contador em cubatão',
    'eletricista jardim casqueiro',
  ],
  opportunities: [
    {
      title: 'Fornecedor que precisa parecer grande',
      text: 'Compradores de indústria pesquisam o fornecedor antes da visita técnica. Site institucional com serviços, certificações e obras realizadas pesa na lista de homologação.',
    },
    {
      title: 'Ordens de serviço fora da planilha',
      text: 'Equipes em campo, turnos e relatórios para o cliente: um sistema web simples substitui a planilha compartilhada e o grupo de WhatsApp.',
    },
    {
      title: 'Relatórios que se montam sozinhos',
      text: 'Medições, horas e checklists viram relatório em PDF no fim do dia, sem alguém juntar tudo à mão.',
    },
  ],
  services: [
    { slug: 'sistemas-sob-medida', why: 'Ordens de serviço, equipes e relatórios num lugar só, com histórico.' },
    { slug: 'automacao-de-processos', why: 'Relatórios, cobranças e planilhas atualizados sem trabalho manual.' },
    { slug: 'sites-para-autonomos', why: 'Para prestadores e comércios que atendem a cidade e os bairros.' },
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
  title: 'A Praia Grande não para de crescer. Quem chega procura tudo no Google.',
  intro:
    'Sites, anúncios e atendimento automático para negócios da Praia Grande, uma cidade cheia de prédios novos, moradores recém-chegados e veranistas.',
  context:
    'A Praia Grande é uma das cidades que mais crescem na Baixada, com prédios novos do Canto do Forte ao Solemar. Quem acabou de se mudar ainda não tem a quem pedir indicação: procura reforma, móveis, ar-condicionado e pet shop no celular.',
  places: ['Canto do Forte', 'Boqueirão', 'Guilhermina', 'Aviação', 'Tupi', 'Ocian', 'Mirim', 'Caiçara', 'Real', 'Maracanã', 'Vila Sônia', 'Solemar'],
  searches: [
    'montador de móveis praia grande',
    'pintor de apartamento guilhermina',
    'instalação de ar-condicionado praia grande',
    'banho e tosa no boqueirão praia grande',
  ],
  opportunities: [
    {
      title: 'Apartamento novo, lista de serviços longa',
      text: 'Quem recebe as chaves precisa de montador, pintor, eletricista e ar-condicionado na mesma semana. Aparecer nessa busca é cliente certo.',
    },
    {
      title: 'Bairros enormes e distantes',
      text: 'Do Canto do Forte ao Solemar são muitos quilômetros de orla. Dizer quais bairros você atende evita orçamento perdido e deslocamento à toa.',
    },
    {
      title: 'Pico na temporada',
      text: 'No verão a cidade enche e as mensagens dobram. Atendimento automático no WhatsApp responde enquanto você trabalha.',
    },
  ],
  services: [
    { slug: 'sites-para-autonomos', why: 'Para prestadores que atendem os prédios novos e os bairros da orla.' },
    { slug: 'landing-pages', why: 'Para anúncios de temporada ou de entrega de chaves, com uma oferta só.' },
    { slug: 'agentes-de-ia', why: 'Responde preço e disponibilidade quando as mensagens se acumulam.' },
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
  title: 'Em Mongaguá, quase ninguém está no Google. Comece por aí.',
  intro:
    'Sites simples e atendimento pelo WhatsApp para prestadores e comércios de Mongaguá, onde aparecer primeiro ainda é fácil.',
  context:
    'Mongaguá é uma cidade de perfil residencial e de veraneio, conhecida pela plataforma de pesca, que enche na temporada. Pouca empresa local tem site, então quem cria uma presença bem feita hoje ocupa o primeiro lugar com pouca disputa.',
  places: ['Centro', 'Agenor de Campos', 'Vera Cruz', 'Itaóca', 'Flórida Mirim', 'Jussara'],
  searches: [
    'pedreiro em mongaguá',
    'eletricista mongaguá',
    'jardineiro agenor de campos',
    'pet shop mongaguá',
  ],
  opportunities: [
    {
      title: 'Pouca concorrência na internet',
      text: 'Em cidades menores, um site com o nome da cidade e dos bairros chega à primeira página muito mais rápido do que em Santos ou na capital.',
    },
    {
      title: 'Clientes de outras cidades',
      text: 'Quem atende também Itanhaém e Praia Grande ganha com uma página por cidade, mostrando a região inteira que você cobre.',
    },
    {
      title: 'Casas de veraneio',
      text: 'Proprietários que moram fora procuram manutenção e limpeza pela internet antes de chegar. Mostre que você cuida da casa enquanto eles estão longe.',
    },
  ],
  services: [
    { slug: 'sites-para-autonomos', why: 'Um site simples e seu, com o nome da cidade e dos bairros.' },
    { slug: 'seo-e-geo', why: 'Google Meu Negócio e páginas locais para ocupar o primeiro lugar.' },
    { slug: 'agentes-de-ia', why: 'Respostas automáticas no WhatsApp para não perder quem chama à noite.' },
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
  title: 'Itanhaém tem quase 500 anos. Seu negócio ainda não tem site.',
  intro:
    'Sites e atendimento automático para negócios de Itanhaém, uma das cidades mais antigas do Brasil e que recebe cada vez mais moradores vindos da capital.',
  context:
    'Fundada no século 16, Itanhaém mistura centro histórico, praias e bairros residenciais que crescem a cada ano, com muitas famílias e aposentados que chegam de outras cidades. São clientes que procuram tudo pela internet e valorizam quem responde rápido.',
  places: ['Centro', 'Satélite', 'Suarão', 'Cibratel', 'Belas Artes', 'Gaivota', 'Loty', 'Praia dos Sonhos', 'Jardim Sabaúna'],
  searches: [
    'pedreiro itanhaém',
    'instalação de ar-condicionado itanhaém',
    'contador em itanhaém',
    'banho e tosa cibratel',
  ],
  opportunities: [
    {
      title: 'Moradores novos sem indicação',
      text: 'Quem acabou de se mudar da capital não conhece ninguém na cidade. O primeiro prestador que aparece no Google com fotos e preço leva o serviço.',
    },
    {
      title: 'Obras e reformas',
      text: 'Casas novas e reformas em loteamentos geram procura constante por pedreiro, pintor e eletricista, quase sempre com o nome do bairro na busca.',
    },
    {
      title: 'Responder rápido vale ouro',
      text: 'Cliente que manda mensagem para três prestadores fecha com quem responde primeiro. Respostas automáticas fazem isso por você.',
    },
  ],
  services: [
    { slug: 'sites-para-autonomos', why: 'Para prestadores que querem ser achados pelos moradores novos.' },
    { slug: 'agentes-de-ia', why: 'Resposta imediata no WhatsApp, a qualquer hora.' },
    { slug: 'seo-e-geo', why: 'Aparecer na busca com o nome do bairro e da cidade.' },
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
  title: 'O turista decidiu o passeio antes de chegar a Peruíbe. Ele te encontrou?',
  intro:
    'Sites, reservas pelo WhatsApp e SEO local para pousadas, passeios e prestadores de Peruíbe, porta de entrada da Juréia.',
  context:
    'Peruíbe vive do turismo de natureza, da Estação Ecológica Juréia-Itatins ao Guaraú, e de uma população que cresce com quem escolhe morar no litoral sul. O visitante planeja tudo pelo celular; o morador procura serviço como em qualquer cidade.',
  places: ['Centro', 'Guaraú', 'Oásis', 'Stella Maris', 'Parque Turístico', 'Caraguava', 'Jardim Ribamar'],
  searches: [
    'pousada no guaraú peruíbe',
    'passeio juréia peruíbe',
    'fotógrafo em peruíbe',
    'eletricista peruíbe',
  ],
  opportunities: [
    {
      title: 'Reserva direta, sem comissão',
      text: 'Pousadas e passeios pagam comissão alta em plataformas. Um site rápido com fotos, calendário e reserva pelo WhatsApp traz parte desse cliente direto para você.',
    },
    {
      title: 'Conteúdo que vira busca',
      text: 'Quem planeja a viagem pesquisa trilhas, praias e passeios. Páginas que respondem essas perguntas colocam o seu negócio no caminho do turista.',
    },
    {
      title: 'Serviços para quem mora',
      text: 'Fora da temporada, os moradores procuram reforma, manutenção e serviços pessoais. Um site simples mantém o movimento o ano todo.',
    },
  ],
  services: [
    { slug: 'sites-para-autonomos', why: 'Para pousadas, guias e prestadores que querem ser encontrados antes da viagem.' },
    { slug: 'blogs-e-portfolios', why: 'Conteúdo sobre a região que atrai quem está planejando a viagem.' },
    { slug: 'agentes-de-ia', why: 'Responde disponibilidade e preço quando o turista chama fora do horário.' },
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
  title: 'Em São Paulo, o clique é caro. A página precisa pagar por ele.',
  intro:
    'Landing pages, SEO por bairro, automação e agentes de IA para empresas e profissionais da capital paulista, com atendimento remoto.',
  context:
    'São Paulo é o mercado mais disputado do país: anúncio caro, muitos concorrentes e clientes que comparam três opções antes de responder a uma. A busca é por bairro, por zona ou "perto do metrô", e o que decide é a velocidade da página e da resposta.',
  places: ['Pinheiros', 'Vila Madalena', 'Itaim Bibi', 'Moema', 'Vila Mariana', 'Perdizes', 'Lapa', 'Santana', 'Tatuapé', 'Mooca', 'Butantã', 'Santo Amaro'],
  searches: [
    'advogado de família em pinheiros',
    'ginecologista perto do metrô vila mariana',
    'contador para pj são paulo',
    'fotógrafo corporativo zona sul sp',
  ],
  opportunities: [
    {
      title: 'Cada real de anúncio medido',
      text: 'Com o clique caro, a página do anúncio precisa carregar rápido, ter uma oferta só e registrar de onde veio cada contato.',
    },
    {
      title: 'SEO por bairro e por zona',
      text: 'Ninguém busca "advogado São Paulo" e liga para o primeiro. Páginas para os bairros e as zonas onde você atende disputam buscas menores e mais decididas.',
    },
    {
      title: 'Operação maior, mais tarefa repetida',
      text: 'Equipes maiores repetem cadastros, cobranças e relatórios. Automação e integrações liberam gente para atender cliente.',
    },
  ],
  services: [
    { slug: 'landing-pages', why: 'Para transformar o clique caro em contato, com medição do anúncio ao WhatsApp.' },
    { slug: 'seo-e-geo', why: 'Páginas por bairro e zona, e conteúdo que as IAs conseguem citar.' },
    { slug: 'automacao-de-processos', why: 'Para equipes que gastam horas por semana em tarefas repetidas.' },
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
  title: 'No ABC, quem fornece para a indústria também é avaliado pelo site.',
  intro:
    'Sites institucionais, sistemas sob medida e integrações para empresas do ABC Paulista, das fábricas aos prestadores de serviço de cada cidade.',
  context:
    'O ABC é um dos polos industriais mais tradicionais do país, com uma rede grande de pequenas indústrias, oficinas e fornecedores. Em volta delas, cada cidade tem seu comércio e seus serviços, e as buscas quase sempre levam o nome da cidade.',
  places: ['Santo André', 'São Bernardo do Campo', 'São Caetano do Sul', 'Diadema', 'Mauá', 'Ribeirão Pires', 'Rio Grande da Serra'],
  searches: [
    'usinagem são bernardo do campo',
    'manutenção de ar-condicionado santo andré',
    'contador em são caetano do sul',
    'eletricista em diadema',
  ],
  opportunities: [
    {
      title: 'Homologação começa no site',
      text: 'O comprador da indústria pesquisa o fornecedor antes de pedir cotação. Site com capacidade produtiva, certificações e clientes atendidos abre a porta.',
    },
    {
      title: 'Pedidos e ordens fora do e-mail',
      text: 'Pequenas indústrias controlam pedidos por e-mail e planilha. Um sistema web simples, integrado ao ERP, reduz erro e retrabalho.',
    },
    {
      title: 'Sete cidades, sete buscas',
      text: 'Prestadores que atendem várias cidades do ABC ganham com uma página para cada uma, citando os bairros e os trabalhos feitos ali.',
    },
  ],
  services: [
    { slug: 'sistemas-sob-medida', why: 'Pedidos, ordens de serviço e estoque num sistema feito para a sua operação.' },
    { slug: 'integracoes', why: 'Site, ERP e WhatsApp conversando, sem digitar o mesmo dado duas vezes.' },
    { slug: 'sites-para-autonomos', why: 'Para prestadores que atendem uma ou várias cidades do ABC.' },
  ],
  segments: ['eletricista', 'ar-condicionado', 'contador', 'advogado'],
  faq: [
    {
      question: 'Quais cidades do ABC você atende?',
      answer: 'Todas: Santo André, São Bernardo do Campo, São Caetano do Sul, Diadema, Mauá, Ribeirão Pires e Rio Grande da Serra. O trabalho é remoto.',
    },
    {
      question: 'Vocês integram com o ERP que eu já uso?',
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
