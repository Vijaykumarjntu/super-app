import Head from 'next/head'
import { useSelector } from 'react-redux'
import DashboardLayout from '../components/DashboardLayout'
import ProfileCard from '../components/ProfileCard'
import WeatherWidget from '../components/WeatherWidget'
import Timer from '../components/Timer'
import NewsFeed from '../components/NewsFeed'

export default function Dashboard() {
  const user = useSelector(s => s.auth)

  const mainContent = (
    <>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <WeatherWidget />
        <Timer />
        <NewsFeed />
      </section>

      <section className="mt-6">
        <h3 className="font-semibold mb-2">Notes</h3>
        <p className="text-sm text-gray-600">Notes persistence will be implemented using browser storage.</p>
      </section>

      <section className="mt-6">
        <h3 className="font-semibold mb-2">Entertainment Discovery</h3>
        <p className="text-sm text-gray-600">Movies will be fetched based on selected categories.</p>
      </section>
    </>
  )

  return (
    <>
      <Head>
        <title>Super App - Dashboard</title>
      </Head>

      <DashboardLayout>
        {{ profile: <ProfileCard user={user} />, main: mainContent }}
      </DashboardLayout>
    </>
  )
}
