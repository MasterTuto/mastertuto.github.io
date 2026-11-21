import { LandingContent } from '../landing.model';
import { detailsField, nameField } from './common';

/** Words of the modernizacao-de-sistemas page. */
export const modernizacaoDeSistemasCopy: LandingContent = {
  pt: {
    seo: {
      title: 'Modernização de sistemas legados: JSP, PHP e Delphi para web moderna',
      description:
        'Migração de sistema legado para Angular, React e Node.js sem parar a operação: por partes, com testes, mantendo dados e regras de negócio. Performance e segurança.',
    },
    hero: {
      title: 'O sistema funciona. Só que ninguém tem coragem de mexer.',
      subtitle: 'Eu modernizo sistemas legados por partes, sem parar a operação e sem perder as regras que só o código antigo conhece.',
      note: '// TODO: refatorar (2011)',
      cta: 'Modernizar sem parar',
    },
    problem: {
      title: 'O custo de deixar como está',
      items: [
        'Cada mudança pequena leva semanas e quebra outra coisa.',
        'Só uma pessoa entende o sistema — e ela quer sair.',
        'Telas lentas com listas grandes travando o navegador.',
        'Versões sem atualização de segurança há anos.',
      ],
    },
    solution: {
      title: 'Modernização em fatias, não reescrita do zero',
      text: 'A tela nova convive com a antiga até substituí-la. Os usuários sentem a melhora a cada entrega, e o risco fica sempre pequeno.',
      items: [
        'Mapeamento das regras de negócio escondidas no código',
        'Migração módulo a módulo (padrão strangler)',
        'Componentes reutilizáveis e arquitetura documentada',
        'Virtualização de listas e performance em grandes volumes',
        'Testes automatizados que protegem o que já funciona',
      ],
    },
    steps: {
      title: 'Como funciona',
      items: [
        { title: 'Arqueologia', text: 'Leio o código, converso com quem usa e listo os riscos.' },
        { title: 'Primeira fatia', text: 'Um módulo de alto uso migrado e em produção.' },
        { title: 'Fundação compartilhada', text: 'Componentes, autenticação e padrões para os próximos.' },
        { title: 'Ritmo constante', text: 'Uma fatia por ciclo até o legado sair de cena.' },
      ],
    },
    proof: {
      title: 'Já fiz esse caminho',
      items: [
        { value: 'JSP → Angular', label: 'sistema corporativo migrado com componentes compartilhados' },
        { value: 'PDF', label: 'motor de geração reutilizado por todo o produto' },
        { value: 'OWASP', label: 'certificações em segurança de aplicações' },
      ],
    },
    outcome: 'A gente voltou a lançar funcionalidade toda semana.',
    price: {
      prefix: 'diagnóstico a partir de',
      amount: 'R$ 3.000',
      includes: ['Mapa de módulos, riscos e regras', 'Plano de migração por fatias', 'Estimativa de cada etapa'],
      note: 'Migração em ciclos mensais com escopo e preço definidos.',
    },
    faq: [
      { question: 'Não é melhor reescrever do zero?', answer: 'Quase nunca. Reescritas longas congelam a evolução e perdem regras que ninguém documentou. Migrar por partes entrega valor antes e corre menos risco.' },
      { question: 'Quais linguagens vocês migram?', answer: 'JSP/Java, PHP, ASP clássico, Delphi web e jQuery para Angular ou React, com Node.js ou Java no back-end.' },
      { question: 'O banco de dados muda?', answer: 'Não precisa. Na maioria dos casos o banco fica e é melhorado aos poucos.' },
      { question: 'A equipe atual participa?', answer: 'Deve. Faço pareamento e documentação para o time assumir o código novo.' },
    ],
    form: {
      title: 'Conte sobre o seu legado',
      text: 'Sem julgamento: todo sistema que deu certo virou legado um dia.',
      heading: 'Olá, Breno! Vim pela página de modernização e quero conversar sobre um sistema legado.',
      fields: [
        nameField.pt,
        { name: 'empresa', label: 'Empresa', type: 'text', autocomplete: 'organization' },
        { name: 'tecnologia', label: 'Tecnologia atual', type: 'text', required: true, placeholder: 'Ex.: JSP + Oracle, PHP 5, Delphi' },
        { name: 'idade', label: 'Idade do sistema', type: 'select', placeholder: 'Escolha', options: ['Menos de 5 anos', '5 a 10 anos', 'Mais de 10 anos'] },
        detailsField.pt,
      ],
    },
  },
  en: {
    seo: {
      title: 'Legacy system modernization: JSP, PHP and Delphi to modern web',
      description:
        'Migrate legacy systems to Angular, React and Node.js without stopping operations: piece by piece, tested, keeping your data and business rules.',
    },
    hero: {
      title: 'The system works. Nobody dares to touch it.',
      subtitle: 'I modernize legacy systems in slices, without stopping operations or losing the rules only the old code knows.',
      note: '// TODO: refactor (2011)',
      cta: 'Modernize without stopping',
    },
    problem: {
      title: 'The cost of leaving it as is',
      items: [
        'Every small change takes weeks and breaks something else.',
        'Only one person understands the system — and they want to leave.',
        'Slow screens with large lists freezing the browser.',
        'Versions without security updates for years.',
      ],
    },
    solution: {
      title: 'Modernization in slices, not a rewrite from scratch',
      text: 'New screens live alongside old ones until they replace them. Users feel the improvement every delivery, and risk stays small.',
      items: [
        'Mapping of business rules hidden in the code',
        'Module-by-module migration (strangler pattern)',
        'Reusable components and documented architecture',
        'List virtualization and large-dataset performance',
        'Automated tests protecting what already works',
      ],
    },
    steps: {
      title: 'How it works',
      items: [
        { title: 'Archaeology', text: 'I read the code, talk to users and list the risks.' },
        { title: 'First slice', text: 'One high-traffic module migrated and in production.' },
        { title: 'Shared foundation', text: 'Components, auth and patterns for the next ones.' },
        { title: 'Steady pace', text: 'One slice per cycle until the legacy is gone.' },
      ],
    },
    proof: {
      title: 'I’ve walked this path',
      items: [
        { value: 'JSP → Angular', label: 'enterprise system migrated with shared components' },
        { value: 'PDF', label: 'generation engine reused across the product' },
        { value: 'OWASP', label: 'application security certifications' },
      ],
    },
    outcome: 'We’re shipping features every week again.',
    price: {
      prefix: 'assessment from',
      amount: 'US$ 1,000',
      includes: ['Map of modules, risks and rules', 'Slice-by-slice migration plan', 'Estimate for each stage'],
      note: 'Migration in monthly cycles with defined scope and price.',
    },
    faq: [
      { question: 'Isn’t a rewrite better?', answer: 'Almost never. Long rewrites freeze progress and lose undocumented rules. Migrating in slices delivers value sooner with less risk.' },
      { question: 'Which stacks do you migrate?', answer: 'JSP/Java, PHP, classic ASP, Delphi web and jQuery to Angular or React, with Node.js or Java on the back end.' },
      { question: 'Does the database change?', answer: 'It doesn’t have to. In most cases it stays and improves gradually.' },
      { question: 'Does the current team take part?', answer: 'It should. I pair and document so the team owns the new code.' },
    ],
    form: {
      title: 'Tell me about your legacy',
      text: 'No judgment: every successful system becomes legacy one day.',
      heading: 'Hi Breno! I came from the modernization page and want to talk about a legacy system.',
      fields: [
        nameField.en,
        { name: 'company', label: 'Company', type: 'text', autocomplete: 'organization' },
        { name: 'stack', label: 'Current technology', type: 'text', required: true, placeholder: 'e.g. JSP + Oracle, PHP 5, Delphi' },
        { name: 'age', label: 'System age', type: 'select', placeholder: 'Choose', options: ['Under 5 years', '5 to 10 years', 'Over 10 years'] },
        detailsField.en,
      ],
    },
  },
};
