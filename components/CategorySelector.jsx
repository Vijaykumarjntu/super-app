import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCategories } from '../src/store/slices/authSlice'
import { useRouter } from 'next/router'

const ALL_CATEGORIES = [
  'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary', 'Animation', 'Thriller'
]

export default function CategorySelector() {
  const [selected, setSelected] = useState([])
  const dispatch = useDispatch()
  const router = useRouter()

  function toggle(cat) {
    setSelected(s => (s.includes(cat) ? s.filter(x => x !== cat) : [...s, cat]))
  }

  function onNext() {
    if (selected.length < 3) return
    dispatch(setCategories(selected))
    router.push('/dashboard')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose at least 3 categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {ALL_CATEGORIES.map(cat => {
          const active = selected.includes(cat)
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggle(cat)}
              className={`px-3 py-2 rounded-md border transition-shadow text-left ${active ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white hover:shadow'} `}
            >
              {cat}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">Selected: {selected.length}</p>
        <button
          onClick={onNext}
          disabled={selected.length < 3}
          className={`px-4 py-2 rounded ${selected.length < 3 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}
