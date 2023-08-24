/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'superagent'
import * as Models from '../models/MediaStack'

const articlesUrl = '/api/v1/mediastack-articles'

export async function getArticles(): Promise<Models.Data> {
  const response = await request.get(articlesUrl)
  return response.body.data
}

export async function getArticlesByCategory(
  category: string
): Promise<Models.Data> {
  const response = await request.get(`${articlesUrl}/us/${category}`)
  console.log(response)
  return response.body.data
}
