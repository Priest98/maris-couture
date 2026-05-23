/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CollectionItem, CinematicScene, JournalEntry } from "./types";

export const collectionItems: CollectionItem[] = [
  {
    id: "item-1",
    name: "01 // GOLDEN BROCADE REVELATION",
    price: "₦1,250,000",
    category: "Custom Couture",
    materials: ["Premium Golden Metallic Brocade", "Raw Nigerian wild silk lining", "Hand-cast polished bronze hook-stems"],
    specs: ["Extended architectural wide collar drape", "Interior corset harness tensioners", "Concealed heavy double-stitch finish", "Asymmetrical pool-skimming drape"],
    coordinate: "LAGOS // MAINFRONT-01",
    description: "An exercise in majesty and silhouette. This bespoke evening masterpiece is structured from architectural metallic brocade, designed to capture light and cascade elegantly during motion.",
    image: "/image/SaveClip.App_673141677_17992507199958075_1872653400330052205_n.jpg",
    hoverImage: "/image/SaveClip.App_673802186_17992507190958075_7502736021552698395_n.jpg"
  },
  {
    id: "item-2",
    name: "02 // ROYAL CHANTILLY BRIDAL",
    price: "₦2,500,000",
    category: "Bridal",
    materials: ["Hand-sourced French Chantilly Lace", "Multi-layered biological tulle", "Swarovski crystal micro-beads"],
    specs: ["Cathedral length embroidered train", "Sculpted internal steel-boned corset", "Seamless hand-appliqued lace neckline", "Silk-covered custom button closure"],
    coordinate: "VI // ATELIER-04",
    description: "Our signature bridal creation. Hand-beaded over 450 hours at our Lagos atelier. Tailored exclusively to your measurements to embody timeless majesty on your wedding Day.",
    image: "/image/SaveClip.App_701558762_17995630046958075_5275248658664269477_n.jpg",
    hoverImage: "/image/SaveClip.App_701726081_17995630037958075_6938771093197818527_n.jpg"
  },
  {
    id: "item-3",
    name: "03 // LUXE GEOMETRIC CORSET GOWN",
    price: "₦1,150,000",
    category: "Occasion Wear",
    materials: ["Heavy-weight silk gazar core", "Polished iron structural ribbing", "Unbound raw flax mesh drapes"],
    specs: ["Angled structural sweetheart neckline", "Asymmetric side-split drape", "Modular tie-alignment corset belt"],
    coordinate: "IKOYI // BLOCK-07",
    description: "Designed for tactile contrast, this occasion gown balances sheer gazar panels with heavy structural boning, generating a striking, high-contrast, confidence-inspiring posture.",
    image: "/image/SaveClip.App_702670254_17995688897958075_3403135397625804707_n.jpg",
    hoverImage: "/image/SaveClip.App_703433599_17995688906958075_3604819135559276349_n.jpg"
  },
  {
    id: "item-4",
    name: "04 // LUXE RTW FLUID SILK SLIP",
    price: "₦280,000",
    category: "Ready-To-Wear",
    materials: ["Double-weave organic heavy mulberry silk", "Hand-rolled French seam thread"],
    specs: ["Sub-surface seam-hidden pocket", "Fluid liquid-shine finish bias silhouette", "High-rise structural cowl back drape", "Adjustable micro silk shoulder cords"],
    coordinate: "MAIN // TRANS-09",
    description: "Timeless ready-to-wear elegance. Constructed from heavy mulberry silk that behaves like liquid on the skin. Beautiful, modern, and effortless.",
    image: "/image/SaveClip.App_703474177_17996075099958075_4530015394040761226_n.jpg",
    hoverImage: "/image/SaveClip.App_703715523_17996075090958075_7449049744745719206_n.jpg"
  },
  {
    id: "item-5",
    name: "05 // SOVEREIGN VELVET KAFTAN",
    price: "₦450,000",
    category: "Occasion Wear",
    materials: ["Premium Italian midnight devoré velvet", "Hand-placed gold and silver bullion threads"],
    specs: ["Traditional loose-form comfort", "Ornate regal embroidered collar work", "Concealed front zip-closure line"],
    coordinate: "ABUJA // CENTRAL-02",
    description: "A gorgeous, majestic kaftan that respects traditional forms while adding unparalleled, head-turning gold thread detailing. Extremely comfortable and commanding.",
    image: "/image/SaveClip.App_673141677_17992507199958075_1872653400330052205_n.jpg",
    hoverImage: "/image/SaveClip.App_701558762_17995630046958075_5275248658664269477_n.jpg"
  }
];

