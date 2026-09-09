"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Book, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const routes = [
  { path: "/", icon: Mail, label: "Carta" },
  { path: "/diario", icon: Book, label: "Planes" },
  { path: "/sobre-mi", icon: ImageIcon, label: "Sobre Mí" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-[#eae5d9] rounded-full px-8 py-3 flex items-center gap-8 shadow-xl z-50">
      {routes.map((route) => {
        const isActive = pathname === route.path;
        const Icon = route.icon;
        return (
          <Link
            key={route.path}
            href={route.path}
            className={`relative p-2 transition-colors ${isActive ? 'text-[#d38c8c]' : 'text-[#a68c74] hover:text-[#d38c8c]'}`}
            title={route.label}
          >
            <Icon size={26} strokeWidth={isActive ? 2.5 : 1.5} />
            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d38c8c]"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}