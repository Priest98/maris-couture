/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ChevronDown, Sparkles } from "lucide-react";
import { CinematicScene } from "../types";

interface CinematicScrollerProps {
  scenes: CinematicScene[];
  exposure: number;
}

export default function CinematicScroller({ scenes, exposure }: CinematicScrollerProps) {
  // Compute focal blur filter based on exposure (under-exposure creates dramatic camera blur)
  const computeImageFilter = (defaultExp: number) => {
    // scale exposure relative to scene's default recommendation
    const relativeExp = exposure;
    const brightness = relativeExp;
    const contrast = 1 + (relativeExp - 0.75) * 0.45;
    const blurAmount = Math.max(0, (0.85 - relativeExp) * 12);
    
    return {
      filter: `brightness(${brightness}) contrast(${contrast}) blur(${blurAmount}px)`,
      transition: "filter 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
    };
  };

  return (
    <div className="relative w-full overflow-hidden">
      {scenes.map((scene, index) => {
        const isFirst = index === 0;

        return (
          <section
            key={scene.id}
            id={isFirst ? "monolith" : `scene-${index + 1}`}
            className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-28 border-b border-luxury-accent/5 overflow-hidden"
          >
            {/* Subtle floating coordinate markers in background */}
            <div className="absolute top-12 left-12 font-mono text-[7px] tracking-[0.3em] text-luxury-dim/20 pointer-events-none select-none">
              INDEX_0{index + 1} // POS: {scene.coordinates.x} / {scene.coordinates.y}
            </div>

            {/* Asymmetrical Layout Content */}
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
              
              {/* Left Part: Narrative Copy & Staggered Typography */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col space-y-6 md:space-y-8 select-none">
                <div className="space-y-2">
                  <motion.span 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="font-mono text-[8px] tracking-[0.4em] text-luxury-dim uppercase block"
                  >
                    {scene.subtitle}
                  </motion.span>
                  
                  <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.15, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif text-3xl md:text-4xl text-luxury-accent font-medium tracking-wide flex flex-col"
                  >
                    {scene.title}
                  </motion.h2>
                </div>

                {/* Micro thin divider */}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "40px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 1.5 }}
                  className="h-[1px] bg-luxury-accent/40"
                />

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.35, duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif italic text-base md:text-lg text-luxury-accent/80 leading-relaxed max-w-md font-light"
                >
                  {scene.caption}
                </motion.p>

                {/* Metadata Coordinates Details */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 2.0 }}
                  className="flex items-center space-x-4 font-mono text-[8px] tracking-widest text-luxury-dim"
                >
                  <span className="flex items-center">
                    <Sparkles className="h-2.5 w-2.5 mr-2 stroke-[1]" />
                    AMBIENT SOUND: {scene.soundFreq}HZ
                  </span>
                  <span>//</span>
                  <span>EXP.RECOMMEND: {scene.exposureDefault}</span>
                </motion.div>
              </div>

              {/* Right Part: Massive Asymmetric Cinematic Portrait Image Layer */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center lg:justify-end">
                <motion.div 
                  initial={{ opacity: 0, scale: 1.05, filter: "brightness(0)" }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[16:10] w-full md:w-[90%] bg-luxury-charcoal flex overflow-hidden group shadow-2xl border border-white/10"
                >
                  {/* Outer Immersive Glow & Glass Reflection Overlay */}
                  <div className="absolute inset-0 bg-white/[0.02] border border-white/5 blur-[0.5px] group-hover:blur-none transition-all duration-[2s] scale-102 opacity-60 pointer-events-none z-10" />

                  {/* Fine Hover Overlay Layer detailing Blueprint Specifications within the photography image itself! */}
                  <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-luxury-black/35 backdrop-blur-[1px] pointer-events-none p-4 flex flex-col justify-between">
                    <div className="flex justify-between font-mono text-[7px] text-luxury-accent/50">
                      <span>LENS // CONTINUOUS FOCUS</span>
                      <span>DIALECTRIC_REFRACT</span>
                    </div>
                    <div className="flex items-end justify-between font-mono text-[7px] text-luxury-accent/50 border-t border-luxury-accent/10 pt-2">
                      <span>MAPPED SEAM STRUCTURE O1</span>
                      <span>ACTIVE VIEWPORT</span>
                    </div>
                  </div>

                  <motion.img
                    src={scene.image}
                    alt={scene.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover origin-center z-0"
                    style={computeImageFilter(scene.exposureDefault)} // binds dynamically to exposure slider!
                  />

                  {/* Immersive UI: Camera crosshairs in focal center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1px] bg-white/40 z-20 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/40 z-20 pointer-events-none" />

                  {/* Corner styling braces common in blueprint viewfinders */}
                  <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-luxury-accent/30 pointer-events-none z-10" />
                  <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-luxury-accent/30 pointer-events-none z-10" />
                  <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-luxury-accent/30 pointer-events-none z-10" />
                  <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-luxury-accent/30 pointer-events-none z-10" />
                </motion.div>
              </div>

            </div>

            {/* Bottom: Downward Navigation Guide for First Section */}
            {isFirst && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="absolute bottom-8 flex flex-col items-center space-y-2 pointer-events-none select-none"
              >
                <span className="font-mono text-[7px] tracking-[0.4em] text-luxury-dim uppercase">
                  scroll.to.explore
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-luxury-accent/60 animate-bounce" />
              </motion.div>
            )}

            {/* Soft Ambient lighting flare in background */}
            <div className="absolute right-[-10%] bottom-[-10%] w-[50vw] h-[50vw] rounded-full bg-luxury-accent/2 blur-[150px] pointer-events-none" />
          </section>
        );
      })}
    </div>
  );
}
