import { useState, useEffect } from 'react'
import * as Models from '../../models/MediaStack'

import { getArticles } from '../apiClient'

export default function Home() {
  const [articles, setArticles] = useState<Models.Data | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true)
        const articlesData = await getArticles()
        setArticles(articlesData)
        console.log(articlesData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  if (loading) {
    return <p>Articles are loading... </p>
  }
  // if (article === null) return <></>

  return (
    <div>
      <div>
        {articles?.map((article) => (
          <a href={article.url} key={article.title}>
            <div className="article">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <img
                className="articleImage"
                src={article.image}
                alt={article.title}
              ></img>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
