import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Check,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactPageProps {
  onOpenAssistant: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenAssistant }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('appointment');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="w-full bg-[#0E4D57] min-h-screen py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#8B9095] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Showroom Advisory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight">
            Connect With Huzefa Concierge
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Book a private listening room appointment, request a customized workstation build, or speak directly with our acoustic engineers.
          </p>
        </div>

        {/* Split Screen Grid: Left Store Info + Map, Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Flagship Showroom & Live Map */}
          <div className="lg:col-span-5 space-y-6">
            {/* Showroom Card */}
            <div className="rounded-2xl bg-[#0a353c] border border-[#8B9095]/30 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0E4D57] border border-[#8B9095]/40 flex items-center justify-center text-cyan-300">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Flagship Tech Gallery
                  </h3>
                  <span className="text-xs text-slate-300">San Francisco Bay Showroom</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Gallery Address</strong>
                    <span>1000 Silicon Boulevard, Suite 400</span>
                    <span className="block text-slate-400">San Francisco, CA 94107</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">VIP Phone & WhatsApp</strong>
                    <span>+1 (800) 848-9332 (Toll Free)</span>
                    <span className="block text-slate-400">+1 (415) 890-4421 (Direct Showroom Line)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Private Inquiries</strong>
                    <span>concierge@huzefaelectronics.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Showroom Hours</strong>
                    <span>Monday – Saturday: 10:00 AM – 8:00 PM PST</span>
                    <span className="block text-slate-400">Sunday: By Private VIP Appointment Only</span>
                  </div>
                </div>
              </div>

              {/* Live Chat Status Banner */}
              <div className="p-4 rounded-xl bg-[#072429] border border-[#8B9095]/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="text-xs">
                    <span className="font-semibold text-white block">Concierge Online</span>
                    <span className="text-slate-400 text-[11px]">Average response: &lt; 2 mins</span>
                  </div>
                </div>
                <button
                  onClick={onOpenAssistant}
                  className="px-3 py-1.5 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Chat Live
                </button>
              </div>
            </div>

            {/* Stylized Interactive Showroom Map Visualizer */}
            <div className="rounded-2xl bg-[#0a353c] border border-[#8B9095]/30 overflow-hidden shadow-xl relative h-64">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80"
                alt="Silicon Valley Map"
                className="w-full h-full object-cover opacity-60 filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061d21] via-transparent to-[#061d21]/60" />

              {/* Stylized Map Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-2xl animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="mt-1 px-3 py-1 rounded-full bg-[#061d21]/90 backdrop-blur-md border border-[#8B9095]/40 text-xs font-bold text-white shadow-lg whitespace-nowrap">
                  Huzefa Flagship Showroom
                </div>
              </div>

              <div className="absolute bottom-3 left-3 text-[11px] text-slate-400 bg-[#072429]/80 px-2 py-1 rounded">
                Valet Parking & Secure Private Garage Available
              </div>
            </div>
          </div>

          {/* Right Column: Split Screen Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0a353c] border border-[#8B9095]/30 p-6 sm:p-10 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  Send a Private Concierge Message
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Please provide your inquiry details below. A senior electronics consultant will respond within 2 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-white">Message Transmitted</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
                    Thank you, {name || 'valued client'}. Your inquiry has been routed to our chief acoustics and display team.
                  </p>
                  <div className="text-xs bg-[#072429] p-3 rounded-lg border border-[#8B9095]/30 text-cyan-300 font-mono">
                    Ticket Ref: #HZF-CONCIERGE-7182
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Dr. Arthur Pendelton"
                        className="w-full bg-[#072429] border border-[#8B9095]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        VIP Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@executive.com"
                        className="w-full bg-[#072429] border border-[#8B9095]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-slate-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-[#072429] border border-[#8B9095]/40 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-slate-200"
                    >
                      <option value="appointment">Private Showroom & Listening Suite Appointment</option>
                      <option value="bespoke">Bespoke Gaming Rig / Studio Workstation Build</option>
                      <option value="theater">8K Home Cinema Acoustic Calibration</option>
                      <option value="corporate">Corporate & VIP Fleet Allocation</option>
                      <option value="order">Order Tracking & White-Glove Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Your Message or Specification Notes *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Detail your requirements, room dimensions, or intended use cases..."
                      className="w-full bg-[#072429] border border-[#8B9095]/40 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-slate-200 resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Encrypted End-to-End Communications
                    </span>
                    <span>Direct Concierge Response</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#8B9095] hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-cyan-400/20"
                  >
                    <Send className="w-4 h-4" /> Send Showroom Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
