import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card3D from '../Card3D'
import './Pricing.css'

gsap.registerPlugin(ScrollTrigger)

interface ServiceOption {
  id: string
  name: string
  basePrice: number
}

const serviceOptions: ServiceOption[] = [
  { id: 'landing', name: '3D Landing Page', basePrice: 3000 },
  { id: 'showcase', name: 'Product Showcase', basePrice: 5000 },
  { id: 'fullsite', name: 'Full Website', basePrice: 10000 },
  { id: 'webapp', name: 'Web Application', basePrice: 15000 },
]

const addons = [
  { id: 'webgl', name: 'Advanced WebGL Effects', price: 2000 },
  { id: 'animations', name: 'Custom Animations', price: 1500 },
  { id: 'audio', name: 'Spatial Audio', price: 1000 },
  { id: 'chatbot', name: 'AI Chatbot', price: 2500 },
  { id: 'cms', name: 'CMS Integration', price: 3000 },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const [selectedService, setSelectedService] = useState<string>('landing')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const calculateTotal = () => {
    const service = serviceOptions.find(s => s.id === selectedService)
    const servicePrice = service?.basePrice || 0
    const addonsPrice = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find(a => a.id === addonId)
      return total + (addon?.price || 0)
    }, 0)
    return servicePrice + addonsPrice
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  useEffect(() => {
    if (!titleRef.current) return

    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
      y: 100,
      opacity: 0,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="pricing-section section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          PRICING CALCULATOR
        </h2>

        <div className="pricing-calculator">
          <Card3D>
            <div className="calculator-card">
              <h3 className="calculator-title">Select Service Type</h3>

              <div className="service-options">
                {serviceOptions.map((service) => (
                  <button
                    key={service.id}
                    className={`service-option ${selectedService === service.id ? 'active' : ''}`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <span className="service-name">{service.name}</span>
                    <span className="service-price">${service.basePrice.toLocaleString()}</span>
                  </button>
                ))}
              </div>

              <h3 className="calculator-title">Add-ons</h3>

              <div className="addon-options">
                {addons.map((addon) => (
                  <label key={addon.id} className="addon-option">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => toggleAddon(addon.id)}
                    />
                    <span className="addon-checkbox"></span>
                    <span className="addon-details">
                      <span className="addon-name">{addon.name}</span>
                      <span className="addon-price">+${addon.price.toLocaleString()}</span>
                    </span>
                  </label>
                ))}
              </div>

              <div className="calculator-total">
                <span className="total-label">Estimated Total</span>
                <span className="total-amount">${calculateTotal().toLocaleString()}</span>
              </div>

              <button className="cta-button">Get Started</button>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  )
}
