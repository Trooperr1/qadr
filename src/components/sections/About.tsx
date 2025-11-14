import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    id: 1,
    number: '01',
    title: 'WebGL Excellence',
    description: 'Cutting-edge Three.js and WebGL technology powering immersive 3D experiences that run smoothly across all devices.',
  },
  {
    id: 2,
    number: '02',
    title: 'Performance First',
    description: 'Optimized rendering pipelines ensuring 60fps animations and lightning-fast load times for the ultimate user experience.',
  },
  {
    id: 3,
    number: '03',
    title: 'Luxury Design',
    description: 'Minimalist black and white aesthetics with generous white space, creating premium brand experiences.',
  },
  {
    id: 4,
    number: '04',
    title: 'Interactive Magic',
    description: 'Physics-based interactions, gesture controls, and real-time 3D transformations that respond to every touch.',
  },
]

const stats = [
  { label: 'Projects Delivered', value: '150+' },
  { label: 'Client Satisfaction', value: '99%' },
  { label: 'Awards Won', value: '24' },
  { label: 'Years Experience', value: '8+' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !statsRef.current || !featuresRef.current) return

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

    // Animate stats
    const statItems = statsRef.current.querySelectorAll('.stat-item')
    statItems.forEach((stat, index) => {
      gsap.from(stat, {
        scrollTrigger: {
          trigger: stat,
          start: 'top 90%',
          end: 'top 70%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        delay: index * 0.1,
      })
    })

    // Animate features
    const featureItems = featuresRef.current.querySelectorAll('.feature-item')
    featureItems.forEach((feature, index) => {
      gsap.from(feature, {
        scrollTrigger: {
          trigger: feature,
          start: 'top 90%',
          end: 'top 70%',
          scrub: 1,
        },
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="about-section section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          ABOUT US
        </h2>

        <div className="about-content">
          <div className="about-intro">
            <p className="about-lead">
              We craft <span className="highlight">immersive 3D experiences</span> that push the boundaries of web design.
            </p>
            <p className="about-description">
              JAFFSTUDIO specializes in creating cutting-edge WebGL applications that combine stunning visuals
              with seamless performance. Our team of 3D artists, developers, and designers work together to
              deliver premium digital experiences that rival billion-dollar tech companies.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div ref={featuresRef} className="features-list">
            {features.map((feature) => (
              <div key={feature.id} className="feature-item">
                <div className="feature-number">{feature.number}</div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
