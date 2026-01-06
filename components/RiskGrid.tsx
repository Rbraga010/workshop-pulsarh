import React, { useState } from 'react';
import { HeartCrack, DollarSign, Scale, Lock, AlertTriangle, ChevronDown, Plus } from 'lucide-react';
import { RiskCardProps } from '../types';

const risks: RiskCardProps[] = [
  {
    id: 1,
    title: "Emocional & Psicológico",
    phrase: "Equipes cansadas não falham por falta de talento. Falham por falta de governança humana.",
    signs: "Clima pesado, insegurança, medo de decidir, energia drenada.",
    kpis: ["Turnover", "Absenteísmo", "Engajamento/eNPS"],
    icon: HeartCrack,
    color: "text-rose-500"
  },
  {
    id: 2,
    title: "Financeiro",
    phrase: "Empresa não perde dinheiro só em marketing. Perde dinheiro em decisão lenta e execução fraca.",
    signs: "Baixa produtividade, retrabalho, vendas inconsistentes, custo de ineficiência.",
    kpis: ["Margem líquida por colaborador", "Tempo médio de decisão", "Taxa de conversão"],
    icon: DollarSign,
    color: "text-emerald-500"
  },
  {
    id: 3,
    title: "Jurídico",
    phrase: "Gestão ruim vira passivo. E passivo custa caro — e suga energia do dono.",
    signs: "Conflitos recorrentes, ruído, advertências mal conduzidas, desgaste de imagem.",
    kpis: ["Nº de ações trabalhistas", "Custo com passivos", "Horas do dono em conflitos"],
    icon: Scale,
    color: "text-amber-500"
  },
  {
    id: 4,
    title: "Inércia & Falta de Evolução",
    phrase: "A empresa para de evoluir quando a liderança intermediária não cresce.",
    signs: "Dono vira gargalo, ninguém decide sem autorização, expansão travada.",
    kpis: ["Taxa de crescimento anual", "Horas do dono na operação", "Índice de promoção interna"],
    icon: Lock,
    color: "text-indigo-500"
  }
];

export const RiskGrid: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleRisk = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="risk-grid" className="pt-32 pb-96 px-6 max-w-7xl mx-auto bg-slate-950 relative min-h-screen flex flex-col justify-center">
      {/* Section Divider/Glow to separate from next section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-b from-transparent to-slate-900/0 pointer-events-none"></div>

      <div className="mb-20 text-center">
         <div className="inline-flex items-center gap-2 mb-6 px-4 py-1 rounded-full bg-slate-900 border border-slate-800">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-mono text-slate-400 uppercase">Consequências Reais</span>
         </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Do dado ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-600">risco real</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Clique em cada pilar para ver a profundidade do impacto na sua empresa.
        </p>
      </div>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto relative z-10 w-full">
        {risks.map((risk) => {
          const Icon = risk.icon;
          const isActive = activeId === risk.id;
          const isInactive = activeId !== null && !isActive;

          return (
            <div 
              key={risk.id}
              onClick={() => toggleRisk(risk.id)}
              className={`
                relative overflow-hidden rounded-xl border cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${isActive 
                  ? 'border-indigo-500 bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10 py-10 px-8 scale-105' 
                  : 'border-slate-800 bg-slate-900/40 hover:bg-slate-800/80 hover:border-slate-600 py-8 px-6'
                }
                ${isInactive ? 'opacity-30 grayscale-[0.8] scale-[0.95]' : 'opacity-100 scale-100'}
              `}
            >
              {/* Header Line */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`p-3 rounded-lg transition-colors duration-300 ${isActive ? 'bg-slate-950 border border-white/10 ' + risk.color : 'bg-slate-800 text-slate-500'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {risk.title}
                  </h3>
                </div>
                
                <div className={`transition-transform duration-500 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                  {isActive ? <ChevronDown className="text-indigo-500 w-6 h-6" /> : <Plus className="text-slate-600 w-6 h-6" />}
                </div>
              </div>

              {/* Expanded Content */}
              <div 
                className={`grid grid-cols-1 transition-all duration-500 ease-in-out overflow-hidden
                  ${isActive ? 'grid-rows-[1fr] opacity-100 mt-10' : 'grid-rows-[0fr] opacity-0 mt-0'}
                `}
              >
                <div className="min-h-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    
                    {/* Left Column: Phrase & Signs */}
                    <div>
                        <blockquote className={`text-2xl font-light italic text-white border-l-4 pl-6 mb-8 border-indigo-500 leading-relaxed`}>
                        "{risk.phrase}"
                        </blockquote>
                        
                        <div className="bg-white/5 rounded-lg p-6 border border-white/5">
                            <p className="text-xs text-slate-400 mb-3 font-mono uppercase tracking-wider flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" /> Sinais Visíveis
                            </p>
                            <p className="text-slate-200 text-lg leading-relaxed">{risk.signs}</p>
                        </div>
                    </div>

                    {/* Right Column: KPIs */}
                    <div className="flex flex-col justify-center">
                        <div className="space-y-4">
                             <p className="text-sm text-indigo-400 font-mono uppercase tracking-wider mb-2 text-center md:text-left">
                                KPIs Afetados
                             </p>
                             {risk.kpis.map((kpi, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded bg-slate-950 border border-white/10 group hover:border-indigo-500/50 transition-colors">
                                    <span className="text-slate-300 font-medium">{kpi}</span>
                                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></div>
                                </div>
                             ))}
                        </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};