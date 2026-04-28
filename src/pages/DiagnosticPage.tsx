import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Eye, Mic, Activity, CheckCircle, ArrowRight, BookOpen, ArrowLeft } from "lucide-react";

type DiagnosticPhase = 'landing' | 'reading' | 'phonics' | 'report';

export const DiagnosticPage = () => {
  const [phase, setPhase] = useState<DiagnosticPhase>('landing');
  const [recording, setRecording] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const phonicsWords = ["Bright", "Sparkle", "Center"];

  useEffect(() => {
    if (phase === 'reading' && recording) {
      const interval = setInterval(() => {
        setReadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setRecording(false);
            setTimeout(() => setPhase('phonics'), 1000);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase, recording]);

  useEffect(() => {
    if (phase === 'phonics') {
      const timer = setTimeout(() => {
        if (currentWordIndex < phonicsWords.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
        } else {
          setPhase('report');
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [phase, currentWordIndex]);

  if (phase === 'landing') {
    return (
      <div className="min-h-full flex flex-col bg-slate-50 relative pb-10">
        <div className="h-16 flex items-center px-4">
          <Link to="/student" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
        </div>

        <div className="flex-1 flex flex-col px-6 pt-6">
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 mb-12">
            <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-[0_8px_30px_rgb(99,102,241,0.4)]">
              <Activity className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Diagnostic Quest</h1>
            <p className="text-lg text-slate-500 font-bold max-w-[280px]">
              We'll track your eyes and voice while you read. Find a quiet spot!
            </p>
          </div>

          <div className="mt-auto animate-in slide-in-from-bottom-8 duration-700">
            <div className="card p-5 mb-6 flex justify-between items-center bg-white border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                <div>
                  <p className="text-sm font-black text-slate-900">Fall Assessment</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Completed Oct 24</p>
                </div>
              </div>
            </div>

            <button onClick={() => setPhase('reading')} className="btn-primary w-full text-lg py-5 flex items-center justify-center gap-2">
              <Play className="w-6 h-6 fill-white" />
              START QUEST
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'reading') {
    return (
      <div className="min-h-full flex flex-col bg-white animate-in slide-in-from-right duration-500 relative pb-24">
        {/* Top Status Bar */}
        <div className="h-16 flex items-center justify-between px-6 bg-slate-900 text-white rounded-b-[2rem] shadow-lg sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-black uppercase tracking-widest">Tracking Active</span>
          </div>
          <div className={`w-3 h-3 rounded-full ${recording ? 'bg-rose-500 animate-pulse' : 'bg-slate-600'}`}></div>
        </div>

        {/* Reading Passage */}
        <div className="flex-1 px-6 pt-10 pb-8 relative">
          {!recording && readingProgress === 0 && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-10 flex flex-col items-center justify-center px-6">
              <p className="text-2xl font-black text-slate-900 text-center mb-8">Read the passage aloud naturally.</p>
              <button onClick={() => setRecording(true)} className="btn-primary w-full py-5 text-lg">START READING</button>
            </div>
          )}

          <div className="relative z-0">
            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">The Brave Explorer</h2>
            <p className="text-xl leading-[2.2] text-slate-600 font-medium">
              Deep in the dense forest, a small squirrel named Pip decided to go on an adventure. 
              He packed a tiny acorn backpack and set off. 
              <span className={`transition-colors duration-300 ${recording && readingProgress > 30 && readingProgress < 70 ? 'bg-indigo-100 text-indigo-900 rounded px-1' : ''}`}>
                The trees were exceptionally tall
              </span>
              , but Pip was not afraid. He knew that the greatest discoveries require a little bit of bravery.
            </p>
            
            {recording && (
              <div 
                className="w-10 h-10 bg-indigo-500/20 rounded-full absolute gaze-point backdrop-blur-sm"
                style={{
                  top: '60%',
                  left: `${readingProgress}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="fixed bottom-6 left-6 right-6">
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-indigo-600 transition-all duration-75 rounded-full"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'phonics') {
    return (
      <div className="fixed inset-0 z-[100] bg-sky-500 flex flex-col px-6 animate-in fade-in duration-500 mobile-frame">
        <div className="h-16 flex items-center justify-center gap-2 pt-4">
          {phonicsWords.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i <= currentWordIndex ? 'bg-white shadow-[0_0_10px_white]' : 'bg-sky-400'}`} />
          ))}
        </div>

        <div className="flex-1 flex flex-col items-center justify-center pb-20">
          <p className="text-sky-200 font-black uppercase tracking-widest mb-6">Say aloud</p>
          
          <div className="card w-full aspect-square max-w-[300px] bg-white p-8 flex flex-col items-center justify-center shadow-2xl mb-12 animate-in zoom-in duration-300">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter text-center w-full break-words">
              {phonicsWords[currentWordIndex]}
            </h2>
            {currentWordIndex === 1 && (
              <div className="flex justify-center gap-2 mt-6 animate-in fade-in slide-in-from-bottom-4">
                <span className="px-3 py-1.5 bg-rose-100 text-rose-700 font-black rounded-xl text-lg">Spar</span>
                <span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 font-black rounded-xl text-lg">kle</span>
              </div>
            )}
          </div>
          
          <div className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_30px_rgb(244,63,94,0.5)] animate-pulse">
            <Mic className="w-10 h-10 text-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-50 flex flex-col px-6 pt-12 pb-8 animate-in slide-in-from-bottom duration-700">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-[0_8px_30px_rgb(16,185,129,0.4)]">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Complete!</h1>
        <p className="text-sm text-slate-500 font-bold">Profile updated.</p>
      </div>

      <div className="space-y-4 mb-8 flex-1">
        <div className="card p-6 border-l-4 border-indigo-500">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Speed</span>
            <span className="text-2xl font-black text-slate-900">128 <span className="text-sm text-slate-400">WPM</span></span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full"><div className="h-full bg-indigo-500 w-[70%] rounded-full"></div></div>
        </div>
        
        <div className="card p-6 border-l-4 border-emerald-500">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Accuracy</span>
            <span className="text-2xl font-black text-slate-900">92 <span className="text-sm text-slate-400">%</span></span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full"><div className="h-full bg-emerald-500 w-[92%] rounded-full"></div></div>
        </div>

        <div className="card p-6 bg-slate-900 text-white border-none mt-6">
          <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" /> AI Insights
          </h2>
          <p className="text-sm font-medium text-slate-300 leading-relaxed">
            Great pacing! We'll add more multi-syllable practice to your next quests.
          </p>
        </div>
      </div>

      <Link to="/student" className="btn-primary w-full flex items-center justify-center gap-2 py-5 text-lg">
        RETURN TO HUB
      </Link>
    </div>
  );
};
