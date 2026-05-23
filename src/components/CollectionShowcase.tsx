/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { CollectionItem } from "../types";
import { Target, ArrowUpRight } from "lucide-react";

interface CollectionShowcaseProps {
  items: CollectionItem[];
  onSelectItem: (item: CollectionItem) => void;
}

export default function CollectionShowcase({ items, onSelectItem }: CollectionShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Divide items into lists or handle asymmetrically in layout index mappings
  return (
    <section 
      id="collection"
      className="relative min-h-screen w-full bg-[#080808] py-28 px-6 md:px-16 border-b border-luxury-accent/5 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-luxury-accent/2 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-luxury-accent/1 blur-[100px] pointer-events-none" />

      {/* Header section with spacious, luxury typography pairing */}
      <div className="w-full max-w-6xl mx-auto mb-16 md:mb-24 space-y-4 relative z-10">
        <span className="font-mono text-[8px] tracking-[0.45em] text-luxury-dim uppercase block">
          02 // METRIC_FORM
        </span>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-accent tracking-wide font-medium">
            VESTIGES OF STRUCTURE
          </h2>
          <span className="font-mono text-[8px] tracking-[0.3em] text-luxury-dim uppercase">
            CHRONICLE_V1 // RE-FABRIC_STUDY
          </span>
        </div>
        <div className="h-[1px] w-full bg-luxury-accent/10 pt-1" />
      </div>

      {/* Editorial Asymmetric Grid */}
      <div className="w-full max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-x-12 lg:gap-x-16">
        
        {/* Item 1 (Wide Left - 7 Cols) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div className="group cursor-pointer space-y-6" onClick={() => onSelectItem(items[0])}>
            <div 
              onMouseEnter={() => setHoveredId(items[0].id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-[4/3] w-full overflow-hidden bg-luxury-charcoal/20 rounded shadow-xl border border-luxury-accent/10"
            >
              <img 
                src={hoveredId === items[0].id && items[0].hoverImage ? items[0].hoverImage : items[0].image}
                alt={items[0].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-1200 ease-out group-hover:scale-103 group-hover:brightness-90"
              />
              
              {/* Dynamic Coordinate Tag */}
              <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-widest text-luxury-accent/60 bg-luxury-black/80 border border-luxury-accent/10 px-2.5 py-1 rounded flex items-center space-x-2">
                <Target className="h-3 w-3 stroke-[1.2]" />
                <span>LOC // {items[0].coordinate}</span>
              </div>
            </div>

            <div className="flex justify-between items-start pt-2">
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-luxury-dim tracking-widest uppercase">{items[0].category}</span>
                <h3 className="font-serif text-xl tracking-wide text-luxury-accent group-hover:text-luxury-accent/75 transition-colors duration-500 font-medium">
                  {items[0].name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-luxury-accent/70">{items[0].price}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-luxury-accent/40 group-hover:text-luxury-accent transition-all duration-500 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Item 2 (Compact Offset Right - 5 Cols (Nudges Down on Desktop)) */}
        <div className="md:col-span-5 md:pt-24 flex flex-col justify-between">
          <div className="group cursor-pointer space-y-6" onClick={() => onSelectItem(items[1])}>
            <div 
              onMouseEnter={() => setHoveredId(items[1].id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-[3/4] w-full overflow-hidden bg-luxury-charcoal/20 rounded shadow-xl border border-luxury-accent/10"
            >
              <img 
                src={hoveredId === items[1].id && items[1].hoverImage ? items[1].hoverImage : items[1].image}
                alt={items[1].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-1200 ease-out group-hover:scale-103 group-hover:brightness-90"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-widest text-luxury-accent/60 bg-luxury-black/80 border border-luxury-accent/10 px-2.5 py-1 rounded flex items-center space-x-2">
                <Target className="h-3 w-3 " />
                <span>LOC // {items[1].coordinate}</span>
              </div>
            </div>

            <div className="flex justify-between items-start pt-2">
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-luxury-dim tracking-widest uppercase">{items[1].category}</span>
                <h3 className="font-serif text-xl tracking-wide text-luxury-accent group-hover:text-luxury-accent/75 transition-colors duration-500 font-medium">
                  {items[1].name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-luxury-accent/70">{items[1].price}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-luxury-accent/40 group-hover:text-luxury-accent transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Item 3 (Centered Offset - 5 Cols) */}
        <div className="md:col-span-5 md:pt-12 flex flex-col justify-between">
          <div className="group cursor-pointer space-y-6" onClick={() => onSelectItem(items[2])}>
            <div 
              onMouseEnter={() => setHoveredId(items[2].id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-[3/4] w-full overflow-hidden bg-luxury-charcoal/20 rounded shadow-xl border border-luxury-accent/10"
            >
              <img 
                src={hoveredId === items[2].id && items[2].hoverImage ? items[2].hoverImage : items[2].image}
                alt={items[2].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-1200 ease-out group-hover:scale-103 group-hover:brightness-90"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-widest text-luxury-accent/60 bg-luxury-black/80 border border-luxury-accent/10 px-2.5 py-1 rounded flex items-center space-x-2">
                <Target className="h-3 w-3 " />
                <span>LOC // {items[2].coordinate}</span>
              </div>
            </div>

            <div className="flex justify-between items-start pt-2">
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-luxury-dim tracking-widest uppercase">{items[2].category}</span>
                <h3 className="font-serif text-xl tracking-wide text-luxury-accent group-hover:text-luxury-accent/75 transition-colors duration-500 font-medium">
                  {items[2].name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-luxury-accent/70">{items[2].price}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-luxury-accent/40 group-hover:text-luxury-accent transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Item 4 (Asymmetric Lower Right - 7 columns and nudges significantly down) */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <div className="group cursor-pointer space-y-6" onClick={() => onSelectItem(items[3])}>
            <div 
              onMouseEnter={() => setHoveredId(items[3].id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-[16/10] w-full overflow-hidden bg-luxury-charcoal/20 rounded shadow-xl border border-luxury-accent/10"
            >
              <img 
                src={hoveredId === items[3].id && items[3].hoverImage ? items[3].hoverImage : items[3].image}
                alt={items[3].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-1200 ease-out group-hover:scale-103 group-hover:brightness-90"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-widest text-luxury-accent/60 bg-luxury-black/80 border border-luxury-accent/10 px-2.5 py-1 rounded flex items-center space-x-2">
                <Target className="h-3 w-3 " />
                <span>LOC // {items[3].coordinate}</span>
              </div>
            </div>

            <div className="flex justify-between items-start pt-2">
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-luxury-dim tracking-widest uppercase">{items[3].category}</span>
                <h3 className="font-serif text-xl tracking-wide text-luxury-accent group-hover:text-luxury-accent/75 transition-colors duration-500 font-medium">
                  {items[3].name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-luxury-accent/70">{items[3].price}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-luxury-accent/40 group-hover:text-luxury-accent transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Item 5 (Centered Wide Bottom - 8 Columns, offset with margin) */}
        <div className="md:col-start-3 md:col-span-8 flex flex-col justify-between pt-12 md:pt-24">
          <div className="group cursor-pointer space-y-6" onClick={() => onSelectItem(items[4])}>
            <div 
              onMouseEnter={() => setHoveredId(items[4].id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative aspect-[16/9] w-full overflow-hidden bg-luxury-charcoal/20 rounded shadow-xl border border-luxury-accent/10"
            >
              <img 
                src={hoveredId === items[4].id && items[4].hoverImage ? items[4].hoverImage : items[4].image}
                alt={items[4].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-1200 ease-out group-hover:scale-103 group-hover:brightness-90"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-widest text-luxury-accent/60 bg-luxury-black/80 border border-luxury-accent/10 px-2.5 py-1 rounded flex items-center space-x-2">
                <Target className="h-3 w-3 " />
                <span>LOC // {items[4].coordinate}</span>
              </div>
            </div>

            <div className="flex justify-between items-start pt-2">
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-luxury-dim tracking-widest uppercase">{items[4].category}</span>
                <h3 className="font-serif text-xl tracking-wide text-luxury-accent group-hover:text-luxury-accent/75 transition-colors duration-500 font-medium font-serif">
                  {items[4].name}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs text-luxury-accent/70">{items[4].price}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-luxury-accent/40 group-hover:text-luxury-accent transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
