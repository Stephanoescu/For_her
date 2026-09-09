"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Book, Image, Pin, Music, MailOpen } from "lucide-react";
import { motion } from "framer-motion";

const routes = [
  { path: "/", icon: Book, label: "Portada" },
  { path: "/galeria", icon: Image, label: "Galería" },
  { path: "/wishlist", icon: Pin, label: "Ideas" },
  { path: "/mixtape", icon: Music, label: "Mixtape" },
  { path: "/carta", icon: MailOpen, label: "Carta" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md border border-[#eae5d9] rounded-full px-6 py-3 flex items-center gap-4 shadow-lg z-50">
      {routes.map((route) => {
        const isActive = pathname === route.path;
        const Icon = route.icon;
        return (
          <Link
            key={route.path}
            href={route.path}
            className="relative p-2 text-[#8b7d72] hover:text-[#d38c8c] transition-colors"
            title={route.label}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d38c8c]"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}