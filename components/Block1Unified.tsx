import React, { useState } from 'react';
import { 
  Network, Target, Users, Zap, Building2, BrainCircuit, ChevronRight, X,
  AlertTriangle, HeartCrack, DollarSign, Scale, Lock, Plus, ChevronDown,
  ArrowRight, Download, Smartphone, Maximize2, Minimize2, MoveRight, 
  LayoutDashboard, BookOpen, HelpCircle
} from 'lucide-react';

// --- DATA DEFINITIONS ---

// Market Data (Updated with Research)
const marketDataPoints = [
  {
    number: "70%",
    title: "Líderes despreparados geram prejuízo global de US$ 300 bi.",
    source: "Gallup (Estudo com 2,5mi de gestores)",
    description: "Não é apenas falta de 'jeito'. 70% dos gestores não estão preparados para a função. O resultado não é apenas clima ruim, é um rombo de US$ 300 bilhões na economia global por má gestão.",
    icon: Target
  },
  {
    number: "75%",
    title: "A principal causa de demissão não é o salário, é o gestor.",
    source: "GPTW / Estudos de Comportamento",
    description: "3 em cada 4 pedidos de demissão voluntária ocorrem por falha na liderança direta. Se o seu turnover está alto, você não está perdendo para o mercado, está perdendo para a sua própria gestão.",
    icon: Users
  },
  {
    number: "US$ 438bi",
    title: "Perda de produtividade por baixo engajamento (apenas 21% engajados).",
    source: "Gallup (State of the Global Workplace) / Forbes",
    description: "O gestor influencia 70% do engajamento do time. Com apenas 21% da força de trabalho engajada globalmente, o custo da ineficiência e 'corpo mole' soma bilhões em prejuízo invisível.",
    icon: Zap
  },
  {
    number: "48%",
    title: "Empresas no Brasil fecham em 3 anos por falha de gestão.",
    source: "IBGE / Sebrae",
    description: "A carência de gestão eficiente é citada por 25% dos empreendedores como causa direta da falência. O negócio cresce, a complexidade aumenta, mas a liderança não acompanha e a estrutura colapsa.",
    icon: Building2
  },
  {
    number: "80%",
    title: "Gap Tecnológico: 8 em cada 10 líderes ignoram a IA.",
    source: "Solides / Pesquisas de Mercado",
    description: "Apenas 20% utilizam IA no dia a dia. Isso cria um abismo competitivo: líderes analógicos perdem produtividade e clareza, enquanto concorrentes automatizam a parte tática para focar na estratégia.",
    icon: BrainCircuit
  }
];

// Risks Data (Updated with Research & KPIs)
const riskPoints = [
  {
    id: 1,
    title: "Risco Emocional & Psicológico",
    phrase: "75% dos gerentes reportam estar sobrecarregados (Gartner). O líder esgotado quebra o time.",
    signs: "Burnout, conflitos interpessoais constantes, ambiente de ansiedade e o dono atuando como 'psicólogo' para apagar incêndios de clima.",
    kpis: ["Taxa de Turnover (Custo de reposição)", "Índice de Absenteísmo (Faltas/Doença)", "eNPS (Engajamento real do time)"],
    icon: HeartCrack,
    color: "text-rose-500",
    borderColor: "border-rose-500"
  },
  {
    id: 2,
    title: "Risco Financeiro",
    phrase: "Ineficiência gerencial corrói a margem. O déficit de engajamento custa caro.",
    signs: "Decisões lentas que travam o caixa, retrabalho constante, vendas imprevisíveis por falta de gestão de pipeline e baixa margem por colaborador.",
    kpis: ["Margem Líquida por Colaborador", "Tempo Médio de Decisão (Time-to-market)", "Taxa de Conversão de Vendas"],
    icon: DollarSign,
    color: "text-emerald-500",
    borderColor: "border-emerald-500"
  },
  {
    id: 3,
    title: "Risco Jurídico",
    phrase: "Gestão ruim vira passivo. Brasil projeta 2,3 milhões de ações trabalhistas em 2025.",
    signs: "Aumento de litigiosidade por assédio moral, descumprimento de jornada e feedbacks mal conduzidos. O passivo oculto que explode no fluxo de caixa.",
    kpis: ["Nº de Ações Trabalhistas Ativas", "Custo com Passivos e Acordos", "Horas do Dono em Gestão de Conflitos"],
    icon: Scale,
    color: "text-amber-500",
    borderColor: "border-amber-500"
  },
  {
    id: 4,
    title: "Risco de Inércia & Estagnação",
    phrase: "Se o dono é o único que decide, a empresa tem um teto de crescimento inquebrável.",
    signs: "Centralização absoluta no fundador, falta de sucessores preparados, projetos de expansão engavetados e o dono preso no operacional (12h/dia).",
    kpis: ["Taxa de Crescimento Anual (CAGR)", "Horas do Dono na Operação vs. Estratégia", "Índice de Promoção Interna (Sucessão)"],
    icon: Lock,
    color: "text-indigo-500",
    borderColor: "border-indigo-500"
  }
];

