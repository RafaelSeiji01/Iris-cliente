// src/components/BottomNav.jsx
import React, { useState } from 'react';

export default function BottomNav() {
  const [active, setActive] = useState('inicio');

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      backgroundColor: '#ffffff',
      borderTop: '1px solid #edf2f7',
      display: 'flex',
      justifyContent: 'space-around',
      padding: '10px 0 16px 0',
      zIndex: 100
    }}>
      <button
        onClick={() => setActive('inicio')}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          color: active === 'inicio' ? '#1a334d' : '#8fa0af',
          fontWeight: active === 'inicio' ? '700' : '500',
          fontSize: '12px'
        }}
      >
        <span style={{ fontSize: '18px' }}>🏠</span>
        Início
      </button>

      <button
        onClick={() => setActive('historico')}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          color: active === 'historico' ? '#1a334d' : '#8fa0af',
          fontWeight: active === 'historico' ? '700' : '500',
          fontSize: '12px'
        }}
      >
        <span style={{ fontSize: '18px' }}>📊</span>
        Histórico
      </button>

      <button
        onClick={() => setActive('ajustes')}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          color: active === 'ajustes' ? '#1a334d' : '#8fa0af',
          fontWeight: active === 'ajustes' ? '700' : '500',
          fontSize: '12px'
        }}
      >
        <span style={{ fontSize: '18px' }}>⚙️</span>
        Ajustes
      </button>
    </nav>
  );
}