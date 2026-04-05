import { SIGNALS, getCategoryColor, getCategoryName, getSublaneName, getSublaneColor } from '../lib/constants'

export default function IdeaRow({ idea, onSignalChange, isMaster }) {
  const signalInfo = SIGNALS.find(s => s.id === idea.signal) || SIGNALS[0]

  function cycleSignal() {
    if (!isMaster) return
    const idx = SIGNALS.findIndex(s => s.id === idea.signal)
    const next = SIGNALS[(idx + 1) % SIGNALS.length]
    onSignalChange(idea.id, next.id)
  }

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.03]
      hover:bg-white/[0.06] transition-colors"
      style={{ borderLeftColor: getCategoryColor(idea.category), borderLeftWidth: 3 }}>
      <button onClick={cycleSignal}
        className={`text-lg shrink-0 bg-transparent border-none ${isMaster ? 'hover:scale-125 cursor-pointer' : 'cursor-default'} transition-transform`}>
        {signalInfo.emoji}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{idea.title}</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{
            background: getCategoryColor(idea.category) + '18',
            color: getCategoryColor(idea.category),
          }}>{getCategoryName(idea.category)}</span>
          {idea.sublane && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{
              background: getSublaneColor(idea.sublane) + '18',
              color: getSublaneColor(idea.sublane),
            }}>{getSublaneName(idea.sublane)}</span>
          )}
        </div>
        <p className="text-xs text-white/30 truncate hidden sm:block">{idea.description}</p>
      </div>
      <span className="text-[11px] text-white/20 shrink-0">{idea.date}</span>
    </div>
  )
}
