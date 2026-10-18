import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Truck, CheckCircle2, Clock, MapPin, Search, ShieldCheck } from 'lucide-react';
import { OrderTrackResult } from '../../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orderInput, setOrderInput] = useState('HZF-892410');
  const [currentOrder, setCurrentOrder] = useState<OrderTrackResult | null>({
    orderId: 'HZF-892410',
    customerName: 'Huzefa Premium Member',
    status: 'out_for_delivery',
    currentCity: 'Silicon Valley Metro Distribution Hub',
    estimatedDelivery: 'Today by 4:30 PM',
    carrier: 'Huzefa White-Glove VIP Fleet',
    trackingNumber: 'HZF-WG-9042-US',
    items: [
      { name: 'Titan Blade 18 Pro (RTX 4090 / 64GB RAM)', quantity: 1, price: 3299 },
      { name: 'Acoustic Pro Spatial ANC Earbuds', quantity: 1, price: 299 },
    ],
    total: 3598,
  });

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderInput.trim()) return;

    // Simulate lookup
    setCurrentOrder({
      orderId: orderInput.toUpperCase(),
      customerName: 'Verified Showroom Buyer',
      status: 'dispatched',
      currentCity: 'Showroom Regional Logistics Center',
      estimatedDelivery: 'Tomorrow by 1:00 PM',
      carrier: 'Huzefa White-Glove VIP Fleet',
      trackingNumber: `HZF-WG-${Math.floor(1000 + Math.random() * 9000)}-US`,
      items: [
        { name: 'Cinematic Master 77" 8K OLED evo', quantity: 1, price: 3999 },
      ],
      total: 3999,
    });
  };

  const steps = [
    { key: 'confirmed', label: 'Order Confirmed', sub: 'Verified by Concierge' },
    { key: 'processing', label: 'Quality Tested', sub: 'Calman Calibration' },
    { key: 'dispatched', label: 'Dispatched', sub: 'In Transit via Armored Air' },
    { key: 'out_for_delivery', label: 'Out for Delivery', sub: 'Courier En Route' },
    { key: 'delivered', label: 'Delivered', sub: 'Signed with White Glove' },
  ];

  const getStepIndex = (status: OrderTrackResult['status']) => {
    switch (status) {
      case 'confirmed': return 0;
      case 'processing': return 1;
      case 'dispatched': return 2;
      case 'out_for_delivery': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  if (!isOpen) return null;

  const currentStepIdx = currentOrder ? getStepIndex(currentOrder.status) : 0;

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
          className="relative w-full max-w-2xl bg-[#0a3239] border border-[#8B9095]/40 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#8B9095]/20 bg-[#09292f]">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-slate-300" />
              <h3 className="font-display font-bold text-lg text-white">
                Live White-Glove Order Tracking
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Search Input */}
            <form onSubmit={handleLookup} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={orderInput}
                  onChange={(e) => setOrderInput(e.target.value)}
                  placeholder="Enter Order ID (e.g. HZF-892410)"
                  className="w-full bg-[#072429] border border-[#8B9095]/30 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none uppercase tracking-wider"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#8B9095] hover:bg-slate-200 text-slate-950 rounded-lg text-sm font-semibold transition-colors"
              >
                Track Order
              </button>
            </form>

            {currentOrder && (
              <div className="space-y-6">
                {/* Order Summary Card */}
                <div className="bg-[#072429] rounded-xl p-4 border border-[#8B9095]/30 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      Order Reference
                    </span>
                    <strong className="text-base text-white font-mono">
                      {currentOrder.orderId}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      Carrier Fleet
                    </span>
                    <span className="text-sm text-slate-200">
                      {currentOrder.carrier}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                      Estimated Arrival
                    </span>
                    <span className="text-sm text-emerald-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {currentOrder.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Progress Steps Timeline */}
                <div className="py-4">
                  <div className="relative flex items-center justify-between">
                    {/* Connecting line */}
                    <div className="absolute left-0 top-4 w-full h-0.5 bg-[#8B9095]/30 -z-0" />
                    <div
                      className="absolute left-0 top-4 h-0.5 bg-emerald-400 -z-0 transition-all duration-500"
                      style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step, idx) => {
                      const isPastOrCurrent = idx <= currentStepIdx;
                      return (
                        <div key={step.key} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                              isPastOrCurrent
                                ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                                : 'bg-[#0a3239] border-[#8B9095]/40 text-slate-400'
                            }`}
                          >
                            {idx < currentStepIdx ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <span>{idx + 1}</span>
                            )}
                          </div>
                          <span className="text-[11px] font-semibold text-white mt-2 text-center max-w-[80px]">
                            {step.label}
                          </span>
                          <span className="text-[9px] text-slate-400 text-center max-w-[80px] hidden sm:block">
                            {step.sub}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Current Location & Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#0e434c]/50 rounded-lg p-3 border border-[#8B9095]/20">
                    <span className="text-slate-400 uppercase tracking-wider block text-[10px] mb-1">
                      Live Hub Scan
                    </span>
                    <div className="flex items-center gap-1.5 text-white font-medium">
                      <MapPin className="w-4 h-4 text-rose-400" />
                      {currentOrder.currentCity}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Tracking Code: <span className="font-mono text-cyan-300">{currentOrder.trackingNumber}</span>
                    </p>
                  </div>

                  <div className="bg-[#0e434c]/50 rounded-lg p-3 border border-[#8B9095]/20">
                    <span className="text-slate-400 uppercase tracking-wider block text-[10px] mb-1">
                      White-Glove Package Contents
                    </span>
                    {currentOrder.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-slate-200 mt-0.5">
                        <span className="line-clamp-1">{item.quantity}x {item.name}</span>
                        <span className="font-semibold text-white">${item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-[#8B9095]/20">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> Full Transit Value Insurance Included
                  </span>
                  <span>Direct Concierge Dispatch: +1 (800) 848-9332</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
