import React from 'react';
import { ArrowDown, Activity, Terminal } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToContent = () => {
    const element = document.getElementById('block1-dashboard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-slate-950 font-sans">
      {/* Background Ambience & Pulse Effect */}
      <div className="absolute inset-0 bg-slate-950 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        {/* Grid Overlay for Tech feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full">
        
        {/* Badge corrigido */}
        <div className="inline-flex items-center gap-3 px-4 py-2 border-b border-red-500/50 mb-12 animate-fade-in">
          <Terminal className="w-4 h-4 text-red-500" />
          <span className="text-xs font-mono text-red-400 tracking-[0.2em] uppercase">Diagnóstico Estratégico da Formação de Líderes</span>
        </div>

        {/* 4-Line Uppercase Headline - Tech/Corporate Style with Vibrant Gradients */}
        <div className="mb-14 animate-slide-up relative">
          {/* Decorative side lines */}
          <div className="hidden md:block absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
          <div className="hidden md:block absolute -right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>

          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] uppercase font-sans">
            <span className="block text-slate-100 opacity-90">Liderança Despreparada</span>
            <span className="block text-slate-500 font-light">Não é só problema de clima.</span>
            
            {/* Gradients aplicados nas palavras chave */}
            <span className="block text-white">
              É risco <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 font-extrabold">Financeiro</span>, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 font-extrabold">Jurídico</span>,
            </span>
            <span className="block text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 font-extrabold">Emocional</span> e de <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 font-extrabold">Inércia</span>.
            </span>
          </h1>
        </div>

        <div className="max-w-3xl mx-auto mb-16 space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <p className="text-base md:text-xl text-slate-400 leading-relaxed font-light border-l-2 border-indigo-500/30 pl-6 text-left md:text-center md:border-l-0 md:pl-0 font-sans">
            O mercado já provou isso com dados. Agora você vai enxergar como a forma atual de formar líderes gera riscos silenciosos — <strong className="text-white font-medium">mesmo com bons resultados aparentes.</strong>
          </p>
        </div>

        <div className="flex justify-center animate-slide-up" style={{ animationDelay: '400ms' }}>
          {/* Tech Button */}
          <button 
            onClick={scrollToContent}
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-slate-900 border border-slate-700 hover:border-indigo-500 text-white rounded-sm transition-all duration-300 hover:bg-slate-800 w-full md:w-auto justify-center"
          >
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
             <span className="font-mono uppercase tracking-widest text-sm">Iniciar Análise de Cenário</span>
             <ArrowDown className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
             
             {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
          </button>
        </div>
      </div>
    </section>
  );
};