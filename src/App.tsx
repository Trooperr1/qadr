import { useEffect, useState } from 'react'
import HeroScene from './components/3d/HeroScene'
import CustomCursor from './components/CustomCursor'
import Navigation from './components/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import ProductShowcaseSection from './components/sections/ProductShowcaseSection'
import Testimonials from './components/sections/Testimonials'
import Pricing from './components/sections/Pricing'
import Contact from './components/sections/Contact'
import WhatsAppButton from './components/WhatsAppButton'
import ChatBot from './components/ChatBot'
import SpatialAudio from './components/SpatialAudio'
import Footer from './components/Footer'
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

      {/* Navigation */}
      <Navigation />

      {/* Fixed 3D WebGL Background */}
      <HeroScene />

      {/* Scrollable Content */}
      <div className="content-overlay">
        <Hero />
        <About />
        <Services />
        <ProductShowcaseSection />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <Contact />
        <Footer />
      </div>

      {/* Floating Widgets */}
      <WhatsAppButton />
      <ChatBot />
      <SpatialAudio />
    </>
  )
}

export default App
