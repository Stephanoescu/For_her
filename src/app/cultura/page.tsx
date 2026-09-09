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