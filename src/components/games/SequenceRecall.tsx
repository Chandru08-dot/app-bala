import React, { useState, useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface GameProps {
  onScore: (points: number) => void;
  onLevelUp: () => void;
  onGameOver: () => void;
}

export const SequenceRecall: React.FC<GameProps> = ({ onScore, onLevelUp, onGameOver }) => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'success' | 'fail'>('idle');
  const [activePad, setActivePad] = useState<number | null>(null);

  const pads = [
    { id: 0, color: 'bg-rose-500', active: 'bg-rose-300 shadow-[0_0_30px_rgb(244,63,94,0.8)]' },
    { id: 1, color: 'bg-indigo-500', active: 'bg-indigo-300 shadow-[0_0_30px_rgb(99,102,241,0.8)]' },
    { id: 2, color: 'bg-emerald-500', active: 'bg-emerald-300 shadow-[0_0_30px_rgb(16,185,129,0.8)]' },
    { id: 3, color: 'bg-amber-500', active: 'bg-amber-300 shadow-[0_0_30px_rgb(245,158,11,0.8)]' },
  ];

  const startGame = () => {
    // Sequence length starts at 3 and grows by 1 each level (level 10 = length 12)
    const newSeq = Array.from({ length: level + 2 }, () => Math.floor(Math.random() * 4));
    setSequence(newSeq);
    setPlayerSequence([]);
    setGameState('showing');
  };

  useEffect(() => {
    if (gameState === 'showing') {
      let step = 0;
      const interval = setInterval(() => {
        if (step >= sequence.length) {
          clearInterval(interval);
          setActivePad(null);
          setGameState('playing');
          return;
        }
        
        setActivePad(sequence[step]);
        setTimeout(() => setActivePad(null), 400); // Pad flashes for 400ms
        
        step++;
      }, 800); // 800ms between steps

      return () => clearInterval(interval);
    }
  }, [gameState, sequence]);

  const handlePadClick = (id: number) => {
    if (gameState !== 'playing') return;

    setActivePad(id);
    setTimeout(() => setActivePad(null), 200);

    const newPlayerSeq = [...playerSequence, id];
    setPlayerSequence(newPlayerSeq);

    // Check correctness
    const currentIndex = newPlayerSeq.length - 1;
    if (newPlayerSeq[currentIndex] !== sequence[currentIndex]) {
      // Failed
      setGameState('fail');
      setTimeout(() => {
        setGameState('idle');
      }, 1500);
      return;
    }

    // Success step
    if (newPlayerSeq.length === sequence.length) {
      setGameState('success');
      onScore(100);
      setTimeout(() => {
        if (level >= 10) {
          onGameOver();
        } else {
          setLevel(l => l + 1);
          onLevelUp();
          setGameState('idle');
        }
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      
      <div className="mb-12 h-16 flex items-center justify-center">
        {gameState === 'idle' && <h3 className="text-2xl font-black text-white animate-pulse">Ready?</h3>}
        {gameState === 'showing' && <h3 className="text-2xl font-black text-indigo-300">Watch the pattern...</h3>}
        {gameState === 'playing' && <h3 className="text-2xl font-black text-emerald-300">Your turn!</h3>}
        {gameState === 'success' && <h3 className="text-2xl font-black text-white">Perfect!</h3>}
        {gameState === 'fail' && <h3 className="text-2xl font-black text-rose-400">Oops, try again!</h3>}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm aspect-square relative">
        {pads.map((pad) => (
          <button
            key={pad.id}
            onClick={() => handlePadClick(pad.id)}
            disabled={gameState !== 'playing'}
            className={`rounded-3xl transition-all duration-200 border-2 border-white/10 ${
              activePad === pad.id ? pad.active + ' scale-95 z-10' : pad.color
            }`}
          />
        ))}

        {gameState === 'idle' && (
          <button 
            onClick={startGame}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl z-20 hover:scale-105 active:scale-95 transition-transform"
          >
            <Play className="w-10 h-10 fill-slate-900 text-slate-900 ml-2" />
          </button>
        )}
      </div>

    </div>
  );
};
