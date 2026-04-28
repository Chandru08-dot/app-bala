import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface GameProps {
  onScore: (points: number) => void;
  onLevelUp: () => void;
  onGameOver: () => void;
}

export const WordShape: React.FC<GameProps> = ({ onScore, onLevelUp, onGameOver }) => {
  const [level, setLevel] = useState(1);
  const [targetWord, setTargetWord] = useState("");
  const [options, setOptions] = useState<{id: number, type: string}[]>([]);
  const [success, setSuccess] = useState(false);

  // 'ascender' for b,d,h,k,l,t
  // 'descender' for g,j,p,q,y
  // 'normal' for a,c,e,m,n,o,r,s,u,v,w,x,z
  const getShapeType = (word: string) => {
    let shape = "";
    for (let char of word.toLowerCase()) {
      if ("bdhklt".includes(char)) shape += "A"; // Ascender
      else if ("gjpqy".includes(char)) shape += "D"; // Descender
      else shape += "N"; // Normal
    }
    return shape;
  };

  const levels = [
    { word: "cat", wrong: ["dog", "pig"] }, // 1: NNN vs ADA vs DND
    { word: "play", wrong: ["jump", "run"] }, // 2: DAAA vs DNDD vs NNN
    { word: "happy", wrong: ["sad", "mad"] }, // 3: ANDDD vs NAD vs NND
    { word: "bird", wrong: ["fish", "bear"] }, // 4: ANNA vs ADAN vs ANAN
    { word: "apple", wrong: ["grape", "peach"] }, // 5: NDDAN vs DDANN vs DANN
    { word: "quiet", wrong: ["loud", "noisy"] }, // 6: DNNNA vs ANAD vs NNNNA
    { word: "light", wrong: ["heavy", "dark"] }, // 7: ANNDA vs AANND vs AANN
    { word: "water", wrong: ["juice", "milk"] }, // 8: NNNNN vs DNNNN vs NANA
    { word: "school", wrong: ["class", "desk"] }, // 9: NNANNA vs AAANN vs AAAN
    { word: "friend", wrong: ["enemy", "buddy"] }, // 10: AAANAA vs NNNND vs AADDA
  ];

  const loadLevel = (lvl: number) => {
    const current = levels[(lvl - 1) % levels.length];
    setTargetWord(current.word);
    
    const correctShape = getShapeType(current.word);
    const wrongShapes = current.wrong.map(w => getShapeType(w));
    
    const allShapes = [correctShape, ...wrongShapes].map((s, i) => ({ id: i, type: s }));
    setOptions(allShapes.sort(() => Math.random() - 0.5));
    setSuccess(false);
  };

  useEffect(() => {
    loadLevel(level);
  }, [level]);

  const handleSelect = (shapeType: string) => {
    if (shapeType === getShapeType(targetWord)) {
      setSuccess(true);
      onScore(40);
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

  // Render geometric blocks based on shape string (A, N, D)
  const renderShapeBlock = (shapeType: string) => {
    return (
      <div className="flex items-end gap-1 h-16 px-4 py-2 bg-slate-800 rounded-xl">
        {shapeType.split('').map((char, i) => {
          if (char === 'A') return <div key={i} className="w-8 h-12 bg-slate-600 rounded-md"></div>;
          if (char === 'N') return <div key={i} className="w-8 h-8 bg-slate-600 rounded-md"></div>;
          if (char === 'D') return <div key={i} className="w-8 h-12 bg-slate-600 rounded-md relative top-4"></div>;
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      
      <h3 className="text-xl font-bold text-white/70 mb-4">Find the shape for:</h3>
      <h2 className="text-6xl font-black text-white mb-16 tracking-widest">{targetWord}</h2>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleSelect(opt.type)}
            className="w-full flex items-center justify-center p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-all active:scale-95"
          >
            {renderShapeBlock(opt.type)}
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
