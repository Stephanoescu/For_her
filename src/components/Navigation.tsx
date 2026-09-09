"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarHeart, Clapperboard, Gamepad2, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const routes = [
  { path: "/", icon: Home, label: "Inicio" },
  { path: "/planes", icon: CalendarHeart, label: "Planes" },
  { path: "/cultura", icon: Clapperboard, label: "Cultura" },
  { path: "/trivia", icon: Gamepad2, label: "Trivia" },
  { path: "/buzon", icon: Mail, label: "Buzón" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2 flex items-center gap-2 shadow-2xl z-50 transition-colors">
      {routes.map((route) => {
        const isActive = pathname === route.path;
        const Icon = route.icon;
        return (
          <Link
            key={route.path}
            href={route.path}
            className={`p-3 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            title={route.label}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
          </Link>
        );
      })}
      
      <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2" />
      
      <button 
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-3 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}