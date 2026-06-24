# Super App (Recreated)

This repository is a Next.js + Tailwind starter matching the project requirements (close-match to Figma).

Setup

1. Install dependencies:

```bash
npm install
```

2. Copy env example and add API keys:

```bash
cp .env.local.example .env.local
```

3. Run dev server:

```bash
npm run dev
```

Notes
- API placeholders in `.env.local.example`
- State persistence for auth is implemented via `localStorage` in `src/store/index.js`
- Movie discovery uses OMDB; Weather uses OpenWeatherMap; News uses NewsAPI (configure keys in `.env.local`)
