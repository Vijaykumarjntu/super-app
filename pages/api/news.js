export default async function handler(req, res) {
  const key = process.env.NEWSDATA_API_KEY || process.env.NEXT_PUBLIC_NEWS_API_KEY
  if (!key) {
    console.warn('NewsData API key not found in process.env (tried NEWSDATA_API_KEY and NEXT_PUBLIC_NEWS_API_KEY)')
    return res.status(500).json({ error: 'NEWSDATA_API_KEY not configured on server' })
  }

  // Use newsdata.io public API. Return a normalized list of articles.
  try {
    const url = `https://newsdata.io/api/1/news?apikey=${encodeURIComponent(key)}&language=en&page=1`
    const r = await fetch(url)
    const data = await r.json()
    // newsdata returns { results: [...] }
    const items = data.results || []
    // Normalize to { title, source } similar to previous component's expectations
    const articles = items.map(it => ({ title: it.title, source: { name: it.source_id || it.creator?.[0] || 'newsdata' } }))
    return res.status(200).json({ articles })
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
