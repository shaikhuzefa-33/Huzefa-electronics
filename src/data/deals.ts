import { DealOffer } from '../types';

export interface DealItem {
  id: string;
  productId: string;
  productName: string;
  dealPrice: number;
  originalPrice: number;
  discountPercentage: number;
  claimedStock: number;
  totalStock: number;
  image: string;
}

export interface ShowroomBundle {
  id: string;
  title: string;
  description: string;
  items: string[];
  originalTotal: number;
  bundlePrice: number;
  savings: number;
  image: string;
}

export const DEALS_AND_OFFERS: DealItem[] = [
  {
    id: 'deal-titan-blade',
    productId: 'huzefa-titan-blade-rtx4090',
    productName: 'Huzefa Titan Blade 18 Pro (RTX 4090)',
    dealPrice: 3299,
    originalPrice: 4299,
    discountPercentage: 23,
    claimedStock: 14,
    totalStock: 18,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'deal-cinematic-master',
    productId: 'cinematic-master-oled-77',
    productName: 'Sony Bravia XR Master 77" 8K OLED',
    dealPrice: 3999,
    originalPrice: 4799,
    discountPercentage: 17,
    claimedStock: 8,
    totalStock: 10,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'deal-acoustic-pro',
    productId: 'acoustic-pro-spatial-buds',
    productName: 'Acoustic Pro Spatial ANC Earbuds',
    dealPrice: 249,
    originalPrice: 299,
    discountPercentage: 16,
    claimedStock: 42,
    totalStock: 50,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'deal-ultravision-phone',
    productId: 'ultravision-pro-5g',
    productName: 'Samsung UltraVision Pro 5G Titanium',
    dealPrice: 1199,
    originalPrice: 1399,
    discountPercentage: 14,
    claimedStock: 26,
    totalStock: 30,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'deal-chronos-watch',
    productId: 'chronos-ultra-titanium-watch',
    productName: 'Chronos Ultra Titanium Sapphire Watch',
    dealPrice: 699,
    originalPrice: 799,
    discountPercentage: 12,
    claimedStock: 19,
    totalStock: 25,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'deal-alpha-cine',
    productId: 'lumix-alpha-cine-8k',
    productName: 'Sony Alpha Cine Master 8K Cinema Camera',
    dealPrice: 3499,
    originalPrice: 3899,
    discountPercentage: 10,
    claimedStock: 5,
    totalStock: 8,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  },
];

export const BUNDLES: ShowroomBundle[] = [
  {
    id: 'bundle-director',
    title: 'The Hollywood Director 8K Master Suite',
    description: 'Complete reference staging: 77" 8K OLED evo Display, Cinema 8K Camera Body, and Acoustic Pro Reference Monitoring.',
    items: [
      'Sony Bravia XR Master 77" 8K OLED evo TV',
      'Sony Alpha Cine Master 8K Camera',
      'Acoustic Pro Spatial ANC Earbuds with Lossless Case',
      'Complimentary Custom Wall Mounting & Professional Calman Room Calibration',
    ],
    originalTotal: 7997,
    bundlePrice: 6899,
    savings: 1098,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bundle-esports',
    title: 'Titan Ray-Tracing Esports Battle Station',
    description: 'Supreme competitive performance: 18" RTX 4090 Gaming Rig paired with Bose QuietComfort Ultra and High-Speed White-Glove Staging.',
    items: [
      'Huzefa Titan Blade 18 Pro (RTX 4090 / 64GB / 4TB)',
      'Bose QuietComfort Ultra Spatial Headphones',
      'Titanium Braided High-Throughput Power Conduit & Travel Flight Case',
      '3-Year Platinum White-Glove Accidental Hardware Care',
    ],
    originalTotal: 4728,
    bundlePrice: 3999,
    savings: 729,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
  },
];

export const DEALS: DealOffer[] = [
  {
    id: 'deal-titan-blade',
    title: 'Titan Blade 18 Pro Flash Drop',
    subtitle: 'NVIDIA RTX 4090 • 4TB Gen5 SSD • 240Hz Mini-LED',
    discount: '40% OFF Gaming Laptop',
    code: 'TITAN40',
    endsInHours: 14,
    targetCategory: 'gaming',
    featuredProductId: 'huzefa-titan-blade-rtx4090',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
    badge: 'Limited Showroom Allocation',
  },
];

export const COMBO_BUNDLES = BUNDLES;
