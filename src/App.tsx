import { useEffect, useState } from 'react'
import HeroScene from './components/3d/HeroScene'
import CustomCursor from './components/CustomCursor'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Loading Screen */}
      {loading && (
        <div className={`loading-screen ${!loading ? 'fade-out' : ''}`}>
          <h2 style={{ fontWeight: 300, letterSpacing: '0.5em' }}>JAFFSTUDIO</h2>
        </div>
      )}

      {/* Custom 3D Cursor */}
      <CustomCursor />

      {/* Fixed 3D WebGL Background */}
      <HeroScene />

      {/* Scrollable Content */}
      <div className="content-overlay">
        <Hero />
        <Services />
        <Portfolio />
      </div>
    </>
  )
}

export default App
