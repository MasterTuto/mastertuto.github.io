/** Segment pages, in the order they appear in the index. Each segment lives in its own file. */
import { advogado } from './industries/advogado';
import { ginecologista } from './industries/ginecologista';
import { eletricista } from './industries/eletricista';
import { pintor } from './industries/pintor';
import { pedreiro } from './industries/pedreiro';
import { montadorDeMoveis } from './industries/montador-de-moveis';
import { limpadorDeVidros } from './industries/limpador-de-vidros';
import { jardineiro } from './industries/jardineiro';
import { arCondicionado } from './industries/ar-condicionado';
import { fotografo } from './industries/fotografo';
import { contador } from './industries/contador';
import { banhoETosa } from './industries/banho-e-tosa';
import { Industry } from './industries/industry.model';

export type { Industry } from './industries/industry.model';

export const industries: Industry[] = [
  advogado,
  ginecologista,
  eletricista,
  pintor,
  pedreiro,
  montadorDeMoveis,
  limpadorDeVidros,
  jardineiro,
  arCondicionado,
  fotografo,
  contador,
  banhoETosa,
];
