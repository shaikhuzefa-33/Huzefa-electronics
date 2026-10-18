import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Mic, MicOff, X, ArrowRight, Star, Sparkles } from 'lucide-react';
import { Product } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSearchCategory: (catKey: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSearchCategory,
}) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [isOpen]);

  // Voice Search setup with Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      setVoiceSupported(false);
    }
  }, []);

  const toggleVoiceSearch = () => {
    if (!voiceSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const filteredProducts = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const recentSearches = ['Titan Blade 18', 'OLED 8K', 'Wireless Earbuds', 'Titanium 5G'];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#061d21]/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          className="relative w-full max-w-2xl bg-[#0a3239] border border-[#8B9095]/40 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-100"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 sm:px-6 py-4 border-b border-[#8B9095]/20 bg-[#09292f] gap-3">
            <Search className="w-5 h-5 text-[#8B9095]" />
            <input
              ref={inputRef}
              type="text"
              placeholder={isListening ? 'Listening for your voice...' : 'Search luxury tech, models, 8K OLED, RTX 4090...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-white text-base sm:text-lg placeholder-slate-400 focus:outline-none"
            />

            {/* Voice Search Button */}
            {voiceSupported && (
              <button
                type="button"
                onClick={toggleVoiceSearch}
                className={`p-2 rounded-lg transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                title={isListening ? 'Stop listening' : 'Start Voice Search'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            )}

            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <kbd className="hidden sm:inline-block px-2 py-1 text-[11px] font-semibold text-slate-400 bg-[#072429] rounded border border-[#8B9095]/30">
              ESC
            </kbd>
          </div>

          {/* Voice Listening Banner */}
          {isListening && (
            <div className="bg-[#0c3f47] px-6 py-2.5 text-xs text-cyan-300 flex items-center justify-between border-b border-[#8B9095]/20 animate-pulse">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                Listening now... Speak product name like "Titan Blade" or "Smart Watch"
              </span>
              <button
                onClick={() => setIsListening(false)}
                className="text-slate-300 hover:text-white underline"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Results or Suggestions */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {query.trim() ? (
              filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                    Matching Showroom Inventory ({filteredProducts.length})
                  </div>
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl bg-[#0e434c]/50 hover:bg-[#0e434c] border border-[#8B9095]/20 hover:border-[#8B9095]/50 transition-all cursor-pointer group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-contain rounded-lg bg-[#072429] p-1 border border-[#8B9095]/20"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {product.brand} • {product.category}
                        </span>
                        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center text-amber-400 text-xs">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="ml-1 font-semibold">{product.rating}</span>
                          </div>
                          <span className="text-xs text-slate-400">
                            ${product.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400">
                  <p>No products found matching "{query}".</p>
                  <p className="text-xs mt-1">Try searching for brand names like "Sony", "Apple", or categories like "Gaming".</p>
                </div>
              )
            ) : (
              <div className="space-y-6">
                {/* Recent Searches */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">
                    Recent Searches
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-3 py-1.5 rounded-lg bg-[#072429] hover:bg-[#0c3f47] border border-[#8B9095]/30 text-xs text-slate-200 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2.5">
                    Explore by Category
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'gaming', label: 'Pro Gaming Laptops' },
                      { key: 'smartphones', label: 'Flagship Smartphones' },
                      { key: 'tvs', label: '8K OLED TVs' },
                      { key: 'audio', label: 'Lossless Hi-Fi Audio' },
                      { key: 'cameras', label: 'Cinema Cameras' },
                      { key: 'laptops', label: 'Creator Notebooks' },
                    ].map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => {
                          onSearchCategory(cat.key);
                          onClose();
                        }}
                        className="p-2.5 text-left rounded-lg bg-[#072429] hover:bg-[#0c3f47] border border-[#8B9095]/20 text-xs text-slate-200 hover:text-white transition-colors"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
