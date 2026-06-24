import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../src/store/slices/authSlice';
import Head from 'next/head';

export default function Dashboard() {
  const { user, categories } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [notes, setNotes] = useState('');

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load saved notes
  useEffect(() => {
    const savedNotes = localStorage.getItem('superapp-notes');
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const saveNotes = (text) => {
    setNotes(text);
    localStorage.setItem('superapp-notes', text);
  };

  // TODO: Add your API keys in .env.local
  // const fetchWeather = async () => { ... };
  // const fetchNews = async () => { ... };

  return (
    <>
      <Head>
        <title>Super App - Dashboard</title>
      </Head>
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-bold neon-green">Super App</h1>
              <p className="text-gray-400">Welcome back, {user?.name || 'User'}</p>
            </div>
            <button
              onClick={() => dispatch(logout())}
              className="px-6 py-2 border border-red-500 hover:bg-red-500/10 rounded-full text-red-400"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile + Weather + Timer */}
            <div className="space-y-6">
              {/* User Profile */}
              <div className="bg-zinc-900 rounded-3xl p-6">
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Username:</strong> @{user?.username}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                  <p><strong>Mobile:</strong> {user?.mobile}</p>
                </div>
              </div>

              {/* Weather Widget */}
              <div className="bg-zinc-900 rounded-3xl p-6">
                <h2 className="text-xl font-semibold mb-4">Weather</h2>
                <div className="text-center py-8 text-gray-400">
                  Weather Widget (Integrate OpenWeatherMap API)
                </div>
              </div>

              {/* Timer / Clock */}
              <div className="bg-zinc-900 rounded-3xl p-6">
                <h2 className="text-xl font-semibold mb-4">Live Time</h2>
                <div className="text-5xl font-mono text-center neon-green">
                  {time.toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Middle Column - News Feed */}
            <div className="lg:col-span-1 bg-zinc-900 rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-6">Latest News</h2>
              <div className="h-96 flex items-center justify-center text-gray-400 border border-dashed border-gray-700 rounded-2xl">
                News Feed (Auto-rotate every 2s - Integrate NewsAPI)
              </div>
            </div>

            {/* Right Column - Notes + Categories */}
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-3xl p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Notes</h2>
                <textarea
                  value={notes}
                  onChange={(e) => saveNotes(e.target.value)}
                  className="w-full h-64 bg-black border border-gray-700 rounded-2xl p-4 text-sm resize-none focus:border-[#39ff14]"
                  placeholder="Write your thoughts..."
                />
              </div>

              <div className="bg-zinc-900 rounded-3xl p-6">
                <h2 className="text-xl font-semibold mb-4">Selected Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="bg-[#39ff14] text-black px-4 py-1 rounded-full text-sm font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}