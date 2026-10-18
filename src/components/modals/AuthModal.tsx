import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, User, ShieldCheck, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onLoginSuccess(name || 'Huzefa VIP Client');
      setSuccess(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
          className="relative w-full max-w-md bg-[#0a3239] border border-[#8B9095]/40 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#8B9095]/20 bg-[#09292f]">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-300" />
              <h3 className="font-display font-bold text-base text-white">
                Huzefa Concierge Member Access
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-1.5 bg-[#072429] m-6 mb-0 rounded-xl border border-[#8B9095]/20 text-xs font-semibold">
            <button
              onClick={() => setTab('login')}
              className={`py-2 rounded-lg transition-all ${
                tab === 'login'
                  ? 'bg-[#8B9095] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`py-2 rounded-lg transition-all ${
                tab === 'register'
                  ? 'bg-[#8B9095] text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Showroom Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {tab === 'register' && (
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Sterling"
                    className="w-full bg-[#072429] border border-[#8B9095]/30 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-slate-300"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                VIP Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@luxury.com"
                  className="w-full bg-[#072429] border border-[#8B9095]/30 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#072429] border border-[#8B9095]/30 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-slate-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#8B9095] hover:bg-slate-200 text-slate-950 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              {success ? (
                <>
                  <Check className="w-4 h-4" /> Welcome to Huzefa VIP
                </>
              ) : tab === 'login' ? (
                'Authenticate VIP Access'
              ) : (
                'Register Showroom Profile'
              )}
            </button>

            <div className="text-center pt-2">
              <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Single Sign-On with Apple ID & Google Workspace supported
              </span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
