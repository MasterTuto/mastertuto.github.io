import { ChangeDetectionStrategy, Component, PLATFORM_ID, computed, inject, input, model, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { InputMaskDirective } from 'src/app/components/forms/input-mask.directive';
import { focusNextField } from 'src/app/components/forms/form-flow';
import { BRAND_COLORS, LANG_NAMES, MAIN_CURRENCIES, OTHER_CURRENCIES, TEMPLATE_IDS, TEMPLATE_NAMES, currencyName } from '../invoice.logic';
import type { DocLang, Party } from '../invoice.types';
import { brPhoneError, cepError, cpfCnpjError, detectPixKey, emailError, onlyDigits } from '../invoice.validation';
import { resizeImage } from '../invoice.image';
import { NumberInputDirective } from './number-input.directive';

export type PartySection = 'identity' | 'address' | 'payment' | 'brand' | 'defaults';

export const UFS = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
const COUNTRIES = [
  'Alemanha', 'Argentina', 'Austrália', 'Áustria', 'Bélgica', 'Bolívia', 'Canadá', 'Chile', 'China', 'Colômbia', 'Coreia do Sul',
  'Dinamarca', 'Emirados Árabes Unidos', 'Espanha', 'Estados Unidos', 'Finlândia', 'França', 'Holanda', 'Índia', 'Irlanda', 'Israel',
  'Itália', 'Japão', 'México', 'Noruega', 'Nova Zelândia', 'Paraguai', 'Peru', 'Polônia', 'Portugal', 'Reino Unido', 'Singapura',
  'Suécia', 'Suíça', 'Uruguai',
];

let nextId = 0;

/**
 * Fields of a business profile or a client. `sections` picks the groups to show (the first-run stepper
 * shows one group per step). Errors appear only after a field loses focus.
 */
@Component({
  selector: 'app-party-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InputMaskDirective, NumberInputDirective],
  templateUrl: './party-form.component.html',
  styles: `
    :host { display: grid; gap: 1.1rem; }
    .group-title { display: flex; align-items: baseline; gap: .6rem; padding-top: 1rem; border-top: 1px solid rgb(68 74 81 / .1); font-size: .95rem; font-weight: 650; }
    .group-title:first-child { padding-top: 0; border-top: 0; }
    .swatch { width: 36px; height: 36px; border-radius: 999px; border: 2px solid #fff; box-shadow: 0 0 0 1px rgb(0 0 0 / .15); }
    .swatch[aria-pressed=true] { box-shadow: 0 0 0 2px #151c25; }
    .logo-box { display: grid; place-items: center; width: 112px; height: 72px; border: 1px dashed rgb(68 74 81 / .3); border-radius: .8rem; background: #fff; overflow: hidden; }
    .logo-box img { max-width: 100%; max-height: 100%; object-fit: contain; }
  `,
})
export class PartyFormComponent {
  readonly party = model.required<Party>();
  readonly sections = input<PartySection[]>(['identity', 'address', 'payment', 'brand', 'defaults']);
  /** Show group headings (off in the stepper, which has its own). */
  readonly headings = input(true);

  readonly uid = `pf${nextId++}`;
  readonly ufs = UFS;
  readonly countries = COUNTRIES;
  readonly brandColors = BRAND_COLORS;
  readonly currencies = [...MAIN_CURRENCIES, ...OTHER_CURRENCIES].map((code) => ({ code, name: currencyName(code) }));
  readonly langs = Object.entries(LANG_NAMES) as [DocLang, string][];
  readonly templates = TEMPLATE_IDS.map((id) => ({ id, name: TEMPLATE_NAMES[id] }));

  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly touched = signal<ReadonlySet<string>>(new Set());
  readonly cepStatus = signal<'idle' | 'loading' | 'ok' | 'fail'>('idle');
  readonly logoError = signal('');

  readonly isEmitter = computed(() => this.party().kind === 'emitter');
  readonly pix = computed(() => detectPixKey(this.party().pixKey));
  readonly errors = computed(() => {
    const p = this.party();
    const seen = this.touched();
    const show = (key: string, message: string | null) => (seen.has(key) ? message : null);
    return {
      name: show('name', p.name.trim() ? null : 'Informe o nome ou a razão social.'),
      taxId: show('taxId', p.international ? null : cpfCnpjError(p.taxId)),
      email: show('email', emailError(p.email)),
      phone: show('phone', p.international ? null : brPhoneError(p.phone)),
      cep: show('cep', cepError(p.cep)),
      pixKey: show('pixKey', p.pixKey.trim() && !this.pix().valid ? 'Chave PIX não reconhecida: use CPF, CNPJ, e-mail, celular ou chave aleatória.' : null),
    };
  });

  has(section: PartySection): boolean {
    return this.sections().includes(section);
  }

  set<K extends keyof Party>(key: K, value: Party[K]): void {
    this.party.update((p) => ({ ...p, [key]: value }));
  }

  text(key: keyof Party, event: Event): void {
    this.set(key, (event.target as HTMLInputElement).value as never);
  }

  touch(key: string): void {
    if (!this.touched().has(key)) this.touched.update((set) => new Set([...set, key]));
  }

  /** Marks the given fields as visited so their errors show (used before saving). Returns whether all are valid. */
  validate(): boolean {
    this.touched.set(new Set(['name', 'taxId', 'email', 'phone', 'cep', 'pixKey']));
    return Object.values(this.errors()).every((error) => !error);
  }

  setInternational(international: boolean): void {
    this.party.update((p) => ({ ...p, international, country: international ? (p.country === 'Brasil' ? '' : p.country) : 'Brasil' }));
  }

  onCep(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.set('cep', input.value);
    const digits = onlyDigits(input.value);
    if (digits.length === 8 && !this.party().international) void this.lookupCep(digits, input);
    else this.cepStatus.set('idle');
  }

  private async lookupCep(cep: string, input: HTMLInputElement): Promise<void> {
    if (!this.browser) return;
    this.cepStatus.set('loading');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal });
      const data = (await response.json()) as { erro?: unknown; logradouro?: string; bairro?: string; localidade?: string; uf?: string };
      if (!response.ok || data.erro) throw new Error('not found');
      if (onlyDigits(this.party().cep) !== cep) return;
      this.party.update((p) => ({
        ...p,
        street: data.logradouro || p.street,
        district: data.bairro || p.district,
        city: data.localidade || p.city,
        uf: data.uf || p.uf,
        country: 'Brasil',
      }));
      this.cepStatus.set('ok');
      // Street known: jump to the number, the next thing only the person knows.
      if (data.logradouro) {
        const form = input.closest('app-party-form');
        const number = form?.querySelector<HTMLInputElement>(`#${this.uid}-number`);
        const active = input.ownerDocument.activeElement;
        if (number && (active === input || active === form?.querySelector(`#${this.uid}-street`))) number.focus();
      }
    } catch {
      this.cepStatus.set('fail');
    } finally {
      clearTimeout(timer);
    }
  }

  async onLogo(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    this.logoError.set('');
    try {
      this.set('logo', await resizeImage(file, 400));
    } catch (error) {
      this.logoError.set((error as Error).message);
    }
  }

  next(event: Event): void {
    focusNextField(event.target as HTMLElement);
  }
}
