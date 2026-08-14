import React from 'react'

const Home = () => {
  return (
   <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '24px',
      fontFamily: 'sans-serif'
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: '#1d3d59', fontSize: '24px', margin: 0 }}>Bem-vindo ao Iris 👋</h2>
        <span style={{ backgroundColor: '#a6d5cb', color: '#1d3d59', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px' }}>
          Modo Paciente
        </span>
      </header>
    </div>
  )
}

export default Home