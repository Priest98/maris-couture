import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle, Compass, Scissors, Info } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

export default function FAQPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: "faq-shipping",
      question: "Which satellite coordinates do you ship to?",
      icon: <Compass className="h-4 w-4" />,
      answer: "We offer secure, complimentary express delivery globally. All shipments are dispatched from our European and Asian satellite nodes (London, Paris, Tokyo) via Carbon-Neutral Courier services, packed inside moisture-sealed protective luxury cases."
    },
    {
      id: "faq-returns",
      question: "What is your return protocol?",
      icon: <Info className="h-4 w-4" />,
      answer: "If an item does not perfectly align with your physical posture, you may initiate a return registration within 14 calendar coordinates from delivery. The item must remain unworn, unprocessed, and with all cast sand copper seal locks intact. We provide complimentary return retrieval labels."
    },
    {
      id: "faq-sizing",
      question: "Sartorial Sizing Guide",
      icon: <Scissors className="h-4 w-4" />,
      answer: "Our sizes represent fluid comfort metrics (XS, S, M, L, XL). Because our jackets, coats, and trenches utilize protective oversized structural silos and asymmetric bias-folds, they rest with casual pooling weight. To capture classic fits, choose your standard size. For complete fitted contours, select one size smaller."
    },
    {
      id: "faq-timelines",
      question: "Delivery Timelines & Transit Reports",
      icon: <HelpCircle className="h-4 w-4" />,
      answer: "Processing takes 1–2 business days as each piece is subject to thorough manual quality vetting before leaving the studio. Standard transit times are 2–4 days for domestic territories and 3–7 business days for global international despatches. Live tracking coordinate feeds will be sent instantly."
    },
    {
      id: "faq-int",
      question: "Do you cover international custom duties?",
      icon: <HelpCircle className="h-4 w-4" />,
      answer: "Yes, all customs duties, local import taxes, and processing documentation fees are completely pre-calculated and integrated into our prices at checkout. There are zero surprise physical custom fees or delays when entering international territories."
    },
    {
      id: "faq-care",
      question: "How should I clean and care for Éther fabrics?",
      icon: <HelpCircle className="h-4 w-4" />,
      answer: "To preserve the biological integrity of our unprocessed cellulose weaves, organic flax coatings, and raw linen yarns, we advise airing garments frequently and dry-cleaning only when strictly necessary. All copper and iron fastings are uncoated; if oxidation occurs with grease/oil, buff gently with a micro-abrasive textile fiber sheet."
    }
  ];

  const toggleFaq = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="relative pt-24 pb-20 w-full min-h-screen bg-luxury-black text-[#d1d1d1] selection:bg-luxury-accent selection:text-luxury-black overflow-hidden select-none">
      
      <div className="max-w-3xl mx-auto px-6 md:px-12 space-y-12 relative z-10 font-sans">
        
        {/* Header */}
        <div className="text-center space-y-3 select-none">
          <div className="flex items-center gap-4 justify-center">
            <div className="h-[0.5px] w-12 bg-luxury-accent/30 origin-right" />
            <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 block uppercase">
              PROTOCOL // EXPLORATIVE
            </span>
            <div className="h-[0.5px] w-12 bg-luxury-accent/30 origin-left" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-luxury-accent uppercase font-light">
            FAQ INDEX
          </h2>
          <p className="font-serif italic text-xs text-white/50 max-w-sm mx-auto leading-relaxed font-light">
            Sartorial guidelines, care specifications, and complimentary transit protocols compiled by our team.
          </p>
        </div>

        {/* Accordions Accumulator */}
        <div className="space-y-4 border-t border-b border-white/5 py-8">
          {faqs.map((faq) => {
            const open = activeId === faq.id;
            return (
              <div 
                key={faq.id}
                className="border border-white/5 bg-luxury-slate rounded-lg overflow-hidden transition-all duration-500 hover:border-white/15"
              >
                {/* Trigger */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between space-x-4 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 rounded bg-white/5 flex items-center justify-center text-luxury-accent/50 group-hover:text-luxury-accent">
                      {faq.icon}
                    </div>
                    <span className="font-serif text-[13px] md:text-sm text-white tracking-wide uppercase font-light">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0 p-1 rounded-full border border-white/10 hover:border-white/20 text-white/50">
                    {open ? (
                      <Minus className="h-3 w-3 stroke-[1.25]" />
                    ) : (
                      <Plus className="h-3 w-3 stroke-[1.25]" />
                    )}
                  </div>
                </button>

                {/* Content area with smooth height transition */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-white/5 text-[11px] md:text-xs text-white/50 leading-relaxed font-light tracking-wide max-w-2xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still need help CTA */}
        <div className="text-center p-6 bg-luxury-slate border border-white/5 rounded-lg space-y-4 max-w-lg mx-auto">
          <span className="font-mono text-[8px] text-white/40 tracking-widest block uppercase">
            UNEXPLORED COORDINATES?
          </span>
          <p className="font-serif italic text-xs text-white/60">
            "Dialogue resides at the heart of our craft. If a coordinate is not answered herein, please connect directly to our concierge Desk."
          </p>
          <div className="w-6 h-[1px] bg-white/20 mx-auto" />
          <span className="font-mono text-[7px] text-luxury-accent block tracking-wider uppercase">
            SUPPORT ACTIVE: 08:00 - 18:00 UTC
          </span>
        </div>

      </div>
    </div>
  );
}
