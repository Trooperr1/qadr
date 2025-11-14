// Simple debug version to test
export default function App() {
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '2rem' }}>JAFFSTUDIO</h1>
      <p style={{ fontSize: '1.5rem' }}>Debug Mode - If you see this, React is working</p>
      <p style={{ marginTop: '1rem', opacity: 0.7 }}>The white screen issue is likely from:</p>
      <ul style={{ marginTop: '1rem', textAlign: 'left' }}>
        <li>Three.js/WebGL component error</li>
        <li>Loading screen stuck</li>
        <li>Component import error</li>
        <li>CSS cursor issue</li>
      </ul>
    </div>
  )
}
