import React, { useState, useRef } from 'react';
import { 
  Check, ArrowRight, ChevronDown, ChevronUp, 
  Target, ShieldAlert, Zap, Users, Crown, 
  Gift, Smartphone, GraduationCap, UserCheck,
  Layout, Rocket, X, Menu, CreditCard, Sparkles,
  Play
} from 'lucide-react';

interface Block4Props {
  onNextBlock?: () => void;
}

export const Block4: React.FC<Block4Props> = ({ onNextBlock }) => {
  // --- STATE ---
  const [activeTimelineStep, setActiveTimelineStep] = useState<number | null>(null);
  const [showPromise, setShowPromise] = useState(false);
  const [showBonuses, setShowBonuses] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  
  // Accordion state inside the Arsenal cards
  const [openCard, setOpenCard] = useState<string | null>(null);

  // --- REFS FOR SCROLLING ---
  const promiseRef = useRef<HTMLDivElement>(null);
  const bonusRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  // --- HANDLERS ---
  const handleTimelineClick = (index: number) => {
    setActiveTimelineStep(index);
    if (index === 4) {
      // If last step (Next Step) is clicked
      setShowPromise(true);
      setTimeout(() => {
        promiseRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleShowBonuses = () => {
    setShowBonuses(true);
    setTimeout(() => {
      bonusRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleShowPrice = () => {
    setShowPrice(true);
    setTimeout(() => {
      priceRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const toggleCard = (id: string) => {
    setOpenCard(openCard === id ? null : id);
  }

  // --- DATA ---
  const timelineData = [
    {
      icon: Target,
      label: "Cenário",
      title: "Você viu o cenário atual",
      content: "Líderes despreparados geram riscos financeiros, jurídicos e emocionais reais. O mercado não perdoa amadorismo na gestão."
    },
    {
      icon: ShieldAlert,
      label: "Riscos",
      title: "Entendeu os riscos reais",
      content: "Má formação não é apenas 'clima ruim'. É passivo trabalhista, margem baixa, turnover alto e inércia estratégica."
    },
    {
      icon: Layout,
      label: "Diagnóstico",
      title: "Diagnosticou sua empresa",
      content: "Você viu sua posição no 4-Box (Dependência x Maturidade) e seu Radar de Riscos (Financeiro, Emocional, Jurídico, Inércia)."
    },
    {
      icon: Zap,
      label: "O Caminho",
      title: "Não é motivação",
      content: "O caminho é MÉTODO: Liderança Humanizada Aplicada + Governança Simples + Gestão de Performance."
    },
    {
      icon: ArrowRight,
      label: "Próximo Passo",
      title: "O passo natural",
      content: "Agora começa a fase de construção. Sair da teoria e ir para a prática assistida.",
      isAction: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative pb-32 font-sans overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>
      
      {/* ==========================================
          1. RECAPITULANDO A JORNADA (TIMELINE)
      ========================================== */}
      <section className="relative z-10 pt-24 pb-16 px-6 max-w-6xl mx-auto min-h-[80vh] flex flex-col justify-center">
        <div className="text-center mb-16 animate-fade-in">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Recapitulando a Jornada</span>
           </div>
           <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
              A lógica até aqui.
           </h1>
           <p className="text-slate-400">Clique nos ícones para revisar cada etapa.</p>
        </div>

        {/* TIMELINE COMPONENT */}
        <div className="relative">
           {/* Connecting Line */}
           <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 hidden md:block z-0"></div>
           
           <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {timelineData.map((step, index) => {
                 const isActive = activeTimelineStep === index;
                 const Icon = step.icon;
                 
                 return (
                    <div key={index} className="flex flex-col items-center relative group">
                       {/* Vertical Line for Mobile */}
                       <div className="absolute top-10 bottom-[-32px] w-1 bg-slate-800 md:hidden -z-10"></div>

                       <button 
                          onClick={() => handleTimelineClick(index)}
                          className={`
                             w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-xl relative
                             ${isActive 
                                ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-[0_0_20px_rgba(99,102,241,0.6)]' 
                                : 'bg-slate-900 border-slate-700 hover:border-indigo-500/50 text-slate-500 hover:text-white'
                             }
                          `}
                       >
                          <Icon className={`w-8 h-8 ${isActive ? 'text-white' : ''}`} />
                          {isActive && step.isAction && (
                             <div className="absolute inset-0 bg-indigo-500 rounded-2xl animate-ping opacity-30"></div>
                          )}
                       </button>

                       <span className={`mt-4 text-xs font-mono uppercase tracking-widest ${isActive ? 'text-indigo-400 font-bold' : 'text-slate-600'}`}>
                          {step.label}
                       </span>

                       {/* POPUP CONTENT (Visible when active) */}
                       <div className={`
                          mt-6 w-full md:absolute md:top-24 md:left-1/2 md:-translate-x-1/2 md:w-64 
                          bg-slate-900 border border-indigo-500/30 p-5 rounded-xl shadow-2xl z-20
                          transition-all duration-500 origin-top
                          ${isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none absolute hidden md:block'}
                       `}>
                          <h3 className="text-white font-bold mb-2">{step.title}</h3>
                          <p className="text-sm text-slate-400 leading-relaxed mb-4">{step.content}</p>
                          
                          {step.isAction && (
                             <div className="text-center pt-2 border-t border-white/10">
                                <span className="text-xs text-indigo-400 font-bold uppercase animate-pulse">
                                   Clique para Revelar a Solução
                                </span>
                                <ChevronDown className="w-4 h-4 text-indigo-400 mx-auto mt-1" />
                             </div>
                          )}
                          
                          {/* Triangle Pointer for Desktop */}
                          <div className="hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-t border-l border-indigo-500/30 rotate-45"></div>
                       </div>
                    </div>
                 )
              })}
           </div>
        </div>
      </section>

      {/* ==========================================
          2. A PROMESSA + ARSENAL (SPLIT LAYOUT)
      ========================================== */}
      {showPromise && (
        <section ref={promiseRef} className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-white/5 animate-slide-up scroll-mt-20">
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              
              {/* LEFT: THE COPY (PROMISE) */}
              <div className="lg:col-span-5 text-left sticky top-24">
                  <div className="mb-6">
                     <span className="text-indigo-500/20 font-black text-8xl tracking-tighter select-none block leading-none">90 DIAS</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative z-10 leading-[1.1]">
                     Agora começa a fase de <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">construção</span>.
                  </h2>

                  <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-light">
                     <strong>in.PULSO.pro</strong> é o programa de aceleração para formar líderes.<br/><br/>
                     Não é curso. Não é palestra. É formação contínua, com método, acompanhamento e aplicação real.
                  </p>

                  <div className="p-6 bg-slate-900 border-l-4 border-indigo-500 rounded-r-xl">
                     <p className="text-white italic font-medium">
                        "Formar líderes que decidem, sustentam resultados e reduzem drasticamente a dependência do dono."
                     </p>
                  </div>
              </div>

              {/* RIGHT: THE ARSENAL (VISUAL STACK) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                 
                 <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-2xl font-bold text-white">Arsenal in.PULSO.pro</h3>
                 </div>

                 {/* CARD 1: FORMAÇÃO (INDIGO/BLUE) */}
                 <div className={`
                    relative group transition-all duration-300 cursor-pointer
                    ${openCard === 'formacao' ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
                 `} onClick={() => toggleCard('formacao')}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative bg-slate-900 border border-indigo-500/30 p-6 md:p-8 rounded-2xl">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                             <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-500/20">
                                <GraduationCap className="w-8 h-8" />
                             </div>
                             <div>
                                <h4 className="text-xl font-bold text-white">1. Formação Completa</h4>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Os 3 Pilares da Gestão</p>
                             </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${openCard === 'formacao' ? 'bg-indigo-500 text-white rotate-180' : 'bg-slate-800 text-slate-400'}`}>
                             <ChevronDown className="w-4 h-4" />
                          </div>
                       </div>
                       
                       {/* EXPANDABLE CONTENT */}
                       <div className={`overflow-hidden transition-all duration-500 ${openCard === 'formacao' ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                          <div className="pt-4 border-t border-white/5 space-y-3">
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-indigo-400"/> Curso Liderança Humanizada Aplicada (LHA)</div>
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-indigo-400"/> Curso Governança PulsarH (Rituais)</div>
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-indigo-400"/> Curso Gestão de Pessoas & Performance</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* CARD 2: MENTORIA (PURPLE/PINK) */}
                 <div className={`
                    relative group transition-all duration-300 cursor-pointer
                    ${openCard === 'mentoria' ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
                 `} onClick={() => toggleCard('mentoria')}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative bg-slate-900 border border-purple-500/30 p-6 md:p-8 rounded-2xl">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                             <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400 border border-purple-500/20">
                                <Users className="w-8 h-8" />
                             </div>
                             <div>
                                <h4 className="text-xl font-bold text-white">2. Mentoria em Grupo</h4>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Trimestral (Quinzenal)</p>
                             </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${openCard === 'mentoria' ? 'bg-purple-500 text-white rotate-180' : 'bg-slate-800 text-slate-400'}`}>
                             <ChevronDown className="w-4 h-4" />
                          </div>
                       </div>
                       
                       {/* EXPANDABLE CONTENT */}
                       <div className={`overflow-hidden transition-all duration-500 ${openCard === 'mentoria' ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                          <div className="pt-4 border-t border-white/5 space-y-3">
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-purple-400"/> 6 Encontros ao Vivo (Acompanhamento)</div>
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-purple-400"/> Foco prático em decisão e governança</div>
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-purple-400"/> Ambiente de pares estratégicos</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* CARD 3: ESTRATÉGIA (EMERALD/CYAN) */}
                 <div className={`
                    relative group transition-all duration-300 cursor-pointer
                    ${openCard === 'estrategia' ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
                 `} onClick={() => toggleCard('estrategia')}>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative bg-slate-900 border border-emerald-500/30 p-6 md:p-8 rounded-2xl">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-5">
                             <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 border border-emerald-500/20">
                                <UserCheck className="w-8 h-8" />
                             </div>
                             <div>
                                <h4 className="text-xl font-bold text-white">3. Encontro Estratégico</h4>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">1:1 com Rodrigo Braga</p>
                             </div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all ${openCard === 'estrategia' ? 'bg-emerald-500 text-white rotate-180' : 'bg-slate-800 text-slate-400'}`}>
                             <ChevronDown className="w-4 h-4" />
                          </div>
                       </div>
                       
                       {/* EXPANDABLE CONTENT */}
                       <div className={`overflow-hidden transition-all duration-500 ${openCard === 'estrategia' ? 'max-h-64 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                          <div className="pt-4 border-t border-white/5 space-y-3">
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-emerald-400"/> Sessão individual exclusiva</div>
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-emerald-400"/> Traçar PDI e Plano de Sucessão</div>
                             <div className="flex items-center gap-3 text-slate-300"><Check className="w-4 h-4 text-emerald-400"/> Direcionamento de alto nível</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* TRIGGER FOR BONUSES */}
                 <div className="mt-8">
                     <button 
                        onClick={handleShowBonuses}
                        className="w-full py-5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-3 border border-white/5 hover:border-white/20 group"
                     >
                        <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
                        E tem mais... (Ver Bônus)
                     </button>
                 </div>

              </div>
           </div>
        </section>
      )}

      {/* ==========================================
          3. BÔNUS VIBRANTES (REVEALED)
      ========================================== */}
      {showBonuses && (
         <section ref={bonusRef} className="relative z-10 py-24 px-6 max-w-6xl mx-auto scroll-mt-10">
            <div className="text-center mb-12 animate-slide-up">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
                  <Gift className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">Aceleradores de Resultado</span>
               </div>
               <h2 className="text-4xl font-bold text-white">Bônus de Implementação</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
               {/* BONUS 1 */}
               <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-slate-900 p-8 rounded-2xl h-full flex flex-col items-center text-center border border-amber-500/20">
                     <Users className="w-12 h-12 text-amber-400 mb-4 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                     <h3 className="text-xl font-black text-white mb-2 uppercase italic">+ 3 Cadeiras</h3>
                     <p className="text-slate-400 text-sm">Traga 3 líderes do seu time para os encontros de mentoria.</p>
                     <span className="mt-auto pt-4 text-amber-400 font-bold text-xs uppercase tracking-widest">Valor: R$ 6.000 (OFF)</span>
                  </div>
               </div>

               {/* BONUS 2 */}
               <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-slate-900 p-8 rounded-2xl h-full flex flex-col items-center text-center border border-purple-500/20">
                     <GraduationCap className="w-12 h-12 text-purple-400 mb-4 drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                     <h3 className="text-xl font-black text-white mb-2 uppercase italic">50% OFF no MBA</h3>
                     <p className="text-slate-400 text-sm">Bolsa parcial no MBA em Liderança Humanizada para 100% dos seus líderes.</p>
                     <span className="mt-auto pt-4 text-purple-400 font-bold text-xs uppercase tracking-widest">Economia Real</span>
                  </div>
               </div>

               {/* BONUS 3 */}
               <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-slate-900 p-8 rounded-2xl h-full flex flex-col items-center text-center border border-cyan-500/20">
                     <Zap className="w-12 h-12 text-cyan-400 mb-4 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                     <h3 className="text-xl font-black text-white mb-2 uppercase italic">PULSE AI (30 dias)</h3>
                     <p className="text-slate-400 text-sm">IA especialista em Liderança Humanizada para suporte diário de decisões.</p>
                     <span className="mt-auto pt-4 text-cyan-400 font-bold text-xs uppercase tracking-widest">Acesso Premium</span>
                  </div>
               </div>
            </div>

            <div className="mt-12 text-center">
               <button 
                  onClick={handleShowPrice}
                  className="text-white hover:text-indigo-400 underline underline-offset-8 decoration-slate-700 transition-colors text-sm uppercase tracking-widest font-bold"
               >
                  Ver Investimento Final
               </button>
            </div>
         </section>
      )}

      {/* ==========================================
          4. PREÇO "VAREJO" + FUTURE PACE (SIDE BY SIDE)
      ========================================== */}
      {showPrice && (
         <section ref={priceRef} className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-white/5 bg-slate-950 scroll-mt-10 animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               
               {/* LEFT: FUTURE PACE (Vision) */}
               <div className="order-2 lg:order-1 text-left">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                     Imagine sua empresa daqui a <span className="text-indigo-400">90 dias</span>.
                  </h2>
                  
                  <div className="space-y-6">
                     {[
                        "Líderes decidindo sem escalar tudo para você.",
                        "Menos dependência, mais tempo estratégico.",
                        "Menos risco oculto (trabalhista/financeiro).",
                        "Governança instalada e rodando."
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className="w-8 h-8 rounded-full bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center shrink-0">
                              <Check className="w-4 h-4 text-emerald-400" />
                           </div>
                           <p className="text-slate-300 text-lg">{item}</p>
                        </div>
                     ))}
                  </div>

                  <div className="mt-12 p-6 bg-slate-900 rounded-xl border-l-4 border-indigo-500">
                     <p className="text-xl font-serif italic text-white leading-relaxed">
                        "Se você não forma seus líderes, <br/>
                        você vira o líder de tudo."
                     </p>
                  </div>
               </div>

               {/* RIGHT: COMMERCIAL PRICE CARD */}
               <div className="order-1 lg:order-2">
                  <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-12 shadow-[0_0_60px_rgba(255,255,255,0.15)] relative transform hover:scale-[1.02] transition-transform duration-300">
                     {/* Badge */}
                     <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl rounded-tr-xl uppercase tracking-widest">
                        Oferta Limitada
                     </div>

                     <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Acesso Trimestral Completo</p>
                     
                     {/* Price Display */}
                     <div className="flex items-end gap-2 mb-2">
                        <span className="text-xl text-slate-400 line-through mb-2">R$ 6.000</span>
                     </div>
                     <div className="flex items-start gap-1 mb-6">
                        <span className="text-4xl font-light text-slate-400 mt-2">12x</span>
                        <span className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter">250</span>
                        <div className="flex flex-col mt-2">
                           <span className="text-2xl font-bold text-slate-900">,00</span>
                           <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-1 rounded">SEM JUROS</span>
                        </div>
                     </div>

                     <div className="text-center mb-8 pb-8 border-b border-slate-200">
                        <p className="text-slate-500">ou <strong className="text-slate-900">R$ 3.000</strong> à vista</p>
                     </div>

                     {/* Main CTA */}
                     <a 
                        href="https://pay.hotmart.com/placeholder-link-inpulso" 
                        target="_blank"
                        rel="noreferrer"
                        className="w-full group flex items-center justify-center gap-4 px-6 py-5 bg-indigo-600 text-white font-black text-xl rounded-xl hover:bg-indigo-700 transition-all shadow-xl hover:shadow-2xl"
                     >
                        <CreditCard className="w-6 h-6" />
                        GARANTIR MINHA VAGA
                     </a>

                     <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                        Compra segura • Garantia de 7 dias
                     </p>

                     {/* QR Code trigger */}
                     <div className="mt-6 flex justify-center">
                        <Smartphone className="w-5 h-5 text-slate-300 mr-2" />
                        <span className="text-xs text-slate-400">Escaneie o QR Code na tela (se houver)</span>
                     </div>
                  </div>
               </div>

            </div>

            {/* Navigation to next block (if needed for workshop flow) */}
            {onNextBlock && (
               <div className="mt-24 text-center opacity-40 hover:opacity-100 transition-opacity">
                  <button onClick={onNextBlock} className="text-xs text-slate-600 hover:text-slate-400 flex items-center gap-1 mx-auto">
                     Continuar Workshop (Bloco 5) <ChevronDown className="w-3 h-3" />
                  </button>
               </div>
            )}
         </section>
      )}

    </div>
  );
};