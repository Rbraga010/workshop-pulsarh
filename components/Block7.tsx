import React from 'react';
import { 
  CheckCircle2, ArrowRight, ShieldAlert, Target, 
  TrendingUp, Crown, MessageSquare, Star, Play
} from 'lucide-react';

interface Block7Props {
  onRestart?: () => void;
}

export const Block7: React.FC<Block7Props> = ({ onRestart }) => {
  const timelineEvents = [
    {
      step: "01",
      title: "O Choque de Realidade",
      desc: "Você viu que o mercado não perdoa amadorismo. Líderes despreparados custam caro.",
      icon: ShieldAlert,
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      step: "02",
      title: "O Seu Diagnóstico",
      desc: "Você olhou para dentro. Viu a Dependência do Dono e a falta de Maturidade do time.",
      icon: Target,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    },
    {
      step: "03",
      title: "A Descoberta do Método",
      desc: "Entendeu que não é 'jeito', é técnica. Governança (PULSAR) + Liderança (LHA).",
      icon: TrendingUp,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20"
    },
    {
      step: "04",
      title: "A Decisão Final",
      desc: "Agora você tem duas opções: tentar implementar sozinho (risco) ou com mentoria (segurança).",
      icon: Crown,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 relative flex flex-col pb-24 font-sans selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        
        {/* Header */}
        <div className="text-center mb-24 animate-fade-in">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-8">
              <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              <span className="text-sm font-bold text-indigo-200 tracking-widest uppercase font-mono">Resumo da Ópera</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              A lógica é <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">irrefutável.</span>
           </h1>
           <p className="text-xl md:text-2xl text-slate-400 font-light max-w-3xl mx-auto">
              Não saia daqui com "dúvidas". Saia com um plano. <br/>
              Vamos recapitular o porquê você precisa do <strong>in.PULSO.pro</strong> agora.
           </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-3xl mx-auto mb-32">
           {/* Line */}
           <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-800 via-indigo-900 to-slate-800 -translate-x-1/2"></div>

           <div className="space-y-16">
              {timelineEvents.map((event, index) => {
                 const isEven = index % 2 === 0;
                 return (
                    <div key={index} className={`relative flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                       
                       {/* Content Card */}
                       <div className="flex-1 w-full pl-16 md:pl-0">
                          <div className={`p-8 rounded-2xl border bg-slate-900/80 backdrop-blur-sm shadow-2xl transition-all hover:scale-105 hover:border-white/20 ${event.border}`}>
                             <span className={`text-4xl font-black opacity-20 absolute top-4 right-6 ${event.color}`}>{event.step}</span>
                             <h3 className={`text-2xl font-bold text-white mb-3 flex items-center gap-3`}>
                                {event.title}
                             </h3>
                             <p className="text-lg text-slate-300 leading-relaxed font-light">
                                {event.desc}
                             </p>
                          </div>
                       </div>

                       {/* Center Node */}
                       <div className="absolute left-[15px] md:left-1/2 w-6 h-6 rounded-full border-4 border-slate-950 bg-white z-10 -translate-x-1/2 shadow-[0_0_20px_white]"></div>

                       {/* Spacer for alternate side */}
                       <div className="flex-1 hidden md:block"></div>
                    </div>
                 );
              })}
           </div>
        </div>

        {/* FINAL OFFER REINFORCEMENT */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/30 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.15)] animate-slide-up">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>

           <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10">
              O que você leva <span className="text-indigo-400">hoje</span>:
           </h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12 text-left">
              <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-white/5">
                 <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                 <div>
                    <h4 className="font-bold text-white text-lg">Mentoria Anual</h4>
                    <p className="text-slate-400 text-sm">Acompanhamento quinzenal ao vivo.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-white/5">
                 <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                 <div>
                    <h4 className="font-bold text-white text-lg">3 Cursos Completos</h4>
                    <p className="text-slate-400 text-sm">LHA + Governança + Gestão.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-white/5">
                 <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                 <div>
                    <h4 className="font-bold text-white text-lg">+ 3 Cadeiras Extras</h4>
                    <p className="text-slate-400 text-sm">Traga seus sócios ou gerentes.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-950/50 rounded-xl border border-white/5">
                 <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
                 <div>
                    <h4 className="font-bold text-white text-lg">Suporte Premium</h4>
                    <p className="text-slate-400 text-sm">Grupo exclusivo no WhatsApp.</p>
                 </div>
              </div>
           </div>

           <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="text-center">
                 <p className="text-slate-400 text-sm uppercase tracking-widest font-bold mb-2">Investimento Total</p>
                 <p className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                    <span className="text-2xl text-slate-500 font-normal align-top mr-2">12x</span>
                    250
                    <span className="text-2xl text-slate-500 font-bold">,00</span>
                 </p>
              </div>

              <a 
                 href="https://wa.me/5562999999999?text=Quero%20minha%20vaga%20no%20in.PULSO.pro" 
                 target="_blank"
                 rel="noreferrer"
                 className="group w-full max-w-md bg-white text-indigo-950 font-black text-2xl py-6 rounded-2xl hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-4"
              >
                 GARANTIR VAGA AGORA
                 <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-slate-500 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
                 <Star className="w-4 h-4 text-amber-400 inline mb-1 mr-1" />
                 <strong>Garantia de Risco Zero:</strong> Entre, participe do primeiro encontro, acesse a plataforma. Se achar que não é para você em 7 dias, devolvemos 100% do dinheiro.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};