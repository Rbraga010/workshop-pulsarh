import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, Layout, Zap, Target, BookOpen, 
  ArrowRight, ChevronLeft, ChevronDown, CheckCircle2, 
  AlertTriangle, BrainCircuit, Heart, Fingerprint, 
  ShieldCheck, GraduationCap, PlayCircle, Minimize2,
  ListTodo, Crown, Network, Copy, Terminal, Check
} from 'lucide-react';

// --- TYPES ---

interface Block3Props {
  diagnosisScores: Record<string, number> | null; // Kept for compatibility
  onNextBlock: () => void;
}

type PillarType = 'governanca' | 'lha' | 'gestao' | null;

// --- DATA: PULSARH (GOVERNANÇA) ---
const PULSAR_STEPS = [
  {
    letter: 'P',
    title: 'Planejar',
    definition: 'Diagnóstico + Meta + Plano + Agenda travada.',
    analogy_weight: 'Ir à nutricionista, pesar, definir meta (-5kg) e comprar os alimentos da semana.',
    analogy_leader: 'Fazer diagnóstico do time, definir meta do trimestre e travar agenda para rituais.',
    action: 'Trave 1h na sua agenda semana que vem chamada "Planejamento Estratégico" e não marque nada em cima.'
  },
  {
    letter: 'U',
    title: 'Usar o Plano',
    definition: 'Execução disciplinada + rotina + adaptação consciente.',
    analogy_weight: 'Seguir a dieta na terça-feira chuvosa quando você queria pizza.',
    analogy_leader: 'Fazer a reunião de segunda-feira mesmo quando o cliente está ligando urgente.',
    action: 'Execute o ritual que você prometeu ao time, mesmo que "o mundo esteja caindo".'
  },
  {
    letter: 'L',
    title: 'Lapidar Erros',
    definition: 'Corrigir o processo, não culpar pessoas.',
    analogy_weight: 'Comi um doce. Por que? Ansiedade? Tédio? Ajusto a rotina para não repetir.',
    analogy_leader: 'A meta não bateu. Onde o processo falhou? Ajustamos a rota sem caça às bruxas.',
    action: 'Diante do próximo erro, pergunte "Onde o processo falhou?" antes de perguntar "Quem errou?".'
  },
  {
    letter: 'S',
    title: 'Sustentar Acertos',
    definition: 'Padronizar, criar ritual, repetir o que funciona.',
    analogy_weight: 'Descobri que treinar de manhã funciona. Torno isso inegociável.',
    analogy_leader: 'A reunião de sexta funcionou? Vira padrão sagrado na agenda.',
    action: 'Identifique uma vitória recente e escreva o "passo a passo" de como ela aconteceu.'
  },
  {
    letter: 'A',
    title: 'Alavancar',
    definition: 'Intensificar o que funciona, ampliar impacto.',
    analogy_weight: 'Já emagreci. Agora aumento a carga do treino para ganhar músculo.',
    analogy_leader: 'O processo roda. Agora aumento a meta ou a complexidade do desafio.',
    action: 'Pergunte ao time: "O que já fazemos bem que poderíamos fazer 2x mais rápido?"'
  },
  {
    letter: 'R',
    title: 'Replicar',
    definition: 'Formar sucessores, ensinar método, virar máquina.',
    analogy_weight: 'Ensino minha família a comer bem. O ambiente todo ajuda.',
    analogy_leader: 'Formo líderes que sabem rodar o PULSAR sem mim.',
    action: 'Delegue uma decisão sua para um liderado e peça para ele explicar como pensou.'
  },
  {
    letter: 'H',
    title: 'Humanizar',
    definition: 'Pessoas no centro + Protocolo LHA (Motor Comportamental).',
    analogy_weight: 'Entendo que sou humano, descanso e celebro conquistas.',
    analogy_leader: 'Uso o LHA para garantir que a performance não gere burnout.',
    action: 'Termine o dia mandando uma mensagem de reconhecimento genuíno para alguém.'
  }
];

