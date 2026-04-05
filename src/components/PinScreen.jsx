import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function PinScreen({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [shaking, setShaking] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [hints, setHints] = useState([])

  useEffect(() => {
    supabase.from('hub_pins').select('hint, label').eq('active', true)
      .then(({ data }) => { if (data) setHints(data) })
  }, [])

  async function handleKey(n) {
    if (pin.length >= 4 || loading) return
    const next = pin + n
    setPin(next)
    setError(false)

    if (next.length === 4) {
      setLoading(true)
      const success = await onUnlock(next)
      if (!success) {
        setShaking(true)
        setError(true)
        setTimeout(() => { setShaking(false); setPin(''); setLoading(false) }, 600)
      }
    }
  }

  function handleDelete() {
    setPin(p => p.slice(0, -1))
    setError(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 animate-fade-in">
      <div className="text-5xl mb-3">⚡</div>
      <h1 className="font-serif text-3xl font-normal mb-2 tracking-tight">PubAgent Hub</h1>
      <p className="text-white/40 text-sm mb-10">Enter PIN to continue</p>

      <div className={`flex gap-4 mb-10 ${shaking ? 'animate-shake' : ''}`}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="w-4 h-4 rounded-full border-2 transition-all duration-150" style={{
            background: i < pin.length ? (error ? '#ef4444' : '#fff') : 'transparent',
            borderColor: error ? '#ef4444' : 'rgba(255,255,255,0.3)',
          }} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <button key={n} onClick={() => handleKey(String(n))}
            className="w-20 h-20 rounded-full border border-white/10 bg-white/5 text-white text-2xl font-light
              hover:bg-white/10 active:bg-white/15 transition-all duration-150 backdrop-blur-sm cursor-pointer">
            {n}
          </button>
        ))}
        <div className="relative flex items-center justify-center">
          <button onClick={() => setShowHints(!showHints)}
            className="w-10 h-10 rounded-full text-white/20 hover:text-white/50 text-lg transition-colors cursor-pointer bg-transparent border-none">
            ?
          </button>
          {showHints && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black/90 border border-white/10 rounded-xl p-3 min-w-52 animate-scale-in z-10">
              <p className="text-[11px] text-white/30 mb-2 uppercase tracking-wider">Hints</p>
              {hints.map((h, i) => (
                <div key={i} className="text-xs text-white/50 py-1 border-b border-white/5 last:border-0">
                  <span className="text-white/30">{h.label}:</span> {h.hint}
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => handleKey('0')}
          className="w-20 h-20 rounded-full border border-white/10 bg-white/5 text-white text-2xl font-light
            hover:bg-white/10 active:bg-white/15 transition-all duration-150 backdrop-blur-sm cursor-pointer">
          0
        </button>
        <button onClick={handleDelete}
          className="w-20 h-20 rounded-full bg-transparent border-none text-white/40 hover:text-white text-sm transition-colors cursor-pointer">
          Delete
        </button>
      </div>
    </div>
  )
}
