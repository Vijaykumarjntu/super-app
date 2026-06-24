import { useEffect, useRef, useState } from 'react'

const SAMPLE = [
  { title: 'Welcome to Super App — sample news item', source: { name: 'Local' } },
  { title: 'Top picks for entertainment this week', source: { name: 'Editor' } },
  { title: 'New releases matching your categories', source: { name: 'Recommender' } },
]

export default function NewsFeed(){
  const [articles, setArticles] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef(null)

  useEffect(()=>{
    async function fetchNews() {
      try{
        // Use server API route which reads NEWSDATA_API_KEY from server env
        const res = await fetch('/api/news')
        const data = await res.json()
        // Our API returns { articles: [...] } or falls back to sample
        if (data.articles) setArticles(data.articles)
        else setArticles(SAMPLE)
      }catch(e){ setArticles(SAMPLE) }
      setLoading(false)
    }
    fetchNews()
  },[])

  useEffect(()=>{
    if (!articles || articles.length === 0) return
    intervalRef.current = setInterval(()=> setIndex(i => (i+1)%articles.length), 2000)
    return ()=>clearInterval(intervalRef.current)
  },[articles])

  if (loading) return <div className="p-4">Loading news…</div>
  const a = articles[index] || {}
  return (
    <div className="p-4 rounded bg-panel">
      <h4 className="font-semibold mb-2">Latest News</h4>
      <div className="text-sm">{a.title}</div>
      <div className="text-xs text-gray-400 mt-2">{a.source?.name}</div>
    </div>
  )
}
