import { useState, useRef } from 'react'
import { SectionHeading } from './SectionHeading'

type Direction = 'up' | 'down' | 'left' | 'right'

// Coordinates: [x, y] where 0,0 is top-left, 4,4 is bottom-right
type Position = [number, number]

const GRID_SIZE = 5
const START_POS: Position = [0, 4]
const TARGET_POS: Position = [4, 0]
const OBSTACLES: Position[] = [
  [1, 2],
  [2, 2],
  [3, 2],
  [3, 1],
]

// Synthesise audio beeps for kids game
function playSound(type: 'move' | 'crash' | 'win' | 'click') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    if (type === 'click') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(400, ctx.currentTime)
      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)
      osc.start()
      osc.stop(ctx.currentTime + 0.1)
    } else if (type === 'move') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(300, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15)
      gain.gain.setValueAtTime(0.1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
      osc.start()
      osc.stop(ctx.currentTime + 0.15)
    } else if (type === 'crash') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, ctx.currentTime)
      osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.4)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4)
      osc.start()
      osc.stop(ctx.currentTime + 0.4)
    } else if (type === 'win') {
      // Play a happy arpeggio
      const now = ctx.currentTime
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.1, now)
      
      osc.frequency.setValueAtTime(523.25, now) // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1) // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2) // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3) // C6
      
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6)
      osc.start()
      osc.stop(now + 0.6)
    }
  } catch (e) {
    // Audio context failed or blocked by autoplay
  }
}

