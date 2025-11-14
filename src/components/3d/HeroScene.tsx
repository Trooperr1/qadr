import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { Suspense } from 'react'
import FloatingShapes from './FloatingShapes'
import Lighting from './Lighting'
import CameraController from './CameraController'
import CenterPiece from './CenterPiece'

function Scene() {
  return (
    <>
      <CameraController />
      <Lighting />

      {/* Main center piece */}
      <CenterPiece />

      {/* Floating geometric shapes */}
      <FloatingShapes />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Subtle orbit controls for desktop interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration offset={[0.001, 0.001]} />
      </EffectComposer>
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="webgl-canvas">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
