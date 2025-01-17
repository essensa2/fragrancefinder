import { useState, useEffect } from 'react'
    import { supabase } from '../lib/supabaseClient'

    export default function Account({ session }) {
      const [loading, setLoading] = useState(true)
      const [username, setUsername] = useState(null)

      useEffect(() => {
        getProfile()
      }, [session])

      async function getProfile() {
        try {
          setLoading(true)
          const { user } = session

          let { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single()

          if (error) throw error
          if (data) setUsername(data.username)
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="account-container">
          <h2>Welcome, {username || 'Fragrance Explorer'}!</h2>
          <button onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      )
    }
