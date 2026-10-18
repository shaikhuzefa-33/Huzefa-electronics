import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Bot, User, ArrowRight, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../../types';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProducts?: Product[];
  timestamp: string;
}

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: 'Welcome to Huzefa Electronics Concierge. I am your personal luxury technology advisor. Whether you are calibrating an 8K home theater, seeking an RTX 4090 workstation, or discovering reference-grade spatial audio, how may I assist you today?',
      timestamp: 'Just now',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const quickQueries = [
    'Recommend the best gaming laptop for 4K ray tracing',
    'Best spatial audio earbuds with hybrid ANC',
    'Compare 8K OLED TV vs Mini-LED displays',
    'Which flagship phone has 200MP periscope zoom?',
  ];

  const handleSend = async (userText: string) => {
    const query = userText.trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Try calling server endpoint /api/assistant; fallback to smart local recommendation engine
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          const matchedProducts = findRelevantProducts(query, products);
          setMessages((prev) => [
            ...prev,
            {
              id: `ai-${Date.now()}`,
              sender: 'ai',
              text: data.reply,
              recommendedProducts: matchedProducts.slice(0, 2),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      // Fallback
    }

    // Local Intelligent Response Engine
    setTimeout(() => {
      const { reply, matched } = generateSmartResponse(query, products);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          recommendedProducts: matched.slice(0, 2),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setLoading(false);
    }, 600);
  };

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
            className="relative w-full max-w-lg bg-[#0a3239] border-l border-[#8B9095]/30 text-slate-100 flex flex-col h-full z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#8B9095]/20 bg-[#09292f]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0E4D57] to-[#8B9095] flex items-center justify-center text-white border border-[#8B9095]/40 shadow-sm">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white flex items-center gap-1.5">
                    Huzefa AI Concierge
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h3>
                  <span className="text-[11px] text-slate-300">
                    Luxury Electronics & Acoustic Consultant
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Questions Bar */}
            <div className="px-4 py-2.5 bg-[#072429] border-b border-[#8B9095]/20 overflow-x-auto whitespace-nowrap flex gap-2 text-xs scrollbar-none">
              {quickQueries.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1 rounded-full bg-[#0E4D57]/70 hover:bg-[#0E4D57] border border-[#8B9095]/30 text-slate-200 transition-colors shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-[#0E4D57] border border-[#8B9095]/40 flex items-center justify-center shrink-0 text-cyan-300 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-2 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#8B9095] text-slate-950 font-medium rounded-tr-none shadow-md'
                          : 'bg-[#0e434c] text-slate-100 border border-[#8B9095]/20 rounded-tl-none'
                      }`}
                    >
                      {m.text}
                    </div>

                    {/* Interactive Product recommendation cards */}
                    {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                      <div className="space-y-2 pt-1 w-full">
                        {m.recommendedProducts.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-[#072429] border border-[#8B9095]/30 hover:border-cyan-400/40 transition-all text-xs"
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-12 h-12 object-contain rounded bg-[#0a3239] p-1"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-white truncate">{p.name}</h5>
                              <span className="font-bold text-cyan-300 block">
                                ${p.price.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  onSelectProduct(p);
                                  onClose();
                                }}
                                className="p-1.5 rounded-lg bg-[#0e434c] hover:bg-slate-700 text-slate-200"
                                title="Inspect 3D"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onAddToCart(p)}
                                className="px-2 py-1 rounded-lg bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold flex items-center gap-1"
                              >
                                <ShoppingCart className="w-3 h-3" />
                                Add
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <span className="text-[10px] text-slate-400 block px-1">
                      {m.timestamp}
                    </span>
                  </div>

                  {m.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-[#8B9095] flex items-center justify-center shrink-0 text-slate-950 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 items-center text-xs text-slate-400">
                  <div className="w-7 h-7 rounded-full bg-[#0E4D57] flex items-center justify-center shrink-0 text-cyan-300">
                    <Bot className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div className="flex items-center gap-1 bg-[#0e434c] p-3 rounded-2xl rounded-tl-none border border-[#8B9095]/20">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-4 border-t border-[#8B9095]/20 bg-[#09292f] flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask about specs, acoustics, 3D showroom models..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#072429] border border-[#8B9095]/30 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-slate-300"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 bg-[#8B9095] hover:bg-slate-200 disabled:opacity-40 text-slate-950 rounded-xl font-bold transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Helper: matches products based on query keywords
function findRelevantProducts(query: string, products: Product[]): Product[] {
  const q = query.toLowerCase();
  return products.filter((p) => {
    return (
      q.includes(p.category) ||
      q.includes(p.brand.toLowerCase()) ||
      p.name.toLowerCase().split(' ').some((w) => w.length > 3 && q.includes(w)) ||
      (q.includes('gaming') && p.category === 'gaming') ||
      (q.includes('earbud') && p.category === 'audio') ||
      (q.includes('tv') && p.category === 'tvs') ||
      (q.includes('camera') && p.category === 'cameras') ||
      (q.includes('laptop') && (p.category === 'laptops' || p.category === 'gaming')) ||
      (q.includes('phone') && p.category === 'smartphones')
    );
  });
}

function generateSmartResponse(query: string, products: Product[]) {
  const q = query.toLowerCase();
  const matched = findRelevantProducts(query, products);

  if (q.includes('gaming') || q.includes('laptop') || q.includes('rtx')) {
    const laptop = products.find((p) => p.id === 'huzefa-titan-blade-rtx4090') || products[0];
    return {
      reply: `For demanding 4K gaming and generative rendering, our flagship recommendation is the ${laptop.name}. It delivers an unlocked NVIDIA RTX 4090 with 175W Max TGP, paired with a breathtaking 240Hz Mini-LED display and liquid metal vapor chamber cooling. We also have an active 40% OFF showroom drop right now with code TITAN40.`,
      matched: [laptop],
    };
  }

  if (q.includes('audio') || q.includes('earbud') || q.includes('headphone') || q.includes('sound')) {
    const audio = products.find((p) => p.category === 'audio') || products[3];
    return {
      reply: `If audio fidelity and acoustic isolation are paramount, the ${audio.name} utilizes balanced armature drivers with 24-bit/96kHz LDAC lossless streaming and 48dB adaptive hybrid noise cancellation. It creates an expansive 360-degree spatial soundstage calibrated to your ear morphology.`,
      matched: [audio],
    };
  }

  if (q.includes('tv') || q.includes('oled') || q.includes('display') || q.includes('screen')) {
    const tv = products.find((p) => p.category === 'tvs') || products[2];
    return {
      reply: `Between 8K OLED evo and Mini-LED, OLED delivers true infinite contrast with zero blooming since each pixel is self-illuminating. The ${tv.name} features Sony's Cognitive XR neural processor and Acoustic Surface Audio+ that vibrates sound directly through the glass, making external center channels unnecessary.`,
      matched: [tv],
    };
  }

  if (q.includes('phone') || q.includes('camera') || q.includes('periscope')) {
    const phone = products.find((p) => p.category === 'smartphones') || products[1];
    return {
      reply: `For optical excellence, the ${phone.name} features a 200MP sensor paired with a 5x periscope telephoto lens housed inside an aerospace grade-5 titanium unibody. It provides superior anti-reflective glass and stunning dynamic range under direct sunlight.`,
      matched: [phone],
    };
  }

  return {
    reply: `I have analyzed our Huzefa Electronics showroom inventory. Every device in our collection represents the pinnacle of Apple × Samsung × Sony engineering, backed by our complimentary 3-Year Platinum Care warranty and White-Glove delivery. Here are two standout references tailored to your interest:`,
    matched: matched.length > 0 ? matched : products.slice(0, 2),
  };
}
