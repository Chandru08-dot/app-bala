import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Settings, BookOpen, GalleryHorizontalEnd, LayoutDashboard, Heart } from "lucide-react";
import { MOCK_USER } from "../data/mockData";

interface BottomNavProps {
  role: string;
}

export const BottomNav = ({ role }: BottomNavProps) => {
  const location = useLocation();

  const navLinks = {
    student: [
      { path: "/student", label: "Home", icon: Home },
      { path: "/diagnostic", label: "Quests", icon: BookOpen },
      { path: "/progress", label: "Stats", icon: Settings },
      { path: "/gallery", label: "Gallery", icon: GalleryHorizontalEnd },
    ],
    teacher: [
      { path: "/teacher", label: "Roster", icon: LayoutDashboard },
      { path: "/workshop", label: "Lab", icon: BookOpen },
      { path: "/gallery", label: "Gallery", icon: GalleryHorizontalEnd },
    ],
    parent: [
      { path: "/parent", label: "Portal", icon: Heart },
      { path: "/gallery", label: "Gallery", icon: GalleryHorizontalEnd },
    ]
  }[role as keyof typeof MOCK_USER] || [];

  return (
    <div className="absolute bottom-0 w-full px-6 pb-6 pt-4 bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent z-50 pointer-events-none">
      <nav className="bg-white/80 backdrop-blur-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.1)] h-16 rounded-[2rem] flex items-center justify-around px-2 pointer-events-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);
          
          return (
            <Link
              key={link.path}
              to={link.path}
              className="relative flex flex-col items-center justify-center w-16 h-full group"
            >
              {/* Active Indicator Pill */}
              {isActive && (
                <div className="absolute inset-y-2 inset-x-1 bg-indigo-50 rounded-2xl -z-10 animate-in zoom-in duration-300"></div>
              )}
              
              <Icon 
                className={`w-6 h-6 transition-all duration-300 ${
                  isActive ? "text-indigo-600 scale-110" : "text-slate-400 group-hover:text-slate-600"
                }`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              
              {isActive && (
                <span className="text-[9px] font-black tracking-widest uppercase text-indigo-600 mt-1 animate-in fade-in slide-in-from-bottom-1">
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
