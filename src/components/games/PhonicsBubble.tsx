import React, { useState, useEffect } from "react";

interface GameProps {
  onScore: (points: number) => void;
  onLevelUp: () => void;
  onGameOver: () => void;
}

export const PhonicsBubble: React.FC<GameProps> = ({ onScore, onLevelUp, onGameOver }) => {
  const [level, setLevel] = useState(1);
  const [targetSound, setTargetSound] = useState("");
  const [bubbles, setBubbles] = useState<{id: number, text: string, x: number, y: number, speed: number, isTarget: boolean}[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [popsInLevel, setPopsInLevel] = useState(0);
  
  const levels = [
    { target: "sh", options: ["sh", "ch", "th", "wh"] }, // 1
    { target: "ch", options: ["ch", "sh", "ph", "ck"] }, // 2
    { target: "th", options: ["th", "sh", "wh", "f"] }, // 3
    { target: "wh", options: ["wh", "w", "h", "th"] }, // 4
    { target: "ck", options: ["ck", "c", "k", "ch"] }, // 5
    { target: "ng", options: ["ng", "nk", "nd", "nt"] }, // 6
    { target: "qu", options: ["qu", "q", "cw", "k"] }, // 7
    { target: "ph", options: ["ph", "f", "p", "v"] }, // 8
    { target: "wr", options: ["wr", "w", "r", "wh"] }, // 9
    { target: "kn", options: ["kn", "k", "n", "gn"] }, // 10
  ];

  const startGame = () => {
    const current = levels[(level - 1) % levels.length];
    setTargetSound(current.target);
    setBubbles([]);
    setPopsInLevel(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    if (!isPlaying) return;

    const current = levels[(level - 1) % levels.length];
    
    // Spawn bubbles
    const spawnInterval = setInterval(() => {
      setBubbles(prev => {
        if (prev.length > 8) return prev;
        
        const isTarget = Math.random() > 0.6;
        const text = isTarget ? current.target : current.options[Math.floor(Math.random() * current.options.length)];
        
        return [...prev, {
          id: Date.now(),
          text,
          x: Math.random() * 80 + 10, // 10% to 90%
          y: 110, // Start below screen
          speed: Math.random() * 0.5 + 0.5, // Float speed
          isTarget
        }];
      });
    }, 1200);

    // Move bubbles
    const moveInterval = setInterval(() => {
      setBubbles(prev => 
        prev
          .map(b => ({ ...b, y: b.y - b.speed }))
          .filter(b => b.y > -20) // Remove if off top
      );
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(moveInterval);
    };
  }, [isPlaying, level]);

  const popBubble = (id: number, isTarget: boolean) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
    
    if (isTarget) {
      onScore(20);
      setPopsInLevel(prev => prev + 1);
      // Level up after 5 correct pops
      if (popsInLevel + 1 >= 5) {
        setIsPlaying(false);
        setTimeout(() => {
          if (level >= 10) {
            onGameOver();
          } else {
            setLevel(l => l + 1);
            onLevelUp();
          }
        }, 1000);
      }
    } else {
      // Penalty or feedback
    }
  };

  return (
    <div className="h-full relative overflow-hidden bg-gradient-to-b from-sky-400 to-sky-900">
      
      {/* Target HUD */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 text-center shadow-lg">
        <p className="text-xs font-bold text-sky-100 uppercase tracking-widest mb-1">Pop the sound</p>
        <p className="text-3xl font-black text-white">{targetSound}</p>
      </div>

      {/* Bubbles */}
      {bubbles.map(b => (
        <button
          key={b.id}
          onClick={() => popBubble(b.id, b.isTarget)}
          className="absolute w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl font-black text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] transition-transform active:scale-0 duration-300"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            transform: 'translateX(-50%)'
          }}
        >
          {b.text}
          {/* Bubble shine */}
          <div className="absolute top-2 right-4 w-4 h-2 bg-white/60 rounded-full rotate-[-45deg]"></div>
        </button>
      ))}

      {!isPlaying && (
        <div className="absolute inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in">
          <div className="text-center">
            <h2 className="text-4xl font-black text-white mb-4">Level {level} Complete!</h2>
            <div className="w-16 h-16 border-4 border-t-white border-white/20 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}

    </div>
  );
};
