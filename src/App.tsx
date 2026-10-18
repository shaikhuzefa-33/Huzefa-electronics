import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUp, MessageSquare, Bot } from 'lucide-react';
import { PRODUCTS } from './data/products';
import { Page, Product, ProductColor, CartItem } from './types';

// Modals and Common
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/modals/QuickViewModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { CompareModal } from './components/modals/CompareModal';
import { SearchModal } from './components/modals/SearchModal';
import { OrderTrackingModal } from './components/modals/OrderTrackingModal';
import { AIAssistantDrawer } from './components/modals/AIAssistantDrawer';
import { AuthModal } from './components/modals/AuthModal';
import { LoadingScreen } from './components/common/LoadingScreen';

// 6+ Core Pages
import { HomePage } from './components/pages/HomePage';
import { ShopPage } from './components/pages/ShopPage';
import { CategoriesPage } from './components/pages/CategoriesPage';
import { DealsPage } from './components/pages/DealsPage';
import { ComparePage } from './components/pages/ComparePage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [products] = useState<Product[]>(PRODUCTS);
  const [theme, setTheme] = useState<'teal' | 'light'>('teal');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Interactive States
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('huzefa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('huzefa_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [inspectProduct, setInspectProduct] = useState<Product | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // Modal Open States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOrderTrackOpen, setIsOrderTrackOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Scroll to Top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('huzefa_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('huzefa_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut ⌘K or Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setInspectProduct(null);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsCompareOpen(false);
        setIsSearchOpen(false);
        setIsOrderTrackOpen(false);
        setIsAssistantOpen(false);
        setIsAuthOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAddToCart = (product: Product, color?: ProductColor, quantity = 1) => {
    const chosenColor = color || product.colors[0];
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedColor.name === chosenColor.name
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, selectedColor: chosenColor, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleToggleCompare = (product: Product) => {
    setCompareProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategoryFilter(categoryKey);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div
      className={`min-h-screen font-sans selection:bg-[#8B9095] selection:text-slate-950 transition-colors duration-300 ${
        theme === 'teal' ? 'bg-[#0E4D57] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Animated Loading Screen on Initial Visit */}
      {loading && <LoadingScreen onLoaded={() => setLoading(false)} />}

      {/* Sticky Glass Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlist.length}
        compareCount={compareProducts.length}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'teal' ? 'light' : 'teal'))}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => handleNavigate('compare')}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onOpenOrderTrack={() => setIsOrderTrackOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        userName={userName}
      />

      {/* Main Page Content with Motion Page Transitions */}
      <main className="min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentPage === 'home' && (
              <HomePage
                products={products}
                onSelectProduct={(p) => setInspectProduct(p)}
                onAddToCart={handleAddToCart}
                onNavigate={handleNavigate}
                onSelectCategory={handleCategorySelect}
              />
            )}

            {currentPage === 'shop' && (
              <ShopPage
                products={products}
                initialCategory={selectedCategoryFilter}
                onSelectProduct={(p) => setInspectProduct(p)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlist.map((w) => w.id)}
                onToggleCompare={handleToggleCompare}
                compareIds={compareProducts.map((c) => c.id)}
              />
            )}

            {currentPage === 'categories' && (
              <CategoriesPage
                onSelectCategory={handleCategorySelect}
                onNavigateToShop={() => handleNavigate('shop')}
              />
            )}

            {currentPage === 'deals' && (
              <DealsPage
                products={products}
                onSelectProduct={(p) => setInspectProduct(p)}
                onAddToCart={handleAddToCart}
              />
            )}

            {currentPage === 'compare' && (
              <ComparePage
                products={products}
                selectedProducts={compareProducts}
                onAddProduct={(p) => {
                  if (!compareProducts.some((c) => c.id === p.id)) {
                    setCompareProducts((prev) => [...prev.slice(0, 3), p]);
                  }
                }}
                onRemoveProduct={(id) => {
                  setCompareProducts((prev) => prev.filter((c) => c.id !== id));
                }}
                onAddToCart={handleAddToCart}
                onSelectProduct={(p) => setInspectProduct(p)}
              />
            )}

            {currentPage === 'about' && <AboutPage />}

            {currentPage === 'contact' && (
              <ContactPage onOpenAssistant={() => setIsAssistantOpen(true)} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onSelectCategory={handleCategorySelect} />

      {/* Floating Action Bar (AI Concierge trigger & Scroll to top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-[#092e35] hover:bg-[#0c4049] border border-[#8B9095]/40 text-slate-200 flex items-center justify-center shadow-2xl transition-all"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAssistantOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#0E4D57] via-[#0b3840] to-[#072429] border border-cyan-400/40 text-white font-semibold text-xs shadow-2xl hover:border-cyan-300 transition-all group"
          title="Open Huzefa AI Concierge"
        >
          <div className="relative">
            <Bot className="w-4 h-4 text-cyan-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="hidden sm:inline">AI Concierge</span>
        </motion.button>
      </div>

      {/* Interactive 3D Quick View Modal */}
      <QuickViewModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={inspectProduct ? wishlist.some((w) => w.id === inspectProduct.id) : false}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={(product) => {
          handleAddToCart(product);
          setWishlist((prev) => prev.filter((p) => p.id !== product.id));
        }}
      />

      {/* Product Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={compareProducts}
        onRemoveProduct={(id) => setCompareProducts((prev) => prev.filter((p) => p.id !== id))}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Search Modal with Voice Search */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setInspectProduct(p)}
        onSearchCategory={(cat) => handleCategorySelect(cat)}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackOpen}
        onClose={() => setIsOrderTrackOpen(false)}
      />

      {/* AI Assistant Concierge Drawer */}
      <AIAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        products={products}
        onSelectProduct={(p) => setInspectProduct(p)}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Auth VIP Member Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(name) => setUserName(name)}
      />
    </div>
  );
}
