import { useEffect, useRef, useState } from 'react'

const SAMPLE = [
  { title: 'Welcome to Super App — sample news item', source: { name: 'Local' } },
  { title: 'Top picks for entertainment this week', source: { name: 'Editor' } },
  { title: 'New releases matching your categories', source: { name: 'Recommender' } },
]

export default function NewsFeed({ compact = false }) {
  const [articles, setArticles] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news')
        const data = await res.json()
        if (data.articles && Array.isArray(data.articles) && data.articles.length > 0) {
          setArticles(data.articles)
        } else {
          setArticles(SAMPLE)
        }
      } catch (e) {
        setError('Failed to load news')
        setArticles(SAMPLE)
      }
      setLoading(false)
    }
    fetchNews()
  }, [])

  useEffect(() => {
    if (!articles || articles.length === 0) return
    intervalRef.current = setInterval(() => setIndex((i) => (i + 1) % articles.length), 2000)
    return () => clearInterval(intervalRef.current)
  }, [articles])

  if (loading) return <div className="text-[#AAAAAA] text-sm">Loading news…</div>
  if (error) return <div className="text-[#ff3333] text-sm">{error}</div>

  const article = articles[index] || {}

  if (compact) {
    return (
      <div>
        <h4 className="font-semibold text-white mb-3">Latest News</h4>
        <div className="space-y-2">
          <p className="text-sm text-white leading-[1.5] line-clamp-2">{article.title}</p>
          <p className="text-xs text-[#8A8A8A]">{article.source?.name || 'News'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 rounded bg-[#0a0a0a] border border-white/5">
      <h4 className="font-semibold mb-3 text-white">Latest News</h4>
      <div className="text-sm text-white leading-[1.5]">{article.title}</div>
      <div className="text-xs text-[#8A8A8A] mt-3">{article.source?.name || 'News Source'}</div>
    </div>
  )
}
