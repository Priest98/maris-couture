/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Heart, ShoppingBag } from "lucide-react";
import { useBrand } from "../context/BrandContext";

interface NavigationProps {
  exposure: number;
  setExposure: (val: number) => void;
  showGrid: boolean;
  setShowGrid: (val: boolean) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  currentCoordinates: { x: string; y: string };
}

export default function Navigation({
  exposure,
  setExposure,
  showGrid,
  setShowGrid,
  activeSection,
  setActiveSection,
  currentCoordinates
}: NavigationProps) {
  const { 
    currentPage, 
    setCurrentPage, 
    cart, 
    wishlist, 
    setCartOpen, 
    setWishlistOpen 
  } = useBrand();

  const [isOpen, setIsOpen] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Expanded complete menu items for premium multi-view architecture
  const menuItems = [
    { id: "home", label: "01 // THE CAMPAIGN (HOME)", page: "home" },
    { id: "shop", label: "02 // SARTORIAL ARCHIVE (SHOP)", page: "shop" },
    { id: "lookbook", label: "03 // CINEMATIC LOOKBOOK", page: "lookbook" },
    { id: "about", label: "04 // THE DIRECTORY (ABOUT)", page: "about" },
    { id: "contact", label: "05 // CONNECT SATELLITE (CONTACT)", page: "contact" },
    { id: "faq", label: "06 // PROTOCOL INDEX (FAQ)", page: "faq" },
    { id: "admin", label: "07 // ADMIN VAULT (CMS)", page: "admin" }
  ];

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Primary Sticky Top Navbar */}
      <motion.header 
        id="navbar-root"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex items-center justify-between pointer-events-none"
      >
        {/* Left Side: Brand Name & Coordinates */}
        <div className="flex items-center space-x-6 pointer-events-auto">
          <div 
            className="cursor-pointer group flex flex-col"
            onClick={() => handleLinkClick("home")}
          >
            <h1 className="font-serif text-lg md:text-xl tracking-[0.25em] text-luxury-accent/90 group-hover:text-luxury-accent transition-colors duration-1000 uppercase font-medium">
              Maris Couture
            </h1>
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-luxury-dim/60 group-hover:text-luxury-accent/70 transition-colors duration-1000 mt-1 uppercase">
              bespoke.and.ready.to.wear
            </span>
          </div>
        </div>

        {/* Right Side: Navigation Toggle and Action Menu */}
        <div className="flex items-center space-x-4 md:space-x-6 pointer-events-auto">

          {/* Wishlist HUD Toggle */}
          <button 
            onClick={() => setWishlistOpen(true)}
            className="relative p-1.5 rounded-full border border-luxury-accent/10 hover:border-luxury-accent/30 transition-all duration-700 hover:bg-white/5 cursor-pointer"
            title="Wishlist Storage"
          >
            <Heart className="h-3.5 w-3.5 text-luxury-accent/70" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[7px] min-w-[12px] h-[12px] flex items-center justify-center rounded-full px-0.5">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart HUD Toggle */}
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-1.5 rounded-full border border-luxury-accent/10 hover:border-luxury-accent/30 transition-all duration-700 hover:bg-white/5 cursor-pointer"
            title="Sartorial Bag"
          >
            <ShoppingBag className="h-3.5 w-3.5 text-luxury-accent/70" />
            {cart.reduce((aa, bb) => aa + bb.quantity, 0) > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-accent text-luxury-black font-semibold font-mono text-[7px] min-w-[12px] h-[12px] flex items-center justify-center rounded-full px-0.5">
                {cart.reduce((aa, bb) => aa + bb.quantity, 0)}
              </span>
            )}
          </button>

          {/* Menu Drawer Toggle */}
          <button
            id="menu-trigger-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-3 font-mono text-[9px] tracking-[0.25em] text-luxury-accent hover:text-luxury-accent/70 transition-all duration-700 uppercase"
          >
            <span className="hidden sm:inline-block">
              {isOpen ? "close" : "explore"}
            </span>
            <div className="p-1.5 rounded-full border border-luxury-accent/10 hover:border-luxury-accent/30 transition-all duration-700">
              {isOpen ? (
                <X className="h-3.5 w-3.5 stroke-[1.25]" />
              ) : (
                <Menu className="h-3.5 w-3.5 stroke-[1.25]" />
              )}
            </div>
          </button>
        </div>
      </motion.header>

      {/* Quick Lens Settings Dropdown (Floating right-top corner) */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            id="floating-sartorial-controls"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-18 right-6 md:right-12 z-40 bg-luxury-black/90 p-6 rounded-lg border border-luxury-accent/10 backdrop-blur-md w-72 select-none"
          >
            <div className="space-y-5">
              <div className="pb-2 border-b border-luxury-accent/5">
                <span className="font-mono text-[8.5px] tracking-[0.2em] text-luxury-dim uppercase block">
                  Interactive.Lens.Controls
                </span>
              </div>

              {/* Exposure Meter */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[8px] text-luxury-accent/80">
                  <span>AMBIENT EXPOSURE</span>
                  <span>{Math.round(exposure * 100)} %</span>
                </div>
                <input
                  type="range"
                  min="0.25"
                  max="1.1"
                  step="0.01"
                  value={exposure}
                  onChange={(e) => setExposure(parseFloat(e.target.value))}
                  className="w-full accent-luxury-accent opacity-60 hover:opacity-100 transition-opacity duration-300 h-[1px] bg-luxury-accent/10 cursor-pointer"
                />
                <span className="font-serif italic text-[10px] text-luxury-dim/60 block leading-tight">
                  Manually developers the photographic exposure of the campaign sequences.
                </span>
              </div>

              {/* Grid Toggle Status */}
              <div className="flex items-center justify-between font-mono text-[8px] text-luxury-accent/80 pt-2 border-t border-luxury-accent/5">
                <span>BLUEPRINT SYSTEM</span>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className="px-2 py-0.5 border border-luxury-accent/20 rounded hover:border-luxury-accent hover:bg-luxury-accent/5 transition-all duration-500 uppercase"
                >
                  {showGrid ? "ACTIVE" : "HIDDEN"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Cinema full-screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="full-screen-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-45 bg-luxury-black/98 border-t border-luxury-accent/5 flex flex-col justify-between p-8 md:p-16 select-none"
          >
            {/* Backdrop Atmospheric Glow */}
            <div className="absolute inset-0 bg-radial-[circle_at_50%_120%] from-luxury-accent/5 via-transparent to-transparent pointer-events-none" />

            {/* Menu Header / Buffer */}
            <div className="w-full pt-16 flex justify-between font-mono text-[8px] text-luxury-dim/40 border-b border-luxury-accent/5 pb-4">
              <span>EXPLORATIVE INDEX</span>
              <span>EST. 2026 // COGNITIVE LABS</span>
            </div>

            {/* Middle: Cinematic Big Links */}
            <div className="max-w-4xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-24 space-y-12 md:space-y-0">
              <nav className="flex flex-col space-y-6 md:space-y-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-baseline space-x-4 cursor-pointer"
                    onClick={() => handleLinkClick(item.page)}
                  >
                    <span className="font-mono text-[9px] text-luxury-dim group-hover:text-luxury-accent transition-colors duration-500">
                      0{index + 1}
                    </span>
                    <span className="font-serif text-3xl md:text-5xl tracking-wide text-luxury-accent/70 group-hover:text-luxury-accent transition-all duration-700 pl-2 select-none">
                      {item.label.split(" // ")[1]}
                    </span>
                  </motion.div>
                ))}
              </nav>

              {/* Side Curator Note */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xs space-y-4 border-l border-luxury-accent/10 pl-6 md:pl-8 py-2 md:ml-12"
              >
                <span className="font-mono text-[8px] tracking-widest text-luxury-dim block uppercase">Curator's Manifest</span>
                <p className="font-serif italic text-sm text-luxury-accent/70 leading-relaxed">
                  "Clothes are defensive shields against sensory pollution. We sculpt negative space out of heavy textiles, allowing the skin to breathe in complete alignment with nature."
                </p>
                <span className="font-mono text-[7px] text-luxury-dim block mt-4 uppercase">
                  studio.director.m // 
                  <span className="text-luxury-accent ml-1">RE-SEAM.22</span>
                </span>
              </motion.div>
            </div>

            {/* Bottom: Minimal Footer info */}
            <div className="w-full border-t border-luxury-accent/5 pt-6 flex justify-between items-center text-luxury-dim/40 font-mono text-[8px] uppercase">
              <span>© 2026 MARIS COUTURE.</span>
              <span>CRAFTED.FOR.SOVEREIGNS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
