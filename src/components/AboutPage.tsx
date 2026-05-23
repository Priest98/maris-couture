import React from "react";
import { motion } from "motion/react";
import { Hammer, Wind, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative pt-24 pb-20 w-full min-h-screen bg-luxury-black text-[#d1d1d1] selection:bg-luxury-accent selection:text-luxury-black overflow-hidden select-none">
      
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-20 md:space-y-32 relative z-10 font-sans">
        
        {/* Page title split */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-3 select-none"
        >
          <div className="flex items-center gap-4">
            <div className="h-[0.5px] w-12 bg-luxury-accent/30 origin-left" />
            <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 block uppercase">
              ABOUT THE MANIFEST // COGNITIONS
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-6xl tracking-tight text-luxury-accent uppercase font-light">
            THE PHILOSOPHY OF MARIS COUTURE
          </h2>
        </motion.div>

        {/* Section 1: The Vision & Founder's Letter */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
        >
          <div className="md:col-span-4">
            <h3 className="font-serif text-xs tracking-[0.25em] text-white uppercase font-light border-b border-white/10 pb-2">
              01 // ORIGIN MANIFESTO
            </h3>
            <span className="font-mono text-[8px] text-white/40 block mt-2">
              FOUNDER: CREATIVE DIRECTOR MARIS
            </span>
          </div>
          <div className="md:col-span-8 space-y-4">
            <p className="font-serif italic text-base md:text-lg text-luxury-accent font-light leading-relaxed">
              "Every garment begins with a conversation. We established Maris Couture to craft bespoke shields of confidence, designed to capture absolute majesty and individuality."
            </p>
            <p className="text-[11px] md:text-xs text-white/50 leading-relaxed tracking-wide font-light">
              Founded in 2026, Maris Couture represents the union of traditional craftsmanship and contemporary luxury. We craft majestic bridal sets, custom traditional garments, and modern ready-to-wear lines. Every layer is carefully hand-beaded and tailored over many weeks inside our Lagos workspace, using the highest quality laces, rich brocades, and pure silk fibers.
            </p>
          </div>
        </motion.div>

        {/* Section 2: Architectural Craftsmanship & Materials Bento Visual */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="p-6 border border-white/5 bg-luxury-slate space-y-4 rounded-lg cursor-pointer hover:border-white/10 transition-colors duration-300"
          >
            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
              <Wind className="h-4 w-4 text-luxury-accent stroke-[1]" />
            </div>
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-light">
              Sovereign Silhouette
            </h4>
            <p className="text-[10px] text-white/40 leading-relaxed font-light">
              We construct meticulously structural silhouettes designed to sculpt, support, and highlight the wearer's stature, leaving an impression of quiet, commanding authority.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="p-6 border border-white/5 bg-luxury-slate space-y-4 rounded-lg cursor-pointer hover:border-white/10 transition-colors duration-300"
          >
            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
              <Hammer className="h-4 w-4 text-luxury-accent stroke-[1]" />
            </div>
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-light">
              Traditional Heritage
            </h4>
            <p className="text-[10px] text-white/40 leading-relaxed font-light">
              We honor rich cultural narratives through custom elements: hand-dyed local Aso-Oke, exquisite coral ornamentation, and gold bullions tailored directly into structural design schemes.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="p-6 border border-white/5 bg-luxury-slate space-y-4 rounded-lg cursor-pointer hover:border-white/10 transition-colors duration-300"
          >
            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
              <Cpu className="h-4 w-4 text-luxury-accent stroke-[1]" />
            </div>
            <h4 className="font-serif text-sm text-white uppercase tracking-wider font-light">
              Luminous Textiles
            </h4>
            <p className="text-[10px] text-white/40 leading-relaxed font-light">
              All materials are sourced under extreme luxury protocols: finest Chantilly lace, custom heavy brocades, and double-sided fluid silk-satin wrapping layers that flow beautifully with physical movement.
            </p>
          </motion.div>

        </div>

        {/* Section 3: Fine Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16:9] w-full overflow-hidden border border-white/10 bg-luxury-charcoal group rounded-lg"
        >
          <img
            src="/image/SaveClip.App_673141677_17992507199958075_1872653400330052205_n.jpg"
            alt="Atelier workspace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-[3s] ease-[0.22, 1, 0.36, 1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 font-mono text-[7px] text-white/40 uppercase tracking-widest">
            COGNITIVE ATELIER NO.4 // RE-REVAL-22
          </div>
        </motion.div>

        {/* Section 4: Mission statement */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center py-10 max-w-lg mx-auto space-y-4 border-t border-white/5"
        >
          <span className="font-mono text-[8px] text-white/40 tracking-[0.3em] block uppercase">
            THE GEOMETRIC COGNITION
          </span>
          <p className="font-serif italic text-[#eae6df]/85 text-xs leading-relaxed font-light">
            "We believe the garments we wear are the closest shields we have against physical friction. They must represent places of safety, constructed with visual respect, designed to age beautifully inside the shadow of our movements."
          </p>
        </motion.div>

      </div>
    </div>
  );
}
