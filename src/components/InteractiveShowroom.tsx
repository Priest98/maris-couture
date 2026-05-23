/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, ShieldAlert, Layers, Target, Eye, Scissors } from "lucide-react";

interface ShowroomNode {
  id: string;
  x: number; // percentage coordinates (0-100)
  y: number;
  label: string;
  category: string;
  description: string;
  metric: string;
  icon: any;
  blueprintCode: string;
}

const EXPOLRATION_NODES: ShowroomNode[] = [
  {
    id: "node-1",
    x: 30,
    y: 25,
    label: "ASYMMETRIC SLEEVE SCAFFOLD",
    category: "SEAM SYSTEM DESIGN",
    description: "Sartorial construction engineered with high-density underarm seams. Restricts fabric pooling while allowing extensive dynamic lateral extension.",
    metric: "LENGTH EXPANSION: +12.4cm / BIAS: 45°",
    icon: Scissors,
    blueprintCode: "M_SEAM_RE_011.SYS"
  },
  {
    id: "node-2",
    x: 75,
    y: 40,
    label: "FIBER CHARCOAL CELL MATRIX",
    category: "MATERIAL COMPOSITION",
    description: "Multi-layered spun organic bamboo material. Intertwined at microscopic level with heavy cellulose cores to trap thermal insulation.",
    metric: "INTERLOCK SPEED: 0.04s / DENIER: 450D",
    icon: Layers,
    blueprintCode: "MAT_CELL_MX_920.DB"
  },
  {
    id: "node-3",
    x: 20,
    y: 70,
    label: "GRAVITATIONAL ANCHOR WEIGHTS",
    category: "STRUCTURE DESIGN",
    description: "Heavy oxidized iron plates encapsulated inside the hem. Forces the wool drape to descend vertically even during wind drafts.",
    metric: "OFFSET PRESSURE: 240g // HEM FORCE",
    icon: Target,
    blueprintCode: "STR_HEM_FORCE_02.SYS"
  },
  {
    id: "node-4",
    x: 60,
    y: 75,
    label: "COLLAR ERGONOMICS RE-ALIGN",
    category: "COLLAR METRICS",
    description: "High-sculpted posture support. Aligns neckline directly to the C7 vertebrae, providing structural rigidity and silent visual balance.",
    metric: "NECK RE-CENTER: 15° RISE // SOFT-STIFF",
    icon: ShieldAlert,
    blueprintCode: "ANAT_C7_COLL_10.S"
  }
];

interface InteractiveShowroomProps {
  onCoordsChange: (x: string, y: string) => void;
}

