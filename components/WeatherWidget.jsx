import { useEffect, useState } from 'react'

export default function WeatherWidget() {
  const [dateTime, setDateTime] = useState(new Date())
  const [weather, setWeather] = useState({
    temp: 24,
    condition: 'Mostly clear',
    humidity: 68,
    windSpeed: 12,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch('/api/weather?city=New York')
        const data = await res.json()
        if (data.error) {
          setError(data.error)
        } else {
          setWeather({
            temp: data.temp || 24,
            condition: data.description || data.condition || 'Mostly clear',
            humidity: data.humidity || 68,
            windSpeed: data.windSpeed || 12,
          })
        }
      } catch (err) {
        console.error('Weather fetch error:', err)
        setError('Unable to load weather')
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
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
        {loading ? (
          <p className="text-sm text-white/70">Loading weather…</p>
        ) : error ? (
          <p className="text-sm text-[#ff3333]">{error}</p>
        ) : (
          <>
            <p className="text-5xl font-bold text-white">{weather.temp}°C</p>
            <p className="mt-3 text-sm text-white/70 capitalize">{weather.condition}</p>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3 px-6 pb-6">
        <div className="rounded-3xl bg-white/5 p-4 text-center text-sm text-white/80">
          <p className="font-semibold text-white">Humidity</p>
          <p className="mt-2">{weather.humidity}%</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4 text-center text-sm text-white/80">
          <p className="font-semibold text-white">Wind</p>
          <p className="mt-2">{weather.windSpeed} km/h</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-4 text-center text-sm text-white/80">
          <p className="font-semibold text-white">Condition</p>
          <p className="mt-2">Live</p>
        </div>
      </div>
    </div>
  )
}
