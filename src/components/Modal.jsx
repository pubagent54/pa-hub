export default function Modal({ children, onClose }) {
  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-5">
      <div onClick={e => e.stopPropagation()}
        className="w-full sm:max-w-lg bg-gradient-to-b from-[#1e1e3c]/95 to-[#141432]/98 border border-white/10
          rounded-t-2xl sm:rounded-2xl p-6 max-h-[85vh] overflow-y-auto
          animate-slide-up sm:animate-scale-in
          shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  )
}
