import { useState, useEffect } from 'react'
    import { supabase } from './lib/supabaseClient'
    import Auth from './components/Auth'
    import Account from './components/Account'
    import './App.css'

    export default function App() {
      const [session, setSession] = useState(null)

      useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
        })

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })

        return () => subscription.unsubscribe()
      }, [])

      return (
        <div className="app">
          {!session ? <Auth /> : <Account session={session} />}
        </div>
      )
    }
