"use client";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

const polaroids = [
  { id: 1, rot: -4, x: -10, delay: 0.1, text: "Este soy yo (prometo que no soy un asesino en serie 😅)" },
  { id: 2, rot: 3, x: 5, delay: 0.3, text: "Mis habilidades reales: Programar esto y saber dónde venden los mejores postres." },
  { id: 3, rot: -2, x: 0, delay: 0.5, text: "Mi mayor 'red flag': Tomo demasiado café." },
  { id: 4, rot: 5, x: -5, delay: 0.7, text: "Espacio reservado para una foto tuya (si me aceptas un café)" },
];

export default function SobreMi() {
  return (
    <PageTransition>
      <div className="py-12 max-w-5xl mx-auto">
        <h1 className="font-hand text-5xl text-center mb-16 text-[#5c4e43]">Quién soy (por si acaso)</h1>
        
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
          {polaroids.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 50, rotate: p.rot * 3 }}
              animate={{ opacity: 1, y: 0, rotate: p.rot, x: p.x }}
              transition={{ delay: p.delay, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              className="polaroid w-72 flex flex-col items-center relative cursor-pointer"
            >
              <div className="washi-tape" style={{ top: '-10px', backgroundColor: p.id % 2 === 0 ? 'rgba(239, 218, 220, 0.7)' : 'rgba(182, 210, 196, 0.7)' }}></div>
              
              {/* Placeholder for Photo */}
              <div className="w-full aspect-square bg-[#f5f2eb] border border-[#eae5d9] flex flex-col items-center justify-center mb-6 overflow-hidden relative">
                <p className="font-hand text-[#c8c0b5] text-xl opacity-50 absolute">Pon tu foto aquí en el código</p>
                <div className="text-6xl opacity-20">📸</div>
              </div>
              
              <p className="font-hand text-2xl md:text-3xl text-center text-[#5c4e43] leading-tight px-2">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

