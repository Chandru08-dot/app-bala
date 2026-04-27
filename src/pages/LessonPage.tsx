import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  Settings, 
  Mic, 
  MicOff, 
  Activity, 
  Eye, 
  ChevronRight,
  Maximize2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GazeTracker, AudioWaveform } from "../components/TelemetrySim";
import { useSettings } from "../stores/settingsStore";
import toast from "react-hot-toast";

const LESSON_TEXT = "The archaeological findings provided deep insights into the ancient civilization. Their knowledge of complex mechanics and architecture was surprisingly advanced for the time.";

export const LessonPage = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [showTelemetry, setShowTelemetry] = useState(true);
  const { fontFamily } = useSettings();
  const [isBionic, setIsBionic] = useState(true);

  const renderBionicText = (text: string) => {
    return text.split(" ").map((word, i) => {
      if (word.length <= 3) return <span key={i} className="mr-1">{word}</span>;
      const mid = Math.ceil(word.length / 2);
      return (
        <span key={i} className="mr-1">
          <b className="font-[900]">{word.slice(0, mid)}</b>
          {word.slice(mid)}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Telemetry HUD */}
      {showTelemetry && <GazeTracker />}

      {/* Medical Header */}
      <header className="flex items-center justify-between p-6 border-b border-slate-100 bg-white/80 backdrop-blur-md z-50">
        <button onClick={() => navigate("/dashboard")} className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Active Session</span>
          <h2 className="text-sm font-black text-slate-900">Advanced Phonetics 4.2</h2>
        </div>
        <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 transition">
          <Settings className="w-6 h-6" />
        </button>
      </header>

      {/* Reading Core */}
      <main className="flex-1 overflow-y-auto p-10 flex flex-col items-center justify-center">
        <div className={`max-w-md text-3xl text-slate-800 leading-relaxed text-center ${fontFamily === 'OpenDyslexic' ? 'dyslexia-mode' : ''}`}>
          {isBionic ? renderBionicText(LESSON_TEXT) : LESSON_TEXT}
        </div>
      </main>

      {/* Analysis Footer */}
      <footer className="p-8 border-t border-slate-100 bg-slate-50/50 backdrop-blur-xl">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isRecording ? "bg-rose-500 text-white animate-pulse" : "bg-blue-100 text-blue-600"}`}>
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase">Neural Voice</p>
                <p className="text-sm font-black text-slate-900">{isRecording ? "Analyzing cadence..." : "Microphone Ready"}</p>
              </div>
            </div>
            <AudioWaveform isActive={isRecording} />
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`flex-1 py-6 rounded-[2.5rem] font-black text-lg transition-all ${isRecording ? "bg-rose-600 text-white shadow-xl shadow-rose-200" : "bg-blue-600 text-white shadow-xl shadow-blue-200"}`}
            >
              {isRecording ? "END ANALYSIS" : "START READING"}
            </button>
            <button 
              onClick={() => setShowTelemetry(!showTelemetry)}
              className={`w-20 rounded-[2.5rem] flex items-center justify-center border-2 transition-all ${showTelemetry ? "border-blue-600 text-blue-600 bg-blue-50" : "border-slate-200 text-slate-400"}`}
            >
              <Eye className="w-6 h-6" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
