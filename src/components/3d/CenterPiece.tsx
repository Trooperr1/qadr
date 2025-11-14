import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'

export default function CenterPiece() {
  const groupRef = useRef<THREE.Group>(null)
  const innerSphereRef = useRef<THREE.Mesh>(null)
  const torusRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (groupRef.current) {
      // Subtle rotation of the whole group
      groupRef.current.rotation.y = time * 0.1
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
    }

    if (innerSphereRef.current) {
      // Counter-rotate inner sphere
      innerSphereRef.current.rotation.y = -time * 0.3
      innerSphereRef.current.rotation.z = Math.cos(time * 0.2) * 0.2
    }

    if (torusRef.current) {
      // Animate torus
      torusRef.current.rotation.x = time * 0.5
      torusRef.current.rotation.z = time * 0.3
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer glass sphere */}
      <Sphere args={[2, 64, 64]}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.5}
          roughness={0.1}
          chromaticAberration={0.5}
          anisotropy={1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
        />
      </Sphere>

      {/* Inner rotating sphere */}
      <mesh ref={innerSphereRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Rotating torus ring */}
      <Torus ref={torusRef} args={[1.5, 0.1, 32, 100]}>
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.2}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </Torus>

      {/* Additional ring at different angle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 32, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}
