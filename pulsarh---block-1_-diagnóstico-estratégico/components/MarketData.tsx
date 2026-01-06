import React, { useState } from 'react';
import { Network, Circle, Target, Users, Zap, Building2, BrainCircuit, ChevronRight } from 'lucide-react';
import { DataCardProps } from '../types';

const dataPoints: (DataCardProps & { icon: any })[] = [
  {
    number: "70%",
    title: "A maioria dos gestores não está preparada para liderar.",
    source: "Gallup",
    description: "Quando a liderança falha, o impacto não é subjetivo: vira perda de produtividade, decisões ruins e dependência do dono.",
    delay: 0,
    icon: Target
  },
  {
    number: "75%",
    title: "As pessoas pedem demissão por causa do gestor.",
    source: "Estudos de comportamento organizacional",
    description: "Se o seu turnover está alto, não é 'geração' ou 'mercado'. Muitas vezes é gestão — e falta de formação de liderança intermediária.",
    delay: 100,
    icon: Users
  },
  {
    number: "21%",
    title: "Só 21% estão engajados no mundo.",
    source: "Gallup (State of the Global Workplace)",
    description: "E o gestor tem influência direta no engajamento. Time desengajado parece 'normal', mas custa caro.",
    delay: 200,
    icon: Zap
  },
  {
    number: "48%",
    title: "48% das empresas no Brasil fecham em até 3 anos.",
    source: "IBGE",
    description: "Não é só mercado. Falta de gestão e liderança estruturada é um dos fatores centrais. Empresa cresce, mas liderança não acompanha.",
    delay: 300,
    icon: Building2
  },
  {
    number: "2/10",
    title: "Só 20% usam IA no trabalho — mesmo em grandes empresas.",
    source: "Pesquisas de adoção de IA (Mercado)",
    description: "Isso cria um abismo: líderes que não usam IA perdem produtividade e clareza; líderes que usam sem governança viram risco.",
    delay: 400,
    icon: BrainCircuit
  }
];

export const MarketData: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (activeId === index) {
      setActiveId(null);
    } else {
      setActiveId(index);
    }
  };

  return (
    <section id="market-data" className="py-24 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <div className="flex flex-col md:flex-row items-start gap-12">
        
        {/* Left Side: Header & Context */}
        <div className="md:w-1/3 sticky top-24">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-indigo-900/30 border border-indigo-500/30 rounded-full">
            <Network className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-indigo-300 font-mono uppercase tracking-wider">Mapeamento de Mercado</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            O que os dados <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">revelam agora</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            Estes não são números aleatórios. São padrões de comportamento que estão moldando o sucesso (ou o fracasso) das empresas neste exato momento.
          </p>
          <div className="hidden md:block p-4 rounded-lg bg-slate-900/50 border border-white/5 text-sm text-slate-500 italic">
            "Clique nos nós de conexão para revelar os impactos."
          </div>
        </div>

        {/* Right Side: Mind Map / Circuit Board */}
        <div className="md:w-2/3 w-full relative pl-8 border-l border-slate-800">
          {/* Circuit Line Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0"></div>

          <div className="flex flex-col gap-6">
            {dataPoints.map((point, index) => {
              const isActive = activeId === index;
              const isDimmed = activeId !== null && !isActive;
              const Icon = point.icon;

              return (
                <div 
                  key={index}
                  className={`relative transition-all duration-500 ${isDimmed ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'}`}
                >
                  {/* Connection Node */}
                  <div 
                    className={`absolute -left-[39px] top-6 w-5 h-5 rounded-full border-2 transition-all duration-300 z-10 cursor-pointer
                      ${isActive ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.6)]' : 'bg-slate-950 border-slate-700 hover:border-indigo-500 hover:scale-110'}
                    `}
                    onClick={() => toggleItem(index)}
                  >
                     {isActive && <div className="absolute inset-0 rounded-full animate-ping bg-indigo-500 opacity-75"></div>}
                  </div>

                  {/* Connecting Horizontal Line */}
                  <div className={`absolute -left-[30px] top-[22px] h-px w-8 transition-all duration-500 ${isActive ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-800'}`}></div>

                  {/* Content Card */}
                  <div 
                    onClick={() => toggleItem(index)}
                    className={`
                      relative overflow-hidden rounded-xl border transition-all duration-500 cursor-pointer
                      ${isActive 
                        ? 'bg-slate-900/80 border-indigo-500/50 shadow-2xl ring-1 ring-indigo-500/20' 
                        : 'bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-900/60'
                      }
                    `}
                  >
                    {/* Collapsed State Header (Visible always) */}
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-900 text-slate-600'}`}>
                          <Icon size={24} />
                        </div>
                        <div>
                           <h3 className={`text-3xl font-bold tracking-tighter transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>
                            {point.number}
                           </h3>
                        </div>
                      </div>
                      
                      {!isActive && (
                         <ChevronRight className="text-slate-700" />
                      )}
                    </div>

                    {/* Expanded Content */}
                    <div 
                        className={`transition-all duration-500 ease-out overflow-hidden ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <h4 className="text-xl font-medium text-indigo-100 mb-2">{point.title}</h4>
                        <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">
                          Fonte: {point.source}
                        </p>
                        <p className="text-slate-300 leading-relaxed border-l-2 border-indigo-500 pl-4">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};