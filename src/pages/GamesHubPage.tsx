import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, BrainCircuit, Mic, Eye, Play, Sparkles } from "lucide-react";
import { MOCK_USER } from "../data/mockData";

export const GamesHubPage = () => {
  const student = MOCK_USER.student;
  const dyslexiaType = student.dyslexia_type || "Phonological";

  const categories = [
    {
      id: "Phonological",
      title: "Phonological Processing",
      icon: Mic,
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
      textColor: "text-rose-500",
      games: [
        { id: "rhyme-match", title: "Rhyme Matcher", desc: "Connect word cards that sound alike." },
        { id: "sound-blend", title: "Sound Blending", desc: "Combine syllables to build words." },
        { id: "phonics-bubble", title: "Phonics Bubble", desc: "Pop bubbles with the target sound." }
      ]
    },
    {
      id: "Working Memory",
      title: "Working Memory",
      icon: BrainCircuit,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
      textColor: "text-indigo-500",
      games: [
        { id: "sequence-recall", title: "Sequence Recall", desc: "Repeat a growing sequence of glowing symbols." },
        { id: "pattern-memory", title: "Pattern Memory", desc: "Flip cards to find the matching pairs." }
      ]
    },
    {
      id: "Visual",
      title: "Visual Processing",
      icon: Eye,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-500",
      games: [
        { id: "letter-search", title: "Letter Search", desc: "Find the hidden tricky letters (b, d, p, q)." },
        { id: "word-shape", title: "Word Shape Puzzle", desc: "Fit words into their geometric block shapes." },
        { id: "shadow-match", title: "Shadow Match", desc: "Find the correct shadow for the object." }
      ]
    }
  ];

  return (
    <div className="space-y-6 px-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-indigo-500" /> Games Hub
          </h1>
          <p className="text-slate-500 font-bold mt-1">Play and train your skills.</p>
        </div>
      </div>

      {/* Recommended Section Based on Dyslexia Type */}
      <div className="card-glass bg-gradient-to-br from-amber-400 to-orange-500 p-6 relative overflow-hidden border-none shadow-[0_8px_30px_rgb(245,158,11,0.4)] mb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
        <h2 className="text-sm font-black text-white/90 uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
          <Sparkles className="w-4 h-4" /> Recommended for You
        </h2>
        
        {categories.filter(c => c.id === dyslexiaType).map(category => (
          <div key={`rec-${category.id}`} className="space-y-3 relative z-10">
            {category.games.map(game => (
              <Link to={`/play/${game.id}`} key={`rec-game-${game.id}`} className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex items-center justify-between hover:bg-white/30 transition-colors">
                <div>
                  <h3 className="text-lg font-black text-white">{game.title}</h3>
                  <p className="text-xs text-orange-50 font-medium">{game.desc}</p>
                </div>
                <div className="w-10 h-10 bg-white text-orange-500 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Play className="w-5 h-5 fill-current" />
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* All Categories */}
      <div className="space-y-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id}>
              <h2 className={`text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 ${category.textColor}`}>
                <div className={`w-8 h-8 ${category.lightColor} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                {category.title}
              </h2>
              
              <div className="grid grid-cols-1 gap-3">
                {category.games.map(game => (
                  <Link to={`/play/${game.id}`} key={game.id} className="card p-4 flex items-center gap-4 hover:border-indigo-300 transition-colors group">
                    <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center shrink-0 text-white ${category.color} shadow-inner`}>
                      <Gamepad2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-black text-slate-900 truncate">{game.title}</h3>
                      <p className="text-xs text-slate-500 font-bold truncate mt-0.5">{game.desc}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors shrink-0">
                      <Play className="w-3 h-3 fill-current" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
