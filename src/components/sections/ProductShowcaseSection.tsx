import { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductShowcase from '../3d/ProductShowcase'
import './ProductShowcaseSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

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
    <section ref={sectionRef} className="product-showcase-section section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          3D PRODUCT SHOWCASE
        </h2>

        <div className="showcase-grid">
          {/* Phone */}
          <div className="showcase-item">
            <div className="showcase-canvas">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} intensity={1} />
                  <ProductShowcase productType="phone" position={[0, 0, 0]} />
                  <Environment preset="city" />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={2}
                  />
                </Suspense>
              </Canvas>
            </div>
            <h3 className="showcase-title">Mobile Experience</h3>
            <p className="showcase-description">
              Immersive 3D interfaces optimized for mobile devices
            </p>
          </div>

          {/* Laptop */}
          <div className="showcase-item">
            <div className="showcase-canvas">
              <Canvas
                camera={{ position: [0, 2, 6], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} intensity={1} />
                  <ProductShowcase productType="laptop" position={[0, 0, 0]} />
                  <Environment preset="city" />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={2}
                  />
                </Suspense>
              </Canvas>
            </div>
            <h3 className="showcase-title">Desktop Power</h3>
            <p className="showcase-description">
              Full-featured WebGL applications for desktop browsers
            </p>
          </div>

          {/* Tablet */}
          <div className="showcase-item">
            <div className="showcase-canvas">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} intensity={1} />
                  <ProductShowcase productType="tablet" position={[0, 0, 0]} />
                  <Environment preset="city" />
                  <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={2}
                  />
                </Suspense>
              </Canvas>
            </div>
            <h3 className="showcase-title">Tablet Ready</h3>
            <p className="showcase-description">
              Touch-optimized 3D experiences for tablets
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
