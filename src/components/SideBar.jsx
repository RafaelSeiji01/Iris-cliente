
import React, { useState } from 'react';
import logoIris from '../assets/logo.png';

export default function Sidebar() {
  const [active, setActive] = useState('inicio');

  const menuItems = [
    { id: 'inicio', label: 'Início', icon: '🏠' },
    { id: 'historico', label: 'Histórico', icon: '📊' },
    { id: 'ajustes', label: 'Ajustes', icon: '⚙️' }
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #edf2f7',
      padding: '32px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      position: 'sticky',
      top: 0,
      boxSizing: 'border-box'
    }}>
      <div>
        {/* Logo */}
        <div style={{ paddingLeft: '12px', marginBottom: '40px' }}>
          <img src={logoIris} alt="Iris" style={{ width: '110px', height: 'auto' }} />
        </div>

        {/* Links de Navegação */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: active === item.id ? '700' : '500',
                backgroundColor: active === item.id ? '#edf7f5' : 'transparent',
                color: active === item.id ? '#1a334d' : '#8fa0af',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Perfil Simplificado no rodapé da Sidebar */}
      <div style={{
        padding: '12px 14px',
        borderRadius: '16px',
        backgroundColor: '#f8fafc',
        border: '1px solid #edf2f7',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: '#a6d5cb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          color: '#1a334d'
        }}>
          SA
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#1a334d' }}>Seu Antônio</p>
          <p style={{ margin: 0, fontSize: '11px', color: '#8fa0af' }}>Paciente</p>
        </div>
      </div>
    </aside>
  );
}