import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import { collectionItems, cinematicScenes, journalEntries } from "./data";
import { CollectionItem } from "./types";

// Dynamic Providers & Drawers imports
import { BrandProvider, useBrand } from "./context/BrandContext";
import Navigation from "./components/Navigation";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import PaystackModal from "./components/PaystackModal";

// Interactive Page View imports
import Homepage from "./components/Homepage";
import ShopPage from "./components/ShopPage";
import LookbookPage from "./components/LookbookPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import FAQPage from "./components/FAQPage";
import AdminPanel from "./components/AdminPanel";

/**
 * Super-performance-friendly dynamic 35mm film grain canvas.
 * Renders shimmering noise at standard 4% opacity to create a subtle analogue lens texture.
 */
function FilmGrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    
    const handleResize = () => {
      canvas.width = window.innerWidth / 3; // lower resolution saves GPU resource
      canvas.height = window.innerHeight / 3;
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    const generateNoise = () => {
      const width = canvas.width;
      const height = canvas.height;
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255;
        data[i] = val;     // R
        data[i + 1] = val; // G
        data[i + 2] = val; // B
        data[i + 3] = 10;  // Ultra low opacity (10/255) for soft organic feel
      }

      ctx.putImageData(imgData, 0, 0);
      animationId = requestAnimationFrame(generateNoise);
    };

    generateNoise();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-overlay opacity-90"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

function AppContent() {
  const { currentPage } = useBrand();
  
  const [exposure, setExposure] = useState<number>(0.75); // Binds slider to cinematic blur & light flare
  const [showGrid, setShowGrid] = useState<boolean>(false); // Core blueprint outlines grid
  const [activeSection, setActiveSection] = useState<string>("monolith");
  const [selectedProduct, setSelectedProduct] = useState<CollectionItem | null>(null);
  const [coords, setCoords] = useState({ x: "45.0%", y: "03.2%" }); // Live relative tracking

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      const modX = (45.02 + scrollPct * 12).toFixed(2);
      const modY = (3.20 + scrollPct * 8).toFixed(2);
      
      setCoords({ x: `${modX}%`, y: `${modY}%` });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-luxury-black text-[#d1d1d1] selection:bg-luxury-accent selection:text-luxury-black transition-colors duration-1000 select-none pb-12">

      {/* Immersive UI: Large Background Typography (Low Opacity) */}
      <div className="fixed inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden z-0">
        <span className="text-[20vw] font-serif italic text-white/[0.012] tracking-tighter uppercase">Nocturne</span>
      </div>

      {/* Immersive UI: Fixed Luxury Campaign Framing Border Device */}
      <div className="fixed inset-0 border-[14px] md:border-[20px] lg:border-[24px] border-[#080808] pointer-events-none z-40" />

      {/* Dynamic Analogue Film Grain Layer */}
      <FilmGrainOverlay />

      {/* Global Blueprint Grid Guidelines Layer */}
      <AnimatePresence>
        {showGrid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 pointer-events-none z-30 architectural-grid"
          />
        )}
      </AnimatePresence>

      {/* Floating Interactive HUD Header */}
      <Navigation
        exposure={exposure}
        setExposure={setExposure}
        showGrid={showGrid}
        setShowGrid={setShowGrid}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentCoordinates={coords}
      />

      {/* Core Dynamic Page Routing Module with slow luxury motion transitions */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {currentPage === "home" && (
              <Homepage 
                onSelectItem={setSelectedProduct} 
                exposure={exposure}
                coords={coords}
                setCoords={setCoords}
              />
            )}
            {currentPage === "shop" && (
              <ShopPage onSelectItem={setSelectedProduct} />
            )}
            {currentPage === "lookbook" && (
              <LookbookPage />
            )}
            {currentPage === "about" && (
              <AboutPage />
            )}
            {currentPage === "contact" && (
              <ContactPage />
            )}
            {currentPage === "faq" && (
              <FAQPage />
            )}
            {currentPage === "admin" && (
              <AdminPanel />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global E-commerce Drawers */}
      <CartDrawer />
      <WishlistDrawer onSelectItem={setSelectedProduct} />
      <PaystackModal />

      {/* Immersive Overlay Textile Zoom View (Selected modal) */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            item={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* High-Contrast Luxury Footer */}
      <footer className="relative z-10 bg-luxury-black border-t border-luxury-accent/5 px-6 py-16 md:px-12 md:py-20 select-none overflow-hidden">
        {/* Subtle grid accent inside footer */}
        <div className="absolute inset-0 pointer-events-none architectural-grid opacity-30" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 relative z-10">
          
          <div className="md:col-span-5 space-y-4 text-left">
            <h4 className="font-serif text-xl tracking-[0.25em] text-luxury-accent uppercase">Maris Couture</h4>
            <p className="font-serif italic text-xs text-white/40 max-w-sm leading-relaxed font-light">
              "Handcrafted bespoke pieces of confidence, elegance, and individuality. Designed for kings and queens who command attention thither."
            </p>
          </div>

          <div className="md:col-span-4 space-y-3 font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase text-left">
            <span className="text-luxury-accent block font-medium mb-1.5">LOCATION SATELLITE</span>
            <span>COORD // 6.4531° N, 3.4282° E</span>
            <span className="block text-[7px] text-white/20">LAGOS ATELIER SEC 01 // COUTURE & BRIDAL</span>
          </div>

          <div className="md:col-span-3 space-y-3 font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase flex flex-col justify-between text-left">
            <div>
              <span className="text-luxury-accent block font-medium mb-1.5">SARTORIAL COVENANCE</span>
              <span>EST. 2026 // MARIS ATELIER</span>
            </div>
            <span className="text-[6.5px] text-white/20 block">
              © 2026 MARIS COUTURE. ALL MAJESTY RESERVED.
            </span>
          </div>

        </div>

        {/* Big subtle artistic typeface drape footer signature */}
        <div className="w-full text-center mt-16 md:mt-24 font-serif text-[10vw] tracking-[0.3em] font-medium leading-none select-none text-luxury-accent/[0.015] font-light uppercase">
          crafted.for.sovereigns
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <BrandProvider>
      <AppContent />
    </BrandProvider>
  );
}
