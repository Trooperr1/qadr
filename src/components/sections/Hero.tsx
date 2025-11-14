import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return

    // Parallax animation on scroll
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 200,
      opacity: 0,
      scale: 0.8,
    })

    gsap.to(subtitleRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 150,
      opacity: 0,
    })

    // Initial animation
    const tl = gsap.timeline({ delay: 2.2 })
    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    }, '-=0.8')

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section id="home" ref={heroRef} className="hero-section section">
      <div className="container text-center">
        <h1 ref={titleRef} className="hero-title">
          JAFFSTUDIO
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Immersive 3D Digital Experiences
        </p>
      </div>
    </section>
  )
}
