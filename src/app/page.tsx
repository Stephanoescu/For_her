"use client";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center relative">
        {/* Libreta / Diario */}
        <motion.div 
          initial={{ y: 20, rotate: -2 }}
          animate={{ y: 0, rotate: -2 }}
          className="bg-[#fcfaf5] w-full max-w-lg aspect-[3/4] rounded-r-3xl rounded-l-md shadow-2xl border border-[#e2dac6] relative flex flex-col items-center justify-center p-8 text-center"
        >
          {/* Lomo de la libreta */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#d38c8c] rounded-l-md border-r-2 border-black/5 opacity-80" />
          
          <div className="washi-tape" style={{ top: '20px', left: '80%', transform: 'rotate(15deg)', backgroundColor: 'rgba(182, 210, 196, 0.7)' }}></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="z-10 flex flex-col items-center"
          >
            <Heart className="text-[#d38c8c] mb-6" size={32} strokeWidth={1.5} />
            <h1 className="font-hand text-5xl md:text-6xl text-[#5c4e43] mb-4 leading-tight">
              Un pequeño<br/>espacio nuestro
            </h1>
            <p className="font-serif text-[#9b8d82] text-sm md:text-base mb-12 italic">
              "Cosas que me acordé de ti"
            </p>

            <Link href="/galeria">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-hand text-2xl text-[#d38c8c] border-b-2 border-dashed border-[#d38c8c] pb-1 hover:text-[#b77474] hover:border-[#b77474] transition-colors"
              >
                Abrir diario
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}