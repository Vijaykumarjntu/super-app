import React from 'react'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../src/store/slices/authSlice'
import NewsFeed from '../components/NewsFeed'
import ProfileCard from '../components/ProfileCard'
import WeatherWidget from '../components/WeatherWidget'
import Timer from '../components/Timer'
import MovieList from '../components/MovieList'

export default function Dashboard(){
  const { user, categories } = useSelector(s=>s.auth)
  const dispatch = useDispatch()

  return (
    <>
      <Head><title>Super App - Dashboard</title></Head>
      <div className="min-h-screen bg-bg-deep text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold neon-green">Super App</h1>
              <p className="text-gray-400">Welcome back, {user?.name || 'User'}</p>
            </div>
            <button onClick={()=>dispatch(logout())} className="px-4 py-2 border border-red-500 rounded-full text-red-400">Logout</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="bg-panel rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Profile</h2>
                <ProfileCard user={user} />
              </div>

              <div className="bg-panel rounded-2xl p-6">
                <WeatherWidget />
              </div>

              <div className="bg-panel rounded-2xl p-6">
                <Timer />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-panel rounded-2xl p-6 mb-6">
                <NewsFeed />
              </div>

              <div className="bg-panel rounded-2xl p-6">
                <MovieList categories={categories} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-panel rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Notes</h2>
                <Notes />
              </div>

              <div className="bg-panel rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Selected Categories</h2>
                <div className="flex flex-wrap gap-2">{(categories||[]).map(c=> <span key={c} className="px-3 py-1 bg-neon-green text-black rounded-full text-xs">{c}</span>)}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

function Notes(){
  const [notes, setNotes] = React.useState('')
  React.useEffect(()=>{ const s = localStorage.getItem('superapp-notes'); if (s) setNotes(s) }, [])
  function save(v){ setNotes(v); localStorage.setItem('superapp-notes', v) }
  return <textarea value={notes} onChange={e=>save(e.target.value)} className="w-full h-48 bg-black border border-gray-700 rounded-2xl p-3 text-sm resize-none" placeholder="Write your thoughts..." />
}
