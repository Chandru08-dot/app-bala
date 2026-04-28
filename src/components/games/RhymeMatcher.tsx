import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface GameProps {
  onScore: (points: number) => void;
  onLevelUp: () => void;
  onGameOver: () => void;
}

export const RhymeMatcher: React.FC<GameProps> = ({ onScore, onLevelUp, onGameOver }) => {
  const [level, setLevel] = useState(1);
  const [options, setOptions] = useState<string[]>([]);
  const [targetWord, setTargetWord] = useState("");
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const levels = [
    { target: "Cat", matches: ["Hat", "Bat", "Rat"], wrong: ["Dog", "Car", "Sun", "Mug"] }, // L1
    { target: "Sun", matches: ["Fun", "Run", "Bun"], wrong: ["Moon", "Star", "Hot", "Day"] }, // L2
    { target: "Bear", matches: ["Hair", "Chair", "Stair"], wrong: ["Bird", "Wolf", "Table", "House"] }, // L3
    { target: "Tree", matches: ["See", "Bee", "Free"], wrong: ["Leaf", "Wood", "Grass", "Bush"] }, // L4
    { target: "Night", matches: ["Light", "Right", "Sight"], wrong: ["Dark", "Moon", "Stars", "Sleep"] }, // L5
    { target: "Play", matches: ["Day", "Say", "May"], wrong: ["Game", "Fun", "Run", "Jump"] }, // L6
    { target: "Boat", matches: ["Coat", "Goat", "Float"], wrong: ["Ship", "Water", "Sea", "Sail"] }, // L7
    { target: "Sing", matches: ["Ring", "King", "Wing"], wrong: ["Song", "Music", "Bird", "Dance"] }, // L8
    { target: "Fast", matches: ["Last", "Past", "Mast"], wrong: ["Quick", "Run", "Speed", "Slow"] }, // L9
    { target: "Blue", matches: ["Shoe", "Glue", "Clue"], wrong: ["Color", "Sky", "Red", "Green"] }, // L10
  ];

  const loadLevel = (lvl: number) => {
    const current = levels[(lvl - 1) % levels.length];
    setTargetWord(current.target);
    const correctOption = current.matches[Math.floor(Math.random() * current.matches.length)];
    const wrongOptions = [...current.wrong].sort(() => 0.5 - Math.random()).slice(0, 3);
    setOptions([correctOption, ...wrongOptions].sort(() => 0.5 - Math.random()));
    setFeedback('none');
  };

  useEffect(() => {
    loadLevel(level);
  }, [level]);

  const handleSelect = (word: string) => {
    if (feedback !== 'none') return;
    
    const current = levels[(level - 1) % levels.length];
    if (current.matches.includes(word)) {
      setFeedback('correct');
      onScore(50);
      setTimeout(() => {
        if (level >= 10) {
          onGameOver();
        } else {
          setLevel(l => l + 1);
          onLevelUp();
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback('none'), 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <h3 className="text-2xl font-black text-white mb-2">Find the rhyme for:</h3>
      <div className="w-48 h-48 bg-rose-500 rounded-3xl flex items-center justify-center mb-12 shadow-[0_0_40px_rgb(244,63,94,0.4)] animate-in zoom-in">
        <span className="text-5xl font-black text-white">{targetWord}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map((word, i) => (
          <button
            key={i}
            onClick={() => handleSelect(word)}
            className="h-24 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-2xl flex items-center justify-center text-3xl font-black text-white transition-all backdrop-blur-md"
          >
            {word}
          </button>
        ))}
      </div>

      {feedback === 'correct' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-emerald-500/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <CheckCircle className="w-32 h-32 text-white" />
        </div>
      )}
      {feedback === 'wrong' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-rose-500/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <XCircle className="w-32 h-32 text-white" />
        </div>
      )}
    </div>
  );
};
