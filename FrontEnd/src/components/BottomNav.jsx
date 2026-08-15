// FrontEnd/src/components/BottomNav.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart3, Settings } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/historico', label: 'Histórico', icon: BarChart3 },
    { path: '/ajustes', label: 'Ajustes', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-2 flex justify-around items-center z-50 shadow-lg">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-1 py-1 px-3 border-none bg-transparent cursor-pointer"
          >
            <IconComponent
              size={22}
              strokeWidth={isActive ? 2.5 : 1.8}
              color={isActive ? '#2d8653' : '#94a3b8'}
            />
            <span
              className={`text-[11px] ${
                isActive ? 'font-bold text-[#2d8653]' : 'font-medium text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}