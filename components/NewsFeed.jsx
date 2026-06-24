import React, { useEffect, useState, useRef } from 'react'

const SAMPLE = [
  { title: 'Welcome to Super App — sample news item', source: { name: 'Local' } },
  { title: 'Top picks for entertainment this week', source: { name: 'Editor' } },
  { title: 'New releases matching your categories', source: { name: 'Recommender' } },
]

export default function NewsFeed() {
  const [articles, setArticles] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    let mounted = true
    async function fetchNews() {
      try {
        const key = process.env.NEXT_PUBLIC_NEWS_API_KEY
        if (!key) throw new Error('NEWS API key not set')
        const url = `https://newsapi.org/v2/top-headlines?language=en&pageSize=10&apiKey=${key}`
        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch news')
        const data = await res.json()
        if (mounted) {
          setArticles(data.articles || SAMPLE)
          setLoading(false)
        }
      } catch (err) {
        if (mounted) {
          setError(err.message)
          setArticles(SAMPLE)
          setLoading(false)
        }
      }
    }

    fetchNews()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (articles.length === 0) return
    intervalRef.current = setInterval(() => {
      setIndex(i => (i + 1) % articles.length)
    }, 2000)
    return () => clearInterval(intervalRef.current)
  }, [articles])

  if (loading) return <div className="p-4">Loading news…</div>

  const article = articles[index] || {}

  return (
    <div className="p-4 rounded bg-white shadow">
      <h4 className="font-semibold mb-2">Latest News</h4>
      {error && <div className="text-sm text-red-500 mb-2">{error}. Showing sample items.</div>}
      <div className="text-sm text-gray-800">{article.title}</div>
      <div className="text-xs text-gray-500 mt-2">{article.source?.name}</div>
    </div>
  )
}
