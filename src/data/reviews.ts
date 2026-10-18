import { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alexander Vance',
    role: 'Acoustic Director, London Soundworks',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'February 28, 2026',
    title: 'The Acoustic Pro Spatial ANC rival our $2,000 mastering monitors',
    comment: 'Huzefa Electronics represents the rare intersection of Apple-level unibody design and Sony reference studio acoustics. The spatial separation and noise isolation floor are genuinely unmatched.',
    productName: 'Acoustic Pro Spatial ANC',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Elena Rostova',
    role: 'Senior VFX Supervisor, Solaris Studios',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'January 14, 2026',
    title: 'Titan Blade 18 rendered our 8K Red RAW footage without breaking a sweat',
    comment: 'The thermal architecture on the Titan Blade is extraordinary. 175W on the RTX 4090 with whisper-quiet fan curves in high-load render passes. Plus the deep teal luxury showroom finish looks stunning on desk.',
    productName: 'Titan Blade 18 Pro',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Marcus Sterling',
    role: 'Principal Architect, Horizon Design Collective',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: 'March 02, 2026',
    title: 'The 77" 8K OLED evo transformed our presentation lounge completely',
    comment: 'Flawless white-glove delivery and magnetic flush wall mounting. The acoustic surface audio vibrating through the panel makes dedicated center channels completely redundant. True showroom luxury.',
    productName: 'Cinematic Master 77" 8K',
    verified: true
  }
];

export const BRAND_PARTNERS = [
  { name: 'Apple', logoText: 'Apple Inc.', tag: 'Authorized Luxury Reseller' },
  { name: 'Samsung', logoText: 'Samsung Galaxy', tag: 'Master Display Partner' },
  { name: 'Sony', logoText: 'SONY Alpha & Cinema', tag: 'Reference Audio & Optical' },
  { name: 'Bose', logoText: 'BOSE Acoustic', tag: 'Acoustic Innovation' },
  { name: 'ASUS ROG', logoText: 'ROG Republic of Gamers', tag: 'Esports Hardware' },
  { name: 'Canon', logoText: 'Canon Cinema EOS', tag: 'Optical Heritage' },
  { name: 'Bang & Olufsen', logoText: 'B&O Audio', tag: 'Scandinavian Luxury' },
  { name: 'Leica', logoText: 'Leica Optics', tag: 'German Precision Glass' }
];
