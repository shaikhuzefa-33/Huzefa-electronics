import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Layers, Star, ShoppingCart, Trash2, Check, ExternalLink } from 'lucide-react';
import { Product } from '../../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveProduct,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#061d21]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-6xl bg-[#0a3239] border border-[#8B9095]/40 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#8B9095]/20 bg-[#09292f]">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-slate-300" />
              <h3 className="font-display font-bold text-lg text-white">
                Showroom Specification Matrix
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#8B9095]/30 text-slate-200">
                {products.length} of 4 items selected
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-x-auto">
            {products.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <p>No products selected for comparison.</p>
                <p className="text-xs">Click the comparison checkbox on any product card in the Shop to compare specifications.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#8B9095]/30">
                    <th className="p-3 w-40 text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
                      Product
                    </th>
                    {products.map((p) => (
                      <th key={p.id} className="p-3 min-w-[220px] align-top">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[11px] font-bold uppercase text-slate-400">
                            {p.brand}
                          </span>
                          <button
                            onClick={() => onRemoveProduct(p.id)}
                            className="text-slate-400 hover:text-rose-400"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-28 object-contain rounded-lg bg-[#072429] p-2 mb-2 border border-[#8B9095]/20"
                        />
                        <h4 className="font-bold text-white text-sm line-clamp-1">
                          {p.name}
                        </h4>
                        <div className="text-base font-extrabold text-white mt-1">
                          ${p.price.toLocaleString()}
                        </div>
                        <button
                          onClick={() => onAddToCart(p)}
                          className="mt-3 w-full py-1.5 px-3 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-semibold rounded-md text-xs flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8B9095]/15 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium text-slate-400 bg-[#072429]/40">Rating</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-semibold text-white">{p.rating}</span>
                          <span className="text-slate-400 text-xs">({p.reviewsCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-400 bg-[#072429]/40">Display</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 font-medium text-white">
                        {p.specs.display || '—'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-400 bg-[#072429]/40">Processor / Sensor</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">
                        {p.specs.processor || p.specs.sensor || '—'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-400 bg-[#072429]/40">Battery / Audio</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">
                        {p.specs.battery || p.specs.audio || '—'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-400 bg-[#072429]/40">Connectivity</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-slate-200">
                        {p.specs.connectivity || 'Wi-Fi / Bluetooth 5.3+'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-400 bg-[#072429]/40">Warranty</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3 text-emerald-400 font-medium">
                        {p.specs.warranty || '2-Year Showroom Warranty'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-slate-400 bg-[#072429]/40">Availability</td>
                    {products.map((p) => (
                      <td key={p.id} className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          p.inStock
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {p.inStock ? 'Ready for Dispatch' : 'Showroom Pre-Order'}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
