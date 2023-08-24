// import article data json

export interface NYTimes {
  status: string
  copyright: string
  section: string
  last_updated: Date
  num_results: number
  results: Result[]
}

export interface Result {
  section: string
  subsection: string
  title: string
  abstract: string
  url: string
  uri: string
  byline: string
  item_type: ItemType
  updated_date: Date
  created_date: Date
  published_date: Date
  material_type_facet: string
  kicker: string
  des_facet: string[]
  org_facet: string[]
  per_facet: string[]
  geo_facet: string[]
  multimedia: Multimedia[]
  short_url: string
}

export enum ItemType {
  Article = 'Article',
  Promo = 'Promo',
}

export interface Multimedia {
  url: string
  format: Format
  height: number
  width: number
  type: Type
  subtype: Subtype
  caption: string
  copyright: string
}

export enum Format {
  LargeThumbnail = 'Large Thumbnail',
  SuperJumbo = 'Super Jumbo',
  ThreeByTwoSmallAt2X = 'threeByTwoSmallAt2X',
}

export enum Subtype {
  Photo = 'photo',
}

export enum Type {
  Image = 'image',
}
