import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { SUBLANES } from '../lib/constants'
import Modal from './Modal'

export default function PinAdmin({ onClose }) {
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(true)
  const [newPin, setNewPin] = useState('')
  const [newIssuedTo, setNewIssuedTo] = useState('')
  const [newSublane, setNewSublane] = useState('')
  const [newHint, setNewHint] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadPins() {
      const { data } = await supabase.from('hub_pins').select('*').order('issued_date', { ascending: true })
      if (data) setPins(data)
      setLoading(false)
    }

    loadPins()
  }, [])

  async function toggleActive(pin) {
    await supabase.from('hub_pins').update({ active: !pin.active }).eq('id', pin.id)
    setPins(prev => prev.map(p => p.id === pin.id ? { ...p, active: !p.active } : p))
  }

  async function addPin() {
    if (!newPin || newPin.length !== 4 || !newIssuedTo.trim()) return
    setSaving(true)

    const { data } = await supabase.from('hub_pins').insert({
      pin: newPin,
      type: 'sn',
      sublane: newSublane || null,
      label: newLabel.trim() || newIssuedTo.trim(),
      hint: newHint.trim(),
      issued_to: newIssuedTo.trim(),
      issued_date: new Date().toISOString().split('T')[0],
      active: true,
    }).select().single()

    if (data) {
      setPins(prev => [...prev, data])
      setNewPin(''); setNewIssuedTo(''); setNewSublane(''); setNewHint(''); setNewLabel('')
    }
    setSaving(false)
  }

  const inputCls = 'w-full px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-accent/40 transition-colors'

  return (
    <Modal onClose={onClose}>
      <h2 className="font-serif text-xl mb-5">🔐 PIN Admin</h2>

      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : (
        <div className="flex flex-col gap-2 mb-6">
          {pins.map(p => (
            <div key={p.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/8 bg-white/[0.03]">
              <span className="font-mono text-sm text-white/70 w-12">{p.pin}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm truncate">{p.issued_to}</span>
                  {p.sublane && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{
                      background: (SUBLANES.find(s => s.id === p.sublane)?.color || '#666') + '18',
                      color: SUBLANES.find(s => s.id === p.sublane)?.color || '#666',
                    }}>{SUBLANES.find(s => s.id === p.sublane)?.name || p.sublane}</span>
                  )}
                  {p.type === 'master' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400">Master</span>
                  )}
                </div>
                <span className="text-[11px] text-white/25 italic">{p.hint}</span>
              </div>
              <span className="text-[11px] text-white/20 shrink-0">{p.issued_date}</span>
              <button onClick={() => toggleActive(p)}
                className="text-xs px-2.5 py-1 rounded-lg border cursor-pointer transition-colors"
                style={{
                  borderColor: p.active ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)',
                  background: p.active ? 'rgba(52,211,153,0.1)' : 'rgba(239,68,68,0.1)',
                  color: p.active ? '#34d399' : '#ef4444',
                }}>
                {p.active ? 'Active' : 'Revoked'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-white/8 pt-5">
        <h3 className="text-sm font-medium text-white/60 mb-3">Add New PIN</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input value={newPin} onChange={e => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="4-digit PIN" className={inputCls} maxLength={4} />
          <input value={newIssuedTo} onChange={e => setNewIssuedTo(e.target.value)}
            placeholder="Issued to" className={inputCls} />
          <input value={newLabel} onChange={e => setNewLabel(e.target.value)}
            placeholder="Label (optional)" className={inputCls} />
          <input value={newHint} onChange={e => setNewHint(e.target.value)}
            placeholder="Cryptic hint" className={inputCls} />
        </div>
        <div className="flex gap-2 flex-wrap mb-3">
          {SUBLANES.map(s => (
            <button key={s.id} onClick={() => setNewSublane(newSublane === s.id ? '' : s.id)}
              className="px-2.5 py-1 rounded-lg text-xs transition-all cursor-pointer border"
              style={{
                borderColor: newSublane === s.id ? s.color + '60' : 'rgba(255,255,255,0.08)',
                background: newSublane === s.id ? s.color + '18' : 'transparent',
                color: newSublane === s.id ? s.color : 'rgba(255,255,255,0.4)',
              }}>{s.name}</button>
          ))}
        </div>
        <button onClick={addPin} disabled={saving || newPin.length !== 4 || !newIssuedTo.trim()}
          className="px-5 py-2 rounded-xl border-none bg-purple-deep text-white text-sm font-semibold cursor-pointer
            hover:bg-purple-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {saving ? 'Adding...' : 'Add PIN'}
        </button>
      </div>

      <div className="flex justify-end mt-5">
        <button onClick={onClose}
          className="px-5 py-2 rounded-xl border border-white/10 bg-transparent text-white/60 text-sm cursor-pointer hover:bg-white/5 transition-colors">
          Close
        </button>
      </div>
    </Modal>
  )
}
