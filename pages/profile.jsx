import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import ProfileCard from '../components/ProfileCard'
import WeatherWidget from '../components/WeatherWidget'
import ArticleCard from '../components/ArticleCard'

export default function ProfilePage() {
  const router = useRouter()
  const user = useSelector((state) => state.auth.user)
  const categories = useSelector((state) => state.auth.categories)

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) return null

  return (
    <>
      <Head>
        <title>Super App - Your Profile</title>
      </Head>
      <div className="min-h-screen bg-black text-white px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold neon-green mb-2">Super App</h1>
            <p className="text-[#AAAAAA]">Review your profile before exploring</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
            <div className="xl:col-span-1 flex justify-center xl:justify-start">
              <ProfileCard user={user} />
            </div>
            <div className="xl:col-span-1">
              <WeatherWidget />
            </div>
            <div className="xl:col-span-1">
              <ArticleCard />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 max-w-7xl">
            <button
              onClick={() => router.push('/dashboard')}
              className="rounded-full bg-[#6BE06B] px-8 py-3 text-sm font-semibold text-black hover:bg-[#57d457] transition"
            >
              Continue to Dashboard
            </button>
            <button
              onClick={() => router.back()}
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white/90 hover:bg-white/5 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
