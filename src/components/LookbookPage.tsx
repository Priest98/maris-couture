import React from "react";
import { motion } from "motion/react";
import { Compass, Sparkles, MapPin, Eye } from "lucide-react";

interface LookbookSection {
  chapter: string;
  title: string;
  subtitle: string;
  quote: string;
  desc: string;
  image: string;
  coords: string;
}

const lookbookSections: LookbookSection[] = [
  {
    chapter: "CHAPTER I",
    title: "OMISSION OF THE STATIC",
    subtitle: "THE ARCHIVE STUDY",
    quote: "\"Shedding excess is not a loss; it is the absolute discovery of weights.\"",
    desc: "An ongoing study into absolute gravity and silence. We approach garments not as wrappers of form, but as architectural containers that capture the raw space around the wearer. Soft organic double-weave flax creates protective envelopes designed to isolates and elevates.",
    image: "/image/SaveClip.App_701558762_17995630046958075_5275248658664269477_n.jpg",
    coords: "48.092 // N"
  },
  {
    chapter: "CHAPTER II",
    title: "BIOLOGICAL TEXTILITY",
    subtitle: "KINETIC BOUNDARIES",
    quote: "\"The seam is a physical boundary where architecture meets skin.\"",
    desc: "Cultivating fragile boundaries that hold tight against modern acceleration. Raw structural drapes made from biological flax, pressed metals, and waxed canvas sheets that develop scars with touch. An ongoing dialogue between light and dust.",
    image: "/image/SaveClip.App_703433599_17995688906958075_3604819135559276349_n.jpg",
    coords: "12.871 // W"
  },
  {
    chapter: "CHAPTER III",
    title: "COMMUNION OF DUST",
    subtitle: "CHASSIS SILENCE",
    quote: "\"Heavy fabrics shored against modern friction, treating textures as slow emotional language.\"",
    desc: "Watch form erode. A sequence of visual states showing the motion dynamics of double-stitch seams. The lens drifts, leaving the high-contrast textures of premium charcoal fibers exposed. Beautiful, dark, and utterly focused.",
    image: "/image/SaveClip.App_703474177_17996075099958075_4530015394040761226_n.jpg",
    coords: "33.914 // E"
  }
];

export default function LookbookPage() {
  return (
    <div className="relative pt-24 pb-20 w-full min-h-screen bg-luxury-black text-[#d1d1d1] selection:bg-luxury-accent selection:text-luxury-black overflow-hidden select-none">
      
      {/* Absolute faint background lettering */}
      <div className="fixed inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.015] z-0">
        <span className="text-[25vw] font-serif italic text-white uppercase tracking-tighter">L'ECLIPSE</span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 space-y-24 md:space-y-40">
        
        {/* Lookbook Title */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="font-mono text-[8px] tracking-[0.5em] text-white/40 block uppercase">
            SARTORIAL CAMPAIGN NO. 01
          </span>
          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.2em] font-light text-luxury-accent uppercase">
            L'ÉCLIPSE
          </h2>
          <div className="w-12 h-px bg-white/20 mx-auto" />
          <p className="font-serif italic text-xs text-white/50 leading-relaxed font-light">
            An investigation into spatial garment geometry. A luxurious exploration of shadow, form, and pure physical silence. Designed in isolation.
          </p>
        </div>

        {/* Story Blocks */}
        {lookbookSections.map((sec, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div 
              key={sec.chapter}
              className={`flex flex-col md:flex-row items-stretch gap-12 md:gap-20 ${
                isEven ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Photo Frame */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 relative aspect-[4/5] overflow-hidden border border-white/10 group bg-luxury-charcoal shadow-2xl rounded-lg"
              >
                {/* Slow interactive hover scale */}
                <img
                  src={sec.image}
                  alt={sec.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover origin-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-[0.22, 1, 0.36, 1]"
                />

                {/* Overlaid details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[7px] text-white/40 uppercase tracking-widest">
                  COORD // {sec.coords}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                  <span className="font-mono text-[6.5px] px-2 py-0.5 border border-white/20 bg-black/60 rounded">
                    SYS-IMAGE_DEC_0{idx + 1}
                  </span>
                </div>
              </motion.div>

              {/* Text Editorial Details */}
              <div className="flex-1 flex flex-col justify-center space-y-6 max-w-sm md:max-w-none">
                <div className="space-y-1">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-white/40 block">
                    {sec.chapter}
                  </span>
                  <h3 className="font-serif text-2xl tracking-[0.1em] text-white uppercase font-light">
                    {sec.title}
                  </h3>
                  <p className="font-mono text-[7.5px] tracking-[0.2em] text-luxury-accent/50 uppercase">
                    {sec.subtitle}
                  </p>
                </div>

                <div className="w-8 h-px bg-white/20" />

                <h4 className="font-serif italic text-base text-luxury-accent/80 font-light leading-relaxed">
                  {sec.quote}
                </h4>

                <p className="font-sans text-[11px] leading-relaxed text-white/50 tracking-wide font-light">
                  {sec.desc}
                </p>

                {/* Blueprint data coordinate snippet */}
                <div className="pt-4 flex items-center space-x-4 font-mono text-[7.2px] text-white/30 border-t border-white/5">
                  <span className="flex items-center">
                    <Compass className="h-3 w-3 mr-1.5 opacity-60 stroke-[1]" />
                    FOCUS: DYNAMIC POOL
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1.5 opacity-60 stroke-[1]" />
                    FACET: COGNITIVE SEAM
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* Beautiful Campaign Cinematic Signoff */}
        <div className="py-16 text-center border-t border-white/5">
          <p className="font-serif italic text-2xl text-white/40 tracking-[0.1em] font-light">
            "Designed to be discovered in absolute silence."
          </p>
          <span className="font-mono text-[7px] text-white/20 block tracking-widest uppercase mt-4">
            EST. 2026 // PARIS // TOKYO // MILAN
          </span>
        </div>

      </div>
    </div>
  );
}
