
export interface MediaStack {
  pagination: Pagination;
  data:       Data[];
}

export interface Data {
  author:       null | string;
  title:        string;
  description:  string;
  url:          string;
  source:       Source;
  image:        null | string;
  category:     Category;
  language:     Language;
  country:      Country;
  published_at: Date;
}

export enum Category {
  General = "general",
}

export enum Country {
  Nz = "nz",
}

export enum Language {
  En = "en",
}

export enum Source {
  Indianweekender = "indianweekender",
  NZHerald = "NZ Herald",
  Nzcatholic = "nzcatholic",
  StuffCoNz = "Stuff.co.nz",
}

export interface Pagination {
  limit:  number;
  offset: number;
  count:  number;
  total:  number;
}
