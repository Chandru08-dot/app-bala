import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Play, Sparkles, Trophy, Home } from "lucide-react";

// Game Components imports
import { RhymeMatcher } from "../components/games/RhymeMatcher";
import { SoundBlending } from "../components/games/SoundBlending";
import { PhonicsBubble } from "../components/games/PhonicsBubble";
import { SequenceRecall } from "../components/games/SequenceRecall";
import { PatternMemory } from "../components/games/PatternMemory";
import { LetterSearch } from "../components/games/LetterSearch";
import { WordShape } from "../components/games/WordShape";
import { ShadowMatch } from "../components/games/ShadowMatch";

export const GamePlayerPage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'levelup' | 'ending'>('intro');

  // Triggered by child games when a level is completed (up to level 9)
  const handleLevelUp = () => {
    setGameState('levelup');
    setTimeout(() => {
      setLevel(prev => prev + 1);
      setGameState('playing');
    }, 2500); // Show surprise for 2.5 seconds
  };

  // Triggered by child games when level 10 is completed
  const handleGameOver = () => {
    setGameState('ending');
  };

  const getGameContent = () => {
    const props = {
      onScore: (s: number) => setScore(prev => prev + s),
      onLevelUp: handleLevelUp,
      onGameOver: handleGameOver
    };

    switch (gameId) {
      case 'rhyme-match': return { 
        component: <RhymeMatcher {...props} />, 
        title: "Rhyme Matcher",
        desc: "Listen to the sound! Find the word card that rhymes perfectly with the target word." 
      };
      case 'sound-blend': return { 
        component: <SoundBlending {...props} />, 
        title: "Sound Blending",
        desc: "Syllables are jumbled! Tap them in the correct order to magically build the target word." 
      };
      case 'phonics-bubble': return { 
        component: <PhonicsBubble {...props} />, 
        title: "Phonics Bubble",
        desc: "Bubbles are floating away! Quickly pop only the bubbles that contain the target sound." 
      };
      case 'sequence-recall': return { 
        component: <SequenceRecall {...props} />, 
        title: "Sequence Recall",
        desc: "Watch the glowing lights carefully. Memorize the pattern and repeat it perfectly!" 
      };
      case 'pattern-memory': return { 
        component: <PatternMemory {...props} />, 
        title: "Pattern Memory",
        desc: "Test your memory! Flip the cards to find matching pairs hidden on the board." 
      };
      case 'letter-search': return { 
        component: <LetterSearch {...props} />, 
        title: "Letter Search",
        desc: "Beat the clock! Scan the grid to find all the hidden target letters (like 'b' or 'd')." 
      };
      case 'word-shape': return { 
        component: <WordShape {...props} />, 
        title: "Word Shape",
        desc: "Look at the letters carefully. Which geometric block outline perfectly fits the target word?" 
      };
      case 'shadow-match': return { 
        component: <ShadowMatch {...props} />, 
        title: "Shadow Match",
        desc: "Analyze the dark silhouette. Which colorful object perfectly matches that exact shape?" 
      };
      default: return { component: <div className="p-8 text-center">Game not found</div>, title: "Unknown Game", desc: "No instructions available." };
    }
  };

  const game = getGameContent();

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-900 relative overflow-hidden text-white animate-in zoom-in duration-300">
      
      {/* Game Header */}
      <div className="h-16 flex items-center justify-between px-4 bg-white/10 backdrop-blur-md z-40 border-b border-white/10 shrink-0">
        <Link to="/games" className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1 px-4 text-center">
          <h2 className="text-sm font-black text-white truncate">{game.title}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">
            {gameState === 'ending' ? 'Completed' : `Level ${level}/10`}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/20 px-3 py-2 rounded-xl border border-indigo-500/30">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-black">{score}</span>
        </div>
      </div>

      {/* Game Board Surface */}
      <div className="flex-1 relative overflow-hidden">
        
        {/* Intro Screen */}
        {gameState === 'intro' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md px-6 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(99,102,241,0.5)] border border-white/20">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 tracking-tight">{game.title}</h1>
            <p className="text-lg text-slate-300 font-medium mb-12 max-w-sm leading-relaxed">
              {game.desc}
            </p>
            <button 
              onClick={() => setGameState('playing')}
              className="px-12 py-5 bg-white text-indigo-900 rounded-full font-black text-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse"
            >
              <Play className="w-6 h-6 fill-current" />
              PLAY NOW
            </button>
          </div>
        )}

        {/* The Game Component */}
        {gameState !== 'intro' && gameState !== 'ending' && game.component}

        {/* Level Up Surprise Screen */}
        {gameState === 'levelup' && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-emerald-500/90 backdrop-blur-xl animate-in zoom-in duration-300 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-4 h-4 bg-white rounded-sm animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    backgroundColor: ['#fcd34d', '#f472b6', '#38bdf8', '#ffffff'][Math.floor(Math.random() * 4)],
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
            </div>
            
            <Trophy className="w-32 h-32 text-amber-300 mb-6 drop-shadow-[0_0_50px_rgba(251,191,36,0.8)] animate-bounce" />
            <h2 className="text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">LEVEL UP!</h2>
            <p className="text-2xl font-black text-emerald-100 uppercase tracking-widest">+500 XP BONUS</p>
          </div>
        )}

        {/* Ending Victory Screen */}
        {gameState === 'ending' && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-indigo-600 to-purple-900 backdrop-blur-xl animate-in slide-in-from-bottom duration-700 overflow-hidden px-6 text-center">
            
            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-3 h-3 bg-white rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    backgroundColor: ['#fcd34d', '#f472b6', '#38bdf8', '#a78bfa', '#ffffff'][Math.floor(Math.random() * 5)],
                  }}
                />
              ))}
            </div>

            <div className="relative z-10 w-full max-w-sm">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_80px_rgba(255,255,255,0.2)] border border-white/20">
                <Trophy className="w-16 h-16 text-amber-300" />
              </div>
              <h2 className="text-5xl font-black text-white mb-2 tracking-tighter">Mission<br/>Accomplished!</h2>
              <p className="text-lg font-bold text-indigo-200 mb-8">You completed all 10 levels!</p>

              <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 mb-12 border border-white/20">
                <p className="text-xs font-black text-indigo-200 uppercase tracking-widest mb-2">Total Score</p>
                <div className="flex items-center justify-center gap-3">
                  <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                  <span className="text-5xl font-black text-white">{score}</span>
                </div>
              </div>

              <Link to="/games" className="px-8 py-5 w-full bg-white text-indigo-900 rounded-full font-black text-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                <Home className="w-6 h-6" />
                EXIT TO HUB
              </Link>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
