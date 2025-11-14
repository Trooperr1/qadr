import { useEffect, useRef } from 'react'
import './SplineViewer.css'

interface SplineViewerProps {
  sceneUrl?: string
  className?: string
}

export default function SplineViewer({
  sceneUrl = 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode',
  className = ''
}: SplineViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Dynamically load Spline runtime
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js'

    script.onload = () => {
      if (canvasRef.current && window.SPLINE) {
        const spline = new window.SPLINE.Application(canvasRef.current)
        spline.load(sceneUrl).catch(() => {
          // Fallback: show placeholder if Spline fails to load
          console.log('Spline scene loading fallback')
        })
      }
    }

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [sceneUrl])

  return (
    <div className={`spline-viewer-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="spline-canvas"
        id="canvas3d"
      />
      <div className="spline-fallback">
        <div className="spline-placeholder">
          <div className="placeholder-icon">◇</div>
          <p>3D Interactive Scene</p>
          <span className="placeholder-hint">Powered by Spline</span>
        </div>
      </div>
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SPLINE: {
      Application: new (canvas: HTMLCanvasElement) => {
        load: (url: string) => Promise<void>
      }
    }
  }
}