// --- DATA: LHA (LIDERANÇA) ---
const LHA_BEHAVIORS = [
  {
    id: 1,
    title: "Ouvir de Verdade",
    subtitle: "Filtro do Fato",
    concept: "Você não escuta para confortar. Você escuta para clarear e decidir.",
    steps: ["O que aconteceu? (Fato)", "Qual impacto gerou?", "O que está travando?", "O que você precisa?"],
    error: "Virar 'psicólogo' e acolher a emoção sem extrair a causa raiz do problema.",
    action: "Na próxima queixa, use a frase: 'Entendi como você se sente. Agora me diga: qual é o fato que gerou isso?'"
  },
  {
    id: 2,
    title: "Comunicar com Clareza",
    subtitle: "Mensagem de 3 Camadas",
    concept: "Expectativa explícita > Ruído. O óbvio precisa ser dito.",
    steps: ["Contexto (Por que agora?)", "Expectativa (O que exatamente?)", "Critério (Como saber se ficou bom?)"],
    error: "Comunicar intenção ('preciso que melhore') em vez de direção ('o prazo é dia 10 com erro zero').",
    action: "Ao delegar hoje, peça para a pessoa repetir o que entendeu. Se houver erro, a falha foi na sua comunicação."
  },
  {
    id: 3,
    title: "Corrigir sem Humilhar",
    subtitle: "Processo > Pessoa",
    concept: "Correção baseada no fato e no processo, nunca no caráter.",
    steps: ["Fato (Sem adjetivo)", "Impacto (No time/cliente)", "Padrão (A regra)", "Ajuste (Ação futura)"],
    error: "Usar ironia, dar indireta no grupo ou acumular feedbacks para explodir depois.",
    action: "Dê um feedback corretivo de 2 minutos hoje focado apenas no processo que foi quebrado."
  },
  {
    id: 4,
    title: "Acompanhar sem Sufocar",
    subtitle: "Ritual > Microgestão",
    concept: "Manter o ritmo sem virar fiscal da vida alheia.",
    steps: ["Check Semanal", "Indicador Mínimo", "Aprendizado Rápido"],
    error: "Abandonar (delargar) ou microgerenciar cada respiração.",
    action: "Estabeleça um 'Check-in' de 15 minutos toda segunda-feira com seus diretos."
  }
];

// --- DATA: GESTÃO (PERFORMANCE) ---
const MANAGEMENT_STEPS = [
  {
    id: 1,
    title: "Sensibilizar (Coletivo)",
    icon: Heart,
    concept: "O time não se motiva sozinho. O líder precisa vender a visão.",
    what: "Mostrar o 'Porquê', o custo de não mudar e a visão do futuro.",
    tool: "Rituais de Abertura e Alinhamento.",
    error: "Achar que salário paga motivação. Salário paga presença; propósito paga engajamento.",
    action: "Comece a próxima reunião explicando o 'Porquê' antes de cobrar o 'O quê'."
  },
  {
    id: 2,
    title: "Engajar (Individual)",
    icon: Fingerprint,
    concept: "Conectar a meta da empresa com o ganho do indivíduo.",
    what: "1:1, acordos claros, conexão de carreira.",
    tool: "Reuniões One-on-One (focadas na pessoa, não na tarefa).",
    error: "Tratar todos iguais. Performance é individual.",
    action: "Pergunte a um liderado chave: 'O que você quer conquistar pessoalmente esse ano?' e conecte com a meta."
  },
  {
    id: 3,
    title: "Educar (Processo)",
    icon: GraduationCap,
    concept: "Transformar esforço em competência técnica.",
    what: "Ensinar o processo, o padrão e o método.",
    tool: "Playbooks, Treinamentos, Shadowing.",
    error: "Cobrar sem ter ensinado. Ou treinar sem cobrar execução.",
    action: "Identifique uma tarefa que o time erra muito e crie um checklist simples de 5 passos para ela."
  }
];

