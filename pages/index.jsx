import Head from 'next/head'
import RegisterForm from '../components/RegisterForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Super App - Onboarding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <RegisterForm />
        </div>
      </main>
    </>
  )
}
