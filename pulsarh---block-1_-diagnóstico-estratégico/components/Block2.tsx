import React, { useState, useEffect } from 'react';
import { 
  Activity, BarChart3, Printer, AlertTriangle, 
  CheckCircle2, Terminal, Search, Target, ShieldAlert,
  BrainCircuit, Lock, Scale, DollarSign, HeartCrack,
  ArrowRight, ChevronDown, Plus, Check
} from 'lucide-react';

// --- TYPES & DATA ---

type Category = 'dependencia' | 'maturidade' | 'financeiro' | 'emocional' | 'juridico' | 'inercia';

type Question = {
  id: string;
  category: Category;
  text: string;
  minLabel: string; // 0 (Caos)
  maxLabel: string; // 10 (Ideal)
};

// AS 30 PERGUNTAS (TEXTO ORIGINAL DO PROMPT)
const RAW_QUESTIONS: Question[] = [
  // BLOCO A — DEPENDÊNCIA DO DONO (Eixo Vertical Quadrante)
  {
    id: 'A1', category: 'dependencia',
    text: "Se você ficar 7 dias fora (sem WhatsApp), quanto a operação perde ritmo?",
    minLabel: "Metas travam, decisões param, equipe espera.",
    maxLabel: "Operação mantém ritmo, decisões seguem."
  },
  {
    id: 'A2', category: 'dependencia',
    text: "Quantas decisões críticas do dia a dia só acontecem com sua aprovação direta?",
    minLabel: "Quase tudo; sou o 'sinal verde' de tudo.",
    maxLabel: "Decisões têm dono claro; aprovo só a exceção."
  },
  {
    id: 'A3', category: 'dependencia',
    text: "Quando surge um problema entre líderes, quem resolve primeiro?",
    minLabel: "Eu entro sempre; sem mim escala ou paralisa.",
    maxLabel: "Líderes resolvem com método; entro só no extremo."
  },
  {
    id: 'A4', category: 'dependencia',
    text: "Se você tirar 2 semanas de férias, o que acontece com vendas e entrega?",
    minLabel: "Queda forte, retrabalho, urgências explodem.",
    maxLabel: "Estabilidade; rotinas seguem com previsibilidade."
  },
  {
    id: 'A5', category: 'dependencia',
    text: "Hoje, o “sistema” da empresa está onde?",
    minLabel: "Na minha cabeça; ninguém sabe sem mim.",
    maxLabel: "Em processos, rituais e indicadores."
  },

  // BLOCO B — MATURIDADE DOS LÍDERES (Eixo Horizontal Quadrante)
  {
    id: 'B1', category: 'maturidade',
    text: "Quando um líder erra uma decisão importante, o que acontece na prática?",
    minLabel: "Pânico, caça aos culpados, time trava.",
    maxLabel: "Análise de causa, correção e aprendizado."
  },
  {
    id: 'B2', category: 'maturidade',
    text: "Seus líderes sustentam uma estratégia por semanas sem “trocar a rota”?",
    minLabel: "Mudam toda semana; urgência vira prioridade.",
    maxLabel: "Mantêm consistência; mudam só com critério."
  },
  {
    id: 'B3', category: 'maturidade',
    text: "Em pressão alta (meta + crise), como seus líderes se comportam?",
    minLabel: "Reativos, emocionais, pedem direção.",
    maxLabel: "Estruturam plano, priorizam e executam."
  },
  {
    id: 'B4', category: 'maturidade',
    text: "Seus líderes tomam decisões sem depender de você para “validar”?",
    minLabel: "Evitam decidir; sobem tudo para mim.",
    maxLabel: "Decidem dentro de alçadas definidas."
  },
  {
    id: 'B5', category: 'maturidade',
    text: "Você confia que seus líderes operam bem em contextos diferentes?",
    minLabel: "Quebram em crise ou mudança.",
    maxLabel: "Performam em estabilidade e crise."
  },

  // BLOCO C — SAÚDE FINANCEIRA (Radar)
  {
    id: 'C1', category: 'financeiro',
    text: "A receita depende diretamente da sua presença em negociações/fechamentos?",
    minLabel: "Sem mim a receita cai; fechamentos travam.",
    maxLabel: "Máquina funciona com líderes e processo."
  },
  {
    id: 'C2', category: 'financeiro',
    text: "Existe previsibilidade de vendas (pipeline, conversão, metas por canal)?",
    minLabel: "“Achismo”; metas são esperança.",
    maxLabel: "Funil mensurável; previsibilidade real."
  },
  {
    id: 'C3', category: 'financeiro',
    text: "A empresa sabe exatamente onde perde dinheiro (margem, retrabalho, churn)?",
    minLabel: "Não sabe; descobre tarde; apaga incêndio.",
    maxLabel: "Sabe por indicador; corrige cedo."
  },
  {
    id: 'C4', category: 'financeiro',
    text: "Se um líder chave sai, o impacto financeiro é controlado?",
    minLabel: "Impacto enorme; receita desorganiza.",
    maxLabel: "Absorvido por estrutura; reposição previsível."
  },
  {
    id: 'C5', category: 'financeiro',
    text: "As decisões comerciais travam por falta de regra, preço, política ou alçada?",
    minLabel: "Travam sempre; dependem do dono.",
    maxLabel: "Regras claras; autonomia com governança."
  },

  // BLOCO D — SAÚDE EMOCIONAL (Radar)
  {
    id: 'D1', category: 'emocional',
    text: "Você absorve tensão do time e leva problemas para casa com frequência?",
    minLabel: "Quase sempre; mente não desliga.",
    maxLabel: "Governo com limites; sistema trata a tensão."
  },
  {
    id: 'D2', category: 'emocional',
    text: "Você sente culpa quando delega decisões críticas?",
    minLabel: "Sinto culpa e puxo de volta.",
    maxLabel: "Delego com método e acompanho indicador."
  },
  {
    id: 'D3', category: 'emocional',
    text: "Seu nível de pressão é previsível ou você vive em picos constantes?",
    minLabel: "Picos constantes; urgência domina.",
    maxLabel: "Pressão gerenciável; rotina protegida."
  },
  {
    id: 'D4', category: 'emocional',
    text: "Conflitos internos drenam você ou são resolvidos por líderes e processos?",
    minLabel: "Drenam-me; viro juiz o tempo todo.",
    maxLabel: "Têm rito e responsáveis; entro só se precisar."
  },
  {
    id: 'D5', category: 'emocional',
    text: "Você consegue tirar tempo real de recuperação sem sentir que tudo vai desmoronar?",
    minLabel: "Não consigo; descanso vira culpa.",
    maxLabel: "Consigo; descanso é parte do sistema."
  },

  // BLOCO E — SAÚDE JURÍDICO/INSTITUCIONAL (Radar)
  {
    id: 'E1', category: 'juridico',
    text: "Processos críticos estão documentados ou “na cabeça” das pessoas?",
    minLabel: "Na cabeça; perda de gente gera colapso.",
    maxLabel: "Documentados; treináveis; auditáveis."
  },
  {
    id: 'E2', category: 'juridico',
    text: "Decisões sensíveis (contratos, comissões, políticas) ficam registradas?",
    minLabel: "Verbal/WhatsApp; risco de passivo.",
    maxLabel: "Registradas formalmente; critérios claros."
  },
  {
    id: 'E3', category: 'juridico',
    text: "Existe clareza de responsabilidade (quem decide o quê, alçadas)?",
    minLabel: "Confuso; todo mundo faz tudo.",
    maxLabel: "Claro; alçadas definidas; rastreável."
  },
  {
    id: 'E4', category: 'juridico',
    text: "Você já teve “surpresas” legais/operacionais por falta de controle?",
    minLabel: "Recorrente; incêndios por ausência de regra.",
    maxLabel: "Raro; controles antecipam riscos."
  },
  {
    id: 'E5', category: 'juridico',
    text: "A empresa teria condições de provar “como decidiu” algo importante?",
    minLabel: "Não; sem trilha; risco alto.",
    maxLabel: "Sim; trilha clara e justificada."
  },

  // BLOCO F — SAÚDE DE INÉRCIA (Radar)
  {
    id: 'F1', category: 'inercia',
    text: "Projetos estratégicos vivem sendo adiados por urgências?",
    minLabel: "Sempre; estratégia vira “plano bonito”.",
    maxLabel: "Quase nunca; execução é ritual."
  },
  {
    id: 'F2', category: 'inercia',
    text: "Você sabe o que precisa fazer, mas não executa por falta de estrutura?",
    minLabel: "Sim; repetimos promessas e não entregamos.",
    maxLabel: "Não; estrutura transforma decisão em ação."
  },
  {
    id: 'F3', category: 'inercia',
    text: "A empresa cresce menos do que poderia por falta de ritmo e consistência?",
    minLabel: "Sim; oportunidades passam.",
    maxLabel: "Não; crescimento vem de execução consistente."
  },
  {
    id: 'F4', category: 'inercia',
    text: "Existe um ciclo de melhoria contínua (testar, ajustar, sustentar)?",
    minLabel: "Não; tudo recomeça do zero.",
    maxLabel: "Sim; aprendizados viram padrão."
  },
  {
    id: 'F5', category: 'inercia',
    text: "Prioridades são claras e protegidas na agenda, ou mudam no impulso?",
    minLabel: "Mudam no impulso; urgência manda.",
    maxLabel: "Claras; mudanças só com critério."
  }
];

