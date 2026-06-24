import React, { useEffect, useState } from 'react'

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function fetchWeather(lat, lon, city) {
      try {
        const key = process.env.NEXT_PUBLIC_OWM_API_KEY
        if (!key) throw new Error('OWM API key not set')

        let url
        if (lat && lon) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
        } else {
          const q = city || 'New York'
          url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${key}`
        }

        const res = await fetch(url)
        if (!res.ok) throw new Error('Failed to fetch weather')
        const data = await res.json()
        if (mounted) {
          setWeather(data)
          setLoading(false)
        }
      } catch (err) {
        if (mounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(null, null, 'New York')
      )
    } else {
      fetchWeather(null, null, 'New York')
    }

    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="p-4">Loading weather…</div>
  if (error) return <div className="p-4 text-red-500">{error}</div>
  if (!weather) return null

  const temp = Math.round(weather.main.temp)
  const desc = weather.weather?.[0]?.description || ''
  const icon = weather.weather?.[0]?.icon

  return (
    <div className="p-4 rounded bg-white shadow flex items-center gap-4">
      {icon && (
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" className="w-16 h-16" />
      )}
      <div>
        <div className="text-2xl font-semibold">{temp}°C</div>
        <div className="text-sm text-gray-600 capitalize">{desc}</div>
        <div className="text-xs text-gray-500 mt-1">{weather.name}</div>
      </div>
    </div>
  )
}
