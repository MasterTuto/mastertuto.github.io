import { LandingContent } from '../landing.model';
import { nameField } from './common';

/** Words of the sites-para-autonomos page. */
export const sitesParaAutonomosCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Site profissional para autônomos e pequenos negócios',
      description:
        'Site para eletricista, advogado, clínica, fotógrafo e todo profissional autônomo: aparece no Google, mostra seus serviços e leva o cliente direto para o WhatsApp.',
    },
    hero: {
      title: 'Seu cliente procurou no Google. Achou o concorrente.',
      subtitle: 'Um site simples, rápido e seu, que mostra o que você faz e leva quem procura direto para o seu WhatsApp.',
      note: 'resultados para "eletricista perto de mim": você não está aqui',
      cta: 'Quero aparecer',
    },
    problem: {
      title: 'Hoje, quem te procura encontra…',
      items: [
        'Só um perfil no Instagram, que não aparece em buscas do Google.',
        'Um site antigo, feito por um sobrinho, que não abre direito no celular.',
        'Nenhuma lista clara de serviços, regiões atendidas ou preços.',
        'Um número de telefone que ninguém atende fora do horário.',
      ],
    },
    solution: {
      title: 'Seu negócio inteiro numa página que vende',
      text: 'Serviços, área de atendimento, fotos de trabalhos e um botão de WhatsApp que acompanha a tela. Feito para quem tem pouco tempo para cuidar de site.',
      items: [
        'Domínio próprio (seunome.com.br) e e-mail profissional',
        'Página para cada serviço, pensada para buscas locais',
        'Perfil no Google Meu Negócio conectado ao site',
        'Galeria de trabalhos e depoimentos',
        'Botão de WhatsApp com mensagem pronta',
      ],
    },
    steps: {
      title: 'Como funciona',
      items: [
        { title: 'Conversa de 20 minutos', text: 'Você conta o que faz, onde atende e quem são seus clientes.' },
        { title: 'Eu escrevo e monto', text: 'Você só manda fotos. Texto, estrutura e SEO ficam comigo.' },
        { title: 'Você aprova pelo celular', text: 'Recebe um link, comenta e eu ajusto.' },
        { title: 'No ar', text: 'Domínio, Google Meu Negócio e WhatsApp funcionando.' },
      ],
    },
    proof: {
      title: 'Feito para o dia a dia de quem trabalha sozinho',
      items: [
        { value: '7 dias', label: 'do primeiro contato ao site publicado' },
        { value: '0', label: 'mensalidade de plataforma obrigatória' },
        { value: '1 toque', label: 'para o cliente te chamar no WhatsApp' },
      ],
    },
    outcome: 'Te achei no Google e já vi que você atende no meu bairro.',
    price: {
      prefix: 'a partir de',
      amount: 'R$ 1.500',
      includes: ['Até 5 páginas', 'Domínio e hospedagem do primeiro ano', 'Configuração do Google Meu Negócio'],
      note: 'Parcelamento em até 6x. Manutenção mensal opcional.',
    },
    faq: [
      { question: 'Preciso entender de tecnologia?', answer: 'Não. Você responde algumas perguntas e manda fotos. O resto — domínio, hospedagem, textos e Google — fica comigo.' },
      { question: 'Instagram não basta?', answer: 'O Instagram não aparece quando alguém busca "dentista em Santos" no Google. O site aparece, e ainda passa mais confiança para quem não te conhece.' },
      { question: 'Quem é dono do site?', answer: 'Você. Domínio registrado no seu nome e acesso a tudo, sem fidelidade.' },
      { question: 'Atende minha profissão?', answer: 'Já fiz páginas para eletricistas, advogados, médicos, contadores, pintores, fotógrafos e outros. Veja os segmentos atendidos na página de segmentos.' },
    ],
    form: {
      title: 'Vamos colocar você no mapa',
      text: 'Responda rápido e eu te chamo com uma proposta.',
      heading: 'Olá, Breno! Vim pela página de sites para autônomos e quero um orçamento.',
      fields: [
        nameField.pt,
        { name: 'profissao', label: 'Qual é a sua profissão?', type: 'text', required: true, placeholder: 'Ex.: eletricista, psicóloga, advogado' },
        { name: 'cidade', label: 'Cidade onde atende', type: 'text', autocomplete: 'address-level2' },
        { name: 'tem_site', label: 'Já tem site?', type: 'select', placeholder: 'Escolha', options: ['Não tenho', 'Tenho, mas está desatualizado', 'Só tenho Instagram'] },
      ],
    },
  },
  en: {
    seo: {
      title: 'Professional websites for freelancers and small businesses',
      description:
        'Websites for electricians, lawyers, clinics, photographers and every independent professional: found on Google, clear about your services, one tap from WhatsApp.',
    },
    hero: {
      title: 'Your client searched on Google. They found your competitor.',
      subtitle: 'A simple, fast website of your own that shows what you do and sends people straight to your WhatsApp.',
      note: 'results for "electrician near me": you are not here',
      cta: 'I want to be found',
    },
    problem: {
      title: 'Today, people looking for you find…',
      items: [
        'Only an Instagram profile, which does not show up on Google.',
        'An old website that barely works on a phone.',
        'No clear list of services, areas served or prices.',
        'A phone number nobody answers after hours.',
      ],
    },
    solution: {
      title: 'Your whole business on one page that sells',
      text: 'Services, service area, photos of your work and a WhatsApp button that follows the screen. Built for people with no time to manage a website.',
      items: [
        'Your own domain and professional email',
        'A page per service, written for local searches',
        'Google Business Profile connected to the site',
        'Work gallery and reviews',
        'WhatsApp button with a pre-filled message',
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { title: '20-minute call', text: 'You tell me what you do, where and for whom.' },
        { title: 'I write and build', text: 'You send photos. Copy, structure and SEO are on me.' },
        { title: 'Approve on your phone', text: 'You get a link, comment, and I adjust.' },
        { title: 'Live', text: 'Domain, Google Business Profile and WhatsApp working.' },
      ],
    },
    proof: {
      title: 'Made for people who work alone',
      items: [
        { value: '7 days', label: 'from first message to live website' },
        { value: '0', label: 'mandatory platform subscriptions' },
        { value: '1 tap', label: 'for a client to message you' },
      ],
    },
    outcome: 'Found you on Google and saw you work in my neighborhood.',
    price: {
      prefix: 'from',
      amount: 'US$ 450',
      includes: ['Up to 5 pages', 'Domain and hosting for the first year', 'Google Business Profile setup'],
      note: 'Optional monthly maintenance.',
    },
    faq: [
      { question: 'Do I need to know tech?', answer: 'No. You answer a few questions and send photos. Domain, hosting, copy and Google are on me.' },
      { question: 'Isn’t Instagram enough?', answer: 'Instagram does not show up when someone searches "dentist in Austin" on Google. A website does, and it earns more trust from strangers.' },
      { question: 'Who owns the website?', answer: 'You do. Domain in your name and full access, no lock-in.' },
      { question: 'Do you work with my profession?', answer: 'I have built pages for electricians, lawyers, doctors, accountants, painters, photographers and more.' },
    ],
    form: {
      title: 'Let’s put you on the map',
      text: 'Quick answers, and I’ll reply with a proposal.',
      heading: 'Hi Breno! I came from the websites for freelancers page and would like a quote.',
      fields: [
        nameField.en,
        { name: 'profession', label: 'What do you do?', type: 'text', required: true, placeholder: 'e.g. electrician, therapist, lawyer' },
        { name: 'city', label: 'City you serve', type: 'text', autocomplete: 'address-level2' },
        { name: 'has_site', label: 'Do you have a website?', type: 'select', placeholder: 'Choose', options: ['No', 'Yes, but it’s outdated', 'Only Instagram'] },
      ],
    },
  },
};
