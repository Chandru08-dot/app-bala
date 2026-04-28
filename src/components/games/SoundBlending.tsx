import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

interface GameProps {
  onScore: (points: number) => void;
  onLevelUp: () => void;
  onGameOver: () => void;
}

export const SoundBlending: React.FC<GameProps> = ({ onScore, onLevelUp, onGameOver }) => {
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState("");
  const [syllables, setSyllables] = useState<{id: number, text: string, selected: boolean}[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');

  const levels = [
    { word: "Water", parts: ["Wa", "ter"] }, // 1
    { word: "Spider", parts: ["Spi", "der"] }, // 2
    { word: "Elephant", parts: ["El", "e", "phant"] }, // 3
    { word: "Butterfly", parts: ["But", "ter", "fly"] }, // 4
    { word: "Banana", parts: ["Ba", "na", "na"] }, // 5
    { word: "Volcano", parts: ["Vol", "ca", "no"] }, // 6
    { word: "Helicopter", parts: ["Hel", "i", "cop", "ter"] }, // 7
    { word: "Alligator", parts: ["Al", "li", "ga", "tor"] }, // 8
    { word: "Strawberry", parts: ["Straw", "ber", "ry"] }, // 9
    { word: "Hippopotamus", parts: ["Hip", "po", "pot", "a", "mus"] }, // 10
  ];

  const loadLevel = (lvl: number) => {
    const current = levels[(lvl - 1) % levels.length];
    setTargetWord(current.word);
    
    // Shuffle parts
    const shuffled = [...current.parts]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }, index) => ({ id: index, text: value, selected: false }));
      
    setSyllables(shuffled);
    setSelectedOrder([]);
    setFeedback('none');
  };

  useEffect(() => {
    loadLevel(level);
  }, [level]);

  const handleSelect = (id: number, text: string) => {
    if (feedback !== 'none') return;

    setSyllables(prev => prev.map(s => s.id === id ? { ...s, selected: true } : s));
    const newOrder = [...selectedOrder, text];
    setSelectedOrder(newOrder);

    const current = levels[(level - 1) % levels.length];
    
    // Check if finished selecting all parts
    if (newOrder.length === current.parts.length) {
      if (newOrder.join('') === current.word) {
        setFeedback('correct');
        onScore(75);
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
        setTimeout(() => {
          loadLevel(level);
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    loadLevel(level);
  };

  return (
    <div className="flex flex-col items-center pt-20 h-full p-6 text-center">
      <h3 className="text-xl font-bold text-white/70 mb-2">Build the word:</h3>
      <h2 className="text-4xl font-black text-white mb-12 tracking-widest uppercase">{targetWord}</h2>

      {/* Selected Area */}
      <div className="flex gap-2 min-h-[4rem] mb-12 p-4 bg-white/10 rounded-2xl w-full max-w-md border border-white/20 items-center justify-center">
        {selectedOrder.length === 0 && <span className="text-white/30 font-bold">Tap syllables in order</span>}
        {selectedOrder.map((text, i) => (
          <div key={i} className="px-4 py-2 bg-indigo-500 rounded-xl text-2xl font-black text-white animate-in zoom-in">
            {text}
          </div>
        ))}
      </div>

      {/* Options */}
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-md">
        {syllables.map(s => (
          !s.selected && (
            <button
              key={s.id}
              onClick={() => handleSelect(s.id, s.text)}
              className="px-6 py-4 bg-white hover:bg-slate-100 active:scale-95 text-indigo-900 rounded-2xl shadow-lg text-3xl font-black transition-all"
            >
              {s.text}
            </button>
          )
        ))}
      </div>

      <button onClick={handleReset} className="mt-auto mb-8 p-4 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors">
        <RotateCcw className="w-6 h-6" />
      </button>

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