// --- AI PROMPTS DATA ---
const AI_PROMPTS = [
   {
      id: 'gov',
      title: 'Prompt: Estruturar Governança (PULSAR)',
      text: `Aja como um Especialista em Governança Corporativa e COO experiente. Eu sou [SEU CARGO] de uma empresa de [SEU NICHO] com [NÚMERO] funcionários. Quero implementar o método PULSARH de governança.

1. (P)lanejar: Crie uma agenda semanal ideal para mim, garantindo tempo para estratégia e rituais com o time, travando horários específicos.
2. (U)sar: Liste os 3 rituais de gestão indispensáveis que devo fazer toda semana (ex: reunião de meta, 1:1) com pauta sugerida.
3. (L)apidar: Crie um checklist de 5 perguntas para eu fazer toda sexta-feira para identificar falhas de processo na semana.

Saída esperada: Uma tabela estruturada de rotina e os checklists.`
   },
   {
      id: 'lha',
      title: 'Prompt: Protocolo LHA (Conversa Difícil)',
      text: `Aja como um Mentor de Liderança Humanizada focado em Alta Performance. Preciso ter uma conversa difícil com um liderado que [DESCREVA O COMPORTAMENTO/ERRO]. 

Use o Protocolo LHA para criar o roteiro desta conversa:
1. Filtro do Fato: Ajude-me a separar o que é fato observável do que é minha opinião/emoção.
2. Mensagem de 3 Camadas: Escreva exatamente o que devo dizer cobrindo:
   - Contexto (Por que estamos conversando agora?)
   - Expectativa (O que precisa mudar, sem rodeios)
   - Critério (Como vamos medir a mudança)
3. Correção sem Humilhação: Me dê 3 frases para usar se ele ficar na defensiva, trazendo o foco de volta para o processo.`
   },
   {
      id: 'mgt',
      title: 'Prompt: Gestão de Performance (Reunião)',
      text: `Aja como um Diretor de Performance. Vou conduzir uma reunião mensal de resultados com meu time. O objetivo principal é [SEU OBJETIVO, EX: AUMENTAR VENDAS].

Estruture a pauta da reunião usando os 3 Movimentos de Gestão:
1. Sensibilizar (Coletivo): Escreva uma narrativa de abertura curta (pitch) que mostre o custo de não batermos a meta e a visão de ganho se conseguirmos.
2. Engajar (Individual): Crie uma dinâmica rápida para conectar a meta da empresa com o ganho pessoal de cada um.
3. Educar (Processo): Sugira um exercício prático de 10 minutos para treinarmos uma habilidade técnica que está faltando para atingir esse objetivo.`
   }
];

