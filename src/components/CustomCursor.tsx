import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorOutlineRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const cursorDot = cursorDotRef.current
    const cursorOutline = cursorOutlineRef.current

    if (!cursorDot || !cursorOutline) return

    let mouseX = 0
    let mouseY = 0
    let outlineX = 0
    let outlineY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Instant dot position
      gsap.to(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
        duration: 0
      })
    }

    const animateOutline = () => {
      // Smooth following for outline
      outlineX += (mouseX - outlineX) * 0.15
      outlineY += (mouseY - outlineY) * 0.15

      gsap.to(cursorOutline, {
        x: outlineX - 16,
        y: outlineY - 16,
        duration: 0
      })

      requestAnimationFrame(animateOutline)
    }

    // Handle hoverable elements
    const handleMouseEnter = () => {
      setIsHovering(true)
      gsap.to(cursorOutline, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.to(cursorDot, {
        scale: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      gsap.to(cursorOutline, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)

    // Add hover listeners to interactive elements
    const hoverElements = document.querySelectorAll('a, button, [role="button"]')
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    animateOutline()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div
        ref={cursorOutlineRef}
        className="cursor-outline"
        style={{
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
        }}
      />
    </>
  )
}