export function RoboMaze() {
  const [commands, setCommands] = useState<Direction[]>([])
  const [botPos, setBotPos] = useState<Position>(START_POS)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeCommandIndex, setActiveCommandIndex] = useState<number | null>(null)
  const [gameState, setGameState] = useState<'idle' | 'running' | 'success' | 'crash' | 'out-of-bounds'>('idle')
  const [crashReason, setCrashReason] = useState('')

  // Keep a ref to reset without clearing queue
  const currentPosRef = useRef<Position>(START_POS)

  function addCommand(dir: Direction) {
    if (commands.length >= 10 || isPlaying) return
    playSound('click')
    setCommands((prev) => [...prev, dir])
  }

  function removeLastCommand() {
    if (isPlaying) return
    playSound('click')
    setCommands((prev) => prev.slice(0, -1))
  }

  function clearCommands() {
    if (isPlaying) return
    playSound('click')
    setCommands([])
    resetBot()
  }

  function resetBot() {
    setBotPos(START_POS)
    currentPosRef.current = START_POS
    setGameState('idle')
    setActiveCommandIndex(null)
    setIsPlaying(false)
  }

  async function executeProgram() {
    if (commands.length === 0 || isPlaying) return
    setIsPlaying(true)
    setGameState('running')
    setBotPos(START_POS)
    currentPosRef.current = START_POS

    for (let i = 0; i < commands.length; i++) {
      setActiveCommandIndex(i)
      const cmd = commands[i]
      
      // Calculate next position
      let [x, y] = currentPosRef.current
      if (cmd === 'up') y -= 1
      if (cmd === 'down') y += 1
      if (cmd === 'left') x -= 1
      if (cmd === 'right') x += 1

      // Delay between steps to animate
      await new Promise((resolve) => setTimeout(resolve, 600))

      // Check boundary limits
      if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
        playSound('crash')
        setBotPos([x, y]) // visual boundary overflow
        setGameState('out-of-bounds')
        setCrashReason('Oops! Robo-Rex fell off the space grid!')
        setIsPlaying(false)
        return
      }

      // Check obstacles
      const hitObstacle = OBSTACLES.some(([ox, oy]) => ox === x && oy === y)
      if (hitObstacle) {
        playSound('crash')
        setBotPos([x, y])
        setGameState('crash')
        setCrashReason('Ouch! Robo-Rex crashed into a space meteor!')
        setIsPlaying(false)
        return
      }

      // Move bot
      playSound('move')
      setBotPos([x, y])
      currentPosRef.current = [x, y]

      // Check target reach
      if (x === TARGET_POS[0] && y === TARGET_POS[1]) {
        await new Promise((resolve) => setTimeout(resolve, 300))
        playSound('win')
        setGameState('success')
        setIsPlaying(false)
        return
      }
    }

    // Finished execution but didn't reach target
    setGameState('crash')
    setCrashReason("Rex ran out of commands before reaching the battery! Try coding a longer path.")
    setIsPlaying(false)
  }

  // Helper to check if a cell contains an obstacle
  function isObstacle(x: number, y: number) {
    return OBSTACLES.some(([ox, oy]) => ox === x && oy === y)
  }

  return (
    <section
      className="section-padding-playful"
      style={{
        background: 'var(--clr-cream)',
        borderBottom: '4px solid var(--clr-border)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative stars */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', opacity: 0.3 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--clr-yellow)">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', opacity: 0.3 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--clr-purple)">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div className="section-container" style={{ position: 'relative', zIndex: 2 }}>
        <SectionHeading
          eyebrow="Interactive Game"
          title="Logic Maze: Help Rex Recharge!"
          description="Robots only do exactly what they are programmed to do. Can you code a logic path to guide Robo-Rex to the star battery without crashing into the space meteors?"
          align="center"
        />

        <div
          className="game-layout-grid"
          style={{
            display: 'grid',
            gap: '2.5rem',
            marginTop: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Controls Column */}
          <div className="playful-card" style={{ padding: '2rem', borderWidth: '4px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--clr-brand)' }}>1.</span> Program Panel
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--clr-muted)', fontWeight: 600, marginBottom: '1.5rem' }}>
              Add directions to create your code script. Max 10 commands.
            </p>

            {/* Program blocks buttons */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}
            >
              {[
                { dir: 'up' as Direction, label: 'Move Up', color: 'var(--clr-sky)', icon: '⬆️' },
                { dir: 'down' as Direction, label: 'Move Down', color: 'var(--clr-purple)', icon: '⬇️' },
                { dir: 'left' as Direction, label: 'Move Left', color: 'var(--clr-yellow)', icon: '⬅️' },
                { dir: 'right' as Direction, label: 'Move Right', color: 'var(--clr-green)', icon: '➡️' },
              ].map((btn) => (
                <button
                  key={btn.dir}
                  onClick={() => addCommand(btn.dir)}
                  disabled={commands.length >= 10 || isPlaying}
                  className="btn-playful"
                  style={{
                    background: btn.color,
                    color: btn.dir === 'left' ? '#1e2530' : '#ffffff',
                    padding: '0.75rem',
                    fontSize: '1rem',
                    boxShadow: '3px 3px 0 0 var(--clr-border)',
                  }}
                >
                  <span style={{ fontSize: '1.125rem', marginRight: '0.25rem' }}>
                    {btn.dir === 'up' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" style={{ display: 'inline' }}>
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                    )}
                    {btn.dir === 'down' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" style={{ display: 'inline' }}>
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    )}
                    {btn.dir === 'left' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" style={{ display: 'inline' }}>
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                    )}
                    {btn.dir === 'right' && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" style={{ display: 'inline' }}>
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </span>
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Instruction Queue display */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--clr-muted)', marginBottom: '0.5rem' }}>
                YOUR LOGIC CHAIN:
              </p>
              <div
                style={{
                  minHeight: '4.5rem',
                  border: '3px dashed var(--clr-border)',
                  borderRadius: 'var(--r-sm)',
                  background: 'var(--clr-surface)',
                  padding: '0.75rem',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {commands.length === 0 ? (
                  <span style={{ fontSize: '0.875rem', color: 'var(--clr-subtle)', fontWeight: 600 }}>
                    Click arrows above to build code script...
                  </span>
                ) : (
                  commands.map((cmd, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '0.35rem 0.65rem',
                        borderRadius: '8px',
                        border: '2px solid var(--clr-border)',
                        background: idx === activeCommandIndex ? 'var(--clr-yellow)' : 'var(--clr-white)',
                        color: idx === activeCommandIndex ? '#1e2530' : 'inherit',
                        fontWeight: 700,
                        fontSize: '0.8125rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        transform: idx === activeCommandIndex ? 'scale(1.1)' : 'none',
                        boxShadow: '1.5px 1.5px 0 0 var(--clr-border)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {cmd.toUpperCase()}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Program Action bar */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={executeProgram}
                disabled={commands.length === 0 || isPlaying}
                className="btn-playful btn-playful-orange"
                style={{ flex: 2, padding: '0.875rem' }}
              >
                {isPlaying ? 'EXECUTING...' : 'RUN PROGRAM 🚀'}
              </button>
              <button
                onClick={removeLastCommand}
                disabled={commands.length === 0 || isPlaying}
                className="btn-playful btn-playful-white"
                style={{ flex: 0.5, padding: '0.875rem' }}
                title="Undo last command"
              >
                ⌫
              </button>
              <button
                onClick={clearCommands}
                disabled={isPlaying}
                className="btn-playful btn-playful-white"
                style={{ flex: 0.5, padding: '0.875rem' }}
                title="Clear program"
              >
                🗑️
              </button>
            </div>
          </div>

          {/* Grid visual screen */}
          <div className="playful-card" style={{ padding: '2rem', borderWidth: '4px', background: '#0a0f1d' }}>
            {/* Grid Frame */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gridTemplateRows: 'repeat(5, 1fr)',
                gap: '4px',
                background: '#151d2a',
                padding: '8px',
                borderRadius: 'var(--r-md)',
                border: '3px solid var(--clr-border)',
                aspectRatio: '1',
                width: '100%',
                maxHeight: '380px',
                position: 'relative'
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                const x = idx % GRID_SIZE
                const y = Math.floor(idx / GRID_SIZE)
                const isTarget = TARGET_POS[0] === x && TARGET_POS[1] === y
                const hasObstacle = isObstacle(x, y)
                const hasBot = botPos[0] === x && botPos[1] === y

                return (
                  <div
                    key={idx}
                    style={{
                      background: isTarget
                        ? 'rgba(255,202,40,0.12)'
                        : hasObstacle
                        ? 'rgba(233,30,99,0.08)'
                        : '#0a0f1d',
                      border: '1px solid #1f2d42',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Render target battery */}
                    {isTarget && (
                      <div
                        style={{
                          animation: 'pulse-target 1.5s ease-in-out infinite alternate',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="36" height="36" fill="var(--clr-yellow)">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    )}

                    {/* Render obstacle asteroids */}
                    {hasObstacle && (
                      <div style={{ color: 'var(--clr-pink)' }}>
                        <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 2L2 22h20L12 2z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      </div>
                    )}

                    {/* Render Robo-Rex */}
                    {hasBot && (
                      <div
                        style={{
                          zIndex: 5,
                          transform: 'scale(1.15)',
                          animation: gameState === 'success'
                            ? 'success-dance 0.6s infinite alternate'
                            : gameState === 'crash' || gameState === 'out-of-bounds'
                            ? 'shake-crash 0.15s infinite'
                            : 'none'
                        }}
                      >
                        <svg viewBox="0 0 100 100" className="w-10 h-10">
                          {/* Dino Robot Draw */}
                          <path d="M 40 25 L 75 25 A 10 10 0 0 1 85 35 L 85 45 A 10 10 0 0 1 75 55 L 60 55 L 60 70 L 40 70 Z" fill="var(--clr-green)" stroke="var(--clr-border)" strokeWidth="3" />
                          <circle cx="70" cy="35" r="5" fill="var(--clr-white)" stroke="var(--clr-border)" strokeWidth="2" />
                          <circle cx="72" cy="35" r="2" fill="var(--clr-ink)" />
                          <rect x="35" y="45" width="25" height="25" rx="8" fill="var(--clr-green)" stroke="var(--clr-border)" strokeWidth="3" />
                          <circle cx="40" cy="74" r="6" fill="var(--clr-ink)" />
                          <circle cx="58" cy="74" r="6" fill="var(--clr-ink)" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Output banner report card */}
            <div style={{ marginTop: '1.25rem', minHeight: '4.5rem' }}>
              {gameState === 'idle' && (
                <div style={{ color: '#556c96', textAlign: 'center', fontSize: '0.9375rem', fontWeight: 600 }}>
                  Ready to code. Guide Rex to the yellow star!
                </div>
              )}

              {gameState === 'running' && (
                <div style={{ color: 'var(--clr-yellow)', textAlign: 'center', fontSize: '0.9375rem', fontWeight: 700 }}>
                  🚀 Running instructions step-by-step...
                </div>
              )}

              {(gameState === 'crash' || gameState === 'out-of-bounds') && (
                <div style={{ textAlign: 'center' }}>
                  <p style={{ color: '#ff4a6b', fontWeight: 800, fontSize: '1rem' }}>
                    {crashReason}
                  </p>
                  <button
                    onClick={resetBot}
                    className="btn-playful btn-playful-white"
                    style={{ marginTop: '0.5rem', padding: '0.35rem 1rem', fontSize: '0.8125rem' }}
                  >
                    Reset Bot 🔄
                  </button>
                </div>
              )}

              {gameState === 'success' && (
                <div
                  style={{
                    background: 'rgba(76,175,80,0.15)',
                    border: '2px solid var(--clr-green)',
                    borderRadius: 'var(--r-sm)',
                    padding: '0.75rem',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ color: 'var(--clr-green)', fontWeight: 800, fontSize: '1.0625rem', marginBottom: '0.35rem' }}>
                    🎉 Victory! Rex is fully recharged!
                  </p>
                  <p style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600 }}>
                    Awesome coding logic!{' '}
                    <a
                      href="#registration"
                      style={{
                        color: 'var(--clr-yellow)',
                        textDecoration: 'underline',
                        fontWeight: 800
                      }}
                    >
                      Register now
                    </a>{' '}
                    to compile code on physical robot kits!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .game-layout-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
          .game-layout-grid {
            grid-template-columns: 1.05fr 0.95fr;
          }
        }
        @keyframes pulse-target {
          0% { transform: scale(0.9); filter: drop-shadow(0 0 2px rgba(255,202,40,0.4)); }
          100% { transform: scale(1.1); filter: drop-shadow(0 0 10px rgba(255,202,40,0.8)); }
        }
        @keyframes success-dance {
          0% { transform: translateY(0) rotate(-10deg) scale(1.15); }
          100% { transform: translateY(-8px) rotate(10deg) scale(1.25); }
        }
        @keyframes shake-crash {
          0%, 100% { transform: translateX(0) scale(1.15); }
          25% { transform: translateX(-4px) scale(1.15); }
          75% { transform: translateX(4px) scale(1.15); }
        }
      `}</style>
    </section>
  )
}
