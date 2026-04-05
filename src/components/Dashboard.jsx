import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { CATEGORIES, SIGNALS, SUBLANES, getSublaneColor, getSublaneName, getCategoryColor } from '../lib/constants'
import AppCard from './AppCard'
import IdeaCard from './IdeaCard'
import AppRow from './AppRow'
import IdeaRow from './IdeaRow'
import AddIdeaModal from './AddIdeaModal'
import PinAdmin from './PinAdmin'

export default function Dashboard({ session, onLogout }) {
  const [apps, setApps] = useState([])
  const [ideas, setIdeas] = useState([])
  const [tab, setTab] = useState('all')
  const [view, setView] = useState('grid')
  const [signalFilter, setSignalFilter] = useState(null)
  const [search, setSearch] = useState('')
  const [showAddIdea, setShowAddIdea] = useState(false)
  const [showPinAdmin, setShowPinAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const isMaster = session.type === 'master'

  useEffect(() => { loadData() }, [])

  async function loadData() {
    const [appsRes, ideasRes] = await Promise.all([
      supabase.from('hub_apps').select('*').eq('archived', false).order('date', { ascending: false }),
      supabase.from('hub_ideas').select('*').order('created_at', { ascending: false }),
    ])
    if (appsRes.data) setApps(appsRes.data)
    if (ideasRes.data) setIdeas(ideasRes.data)
    setLoading(false)
  }

  function canSee(item) {
    if (isMaster) return true
    if (item.category !== 'sn') return false
    return !item.sublane || item.sublane === session.sublane
  }

  const filteredApps = apps.filter(canSee).filter(a =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.description?.toLowerCase().includes(search.toLowerCase())
  )
  const filteredIdeas = ideas.filter(canSee).filter(i => {
    if (search && !i.title.toLowerCase().includes(search.toLowerCase()) && !i.description?.toLowerCase().includes(search.toLowerCase())) return false
    if (signalFilter && i.signal !== signalFilter) return false
    return true
  })

  const counts = {
    live: apps.filter(canSee).filter(a => a.status === 'live').length,
    draft: apps.filter(canSee).filter(a => a.status === 'draft').length,
    planned: apps.filter(canSee).filter(a => a.status === 'planned').length,
    ideas: ideas.filter(canSee).length,
  }

  async function updateIdeaSignal(id, signal) {
    await supabase.from('hub_ideas').update({ signal }).eq('id', id)
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, signal } : i))
  }

  function onIdeaAdded(idea) {
    setIdeas(prev => [idea, ...prev])
    setShowAddIdea(false)
  }

  const sublaneLabel = session.sublane ? getSublaneName(session.sublane) : null
  const sublaneColor = session.sublane ? getSublaneColor(session.sublane) : '#a78bfa'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl sm:text-3xl tracking-tight">⚡ PubAgent Hub</h1>
          <span className="text-xs px-2.5 py-1 rounded-full border" style={{
            borderColor: sublaneColor + '40',
            background: sublaneColor + '15',
            color: sublaneColor,
          }}>
            {isMaster ? '👑 Master' : sublaneLabel || session.label}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isMaster && (
            <button onClick={() => setShowPinAdmin(true)}
              className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 text-xs transition-colors cursor-pointer">
              🔐 PINs
            </button>
          )}
          <button onClick={onLogout}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white/40 hover:bg-white/10 text-xs transition-colors cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-5 flex-wrap mb-5">
        {[
          ['Live', counts.live, '#34d399'],
          ['Draft', counts.draft, '#fbbf24'],
          ['Planned', counts.planned, '#a78bfa'],
          ['Ideas', counts.ideas, '#f472b6'],
        ].map(([label, count, color]) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            <span className="text-xs text-white/40">{count} {label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."
          className="flex-1 max-w-sm px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm
            placeholder:text-white/25 outline-none focus:border-purple-accent/40 transition-colors" />
        <div className="flex gap-2 items-center">
          {/* Tabs */}
          {['all', 'apps', 'ideas'].map(t => (
            <button key={t} onClick={() => { setTab(t); setSignalFilter(null) }}
              className="px-3.5 py-1.5 rounded-lg text-xs capitalize transition-all cursor-pointer border"
              style={{
                borderColor: tab === t ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.08)',
                background: tab === t ? 'rgba(167,139,250,0.12)' : 'transparent',
                color: tab === t ? '#a78bfa' : 'rgba(255,255,255,0.4)',
              }}>
              {t}
            </button>
          ))}
          <div className="w-px h-5 bg-white/10 mx-1" />
          {/* View toggle */}
          {['grid', 'list'].map(v => (
            <button key={v} onClick={() => setView(v)}
              className="px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer border border-white/8"
              style={{
                background: view === v ? 'rgba(255,255,255,0.08)' : 'transparent',
                color: view === v ? '#fff' : 'rgba(255,255,255,0.3)',
              }}>
              {v === 'grid' ? '▦' : '☰'}
            </button>
          ))}
        </div>
      </div>

      {/* Signal filters (ideas tab) */}
      {(tab === 'ideas' || tab === 'all') && tab !== 'apps' && (
        <div className="flex gap-2 mb-5">
          {SIGNALS.map(s => (
            <button key={s.id} onClick={() => setSignalFilter(signalFilter === s.id ? null : s.id)}
              className="px-3 py-1 rounded-full text-sm transition-all cursor-pointer border"
              style={{
                borderColor: signalFilter === s.id ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.08)',
                background: signalFilter === s.id ? 'rgba(167,139,250,0.12)' : 'transparent',
              }}>
              {s.emoji}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-white/30">Loading...</div>
      ) : (
        <>
          {/* Apps section */}
          {(tab === 'all' || tab === 'apps') && filteredApps.length > 0 && (
            <div className="mb-8">
              {tab === 'all' && <h2 className="font-serif text-lg text-white/60 mb-4">Apps</h2>}
              {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredApps.map(app => <AppCard key={app.id} app={app} />)}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredApps.map(app => <AppRow key={app.id} app={app} />)}
                </div>
              )}
            </div>
          )}

          {/* Ideas section */}
          {(tab === 'all' || tab === 'ideas') && filteredIdeas.length > 0 && (
            <div className="mb-8">
              {tab === 'all' && <h2 className="font-serif text-lg text-white/60 mb-4">Ideas</h2>}
              {view === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredIdeas.map(idea => (
                    <IdeaCard key={idea.id} idea={idea} onSignalChange={updateIdeaSignal} isMaster={isMaster} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {filteredIdeas.map(idea => (
                    <IdeaRow key={idea.id} idea={idea} onSignalChange={updateIdeaSignal} isMaster={isMaster} />
                  ))}
                </div>
              )}
            </div>
          )}

          {filteredApps.length === 0 && filteredIdeas.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-white/30">Nothing found</p>
            </div>
          )}
        </>
      )}

      {/* FAB for master */}
      {isMaster && (
        <button onClick={() => setShowAddIdea(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-purple-deep text-white text-2xl
            shadow-lg shadow-purple-deep/30 hover:bg-purple-accent transition-colors cursor-pointer border-none z-40">
          +
        </button>
      )}

      {/* Modals */}
      {showAddIdea && <AddIdeaModal onClose={() => setShowAddIdea(false)} onAdded={onIdeaAdded} />}
      {showPinAdmin && <PinAdmin onClose={() => setShowPinAdmin(false)} />}
    </div>
  )
}
