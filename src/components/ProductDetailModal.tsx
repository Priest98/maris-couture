/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, MouseEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Shield, RefreshCw, Scissors, MapPin, Check, Heart } from "lucide-react";
import { CollectionItem } from "../types";
import { useBrand } from "../context/BrandContext";

interface ProductDetailModalProps {
  item: CollectionItem | null;
  onClose: () => void;
}

export default function ProductDetailModal({ item, onClose }: ProductDetailModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useBrand();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  
  const [magnifierStyle, setMagnifierStyle] = useState({
    display: "none",
    top: "0px",
    left: "0px",
    backgroundPosition: "0% 0%"
  });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleQtyChange = (val: number) => {
    if (qty + val > 0) {
      setQty(qty + val);
    }
  };

  const favorited = item ? isInWishlist(item.id) : false;

  if (!item) return null;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { top, left, width, height } = imageRef.current.getBoundingClientRect();
    
    // Mouse coordinates relative to image element
    const x = e.clientX - left;
    const y = e.clientY - top;

    if (x < 0 || y < 0 || x > width || y > height) {
      setMagnifierStyle({ ...magnifierStyle, display: "none" });
      return;
    }

    // Calculate background position percentages for the zoom view
    const posX = (x / width) * 100;
    const posY = (y / height) * 100;

    setMagnifierStyle({
      display: "block",
      top: `${y - 60}px`, // center the 120px magnifying circle
      left: `${x - 60}px`,
      backgroundPosition: `${posX}% ${posY}%`
    });
  };

  const handleMouseLeave = () => {
    setMagnifierStyle({ ...magnifierStyle, display: "none" });
  };

  const submitConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setEmail("");
    }, 4500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#060606]/98 flex items-center justify-center p-4 md:p-10 lg:p-16 select-none overflow-y-auto no-scrollbar"
    >
      {/* Dynamic Background subtle flare */}
      <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-luxury-accent/2 blur-[100px] pointer-events-none" />

      {/* Close button with float interactive transition */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-10 p-2 border border-luxury-accent/10 rounded-full hover:border-luxury-accent/40 bg-luxury-black/60 hover:bg-luxury-accent/5 transition-all duration-700 z-50 group cursor-pointer"
        title="Close View"
      >
        <X className="h-4 w-4 text-luxury-accent group-hover:rotate-90 transition-transform duration-700" />
      </button>

      {/* Main Grid Card */}
      <div className="w-full max-w-5xl bg-luxury-black/40 border border-luxury-accent/10 rounded-md p-6 md:p-10 lg:p-12 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 my-8">
        
        {/* Left Part: Textile Scanner Canvas (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="font-mono text-[7px] tracking-[0.3em] text-luxury-dim uppercase block">
              MICROMETRY // FIBER SCAN
            </span>
            
            {/* Magnifier Trigger Area */}
            <div 
              className="relative aspect-[3/4] w-full bg-luxury-charcoal/20 border border-luxury-accent/5 rounded overflow-hidden cursor-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imageRef}
                src={item.image}
                alt={item.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover pointer-events-none"
              />

              {/* Dynamic Zoom Reticle Lens */}
              <div
                className="absolute w-28 h-28 rounded-full border border-luxury-accent/60 pointer-events-none shadow-2xl brightness-110"
                style={{
                  ...magnifierStyle,
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: "280%", // 2.8x magnification
                  backgroundRepeat: "no-repeat"
                }}
              />
              
              {/* Corner hair-cross lines on lens preview */}
              <div className="absolute top-2 left-2 text-luxury-accent/25 font-mono text-[6px]">
                AUTO_REVEAL_ON_FABRIC
              </div>
            </div>
            
            <p className="font-serif italic text-[10px] text-luxury-dim/70 text-center">
              "Trace pointer over material to reveal weft density and yarn threads."
            </p>
          </div>

          {/* Coordinates blueprint footer */}
          <div className="hidden lg:flex items-center space-x-4 border-t border-luxury-accent/5 pt-6 mt-6 font-mono text-[7.5px] text-luxury-dim/50">
            <span className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {item.coordinate}
            </span>
            <span>//</span>
            <span>RE-FAB1.SYS</span>
          </div>
        </div>

        {/* Right Part: Atelier Specifications (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-8 lg:space-y-0 text-left">
          
          {/* Top Block: Info and Story */}
          <div className="space-y-6">
            <div className="space-y-2 pb-4 border-b border-luxury-accent/5">
              <span className="font-mono text-[8.5px] tracking-[0.25em] text-luxury-dim uppercase">{item.category} // CODES</span>
              <div className="flex justify-between items-baseline">
                <h3 className="font-serif text-2xl md:text-3xl text-luxury-accent tracking-wide font-medium">
                  {item.name}
                </h3>
                <span className="font-serif text-lg text-luxury-accent/90 pl-4">{item.price}</span>
              </div>
            </div>

            <p className="font-serif italic text-sm md:text-base text-luxury-accent/90 leading-relaxed font-light">
              {item.description}
            </p>

            {/* Micro Specs List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Materials Column */}
              <div className="space-y-3">
                <span className="font-mono text-[7.5px] tracking-widest text-luxury-dim uppercase block">MATERIAL RATIOS</span>
                <ul className="space-y-1.5 list-none pl-0">
                  {item.materials.map((mat, i) => (
                    <li key={i} className="font-serif text-xs text-luxury-accent/85 flex items-center space-x-2">
                      <span className="h-1 w-1 rounded-full bg-luxury-accent/40" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tailoring Specs Column */}
              <div className="space-y-3">
                <span className="font-mono text-[7.5px] tracking-widest text-luxury-dim uppercase block">SARTORIAL SCHEMES</span>
                <ul className="space-y-1.5 list-none pl-0">
                  {item.specs.map((spec, i) => (
                    <li key={i} className="font-serif text-xs text-luxury-accent/85 flex items-center space-x-2">
                      <span className="h-1 w-1 rounded-full bg-luxury-accent/40" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Underpart: Size Selection, Qty Counter, Add to Cart & Wishlist Actions */}
          <div className="pt-6 border-t border-luxury-accent/5 space-y-4">
            <div className="flex justify-between items-baseline font-mono text-[7.5px] tracking-[0.2em] text-[#707070] uppercase">
              <span>SARTORIAL METRIC</span>
              <button 
                type="button"
                onClick={() => alert("Sartorial Guideline:\nXS - Chest 32-34\"\nS - Chest 34-36\"\nM - Chest 38-40\"\nL - Chest 42-44\"\nXL - Chest 46-48\"\n\nOur silhouettes are structured with protective oversized silos. Choose your standard size for a relaxed pooling drape, or down-size for fitted alignment.")}
                className="hover:text-white transition underline cursor-pointer"
              >
                SIZE GUIDE (FITTING)
              </button>
            </div>

            {/* Sizes selector */}
            <div className="flex space-x-2">
              {["XS", "S", "M", "L", "XL"].map((s) => {
                const isSelected = size === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`flex-1 font-mono text-[9px] py-1.5 border rounded transition duration-300 ${
                      isSelected 
                        ? "bg-luxury-accent text-luxury-black border-luxury-accent" 
                        : "border-white/10 text-white/60 hover:border-white/20"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              {/* Quantity counter */}
              <div className="flex items-center space-x-2 rounded border border-white/10 p-1 bg-luxury-black/30">
                <button
                  type="button"
                  onClick={() => handleQtyChange(-1)}
                  className="p-1 px-2.5 hover:text-white text-white/40 font-mono text-xs"
                >
                  -
                </button>
                <span className="font-mono text-xs w-6 text-center text-white/80">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => handleQtyChange(1)}
                  className="p-1 px-2.5 hover:text-white text-white/40 font-mono text-xs"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={() => {
                  addToCart(item, size, qty);
                  onClose(); // Close modal nicely
                }}
                className="flex-1 py-3 bg-luxury-accent hover:bg-white text-luxury-black font-mono text-[8.5px] tracking-[0.2em] font-medium uppercase rounded hover:shadow-lg transition duration-500 cursor-pointer flex items-center justify-center space-x-2"
              >
                <Scissors className="h-3 w-3" />
                <span>ADD TO ARCHIVE CART</span>
              </button>

              {/* Wishlist Heart button */}
              <button
                type="button"
                onClick={() => toggleWishlist(item)}
                className={`p-3 border rounded flex items-center justify-center transition duration-500 ${
                  favorited ? "border-rose-400 bg-rose-500/5 text-rose-400" : "border-white/10 text-white/40 hover:text-white"
                }`}
                title={favorited ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`h-3.5 w-3.5 ${favorited ? "fill-rose-500/10" : ""}`} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
