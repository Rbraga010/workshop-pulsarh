import React, { useState } from 'react';
import { 
  Bot, BrainCircuit, Mic, Sparkles, 
  CheckCircle2, ArrowRight, Terminal, 
  MessageSquare, BookOpen, ShieldAlert,
  ChevronRight, Command, MonitorPlay, Library
} from 'lucide-react';

interface Block5Props {
  onNextBlock?: () => void;
}

export const Block5: React.FC<Block5Props> = ({ onNextBlock }) => {
  const [phase, setPhase] = useState<'intro' | 'concept' | 'tools' | 'final'>('intro');
  const [activeToolId, setActiveToolId] = useState('google');

  const tools = [
    {
      id: 'google',
      name: 'Google & NotebookLM',
      icon: Library,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/50',
      bgGradient: 'from-blue-600/20 to-blue-900/10',
      role: 'Segundo Cérebro & Estudo',
      usage: [
        "NotebookLM: Transforme PDFs, Manuais e Atas em 'Podcasts' de áudio para estudar no carro.",
        "Gemini no Workspace: Resumo automático de threads de e-mail e atas de reunião no Docs.",
        "Governança de Documentos Vivos: Centralizar o conhecimento da empresa."
      ],
      prompts: [
        "No NotebookLM: 'Crie um FAQ para novos líderes com base nestes 3 PDFs de cultura da empresa.'",
        "No Docs/Gemini: 'Resuma esta ata de reunião em uma tabela com: Ação, Responsável e Prazo.'"
      ]
    },
    {
      id: 'canva',
      name: 'Canva Magic',
      icon: MonitorPlay,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/50',
      bgGradient: 'from-purple-600/20 to-purple-900/10',
      role: 'Comunicação Visual',
      usage: [
        "Transformar documentos de texto (Docs) em Apresentações (Slides) em segundos.",
        "Criar Playbooks Visuais de processos (ninguém lê Word, todos leem visual).",
        "Magic Switch: Transformar um quadro branco de brainstorm em um resumo executivo."
      ],
      prompts: [
        "Magic Design: 'Crie uma apresentação de 5 slides sobre a nova meta de vendas trimestral, estilo corporativo moderno.'",
        "Text to Image: 'Crie uma capa para o playbook de cultura que represente agilidade e confiança.'"
      ]
    },
    {
      id: 'chatgpt',
      name: 'ChatGPT / Gemini',
      icon: MessageSquare,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/50',
      bgGradient: 'from-emerald-600/20 to-emerald-900/10',
      role: 'Simulação de Cenário',
      usage: [
        "Preparar conversas difíceis antes de acontecerem (Roleplay).",
        "Estruturar roteiros de feedback baseados apenas em fatos.",
        "Análise de vulnerabilidade em decisões estratégicas."
      ],
      prompts: [
        "Simule uma conversa difícil com um líder que entrega o número mas destrói o clima. Aja como o líder resistente.",
        "Analise esta minha decisão de demissão. O que estou ignorando? Seja crítico."
      ]
    },
    {
      id: 'fireflies',
      name: 'Fireflies / Otter',
      icon: Mic,
      color: 'text-orange-400',
      borderColor: 'border-orange-500/50',
      bgGradient: 'from-orange-600/20 to-orange-900/10',
      role: 'Auditoria de Padrões',
      usage: [
        "Gravar e transcrever reuniões automaticamente.",
        "Auditar quem fala mais: você ou seu time? (Percentual de fala).",
        "Identificar compromissos assumidos que foram esquecidos."
      ],
      prompts: [
        "Identifique na transcrição: Quais foram as 3 decisões finais e quem ficou responsável?",
        "Qual foi o sentimento predominante nesta reunião: defensivo ou colaborativo?"
      ]
    },
    {
      id: 'pulse',
      name: 'PULSE (PulsarH)',
      icon: Sparkles,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/50',
      bgGradient: 'from-cyan-600/20 to-cyan-900/10',
      isSpecial: true,
      role: 'Mentor de Bolso',
      usage: [
        "IA treinada exclusivamente na metodologia PulsarH.",
        "Apoio emocional + racional para o líder em tempo real.",
        "Tira-dúvidas sobre Rituais de Governança."
      ],
      prompts: [
        "Estou inseguro sobre promover esta pessoa. Me ajude a analisar os fatos com a matriz de maturidade.",
        "Como dar esse feedback duro sem destruir a confiança dele?"
      ]
    }
  ];

  const activeToolData = tools.find(t => t.id === activeToolId) || tools[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative flex flex-col pb-24 font-sans selection:bg-indigo-500/30">
      {/* Cinematic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 z-0 mix-blend-overlay pointer-events-none"></div>

      {/* HEADER */}
      <header className="pt-24 pb-12 px-6 max-w-7xl mx-auto w-full relative z-10 text-center">
         <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-10 animate-fade-in backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-bold text-indigo-200 tracking-widest uppercase font-mono">Bloco 5 • Inteligência Artificial</span>
         </div>
         
         {phase === 'intro' && (
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tight animate-slide-up">
               IA não substitui líderes.<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-400">IA expõe líderes despreparados.</span>
             </h1>
         )}
      </header>

      {/* PHASE 1: INTRO */}
      {phase === 'intro' && (
        <div className="flex-1 flex flex-col items-center justify-start px-6 animate-fade-in relative z-10 text-center">
           <p className="text-xl md:text-3xl text-slate-300 max-w-4xl mx-auto mb-20 font-light leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
             Quem não tem método, usa IA para criar textos vazios.<br/>
             Quem tem método, usa IA para <strong className="text-white font-bold decoration-indigo-500 underline underline-offset-4 decoration-2">ampliar a capacidade de decisão.</strong>
           </p>

           <button 
             onClick={() => setPhase('concept')}
             className="group relative px-12 py-6 bg-white text-slate-950 font-black text-xl md:text-2xl rounded-2xl hover:bg-indigo-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center gap-4 animate-slide-up hover:scale-105 active:scale-95 duration-300" style={{ animationDelay: '200ms' }}
           >
             <BrainCircuit className="w-8 h-8 text-indigo-600" />
             Entender o jeito certo
             <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      )}

      {/* PHASE 2: CONCEPT (NOT THIS vs THIS) */}
      {phase === 'concept' && (
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 relative z-10 animate-slide-up">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* CARD: O QUE NÃO É */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-red-900/40 p-10 md:p-14 rounded-3xl relative overflow-hidden group transition-all duration-500 hover:border-red-500/40 shadow-2xl">
                 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-red-900"></div>
                 <div className="flex items-center gap-5 mb-10">
                    <div className="p-4 bg-red-900/20 rounded-2xl border border-red-500/20 shadow-inner">
                        <ShieldAlert className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-red-50">O que IA <span className="text-red-500">NÃO</span> é</h2>
                 </div>
                 <ul className="space-y-6">
                    {[
                      "Muleta para líder que não sabe dar feedback.",
                      "Substituto de conversas 'olho no olho'.",
                      "Gerador de e-mails frios para demissão.",
                      "Solução mágica para falta de cultura."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-400 group-hover:text-red-200 transition-colors">
                         <div className="mt-1.5 p-1 bg-red-900/30 rounded-full">
                            <ArrowRight className="w-4 h-4 text-red-500" />
                         </div>
                         <span className="text-xl md:text-2xl leading-relaxed font-light">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              {/* CARD: O QUE É */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-emerald-900/40 p-10 md:p-14 rounded-3xl relative overflow-hidden group transition-all duration-500 hover:border-emerald-500/40 shadow-2xl">
                 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-800"></div>
                 <div className="flex items-center gap-5 mb-10">
                    <div className="p-4 bg-emerald-900/20 rounded-2xl border border-emerald-500/20 shadow-inner">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-emerald-50">O que IA <span className="text-emerald-500">É</span></h2>
                 </div>
                 <ul className="space-y-6">
                    {[
                      "Um copiloto que organiza seu pensamento.",
                      "Um auditor de padrões de liderança.",
                      "Um mentor de bolso (segunda opinião racional).",
                      "Acelerador de processos de governança."
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-400 group-hover:text-emerald-200 transition-colors">
                         <div className="mt-1.5 p-1 bg-emerald-900/30 rounded-full">
                            <Bot className="w-4 h-4 text-emerald-500" />
                         </div>
                         <span className="text-xl md:text-2xl leading-relaxed font-light">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>

           <div className="mt-20 text-center">
              <button 
                onClick={() => setPhase('tools')}
                className="group inline-flex items-center gap-4 px-10 py-5 border border-slate-700 hover:border-indigo-500 hover:bg-slate-900/80 bg-slate-950 text-slate-300 hover:text-white rounded-full transition-all text-xl font-bold tracking-wide"
              >
                <Command className="w-6 h-6 group-hover:text-indigo-400 transition-colors" />
                Abrir Painel de Ferramentas
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      )}

      {/* PHASE 3: TOOLS DASHBOARD (VISUAL & PREMIUM) */}
      {phase === 'tools' && (
        <div className="flex-1 w-full max-w-[1400px] mx-auto px-6 relative z-10 animate-fade-in flex flex-col">
           
           {/* 1. TOP NAVIGATION (Large Pills) */}
           <div className="flex flex-wrap justify-center gap-4 mb-16">
              {tools.map((tool) => {
                 const isActive = activeToolId === tool.id;
                 const Icon = tool.icon;
                 return (
                    <button
                       key={tool.id}
                       onClick={() => setActiveToolId(tool.id)}
                       className={`
                          flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300
                          ${isActive 
                             ? `bg-slate-900 ${tool.borderColor} shadow-[0_0_30px_rgba(0,0,0,0.3)] scale-110 z-10` 
                             : 'bg-slate-950/40 border-white/5 hover:bg-slate-900 hover:border-white/20 text-slate-500 hover:text-slate-300 scale-100'
                          }
                       `}
                    >
                       <Icon className={`w-6 h-6 ${isActive ? tool.color : ''}`} />
                       <span className={`font-bold text-base md:text-lg ${isActive ? 'text-white' : ''}`}>{tool.name}</span>
                    </button>
                 )
              })}
           </div>

           {/* 2. MAIN ACTIVE CARD (Glassmorphism + Layout Split) */}
           <div className="flex-1 w-full">
              <div className={`
                  bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl relative
                  transition-all duration-500 animate-slide-up min-h-[600px]
              `}>
                 {/* Top Glow based on color */}
                 <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-${activeToolData.color.split('-')[1]}-500 to-transparent opacity-80 shadow-[0_0_50px_currentColor] text-${activeToolData.color.split('-')[1]}-500`}></div>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                    
                    {/* LEFT: CONTEXT & STRATEGY (5/12) */}
                    <div className={`lg:col-span-5 p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br ${activeToolData.bgGradient}`}>
                       <div className="flex items-center gap-6 mb-12">
                          <div className={`p-6 rounded-3xl bg-slate-950 border border-white/10 shadow-2xl ${activeToolData.color}`}>
                             {React.createElement(activeToolData.icon, { size: 48 })}
                          </div>
                          <div>
                             <h2 className="text-4xl font-black text-white leading-none mb-3 tracking-tight">{activeToolData.name}</h2>
                             <span className={`text-sm font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-slate-950/50 border border-white/10 ${activeToolData.color}`}>
                                {activeToolData.role}
                             </span>
                          </div>
                       </div>

                       <div className="space-y-10">
                          <div>
                             <h3 className="text-base font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-3">
                                <BrainCircuit className="w-5 h-5" /> Aplicação Estratégica
                             </h3>
                             <ul className="space-y-6">
                                {activeToolData.usage.map((u, i) => (
                                   <li key={i} className="flex items-start gap-4 text-slate-200 leading-relaxed text-lg font-light">
                                      <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 shadow-[0_0_10px_currentColor] ${activeToolData.color}`}></div>
                                      {u}
                                   </li>
                                ))}
                             </ul>
                          </div>

                          {activeToolData.isSpecial && (
                              <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 relative overflow-hidden">
                                 <div className="absolute top-0 right-0 p-2 opacity-20"><Sparkles className="w-20 h-20 text-cyan-400" /></div>
                                 <p className="text-cyan-200 text-lg italic font-medium relative z-10">
                                    "A única IA treinada especificamente no método PulsarH de liderança, pronta para te aconselhar."
                                 </p>
                              </div>
                          )}
                       </div>
                    </div>

                    {/* RIGHT: PROMPTS (7/12) */}
                    <div className="lg:col-span-7 p-10 md:p-14 bg-slate-950/40 relative flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-10">
                           <div className="flex items-center gap-3">
                              <Terminal className="w-6 h-6 text-slate-400" />
                              <span className="text-base font-bold text-slate-400 uppercase tracking-wider">Console de Comando</span>
                           </div>
                           <div className="flex gap-2">
                              <div className="w-3 h-3 rounded-full bg-red-500/40 border border-red-500/50"></div>
                              <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500/50"></div>
                              <div className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/50"></div>
                           </div>
                        </div>

                        <div className="space-y-6">
                           {activeToolData.prompts.map((prompt, i) => (
                              <div key={i} className="group relative">
                                 <div className={`absolute -inset-0.5 bg-gradient-to-r ${activeToolData.bgGradient} rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-700`}></div>
                                 <div className="relative bg-black/60 border border-white/10 p-8 rounded-xl font-mono text-base md:text-lg shadow-xl backdrop-blur-md">
                                    <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                                       <span className={`${activeToolData.color} font-bold select-none shrink-0 opacity-80 pt-1`}>prompt_0{i+1} $</span>
                                       <p className="text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                                          {prompt}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className="mt-12 text-center lg:text-right">
                           <p className="text-sm text-slate-500 font-mono">
                              // Copie estes prompts para testar agora.
                           </p>
                        </div>
                    </div>

                 </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="mt-16 text-center">
                 <button 
                   onClick={() => setPhase('final')}
                   className="text-slate-400 hover:text-white transition-all hover:scale-105 inline-flex items-center justify-center gap-3 mx-auto text-sm uppercase tracking-[0.2em] font-bold border-b-2 border-transparent hover:border-white pb-2"
                 >
                    Avançar para Conclusão
                    <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* PHASE 4: FINAL CONNECTION */}
      {phase === 'final' && (
         <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in relative z-10 text-center">
            
            <div className="max-w-5xl mx-auto mb-20 relative">
               <div className="absolute -inset-20 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>
               <h2 className="relative text-5xl md:text-7xl font-black text-white mb-10 leading-tight">
                  Ferramentas ajudam. <br/>
                  <span className="text-indigo-400">Método sustenta.</span> <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Acompanhamento forma líderes.</span>
               </h2>
               <p className="relative text-slate-300 text-2xl md:text-3xl font-light max-w-3xl mx-auto leading-normal">
                  A IA é apenas um amplificador da sua cultura atual. <br/>
                  <span className="text-slate-500">Se a cultura é ruim, a IA vai escalar o caos mais rápido.</span>
               </p>
            </div>

            <button 
               onClick={onNextBlock}
               className="group relative px-16 py-8 bg-white text-indigo-950 font-black text-2xl md:text-3xl rounded-3xl transition-all shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-[0_0_100px_rgba(255,255,255,0.4)] flex items-center gap-6"
            >
               Conhecer o in.PULSO.pro
               <div className="p-3 bg-indigo-950 rounded-full text-white group-hover:rotate-45 transition-transform duration-500">
                  <ArrowRight className="w-8 h-8" />
               </div>
            </button>
            
            <p className="mt-10 text-sm text-slate-500 font-mono uppercase tracking-widest font-bold">
               Direcionamento Estratégico Final
            </p>
         </div>
      )}

    </div>
  );
};