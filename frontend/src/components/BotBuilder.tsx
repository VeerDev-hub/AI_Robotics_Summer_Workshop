import { useState } from 'react'
import { SectionHeading } from './SectionHeading'

type RobotModel = 'rex' | 'astro' | 'rover'
type SensorModel = 'camera' | 'laser' | 'sonar'
type ActionModel = 'dance' | 'music' | 'foam'

export function BotBuilder() {
  const [model, setModel] = useState<RobotModel>('rex')
  const [sensor, setSensor] = useState<SensorModel>('camera')
  const [action, setAction] = useState<ActionModel>('dance')
  const [isRunning, setIsRunning] = useState(false)
  const [runLogs, setRunLogs] = useState<string[]>([])
  const [runSuccess, setRunSuccess] = useState(false)

  const robots = {
    rex: {
      name: 'Robo-Rex',
      desc: 'Playful Dino-Bot',
      color: 'var(--clr-green)',
      accent: '#388e3c',
      svg: (
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Head & Neck */}
          <path d="M 40 25 L 75 25 A 10 10 0 0 1 85 35 L 85 45 A 10 10 0 0 1 75 55 L 60 55 L 60 70 L 40 70 Z" fill="var(--clr-green)" stroke="var(--clr-border)" strokeWidth="3" />
          {/* Eye */}
          <circle cx="70" cy="35" r="5" fill="var(--clr-white)" stroke="var(--clr-border)" strokeWidth="2" />
          <circle cx="72" cy="35" r="2" fill="var(--clr-ink)" />
          {/* Tail */}
          <path d="M 40 50 Q 20 50 15 35 Q 20 60 40 65" fill="var(--clr-green)" stroke="var(--clr-border)" strokeWidth="3" />
          {/* Body */}
          <rect x="35" y="45" width="25" height="25" rx="8" fill="var(--clr-green)" stroke="var(--clr-border)" strokeWidth="3" />
          {/* Legs */}
          <rect x="40" y="70" width="6" height="15" rx="3" fill="#388e3c" stroke="var(--clr-border)" strokeWidth="2" />
          <rect x="52" y="70" width="6" height="15" rx="3" fill="#388e3c" stroke="var(--clr-border)" strokeWidth="2" />
        </svg>
      )
    },
    astro: {
      name: 'Astro-Bot',
      desc: 'Rocket Hover Droid',
      color: 'var(--clr-sky)',
      accent: '#0288d1',
      svg: (
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Antenna */}
          <line x1="50" y1="20" x2="50" y2="10" stroke="var(--clr-border)" strokeWidth="3" />
          <circle cx="50" cy="10" r="4" fill="var(--clr-pink)" stroke="var(--clr-border)" strokeWidth="2" />
          {/* Head */}
          <rect x="35" y="20" width="30" height="22" rx="10" fill="var(--clr-sky)" stroke="var(--clr-border)" strokeWidth="3" />
          {/* Visor */}
          <rect x="40" y="26" width="20" height="8" rx="4" fill="var(--clr-ink)" />
          <circle cx="45" cy="30" r="2" fill="var(--clr-yellow)" />
          <circle cx="55" cy="30" r="2" fill="var(--clr-yellow)" />
          {/* Body */}
          <path d="M 30 45 L 70 45 L 65 75 L 35 75 Z" fill="var(--clr-sky)" stroke="var(--clr-border)" strokeWidth="3" />
          {/* Jet Fire */}
          <path d="M 42 75 L 50 90 L 58 75 Z" fill="var(--clr-brand)" stroke="var(--clr-border)" strokeWidth="2" />
          {/* Arms */}
          <path d="M 30 50 Q 15 55 20 65" fill="none" stroke="var(--clr-border)" strokeWidth="3" strokeLinecap="round" />
          <path d="M 70 50 Q 85 55 80 65" fill="none" stroke="var(--clr-border)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    rover: {
      name: 'Rover-Spark',
      desc: 'All-Terrain Explorer',
      color: 'var(--clr-yellow)',
      accent: '#f57c00',
      svg: (
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          {/* Solar Panel */}
          <rect x="30" y="20" width="40" height="8" rx="2" fill="var(--clr-purple)" stroke="var(--clr-border)" strokeWidth="2" />
          <line x1="50" y1="28" x2="50" y2="40" stroke="var(--clr-border)" strokeWidth="2" />
          {/* Main Chassis */}
          <rect x="25" y="40" width="50" height="25" rx="6" fill="var(--clr-yellow)" stroke="var(--clr-border)" strokeWidth="3" />
          {/* Camera Mast */}
          <circle cx="60" cy="35" r="4" fill="var(--clr-brand)" stroke="var(--clr-border)" strokeWidth="2" />
          {/* Wheels */}
          <circle cx="32" cy="70" r="10" fill="var(--clr-ink)" stroke="var(--clr-border)" strokeWidth="3" />
          <circle cx="32" cy="70" r="4" fill="var(--clr-white)" />
          <circle cx="50" cy="70" r="10" fill="var(--clr-ink)" stroke="var(--clr-border)" strokeWidth="3" />
          <circle cx="50" cy="70" r="4" fill="var(--clr-white)" />
          <circle cx="68" cy="70" r="10" fill="var(--clr-ink)" stroke="var(--clr-border)" strokeWidth="3" />
          <circle cx="68" cy="70" r="4" fill="var(--clr-white)" />
        </svg>
      )
    }
  }

  const sensors = {
    camera: { name: 'Giggle Camera', detail: 'Finds smiling faces' },
    laser: { name: 'Tickle Laser', detail: 'Feels nearby hands' },
    sonar: { name: 'Super Sonar', detail: 'Hears sound signals' }
  }

  const actions = {
    dance: { name: 'Do a happy spin dance!', detail: 'Rotates bot with custom speed' },
    music: { name: 'Wiggle arms & play tunes!', detail: 'Plays synthesised melodies' },
    foam: { name: 'Shoot soft foam darts!', detail: 'Triggers launcher mechanism' }
  }

  function handleCompile() {
    setIsRunning(true)
    setRunSuccess(false)
    setRunLogs([])

    const logs = [
      '🔌 Initializing Kidrove Core...',
      `🤖 Loading ${robots[model].name} firmware...`,
      `📡 Calibrating ${sensors[sensor].name}...`,
      `🔧 Linking event trigger: [IF Input Detected THEN ${actions[action].name}]`,
      '🔋 Giggle motor test: OK',
      '🚀 Code Compiled! Uploading logic bytes...',
      '🎮 Starting simulation...'
    ]

    logs.forEach((log, index) => {
      setTimeout(() => {
        setRunLogs((prev) => [...prev, log])
        if (index === logs.length - 1) {
          setIsRunning(false)
          setRunSuccess(true)
        }
      }, (index + 1) * 350)
    })
  }

  return (
    <section
      className="section-padding-playful"
      style={{
        background: 'var(--clr-cream)',
        borderTop: '4px solid var(--clr-border)',
        position: 'relative'
      }}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="Interactive Lab"
          title="Try Code-Building Your Robot!"
          description="Drag-and-drop is fun, but custom code builds are even better. Choose a chassis, link a sensor, set your logic rule, and run your script in real time!"
          align="center"
        />

        <div
          className="bot-builder-grid"
          style={{
            display: 'grid',
            gap: '2rem',
            marginTop: '3.5rem',
          }}
        >
          {/* Configurator Column */}
          <div className="playful-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--clr-brand)' }}>1.</span> Design Your Bot
            </h3>

            {/* Step 1: Robot Chassis */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--clr-muted)', marginBottom: '0.75rem' }}>
                SELECT ROBOT MODEL:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                {(Object.keys(robots) as RobotModel[]).map((rKey) => (
                  <button
                    key={rKey}
                    onClick={() => { setModel(rKey); setRunSuccess(false); }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--r-sm)',
                      border: '3px solid var(--clr-border)',
                      background: model === rKey ? robots[rKey].color : 'var(--clr-white)',
                      color: model === rKey ? (rKey === 'rover' ? '#1e2530' : '#ffffff') : 'var(--clr-ink)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transform: model === rKey ? 'translateY(-2px)' : 'none',
                      boxShadow: model === rKey ? '3px 3px 0 0 var(--clr-ink)' : 'none',
                      transition: 'all 0.2s var(--ease-spring)'
                    }}
                  >
                    <div style={{ fontSize: '1.0625rem' }}>{robots[rKey].name}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.8 }}>{robots[rKey].desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Sensors */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--clr-muted)', marginBottom: '0.75rem' }}>
                PLUG IN A SENSOR:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                {(Object.keys(sensors) as SensorModel[]).map((sKey) => (
                  <button
                    key={sKey}
                    onClick={() => { setSensor(sKey); setRunSuccess(false); }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--r-sm)',
                      border: '3px solid var(--clr-border)',
                      background: sensor === sKey ? 'var(--clr-yellow)' : 'var(--clr-white)',
                      color: sensor === sKey ? '#1e2530' : 'var(--clr-ink)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transform: sensor === sKey ? 'translateY(-2px)' : 'none',
                      boxShadow: sensor === sKey ? '3px 3px 0 0 var(--clr-ink)' : 'none',
                      transition: 'all 0.2s var(--ease-spring)'
                    }}
                  >
                    <div style={{ fontSize: '1.0625rem' }}>{sensors[sKey].name}</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.8 }}>{sensors[sKey].detail}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Actions */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--clr-muted)', marginBottom: '0.75rem' }}>
                CHOOSE ACTION WHEN TRIGGERED:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                {(Object.keys(actions) as ActionModel[]).map((aKey) => (
                  <button
                    key={aKey}
                    onClick={() => { setAction(aKey); setRunSuccess(false); }}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--r-sm)',
                      border: '3px solid var(--clr-border)',
                      background: action === aKey ? 'var(--clr-pink-light)' : 'var(--clr-white)',
                      color: 'var(--clr-ink)',
                      borderColor: action === aKey ? 'var(--clr-pink)' : 'var(--clr-border)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transform: action === aKey ? 'translateY(-2px)' : 'none',
                      boxShadow: action === aKey ? '3px 3px 0 0 var(--clr-ink)' : 'none',
                      transition: 'all 0.2s var(--ease-spring)'
                    }}
                  >
                    <div style={{ fontSize: '1.0625rem', color: action === aKey ? 'var(--clr-pink)' : 'var(--clr-ink)' }}>
                      {actions[aKey].name.replace('!', '')}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 500, opacity: 0.8 }}>{actions[aKey].detail}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleCompile}
              disabled={isRunning}
              className="btn-playful btn-playful-orange"
              style={{ width: '100%', padding: '1rem' }}
            >
              {isRunning ? 'RUNNING SCRIPT...' : 'COMPILE & RUN CODE 🚀'}
            </button>
          </div>

          {/* Simulator Screen Column */}
          <div
            className="playful-card"
            style={{
              background: '#151d2a',
              color: '#4af626',
              fontFamily: 'monospace',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px',
              borderWidth: '4px'
            }}
          >
            {/* Terminal logs */}
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              <div style={{ color: '#888', marginBottom: '0.5rem' }}>
                🤖 KIDROVE SIMULATION TERMINAL v1.4
              </div>
              {runLogs.map((log, index) => (
                <div key={index} style={{ marginBottom: '0.25rem', lineHeight: '1.4' }}>
                  {log}
                </div>
              ))}
              {isRunning && (
                <span className="blinking-cursor" style={{ marginLeft: '4px' }}>|</span>
              )}
            </div>

            {/* Graphic simulation area */}
            <div
              style={{
                background: '#0a0f1d',
                borderRadius: 'var(--r-sm)',
                height: '180px',
                border: '2px solid #243350',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Grid backdrop */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: 'radial-gradient(#ffffff0a 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              />

              {/* Simulation animation */}
              {runSuccess ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    animation: action === 'dance'
                      ? 'spin-bot 2s ease-in-out infinite'
                      : action === 'music'
                      ? 'wiggle-bot 0.6s ease-in-out infinite alternate'
                      : 'bounce-bot 0.8s ease-in-out infinite'
                  }}
                >
                  {robots[model].svg}
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      background: 'rgba(74, 246, 38, 0.15)',
                      border: '1px solid #4af626',
                      color: '#4af626',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      fontFamily: 'Fredoka, sans-serif'
                    }}
                  >
                    Logic Triggered!
                  </div>
                </div>
              ) : (
                <div style={{ color: '#556c96', fontSize: '0.9375rem', textAlign: 'center' }}>
                  {isRunning ? '📡 Simulating...' : 'Ready. Configure and click Compile!'}
                </div>
              )}
            </div>

            {runSuccess && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: 'rgba(74,246,38,0.1)',
                  borderRadius: 'var(--r-sm)',
                  border: '1px solid rgba(74,246,38,0.3)',
                  textAlign: 'center',
                  fontFamily: 'Quicksand, sans-serif',
                  fontWeight: 700,
                  color: '#ffffff'
                }}
              >
                🎉 Mission Complete! You just coded a robot!{' '}
                <a
                  href="#registration"
                  style={{
                    color: 'var(--clr-yellow)',
                    textDecoration: 'underline',
                    marginLeft: '4px'
                  }}
                >
                  Enroll now
                </a>{' '}
                to do this on real hardware!
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .blinking-cursor {
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes spin-bot {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes wiggle-bot {
          0% { transform: translateX(-8px) rotate(-4deg); }
          100% { transform: translateX(8px) rotate(4deg); }
        }
        @keyframes bounce-bot {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(0.95); }
        }
        .bot-builder-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .bot-builder-grid {
            grid-template-columns: 1.15fr 0.85fr;
          }
        }
      `}</style>
    </section>
  )
}
