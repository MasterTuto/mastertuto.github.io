import type { BinaryPuzzleStrings } from './en';

/** Binary puzzle strings (fr). */
export const binaryPuzzle: BinaryPuzzleStrings = {
  name: "Puzzle binaire",
  description:
    'Remplissez la grille de 0 et de 1 : jamais trois identiques à la suite, autant de chaque chiffre par ligne et aucune ligne en double, en 6×6, 8×8 et 10×10.',
  seo: {
    title: 'Puzzle binaire en ligne gratuit : Takuzu du jour',
    description:
      'Jouez gratuitement au puzzle binaire (Takuzu, Binairo) : grilles 6×6, 8×8 et 10×10, grille du jour, remplissage en glissant, indices et solution unique.',
  },
  size: 'Taille de la grille',
  mode: 'Grille',
  daily: 'Du jour',
  random: 'Aléatoire',
  undo: 'Annuler',
  clear: 'Effacer',
  hint: 'Indice',
  hints: 'Indices',
  filled: 'Remplies',
  board: 'Grille du puzzle binaire',
  cell: 'Ligne {r}, colonne {c}',
  empty: 'vide',
  given: 'donnée',
  broken: 'enfreint une règle',
  controlsTip: 'Touchez pour alterner vide → 0 → 1. Glissez pour poser le même chiffre sur plusieurs cases. Les touches 0 et 1 marchent aussi.',
  solved: 'Résolu !',
  solvedIn: 'Vous avez terminé la grille {size} en {time}.',
  dailyTag: 'grille du jour',
  hintRules: {
    pair: 'Deux chiffres identiques côte à côte : les cases aux deux bouts prennent l’autre chiffre.',
    gap: 'Une case entre deux chiffres identiques prend l’autre chiffre.',
    count: 'Cette ligne contient déjà la moitié d’un chiffre, le reste prend donc l’autre.',
    line: 'Un seul chiffre convient ici : l’autre enfreindrait une règle plus loin dans cette ligne.',
    fix: 'Cette case était fausse, elle a été effacée.',
    reveal: 'Cette case a été révélée.',
  },
  howTo: {
    title: 'Comment jouer',
    s1: 'Remplissez chaque case vide avec un 0 ou un 1.',
    s2: 'Pas plus de deux chiffres identiques côte à côte dans une ligne ou une colonne : 0 0 est permis, 0 0 0 non.',
    s3: 'Chaque ligne et chaque colonne contient autant de 0 que de 1.',
    s4: 'Deux lignes ne peuvent pas être identiques, ni deux colonnes.',
  },
  tips: {
    title: 'Astuces',
    t1: 'Cherchez d’abord les paires : à côté de 1 1 il y a un 0 de chaque côté. Puis les trous : dans 0 _ 0, le milieu est un 1.',
    t2: 'Comptez au fur et à mesure. Dès qu’une ligne de 8 a quatre 1, toutes ses cases vides restantes sont des 0.',
    t3: 'Bloqué ? Essayez un chiffre de tête et suivez-le sur quelques cases ; s’il mène à trois identiques ou à trop d’un chiffre, c’est l’autre. Le contour rouge signale une règle enfreinte.',
  },
  faq: {
    title: 'Questions fréquentes',
    q1: 'Chaque grille a-t-elle une seule solution ?',
    a1: 'Oui. Chaque grille part d’une solution complète et les chiffres ne sont retirés que tant qu’un solveur logique peut la terminer : il y a donc exactement une réponse, sans jamais deviner.',
    q2: 'Que signifie le contour rouge ?',
    a2: 'Il signale aussitôt une règle enfreinte : trois chiffres identiques à la suite, trop de 0 ou de 1 dans une ligne, ou deux lignes ou colonnes complètes identiques. Il ne dit pas si la case correspond à la solution.',
    q3: 'Comment fonctionne l’indice ?',
    a3: 'S’il y a une case fausse, il la corrige ; sinon, il remplit une case que l’on peut déduire dès maintenant et explique le raisonnement. Le nombre d’indices utilisés s’affiche à côté de votre temps.',
    q4: 'Est-ce la même chose que le Takuzu et le Binairo ?',
    a4: 'Oui. Puzzle binaire, Takuzu, Binairo, Binero et 0h h1 désignent les mêmes règles. Certaines versions utilisent deux couleurs au lieu des chiffres ; ici vous avez les deux.',
  },
  about: {
    title: 'À propos du puzzle binaire',
    p1: 'Le puzzle binaire est un jeu de logique aux trois règles simples et au raisonnement étonnamment riche. Il s’est popularisé aux Pays-Bas et en France sous les noms Binairo et Takuzu, et il côtoie aujourd’hui le Sudoku dans les magazines de jeux.',
    p2: 'Chaque déduction repose sur un petit motif : une paire fixe ses voisines, un trou fixe la case du milieu, un compte atteint ferme la ligne et l’interdiction des lignes identiques règle les dernières cases. Les grandes grilles apprennent à lire une ligne entière d’un coup.',
    p3: 'Cette version gratuite fonctionne dans le navigateur, sans inscription. Commencez par le 6×6 pour apprendre les motifs, passez au 8×8 et tentez le 10×10 pour un vrai entraînement. Une nouvelle grille du jour vous attend chaque jour dans chaque taille.',
  },
};
