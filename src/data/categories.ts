import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-smartphones',
    key: 'smartphones',
    name: 'Smartphones & Wearables',
    tag: 'Titanium & Sapphire Glass',
    itemCount: 42,
    description: 'Aerospace-grade titanium frames, LTPO OLED displays, and periscope optical zoom systems designed for ultimate portability and power.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-[#0E4D57]/90 via-[#0a3a42]/70 to-[#8B9095]/40',
    highlights: ['Grade 5 Titanium', 'Periscope Zoom', 'Sapphire Dial Watches', 'Satellite SOS']
  },
  {
    id: 'cat-laptops',
    key: 'laptops',
    name: 'Ultra-Performance Laptops',
    tag: 'Silicon Mastery & CNC Craft',
    itemCount: 28,
    description: 'Precision milled unibody enclosures with Liquid Retina XDR and Mini-LED panels engineered for software architects, creators, and executives.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-[#0a3a42]/90 via-[#0E4D57]/80 to-[#1e2328]/60',
    highlights: ['Liquid Retina XDR', '22hr Endurance', 'Thunderbolt 4', 'Vapor Cooling']
  },
  {
    id: 'cat-gaming',
    key: 'gaming',
    name: 'Pro Gaming Rigs',
    tag: 'GeForce RTX 4090 & 240Hz',
    itemCount: 35,
    description: 'Uncompromising frame rates with liquid metal cooling, per-key mechanical actuation, and ultra-high refresh rate OLED displays.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-[#09333a]/90 via-[#0E4D57]/80 to-[#00E5FF]/20',
    highlights: ['RTX 4090 Max-TGP', '240Hz 0.2ms OLED', 'Tri-Fan Liquid Metal', 'Mechanical RGB']
  },
  {
    id: 'cat-tvs',
    key: 'tvs',
    name: 'Smart OLED & Mini-LED TVs',
    tag: 'Infinite Contrast & 8K HDR',
    itemCount: 19,
    description: 'Self-lit pixels, micro lens arrays, and cognitive neural processors delivering cinema master color accuracy right to your living gallery.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-[#0E4D57]/90 via-[#0b2b31]/80 to-[#8B9095]/30',
    highlights: ['8K OLED evo MLA+', 'Acoustic Surface Audio', '144Hz VRR Gaming', 'Dolby Vision IQ']
  },
  {
    id: 'cat-audio',
    key: 'audio',
    name: 'Hi-Fi & Spatial Audio',
    tag: 'Lossless Hi-Res & 48dB ANC',
    itemCount: 54,
    description: 'Custom tuned by acoustic engineers with planar magnetic drivers, spatialized head tracking, and lossless high-resolution audio codecs.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-[#0a3a42]/90 via-[#0E4D57]/70 to-[#C0C7CD]/30',
    highlights: ['LDAC 24-bit Lossless', 'Spatial Head Tracking', 'Hybrid 48dB ANC', 'Beryllium Drivers']
  },
  {
    id: 'cat-cameras',
    key: 'cameras',
    name: 'Cinema & Mirrorless Cameras',
    tag: '61MP BSI & 8K RAW Cinema',
    itemCount: 22,
    description: 'Full-frame back-illuminated sensors with AI subject tracking, 16-stop dynamic range, and internal cinematic RAW recording.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    gradient: 'from-[#09333a]/90 via-[#0E4D57]/80 to-[#8B9095]/50',
    highlights: ['61MP BSI Sensor', '8K 60p RAW Internal', 'AI Real-Time AF', '8.5-Stop In-Body IS']
  }
];
