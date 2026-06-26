# Super App

A Next.js + Tailwind social entertainment app with signup, onboarding, profile, dashboard, and personalized recommendations.

## Features

- User signup and validation
- Category onboarding with selected interests
- Profile page with weather and article preview
- Dashboard with notes, timer, news, and weather
- Personalized movie recommendations via OMDB
- Redux Toolkit state management with localStorage persistence
- Route protection for auth and onboarding flow

## Setup

1. Install dependencies

```bash
npm install
```

2. Create a local environment file

create a new file named .env
Required variables:

```dotenv
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_WEATHER_API_KEY=your_weather_api_key
```

4. Start the development server

```bash
npm run dev
```

5. Open the app in your browser

```
http://localhost:3000
```

## APIs used

- OMDB API for movie search and details
- NewsData / News API for live news feed
- OpenWeatherMap for weather widget data

## Important files

- `pages/index.jsx` — homepage / signup flow
- `pages/onboarding.jsx` — category selection
- `pages/profile.jsx` — profile + weather + article
- `pages/dashboard.jsx` — dashboard widgets and navigation
- `pages/recommendations.jsx` — personalized movie recommendations
- `src/store/slices/authSlice.js` — auth and categories state
- `src/store/index.js` — Redux store and localStorage persistence
- `pages/api/omdb.js` — OMDB proxy endpoint
- `pages/api/news.js` — news proxy endpoint
- `pages/api/weather.js` — weather proxy endpoint

## Notes

- Auth state is retained in `localStorage` so the user remains logged in on refresh.
- The app uses client-side route guards to ensure onboarding completes before profile/dashboard access.
- If a user logs out, they are redirected back to the signup page.
