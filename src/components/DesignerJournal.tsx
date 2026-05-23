/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { JournalEntry } from "../types";
import { Library, ArrowRight, BookOpen } from "lucide-react";

interface DesignerJournalProps {
  entries: JournalEntry[];
}

export default function DesignerJournal({ entries }: DesignerJournalProps) {
  const [activeEntryId, setActiveEntryId] = useState<string>(entries[0].id);

  const activeEntry = entries.find(e => e.id === activeEntryId) || entries[0];

  return (
    <section 
      id="journal"
      className="relative min-h-screen w-full bg-[#050505] py-28 px-6 md:px-16 lg:px-24 border-b border-luxury-accent/5 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-luxury-accent/1 blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">
        
        {/* Left Column: Essay Directories (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:space-y-0">
          <div className="space-y-6">
            <span className="font-mono text-[8px] tracking-[0.45em] text-luxury-dim uppercase block">
              04 // SARTORIAL_ESSAYS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-accent tracking-wide font-medium leading-tight select-none">
              THE DESIGNER'S JOURNAL
            </h2>
            
            {/* Divider */}
            <div className="h-[1px] w-12 bg-luxury-accent/45 pt-1" />
            
            <p className="font-serif italic text-sm text-luxury-dim leading-relaxed font-light">
              "We document the chronological progression of our fiber studies, material tensions, and philosophical offsets here."
            </p>
          </div>

          {/* Directory Navigator List */}
          <div className="space-y-4 pt-10">
            <span className="font-mono text-[7px] tracking-widest text-luxury-dim uppercase block pb-2 border-b border-luxury-accent/10">
              ESSAY DIRECTORY (INDEX)
            </span>
            
            <div className="space-y-2">
              {entries.map((entry) => {
                const isActive = entry.id === activeEntryId;

                return (
                  <div
                    key={entry.id}
                    onClick={() => setActiveEntryId(entry.id)}
                    className={`group cursor-pointer flex justify-between items-center p-4 border rounded transition-all duration-700 ${isActive ? "border-luxury-accent/30 bg-luxury-accent/5" : "border-luxury-accent/5 hover:border-luxury-accent/20"}`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-[7px] text-luxury-dim">{entry.date}</span>
                        <span className="font-mono text-[7.5px] bg-luxury-accent/10 px-1.5 py-0.5 rounded text-luxury-accent/70 tracking-widest">{entry.category}</span>
                      </div>
                      <h4 className={`font-serif text-base tracking-wide transition-colors duration-500 ${isActive ? "text-luxury-accent font-medium" : "text-luxury-accent/60 group-hover:text-luxury-accent"}`}>
                        {entry.title.split(" // ")[0]}
                      </h4>
                    </div>
                    <ArrowRight className={`h-4 w-4 transition-all duration-700 ${isActive ? "text-luxury-accent translate-x-1" : "text-luxury-dim/40 group-hover:text-luxury-accent/60"}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footing detail */}
          <div className="hidden lg:flex items-center space-x-3 text-luxury-dim/40 font-mono text-[7.5px]">
            <BookOpen className="h-3.5 w-3.5" />
            <span>METRIC.LIB // VER_O1.2</span>
          </div>
        </div>

        {/* Right Column: Immersive Readout Sheet (7 Columns) */}
        <div className="lg:col-span-7 bg-[#090909]/60 border border-luxury-accent/10 rounded-md p-6 md:p-10 lg:p-12 min-h-[480px] flex flex-col justify-between relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEntry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 flex-1 flex flex-col justify-between"
            >
              {/* Essay Headings */}
              <div className="space-y-4">
                <div className="flex justify-between font-mono text-[7.5px] text-luxury-dim border-b border-luxury-accent/5 pb-2">
                  <span>METADATA // DIRECT_RECORD_0{activeEntry.id.split("-")[1]}</span>
                  <span>DATE: {activeEntry.date}</span>
                </div>

                <div className="space-y-1">
                  <span className="font-mono text-[8.5px] tracking-widest text-luxury-accent/75 uppercase block">{activeEntry.category} EDITION</span>
                  <h3 className="font-serif text-2xl md:text-3xl text-luxury-accent font-medium tracking-wide">
                    {activeEntry.title}
                  </h3>
                </div>
              </div>

              {/* Essay Body Paragraphs */}
              <div className="space-y-6 pt-6 border-t border-luxury-accent/5 flex-1">
                {activeEntry.body.map((para, i) => (
                  <p 
                    key={i} 
                    className="font-serif text-sm md:text-base text-luxury-accent/80 leading-relaxed font-light italic"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Designer Signature overlay in reading card */}
              <div className="pt-8 flex justify-between items-end font-mono text-[6.5px] text-luxury-dim/40 border-t border-luxury-accent/5">
                <span>STAMP LOG: AUTOPRINT_ÉTHER</span>
                <span>SIGNATURE // SEC.DIR.M</span>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Blueprint Corner shapes */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-luxury-accent/20 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-luxury-accent/20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
