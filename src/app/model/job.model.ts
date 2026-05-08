export interface Technology {
  icon: string;
  name: string;
}

export interface JobExperience {
  company: string,
  position: string,
  level: string,
  companyLinkedin: string,
  place: string,
  period: [Date, Date|null],
  description: string,
  tasks: string[]
  usedTechnologies: Technology[];
}