// --- COMPONENT ---

interface Block2Props {
  onFinish: (scores: Record<string, number>) => void;
  isParticipant?: boolean;
}

export const Block2: React.FC<Block2Props> = ({ onFinish, isParticipant = false }) => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'calculating' | 'results'>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  // States for Results
  const [matrixScores, setMatrixScores] = useState({ dep: 0, mat: 0 });
  const [radarScores, setRadarScores] = useState({ fin: 0, emo: 0, jur: 0, ine: 0 });

  // Shuffle questions on mount
  useEffect(() => {
    const shuffled = [...RAW_QUESTIONS].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  const handleAnswer = (val: number) => {
    const q = questions[currentIdx];
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);

    if (currentIdx < questions.length - 1) {
      setTimeout(() => setCurrentIdx(prev => prev + 1), 200);
    } else {
      calculateAndFinish(newAnswers);
    }
  };

  const calculateAndFinish = (finalAnswers: Record<string, number>) => {
    setStep('calculating');

    // Helper to calc average
    const calcAvg = (cat: Category) => {
      const qs = RAW_QUESTIONS.filter(q => q.category === cat);
      const sum = qs.reduce((acc, q) => acc + (finalAnswers[q.id] || 0), 0);
      return sum / qs.length;
    };

    const depScore = calcAvg('dependencia');
    const matScore = calcAvg('maturidade');
    
    // Matrix Coordinates
    const yVal = 10 - depScore; 
    const xVal = matScore;

    const fin = calcAvg('financeiro');
    const emo = calcAvg('emocional');
    const jur = calcAvg('juridico');
    const ine = calcAvg('inercia');

    setMatrixScores({ dep: yVal, mat: xVal });
    setRadarScores({ fin, emo, jur, ine });

    setTimeout(() => setStep('results'), 2000);
  };

  const progressPct = questions.length > 0 ? ((currentIdx) / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans relative overflow-hidden flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] z-0 pointer-events-none"></div>

      {step === 'intro' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-indigo-500/30 bg-indigo-500/10 mb-8 rounded-full">
             <Target className="w-4 h-4 text-indigo-400 animate-pulse" />
             <span className="text-xs font-mono text-indigo-300 tracking-widest uppercase">
                {isParticipant ? 'Área do Participante' : 'Módulo 2 — Diagnóstico'}
             </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            PULSARH<span className="text-indigo-500">.SCAN</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
             Este não é um teste motivacional. <br/>
             É um diagnóstico executivo de <strong>Governança, Liderança e Risco.</strong>
             <br/><br/>
             <span className="text-slate-500 text-sm block mt-4 border-t border-white/5 pt-4">
               Seu papel é ser brutalmente honesto. Dúvida conta como fragilidade.<br/>
               Vamos medir sua posição na <strong>Matriz 4-Box</strong> e seu <strong>Radar de Risco</strong>.
             </span>
          </p>

          <button 
             onClick={() => setStep('quiz')}
             className="group relative inline-flex items-center gap-4 px-12 py-6 bg-slate-900 border border-slate-700 hover:border-indigo-500 text-white rounded-sm transition-all duration-300 hover:bg-slate-800 shadow-[0_0_50px_rgba(79,70,229,0.3)]"
          >
             <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
             <span className="font-mono uppercase tracking-widest text-lg md:text-xl">Iniciar Agora</span>
             <ArrowRight className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
             
             {/* Corner Accents */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
          </button>
        </div>
      )}

      {step === 'quiz' && questions.length > 0 && (
         <div className="flex-1 flex flex-col justify-center items-center z-10 px-6 pb-12 pt-48 relative">
            
            {/* Enhanced Progress Bar - Positioned below main nav (top-16) with solid background */}
            <div className="fixed top-16 left-0 right-0 z-40 bg-slate-950 border-b border-white/5 shadow-xl">
               <div className="h-4 bg-slate-900 w-full relative">
                  <div 
                     className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-500 ease-out relative" 
                     style={{ width: `${progressPct}%` }}
                  >
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-full bg-white/50"></div>
                  </div>
               </div>
               <div className="py-3 px-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest hidden md:inline">Diagnóstico em Andamento</span>
                  <span className="font-mono text-white text-sm font-bold ml-auto md:ml-0">
                     Questão <span className="text-indigo-400">{currentIdx + 1}</span> de {questions.length}
                  </span>
               </div>
            </div>

            <div className="max-w-4xl w-full animate-slide-up">
               <div className="mb-12 text-center">
                  <span className="inline-block px-3 py-1 rounded border border-white/10 bg-slate-900 text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-6">
                     Análise Situacional
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                     {questions[currentIdx].text}
                  </h2>
               </div>

               {/* Didactic Scenarios */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="bg-red-950/10 border border-red-900/30 p-6 rounded-xl text-left hover:bg-red-900/20 transition-colors relative group">
                     <p className="text-[10px] text-red-500 font-mono uppercase tracking-wider mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        Se a realidade é...
                     </p>
                     <div className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                        <p className="text-red-200/80 text-lg leading-relaxed">{questions[currentIdx].minLabel}</p>
                     </div>
                     <div className="absolute top-4 right-4 bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold border border-red-500/30">
                        NOTA 0
                     </div>
                  </div>

                  <div className="bg-emerald-950/10 border border-emerald-900/30 p-6 rounded-xl text-right hover:bg-emerald-900/20 transition-colors relative group">
                     <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-wider mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        Se a realidade é...
                     </p>
                     <div className="flex flex-row-reverse items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                        <p className="text-emerald-200/80 text-lg leading-relaxed">{questions[currentIdx].maxLabel}</p>
                     </div>
                     <div className="absolute top-4 left-4 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold border border-emerald-500/30">
                        NOTA 10
                     </div>
                  </div>
               </div>

               {/* Score Grid */}
               <div className="space-y-4">
                  <p className="text-center text-slate-500 text-sm font-mono uppercase tracking-widest">
                     Qual nota define sua empresa hoje?
                  </p>
                  <div className="grid grid-cols-11 gap-2 md:gap-3">
                     {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
                        let color = "border-slate-800 bg-slate-900/50 text-slate-500 hover:bg-slate-800 hover:text-white";
                        if (val <= 3) color = "border-red-900/30 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-600";
                        else if (val <= 6) color = "border-amber-900/30 text-amber-500 hover:bg-amber-600 hover:text-white hover:border-amber-600";
                        else color = "border-emerald-900/30 text-emerald-500 hover:bg-emerald-600 hover:text-white hover:border-emerald-600";
                        
                        return (
                           <button
                              key={val}
                              onClick={() => handleAnswer(val)}
                              className={`h-14 md:h-20 rounded border font-mono text-lg md:text-2xl font-bold transition-all duration-200 ${color} flex items-center justify-center transform hover:scale-105 active:scale-95`}
                           >
                              {val}
                           </button>
                        )
                     })}
                  </div>
                  <div className="flex justify-between px-1 text-[10px] uppercase font-mono text-slate-600">
                     <span>Caos Absoluto</span>
                     <span>Maturidade Ideal</span>
                  </div>
               </div>
            </div>
         </div>
      )}

      {step === 'calculating' && (
         <div className="flex-1 flex flex-col items-center justify-center z-10 animate-fade-in">
            <div className="w-20 h-20 border-t-2 border-r-2 border-indigo-500 rounded-full animate-spin mb-8"></div>
            <h2 className="text-3xl font-bold text-white mb-2">Processando Dados</h2>
            <p className="text-slate-400 font-mono text-sm">Cruzando vetores de dependência e risco...</p>
         </div>
      )}

      {step === 'results' && (
         <ResultsView 
            matrix={matrixScores}
            radar={radarScores}
            onFinish={() => onFinish({ ...radarScores, dep: matrixScores.dep, mat: matrixScores.mat })}
            isParticipant={isParticipant}
         />
      )}
    </div>
  );
};

