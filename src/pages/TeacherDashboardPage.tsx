import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, YAxis, Tooltip
} from "recharts";
import { MOCK_TEACHER_ALERTS, MOCK_CLASS_RADAR, MOCK_STUDENTS_LIST } from "../data/mockData";
import { Users, TrendingUp, AlertCircle, CheckCircle, Info, MoreHorizontal } from "lucide-react";

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-[2rem] border border-white/5 bg-[#16132F] p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6C63FF]/20 text-[#6C63FF]">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400">Total Students</p>
              <p className="text-2xl font-black text-white">24</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/5 bg-[#16132F] p-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#43E97B]/20 text-[#43E97B]">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400">Avg Class Accuracy</p>
              <p className="text-2xl font-black text-white">88%</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/5 bg-[#16132F] p-6 shadow-xl md:col-span-2 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Quick Action Needed</h3>
            <p className="text-sm text-slate-400">3 students are struggling with complex vowels.</p>
          </div>
          <button className="rounded-full bg-rose-500/20 px-6 py-3 text-sm font-bold text-rose-400 hover:bg-rose-500 hover:text-white transition">
            Review Interventions
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.7fr,1.3fr]">
        
        {/* Left Column: Radar & Alerts */}
        <div className="space-y-6">
          <section className="rounded-[2.5rem] border border-white/5 bg-[#16132F] p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6C63FF]/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-xl font-bold text-white mb-6 relative z-10">Class Proficiency</h2>
            <div className="h-64 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_CLASS_RADAR}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Class Average" dataKey="A" stroke="#43CBFF" strokeWidth={3} fill="#6C63FF" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-white/5 bg-[#16132F] p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Live Alert Feed</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {MOCK_TEACHER_ALERTS.map((alert) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={alert.id} 
                  className="flex gap-4 p-4 rounded-2xl bg-[#1E1B4B] border border-white/5"
                >
                  <div className="mt-0.5">{getIconForAlert(alert.type)}</div>
                  <div>
                    <p className="text-sm font-medium text-white">{alert.message}</p>
                    <p className="text-xs font-bold text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Massive Data Grid */}
        <div className="space-y-6">
          <section className="rounded-[2.5rem] border border-white/5 bg-[#16132F] p-8 shadow-2xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Student Roster</h2>
                <p className="text-sm text-slate-400 mt-1">Detailed metrics and 7-day sparklines</p>
              </div>
              <button className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 hover:bg-white/5">
                Filter / Sort
              </button>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="text-slate-400 border-b border-white/5">
                  <tr>
                    <th className="pb-4 font-bold uppercase tracking-wider">Student</th>
                    <th className="pb-4 font-bold uppercase tracking-wider">Level</th>
                    <th className="pb-4 font-bold uppercase tracking-wider">Avg Accuracy</th>
                    <th className="pb-4 font-bold uppercase tracking-wider">Avg Speed</th>
                    <th className="pb-4 font-bold uppercase tracking-wider w-32">7-Day Trend</th>
                    <th className="pb-4 font-bold uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_STUDENTS_LIST.map((student, idx) => (
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={student.id}
                      className="group cursor-pointer transition hover:bg-white/5"
                      onClick={() => navigate(`/students/${student.id}`)}
                    >
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-bold text-white text-base group-hover:text-[#43CBFF] transition">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-5">
                        <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-[#A855F7]">
                          Lvl {student.level}
                        </span>
                      </td>
                      <td className="py-5 font-black text-[#43E97B]">
                        {student.accuracy}%
                      </td>
                      <td className="py-5 font-bold text-white">
                        {student.wpm} <span className="text-xs text-slate-500 font-normal">WPM</span>
                      </td>
                      <td className="py-5 h-16 w-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={student.trend.map((v, i) => ({ value: v, index: i }))}>
                            <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke={student.trend[student.trend.length-1] > student.trend[0] ? "#43E97B" : "#F43F5E"} 
                              strokeWidth={3} 
                              dot={false} 
                            />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1E1B4B', border: 'none', borderRadius: '8px' }}
                              itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </td>
                      <td className="py-5 text-right">
                        <button className="text-slate-500 hover:text-white p-2" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
