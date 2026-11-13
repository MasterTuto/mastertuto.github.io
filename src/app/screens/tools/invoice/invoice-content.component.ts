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
  template: `
    <div class="pro-reading">
      <section>
        <h2>Invoice não é nota fiscal</h2>
        <p>
          <strong>Invoice</strong> é o nome em inglês da <strong>fatura comercial</strong>: o documento em que você informa ao cliente o que
          entregou, quanto cobra, até quando e como ele deve pagar. É o padrão para cobrar clientes do exterior e também serve para cobranças
          no Brasil, como uma fatura de serviços ou um demonstrativo.
        </p>
        <p>
          Já a <strong>nota fiscal</strong> (NF-e para mercadorias, NFS-e para serviços) é o documento fiscal da legislação brasileira, emitido no
          sistema da prefeitura, da Sefaz ou no Emissor Nacional. Ela registra a operação para o fisco. Por isso a invoice
          <strong>não substitui a nota fiscal</strong> quando a nota é obrigatória: no mais comum, você emite a NFS-e e envia a invoice junto,
          como cobrança.
        </p>
        <p>
          Na <strong>exportação de serviços</strong> (cliente no exterior), há regras próprias: o ISS costuma ser isento quando o resultado do
          serviço se verifica fora do país, e PIS e Cofins podem não incidir quando o pagamento entra como divisas. Mesmo assim, muitas
          prefeituras exigem a NFS-e de exportação, e no Simples Nacional essa receita precisa ser separada na apuração. Cada caso depende do
          município, do regime e do tipo de serviço, então confirme com um contador. Para estimar o imposto do seu faturamento, use a
          <a [routerLink]="'tools/calculadora-simples-nacional' | langLink">Calculadora do Simples Nacional</a>, e se você é contador e quer
          atender melhor clientes que exportam, veja <a [routerLink]="'para/contador' | langLink">sites e automação para contadores</a>.
        </p>
      </section>

      <section>
        <h2>Como preencher cada campo</h2>
        <dl class="terms">
          <div><dt>Número</dt><dd>Use uma sequência sem buracos, com prefixo do ano (ex.: 2026-0042). O gerador avança o número sozinho a cada invoice salva ou exportada.</dd></div>
          <div><dt>Emissão e vencimento</dt><dd>O vencimento deixa o prazo claro. Os atalhos +7, +15 e +30 dias cobrem os prazos mais usados (em inglês, “Net 15”, “Net 30”).</dd></div>
          <div><dt>Emissor e cliente</dt><dd>Nome ou razão social, CPF/CNPJ (ou o Tax ID/VAT do cliente estrangeiro), e-mail e endereço. Para empresas de fora, o país faz diferença na contabilidade delas.</dd></div>
          <div><dt>Itens</dt><dd>Descreva o que foi entregue de forma que o financeiro do cliente reconheça sem perguntar: “Desenvolvimento do site – outubro, 32 h” é melhor que “Serviços”.</dd></div>
          <div><dt>Impostos e retenções</dt><dd>Só acrescente imposto se ele for cobrado à parte do preço combinado. Retenções, como IRRF quando o cliente é empresa, entram como “retido” e são descontadas do total. Empresas do Simples Nacional, em regra, recolhem tudo no DAS e não destacam ISS na fatura.</dd></div>
          <div><dt>Pagamento</dt><dd>Para clientes no Brasil, PIX é o caminho mais rápido: com a moeda em reais, o documento traz um QR Code com o valor exato. Para o exterior, informe IBAN, SWIFT ou um link de pagamento.</dd></div>
        </dl>
      </section>

      <section>
        <h2>Dicas para receber do exterior</h2>
        <ul>
          <li>Emita no idioma e na moeda do cliente e escreva a moeda no total (USD, EUR), para não haver dúvida.</li>
          <li>Plataformas como Wise, Payoneer ou contas globais costumam dar dados bancários locais (ACH, IBAN), mais baratos que uma transferência SWIFT direta.</li>
          <li>Em transferências SWIFT, combine quem paga as tarifas (OUR, SHA ou BEN): bancos intermediários podem descontar parte do valor.</li>
          <li>O banco ou a corretora pode pedir a invoice para registrar o contrato de câmbio. Compare o custo total (spread, tarifa e IOF), não só a cotação.</li>
          <li>Clientes dos Estados Unidos costumam pedir o formulário W-8BEN (pessoa física) ou W-8BEN-E (empresa) antes do primeiro pagamento.</li>
          <li>Recebendo como pessoa física, os rendimentos do exterior vão para o carnê-leão todo mês; como empresa, a receita entra na contabilidade normalmente.</li>
        </ul>
      </section>

      <section>
        <h2>Perguntas frequentes</h2>
        @for (item of faq; track item.question) {
          <details>
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        }
        <p class="note">Este conteúdo é informativo e não substitui a orientação de um contador.</p>
      </section>
    </div>
  `,
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
