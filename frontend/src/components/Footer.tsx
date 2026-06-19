import { useState } from 'react'

export function Footer() {
  const year = new Date().getFullYear()

  // Form states
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [childrenAge, setChildrenAge] = useState('')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) {
      setStatus('error')
      setMessage('Name and Email are required.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, city, childrenAge }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Subscription failed.')
      }

      setStatus('success')
      setMessage(data.message)
      // Reset form
      setEmail('')
      setName('')
      setCity('')
      setChildrenAge('')
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <footer 
      className="pt-16 pb-8 px-4 md:px-12 border-t-3 border-slate-900 bg-white"
      style={{ 
        backgroundColor: 'var(--clr-white)',
        borderColor: 'var(--clr-border)'
      }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-black select-none">
            kid<span style={{ color: 'var(--clr-brand)' }}>rove</span>
          </h3>
          <p className="text-sm font-semibold text-slate-600 leading-relaxed" style={{ color: 'var(--clr-muted)' }}>
            Discover and book the best activities for your kids in the UAE.
          </p>
          
          {/* Social Icons */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {[
              {
                name: 'Facebook',
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h3v-9h2.72l.42-3H12V6c0-.88.72-1 1-1h1V2h-3C9.3 2 9 3.56 9 5.5V8z" />
                  </svg>
                ),
                link: '#'
              },
              {
                name: 'Twitter',
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.95 4.57a10 10 0 01-2.82.78 4.96 4.96 0 002.16-2.72c-.95.55-2 .95-3.12 1.18a4.92 4.92 0 00-8.38 4.48A14 14 0 011.64 3.16 4.9 4.9 0 003.16 9.7a4.9 4.9 0 01-2.22-.61v.06a4.92 4.92 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.92 4.92 0 004.6 3.42A9.9 9.9 0 010 19.54a13.9 13.9 0 007.55 2.21c9.05 0 14-7.5 14-14v-.64a10 10 0 002.4-2.54l-.05.02z" />
                  </svg>
                ),
                link: '#'
              },
              {
                name: 'Instagram',
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.42a4.9 4.9 0 011.8 1.18 4.9 4.9 0 011.18 1.8c.17.43.37 1.05.42 2.22.06 1.27.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22a4.9 4.9 0 01-1.18 1.8 4.9 4.9 0 01-1.8 1.18c-.43.17-1.05.37-2.22.42-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.42a4.9 4.9 0 01-1.18-1.8 4.9 4.9 0 01-1.8-1.18c-.17-.43-.37-1.05-.42-2.22C2.18 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.22a4.9 4.9 0 011.18-1.8 4.9 4.9 0 011.8-1.18c.43-.17 1.05-.37 2.22-.42 1.27-.06 1.64-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.92.56a7.07 7.07 0 00-2.55 1.66A7.07 7.07 0 00.9 4.85C.6 5.62.4 6.5.34 7.77.28 9.05.28 9.46.28 12.72s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.92a7.07 7.07 0 001.66 2.55 7.07 7.07 0 002.55 1.66c.77.3 1.64.5 2.92.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.92-.56a7.07 7.07 0 002.55-1.66 7.07 7.07 0 001.66-2.55c.3-.77.5-1.64.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.92a7.07 7.07 0 00-1.66-2.55 7.07 7.07 0 00-2.55-1.66c-.77-.3-1.64-.5-2.92-.56C17.15.01 16.74 0 13.48 0H12v.16z" />
                    <path d="M12 5.83a6.17 6.17 0 100 12.34 6.17 6.17 0 000-12.34zm0 10.18a4 4 0 110-8 4 4 0 010 8z" />
                    <circle cx="18.4" cy="5.6" r="1.4" />
                  </svg>
                ),
                link: '#'
              },
              {
                name: 'YouTube',
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.5 6.25a3 3 0 00-2.1-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.55A3 3 0 00.5 6.25 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.75 3 3 0 002.1 2.1c1.85.55 9.4.55 9.4.55s7.55 0 9.4-.55a3 3 0 002.1-2.1 31.4 31.4 0 00.5-5.75 31.4 31.4 0 00-.5-5.75zM9.54 15.56V8.44L15.82 12l-6.28 3.56z" />
                  </svg>
                ),
                link: '#'
              },
              {
                name: 'LinkedIn',
                icon: (
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.27 20h-3.38v-10.86h3.38v10.86zm-1.69-12.37c-1.08 0-1.96-.88-1.96-1.97s.88-1.97 1.96-1.97 1.96.88 1.96 1.97-.88 1.97-1.96 1.97zm13.96 12.37h-3.38v-5.38c0-1.28-.03-2.93-1.79-2.93-1.79 0-2.06 1.4-2.06 2.84v5.47h-3.38v-10.86h3.24v1.48h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17v5.96z" />
                  </svg>
                ),
                link: '#'
              }
            ].map((social) => (
              <a
                key={social.name}
                href={social.link}
                aria-label={social.name}
                className="w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center transition-all hover:scale-115 cursor-pointer text-white"
                style={{ 
                  backgroundColor: '#e28b12',
                  boxShadow: 'var(--shadow-brutal-sm)'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links & Internal Groups */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-wider text-slate-800" style={{ color: 'var(--clr-ink)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600" style={{ color: 'var(--clr-muted)' }}>
              <li><a href="#" className="hover:text-orange-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Blog</a></li>
              <li><a href="#play" className="hover:text-orange-600 transition-colors">Contact Us</a></li>
              <li><a href="#faq" className="hover:text-orange-600 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Partner with Us</a></li>
            </ul>

            <h4 className="font-black text-sm uppercase tracking-wider text-slate-800 pt-2" style={{ color: 'var(--clr-ink)' }}>
              Programs
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600" style={{ color: 'var(--clr-muted)' }}>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Student Program</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Partnerships</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-wider text-slate-800" style={{ color: 'var(--clr-ink)' }}>
              Teach
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600" style={{ color: 'var(--clr-muted)' }}>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Teach as Organization</a></li>
              <li><a href="#" className="hover:text-orange-600 transition-colors">Teach as Individual</a></li>
            </ul>
          </div>
        </div>

        {/* Column 3: Categories */}
        <div className="space-y-4">
          <h4 className="font-black text-sm uppercase tracking-wider text-slate-800" style={{ color: 'var(--clr-ink)' }}>
            Categories
          </h4>
          <ul className="space-y-2 text-xs font-bold text-slate-600" style={{ color: 'var(--clr-muted)' }}>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Afterschool Activities</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Arts and Crafts</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Baby & Toddler</a></li>
            <li><a href="#" className="hover:text-orange-600 transition-colors">Birthday Deals</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Signup Form */}
        <div className="space-y-4">
          <h4 className="font-black text-sm uppercase tracking-wider text-slate-800" style={{ color: 'var(--clr-ink)' }}>
            Newsletter
          </h4>
          <p className="text-xs font-bold text-slate-600 leading-relaxed" style={{ color: 'var(--clr-muted)' }}>
            Subscribe to our newsletter for updates on new activities and promotions.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2.5">
            {/* Email Field with Icon */}
            <div className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-lg border-2 border-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
                style={{ color: 'var(--clr-ink)' }}
              />
              <span className="absolute left-3 top-2.5 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </div>

            {/* Name Field */}
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border-2 border-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
              style={{ color: 'var(--clr-ink)' }}
            />

            {/* City Field (Optional) */}
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City (optional)"
              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border-2 border-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
              style={{ color: 'var(--clr-ink)' }}
            />

            {/* Age of Children Field (Optional) */}
            <input 
              type="text" 
              value={childrenAge}
              onChange={(e) => setChildrenAge(e.target.value)}
              placeholder="Age of children (optional)"
              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border-2 border-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white"
              style={{ color: 'var(--clr-ink)' }}
            />

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-2.5 rounded-lg border-2 border-slate-900 font-black text-xs text-white uppercase tracking-wider cursor-pointer transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
              style={{ 
                backgroundColor: '#f2a1b5', 
                color: '#fff',
                boxShadow: 'var(--shadow-brutal-sm)'
              }}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {/* Feedback/Response Message */}
          {message && (
            <p 
              className={`text-[10px] font-black p-2 border-2 border-slate-900 rounded-md ${
                status === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-[10px] text-slate-400 font-bold leading-normal">
            By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
          </p>
        </div>

      </div>

      {/* Footer Bottom Divider Line */}
      <div className="max-w-7xl mx-auto border-t-2 border-slate-900 dark:border-slate-800 my-8"></div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-black text-slate-500" style={{ color: 'var(--clr-subtle)' }}>
        <p>
          © {year} Kidrove. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
