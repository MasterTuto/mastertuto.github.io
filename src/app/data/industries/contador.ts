import type { Industry } from './industry.model';

export const contador: Industry = {
  slug: 'contador',
  name: 'Contabilidade',
  title: 'Menos cobrança de documento pelo WhatsApp.',
  intro:
    'Um site que apresenta o escritório e recebe novos clientes com as informações certas, e lembretes que pedem os documentos do mês antes do fechamento.',
  images: {
    hero: {
      src: 'assets/images/segments/contador/hero.svg',
      alt: 'Contadora em sua mesa com notebook, calculadora e bandeja de papéis, com calendário de parede e estante de pastas ao fundo',
    },
    routine: {
      src: 'assets/images/segments/contador/routine.svg',
      alt: 'Celular cheio de fotos de notas fiscais, áudios e anexos, cercado por recibos soltos, um envelope e um calendário com um dia marcado',
    },
    closing: {
      src: 'assets/images/segments/contador/closing.svg',
      alt: 'Contador e cliente conversando à mesa, com uma prancheta de itens marcados e pastas coloridas organizadas',
    },
  },
  routine: {
    quote:
      'Boa noite! Mandei as notas de outubro por foto, algumas estão no e-mail. Falta o extrato do banco, amanhã eu vejo. Ah, a guia do DAS vence quando mesmo?',
    context: 'Mensagem típica no WhatsApp de uma contadora, no dia 18, às 23h',
    body: 'As fotos chegam soltas, sem mês de referência, e parte está em outro canal. Antes de fechar o mês você precisa descobrir o que falta, cobrar de novo e responder a mesma pergunta sobre o DAS que outros clientes também vão fazer até o dia 20.',
  },
  problems: [
    {
      title: 'Documentos espalhados',
      today:
        'No fim do mês, as notas chegam em foto pelo WhatsApp, o extrato vem por e-mail e o resto fica para depois. Você monta o quebra-cabeça e cobra o que falta, cliente por cliente.',
      change:
        'Um lembrete automático sai antes da data combinada, com a lista do que enviar e o canal certo para cada documento. A conferência continua com você, mas começa com menos cobrança.',
    },
    {
      title: 'Temporada do IRPF',
      today:
        'Perto do fim do prazo, gente que você nunca atendeu manda foto do informe de rendimentos e pergunta se ainda dá tempo e quanto custa. Cada conversa toma minutos que você não tem.',
      change:
        'Uma página do site diz até quando o escritório aceita novas declarações e quais documentos separar. A resposta automática anota o contato e se a pessoa já declarou com você, e você decide quem consegue atender.',
    },
    {
      title: 'Preço sem escopo',
      today:
        'Chega um “quanto é a mensalidade?” sem atividade, cidade nem número de funcionários. Sem isso não há proposta séria, e a conversa vira um vai e volta de perguntas.',
      change:
        'O site explica o que cada serviço inclui, e o formulário pede atividade, porte e regime, se a pessoa souber. Você responde com a proposta por escrito que o Código de Ética do contador pede.',
    },
  ],
  contrast: [
    {
      today: 'Todo mês alguém pergunta quando vence o DAS e onde está a guia.',
      withSite: 'Um lembrete automático sai antes do vencimento, pelo canal combinado com cada cliente.',
    },
    {
      today: 'Clientes antigos e contatos novos escrevem no mesmo número, tudo misturado.',
      withSite: 'A primeira resposta separa quem já é cliente de quem está pedindo proposta.',
    },
    {
      today: 'Quem vai abrir empresa chega à reunião sem os documentos básicos.',
      withSite: 'Uma página de abertura de empresa lista o que separar antes da primeira conversa.',
    },
    {
      today: 'Quem procura um contador no Google encontra um perfil sem horário nem telefone.',
      withSite: 'Perfil no Google e site com endereço, horário, serviços e seu registro no CRC.',
    },
  ],
  chat: {
    title: 'Receber sem dar consultoria',
    body: 'A resposta automática recebe o contato a qualquer hora, sem calcular imposto nem passar valor. Ela pergunta o essencial e entrega a conversa para você montar a proposta.',
    lines: [
      {
        from: 'client',
        text: 'Oi, sou MEI e acho que passei do limite este ano. Vou pagar muito imposto? Quanto vocês cobram?',
      },
      {
        from: 'reply',
        text: 'Olá, aqui é o atendimento automático do escritório. Impostos e valores são avaliados pelo contador, caso a caso. Você já é cliente ou é o primeiro contato?',
      },
      {
        from: 'client',
        text: 'Primeiro contato.',
      },
      {
        from: 'reply',
        text: 'Certo. Qual a atividade da empresa, a cidade e se tem funcionários? Pode responder numa mensagem só.',
      },
      {
        from: 'client',
        text: 'Salão de beleza, em Campinas, uma funcionária.',
      },
      {
        from: 'reply',
        text: 'Obrigado. Repassei ao contador responsável, que retorna pessoalmente no próximo dia útil para entender o caso e enviar uma proposta por escrito.',
      },
    ],
  },
  steps: [
    {
      title: 'Perfil e necessidade',
      text: 'A pessoa informa atividade, cidade, porte e o serviço que procura, pelo site ou pelo WhatsApp.',
    },
    {
      title: 'Proposta por escrito',
      text: 'Você analisa o perfil e envia a proposta com cada serviço, seu valor e a periodicidade.',
    },
    {
      title: 'Lista de entrada',
      text: 'Com o contrato assinado, o cliente recebe a lista de documentos e o canal certo para enviar cada um.',
    },
    {
      title: 'Lembretes do mês',
      text: 'Antes do fechamento e dos vencimentos, um lembrete automático avisa o cliente, e o trabalho técnico segue com você.',
    },
  ],
  faq: [
    {
      question: 'Isso respeita as regras do CFC sobre publicidade?',
      answer:
        'O site é informativo e discreto: serviços, área de atendimento, contato e seu número de registro no CRC, como pede a NBC PG 01. Sem promessa de pagar menos imposto, sem comparação com colegas e sem preço como chamariz. Você revisa e aprova todos os textos.',
    },
    {
      question: 'Funciona com o WhatsApp e o sistema que eu já uso?',
      answer:
        'Sim. No WhatsApp Business dá para configurar saudação, mensagem de ausência e respostas rápidas no seu número. Lembretes com mais etapas usam a API oficial do WhatsApp, que tem custo próprio, combinado antes. Se você já tem portal do cliente, o site aponta para ele em vez de substituí-lo.',
    },
    {
      question: 'E o sigilo dos dados dos clientes?',
      answer:
        'A resposta automática e o formulário pedem só contato e perfil da empresa, nunca documentos, senhas ou certificado digital. Os arquivos seguem pelo canal que você já usa, e o site traz um aviso de privacidade conforme a LGPD.',
    },
  ],
  closing: {
    title: 'Menos cobrança no celular, mais tempo para o fechamento.',
    body: 'Me conte como seus clientes enviam documentos hoje e quais serviços o escritório oferece. Desenhamos juntos um atendimento que respeita as regras do CFC.',
  },
  queries: [
    'contador',
    'contadora',
    'contabilidade',
    'escritório contábil',
    'escritório de contabilidade',
    'site para contador',
    'site para escritório de contabilidade',
    'whatsapp para contador',
    'contador para mei',
    'imposto de renda',
  ],
  source: {
    label: 'CFC · Código de Ética Profissional do Contador (NBC PG 01)',
    url: 'https://cfc.org.br/tecnica/codigo-de-etica-profissional/',
  },
};
