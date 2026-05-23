import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, MessageSquare, Instagram, Mail, Compass, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate premium message vault submission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMsg("");
    }, 1800);
  };

  return (
    <div className="relative pt-24 pb-20 w-full min-h-screen bg-luxury-black text-[#d1d1d1] selection:bg-luxury-accent selection:text-luxury-black overflow-hidden select-none">
      
      {/* Background blueprint details */}
      <div className="absolute top-10 right-10 pointer-events-none font-mono text-[7px] text-white/10 text-right space-y-1 block">
        <span>SATELLITE COMM: SECURE_LINE_H04</span>
        <span>LATENCY REPORT: 12ms // CONSTANT</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 relative z-10 font-sans">
        
        {/* Left Column: Direct channels and coordinates */}
        <div className="md:col-span-5 space-y-8 md:space-y-12">
          <div className="space-y-3">
            <span className="font-mono text-[8px] tracking-[0.4em] text-white/40 block uppercase">
              CHANNELS // SATELLITE
            </span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wide text-luxury-accent uppercase font-light">
              CONNECT THITHER
            </h2>
            <p className="font-serif italic text-xs text-white/50 leading-relaxed font-light">
              Our support atelier responds dynamically. Reach out with questions regarding custom sizing, bespoke tailoring details, or active order statuses.
            </p>
          </div>

          <div className="space-y-6">
            {/* WhatsApp Integration Button */}
            <a 
              href="https://wa.me/2348000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/20 group transition duration-500 cursor-pointer block"
            >
              <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-[#3ec193]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-sm tracking-wider text-white group-hover:text-luxury-accent transition duration-300 uppercase font-light">
                  WhatsApp Concierge
                </h4>
                <p className="text-[10px] text-white/40 font-mono tracking-wider lowercase">
                  wa.me/maris.concierge // active
                </p>
              </div>
            </a>

            {/* Instagram Integration Button */}
            <a 
              href="https://instagram.com/maris.couture" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-4 p-4 rounded-lg bg-pink-500/5 hover:bg-pink-500/10 border border-pink-500/20 group transition duration-500 cursor-pointer block"
            >
              <div className="w-10 h-10 rounded bg-pink-500/10 flex items-center justify-center">
                <Instagram className="h-5 w-5 text-pink-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-sm tracking-wider text-white group-hover:text-luxury-accent transition duration-300 uppercase font-light">
                  Instagram Feed
                </h4>
                <p className="text-[10px] text-white/40 font-mono tracking-wider lowercase">
                  @maris.couture // campaigns
                </p>
              </div>
            </a>

            {/* Email Contact Detail */}
            <a 
              href="mailto:concierge@maris-couture.com"
              className="flex items-center space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 group transition duration-500 cursor-pointer block"
            >
              <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center">
                <Mail className="h-5 w-5 text-luxury-accent/80" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-sm tracking-wider text-white group-hover:text-luxury-accent transition duration-300 uppercase font-light">
                  Office Desk Email
                </h4>
                <p className="text-[10px] text-white/40 font-mono tracking-wider lowercase">
                  concierge@maris-couture.com // secure
                </p>
              </div>
            </a>
          </div>

          <div className="p-4 bg-luxury-slate border border-white/5 rounded font-mono text-[7.5px] text-white/40 space-y-1 block">
            <span className="text-white/70 block mb-1">ATELIER DIRECT COORDINATE:</span>
            <span>LAGOS ATELIER SEC 01</span>
            <span className="block">VICTORIA ISLAND // LAGOS, NIGERIA</span>
          </div>
        </div>

        {/* Right Column: Message transmission panel */}
        <div className="md:col-span-7 bg-luxury-slate border border-white/10 p-6 md:p-8 rounded-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 pointer-events-none architectural-grid opacity-[0.06]" />

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6 relative z-10"
              >
                <div className="border-b border-white/5 pb-4 mb-4">
                  <span className="font-serif text-xs text-white/50 uppercase tracking-widest block">
                    TRANSMISSION SECT
                  </span>
                  <h3 className="font-serif text-lg tracking-wider text-luxury-accent uppercase font-light mt-1">
                    Secure Enquiry Dispatch
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest block">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Jean Foster"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-luxury-black border border-white/10 py-3 px-4 rounded text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest block">Your Email</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. jean@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-luxury-black border border-white/10 py-3 px-4 rounded text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest block">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your tailoring coordinates / size custom sizing requirements / general questions..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-luxury-black border border-white/10 py-3 px-4 rounded text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-luxury-accent hover:bg-white text-luxury-black font-mono text-[9px] tracking-widest uppercase py-3.5 rounded transition duration-500 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="font-mono pulse animate-pulse">DISPATCHING SYSTEM...</span>
                  ) : (
                    <>
                      <span>TRANSMIT ENQUIRY</span>
                      <Send className="h-3 w-3" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6 relative z-10"
              >
                <div className="w-12 h-12 rounded-full border border-[#3ec193]/35 bg-emerald-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6 text-[#3ec193]" />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-[8px] text-[#3ec193] tracking-widest block">ENQUIRY DELIVERED</span>
                  <h4 className="font-serif text-lg tracking-wider text-white uppercase font-light">
                    Your dispatch code is transmitted.
                  </h4>
                  <p className="font-serif italic text-xs text-white/40 max-w-sm mx-auto leading-relaxed">
                    "We have shaked and analyzed the spectrum of your request. Atelier members will establish dialogue within three solar coordinates."
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="font-mono text-[8px] tracking-widest text-luxury-accent hover:text-white uppercase border border-white/20 px-6 py-2.5 rounded-full"
                >
                  DISPATCH ANOTHER MESSAGE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
