import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../src/store/slices/authSlice'
import MovieModal from '../components/MovieModal'

const CATEGORY_KEYWORDS = {
  action: 'action',
  drama: 'drama',
  romance: 'romance',
  thriller: 'thriller',
  western: 'western',
  horror: 'horror',
  fantasy: 'fantasy',
  music: 'music',
  fiction: 'sci-fi',
}

const DEFAULT_GENRES = ['action', 'thriller', 'horror']

function MovieCard({ movie, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative h-[150px] overflow-hidden rounded-[10px] shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-[1.05]"
    >
      {movie.Poster && movie.Poster !== 'N/A' ? (
        <img src={movie.Poster} alt={movie.Title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center bg-[#111] text-[#8A8A8A]">No image</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-sm font-semibold text-white line-clamp-1">{movie.Title}</p>
      </div>
    </button>
  )
}

export default function RecommendationsPage() {
  const user = useSelector((state) => state.auth.user)
  const categories = useSelector((state) => state.auth.categories)
  const dispatch = useDispatch()
  const router = useRouter()
  const [moviesByGenre, setMoviesByGenre] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) return null

  const selectedGenres = useMemo(() => {
    if (Array.isArray(categories) && categories.length > 0) {
      return categories
    }
    return DEFAULT_GENRES
  }, [categories])

  const avatarLabel = useMemo(() => {
    if (!user?.name) return 'SA'
    return user.name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }, [user])

  useEffect(() => {
    if (!selectedGenres.length) {
      setMoviesByGenre({})
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    Promise.all(
      selectedGenres.map(async (genre) => {
        const query = CATEGORY_KEYWORDS[genre.toLowerCase()] || genre
        try {
          const response = await fetch(`/api/omdb?s=${encodeURIComponent(query)}`)
          const data = await response.json()
          return {
            genre,
            movies: Array.isArray(data.Search)
              ? data.Search.filter((movie) => movie.Poster && movie.Poster !== 'N/A').slice(0, 4)
              : [],
          }
        } catch (err) {
          return { genre, movies: [] }
        }
      })
    )
      .then((results) => {
        const map = {}
        results.forEach((item) => {
          map[item.genre] = item.movies
        })
        setMoviesByGenre(map)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load recommendations')
      })
      .finally(() => setLoading(false))
  }, [selectedGenres])

  const openMovie = async (imdbID) => {
    if (!imdbID) return
    try {
      const response = await fetch(`/api/omdb?id=${encodeURIComponent(imdbID)}`)
      const data = await response.json()
      if (data?.Response === 'True' || data.Title) {
        setSelectedMovie(data)
      } else {
        setError(data.Error || 'Unable to load details')
      }
    } catch (err) {
      console.error(err)
      setError('Unable to load details')
    }
  }

  return (
    <>
      <Head>
        <title>Super App - Personalized Recommendations</title>
      </Head>

      <div className="min-h-screen bg-black text-white" style={{ padding: '30px 50px' }}>
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-[#6BE06B] font-[cursive] text-[42px] font-medium">Super app</div>
          <div className="flex items-center gap-3 justify-between md:justify-end">
            <button
              onClick={() => {
                dispatch(logout())
                router.push('/')
              }}
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/5 transition"
            >
              Logout
            </button>
            <div className="h-[60px] w-[60px] rounded-full border-2 border-white bg-white/5 flex items-center justify-center text-lg font-semibold text-white cursor-pointer">
              {avatarLabel}
            </div>
          </div>
        </header>

        <section className="mt-[40px] mb-[50px] max-w-3xl">
          <h1 className="text-[32px] font-bold text-white leading-[1.1]">Entertainment according to your choice</h1>
        </section>

        {loading ? (
          <div className="text-[#8A8A8A]">Loading recommendations…</div>
        ) : (
          <main className="space-y-[35px]">
            {selectedGenres.map((genre) => {
              const movies = moviesByGenre[genre] || []
              return (
                <section key={genre} className="space-y-5">
                  <h2 className="text-[24px] font-semibold text-[#8A8A8A] capitalize mb-[20px]">{genre}</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-[35px]">
                    {movies.length > 0 ? (
                      movies.map((movie) => (
                        <MovieCard key={movie.imdbID} movie={movie} onClick={() => openMovie(movie.imdbID)} />
                      ))
                    ) : (
                      <div className="text-[#8A8A8A] col-span-full">No movies available for {genre}</div>
                    )}
                  </div>
                </section>
              )
            })}
          </main>
        )}

        {error && <div className="mt-6 text-sm text-[#ff3333]">{error}</div>}
      </div>

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}
    </>
  )
}
