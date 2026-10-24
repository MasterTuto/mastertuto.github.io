import { industries } from '../data/industries.data';
import { services } from '../data/services.data';
import { inject, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { translations } from '../i18n/translations';
import { VERBS, VerbRecord } from './verb';

type NavigationCommand = [title: string, description: string, path: string, queries: string[]];

const destinations: Record<string, NavigationCommand> = {
  industries: ['Soluções por profissão', 'Sites e automação para sua rotina', '/para', ['nichos', 'profissões', 'site para meu negócio', 'presença online', 'automação', 'quero um site', 'orçamento', 'contratar', 'whatsapp', 'landing page']],
  ...Object.fromEntries(industries.map((page): [string, NavigationCommand] => [page.slug, [page.name, page.intro, `/para/${page.slug}`, [...page.queries, `site para ${page.name}`, `automação para ${page.name}`, `orçamento ${page.name}`, `presença online ${page.name}`]]])),
  ...Object.fromEntries(services.map((page): [string, NavigationCommand] => [page.slug, [page.slug.replaceAll('-', ' '), 'Conheça o serviço e solicite um projeto', `/services/${page.slug}`, [page.slug.replaceAll('-', ' '), `quero ${page.slug.replaceAll('-', ' ')}`]]])),
  home: ['Home', 'Go to the home page', '', ['home', 'start', 'início', 'inicio', 'página inicial']],
  services: ['Services', 'Explore services', '/services', ['services', 'service', 'serviços', 'servicos']],
  games: ['Games', 'Browse games', '/games', ['games', 'play games', 'jogos', 'jogar']],
  queens: ['Queens', 'Play Queens', '/games/queens', ['queens', 'rainhas', 'play queens']],
  sudoku: ['Sudoku', 'Play Sudoku', '/games/sudoku', ['sudoku', 'play sudoku']],
  wordLadder: ['Word Ladder', 'Play Word Ladder', '/games/word-ladder', ['word ladder', 'words', 'palavras']],
  tools: ['Developer tools', 'Browse developer tools', '/tools/dev-tools', ['tools', 'dev tools', 'ferramentas']],
  jsonBeautifier: ['JSON Beautifier', 'Format and validate JSON', '/tools/dev-tools/json-beautifier', ['json', 'format json', 'beautify json', 'formatar json']],
  jwtDecoder: ['JWT Decoder', 'Inspect a JWT token', '/tools/dev-tools/jwt-decoder', ['jwt', 'decode token', 'decodificar token']],
};

export function provideNavigationVerbs(): Provider {
  return {
    provide: VERBS,
    multi: true,
    useFactory: (): VerbRecord => {
      const router = inject(Router);
      const verbs: VerbRecord = {
        help: {
          id: 'help',
          title: 'Help',
          description: 'See what this palette can do',
          queries: ['help', 'what can you do', 'ajuda', 'comandos'],
          run: () => ({
            message: 'Busque uma profissão, serviço, jogo, ferramenta ou idioma. Experimente: site para pintor, agendar consultas, JSON, Sudoku ou mudar idioma.',
          }),
        },
      };

      for (const [id, [title, description, path, queries]] of Object.entries(destinations)) {
        verbs[id] = {
          id,
          title,
          description,
          queries: [...queries, `open ${title}`, `go to ${title}`, `abrir ${title}`, `ir para ${title}`, `buscar ${title}`, `quero ver ${title}`],
          run: async () => {
            const firstSegment = router.url.split(/[/?#]/).filter(Boolean)[0];
            const language = firstSegment && firstSegment in translations ? `/${firstSegment}` : '';
            const destination = `${language}${path}` || '/';
            await router.navigateByUrl(destination);
            return { message: `Opened ${title}.`, close: true };
          },
        };
      }

      return verbs;
    },
  };
}
