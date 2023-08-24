import { useState, useEffect } from 'react'
import * as Models from '../../models/MediaStack'

import { getArticles, getArticlesByCategory } from '../apiClient'

const categories = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
]

export default function Home() {
  const [articles, setArticles] = useState<Models.Data | null>(null)
  const [loading, setLoading] = useState(false)
  const [displayNews, setDisplayNews] = useState(false)
  const [category, setCategory] = useState(categories[0])

  // useEffect(() => {
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
      setDisplayNews(true)
    }
  }
  //   fetchArticles()
  // }, [])

  async function fetchArticlesByCategory(categoryInput: string) {
    try {
      setLoading(true)
      const articlesData = await getArticlesByCategory(categoryInput)
      setArticles(articlesData)
      console.log(articlesData)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setDisplayNews(true)
    }
  }

  function handleClick() {
    fetchArticles()
  }

  function handleCategoryClick() {
    fetchArticlesByCategory(category)
  }
  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCategory = event.target.value
    setCategory(selectedCategory)
  }

  if (loading) {
    return <p>Articles are loading... </p>
  }
  // if (article === null) return <></>

  return (
    <div>
      <div>
        {!displayNews ? (
          <div>
            <button onClick={handleClick}>
              See this week&apos;s local news
            </button>
            <select onChange={handleCategoryChange} value={category}>
              {categories.map((categori) => (
                <option key={categori} value={categori}>
                  {categori}
                </option>
              ))}
            </select>
            <button onClick={handleCategoryClick}>
              Or see global {category} news
            </button>
          </div>
        ) : (
          articles?.map((article) => (
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
          ))
        )}
      </div>
    </div>
  )
}
