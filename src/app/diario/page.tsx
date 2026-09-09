"use client";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function Diario() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageTransition>
      <div className="py-12 flex flex-col items-center justify-center min-h-[85vh] w-full px-4 overflow-x-hidden">
        
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
              className="flex flex-col md:flex-row w-full max-w-5xl shadow-2xl relative rounded-3xl"
            >
              {/* Página Izquierda */}
              <div className="w-full md:w-1/2 bg-[#fcfaf5] border border-[#e2dac6] rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl p-6 md:p-10 flex flex-col items-center relative min-h-[500px]"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                     backgroundAttachment: 'local',
                     backgroundPosition: '0 -1px'
                   }}>
                <h2 className="font-hand text-4xl text-[#5c4e43] text-center mb-8 mt-4">Espacio para pensar...</h2>
                
                <div className="flex-1 w-full flex flex-col items-center justify-around gap-8">
                  {/* Post-it 1 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: -3 }}
                    transition={{ delay: 0.3 }}
                    className="post-it bg-[#fef08a] w-full max-w-[200px] aspect-square flex items-center justify-center p-4 self-start md:ml-4 shadow-md"
                  >
                    <p className="font-hand text-xl text-[#5c4e43]/40 text-center">...</p>
                  </motion.div>

                  {/* Post-it 2 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 4 }}
                    transition={{ delay: 0.5 }}
                    className="post-it bg-[#bbf7d0] w-full max-w-[200px] aspect-square flex items-center justify-center p-4 self-end md:mr-8 shadow-md"
                  >
                    <p className="font-hand text-xl text-[#5c4e43]/40 text-center">...</p>
                  </motion.div>
                </div>
              </div>

              {/* Lomo central (espiral simulado) */}
              <div className="hidden md:flex flex-col justify-evenly w-10 bg-[#e8e2d2] border-x border-[#d1c8b4] z-10 py-8">
                {[...Array(14)].map((_, i) => (
                  <div key={i} className="w-full flex items-center justify-center py-2">
                    <div className="w-8 h-2 bg-[#4a4036] rounded-full shadow-inner opacity-80 rotate-12" />
                  </div>
                ))}
              </div>
              <div className="md:hidden w-full h-8 bg-[#e8e2d2] border-y border-[#d1c8b4] z-10 flex justify-evenly px-4 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-full flex items-center justify-center px-2">
                     <div className="h-8 w-2 bg-[#4a4036] rounded-full shadow-inner opacity-80 -rotate-12" />
                  </div>
                ))}
              </div>

              {/* Página Derecha */}
              <div className="w-full md:w-1/2 bg-[#fcfaf5] border border-[#e2dac6] rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl p-6 md:p-10 flex flex-col items-center relative min-h-[500px]"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                     backgroundAttachment: 'local',
                     backgroundPosition: '0 -1px'
                   }}>
                
                <div className="flex-1 w-full flex flex-col items-center justify-around gap-8 mt-4 md:mt-12">
                  {/* Post-it 3 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: -2 }}
                    transition={{ delay: 0.4 }}
                    className="post-it bg-[#bfdbfe] w-full max-w-[200px] aspect-square flex items-center justify-center p-4 self-center shadow-md"
                  >
                    <p className="font-hand text-xl text-[#5c4e43]/40 text-center">...</p>
                  </motion.div>

                  {/* Post-it 4 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 5 }}
                    transition={{ delay: 0.6 }}
                    className="post-it bg-[#fbcfe8] w-full max-w-[200px] aspect-square flex items-center justify-center p-4 self-start md:ml-12 shadow-md"
                  >
                    <p className="font-hand text-xl text-[#5c4e43]/40 text-center">...</p>
                  </motion.div>
                </div>
                
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-10 md:-top-12 right-0 font-hand text-xl md:text-2xl text-[#a68c74] hover:text-[#d38c8c] transition-colors"
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
