import { SIGNALS, getCategoryColor, getCategoryName, getSublaneName, getSublaneColor } from '../lib/constants'

export default function IdeaCard({ idea, onSignalChange, isMaster }) {
  const signalInfo = SIGNALS.find(s => s.id === idea.signal) || SIGNALS[0]

  function cycleSignal() {
    if (!isMaster) return
    const idx = SIGNALS.findIndex(s => s.id === idea.signal)
    const next = SIGNALS[(idx + 1) % SIGNALS.length]
    onSignalChange(idea.id, next.id)
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] backdrop-blur-lg"
      style={{ borderLeftColor: getCategoryColor(idea.category), borderLeftWidth: 3 }}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
              background: getCategoryColor(idea.category) + '18',
              color: getCategoryColor(idea.category),
            }}>{getCategoryName(idea.category)}</span>
            {idea.sublane && (
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
                background: getSublaneColor(idea.sublane) + '18',
                color: getSublaneColor(idea.sublane),
              }}>{getSublaneName(idea.sublane)}</span>
            )}
          </div>
          <button onClick={cycleSignal} title={isMaster ? 'Click to cycle signal' : signalInfo.label}
            className={`text-xl transition-transform ${isMaster ? 'hover:scale-125 cursor-pointer' : 'cursor-default'} bg-transparent border-none`}>
            {signalInfo.emoji}
          </button>
        </div>
        <h3 className="text-[15px] font-semibold mb-1.5 tracking-tight">{idea.title}</h3>
        {idea.description && (
          <p className="text-xs text-white/40 leading-relaxed mb-3 line-clamp-2">{idea.description}</p>
        )}
        <span className="text-[11px] text-white/20">{idea.date}</span>
      </div>
    </div>
  )
}
