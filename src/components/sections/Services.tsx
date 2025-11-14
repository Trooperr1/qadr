import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card3D from '../Card3D'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 1,
    title: '3D Web Development',
    description: 'Immersive WebGL experiences powered by Three.js and cutting-edge 3D technologies.',
    icon: '◆'
  },
  {
    id: 2,
    title: 'Interactive Design',
    description: 'Physics-based animations and gesture-driven interfaces that respond to every interaction.',
    icon: '◇'
  },
  {
    id: 3,
    title: 'Brand Identity',
    description: 'Luxury minimalist design systems that elevate your brand to premium status.',
    icon: '◈'
  },
  {
    id: 4,
    title: 'Motion Graphics',
    description: 'Cinematic animations and scroll-driven storytelling with GSAP.',
    icon: '◉'
  },
  {
    id: 5,
    title: 'WebGL Shaders',
    description: 'Custom GLSL shaders for unique visual effects and real-time rendering.',
    icon: '◎'
  },
  {
    id: 6,
    title: 'Performance',
    description: 'Optimized 3D experiences with 60fps smooth animations on all devices.',
    icon: '◐'
  }
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !gridRef.current) return

    // Animate title
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

    // Animate cards
    const cards = gridRef.current.querySelectorAll('.card-3d')
    cards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'top 70%',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        rotateX: -15,
        delay: index * 0.1,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="services-section section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          SERVICES
        </h2>
        <div ref={gridRef} className="services-grid">
          {services.map((service) => (
            <Card3D key={service.id}>
              <div className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}
