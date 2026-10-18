import React, { useState, useEffect } from 'react';
import { Zap, Clock, Tag, ShoppingBag, ArrowRight, Copy, Check, Sparkles, Percent } from 'lucide-react';
import { Product } from '../../types';
import { DEALS_AND_OFFERS, BUNDLES } from '../../data/deals';

interface DealsPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const DealsPage: React.FC<DealsPageProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Live countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 13, minutes: 28, seconds: 44 });
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

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const vouchers = [
    { code: 'TITAN40', discount: '40% OFF', desc: 'Valid on Titan Blade 18 Pro Gaming Laptop' },
    { code: 'WELCOME10', discount: '10% OFF', desc: 'Valid sitewide on any showroom hardware' },
    { code: 'STUDIO8K', discount: '$500 OFF', desc: 'Instant credit on 8K OLED evo Cinema screens' },
  ];

  return (
    <div className="w-full bg-[#0E4D57] min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#072429] via-[#0E4D57] to-[#0a3a42] border border-[#8B9095]/40 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Zap className="w-4 h-4 animate-bounce" /> Official Showroom Flash Allocation
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
              Exclusive Showroom Drops & Limited Allocations
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Limited-production serial numbers and certified laboratory reference devices available at preferred collector pricing.
            </p>

            {/* Countdown Display */}
            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Window Closes In:
              </span>
              <div className="flex gap-2 font-mono text-center">
                <div className="bg-[#072429] px-3.5 py-2 rounded-xl border border-[#8B9095]/40">
                  <span className="text-lg sm:text-xl font-extrabold text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] block text-slate-400">HRS</span>
                </div>
                <div className="bg-[#072429] px-3.5 py-2 rounded-xl border border-[#8B9095]/40">
                  <span className="text-lg sm:text-xl font-extrabold text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] block text-slate-400">MIN</span>
                </div>
                <div className="bg-[#072429] px-3.5 py-2 rounded-xl border border-[#8B9095]/40">
                  <span className="text-lg sm:text-xl font-extrabold text-cyan-300">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] block text-slate-400">SEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vouchers.map((v) => (
            <div
              key={v.code}
              className="p-5 rounded-2xl bg-[#0a353c] border border-dashed border-[#8B9095]/50 flex items-center justify-between gap-4 shadow-lg hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-emerald-400" />
                  <span className="text-base font-extrabold text-white">{v.discount}</span>
                </div>
                <span className="text-xs text-slate-300 mt-1 block">{v.desc}</span>
                <span className="font-mono text-xs font-bold text-cyan-300 mt-2 block tracking-wider">
                  {v.code}
                </span>
              </div>
              <button
                onClick={() => handleCopy(v.code)}
                className="px-3 py-2 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedCode === v.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Active Drops Grid */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B9095]">
              Live Inventory Drops
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              Active Flash Sales
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEALS_AND_OFFERS.map((deal) => {
              const product = products.find((p) => p.id === deal.productId);
              const progress = ((deal.totalStock - deal.claimedStock) / deal.totalStock) * 100;

              return (
                <div
                  key={deal.id}
                  className="rounded-2xl bg-gradient-to-b from-[#0e434c] to-[#072429] border border-[#8B9095]/30 p-5 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xl"
                >
                  <div className="relative w-full h-48 rounded-xl bg-[#072429] p-4 flex items-center justify-center overflow-hidden mb-4 border border-[#8B9095]/20">
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      Save {deal.discountPercentage}%
                    </span>
                    <img
                      src={deal.image}
                      alt={deal.productName}
                      className="max-h-36 object-contain"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <h3 className="font-bold text-white text-base line-clamp-1">
                      {deal.productName}
                    </h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-extrabold text-white">
                        ${deal.dealPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ${deal.originalPrice.toLocaleString()}
                      </span>
                    </div>

                    {/* Stock Meter */}
                    <div className="pt-2">
                      <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                        <span>Showroom Units Claimed</span>
                        <strong className="text-amber-400">{deal.claimedStock}/{deal.totalStock}</strong>
                      </div>
                      <div className="w-full bg-[#072429] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full"
                          style={{ width: `${100 - progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#8B9095]/20 flex gap-2">
                    {product && (
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 py-2.5 px-3 bg-[#0a353c] hover:bg-[#0c4049] text-white border border-[#8B9095]/30 rounded-xl text-xs font-semibold transition-colors"
                      >
                        Inspect 3D
                      </button>
                    )}
                    <button
                      onClick={() => product && onAddToCart(product)}
                      className="flex-1 py-2.5 px-3 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Claim Allocation
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Curated Bundles Section */}
        <div className="space-y-6 pt-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B9095]">
              Curated Suites
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              Engineered Showroom Bundles
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                className="rounded-2xl bg-[#0a353c] border border-[#8B9095]/30 p-6 sm:p-8 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                      Showroom Package
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Save ${bundle.savings}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white font-display">
                    {bundle.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {bundle.description}
                  </p>

                  {/* Included Items */}
                  <div className="mt-4 pt-4 border-t border-[#8B9095]/20 space-y-2 text-xs">
                    {bundle.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#8B9095]/20 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-white">
                      ${bundle.bundlePrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 line-through block">
                      ${bundle.originalTotal.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const firstProduct = products[0];
                      if (firstProduct) onAddToCart(firstProduct);
                    }}
                    className="py-3 px-6 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" /> Claim Bundle Suit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
