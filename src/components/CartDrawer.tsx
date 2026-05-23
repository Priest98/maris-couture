import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useBrand } from "../context/BrandContext";

export default function CartDrawer() {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    updateCartQty, 
    removeFromCart, 
    setCheckoutOpen 
  } = useBrand();

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

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-xs"
          />

          {/* Cart Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-luxury-black border-l border-white/10 z-50 p-6 md:p-8 flex flex-col justify-between select-none"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="h-4 w-4 text-luxury-accent stroke-[1.25]" />
                  <span className="font-serif text-lg tracking-[0.2em] text-luxury-accent uppercase">
                    C a r t
                  </span>
                  <span className="font-mono text-[9px] text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                    {cart.reduce((s, i) => s + i.quantity, 0)} items
                  </span>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-1.5 rounded-full border border-white/10 hover:border-white/30 hover:opacity-100 opacity-60 transition duration-300"
                >
                  <X className="h-4 w-4 text-luxury-accent stroke-[1]" />
                </button>
              </div>
            </div>

            {/* Cart items scrollway */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pr-1">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center py-20">
                  <span className="font-serif italic text-sm text-white/30">Your archive is empty</span>
                  <p className="font-sans text-[10px] text-white/50 tracking-wider max-w-[200px]">
                    Discover and select raw biological designs to populate this drawer.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="font-mono text-[9px] tracking-widest text-luxury-accent uppercase border border-white/10 px-6 py-2 rounded-full hover:bg-white/5 transition duration-500"
                  >
                    DISCOVER ITEMS
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-start justify-between space-x-4 pb-4 border-b border-white/5"
                    >
                      {/* Product Thumbnail with low opacity blur reveal */}
                      <div className="relative w-16 h-20 overflow-hidden border border-white/10 bg-luxury-charcoal flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif text-[11px] md:text-xs tracking-wider text-white truncate uppercase font-light">
                          {item.product.name.split(" // ")[1] || item.product.name}
                        </h4>
                        <div className="flex items-center space-x-2 text-[8px] font-mono text-white/40 uppercase">
                          <span>SIZE: {item.size}</span>
                          <span>•</span>
                          <span>{item.product.category}</span>
                        </div>
                        
                        {/* Quantity triggers */}
                        <div className="flex items-center space-x-2 pt-2">
                          <button
                            onClick={() => updateCartQty(item.id, item.quantity - 1)}
                            className="p-1 rounded border border-white/5 hover:border-white/20 text-white/60 hover:text-white"
                          >
                            <Minus className="h-2.5 w-2.5" />
                          </button>
                          <span className="font-mono text-[10px] w-6 text-center text-white/90">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(item.id, item.quantity + 1)}
                            className="p-1 rounded border border-white/5 hover:border-white/20 text-white/60 hover:text-white"
                          >
                            <Plus className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex flex-col items-end justify-between h-full space-y-4">
                        <span className="font-serif text-xs text-luxury-accent font-medium">
                          {item.product.price}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 hover:text-rose-400 text-white/30 transition duration-300"
                          title="Remove item"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Checkout action */}
            {cart.length > 0 && (
              <div className="border-t border-white/5 pt-6 mt-6 space-y-4">
                <div className="flex justify-between items-baseline font-mono text-[10px] text-white/60 uppercase">
                  <span>SHIPPING SATELLITE</span>
                  <span className="text-white/80">COMPLIMENTARY</span>
                </div>
                
                <div className="flex justify-between items-baseline">
                  <span className="font-serif text-xs tracking-wider text-white/50 uppercase">
                    Estimated Total
                  </span>
                  <span className="font-serif text-xl text-luxury-accent font-medium">
                    {formatPrice(totalAmount)}
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                    className="group relative w-full flex items-center justify-between bg-luxury-accent hover:bg-white text-luxury-black font-mono text-[10px] tracking-widest uppercase p-4 rounded-md transition duration-500 overflow-hidden"
                  >
                    <span>PROCEED THERETO</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition duration-500" />
                  </button>
                  <p className="text-[7.5px] font-mono text-white/30 text-center mt-3 tracking-wider uppercase">
                    Processed dynamically via high-security premium Paystack node
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
