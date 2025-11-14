import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card3D from '../Card3D'
import './Testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO, TechVision',
    avatar: 'SC',
    text: 'JAFFSTUDIO transformed our digital presence with stunning 3D visuals. The immersive experience increased our engagement by 400%.',
    rating: 5
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'Creative Director, Nexus',
    avatar: 'MR',
    text: 'The attention to detail and cutting-edge WebGL implementation exceeded our expectations. Truly world-class work.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Thompson',
    role: 'Founder, Quantum Labs',
    avatar: 'ET',
    text: 'Their 3D product showcases are breathtaking. We saw a 250% increase in conversions after launching our new site.',
    rating: 5
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'VP Product, Stellar',
    avatar: 'DK',
    text: 'Working with JAFFSTUDIO was seamless. They delivered a premium experience that rivals Apple and Tesla.',
    rating: 5
  },
  {
    id: 5,
    name: 'Lisa Martinez',
    role: 'CMO, Innovate Inc',
    avatar: 'LM',
    text: 'The glassmorphism effects and 3D animations are absolutely stunning. Our brand has never looked better.',
    rating: 5
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Director, FutureTech',
    avatar: 'JW',
    text: 'From concept to deployment, JAFFSTUDIO delivered excellence. The performance optimization is incredible.',
    rating: 5
  }
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

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
    <section id="testimonials" ref={sectionRef} className="testimonials-section section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          TESTIMONIALS
        </h2>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <Card3D key={testimonial.id}>
              <div className="testimonial-card">
                <div className="testimonial-avatar">
                  {testimonial.avatar}
                </div>
                <div className="testimonial-stars">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}
