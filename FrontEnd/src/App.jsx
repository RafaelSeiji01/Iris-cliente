// FrontEnd/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Historico from './pages/Historico';
import Ajustes from './pages/Ajustes';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 1. Inicia o fade out após 1.6s
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1600);

    // 2. Remove a Splash da DOM após a animação de fade (500ms depois)
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {/* Splash Screen com transição suave de opacidade */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-500 ease-out ${
            isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <SplashScreen />
        </div>
      )}

      {/* Aplicação principal com rotas */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="historico" element={<Historico />} />
            <Route path="ajustes" element={<Ajustes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}