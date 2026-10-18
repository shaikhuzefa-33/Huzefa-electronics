import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(12);
  const [stage, setStage] = useState('Initializing 3D WebGL Shaders...');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setProgress(48);
      setStage('Loading High-Fidelity Studio Lighting & Materials...');
    }, 300);

    const timer2 = setTimeout(() => {
      setProgress(85);
      setStage('Calibrating Huzefa Precision Audio & Optics Engine...');
    }, 700);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStage('Entering Showroom...');
    }, 1100);

    const timer4 = setTimeout(() => {
      setVisible(false);
      onLoaded();
    }, 1450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onLoaded]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#09333a] via-[#0E4D57] to-[#062126] text-slate-100 select-none"
        >
          {/* Holographic Logo Emblem */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-2xl bg-[#0a3a42] border border-[#8B9095]/40 flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#8B9095]/20 to-transparent animate-pulse" />
              <div className="text-3xl font-display font-extrabold tracking-tighter text-white">
                H<span className="text-[#8B9095]">Z</span>
              </div>
            </div>
            {/* Pulsing ring */}
            <div className="absolute -inset-2 rounded-2xl border border-cyan-400/30 animate-ping opacity-30 pointer-events-none" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white mb-1">
            HUZEFA ELECTRONICS
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B9095] mb-8 font-medium">
            Next-Gen 3D Showroom Experience
          </p>

          {/* Progress Bar */}
          <div className="w-64 sm:w-80 bg-[#072429] rounded-full h-1.5 overflow-hidden border border-[#8B9095]/20 mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#8B9095] via-slate-200 to-cyan-300 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>{stage}</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>

          <div className="absolute bottom-8 text-[11px] text-slate-500 tracking-wider">
            Apple × Samsung × Sony Showroom Standard • 2026 Edition
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
