import Head from 'next/head'
import CategorySelector from '../components/CategorySelector'

export default function Onboarding() {
  return (
    <>
      <Head>
        <title>Super App - Onboarding</title>
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow">
          <CategorySelector />
        </div>
      </main>
    </>
  )
}
