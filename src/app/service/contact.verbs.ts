import { DOCUMENT } from '@angular/common';
import { inject, Provider } from '@angular/core';

import { BcsColorSchemeService } from '@bcs/services/color-scheme/color-scheme.service';
import { createWhatsAppLink } from '../utils/html';
import { VERBS, VerbRecord } from './verb';

/** Palette commands for talking to me and for the color scheme. */
export function provideContactVerbs(): Provider {
  return {
    provide: VERBS,
    multi: true,
    useFactory: (): VerbRecord => {
      const document = inject(DOCUMENT);
      const scheme = inject(BcsColorSchemeService);

      return {
        whatsapp: {
          id: 'whatsapp',
          title: 'WhatsApp',
          description: 'Conversar agora sobre o seu projeto',
          queries: [
            'whatsapp', 'zap', 'wpp', 'contato', 'contact', 'telefone', 'phone', 'celular', 'conversar', 'falar',
            'falar com breno', 'chamar', 'mensagem', 'message', 'talk', 'chat', 'orçamento', 'orcamento',
            'pedir orçamento', 'quote', 'hire', 'contratar', 'reunião', 'ligar',
          ],
          run: () => {
            document.defaultView?.open(createWhatsAppLink('Olá, Breno! Vim pelo seu site.'), '_blank', 'noopener');
            return { message: 'Abrindo o WhatsApp…', close: true };
          },
        },
        colorScheme: {
          id: 'colorScheme',
          title: 'Trocar tema',
          description: 'Modo claro ⇄ escuro',
          queries: [
            'trocar tema', 'mudar tema', 'tema', 'modo escuro', 'modo claro', 'dark mode', 'light mode', 'dark',
            'light', 'escuro', 'claro', 'theme', 'toggle theme', 'noite', 'dia',
          ],
          run: () => {
            scheme.toggle();
            return { message: scheme.scheme() === 'dark' ? 'Modo escuro ativado.' : 'Modo claro ativado.' };
          },
        },
      };
    },
  };
}
