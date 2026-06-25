import { useEffect, useRef, useState } from 'react'

export default function Timer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [remaining, setRemaining] = useState(5 * 60)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  const totalSeconds = hours * 3600 + minutes * 60 + seconds

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  useEffect(() => {
    if (!running) {
      setRemaining(totalSeconds)
    }
  }, [hours, minutes, seconds, totalSeconds, running])

  const displayHours = String(Math.floor(remaining / 3600)).padStart(2, '0')
  const displayMinutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0')
  const displaySeconds = String(remaining % 60).padStart(2, '0')
  const totalStart = totalSeconds || 1
  const progress = ((totalStart - remaining) / totalStart) * 100
  const radius = 68
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-6 text-white">
      <div className="relative flex items-center justify-center">
        <svg width="170" height="170" className="rotate-[-90deg]">
          <circle
            cx="85"
            cy="85"
            r={radius}
            stroke="#2d2f5d"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="85"
            cy="85"
            r={radius}
            stroke="#ff6b75"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[28px] font-semibold text-white">{displayHours}:{displayMinutes}:{displaySeconds}</span>
          <span className="text-xs text-white/70 mt-2">Countdown</span>
        </div>
      </div>

      <div className="grid w-full grid-cols-3 gap-3 text-center">
        <label className="rounded-xl bg-white/5 p-4">
          <div className="text-sm text-white/70 mb-2">Hours</div>
          <input
            type="number"
            min="0"
            max="23"
            value={hours}
            disabled={running}
            onChange={(e) => setHours(Math.max(0, Math.min(23, Number(e.target.value))))}
            className="w-full bg-transparent border border-white/10 text-[36px] font-semibold text-white text-center outline-none"
          />
        </label>
        <label className="rounded-xl bg-white/5 p-4">
          <div className="text-sm text-white/70 mb-2">Minutes</div>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            disabled={running}
            onChange={(e) => setMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
            className="w-full bg-transparent border border-white/10 text-[36px] font-semibold text-white text-center outline-none"
          />
        </label>
        <label className="rounded-xl bg-white/5 p-4">
          <div className="text-sm text-white/70 mb-2">Seconds</div>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            disabled={running}
            onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
            className="w-full bg-transparent border border-white/10 text-[36px] font-semibold text-white text-center outline-none"
          />
        </label>
      </div>

      <button
        onClick={() => {
          if (totalSeconds === 0) return
          setRemaining(totalSeconds)
          setRunning((prev) => !prev)
        }}
        className="mt-2 rounded-[20px] bg-[#ff6b75] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#ff5a67] disabled:cursor-not-allowed disabled:opacity-70"
        disabled={totalSeconds === 0}
      >
        {running ? 'Pause' : 'Start'}
      </button>
    </div>
  )
}
