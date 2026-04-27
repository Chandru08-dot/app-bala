import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { authStore } from "../stores/authStore";
import { 
  LayoutDashboard, 
  BookOpen, 
  Upload, 
  Settings, 
  LogOut, 
  Activity, 
  Users,
  Award,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, user, logout } = authStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const studentLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/diagnostic", label: "Diagnostic", icon: Activity },
    { to: "/quests", label: "Quests", icon: Award },
    { to: "/profile", label: "Profile", icon: Settings },
  ];

  const teacherLinks = [
    { to: "/dashboard", label: "Command Center", icon: LayoutDashboard },
    { to: "/students", label: "Students", icon: Users },
    { to: "/upload", label: "Lesson Library", icon: BookOpen },
    { to: "/upload-new", label: "Upload New", icon: Upload },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const links = role === "teacher" ? teacherLinks : studentLinks;

  return (
    <div className="flex h-screen w-64 flex-col border-r border-white/5 bg-[#0D0B1E] shrink-0 sticky top-0">
      <div className="flex h-20 items-center justify-center border-b border-white/5">
        <Link to="/dashboard" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] text-xl font-bold shadow-[0_4px_14px_rgba(108,99,255,0.4)]">
            R
          </div>
          <div>
            <span className="block text-xl font-extrabold tracking-tight">Readable</span>
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#43CBFF]">
              God Mode
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.to || (link.to === '/dashboard' && location.pathname === '/');
            const Icon = link.icon;
            
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#6C63FF]/20 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-xl border border-[#6C63FF]/50 shadow-[0_0_15px_rgba(108,99,255,0.2)]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`h-5 w-5 ${isActive ? "text-[#43CBFF]" : ""}`} />
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/5 p-4">
        <div className="mb-4 rounded-2xl border border-white/10 bg-[#16132F] p-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-lg font-bold text-white shadow-lg">
            {user?.full_name?.charAt(0) || "U"}
          </div>
          <p className="mt-2 text-sm font-bold text-white">{user?.full_name}</p>
          <p className="text-xs font-medium text-[#43CBFF] uppercase tracking-wider">{role}</p>
          
          {role === "student" && (
            <div className="mt-3 flex items-center justify-center gap-1 rounded-full bg-white/5 py-1.5 px-3">
              <Sparkles className="h-3 w-3 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400">Level 12</span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-bold text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-500"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
