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
import { workshopFaqs, workshopInfo, workshopOutcomes } from './data/workshop'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  useScrollReveal()
  const [isDark, setIsDark] = useState(false)
  const [discountCode, setDiscountCode] = useState('')

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  function toggleTheme() {
    setIsDark((prev) => !prev)
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div
        className="min-h-screen"
        style={{
          backgroundColor: 'var(--clr-surface)',
          color: 'var(--clr-ink)',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
        <main>
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
          <div id="faq">
            <FaqSection faqs={workshopFaqs} />
          </div>
          <RegistrationSection workshop={workshopInfo} discountCode={discountCode} />
        </main>
        <Footer />
        <MysteryBoxPopup onClaim={setDiscountCode} />
      </div>
    </div>
  )
}

export default App
