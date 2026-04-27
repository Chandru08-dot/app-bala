import { Link, NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";

const baseLink =
  "rounded-full px-5 py-2 text-sm font-bold transition hover:bg-white/10 hover:text-white";

export const Navbar = () => {
  const navigate = useNavigate();
  const { role, user, logout } = authStore();

  const links =
    role === "teacher"
      ? [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/upload", label: "Upload Lesson" },
        ]
      : [
          { to: "/dashboard", label: "Dashboard" },
          { to: "/diagnostic", label: "Diagnostic" },
        ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-white/5 bg-[#16132F]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-4 text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] text-xl font-bold text-white shadow-[0_4px_14px_rgba(108,99,255,0.4)]">
            R
          </span>
          <span>
            <span className="block text-2xl font-extrabold tracking-tight text-white">Readable</span>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#43CBFF]">
              Static Demo
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${baseLink} ${
                  isActive
                    ? "bg-[#6C63FF]/20 text-[#43CBFF] shadow-sm ring-1 ring-[#43CBFF]/30"
                    : "text-slate-400 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <span className="hidden items-center rounded-full border border-white/10 bg-[#1E1B4B] px-5 py-2.5 text-sm font-bold text-slate-300 shadow-sm sm:flex">
            {user?.email}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-[linear-gradient(135deg,#6C63FF_0%,#43CBFF_100%)] px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-[0_4px_12px_rgba(108,99,255,0.4)] transition hover:scale-105 active:scale-[0.98]"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};
