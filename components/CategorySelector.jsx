import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setCategories } from '../src/store/slices/authSlice'

const categoryMeta = [
  { id: 'action', label: 'Action', color: 'bg-orange-500', thumb: '🔥' },
  { id: 'drama', label: 'Drama', color: 'bg-violet-600', thumb: '🎭' },
  { id: 'romance', label: 'Romance', color: 'bg-emerald-600', thumb: '💚' },
  { id: 'thriller', label: 'Thriller', color: 'bg-sky-500', thumb: '🧠' },
  { id: 'western', label: 'Western', color: 'bg-orange-800', thumb: '🤠' },
  { id: 'horror', label: 'Horror', color: 'bg-fuchsia-700', thumb: '👻' },
  { id: 'fantasy', label: 'Fantasy', color: 'bg-pink-500', thumb: '🧚' },
  { id: 'music', label: 'Music', color: 'bg-red-500', thumb: '🎵' },
  { id: 'fiction', label: 'Fiction', color: 'bg-lime-500', thumb: '📚' },
]

export default function CategorySelector() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [selected, setSelected] = useState([])
  const [error, setError] = useState('')

  function toggle(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    setError('')
  }

  function next() {
    if (selected.length < 3) {
      setError('Minimum 3 categories required')
      return
    }
    dispatch(setCategories(selected))
    router.push('/profile')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-10 text-white">
      <section className="space-y-8">
        <div>
          <div className="text-[#6BE06B] text-[36px] font-bold font-[cursive]">Super app</div>
          <h1 className="text-white font-black text-[56px] leading-[1.1] mt-6">
            Choose your entertainment category
          </h1>
        </div>

        <div className="space-y-4">
          <p className="text-[#BDBDBD] max-w-xl leading-7">
            Pick at least three categories to customize your dashboard and discover movies, news, and updates that feel made for you.
          </p>

          <div>
            <div className="mb-3 text-sm uppercase tracking-[0.24em] text-[#999]">Selected tags</div>
            <div className="flex flex-wrap gap-3">
              {selected.length > 0 ? (
                selected.map((id) => (
                  <span
                    key={id}
                    className="inline-flex items-center gap-2 bg-[#18A118] text-white rounded-full px-4 py-1.5 text-sm"
                  >
                    <span>{id}</span>
                    <button
                      type="button"
                      onClick={() => toggle(id)}
                      className="text-white opacity-80 hover:opacity-100"
                    >
                      ✕
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-sm text-[#888]">No categories selected yet.</p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="inline-flex items-center gap-2 text-[#ff3333] text-sm">
            <span>⚠</span>
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center rounded-[20px] bg-[#18A118] px-5 py-2.5 text-white text-sm font-semibold hover:bg-[#1fae1f] transition"
          >
            Next Page
          </button>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryMeta.map((category) => {
            const active = selected.includes(category.id)
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => toggle(category.id)}
                className={`relative flex h-[120px] flex-col justify-between rounded-[10px] p-4 text-left transition-shadow duration-200 ${category.color} ${
                  active ? 'ring-4 ring-[#00ff00] shadow-2xl shadow-[#00ff0020]' : 'shadow-lg shadow-black/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white uppercase tracking-[0.1em]">
                    {category.label}
                  </span>
                  <span className="text-2xl">{category.thumb}</span>
                </div>
                <div className="text-sm text-white/90">Tap to select</div>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
