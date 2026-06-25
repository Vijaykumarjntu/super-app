import { useEffect, useState } from 'react'

export default function WeatherWidget() {
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = dateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="rounded-[20px] bg-[#061229] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.4)]" style={{ minHeight: '250px' }}>
      <div className="h-[60px] bg-[#ff4bc5] px-6 py-4">
        <div className="text-xs uppercase tracking-[0.2em] text-white/90">{formattedDate}</div>
        <div className="mt-1 text-sm font-semibold text-white/90">{formattedTime}</div>
      </div>
      <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
        <p className="text-5xl font-bold text-white">24°C</p>
        <p className="mt-3 text-sm text-white/70">Mostly clear</p>
      </div>
      <div className="grid grid-cols-3 gap-3 px-6 pb-6">
        <div className="rounded-3xl bg-white/5 p-4 text-center text-sm text-white/80">
          <p className="font-semibold text-white">Humidity</p>
          <p className="mt-2">68%</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4 text-center text-sm text-white/80">
          <p className="font-semibold text-white">Wind</p>
          <p className="mt-2">12 km/h</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4 text-center text-sm text-white/80">
          <p className="font-semibold text-white">Clouds</p>
          <p className="mt-2">14%</p>
        </div>
      </div>
    </div>
  )
}
