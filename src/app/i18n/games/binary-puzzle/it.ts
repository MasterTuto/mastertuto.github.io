import type { BinaryPuzzleStrings } from './en';

/** Binary puzzle strings (it). */
export const binaryPuzzle: BinaryPuzzleStrings = {
  name: "Puzzle binario",
  description:
    'Riempi la griglia con 0 e 1: mai tre uguali di fila, lo stesso numero in ogni linea e nessuna riga ripetuta, in 6×6, 8×8 e 10×10.',
  seo: {
    title: 'Puzzle binario online gratis: Takuzu e Binairo del giorno',
    description:
      'Gioca gratis al puzzle binario (Takuzu, Binairo) nel browser: griglie 6×6, 8×8 e 10×10, sfida del giorno, riempimento trascinando, aiuti e soluzione unica.',
  },
  size: 'Dimensione griglia',
  mode: 'Puzzle',
  daily: 'Del giorno',
  random: 'Casuale',
  undo: 'Annulla',
  clear: 'Svuota',
  hint: 'Aiuto',
  hints: 'Aiuti',
  filled: 'Riempite',
  board: 'Griglia del puzzle binario',
  cell: 'Riga {r}, colonna {c}',
  empty: 'vuota',
  given: 'fissa',
  broken: 'viola una regola',
  controlsTip: 'Tocca per alternare vuoto → 0 → 1. Trascina per mettere la stessa cifra su più caselle. Funzionano anche i tasti 0 e 1.',
  solved: 'Risolto!',
  solvedIn: 'Hai completato la griglia {size} in {time}.',
  dailyTag: 'sfida del giorno',
  hintRules: {
    pair: 'Due cifre uguali vicine: le caselle alle due estremità prendono l’altra cifra.',
    gap: 'Una casella tra due cifre uguali deve prendere l’altra cifra.',
    count: 'Questa linea ha già metà di una cifra, quindi il resto prende l’altra.',
    line: 'Qui ci sta una sola cifra: l’altra violerebbe una regola più avanti in questa linea.',
    fix: 'Questa casella era sbagliata ed è stata svuotata.',
    reveal: 'Questa casella è stata rivelata.',
  },
  howTo: {
    title: 'Come si gioca',
    s1: 'Riempi ogni casella vuota con uno 0 o un 1.',
    s2: 'Al massimo due cifre uguali possono stare vicine in una riga o colonna: 0 0 va bene, 0 0 0 no.',
    s3: 'Ogni riga e ogni colonna contiene tanti 0 quanti 1.',
    s4: 'Non possono esserci due righe uguali, né due colonne uguali.',
  },
  tips: {
    title: 'Consigli',
    t1: 'Cerca prima le coppie: accanto a 1 1 c’è uno 0 da entrambi i lati. Poi i buchi: in 0 _ 0 quella in mezzo è un 1.',
    t2: 'Conta man mano. Quando una riga da 8 ha già quattro 1, tutte le caselle vuote rimaste sono 0.',
    t3: 'Bloccato? Prova una cifra a mente e seguila per qualche casella; se porta a tre uguali o a troppe di una cifra, è giusta l’altra. Il bordo rosso indica le regole violate.',
  },
  faq: {
    title: 'Domande frequenti',
    q1: 'Ogni puzzle ha una sola soluzione?',
    a1: 'Sì. Ogni griglia nasce da una soluzione completa e le cifre vengono tolte solo finché un risolutore logico riesce a completarla: la risposta è una sola e non serve mai tirare a indovinare.',
    q2: 'Cosa significa il bordo rosso?',
    a2: 'Segnala subito una regola violata: tre cifre uguali di fila, troppi 0 o 1 in una linea, oppure due righe o colonne complete identiche. Non dice se la casella coincide con la soluzione.',
    q3: 'Come funziona l’aiuto?',
    a3: 'Se c’è una casella sbagliata la corregge; altrimenti riempie una casella che si può già dedurre e spiega il ragionamento. Il numero di aiuti usati compare accanto al tuo tempo.',
    q4: 'È lo stesso gioco di Takuzu e Binairo?',
    a4: 'Sì. Puzzle binario, Takuzu, Binairo, Binero e 0h h1 sono nomi per le stesse regole. Alcune versioni usano due colori al posto delle cifre; qui hai entrambi.',
  },
  about: {
    title: 'Il puzzle binario',
    p1: 'Il puzzle binario è un gioco di logica con tre regole semplici e un ragionamento sorprendentemente profondo. È diventato famoso nei Paesi Bassi e in Francia con i nomi Binairo e Takuzu, e oggi affianca il Sudoku nelle riviste di enigmistica.',
    p2: 'Ogni deduzione nasce da un piccolo schema: una coppia fissa le vicine, un buco fissa la casella centrale, un conteggio completo chiude la linea e il divieto di righe uguali risolve le ultime caselle. Le griglie grandi insegnano a leggere intere linee in un colpo solo.',
    p3: 'Questa versione gratuita funziona nel browser senza registrazione. Inizia dal 6×6 per imparare gli schemi, passa all’8×8 e prova il 10×10 quando vuoi un vero allenamento. Ogni giorno c’è una nuova sfida per ogni dimensione.',
  },
};
