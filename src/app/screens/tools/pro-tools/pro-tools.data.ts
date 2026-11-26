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
  {
    slug: 'calculadora-de-tijolos-e-blocos',
    segment: 'pedreiro',
    audience: 'Pedreiros e mestres de obra',
    name: 'Calculadora de Tijolos e Blocos',
    keyword: 'calculadora de tijolos e blocos por m²',
    description:
      'Calcule quantos tijolos ou blocos cerâmicos e de concreto a parede leva, descontando portas e janelas, com perda e a argamassa de assentamento em sacos de cimento, cal e latas de areia.',
    icon: 'tablerWall',
    queries: ['quantos tijolos por m2', 'blocos por metro quadrado', 'tijolo baiano', 'bloco de concreto', 'argamassa de assentamento', 'alvenaria'],
    asks: ['paredes', 'portas e janelas', 'bloco'],
    gives: ['blocos', 'argamassa', 'cimento, cal e areia'],
  },
  {
    slug: 'calculadora-de-concreto',
    segment: 'pedreiro',
    audience: 'Pedreiros e mestres de obra',
    name: 'Calculadora de Concreto e Traço',
    keyword: 'calculadora de concreto: sacos de cimento, areia e brita',
    description:
      'Calcule o volume de lajes, vigas, sapatas e brocas e quanto cimento, areia, brita e água o traço pede, em sacos, m³ e latas, com a verificação de durabilidade da NBR 6118.',
    icon: 'tablerBucket',
    queries: ['traço de concreto', 'quantos sacos de cimento por m3', 'concreto para laje', 'traço 1:2:3', 'concreto magro', 'fator água cimento'],
    asks: ['peça e medidas', 'traço'],
    gives: ['m³', 'sacos de cimento', 'latas de areia e brita'],
  },
  {
    slug: 'calculadora-de-piso-e-rejunte',
    segment: 'pedreiro',
    audience: 'Pedreiros e assentadores',
    name: 'Calculadora de Piso, Argamassa e Rejunte',
    keyword: 'calculadora de piso, argamassa colante e rejunte',
    description:
      'Calcule quantas caixas de piso ou revestimento comprar com a perda certa para a paginação, a argamassa colante indicada (AC-I, AC-II ou AC-III, com dupla colagem) e o rejunte em kg.',
    icon: 'tablerGrid4x4',
    queries: ['quantas caixas de piso', 'porcelanato', 'consumo de argamassa colante', 'quanto rejunte', 'dupla colagem', 'revestimento cerâmico'],
    asks: ['área', 'tamanho da peça', 'm² da caixa'],
    gives: ['caixas', 'sacos de argamassa', 'kg de rejunte'],
  },
  {
    slug: 'calculadora-de-escada',
    segment: 'pedreiro',
    audience: 'Pedreiros e mestres de obra',
    name: 'Calculadora de Escada',
    keyword: 'calculadora de escada pela fórmula de Blondel',
    description:
      'Descubra quantos degraus a escada precisa, a altura do espelho e a largura do piso pela fórmula de Blondel, com os limites da NBR 9050 e da NBR 9077, patamares e o vão na laje.',
    icon: 'tablerStairs',
    queries: ['quantos degraus', 'fórmula de blondel', 'altura do degrau', 'espelho e piso da escada', 'nbr 9050 escada', 'dimensionar escada'],
    asks: ['altura a vencer', 'espaço disponível'],
    gives: ['degraus', 'espelho e piso', 'comprimento'],
  },
  {
    slug: 'calculadora-de-salario-liquido',
    segment: 'contador',
    audience: 'Contadores e departamento pessoal',
    name: 'Calculadora de Salário Líquido 2026',
    keyword: 'descontos de INSS e IRRF com a isenção até R$ 5 mil',
    description:
      'Calcule o salário líquido de 2026 com a tabela progressiva do INSS, o IRRF com a isenção até R$ 5 mil da Lei 15.270/2025, dependentes, desconto simplificado e vale-transporte, faixa a faixa.',
    icon: 'tablerWallet',
    queries: ['salário líquido', 'desconto inss 2026', 'tabela irrf 2026', 'isenção ir 5 mil', 'holerite', 'calcular salário'],
    asks: ['salário bruto', 'dependentes'],
    gives: ['salário líquido', 'INSS por faixa', 'IRRF com redução'],
  },
  {
    slug: 'calculadora-de-custo-de-funcionario',
    segment: 'contador',
    audience: 'Contadores e empresários',
    name: 'Calculadora de Custo de Funcionário CLT',
    keyword: 'quanto custa um funcionário CLT para a empresa',
    description:
      'Descubra quanto um empregado CLT custa por mês e por ano: 13º, férias e 1/3, FGTS, INSS patronal, RAT × FAP, terceiros e benefícios, comparando Simples Nacional, Anexo IV e Lucro Presumido.',
    icon: 'tablerUsersGroup',
    queries: ['custo de funcionário', 'encargos trabalhistas', 'quanto custa um funcionário', 'inss patronal', 'provisão de férias e 13º', 'custo clt'],
    asks: ['salário', 'regime tributário'],
    gives: ['custo mensal e anual', 'encargos', 'multiplicador do salário'],
  },
  {
    slug: 'calculadora-de-rescisao-trabalhista',
    segment: 'advogado',
    audience: 'Advogados trabalhistas',
    name: 'Calculadora de Rescisão Trabalhista',
    keyword: 'cálculo de rescisão CLT com aviso prévio proporcional',
    description:
      'Calcule as verbas rescisórias: saldo de salário, aviso prévio proporcional da Lei 12.506/2011, 13º e férias proporcionais com 1/3, multa de 40% ou 20% do FGTS e os descontos de INSS e IRRF, por motivo de saída.',
    icon: 'tablerReceipt2',
    queries: ['rescisão trabalhista', 'cálculo de rescisão', 'verbas rescisórias', 'aviso prévio proporcional', 'multa 40% fgts', 'acordo 484-a'],
    asks: ['salário', 'admissão e saída', 'motivo'],
    gives: ['verbas rescisórias', 'FGTS e multa', 'prazo de pagamento'],
  },
  {
    slug: 'calculadora-de-honorarios-de-sucumbencia',
    segment: 'advogado',
    audience: 'Advogados',
    name: 'Calculadora de Honorários de Sucumbência',
    keyword: 'cálculo pelo art. 85 do CPC, inclusive contra a Fazenda',
    description:
      'Calcule os honorários de sucumbência do art. 85 do CPC: de 10% a 20% entre particulares, as faixas escalonadas em salários mínimos contra a Fazenda Pública, a majoração recursal do § 11 e os honorários contratuais.',
    icon: 'tablerScale',
    queries: ['honorários de sucumbência', 'art 85 cpc', 'honorários contra a fazenda pública', 'majoração recursal', 'honorários contratuais', 'honorários advocatícios'],
    asks: ['valor da condenação', 'parte vencida'],
    gives: ['honorários', 'faixas do § 3º', 'majoração no recurso'],
  },
  {
    slug: 'calculadora-de-energia-solar',
    segment: 'eletricista',
    audience: 'Eletricistas e integradores solares',
    name: 'Calculadora de Energia Solar',
    keyword: 'dimensionamento de sistema fotovoltaico e payback',
    description:
      'Dimensione o sistema fotovoltaico pelo consumo e pela irradiação da cidade: kWp, número de placas, inversor, área no telhado, geração mensal, economia com a regra do Fio B da Lei 14.300/2022 e payback em 25 anos.',
    icon: 'tablerSolarPanel2',
    queries: ['energia solar', 'quantas placas solares', 'dimensionamento fotovoltaico', 'kwp', 'payback energia solar', 'fio b lei 14.300'],
    asks: ['consumo em kWh', 'cidade', 'tipo de ligação'],
    gives: ['kWp e placas', 'inversor', 'economia e payback'],
  },
  {
    slug: 'calculadora-luminotecnica',
    segment: 'eletricista',
    audience: 'Eletricistas e projetistas',
    name: 'Calculadora Luminotécnica',
    keyword: 'quantas lâmpadas pelo método dos lúmens',
    description:
      'Calcule quantas lâmpadas ou luminárias o ambiente precisa pelo método dos lúmens, com o lux da NBR ISO/CIE 8995-1, índice do recinto, fator de utilização e de manutenção, a distribuição no teto e os watts por m².',
    icon: 'tablerBulb',
    queries: ['cálculo luminotécnico', 'quantas lâmpadas', 'método dos lúmens', 'lux por ambiente', 'nbr 8995', 'iluminação led'],
    asks: ['ambiente', 'medidas', 'lâmpada'],
    gives: ['luminárias', 'lux médio', 'distribuição no teto'],
  },
];

