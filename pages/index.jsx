import Head from 'next/head'
import RegisterForm from '../components/RegisterForm'

export default function Home(){
  return (
    <>
      <Head>
        <title>Super App - Registration</title>
      </Head>
      <main className="flex h-screen w-screen overflow-hidden">
        <div className="hidden md:block w-1/2 h-full bg-black"></div>
        <div className="w-full md:w-1/2 h-full bg-bg-deep flex items-center justify-center px-6">
          <RegisterForm />
        </div>
      </main>
    </>
  )
}