export const Block3: React.FC<Block3Props> = ({ onNextBlock }) => {
  const [screen, setScreen] = useState<'identity' | 'pillars'>('identity');
  const [activePillar, setActivePillar] = useState<PillarType>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAILab, setShowAILab] = useState(false);
  
  // Auto-scroll logic when pillar opens
  const pillarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (activePillar && pillarRef.current) {
      pillarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activePillar]);

  const handleCopy = (text: string, id: string) => {
     navigator.clipboard.writeText(text);
     setCopiedId(id);
     setTimeout(() => setCopiedId(null), 2000);
  };

  // --- SCREEN 1: IDENTITY & MANIFESTO ---
  if (screen === 'identity') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden flex flex-col">
        {/* Background */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 animate-fade-in">
          
          {/* Header Institucional */}
          <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6">
                <Crown className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono text-indigo-300 uppercase tracking-widest">Instituto PulsarH</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                Nós formamos quem <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">lidera líderes.</span>
             </h1>
             <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Não somos uma consultoria de "ajuda". Somos uma escola de <strong>Governança e Liderança</strong> para a vida real. Sem romantismo. Com método.
             </p>
          </div>

          {/* Grid de Identidade */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
             {/* Card 1: Crença */}
             <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-indigo-500/30 transition-colors">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">No que acreditamos</h3>
                <p className="text-slate-400 leading-relaxed">
                   Acreditamos que empresas quebram quando crescem porque a gestão não acompanha a complexidade. Acreditamos que <strong>liderança é técnica</strong>, não dom.
                </p>
             </div>

             {/* Card 2: O que não somos */}
             <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:border-red-500/30 transition-colors">
                <AlertTriangle className="w-10 h-10 text-red-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">O que NÃO somos</h3>
                <p className="text-slate-400 leading-relaxed">
                   Não somos RH tradicional. Não fazemos palestras motivacionais. Não usamos termos fofos para problemas sérios de negócio. Somos focados em <strong>performance e saúde</strong>.
                </p>
             </div>

             {/* Card 3: O Fundador */}
             <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 p-8 rounded-2xl">
                <Users className="w-10 h-10 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">Quem ensina</h3>
                <p className="text-slate-400 leading-relaxed">
                   Rodrigo Braga e um time de executivos que vivem o campo de batalha. Nossa metodologia nasceu na prática, gerindo centenas de líderes e milhões em faturamento.
                </p>
             </div>
          </div>

          {/* CTA Didático */}
          <div className="text-center animate-slide-up">
             <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500">
                <button 
                  onClick={() => setScreen('pillars')}
                  className="px-10 py-4 bg-slate-950 rounded-full text-white font-bold text-lg flex items-center gap-3 hover:bg-slate-900 transition-all"
                >
                   Entrar na Sala de Aula (Os 3 Pilares)
                   <ArrowRight className="w-5 h-5" />
                </button>
             </div>
             <p className="mt-4 text-xs text-slate-500 font-mono uppercase tracking-widest">
                Experiência Interativa de Aprendizagem
             </p>
          </div>

        </div>
      </div>
    );
  }

  // --- SCREEN 2: THE 3 PILLARS MENU & CLASSROOM ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-32 relative flex flex-col">
       {/* Background Grid */}
       <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

       {/* HEADER FIXO */}
       <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto w-full text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-700 rounded-full mb-6">
             <GraduationCap className="w-4 h-4 text-slate-400" />
             <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Aula Magna PulsarH</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
             Empresas avançam com 3 motores:
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
             Clique em cada pilar para abrir o conteúdo detalhado.
          </p>
       </div>

       {/* MAIN CONTENT AREA */}
       <div className="flex-1 max-w-7xl mx-auto w-full px-6 pb-20 relative z-10" ref={pillarRef}>
          
          {/* PILLAR SELECTION CARDS */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ${activePillar ? 'hidden md:grid md:opacity-50 md:scale-95 hover:opacity-100 hover:scale-100' : 'opacity-100 scale-100'}`}>
             
             {/* Card 1: Governança */}
             <button 
               onClick={() => setActivePillar('governanca')}
               className={`group text-left p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden
                  ${activePillar === 'governanca' ? 'bg-emerald-900/20 border-emerald-500 ring-2 ring-emerald-500/50' : 'bg-slate-900/40 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900'}
               `}
             >
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <Layout className="w-10 h-10 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">1. Governança</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                   Que forma e sustenta resultados. O fim da dependência do dono.
                </p>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                   Acessar Aula <ChevronDown className="w-4 h-4" />
                </div>
             </button>

             {/* Card 2: LHA */}
             <button 
               onClick={() => setActivePillar('lha')}
               className={`group text-left p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden
                  ${activePillar === 'lha' ? 'bg-cyan-900/20 border-cyan-500 ring-2 ring-cyan-500/50' : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900'}
               `}
             >
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                <Users className="w-10 h-10 text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">2. Liderança (LHA)</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                   Humanizada Aplicada. O motor comportamental de alta performance.
                </p>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                   Acessar Aula <ChevronDown className="w-4 h-4" />
                </div>
             </button>

             {/* Card 3: Gestão */}
             <button 
               onClick={() => setActivePillar('gestao')}
               className={`group text-left p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden
                  ${activePillar === 'gestao' ? 'bg-indigo-900/20 border-indigo-500 ring-2 ring-indigo-500/50' : 'bg-slate-900/40 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900'}
               `}
             >
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <Zap className="w-10 h-10 text-indigo-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">3. Gestão na Ponta</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                   Sensibilizar, Engajar e Educar. Performance com pessoas reais.
                </p>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                   Acessar Aula <ChevronDown className="w-4 h-4" />
                </div>
             </button>
          </div>

          {/* ACTIVE PILLAR CONTENT (THE CLASSROOM) */}
          {activePillar && (
             <div className="mt-8 animate-slide-up">
                
                {/* --- AULA 1: GOVERNANÇA (PULSAR) --- */}
                {activePillar === 'governanca' && (
                   <div className="bg-slate-900 border border-emerald-900/50 rounded-3xl overflow-hidden shadow-2xl relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500"></div>
                      
                      {/* Intro */}
                      <div className="p-8 md:p-12 border-b border-slate-800">
                         <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                               <div className="p-3 bg-emerald-900/30 rounded-lg text-emerald-400">
                                  <Layout className="w-8 h-8" />
                               </div>
                               <div>
                                  <h2 className="text-3xl font-bold text-white">Método PULSARH</h2>
                                  <p className="text-emerald-400 font-mono text-sm uppercase tracking-wider">Sistema Operacional de Governança</p>
                               </div>
                            </div>
                            <button onClick={() => setActivePillar(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                               <Minimize2 className="w-6 h-6" />
                            </button>
                         </div>
                         <p className="text-lg text-slate-300 leading-relaxed max-w-4xl border-l-4 border-emerald-500 pl-6">
                            A Governança evita os dois extremos que matam empresas: o <strong>Improviso</strong> (caos, urgência eterna) e a <strong>Burocracia</strong> (processos travados). O PULSAR é o ritmo que libera o dono.
                         </p>
                      </div>

                      {/* Interactive List (P-U-L-S-A-R-H) */}
                      <div className="divide-y divide-slate-800">
                         {PULSAR_STEPS.map((step) => (
                            <PillarItem key={step.letter} step={step} color="emerald" />
                         ))}
                      </div>
                   </div>
                )}

                {/* --- AULA 2: LHA (LIDERANÇA) --- */}
                {activePillar === 'lha' && (
                   <div className="bg-slate-900 border border-cyan-900/50 rounded-3xl overflow-hidden shadow-2xl relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500"></div>
                      
                      {/* Intro */}
                      <div className="p-8 md:p-12 border-b border-slate-800">
                         <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                               <div className="p-3 bg-cyan-900/30 rounded-lg text-cyan-400">
                                  <Users className="w-8 h-8" />
                               </div>
                               <div>
                                  <h2 className="text-3xl font-bold text-white">Protocolo LHA</h2>
                                  <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider">Liderança Humanizada Aplicada</p>
                               </div>
                            </div>
                            <button onClick={() => setActivePillar(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                               <Minimize2 className="w-6 h-6" />
                            </button>
                         </div>
                         <p className="text-lg text-slate-300 leading-relaxed max-w-4xl border-l-4 border-cyan-500 pl-6">
                            Performance sem saúde emocional vira rotatividade e caos. O LHA não é sobre ser "bonzinho", é sobre ter <strong>método comportamental</strong> para extrair resultado sem adoecer o time.
                         </p>
                      </div>

                      {/* Interactive Grid (4 Behaviors) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800">
                         {LHA_BEHAVIORS.map((item) => (
                            <LhaItem key={item.id} item={item} />
                         ))}
                      </div>
                   </div>
                )}

                {/* --- AULA 3: GESTÃO (PERFORMANCE) --- */}
                {activePillar === 'gestao' && (
                   <div className="bg-slate-900 border border-indigo-900/50 rounded-3xl overflow-hidden shadow-2xl relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-indigo-500"></div>
                      
                      {/* Intro */}
                      <div className="p-8 md:p-12 border-b border-slate-800">
                         <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                               <div className="p-3 bg-indigo-900/30 rounded-lg text-indigo-400">
                                  <Zap className="w-8 h-8" />
                               </div>
                               <div>
                                  <h2 className="text-3xl font-bold text-white">Gestão na Ponta</h2>
                                  <p className="text-indigo-400 font-mono text-sm uppercase tracking-wider">Sensibilizar, Engajar, Educar</p>
                               </div>
                            </div>
                            <button onClick={() => setActivePillar(null)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                               <Minimize2 className="w-6 h-6" />
                            </button>
                         </div>
                         <p className="text-lg text-slate-300 leading-relaxed max-w-4xl border-l-4 border-indigo-500 pl-6">
                            Pessoas no centro não significa frouxidão; significa <strong>método</strong>. O líder precisa dominar os 3 movimentos para transformar esforço em competência e resultado.
                         </p>
                      </div>

                      {/* Interactive List (3 Movements) */}
                      <div className="divide-y divide-slate-800">
                         {MANAGEMENT_STEPS.map((item) => (
                            <ManagementItem key={item.id} item={item} />
                         ))}
                      </div>
                   </div>
                )}

             </div>
          )}

          {/* AI IMPLEMENTATION LAB (NOW HIDDEN BY DEFAULT) */}
          <div className="mt-20 pt-12 border-t border-slate-800 animate-fade-in">
              <div className="text-center mb-10">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4">
                    <BrainCircuit className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-mono text-indigo-300 uppercase tracking-widest">Laboratório de IA</span>
                 </div>
                 <h3 className="text-3xl font-bold text-white mb-2">Implemente Agora com IA</h3>
                 <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                    Copie estes prompts de engenharia robusta e cole no Gemini/ChatGPT para estruturar sua governança, liderança e gestão em segundos.
                 </p>
                 
                 <button 
                    onClick={() => setShowAILab(!showAILab)}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 border border-indigo-500/50 hover:bg-indigo-900/20 text-indigo-300 font-mono text-sm uppercase tracking-widest rounded transition-all hover:scale-105"
                 >
                    {showAILab ? <Minimize2 className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
                    {showAILab ? 'Fechar Laboratório' : 'Abrir Laboratório de Prompts'}
                 </button>
              </div>

              {showAILab && (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
                    {AI_PROMPTS.map((prompt) => (
                       <div key={prompt.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-indigo-500/30 transition-all">
                          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                             <div className="flex items-center gap-2">
                                <Terminal className="w-4 h-4 text-indigo-500" />
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-wide truncate max-w-[180px]">{prompt.title}</span>
                             </div>
                             <button 
                                onClick={() => handleCopy(prompt.text, prompt.id)}
                                className="text-xs flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 rounded transition-colors"
                             >
                                {copiedId === prompt.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copiedId === prompt.id ? 'Copiado!' : 'Copiar'}
                             </button>
                          </div>
                          <div className="p-4 bg-slate-950/50 flex-1 relative">
                             <pre className="text-[10px] md:text-xs text-slate-400 font-mono whitespace-pre-wrap leading-relaxed">
                                {prompt.text}
                             </pre>
                             {/* Fade for long text preview */}
                             <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                          </div>
                       </div>
                    ))}
                 </div>
              )}
          </div>

          {/* FINAL CTA REMOVED FROM HERE - MOVED TO DRAWER */}
          <div className="mt-16 text-center text-slate-500 text-sm">
              <ArrowDownSimple className="w-4 h-4 mx-auto mb-2 animate-bounce" />
              Abra o checklist abaixo para continuar
          </div>

       </div>

       {/* --- DRAWER: CHECKLIST DE BOLSO --- */}
       <div 
          className={`
             fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t-2 border-indigo-500 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out flex flex-col
             ${showDrawer ? 'h-[85vh] md:h-[600px]' : 'h-14 hover:h-16 cursor-pointer'}
          `}
       >
          {/* Handle */}
          <div 
             onClick={() => setShowDrawer(!showDrawer)}
             className="h-14 w-full flex items-center justify-center relative bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer border-b border-white/5 shrink-0"
          >
             <div className="absolute top-2 w-12 h-1 bg-slate-700 rounded-full"></div>
             <div className="flex items-center gap-2 mt-2">
                <ListTodo className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Checklist de Bolso (Líder PulsarH)</span>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${showDrawer ? 'rotate-0' : 'rotate-180'}`} />
             </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-8 pb-12">
             <div className="max-w-4xl mx-auto">
                <p className="text-center text-slate-400 text-sm mb-8">
                   Use este checklist rápido toda semana para garantir que você não está voltando para o operacional.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                   <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2 mb-3">
                         <Layout className="w-5 h-5 text-emerald-500" />
                         <span className="text-emerald-500 font-bold text-sm uppercase">Governança</span>
                      </div>
                      <ul className="space-y-3">
                         <li className="flex items-start gap-2 text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5"></div>
                            Minha agenda tem blocos travados para estratégia?
                         </li>
                         <li className="flex items-start gap-2 text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5"></div>
                            Os rituais (1:1, meta) aconteceram ou foram cancelados?
                         </li>
                      </ul>
                   </div>

                   <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2 mb-3">
                         <Users className="w-5 h-5 text-cyan-500" />
                         <span className="text-cyan-500 font-bold text-sm uppercase">LHA (Liderança)</span>
                      </div>
                      <ul className="space-y-3">
                         <li className="flex items-start gap-2 text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5"></div>
                            Corrigi processos ou ataquei pessoas esta semana?
                         </li>
                         <li className="flex items-start gap-2 text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5"></div>
                            Minha comunicação deixou clara a expectativa e o critério?
                         </li>
                      </ul>
                   </div>

                   <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2 mb-3">
                         <Zap className="w-5 h-5 text-indigo-500" />
                         <span className="text-indigo-500 font-bold text-sm uppercase">Gestão</span>
                      </div>
                      <ul className="space-y-3">
                         <li className="flex items-start gap-2 text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5"></div>
                            Ensinei o processo antes de cobrar o resultado?
                         </li>
                         <li className="flex items-start gap-2 text-slate-300 text-sm">
                            <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5"></div>
                            Conectei a meta da empresa com o ganho individual?
                         </li>
                      </ul>
                   </div>
                </div>

                {/* MOVED CTA: ADVANCE TO NEXT BLOCK */}
                <div className="border-t border-slate-800 pt-8 text-center">
                    <h4 className="text-white font-bold text-lg mb-4">Pronto para dar o próximo passo?</h4>
                    <button 
                       onClick={onNextBlock}
                       className="group relative inline-flex items-center gap-4 px-12 py-5 bg-white text-indigo-950 font-black text-lg rounded-xl hover:bg-indigo-50 transition-all shadow-xl hover:scale-105"
                    >
                       Avançar para o in.PULSO.pro
                       <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
             </div>
          </div>
       </div>

    </div>
  );
};

