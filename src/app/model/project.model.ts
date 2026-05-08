export type Status = 'in_progress' | 'finished' | 'abandoned';

export interface Project {
  id?: string;
  name: string,
  description: string,
  status: Status,
  link: string,
  usedTechnologies: string[],
}