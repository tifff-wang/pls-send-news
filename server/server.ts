import * as Path from 'node:path'
import * as URL from 'node:url'
import request from 'superagent'
import 'dotenv/config'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

import express from 'express'
import articles from './routes/articles.ts'

const server = express()
server.use(express.json())
server.use(express.static(Path.join(__dirname, 'public')))

// server.use('/api/v1/articles', articles)

// server.get('/api/v1/articles', async (req, res) => {
//   const response = await request.get(
//     `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.NYTIMES_KEY}`
//   )
//   res.json(response.body)
// })

// server.get('/api/v1/most-popular-articles', async (req, res) => {
//   const response = await request.get(
//     `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.NYTIMES_KEY}`
//   )
//   res.json(response.body)
// })

server.get('/api/v1/mediastack-articles', async (req, res) => {
  const response = await request.get(
    `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_KEY}&countries=nz&date=2023-08-18,2023-08-24&sort=popularity`
  )
  res.json(response.body)
})

export default server
