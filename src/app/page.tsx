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
              <p className="font-hand text-3xl text-[#8b7d72] mt-8 group-hover:text-[#d38c8c] transition-colors">
                Para ti...
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
                <p>No sé si sea correcto decir que me gustas, porque la verdad es que apenas te conozco. Pero no te voy a mentir, desde que empecé a ver tus TikToks, tus fotos y algunas cosas que compartes, me pareciste una chica muy linda y hubo algo en ti que simplemente llamó mi atención.</p>
                <p>Y sé que realmente conozco muy poquito de ti. No sé cuál es tu canción favorita, qué cosas te hacen reír de verdad, qué te apasiona, qué cosas te molestan o cómo eres cuando tienes confianza con alguien. No conozco todavía esa parte de ti que solo se descubre con el tiempo.</p>
                <p>Pero supongo que justamente eso es lo bonito. Que con tan poquito que he visto de ti ya me hayas generado esa curiosidad de querer conocerte más, no solamente por lo linda que me pareces, sino por saber cómo eres realmente.</p>
                <p>No quiero hacer como si ya supiera todo de ti ni decirte cosas demasiado intensas cuando apenas estamos empezando a conocernos. Simplemente me llamaste la atención, me pareces una chica muy linda y, por lo poco que he podido conocer de ti, me dejaste con ganas de saber mucho más.</p>
                <p>Quizás por eso me pongo un poco nervioso cuando hablo contigo o termino pensando en ti después de ver alguna foto o algún TikTok tuyo. No sé exactamente qué vaya a pasar, pero sí sé que me gustaría tener la oportunidad de conocerte un poquito más y descubrir por mí mismo todo eso que todavía no sé de ti.</p>
              </div>

              <div className="mt-8 pt-8 border-t border-dashed border-[#e5e7eb] flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/diario" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#fef08a]/80 hover:bg-[#fef08a] text-[#5c4e43] px-6 py-3 rounded-full font-serif font-medium shadow-sm transition-colors border border-[#fde047]/50"
                  >
                    <Book size={18} />
                    Ver posibles planes
                  </motion.button>
                </Link>

                <Link href="/sobre-mi" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 bg-[#e0f2fe]/80 hover:bg-[#e0f2fe] text-[#5c4e43] px-6 py-3 rounded-full font-serif font-medium shadow-sm transition-colors border border-[#bae6fd]/50"
                  >
                    <ImageIcon size={18} />
                    Quién soy (por si acaso)
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