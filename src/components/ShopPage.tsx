import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Eye, Sparkles, Filter, SlidersHorizontal, Heart } from "lucide-react";
import { useBrand } from "../context/BrandContext";
import { CollectionItem } from "../types";

export default function ShopPage({ onSelectItem }: { onSelectItem: (item: CollectionItem) => void }) {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    toggleWishlist,
    isInWishlist
  } = useBrand();

  const [hoveredPid, setHoveredPid] = useState<string | null>(null);

  // Available luxurious categories defined by the creative director
  const categories = [
    "All",
    "New Arrivals",
    "Featured Collections",
    "Limited Pieces",
    "Accessories",
    "Hair Collection",
    "Tari Set Collection"
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category matches (or is "All")
      const matchesCategory = 
        selectedCategory === "All" || 
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === "New Arrivals" && (p.id === "item-1" || p.id === "item-6")) ||
        (selectedCategory === "Featured Collections" && (p.id === "item-2" || p.id === "item-3"));

      // Search query matches
      const matchesSearch = 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="relative pt-24 pb-20 px-6 md:px-12 w-full max-w-7xl mx-auto z-10 selection:bg-luxury-accent selection:text-luxury-black">
      
      {/* Page Header */}
      <div className="flex flex-col space-y-4 mb-12 select-none">
        <div className="flex items-center gap-4">
          <div className="h-[0.5px] w-12 bg-luxury-accent/30 origin-left" />
          <span className="font-mono text-[9px] tracking-[0.4em] text-white/40 block uppercase">
            INDEX // ARTIFACT EXPLORER
          </span>
        </div>
        <h2 className="font-serif text-3xl md:text-6xl tracking-tight text-luxury-accent uppercase font-light">
          THE FLAGSHIP DIGITAL SHOWROOM
        </h2>
        <p className="font-serif italic text-xs text-white/50 max-w-md leading-relaxed font-light">
          Browse meticulously curated apparel and cosmetic coordinates. Designed to isolate form and celebrate movement in complete stillness.
        </p>
      </div>

      {/* Filter & Search Bar HUD */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center border-b border-white/5 pb-8 mb-12">
        {/* Categories Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <Filter className="h-3 w-3 text-luxury-accent/50 mr-2 flex-shrink-0" />
          <div className="flex space-x-2 md:space-x-3">
            {categories.map((cat) => {
              const active = cat === selectedCategory;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-[7px] md:text-[8px] tracking-[0.2em] px-3 md:px-4 py-2 border rounded-full uppercase transition duration-500 whitespace-nowrap cursor-pointer ${
                    active 
                      ? "bg-luxury-accent text-luxury-black border-luxury-accent" 
                      : "border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Search Search Box */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
          <input
            type="text"
            placeholder="Search material / code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-luxury-black/80 border border-white/10 rounded-full py-2.5 pl-9 pr-4 font-mono text-[9px] text-[#eae6df] tracking-wider placeholder-white/20 focus:outline-none focus:border-white/30 transition duration-300"
          />
        </div>
      </div>

      {/* Product Minimal Grid */}
      <AnimatePresence mode="popLayout">
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-24 text-center space-y-4"
          >
            <span className="font-serif italic text-sm text-white/30">No matching coordinates found</span>
            <p className="font-sans text-[10px] text-white/40 max-w-xs mx-auto">
              Please refine your search filter parameters or choose another category category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="font-mono text-[8px] tracking-widest text-[#eae6df] border border-white/10 px-6 py-2 rounded-full hover:bg-white/5 uppercase"
            >
              CLEAR FILTERS
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredProducts.map((p, index) => {
              const favorited = isInWishlist(p.id);
              
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.8 }}
                  className="group relative flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div 
                    className="relative aspect-[3/4] w-full bg-luxury-charcoal overflow-hidden border border-white/10 hover:border-white/20 transition duration-1000 cursor-pointer mb-4"
                    onClick={() => onSelectItem(p)}
                    onMouseEnter={() => setHoveredPid(p.id)}
                    onMouseLeave={() => setHoveredPid(null)}
                  >
                    {/* Slow drift fade hover image reveal! */}
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className={`absolute inset-0 w-full h-full object-cover origin-center grayscale group-hover:grayscale-0 transition-all duration-[2.5s] ease-[0.22,1,0.36,1] ${
                        hoveredPid === p.id && p.hoverImage ? "opacity-0 scale-105" : "opacity-100 group-hover:scale-105"
                      }`}
                    />
                    
                    {p.hoverImage && (
                      <img
                        src={p.hoverImage}
                        alt={`${p.name} hover`}
                        referrerPolicy="no-referrer"
                        className={`absolute inset-0 w-full h-full object-cover origin-center grayscale group-hover:grayscale-0 transition-all duration-[2.5s] ease-[0.22,1,0.36,1] ${
                          hoveredPid === p.id ? "opacity-100 scale-105" : "opacity-0 scale-98"
                        }`}
                      />
                    )}

                    {/* Corner viewfinder decorations */}
                    <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-white/30 opacity-40 group-hover:opacity-100 transition duration-500" />
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-white/30 opacity-40 group-hover:opacity-100 transition duration-500" />
                    <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-white/30 opacity-40 group-hover:opacity-100 transition duration-500" />
                    <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-white/30 opacity-40 group-hover:opacity-100 transition duration-500" />

                    {/* Glass glare effect overlays */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] mix-blend-overlay opacity-60 pointer-events-none" />

                    {/* Blueprint grid subtle background inside showcase card */}
                    <div className="absolute inset-0 pointer-events-none architectural-grid opacity-[0.08]" />

                    {/* Image coordinates locator tag */}
                    <div className="absolute right-3 top-3 font-mono text-[6.5px] tracking-widest text-[#eae6df]/40 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                      LOC // {p.coordinate}
                    </div>

                    {/* Quick Interaction Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 p-4 flex flex-col justify-end pointer-events-none">
                      <div className="flex justify-between items-center w-full translate-y-3 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                        <span className="font-mono text-[7px] tracking-widest text-[#white]/40">INSPECT DESIGN DETS</span>
                        <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center bg-black/40">
                          <Eye className="h-3 w-3 text-[#white] stroke-[1]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Text Details & Actions */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1 pr-4">
                      <h3 
                        onClick={() => onSelectItem(p)}
                        className="font-serif text-[12px] md:text-sm tracking-widest text-white hover:text-luxury-accent cursor-pointer uppercase transition font-light leading-tight"
                      >
                        {p.name}
                      </h3>
                      <p className="font-mono text-[8px] text-white/40 uppercase">
                        {p.category}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 flex-shrink-0">
                      <span className="font-serif text-[13px] text-luxury-accent font-medium mt-0.5">
                        {p.price}
                      </span>
                      {/* Interactive Heart toggle for gorgeous Wishlist actions */}
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="p-1.5 border border-white/10 hover:border-white/30 rounded-full hover:bg-white/5 transition duration-300"
                        title={favorited ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart 
                          className={`h-3 w-3 transition duration-500 ${
                            favorited 
                              ? "text-rose-400 fill-rose-500/20 stroke-[1.5]" 
                              : "text-white/40 hover:text-white stroke-[1]"
                          }`} 
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
