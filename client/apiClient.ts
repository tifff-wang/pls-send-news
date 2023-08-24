/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'superagent'
import * as Models from '../models/MediaStack'

const articlesUrl = '/api/v1/mediastack-articles'


export async function getLocalArticles(): Promise<Models.Data> {
  const response = await request.get(articlesUrl)
  return response.body.data
}


export async function getArticlesWithFilters(
  category: string, country: string, limit: string
): Promise<Models.Data> {

    const response = await request.get(`${articlesUrl}/filters/`).query({category, country, limit});
    console.log(response.body.data);
    return response.body.data;
}
