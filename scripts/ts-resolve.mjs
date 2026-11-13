/**
 * Lets Node scripts and tests import the app's TypeScript sources directly. The app imports siblings
 * without an extension (`./games/minesweeper/pt`), which the Angular build resolves but Node does not:
 * this hook retries a failed relative import with `.ts` and `/index.ts`.
 * Usage: `node --import ./scripts/ts-resolve.mjs ...`
 */
import { register } from 'node:module';

register(
  'data:text/javascript,' +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try {
          return await next(specifier, context);
        } catch (error) {
          if (error?.code !== 'ERR_MODULE_NOT_FOUND' || !/^\\.{1,2}\\//.test(specifier) || /\\.[cm]?[jt]s$/.test(specifier)) throw error;
          for (const suffix of ['.ts', '/index.ts']) {
            try { return await next(specifier + suffix, context); } catch {}
          }
          throw error;
        }
      }
    `),
);
