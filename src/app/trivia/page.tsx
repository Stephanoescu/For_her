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