import { useState, useEffect } from 'react'
import './App.css'
import { FaqSection } from './components/FaqSection'
import { HeroSection } from './components/HeroSection'
import { RoboMaze } from './components/RoboMaze'
import { LearningOutcomesSection } from './components/LearningOutcomesSection'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { RegistrationSection } from './components/RegistrationSection'
import { WorkshopDetailsSection } from './components/WorkshopDetailsSection'
import { MysteryBoxPopup } from './components/MysteryBoxPopup'
import { ImpactSection } from './components/ImpactSection'
import { ReviewsSection } from './components/ReviewsSection'
import { LoginView } from './components/LoginView'
import { SignupView } from './components/SignupView'
import { workshopFaqs, workshopInfo, workshopOutcomes } from './data/workshop'
import { useScrollReveal } from './hooks/useScrollReveal'

type User = {
  username: string
  email: string
}

function App() {
  useScrollReveal()
  const [isDark, setIsDark] = useState(false)
  const [discountCode, setDiscountCode] = useState('')

  // Routing and Auth states
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup'>('home')
  const [user, setUser] = useState<User | null>(null)
  const [loadingSession, setLoadingSession] = useState(true)

  // Manage body class for dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  // Verify session token on startup
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoadingSession(false)
        return
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()
        if (res.ok && data.success) {
          setUser(data.user)
        } else {
          // Token expired or invalid
          localStorage.removeItem('token')
        }
      } catch (err) {
        console.error('Session verification error:', err)
      } finally {
        setLoadingSession(false)
      }
    }

    verifySession()
  }, [])

  function toggleTheme() {
    setIsDark((prev) => !prev)
  }

  // Handle successful login or signup
  const handleAuthSuccess = (token: string, userData: User) => {
    localStorage.setItem('token', token)
    setUser(userData)
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle logout
  const handleLogout = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } catch (err) {
        console.error('Logout request error:', err)
      }
    }
    localStorage.removeItem('token')
    setUser(null)
    setCurrentView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loadingSession) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center font-bold text-lg"
        style={{ backgroundColor: 'var(--clr-surface)', color: 'var(--clr-ink)' }}
      >
        <div className="text-center">
          <p className="animate-bounce mb-2">🤖 Loading Kidrove...</p>
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundColor: 'var(--clr-surface)',
          color: 'var(--clr-ink)',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        {/* Navigation Bar */}
        <Navbar 
          isDark={isDark} 
          onToggleTheme={toggleTheme} 
          user={user}
          onLogout={handleLogout}
          setView={setCurrentView}
          currentView={currentView}
        />

        {/* Dynamic Page Views */}
        {currentView === 'login' ? (
          <LoginView 
            onSuccess={handleAuthSuccess}
            onSwitchToSignup={() => setCurrentView('signup')}
            onGoHome={() => setCurrentView('home')}
          />
        ) : currentView === 'signup' ? (
          <SignupView 
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setCurrentView('login')}
            onGoHome={() => setCurrentView('home')}
          />
        ) : (
          <>
            <main className="flex-grow">
              <HeroSection workshop={workshopInfo} />
              
              <div id="play">
                <RoboMaze />
              </div>
              
              <div id="details">
                <WorkshopDetailsSection workshop={workshopInfo} />
              </div>
              
              <div id="outcomes">
                <LearningOutcomesSection outcomes={workshopOutcomes} />
              </div>

              {/* Our Impact Stats Section */}
              <ImpactSection />
              
              <div id="faq">
                <FaqSection faqs={workshopFaqs} />
              </div>

              {/* Customer Testimonials Carousel Section */}
              <ReviewsSection />

              <div id="registration">
                <RegistrationSection 
                  workshop={workshopInfo} 
                  discountCode={discountCode} 
                  prefillName={user?.username || ''}
                  prefillEmail={user?.email || ''}
                />
              </div>
            </main>

            {/* Sticky/Modal and Footer only shown on homepage */}
            <Footer />
            <MysteryBoxPopup onClaim={setDiscountCode} />
          </>
        )}
      </div>
    </div>
  )
}

export default App
