import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Fingerprint, Eye, Zap } from "lucide-react";

export const BiometricSplash = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState<"scanning" | "analyzing" | "complete">("scanning");

  useEffect(() => {
    const timer1 = setTimeout(() => setStep("analyzing"), 2000);
    const timer2 = setTimeout(() => setStep("complete"), 4000);
    const timer3 = setTimeout(onComplete, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[2000] bg-[#0D0B1E] flex flex-col items-center justify-center p-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#6C63FF22_0%,transparent_70%)] animate-pulse" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-16"
      >
        <div className="w-48 h-48 rounded-[4rem] border-4 border-[#43CBFF]/20 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {step === "scanning" && (
              <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Fingerprint className="w-24 h-24 text-[#43CBFF] animate-pulse" />
                <motion.div 
                  animate={{ y: [0, 100, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-[#43CBFF] shadow-[0_0_15px_#43CBFF] opacity-50"
                />
              </motion.div>
            )}
            {step === "analyzing" && (
              <motion.div key="analyze" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Eye className="w-24 h-24 text-[#6C63FF] animate-bounce" />
              </motion.div>
            )}
            {step === "complete" && (
              <motion.div key="complete" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                <ShieldCheck className="w-24 h-24 text-[#43E97B]" />
                <Zap className="w-12 h-12 text-[#43E97B] absolute -top-4 -right-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="text-center">
        <h2 className="text-4xl font-[900] text-white uppercase italic tracking-tighter mb-4">
          {step === "scanning" && "Neural Scanning..."}
          {step === "analyzing" && "Authenticating..."}
          {step === "complete" && "Access Granted"}
        </h2>
        <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">
          {step === "scanning" && "Verifying Reading Profile"}
          {step === "analyzing" && "Syncing Galactic Data"}
          {step === "complete" && "Welcome, Explorer"}
        </p>
      </div>
    </div>
  );
};
