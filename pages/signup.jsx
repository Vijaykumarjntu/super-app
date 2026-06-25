import Image from 'next/image';
import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <div className="grid grid-cols-2 h-screen bg-black">
      {/* Left Section - Promotional Image */}
      <div className="relative overflow-hidden">
        <Image
          src="/image.png"
          alt="Promotional"
          fill
          className="w-full h-full object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Heading at Bottom-Left */}
        <div
          className="absolute bottom-10 left-10"
          style={{
            fontSize: '42px',
            fontWeight: '700',
            color: 'white',
            lineHeight: '1.2',
            maxWidth: '90%',
          }}
        >
          Discover new things on Superapp
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="flex items-center justify-center bg-black px-12">
        <SignupForm />
      </div>
    </div>
  );
}
