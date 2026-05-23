import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Instagram, 
  Star, 
  Heart, 
  Phone, 
  Truck, 
  Calendar, 
  User, 
  CheckCircle2,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  ShieldAlert,
  Menu,
  ChevronLeft,
  ChevronRight,
  Lock,
  Crown,
  PenTool,
  Scissors
} from "lucide-react";
import { useBrand } from "../context/BrandContext";
import { CollectionItem } from "../types";

export default function Homepage({ 
  onSelectItem, 
  exposure, 
  coords, 
  setCoords 
}: { 
  onSelectItem: (item: CollectionItem) => void;
  exposure: number;
  coords: { x: string; y: string };
  setCoords: (c: { x: string; y: string }) => void;
}) {
  const { 
    products, 
    setCurrentPage, 
    setSelectedCategory,
  } = useBrand();

  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);

  const carouselItems = [
    {
      tag: "WOMEN'S COLLECTION",
      title: "for her",
      imgUrl: "/image/SaveClip.App_701558762_17995630046958075_5275248658664269477_n.jpg",
      description: "Gracefully tailored. Effortlessly unforgettable. Magnificent bridal gowns, custom corsetry, and liquid mulberry silk garments designed to flow around your silhouette with majestic authority.",
      cta: "Explore Women's Collection",
      category: "Bridal"
    },
    {
      tag: "MEN'S COLLECTION",
      title: "for him",
      imgUrl: "/image/SaveClip.App_673141677_17992507199958075_1872653400330052205_n.jpg",
      description: "Refined tailoring for the modern gentleman. Perfect structure lines, custom Italian brocades, and custom kaftans designed to highlight posture, elegance, and commanding presence.",
      cta: "Explore Men's Collection",
      category: "Occasion Wear"
    },
    {
      tag: "CUSTOM COUTURE",
      title: "couture",
      imgUrl: "/image/SaveClip.App_702670254_17995688897958075_3403135397625804707_n.jpg",
      description: "Individual expressions of haute couture. Hand-draped textures, metallic wire details, and custom embroidered patterns custom sewn to your measurements over many weeks.",
      cta: "Explore Custom Couture",
      category: "Custom Couture"
    },
    {
      tag: "SOVEREIGN BRIDAL",
      title: "bridal",
      imgUrl: "/image/SaveClip.App_701726081_17995630037958075_6938771093197818527_n.jpg",
      description: "Traditional and contemporary royal bridal wears adorned with prestige crystals and premium French Chantilly lace. Impeccably detailed down to the final seam.",
      cta: "Explore Bridal Gowns",
      category: "Bridal"
    },
    {
      tag: "READY-TO-WEAR",
      title: "essential",
      imgUrl: "/image/SaveClip.App_703474177_17996075099958075_4530015394040761226_n.jpg",
      description: "Prestige limited-edition daywear and evening separates designed for effortless style and immediate presence. Perfect luxury for everyday curation.",
      cta: "Explore Ready-To-Wear",
      category: "Ready-To-Wear"
    }
  ];

  const handlePrevCarousel = () => {
    setActiveCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNextCarousel = () => {
    setActiveCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  // Local state for Newsletters and Bookings
  const [emailValue, setEmailValue] = useState("");
  const [newsSuccess, setNewsSuccess] = useState(false);
  const [consultSuccess, setConsultSuccess] = useState(false);

  // Reference for scrolling to booking section
  const bookingRef = useRef<HTMLDivElement>(null);

  // Booking details state
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Bespoke Bridal Couture",
    sessionDate: "",
    sessionTime: "11:00 AM",
    customNotes: ""
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue) {
      setNewsSuccess(true);
      setTimeout(() => {
        setEmailValue("");
        setNewsSuccess(false);
      }, 4000);
    }
  };

  const navigateToCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage("shop");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSuccess(true);
    setTimeout(() => {
      setConsultSuccess(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        serviceType: "Bespoke Bridal Couture",
        sessionDate: "",
        sessionTime: "11:00 AM",
        customNotes: ""
      });
    }, 5000);
  };

  const sendWhatsAppInquiry = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/2348030000000?text=${encoded}`, "_blank");
  };

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const testimonials = [
    {
      quote: "My wedding gown was an absolute masterpiece. Every single bead felt intentional. Maris Couture made me look and feel like absolute royalty on my day.",
      author: "Oluwaseun A.",
      role: "Bridal Client • Lagos",
      press: "VOGUE NIGERIA",
      avatar: "/image/SaveClip.App_673802186_17992507190958075_7502736021552698395_n.jpg"
    },
    {
      quote: "Exceptional tailoring accuracy. They designed a custom brocade ceremonial suit for our gala that commanded total attention. Sizing is completely flawless.",
      author: "Tunde O.",
      role: "Gala Patron • Victoria Island",
      press: "THE SARTORIALIST",
      avatar: "/image/SaveClip.App_701726081_17995630037958075_6938771093197818527_n.jpg"
    },
    {
      quote: "Timeless, elegant, and perfectly structured. Their delivery from Lagos to Abuja arrived beautifully packaged in premium bespoke wooden vaults. Unmatched.",
      author: "Fatima B.",
      role: "Elite VIP • Abuja",
      press: "ROYALTY WEEKLY",
      avatar: "/image/SaveClip.App_703715523_17996075090958075_7449049744745719206_n.jpg"
    }
  ];

  return (
    <div className="w-full relative bg-luxury-black text-luxury-accent selection:bg-luxury-accent selection:text-luxury-black font-sans leading-relaxed overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] w-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-32 overflow-hidden border-b border-white/5 select-none md:flex-row">
        
        {/* Background Widescreen Cinematic Image (Slowly zooming) */}
        <div className="absolute inset-0 z-0 scale-105 animate-[pulse_12s_ease-in-out_infinite] opacity-40">
          <img 
            src="/image/SaveClip.App_702670254_17995688897958075_3403135397625804707_n.jpg" 
            alt="Maris Couture Campaign Hero Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-luxury-black" />
          <div className="absolute inset-0 bg-radial-[circle_at_50%_50%] from-transparent via-transparent to-luxury-black/90" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center space-y-6">
          
          {/* Epic Main Header Title */}
          <div className="space-y-2">
            <motion.h2  
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(40px,7.5vw,100px)] text-white font-light tracking-[-0.03em] leading-[0.95] uppercase"
            >
              Where Elegance <br />
              <span className="italic block mt-2 text-luxury-accent">Becomes Identity</span>
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="font-serif italic text-sm sm:text-base md:text-lg text-white/75 max-w-xl mx-auto leading-relaxed font-light"
          >
            Crafting timeless pieces for women and men who appreciate luxury, confidence, and impeccable style.
          </motion.p>

          {/* Dynamic Button Suite */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="w-full pt-4 flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateToCategory("All")}
              className="group relative w-full sm:w-auto px-8 py-4 bg-luxury-accent text-luxury-black font-sans text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-white transition-all duration-500 shadow-xl cursor-pointer"
            >
              Explore Collections
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-luxury-black transition-all group-hover:w-full" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToBooking}
              className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-black/40 hover:border-white hover:bg-white/10 text-white font-sans text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-500 cursor-pointer"
            >
              Book Consultation
            </motion.button>
          </motion.div>

        </div>
      </section>


      {/* 2. COLLECTIONS SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="py-24 px-6 md:px-12 lg:px-24 bg-luxury-slate relative border-b border-white/5 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none architectural-grid opacity-[0.02]" />
        
        <div className="max-w-5xl mx-auto space-y-12 relative z-10">
          
          {/* Header Line Matching the Mockup Exactly */}
          <div className="w-full select-none pb-4">
            <div className="flex items-center justify-between font-serif text-[#eae6df]">
              <span className="text-2xl md:text-3xl font-light tracking-wide lowercase">collection</span>
              <div className="flex-1 mx-6 h-px bg-white/10" />
              <span className="font-mono text-xs text-[#eae6df]/60 tracking-wider">
                {`0${activeCarouselIndex + 1}/0${carouselItems.length}`}
              </span>
            </div>
          </div>

          {/* Carousel Layout Box */}
          <div className="relative w-full flex items-center justify-center overflow-visible py-8">
            
            <div className="w-full flex items-center justify-between gap-4 md:gap-8">
              
              {/* Left Flanking Card (Desktop/Tablet) */}
              <div 
                onClick={handlePrevCarousel}
                className="hidden md:block w-1/4 aspect-[3/4] rounded-[2rem] overflow-hidden bg-luxury-charcoal border border-white/5 opacity-30 hover:opacity-50 transition-all duration-700 select-none cursor-pointer transform scale-90"
              >
                <div className="w-full h-full relative">
                  <img 
                    src={carouselItems[(activeCarouselIndex - 1 + carouselItems.length) % carouselItems.length].imgUrl} 
                    alt="Left Campaign"
                    className="w-full h-full object-cover pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>

              {/* Center Active Frame Card */}
              <div className="relative w-full md:w-2/5 aspect-[3/4] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-luxury-charcoal border border-white/10 shadow-2xl transition-all duration-700 ease-out flex-shrink-0 group">
                <div className="w-full h-full relative overflow-hidden">
                  <img 
                    src={carouselItems[activeCarouselIndex].imgUrl} 
                    alt="Center Campaign Item" 
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] ease-[0.22, 1, 0.36, 1]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/15" />

                  {/* Left Chevron Float overlay near left flanking boundary */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevCarousel(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-20 shadow-lg"
                    title="Previous Campaign"
                  >
                    <ChevronLeft className="h-4 w-4 stroke-[1.5]" />
                  </button>

                  {/* Right Chevron Float overlay near right flanking boundary */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextCarousel(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white cursor-pointer transition-all duration-300 z-20 shadow-lg"
                    title="Next Campaign"
                  >
                    <ChevronRight className="h-4 w-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>

              {/* Right Flanking Card (Desktop/Tablet) */}
              <div 
                onClick={handleNextCarousel}
                className="hidden md:block w-1/4 aspect-[3/4] rounded-[2rem] overflow-hidden bg-luxury-charcoal border border-white/5 opacity-30 hover:opacity-50 transition-all duration-700 select-none cursor-pointer transform scale-90"
              >
                <div className="w-full h-full relative">
                  <img 
                    src={carouselItems[(activeCarouselIndex + 1) % carouselItems.length].imgUrl} 
                    alt="Right Campaign"
                    className="w-full h-full object-cover pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>

            </div>

          </div>

          {/* Symmetrical dot metrics dash tracking matching mockup */}
          <div className="flex justify-center items-center space-x-2.5 pt-2 select-none">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCarouselIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeCarouselIndex === idx 
                    ? "w-10 bg-white/70" 
                    : "w-4 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Interactive Description Box underneath detailing selected collection focus with exquisite typography */}
          <div className="text-center max-w-xl mx-auto space-y-4 pt-6 select-none">
            <span className="font-mono text-[8px] tracking-[0.45em] text-luxury-accent block uppercase">
              {carouselItems[activeCarouselIndex].tag}
            </span>
            <p className="font-serif italic text-sm md:text-base text-white/60 leading-relaxed font-light">
              {carouselItems[activeCarouselIndex].description}
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateToCategory(carouselItems[activeCarouselIndex].category)}
                className="group inline-flex items-center space-x-3 text-white font-mono text-[9px] tracking-[0.25em] uppercase cursor-pointer border-b border-white/20 pb-1 hover:border-luxury-accent transition-all duration-500"
              >
                <span>{carouselItems[activeCarouselIndex].cta}</span>
                <ArrowRight className="h-3.5 w-3.5 text-luxury-accent transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>

        </div>
      </motion.section>


      {/* 3. ABOUT THE DESIGNER */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="py-32 px-6 md:px-12 lg:px-24 bg-luxury-black border-b border-white/5 relative"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Narrative Block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="font-mono text-[7px] tracking-[0.4em] text-luxury-accent/50 block uppercase">
              CREATIVE DIRECTION CORE
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide uppercase font-light leading-tight">
              The Vision Behind <br />
              <span className="italic text-luxury-accent">Maris Couture</span>
            </h3>
            
            <p className="font-serif italic text-sm md:text-base text-white/75 leading-relaxed font-light">
              "Every garment begins with a conversation. We established Maris Couture to craft bespoke shields of confidence, designed to capture absolute majesty and individuality."
            </p>

            <p className="text-xs md:text-sm text-white/50 leading-relaxed tracking-wider font-light">
              Founded in 2026 by Creative Director Maris, the house blends the majestic weight of traditional African culture with modern, minimalist geometries. We do not construct quick, disposably assembled trends. Every seam, bead, and structural layer is deliberately developed over many weeks within our Lagos workspace. 
            </p>

            <p className="text-xs md:text-sm text-white/50 leading-relaxed tracking-wider font-light">
              By implementing premium imported silks, intricate French Chantilly lace, and metallic bullion wire embroidery, we create high-luxury silhouettes that don't merely represent apparel, but command absolute presence and authority.
            </p>

            {/* Design Highlights Badge info */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 font-mono text-[8px] uppercase text-white/70">
              <div className="p-3 border border-white/5 bg-white/[0.01]">
                <span className="text-luxury-accent block mb-1">CRAFT TIME</span>
                <span>450+ Private Hours</span>
              </div>
              <div className="p-3 border border-white/5 bg-white/[0.01]">
                <span className="text-luxury-accent block mb-1">ORIGIN</span>
                <span>Atelier Lagos, Nigeria</span>
              </div>
              <div className="p-3 border border-white/5 bg-white/[0.01] col-span-2 md:col-span-1">
                <span className="text-luxury-accent block mb-1">TEXTILES</span>
                <span>Prestige Silk & Brocade</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentPage("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex items-center space-x-2 text-white font-mono text-[8.5px] tracking-[0.15em] hover:text-luxury-accent uppercase cursor-pointer"
              >
                <span>Read Full Manifesto</span>
                <ArrowRight className="h-3 w-3 text-luxury-accent group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Majestic Assembled Frame Visual (Magazine Style Layout) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto border border-white/10 overflow-hidden bg-luxury-slate">
              <img 
                src="/image/SaveClip.App_673141677_17992507199958075_1872653400330052205_n.jpg" 
                alt="Creative Director Maris Workspace Sketching" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2.5s] ease-[0.22, 1, 0.36, 1]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-neutral-950/20" />
            </div>

            {/* Micro blueprint coordinates alignment text card */}
            <div className="absolute -bottom-6 -left-4 bg-luxury-slate border border-white/10 p-4 max-w-[180px] text-left hidden md:block">
              <span className="font-mono text-[6.5px] text-luxury-accent block mb-1.5 uppercase">THE ATELIER SATELLITE</span>
              <p className="font-serif italic text-[10px] text-white/50 leading-snug">
                Where hands and dreams assemble. Based in the heart of Victoria Island.
              </p>
            </div>
          </div>

        </div>
      </motion.section>


      {/* 4. TESTIMONIALS */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="py-32 px-6 md:px-12 lg:px-24 bg-luxury-black relative text-center border-b border-white/5 overflow-hidden"
      >
        

        
        {/* Randomized matrix micro-text details on left side */}
        <div className="absolute top-1/4 left-8 font-mono text-[7px] text-white/5 tracking-widest leading-loose text-left hidden xl:block select-none pointer-events-none uppercase">
          ATELIER DATA FEED // VI_LAGOS<br />
          AQ WZ LA X KO ZR S Q T V Y N<br />
          M P B E P F & E CLO Z A T O<br />
          D U F . U V S S L K H D Q V<br />
          M G M O T Q F N T R G U Z I U
        </div>

        {/* Randomized matrix micro-text details on right side */}
        <div className="absolute bottom-1/4 right-8 font-mono text-[7px] text-white/5 tracking-widest leading-loose text-right hidden xl:block select-none pointer-events-none uppercase">
          SOVEREIGN AUTHENTICATION // PASSIVE<br />
          +Q H+L W B 6 N A D Y N H Y N<br />
          X A D & X K D J+ D G M O T Q<br />
          Z R V N S E F U N +A B E P F<br />
          # @ % & R . B . V A N Z P CLO
        </div>

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          
          <div className="flex flex-col items-center space-y-4 select-none">
            {/* BADGE Capsule matched exactly to the mockup */}
            <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full bg-white/5 text-[#eae6df]/80 font-mono text-[8px] uppercase tracking-[0.3em]">
              testimonials
            </div>
            
            <h3 className="font-serif text-3xl sm:text-4.5xl md:text-5xl text-white tracking-tight leading-tight uppercase font-light">
              Loved by sovereigns <br className="sm:hidden" />
              and clients worldwide.
            </h3>
            
            <p className="font-serif italic text-xs sm:text-sm text-white/50 max-w-lg mx-auto leading-relaxed">
              Sartorial validation from our distinguished patrons who trust us to craft timeless elegance for their life’s most beautiful milestones.
            </p>
          </div>

          {/* Layered Stack Container with floating arrows */}
          <div className="relative w-full max-w-2xl mx-auto flex items-center justify-between gap-4 md:gap-8 select-none my-12">
            
            {/* Left floating arrow */}
            <button 
              onClick={() => setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-white/10 hover:scale-105 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-all duration-300 shadow-xl shrink-0"
              title="Previous Review"
            >
              <ChevronLeft className="h-5 w-5 stroke-[1.5]" />
            </button>

            {/* Deck of 3 stacked cards */}
            <div className="relative flex-1 min-h-[260px] md:min-h-[220px] flex items-center justify-center">
              
              {/* Card 3 (Distant Shadow Layout) */}
              <div className="absolute inset-x-4 bottom-0 top-0 bg-white/[0.015] border border-white/5 rounded-2xl md:rounded-3xl transform translate-y-4 scale-[0.93] rotate-[-1.5deg] opacity-25 blur-[0.2px] pointer-events-none" />
              
              {/* Card 2 (In-between Stacked Layout) */}
              <div className="absolute inset-x-2 bottom-0 top-0 bg-white/[0.035] border border-white/5 rounded-2xl md:rounded-3xl transform translate-y-2 scale-[0.97] rotate-[1deg] opacity-60 pointer-events-none" />
              
              {/* Card 1 (Main Foreground Glassmorphic Card) */}
              <div className="absolute inset-0 bg-[#ffffff06] border border-white/15 backdrop-blur-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.65)] flex flex-col justify-between text-left transition-all duration-700 hover:border-white/25">
                
                {/* Visual quote indicator */}
                <span className="font-serif italic text-3xl leading-none md:text-4xl text-luxury-accent/30 block -mb-2">“</span>

                {/* Main Quote Statement */}
                <p className="font-serif italic text-xs sm:text-sm md:text-base leading-relaxed text-white/90">
                  {testimonials[activeTestimonialIndex].quote}
                </p>

                {/* Author portrait & name tracking */}
                <div className="flex items-center space-x-4 pt-4 mt-4 border-t border-white/10">
                  <img 
                    src={testimonials[activeTestimonialIndex].avatar} 
                    alt={`${testimonials[activeTestimonialIndex].author} Portrait Passport`} 
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-0.5">
                    <h4 className="font-serif text-[11px] md:text-xs text-white font-medium uppercase tracking-widest">
                      {testimonials[activeTestimonialIndex].author}
                    </h4>
                    <p className="font-mono text-[7px] text-white/40 tracking-widest uppercase">
                      {testimonials[activeTestimonialIndex].role} &nbsp;•&nbsp; <span className="text-luxury-accent font-semibold">{testimonials[activeTestimonialIndex].press}</span>
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right floating arrow */}
            <button 
              onClick={() => setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 hover:bg-white/10 hover:scale-105 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-all duration-300 shadow-xl shrink-0"
              title="Next Review"
            >
              <ChevronRight className="h-5 w-5 stroke-[1.5]" />
            </button>

          </div>

          {/* Symmetrical Action Section below the card slider match matching mockup exactly */}
          <div className="text-center pt-6 space-y-6 relative z-10 select-none">
            <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/40">
              Join 500+ premium sovereigns who track their custom sizing files thither.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToBooking}
              className="inline-flex px-8 py-3.5 bg-luxury-accent hover:bg-white text-luxury-black font-medium font-mono text-[8px] tracking-[0.25em] uppercase rounded transition-all duration-500 cursor-pointer shadow-[0_4px_20px_rgba(188,163,116,0.15)]"
            >
              Get Started Now
            </motion.button>
          </div>

        </div>
      </motion.section>


      {/* 5. VIRTUAL BOOKING SECTION */}
      <motion.div 
        ref={bookingRef} 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="py-32 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] relative border-b border-white/5 overflow-hidden"
      >

        
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch text-left">
          
          {/* Left Column: Heritage & Creative Direction Overview */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-2xl border border-white/10 p-8 md:p-12 min-h-[480px] lg:min-h-auto bg-cover bg-center flex flex-col justify-between" style={{ backgroundImage: `linear-gradient(to bottom, rgba(14, 11, 10, 0.90), rgba(8, 8, 8, 0.97)), url('/image/SaveClip.App_703433599_17995688906958075_3604819135559276349_n.jpg')` }}>

            
            <div className="space-y-16 relative z-10">
              {/* Tag header */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] tracking-[0.3em] text-[#bc9c74] uppercase block font-semibold">PRIVATE APPOINTMENT</span>
                <div className="w-16 h-[1px] bg-[#bc9c74]/40" />
              </div>

              {/* Majestic Editorial Title */}
              <div className="space-y-6">
                <h3 className="font-serif text-[clamp(28px,4.5vw,48px)] leading-[1.05] text-[#eae6df] tracking-wide font-light uppercase">
                  Book Your <br />
                  Couture <br />
                  Experience
                </h3>
                
                {/* Monogram MC Signature */}
                <div className="font-serif italic text-3xl font-extralight text-luxury-accent/85 tracking-widest pl-1">
                  MC
                </div>
              </div>
              
              {/* Context Statement */}
              <p className="font-serif italic text-xs md:text-sm text-luxury-accent/70 leading-relaxed max-w-sm font-light">
                Every creation begins with a conversation. Schedule your private consultation and let us design an experience as exceptional as you are.
              </p>
            </div>

            {/* Bottom Signature Statement */}
            <div className="space-y-4 relative z-10 pt-12 lg:pt-0">
              <div className="font-serif text-[11px] tracking-[0.2em] text-[#eae6df] uppercase font-light">
                MARIS COUTURE
                <span className="block font-sans text-[8px] tracking-[0.15em] text-white/40 mt-1 font-semibold">ATELIER</span>
              </div>
              <div className="font-mono text-[8px] text-white/30 tracking-[0.25em] uppercase flex items-center gap-1.5 flex-wrap">
                LAGOS <span className="text-luxury-accent/30">•</span> DUBAI <span className="text-[#bc9c74]/50">•</span> LONDON
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Haute Couture Consult System Card */}
          <div className="lg:col-span-7 bg-[#101010] border border-white/5 rounded-2xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-2xl">
            <AnimatePresence mode="wait">
              {!consultSuccess ? (
                <motion.form 
                  key="form"
                  onSubmit={handleBookingSubmit}
                  className="space-y-8"
                >
                  {/* Grid Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    
                    {/* Your Name */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.18em] text-[#d1d1d1]/60 flex items-center gap-2.5 uppercase font-mono font-semibold">
                        <User className="h-3.5 w-3.5 text-[#bc9c74] stroke-[1.25]" />
                        Your Name
                      </label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Oluwaseun Adeleke"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full bg-[#151515] border border-white/10 hover:border-white/20 focus:border-luxury-accent focus:outline-none p-4 rounded-md font-serif text-xs text-white placeholder-white/20 transition-all duration-300 italic"
                      />
                    </div>

                    {/* Email Coordinates */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.18em] text-[#d1d1d1]/60 flex items-center gap-2.5 uppercase font-mono font-semibold">
                        <Mail className="h-3.5 w-3.5 text-[#bc9c74] stroke-[1.25]" />
                        Email Address
                      </label>
                      <input 
                        required
                        type="email" 
                        placeholder="e.g. recipient@domain.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full bg-[#151515] border border-white/10 hover:border-white/20 focus:border-luxury-accent focus:outline-none p-4 rounded-md font-serif text-xs text-white placeholder-white/20 transition-all duration-300 italic"
                      />
                    </div>

                    {/* Phone Number Coordinate */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.18em] text-[#d1d1d1]/60 flex items-center gap-2.5 uppercase font-mono font-semibold">
                        <Phone className="h-3.5 w-3.5 text-[#bc9c74] stroke-[1.25]" />
                        Phone Number
                      </label>
                      <input 
                        required
                        type="tel" 
                        placeholder="e.g. +234 803 000 0000"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full bg-[#151515] border border-white/10 hover:border-white/20 focus:border-luxury-accent focus:outline-none p-4 rounded-md font-serif text-xs text-white placeholder-white/20 transition-all duration-300 italic"
                      />
                    </div>

                    {/* Couture Service Focus Dropdown */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.18em] text-[#d1d1d1]/60 flex items-center gap-2.5 uppercase font-mono font-semibold">
                        <Crown className="h-3.5 w-3.5 text-[#bc9c74] stroke-[1.25]" />
                        Couture Service
                      </label>
                      <div className="relative">
                        <select 
                          value={bookingForm.serviceType}
                          onChange={(e) => setBookingForm({ ...bookingForm, serviceType: e.target.value })}
                          className="w-full bg-[#151515] border border-white/10 hover:border-white/20 focus:border-luxury-accent focus:outline-none p-4 rounded-md font-serif text-xs text-white appearance-none cursor-pointer transition-all duration-300 italic"
                        >
                          <option value="Bespoke Bridal Couture" className="bg-[#101010]">Bespoke Bridal Gown & Veil</option>
                          <option value="Custom Men's Elite Tailoring" className="bg-[#101010]">Custom Suit & Elite Tailoring</option>
                          <option value="Luxury Ready-To-Wear Sizing Fitting" className="bg-[#101010]">Luxury Ready-To-Wear Sizing Fitting</option>
                          <option value="Traditional Gele & Fabric Alignment" className="bg-[#101010]">Traditional Fabric Alignment</option>
                          <option value="Custom Occasion Wear Design" className="bg-[#101010]">Custom Occasion Wear Design</option>
                        </select>
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-white/30">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    {/* Preferred Date selector */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.18em] text-[#d1d1d1]/60 flex items-center gap-2.5 uppercase font-mono font-semibold">
                        <Calendar className="h-3.5 w-3.5 text-[#bc9c74] stroke-[1.25]" />
                        Preferred Date
                      </label>
                      <input 
                        required
                        type="date" 
                        value={bookingForm.sessionDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, sessionDate: e.target.value })}
                        className="w-full bg-[#151515] border border-white/10 hover:border-white/20 focus:border-luxury-accent focus:outline-none p-4 rounded-md font-serif text-xs text-white placeholder-white/20 transition-all duration-300 cursor-pointer select-none"
                      />
                    </div>

                    {/* Preferred Time block */}
                    <div className="space-y-2">
                      <label className="text-[10px] tracking-[0.18em] text-[#d1d1d1]/60 flex items-center gap-2.5 uppercase font-mono font-semibold">
                        <Clock className="h-3.5 w-3.5 text-[#bc9c74] stroke-[1.25]" />
                        Preferred Time
                      </label>
                      <div className="relative">
                        <select 
                          value={bookingForm.sessionTime}
                          onChange={(e) => setBookingForm({ ...bookingForm, sessionTime: e.target.value })}
                          className="w-full bg-[#151515] border border-white/10 hover:border-white/20 focus:border-luxury-accent focus:outline-none p-4 rounded-md font-serif text-xs text-white appearance-none cursor-pointer transition-all duration-300 italic"
                        >
                          <option value="10:00 AM" className="bg-[#101010]">10:00 AM (Early Light Slot)</option>
                          <option value="11:30 AM" className="bg-[#101010]">11:30 AM (Peak Atelier Session)</option>
                          <option value="01:30 PM" className="bg-[#101010]">01:30 PM (Midday Design Sweep)</option>
                          <option value="03:00 PM" className="bg-[#101010]">03:00 PM (Sunset Sizing Slot)</option>
                          <option value="04:30 PM" className="bg-[#101010]">04:30 PM (Evening Private Reserve)</option>
                        </select>
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none text-white/30">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Your Vision Detail block */}
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.18em] text-[#d1d1d1]/60 flex items-center gap-2.5 uppercase font-mono font-semibold">
                      <PenTool className="h-3.5 w-3.5 text-[#bc9c74] stroke-[1.25]" />
                      Your Vision
                    </label>
                    <textarea 
                      rows={4}
                      value={bookingForm.customNotes}
                      placeholder="Share your style vision, occasion, preferences, or any details that help us create your perfect experience..."
                      onChange={(e) => setBookingForm({ ...bookingForm, customNotes: e.target.value })}
                      className="w-full bg-[#151515] border border-white/10 hover:border-white/20 focus:border-luxury-accent focus:outline-none p-4 rounded-md font-serif text-xs text-white placeholder-white/20 transition-all duration-300 leading-relaxed italic"
                    />
                  </div>

                  {/* Elegant "A PERSONAL TOUCH" Sub-box inside Card */}
                  <div className="p-4 rounded-lg bg-[#141414] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                    <div className="flex items-center gap-4">
                      {/* Black Letter stamp card */}
                      <div className="w-14 h-14 rounded-md bg-luxury-slate border border-white/10 flex-shrink-0 overflow-hidden relative">
                        <img 
                          src="/image/SaveClip.App_673802186_17992507190958075_7502736021552698395_n.jpg" 
                          alt="Prestige wax envelope" 
                          className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] tracking-[0.2em] text-[#bc9c74] uppercase font-bold block">A Personal Touch</span>
                        <p className="text-[10px] text-white/40 leading-normal font-sans tracking-wide">
                          Our team will personally review your request and contact you within 12 hours.
                        </p>
                      </div>
                    </div>
                    {/* Monogram circle seal badge */}
                    <div className="w-11 h-11 rounded-full border border-[#bc9c74]/40 flex items-center justify-center font-serif text-[10px] text-[#bc9c74] italic tracking-tighter hover:border-luxury-accent transition-all duration-500 flex-shrink-0">
                      MC
                    </div>
                  </div>

                  {/* Submission Suite */}
                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.01, y: -0.5 }}
                      whileTap={{ scale: 0.99 }}
                      type="submit"
                      className="w-full py-4.5 bg-[#bc9c74] hover:bg-white text-black font-sans text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-500 cursor-pointer shadow-xl rounded flex items-center justify-center gap-2"
                    >
                      Request Appointment <ArrowRight className="h-4 w-4" />
                    </motion.button>
                    
                    <div className="flex items-center justify-center gap-1.5 text-white/30 text-[9px] tracking-[0.16em] uppercase font-mono">
                      <Lock className="h-3 w-3 text-[#bc9c74]/70" />
                      All information is kept private & confidential.
                    </div>
                  </div>

                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="py-16 text-center space-y-5 max-w-md mx-auto"
                >
                  <CheckCircle2 className="h-12 w-12 text-[#bc9c74] mx-auto stroke-[1.25]" />
                  <h4 className="font-serif text-2xl text-white uppercase tracking-wider font-light">
                    Request Received
                  </h4>
                  <p className="font-serif italic text-xs text-white/60 leading-relaxed">
                    "Greeting {bookingForm.name}. Your requested styling session slot has been securely logged within our Victoria Island databases. A private Maris fashion consultant will reach out via email shortly to configure your session."
                  </p>
                  <div className="pt-2 font-mono text-[9px] text-[#bc9c74] uppercase tracking-widest bg-[#151515] py-2 px-4 rounded border border-white/5 inline-block">
                    CONCIERGE KEY // MC_ATELIER_{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </motion.div>


      {/* 6. FINAL BRAND STATEMENT */}
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[90vh] w-full flex flex-col justify-center items-center px-6 md:px-12 py-32 text-center select-none overflow-hidden border-b border-white/5"
      >
        
        {/* Full View Backdrop */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/image/SaveClip.App_702670254_17995688897958075_3403135397625804707_n.jpg" 
            alt="Maris Couture Final Closing Masterpiece Image" 
            className="w-full h-full object-cover brightness-[0.25]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-neutral-950/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/90 pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          
          <span className="font-mono text-[7px] tracking-[0.5em] text-luxury-accent block uppercase">
            MARIS COUTURE MANIFEST STATEMENT
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-luxury-accent tracking-wide leading-tight uppercase font-light">
            Designed To Be <br />
            <span className="italic">Remembered</span>
          </h2>

          <div className="w-12 h-px bg-white/20 mx-auto" />

          <p className="font-serif italic text-sm sm:text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            "Fashions disappear. Styles dissolve. But the confidence of a perfectly structured silken garment sewn beautifully by hand lives forever in memorythither."
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateToCategory("All")}
              className="w-full sm:w-auto px-8 py-3.5 bg-luxury-accent hover:bg-white text-luxury-black font-serif italic text-xs tracking-wider uppercase font-medium transition duration-500 cursor-pointer shadow-xl"
            >
              Explore Ready-To-Wear
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToBooking}
              className="w-full sm:w-auto px-8 py-3.5 border border-white/20 bg-black/40 hover:border-white text-white font-mono text-[8px] tracking-widest uppercase transition duration-500 cursor-pointer text-center"
            >
              Private Appointment
            </motion.button>
          </div>

        </div>

        {/* Floating coordinate anchors */}
        <div className="absolute bottom-8 left-12 font-mono text-[7px] text-white/15 tracking-[0.2em] hidden sm:block uppercase">
          COORD: 6.4531 // LAGOS METRO // SATELLITE
        </div>
      </motion.section>

    </div>
  );
}
