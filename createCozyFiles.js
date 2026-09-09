const fs = require('fs');
const path = require('path');

const files = {
  'src/app/globals.css': `
@import "tailwindcss";

@theme {
  --font-serif: var(--font-lora);
  --font-hand: var(--font-caveat);
}

* {
  box-sizing: border-box;
}

body {
  /* Paper texture pattern using base64 SVG */
  background-color: #fdfbf7;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  color: #4a4036;
}

/* Polaroids and paper elements */
.polaroid {
  background: white;
  padding: 12px 12px 48px 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #eae5d9;
}

.washi-tape {
  position: absolute;
  width: 100px;
  height: 25px;
  background-color: rgba(239, 218, 220, 0.7);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transform: rotate(-3deg);
  top: -10px;
  left: 50%;
  margin-left: -50px;
  z-index: 10;
  backdrop-filter: blur(2px);
}

.post-it {
  background: #fef08a; /* default yellow */
  padding: 24px;
  box-shadow: 2px 4px 10px rgba(0,0,0,0.08);
  position: relative;
}
.post-it::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  border-width: 0 20px 20px 0;
  border-style: solid;
  border-color: rgba(0,0,0,0.05) white white rgba(0,0,0,0.05);
  display: block;
  width: 0;
}
  `,

  'src/app/layout.tsx': `
import type { Metadata } from "next";
import { Lora, Caveat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Para ti",
  description: "Un pequeño espacio nuestro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={\`\${lora.variable} \${caveat.variable} font-serif min-h-screen pb-24 overflow-x-hidden\`}>
        <ThemeProvider>
          <main className="max-w-4xl mx-auto p-4 md:p-8">
            {children}
          </main>
          <Navigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
  `,

  'src/components/Navigation.tsx': `
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
  `,

  'src/components/PageTransition.tsx': `
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
  `,

  'src/app/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center relative">
        {/* Libreta / Diario */}
        <motion.div 
          initial={{ y: 20, rotate: -2 }}
          animate={{ y: 0, rotate: -2 }}
          className="bg-[#fcfaf5] w-full max-w-lg aspect-[3/4] rounded-r-3xl rounded-l-md shadow-2xl border border-[#e2dac6] relative flex flex-col items-center justify-center p-8 text-center"
        >
          {/* Lomo de la libreta */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#d38c8c] rounded-l-md border-r-2 border-black/5 opacity-80" />
          
          <div className="washi-tape" style={{ top: '20px', left: '80%', transform: 'rotate(15deg)', backgroundColor: 'rgba(182, 210, 196, 0.7)' }}></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="z-10 flex flex-col items-center"
          >
            <Heart className="text-[#d38c8c] mb-6" size={32} strokeWidth={1.5} />
            <h1 className="font-hand text-5xl md:text-6xl text-[#5c4e43] mb-4 leading-tight">
              Un pequeño<br/>espacio nuestro
            </h1>
            <p className="font-serif text-[#9b8d82] text-sm md:text-base mb-12 italic">
              "Cosas que me acordé de ti"
            </p>

            <Link href="/galeria">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-hand text-2xl text-[#d38c8c] border-b-2 border-dashed border-[#d38c8c] pb-1 hover:text-[#b77474] hover:border-[#b77474] transition-colors"
              >
                Abrir diario
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
  `,

  'src/app/galeria/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const polaroids = [
  { id: 1, rot: -4, x: -20, delay: 0.1, text: "Lugar reservado para nuestra primera foto" },
  { id: 2, rot: 3, x: 10, delay: 0.3, text: "Aquí es donde te voy a invitar a pasear" },
  { id: 3, rot: -2, x: 5, delay: 0.5, text: "Cuando por fin vayamos por ese café" },
  { id: 4, rot: 5, x: -10, delay: 0.7, text: "Selfie obligatoria" },
];

export default function Galeria() {
  return (
    <PageTransition>
      <div className="py-12">
        <h1 className="font-hand text-5xl text-center mb-16 text-[#5c4e43]">Polaroids del Futuro</h1>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {polaroids.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50, rotate: p.rot * 3 }}
              animate={{ opacity: 1, y: 0, rotate: p.rot, x: p.x }}
              transition={{ delay: p.delay, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              className="polaroid w-64 h-72 flex flex-col items-center relative cursor-pointer"
            >
              <div className="washi-tape" style={{ top: '-10px', backgroundColor: p.id % 2 === 0 ? 'rgba(239, 218, 220, 0.7)' : 'rgba(182, 210, 196, 0.7)' }}></div>
              
              <div className="w-full flex-grow bg-[#f5f2eb] border border-[#eae5d9] flex items-center justify-center mb-4">
                <p className="font-hand text-slate-300 text-6xl">✏️</p>
              </div>
              <p className="font-hand text-2xl text-center text-[#5c4e43] leading-tight px-2">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
  `,

  'src/app/wishlist/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

const ideas = [
  { id: 1, text: "Ir a probar esos postres", color: "bg-[#fef08a]", rot: -2 },
  { id: 2, text: "Caminar sin rumbo fijo", color: "bg-[#bfdbfe]", rot: 3 },
  { id: 3, text: "Maratón de películas malas", color: "bg-[#bbf7d0]", rot: -1 },
  { id: 4, text: "Un cafecito por la tarde", color: "bg-[#fbcfe8]", rot: 4 },
];

export default function Wishlist() {
  const [approved, setApproved] = useState<number[]>([]);

  const toggleApproval = (id: number) => {
    if (approved.includes(id)) {
      setApproved(approved.filter(a => a !== id));
    } else {
      setApproved([...approved, id]);
    }
  };

  return (
    <PageTransition>
      <div className="py-12">
        <h1 className="font-hand text-5xl text-center mb-4 text-[#5c4e43]">Nuestra lista de ideas</h1>
        <p className="font-serif text-center text-[#9b8d82] italic mb-16">Haz clic para darles el visto bueno</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4 md:p-8 bg-[#dbcca3]/10 border-8 border-[#997950]/20 rounded-2xl relative shadow-inner">
          
          {ideas.map((idea, i) => {
            const isApproved = approved.includes(idea.id);
            return (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: idea.rot }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => toggleApproval(idea.id)}
                className={\`post-it \${idea.color} w-full aspect-square cursor-pointer flex items-center justify-center text-center\`}
              >
                {/* Pin/Chincheta */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-400 shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
                  <div className="w-1 h-1 bg-white/50 rounded-full absolute top-0.5 left-0.5" />
                </div>

                <p className="font-hand text-3xl text-[#5c4e43] leading-snug px-4">
                  {idea.text}
                </p>

                <AnimatePresence>
                  {isApproved && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, opacity: 1, rotate: -10 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute bottom-4 right-4 text-red-500/80"
                    >
                      <Heart size={48} fill="currentColor" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
import { AnimatePresence } from "framer-motion";
  `,

  'src/app/mixtape/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

export default function Mixtape() {
  return (
    <PageTransition>
      <div className="py-12 flex flex-col items-center">
        <h1 className="font-hand text-5xl text-center mb-12 text-[#5c4e43]">Mixtape para ti</h1>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 rounded-xl shadow-md border border-[#eae5d9] w-full max-w-md relative"
        >
          <div className="washi-tape" style={{ top: '-12px', left: '20%', transform: 'rotate(-4deg)' }}></div>
          
          <div className="mb-6">
             <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
          </div>

          <div className="bg-[#f9f8f4] p-4 rounded-lg border border-[#f0ede6]">
            <p className="font-hand text-2xl text-[#6b5c51] leading-relaxed">
              No sé si sea tu estilo, pero cada vez que escucho esta canción me acuerdo de lo bien que la pasamos hablando ese día. 
              <br/><br/>
              Ojalá te guste. 🎵
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
  `,

  'src/app/carta/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function Carta() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageTransition>
      <div className="py-12 flex flex-col items-center justify-center min-h-[70vh]">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="sobre"
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="cursor-pointer group flex flex-col items-center"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-64 h-48 bg-[#ebd9c8] rounded-md shadow-xl relative border border-[#dfc6b1] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                {/* Solapa del sobre */}
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[100px] border-t-[#d3bca5] z-10" />
                <Mail size={48} className="text-[#a68c74] mt-8" strokeWidth={1} />
              </div>
              <p className="font-hand text-2xl text-[#8b7d72] mt-6 group-hover:text-[#d38c8c] transition-colors">
                Toca para abrir
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="carta"
              initial={{ scale: 0.8, opacity: 0, y: 50, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: -2 }}
              className="bg-white p-8 md:p-12 shadow-2xl max-w-lg w-full relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                backgroundAttachment: 'local',
                backgroundPosition: '0 -1px'
              }}
            >
              <div className="washi-tape" style={{ top: '-15px', backgroundColor: 'rgba(239, 218, 220, 0.7)' }}></div>
              
              <div className="font-hand text-3xl text-[#3b3530] leading-[32px] pt-2">
                <p>Hola,</p>
                <br/>
                <p>
                  Sé que todo esto puede ser un poco distinto a lo normal, pero me pareció una forma divertida de mostrarte un poquito de cómo soy.
                </p>
                <br/>
                <p>
                  Disfruto mucho hablar contigo y me gustaría que pronto podamos tachar alguna de esas ideas de la lista en la vida real.
                </p>
                <br/>
                <p>Con cariño,</p>
                <p>El chico de los códigos.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
});
