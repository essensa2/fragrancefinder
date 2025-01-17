import { useState } from 'react'
    import { supabase } from '../lib/supabaseClient'

    export default function Auth() {
      const [loading, setLoading] = useState(false)
      const [email, setEmail] = useState('')

      const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        try {
          const { error } = await supabase.auth.signInWithOtp({ email })
          if (error) throw error
          alert('Check your email for the login link!')
        } catch (error) {
          alert(error.error_description || error.message)
        } finally {
          setLoading(false)
        }
      }

      return (
        <div className="auth-container">
          <h2>Welcome to FragranceFinder.io</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button disabled={loading}>
              {loading ? 'Sending magic link...' : 'Send magic link'}
            </button>
          </form>
        </div>
      )
    }
