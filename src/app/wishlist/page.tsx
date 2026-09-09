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
                className={`post-it ${idea.color} w-full aspect-square cursor-pointer flex items-center justify-center text-center`}
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