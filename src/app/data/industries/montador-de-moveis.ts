import { Industry } from './industry.model';

export const montadorDeMoveis: Industry = {
  slug: 'montador-de-moveis',
  name: 'Montagem de móveis',
  title: 'Saiba o modelo antes de ir.',
  intro:
    'Uma página com os móveis que você monta e os bairros que atende, e uma primeira resposta que pede o modelo e confirma se as caixas já chegaram.',
  images: {
    hero: {
      src: 'assets/images/segments/montador-de-moveis/hero.svg',
      alt: 'Montador com parafusadeira fixando a porta de um guarda-roupa, ao lado de uma caixa de papelão aberta com peças e de uma maleta de ferramentas',
    },
    routine: {
      src: 'assets/images/segments/montador-de-moveis/routine.svg',
      alt: 'Celular cheio de mensagens, uma delas com o espaço da foto vazio, ao lado de caixas de móvel empilhadas, uma chave allen e parafusos soltos',
    },
    closing: {
      src: 'assets/images/segments/montador-de-moveis/closing.svg',
      alt: 'Montador com a maleta de ferramentas e a cliente diante de um guarda-roupa montado, com portas alinhadas, num quarto arrumado',
    },
  },
  routine: {
    quote: 'boa tarde, quanto vc cobra pra montar um guarda roupa? chega amanhã, consegue vir cedo?',
    context:
      'Mensagem no WhatsApp de um montador autônomo, num sábado à tarde, sem modelo, sem bairro e com a entrega ainda a caminho.',
    body: 'Você pergunta quantas portas, quantas gavetas, se é de correr e se vai na parede. Marca para as 8h, e a entrega ainda não passou. A manhã que estava reservada fica vazia.',
  },
  problems: [
    {
      title: 'Pedido sem modelo',
      today:
        'Chega "quanto pra montar um guarda-roupa?" sem foto nem link. Seis portas com espelho e duas portas simples não levam o mesmo tempo, e você só descobre depois de várias mensagens.',
      change:
        'A primeira resposta pede o link do produto ou a foto da etiqueta da caixa. Você abre o manual e calcula o tempo antes de responder.',
    },
    {
      title: 'Caixas que não chegaram',
      today:
        'O cliente marca a montagem para o dia da entrega. Você chega e a entrega atrasou, falta um volume ou não tem ninguém em casa.',
      change:
        'Antes de confirmar, o pedido pergunta se todas as caixas já chegaram. Na véspera, um lembrete pede para conferir os volumes e deixar o espaço livre.',
    },
    {
      title: 'Parede descoberta na hora',
      today:
        'Só no local você vê que o painel da TV vai numa parede de gesso, ou ouve "aproveita e pendura o espelho também". O próximo cliente fica esperando.',
      change:
        'O pedido pergunta se há fixação na parede e de que tipo ela é. Você sai de casa com a bucha certa e o tempo reservado.',
    },
  ],
  contrast: [
    {
      today: 'Seu número circula em grupos do bairro sem dizer o que você monta.',
      withSite: 'Uma página lista os móveis que você monta, se faz desmontagem e os bairros atendidos.',
    },
    {
      today: 'O cliente compara seu valor com uma tabela que viu na internet.',
      withSite: 'A página explica o que muda o valor: portas, gavetas, fixação e andar sem elevador.',
    },
    {
      today: 'As fotos dos seus serviços ficam perdidas na galeria do celular.',
      withSite: 'Uma galeria mostra móveis montados, com portas alinhadas e o ambiente limpo.',
    },
    {
      today: 'Endereço, andar e horário ficam espalhados em áudios.',
      withSite: 'A montagem fica confirmada por escrito, com lembrete no dia anterior.',
    },
  ],
  chat: {
    title: 'Primeiro o modelo, depois o valor',
    body: 'A resposta automática pede o que você perguntaria: modelo, caixas entregues, fixação na parede e bairro. Ela não passa preço e não ensina o cliente a montar sozinho.',
    lines: [
      {
        from: 'client',
        text: 'Oi, quanto pra montar um guarda-roupa de casal?',
      },
      {
        from: 'reply',
        text: 'Oi! Recebemos sua mensagem. Para o montador avaliar, pode mandar o link do produto ou uma foto da etiqueta da caixa?',
      },
      {
        from: 'client',
        text: 'Mandei o link. É de 6 portas, com espelho.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Todas as caixas já foram entregues? Vai fixar na parede? E qual é o bairro?',
      },
      {
        from: 'client',
        text: 'Chegaram ontem. Vai na parede sim. Moro no Centro, 3º andar sem elevador.',
      },
      {
        from: 'reply',
        text: 'Anotado. O montador confere o manual e responde hoje até as 19h com o valor e os horários livres.',
      },
    ],
  },
  steps: [
    {
      title: 'Pedido com o modelo',
      text: 'O cliente envia o link ou a foto da etiqueta, a quantidade de móveis e o bairro.',
    },
    {
      title: 'Você confere o manual',
      text: 'Com o modelo na tela, você vê portas, gavetas e fixação, e passa o valor.',
    },
    {
      title: 'Data com as caixas em casa',
      text: 'A montagem é marcada depois da entrega, com lembrete na véspera para conferir os volumes e liberar o espaço.',
    },
    {
      title: 'Montagem e avaliação',
      text: 'Depois do serviço, o cliente recebe uma mensagem pedindo avaliação no seu perfil do Google.',
    },
  ],
  faq: [
    {
      question: 'Funciona com o WhatsApp que eu já uso?',
      answer:
        'Sim. O site leva para o seu número de sempre. A primeira resposta e as perguntas iniciais saem pelo WhatsApp Business ou por um formulário curto no site, e você assume a conversa quando quiser.',
    },
    {
      question: 'Eu não tenho preço fixo. Preciso colocar uma tabela no site?',
      answer:
        'Não. A página pode explicar o que muda o valor, como portas, gavetas, fixação e acesso. O valor fica com você, depois de ver o modelo.',
    },
    {
      question: 'Quanto custa manter depois de pronto?',
      answer:
        'Domínio e hospedagem têm um custo anual pequeno. Mudanças de bairros, serviços ou fotos você pede quando precisar, e o valor a gente combina antes, por escrito.',
    },
  ],
  closing: {
    title: 'Chegue sabendo o que vai montar.',
    body: 'Me conte como os pedidos chegam hoje e de onde vêm seus clientes. A gente vê junto o que vale automatizar e o que fica com você.',
  },
  queries: [
    'montador de móveis',
    'montador de moveis',
    'montadora de móveis',
    'montagem de móveis',
    'montagem de guarda-roupa',
    'desmontagem de móveis',
    'instalação de painel de TV',
    'montador autônomo',
    'site para montador de móveis',
  ],
  source: {
    label: 'Sebrae · Ideias de Negócios: MEI Montador(a) de móveis',
    url: 'https://bibliotecas.sebrae.com.br/chronus/ARQUIVOS_CHRONUS/IDEIAS_DE_NEGOCIO/PDFS/ideia-de-negocio_mei--montadora-de-moveis.pdf',
  },
};
