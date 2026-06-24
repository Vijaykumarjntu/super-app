import { useEffect, useState } from 'react'

export default function WeatherWidget(){
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function fetchIt(){
      const key = process.env.NEXT_PUBLIC_OWM_API_KEY || ''
      if (!key) { setLoading(false); return }
      try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=New%20York&units=metric&appid=${key}`)
        const d = await res.json()
        setWeather(d)
      }catch(e){ console.warn(e) }
      setLoading(false)
    }
    fetchIt()
  },[])

  if (loading) return <div className="p-4">Loading weather…</div>
  if (!weather || weather.cod !== 200) return <div className="p-4 text-gray-400">Weather not available</div>

  const temp = Math.round(weather.main.temp)
  const icon = weather.weather?.[0]?.icon

  return (
    <div className="p-4 rounded bg-panel">
      {icon && <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" className="w-16 h-16" />}
      <div className="mt-2">
        <div className="text-2xl font-semibold">{temp}°C</div>
        <div className="text-sm text-gray-300">{weather.name}</div>
      </div>
    </div>
  )
}
