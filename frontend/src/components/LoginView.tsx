import { useState } from 'react'

interface LoginViewProps {
  onSuccess: (token: string, user: { username: string; email: string }) => void
  onSwitchToSignup: () => void
  onGoHome: () => void
}

export function LoginView({ onSuccess, onSwitchToSignup, onGoHome }: LoginViewProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to log in. Please check your credentials.')
      }

      // Success
      onSuccess(data.token, data.user)
    } catch (err: any) {
      setError(err.message || 'Connection error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-16 px-4 flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--grad-hero)' }}>
      {/* Back button */}
      <button 
        onClick={onGoHome}
        className="absolute top-6 left-6 btn-playful btn-playful-white py-2 px-4 text-sm"
      >
        ← Home
      </button>

      {/* Decorative background vectors */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-orange-400/10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-36 h-36 rounded-full bg-sky-400/10 pointer-events-none" />

      {/* Login Card */}
      <div className="playful-card p-8 md:p-10 w-full max-w-md bg-white z-10" style={{ backgroundColor: 'var(--clr-white)' }}>
        
        {/* Branding header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-1 select-none">
            kid<span style={{ color: 'var(--clr-brand)' }}>rove</span>
          </h1>
          <p className="text-xs text-muted uppercase tracking-wider font-bold">
            Sign in to your account
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div 
            className="mb-5 p-3.5 border-2 border-slate-900 bg-red-100 text-red-700 font-bold rounded-lg text-xs"
            style={{ boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)' }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-800 mb-1.5" style={{ color: 'var(--clr-ink)' }}>
              Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. kid@kidrove.ae"
              required
              className="w-full px-4 py-2.5 rounded-xl border-3 border-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              style={{ 
                color: 'var(--clr-ink)', 
                boxShadow: 'var(--shadow-brutal-sm)'
              }}
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-800 mb-1.5" style={{ color: 'var(--clr-ink)' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-xl border-3 border-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              style={{ 
                color: 'var(--clr-ink)', 
                boxShadow: 'var(--shadow-brutal-sm)'
              }}
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full btn-playful btn-playful-orange py-3 mt-4 text-base cursor-pointer"
            style={{ borderRadius: 'var(--r-md)' }}
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        {/* Signup switcher link */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted font-bold">
            Don't have an account?{' '}
            <button 
              onClick={onSwitchToSignup}
              className="text-orange-600 dark:text-orange-400 hover:underline font-black cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}
