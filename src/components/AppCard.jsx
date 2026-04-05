import { STATUSES, getSublaneName, getSublaneColor } from '../lib/constants'

export default function AppCard({ app }) {
  const statusInfo = STATUSES.find(s => s.id === app.status)

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] backdrop-blur-lg
      hover:-translate-y-1 transition-all duration-300"
      style={{ borderLeftColor: app.color, borderLeftWidth: 3 }}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: app.color + '18' }}>
            {app.icon}
          </div>
          <div className="flex items-center gap-2">
            {app.sublane && (
              <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
                background: getSublaneColor(app.sublane) + '18',
                color: getSublaneColor(app.sublane),
              }}>
                {getSublaneName(app.sublane)}
              </span>
            )}
            <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-semibold tracking-wider" style={{
              background: (statusInfo?.color || '#666') + '18',
              color: statusInfo?.color || '#666',
            }}>
              {app.status}
            </span>
          </div>
        </div>
        <h3 className="text-[15px] font-semibold mb-1.5 tracking-tight">{app.name}</h3>
        <p className="text-xs text-white/40 leading-relaxed mb-3 line-clamp-2">{app.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white/20">{app.date}</span>
          {app.url && (
            <a href={app.url} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium no-underline opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ color: app.color }}>
              Open →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
