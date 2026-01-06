import React, { useState } from 'react';
import { 
  Bot, BrainCircuit, Mic, Layout, Sparkles, 
  AlertTriangle, CheckCircle2, ArrowRight, Terminal, 
  MessageSquare, FileText, Network, XCircle, ShieldAlert,
  ChevronRight, Command
} from 'lucide-react';

interface Block5Props {
  onNextBlock?: () => void;
}

export const Block5: React.FC<Block5Props> = ({ onNextBlock }) => {
  const [phase, setPhase] = useState<'intro' | 'concept' | 'tools' | 'final'>('intro');
  const [activeToolId, setActiveToolId] = useState('chatgpt');

  const tools = [
    {
      id: 'chatgpt',
      name: 'ChatGPT / Gemini',
      icon: MessageSquare,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/50',
      bgGradient: 'from-emerald-500/20 to-emerald-900/5',
      role: 'Preparação & Simulação',
      usage: [
        "Preparar conversas difíceis antes de acontecerem.",
        "Estruturar roteiros de feedback baseados em fatos.",
        "Simular cenários de decisão de crise."
      ],
      prompts: [
        "Simule uma conversa difícil com um líder que entrega o número mas destrói o clima da equipe. Aja como o líder resistente.",
        "Me ajude a transformar esse erro operacional [descrever erro] em um roteiro de aprendizado, sem culpar pessoas."
      ]
    },
    {
      id: 'notion',
      name: 'Notion AI',
      icon: FileText,
      color: 'text-slate-200',
      borderColor: 'border-slate-500/50',
      bgGradient: 'from-slate-500/20 to-slate-900/5',
      role: 'Governança & Rituais',
      usage: [
        "Organização de rituais de governança.",
        "Acompanhamento de PDI de líderes.",
        "Criação instantânea de planos de ação pós-reunião."
      ],
      prompts: [
        "Com base nessas anotações de reunião, crie um plano de ação de 15 dias para desenvolver a autonomia desse líder.",
        "Transforme esse texto desorganizado em uma pauta de reunião de 30 minutos."
      ]
    },
    {
      id: 'fireflies',
      name: 'Fireflies / Otter',
      icon: Mic,
      color: 'text-indigo-400',
      borderColor: 'border-indigo-500/50',
      bgGradient: 'from-indigo-500/20 to-indigo-900/5',
      role: 'Auditoria de Padrões',
      usage: [
        "Registrar reuniões automaticamente.",
        "Identificar padrões de fala (quem interrompe quem).",
        "Reduzir ruído de comunicação e 'disse-me-disse'."
      ],
      prompts: [
        "Identifique falhas de decisão recorrentes nessa transcrição de reunião.",
        "Qual foi o percentual de tempo que eu falei versus meu time?"
      ]
    },
    {
      id: 'miro',
      name: 'Miro AI',
      icon: Layout,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/50',
      bgGradient: 'from-amber-500/20 to-amber-900/5',
      role: 'Visão Sistêmica',
      usage: [
        "Mapeamento visual de estrutura de times.",
        "Identificação visual de gargalos e dependência.",
        "Construção colaborativa de planos de sucessão."
      ],
      prompts: [
        "Crie um mapa mental dos riscos listados neste texto.",
        "Gere um fluxograma do processo de decisão atual para identificar gargalos."
      ]
    },
    {
      id: 'pulse',
      name: 'PULSE (PulsarH)',
      icon: Sparkles,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/50',
      bgGradient: 'from-cyan-500/20 to-cyan-900/5',
      isSpecial: true,
      role: 'Mentor de Bolso',
      usage: [
        "IA treinada na metodologia PulsarH.",
        "Apoio emocional + racional para o líder.",
        "Preparação de decisões com base em governança."
      ],
      prompts: [
        "Estou inseguro sobre demitir este líder. Me ajude a analisar os fatos racionalmente.",
        "Como dar esse feedback duro sem destruir a confiança dele?"
      ]
    }
  ];

  const activeToolData = tools.find(t => t.id === activeToolId) || tools[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative flex flex-col pb-24">
      {/* Cinematic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0 mix-blend-overlay pointer-events-none"></div>

      {/* HEADER */}
      <header className="pt-24 pb-8 px-6 max-w-7xl mx-auto w-full relative z-10 text-center">
         <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-8 animate-fade-in backdrop-blur-md">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono text-indigo-200 tracking-widest uppercase">Bloco 5 de 6 — Inteligência Artificial</span>
         </div>
         
         {phase === 'intro' && (
             <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight animate-slide-up">
               IA não substitui líderes.<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">IA expõe líderes despreparados.</span>
             </h1>
         )}
      </header>

      {/* PHASE 1: INTRO */}
      {phase === 'intro' && (
        <div className="flex-1 flex flex-col items-center justify-start px-6 animate-fade-in relative z-10 text-center">
           <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-16 font-light leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
             Quem não tem método, usa IA para criar textos vazios.<br/>
             Quem tem método, usa IA para <strong className="text-white">ampliar a capacidade de decisão.</strong>
           </p>

           <button 
             onClick={() => setPhase('concept')}
             className="group relative px-10 py-5 bg-white text-slate-950 font-bold text-xl rounded-xl hover:bg-indigo-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-3 animate-slide-up" style={{ animationDelay: '200ms' }}
           >
             <BrainCircuit className="w-6 h-6 text-indigo-600" />
             Entender o jeito certo
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      )}

      {/* PHASE 2: CONCEPT (NOT THIS vs THIS) */}
      {phase === 'concept' && (
        <div className="flex-1 max-w-6xl mx-auto w-full px-6 relative z-10 animate-slide-up">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* CARD: O QUE NÃO É */}
              <div className="bg-slate-900/40 backdrop-blur-md border border-red-900/30 p-10 rounded-2xl relative overflow-hidden group transition-all duration-500 hover:border-red-500/30">
                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-900"></div>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/20">
                        <ShieldAlert className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-red-100">O que IA <span className="text-red-500">NÃO</span> é</h2>
                 </div>
                 <ul className="space-y-6">
                    {[
                      "Muleta para líder que não sabe dar feedback.",
                      "Substituto de conversas olho no olho.",
                      "Gerador de e-mails frios para demissão.",
                      "Solução mágica para falta de cultura."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-400 group-hover:text-slate-300 transition-colors">
                         <XCircle className="w-5 h-5 text-red-500/50 shrink-0 mt-1" />
                         <span className="text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              {/* CARD: O QUE É */}
              <div className="bg-slate-900/40 backdrop-blur-md border border-emerald-900/30 p-10 rounded-2xl relative overflow-hidden group transition-all duration-500 hover:border-emerald-500/30">
                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-800"></div>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/20">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-emerald-100">O que IA <span className="text-emerald-500">É</span></h2>
                 </div>
                 <ul className="space-y-6">
                    {[
                      "Um copiloto que organiza seu pensamento.",
                      "Um auditor de padrões de liderança.",
                      "Um mentor de bolso (segunda opinião racional).",
                      "Acelerador de processos de governança."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-400 group-hover:text-slate-300 transition-colors">
                         <Bot className="w-5 h-5 text-emerald-500/50 shrink-0 mt-1" />
                         <span className="text-lg leading-relaxed">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="mt-16 text-center">
              <button 
                onClick={() => setPhase('tools')}
                className="group inline-flex items-center gap-3 px-8 py-4 border border-slate-700 hover:border-indigo-500 hover:bg-slate-900/80 bg-slate-950 text-slate-300 hover:text-white rounded-full transition-all text-lg font-medium"
              >
                <Command className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                Abrir Painel de Ferramentas
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      )}

      {/* PHASE 3: TOOLS DASHBOARD (MODERNIZED) */}
      {phase === 'tools' && (
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 relative z-10 animate-fade-in flex flex-col">
           
           {/* 1. TOP NAVIGATION (Like a modern App Switcher) */}
           <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tools.map((tool) => {
                 const isActive = activeToolId === tool.id;
                 const Icon = tool.icon;
                 return (
                    <button
                       key={tool.id}
                       onClick={() => setActiveToolId(tool.id)}
                       className={`
                          flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300
                          ${isActive 
                             ? `bg-slate-900 ${tool.borderColor} shadow-[0_0_20px_rgba(0,0,0,0.5)] scale-105` 
                             : 'bg-slate-950/50 border-white/5 hover:bg-slate-900 hover:border-white/10 text-slate-500 hover:text-slate-300'
                          }
                       `}
                    >
                       <Icon className={`w-5 h-5 ${isActive ? tool.color : ''}`} />
                       <span className={`font-bold text-sm ${isActive ? 'text-white' : ''}`}>{tool.name}</span>
                    </button>
                 )
              })}
           </div>

           {/* 2. MAIN ACTIVE CARD (Glassmorphism + Layout Split) */}
           <div className="flex-1 max-w-5xl mx-auto w-full">
              <div className={`
                  bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative
                  transition-all duration-500 animate-slide-up
              `}>
                 {/* Top Glow based on color */}
                 <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-${activeToolData.color.split('-')[1]}-500 to-transparent opacity-70`}></div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">
                    
                    {/* LEFT: CONTEXT & STRATEGY (2/5) */}
                    <div className="lg:col-span-2 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-slate-950/30">
                       <div className="flex items-center gap-4 mb-8">
                          <div className={`p-4 rounded-2xl bg-slate-900 border border-white/10 shadow-xl ${activeToolData.color}`}>
                             {React.createElement(activeToolData.icon, { size: 32 })}
                          </div>
                          <div>
                             <h2 className="text-2xl font-bold text-white leading-none mb-2">{activeToolData.name}</h2>
                             <span className={`text-xs font-mono uppercase tracking-widest px-2 py-1 rounded bg-slate-900 ${activeToolData.color}`}>
                                {activeToolData.role}
                             </span>
                          </div>
                       </div>

                       <div className="space-y-8">
                          <div>
                             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <BrainCircuit className="w-4 h-4" /> Aplicação Estratégica
                             </h3>
                             <ul className="space-y-4">
                                {activeToolData.usage.map((u, i) => (
                                   <li key={i} className="flex items-start gap-3 text-slate-300 leading-relaxed text-sm">
                                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${activeToolData.color.replace('text-', 'bg-')}`}></div>
                                      {u}
                                   </li>
                                ))}
                             </ul>
                          </div>

                          {activeToolData.isSpecial && (
                              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
                                 <p className="text-cyan-300 text-xs italic">
                                    "A única IA treinada especificamente no método PulsarH de liderança."
                                 </p>
                              </div>
                          )}
                       </div>
                    </div>

                    {/* RIGHT: PROMPTS (3/5) */}
                    <div className="lg:col-span-3 p-8 lg:p-10 bg-slate-950/60 relative">
                        <div className="flex items-center justify-between mb-6">
                           <div className="flex items-center gap-2">
                              <Terminal className="w-5 h-5 text-slate-400" />
                              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Console de Comando</span>
                           </div>
                           <div className="flex gap-1.5">
                              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           {activeToolData.prompts.map((prompt, i) => (
                              <div key={i} className="group relative">
                                 <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                                 <div className="relative bg-black/80 border border-white/10 p-5 rounded-lg font-mono text-sm shadow-xl">
                                    <div className="flex gap-3">
                                       <span className={`${activeToolData.color} font-bold select-none shrink-0`}>prompt {i+1} $</span>
                                       <p className="text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                                          {prompt}
                                       </p>
                                    </div>
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                       <span className="text-[10px] text-slate-500 uppercase tracking-widest border border-slate-700 px-1 rounded">Copy</span>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className="absolute bottom-8 right-8 left-8 text-center lg:text-right">
                           <p className="text-xs text-slate-600 font-mono">
                              // Copie estes prompts para testar agora.
                           </p>
                        </div>
                    </div>

                 </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="mt-12 text-center">
                 <button 
                   onClick={() => setPhase('final')}
                   className="text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto text-xs uppercase tracking-widest font-mono border-b border-transparent hover:border-white pb-1"
                 >
                    Próximo Passo
                    <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* PHASE 4: FINAL CONNECTION */}
      {phase === 'final' && (
         <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in relative z-10 text-center">
            
            <div className="max-w-4xl mx-auto mb-16 relative">
               <div className="absolute -inset-10 bg-indigo-500/10 blur-[100px] rounded-full"></div>
               <h2 className="relative text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                  Ferramentas ajudam. <br/>
                  <span className="text-indigo-400">Método sustenta.</span> <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Acompanhamento forma líderes.</span>
               </h2>
               <p className="relative text-slate-400 text-xl font-light max-w-2xl mx-auto">
                  A IA é apenas um amplificador da sua cultura atual. <br/>
                  Se a cultura é ruim, a IA vai escalar o caos mais rápido.
               </p>
            </div>

            <button 
               onClick={onNextBlock}
               className="group relative px-12 py-6 bg-white text-indigo-950 font-black text-2xl rounded-2xl transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:scale-105 hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] flex items-center gap-4"
            >
               Conhecer o in.PULSO.pro
               <div className="p-2 bg-indigo-950 rounded-full text-white group-hover:rotate-45 transition-transform duration-500">
                  <ArrowRight className="w-6 h-6" />
               </div>
            </button>
            
            <p className="mt-8 text-xs text-slate-600 font-mono uppercase tracking-widest">
               Direcionamento Estratégico Final
            </p>
         </div>
      )}

    </div>
  );
};