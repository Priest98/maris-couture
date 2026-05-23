import React, { createContext, useContext, useState, useEffect } from "react";
import { CollectionItem } from "../types";
import { collectionItems as initialCollectionItems } from "../data";

export interface CartItem {
  id: string; // unique cart items (product-id + size)
  product: CollectionItem;
  quantity: number;
  size: string;
}

interface BrandContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  products: CollectionItem[];
  cart: CartItem[];
  wishlist: CollectionItem[];
  addToCart: (product: CollectionItem, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: CollectionItem) => void;
  isInWishlist: (productId: string) => boolean;
  addProduct: (product: Omit<CollectionItem, "id">) => void;
  editProduct: (product: CollectionItem) => void;
  deleteProduct: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

// Additional premium Maris Couture pieces to match bridal, couture, and ready-to-wear categories.
const extendedDefaultItems: CollectionItem[] = [
  ...initialCollectionItems,
  {
    id: "item-6",
    name: "06 // TRADITIONAL GELE & FABRIC COMPANION",
    price: "₦180,000",
    category: "Accessories",
    materials: ["100% Organic Hand-Dyed Aso-Oke", "Metallic copper thread weaves"],
    specs: ["Hand-crafted structure holds custom crown shapes", "Matching 2-meter shoulder shawl sash", "Extremely breathing textured weave"],
    coordinate: "LAGOS // SATELLITE-03",
    description: "A gorgeous modern accessories item, structured to complete your traditional ensemble. Holds robust volume and forms elegant, head-turning crown gestures effortlessly.",
    image: "/image/SaveClip.App_703474177_17996075099958075_4530015394040761226_n.jpg",
    hoverImage: "/image/SaveClip.App_703715523_17996075090958075_7449049744745719206_n.jpg"
  },
  {
    id: "item-7",
    name: "07 // COUTURE CHANTILLY CORSET TOP",
    price: "₦350,000",
    category: "Custom Couture",
    materials: ["Embellished beaded lace panels", "Premium silk-satin inner structure"],
    specs: ["Lace-up back bounds to exact body specifications", "Slightly dropped luxury front-waist line", "Hand-appliqued lace neck ornaments"],
    coordinate: "VI // SEC-02",
    description: "The crown of custom elegance. High-end corsetry designed to elevate and sculpt. It can be paired effortlessly with traditional wraps or contemporary trousers.",
    image: "/image/SaveClip.App_673802186_17992507190958075_7502736021552698395_n.jpg",
    hoverImage: "/image/SaveClip.App_701726081_17995630037958075_6938771093197818527_n.jpg"
  },
  {
    id: "item-8",
    name: "08 // GOLD BULLION ENCRUSTED CHOKER",
    price: "₦120,000",
    category: "Accessories",
    materials: ["Hand-twisted brass strands", "Swarovski gold faceted beads"],
    specs: ["Adjustable custom collar lock", "Polished textured surface", "Bespoke piece numbered by our designer"],
    coordinate: "IKOYI // BLOCK-01",
    description: "Crafted by hand in our Lagos workspace, this heavy gold beaded item captures light beautifully and frames the neck with absolute authority.",
    image: "/image/SaveClip.App_701558762_17995630046958075_5275248658664269477_n.jpg",
    hoverImage: "/image/SaveClip.App_702670254_17995688897958075_3403135397625804707_n.jpg"
  },
  {
    id: "item-9",
    name: "09 // HYBRID GOSSAMER CAPE",
    price: "₦520,000",
    category: "Limited Pieces",
    materials: ["Ultra-fine glass-spun silk blend", "Cold oxide button clips"],
    specs: ["Transparent aerodynamic wind envelope", "Dual hand-stitched side slots", "Extremely limited series: 18 pieces total"],
    coordinate: "LAGOS // CORE-09",
    description: "A sheer campaign centerpiece. Constructed from transparent glass-like luxury fibers, catching light to form a shimmering, weightless campaign silhouette.",
    image: "/image/SaveClip.App_703433599_17995688906958075_3604819135559276349_n.jpg",
    hoverImage: "/image/SaveClip.App_673141677_17992507199958075_1872653400330052205_n.jpg"
  }
];

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [products, setProducts] = useState<CollectionItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CollectionItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load initial products from local storage when hydrated
  useEffect(() => {
    const saved = localStorage.getItem("maris_products");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const hasUnsplash = parsed.some((p: any) => p.image && p.image.includes("unsplash.com"));
        if (hasUnsplash) {
          setProducts(extendedDefaultItems);
          localStorage.setItem("maris_products", JSON.stringify(extendedDefaultItems));
        } else {
          setProducts(parsed);
        }
      } catch (e) {
        setProducts(extendedDefaultItems);
      }
    } else {
      setProducts(extendedDefaultItems);
      localStorage.setItem("maris_products", JSON.stringify(extendedDefaultItems));
    }

    // Load cart
    const savedCart = localStorage.getItem("maris_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }

    // Load wishlist
    const savedWish = localStorage.getItem("maris_wishlist");
    if (savedWish) {
      try {
        setWishlist(JSON.parse(savedWish));
      } catch (e) {}
    }
  }, []);

  // Sync helpers
  const saveProductsToStorage = (newProducts: CollectionItem[]) => {
    setProducts(newProducts);
    localStorage.setItem("maris_products", JSON.stringify(newProducts));
  };

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("maris_cart", JSON.stringify(newCart));
  };

  const saveWishToStorage = (newWish: CollectionItem[]) => {
    setWishlist(newWish);
    localStorage.setItem("maris_wishlist", JSON.stringify(newWish));
  };

  const addToCart = (product: CollectionItem, size: string, quantity = 1) => {
    const cartItemId = `${product.id}-${size}`;
    const existingIndex = cart.findIndex((item) => item.id === cartItemId);

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, { id: cartItemId, product, quantity, size }];
    }
    saveCartToStorage(updatedCart);
    setCartOpen(true); // Open drawer automatically for beautiful shopping feedback!
  };

  const removeFromCart = (cartItemId: string) => {
    const updated = cart.filter((item) => item.id !== cartItemId);
    saveCartToStorage(updated);
  };

  const updateCartQty = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const updated = cart.map((item) =>
      item.id === cartItemId ? { ...item, quantity: qty } : item
    );
    saveCartToStorage(updated);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const toggleWishlist = (product: CollectionItem) => {
    const exists = wishlist.some((item) => item.id === product.id);
    let updated: CollectionItem[];
    if (exists) {
      updated = wishlist.filter((item) => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }
    saveWishToStorage(updated);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const addProduct = (product: Omit<CollectionItem, "id">) => {
    const newId = `product-${Date.now()}`;
    const newProduct: CollectionItem = { ...product, id: newId };
    const updated = [newProduct, ...products];
    saveProductsToStorage(updated);
  };

  const editProduct = (product: CollectionItem) => {
    const updated = products.map((p) => (p.id === product.id ? product : p));
    saveProductsToStorage(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProductsToStorage(updated);
  };

  return (
    <BrandContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        products,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addProduct,
        editProduct,
        deleteProduct,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        checkoutOpen,
        setCheckoutOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
};
