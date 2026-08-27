// FrontEnd/src/components/Sidebar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart3, Settings } from 'lucide-react';
import logoIris from '../assets/logo.png';
import ProfileBadge from './ProfileBadge'; // <-- 1. Importamos o componente aqui

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/historico', label: 'Histórico', icon: BarChart3 },
    { path: '/ajustes', label: 'Ajustes', icon: Settings },
  ];

  return (
    <aside
      style={{
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
        boxSizing: 'border-box',
      }}
    >
      <div>
        {/* Logo */}
        <div style={{ paddingLeft: '8px', marginBottom: '36px' }}>
          <img
            src={logoIris}
            alt="Iris Logo"
            style={{ width: '120px', height: 'auto', display: 'block' }}
          />
        </div>

        {/* Links de Navegação */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: isSelected ? '700' : '500',
                  backgroundColor: isSelected ? '#edf7f5' : 'transparent',
                  color: isSelected ? '#2d8653' : '#6e8294',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <IconComponent
                  size={20}
                  strokeWidth={isSelected ? 2.4 : 2}
                  color={isSelected ? '#2d8653' : '#8fa0af'}
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 2. Trocamos todo aquele código estático por apenas esta linha */}
      <ProfileBadge />
      
    </aside>
  );
}