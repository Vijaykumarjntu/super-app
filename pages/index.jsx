import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';
import RegisterForm from '../components/RegisterForm';
import CategorySelector from '../components/CategorySelector';

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <>
      <Head>
        <title>Super App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-black text-white overflow-hidden">
        <div className="h-screen flex">
          
          {/* Left Side - Background Image (Visible on large screens) */}
          <div className="hidden lg:block w-1/2 relative">
            <Image
              src="/image.png"
              alt="Concert Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            
            <div className="absolute bottom-16 left-12 z-10 max-w-md">
              <h1 className="text-5xl font-bold leading-tight neon-green">
                Discover new things on<br />Superapp
              </h1>
            </div>
          </div>

          {/* Right Side - Form / Content */}
          <div className="w-full lg:w-1/2 bg-black flex justify-center items-center px-10">
            <div className="w-full max-w-[400px]">
              {step === 1 && <RegisterForm onNext={() => setStep(2)} />}
              {step === 2 && <CategorySelector onBack={() => setStep(1)} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}