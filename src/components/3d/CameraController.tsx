import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function CameraController() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useEffect(() => {
    if (!cameraRef.current) return

    // Set initial camera position
    cameraRef.current.position.set(0, 0, 8)

    // Cinematic camera animation on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    })

    // Camera movement through scenes
    tl.to(cameraRef.current.position, {
      z: 5,
      y: 2,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to(cameraRef.current.position, {
      x: 3,
      z: 7,
      y: 1,
      duration: 1,
      ease: 'power2.inOut'
    })
    .to(cameraRef.current.rotation, {
      y: 0.3,
      duration: 1,
      ease: 'power2.inOut'
    }, '<')

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Mouse parallax effect
  useFrame((state) => {
    if (!cameraRef.current) return

    const mouseX = (state.mouse.x * Math.PI) / 20
    const mouseY = (state.mouse.y * Math.PI) / 20

    cameraRef.current.rotation.x += (mouseY - cameraRef.current.rotation.x) * 0.05
    cameraRef.current.rotation.y += (mouseX - cameraRef.current.rotation.y) * 0.05
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={75}
      near={0.1}
      far={1000}
    />
  )
}
