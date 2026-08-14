// src/components/Header.jsx
import React from 'react'


const Header = ({ name = " Antônio" }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Subtítulo */}
      <span style={{ color: '#8fa0af', fontSize: '15px', fontWeight: '500' }}>
        Bom dia,
      </span>

      {/* Nome do Paciente */}
      <h1 style={{
        color: '#1a334d',
        fontSize: '28px',
        fontWeight: '800',
        margin: '2px 0 10px 0'
      }}>
        {name}
      </h1>

      {/* Tag de Status Diário */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#ebf7f0',
        color: '#2d8653',
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '600'
      }}>
        <span style={{
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: '#2d8653'
        }} />
        Padrão normal hoje
      </div>
    </div>
  )
}

export default Header