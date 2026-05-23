import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Plus, ShoppingBag, Eye } from "lucide-react";
import { useBrand } from "../context/BrandContext";

export default function WishlistDrawer({ onSelectItem }: { onSelectItem: (item: any) => void }) {
  const { 
    wishlist, 
    wishlistOpen, 
    setWishlistOpen, 
    toggleWishlist, 
    addToCart 
  } = useBrand();

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-xs"
          />

          {/* Wislist Drawer Frame */}
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
                  <Heart className="h-4 w-4 text-rose-400 stroke-[1.5] fill-rose-500/20" />
                  <span className="font-serif text-lg tracking-[0.2em] text-luxury-accent uppercase">
                    W i s h l i s t
                  </span>
                  <span className="font-mono text-[9px] text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                    {wishlist.length} design{wishlist.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="p-1.5 rounded-full border border-white/10 hover:border-white/30 hover:opacity-100 opacity-60 transition duration-300"
                >
                  <X className="h-4 w-4 text-luxury-accent stroke-[1]" />
                </button>
              </div>
            </div>

            {/* List scrollway */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pr-1">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center py-20">
                  <span className="font-serif italic text-sm text-white/30">Your coordinates are empty</span>
                  <p className="font-sans text-[10px] text-white/50 tracking-wider max-w-[200px]">
                    Bookmark architectural drapes and garments to review them in this aesthetic vault.
                  </p>
                  <button
                    onClick={() => setWishlistOpen(false)}
                    className="font-mono text-[9px] tracking-widest text-luxury-accent uppercase border border-white/10 px-6 py-2 rounded-full hover:bg-white/5 transition duration-500"
                  >
                    PREVIEW GALLERY
                  </button>
                </div>
              ) : (
                wishlist.map((item) => {
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-start justify-between space-x-4 pb-4 border-b border-white/5"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-20 overflow-hidden border border-white/10 bg-luxury-charcoal flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Item details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-serif text-[11px] md:text-xs tracking-wider text-white truncate uppercase font-light">
                          {item.name.split(" // ")[1] || item.name}
                        </h4>
                        <p className="text-[8px] font-mono text-white/40 uppercase">
                          {item.category} • {item.price}
                        </p>

                        <div className="flex space-x-2 pt-2">
                          {/* Quick Add to Cart with Default Size 'M' */}
                          <button
                            onClick={() => addToCart(item, "M", 1)}
                            className="flex items-center space-x-1 font-mono text-[8px] tracking-widest text-luxury-accent uppercase border border-white/10 px-2 py-1 rounded bg-white/5 hover:bg-white/15 transition duration-350"
                          >
                            <Plus className="h-2.5 w-2.5" />
                            <span>ADD (M)</span>
                          </button>
                          
                          {/* Quick Inspect */}
                          <button
                            onClick={() => {
                              onSelectItem(item);
                              setWishlistOpen(false);
                            }}
                            className="flex items-center space-x-1 font-mono text-[8px] tracking-widest text-white/50 uppercase hover:text-white transition duration-300"
                          >
                            <Eye className="h-3 w-3" />
                            <span>INSPECT</span>
                          </button>
                        </div>
                      </div>

                      {/* Remove action */}
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="p-1.5 text-rose-400 hover:text-white transition duration-350"
                        title="Remove from wishlist"
                      >
                        <Heart className="h-3.5 w-3.5 fill-rose-500/20" />
                      </button>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 pt-4 text-center">
              <span className="font-mono text-[8px] text-white/30 tracking-widest block uppercase">
                Sartorial Archives // Sync online
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
