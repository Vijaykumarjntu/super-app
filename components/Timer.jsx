import { useEffect, useRef, useState } from 'react'

export default function Timer(){
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(30)
  const ref = useRef(null)

  useEffect(()=>{ setRemaining(minutes*60 + seconds) }, [minutes, seconds])

  useEffect(()=>{
    if (running) {
      ref.current = setInterval(()=>{
        setRemaining(r=>{
          if (r<=1){ clearInterval(ref.current); setRunning(false); return 0 }
          return r-1
        })
      },1000)
    }
    return ()=>clearInterval(ref.current)
  },[running])

  const mm = String(Math.floor(remaining/60)).padStart(2,'0')
  const ss = String(remaining%60).padStart(2,'0')

  return (
    <div className="p-4 rounded bg-panel">
      <h4 className="font-semibold mb-2">Timer</h4>
      <div className="text-3xl font-mono mb-3">{mm}:{ss}</div>
      <div className="flex gap-2">
        <button onClick={()=>setRunning(r=>!r)} className="px-3 py-1 bg-neon-green text-black rounded">{running? 'Pause' : 'Start'}</button>
        <button onClick={()=>{ clearInterval(ref.current); setRunning(false); setRemaining(minutes*60+seconds) }} className="px-3 py-1 bg-gray-200 rounded">Reset</button>
      </div>
    </div>
  )
}
