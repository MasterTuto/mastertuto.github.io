import { JobExperience } from "../model/job.model";

export const jobsData: JobExperience[] = [
  {
    company: 'UESB',
    position: 'Angular Developer',
    level: 'Internship',
    companyLinkedin: 'https://www.linkedin.com/company/651786',
    place: 'Vitória da Conquista, BA',
    period: [new Date('2021-05-01'), new Date('2021-12-01')],
    description: 'Development of internal system for management of events that occurred at the university. I developed a powerful solution using Angular framework and Bootstrap. Developing my own interface design from Figma and coding it was part of the duty.',
    tasks: [
      'Development using the Angular framework.',
      'Basic animation techniques using the Angular framework.',
      'Usage of Figma and coding the interface.',
      'Autonomous learning about the framework and discussions about the design',
      'Autonomy on the project.',
    ],
    usedTechnologies: [
    {
      icon: 'tablerBrandAngular',
      name: "Angular"
    },
    {
      icon: 'tablerBrandBootstrap',
      name: "Bootstrap"
    },
    {
      icon: 'tablerBrandFigma',
      name: "Figma"
    },
    {
      icon: 'tablerBrandHtml5',
      name: "HTML5"
    },
    {
      icon: 'tablerBrandCss3',
      name: "CSS3"
    },
    {
      icon: 'tablerBrandJavascript',
      name: "JavaScript/TypeScript"
    },
    ],
  },
  {
    company: 'Flinix Smart Health',
    position: 'React Developer',
    level: 'Junior',
    companyLinkedin: 'https://www.linkedin.com/company/82598239',
    place: 'Remote',
    period: [new Date('2022-04-01'), new Date('2022-07-01')],
    description: 'Development of website in React Web from scratch and with a lot of autonomy. In the process, I defined the architecture, file organization, libraries to be used and the creation of my components. With the agility that a Startup asks for, delivering high quality code, organization, responsiveness, correction and efficient code.',
    tasks: [
      'Development of the entire software cycle, from the beginning to delivery.',
      'Active opinion about the product, not just the code.',
      'Interchange between Junior and Senior, once I was not only working not on development with total autonomy, but also in defining the architecture, research and resolution of problems alone.',
      'Constant dialogue with managers and product management or positions like that.',
    ],
    usedTechnologies: [
    {
      icon: 'tablerBrandReact',
      name: 'React'
    },
    {
      icon: 'tablerBrandRedux',
      name: 'Redux'
    },
    {
      icon: 'tablerBrandGit',
      name: 'Git'
    },
    {
      icon: 'tablerBrandJavascript',
      name: 'JavaScript/TypeScript'
    },
    ],
  },
  {
    company: 'Perinity',
    position: 'Full-Stack Developer',
    level: 'Junior',
    companyLinkedin: 'https://www.linkedin.com/company/13045572/',
    place: 'experience_perinity_place',
    period: [new Date('2022-10-01'), new Date('2024-04-01')],
    description: 'Initially hired a front-end enginerr, due to company needs and in the presence of important project and good plans, I decided to dive into the full stack life by using Java and Angular (the stack in the company), writing unit tests and much more',
    tasks: [
      'Development of toolset to other developers',
      'Enhanced front-end delivery in 150% by settings good practices',
    ],
    usedTechnologies: [
    {
      icon: 'tablerBrandAngular',
      name: 'Angular'
    },
    {
      icon: 'tablerBrandTailwind',
      name: 'Tailwind'
    },
    {
      icon: 'tablerGlobe',
      name: 'Java'
    }
    ],
  },
  {
    company: 'PocketLab',
    position: 'Full-Stack Developer',
    level: 'Mid',
    companyLinkedin: 'https://www.linkedin.com/company/pocketlab/',
    place: 'pocketlab_experience_place',
    period: [new Date('2024-04-01'), null],
    description: 'One of the fastest growing edtech companies in the US. The core principle are live updates and real time updates of student-teachers interactions. In here I deal with DynamoDB, CloudFormation, AWS Lambda, drawing API, auto grading APIs, lots of event based live updates, actions/stores on tree-like key-based structure. One of the biggest problems solved is adding an effective typed system to improve DX and fasten our deliveries.',
    tasks: [
      'Full-Stack serverless development in a monorepo',
      'Deployment configuration',
      'Front-end developement',
      'Working with bluetooth API, data reading and development',
      'Working with the iOS app',
    ],
    usedTechnologies: [
      {
        icon: 'tablerBrandAngular',
        name: 'Angular'
      },
      {
        icon: 'tablerBrandAws',
        name: 'AWS'
      },
    ],
  },
];

jobsData.sort((joba, jobb) => {
  return +(joba.period[0] < jobb.period[0])
});
