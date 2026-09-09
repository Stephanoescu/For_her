"use client";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

const ideas = [
  { id: 1, text: "Tomar un café y que me cuentes el detrás de cámaras de tus TikToks.", color: "bg-[#fef08a]", rot: -2 },
  { id: 2, text: "Ir por un helado y comprobar si en persona eres igual de genial.", color: "bg-[#bfdbfe]", rot: 3 },
  { id: 3, text: "Caminar un rato y ver si fluimos tan bien como esta página web.", color: "bg-[#bbf7d0]", rot: -1 },
  { id: 4, text: "Elegir tú el plan, yo invito y prometo ser buena compañía.", color: "bg-[#fbcfe8]", rot: 4 },
];

export default function Diario() {
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
        <h1 className="font-hand text-5xl text-center mb-4 text-[#5c4e43]">Posibles Planes</h1>
        <p className="font-serif text-center text-[#9b8d82] italic mb-16">Toca el que más te llame la atención (se valen varios)</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 md:p-10 bg-[#dbcca3]/15 border-[12px] border-[#997950]/20 rounded-xl relative shadow-inner max-w-4xl mx-auto">
          
          {ideas.map((idea, i) => {
            const isApproved = approved.includes(idea.id);
            return (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: idea.rot }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => toggleApproval(idea.id)}
                className={`post-it ${idea.color} w-full aspect-square md:aspect-auto md:min-h-[250px] cursor-pointer flex items-center justify-center text-center`}
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-400 shadow-[0_3px_3px_rgba(0,0,0,0.3)]">
                  <div className="w-1.5 h-1.5 bg-white/60 rounded-full absolute top-0.5 left-0.5" />
                </div>

                <p className="font-hand text-3xl md:text-4xl text-[#5c4e43] leading-snug px-6">
                  {idea.text}
                </p>

                <AnimatePresence>
                  {isApproved && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0, rotate: -20 }}
                      animate={{ scale: 1, opacity: 1, rotate: -10 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute bottom-6 right-6 text-red-500/80 drop-shadow-md"
                    >
                      <Heart size={56} fill="currentColor" />
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
