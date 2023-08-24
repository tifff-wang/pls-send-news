/* eslint-disable @typescript-eslint/no-unused-vars */
import request from 'superagent'
import * as Models from '../models/MediaStack'

const articlesUrl = '/api/v1/mediastack-articles'

export async function getArticles(): Promise<Models.Data> {
  const response = await request.get(articlesUrl)
  return response.body.data
}