interface Block1UnifiedProps {
  onNextBlock: () => void;
}

export const Block1Unified: React.FC<Block1UnifiedProps> = ({ onNextBlock }) => {
  // View state: 'split' (both visible), 'market' (market expanded), 'risks' (risks expanded)
  const [activePanel, setActivePanel] = useState<'none' | 'market' | 'risks'>('none');
  const [showBottomDrawer, setShowBottomDrawer] = useState(false);
  const [showQR, setShowQR] = useState(false);

  // Sub-states for internal interactions
  const [activeMarketId, setActiveMarketId] = useState<number | null>(null);
  const [activeRiskId, setActiveRiskId] = useState<number | null>(null);

  const toggleMarketItem = (index: number) => {
    setActiveMarketId(activeMarketId === index ? null : index);
  };

  const toggleRiskItem = (id: number) => {
    setActiveRiskId(activeRiskId === id ? null : id);
  };

  // Generate URL for QR Code (Direct link to Block 2)
  const getParticipantUrl = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?block=2`;
  };

  return (
    <div id="block1-dashboard" className="relative h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4 lg:p-8 font-sans overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>

      {/* --- DASHBOARD CONTAINER --- */}
      <div className="relative z-10 w-full max-w-7xl h-[80vh] bg-slate-900/40 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-md mb-20 transition-all duration-500">
        
        {/* === LEFT PANEL: MARKET DATA === */}
        <div 
           onClick={() => activePanel !== 'market' && setActivePanel('market')}
           className={`
              relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col overflow-hidden border-b md:border-b-0 md:border-r border-white/5
              ${activePanel === 'none' ? 'h-1/2 md:h-full md:w-1/2 hover:bg-slate-800/30 cursor-pointer' : ''}
              ${activePanel === 'market' ? 'h-[90%] md:h-full w-full cursor-default' : ''}
              ${activePanel === 'risks' ? 'h-[10%] md:h-full md:w-[60px] cursor-pointer hover:bg-indigo-900/20' : ''}
           `}
        >
           {/* Background Image/Gradient for Panel */}
           <div className={`absolute inset-0 transition-opacity duration-700 ${activePanel === 'market' ? 'opacity-20' : 'opacity-5'} bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`}></div>
           
           {/* Vertical Label (When Collapsed Horizontally) */}
           <div className={`hidden md:flex absolute inset-0 items-center justify-center transition-opacity duration-500 ${activePanel === 'risks' ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
              <div className="-rotate-90 whitespace-nowrap text-indigo-400 font-bold tracking-widest uppercase flex items-center gap-3">
                 <Network className="w-5 h-5" /> Mercado
              </div>
           </div>

           {/* Content Container */}
           <div className={`flex-1 flex flex-col p-6 md:p-10 transition-all duration-500 ${activePanel === 'risks' ? 'opacity-0 translate-x-[-20px]' : 'opacity-100'} relative`}>
              
              {/* Header Area */}
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/30 text-indigo-300 text-[10px] font-mono uppercase tracking-wider mb-2">
                       <Network className="w-3 h-3" /> Fatos Externos
                    </div>
                    <h2 className={`font-bold text-white leading-tight transition-all duration-500 ${activePanel === 'market' ? 'text-2xl md:text-5xl' : 'text-xl md:text-3xl'}`}>
                       Dados de <br/> Mercado
                    </h2>
                 </div>
                 
                 {/* Close/Minimize Button */}
                 {activePanel === 'market' && (
                    <button 
                       onClick={(e) => { e.stopPropagation(); setActivePanel('none'); }}
                       className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                       <Minimize2 className="w-5 h-5" />
                    </button>
                 )}
                 
                 {/* Expand Hint */}
                 {activePanel === 'none' && (
                    <div className="p-2 rounded-full border border-white/10 text-indigo-400 bg-slate-900/50">
                       <MoveRight className="w-5 h-5" />
                    </div>
                 )}
              </div>

              {/* EXPANDED CONTENT: THE LIST */}
              <div className={`flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar transition-all duration-700 pb-12 ${activePanel === 'market' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {activePanel === 'market' && marketDataPoints.map((point, index) => {
                     const isActive = activeMarketId === index;
                     return (
                        <div 
                           key={index}
                           onClick={() => toggleMarketItem(index)}
                           className={`
                             group relative overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer
                             ${isActive ? 'bg-indigo-900/10 border-indigo-500 shadow-xl' : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800 hover:border-indigo-500/30'}
                           `}
                        >
                           <div className="p-5 flex items-center justify-between">
                              <div className="flex items-center gap-5">
                                 <span className={`text-xl md:text-2xl font-black ${isActive ? 'text-indigo-400' : 'text-slate-600 group-hover:text-slate-400'}`}>{point.number}</span>
                                 <h3 className={`text-sm md:text-base font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>{point.title}</h3>
                              </div>
                              <div className={`transition-transform duration-300 ${isActive ? 'rotate-90 text-indigo-400' : 'text-slate-600'}`}>
                                 <ChevronRight className="w-5 h-5" />
                              </div>
                           </div>
                           
                           <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="px-5 pb-5 pl-16 pt-2">
                                 <p className="text-[10px] text-slate-500 font-mono uppercase mb-3">Fonte: {point.source}</p>
                                 <p className="text-sm md:text-xl text-white leading-relaxed border-l-4 border-indigo-500 pl-6 font-medium animate-slide-up shadow-sm">
                                    {point.description}
                                 </p>
                              </div>
                           </div>
                        </div>
                     )
                  })}
              </div>
              
              {/* Data Sources Footer (Bibliography) */}
              {activePanel === 'market' && (
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/90 border-t border-white/5 backdrop-blur text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono flex items-center gap-2">
                       <BookOpen className="w-3 h-3" /> Fontes de Inteligência:
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                       <span className="text-xs font-bold text-slate-400">GALLUP</span>
                       <span className="text-xs font-bold text-slate-400">GPTW</span>
                       <span className="text-xs font-bold text-slate-400">IBGE</span>
                       <span className="text-xs font-bold text-slate-400">GARTNER</span>
                       <span className="text-xs font-bold text-slate-400">FORBES</span>
                    </div>
                 </div>
              )}

              {/* COLLAPSED PREVIEW */}
              {activePanel === 'none' && (
                  <div className="mt-4 text-slate-400 text-sm md:text-base max-w-sm">
                     <p>5 indicadores globais que explicam a crise de liderança.</p>
                     <div className="mt-2 text-indigo-400 text-xs uppercase tracking-wider font-bold">
                        Clique para expandir
                     </div>
                  </div>
              )}
           </div>
        </div>

        {/* === RIGHT PANEL: RISK GRID === */}
        <div 
           onClick={() => activePanel !== 'risks' && setActivePanel('risks')}
           className={`
              relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col overflow-hidden
              ${activePanel === 'none' ? 'h-1/2 md:h-full md:w-1/2 hover:bg-slate-800/30 cursor-pointer' : ''}
              ${activePanel === 'risks' ? 'h-[90%] md:h-full w-full cursor-default' : ''}
              ${activePanel === 'market' ? 'h-[10%] md:h-full md:w-[60px] cursor-pointer hover:bg-red-900/20' : ''}
           `}
        >
           {/* Background Image/Gradient for Panel */}
           <div className={`absolute inset-0 transition-opacity duration-700 ${activePanel === 'risks' ? 'opacity-20' : 'opacity-5'} bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]`}></div>

           {/* Vertical Label (When Collapsed Horizontally) */}
           <div className={`hidden md:flex absolute inset-0 items-center justify-center transition-opacity duration-500 ${activePanel === 'market' ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
              <div className="rotate-90 whitespace-nowrap text-red-500 font-bold tracking-widest uppercase flex items-center gap-3">
                 <AlertTriangle className="w-5 h-5" /> Riscos
              </div>
           </div>

           {/* Content Container */}
           <div className={`flex-1 flex flex-col p-6 md:p-10 transition-all duration-500 ${activePanel === 'market' ? 'opacity-0 translate-x-[20px]' : 'opacity-100'}`}>
              
              {/* Header Area */}
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/30 text-red-300 text-[10px] font-mono uppercase tracking-wider mb-2">
                       <AlertTriangle className="w-3 h-3" /> Impactos Internos
                    </div>
                    <h2 className={`font-bold text-white leading-tight transition-all duration-500 ${activePanel === 'risks' ? 'text-2xl md:text-5xl' : 'text-xl md:text-3xl'}`}>
                       Riscos Reais <br/> da Empresa
                    </h2>
                 </div>
                 
                 {/* Close/Minimize Button */}
                 {activePanel === 'risks' && (
                    <button 
                       onClick={(e) => { e.stopPropagation(); setActivePanel('none'); }}
                       className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                       <Minimize2 className="w-5 h-5" />
                    </button>
                 )}

                 {/* Expand Hint */}
                 {activePanel === 'none' && (
                    <div className="p-2 rounded-full border border-white/10 text-red-500 bg-slate-900/50">
                       <MoveRight className="w-5 h-5" />
                    </div>
                 )}
              </div>

              {/* EXPANDED CONTENT: THE GRID */}
              <div className={`flex-1 overflow-y-auto pr-2 transition-all duration-700 ${activePanel === 'risks' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                 {activePanel === 'risks' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
                        {riskPoints.map((risk) => {
                           const isActive = activeRiskId === risk.id;
                           const Icon = risk.icon;
                           const colSpan = isActive ? 'md:col-span-2' : 'md:col-span-1';

                           return (
                              <div 
                                 key={risk.id}
                                 onClick={() => toggleRiskItem(risk.id)}
                                 className={`
                                    ${colSpan}
                                    relative rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden
                                    ${isActive ? `bg-slate-900 ${risk.borderColor} shadow-2xl` : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'}
                                 `}
                              >
                                 <div className="p-5 md:p-6">
                                    <div className="flex justify-between items-start mb-2">
                                       <div className="flex items-center gap-3">
                                          <div className={`p-2 rounded-lg ${isActive ? `bg-slate-950 ${risk.color}` : 'bg-slate-800 text-slate-500'}`}>
                                             <Icon className="w-5 h-5" />
                                          </div>
                                          <h3 className={`text-lg font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>{risk.title}</h3>
                                       </div>
                                       {isActive ? <ChevronDown className={risk.color} /> : <Plus className="text-slate-600" />}
                                    </div>

                                    {isActive && (
                                       <div className="mt-6 animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
                                          <div>
                                             <blockquote className={`text-lg italic text-white border-l-2 pl-3 ${risk.borderColor} mb-4`}>
                                                "{risk.phrase}"
                                             </blockquote>
                                             <div className="bg-slate-950/50 p-3 rounded-lg">
                                                <p className="text-[10px] font-mono uppercase text-slate-500 mb-1">Sinais Visíveis</p>
                                                <p className="text-sm text-slate-300 leading-relaxed">{risk.signs}</p>
                                             </div>
                                          </div>
                                          <div>
                                             <p className="text-[10px] font-mono uppercase text-slate-500 mb-2">KPIs Afetados</p>
                                             <div className="space-y-2">
                                                {risk.kpis.map((kpi, i) => (
                                                   <div key={i} className="flex items-center justify-between p-2 bg-slate-950 border border-white/5 rounded text-sm">
                                                      <span className="text-slate-300">{kpi}</span>
                                                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                                   </div>
                                                ))}
                                             </div>
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              </div>
                           )
                        })}
                    </div>
                 )}
              </div>

              {/* COLLAPSED PREVIEW */}
              {activePanel === 'none' && (
                  <div className="mt-4 text-slate-400 text-sm md:text-base max-w-sm">
                     <p>Analise os 4 pilares de risco (Jurídico, Financeiro...).</p>
                     <div className="mt-2 text-red-400 text-xs uppercase tracking-wider font-bold">
                        Clique para expandir
                     </div>
                  </div>
              )}
           </div>
        </div>
      </div>


      {/* --- BOTTOM DRAWER: THE INEVITABLE QUESTION (ENHANCED) --- */}
      {/* Absolute positioning keeps it contained within Block 1's 100vh height */}
      <div 
         className={`
            absolute bottom-0 left-0 right-0 z-40 bg-slate-950 border-t-2 border-indigo-500/50 shadow-[0_-10px_60px_rgba(79,70,229,0.2)] transition-all duration-700 ease-in-out
            ${showBottomDrawer ? 'h-[85vh]' : 'h-16 hover:h-20 cursor-pointer'}
         `}
      >
         {/* Background Question Marks Animation (Enhanced & Varied) */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {/* Standard Scattered Points */}
            <HelpCircle className="absolute top-10 left-[10%] w-12 h-12 text-slate-800 animate-pulse duration-[3000ms]" />
            <HelpCircle className="absolute top-1/2 right-[15%] w-24 h-24 text-slate-800 animate-bounce duration-[5000ms]" />
            <HelpCircle className="absolute bottom-20 left-[20%] w-8 h-8 text-slate-800 animate-pulse duration-[4000ms]" />
            <HelpCircle className="absolute top-1/4 right-[5%] w-16 h-16 text-slate-800 animate-pulse duration-[7000ms]" />
            <HelpCircle className="absolute bottom-10 right-[30%] w-6 h-6 text-slate-800 animate-bounce duration-[6000ms]" />
            
            {/* Added Extra Points for "More" Effect */}
            <HelpCircle className="absolute top-1/3 left-[40%] w-4 h-4 text-indigo-900 animate-pulse duration-[2000ms]" />
            <HelpCircle className="absolute bottom-[40%] right-[10%] w-10 h-10 text-slate-900 animate-pulse duration-[3500ms]" />
            <HelpCircle className="absolute top-[15%] left-[80%] w-6 h-6 text-slate-800 animate-bounce duration-[8000ms]" />
            <HelpCircle className="absolute bottom-[10%] left-[5%] w-14 h-14 text-indigo-950/50 animate-pulse duration-[4500ms]" />
            <HelpCircle className="absolute top-[5%] right-[40%] w-5 h-5 text-slate-800 animate-pulse duration-[2500ms]" />
            <HelpCircle className="absolute top-[60%] left-[50%] w-20 h-20 text-slate-900/50 animate-pulse duration-[9000ms]" />
            <HelpCircle className="absolute bottom-[30%] left-[10%] w-8 h-8 text-slate-800 animate-bounce duration-[5500ms]" />
         </div>

         {/* Drawer Handle / Trigger */}
         <div 
            onClick={() => setShowBottomDrawer(!showBottomDrawer)}
            className="h-full w-full flex flex-col items-center pt-2 relative z-10 group"
         >
            <div className="w-16 h-1 bg-slate-700 rounded-full mb-2 group-hover:bg-indigo-500 transition-colors"></div>
            
            {!showBottomDrawer && (
               <div className="flex items-center gap-3 animate-pulse">
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm font-sans">
                     A Conclusão Inevitável
                  </span>
                  <Maximize2 className="w-3 h-3 text-indigo-400" />
               </div>
            )}
            
            {/* Drawer Content */}
            <div className={`w-full h-full overflow-y-auto px-6 pt-8 pb-24 text-center transition-opacity duration-500 ${showBottomDrawer ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
               
               <div className="max-w-4xl mx-auto mt-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-12">
                     <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                     <span className="text-xs font-mono text-indigo-200 tracking-widest uppercase">Fim do Módulo 1</span>
                  </div>

                  <h2 className="text-3xl md:text-6xl font-black text-white mb-10 tracking-tight leading-tight font-sans">
                    Agora a pergunta <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">INEVITÁVEL</span>:
                  </h2>
                  
                  <p className="text-lg md:text-3xl text-slate-300 font-light mb-16 leading-normal font-sans">
                    Como seus líderes estão sendo <br className="hidden md:block" /> formados hoje — na prática?
                    <br />
                    <span className="font-bold text-white block mt-6 text-xl md:text-4xl">Você tem método… ou tem sorte?</span>
                  </p>

                  <div className="flex flex-col items-center gap-8">
                    {/* STANDARD TECH BUTTON STYLE */}
                    <button 
                      onClick={() => setShowQR(true)}
                      className="group relative inline-flex items-center gap-4 px-12 py-6 bg-slate-900 border border-slate-700 hover:border-indigo-500 text-white rounded-sm transition-all duration-300 hover:bg-slate-800 shadow-2xl w-full md:w-auto justify-center"
                    >
                       <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                       <span className="font-mono uppercase tracking-widest text-base md:text-xl">Quero fazer o diagnóstico</span>
                       <ArrowRight className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                       
                       {/* Corner Accents */}
                       <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
                       <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
                    </button>
                    
                    <p className="text-sm md:text-base text-slate-500 max-w-md font-medium font-sans">
                      No Módulo 2, você vai responder um diagnóstico rápido e visualizar sua empresa numa matriz de risco 4 quadrantes.
                    </p>

                     <button className="mt-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm border border-slate-800 hover:border-slate-600 px-6 py-3 rounded-full uppercase tracking-wider font-mono">
                         <Download className="w-4 h-4" />
                         Resumo em 1 página
                     </button>
                  </div>
               </div>
            </div>

            {/* Close Button for Drawer */}
            {showBottomDrawer && (
               <button 
                  onClick={(e) => { e.stopPropagation(); setShowBottomDrawer(false); }}
                  className="absolute top-4 right-6 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white z-50"
               >
                  <ChevronDown className="w-6 h-6" />
               </button>
            )}
         </div>
      </div>

       {/* QR Code Modal */}
       {showQR && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-fade-in p-4">
            <div className="bg-slate-900 border border-white/10 p-8 md:p-12 rounded-2xl max-w-2xl w-full text-center relative shadow-2xl">
               <button 
                 onClick={() => setShowQR(false)}
                 className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>

               <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-mono uppercase mb-6">
                  <Smartphone className="w-4 h-4" />
                  Modo Participante
               </div>

               <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Aponte a câmera agora</h3>
               <p className="text-slate-400 text-lg mb-8">
                 Cada participante deve fazer seu próprio diagnóstico individualmente.<br/>
                 O resultado é privado e imediato.
               </p>

               <div className="bg-white p-4 rounded-xl inline-block mb-8">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(getParticipantUrl())}`} 
                    alt="QR Code" 
                    className="w-48 h-48 md:w-64 md:h-64"
                  />
               </div>
               
               <p className="text-sm text-slate-500 font-mono mb-8">
                  Ou acesse: <span className="text-indigo-400 border-b border-indigo-400/30">{window.location.host}</span>
               </p>

               <div className="border-t border-white/5 pt-8">
                 <button 
                    onClick={() => { setShowQR(false); onNextBlock(); }}
                    className="group relative w-full inline-flex items-center justify-center gap-4 px-8 py-4 bg-slate-900 border border-slate-700 hover:border-indigo-500 text-white rounded-sm transition-all duration-300 hover:bg-slate-800"
                 >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                    <span className="font-mono uppercase tracking-widest text-sm md:text-base">Iniciar Diagnóstico</span>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                    
                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
                 </button>
               </div>
            </div>
         </div>
       )}

    </div>
  );
};