export const CATEGORIES = [
  { id: 'sn', name: 'SN', color: '#60a5fa' },
  { id: 'pubagent', name: 'PubAgent', color: '#a78bfa' },
  { id: 'bluesky', name: 'Blue Sky', color: '#38bdf8' },
  { id: 'personal', name: 'Personal', color: '#fb923c' },
]

export const SUBLANES = [
  { id: 'sn-it', name: 'IT', color: '#60a5fa' },
  { id: 'sn-ops', name: 'Ops', color: '#34d399' },
  { id: 'sn-marketing', name: 'Marketing', color: '#f472b6' },
  { id: 'sn-board', name: 'Board', color: '#D4A84B' },
]

export const SIGNALS = [
  { id: 'new', emoji: '💡', label: 'New' },
  { id: 'considering', emoji: '🤔', label: 'Considering' },
  { id: 'implemented', emoji: '👍', label: 'Implemented' },
  { id: 'rejected', emoji: '👎', label: 'Rejected' },
]

export const STATUSES = [
  { id: 'live', label: 'Live', color: '#34d399' },
  { id: 'draft', label: 'Draft', color: '#fbbf24' },
  { id: 'planned', label: 'Planned', color: '#a78bfa' },
]

export function getSublaneColor(sublane) {
  return SUBLANES.find(s => s.id === sublane)?.color || '#666'
}

export function getSublaneName(sublane) {
  return SUBLANES.find(s => s.id === sublane)?.name || sublane
}

export function getCategoryColor(category) {
  return CATEGORIES.find(c => c.id === category)?.color || '#666'
}

export function getCategoryName(category) {
  return CATEGORIES.find(c => c.id === category)?.name || category
}
