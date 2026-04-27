import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from "recharts";
import { MOCK_TEACHER_ALERTS, MOCK_CLASS_RADAR, MOCK_STUDENTS_LIST } from "../data/mockData";
import { Users, TrendingUp, AlertCircle, CheckCircle, Info, ChevronRight, Filter } from "lucide-react";
import toast from "react-hot-toast";

const getIconForAlert = (type: string) => {
  switch(type) {
    case 'warning': return <AlertCircle className="w-5 h-5 text-amber-400" />;
    case 'success': return <CheckCircle className="w-5 h-5 text-[#43E97B]" />;
    case 'info': return <Info className="w-5 h-5 text-[#43CBFF]" />;
    default: return <Info className="w-5 h-5 text-slate-400" />;
  }
};

export const TeacherDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 p-4 pt-8 pb-32"
    >
      <header className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-2xl font-black text-white">Class Overview</h1>
          <p className="text-slate-400 text-sm font-bold">24 Active Students</p>
        </div>
        <button 
          onClick={() => toast("Sorting filter coming soon!")}
          className="p-3 rounded-full bg-white/5 border border-white/10"
        >
          <Filter className="w-5 h-5 text-white" />
        </button>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#16132F] rounded-[1.5rem] p-4 border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 flex items-center justify-center mb-3">
            <Users className="w-5 h-5 text-[#6C63FF]" />
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase">Avg Class Lvl</p>
          <p className="text-xl font-black text-white">Lvl 8.4</p>
        </div>
        <div className="bg-[#16132F] rounded-[1.5rem] p-4 border border-white/5">
          <div className="w-10 h-10 rounded-xl bg-[#43E97B]/10 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5 text-[#43E97B]" />
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase">Class Accuracy</p>
          <p className="text-xl font-black text-white">88.5%</p>
        </div>
      </div>

      {/* Radar Chart Section */}
      <section className="bg-[#16132F] rounded-[2rem] p-6 border border-white/5 relative overflow-hidden">
        <h2 className="text-lg font-black text-white mb-6">Class Proficiency</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_CLASS_RADAR}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 600 }} />
              <Radar name="Class Average" dataKey="A" stroke="#43CBFF" strokeWidth={2} fill="#6C63FF" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Intervention Alert */}
      <section className="bg-rose-500/10 border border-rose-500/20 rounded-[2rem] p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-white text-base">Intervention Needed</h3>
            <p className="text-sm text-slate-400 mt-1">3 students are struggling with complex vowels and diphthongs.</p>
            <button 
              onClick={() => toast("Opening Intervention Module...")}
              className="mt-4 px-6 py-2 rounded-full bg-rose-500 text-white font-black text-xs"
            >
              REVIEW CASES
            </button>
          </div>
        </div>
      </section>

      {/* Student Roster Cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-black text-white px-2">Student Roster</h2>
        <div className="space-y-3">
          {MOCK_STUDENTS_LIST.map((student) => (
            <div 
              key={student.id}
              onClick={() => navigate(`/students/${student.id}`)}
              className="bg-[#16132F] border border-white/5 rounded-2xl p-4 flex items-center gap-4 active:scale-98 transition"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg shrink-0">
                {student.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-white truncate">{student.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-[#A855F7] bg-[#A855F7]/10 px-2 py-0.5 rounded">Lvl {student.level}</span>
                  <span className="text-[10px] font-bold text-[#43E97B] bg-[#43E97B]/10 px-2 py-0.5 rounded">{student.accuracy}% Acc</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};
