import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingShapeProps {
  position: [number, number, number]
  geometry: 'sphere' | 'box' | 'torus' | 'octahedron' | 'icosahedron'
  scale?: number
  speed?: number
  floatIntensity?: number
}

function FloatingShape({ position, geometry, scale = 1, speed = 1, floatIntensity = 1 }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Animate rotation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001 * speed
      meshRef.current.rotation.y += 0.002 * speed
      meshRef.current.rotation.z += 0.001 * speed
    }
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[1, 64, 64]} />
      case 'box':
        return <boxGeometry args={[1.5, 1.5, 1.5]} />
      case 'torus':
        return <torusGeometry args={[1, 0.4, 32, 100]} />
      case 'octahedron':
        return <octahedronGeometry args={[1.2]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1.2]} />
      default:
        return <sphereGeometry args={[1, 64, 64]} />
    }
  }

  return (
    <Float
      speed={speed}
      rotationIntensity={0.5}
      floatIntensity={floatIntensity}
      floatingRange={[-0.5, 0.5]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {renderGeometry()}
        <MeshDistortMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

export default function FloatingShapes() {
  // Generate random positions for shapes
  const shapes = useMemo(() => {
    const geometries: Array<'sphere' | 'box' | 'torus' | 'octahedron' | 'icosahedron'> = [
      'sphere', 'box', 'torus', 'octahedron', 'icosahedron'
    ]

    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      geometry: geometries[Math.floor(Math.random() * geometries.length)],
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.8 + 0.5,
      speed: Math.random() * 2 + 0.5,
      floatIntensity: Math.random() * 2 + 1
    }))
  }, [])

  return (
    <>
      {shapes.map((shape) => (
        <FloatingShape
          key={shape.id}
          position={shape.position}
          geometry={shape.geometry}
          scale={shape.scale}
          speed={shape.speed}
          floatIntensity={shape.floatIntensity}
        />
      ))}
    </>
  )
}
