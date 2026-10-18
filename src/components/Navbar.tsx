import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Sparkles,
  Layers,
  Sun,
  Moon,
  Menu,
  X,
  Package,
} from 'lucide-react';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  compareCount: number;
  theme: 'teal' | 'light';
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenAssistant: () => void;
  onOpenOrderTrack: () => void;
  onOpenAuth: () => void;
  userName: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  cartSubtotal,
  wishlistCount,
  compareCount,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenAssistant,
  onOpenOrderTrack,
  onOpenAuth,
  userName,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: Page; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories' },
    { id: 'deals', label: 'Deals', badge: 'Hot' },
    { id: 'compare', label: 'Compare Lab' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      {/* Scroll Progress Indicator */}
      <div className="w-full h-[2.5px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#8B9095] via-slate-200 to-cyan-300 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          theme === 'teal'
            ? isScrolled
              ? 'bg-[#0E4D57]/90 backdrop-blur-xl border-[#8B9095]/25 shadow-lg shadow-black/20'
              : 'bg-[#0E4D57]/70 backdrop-blur-md border-[#8B9095]/15'
            : isScrolled
            ? 'bg-slate-100/90 backdrop-blur-xl border-slate-300 shadow-md text-slate-900'
            : 'bg-white/80 backdrop-blur-md border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#125863] via-[#0E4D57] to-[#07252a] border border-[#8B9095]/40 flex items-center justify-center shadow-md group-hover:border-slate-300 transition-colors">
              <span className="font-display font-black text-lg tracking-tighter text-white">
                H<span className="text-[#8B9095] group-hover:text-cyan-300 transition-colors">Z</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-slate-100 transition-colors">
                HUZEFA <span className="text-[#8B9095] font-light">ELECTRONICS</span>
              </span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-semibold -mt-1 hidden sm:block">
                3D Tech Showroom
              </span>
            </div>
          </div>

          {/* Center Navigation Links with Animated Gray Underline */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1.5 text-xs xl:text-sm font-semibold transition-colors duration-200 nav-link-indicator flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'text-white active'
                      : 'text-[#8B9095] hover:text-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold tracking-tight uppercase leading-none">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#8B9095] shadow-[0_0_8px_rgba(139,144,149,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-[#8B9095] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2 text-xs font-medium border border-transparent hover:border-[#8B9095]/20"
              title="Search Showroom (⌘K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline-block text-slate-300">Search</span>
              <kbd className="hidden xl:inline-block text-[10px] px-1.5 py-0.5 rounded bg-[#072429] border border-[#8B9095]/30 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAssistant}
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-cyan-300 hover:text-white bg-[#0a3a42]/80 hover:bg-[#0c444e] border border-cyan-500/30 hover:border-cyan-400/50 transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              title="Open Huzefa AI Concierge"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
              <span className="hidden sm:inline">AI Concierge</span>
            </button>

            {/* Product Comparison Pill */}
            {compareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="relative p-2 rounded-xl text-[#8B9095] hover:text-white hover:bg-white/10 transition-colors"
                title="Product Comparison"
              >
                <Layers className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {compareCount}
                </span>
              </button>
            )}

            {/* Order Tracking Icon */}
            <button
              onClick={onOpenOrderTrack}
              className="p-2 rounded-xl text-[#8B9095] hover:text-white hover:bg-white/10 transition-colors hidden md:block"
              title="Track Order"
            >
              <Package className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-xl text-[#8B9095] hover:text-white hover:bg-white/10 transition-colors"
              title="Wishlist & Vault"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-[#8B9095]/20 hover:bg-[#8B9095]/30 text-white border border-[#8B9095]/30 transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-slate-200" />
              {cartCount > 0 ? (
                <span className="w-4 h-4 rounded-full bg-white text-slate-950 font-bold text-[10px] flex items-center justify-center shadow">
                  {cartCount}
                </span>
              ) : (
                <span className="text-xs text-slate-300 hidden md:inline font-mono">
                  $0
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            <button
              onClick={onOpenAuth}
              className="p-2 rounded-xl text-[#8B9095] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              title={userName ? `Signed in as ${userName}` : 'Sign In'}
            >
              <User className="w-4 h-4" />
              {userName && (
                <span className="text-xs text-slate-200 hidden xl:inline font-medium max-w-[80px] truncate">
                  {userName.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Theme Toggle (Deep Teal vs Platinum Light) */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-[#8B9095] hover:text-white hover:bg-white/10 transition-colors"
              title="Toggle Showroom Light / Dark Theme"
            >
              {theme === 'teal' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#8B9095] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0a3239] border-t border-[#8B9095]/20 px-6 py-5 space-y-4"
            >
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      currentPage === link.id
                        ? 'bg-[#8B9095] text-slate-950'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-[#8B9095]/20 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenAssistant();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold"
                >
                  <Sparkles className="w-4 h-4" /> Open AI Shopping Concierge
                </button>
                <button
                  onClick={() => {
                    onOpenOrderTrack();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#072429] text-slate-300 text-xs font-medium"
                >
                  <Package className="w-4 h-4" /> Track Active Showroom Delivery
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
