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
    <div className="bg-[#090A0D] rounded-[30px] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <h2 className="text-xl font-semibold mb-4">Discover Movies</h2>
      {loading && <div className="text-gray-400">Loading movies…</div>}
      {error && <div className="text-red-400">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((m) => (
          <button
            key={m.imdbID}
            type="button"
            onClick={() => openDetails(m.imdbID)}
            className="group relative overflow-hidden rounded-[18px] bg-[#111217] shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.05]"
          >
            {m.Poster && m.Poster !== 'N/A' ? (
              <div className="relative h-52 w-full">
                <img src={m.Poster} alt={m.Title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
            ) : (
              <div className="flex h-52 items-center justify-center bg-gray-800 text-gray-400">No image</div>
            )}
            <div className="p-4 text-left">
              <div className="text-sm font-semibold text-white">{m.Title}</div>
              <div className="mt-1 text-xs text-[#8A8A8A]">{m.Year}</div>
            </div>
          </button>
        ))}
      </div>

      {selected && <MovieModal movie={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
