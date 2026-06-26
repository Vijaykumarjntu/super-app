import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import CategorySelector from '../components/CategorySelector'

export default function Onboarding() {
  const router = useRouter()
  const user = useSelector((state) => state.auth.user)
  const categories = useSelector((state) => state.auth.categories)

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    if (Array.isArray(categories) && categories.length > 0) {
      router.push('/profile')
    }
  }, [user, categories, router])

  return (
    <>
      <Head>
        <title>Super App - Category Selection</title>
      </Head>
      <main className="min-h-screen bg-black text-white p-[50px]">
        <CategorySelector />
      </main>
    </>
  )
}
