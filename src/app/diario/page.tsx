"use client";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, ChevronRight, ChevronLeft } from "lucide-react";

export default function Diario() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageSpread, setPageSpread] = useState(1); // 1 = First spread, 2 = Second spread

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
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#d38c8c] rounded-l-md border-r-2 border-black/5 opacity-80" />
              <div className="washi-tape" style={{ top: '20px', left: '80%', transform: 'rotate(15deg)', backgroundColor: 'rgba(182, 210, 196, 0.7)' }}></div>

              <div className="z-10 flex flex-col items-center">
                <Heart className="text-[#d38c8c] mb-6 transition-transform group-hover:scale-110" size={40} strokeWidth={1.5} />
                <h1 className="font-hand text-5xl text-[#5c4e43] mb-4 leading-tight">
                  Mis Notas
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
              {/* === PÁGINA IZQUIERDA === */}
              <div className="w-full md:w-1/2 bg-[#fcfaf5] border border-[#e2dac6] rounded-t-3xl md:rounded-tr-none md:rounded-l-3xl p-6 md:p-10 flex flex-col items-center relative min-h-[500px]"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                     backgroundAttachment: 'local',
                     backgroundPosition: '0 -1px'
                   }}>
                
                {pageSpread === 2 && (
                  <button 
                    onClick={() => setPageSpread(1)}
                    className="absolute top-4 left-4 flex items-center gap-1 font-hand text-xl text-[#a68c74] hover:text-[#d38c8c] transition-colors z-20"
                  >
                    <ChevronLeft size={20} /> Página anterior
                  </button>
                )}


                
                <AnimatePresence mode="wait">
                  {pageSpread === 1 ? (
                    <motion.div key="spread1-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full flex flex-col items-center justify-around gap-8">
                      {/* Post-it 1 */}
                      <div className="post-it bg-[#fef08a] w-full max-w-[240px] flex flex-col items-center justify-center p-5 self-start md:ml-4 shadow-md -rotate-3">
                        <p className="font-hand text-xl text-[#5c4e43] text-center leading-tight">
                          "I want to write you a song<br/>
                          One to make your heart remember me.."
                        </p>
                        <p className="font-serif text-xs text-[#5c4e43]/70 mt-3">— I Want to Write You a Song</p>
                      </div>
                      {/* Post-it 2 */}
                      <div className="post-it bg-[#bbf7d0] w-full max-w-[240px] flex flex-col items-center justify-center p-5 self-end md:mr-8 shadow-md rotate-4">
                        <p className="font-hand text-xl text-[#5c4e43] text-center leading-tight">
                          "I've tried playing it cool<br/>
                          But when I'm looking at you<br/>
                          I can't ever be brave<br/>
                          'Cause you make my heart race"
                        </p>
                        <p className="font-serif text-xs text-[#5c4e43]/70 mt-3">— One Thing</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="spread2-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full flex flex-col items-center justify-center mt-8">
                      {/* EL POEMA DEL USUARIO EN LA PÁGINA IZQUIERDA */}
                      <div className="post-it bg-[#fef08a] w-full max-w-[280px] min-h-[250px] flex flex-col items-center justify-center p-6 shadow-md -rotate-2 relative">
                        <div className="washi-tape" style={{ top: '-10px', left: '50%', backgroundColor: 'rgba(239, 218, 220, 0.7)' }}></div>
                        <p className="font-hand text-2xl text-[#5c4e43] text-center leading-[30px] pt-4">
                          "Aunque tú no lo sepas, ya estaba buscando la forma de coincidir contigo. Esta vez no quise usar un sobre ni papel, preferí escribir líneas de código para dejar mis huellas y ver si te sacaba una sonrisa."
                        </p>
                        <p className="font-serif text-sm text-[#5c4e43]/80 mt-4 text-right w-full">— Stephano</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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

              {/* === PÁGINA DERECHA === */}
              <div className="w-full md:w-1/2 bg-[#fcfaf5] border border-[#e2dac6] rounded-b-3xl md:rounded-bl-none md:rounded-r-3xl p-6 md:p-10 flex flex-col items-center relative min-h-[500px]"
                   style={{
                     backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                     backgroundAttachment: 'local',
                     backgroundPosition: '0 -1px'
                   }}>
                
                {pageSpread === 1 && (
                  <button 
                    onClick={() => setPageSpread(2)}
                    className="absolute top-4 right-4 flex items-center gap-1 font-hand text-xl text-[#a68c74] hover:text-[#d38c8c] transition-colors z-20"
                  >
                    Siguiente página <ChevronRight size={20} />
                  </button>
                )}

                <AnimatePresence mode="wait">
                  {pageSpread === 1 ? (
                    <motion.div key="spread1-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full flex flex-col items-center justify-around gap-8 mt-4 md:mt-12">
                      {/* Post-it 3 */}
                      <div className="post-it bg-[#bfdbfe] w-full max-w-[240px] flex flex-col items-center justify-center p-5 self-center shadow-md -rotate-2">
                        <p className="font-hand text-xl text-[#5c4e43] text-center leading-tight">
                          "I've been watching you all night<br/>
                          There's something in your eyes<br/>
                          Saying c'mon, c'mon<br/>
                          And dance with me, baby"
                        </p>
                        <p className="font-serif text-xs text-[#5c4e43]/70 mt-3">— C'mon, C'mon</p>
                      </div>
                      {/* Post-it 4 */}
                      <div className="post-it bg-[#fbcfe8] w-full max-w-[240px] flex flex-col items-center justify-center p-5 self-start md:ml-12 shadow-md rotate-5">
                        <p className="font-hand text-xl text-[#5c4e43] text-center leading-tight">
                          "Under the lights tonight, you turned around<br/>
                          And you stole my heart with just one look"
                        </p>
                        <p className="font-serif text-xs text-[#5c4e43]/70 mt-3">— Stole My Heart</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="spread2-right" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full flex flex-col items-center justify-center mt-4">
                      {/* NOMBRE EN GRANDE EN LA PÁGINA DERECHA */}
                      <div className="flex items-center justify-center h-full w-full">
                        <h2 className="font-hand text-7xl md:text-8xl text-[#d38c8c] opacity-80 -rotate-2 tracking-wide drop-shadow-sm">
                          VALERIA
                        </h2>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute -top-10 md:-top-12 right-0 font-hand text-xl md:text-2xl text-[#a68c74] hover:text-[#d38c8c] transition-colors"
              >
                Cerrar libreta
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
