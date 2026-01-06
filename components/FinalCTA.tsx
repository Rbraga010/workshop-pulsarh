import React, { useState } from 'react';
import { ArrowRight, Download, QrCode, X, Smartphone } from 'lucide-react';

interface FinalCTAProps {
  onNextBlock: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onNextBlock }) => {
  const [showQR, setShowQR] = useState(false);

  const handleStartDiagnosis = () => {
    setShowQR(true);
  };

  const handlePresenterContinue = () => {
    setShowQR(false);
    onNextBlock();
  };

  return (
    <section 
      id="final-cta" 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 border-t border-white/5 bg-slate-950 scroll-mt-0 snap-start"
    >
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
       
       {/* Ambient Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none"></div>

       <div className="relative z-10 max-w-4xl mx-auto text-center">
         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-12 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            <span className="text-xs font-mono text-indigo-200 tracking-widest uppercase">Conclusão do Bloco 1</span>
         </div>

         <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tight leading-tight">
           Agora a pergunta <br />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">inevitável</span>:
         </h2>
         
         <p className="text-2xl md:text-4xl text-slate-300 font-light mb-16 leading-normal">
           Como seus líderes estão sendo <br className="hidden md:block" /> formados hoje — na prática?
           <br />
           <span className="font-bold text-white block mt-6 text-3xl md:text-5xl">Você tem método… ou tem sorte?</span>
         </p>

         <div className="flex flex-col items-center gap-8">
           <button 
             onClick={handleStartDiagnosis}
             className="group relative px-12 py-6 bg-indigo-600 text-white font-bold text-2xl rounded-xl hover:bg-indigo-500 transition-all duration-300 shadow-[0_0_50px_rgba(79,70,229,0.4)] hover:shadow-[0_0_80px_rgba(79,70,229,0.6)] flex items-center gap-4 transform hover:-translate-y-1"
           >
             Quero fazer o diagnóstico (Bloco 2)
             <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
           </button>
           
           <p className="text-base text-slate-500 max-w-md font-medium">
             No Bloco 2, você vai responder um diagnóstico rápido e visualizar sua empresa numa matriz de risco 4 quadrantes.
           </p>

            <button className="mt-8 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm border border-slate-800 hover:border-slate-600 px-6 py-3 rounded-full uppercase tracking-wider font-mono">
                <Download className="w-4 h-4" />
                Resumo em 1 página
            </button>
         </div>
       </div>

       {/* QR Code Modal */}
       {showQR && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-fade-in p-4">
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
                  {/* QR Code Generator using API for current URL */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(window.location.href)}`} 
                    alt="QR Code para o Diagnóstico" 
                    className="w-48 h-48 md:w-64 md:h-64"
                  />
               </div>
               
               <p className="text-sm text-slate-500 font-mono mb-8">
                  Ou acesse: <span className="text-indigo-400 border-b border-indigo-400/30">{window.location.host}</span>
               </p>

               <div className="border-t border-white/5 pt-8">
                 <button 
                    onClick={handlePresenterContinue}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                 >
                    Sou o Apresentador (Abrir na Tela)
                    <ArrowRight className="w-5 h-5" />
                 </button>
               </div>
            </div>
         </div>
       )}
    </section>
  );
};