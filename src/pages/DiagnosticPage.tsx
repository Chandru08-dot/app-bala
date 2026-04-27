import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  Brain, 
  Eye, 
  Target, 
  ChevronRight, 
  CheckCircle2, 
  ShieldAlert,
  Zap,
  Volume2
} from "lucide-react";
import toast from "react-hot-toast";

const DIAGNOSTIC_STEPS = [
  { 
    id: 1, 
    title: "Phonological Core", 
    desc: "Assessing sound-symbol relationship and phonetic decoding speed.",
    icon: Brain,
    color: "#3b82f6"
  },
  { 
    id: 2, 
    title: "Visual Saccades", 
    desc: "Measuring eye movement stability and horizontal scanning patterns.",
    icon: Eye,
    color: "#8b5cf6"
  },
  { 
    id: 3, 
    title: "Processing Tempo", 
    desc: "Evaluating the speed of lexical retrieval and word identification.",
    icon: Zap,
    color: "#f59e0b"
  }
];

export const DiagnosticPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const startEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      if (activeStep < DIAGNOSTIC_STEPS.length - 1) {
        setActiveStep(prev => prev + 1);
        toast.success(`${DIAGNOSTIC_STEPS[activeStep].title} Complete!`);
      } else {
        toast.success("Full Reading Profile Generated!", { icon: "📊" });
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-10 p-8 pt-16 pb-40 min-h-screen bg-slate-50">
      <header className="relative">
        <h1 className="text-4xl font-[900] text-slate-900 leading-tight italic tracking-tighter">
          Clinical <br/> <span className="text-blue-600">Diagnostic</span>
        </h1>
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">v4.2 Analysis Protocol</p>
      </header>

      {/* Step Progress */}
      <div className="flex gap-2">
        {DIAGNOSTIC_STEPS.map((step, i) => (
          <div 
            key={step.id} 
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${i <= activeStep ? "bg-blue-600" : "bg-slate-200"}`} 
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl relative overflow-hidden"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-[2rem] bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
              {React.createElement(DIAGNOSTIC_STEPS[activeStep].icon, { className: "w-10 h-10" })}
            </div>
            <div className="flex-1">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Phase {activeStep + 1}</span>
              <h2 className="text-2xl font-black text-slate-900">{DIAGNOSTIC_STEPS[activeStep].title}</h2>
            </div>
          </div>

          <p className="text-lg font-bold text-slate-500 leading-relaxed mb-12">
            {DIAGNOSTIC_STEPS[activeStep].desc}
          </p>

          <div className="space-y-4 mb-12">
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Target className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-black text-slate-600 uppercase">Precision Tracking Active</span>
             </div>
             <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Volume2 className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-black text-slate-600 uppercase">Vocal Syncing Enabled</span>
             </div>
          </div>

          <button 
            onClick={startEvaluation}
            disabled={isEvaluating}
            className={`w-full py-7 rounded-[2.5rem] font-[900] text-xl flex items-center justify-center gap-3 transition-all ${
              isEvaluating 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-blue-600 text-white shadow-xl shadow-blue-100 active:scale-95"
            }`}
          >
            {isEvaluating ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}><Activity className="w-6 h-6" /></motion.div>
            ) : (
              <>BEGIN ASSESSMENT <ChevronRight className="w-6 h-6" /></>
            )}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Profile Insight */}
      <section className="bg-blue-600 rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="w-6 h-6" />
            <h3 className="font-black uppercase text-xs tracking-[0.2em]">Neural Insight</h3>
          </div>
          <p className="text-xl font-bold leading-relaxed">
            "Alex's phonological decoding is currently at the 82nd percentile for Grade 4. Focus on multi-syllabic vowel stabilization."
          </p>
        </div>
        <div className="absolute top-0 right-0 p-10 opacity-10">
           <Brain className="w-40 h-40" />
        </div>
      </section>
    </div>
  );
};
