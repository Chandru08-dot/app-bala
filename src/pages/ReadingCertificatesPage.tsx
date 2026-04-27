import React from "react";
import { motion } from "framer-motion";
import { Download, Award, ShieldCheck, ChevronRight } from "lucide-react";

const CERTS = [
  { id: 1, name: "Mercury Explorer", date: "Apr 12, 2026", color: "#FDE68A" },
  { id: 2, name: "Venus Survivor", date: "Apr 25, 2026", color: "#F97316" },
];

import toast from "react-hot-toast";

export const ReadingCertificatesPage = () => {
  const handleDownload = (name: string) => {
    toast.loading(`Generating PDF for ${name}...`, { duration: 1500 });
    setTimeout(() => {
      toast.success(`${name} Certificate Downloaded!`, {
        icon: "📜",
        style: { borderRadius: '1.5rem', background: '#16132F', color: '#fff', border: '1px solid #43CBFF' }
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 p-6 pt-12 pb-32 min-h-screen bg-[#0D0B1E]">
      <header>
        <h1 className="text-3xl font-black text-white">Certificates</h1>
        <p className="text-slate-400 font-bold">Your official explorer records</p>
      </header>

      <div className="space-y-6">
        {CERTS.map((cert) => (
          <motion.div 
            key={cert.id}
            whileTap={{ scale: 0.98 }}
            className="bg-[#16132F] rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Award className="w-32 h-32" />
            </div>
            
            <div className="flex items-center gap-6 mb-8">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                style={{ backgroundColor: `${cert.color}22`, color: cert.color }}
              >
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{cert.name}</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Earned on {cert.date}</p>
              </div>
            </div>

            <button 
              onClick={() => handleDownload(cert.name)}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 font-black text-white flex items-center justify-center gap-2 hover:bg-white/10 transition active:scale-95"
            >
              <Download className="w-5 h-5 text-[#43CBFF]" /> DOWNLOAD PDF
            </button>
          </motion.div>
        ))}
      </div>

      <section className="mt-4 p-8 rounded-[2.5rem] bg-[linear-gradient(135deg,#A855F7_0%,#3B82F6_100%)] text-white relative overflow-hidden">
        <h2 className="text-xl font-black mb-2">Next Goal</h2>
        <p className="text-sm font-bold opacity-90 mb-6">Complete Earth Station to earn your 3rd certificate!</p>
        <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
          <div className="h-full bg-white w-[30%]" />
        </div>
      </section>
    </div>
  );
};
