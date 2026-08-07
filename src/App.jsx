import { useState } from 'react'
import { supabase } from './lib/supabase'
import PinScreen from './components/PinScreen'
import Dashboard from './components/Dashboard'

export default function App() {
  const [session, setSession] = useState(() => {
    const saved = sessionStorage.getItem('hub_session')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        sessionStorage.removeItem('hub_session')
      }
    }
    return null
  }) // { pin, type, sublane, label }

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

  if (!session) return <PinScreen onUnlock={handleUnlock} />
  return <Dashboard session={session} onLogout={handleLogout} />
}
