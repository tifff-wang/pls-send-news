import * as Path from 'node:path'
import * as URL from 'node:url'
import request from 'superagent'
import 'dotenv/config'

import getDate from './helper.ts'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

import express from 'express'
import articles from './routes/articles.ts'

const server = express()
server.use(express.json())
server.use(express.static(Path.join(__dirname, 'public')))

// server.use('/api/v1/articles', articles)

server.get('/api/v1/mediastack-articles', async (req, res) => {
  
try{
  const response = await request.get(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_KEY}&countries=nz&date=2023-08-18,2023-08-24&sort=popularity`
  )
  res.json(response.body)
} catch(error){
  res.status(500).json({ error: error.message })
}
})

server.get('/api/v1/mediastack-articles/filters', async (req, res) => {
const {category, country, limit} = req.query
  const dateRange = "2023-08-24,2023-08-25"
  try{
    const response = await request.get(
      `http://api.mediastack.com/v1/news`).query({access_key: process.env.MEDIASTACK_KEY, countries: country, date: dateRange, sort: 'popularity', categories: category, limit: limit})
    res.json(response.body)
  }
  catch(error){
    res.status(500).json({ error: error.message })
  }
})

// server.get('/api/v1/mediastack-articles/:keyword', async (req, res) => {
//   const keyword = req.params.keyword
//   const response = await request.get(
//     `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_KEY}&countries=nz,gb,us&date=2023-08-18,2023-08-24&sort=popularity&keywords=${keyword}`
//   )
//   res.json(response.body)
// })

export default server
