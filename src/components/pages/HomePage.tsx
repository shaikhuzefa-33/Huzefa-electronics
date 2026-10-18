import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  Eye,
  Star,
  Sparkles,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Clock,
  Play,
  Pause,
} from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { HeroProductImageAnimator } from '../common/HeroProductImageAnimator';
import { REVIEWS, BRAND_PARTNERS } from '../../data/reviews';
import { CATEGORIES } from '../../data/categories';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color?: ProductColor) => void;
  onNavigate: (page: any) => void;
  onSelectCategory: (categoryKey: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onNavigate,
  onSelectCategory,
}) => {
  // 6 Hero Products specifically requested by user prompt:
  // Gaming Laptop, Smartphone, Smart TV, Wireless Earbuds, Smart Watch, DSLR Camera
  const heroProducts = [
    products.find((p) => p.model3dType === 'laptop') || products[0],
    products.find((p) => p.model3dType === 'phone') || products[1],
    products.find((p) => p.model3dType === 'tv') || products[2],
    products.find((p) => p.model3dType === 'earbuds') || products[3],
    products.find((p) => p.model3dType === 'watch') || products[4],
    products.find((p) => p.model3dType === 'camera') || products[5],
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  // Auto-slide every 4 seconds as explicitly requested
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroProducts.length);
      setSelectedColorIdx(0);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, heroProducts.length]);

  const currentProduct = heroProducts[activeSlide];
  const activeColor = currentProduct.colors[selectedColorIdx] || currentProduct.colors[0];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
    setSelectedColorIdx(0);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % heroProducts.length);
    setSelectedColorIdx(0);
  };

  // Flash Sale Countdown Ticker for Today's Deals section
  const [timeLeft, setTimeLeft] = useState({ hours: 13, minutes: 42, seconds: 19 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* 1. Full-Screen 3D Animated Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center overflow-hidden pt-4 pb-12">
        {/* Background Ambient Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E4D57] via-[#0b3b43] to-[#072429] -z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#00E5FF]/10 via-[#8B9095]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 z-10 space-y-6 pt-4 sm:pt-0">
              {/* Pill Badge */}
              <motion.div
                key={`badge-${currentProduct.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B9095]/20 border border-[#8B9095]/30 text-xs font-semibold text-slate-200 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span className="uppercase tracking-widest text-[11px] text-[#8B9095]">
                  {currentProduct.brand} Precision Series
                </span>
                <span className="w-1 h-1 rounded-full bg-[#8B9095]" />
                <span className="text-white font-mono">{currentProduct.badge || 'Showroom Reference'}</span>
              </motion.div>

              {/* Title & Subtitle with Text Fade-Up Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentProduct.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.08]">
                    {currentProduct.name}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-xl">
                    {currentProduct.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg hidden sm:block">
                    {currentProduct.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Color Finish Switcher */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B9095]">
                  Colorway:
                </span>
                <div className="flex items-center gap-2">
                  {currentProduct.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`relative flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                        selectedColorIdx === idx
                          ? 'border-white bg-white/15 text-white ring-1 ring-white/40'
                          : 'border-[#8B9095]/30 text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/30"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price & Rating */}
              <div className="flex items-baseline gap-4 pt-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">
                  ${currentProduct.price.toLocaleString()}
                </span>
                {currentProduct.originalPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    ${currentProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <div className="flex items-center gap-1 text-amber-400 text-xs sm:text-sm ml-auto sm:ml-4">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-white">{currentProduct.rating}</span>
                  <span className="text-slate-400">({currentProduct.reviewsCount})</span>
                </div>
              </div>

              {/* Action Buttons: "Buy Now" and "Explore" */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onAddToCart(currentProduct, activeColor)}
                  className="px-8 py-3.5 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-sm transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 flex items-center gap-2 group transform active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Buy Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectProduct(currentProduct)}
                  className="px-6 py-3.5 bg-[#0a3a42]/80 hover:bg-[#0c444e] border border-[#8B9095]/40 hover:border-slate-300 text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#8B9095]" />
                  Explore 3D Specs
                </button>
              </div>

              {/* Slider Controls, Auto-slide indicator & Manual Arrows */}
              <div className="flex items-center justify-between pt-6 border-t border-[#8B9095]/20 max-w-lg">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-2 rounded-lg bg-[#072429] hover:bg-[#0a3a42] border border-[#8B9095]/30 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1.5"
                    title={isAutoPlaying ? 'Pause 4s Auto-Slide' : 'Resume Auto-Slide'}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-cyan-300" /> 4s Auto
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" /> Paused
                      </>
                    )}
                  </button>

                  {/* Thumbnail / Dot indicators for 6 products */}
                  <div className="flex items-center gap-1.5">
                    {heroProducts.map((p, i) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActiveSlide(i);
                          setSelectedColorIdx(0);
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeSlide === i
                            ? 'w-7 bg-white shadow-sm'
                            : 'w-2 bg-[#8B9095]/40 hover:bg-[#8B9095]'
                        }`}
                        title={p.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Manual Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded-full bg-[#072429] hover:bg-[#0a3a42] border border-[#8B9095]/30 text-slate-300 hover:text-white transition-all active:scale-95"
                    aria-label="Previous 3D product"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded-full bg-[#072429] hover:bg-[#0a3a42] border border-[#8B9095]/30 text-slate-300 hover:text-white transition-all active:scale-95"
                    aria-label="Next 3D product"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Real Product Images Animation Showcase */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
              <HeroProductImageAnimator
                product={currentProduct}
                activeColor={activeColor}
                onInspectProduct={onSelectProduct}
              />

              {/* 6 Real Product Selector Thumbnails Underneath */}
              <div className="grid grid-cols-6 gap-2 w-full mt-4">
                {heroProducts.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActiveSlide(idx);
                      setSelectedColorIdx(0);
                    }}
                    className={`group relative p-1.5 rounded-xl border text-[11px] font-medium transition-all flex flex-col items-center gap-1 ${
                      activeSlide === idx
                        ? 'bg-[#8B9095] text-slate-950 border-white shadow-lg font-bold ring-1 ring-white/50 scale-[1.03]'
                        : 'bg-[#0a353c]/80 text-slate-300 border-[#8B9095]/30 hover:border-slate-300 hover:bg-[#0c4049]'
                    }`}
                  >
                    <div className="w-full h-9 rounded-lg bg-[#072429] p-0.5 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="truncate w-full text-center text-[10px] leading-tight">
                      {p.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Categories Section */}
      <section className="py-16 bg-[#0a373f] border-y border-[#8B9095]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B9095]">
                Curated Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
                Top Showroom Categories
              </h2>
            </div>
            <button
              onClick={() => onNavigate('categories')}
              className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              View All 6 Categories <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.key);
                  onNavigate('shop');
                }}
                className="group relative rounded-xl overflow-hidden cursor-pointer border border-[#8B9095]/25 bg-[#0e434c]/80 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="h-32 w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072429] via-[#072429]/50 to-transparent" />
                </div>
                <div className="p-3 relative">
                  <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {cat.itemCount} items
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Products Showcase */}
      <section className="py-20 bg-[#0E4D57]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B9095]">
                Masterpiece Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
                Featured Showroom Highlights
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="mt-3 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white"
            >
              Explore Full Catalog <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="group relative rounded-2xl bg-gradient-to-b from-[#114b54] to-[#0a353c] border border-[#8B9095]/25 p-4 flex flex-col justify-between hover:border-slate-300 transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                {/* Image & Badges */}
                <div className="relative w-full h-48 rounded-xl bg-[#072429] p-4 flex items-center justify-center overflow-hidden border border-[#8B9095]/15 mb-4">
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-36 object-contain group-hover:scale-108 transition-transform duration-500"
                  />
                  {/* Quick View Button on Hover */}
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-[#0E4D57]/90 hover:bg-[#8B9095] hover:text-slate-950 text-white text-xs font-medium backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 border border-[#8B9095]/30"
                  >
                    <Eye className="w-3.5 h-3.5" /> 3D View
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between text-[11px] text-[#8B9095] font-semibold uppercase">
                    <span>{product.brand}</span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-sm group-hover:text-cyan-200 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-4 mt-4 border-t border-[#8B9095]/20 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-white">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through block">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="p-2.5 rounded-xl bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold transition-all shadow hover:shadow-cyan-400/20"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Today's Deals Banner */}
      <section className="py-16 bg-[#0a3138] border-y border-[#8B9095]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0c3e46] via-[#0E4D57] to-[#08282e] border border-amber-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
                  <Zap className="w-3.5 h-3.5 animate-bounce" /> Today's Showroom Flash Sale
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                  40% OFF Titan Blade 18 Pro + Free Studio Headphones
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                  Only 4 allocations remain at this bespoke price. Includes custom vapor chamber cooling, 4TB Gen 5 NVMe, and 3-Year Platinum White-Glove Care.
                </p>

                {/* Countdown Timer */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Deal Closes In:
                  </span>
                  <div className="flex gap-2 font-mono text-center">
                    <div className="bg-[#072429] px-3 py-1.5 rounded-lg border border-[#8B9095]/30">
                      <span className="text-base sm:text-lg font-bold text-white">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] block text-slate-400">HRS</span>
                    </div>
                    <div className="bg-[#072429] px-3 py-1.5 rounded-lg border border-[#8B9095]/30">
                      <span className="text-base sm:text-lg font-bold text-white">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] block text-slate-400">MIN</span>
                    </div>
                    <div className="bg-[#072429] px-3 py-1.5 rounded-lg border border-[#8B9095]/30">
                      <span className="text-base sm:text-lg font-bold text-cyan-400">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] block text-slate-400">SEC</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => onNavigate('deals')}
                    className="px-6 py-3 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all"
                  >
                    View Flash Deals Hub
                  </button>
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80"
                  alt="Deal Preview"
                  className="max-h-64 object-contain rounded-xl shadow-2xl border border-[#8B9095]/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews Section */}
      <section className="py-20 bg-[#0E4D57]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B9095]">
              Verified Client Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              Audiophiles, Creators, & Engineers Speak
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl bg-[#09333a]/80 border border-[#8B9095]/25 p-6 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#8B9095]/20">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#8B9095]/40"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white">{rev.author}</h5>
                    <span className="text-[11px] text-slate-400 block">{rev.role}</span>
                  </div>
                  {rev.verified && (
                    <span className="ml-auto text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Brand Partners Showroom Marquee */}
      <section className="py-12 bg-[#09292f] border-t border-[#8B9095]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#8B9095]">
              Authorized Master Showroom Partnerships
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {BRAND_PARTNERS.map((brand) => (
              <div
                key={brand.name}
                className="p-3 rounded-xl bg-[#072429]/60 border border-[#8B9095]/20 flex flex-col items-center justify-center text-center group hover:border-slate-300 transition-colors"
              >
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {brand.name}
                </span>
                <span className="text-[9px] text-slate-400 mt-0.5 truncate max-w-full">
                  {brand.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
