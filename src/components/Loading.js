export default function Loading() {
    return <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#361940'
        }}>
          <div style={{
            width: 40, height: 40,
            border: '3px solid rgba(255,194,0,0.2)',
            borderTop: '3px solid #FFC200',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
}