import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card3D from '../Card3D'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

const portfolioItems = [
  {
    id: 1,
    title: 'Quantum Interface',
    category: 'webgl',
    image: '◆',
    description: '3D particle system with real-time physics'
  },
  {
    id: 2,
    title: 'Neural Network',
    category: 'interactive',
    image: '◇',
    description: 'Interactive data visualization'
  },
  {
    id: 3,
    title: 'Holographic UI',
    category: 'webgl',
    image: '◈',
    description: 'Glassmorphic 3D interface'
  },
  {
    id: 4,
    title: 'Spatial Audio',
    category: 'interactive',
    image: '◉',
    description: '3D sound experience'
  },
  {
    id: 5,
    title: 'Immersive Portfolio',
    category: 'webgl',
    image: '◎',
    description: 'Full 3D product showcase'
  },
  {
    id: 6,
    title: 'Motion Studio',
    category: 'animation',
    image: '◐',
    description: 'Cinematic scroll animations'
  }
]

const categories = ['all', 'webgl', 'interactive', 'animation']

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

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
    <section id="portfolio" ref={sectionRef} className="portfolio-section section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          PORTFOLIO
        </h2>

        {/* Filter buttons */}
        <div className="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <Card3D key={item.id}>
              <div className="portfolio-item">
                <div className="portfolio-icon">{item.image}</div>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-category">{item.category}</p>
                <p className="portfolio-description">{item.description}</p>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}
