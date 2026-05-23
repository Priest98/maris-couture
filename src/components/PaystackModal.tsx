import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CreditCard, ShieldCheck, Mail, User, MapPin, Globe, Loader2, Award, Sparkles } from "lucide-react";
import { useBrand } from "../context/BrandContext";

export default function PaystackModal() {
  const { 
    cart, 
    checkoutOpen, 
    setCheckoutOpen, 
    clearCart 
  } = useBrand();

  const [step, setStep] = useState<"checkout" | "payment" | "submitting" | "success">("checkout");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const totalAmount = cart.reduce(
    (acc, item) => {
      const priceNum = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
      return acc + (isNaN(priceNum) ? 0 : priceNum) * item.quantity;
    },
    0
  );

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "checkout") {
      setStep("payment");
    }
  };

  const triggerPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("submitting");
    
    // Simulate premium paystack transaction processing
    setTimeout(() => {
      setStep("success");
      // Clear the user's cart upon luxury order success
      clearCart();
    }, 2500);
  };

  const handleClose = () => {
    setStep("checkout");
    setEmail("");
    setName("");
    setAddress("");
    setCity("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCheckoutOpen(false);
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Secure Frame */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-lg bg-luxury-slate border border-white/10 rounded-lg shadow-2xl overflow-hidden text-[#d1d1d1] font-sans select-none z-10"
          >
            {/* Header branding & paystack status indicator */}
            <div className="bg-luxury-black p-5 border-b border-white/5 flex justify-between items-center">
              <div>
                <span className="font-mono text-[7px] tracking-[0.3em] text-white/40 block uppercase">
                  SEAMLESS DECRYPTION VAULT
                </span>
                <h3 className="font-serif text-sm tracking-widest text-[#eae6df] uppercase flex items-center space-x-2">
                  <span>ÉTHER CHEST</span>
                  <span className="px-1.5 py-0.5 bg-emerald-500/10 text-[#3ec193] font-mono text-[7px] tracking-normal rounded border border-emerald-500/20 lowercase">
                    paystack active
                  </span>
                </h3>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 border border-white/10 hover:border-white/30 rounded-full transition duration-300"
              >
                <X className="h-3.5 w-3.5 text-white/50" />
              </button>
            </div>

            {/* Main Interactive Flow */}
            <div className="p-6 md:p-8">
              {step === "checkout" && (
                <form onSubmit={handleNextStep} className="space-y-5">
                  <div className="text-center pb-2">
                    <span className="font-mono text-[8px] text-white/40 block uppercase tracking-widest">
                      CHIEF COORD // BILLING IDENT
                    </span>
                    <h4 className="font-serif italic text-sm text-white/80 mt-1">
                      Where should this physical collection be shored?
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] text-white/50 uppercase tracking-wider block">Real Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Samuel Ade"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-luxury-black/60 border border-white/10 py-2.5 pl-9 pr-4 rounded text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] text-white/50 uppercase tracking-wider block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                        <input
                          type="email"
                          required
                          placeholder="recipient@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-luxury-black/60 border border-white/10 py-2.5 pl-9 pr-4 rounded text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[8px] text-white/50 uppercase tracking-wider block">Physical Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30" />
                      <input
                        type="text"
                        required
                        placeholder="Plot 101, Admiralty Way"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-luxury-black/60 border border-white/10 py-2.5 pl-9 pr-4 rounded text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] text-white/50 uppercase tracking-wider block">City</label>
                      <input
                        type="text"
                        required
                        placeholder="Lagos"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-luxury-black/60 border border-white/10 py-2.5 px-4 rounded text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] text-white/50 uppercase tracking-wider block">Destination Country</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
                        <select className="w-full bg-luxury-black/60 border border-white/10 py-2.5 pl-9 pr-4 rounded text-xs text-white focus:outline-none focus:border-white/30 appearance-none">
                          <option value="NG">Nigeria (NG)</option>
                          <option value="UK">United Kingdom (UK)</option>
                          <option value="US">United States (US)</option>
                          <option value="FR">France (FR)</option>
                          <option value="JP">Japan (JP)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Summary amount */}
                  <div className="p-4 bg-luxury-black/40 border border-white/5 rounded flex justify-between items-baseline pt-4">
                    <span className="font-mono text-[8.5px] text-white/50 uppercase tracking-wider">TOTAL SECURE BILL</span>
                    <span className="font-serif text-base text-luxury-accent font-medium">{formatPrice(totalAmount)}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-luxury-accent hover:bg-white text-luxury-black font-mono text-[10px] tracking-widest uppercase py-3.5 rounded transition duration-500"
                  >
                    CONTINUE TO DEPOSIT
                  </button>
                </form>
              )}

              {step === "payment" && (
                <form onSubmit={triggerPayment} className="space-y-5">
                  {/* Paystack official checkout design simulation */}
                  <div className="bg-[#0b100d] border border-emerald-500/20 p-4 rounded-lg flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded bg-[#3ec193]/15 flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-[#3ec193]" />
                      </div>
                      <div>
                        <span className="font-mono text-[10px] tracking-widest text-[#3ec193] block uppercase">
                          Paystack Gateway
                        </span>
                        <span className="font-sans text-[8px] text-white/40 block">
                          Securely encrypting {email}
                        </span>
                      </div>
                    </div>
                    <span className="font-serif text-sm text-[#3ec193] font-medium">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] text-white/50 uppercase tracking-wider block">Credit Card Number</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="5399 2142 3855 0899"
                        value={cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(v);
                        }}
                        className="w-full bg-luxury-black/60 border border-white/10 py-2.5 px-4 rounded text-xs text-white placeholder-white/25 font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] text-white/50 uppercase tracking-wider block">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="12/28"
                          value={expiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, '');
                            if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2, 4)}`;
                            setExpiry(v);
                          }}
                          className="w-full bg-luxury-black/60 border border-white/10 py-2.5 px-4 rounded text-xs text-white placeholder-white/25 font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] text-white/50 uppercase tracking-wider block">CVV Secure code</label>
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="***"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          className="w-full bg-luxury-black/60 border border-white/10 py-2.5 px-4 rounded text-xs text-white placeholder-white/25 font-mono focus:outline-none focus:border-white/30"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-[8px] font-mono text-white/40 uppercase py-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 stroke-[1.5]" />
                    <span>PCIDSS COMPLIANT 256-BIT ENCRYTED. ZERO PHYSICAL RISK.</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep("checkout")}
                      className="border border-white/10 hover:border-white/20 text-white font-mono text-[8.5px] uppercase py-3 rounded transition duration-500"
                    >
                      GO BACK
                    </button>
                    <button
                      type="submit"
                      className="bg-[#3ec193] hover:bg-[#4dd2a1] text-luxury-black font-mono text-[9px] tracking-widest uppercase py-3 rounded transition duration-500 font-medium"
                    >
                      AUTHORIZE AND DEPOSIT
                    </button>
                  </div>
                </form>
              )}

              {step === "submitting" && (
                <div className="py-16 flex flex-col items-center justify-center space-y-6">
                  <Loader2 className="h-10 w-10 text-[#3ec193] animate-spin stroke-[1.25]" />
                  <div className="text-center space-y-2">
                    <span className="font-mono text-[8px] text-emerald-500 tracking-widest block uppercase">
                      AUTHORIZING TRANSACTION VIA PAYSTACK...
                    </span>
                    <p className="font-serif italic text-sm text-white/80">
                      Querying matching card vault and verifying safety. Please remain here.
                    </p>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="py-10 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto relative">
                    <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-emerald-400" />
                    <Award className="h-8 w-8 text-[#3ec193]" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-[8px] text-emerald-500 tracking-[0.4em] block uppercase">
                      ORDER DEPOSITED SUCCESSFULLY
                    </span>
                    <h3 className="font-serif text-xl tracking-wider text-white">
                      Your high-fashion cocoon is curated.
                    </h3>
                    <p className="font-serif italic text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
                      "Each stitch has received a physical confirmation vector. Safe transit reports will be delivered to <span className="text-white/80">{email}</span> in coordinates of 24 hours."
                    </p>
                  </div>

                  <div className="p-4 bg-luxury-black/30 border border-white/5 rounded-md max-w-xs mx-auto text-left font-mono text-[8px] space-y-1 block">
                    <div className="flex justify-between">
                      <span className="text-white/40">TRANS_REF</span>
                      <span className="text-white/80">PSTK-{Math.floor(Math.random() * 90000) + 10000}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">ORIGIN_IP</span>
                      <span className="text-white/80">LOCK-COGNITION-O4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">ORDER_DESTINATION</span>
                      <span className="text-white/80">{city.toUpperCase()}, NG</span>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="bg-[#3ec193] hover:bg-[#4dd2a1] text-luxury-black font-mono text-[9px] tracking-widest uppercase px-8 py-3 rounded-full transition duration-500"
                  >
                    CONTINUE EXPLORING
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
