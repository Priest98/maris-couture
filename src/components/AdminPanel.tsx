import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Edit3, Trash2, Image, Check, FileText, Sparkles, SlidersHorizontal, Eye, RefreshCw, Smartphone } from "lucide-react";
import { useBrand } from "../context/BrandContext";
import { CollectionItem } from "../types";

export default function AdminPanel() {
  const { 
    products, 
    addProduct, 
    editProduct, 
    deleteProduct 
  } = useBrand();

  const [activeTab, setActiveTab] = useState<"products" | "campaign" | "instagram">("products");
  
  // Product Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Tari Set Collection");
  const [image, setImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [materials, setMaterials] = useState("");
  const [specs, setSpecs] = useState("");
  const [description, setDescription] = useState("");
  const [coordinate, setCoordinate] = useState("45.020 // NORTH");

  // Success indicator state
  const [successMsg, setSuccessMsg] = useState("");

  const clearForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setCategory("Tari Set Collection");
    setImage("");
    setHoverImage("");
    setMaterials("");
    setSpecs("");
    setDescription("");
    setCoordinate(`${(Math.random() * 90).toFixed(3)} // NORTH`);
  };

  const handleEditInit = (p: CollectionItem) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(p.price);
    setCategory(p.category);
    setImage(p.image);
    setHoverImage(p.hoverImage || "");
    setMaterials(p.materials.join(", "));
    setSpecs(p.specs.join(", "));
    setDescription(p.description);
    setCoordinate(p.coordinate);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedProduct = {
      name,
      price: price.startsWith("$") ? price : `$${price}`,
      category,
      image: image || "/image/SaveClip.App_701558762_17995630046958075_5275248658664269477_n.jpg",
      hoverImage: hoverImage || undefined,
      materials: materials.split(",").map((s) => s.trim()).filter(Boolean),
      specs: specs.split(",").map((s) => s.trim()).filter(Boolean),
      description,
      coordinate
    };

    if (editingId) {
      editProduct({ ...formattedProduct, id: editingId });
      showNotification("Sartorial piece updated successfully!");
    } else {
      addProduct(formattedProduct);
      showNotification("New sartorial piece injected successfully!");
    }
    clearForm();
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const [instagramUploadUrl, setInstagramUploadUrl] = useState("");
  const [instagramCaption, setInstagramCaption] = useState("");

  // Campaign management visual states
  const [heroTitle, setHeroTitle] = useState("MONOLITH - AT THE SECOND SEAM");
  const [heroSubtitle, setHeroSubtitle] = useState("INTRODUCTION");
  const [heroImgUrl, setHeroImgUrl] = useState("/image/SaveClip.App_702670254_17995688897958075_3403135397625804707_n.jpg");

  return (
    <div className="relative pt-24 pb-20 w-full min-h-screen bg-luxury-black text-[#d1d1d1] selection:bg-luxury-accent selection:text-luxury-black overflow-hidden select-none">
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-10 relative z-10 font-sans">
        
        {/* Header HUD info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6">
          <div className="space-y-1.5Col">
            <span className="font-mono text-[8px] tracking-[0.4em] text-[#3ec193] block uppercase">
              ÉTHER CONTROL VAULT // LIVE CMS
            </span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-luxury-accent uppercase font-light">
              Brand Control Desk
            </h2>
            <p className="font-serif italic text-xs text-white/50 font-light max-w-sm">
              Tailor collections, manage campaign visuals, and upload instagram assets dynamically with zero code.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 md:mt-0 font-mono text-[7px] border border-white/10 p-3 rounded bg-luxury-slate">
            <Smartphone className="h-4 w-4 text-emerald-400 stroke-[1.25]" />
            <div>
              <span className="text-white/80 block uppercase tracking-wider">Mobile-First Active</span>
              <span className="text-white/40 block">Configure from any handheld screen</span>
            </div>
          </div>
        </div>

        {/* Global Notification system */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="bg-emerald-500/10 border border-emerald-500/30 p-4 text-[#3ec193] font-serif italic text-xs rounded flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 stroke-[2]" />
                <span>{successMsg}</span>
              </div>
              <span className="font-mono text-[8px] tracking-widest text-[#3ec193]/60 uppercase">ACTIVE_DECKEY</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Admin Tabs navigation */}
        <div className="flex space-x-2 border-b border-white/5 pb-4">
          <button
            onClick={() => setActiveTab("products")}
            className={`font-mono text-[8px] tracking-[0.2em] uppercase px-4 py-2 border rounded-full transition duration-300 ${
              activeTab === "products" 
                ? "bg-luxury-accent text-luxury-black border-luxury-accent" 
                : "border-white/10 text-white/50 hover:border-white/30"
            }`}
          >
            Inventory Management
          </button>
          <button
            onClick={() => setActiveTab("campaign")}
            className={`font-mono text-[8px] tracking-[0.2em] uppercase px-4 py-2 border rounded-full transition duration-300 ${
              activeTab === "campaign" 
                ? "bg-luxury-accent text-luxury-black border-luxury-accent" 
                : "border-white/10 text-white/50 hover:border-white/30"
            }`}
          >
            Campaign HUD Customizer
          </button>
          <button
            onClick={() => setActiveTab("instagram")}
            className={`font-mono text-[8px] tracking-[0.2em] uppercase px-4 py-2 border rounded-full transition duration-300 ${
              activeTab === "instagram" 
                ? "bg-luxury-accent text-luxury-black border-luxury-accent" 
                : "border-white/10 text-white/50 hover:border-white/30"
            }`}
          >
            Instagram Instagram-style Feed
          </button>
        </div>

        {/* Tab CONTENT: Inventory Management */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Create/Edit form */}
            <form onSubmit={handleSubmitProduct} className="lg:col-span-5 bg-luxury-slate border border-white/10 p-6 rounded-lg space-y-4">
              <div className="border-b border-white/5 pb-3">
                <span className="font-mono text-[8.5px] text-white/40 uppercase block">FORM PANEL // DOCK</span>
                <h3 className="font-serif text-sm text-luxury-accent tracking-widest uppercase font-light mt-1">
                  {editingId ? "Modify Sartorial Piece" : "Infect New Apparel / Hair Code"}
                </h3>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-mono text-[8px] text-white/40 uppercase block">Product Name / Design ID</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 10 // OBLIQUE SATELLITE DUFFLE"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] text-white/40 uppercase block">Estimated Price ($)</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 890"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] text-white/40 uppercase block">Category Cluster</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white font-mono uppercase"
                    >
                      <option value="Tari Set Collection">Tari Set Collection</option>
                      <option value="Hair Collection">Hair Collection</option>
                      <option value="New Arrivals">New Arrivals</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Limited Pieces">Limited Pieces</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[8px] text-white/40 uppercase block">Primary Product Photo URL</label>
                  <input
                    required
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[8px] text-white/40 uppercase block">Hover Angle Photo URL (Optional)</label>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/..."
                    value={hoverImage}
                    onChange={(e) => setHoverImage(e.target.value)}
                    className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[8px] text-white/40 uppercase block">Materials (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. 100% Organic Cotton, Sulfur dye"
                    value={materials}
                    onChange={(e) => setMaterials(e.target.value)}
                    className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[8px] text-white/40 uppercase block">Fine Specs Description (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Asymmetric lining, Raw hems"
                    value={specs}
                    onChange={(e) => setSpecs(e.target.value)}
                    className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[8px] text-white/40 uppercase block">Aesthetic Story Description</label>
                  <textarea
                    rows={3}
                    placeholder="An elegant description tracing background stories and weaving dimensions..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {editingId && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="border border-white/10 hover:border-white/20 text-white font-mono text-[8px] uppercase py-3 rounded text-center transition duration-500"
                  >
                    CANCEL EDITING
                  </button>
                )}
                <button
                  type="submit"
                  className="w-full bg-luxury-accent hover:bg-white text-luxury-black font-mono text-[8px] tracking-widest uppercase py-3 rounded transition duration-500 font-medium"
                >
                  {editingId ? "SAVE ARTIFACT" : "INJECT ARTIFACT"}
                </button>
              </div>
            </form>

            {/* Inventory listing table */}
            <div className="lg:col-span-7 bg-luxury-slate border border-white/10 p-6 rounded-lg space-y-4">
              <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                <span className="font-mono text-[8px] text-white/40 uppercase">ACTIVE INVENTORIES // VERIFIED</span>
                <span className="font-serif italic text-xs text-[#eae6df]">{products.length} live models</span>
              </div>

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 no-scrollbar">
                {products.map((p) => {
                  return (
                    <div 
                      key={p.id}
                      className="flex items-center justify-between p-3 bg-luxury-black/30 border border-white/5 hover:border-white/10 rounded transition duration-300"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-10 h-12 bg-luxury-charcoal border border-white/10 rounded overflow-hidden flex-shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif text-xs text-white truncate uppercase font-light max-w-[200px]">
                            {p.name}
                          </h4>
                          <span className="font-mono text-[7px] text-luxury-accent/50 block uppercase tracking-wider">
                            {p.category} // {p.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditInit(p)}
                          className="p-1.5 rounded border border-white/10 text-white/60 hover:text-[#eae6df] hover:border-white/30 transition duration-300"
                          title="Edit product specs"
                        >
                          <Edit3 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => {
                            deleteProduct(p.id);
                            showNotification("Apparel piece removed from database!");
                          }}
                          className="p-1.5 rounded border border-rose-950 text-rose-400 hover:bg-rose-500/10 hover:border-rose-400 transition duration-300"
                          title="Delete product"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab CONTENT: Campaign HUD Customizer */}
        {activeTab === "campaign" && (
          <div className="bg-luxury-slate border border-white/10 p-6 md:p-8 rounded-lg space-y-6 max-w-2xl mx-auto">
            <div className="border-b border-white/5 pb-3">
              <span className="font-mono text-[8px] text-white/40 uppercase block">CAMPAIGN // DISPLAY PROPS</span>
              <h3 className="font-serif text-sm text-luxury-accent tracking-widest uppercase font-light mt-1">
                Customize Frontpage Cinematic Hero
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[8px] text-white/40 uppercase block">Campaign Title Statement</label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[8px] text-white/40 uppercase block">Subtitle ID</label>
                <input
                  type="text"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white font-mono uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[8px] text-white/40 uppercase block">Hero Display Photo URL</label>
                <input
                  type="text"
                  value={heroImgUrl}
                  onChange={(e) => setHeroImgUrl(e.target.value)}
                  className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white font-mono"
                />
              </div>

              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded text-[10px] text-yellow-100/60 leading-relaxed font-light font-sans">
                💡 Entering customized links instantly updates the frontend cinematic hero and overrides global defaults safely outside the physical source code!
              </div>

              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("custom_campaign_title", heroTitle);
                  localStorage.setItem("custom_campaign_subtitle", heroSubtitle);
                  localStorage.setItem("custom_campaign_img", heroImgUrl);
                  showNotification("Homepage frontpage campaign assets updated!");
                }}
                className="w-full bg-luxury-accent hover:bg-white text-luxury-black font-mono text-[8px] tracking-widest uppercase py-3 rounded transition duration-500 font-medium"
              >
                APPLY VISUAL PRESETS
              </button>
            </div>
          </div>
        )}

        {/* Tab CONTENT: Instagram style upload */}
        {activeTab === "instagram" && (
          <div className="bg-luxury-slate border border-white/10 p-6 md:p-8 rounded-lg space-y-6 max-w-xl mx-auto">
            <div className="border-b border-white/5 pb-3">
              <span className="font-mono text-[8px] text-white/40 uppercase block">INSTA-CAMPAIGNS // DOCK</span>
              <h3 className="font-serif text-sm text-luxury-accent tracking-widest uppercase font-light mt-1">
                Upload Campaign Reels & Instagram Grid
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[8px] text-white/40 uppercase block">Instagram Photo / Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?..."
                  value={instagramUploadUrl}
                  onChange={(e) => setInstagramUploadUrl(e.target.value)}
                  className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[8px] text-white/40 uppercase block">Enquiry / Caption Tag</label>
                <input
                  type="text"
                  placeholder="#autumn #l'eclipse #campaign"
                  value={instagramCaption}
                  onChange={(e) => setInstagramCaption(e.target.value)}
                  className="w-full bg-luxury-black border border-white/10 p-2.5 rounded text-xs text-white"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!instagramUploadUrl) {
                    alert("Please provide a valid image URL link");
                    return;
                  }
                  // Simulate saving collection instagram model into local list
                  const existingInsta = JSON.parse(localStorage.getItem("ether_instagram_pics") || "[]");
                  const newPic = { id: Date.now(), image: instagramUploadUrl, status: instagramCaption };
                  localStorage.setItem("ether_instagram_pics", JSON.stringify([newPic, ...existingInsta]));
                  
                  // Clear fields
                  setInstagramUploadUrl("");
                  setInstagramCaption("");
                  showNotification("New Instagram asset loaded successfully!");
                }}
                className="w-full bg-luxury-accent hover:bg-white text-luxury-black font-mono text-[8px] tracking-widest uppercase py-3 rounded transition duration-500 font-medium"
              >
                DISPATCH TO INSTAGRAM STREAM
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
