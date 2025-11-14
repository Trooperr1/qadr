import { useRef, type ReactNode } from 'react'
import './Card3D.css'

interface Card3DProps {
  children: ReactNode
}

export default function Card3D({ children }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation angles
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    // Apply 3D transform
    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `

    // Update gradient position for glow effect
    const gradientX = (x / rect.width) * 100
    const gradientY = (y / rect.height) * 100
    card.style.setProperty('--gradient-x', `${gradientX}%`)
    card.style.setProperty('--gradient-y', `${gradientY}%`)
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `
  }

  return (
    <div
      ref={cardRef}
      className="card-3d"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-3d-inner">
        {children}
      </div>
      <div className="card-3d-glow" />
    </div>
  )
}
