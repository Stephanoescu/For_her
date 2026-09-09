"use client";
import PageTransition from "@/components/PageTransition";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function Carta() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageTransition>
      <div className="py-12 flex flex-col items-center justify-center min-h-[70vh]">
        
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="sobre"
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="cursor-pointer group flex flex-col items-center"
              onClick={() => setIsOpen(true)}
            >
              <div className="w-64 h-48 bg-[#ebd9c8] rounded-md shadow-xl relative border border-[#dfc6b1] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                {/* Solapa del sobre */}
                <div className="absolute top-0 left-0 w-0 h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[100px] border-t-[#d3bca5] z-10" />
                <Mail size={48} className="text-[#a68c74] mt-8" strokeWidth={1} />
              </div>
              <p className="font-hand text-2xl text-[#8b7d72] mt-6 group-hover:text-[#d38c8c] transition-colors">
                Toca para abrir
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="carta"
              initial={{ scale: 0.8, opacity: 0, y: 50, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotate: -2 }}
              className="bg-white p-8 md:p-12 shadow-2xl max-w-lg w-full relative"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #e5e7eb 31px, #e5e7eb 32px)',
                backgroundAttachment: 'local',
                backgroundPosition: '0 -1px'
              }}
            >
              <div className="washi-tape" style={{ top: '-15px', backgroundColor: 'rgba(239, 218, 220, 0.7)' }}></div>
              
              <div className="font-hand text-3xl text-[#3b3530] leading-[32px] pt-2">
                <p>Hola,</p>
                <br/>
                <p>
                  Sé que todo esto puede ser un poco distinto a lo normal, pero me pareció una forma divertida de mostrarte un poquito de cómo soy.
                </p>
                <br/>
                <p>
                  Disfruto mucho hablar contigo y me gustaría que pronto podamos tachar alguna de esas ideas de la lista en la vida real.
                </p>
                <br/>
                <p>Con cariño,</p>
                <p>El chico de los códigos.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}