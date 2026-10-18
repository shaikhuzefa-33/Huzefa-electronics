import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#061d21]/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#0a3239] border-l border-[#8B9095]/30 text-slate-100 flex flex-col h-full z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#8B9095]/20 bg-[#09292f]">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400/30" />
                <h3 className="font-display font-bold text-lg text-white">
                  Wishlist & Vault
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#8B9095]/30 text-slate-200">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#0c3f47] flex items-center justify-center text-rose-400">
                    <Heart className="w-8 h-8" />
                  </div>
                  <p className="font-display font-medium text-white text-base">
                    Your wishlist is empty
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Save your favorite products to track price drops and VIP showroom availability.
                  </p>
                </div>
              ) : (
                items.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3.5 rounded-xl bg-[#0e434c]/60 border border-[#8B9095]/20 hover:border-[#8B9095]/40 transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-contain rounded-lg bg-[#072429] p-1 border border-[#8B9095]/20"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400">
                            {product.brand}
                          </span>
                          <h4 className="text-sm font-semibold text-white line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-sm font-bold text-white mt-1 block">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#8B9095]/15">
                        <span className="text-[11px] text-emerald-400 font-medium">
                          {product.inStock ? 'In Stock' : 'Pre-order'}
                        </span>
                        <button
                          onClick={() => onMoveToCart(product)}
                          className="flex items-center gap-1.5 px-3 py-1 bg-[#8B9095] hover:bg-slate-200 text-slate-950 rounded-md text-xs font-semibold transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
