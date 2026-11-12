/**
 * Free calculators for the professions in `/para` (one per segment) and the invoice generator.
 * Written in Portuguese only: one canonical URL (`/tools/<slug>`) for every language prefix.
 */
export interface ProTool {
  slug: string;
  /** Slug of the matching segment page in `industries.data.ts`, if any. */
  segment?: string;
  /** Who it is for, e.g. "Eletricistas". */
  audience: string;
  name: string;
  /** Main search term, used in the title. */
  keyword: string;
  description: string;
  icon: string;
  /** Extra search terms for the command palette. */
  queries: string[];
  /** What the user types and what comes back, shown on the tools index. */
  asks: string[];
  gives: string[];
}

export const invoiceTool: ProTool = {
  slug: 'gerador-de-invoice',
  audience: 'Freelancers e empresas',
  name: 'Gerador de Invoice',
  keyword: 'crie invoices e faturas em PDF',
  description:
    'Crie invoices e faturas profissionais em minutos: perfis salvos de emissor e cliente, 10 modelos, cálculo automático de impostos e descontos, e exportação em PDF, DOCX, PNG ou link.',
  icon: 'tablerFileInvoice',
  queries: ['invoice', 'fatura', 'nota de cobrança', 'recibo', 'invoice generator', 'gerar invoice pdf'],
  asks: ['seus dados uma vez', 'cliente', 'itens'],
  gives: ['PDF', 'DOCX', 'PNG', 'link'],
};

export const proTools: ProTool[] = [
  {
    slug: 'calculadora-de-bitola-e-queda-de-tensao',
    segment: 'eletricista',
    audience: 'Eletricistas',
    name: 'Calculadora de Bitola e Queda de Tensão',
    keyword: 'calculadora de bitola de fio e queda de tensão',
    description:
      'Descubra a seção do cabo, a queda de tensão e o disjuntor indicado a partir da potência ou corrente, da tensão e da distância do circuito, com base nos critérios da NBR 5410.',
    icon: 'tablerBolt',
    queries: ['queda de tensão', 'bitola de fio', 'seção do cabo', 'dimensionamento de cabos', 'disjuntor', 'nbr 5410'],
    asks: ['potência ou corrente', 'tensão', 'distância'],
    gives: ['bitola do cabo', 'queda de tensão', 'disjuntor'],
  },
  {
    slug: 'calculadora-de-btu',
    segment: 'ar-condicionado',
    audience: 'Técnicos de ar-condicionado',
    name: 'Calculadora de BTU',
    keyword: 'calculadora de BTU para ar-condicionado',
    description:
      'Calcule a capacidade de ar-condicionado ideal para cada ambiente com área, pessoas, aparelhos e incidência de sol, e veja o modelo comercial indicado e o consumo estimado.',
    icon: 'tablerAirConditioning',
    queries: ['btu', 'capacidade ar condicionado', 'quantos btus', 'dimensionar split', 'consumo ar condicionado'],
    asks: ['área', 'pessoas', 'sol'],
    gives: ['BTU/h', 'modelo indicado', 'consumo em R$'],
  },
  {
    slug: 'calculadora-de-prazos-processuais',
    segment: 'advogado',
    audience: 'Advogados',
    name: 'Calculadora de Prazos Processuais',
    keyword: 'calculadora de prazos processuais do CPC',
    description:
      'Conte prazos em dias úteis conforme o CPC, com feriados nacionais, recesso forense e prazo em dobro, e veja o dia final e cada dia contado.',
    icon: 'tablerGavel',
    queries: ['prazo processual', 'contagem de prazo', 'dias úteis cpc', 'prazo em dobro', 'recesso forense', 'prazo recursal'],
    asks: ['data da intimação', 'prazo em dias'],
    gives: ['dia final', 'dias contados', 'feriados no caminho'],
  },
  {
    slug: 'calculadora-simples-nacional',
    segment: 'contador',
    audience: 'Contadores',
    name: 'Calculadora do Simples Nacional',
    keyword: 'calculadora de alíquota efetiva do Simples Nacional',
    description:
      'Calcule a alíquota efetiva e o valor do DAS a partir da receita bruta dos últimos 12 meses e do anexo, com Fator R para os serviços dos Anexos III e V.',
    icon: 'tablerReportMoney',
    queries: ['simples nacional', 'alíquota efetiva', 'das', 'fator r', 'anexo iii', 'rbt12'],
    asks: ['anexo', 'RBT12', 'receita do mês'],
    gives: ['alíquota efetiva', 'valor do DAS', 'Fator R'],
  },
  {
    slug: 'calculadora-de-idade-gestacional',
    segment: 'ginecologista',
    audience: 'Ginecologistas e obstetras',
    name: 'Calculadora de Idade Gestacional e DPP',
    keyword: 'calculadora de idade gestacional e data provável do parto',
    description:
      'Calcule a idade gestacional e a data provável do parto pela DUM ou por ultrassom, com trimestre atual e as janelas dos principais exames do pré-natal.',
    icon: 'tablerBabyCarriage',
    queries: ['idade gestacional', 'dpp', 'data provável do parto', 'dum', 'semanas de gestação', 'calculadora gestacional'],
    asks: ['DUM ou ultrassom'],
    gives: ['idade gestacional', 'DPP', 'janelas de exames'],
  },
];

/** Every Portuguese tool page under /tools, for routes, breadcrumbs and navigation. */
export const allProTools: ProTool[] = [...proTools, invoiceTool];
