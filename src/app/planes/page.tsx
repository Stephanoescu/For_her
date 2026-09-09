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
                    layoutId={`task-${task.id}`}
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