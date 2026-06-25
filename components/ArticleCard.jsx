import Image from 'next/image'

export default function ArticleCard() {
  return (
    <div className="overflow-hidden rounded-[20px] bg-black shadow-[0_20px_80px_rgba(0,0,0,0.4)]" style={{ minHeight: '520px' }}>
      <div className="relative h-[180px] w-full">
        <Image
          src="/image.png"
          alt="Mountain"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <h2 className="text-2xl font-bold text-white">Want to climb Mount Everest?</h2>
        </div>
      </div>
      <div className="bg-white/10 p-6 text-white">
        <p className="text-sm leading-7 text-white/80">
          Discover the latest tips for altitude training, weather preparation, and the best routes for your Everest adventure. Plan with confidence and stay safe on every step.
        </p>
      </div>
    </div>
  )
}
