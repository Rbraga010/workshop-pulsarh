import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Block1Unified } from './components/Block1Unified';
import { SideRoadmap } from './components/SideRoadmap';
import { Block2 } from './components/Block2';
import { Block3 } from './components/Block3';
import { Block4 } from './components/Block4';
import { Block5 } from './components/Block5';
import { Block6 } from './components/Block6';

const App: React.FC = () => {
  const [currentBlock, setCurrentBlock] = useState(1);
  const [diagnosisScores, setDiagnosisScores] = useState<Record<string, number> | null>(null);

  // Check for URL parameters on mount to allow direct access via QR Code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const blockParam = params.get('block');
    if (blockParam) {
      const blockNum = parseInt(blockParam, 10);
      if (!isNaN(blockNum) && blockNum >= 1 && blockNum <= 6) {
        setCurrentBlock(blockNum);
      }
    }
  }, []);

  const handleNextBlock = () => {
    const next = currentBlock + 1;
    setCurrentBlock(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlock2Finish = (scores: Record<string, number>) => {
    setDiagnosisScores(scores);
    handleNextBlock();
  };

  const handleNavigate = (blockId: number) => {
      setCurrentBlock(blockId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <Navigation currentBlock={currentBlock} />
      <SideRoadmap currentBlock={currentBlock} onNavigate={handleNavigate} />
      
      <main>
        {currentBlock === 1 && (
          <>
            <Hero />
            <Block1Unified onNextBlock={handleNextBlock} />
          </>
        )}

        {currentBlock === 2 && (
          <Block2 onFinish={handleBlock2Finish} />
        )}

        {currentBlock === 3 && (
          <Block3 diagnosisScores={diagnosisScores} onNextBlock={handleNextBlock} />
        )}

        {currentBlock === 4 && (
          <Block4 onNextBlock={handleNextBlock} />
        )}

        {currentBlock === 5 && (
          <Block5 onNextBlock={handleNextBlock} />
        )}

        {currentBlock === 6 && (
          <Block6 />
        )}
      </main>
      
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-center text-slate-600 text-xs font-mono print:hidden">
        <p>PulsarH &copy; {new Date().getFullYear()} — Formação estratégica para líderes que lideram líderes.</p>
      </footer>
    </Layout>
  );
};

export default App;