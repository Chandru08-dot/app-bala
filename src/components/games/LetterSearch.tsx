import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface GameProps {
  onScore: (points: number) => void;
  onLevelUp: () => void;
  onGameOver: () => void;
}

export const LetterSearch: React.FC<GameProps> = ({ onScore, onLevelUp, onGameOver }) => {
  const [level, setLevel] = useState(1);
  const [targetLetter, setTargetLetter] = useState("");
  const [grid, setGrid] = useState<{id: number, letter: string, found: boolean}[]>([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);

  const levelConfigs = [
    { target: 'b', distractors: ['d', 'p', 'q'], size: 9, count: 2 }, // 1 (3x3)
    { target: 'p', distractors: ['q', 'b', 'd'], size: 16, count: 3 }, // 2 (4x4)
    { target: 'd', distractors: ['b', 'p', 'q'], size: 16, count: 4 }, // 3 (4x4)
    { target: 'q', distractors: ['p', 'b', 'd'], size: 25, count: 4 }, // 4 (5x5)
    { target: 'm', distractors: ['w', 'n', 'u'], size: 25, count: 5 }, // 5 (5x5)
    { target: 'w', distractors: ['m', 'v', 'u'], size: 36, count: 5 }, // 6 (6x6)
    { target: 'u', distractors: ['n', 'v', 'w'], size: 36, count: 6 }, // 7 (6x6)
    { target: 'n', distractors: ['u', 'm', 'h'], size: 49, count: 6 }, // 8 (7x7)
    { target: 'h', distractors: ['n', 'b', 'k'], size: 49, count: 7 }, // 9 (7x7)
    { target: 't', distractors: ['f', 'l', 'j'], size: 64, count: 8 }, // 10 (8x8)
  ];

  const initGame = () => {
    const config = levelConfigs[(level - 1) % levelConfigs.length];
    setTargetLetter(config.target);
    
    let letters = Array(config.size).fill('');
    // Place targets
    for (let i = 0; i < config.count; i++) {
      letters[i] = config.target;
    }
    // Fill rest with distractors
    for (let i = config.count; i < config.size; i++) {
      letters[i] = config.distractors[Math.floor(Math.random() * config.distractors.length)];
    }
    
    // Shuffle
    letters = letters.sort(() => Math.random() - 0.5);
    
    setGrid(letters.map((l, i) => ({ id: i, letter: l, found: false })));
    setTimeLeft(15 + level * 2);
    setIsPlaying(true);
  };

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false); // Time out
          setTimeout(initGame, 1500); // Restart
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleTap = (index: number) => {
    if (!isPlaying || grid[index].found) return;

    if (grid[index].letter === targetLetter) {
      const newGrid = [...grid];
      newGrid[index].found = true;
      setGrid(newGrid);
      onScore(10);

      // Check win
      if (newGrid.filter(c => c.letter === targetLetter && !c.found).length === 0) {
        setIsPlaying(false);
        setTimeout(() => {
          if (level >= 10) {
            onGameOver();
          } else {
            setLevel(l => l + 1);
            onLevelUp();
          }
        }, 1500);
      }
    } else {
      // Penalty time
      setTimeLeft(prev => Math.max(0, prev - 2));
    }
  };

  const config = levelConfigs[(level - 1) % levelConfigs.length];
  const gridCols = Math.sqrt(config.size);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      
      <div className="flex justify-between w-full max-w-sm mb-8 px-4 items-center bg-white/10 p-3 rounded-2xl border border-white/20">
        <div>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Find all</span>
          <span className="text-3xl font-black text-white dyslexia-font">{targetLetter}</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest block">Time</span>
          <span className={`text-3xl font-black ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-white'}`}>{timeLeft}s</span>
        </div>
      </div>

      <div 
        className="grid gap-2 w-full max-w-sm" 
        style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
      >
        {grid.map((cell, idx) => (
          <button
            key={cell.id}
            onClick={() => handleTap(idx)}
            className={`aspect-square rounded-xl flex items-center justify-center text-3xl font-black dyslexia-font transition-all ${
              cell.found 
                ? 'bg-emerald-500 text-white scale-90 border-transparent shadow-[0_0_20px_rgb(16,185,129,0.5)]' 
                : 'bg-white text-slate-800 hover:bg-slate-100 border-2 border-slate-200 active:scale-95'
            }`}
            disabled={!isPlaying || cell.found}
          >
            {cell.letter}
          </button>
        ))}
      </div>

      {!isPlaying && timeLeft > 0 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-emerald-500/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <CheckCircle className="w-32 h-32 text-white" />
        </div>
      )}
      {!isPlaying && timeLeft === 0 && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-rose-500/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <h2 className="text-4xl font-black text-white mb-2">Time's Up!</h2>
          <p className="text-white/80 font-bold">Try again...</p>
        </div>
      )}

    </div>
  );
};
