import { useEffect, useState, useRef } from 'react'
import './SpatialAudio.css'

export default function SpatialAudio() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioContextRef = useRef<AudioContext | null>(null)
  const pannerRef = useRef<PannerNode | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      // @ts-expect-error - AudioContext might need webkit prefix
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()

      // Create panner for spatial audio
      pannerRef.current = audioContextRef.current.createPanner()
      pannerRef.current.panningModel = 'HRTF'
      pannerRef.current.distanceModel = 'inverse'
      pannerRef.current.refDistance = 1
      pannerRef.current.maxDistance = 10000
      pannerRef.current.rolloffFactor = 1
      pannerRef.current.coneInnerAngle = 360
      pannerRef.current.coneOuterAngle = 0
      pannerRef.current.coneOuterGain = 0
    }

    // Track mouse movement for spatial positioning
    const handleMouseMove = (e: MouseEvent) => {
      if (!pannerRef.current) return

      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1

      // Set panner position based on mouse
      pannerRef.current.positionX.value = x * 5
      pannerRef.current.positionY.value = -y * 5
      pannerRef.current.positionZ.value = -2
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audioContextRef.current || !pannerRef.current) return

    if (isPlaying) {
      if (sourceRef.current) {
        sourceRef.current.stop()
        sourceRef.current = null
      }
      setIsPlaying(false)
    } else {
      // Create oscillator for demo (replace with actual audio file)
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(220, audioContextRef.current.currentTime)

      gainNode.gain.setValueAtTime(volume, audioContextRef.current.currentTime)

      oscillator.connect(gainNode)
      gainNode.connect(pannerRef.current)
      pannerRef.current.connect(audioContextRef.current.destination)

      oscillator.start()
      sourceRef.current = oscillator as unknown as AudioBufferSourceNode

      setIsPlaying(true)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  return (
    <div className="spatial-audio-widget">
      <button
        className="audio-toggle"
        onClick={toggleAudio}
        title="Toggle Spatial Audio"
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>

      {isPlaying && (
        <div className="audio-controls">
          <span className="audio-label">Spatial Audio</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          <span className="audio-hint">Move your mouse to experience 3D audio</span>
        </div>
      )}
    </div>
  )
}
