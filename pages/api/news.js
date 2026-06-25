export default async function handler(req, res) {
  const key = process.env.NEXT_PUBLIC_NEWS_API_KEY || process.env.NEWSDATA_API_KEY
  if (!key) {
    console.warn('News API key not found in NEXT_PUBLIC_NEWS_API_KEY or NEWSDATA_API_KEY')
    return res.status(500).json({ articles: [], error: 'News API key not configured' })
  }

  try {
    const newsUrl = `https://newsdata.io/api/1/news?apikey=${encodeURIComponent(key)}&language=en&page=1&limit=10`
    console.log('Fetching news from:', newsUrl.split('?')[0])
    
    const response = await fetch(newsUrl)
    const data = await response.json()

    if (!response.ok || data.status === 'error') {
      console.warn('News API error:', data.message || 'Unknown error')
      return res.status(200).json({ articles: [], error: data.message || 'API Error' })
    }

    const results = data.results || []
    const articles = results
      .filter((article) => article.title && article.title.trim())
      .map((article) => ({
        title: article.title,
        source: { name: article.source_id || article.creator?.[0] || 'NewsData' },
        url: article.link,
      }))
      .slice(0, 10)

    return res.status(200).json({ articles, status: 'success' })
  } catch (err) {
    console.error('News fetch error:', err.message)
    return res.status(200).json({ articles: [], error: err.message })
  }
}
