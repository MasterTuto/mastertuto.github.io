import { Experiment } from "../model/experiment.model";

export const experiments: Experiment[] = [
  {
    name: 'Wikipedia Speedrunner',
    description: 'Finds the path between two Wikipedia articles',
    interestingLevel: 7,
    link: 'https://colab.research.google.com/drive/1B0BHfh_cGjkQmIFV2syUjaensMNU_GP-?usp=sharing',
    cover: 'assets/wikipedia.png',
    icon: 'tablerBrandPython',
    explanation: "The Wikipedia Speedrunner is an algorithmic solution implemented in Python, designed to efficiently determine the shortest path between two distinct Wikipedia articles. Leveraging both Depth-First Search (DFS) and Breadth-First Search (BFS) algorithms, this project showcases a methodical approach to navigating the intricate web of hyperlinks within the Wikipedia ecosystem.",
    knowledges: ["Graphs", "BFS", "DFS", "Python", "Search"]
  },
  {
    name: 'Sudoku Master',
    description: 'Solves Sudoku using graph coloring techniques',
    interestingLevel: 10,
    link: 'https://colab.research.google.com/drive/1B0BHfh_cGjkQmIFV2syUjaensMNU_GP-?usp=sharing',
    cover: 'assets/sudoku.png',
    icon: 'tablerBrandPython',
    explanation: "By using Graph Coloring algorithms, this sudoku solver written in Python is fast and efficient given the complexity of an NP Problem.",
    knowledges: ["Graph", "Python", "Graph coloring", "Sudoku"]
  },
  {
    name: 'Type Level Adder',
    description: 'Adds two numbers using TypeScript Type System',
    interestingLevel: 6,
    link: 'https://gist.github.com/MasterTuto/208f3653c047153cc565937c2e2aa374',
    cover: 'assets/type-level-1.png',
    knowledges: ["Addition", "TypeScript", "Type System"],
    explanation: "Creating a simple function that adds two numbers is easy! But what if this all happened in type level? No running compiled javascript code, just the pure type X = {} syntax we expected by TypeScript? Check them out.",
    icon: 'tablerBrandJavascript'
  },
  {
    name: 'Type Level Gorilla',
    description: 'Math operate two numbers using TypeScript Type System',
    interestingLevel: 8,
    link: 'https://gist.github.com/MasterTuto/47ddcc240def44d32a4213b886a3993c',
    cover: 'assets/type-level-2.png',
    explanation: "Given two numbers, multiply them! Now Add them! Now subtract! This smart calculator does not run in javascript, or any compiled version from TypeScript. But rather relies on the Type System itself, using recursive types and advanced TypeScript techniques",
    knowledges: ["TypeScript", "Type System", "Calculator"],
    icon: 'tablerBrandJavascript'
  },
  {
    name: 'Type Level Addicted',
    description: 'Sort an array using TypeScript Type System',
    interestingLevel: 10,
    link: 'https://gist.github.com/MasterTuto/3a265d5b003180814881a345d985a420',
    cover: 'assets/type-level-3.jpeg',
    explanation: "Okay, this one might trigger some attention... it's not a calculator, not even a simple two adder. This code runs purely on TypeScript type system and gives the ability to sort an array using just Types! Of course, in the real world is useless! But it's fun to create.",
    knowledges: ["TypeScript", "Sorting Algorithms", "Type System"],
    icon: 'tablerBrandJavascript'
  }
];