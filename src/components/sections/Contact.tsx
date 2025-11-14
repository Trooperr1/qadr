import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card3D from '../Card3D'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData)
      setFormStatus('sent')
      setFormData({ name: '', email: '', phone: '', message: '' })

      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }, 1500)
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
    <section id="contact" ref={sectionRef} className="contact-section section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          CONTACT US
        </h2>

        <div className="contact-grid">
          {/* Contact Form */}
          <Card3D>
            <div className="contact-card">
              <h3 className="contact-subtitle">Send us a message</h3>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    required
                    rows={6}
                    className="form-input"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="form-submit"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' && 'Sending...'}
                  {formStatus === 'sent' && 'Message Sent! ✓'}
                  {formStatus === 'idle' && 'Send Message'}
                  {formStatus === 'error' && 'Try Again'}
                </button>
              </form>
            </div>
          </Card3D>

          {/* Contact Info & Map */}
          <div className="contact-info-wrapper">
            <Card3D>
              <div className="contact-card contact-info">
                <h3 className="contact-subtitle">Get in touch</h3>

                <div className="info-items">
                  <div className="info-item">
                    <div className="info-icon">✉</div>
                    <div>
                      <h4>Email</h4>
                      <p>hello@jaffstudio.com</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">☎</div>
                    <div>
                      <h4>Phone</h4>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">⌘</div>
                    <div>
                      <h4>Location</h4>
                      <p>San Francisco, CA</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-icon">⏰</div>
                    <div>
                      <h4>Hours</h4>
                      <p>Mon - Fri: 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Google Maps Embed */}
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14227298263!2d-122.50764015!3d37.75771915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
