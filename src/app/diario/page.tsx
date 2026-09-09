"use client";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function Diario() {
  const [isOpen, setIsOpen] = useState(false);

  // Posiciones predefinidas para los post-its para que parezcan colocados a mano
  const postIts = [
    { id: 1, rot: -3, color: "bg-[#fef08a]", top: "10%", left: "5%" },
    { id: 2, rot: 4, color: "bg-[#bfdbfe]", top: "15%", left: "50%" },
    { id: 3, rot: -2, color: "bg-[#bbf7d0]", top: "50%", left: "10%" },
    { id: 4, rot: 5, color: "bg-[#fbcfe8]", top: "60%", left: "55%" },
  ];

  return (
    <PageTransition>
      <div className="py-8 flex flex-col items-center justify-center min-h-[85vh] overflow-x-hidden">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Libreta Cerrada
            <motion.div
              key="closed"
              initial={{ y: 20, rotate: -2 }}
              animate={{ y: 0, rotate: -2 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fcfaf5] w-full max-w-sm aspect-[3/4] rounded-r-3xl rounded-l-md shadow-2xl border border-[#e2dac6] relative flex flex-col items-center justify-center p-8 text-center cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* Lomo de la libreta */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#d38c8c] rounded-l-md border-r-2 border-black/5 opacity-80" />
              
              <div className="washi-tape" style={{ top: '20px', left: '80%', transform: 'rotate(15deg)', backgroundColor: 'rgba(182, 210, 196, 0.7)' }}></div>

              <div className="z-10 flex flex-col items-center">
                <Heart className="text-[#d38c8c] mb-6 transition-transform group-hover:scale-110" size={40} strokeWidth={1.5} />
                <h1 className="font-hand text-5xl text-[#5c4e43] mb-4 leading-tight">
                  Mi Diario
                </h1>
                <p className="font-serif text-[#9b8d82] text-sm italic group-hover:text-[#d38c8c] transition-colors">
                  Toca para abrir
                </p>
              </div>
            </motion.div>
          ) : (
            // Libreta Abierta (Dos páginas)
            <motion.div
              key="open"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col md:flex-row w-full max-w-4xl min-h-[600px] shadow-2xl relative"
            >
              {/* Página Izquierda */}
              <div className="w-full md:w-1/2 bg-[#fcfaf5] border border-[#e2dac6] rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl p-8 relative"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                     backgroundAttachment: 'local',
                     backgroundPosition: '0 -1px'
                   }}>
                <h2 className="font-hand text-4xl text-[#5c4e43] text-center mb-8">Espacio para pensar...</h2>
                
                {/* Post-it 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: postIts[0].rot }}
                  transition={{ delay: 0.3 }}
                  className={`post-it ${postIts[0].color} absolute w-48 h-48 flex items-center justify-center p-4`}
                  style={{ top: postIts[0].top, left: postIts[0].left }}
                >
                  <p className="font-hand text-xl text-[#5c4e43]/40 text-center">...</p>
                </motion.div>

                {/* Post-it 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: postIts[2].rot }}
                  transition={{ delay: 0.5 }}
                  className={`post-it ${postIts[2].color} absolute w-48 h-48 flex items-center justify-center p-4`}
                  style={{ top: postIts[2].top, left: postIts[2].left }}
                >
                  <p className="font-hand text-xl text-[#5c4e43]/40 text-center">...</p>
                </motion.div>
              </div>

              {/* Lomo central (espiral simulado) */}
              <div className="hidden md:flex flex-col justify-between w-8 bg-[#e8e2d2] border-x border-[#d1c8b4] z-10 py-8">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-full h-4 flex items-center justify-center">
                    <div className="w-6 h-2 bg-[#4a4036] rounded-full shadow-inner opacity-80 rotate-12" />
                  </div>
                ))}
              </div>
              <div className="md:hidden w-full h-4 bg-[#e8e2d2] border-y border-[#d1c8b4] z-10 flex justify-between px-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-full w-4 flex items-center justify-center">
                     <div className="h-6 w-2 bg-[#4a4036] rounded-full shadow-inner opacity-80 -rotate-12" />
                  </div>
                ))}
              </div>

              {/* Página Derecha */}
              <div className="w-full md:w-1/2 bg-[#fcfaf5] border border-[#e2dac6] rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl p-8 relative"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                     backgroundAttachment: 'local',
                     backgroundPosition: '0 -1px'
                   }}>
                
                {/* Post-it 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: postIts[1].rot }}
                  transition={{ delay: 0.4 }}
                  className={`post-it ${postIts[1].color} absolute w-48 h-48 flex items-center justify-center p-4`}
                  style={{ top: postIts[1].top, left: postIts[1].left }}
                >
                  <p className="font-hand text-xl text-[#5c4e43]/40 text-center">...</p>
                </motion.div>

                {/* Post-it 4 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: postIts[3].rot }}
                  transition={{ delay: 0.6 }}
                  className={`post-it ${postIts[3].color} absolute w-48 h-48 flex items-center justify-center p-4`}
                  style={{ top: postIts[3].top, left: postIts[3].left }}
                >
                  <p className="font-hand text-xl text-[#5c4e43]/40 text-center">...</p>
                </motion.div>
                
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 font-hand text-xl text-[#a68c74] hover:text-[#d38c8c] transition-colors"
              >
                Cerrar diario
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
