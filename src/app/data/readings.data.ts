import { Reading } from "../model/reading.model";

export const readings: Reading[] = [
  // books
  {
    author: 'Egor Rogov',
    url: 'https://edu.postgrespro.com/postgresql_internals-14_parts1-4_en.pdf',
    date: new Date(7, 11, 2023),
    title: 'Postgres 14 Internals',
    status: 'in_progress',
    type: 'book',

  },
  {
    author: 'Andrew Hunt and David Thomas',
    url: 'https://en.wikipedia.org/wiki/The_Pragmatic_Programmer',
    date: new Date(1, 10, 1999),
    title: 'The Pragmatic Programmer',
    status: 'in_progress',
    type: 'book'
  },

  // articles
  {
    author: 'Amir Boroumand',
    url: 'https://medium.com/@steelcityamir/a-web-developers-guide-to-browser-caching-cc41f3b73e7c',
    date: new Date(25, 6, 2017),
    title: 'A Web Developer’s Guide to Browser Caching',
    status: 'finished',
    type: 'article'
  },
  {
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/bliki/CommandQuerySeparation.html',
    date: new Date(5, 12, 2005),
    title: 'Command Query Separation',
    status: 'finished',
    type: 'article'
  },
];
