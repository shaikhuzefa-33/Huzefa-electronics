import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const progressToFreeShipping = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = appliedDiscount ? Math.round(subtotal * (appliedDiscount / 100)) : 0;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'TITAN40') {
      setAppliedDiscount(40);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } else if (code === 'WELCOME10' || code === 'HUZEFA10') {
      setAppliedDiscount(10);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    } else {
      setPromoError('Invalid promotional voucher code.');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      setTimeout(() => {
        onClearCart();
        setCheckoutComplete(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#061d21]/75 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#0a3239] border-l border-[#8B9095]/30 text-slate-100 flex flex-col h-full z-10 shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#8B9095]/20 bg-[#09292f]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-slate-300" />
                <h3 className="font-display font-bold text-lg text-white">
                  Showroom Bag
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#8B9095]/30 text-slate-200">
                  {items.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Meter */}
            <div className="px-6 py-3 bg-[#0c3f47]/60 border-b border-[#8B9095]/15 text-xs">
              <div className="flex justify-between items-center mb-1 text-slate-300">
                <span>
                  {remainingForFree === 0 ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Free White-Glove Delivery Unlocked
                    </span>
                  ) : (
                    <>Add <strong className="text-white">${remainingForFree}</strong> more for Free Delivery</>
                  )}
                </span>
                <span className="font-bold text-white">{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full bg-[#072429] rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8B9095] to-emerald-400 transition-all duration-500 rounded-full"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {checkoutComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-white">Order Confirmed!</h4>
                  <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                    Thank you for choosing Huzefa Electronics. Your bespoke order has been routed to our white-glove logistics team.
                  </p>
                  <div className="text-xs bg-[#072429] p-3 rounded-lg border border-[#8B9095]/30 text-slate-300">
                    Order Reference: <strong className="text-emerald-400">HZF-892410</strong>
                  </div>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#0c3f47] flex items-center justify-center text-[#8B9095]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-display font-medium text-white text-base">
                    Your showroom bag is empty
                  </p>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Explore our 3D showroom to discover reference-grade audio, gaming laptops, and displays.
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor.name}`}
                    className="flex gap-4 p-3 rounded-xl bg-[#0e434c]/60 border border-[#8B9095]/20 hover:border-[#8B9095]/40 transition-colors"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain rounded-lg bg-[#072429] p-1 border border-[#8B9095]/20"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-semibold text-white line-clamp-1">
                            {item.product.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-black/30"
                              style={{ backgroundColor: item.selectedColor.hex }}
                            />
                            <span className="text-[11px] text-slate-300">
                              {item.selectedColor.name}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center border border-[#8B9095]/30 rounded-md bg-[#072429] text-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="px-2 py-1 text-slate-400 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 font-semibold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="px-2 py-1 text-slate-400 hover:text-white"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-bold text-white">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer / Checkout */}
            {items.length > 0 && !checkoutComplete && (
              <div className="p-6 border-t border-[#8B9095]/20 bg-[#09292f] space-y-4">
                {/* Voucher code form */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9095]" />
                    <input
                      type="text"
                      placeholder="Promo Code (try TITAN40)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#072429] border border-[#8B9095]/30 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-slate-300 uppercase tracking-wider"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#8B9095]/30 hover:bg-[#8B9095]/50 text-white rounded-lg text-xs font-semibold transition-colors border border-[#8B9095]/30"
                  >
                    Apply
                  </button>
                </form>

                {appliedDiscount && (
                  <div className="text-xs text-emerald-400 flex items-center justify-between bg-emerald-500/10 px-3 py-1.5 rounded border border-emerald-500/20">
                    <span>Voucher Applied: {appliedDiscount}% OFF</span>
                    <button
                      onClick={() => setAppliedDiscount(null)}
                      className="text-slate-400 hover:text-white text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {promoError && (
                  <div className="text-xs text-rose-400">
                    {promoError}
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Showroom Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promotional Savings</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>White-Glove Delivery</span>
                    <span>{shipping === 0 ? <span className="text-emerald-400 font-semibold">FREE</span> : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#8B9095]/20">
                    <span>Estimated Total</span>
                    <span className="text-base">${finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleSimulateCheckout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#8B9095] hover:bg-slate-200 text-slate-950 rounded-lg font-semibold text-sm transition-all shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 animate-pulse" /> Processing Order...
                    </span>
                  ) : (
                    <>
                      Proceed to Checkout <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>256-Bit SSL Encrypted Showroom Checkout</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
