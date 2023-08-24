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
  return response.body.data
}

export async function getArticlesByDateRange(
  dateRange: string
): Promise<Models.Data> {
  const response = await request.get(`${articlesUrl}/${dateRange}`)
  return response.body.data
}

export async function getArticlesByKeyword(
  keyword: string
): Promise<Models.Data> {
  const response = await request.get(`${articlesUrl}/${keyword}`)
  return response.body.data
}
