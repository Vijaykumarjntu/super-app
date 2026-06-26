import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../src/store/slices/authSlice'
import ProfileCard from '../components/ProfileCard'
import WeatherWidget from '../components/WeatherWidget'
import NewsFeed from '../components/NewsFeed'
import Timer from '../components/Timer'

export default function Dashboard() {
  const { user, categories } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const [notes, setNotes] = useState(
    'Super App dashboard notes:\n- Review latest releases\n- Track your favorites\n- Schedule movie night\n- Keep categories updated for better recommendations'
  )

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      router.push('/onboarding')
    }
  }, [user, categories, router])

  if (!user) return null

  return (
    <>
      <Head>
        <title>Super App - Dashboard</title>
      </Head>
      <div className="min-h-screen bg-black text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-bold neon-green">Super App</h1>
              <p className="mt-2 text-[#AAAAAA]">Welcome back, {user?.name || 'KK Vinay'}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => router.push('/recommendations')}
                className="rounded-full bg-[#6BE06B] px-5 py-3 text-sm font-semibold text-black hover:bg-[#57d457] transition"
              >
                Recommendations
              </button>
              <button
                onClick={() => {
                  dispatch(logout())
                  router.push('/')
                }}
                className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/5 transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <div className="space-y-5 xl:row-span-2">
              <ProfileCard user={user} />
              <WeatherWidget />
            </div>

            <div className="rounded-[15px] bg-[#E6C15A] p-6" style={{ minHeight: '340px' }}>
              <h2 className="text-xl font-bold text-black mb-4">All notes</h2>
              <div className="max-h-[280px] overflow-y-auto notes-scrollbar pr-2">
                <p className="text-black text-sm leading-[1.6] whitespace-pre-line">
                  {notes}
                </p>
              </div>
            </div>

            <div className="rounded-[15px] bg-[#181F4A] p-4">
              <NewsFeed compact />
            </div>

            <div className="rounded-[15px] bg-[#181F4A] p-5">
              <Timer />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
