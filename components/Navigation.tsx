import React from 'react';
import { Smartphone } from 'lucide-react';

interface NavigationProps {
  currentBlock: number;
  isParticipant?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ currentBlock, isParticipant = false }) => {
  const progressPercentage = (currentBlock / 6) * 100;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${isParticipant ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
              <span className="font-bold text-white text-lg">P</span>
            </div>
            <span className="font-mono text-sm tracking-widest text-gray-400 uppercase hidden sm:block">
              {isParticipant ? 'Área do Participante' : 'PulsarH Workshop'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isParticipant ? (
               <div className="flex items-center gap-2 bg-emerald-900/30 px-3 py-1 rounded-full border border-emerald-500/30">
                  <Smartphone className="w-3 h-3 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">Diagnóstico Interativo</span>
               </div>
            ) : (
               <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-indigo-200 tracking-wide uppercase">Módulo {currentBlock} de 6</span>
               </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Animated Progress Bar (Hide in Participant Mode to avoid confusion about "6 blocks") */}
      {!isParticipant && (
        <div className="w-full h-[2px] bg-slate-800 relative">
          <div 
            className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] transition-all duration-1000 ease-in-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
          </div>
        </div>
      )}
    </nav>
  );
};