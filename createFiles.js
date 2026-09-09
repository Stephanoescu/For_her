const fs = require('fs');
const path = require('path');

const files = {
  'src/components/ThemeProvider.tsx': `
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>{children}</NextThemesProvider>;
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
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
  `,

  'src/components/Navigation.tsx': `
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
            className={\`p-3 rounded-full transition-all duration-300 \${isActive ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'}\`}
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
  `,

  'src/app/layout.tsx': `
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nuestro Espacio",
  description: "Un rinconcito compartido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={\`\${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300 min-h-screen pb-24\`}>
        <ThemeProvider>
          <main className="max-w-5xl mx-auto p-6 md:p-12">
            {children}
          </main>
          <Navigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
  `,

  'src/app/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { CloudRainWind, Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState("Hola");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Buenos días");
    else if (hour < 19) setGreeting("Buenas tardes");
    else setGreeting("Buenas noches");
  }, []);

  return (
    <PageTransition>
      <div className="space-y-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
            {greeting}, <span className="text-indigo-500">¿Cómo va todo?</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Bienvenida a nuestro pequeño espacio digital.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[180px]">
          {/* Weather Widget */}
          <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 flex items-center justify-between shadow-sm border border-white/20 dark:border-slate-700/50">
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">El clima por aquí</h2>
              <p className="text-slate-600 dark:text-slate-400">Perfecto para un café ☕</p>
            </div>
            <CloudRainWind size={64} className="text-blue-500/80 dark:text-blue-400/80" />
          </div>

          {/* Quote */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center text-center">
            <p className="text-lg font-medium italic text-slate-700 dark:text-slate-300">
              "Aquí pondría nuestro chiste interno... si tuviéramos uno oficial."
            </p>
          </div>

          {/* Quick Links Bento */}
          <Link href="/planes" className="group bg-indigo-500 text-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">Ver Planes</h3>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-indigo-100 text-sm">El tablero de nuestras próximas salidas.</p>
          </Link>

          <Link href="/trivia" className="group bg-rose-400 text-white rounded-3xl p-8 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] flex flex-col justify-between col-span-1 md:col-span-2">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">Jugar Trivia</h3>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-rose-100 text-sm">Demuestra qué tanta atención me has puesto.</p>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
  `,

  'src/app/planes/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";
import { motion } from "framer-motion";

const initialTasks = [
  { id: 1, title: "Ir por ese café prometido", status: "Próximamente" },
  { id: 2, title: "Maratón de esa serie que dijiste", status: "Ideas Locas" },
  { id: 3, title: "Probar el lugar de postres", status: "Próximamente" },
  { id: 4, title: "Hablar por primera vez en persona", status: "Completado" },
];

export default function Planes() {
  const [tasks, setTasks] = useState(initialTasks);
  const columns = ["Ideas Locas", "Próximamente", "Completado"];

  const moveTask = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === "Ideas Locas" ? "Próximamente" : (t.status === "Próximamente" ? "Completado" : "Ideas Locas");
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <PageTransition>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold mb-2">El Tablero de Citas 📌</h1>
          <p className="text-slate-500 dark:text-slate-400">Toca un plan para moverlo de columna.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(col => (
            <div key={col} className="bg-slate-100/50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h2 className="font-semibold text-lg mb-4 text-center text-slate-700 dark:text-slate-300">{col}</h2>
              <div className="space-y-3">
                {tasks.filter(t => t.status === col).map(task => (
                  <motion.div
                    layoutId={\`task-\${task.id}\`}
                    key={task.id}
                    onClick={() => moveTask(task.id)}
                    className="bg-white dark:bg-slate-950 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-md transition-shadow active:scale-95"
                  >
                    <p className="font-medium">{task.title}</p>
                  </motion.div>
                ))}
                {tasks.filter(t => t.status === col).length === 0 && (
                  <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-center text-slate-400 dark:text-slate-600 text-sm">
                    Vacío por ahora
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
  `,

  'src/app/cultura/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { Music, Film } from "lucide-react";

export default function Cultura() {
  return (
    <PageTransition>
      <div className="space-y-12">
        <header>
          <h1 className="text-3xl font-bold mb-2">Intercambio Cultural 🍿</h1>
          <p className="text-slate-500 dark:text-slate-400">Películas, series y música para no quedarnos sin tema de conversación.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Film className="text-indigo-500" /> Mis recomendaciones para ti</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mock Card */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="w-24 h-32 bg-slate-200 dark:bg-slate-800 rounded-xl flex-shrink-0 animate-pulse"></div>
              <div className="flex flex-col justify-between py-2">
                <div>
                  <h3 className="font-bold">Una Película Muy Buena</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Te va a volar la cabeza, confía en mí.</p>
                </div>
                <button className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full font-medium w-max hover:bg-indigo-100 transition-colors">
                  Marcar como vista
                </button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Music className="text-rose-500" /> Lo que me has recomendado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col gap-4">
              <div>
                <h3 className="font-bold">Esa canción que mencionaste</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Ya la tengo en loop.</p>
              </div>
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
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
  `,

  'src/app/trivia/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const questions = [
  {
    q: "¿Cuál dije que era mi comida favorita?",
    opts: ["Pizza", "Sushi", "Tacos", "Hamburguesa"],
    a: "Sushi"
  },
  {
    q: "¿De qué soy mejor?",
    opts: ["Programando", "Rompiendo el hielo", "Cocinando", "Durmiendo"],
    a: "Programando"
  },
  {
    q: "¿Cómo se llama este proyecto?",
    opts: ["Bento Box", "Shared Space", "Icebreaker", "App.jsx"],
    a: "Shared Space"
  }
];

export default function Trivia() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (opt: string) => {
    if (opt === questions[current].a) {
      setScore(s => s + 1);
      setFeedback("¡Correcto! 😎");
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    } else {
      setFeedback("Uy no... 🤦‍♂️");
    }

    setTimeout(() => {
      setFeedback("");
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
      } else {
        setFinished(true);
      }
    }, 1200);
  };

  return (
    <PageTransition>
      <div className="max-w-xl mx-auto space-y-8 py-12">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">Mini Trivia 🎮</h1>
          <p className="text-slate-500">Vamos a ver si estabas prestando atención.</p>
        </header>

        {!finished ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <h2 className="text-xl font-medium mb-8 text-center">{questions[current].q}</h2>
            <div className="grid grid-cols-1 gap-3">
              {questions[current].opts.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="bg-slate-50 dark:bg-slate-950 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 font-medium p-4 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedback && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center text-2xl font-bold"
              >
                {feedback}
              </motion.div>
            )}
            <div className="mt-8 text-center text-sm text-slate-400">
              Pregunta {current + 1} de {questions.length}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 text-center space-y-4">
            <h2 className="text-2xl font-bold">¡Terminaste!</h2>
            <p className="text-4xl">{score === questions.length ? "🏆" : "😅"}</p>
            <p className="text-lg">Tu puntuación: {score} / {questions.length}</p>
            <button 
              onClick={() => { setCurrent(0); setScore(0); setFinished(false); }}
              className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full font-medium hover:bg-indigo-600 transition-colors"
            >
              Volver a intentar
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
  `,

  'src/app/buzon/page.tsx': `
"use client";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";
import { Send } from "lucide-react";

export default function Buzon() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  // Reemplaza con tu número de WhatsApp (ej: 34600000000)
  const phoneNumber = "TUNUMEROAQUI"; 

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(\`*Buzón de Sugerencias*\n\n*Asunto:* \${subject}\n*Mensaje:* \${message}\`);
    window.open(\`https://wa.me/\${phoneNumber}?text=\${text}\`, '_blank');
  };

  return (
    <PageTransition>
      <div className="max-w-md mx-auto space-y-8 py-12">
        <header className="text-center">
          <h1 className="text-3xl font-bold mb-2">Buzón Directo 📬</h1>
          <p className="text-slate-500 dark:text-slate-400">Para sugerencias, quejas o simplemente saludar.</p>
        </header>

        <form onSubmit={handleSend} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Asunto</label>
            <input 
              type="text" 
              required
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Ej. Sobre nuestro próximo plan..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mensaje</label>
            <textarea 
              required
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
              placeholder="Escribe lo que quieras..."
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-xl px-4 py-3 flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-md"
          >
            <Send size={18} />
            Enviar mensaje
          </button>
        </form>
      </div>
    </PageTransition>
  );
}
  `,
  
  'src/app/globals.css': `
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter);
}

* {
  box-sizing: border-box;
}

/* Scrollbar styling for modern feel */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #334155;
}
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(__dirname, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\\n');
  console.log('Created:', filepath);
});

// Remove unused files from create-next-app
const unused = ['src/app/page.module.css'];
unused.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
});
