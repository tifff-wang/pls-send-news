import express from 'express'
import { getArticles } from 'Home'

const router = express.Router()

router.get('/', (req, res) => {
  getArticles()
    .then((articles) => {
      res.json(articles)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

export default router
