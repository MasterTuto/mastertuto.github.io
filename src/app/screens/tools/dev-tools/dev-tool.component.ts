import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CatalogLayoutComponent } from 'src/app/components/catalog-layout/catalog-layout.component';
import { decodeJwt, formatJson, jsonError, numericDate, tokenTiming } from './dev-tools.logic';
import { devTools } from './dev-tools.data';

@Component({
  selector: 'app-dev-tool',
  imports: [CatalogLayoutComponent, RouterLink],
  templateUrl: './dev-tool.component.html',
  styleUrl: './dev-tool.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevToolComponent {
  readonly isJson = inject(ActivatedRoute).snapshot.data['tool'] === 'json';
  readonly tool = devTools[this.isJson ? 0 : 1];
  readonly related = devTools[this.isJson ? 1 : 0];
  readonly source = signal('');
  readonly indent = signal('  ');
  readonly minified = signal(false);
  readonly feedback = signal('');
  readonly now = signal(Date.now() / 1000);
  readonly result = computed(() => {
    const source = this.source();
    if (!source.trim()) return { output: '', error: '', jwt: null };
    try {
      if (this.isJson) return { output: formatJson(source, this.minified() ? '' : this.indent()), error: '', jwt: null };
      return { output: '', error: '', jwt: decodeJwt(source) };
    } catch (error) {
      return { output: '', error: this.isJson ? jsonError(source, error) : (error as Error).message, jwt: null };
    }
  });
  readonly header = computed(() => JSON.stringify(this.result().jwt?.header, null, 2) ?? '');
  readonly payload = computed(() => JSON.stringify(this.result().jwt?.payload, null, 2) ?? '');
  readonly timing = computed(() => this.result().jwt ? tokenTiming(this.result().jwt!.payload, this.now()) : '');
  readonly claims = computed(() => Object.entries(this.result().jwt?.payload ?? {}).map(([name, value]) => ({
    name,
    value: JSON.stringify(value),
    meaning: ({ iss: 'Issuer', sub: 'Subject', aud: 'Audience', exp: 'Expiration time', nbf: 'Not before', iat: 'Issued at', jti: 'Token identifier' } as Record<string, string>)[name] ?? 'Custom claim',
    date: ['exp', 'nbf', 'iat'].includes(name) ? numericDate(value) ?? 'Invalid NumericDate: use seconds since the Unix epoch.' : '',
  })));

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (!this.isJson) {
        const timer = setInterval(() => this.now.set(Date.now() / 1000), 1000);
        destroyRef.onDestroy(() => clearInterval(timer));
      }
    });
  }

  updateSource(value: string): void {
    this.source.set(value);
    this.feedback.set('');
  }

  example(): void {
    if (this.isJson) this.updateSource('{"project":"JSON Beautifier Pro","ready":true,"features":["Format","Validate","Minify"],"settings":{"indent":2,"theme":"dark"},"note":null}');
    else {
      const encode = (value: unknown) => btoa(JSON.stringify(value)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
      const now = Math.floor(Date.now() / 1000);
      this.updateSource(`${encode({ alg: 'none', typ: 'JWT' })}.${encode({ sub: 'demo-user', name: 'Alex Example', iss: 'https://example.com', aud: 'demo-app', iat: now, nbf: now, exp: now + 3600, role: 'reader' })}.`);
    }
  }

  async copy(value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.feedback.set('Copied to clipboard.');
    } catch {
      this.feedback.set('Clipboard access is unavailable. Select the output and copy it manually.');
    }
  }
}
