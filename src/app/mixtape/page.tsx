"use client";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";

export default function Mixtape() {
  return (
    <PageTransition>
      <div className="py-12 flex flex-col items-center">
        <h1 className="font-hand text-5xl text-center mb-12 text-[#5c4e43]">Mixtape para ti</h1>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 rounded-xl shadow-md border border-[#eae5d9] w-full max-w-md relative"
        >
          <div className="washi-tape" style={{ top: '-12px', left: '20%', transform: 'rotate(-4deg)' }}></div>
          
          <div className="mb-6">
             <iframe 
                style={{ borderRadius: '12px' }} 
                src="https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT?utm_source=generator" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              ></iframe>
          </div>

          <div className="bg-[#f9f8f4] p-4 rounded-lg border border-[#f0ede6]">
            <p className="font-hand text-2xl text-[#6b5c51] leading-relaxed">
              No sé si sea tu estilo, pero cada vez que escucho esta canción me acuerdo de lo bien que la pasamos hablando ese día. 
              <br/><br/>
              Ojalá te guste. 🎵
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}