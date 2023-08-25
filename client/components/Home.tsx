import { useState } from 'react'
import * as Models from '../../models/MediaStack'

import { getLocalArticles, getArticlesWithFilters } from '../apiClient'

const categories = [
  'general',
  'business',
  'entertainment',
  'health',
  'science',
  'sports',
  'technology',
]

const countries = ['us', 'au', 'gb', 'cn', 'ca']

export default function Home() {
  const [articles, setArticles] = useState<Models.Data | null>(null)
  const [loading, setLoading] = useState(false)
  const [displayNews, setDisplayNews] = useState(false)
  const [category, setCategory] = useState(categories[0])
  const [country, setCountry] = useState(countries[0])
  const [limit, setLimit] = useState<number>(5)
  const [error, setError] = useState<Error | null>(null)

  async function fetchArticles() {
    try {
      setLoading(true)
      const articlesData = await getLocalArticles()
      setArticles(articlesData)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
      setDisplayNews(true)
    }
  }

  async function fetchArticlesWithFilters() {
    try {
      setLoading(true)
      const limitString = limit.toString()
      const articlesData = await getArticlesWithFilters(
        category,
        country,
        limitString
      )
      setArticles(articlesData)
      console.log(articlesData)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
      setDisplayNews(true)
    }
  }

  function handleClick() {
    fetchArticles()
  }

  function handleGlobalClick() {
    fetchArticlesWithFilters()
  }

  function handleBackClick() {
    setDisplayNews(false)
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    country === 'us'
      ? setCategory(event.target.value)
      : setCategory(categories[0])
  }

  function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedCountry = event.target.value
    setCountry(selectedCountry)
  }

  function handleLimitChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedLimit = event.target.value
    setLimit(selectedLimit)
  }

  if (loading) {
    return (
      <div className="loadingContainer">
        <img
          className="loading-icon"
          alt="loading icon"
          src="./loading.png"
        ></img>
        <p className="loading">Articles are loading</p>{' '}
      </div>
    )
  }

  if (error) {
    return (
      <>
        <p className="loading">Failed to load articles... {String(error)}</p>
      </>
    )
  }

  return (
    <div className="homepage">
      {!displayNews ? (
        <div>
          <button onClick={handleClick}>See this week&apos;s local news</button>
          <div className="global">
            {country === 'us' ? (
              <select onChange={handleCategoryChange} value={category}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            ) : (
              ''
            )}
            <select
              className="dropdown"
              onChange={handleCountryChange}
              value={country}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              onChange={handleLimitChange}
              type="range"
              min="5"
              max="50"
              value={limit}
            ></input>
            <p>{limit}</p>
            <button onClick={handleGlobalClick}>See global news</button>
          </div>
        </div>
      ) : (
        <>
          <button className="back-button" onClick={handleBackClick}>
            Back
          </button>
          {/* <button onClick={readText}>Read</button> */}
          {/* <button onClick={stopReading}>Stop</button> */}
          <ul>
            {articles?.map((article) => {
              return (
                <li key={article.title}>
                  <a href={article.url} key={article.title}>
                    <div className="article">
                      <h3>{article.title}</h3>
                      <p>{article.description}</p>
                      <img
                        className="articleImage"
                        src={
                          article.image
                            ? article.image
                            : '../reference-imgs/news-img.png'
                        }
                        alt={article.title}
                      ></img>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
