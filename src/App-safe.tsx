import { useState, useEffect } from 'react'
import './App.css'

// Safe version without 3D components
import Navigation from './components/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Testimonials from './components/sections/Testimonials'
import Pricing from './components/sections/Pricing'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ChatBot from './components/ChatBot'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}>
        <h2 style={{ fontWeight: 300, letterSpacing: '0.5em' }}>JAFFSTUDIO</h2>
      </div>
    )
  }

  return (
    <div style={{ background: '#000', color: '#fff' }}>
      <Navigation />

      <div className="content-overlay">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <Contact />
        <Footer />
      </div>

      <WhatsAppButton />
      <ChatBot />
    </div>
  )
}

export default App
