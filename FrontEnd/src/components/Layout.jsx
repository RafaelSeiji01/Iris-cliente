// FrontEnd/src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fbfcfd] flex font-sans text-slate-800">
      {/* Sidebar Visível no Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-100 p-6 sticky top-0 h-screen z-10">
        <Sidebar />
      </aside>  

      {/* Conteúdo Principal onde as páginas renderizam */}
      <main className="flex-1 flex justify-center pb-24 md:pb-12 pt-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Barra Inferior Visível no Mobile */}
      <div className="block md:hidden">
        <BottomNav />
      </div>
    </div>

    //olaaa
  );
}