import React, { useState, useMemo } from 'react';
import {
  Filter,
  Grid,
  List,
  SlidersHorizontal,
  Star,
  Eye,
  Heart,
  ShoppingBag,
  Layers,
  Sparkles,
  RotateCcw,
  Check,
} from 'lucide-react';
import { Product, ProductColor } from '../../types';

interface ShopPageProps {
  products: Product[];
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, color?: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onToggleCompare: (product: Product) => void;
  compareIds: string[];
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onToggleCompare,
  compareIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    { key: 'all', label: 'All Catalog' },
    { key: 'gaming', label: 'Gaming Laptops' },
    { key: 'smartphones', label: 'Smartphones' },
    { key: 'tvs', label: '8K OLED TVs' },
    { key: 'audio', label: 'Lossless Audio' },
    { key: 'watches', label: 'Smart Watches' },
    { key: 'cameras', label: 'Cinema Cameras' },
    { key: 'laptops', label: 'Workstations' },
  ];

  const brands = ['all', 'Huzefa Titan', 'Apple', 'Samsung', 'Sony', 'Leica'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        if (p.price > maxPrice) return false;
        if (inStockOnly && !p.inStock) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedBrand, maxPrice, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMaxPrice(5000);
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="w-full bg-[#0E4D57] min-h-screen py-10 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span>Showroom</span>
            <span>/</span>
            <span className="text-white font-medium">Catalog Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Reference Electronics Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Explore meticulously engineered flagship devices with interactive 3D inspection, laboratory acoustics, and titanium unibody architecture.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#8B9095]/20">
          {/* Category Pills (horizontal scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none max-w-full lg:max-w-3xl">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-[#8B9095] text-slate-950 shadow-md font-bold'
                    : 'bg-[#0a353c] text-slate-300 hover:text-white border border-[#8B9095]/25 hover:border-[#8B9095]/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Controls: Sort & Grid View */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#072429] border border-[#8B9095]/30 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-slate-300"
              >
                <option value="featured">Featured Showroom</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-[#072429] rounded-xl border border-[#8B9095]/30 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#8B9095] text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#8B9095] text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#072429] border border-[#8B9095]/30 rounded-xl text-xs text-slate-200"
            >
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
          </div>
        </div>

        {/* Main Grid + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-[#0a353c]/80 rounded-2xl border border-[#8B9095]/25 p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#8B9095]/20">
                <span className="text-xs uppercase font-bold text-slate-300 tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B9095]" /> Refine Filter
                </span>
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2 uppercase tracking-wider">
                  Brand Lineup
                </label>
                <div className="space-y-1.5">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBrand(b)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedBrand === b
                          ? 'bg-[#8B9095]/30 text-white font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="capitalize">{b === 'all' ? 'All Brands' : b}</span>
                      {selectedBrand === b && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2 font-semibold">
                  <span>Max Budget</span>
                  <span className="text-white">${maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={5000}
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#8B9095] bg-[#072429] rounded-lg h-1.5 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>$200</span>
                  <span>$5,000+</span>
                </div>
              </div>

              {/* In-Stock Toggle */}
              <div className="pt-2 border-t border-[#8B9095]/20">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded border-[#8B9095]/40 bg-[#072429] text-[#8B9095] focus:ring-0"
                  />
                  <span>Ready for Immediate Dispatch</span>
                </label>
              </div>

              {/* Showroom Badge Info */}
              <div className="bg-[#072429] p-3 rounded-xl border border-[#8B9095]/20 text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-200 block">Huzefa Assurance</span>
                <p>Every piece includes 3-Year Platinum White-Glove Care and 30-day showroom inspection.</p>
              </div>
            </div>
          </div>

          {/* Product Items Area */}
          <div className="lg:col-span-9">
            <div className="text-xs text-slate-400 mb-4 flex items-center justify-between">
              <span>Showing {filteredProducts.length} showroom references</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-[#0a353c]/50 border border-[#8B9095]/25 rounded-2xl p-12 text-center text-slate-400 space-y-3">
                <p className="text-base font-semibold text-white">No products match the selected criteria.</p>
                <p className="text-xs">Adjust your price budget, select another category, or reset filters.</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-[#8B9095] text-slate-950 rounded-lg text-xs font-bold mt-2"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isWish = wishlistIds.includes(product.id);
                  const isComp = compareIds.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group relative rounded-2xl bg-gradient-to-b from-[#114b54] to-[#0a353c] border border-[#8B9095]/25 p-4 flex flex-col justify-between hover:border-slate-200 transition-all duration-300 hover:-translate-y-1 shadow-xl"
                    >
                      {/* Top Badges & Wishlist */}
                      <div className="flex justify-between items-start mb-2 relative z-10">
                        {product.badge ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {product.badge}
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {product.brand}
                          </span>
                        )}

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onToggleCompare(product)}
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              isComp
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                                : 'border-[#8B9095]/30 text-slate-400 hover:text-white'
                            }`}
                            title={isComp ? 'Remove from Compare' : 'Add to Compare'}
                          >
                            <Layers className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleWishlist(product)}
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              isWish
                                ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                                : 'border-[#8B9095]/30 text-slate-400 hover:text-white'
                            }`}
                            title={isWish ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-rose-400' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Image Frame */}
                      <div className="relative w-full h-48 rounded-xl bg-[#072429] p-4 flex items-center justify-center overflow-hidden border border-[#8B9095]/15 my-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-36 object-contain group-hover:scale-108 transition-transform duration-500"
                        />
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="absolute inset-0 bg-[#061d21]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-semibold text-xs"
                        >
                          <Eye className="w-4 h-4 text-cyan-300" /> Interactive 3D Inspection
                        </button>
                      </div>

                      {/* Product Content */}
                      <div className="space-y-1.5 flex-1 mt-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">{product.category}</span>
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="font-bold text-white">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-white text-sm group-hover:text-cyan-200 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {product.subtitle}
                        </p>
                      </div>

                      {/* Price & Action */}
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
                          className="flex items-center gap-1.5 px-3 py-2 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add to Bag
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-4">
                {filteredProducts.map((product) => {
                  const isWish = wishlistIds.includes(product.id);
                  const isComp = compareIds.includes(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group rounded-2xl bg-gradient-to-r from-[#114b54] to-[#0a353c] border border-[#8B9095]/25 p-4 flex flex-col sm:flex-row items-center gap-6 hover:border-slate-200 transition-all shadow-xl"
                    >
                      <div className="w-full sm:w-44 h-40 rounded-xl bg-[#072429] p-3 flex items-center justify-center shrink-0 border border-[#8B9095]/20 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-32 object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-[#8B9095]">
                            {product.brand} • {product.category}
                          </span>
                          <div className="flex items-center text-amber-400 text-xs ml-auto sm:ml-0">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="ml-1 font-semibold text-white">{product.rating}</span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-white">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                          {product.specs.display && <span>Display: {product.specs.display.split(' ').slice(0, 3).join(' ')}</span>}
                          {product.specs.battery && <span>Battery: {product.specs.battery.split(' ').slice(0, 2).join(' ')}</span>}
                          <span className="text-emerald-400 font-semibold">{product.inStock ? 'Ready to Ship' : 'Backorder'}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-3 w-full sm:w-40 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#8B9095]/20 pl-0 sm:pl-6">
                        <div className="text-left sm:text-right">
                          <span className="text-xl font-extrabold text-white">
                            ${product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-slate-400 line-through block">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="p-2 rounded-lg bg-[#072429] border border-[#8B9095]/30 text-slate-300 hover:text-white"
                            title="Inspect 3D"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onAddToCart(product)}
                            className="px-4 py-2 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-lg text-xs"
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
