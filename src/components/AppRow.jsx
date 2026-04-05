import { STATUSES, getSublaneName, getSublaneColor } from '../lib/constants'

export default function AppRow({ app }) {
  const statusInfo = STATUSES.find(s => s.id === app.status)

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.03]
      hover:bg-white/[0.06] transition-colors" style={{ borderLeftColor: app.color, borderLeftWidth: 3 }}>
      <span className="text-lg shrink-0">{app.icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate">{app.name}</span>
          {app.sublane && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full shrink-0" style={{
              background: getSublaneColor(app.sublane) + '18',
              color: getSublaneColor(app.sublane),
            }}>{getSublaneName(app.sublane)}</span>
          )}
        </div>
        <p className="text-xs text-white/30 truncate hidden sm:block">{app.description}</p>
      </div>
      <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider shrink-0" style={{
        background: (statusInfo?.color || '#666') + '18',
        color: statusInfo?.color || '#666',
      }}>{app.status}</span>
      <span className="text-[11px] text-white/20 shrink-0 hidden sm:block">{app.date}</span>
      {app.url ? (
        <a href={app.url} target="_blank" rel="noopener noreferrer"
          className="text-xs no-underline shrink-0" style={{ color: app.color }}>Open →</a>
      ) : <span className="w-12 shrink-0" />}
    </div>
  )
}
