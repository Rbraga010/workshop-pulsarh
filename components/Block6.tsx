import React, { useState } from 'react';
import { 
  AlertTriangle, ArrowRightLeft, Zap, Calendar, 
  Package, UserCheck, CreditCard, ArrowRight, X, Check, Crown
} from 'lucide-react';

type ItemId = 'problem' | 'contrast' | 'solution' | 'mechanics' | 'included' | 'target' | 'investment' | 'cta';

interface ContentItem {
  id: ItemId;
  icon: any;
  label: string;
  color: string;
  colSpan?: string;
}

export const Block6: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ItemId | null>(null);

  const items: ContentItem[] = [
    { id: 'problem', icon: AlertTriangle, label: 'O Problema Real', color: 'text-amber-500' },
    { id: 'contrast', icon: ArrowRightLeft, label: 'O que muda', color: 'text-slate-300' },
    { id: 'solution', icon: Crown, label: 'A Solução Natural', color: 'text-indigo-400', colSpan: 'md:col-span-2' },
    { id: 'mechanics', icon: Calendar, label: 'Como Funciona', color: 'text-cyan-400' },
    { id: 'included', icon: Package, label: 'O que está incluso', color: 'text-emerald-400' },
    { id: 'target', icon: UserCheck, label: 'Para quem é', color: 'text-slate-300' },
    { id: 'investment', icon: CreditCard, label: 'Investimento', color: 'text-white' },
    { id: 'cta', icon: Zap, label: 'Próximo Passo', color: 'text-indigo-400', colSpan: 'md:col-span-2' },
  ];

  const handleClose = () => setActiveItem(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>
      
      {/* CENTRAL FIXED BLOCK */}
      <div className={`relative z-10 text-center mb-12 transition-all duration-500 ${activeItem ? 'opacity-20 blur-sm scale-95' : 'opacity-100 scale-100'}`}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
           <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
           <span className="text-xs font-mono text-indigo-200 tracking-widest uppercase">Bloco Final</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl mx-auto leading-tight">
           "Nada do que você viu hoje se <br className="hidden md:block"/> sustenta sem acompanhamento."
        </h1>
        <p className="text-slate-400 text-lg font-light">
           Formar líderes exige método, correção e consistência — não eventos isolados.
        </p>
      </div>

      {/* INTERACTIVE GRID */}
      <div className={`relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full transition-all duration-500 ${activeItem ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
         {items.map((item) => (
            <button
               key={item.id}
               onClick={() => setActiveItem(item.id)}
               className={`
                  ${item.colSpan || ''}
                  bg-slate-900/40 border border-white/5 hover:border-white/20 hover:bg-slate-900/60
                  rounded-2xl p-6 flex flex-col items-center justify-center gap-4 group transition-all duration-300
                  hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm
               `}
            >
               <div className={`p-3 rounded-xl bg-slate-950 shadow-inner group-hover:scale-110 transition-transform ${item.color}`}>
                  <item.icon size={28} />
               </div>
               <span className="text-sm font-bold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                  {item.label}
               </span>
               {item.id === 'cta' && (
                  <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
               )}
            </button>
         ))}
      </div>

      {/* EXPANDED OVERLAY (MODAL) */}
      {activeItem && (
         <div className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in bg-slate-950/80 backdrop-blur-md">
            <div 
               className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative animate-slide-up flex flex-col max-h-full"
               onClick={(e) => e.stopPropagation()}
            >
               {/* Close Button */}
               <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 bg-slate-950 rounded-full text-slate-500 hover:text-white hover:bg-red-500/20 hover:text-red-400 transition-all z-20"
               >
                  <X size={24} />
               </button>

               <div className="overflow-y-auto p-8 md:p-12">
                  
                  {/* CONTENT: PROBLEM */}
                  {activeItem === 'problem' && (
                     <div className="text-center">
                        <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-6">O Problema Real</h2>
                        <div className="space-y-4 text-left max-w-md mx-auto mb-8 bg-slate-950/50 p-6 rounded-xl border border-amber-500/10">
                           <p className="flex items-center gap-3 text-slate-300">
                              <X className="w-5 h-5 text-red-500 shrink-0" />
                              Líderes não falham por falta de esforço.
                           </p>
                           <p className="flex items-center gap-3 text-slate-300">
                              <Check className="w-5 h-5 text-amber-500 shrink-0" />
                              Falham por ausência de formação estruturada.
                           </p>
                           <p className="flex items-center gap-3 text-slate-300">
                              <X className="w-5 h-5 text-red-500 shrink-0" />
                              Formação não acontece em palestras.
                           </p>
                           <p className="flex items-center gap-3 text-slate-300">
                              <Check className="w-5 h-5 text-amber-500 shrink-0" />
                              Acontece em rotina, decisão e correção.
                           </p>
                        </div>
                        <p className="text-xl text-amber-100 font-medium">
                           "Sem acompanhamento, o líder volta para o padrão antigo."
                        </p>
                     </div>
                  )}

                  {/* CONTENT: CONTRAST */}
                  {activeItem === 'contrast' && (
                     <div>
                        <div className="flex items-center justify-center gap-3 mb-8">
                           <ArrowRightLeft className="w-8 h-8 text-indigo-400" />
                           <h2 className="text-2xl font-bold text-white">O que muda com acompanhamento</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="bg-slate-950/50 p-6 rounded-xl border border-red-500/10">
                              <h3 className="text-red-400 font-bold mb-4 uppercase text-xs tracking-widest text-center">Sozinho (Atual)</h3>
                              <ul className="space-y-4">
                                 {['Dono decide tudo', 'Líder inseguro', 'Ruído constante', 'Dependência total'].map(i => (
                                    <li key={i} className="text-slate-400 flex items-center gap-2">
                                       <X className="w-4 h-4 text-red-500/50" /> {i}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div className="bg-indigo-900/10 p-6 rounded-xl border border-indigo-500/30">
                              <h3 className="text-indigo-400 font-bold mb-4 uppercase text-xs tracking-widest text-center">Com in.PULSO (Novo)</h3>
                              <ul className="space-y-4">
                                 {['Líder decide', 'Governança clara', 'Menos ruído', 'Dono estratégico'].map(i => (
                                    <li key={i} className="text-white flex items-center gap-2 font-medium">
                                       <Check className="w-4 h-4 text-indigo-400" /> {i}
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>
                  )}

                  {/* CONTENT: SOLUTION */}
                  {activeItem === 'solution' && (
                     <div className="text-center">
                        <Crown className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">in.PULSO.pro</h2>
                        <p className="text-indigo-300 text-lg font-light mb-8">Mentoria anual para líderes que lideram líderes.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
                           {[
                              'Formação prática de líderes',
                              'Governança aplicada',
                              'Sustentação de resultado',
                              'Redução da dependência do dono'
                           ].map((item, i) => (
                              <div key={i} className="bg-slate-950 p-4 rounded-lg border border-white/5 flex items-center gap-3">
                                 <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                                 <span className="text-slate-300">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* CONTENT: MECHANICS */}
                  {activeItem === 'mechanics' && (
                     <div className="text-center">
                        <Calendar className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-white mb-8">Como Funciona</h2>
                        <div className="space-y-4 max-w-sm mx-auto">
                           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                              <span className="text-slate-400">Duração</span>
                              <span className="text-white font-bold text-xl">12 Meses</span>
                           </div>
                           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                              <span className="text-slate-400">Encontros</span>
                              <span className="text-white font-bold">Quinzenais (Estratégicos)</span>
                           </div>
                           <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                              <span className="text-slate-400">Formato</span>
                              <span className="text-white font-bold">Grupo Fechado</span>
                           </div>
                           <div className="p-4 rounded-xl bg-cyan-900/20 border border-cyan-500/30 text-cyan-300 font-mono text-sm uppercase tracking-widest">
                              Apenas 2 vagas disponíveis
                           </div>
                        </div>
                     </div>
                  )}

                   {/* CONTENT: INCLUDED */}
                   {activeItem === 'included' && (
                     <div>
                        <div className="flex items-center justify-center gap-3 mb-8">
                           <Package className="w-8 h-8 text-emerald-400" />
                           <h2 className="text-2xl font-bold text-white">O que está incluso</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {[
                              'Curso Liderança Humanizada Aplicada (LHA)',
                              'Curso Governança PulsarH',
                              'Curso Gestão de Times de Vendas',
                              '30 dias do PULSE (IA de apoio)',
                              '50% OFF no MBA em Liderança',
                              'Sessão estratégica extra (Top 10)'
                           ].map((item, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 border-b border-white/5 last:border-0">
                                 <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                 <span className="text-slate-300">{item}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* CONTENT: TARGET */}
                  {activeItem === 'target' && (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                              <Check className="w-5 h-5" /> Para quem É
                           </h3>
                           <ul className="space-y-3">
                              {['Lidera líderes', 'Responde por decisões', 'Quer sair da operação', 'Busca estrutura real'].map((i) => (
                                 <li key={i} className="text-slate-300 text-sm py-2 border-b border-white/5">{i}</li>
                              ))}
                           </ul>
                        </div>
                        <div>
                           <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                              <X className="w-5 h-5" /> Para quem NÃO É
                           </h3>
                           <ul className="space-y-3">
                              {['Busca palestra', 'Evita decisão difícil', 'Não lidera ninguém', 'Quer atalho'].map((i) => (
                                 <li key={i} className="text-slate-500 text-sm py-2 border-b border-white/5">{i}</li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  )}

                  {/* CONTENT: INVESTMENT */}
                  {activeItem === 'investment' && (
                     <div className="text-center">
                        <CreditCard className="w-12 h-12 text-white mx-auto mb-6 opacity-80" />
                        <h2 className="text-xl font-mono text-slate-400 uppercase tracking-widest mb-4">Investimento Anual</h2>
                        <div className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                           <span className="text-2xl font-normal text-slate-500 align-top mr-2">R$</span>
                           3.000
                        </div>
                        <p className="text-slate-400 text-lg max-w-xs mx-auto">
                           "Menos que o custo de um único erro de liderança."
                        </p>
                     </div>
                  )}

                  {/* CONTENT: CTA */}
                  {activeItem === 'cta' && (
                     <div className="text-center py-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                           Você já viu onde está o risco.
                        </h2>
                        <p className="text-xl text-slate-300 mb-12 font-light">
                           Agora precisa decidir se vai formar seus líderes sozinho — ou com método.
                        </p>
                        
                        <a 
                           href="https://wa.me/5562999999999?text=Quero%20entrar%20no%20in.PULSO.pro" 
                           target="_blank"
                           rel="noreferrer"
                           className="group inline-flex items-center gap-4 px-12 py-6 bg-white text-indigo-900 font-black text-2xl rounded-2xl hover:scale-105 transition-transform shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                        >
                           Quero entrar no in.PULSO.pro
                           <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </a>
                     </div>
                  )}

               </div>
               
               {/* Click to close indicator (outside of button) */}
               <div 
                  className="bg-slate-950 border-t border-white/5 p-4 text-center cursor-pointer hover:bg-slate-900 transition-colors"
                  onClick={handleClose}
               >
                  <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">Fechar / Voltar ao Menu</span>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};