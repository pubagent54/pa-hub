import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import PinScreen from './components/PinScreen'
import Dashboard from './components/Dashboard'

export default function App() {
  const [session, setSession] = useState(null) // { pin, type, sublane, label }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if there's a saved session
    const saved = sessionStorage.getItem('hub_session')
    if (saved) {
      try { setSession(JSON.parse(saved)) } catch {}
    }
    setLoading(false)
  }, [])

  async function handleUnlock(pin) {
    const { data, error } = await supabase
      .from('hub_pins')
      .select('*')
      .eq('pin', pin)
      .eq('active', true)
      .single()

    if (error || !data) return false

    const sess = {
      pin: data.pin,
      type: data.type,
      sublane: data.sublane,
      label: data.label,
      issuedTo: data.issued_to,
    }
    setSession(sess)
    sessionStorage.setItem('hub_session', JSON.stringify(sess))
    return true
  }

  function handleLogout() {
    setSession(null)
    sessionStorage.removeItem('hub_session')
  }

  if (loading) return null

  if (!session) return <PinScreen onUnlock={handleUnlock} />
  return <Dashboard session={session} onLogout={handleLogout} />
}
