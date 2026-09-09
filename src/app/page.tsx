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