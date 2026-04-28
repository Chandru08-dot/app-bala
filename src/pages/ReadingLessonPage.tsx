import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Square, Settings2, BookOpen, Type, Navigation, Network, ArrowLeft, CheckCircle, X } from "lucide-react";
import { MOCK_LESSONS, MOCK_PERSONALIZED_OUTPUTS } from "../data/mockData";

export const ReadingLessonPage = () => {
  const { id } = useParams();
  const lesson = MOCK_LESSONS.find(l => l.lesson_id === id) || MOCK_LESSONS[0];
  
  const [bionic, setBionic] = useState(false);
  const [syllables, setSyllables] = useState(false);
  const [pacer, setPacer] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showTools, setShowTools] = useState(false);

  const text = MOCK_PERSONALIZED_OUTPUTS[0].content;
  const words = text.split(" ");

  const formatWord = (word: string, index: number) => {
    if (bionic) {
      const mid = Math.ceil(word.length / 2);
      return (
        <span key={index} className="inline-block mr-1.5 mb-2">
          <b className="font-black text-slate-900">{word.slice(0, mid)}</b>
          <span className="text-slate-500">{word.slice(mid)}</span>
        </span>
      );
    }
    if (syllables && word.length > 4) {
      const mid = Math.floor(word.length / 2);
      return (
        <span key={index} className="inline-block mr-1.5 mb-2">
          <span className="text-indigo-600">{word.slice(0, mid)}</span>
          <span className="text-slate-300 mx-[1px]">-</span>
          <span className="text-emerald-600">{word.slice(mid)}</span>
        </span>
      );
    }
    return <span key={index} className="inline-block mr-1.5 mb-2 text-slate-700">{word}</span>;
  };

  if (completed) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center text-center px-6 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_8px_30px_rgb(16,185,129,0.4)]">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Complete!</h1>
        <p className="text-lg text-slate-500 font-bold mb-12">94% accuracy • 3 new words</p>
        <Link to="/student" className="btn-primary w-full py-5 text-lg">RETURN TO HUB</Link>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50 relative overflow-hidden animate-in fade-in duration-500">
      
      {/* Top Header */}
      <div className="h-16 flex items-center justify-between px-4 bg-white/80 backdrop-blur-md z-40 border-b border-slate-100 shrink-0">
        <Link to="/student" className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1 px-4 text-center">
          <h2 className="text-sm font-black text-slate-900 truncate">{lesson.title}</h2>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest truncate">{lesson.support_focus}</p>
        </div>
        <button onClick={() => setShowTools(true)} className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Main Reading Surface */}
      <div className="flex-1 overflow-y-auto px-6 py-8 relative">
        <div className="max-w-xl mx-auto">
          <p className="text-2xl leading-[2] font-medium transition-all">
            {words.map((w, i) => formatWord(w, i))}
          </p>

          {showMap && (
            <div className="mt-12 p-6 card-glass border-indigo-200 bg-indigo-50/50 animate-in fade-in slide-in-from-top-4">
              <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-1">
                <Network className="w-4 h-4" /> Story Map
              </h4>
              <div className="flex flex-col items-center gap-2 text-center font-bold text-sm">
                <div className="px-4 py-3 bg-amber-100 text-amber-800 rounded-xl w-full">The Sun</div>
                <div className="w-0.5 h-6 bg-slate-300"></div>
                <div className="px-4 py-3 bg-sky-100 text-sky-800 rounded-xl w-full">8 Planets</div>
                <div className="w-0.5 h-6 bg-slate-300"></div>
                <div className="px-4 py-3 bg-emerald-100 text-emerald-800 rounded-xl w-full">Earth</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="card p-4 mx-4 mb-4 mt-auto shrink-0 flex justify-between items-center shadow-lg relative z-40 bg-white">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPacer(!pacer)}
            className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center transition-all ${pacer ? 'bg-amber-500 text-white shadow-[0_4px_20px_rgb(245,158,11,0.4)]' : 'bg-slate-100 text-slate-600'}`}
          >
            {pacer ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          <div className="hidden sm:block">
            <p className="text-sm font-black text-slate-900">{pacer ? 'Pacer On' : 'Start Pacer'}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase">120 WPM</p>
          </div>
        </div>
        <button onClick={() => setCompleted(true)} className="btn-primary py-3 px-6 text-sm">
          FINISH
        </button>
      </div>

      {/* Tools Bottom Sheet */}
      {showTools && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in" onClick={() => setShowTools(false)}></div>
          
          <div className="bg-white rounded-t-[2rem] p-6 pb-12 animate-in slide-in-from-bottom relative z-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-indigo-500" /> Reading Tools
              </h3>
              <button onClick={() => setShowTools(false)} className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 card border-slate-100 active:bg-slate-50">
                <span className="flex items-center gap-3 font-bold text-slate-700">
                  <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center"><BookOpen className="w-4 h-4 text-indigo-500" /></div>
                  Bionic Reading
                </span>
                <input type="checkbox" className="sr-only peer" checked={bionic} onChange={() => { setBionic(!bionic); setSyllables(false); }} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 relative"></div>
              </label>

              <label className="flex items-center justify-between p-4 card border-slate-100 active:bg-slate-50">
                <span className="flex items-center gap-3 font-bold text-slate-700">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center"><Type className="w-4 h-4 text-emerald-500" /></div>
                  Syllables
                </span>
                <input type="checkbox" className="sr-only peer" checked={syllables} onChange={() => { setSyllables(!syllables); setBionic(false); }} />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600 relative"></div>
              </label>

              <button 
                onClick={() => { setShowMap(!showMap); setShowTools(false); }}
                className={`w-full py-4 rounded-[1.5rem] font-black flex items-center justify-center gap-2 transition-colors border-2 ${showMap ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-white border-slate-200 text-slate-700'}`}
              >
                <Network className="w-5 h-5" /> 
                {showMap ? 'Hide Story Map' : 'Generate Story Map'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