// --- SUB-COMPONENTS FOR INTERACTIVITY ---

const ArrowDownSimple = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
);

const PillarItem = ({ step, color }: { step: any, color: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const letterColor = color === 'emerald' ? 'text-emerald-400 bg-emerald-900/20 border-emerald-500/30' : 'text-slate-400';
  const textColor = color === 'emerald' ? 'text-emerald-100' : 'text-slate-100';

  return (
    <div className={`transition-all duration-300 ${isOpen ? 'bg-slate-800/50' : 'bg-slate-900 hover:bg-slate-800/30'}`}>
       <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-6 p-6 text-left focus:outline-none"
       >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-black border ${letterColor}`}>
             {step.letter}
          </div>
          <div className="flex-1">
             <h3 className={`text-xl font-bold ${textColor} mb-1`}>{step.title}</h3>
             <p className="text-slate-400 text-sm">{step.definition}</p>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
       </button>
       
       {isOpen && (
          <div className="px-6 pb-8 pl-[88px] animate-slide-up space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950/50 p-4 rounded-lg border border-white/5">
                   <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <Heart className="w-3 h-3" /> Exemplo Vida Real (Dieta)
                   </div>
                   <p className="text-slate-300 text-sm italic">"{step.analogy_weight}"</p>
                </div>
                <div className="bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/20">
                   <div className="flex items-center gap-2 mb-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <Target className="w-3 h-3" /> Exemplo Liderança
                   </div>
                   <p className="text-emerald-100 text-sm font-medium">"{step.analogy_leader}"</p>
                </div>
             </div>
             
             <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                <PlayCircle className="w-6 h-6 text-white shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-bold text-white text-sm uppercase tracking-wide mb-1">Experimente fazer hoje</h4>
                   <p className="text-slate-300 text-sm">{step.action}</p>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

const LhaItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`p-6 md:p-8 bg-slate-900 transition-all duration-300 ${isOpen ? 'col-span-1 md:col-span-2 bg-slate-800' : 'hover:bg-slate-800/50'}`}>
       <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left focus:outline-none">
          <div className="flex items-center justify-between mb-4">
             <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">{item.subtitle}</span>
             <ChevronDown className={`w-5 h-5 text-cyan-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-slate-400 leading-relaxed">{item.concept}</p>
       </button>

       {isOpen && (
          <div className="mt-8 animate-slide-up space-y-6">
             <div className="bg-slate-950 p-6 rounded-xl border border-white/5">
                <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <ListTodo className="w-4 h-4 text-cyan-400" /> Como aplicar (Passo a Passo)
                </h4>
                <ul className="space-y-2">
                   {item.steps.map((step: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                         <div className="w-6 h-6 rounded-full bg-cyan-900/30 text-cyan-400 flex items-center justify-center text-xs font-bold">{i+1}</div>
                         {step}
                      </li>
                   ))}
                </ul>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-red-900/10 border border-red-500/20">
                   <div className="text-red-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><AlertTriangle className="w-3 h-3"/> Erro Comum</div>
                   <p className="text-red-100 text-sm">{item.error}</p>
                </div>
                <div className="p-5 rounded-xl bg-cyan-900/10 border border-cyan-500/20">
                   <div className="text-cyan-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><PlayCircle className="w-3 h-3"/> Experimente Hoje</div>
                   <p className="text-cyan-100 text-sm">{item.action}</p>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};

const ManagementItem = ({ item }: { item: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;

  return (
    <div className={`transition-all duration-300 ${isOpen ? 'bg-slate-800/50' : 'bg-slate-900 hover:bg-slate-800/30'}`}>
       <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-6 p-6 text-left focus:outline-none">
          <div className="p-3 bg-indigo-900/20 rounded-lg text-indigo-400 border border-indigo-500/20">
             <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
             <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
             <p className="text-slate-400 text-sm">{item.concept}</p>
          </div>
          <ChevronDown className={`w-5 h-5 text-indigo-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
       </button>

       {isOpen && (
          <div className="px-6 pb-8 pl-[88px] animate-slide-up space-y-6">
             <div className="bg-slate-950 p-5 rounded-lg border border-white/5">
                <div className="text-slate-500 text-xs font-bold uppercase mb-2">Ferramenta Principal</div>
                <p className="text-white font-medium">{item.tool}</p>
                <p className="text-slate-400 text-sm mt-1">{item.what}</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-2 border-red-500 pl-4">
                   <div className="text-red-500 text-xs font-bold uppercase mb-1">Erro Comum</div>
                   <p className="text-slate-300 text-sm">{item.error}</p>
                </div>
                <div className="border-l-2 border-indigo-500 pl-4">
                   <div className="text-indigo-400 text-xs font-bold uppercase mb-1">Experimente Hoje</div>
                   <p className="text-slate-300 text-sm">{item.action}</p>
                </div>
             </div>
          </div>
       )}
    </div>
  );
};