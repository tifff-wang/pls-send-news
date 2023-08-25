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
  const [loading, setLoading] = useState(true)
  const [displayNews, setDisplayNews] = useState(false)
  const [category, setCategory] = useState(categories[0])
  const [country, setCountry] = useState(countries[0])
  const [limit, setLimit] = useState<number>(5)
  const [error, setError] = useState<Error | null>(null)

  async function fetchArticles() {
    try {
      setLoading(true)
      const articlesData = await getLocalArticles(limit)
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
          src="./loading-larger.png"
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
      <div className="center-container">
        {!displayNews ? (
          <div>
            <button onClick={handleClick}>
              See this week&apos;s local news
            </button>
            <div className="global">
              <div className="limitSlider">
                <label htmlFor="newsNum">Number of articles:</label>
                <input
                  onChange={handleLimitChange}
                  type="range"
                  min="5"
                  max="20"
                  value={limit}
                  id="newsNum"
                  name="newsNum"
                ></input>
                <label htmlFor="newsNumber" className="slider-number">
                  {limit}
                </label>
              </div>
              <button onClick={handleGlobalClick}>See global news</button>
              <div className="dropdownContainer">
                <label htmlFor="country">Choose a country:</label>
                <select
                  className="dropdownCountry"
                  onChange={handleCountryChange}
                  value={country}
                  id="country"
                  name="country"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {country === 'us' ? (
              <div className="dropdownContainer">
                <label htmlFor="category">Choose a category:</label>
                <select
                  className="dropdownCategory"
                  onChange={handleCategoryChange}
                  value={category}
                  id="category"
                  name="category"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <>
            <div className="buttonContainer">
              <button className="back-button" onClick={handleBackClick}>
                Back
              </button>

              <button className="read-text-button" onClick={readText}>
                Read the news
              </button>
              <button className="read-text-button" onClick={stopReading}>
                Stop reading
              </button>
            </div>

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
    </div>
  )

  function readText() {
    const text = [
      "here's the top news for today",
      articles?.map((article) => displayTextForArticle(article)).join(''),
    ]
    const value = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(value)
  }

  function stopReading() {
    window.speechSynthesis.cancel()
  }

  function displayTextForArticle(article: Models.Data): string {
    return `, ${article.title}, ${article.description}`
  }
}
