export default async function handler(req, res) {
  const key = process.env.OMDB_API_KEY || process.env.NEXT_PUBLIC_OMDB_API_KEY
  if (!key) {
    console.warn('OMDB API key not found in process.env (tried OMDB_API_KEY and NEXT_PUBLIC_OMDB_API_KEY)')
    return res.status(500).json({ error: 'OMDB_API_KEY not configured on server' })
  }

  const { s, id } = req.query
  try {
    let url
    if (id) {
      url = `https://www.omdbapi.com/?apikey=${encodeURIComponent(key)}&i=${encodeURIComponent(id)}&plot=full`
    } else if (s) {
      url = `https://www.omdbapi.com/?apikey=${encodeURIComponent(key)}&s=${encodeURIComponent(s)}&type=movie&page=1`
    } else {
      return res.status(400).json({ error: 'Query parameter `s` (search) or `id` is required' })
    }

    const r = await fetch(url)
    const data = await r.json()
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: String(err) })
  }
}
