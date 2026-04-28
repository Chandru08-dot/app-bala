import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface GameProps {
  onScore: (points: number) => void;
  onLevelUp: () => void;
  onGameOver: () => void;
}

export const ShadowMatch: React.FC<GameProps> = ({ onScore, onLevelUp, onGameOver }) => {
  const [level, setLevel] = useState(1);
  const [targetIcon, setTargetIcon] = useState("");
  const [options, setOptions] = useState<{id: number, icon: string}[]>([]);
  const [success, setSuccess] = useState(false);

  const levels = [
    { target: "🐘", wrong: ["🦏", "🦛"] }, // 1
    { target: "🚁", wrong: ["✈️", "🚀"] }, // 2
    { target: "🦖", wrong: ["🦕", "🐊"] }, // 3
    { target: "🎸", wrong: ["🎻", "🎷"] }, // 4
    { target: "🚲", wrong: ["🏍️", "🛴"] }, // 5
    { target: "🦅", wrong: ["🦉", "🦇"] }, // 6
    { target: "🍎", wrong: ["🍑", "🍅"] }, // 7
    { target: "⚓", wrong: ["🪝", "⚖️"] }, // 8
    { target: "🧸", wrong: ["🐼", "🐨"] }, // 9
    { target: "🏰", wrong: ["🏛️", "🕌"] }, // 10
  ];

  const loadLevel = (lvl: number) => {
    const current = levels[(lvl - 1) % levels.length];
    setTargetIcon(current.target);
    
    const allOptions = [current.target, ...current.wrong].map((icon, i) => ({ id: i, icon }));
    setOptions(allOptions.sort(() => Math.random() - 0.5));
    setSuccess(false);
  };

  useEffect(() => {
    loadLevel(level);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const handleSelect = (icon: string) => {
    if (icon === targetIcon) {
      setSuccess(true);
      onScore(35);
      setTimeout(() => {
        if (level >= 10) {
          onGameOver();
        } else {
          setLevel(l => l + 1);
          onLevelUp();
        }
      }, 1500);
    } else {
      // wrong flash
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      
      <h3 className="text-xl font-bold text-white/70 mb-4">Whose shadow is this?</h3>
      
      {/* Shadow */}
      <div className="w-48 h-48 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center mb-12 shadow-inner">
        <span className="text-[8rem] filter brightness-0 sepia-[1] hue-rotate-[180deg] saturate-[500%] opacity-80 mix-blend-screen drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] select-none pointer-events-none">
          {targetIcon}
        </span>
      </div>

      {/* Options */}
      <div className="flex gap-4 w-full max-w-sm justify-center">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.icon)}
            className="w-24 h-24 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl flex items-center justify-center text-5xl transition-all active:scale-95"
          >
            {opt.icon}
          </button>
        ))}
      </div>

      {success && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-emerald-500/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <CheckCircle className="w-32 h-32 text-white" />
        </div>
      )}

    </div>
  );
};
