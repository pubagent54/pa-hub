import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { CATEGORIES, SUBLANES } from '../lib/constants'
import Modal from './Modal'

export default function AddIdeaModal({ onClose, onAdded }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('sn')
  const [sublane, setSublane] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!title.trim()) return
    setSaving(true)

    const today = new Date().toISOString().split('T')[0]
    const idea = {
      title: title.trim(),
      description: description.trim() || null,
      category,
      sublane: category === 'sn' && sublane ? sublane : null,
      signal: 'new',
      date: today,
    }

    const { data } = await supabase.from('hub_ideas').insert(idea).select().single()
    if (data) onAdded(data)
    else { setSaving(false); alert('Failed to save') }
  }

  const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-white/25 outline-none focus:border-purple-accent/40 transition-colors'

  return (
    <Modal onClose={onClose}>
      <h2 className="font-serif text-xl mb-5">New Idea</h2>

      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="What's the idea?" className={inputCls} autoFocus />
        </div>

        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Optional details..." rows={3} className={`${inputCls} resize-y`} />
        </div>

        <div>
          <label className="text-xs text-white/40 mb-1.5 block">Category</label>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => { setCategory(c.id); if (c.id !== 'sn') setSublane('') }}
                className="px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer border"
                style={{
                  borderColor: category === c.id ? c.color + '60' : 'rgba(255,255,255,0.08)',
                  background: category === c.id ? c.color + '18' : 'transparent',
                  color: category === c.id ? c.color : 'rgba(255,255,255,0.4)',
                }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {category === 'sn' && (
          <div>
            <label className="text-xs text-white/40 mb-1.5 block">SN Sublane</label>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setSublane('')}
                className="px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer border"
                style={{
                  borderColor: !sublane ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                  background: !sublane ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: !sublane ? '#fff' : 'rgba(255,255,255,0.4)',
                }}>All</button>
              {SUBLANES.map(s => (
                <button key={s.id} onClick={() => setSublane(s.id)}
                  className="px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer border"
                  style={{
                    borderColor: sublane === s.id ? s.color + '60' : 'rgba(255,255,255,0.08)',
                    background: sublane === s.id ? s.color + '18' : 'transparent',
                    color: sublane === s.id ? s.color : 'rgba(255,255,255,0.4)',
                  }}>
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6 justify-end">
        <button onClick={onClose}
          className="px-5 py-2 rounded-xl border border-white/10 bg-transparent text-white/60 text-sm cursor-pointer hover:bg-white/5 transition-colors">
          Cancel
        </button>
        <button onClick={handleSave} disabled={saving || !title.trim()}
          className="px-5 py-2 rounded-xl border-none bg-purple-deep text-white text-sm font-semibold cursor-pointer
            hover:bg-purple-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          {saving ? 'Saving...' : 'Add Idea'}
        </button>
      </div>
    </Modal>
  )
}
