import React from "react";
import { motion } from "framer-motion";
import { Play, Volume2, Mic, CheckCircle } from "lucide-react";

const PHONEMES = [
  { sound: "th", example: "think", difficulty: "Hard", progress: 30 },
  { sound: "oo", example: "book", difficulty: "Medium", progress: 65 },
  { sound: "sh", example: "ship", difficulty: "Easy", progress: 90 },
  { sound: "ph", example: "phone", difficulty: "Medium", progress: 50 },
  { sound: "gh", example: "laugh", difficulty: "Hard", progress: 20 },
];

export const PhonemeTrainingPage = () => {
  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32">
      <header>
        <h1 className="text-3xl font-black text-white">Phoneme Training</h1>
        <p className="text-slate-400 font-bold">Master the sounds of the galaxy!</p>
      </header>

      <div className="space-y-4">
        {PHONEMES.map((p) => (
          <motion.div 
            key={p.sound}
            whileTap={{ scale: 0.98 }}
            className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#43CBFF]/10 flex items-center justify-center text-2xl font-black text-[#43CBFF] border border-[#43CBFF]/20">
                /{p.sound}/
              </div>
              <div>
                <h3 className="text-lg font-black text-white">{p.example}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    p.difficulty === "Hard" ? "bg-rose-500/10 text-rose-500" :
                    p.difficulty === "Medium" ? "bg-amber-500/10 text-amber-500" : "bg-[#43E97B]/10 text-[#43E97B]"
                  }`}>
                    {p.difficulty}
                  </span>
                  <div className="h-1 w-16 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#43CBFF]" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
            
            <button className="p-4 rounded-full bg-white/5 text-white border border-white/10 active:bg-white/10 transition">
              <Volume2 className="w-6 h-6" />
            </button>
          </motion.div>
        ))}
      </div>

      <section className="bg-[linear-gradient(135deg,#A855F7_0%,#3B82F6_100%)] rounded-[2rem] p-8 text-center text-white">
        <h2 className="text-2xl font-black mb-4">Daily Challenge</h2>
        <p className="text-sm font-bold opacity-90 mb-8">Pronounce 5 "th" words correctly to earn 200 XP!</p>
        <button className="bg-white text-slate-900 px-10 py-4 rounded-full font-black flex items-center gap-2 mx-auto">
          <Mic className="w-5 h-5" /> START NOW
        </button>
      </section>
    </div>
  );
};
