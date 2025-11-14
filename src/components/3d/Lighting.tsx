import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Lighting() {
  const spotLightRef = useRef<THREE.SpotLight>(null)
  const pointLightRef = useRef<THREE.PointLight>(null)

  // Animate lights for dynamic effect
  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (spotLightRef.current) {
      spotLightRef.current.position.x = Math.sin(time * 0.5) * 5
      spotLightRef.current.position.z = Math.cos(time * 0.5) * 5
    }

    if (pointLightRef.current) {
      pointLightRef.current.intensity = Math.sin(time * 2) * 0.5 + 1.5
    }
  })

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.2} />

      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Animated spotlight */}
      <spotLight
        ref={spotLightRef}
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
        color="#ffffff"
      />

      {/* Pulsing point light */}
      <pointLight
        ref={pointLightRef}
        position={[-5, 5, -5]}
        intensity={1.5}
        color="#ffffff"
        distance={20}
      />

      {/* Additional fill lights */}
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />

      {/* Hemisphere light for subtle gradient */}
      <hemisphereLight
        intensity={0.5}
        color="#ffffff"
        groundColor="#000000"
      />
    </>
  )
}
