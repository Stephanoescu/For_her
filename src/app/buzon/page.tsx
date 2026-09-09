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
    const text = encodeURIComponent(`*Buzón de Sugerencias*

*Asunto:* ${subject}
*Mensaje:* ${message}`);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
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