/** Every Portuguese tool page under /tools, for routes, breadcrumbs and navigation. */
export const allProTools: ProTool[] = [...proTools, invoiceTool];

/**
 * Segments that have tools, in display order, with the label and icon of their group. Add a segment
 * here when its first tool is added; `slug` matches the segment page (`/para/<slug>`) and `ProTool.segment`.
 * Kept here (not read from `industries.data.ts`) so the navigation does not pull every segment page.
 */
const SEGMENTS: { slug: string; name: string; icon: string }[] = [
  { slug: 'eletricista', name: 'Eletricistas', icon: 'tablerBolt' },
  { slug: 'pedreiro', name: 'Pedreiros e obras', icon: 'tablerTrowel' },
  { slug: 'ar-condicionado', name: 'Ar-condicionado', icon: 'tablerAirConditioning' },
  { slug: 'advogado', name: 'Advocacia', icon: 'tablerGavel' },
  { slug: 'contador', name: 'Contabilidade', icon: 'tablerReportMoney' },
  { slug: 'ginecologista', name: 'Ginecologia e obstetrícia', icon: 'tablerBabyCarriage' },
];

export interface ToolSegment {
  slug: string;
  name: string;
  icon: string;
  tools: ProTool[];
}

/** Tools grouped by segment; segments without tools are left out. */
export const toolSegments: ToolSegment[] = SEGMENTS.map((segment) => ({
  ...segment,
  tools: proTools.filter((tool) => tool.segment === segment.slug),
})).filter((segment) => segment.tools.length > 0);

/** How many tools a segment group shows before "Ver mais". */
export const TOOLS_PER_SEGMENT = 3;
/** How many segment groups the tools page shows before "Ver mais segmentos". */
export const SEGMENTS_ON_PAGE = 6;
/** How many segment links the header menu lists before "Ver todas". */
export const SEGMENTS_IN_MENU = 4;
