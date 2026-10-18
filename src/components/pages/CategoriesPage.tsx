import React from 'react';
import { ArrowRight, Sparkles, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

interface CategoriesPageProps {
  onSelectCategory: (categoryKey: string) => void;
  onNavigateToShop: () => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({
  onSelectCategory,
  onNavigateToShop,
}) => {
  return (
    <div className="w-full bg-[#0E4D57] min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8B9095] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Architectural Collections
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Curated Showroom Portfolios
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Every category represents uncompromising craftsmanship, uniting Apple industrial precision, Samsung panel mastery, and Sony studio acoustic excellence.
          </p>
        </div>

        {/* 6 High-Fidelity Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              className="group relative rounded-2xl overflow-hidden border border-[#8B9095]/30 bg-gradient-to-b from-[#0e434c] to-[#07252a] hover:border-slate-200 transition-all duration-500 hover:-translate-y-2 shadow-2xl flex flex-col justify-between"
            >
              {/* Category Imagery with Glassmorphic Gradient */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07252a] via-[#07252a]/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#0E4D57]/90 backdrop-blur-md border border-[#8B9095]/40 text-xs font-semibold text-white">
                    {cat.itemCount} Reference Models
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 space-y-4 relative -mt-6 bg-[#07252a]/95 rounded-t-2xl border-t border-[#8B9095]/20 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold font-display text-white group-hover:text-cyan-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Highlights list */}
                  <div className="mt-4 pt-4 border-t border-[#8B9095]/20 grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-medium">
                    {(cat.featured || cat.highlights || []).map((feat, i) => (
                      <span key={i} className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      onSelectCategory(cat.key);
                      onNavigateToShop();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg group-hover:shadow-cyan-400/20"
                  >
                    <span>Browse {cat.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Showroom Craftsmanship Banner */}
        <div className="mt-16 bg-[#0a353c] border border-[#8B9095]/30 rounded-2xl p-8 sm:p-10 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#0E4D57] border border-[#8B9095]/30 flex items-center justify-center text-cyan-300 mx-auto md:mx-0">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Silicon Calibrated</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every CPU, GPU, and acoustic transducer is stress-tested in cleanroom conditions before shipment.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#0E4D57] border border-[#8B9095]/30 flex items-center justify-center text-cyan-300 mx-auto md:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">3-Year Platinum Care</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct concierge line, accidental spill & drop protection, and complimentary loaner devices.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#0E4D57] border border-[#8B9095]/30 flex items-center justify-center text-cyan-300 mx-auto md:mx-0">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white">Zero Bloatware Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pure unadulterated operating system installations, customized strictly to client performance parameters.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
