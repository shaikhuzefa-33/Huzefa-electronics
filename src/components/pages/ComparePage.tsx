import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Trash2,
  Plus,
  ShoppingBag,
  Eye,
  Star,
  CheckCircle2,
  Zap,
  Cpu,
  Tv,
  Smartphone,
  Headphones,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Product } from '../../types';

interface ComparePageProps {
  products: Product[];
  selectedProducts: Product[];
  onAddProduct: (product: Product) => void;
  onRemoveProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({
  products,
  selectedProducts,
  onAddProduct,
  onRemoveProduct,
  onAddToCart,
  onSelectProduct,
}) => {
  // If user hasn't picked products yet, pre-populate with 3 interesting flagships
  const activeProducts =
    selectedProducts.length > 0
      ? selectedProducts
      : [
          products.find((p) => p.id === 'huzefa-titan-blade-rtx4090') || products[0],
          products.find((p) => p.id === 'ultravision-pro-5g') || products[1],
          products.find((p) => p.id === 'cinematic-master-oled-77') || products[2],
        ].filter(Boolean);

  const [addSelectorOpen, setAddSelectorOpen] = useState(false);

  // Quick preset packs
  const presets = [
    {
      title: 'Flagship Showcase',
      description: 'Titan Blade 18 Pro vs UltraVision 5G vs 8K OLED TV',
      ids: ['huzefa-titan-blade-rtx4090', 'ultravision-pro-5g', 'cinematic-master-oled-77'],
    },
    {
      title: 'Acoustics & Wearables',
      description: 'Acoustic Pro Spatial vs Chronos Titanium Watch',
      ids: ['acoustic-pro-spatial-anc', 'chronos-titanium-elite', 'bose-quietcomfort-ultra'],
    },
    {
      title: 'Creator & Cinema Workstations',
      description: 'Alpha Cine 8K vs Titan Blade Laptop',
      ids: ['alpha-lumix-8k-cine', 'huzefa-titan-blade-rtx4090'],
    },
  ];

  const handleApplyPreset = (ids: string[]) => {
    // Clear and add preset
    const toAdd = products.filter((p) => ids.includes(p.id));
    toAdd.forEach((p) => onAddProduct(p));
  };

  const specRows = [
    { label: 'Category', render: (p: Product) => <span className="capitalize">{p.category}</span> },
    { label: 'Brand & Provenance', render: (p: Product) => <span className="font-semibold text-white">{p.brand}</span> },
    { label: 'Display & Panel', render: (p: Product) => p.specs.display || '—' },
    { label: 'Processor / Silicon', render: (p: Product) => p.specs.processor || '—' },
    { label: 'Memory & Storage', render: (p: Product) => p.specs.storage || '—' },
    { label: 'Audio & Acoustics', render: (p: Product) => p.specs.audio || '—' },
    { label: 'Battery / Power', render: (p: Product) => p.specs.battery || '—' },
    { label: 'Sensors / Optics', render: (p: Product) => p.specs.sensor || p.specs.camera || '—' },
    { label: 'I/O & Connectivity', render: (p: Product) => p.specs.connectivity || '—' },
    { label: 'Chassis Weight', render: (p: Product) => p.specs.weight || '—' },
    { label: 'Showroom Warranty', render: (p: Product) => <span className="text-cyan-300 font-semibold">{p.specs.warranty || '3-Year Huzefa Care'}</span> },
  ];

  return (
    <div className="w-full bg-[#0E4D57] min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#8B9095]/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B9095]/20 border border-[#8B9095]/30 text-xs font-semibold text-slate-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Laboratory Benchmark Suite</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
              Specification Matrix & Comparison Lab
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-light">
              Examine architectural blueprints, silicon micro-architectures, audio driver tolerances, and Calman calibrated displays side-by-side.
            </p>
          </div>

          {/* Quick Preset Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold mr-1">
              Presets:
            </span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.ids)}
                className="px-3 py-1.5 rounded-lg bg-[#0a353c] hover:bg-[#0c4049] border border-[#8B9095]/30 text-xs font-medium text-slate-200 hover:text-white transition-colors"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="rounded-2xl bg-[#0a353c] border border-[#8B9095]/30 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-[#8B9095]/20 flex items-center justify-between bg-[#082b31]">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-cyan-300" />
              <h2 className="font-display font-bold text-lg text-white">
                Comparing {activeProducts.length} Flagship Reference Devices
              </h2>
            </div>

            {/* Add Device Button */}
            <div className="relative">
              <button
                onClick={() => setAddSelectorOpen(!addSelectorOpen)}
                className="px-3.5 py-1.5 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Add Device ({activeProducts.length}/4)
              </button>

              {addSelectorOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#072429] border border-[#8B9095]/40 rounded-xl shadow-2xl p-2 z-30 max-h-80 overflow-y-auto space-y-1">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 px-3 py-1 block font-bold">
                    Select from Showroom:
                  </span>
                  {products.map((p) => {
                    const isAdded = activeProducts.some((ap) => ap.id === p.id);
                    return (
                      <button
                        key={p.id}
                        disabled={isAdded}
                        onClick={() => {
                          onAddProduct(p);
                          setAddSelectorOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          isAdded
                            ? 'opacity-40 cursor-not-allowed text-slate-500'
                            : 'hover:bg-[#0E4D57] text-slate-200'
                        }`}
                      >
                        <span className="truncate pr-2 font-medium">{p.name}</span>
                        <span className="font-mono text-cyan-300 font-bold shrink-0">
                          ${p.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#8B9095]/20 bg-[#072429]/60">
                  <th className="p-4 w-48 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
                    Technical Metric
                  </th>
                  {activeProducts.map((product) => (
                    <th key={product.id} className="p-4 min-w-[260px] align-top">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                            {product.brand}
                          </span>
                          {activeProducts.length > 1 && (
                            <button
                              onClick={() => onRemoveProduct(product.id)}
                              className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                              title="Remove from comparison"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Real Product Image in Comparison Header */}
                        <div className="relative w-full h-44 rounded-xl bg-[#072429] p-4 flex items-center justify-center border border-[#8B9095]/25 overflow-hidden group">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div>
                          <h3 className="font-bold text-white text-base line-clamp-1 font-display">
                            {product.name}
                          </h3>
                          <div className="text-lg font-extrabold text-white mt-1">
                            ${product.price.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span className="font-bold text-white">{product.rating}</span>
                            <span className="text-slate-400">({product.reviewsCount} reviews)</span>
                          </div>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => onAddToCart(product)}
                            className="flex-1 py-2 px-3 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                          <button
                            onClick={() => onSelectProduct(product)}
                            className="py-2 px-3 bg-[#072429] hover:bg-[#0c3e47] text-white border border-[#8B9095]/30 rounded-lg text-xs font-semibold"
                            title="Inspect 3D Specs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#8B9095]/15">
                {specRows.map((row, rIdx) => (
                  <tr
                    key={row.label}
                    className={rIdx % 2 === 0 ? 'bg-transparent' : 'bg-[#072429]/30'}
                  >
                    <td className="p-4 font-semibold text-slate-300 text-xs sm:text-sm">
                      {row.label}
                    </td>
                    {activeProducts.map((p) => (
                      <td key={p.id} className="p-4 text-slate-200 leading-relaxed text-xs sm:text-sm">
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Key Architectural Highlights */}
                <tr className="bg-[#072429]/50">
                  <td className="p-4 font-semibold text-slate-300 text-xs sm:text-sm align-top">
                    Engineering Highlights
                  </td>
                  {activeProducts.map((p) => (
                    <td key={p.id} className="p-4 align-top">
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {p.keyFeatures.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Benchmark Comparison Cards */}
        <div className="space-y-6 pt-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B9095]">
              Hardware Benchmarking
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              Standardized Silicon & Acoustic Index
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0a353c] border border-[#8B9095]/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-300">
                <Cpu className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Compute & Ray Tracing</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluated against sustained Blender 3D and 3DMark TimeSpy thermal stability.
              </p>
              <div className="space-y-3 pt-2">
                {activeProducts.slice(0, 3).map((p, idx) => {
                  const score = idx === 0 ? 98 : idx === 1 ? 84 : 91;
                  return (
                    <div key={p.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-200 truncate">{p.name.split(' ')[0]}</span>
                        <strong className="text-white font-mono">{score}/100</strong>
                      </div>
                      <div className="w-full bg-[#072429] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-cyan-400 to-[#8B9095] h-full rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a353c] border border-[#8B9095]/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-amber-300">
                <Tv className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Display Delta-E & Luminance</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Measured in nit peak brightness and color accuracy under Calman spectroscopy.
              </p>
              <div className="space-y-3 pt-2">
                {activeProducts.slice(0, 3).map((p, idx) => {
                  const score = idx === 0 ? 92 : idx === 1 ? 95 : 99;
                  return (
                    <div key={p.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-200 truncate">{p.name.split(' ')[0]}</span>
                        <strong className="text-white font-mono">{score}/100</strong>
                      </div>
                      <div className="w-full bg-[#072429] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-[#8B9095] h-full rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a353c] border border-[#8B9095]/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-300">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Build Integrity & Thermals</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Titanium chassis rigidity, vapor chamber dissipation, and IP rating test metrics.
              </p>
              <div className="space-y-3 pt-2">
                {activeProducts.slice(0, 3).map((p, idx) => {
                  const score = idx === 0 ? 96 : idx === 1 ? 97 : 93;
                  return (
                    <div key={p.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-200 truncate">{p.name.split(' ')[0]}</span>
                        <strong className="text-white font-mono">{score}/100</strong>
                      </div>
                      <div className="w-full bg-[#072429] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-emerald-400 to-[#8B9095] h-full rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