export default function InteractiveShowroom({ onCoordsChange }: InteractiveShowroomProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ShowroomNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<ShowroomNode | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate percentages for state & parent coordinates updates
    const pctX = ((x / rect.width) * 100).toFixed(1);
    const pctY = ((y / rect.height) * 100).toFixed(1);
    onCoordsChange(`${pctX}%`, `${pctY}%`);
  };

  return (
    <section 
      id="communion"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-6 md:px-16 flex flex-col justify-center items-center border-b border-luxury-accent/5 overflow-hidden select-none"
    >
      {/* Structural Headers */}
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-baseline mb-12 space-y-4 md:space-y-0 relative z-10">
        <div className="space-y-2">
          <span className="font-mono text-[8px] tracking-[0.45em] text-luxury-dim uppercase block">
            03 // CHOREOGRAPH_FABRIC
          </span>
          <h2 className="font-serif text-3xl md:text-4xl tracking-wide text-luxury-accent font-medium">
            THE COMMUNION SHOWROOM
          </h2>
        </div>
        <p className="font-serif italic text-sm text-luxury-dim max-w-sm leading-relaxed font-light">
          "Move your pointer across the canvas to emerge coordinate nodes. Hover coordinates reveal blueprint specifications and raw mathematical fabric parameters."
        </p>
      </div>

      {/* Exploration Canvas Wrap */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch relative z-10">
        
        {/* Interactive Drawing Board Panel (8 Columns) */}
        <div className="lg:col-span-8">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoveredNode(null);
            }}
            className="relative h-[480px] w-full bg-luxury-charcoal/30 border border-luxury-accent/10 rounded overflow-hidden cursor-crosshair group architectural-grid shadow-2xl transition-colors duration-1000"
          >
            {/* Spotlight Mask layer */}
            {isHovered && (
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle 140px at ${coords.x}px ${coords.y}px, rgba(234, 230, 223, 0.04) 0%, transparent 100%)`
                }}
              />
            )}

            {/* Fine grid markings & compass in background */}
            <div className="absolute top-4 right-4 text-luxury-dim/20 pointer-events-none flex items-center space-x-2 font-mono text-[7px] tracking-widest">
              <span>SCANNER ACTIVE</span>
              <Compass className="h-3 w-3 animate-spin" style={{ animationDuration: "10s" }} />
            </div>

            {/* Render Coordinate Dots (The Nodes) */}
            {EXPOLRATION_NODES.map((node) => {
              const Icon = node.icon;
              const isNodeHovered = hoveredNode?.id === node.id;
              const isNodeSelected = selectedNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group/node"
                  onMouseEnter={() => setHoveredNode(node)}
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Outer breathing ring */}
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: Math.random() }}
                    className={`absolute inset-0 rounded-full border transition-colors duration-700 ${isNodeHovered || isNodeSelected ? "border-luxury-accent/50 bg-luxury-accent/1" : "border-luxury-accent/10"}`}
                  />

                  {/* Interacting Center Point */}
                  <div className={`relative h-2 w-2 rounded-full transition-all duration-700 ${isNodeHovered || isNodeSelected ? "bg-luxury-accent scale-125 shadow-md shadow-luxury-accent" : "bg-luxury-accent/30 scale-100"}`} />

                  {/* Floating Micro Tag */}
                  <div className="absolute left-4 top-0 transform -translate-y-1/2 opacity-0 group-hover/node:opacity-80 transition-opacity duration-500 bg-luxury-black/90 border border-luxury-accent/10 rounded px-1.5 py-0.5 pointer-events-none select-none">
                    <span className="font-mono text-[6.5px] tracking-widest text-luxury-accent uppercase whitespace-nowrap">
                      COORD_0{node.id.split("-")[1]}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Dynamic Spotlight Vector Crosshairs tracking pointer */}
            {isHovered && (
              <>
                <div 
                  className="absolute left-0 right-0 h-[1px] bg-luxury-accent/5 pointer-events-none"
                  style={{ top: `${coords.y}px` }}
                />
                <div 
                  className="absolute top-0 bottom-0 w-[1px] bg-luxury-accent/5 pointer-events-none"
                  style={{ left: `${coords.x}px` }}
                />
                <div className="absolute p-2 bg-luxury-black/80 border border-luxury-accent/10 rounded font-mono text-[6.5px] text-luxury-dim pointer-events-none select-none flex flex-col space-y-1"
                  style={{ left: `${coords.x + 12}px`, top: `${coords.y + 12}px` }}
                >
                  <span>X // {coords.x.toFixed(0)}PX</span>
                  <span>Y // {coords.y.toFixed(0)}PX</span>
                </div>
              </>
            )}

            {/* Instructions box in bottom of scroller */}
            <div className="absolute bottom-4 left-4 font-mono text-[7px] tracking-widest text-luxury-dim/40 flex items-center space-x-2">
              <Eye className="h-3 w-3" />
              <span>ACTIVE DETECTOR MODULE</span>
            </div>
          </div>
        </div>

        {/* Informational Specs Panel (4 Columns) - displaying dynamic details based on what is hovered or selected */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="bg-luxury-charcoal/15 border border-luxury-accent/10 p-6 rounded flex-1 flex flex-col justify-between relative overflow-hidden">
            
            {/* Ambient Background Flare */}
            <div className="absolute top-[-20%] left-[-20%] w-48 h-48 rounded-full bg-luxury-accent/1 blur-[40px] pointer-events-none" />

            {/* Dynamic Content Switching based on user hover/selection */}
            <AnimatePresence mode="wait">
              {(hoveredNode || selectedNode) ? (() => {
                const node = hoveredNode || selectedNode!;
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6 md:space-y-8 h-full flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Category Label */}
                      <div className="flex justify-between items-center pb-2 border-b border-luxury-accent/5">
                        <span className="font-mono text-[8px] tracking-[0.25em] text-luxury-dim uppercase">
                          {node.category}
                        </span>
                        <span className="font-mono text-[7px] text-luxury-accent/40">
                          {node.blueprintCode}
                        </span>
                      </div>

                      {/* Heading */}
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-luxury-dim">SYSTEM NODE 0{node.id.split("-")[1]}</span>
                        <h3 className="font-serif text-xl tracking-wide text-luxury-accent font-medium leading-tight">
                          {node.label}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="font-serif italic text-xs leading-relaxed text-luxury-accent/80 font-light">
                        {node.description}
                      </p>
                    </div>

                    {/* Metrics / Ratios (Blueprint data) */}
                    <div className="pt-6 border-t border-luxury-accent/5 space-y-4">
                      <div>
                        <span className="font-mono text-[7.5px] text-luxury-dim tracking-widest block uppercase mb-1">MEASUREMENT VALUES</span>
                        <span className="font-mono text-[10px] text-luxury-accent bg-luxury-accent/5 px-2 py-1 rounded block border border-luxury-accent/10">
                          {node.metric}
                        </span>
                      </div>

                      <div className="flex justify-between items-center font-mono text-[7.5px] text-luxury-dim/40 pt-2">
                        <span>STAMP_CODE // SEC.B</span>
                        <span>CHECK: OK</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })() : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-center items-center text-center p-6 space-y-4"
                >
                  <Target className="h-6 w-6 stroke-[1] text-luxury-dim animate-pulse-slow" />
                  <div className="space-y-1">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-luxury-dim uppercase block">
                      WAITING_FOR_CURSOR
                    </span>
                    <p className="font-serif italic text-xs text-luxury-dim leading-relaxed max-w-[200px]">
                      Hover over any coordinate ring in the drawing grid to analyze clothing blueprints.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner styling guides */}
            <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-luxury-accent/20 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-luxury-accent/20 pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
