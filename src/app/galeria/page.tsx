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