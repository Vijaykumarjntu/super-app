import React, { useEffect, useState } from 'react'
import MovieModal from './MovieModal'

const CATEGORY_KEYWORDS = {
  action: 'action',
  drama: 'drama',
  romance: 'romance',
  thriller: 'thriller',
  western: 'western',
  horror: 'horror',
  fantasy: 'fantasy',
  music: 'music',
  fiction: 'sci-fi'
}

export default function MovieList({ categories = [] }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchMovies() {
      if (!categories || categories.length === 0) return
      setLoading(true)
      setError(null)
      try {
        // Use server API route which reads server-side OMDB_API_KEY
        const q = CATEGORY_KEYWORDS[categories[0]] || categories[0]
        const url = `/api/omdb?s=${encodeURIComponent(q)}`
        const res = await fetch(url)
        const data = await res.json()
        if (data.Response === 'True') {
          setMovies(data.Search || [])
        } else if (data.Search) {
          setMovies(data.Search || [])
        } else {
          setError(data.Error || data.error || 'No movies found')
        }
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [categories])

  async function openDetails(imdbID) {
    try {
      const res = await fetch(`/api/omdb?id=${encodeURIComponent(imdbID)}`)
      const data = await res.json()
      if (data.Response === 'True' || data.Title) setSelected(data)
      else setError(data.Error || data.error || 'Failed to load')
    } catch (e) {
      setError(e.message)
    }
  }

  if (!categories || categories.length === 0) return null

  return (
    <div className="bg-zinc-900 rounded-3xl p-6">
      <h2 className="text-xl font-semibold mb-4">Discover Movies</h2>
      {loading && <div className="text-gray-400">Loading movies…</div>}
      {error && <div className="text-red-400">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map(m => (
          <div key={m.imdbID} className="bg-black/40 p-3 rounded-lg cursor-pointer hover:scale-105 transition-transform" onClick={() => openDetails(m.imdbID)}>
            {m.Poster && m.Poster !== 'N/A' ? (
              <img src={m.Poster} alt={m.Title} className="w-full h-40 object-cover rounded" />
            ) : (
              <div className="w-full h-40 bg-gray-800 rounded flex items-center justify-center text-gray-400">No image</div>
            )}
            <div className="mt-2 text-sm font-medium">{m.Title}</div>
            <div className="text-xs text-gray-400">{m.Year}</div>
          </div>
        ))}
      </div>

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
