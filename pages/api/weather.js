export default async function handler(req, res) {
  const key = process.env.NEXT_PUBLIC_WEATHER_API_KEY || process.env.WEATHER_API_KEY
  if (!key) {
    console.warn('Weather API key not found')
    return res.status(500).json({ error: 'Weather API key not configured' })
  }

  try {
    const city = req.query.city || 'New York'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${encodeURIComponent(key)}`
    const response = await fetch(url)
    const data = await response.json()

    if (data.cod !== 200) {
      return res.status(200).json({
        error: data.message || 'Weather data unavailable',
        temp: null,
        condition: null,
        humidity: null,
        windSpeed: null,
      })
    }

    return res.status(200).json({
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed),
      city: data.name,
      icon: data.weather[0].icon,
    })
  } catch (err) {
    console.error('Weather API error:', err)
    return res.status(500).json({ error: 'Failed to fetch weather' })
  }
}
