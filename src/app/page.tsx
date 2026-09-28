"use client";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, Book, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageTransition>
      <div className="py-8 flex flex-col items-center justify-center min-h-[85vh]">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="sobre"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [-10, 10, -10] }}
              transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" }, opacity: { duration: 0.5 } }}
              className="cursor-pointer group flex flex-col items-center mt-20"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-72 h-52 bg-[#ebd9c8] rounded-md shadow-xl relative border border-[#dfc6b1] flex flex-col items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-t-[110px] border-t-[#d3bca5] z-10" />
                <Mail size={56} className="text-[#a68c74] mt-10" strokeWidth={1} />
              </div>
              <p className="font-hand text-4xl text-[#8b7d72] mt-8 group-hover:text-[#d38c8c] transition-colors">
                MAE
              </p>
              <p className="font-serif text-[#a68c74] text-sm mt-2 italic">Toca para abrir</p>
            </motion.div>
          ) : (
            <motion.div
              key="carta"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white p-6 md:p-10 shadow-2xl max-w-2xl w-full relative mb-12 rounded-sm"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                backgroundAttachment: 'local',
                backgroundPosition: '0 -1px'
              }}
            >
              <div className="washi-tape" style={{ top: '-15px', left: '50%', backgroundColor: 'rgba(182, 210, 196, 0.7)' }}></div>
              
              <div className="font-hand text-2xl md:text-3xl text-[#3b3530] leading-[32px] pt-4 pb-8 space-y-4">
                <p>No sé si sea muy pronto para decir que me gustas, porque apenas nos estamos conociendo. Pero no te voy a mentir: desde que hablamos en esa reunión y al ver las cosas que compartes, me pareciste no solo súper linda, sino que hubo algo en tu vibra que capturó toda mi atención.</p>
                <p>Sé que aún me falta mucho por descubrir. No sé cuál es tu canción favorita, qué te hace reír a carcajadas o cómo eres cuando entras en total confianza. Pero creo que eso es lo más bonito. Con lo poquito que hemos compartido, ya me generaste unas ganas inmensas de conocerte de verdad. No solo por esa sonrisa encantadora, sino por saber cómo eres en el fondo.</p>
                <p>No quiero sonar intenso, solo quiero ser honesto. Me llamas mucho la atención y por eso a veces me pongo un poco nervioso al hablar contigo. No sé qué vaya a pasar, pero me encantaría tener la oportunidad de ir descubriendo poco a poco todo eso que aún no sé de ti.</p>
              </div>

              <div className="mt-8 pt-8 border-t border-dashed border-[#e5e7eb] flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/diario" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#fef08a]/80 hover:bg-[#fef08a] text-[#5c4e43] px-6 py-3 rounded-full font-serif font-medium shadow-sm transition-colors border border-[#fde047]/50"
                  >
                    <Book size={18} />
                    Abrir la Libreta
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}