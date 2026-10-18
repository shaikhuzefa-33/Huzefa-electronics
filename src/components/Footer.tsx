import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Truck, Clock, Sparkles, Check } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
  onSelectCategory: (catKey: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#09333a] border-t border-[#8B9095]/25 text-slate-300 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top VIP Newsletter Ribbon */}
        <div className="bg-gradient-to-r from-[#0E4D57] via-[#0b3840] to-[#0a2e34] border border-[#8B9095]/30 rounded-2xl p-6 sm:p-8 mb-16 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-slate-300 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Huzefa Privileged Access
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Receive VIP Showroom Allocations
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Subscribe to receive private preview invitations, first allocation access to RTX 4090 drops, and an instant $100 showroom credit.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Enter your VIP email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full sm:w-80 bg-[#072429] border border-[#8B9095]/40 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-slate-200"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shrink-0"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" /> VIP Activated
                </>
              ) : (
                <>
                  Join Showroom Vault <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* 4 Core Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#8B9095]/20 text-xs sm:text-sm">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0E4D57] border border-[#8B9095]/40 flex items-center justify-center font-display font-extrabold text-white text-base">
                H<span className="text-[#8B9095]">Z</span>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                HUZEFA <span className="text-[#8B9095] font-light">ELECTRONICS</span>
              </span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              The premier modern-classic showroom celebrating the intersection of Apple unibody architecture, Samsung display brilliance, and Sony reference acoustics.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-slate-300">
                <Truck className="w-3.5 h-3.5 text-cyan-300" /> White-Glove Fleet
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 3-Year Care
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-amber-300" /> 24/7 Concierge
              </span>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 text-[#8B9095]">
              Company
            </h4>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Our Showroom Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Craftsmanship & Design
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Leadership & Acoustics Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Flagship Showroom Tour
                </button>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition-colors">
                  Global Press & Accolades
                </a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 text-[#8B9095]">
              Shop Showroom
            </h4>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button onClick={() => { onNavigate('shop'); onSelectCategory('gaming'); }} className="hover:text-white transition-colors">
                  Pro Gaming Laptops
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('shop'); onSelectCategory('smartphones'); }} className="hover:text-white transition-colors">
                  Titanium Smartphones
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('shop'); onSelectCategory('tvs'); }} className="hover:text-white transition-colors">
                  8K OLED Master TVs
                </button>
              </li>
              <li>
                <button onClick={() => { onNavigate('shop'); onSelectCategory('audio'); }} className="hover:text-white transition-colors">
                  Spatial Hi-Fi Earbuds
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('deals')} className="hover:text-white transition-colors text-rose-300">
                  Luxury Sale & Deals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-white transition-colors text-cyan-300">
                  Compare Lab Specs
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Concierge */}
          <div>
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider mb-4 text-[#8B9095]">
              Support
            </h4>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Concierge Support Desk
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Order Tracking
                </button>
              </li>
              <li>
                <a href="#warranty" className="hover:text-white transition-colors">
                  3-Year Platinum Care
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-white transition-colors">
                  White-Glove Shipping
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-white transition-colors">
                  30-Day Showroom Trial
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Required Copyright Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Huzefa Electronics. All Rights Reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span className="hover:text-white cursor-pointer">Showroom Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Compliance & Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
