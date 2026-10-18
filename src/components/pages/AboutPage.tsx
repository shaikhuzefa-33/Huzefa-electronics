import React from 'react';
import { ShieldCheck, Truck, Cpu, Award, Users, Sparkles, CheckCircle2, Globe } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Huzefa Qureshi',
      role: 'Founder & Chief Showroom Architect',
      bio: 'Former acoustics consultant and industrial designer. Dedicated to merging unibody aerospace materials with studio-grade audio transducers.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Elena Rostova',
      role: 'VP of Acoustic Engineering',
      bio: 'Pioneered custom balanced armature drivers and psychoacoustic spatial algorithms over 15 years in Zurich research labs.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Kenji Takahashi',
      role: 'Director of Display Calibration',
      bio: 'Master Calman calibrator for international film academies and creator of our 8K micro-luma testing suite.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Julian Sterling',
      role: 'Head of White-Glove Logistics',
      bio: 'Oversees our armored climate-controlled delivery fleet ensuring flawless handoffs directly to VIP clients globally.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const stats = [
    { label: 'Showroom Deliveries', value: '18,500+' },
    { label: 'Client Satisfaction', value: '99.8%' },
    { label: 'Countries Serviced', value: '42' },
    { label: 'Standard Warranty', value: '3 Years' },
  ];

  return (
    <div className="w-full bg-[#0E4D57] min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Philosophy Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8B9095] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> The Huzefa Design Manifesto
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            Where Apple Precision, Samsung Luminance, & Sony Acoustics Converge
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Founded on the premise that consumer electronics should be experienced as architectural artifacts — built with aerospace titanium, calibrated optics, and uncompromised audio purity.
          </p>
        </div>

        {/* Showroom Image Gallery Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden border border-[#8B9095]/30 h-72 group relative">
            <img
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80"
              alt="Showroom Acoustic Chamber"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061d21] via-transparent to-transparent flex items-end p-6">
              <div>
                <h4 className="text-sm font-bold text-white">Acoustic Testing Chambers</h4>
                <p className="text-xs text-slate-300">Calibrated for 0.001% Total Harmonic Distortion</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#8B9095]/30 h-72 group relative">
            <img
              src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80"
              alt="Cleanroom Silicon Staging"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061d21] via-transparent to-transparent flex items-end p-6">
              <div>
                <h4 className="text-sm font-bold text-white">Silicon Stress Testing</h4>
                <p className="text-xs text-slate-300">Vapor chamber thermals verified under 100% compute load</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[#8B9095]/30 h-72 group relative">
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
              alt="VIP Private Showroom Lounge"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061d21] via-transparent to-transparent flex items-end p-6">
              <div>
                <h4 className="text-sm font-bold text-white">Private Concierge Suites</h4>
                <p className="text-xs text-slate-300">By-appointment consultations for bespoke installations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Numerical Accolades */}
        <div className="bg-[#0a353c] border border-[#8B9095]/30 rounded-2xl p-8 sm:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-xl">
          {stats.map((st) => (
            <div key={st.label} className="space-y-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                {st.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-[#8B9095] block font-semibold">
                {st.label}
              </span>
            </div>
          ))}
        </div>

        {/* 4 Core Pillars of Service */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B9095]">
              Showroom Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              The Huzefa Client Guarantee
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#09333a] border border-[#8B9095]/25 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0E4D57] flex items-center justify-center text-cyan-300 border border-[#8B9095]/30">
                <Truck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">White-Glove Courier</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hand-delivered in tamper-evident sealed titanium flight cases with optional professional room setup.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#09333a] border border-[#8B9095]/25 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0E4D57] flex items-center justify-center text-cyan-300 border border-[#8B9095]/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">3-Year Platinum Care</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero-deductible hardware replacement, express loaner courier dispatch, and accidental liquid protection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#09333a] border border-[#8B9095]/25 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0E4D57] flex items-center justify-center text-cyan-300 border border-[#8B9095]/30">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Lab-Calibrated Silicon</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pre-calibrated delta-E &lt; 1.0 displays and precision acoustic driver balancing on each individual serial number.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#09333a] border border-[#8B9095]/25 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#0E4D57] flex items-center justify-center text-cyan-300 border border-[#8B9095]/30">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Trade-In Concierge</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Seamless upgrade pathway allowing up to 70% residual trade credit toward next-generation flagship drops.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Team Section */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8B9095]">
              Leadership & Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight mt-1">
              Meet the Showroom Architects
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl bg-[#09333a] border border-[#8B9095]/25 overflow-hidden group hover:border-slate-300 transition-colors shadow-lg"
              >
                <div className="h-60 w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-bold text-white text-base font-display">
                    {member.name}
                  </h4>
                  <span className="text-xs text-cyan-300 font-medium block">
                    {member.role}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
