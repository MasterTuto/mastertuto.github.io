import type { BinaryPuzzleStrings } from './en';

/** Binary puzzle strings (pt). */
export const binaryPuzzle: BinaryPuzzleStrings = {
  name: "Quebra-cabeça Binário",
  description:
    'Preencha a grade com 0 e 1: nada de três iguais seguidos, a mesma quantidade em cada linha e nenhuma linha repetida, em 6×6, 8×8 e 10×10.',
  seo: {
    title: 'Quebra-cabeça Binário Online Grátis: Takuzu e Binairo',
    description:
      'Jogue o quebra-cabeça binário (Takuzu, Binairo) grátis no navegador: grades 6×6, 8×8 e 10×10, desafio diário, pintura arrastando, dicas e solução única.',
  },
  size: 'Tamanho da grade',
  mode: 'Puzzle',
  daily: 'Do dia',
  random: 'Aleatório',
  undo: 'Desfazer',
  clear: 'Limpar',
  hint: 'Dica',
  hints: 'Dicas',
  filled: 'Preenchidas',
  board: 'Grade do quebra-cabeça binário',
  cell: 'Linha {r}, coluna {c}',
  empty: 'vazia',
  given: 'fixa',
  broken: 'quebra uma regra',
  controlsTip: 'Toque para alternar vazio → 0 → 1. Arraste para pintar o mesmo número em várias casas. As teclas 0 e 1 também funcionam.',
  solved: 'Resolvido!',
  solvedIn: 'Você completou a grade {size} em {time}.',
  dailyTag: 'desafio do dia',
  hintRules: {
    pair: 'Dois números iguais lado a lado: as casas nas duas pontas recebem o outro número.',
    gap: 'Uma casa entre dois números iguais precisa receber o outro número.',
    count: 'Esta linha já tem metade de um dos números, então o resto recebe o outro.',
    line: 'Só um número cabe aqui: o outro quebraria uma regra mais adiante nesta linha.',
    fix: 'Esta casa estava errada e foi apagada.',
    reveal: 'Esta casa foi revelada.',
  },
  howTo: {
    title: 'Como jogar',
    s1: 'Preencha cada casa vazia com 0 ou 1.',
    s2: 'No máximo dois números iguais podem ficar lado a lado numa linha ou coluna: 0 0 pode, 0 0 0 não pode.',
    s3: 'Cada linha e cada coluna tem a mesma quantidade de 0 e de 1.',
    s4: 'Não pode haver duas linhas iguais, nem duas colunas iguais.',
  },
  tips: {
    title: 'Dicas',
    t1: 'Procure primeiro os pares: ao lado de 1 1 sempre vem 0 dos dois lados. Depois os buracos: em 0 _ 0, o do meio é 1.',
    t2: 'Vá contando. Quando uma linha de 8 já tem quatro 1, todas as casas vazias que sobraram nela são 0.',
    t3: 'Travou? Teste um número de cabeça e siga algumas casas; se der três iguais seguidos ou números demais, o certo é o outro. O contorno vermelho mostra regras quebradas.',
  },
  faq: {
    title: 'Perguntas frequentes',
    q1: 'Todo quebra-cabeça tem uma única solução?',
    a1: 'Sim. Cada grade nasce de uma solução completa e os números só são removidos enquanto um resolvedor lógico ainda consegue terminá-la. Por isso existe exatamente uma resposta e você nunca precisa chutar.',
    q2: 'O que significa o contorno vermelho?',
    a2: 'Ele mostra na hora uma regra quebrada: três números iguais seguidos, 0 ou 1 demais numa linha, ou duas linhas ou colunas completas iguais. Ele não diz se a casa bate com a solução.',
    q3: 'Como funciona a dica?',
    a3: 'Se houver uma casa errada, a dica a corrige; senão, preenche uma casa que já dá para deduzir pelo tabuleiro e explica o raciocínio. A quantidade de dicas usadas aparece ao lado do seu tempo.',
    q4: 'É o mesmo que Takuzu e Binairo?',
    a4: 'É, sim. Quebra-cabeça binário, Takuzu, Binairo, Binero e 0h h1 são nomes para as mesmas regras. Algumas versões usam duas cores no lugar dos números; aqui você tem as duas coisas.',
  },
  about: {
    title: 'Sobre o quebra-cabeça binário',
    p1: 'O quebra-cabeça binário é um jogo de lógica com três regras simples e um raciocínio surpreendentemente profundo. Ficou famoso na Holanda e na França com os nomes Binairo e Takuzu e hoje divide espaço com o Sudoku nas revistas de passatempo.',
    p2: 'Cada dedução nasce de um padrão pequeno: um par define as casas vizinhas, um buraco define a casa do meio, uma contagem completa fecha a linha e a proibição de linhas iguais resolve as últimas casas abertas. Nas grades maiores, você aprende a ler a linha inteira de uma vez.',
    p3: 'Esta versão é gratuita, roda no navegador e não pede cadastro. Comece pelo 6×6 para pegar os padrões, passe para o 8×8 e encare o 10×10 quando quiser um treino de verdade. Todo dia tem um desafio novo para cada tamanho.',
  },
};
