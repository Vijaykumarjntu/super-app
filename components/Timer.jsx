import React, { useState, useEffect, useRef } from 'react'

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 880
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1)
    setTimeout(() => { o.stop(); ctx.close() }, 1100)
  } catch (e) {
    // fallback: alert sound
    try { new Audio().play() } catch (_) {}
  }
}

export default function Timer() {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const [remaining, setRemaining] = useState(30)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    setRemaining(minutes * 60 + seconds)
  }, [minutes, seconds])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            playBeep()
            return 0
          }
          return r - 1
        })
      }, 1000)
    }

    return () => clearInterval(intervalRef.current)
  }, [running])

  function startPause() {
    if (running) {
      clearInterval(intervalRef.current)
      setRunning(false)
    } else {
      if (remaining <= 0) setRemaining(minutes * 60 + seconds || 0)
      setRunning(true)
    }
  }

  function reset() {
    clearInterval(intervalRef.current)
    setRunning(false)
    setRemaining(minutes * 60 + seconds)
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')

  return (
    <div className="p-4 rounded bg-white shadow">
      <h4 className="font-semibold mb-2">Timer</h4>
      <div className="flex items-center gap-2 mb-3">
        <input type="number" min="0" value={minutes} onChange={e => setMinutes(Number(e.target.value) || 0)} className="w-20 input" />
        <span>min</span>
        <input type="number" min="0" max="59" value={seconds} onChange={e => setSeconds(Number(e.target.value) || 0)} className="w-20 input" />
        <span>sec</span>
      </div>

      <div className="text-3xl font-mono mb-3">{mm}:{ss}</div>

      <div className="flex gap-2">
        <button onClick={startPause} className="px-3 py-1 bg-indigo-600 text-white rounded">{running ? 'Pause' : 'Start'}</button>
        <button onClick={reset} className="px-3 py-1 bg-gray-200 rounded">Reset</button>
      </div>
    </div>
  )
}
