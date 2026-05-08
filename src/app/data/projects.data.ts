import { Project, Status } from "../model/project.model";

export const projectsData: Project[] = [
  {
    name: 'Breno CS',
    description: 'This website',
    status: 'finished',
    link: 'https://brenocs.com',
    usedTechnologies: [
      'React',
      'Tailwind',
      'TypeScript',
      'Vite',
      'Git',
      'GitHub',
    ],
  },
  {
    name: '100 Days of Code - Golang',
    description: 'A plugin for Obsidian that allows you to create mind maps. This plugin was made in a freelance job, but it is open source.',
    link: 'https://github.com/MasterTuto/100days',
    status: 'in_progress',
    usedTechnologies: [
      'Golang',
      'Git',
    ],
  },
  {
    name: 'Caixeiro Viajante - Hill Climbing',
    description: 'Implementation of the Hill Climbing algorithm for the travelling salesman problem. This project was made for the Artificial Intelligence discipline.',
    link: 'https://github.com/MasterTuto/CaixeiroViajanteHillClimbing',
    status: 'finished',
    usedTechnologies: [
      'Java',
      'JavaFX',
      'Git',
    ],
  },
  {
    name: 'Taskkke',
    description: 'A project that I did to practice React. It is a simple task manager, with authentication and everything else.',
    link: 'https://github.com/MasterTuto/taskkke',
    status: 'finished',
    usedTechnologies: [
      'React',
      'Styled components',
      'TypeScript',
      'Git',
    ],
  },
  {
    name: 'Jeferson',
    description: 'A bot for Discord that I made to manage a movie server. Not finished, but I learned how to use the API.',
    link: 'https://github.com/MasterTuto/Jeferson',
    status: 'abandoned',
    usedTechnologies: [
      'Node.js',
      'Discord.js',
      'Git',
    ],
  },
  {
    name: 'InstaBotGui',
    description: 'A bot for Instagram giveaways. Written in Python, this bot commented several times on giveaway posts. This project itself was an attempt to create an user interface for it.',
    link: 'https://github.com/MasterTuto/InstaBotGui',
    status: 'abandoned',
    usedTechnologies: [
      'Python',
      'wxPython',
      'Selenium',
      'Concurrency',
      'Git',
    ],
  },
  {
    name: 'CatiaCorrige',
    description: 'A program that helps in correcting programming test. Made thinking about teacher Cátia from Algorithms and Programming I, mainly thought about usability.',
    status: 'in_progress',
    link: 'https://github.com/MasterTuto/CatiaCorrige',
    usedTechnologies: [
      'Python',
      'wxPython',
      'sqlite3',
      'Git',
    ],
  },
  {
    name: 'PC',
    description: 'This is a script to automate and manage the work of the Concurrent Programming discipline. Where the teacher always asked for the work in a specific format.',
    link: 'https://github.com/MasterTuto/pc',
    status: 'finished',
    usedTechnologies: [
      'Python',
    ],
  },
  {
    name: 'Pendura Aí',
    description: 'Program made for the Algorithms and Programming 2 discipline, as a final project. It had a graphical interface, UML model and more.',
    link: 'https://github.com/MasterTuto/PenduraAi',
    status: 'finished',
    usedTechnologies: [
      'Java',
      'JavaFX',
      'Git',
    ],  
  }
];

const priorities: Record<Status, number> = {
  finished: 0,
  in_progress: 1,
  abandoned: 2,
};
projectsData.sort((a, z) => {
  const statusSort = priorities[a.status] - priorities[z.status];
  if (statusSort != 0) return statusSort;
  return +(a.name > z.name);
});