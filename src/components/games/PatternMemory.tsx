import React, { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface GameProps {
  onScore: (points: number) => void;
  onLevelUp: () => void;
  onGameOver: () => void;
}

interface Card {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const PatternMemory: React.FC<GameProps> = ({ onScore, onLevelUp, onGameOver }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [level, setLevel] = useState(1);
  const [isLocked, setIsLocked] = useState(false);

  const icons = ['🚀', '🌟', '🌙', '🌎', '🛸', '☄️', '🛰️', '🧑‍🚀', '👾', '🪐', '🔭', '👽'];

  const initGame = () => {
    // Level 1: 2 pairs (4 cards)
    // Level 10: 6 pairs (12 cards max)
    const pairsCount = Math.min(2 + Math.floor(level / 2), icons.length);
    const selectedIcons = icons.slice(0, pairsCount);
    const deck = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, idx) => ({ id: idx, icon, isFlipped: false, isMatched: false }));
    
    setCards(deck);
    setFlippedIndices([]);
    setMatches(0);
    setIsLocked(false);
  };

  useEffect(() => {
    initGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = newFlipped;
      
      if (newCards[firstIndex].icon === newCards[secondIndex].icon) {
        // Match
        setTimeout(() => {
          const matchedCards = [...newCards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setIsLocked(false);
          setMatches(m => m + 1);
          onScore(20);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && matches === cards.length / 2) {
      setTimeout(() => {
        if (level >= 10) {
          onGameOver();
        } else {
          setLevel(l => l + 1);
          onLevelUp();
        }
      }, 1500);
    }
  }, [matches, cards.length, level, onLevelUp, onGameOver]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`aspect-square rounded-2xl text-4xl flex items-center justify-center transition-all duration-300 transform perspective-1000 ${
              card.isFlipped || card.isMatched 
                ? 'bg-indigo-500 border border-indigo-400 rotate-y-180 shadow-inner' 
                : 'bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg'
            }`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className={`transition-opacity duration-300 ${card.isFlipped || card.isMatched ? 'opacity-100' : 'opacity-0'}`}>
              {card.icon}
            </span>
          </button>
        ))}
      </div>

      {cards.length > 0 && matches === cards.length / 2 && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-emerald-500/90 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <CheckCircle className="w-32 h-32 text-white" />
        </div>
      )}

    </div>
  );
};
