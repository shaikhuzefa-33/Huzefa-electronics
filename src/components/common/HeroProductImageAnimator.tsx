import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Maximize2,
  CheckCircle2,
  Camera,
  Box,
  Layers,
  Zap,
} from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';

interface HeroProductImageAnimatorProps {
  product: Product;
  activeColor: ProductColor;
  onInspectProduct: (product: Product) => void;
}

export const HeroProductImageAnimator: React.FC<HeroProductImageAnimatorProps> = ({
  product,
  activeColor,
  onInspectProduct,
}) => {
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Available real images for this product (primary + gallery)
  const realImages = [
    product.image,
    ...(product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages.filter((img) => img !== product.image)
      : []),
  ];

  const currentRealImage = realImages[activeAngleIdx] || product.image;

  // Handle mouse move for realistic 3D perspective tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({
      rotateX: -y * 14,
      rotateY: x * 16,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setActiveHotspot(null);
  };

  // Category-specific real engineering hotspots
  const hotspotsMap: Record<string, { x: number; y: number; title: string; desc: string }[]> = {
    laptop: [
      { x: 32, y: 35, title: '18" 4K Mini-LED 240Hz', desc: '100% DCI-P3 color calibrated at 1200 nits' },
      { x: 68, y: 65, title: 'RTX 4090 16GB VRAM', desc: 'Vapor chamber liquid metal cooling up to 175W TGP' },
      { x: 22, y: 72, title: 'Thunderbolt 4 & Wi-Fi 7', desc: 'High-throughput 40Gbps bidirectional transfer' },
    ],
    phone: [
      { x: 65, y: 28, title: '200MP Periscope ISOCELL', desc: '5x Optical Zoom with Dual OIS Stabilization' },
      { x: 42, y: 48, title: 'Dynamic AMOLED 2X 120Hz', desc: 'LTPO 1-120Hz with Corning Gorilla Armor' },
      { x: 50, y: 82, title: 'Grade-5 Titanium Frame', desc: 'Aerospace structural rigidity with satin finish' },
    ],
    tv: [
      { x: 50, y: 30, title: '8K OLED evo MLA+ Panel', desc: 'Micro Lens Array boosting brightness by 70%' },
      { x: 25, y: 70, title: 'Acoustic Surface Audio+', desc: 'Sound radiates directly through the vibrating panel' },
      { x: 75, y: 70, title: 'Cognitive Processor XR', desc: 'Neural AI upscaling of real-time 8K textures' },
    ],
    earbuds: [
      { x: 38, y: 40, title: 'Dual Balanced Armatures', desc: 'LDAC Lossless 24-bit/96kHz high-resolution audio' },
      { x: 62, y: 42, title: '48dB Hybrid ANC', desc: 'Bone conduction sensors eliminating 99.4% noise' },
      { x: 50, y: 75, title: 'Qi Wireless Capsule', desc: '36-Hour playback with aluminum hinge enclosure' },
    ],
    watch: [
      { x: 50, y: 38, title: 'Sapphire Crystal Dial', desc: 'Always-on LTPO OLED reaching 3000 nits' },
      { x: 30, y: 55, title: 'Titanium 49mm Unibody', desc: '100m water resistant with depth gauge sensors' },
      { x: 70, y: 60, title: 'ECG & Vital Array', desc: 'Continuous SpO2, skin temp, and heart monitoring' },
    ],
    camera: [
      { x: 42, y: 45, title: 'Full-Frame 8K Cinema Sensor', desc: '16 stops dynamic range with dual native ISO' },
      { x: 68, y: 48, title: 'Fluorite Multi-Coated Lens', desc: '0.001% chromatic aberration optical glass' },
      { x: 50, y: 78, title: 'Magnesium Weather Seal', desc: 'Active cooling exhaust for unlimited 8K capture' },
    ],
  };

  const currentHotspots = hotspotsMap[product.model3dType] || [
    { x: 40, y: 40, title: 'Calibrated Hardware', desc: 'Precision engineered showroom specifications' },
    { x: 60, y: 60, title: 'Reference Craftsmanship', desc: 'Finished in unibody titanium & aluminum' },
  ];

  return (
    <div className="w-full relative flex flex-col items-center">
      {/* Studio Viewport Frame */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full relative rounded-3xl bg-gradient-to-b from-[#09333a]/80 via-[#07262c]/90 to-[#041a1e] border border-[#8B9095]/40 backdrop-blur-xl shadow-2xl overflow-hidden p-4 sm:p-8 flex flex-col items-center justify-center min-h-[440px] sm:min-h-[500px]"
        style={{ perspective: '1200px' }}
      >
        {/* Top Control Bar inside Viewport */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
          {/* Real Photo Status Tag */}
          <div className="flex items-center gap-2 bg-[#061d21]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#8B9095]/30 text-xs font-semibold text-slate-200 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">Real Product Studio Photography</span>
            <span className="sm:hidden">Real 4K Photo</span>
          </div>

          {/* Toggle between Real Photo & 3D Simulation */}
          <div className="flex items-center bg-[#072429]/90 backdrop-blur-md p-1 rounded-full border border-[#8B9095]/30 shadow-lg">
            <button
              onClick={() => setViewMode('photo')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'photo'
                  ? 'bg-[#8B9095] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="View Real Studio Photography"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Real Photo</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === '3d'
                  ? 'bg-[#8B9095] text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="View Interactive 3D Model"
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Model</span>
            </button>
          </div>
        </div>

        {/* Ambient Backlight Glow Matching Active Colorway */}
        <div
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl pointer-events-none transition-colors duration-700 opacity-30 -z-10"
          style={{
            backgroundColor: activeColor.hex,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Dynamic Circular Backdrop Element */}
        <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-dashed border-[#8B9095]/20 pointer-events-none -z-10 animate-[spin_60s_linear_infinite]" />

        {/* VIEW 1: REAL PRODUCT PHOTOGRAPHY ANIMATION */}
        {viewMode === 'photo' ? (
          <div className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center">
            {/* Interactive 3D Tilt Container */}
            <motion.div
              animate={{
                rotateX: tilt.rotateX,
                rotateY: tilt.rotateY,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative w-full h-full flex flex-col items-center justify-center transform-gpu"
            >
              {/* Weightless Hover Floating Animation Wrapper */}
              <motion.div
                animate={{
                  y: [0, -14, 0],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative flex items-center justify-center max-w-[88%] max-h-[82%]"
              >
                {/* Real Product Image with AnimatePresence on Slide/Angle Switch */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${product.id}-${activeAngleIdx}`}
                    src={currentRealImage}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 0.88, y: 24, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.9, y: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="max-h-[280px] sm:max-h-[340px] max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] select-none pointer-events-none"
                    loading="eager"
                  />
                </AnimatePresence>

                {/* Engineering Spec Hotspot Beacons */}
                {currentHotspots.map((spot, i) => (
                  <div
                    key={i}
                    style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === i ? null : i)}
                      onMouseEnter={() => setActiveHotspot(i)}
                      className="relative w-6 h-6 rounded-full bg-cyan-400/90 text-slate-950 font-bold flex items-center justify-center shadow-lg hover:scale-125 transition-transform"
                      aria-label={spot.title}
                    >
                      <span className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-60" />
                      <span className="text-[10px] relative z-10">{i + 1}</span>
                    </button>

                    {/* Hotspot Tooltip Card */}
                    <AnimatePresence>
                      {activeHotspot === i && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.92 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.92 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-[#061d21]/95 backdrop-blur-md border border-[#8B9095]/50 rounded-xl p-3 shadow-2xl z-30 pointer-events-none text-left"
                        >
                          <div className="flex items-center gap-1.5 text-cyan-300 text-[11px] font-bold">
                            <Zap className="w-3 h-3" />
                            <span>{spot.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                            {spot.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>

              {/* Dynamic Perspective Floor Shadow that breathes with float */}
              <motion.div
                animate={{
                  scale: [1, 0.82, 1],
                  opacity: [0.55, 0.35, 0.55],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-52 sm:w-72 h-6 rounded-[100%] bg-black/60 blur-md mt-4 pointer-events-none"
              />
            </motion.div>
          </div>
        ) : (
          /* VIEW 2: 3D THREE.JS CANVAS SIMULATION */
          <div className="w-full h-[360px] sm:h-[420px] flex items-center justify-center relative">
            <Hero3DCanvas
              modelType={product.model3dType}
              accentColor={activeColor.hex}
              isAutoRotating={true}
            />
            <div className="absolute bottom-2 right-2 bg-[#061e22]/80 px-2.5 py-1 rounded text-[11px] text-slate-400 border border-[#8B9095]/20">
              Drag to rotate 3D mesh
            </div>
          </div>
        )}

        {/* Bottom Bar: Real Photo Angles Selector & 3D Inspect Trigger */}
        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between">
          {/* Angle Switcher Pills */}
          {realImages.length > 1 && viewMode === 'photo' ? (
            <div className="flex items-center gap-1.5 bg-[#061d21]/90 backdrop-blur-md p-1 rounded-xl border border-[#8B9095]/30">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-2 hidden sm:inline">
                Camera Angle:
              </span>
              {realImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAngleIdx(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                    activeAngleIdx === idx
                      ? 'bg-[#8B9095] text-slate-950 font-bold shadow'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Angle {idx + 1}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-[11px] text-slate-400 bg-[#061d21]/70 px-3 py-1 rounded-lg border border-[#8B9095]/20">
              {product.brand} Studio Certified
            </div>
          )}

          {/* Quick Inspect Trigger */}
          <button
            onClick={() => onInspectProduct(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#072429]/90 hover:bg-[#0c3e47] border border-[#8B9095]/40 hover:border-slate-200 text-xs font-semibold text-white transition-all shadow-md"
            title="Expand 3D Quick View Specs"
          >
            <Maximize2 className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden sm:inline">Full Inspection</span>
          </button>
        </div>
      </div>
    </div>
  );
};
