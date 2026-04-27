import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { ProgressChart } from "../components/ProgressChart";
import { useStudentProfileQuery, useStudentProgressQuery } from "../hooks/useProfileQueries";
import { MOCK_USERS } from "../data/mockData";

export const StudentDetailPage = () => {
  const { studentId } = useParams();
  const profileQuery = useStudentProfileQuery(studentId);
  const progressQuery = useStudentProgressQuery(studentId);
  const profile = profileQuery.data;
  const progress = progressQuery.data;

  // Find the student name from mocks or fallback
  const studentName = MOCK_USERS.student.id === studentId 
    ? MOCK_USERS.student.full_name 
    : "Student " + studentId;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <section className="rounded-[2.5rem] border border-white/10 bg-[#16132F]/80 p-8 shadow-2xl backdrop-blur-xl">
        <p className="text-sm font-bold uppercase tracking-widest text-[#43CBFF]">Student Detail</p>
        <h1 className="mt-2 text-4xl font-bold text-white">{studentName}</h1>
        <div className="mt-4">
          <Link to="/dashboard" className="text-sm font-bold text-[#6C63FF] hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-[#16132F]/80 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white">Profile stats</h2>
          <div className="mt-6 space-y-4 text-sm">
            <div className="rounded-2xl bg-[#1E1B4B] border border-white/5 px-5 py-4 text-white font-medium">
              Reading level: <span className="font-bold text-[#43CBFF]">{profile?.reading_level ?? "Pending"}</span>
            </div>
            <div className="rounded-2xl bg-[#1E1B4B] border border-white/5 px-5 py-4 text-white font-medium">
              Average accuracy: <span className="font-bold text-[#43E97B]">{profile ? `${profile.avg_accuracy_pct.toFixed(1)}%` : "--"}</span>
            </div>
            <div className="rounded-2xl bg-[#1E1B4B] border border-white/5 px-5 py-4 text-white font-medium">
              Average speed: <span className="font-bold text-white">{profile ? `${profile.avg_speed_wpm.toFixed(0)} WPM` : "--"}</span>
            </div>
            <div className="rounded-2xl bg-[#1E1B4B] border border-white/5 px-5 py-4 text-white font-medium">
              Attention: <span className="font-bold text-[#A855F7]">{profile ? `${Math.round(profile.recent_sessions[0]?.attention_score ?? 85)}%` : "--"}</span>
            </div>
          </div>
        </div>
        {progress?.entries ? (
          <div className="rounded-[2.5rem] border border-white/10 bg-[#16132F]/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Progress Tracker</h2>
            <ProgressChart data={progress.entries} />
          </div>
        ) : null}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <div className="rounded-[2.5rem] border border-white/10 bg-[#16132F]/80 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white">Challenge words</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {["mystery", "expedition", "science", "journey"].map((word) => (
              <span
                key={word}
                className="rounded-full bg-[#6C63FF]/20 border border-[#6C63FF]/50 px-4 py-2 text-sm font-bold text-[#43CBFF]"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-[2.5rem] border border-white/10 bg-[#16132F]/80 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white">Session history</h2>
          <div className="mt-6 space-y-4">
            {(profile?.recent_sessions ?? []).map((session: any) => (
              <div key={session.id} className="rounded-2xl bg-[#1E1B4B] border border-white/5 px-5 py-4">
                <p className="font-bold capitalize text-white text-lg">Lesson: {session.lesson_id}</p>
                <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400 block">Accuracy</span>
                    <span className="font-bold text-[#43E97B]">{session.accuracy_pct ?? "--"}%</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Speed</span>
                    <span className="font-bold text-white">{session.speed_wpm ?? "--"} WPM</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Score</span>
                    <span className="font-bold text-[#A855F7]">{session.attention_score ?? "--"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
