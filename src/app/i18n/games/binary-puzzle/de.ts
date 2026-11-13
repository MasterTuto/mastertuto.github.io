import type { BinaryPuzzleStrings } from './en';

/** Binary puzzle strings (de). */
export const binaryPuzzle: BinaryPuzzleStrings = {
  name: "Binärpuzzle",
  description:
    'Fülle das Raster mit 0 und 1: nie drei gleiche nebeneinander, gleich viele in jeder Linie und keine doppelten Zeilen, in 6×6, 8×8 und 10×10.',
  seo: {
    title: 'Binärpuzzle online gratis: Takuzu und Binairo täglich',
    description:
      'Spiele das Binärpuzzle (Takuzu, Binairo) kostenlos im Browser: 6×6, 8×8 und 10×10, Tagesrätsel, Ausfüllen per Ziehen, Live-Regelprüfung, Tipps, eine Lösung.',
  },
  size: 'Rastergröße',
  mode: 'Rätsel',
  daily: 'Täglich',
  random: 'Zufällig',
  undo: 'Rückgängig',
  clear: 'Leeren',
  hint: 'Tipp',
  hints: 'Tipps',
  filled: 'Gefüllt',
  board: 'Binärpuzzle-Raster',
  cell: 'Zeile {r}, Spalte {c}',
  empty: 'leer',
  given: 'vorgegeben',
  broken: 'verletzt eine Regel',
  controlsTip: 'Tippe, um leer → 0 → 1 zu wechseln. Ziehe, um dieselbe Ziffer auf mehrere Felder zu setzen. Die Tasten 0 und 1 gehen auch.',
  solved: 'Gelöst!',
  solvedIn: 'Du hast das {size}-Raster in {time} gelöst.',
  dailyTag: 'Tagesrätsel',
  hintRules: {
    pair: 'Zwei gleiche Ziffern nebeneinander: Die Felder an beiden Enden bekommen die andere Ziffer.',
    gap: 'Ein Feld zwischen zwei gleichen Ziffern bekommt die andere Ziffer.',
    count: 'Diese Linie hat schon die Hälfte einer Ziffer, der Rest bekommt also die andere.',
    line: 'Hier passt nur eine Ziffer: Die andere würde später in dieser Linie eine Regel verletzen.',
    fix: 'Dieses Feld war falsch und wurde geleert.',
    reveal: 'Dieses Feld wurde aufgedeckt.',
  },
  howTo: {
    title: 'So wird gespielt',
    s1: 'Fülle jedes leere Feld mit einer 0 oder einer 1.',
    s2: 'Höchstens zwei gleiche Ziffern dürfen in einer Zeile oder Spalte nebeneinanderstehen: 0 0 ist erlaubt, 0 0 0 nicht.',
    s3: 'Jede Zeile und jede Spalte enthält gleich viele 0 und 1.',
    s4: 'Keine zwei Zeilen und keine zwei Spalten dürfen identisch sein.',
  },
  tips: {
    title: 'Tipps',
    t1: 'Suche zuerst Paare: Neben 1 1 steht auf beiden Seiten eine 0. Dann Lücken: Bei 0 _ 0 ist die Mitte eine 1.',
    t2: 'Zähle mit. Hat eine 8er-Zeile schon vier 1, sind alle übrigen leeren Felder darin 0.',
    t3: 'Festgefahren? Setze im Kopf eine Ziffer und verfolge sie ein paar Felder; führt sie zu drei gleichen oder zu vielen einer Ziffer, ist die andere richtig. Rote Umrandungen zeigen Regelverstöße.',
  },
  faq: {
    title: 'Häufige Fragen',
    q1: 'Hat jedes Rätsel genau eine Lösung?',
    a1: 'Ja. Jedes Raster entsteht aus einer vollständigen Lösung, und Ziffern werden nur entfernt, solange ein logischer Löser es noch beenden kann. Es gibt also genau eine Antwort, und du musst nie raten.',
    q2: 'Was bedeuten die roten Umrandungen?',
    a2: 'Sie zeigen sofort einen Regelverstoß: drei gleiche Ziffern in Folge, zu viele 0 oder 1 in einer Linie oder zwei identische vollständige Zeilen oder Spalten. Ob ein Feld zur Lösung passt, verraten sie nicht.',
    q3: 'Wie funktioniert der Tipp?',
    a3: 'Hast du ein falsches Feld, korrigiert er es; sonst füllt er ein Feld, das sich gerade ableiten lässt, und erklärt den Gedankengang. Die Zahl der genutzten Tipps steht neben deiner Zeit.',
    q4: 'Ist das dasselbe wie Takuzu und Binairo?',
    a4: 'Ja. Binärpuzzle, Takuzu, Binairo, Binero und 0h h1 sind Namen für dieselben Regeln. Manche Versionen nutzen zwei Farben statt Ziffern; hier bekommst du beides.',
  },
  about: {
    title: 'Über das Binärpuzzle',
    p1: 'Das Binärpuzzle ist ein Logikspiel mit drei einfachen Regeln und erstaunlich tiefem Denken. Bekannt wurde es in den Niederlanden und Frankreich als Binairo und Takuzu, und heute steht es in Rätselheften gleich neben dem Sudoku.',
    p2: 'Jeder Schluss beruht auf einem kleinen Muster: Ein Paar legt seine Nachbarn fest, eine Lücke ihre Mitte, eine volle Zählung schließt die Linie, und das Verbot gleicher Zeilen klärt die letzten offenen Felder. Größere Raster verlangen, ganze Linien auf einmal zu lesen.',
    p3: 'Diese kostenlose Version läuft im Browser, ohne Anmeldung. Beginne mit 6×6, um die Muster zu lernen, wechsle zu 8×8 und wage dich an 10×10, wenn du richtig trainieren willst. Jeden Tag wartet für jede Größe ein neues Tagesrätsel.',
  },
};
