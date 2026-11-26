import type { LandingCommon, LandingLanguage } from '../landing.model';

export const landingCommon: Readonly<Record<LandingLanguage, LandingCommon>> = {
  pt: {
    priceLabel: 'Investimento',
    faqTitle: 'Perguntas frequentes',
    relatedTitle: 'Também resolvo',
    allServices: 'Ver todos os serviços',
    submit: 'Continuar no WhatsApp',
    formNote: 'Nada é enviado para servidor: suas respostas viram uma mensagem pronta no WhatsApp, você revisa e envia.',
    messages: {
      required: 'Preencha este campo.',
      email: 'Digite um e-mail válido, como nome@empresa.com.',
      tel: 'Digite o telefone com DDD.',
      select: 'Escolha uma opção.',
    },
  },
  en: {
    priceLabel: 'Investment',
    faqTitle: 'Frequently asked questions',
    relatedTitle: 'I also solve',
    allServices: 'See all services',
    submit: 'Continue on WhatsApp',
    formNote: 'Nothing goes to a server: your answers become a ready-made WhatsApp message that you review and send.',
    messages: {
      required: 'Fill in this field.',
      email: 'Enter a valid email, like name@company.com.',
      tel: 'Enter the phone number with area code.',
      select: 'Choose an option.',
    },
  },
};

/** Name field, first in every form. */
export const nameField = {
  pt: { name: 'nome', label: 'Seu nome', type: 'text', required: true, autocomplete: 'name' },
  en: { name: 'name', label: 'Your name', type: 'text', required: true, autocomplete: 'name' },
} as const;

/** Free-text field, last in every form. */
export const detailsField = {
  pt: { name: 'detalhes', label: 'Algo mais que eu deva saber?', type: 'textarea', placeholder: 'Prazo, referência, link do site atual…' },
  en: { name: 'details', label: 'Anything else I should know?', type: 'textarea', placeholder: 'Deadline, references, link to the current site…' },
} as const;
