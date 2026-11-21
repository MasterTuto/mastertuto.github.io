import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LangLinkPipe } from 'src/app/pipes/lang-link/lang-link.pipe';
import type { FaqItem } from '../pro-tools/pro-tool-seo';

export const INVOICE_FAQ: FaqItem[] = [
  {
    question: 'Invoice é a mesma coisa que nota fiscal?',
    answer:
      'Não. A invoice (ou fatura) é um documento comercial de cobrança: diz o que foi vendido, quanto custa e como pagar. A nota fiscal (NF-e ou NFS-e) é o documento fiscal exigido pela legislação brasileira e emitido no sistema da prefeitura ou da Sefaz. A invoice não substitui a nota fiscal quando ela é obrigatória.',
  },
  {
    question: 'Preciso emitir nota fiscal para cliente do exterior?',
    answer:
      'Depende do seu enquadramento e da sua cidade. Muitas prefeituras exigem a NFS-e também na exportação de serviços, mesmo quando há isenção de ISS, e a receita de exportação tem regras próprias no Simples Nacional. Confirme com o seu contador antes de faturar.',
  },
  {
    question: 'Onde ficam salvos os meus dados e invoices?',
    answer:
      'Somente no seu navegador (armazenamento local). Nada é enviado para um servidor. Para levar os dados para outro aparelho, use “Exportar backup” e depois “Importar backup”.',
  },
  {
    question: 'Como fazer uma invoice em inglês e em dólar?',
    answer:
      'Em “Dados da invoice”, escolha o idioma do documento (Português, English ou Español) e a moeda (USD, EUR, GBP e outras). Títulos, datas e valores mudam de formato na hora; o cadastro do cliente pode guardar o idioma e a moeda preferidos.',
  },
  {
    question: 'Quem tem o link compartilhado consegue ver a invoice?',
    answer:
      'Sim. O link carrega a própria invoice compactada depois do “#”, por isso a página abre o documento sem consultar servidor. Qualquer pessoa com o link vê os dados; envie apenas para o cliente.',
  },
];

/** Long-form content under the tool: invoice vs nota fiscal, how to fill it, international payments, FAQ. */
@Component({
  selector: 'app-invoice-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LangLinkPipe],
  templateUrl: './invoice-content.component.html',
  styles: `
    .terms { display: grid; }
    .terms div { display: grid; gap: .25rem 2rem; padding: .9rem 0; border-top: 1px solid rgb(68 74 81 / .1); }
    @media (min-width: 640px) { .terms div { grid-template-columns: 11rem 1fr; } }
    .terms dt { font-weight: 650; color: #151c25; }
    .note { margin-top: 1.25rem; color: #8e9095; font-size: .85rem; }
  `,
})
export class InvoiceContentComponent {
  readonly faq = INVOICE_FAQ;
}
