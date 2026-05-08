import { Status } from "./project.model";

export type ReadingType = 'book' | 'article';

export interface Reading {
  title: string;
  url: string;
  publisher?: string;
  author: string;
  date: Date;
  type: ReadingType;
  status: Status;
}
