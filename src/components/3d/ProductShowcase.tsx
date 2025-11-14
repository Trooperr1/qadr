import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface ProductShowcaseProps {
  position?: [number, number, number]
  productType?: 'phone' | 'laptop' | 'tablet'
}

export default function ProductShowcase({
  position = [0, 0, 0],
  productType = 'phone'
}: ProductShowcaseProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime

    // Gentle rotation
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.2

    // Hover effect
    if (hovered) {
      groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1
    }
  })

  const renderProduct = () => {
    switch (productType) {
      case 'phone':
        return (
          <group>
            {/* Phone body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1, 2, 0.1]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.9}
                roughness={0.1}
                envMapIntensity={1}
              />
            </mesh>

            {/* Screen */}
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.9, 1.8, 0.02]} />
              <MeshTransmissionMaterial
                transmission={0.95}
                thickness={0.5}
                roughness={0.05}
                chromaticAberration={0.5}
                color="#000000"
              />
            </mesh>

            {/* Camera notch */}
            <mesh position={[0, 0.85, 0.06]}>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 32]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        )

      case 'laptop':
        return (
          <group>
            {/* Base */}
            <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
              <boxGeometry args={[3, 2, 0.1]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Screen */}
            <mesh position={[0, 0.5, -1]} rotation={[-0.2, 0, 0]} castShadow>
              <boxGeometry args={[3, 2, 0.1]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Display */}
            <mesh position={[0, 0.5, -0.95]} rotation={[-0.2, 0, 0]}>
              <boxGeometry args={[2.8, 1.8, 0.02]} />
              <MeshTransmissionMaterial
                transmission={0.95}
                thickness={0.5}
                roughness={0.05}
                color="#000000"
              />
            </mesh>
          </group>
        )

      case 'tablet':
        return (
          <group>
            {/* Body */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2, 2.8, 0.15]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Screen */}
            <mesh position={[0, 0, 0.08]}>
              <boxGeometry args={[1.85, 2.6, 0.02]} />
              <MeshTransmissionMaterial
                transmission={0.95}
                thickness={0.5}
                roughness={0.05}
                color="#000000"
              />
            </mesh>
          </group>
        )

      default:
        return null
    }
  }

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group
        ref={groupRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {renderProduct()}

        {/* Glow effect when hovered */}
        {hovered && (
          <pointLight
            color="#ffffff"
            intensity={2}
            distance={5}
          />
        )}
      </group>
    </Float>
  )
}
