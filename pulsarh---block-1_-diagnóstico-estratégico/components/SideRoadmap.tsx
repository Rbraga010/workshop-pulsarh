import React, { useState, useEffect } from 'react';
import { Layers, Lock, CheckCircle2, PlayCircle } from 'lucide-react';

interface SideRoadmapProps {
  currentBlock: number;
  onNavigate?: (blockId: number) => void;
}

export const SideRoadmap: React.FC<SideRoadmapProps> = ({ currentBlock, onNavigate }) => {
  const [activeSection, setActiveSection] = useState('hero');

  // Detect scroll position to update active sub-item in Block 1
  useEffect(() => {
    const handleScroll = () => {
      // Only track scroll if we are in Block 1
      if (currentBlock !== 1) return;

      const sections = ['hero', 'block1-dashboard'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusted detection range
          if (rect.top >= -300 && rect.top <= 400) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentBlock]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBlockClick = (blockId: number) => {
      if (onNavigate) {
          onNavigate(blockId);
      }
  };

  const roadmap = [
    {
      id: 1,
      title: "Módulo 1: Base de Consciência",
      subItems: [
        { id: 'hero', label: "Início" },
        { id: 'block1-dashboard', label: "Cenário Atual", isLast: true }
      ]
    },
    { id: 2, title: "Módulo 2: Diagnóstico", subItems: [] },
    { id: 3, title: "Módulo 3: Caminho Prático", subItems: [] },
    { id: 4, title: "Módulo 4: Mentoria in.PULSO", subItems: [] },
    { id: 5, title: "Módulo 5: Ferramentas IA", subItems: [] },
    { id: 6, title: "Módulo 6: Fechamento", subItems: [] },
  ];

  return (
    <div className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 print:hidden">
      <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl shadow-2xl max-w-[280px]">
        <div className="flex items-center gap-2 mb-6 text-indigo-400 font-mono text-xs uppercase tracking-widest border-b border-white/5 pb-2">
          <Layers className="w-4 h-4" />
          Jornada do Workshop
        </div>

        <div className="flex flex-col gap-4 relative">
          {/* Vertical Line connecting blocks */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-800 z-0"></div>

          {roadmap.map((block) => {
             const isCurrent = currentBlock === block.id;
             const isPast = block.id < currentBlock;
             const isFuture = block.id > currentBlock;

             return (
              <div key={block.id} className="relative z-10">
                <div 
                    onClick={() => handleBlockClick(block.id)}
                    className={`flex items-center gap-3 ${isCurrent ? 'mb-2' : ''} cursor-pointer hover:opacity-80 transition-all`}
                >
                  <div 
                    className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300
                      ${isCurrent 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)] scale-110' 
                        : isPast
                          ? 'bg-emerald-900 border-emerald-500 text-emerald-400'
                          : 'bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500 hover:bg-slate-800'
                      }
                    `}
                  >
                    {isCurrent ? <PlayCircle className="w-3 h-3" /> : (isPast ? <CheckCircle2 className="w-3 h-3" /> : block.id)}
                  </div>
                  <span className={`text-sm font-medium ${isCurrent ? 'text-white' : isPast ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {block.title}
                  </span>
                </div>

                {/* Sub-navigation for Current Block - Removed border-l class for cleaner look */}
                {isCurrent && block.subItems.length > 0 && (
                  <div className="ml-3 pl-6 py-2 flex flex-col gap-2">
                    {block.subItems.map((item: any) => (
                      <div key={item.id} className={item.isLast ? "mt-1" : ""}>
                          <button
                            onClick={(e) => {
                                e.stopPropagation();
                                scrollToSection(item.id);
                            }}
                            className={`
                              text-xs flex items-center gap-2 transition-all duration-300 w-full text-left group
                              ${activeSection === item.id ? 'text-indigo-300 font-semibold translate-x-1' : 'text-slate-500 hover:text-slate-300'}
                            `}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${activeSection === item.id ? 'bg-indigo-400' : 'bg-slate-700 group-hover:bg-slate-500'}`}></div>
                            {item.label}
                          </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};