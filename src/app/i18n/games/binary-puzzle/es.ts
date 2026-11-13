import type { BinaryPuzzleStrings } from './en';

/** Binary puzzle strings (es). */
export const binaryPuzzle: BinaryPuzzleStrings = {
  name: "Puzle binario",
  description:
    'Rellena la cuadrícula con 0 y 1: nunca tres iguales seguidos, la misma cantidad en cada línea y ninguna fila repetida, en 6×6, 8×8 y 10×10.',
  seo: {
    title: 'Puzle binario online gratis: Takuzu y Binairo diario',
    description:
      'Juega gratis al puzle binario (Takuzu, Binairo) en el navegador: cuadrículas 6×6, 8×8 y 10×10, reto diario, pintar arrastrando, pistas y solución única.',
  },
  size: 'Tamaño',
  mode: 'Puzle',
  daily: 'Diario',
  random: 'Aleatorio',
  undo: 'Deshacer',
  clear: 'Borrar',
  hint: 'Pista',
  hints: 'Pistas',
  filled: 'Rellenas',
  board: 'Cuadrícula del puzle binario',
  cell: 'Fila {r}, columna {c}',
  empty: 'vacía',
  given: 'fija',
  broken: 'rompe una regla',
  controlsTip: 'Toca para alternar vacío → 0 → 1. Arrastra para pintar el mismo dígito en varias casillas. Las teclas 0 y 1 también funcionan.',
  solved: '¡Resuelto!',
  solvedIn: 'Completaste la cuadrícula {size} en {time}.',
  dailyTag: 'puzle del día',
  hintRules: {
    pair: 'Dos dígitos iguales juntos: las casillas de ambos extremos llevan el otro dígito.',
    gap: 'Una casilla entre dos dígitos iguales debe llevar el otro dígito.',
    count: 'Esta línea ya tiene la mitad de un dígito, así que el resto lleva el otro.',
    line: 'Aquí solo cabe un dígito: el otro rompería una regla más adelante en esta línea.',
    fix: 'Esta casilla estaba mal y se ha borrado.',
    reveal: 'Se ha revelado esta casilla.',
  },
  howTo: {
    title: 'Cómo jugar',
    s1: 'Rellena cada casilla vacía con un 0 o un 1.',
    s2: 'Como mucho dos dígitos iguales pueden ir seguidos en una fila o columna: 0 0 vale, 0 0 0 no.',
    s3: 'Cada fila y cada columna tiene tantos 0 como 1.',
    s4: 'No puede haber dos filas iguales ni dos columnas iguales.',
  },
  tips: {
    title: 'Consejos',
    t1: 'Busca primero las parejas: junto a 1 1 va un 0 a cada lado. Luego los huecos: en 0 _ 0 el del medio es un 1.',
    t2: 'Ve contando. Cuando una fila de 8 ya tiene cuatro 1, todas las casillas vacías que quedan son 0.',
    t3: '¿Atascado? Prueba un dígito mentalmente y síguelo unas casillas; si acaba en tres iguales o en demasiados de uno, el correcto es el otro. El borde rojo marca reglas rotas.',
  },
  faq: {
    title: 'Preguntas frecuentes',
    q1: '¿Cada puzle tiene una única solución?',
    a1: 'Sí. Cada cuadrícula parte de una solución completa y solo se quitan dígitos mientras un resolvedor lógico pueda terminarla, así que hay exactamente una respuesta y nunca hace falta adivinar.',
    q2: '¿Qué significa el borde rojo?',
    a2: 'Señala al instante una regla rota: tres dígitos iguales seguidos, demasiados 0 o 1 en una línea, o dos filas o columnas completas idénticas. No indica si la casilla coincide con la solución.',
    q3: '¿Cómo funciona la pista?',
    a3: 'Si tienes una casilla incorrecta, la corrige; si no, rellena una casilla que se puede deducir ahora mismo y explica el razonamiento. El número de pistas usadas aparece junto a tu tiempo.',
    q4: '¿Es lo mismo que Takuzu y Binairo?',
    a4: 'Sí. Puzle binario, Takuzu, Binairo, Binero y 0h h1 son nombres para las mismas reglas. Algunas versiones usan dos colores en lugar de dígitos; aquí tienes ambos.',
  },
  about: {
    title: 'Sobre el puzle binario',
    p1: 'El puzle binario es un juego de lógica con tres reglas sencillas y un razonamiento sorprendentemente profundo. Se hizo popular en los Países Bajos y en Francia con los nombres Binairo y Takuzu, y hoy es un clásico junto al Sudoku en las revistas de pasatiempos.',
    p2: 'Cada deducción se apoya en un patrón pequeño: una pareja fija a sus vecinas, un hueco fija la casilla del medio, una cuenta completa cierra la línea y la prohibición de filas iguales resuelve las últimas casillas. En las cuadrículas grandes aprenderás a leer líneas enteras.',
    p3: 'Esta versión gratuita funciona en el navegador sin registro. Empieza con 6×6 para aprender los patrones, pasa al 8×8 y prueba el 10×10 cuando quieras un buen entrenamiento. Cada día hay un puzle nuevo para cada tamaño.',
  },
};
