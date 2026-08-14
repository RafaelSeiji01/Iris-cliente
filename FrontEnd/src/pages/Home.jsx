// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import ScoreCard from '../components/ScoreCard';
import MetricsGrid from '../components/MetricsGrid';
import TrendSection from '../components/TrendSection';
import BottomNav from '../components/BottomNav';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfcfd] flex justify-center pb-24 md:pb-12 font-sans">
      {/* Contêiner Fluido: max-w-md no celular, expande até max-w-5xl no computador */}
      <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl px-4 md:px-8 py-6 box-border">
        
        <Header name=" Antônio" />

        {/* No Desktop: Score e Tendência ficam em 2 colunas lado a lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
          <ScoreCard score={86} />
          <TrendSection />
        </div>

        {/* 4 Métricas de Hoje */}
        <MetricsGrid />

        {/* Menu Inferior: visível no celular, oculto em telas grandes */}
        <div className="block md:hidden">
          <BottomNav />
        </div>

      </div>
    </div>
  );
}