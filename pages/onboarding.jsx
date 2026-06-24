import Head from 'next/head'
import CategorySelector from '../components/CategorySelector'

export default function Onboarding(){
  return (
    <>
      <Head><title>Super App - Onboarding</title></Head>
      <main className="min-h-screen flex items-center justify-center bg-bg-deep text-white p-6">
        <div className="w-full max-w-3xl p-6 bg-panel rounded-2xl">
          <CategorySelector />
        </div>
      </main>
    </>
  )
}
