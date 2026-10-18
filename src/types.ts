export type Page = 'home' | 'shop' | 'categories' | 'deals' | 'compare' | 'about' | 'contact';

export type ProductModelType = 'laptop' | 'phone' | 'tv' | 'earbuds' | 'watch' | 'camera';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpecs {
  display?: string;
  processor?: string;
  battery?: string;
  storage?: string;
  connectivity?: string;
  audio?: string;
  sensor?: string;
  warranty?: string;
  weight?: string;
  dimensions?: string;
  camera?: string;
  video?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'smartphones' | 'laptops' | 'gaming' | 'tvs' | 'audio' | 'cameras';
  brand: 'Apple' | 'Samsung' | 'Sony' | 'Bose' | 'Asus ROG' | 'Canon' | 'Huzefa';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  deal?: boolean;
  discountPercentage?: number;
  badge?: string;
  description: string;
  model3dType: ProductModelType;
  image: string;
  galleryImages: string[];
  colors: ProductColor[];
  specs: ProductSpecs;
  keyFeatures: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface Category {
  id: string;
  key: Product['category'];
  name: string;
  tag: string;
  itemCount: number;
  description: string;
  image: string;
  gradient: string;
  highlights: string[];
  featured?: string[];
}

export interface Review {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verified: boolean;
}

export interface DealOffer {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  code: string;
  endsInHours: number;
  targetCategory: string;
  featuredProductId: string;
  image: string;
  badge: string;
}

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';
}

export interface OrderTrackResult {
  orderId: string;
  customerName: string;
  status: 'confirmed' | 'processing' | 'dispatched' | 'out_for_delivery' | 'delivered';
  currentCity: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
}