export const cinematicScenes: CinematicScene[] = [
  {
    id: "scene-1",
    title: "WEAR ROYALTY",
    subtitle: "MARIS COUTURE // THE HERO CAMPAIGN",
    caption: "Handcrafted couture designed for those who command attention. Discover timeless elegance designed to speak before you do, tailoring every stitch to your unique sovereignty.",
    image: "/image/SaveClip.App_702670254_17995688897958075_3403135397625804707_n.jpg",
    coordinates: { x: "06.52° N", y: "03.37° E" },
    exposureDefault: 0.75,
    soundFreq: 55
  },
  {
    id: "scene-2",
    title: "CRAFTED FOR KINGS. DESIGNED FOR QUEENS.",
    subtitle: "SARTORIAL MONARCHS // CAMPAIGN II",
    caption: "Tailoring is our identity; luxury is our medium. Explore bespoke wedding silhouettes, magnificent evening gowns, and high-fashion ready-to-wear pieces.",
    image: "/image/SaveClip.App_701558762_17995630046958075_5275248658664269477_n.jpg",
    coordinates: { x: "06.45° N", y: "03.43° E" },
    exposureDefault: 0.60,
    soundFreq: 65.4
  },
  {
    id: "scene-3",
    title: "FASHION WITHOUT COMPROMISE",
    subtitle: "Bespeaks Nationwide // CAMPAIGN III",
    caption: "From Lagos to Abuja, we deliver exceptional craft. Perfect drapes, beautiful packaging, and discrete custom sizing appointments tailored safely for you.",
    image: "/image/SaveClip.App_673141677_17992507199958075_1872653400330052205_n.jpg",
    coordinates: { x: "09.07° N", y: "07.39° E" },
    exposureDefault: 0.50,
    soundFreq: 48.9
  }
];

export const journalEntries: JournalEntry[] = [
  {
    id: "entry-1",
    date: "A.22.05",
    title: "THE ART OF DRESSING ROYALTY",
    excerpt: "Why we believe custom tailoring begins with a story rather than a ruler. Deep reflection on bespoke fitting.",
    category: "COUTURE PHILOSOPHY",
    body: [
      "At Maris Couture, we treat garment construction not as standard measurement matching, but as physical character alignment. The garment is armor; the fabric is emotional narrative.",
      "Traditional Nigerian textiles such as aso-oke and hand-loomed fibers hold deep ancestral rhythms. In modern couture, we weave these patterns into structured corsets and asymmetric drapes, achieving a majestic, slow-luxury pace that commands undivided attention in any room."
    ]
  },
  {
    id: "entry-2",
    date: "B.04.11",
    title: "THE SACRED NATURE OF BRIDAL FABRICATION",
    excerpt: "Behind the scenes: 450 hours of hand-beading, French Chantilly lace curation, and structural wedding architecture.",
    category: "DESIGN STORY",
    body: [
      "A wedding gown is the most charged garment a woman will ever wear. Recognizing this weight, our artisans treat lace and silk as structural building blocks. We construct interior supportive frameworks that accentuate natural beauty perfectly.",
      "Beading represents our meditation. Every pearl and Swarovski crystal cluster is sewn securely, catching the light as you move. Luxury isn't just something to be viewed—it is a deeply personal, sacred experience."
    ]
  }
];
