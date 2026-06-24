import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setCategories } from '../src/store/slices/authSlice'

const categories = [
  'action','drama','romance','thriller','western','horror','fantasy','music','fiction'
]

export default function CategorySelector(){
  const dispatch = useDispatch()
  const router = useRouter()
  const [selected, setSelected] = useState([])
  const [error, setError] = useState('')

  function toggle(id){
    setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])
    setError('')
  }

  function next(){
    if (selected.length < 3) return setError('Select at least 3 categories')
    dispatch(setCategories(selected))
    router.push('/dashboard')
  }

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4 neon-green">Choose your categories</h2>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {categories.map(c => (
          <button key={c} onClick={()=>toggle(c)} className={`p-4 rounded-2xl text-sm ${selected.includes(c) ? 'border-2 border-neon-green bg-black/40' : 'bg-black/30'}`}>
            {c}
          </button>
        ))}
      </div>
      {error && <div className="text-sm text-red-400 mb-3">{error}</div>}
      <div className="flex gap-3">
        <button onClick={()=>router.back()} className="flex-1 border border-gray-600 py-3 rounded-full">Back</button>
        <button onClick={next} className="flex-1 bg-neon-green text-black py-3 rounded-full">Continue</button>
      </div>
    </div>
  )
}