// --- SUB-COMPONENTS FOR RESULTS ---

const ResultsView: React.FC<{
   matrix: { dep: number, mat: number },
   radar: { fin: number, emo: number, jur: number, ine: number },
   onFinish: () => void,
   isParticipant: boolean
}> = ({ matrix, radar, onFinish, isParticipant }) => {
   
   // --- LOGIC: QUADRANT ---
   const isHighDep = matrix.dep >= 5;
   const isHighMat = matrix.mat >= 5;

   let qTitle = "", qDesc = "", qEvid = ["","",""], qColor = "";
   
   if (isHighDep && !isHighMat) {
      qTitle = "EMPRESA EM CRISE";
      qDesc = "Alta Dependência + Baixa Maturidade. Você carrega a empresa nas costas e o time não entrega.";
      qColor = "text-red-500 border-red-500 bg-red-500/10";
      qEvid = ["Decisões centralizadas em você.", "Time reativo e emocional.", "Risco de burnout iminente."];
   } else if (!isHighDep && !isHighMat) {
      qTitle = "EMPRESA CAOS";
      qDesc = "Baixa Dependência (falsa) + Baixa Maturidade. Ninguém decide nada, vácuo de poder.";
      qColor = "text-orange-500 border-orange-500 bg-orange-500/10";
      qEvid = ["Falta de comando claro.", "Processos inexistentes.", "Resultados aleatórios."];
   } else if (isHighDep && isHighMat) {
      qTitle = "EMPRESA TRAVADA";
      qDesc = "Alta Dependência + Alta Maturidade. Você tem bons líderes, mas não solta a rédea.";
      qColor = "text-amber-500 border-amber-500 bg-amber-500/10";
      qEvid = ["Microgerenciamento do dono.", "Líderes subutilizados.", "Crescimento limitado pelo seu tempo."];
   } else {
      qTitle = "EMPRESA ESTRATÉGICA";
      qDesc = "Baixa Dependência + Alta Maturidade. A operação roda, você foca no futuro.";
      qColor = "text-emerald-500 border-emerald-500 bg-emerald-500/10";
      qEvid = ["Autonomia com governança.", "Liderança resolve problemas.", "Você foca em expansão."];
   }

   // --- LOGIC: WAR PLAN (WORST PILLAR) ---
   const pillars = [
      { id: 'fin', label: 'Financeiro', score: radar.fin },
      { id: 'emo', label: 'Emocional', score: radar.emo },
      { id: 'jur', label: 'Jurídico', score: radar.jur },
      { id: 'ine', label: 'Inércia', score: radar.ine },
   ].sort((a,b) => a.score - b.score);

   const worst = pillars[0];
   
   // Action Plans based on the WORST pillar (Synthesized Hard Truths)
   const getActions = (id: string) => {
      switch(id) {
         case 'fin': return [
            "Trava Imediata de Alçadas: Ninguém gasta R$ 1,00 sem validação dupla até o caixa estabilizar.",
            "Auditoria de Margem: Revisar precificação e custos fixos em 7 dias.",
            "DRE por Centro de Custo: Cada líder deve justificar seu próprio P&L mensalmente.",
            "Pipeline Review: Exigir previsibilidade de vendas baseada em dados, não em promessa.",
            "Corte de Sangria: Identificar e eliminar projetos/clientes deficitários agora."
         ];
         case 'emo': return [
            "Rito de Feedback Corretivo: Instituir feedback quinzenal obrigatório e registrado.",
            "Mapeamento de Clima: Identificar focos de toxicidade e desligar 'terroristas' em 30 dias.",
            "Blindagem da Liderança: Definir limites claros. Líder não é psicólogo.",
            "Fim da Rádio Peão: Estabelecer canais oficiais e punir fofoca com advertência.",
            "Descanso Obrigatório: Forçar rotação de folgas para evitar colapso do topo."
         ];
         case 'jur': return [
            "Auditoria de Contratos: Revisar 100% dos vínculos trabalhistas e PJs.",
            "Manual de Conduta: Criar, apresentar e colher assinatura de todo o time em 15 dias.",
            "Registro de Decisões: Acabar com 'acordos de boca'. Tudo deve ir para ata ou email.",
            "Treinamento de Compliance: Ensinar líderes o básico da lei para evitar passivo na demissão.",
            "Canal de Denúncia: Implementar via formulário anônimo para antecipar crises."
         ];
         case 'ine': return [
            "Matriz de Delegação: Definir por escrito o que o líder PODE e DEVE decidir sozinho.",
            "Sucessão Forçada: Exigir que cada gerente apresente um sucessor em 90 dias.",
            "Férias do Dono (Teste): Agendar 7 dias fora para forçar a autonomia da equipe.",
            "Comitê de Estratégia: Sair do operacional diário e cobrar apenas nos rituais semanais.",
            "Matar Projetos Zumbis: Cancelar iniciativas que drenam energia e não dão ROI."
         ];
         default: return [];
      }
   };

   const warPlan = getActions(worst.id);

   return (
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 overflow-y-auto z-10 font-sans pb-32">
         
         {/* HEADER */}
         <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/10 pb-6">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Relatório Confidencial</span>
               </div>
               <h2 className="text-4xl font-black text-white tracking-tight">Diagnóstico Executivo</h2>
               <p className="text-slate-400 text-lg">Análise de Governança e Risco Organizacional</p>
            </div>
            <button onClick={() => window.print()} className="hidden md:flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm">
               <Printer className="w-4 h-4" /> Imprimir
            </button>
         </div>

         {/* ROW 1: POSICIONAMENTO (QUADRANTE) */}
         <div className="mb-12">
            <div className={`w-full rounded-3xl p-8 md:p-10 relative overflow-hidden border backdrop-blur-md shadow-2xl ${qColor.replace('bg-', 'hover:bg-opacity-20 ')} transition-all group flex flex-col md:flex-row gap-10 items-center`}>
               {/* Background Glow */}
               <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-transparent to-current opacity-10 rounded-bl-full pointer-events-none ${qColor.split(' ')[0]}`}></div>
               
               {/* Left: 4-BOX MATRIX VISUAL */}
               <div className="relative w-full max-w-[300px] aspect-square bg-slate-950 border border-slate-800 shadow-xl rounded-xl overflow-hidden shrink-0">
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                     <div className="bg-red-500/20 border-r border-b border-slate-800 flex items-start justify-start p-2"><span className="text-[10px] font-bold text-red-500 opacity-50 uppercase">Crise</span></div>
                     <div className="bg-amber-500/20 border-b border-slate-800 flex items-start justify-end p-2"><span className="text-[10px] font-bold text-amber-500 opacity-50 uppercase">Travada</span></div>
                     <div className="bg-orange-500/20 border-r border-slate-800 flex items-end justify-start p-2"><span className="text-[10px] font-bold text-orange-500 opacity-50 uppercase">Caos</span></div>
                     <div className="bg-emerald-500/20 flex items-end justify-end p-2"><span className="text-[10px] font-bold text-emerald-500 opacity-50 uppercase">Estratégica</span></div>
                  </div>
                  {/* Axis Labels */}
                  <div className="absolute -left-3 top-1/2 -rotate-90 text-[8px] font-mono text-slate-500 uppercase tracking-widest">Dependência</div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">Maturidade</div>
                  
                  {/* The Dot */}
                  <div 
                     className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white] border-2 border-slate-900 transition-all duration-1000 z-10"
                     style={{ 
                        left: `${matrix.mat * 10}%`, 
                        top: `${(10 - matrix.dep) * 100 / 10}%`, // SVG coords: 0 is top. matrix.dep 10 (High) should be top.
                        transform: 'translate(-50%, -50%)'
                     }}
                  >
                     <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                  </div>
               </div>

               {/* Right: TEXT EXPLANATION */}
               <div className="flex-1 text-center md:text-left relative z-10">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-[0.3em] block mb-4">Seu Quadrante Atual</span>
                  <h3 className={`text-4xl md:text-6xl font-black mb-6 tracking-tighter ${qColor.split(' ')[0]}`}>
                     {qTitle}
                  </h3>
                  <p className="text-white text-lg md:text-xl font-light leading-relaxed mb-8">
                     {qDesc}
                  </p>

                  <div className="flex flex-col gap-3">
                     {qEvid.map((e, i) => (
                        <div key={i} className="flex items-center gap-3">
                           <ShieldAlert className={`w-5 h-5 shrink-0 ${qColor.split(' ')[0]}`} />
                           <span className="text-slate-300 text-sm font-medium">{e}</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* ROW 2: RADAR DE RISCO (SIDE BY SIDE) */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            {/* Visual do Radar */}
            <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center relative aspect-[4/3]">
               <div className="absolute top-6 left-6 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Radar de Saúde (0-10)</span>
               </div>
               
               <div className="w-full h-full max-w-[350px] max-h-[350px] relative">
                  <svg viewBox="-20 -20 140 140" className="w-full h-full overflow-visible">
                     {/* Background Grid */}
                     <polygon points="50,10 90,50 50,90 10,50" fill="#1e293b" fillOpacity="0.2" stroke="#334155" strokeWidth="0.5" />
                     <polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="#334155" strokeWidth="0.5" />
                     <polygon points="50,30 70,50 50,70 30,50" fill="none" stroke="#334155" strokeWidth="0.5" />
                     
                     {/* Axes */}
                     <line x1="50" y1="50" x2="50" y2="10" stroke="#475569" strokeWidth="0.5" strokeDasharray="2 2" />
                     <line x1="50" y1="50" x2="90" y2="50" stroke="#475569" strokeWidth="0.5" strokeDasharray="2 2" />
                     <line x1="50" y1="50" x2="50" y2="90" stroke="#475569" strokeWidth="0.5" strokeDasharray="2 2" />
                     <line x1="50" y1="50" x2="10" y2="50" stroke="#475569" strokeWidth="0.5" strokeDasharray="2 2" />

                     {/* The Data Shape */}
                     <polygon 
                        points={`
                           50,${50 - (radar.fin * 4)} 
                           ${50 + (radar.jur * 4)},50 
                           50,${50 + (radar.ine * 4)} 
                           ${50 - (radar.emo * 4)},50
                        `}
                        fill="rgba(99, 102, 241, 0.4)"
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeLinejoin="round"
                     />
                     
                     {/* Labels */}
                     <text x="50" y="5" textAnchor="middle" className="text-[5px] font-bold fill-emerald-400 font-mono">FINANCEIRO</text>
                     <text x="95" y="52" textAnchor="start" className="text-[5px] font-bold fill-amber-400 font-mono">JURÍDICO</text>
                     <text x="50" y="98" textAnchor="middle" className="text-[5px] font-bold fill-indigo-400 font-mono">INÉRCIA</text>
                     <text x="5" y="52" textAnchor="end" className="text-[5px] font-bold fill-rose-400 font-mono">EMOCIONAL</text>

                     {/* Values */}
                     <text x="50" y="25" textAnchor="middle" className="text-[4px] fill-white font-mono">{radar.fin.toFixed(1)}</text>
                     <text x="75" y="48" textAnchor="middle" className="text-[4px] fill-white font-mono">{radar.jur.toFixed(1)}</text>
                     <text x="50" y="75" textAnchor="middle" className="text-[4px] fill-white font-mono">{radar.ine.toFixed(1)}</text>
                     <text x="25" y="48" textAnchor="middle" className="text-[4px] fill-white font-mono">{radar.emo.toFixed(1)}</text>
                  </svg>
               </div>
            </div>

            {/* Texto dos Pilares */}
            <div className="grid grid-cols-1 gap-4">
               {pillars.map((p) => {
                  let pColor = "";
                  let pDesc = "";
                  if (p.score >= 8) { pColor = "text-emerald-500 border-emerald-500/30"; pDesc = "Saúde sólida. Baixo risco."; }
                  else if (p.score >= 5) { pColor = "text-amber-500 border-amber-500/30"; pDesc = "Risco moderado. Atenção."; }
                  else { pColor = "text-red-500 border-red-500/30"; pDesc = "Caos iminente. Risco crítico."; }

                  return (
                     <div key={p.id} className={`p-5 rounded-xl border bg-slate-900/50 flex items-center justify-between ${pColor}`}>
                        <div>
                           <h4 className="font-bold uppercase tracking-wider text-sm mb-1">{p.label}</h4>
                           <p className="text-slate-400 text-xs">{pDesc}</p>
                        </div>
                        <span className="text-2xl font-mono font-bold">{p.score.toFixed(1)}</span>
                     </div>
                  )
               })}
            </div>
         </div>

         {/* ROW 3: PLANO DE GUERRA */}
         <div className="mb-20 animate-slide-up">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-500/10 rounded border border-red-500/20">
                   <Target className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Plano de Guerra: Elo Mais Fraco</h3>
             </div>

             <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                
                <div className="p-8 border-b border-slate-800 bg-red-900/5 flex justify-between items-center">
                   <div>
                      <p className="text-xs text-red-400 font-mono uppercase tracking-widest mb-2">Foco Imediato (Prioridade 0)</p>
                      <h4 className="text-3xl font-bold text-white">
                         Resgatar Pilar: <span className="text-red-500">{worst.label}</span>
                      </h4>
                   </div>
                   <div className="text-right">
                      <span className="text-5xl font-mono font-black text-red-500">{worst.score.toFixed(1)}</span>
                      <span className="text-xs text-slate-500 block">/ 10.0</span>
                   </div>
                </div>

                <div className="divide-y divide-slate-800">
                   {warPlan.map((action, idx) => (
                      <div key={idx} className="p-6 flex gap-5 hover:bg-slate-800/30 transition-colors">
                         <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 font-mono font-bold shrink-0">
                            {idx + 1}
                         </div>
                         <p className="text-slate-200 text-lg leading-relaxed">{action}</p>
                      </div>
                   ))}
                </div>

                <div className="bg-slate-950 p-6 flex items-start gap-4">
                   <BrainCircuit className="w-5 h-5 text-indigo-500 mt-1 shrink-0" />
                   <p className="text-sm text-slate-400 leading-relaxed font-mono">
                      <strong className="text-indigo-400">Nota do Sistema:</strong> Empresários costumam acelerar esse tipo de correção com mentoria estruturada. Tentar implementar sozinho sem método aumenta o risco de inércia em 60%.
                   </p>
                </div>
             </div>
         </div>

         {/* CTA FINAL - MODIFIED FOR PARTICIPANT MODE */}
         <div className="text-center pb-20">
            {isParticipant ? (
               <div className="bg-emerald-950/20 border border-emerald-900 rounded-2xl p-8 max-w-2xl mx-auto">
                  <div className="flex justify-center mb-4"><Check className="w-12 h-12 text-emerald-500" /></div>
                  <h3 className="text-2xl font-bold text-white mb-2">Diagnóstico Concluído</h3>
                  <p className="text-slate-400 mb-6">Mantenha esta tela aberta. O apresentador continuará em breve.</p>
                  <button className="px-8 py-3 bg-slate-800 text-slate-500 cursor-not-allowed rounded font-mono uppercase text-sm">
                     Aguardando Apresentador...
                  </button>
               </div>
            ) : (
               <button 
                  onClick={onFinish}
                  className="group relative inline-flex items-center gap-4 px-12 py-6 bg-slate-900 border border-slate-700 hover:border-indigo-500 text-white rounded-sm transition-all duration-300 hover:bg-slate-800 shadow-[0_0_50px_rgba(79,70,229,0.3)]"
               >
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  <span className="font-mono uppercase tracking-widest text-lg md:text-xl">Avançar no Workshop</span>
                  <ArrowRight className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
               </button>
            )}
         </div>

      </div>
   );
};