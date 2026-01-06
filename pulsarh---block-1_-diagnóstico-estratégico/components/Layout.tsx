import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30 selection:text-indigo-100">
      {children}
      
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-slate-900 border border-slate-700 rounded-full text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300 shadow-lg z-50 group"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};