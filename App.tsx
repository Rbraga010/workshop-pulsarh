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
  
  // New State for Participant Mode
  const [isParticipant, setIsParticipant] = useState(false);

  // Check for URL parameters on mount to allow direct access via QR Code
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const blockParam = params.get('block');
    const modeParam = params.get('mode');

    // Detect Participant Mode
    if (modeParam === 'participant') {
      setIsParticipant(true);
    }

    if (blockParam) {
      const blockNum = parseInt(blockParam, 10);
      if (!isNaN(blockNum) && blockNum >= 1 && blockNum <= 6) {
        setCurrentBlock(blockNum);
      }
    }
  }, []);

  const handleNextBlock = () => {
    // If Participant Mode, do not advance to presentation blocks (3, 4, 5...)
    if (isParticipant) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return; 
    }

    const next = currentBlock + 1;
    setCurrentBlock(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBlock2Finish = (scores: Record<string, number>) => {
    setDiagnosisScores(scores);
    
    // In participant mode, we stay on the results screen or handle differently
    if (!isParticipant) {
      handleNextBlock();
    }
  };

  const handleNavigate = (blockId: number) => {
      // Prevent navigation via roadmap if in participant mode (though roadmap is hidden)
      if (isParticipant) return;
      
      setCurrentBlock(blockId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <Navigation currentBlock={currentBlock} isParticipant={isParticipant} />
      
      {/* Hide Side Roadmap for Participants to keep focus absolute */}
      {!isParticipant && (
        <SideRoadmap currentBlock={currentBlock} onNavigate={handleNavigate} />
      )}
      
      <main>
        {currentBlock === 1 && (
          <>
            <Hero />
            <Block1Unified onNextBlock={handleNextBlock} />
          </>
        )}

        {currentBlock === 2 && (
          <Block2 
            onFinish={handleBlock2Finish} 
            isParticipant={isParticipant} 
          />
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