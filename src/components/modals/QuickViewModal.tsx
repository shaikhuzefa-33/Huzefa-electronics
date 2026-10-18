import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShieldCheck, Truck, RefreshCw, ShoppingCart, Heart, Eye, Check, Cpu, Battery, Maximize2 } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { Hero3DCanvas } from '../3d/Hero3DCanvas';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#8B9095' });
  const [quantity, setQuantity] = useState(1);
  const [viewMode, setViewMode] = useState<'3d' | 'gallery'>('3d');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#061d21]/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-gradient-to-b from-[#0E4D57]/95 via-[#0b3840]/95 to-[#072429]/95 border border-[#8B9095]/40 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#8B9095]/20 bg-[#0a3239]/50">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-[#8B9095]/20 text-slate-200 border border-[#8B9095]/30">
                {product.brand}
              </span>
              {product.badge && (
                <span className="px-2.5 py-1 text-xs font-medium tracking-wide rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {product.badge}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8">
            {/* Left 3D Viewport / Gallery */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center bg-[#072227]/70 rounded-xl p-4 border border-[#8B9095]/20 relative overflow-hidden">
              {/* Toggle 3D vs Photo Gallery */}
              <div className="absolute top-4 left-4 z-20 flex items-center bg-[#0E4D57]/80 backdrop-blur-md rounded-lg p-1 border border-[#8B9095]/30">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === '3d'
                      ? 'bg-[#8B9095] text-slate-900 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                  Interactive 3D
                </button>
                <button
                  onClick={() => setViewMode('gallery')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
                    viewMode === 'gallery'
                      ? 'bg-[#8B9095] text-slate-900 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Studio Photos
                </button>
              </div>

              <div className="absolute top-4 right-4 z-20 text-[11px] text-[#8B9095] bg-[#09292f]/70 px-2 py-1 rounded border border-[#8B9095]/20 hidden sm:block">
                Drag to rotate 360°
              </div>

              {/* Display Area */}
              <div className="w-full flex items-center justify-center min-h-[340px] sm:min-h-[400px]">
                {viewMode === '3d' ? (
                  <Hero3DCanvas
                    modelType={product.model3dType}
                    accentColor={selectedColor.hex}
                    isAutoRotating={true}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={product.galleryImages[selectedGalleryIdx] || product.image}
                      alt={product.name}
                      className="max-h-[320px] object-contain rounded-lg shadow-xl"
                    />
                    <div className="flex gap-2 mt-4">
                      {product.galleryImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedGalleryIdx(i)}
                          className={`w-12 h-12 rounded-lg border overflow-hidden transition-all ${
                            selectedGalleryIdx === i
                              ? 'border-white ring-2 ring-[#00E5FF]/40'
                              : 'border-[#8B9095]/40 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3D Hint bar */}
              <div className="w-full flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-[#8B9095]/20">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Real-time Three.js Shader Lighting
                </span>
                <span>Active Tone Mapping: ACES Filmic</span>
              </div>
            </div>

            {/* Right Information & Purchase Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  {product.name}
                </h2>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Rating & Stock */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-amber-400/40'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-semibold text-white ml-1">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    ({product.reviewsCount} verified reviews)
                  </span>
                  <span className="text-xs text-emerald-400 font-medium ml-auto">
                    {product.inStock ? `In Stock (${product.stockCount} units)` : 'Backorder'}
                  </span>
                </div>

                {/* Pricing Display */}
                <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-[#8B9095]/20">
                  <span className="text-3xl font-extrabold text-white">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div className="mt-5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                    Finishes & Materials: <span className="text-white font-bold">{selectedColor.name}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                          selectedColor.name === color.name
                            ? 'border-white bg-white/15 text-white ring-2 ring-white/30'
                            : 'border-[#8B9095]/30 text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Technical Highlights */}
                <div className="mt-5 bg-[#08292f]/60 rounded-lg p-3 border border-[#8B9095]/20">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Showroom Tech Specs
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {product.specs.display && (
                      <div className="text-slate-300">
                        <span className="text-slate-400 block text-[10px]">Panel</span>
                        {product.specs.display.split(' ').slice(0, 3).join(' ')}
                      </div>
                    )}
                    {product.specs.processor && (
                      <div className="text-slate-300">
                        <span className="text-slate-400 block text-[10px]">Processor</span>
                        {product.specs.processor.split(' ').slice(0, 3).join(' ')}
                      </div>
                    )}
                    {product.specs.battery && (
                      <div className="text-slate-300">
                        <span className="text-slate-400 block text-[10px]">Endurance</span>
                        {product.specs.battery.split(' ').slice(0, 3).join(' ')}
                      </div>
                    )}
                    {product.specs.warranty && (
                      <div className="text-slate-300">
                        <span className="text-slate-400 block text-[10px]">Protection</span>
                        {product.specs.warranty}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="mt-6 pt-4 border-t border-[#8B9095]/20 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#8B9095]/30 rounded-lg bg-[#072429]/80 overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-semibold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="px-3 py-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg ${
                      addedAnimation
                        ? 'bg-emerald-500 text-slate-950 scale-98'
                        : 'bg-[#8B9095] hover:bg-slate-200 text-slate-950 hover:shadow-cyan-500/20'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" /> Add to Cart • ${(product.price * quantity).toLocaleString()}
                      </>
                    )}
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 rounded-lg border transition-colors ${
                      isWishlisted
                        ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                        : 'border-[#8B9095]/30 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Showroom Perks */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-300" /> Free White-Glove Delivery
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-300" /> 3-Year Platinum Care
                  </span>
                  <span className="flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-slate-300" /> 30-Day Showroom Trial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
