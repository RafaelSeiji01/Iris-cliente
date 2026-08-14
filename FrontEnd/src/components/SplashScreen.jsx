
import React from 'react';
import logoIris from '../assets/logo.png';

export default function SplashScreen({ isFading }) {

    return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#fbfcfd',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      // Animação suave de saída
      opacity: isFading ? 0 : 1,
      transform: isFading ? 'scale(1.04)' : 'scale(1)',
      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
      pointerEvents: isFading ? 'none' : 'auto'
    }}>
      {/* Imagem oficial da logo */}
      <img
        src={logoIris}
        alt="Logo Iris"
        style={{
          width: '360px',
          maxWidth: '90%',
          height: 'auto',
          objectFit: 'contain'
        }}
      />
    </div>
  );
  
}