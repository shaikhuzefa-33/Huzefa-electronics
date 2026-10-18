import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. Gaming Laptop (Hero item 1)
  {
    id: 'huzefa-titan-blade-rtx4090',
    name: 'Titan Blade 18 Pro',
    subtitle: 'Intel Core i9-14900HX • RTX 4090 16GB • 240Hz Mini-LED',
    category: 'gaming',
    brand: 'Huzefa',
    price: 3299,
    originalPrice: 3899,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    stockCount: 8,
    featured: true,
    deal: true,
    discountPercentage: 15,
    badge: '40% OFF Gaming Laptop Promo',
    description: 'Precision milled aerospace-grade aluminum chassis with vapor chamber cooling, per-key RGB mechanical switches, and stunning 18-inch 4K UHD Mini-LED display.',
    model3dType: 'laptop',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Titanium', hex: '#8B9095' },
      { name: 'Obsidian Teal', hex: '#0E4D57' },
      { name: 'Liquid Silver', hex: '#D1D5DB' }
    ],
    specs: {
      display: '18" Mini-LED 4K 240Hz 100% DCI-P3 1200 nits',
      processor: 'Intel Core i9-14900HX 24 cores / 32 threads 5.8GHz',
      storage: '4TB NVMe PCIe Gen 5 SSD + 64GB DDR5 5600MHz RAM',
      audio: 'Quad Studio Spatial Audio with Dolby Atmos',
      connectivity: 'Wi-Fi 7, Thunderbolt 4, HDMI 2.1, 2.5G LAN',
      weight: '2.7 kg (5.95 lbs)',
      warranty: '3-Year Huzefa Platinum Care'
    },
    keyFeatures: [
      'NVIDIA GeForce RTX 4090 with 175W Max TGP',
      'Vapor Chamber Liquid Metal thermal matrix',
      'Ultra-thin 19.9mm CNC aluminum architecture',
      'Thunderbolt 4 with 140W USB-PD reverse charging'
    ]
  },

  // 2. Smartphone (Hero item 2)
  {
    id: 'ultravision-pro-5g',
    name: 'UltraVision Pro 5G',
    subtitle: 'Titanium Frame • 200MP Periscope • Snapdragon 8 Gen 3',
    category: 'smartphones',
    brand: 'Samsung',
    price: 1299,
    originalPrice: 1449,
    rating: 4.9,
    reviewsCount: 318,
    inStock: true,
    stockCount: 15,
    featured: true,
    deal: true,
    discountPercentage: 10,
    badge: 'Flagship of the Year',
    description: 'Forged in grade 5 titanium with an edge-to-edge 6.8-inch Dynamic AMOLED 2X 120Hz display and a revolutionary 200MP ultra-stabilized optical sensor.',
    model3dType: 'phone',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Teal Frost', hex: '#0E4D57' },
      { name: 'Matte Slate', hex: '#8B9095' },
      { name: 'Starlight Silver', hex: '#E5E7EB' }
    ],
    specs: {
      display: '6.8" Quad HD+ Dynamic AMOLED 2X 1-120Hz LTPO',
      processor: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      battery: '5,000mAh with 45W HyperCharge & Qi2 Wireless',
      storage: '512GB UFS 4.0 Storage + 16GB LPDDR5X RAM',
      sensor: '200MP Main + 50MP 5x Periscope + 12MP Ultra-wide',
      warranty: '2-Year Worldwide Warranty'
    },
    keyFeatures: [
      'Space-grade Titanium Grade 5 frame with matte satin finish',
      'Corning Gorilla Armor anti-reflective glass',
      'Built-in S-Pen with 2.8ms low latency',
      'IP68 Submersion water & dust resistance'
    ]
  },

  // 3. Smart TV (Hero item 3)
  {
    id: 'cinematic-master-oled-77',
    name: 'Cinematic Master 77" 8K',
    subtitle: 'Self-Lit OLED evo • Neural AI Processor 8K • 144Hz VRR',
    category: 'tvs',
    brand: 'Sony',
    price: 3999,
    originalPrice: 4799,
    rating: 5.0,
    reviewsCount: 89,
    inStock: true,
    stockCount: 4,
    featured: true,
    deal: true,
    discountPercentage: 17,
    badge: 'Master Reference Series',
    description: 'Infinite contrast, pure obsidian blacks, and acoustic surface audio that radiates sound directly through the screen for a true Hollywood theater experience.',
    model3dType: 'tv',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Brushed Charcoal', hex: '#1E2328' },
      { name: 'Silver Bezel', hex: '#8B9095' },
      { name: 'Deep Teal Accent', hex: '#0E4D57' }
    ],
    specs: {
      display: '77" 8K OLED evo (7680 x 4320) with Micro Lens Array',
      processor: 'Cognitive Processor XR Neural Engine',
      audio: '60W 3.2 Channel Acoustic Surface Audio+ with Dual Subwoofers',
      connectivity: '4x HDMI 2.1 (4K 144Hz, eARC, ALLM, VRR), Wi-Fi 6E',
      warranty: '5-Year Panel Burn-in Protection'
    },
    keyFeatures: [
      'Micro Lens Array (MLA+) technology boosting brightness 70%',
      'Calman Verified studio color calibration',
      'Zero-gap flush wall mount magnetic chassis (4mm slim)',
      'IMAX Enhanced & Dolby Vision IQ with Precision Detail'
    ]
  },

  // 4. Wireless Earbuds (Hero item 4)
  {
    id: 'acoustic-pro-spatial-anc',
    name: 'Acoustic Pro Spatial ANC',
    subtitle: 'Lossless Hi-Res Audio • Dual Dynamic Drivers • 48dB Active Hybrid ANC',
    category: 'audio',
    brand: 'Sony',
    price: 299,
    originalPrice: 349,
    rating: 4.8,
    reviewsCount: 520,
    inStock: true,
    stockCount: 30,
    featured: true,
    deal: false,
    badge: 'Audiophile Choice',
    description: 'Precision balanced-armature drivers tuned by Grammy-winning audio engineers. Featuring 360 Reality Audio, adaptive wind noise reduction, and wireless charging case.',
    model3dType: 'earbuds',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian Teal', hex: '#0E4D57' },
      { name: 'Matte Aluminum', hex: '#8B9095' },
      { name: 'Pure White', hex: '#F9FAFB' }
    ],
    specs: {
      audio: 'LDAC Lossless 24-bit/96kHz + DSEE Extreme Engine',
      battery: '36 Hours playback with case (8 hrs on single charge)',
      connectivity: 'Bluetooth 5.4 Multipoint (pair 3 devices simultaneously)',
      weight: '4.8g per earbud',
      warranty: '2-Year Replacement Warranty'
    },
    keyFeatures: [
      'Dual feedback Active Noise Cancelling eliminating 99.4% ambient rumble',
      'Bone conduction voice sensors for crystal-clear phone calls',
      'IPX4 Sweat and moisture resistance',
      'Qi Wireless fast charging (5 mins charge = 90 mins playback)'
    ]
  },

  // 5. Smart Watch (Hero item 5)
  {
    id: 'chronos-titanium-elite',
    name: 'Chronos Titanium Elite',
    subtitle: 'Sapphire Crystal • ECG & Blood Oxygen • 100m Dive Rated',
    category: 'smartphones',
    brand: 'Apple',
    price: 799,
    originalPrice: 899,
    rating: 4.9,
    reviewsCount: 210,
    inStock: true,
    stockCount: 12,
    featured: true,
    deal: true,
    discountPercentage: 11,
    badge: 'Luxury Sport Edition',
    description: 'Forged in aerospace grade-5 titanium with laser-etched rotating bezel, dual-frequency GPS, and an ultra-bright 3000 nits sapphire glass dial.',
    model3dType: 'watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Titanium', hex: '#8B9095' },
      { name: 'Deep Sea Teal', hex: '#0E4D57' },
      { name: 'Space Black', hex: '#111827' }
    ],
    specs: {
      display: '1.92" Always-On Retina LTPO OLED 3000 nits peak',
      battery: 'Up to 72 hours Low Power Mode / 36 hours regular',
      sensor: 'ECG, SpO2, Skin Temp, Depth Gauge with Water Temp',
      connectivity: 'Cellular LTE 4G/5G, Dual-frequency L1/L5 GPS',
      warranty: '2-Year AppleCare+ Equivalent'
    },
    keyFeatures: [
      '49mm Aerospace grade titanium case with raised edge protection',
      'Customizable Action button with instant stopwatch or waypoint tracking',
      '86-decibel Siren audible up to 600 feet for emergency beacon',
      'MIL-STD 810H military shock and vibration certification'
    ]
  },

  // 6. DSLR Camera (Hero item 6)
  {
    id: 'alpha-lumix-8k-cine',
    name: 'Alpha Cine 8K Cinema',
    subtitle: '61MP Full-Frame BSI Sensor • 8K 60p RAW • 16-Stop Dynamic Range',
    category: 'cameras',
    brand: 'Sony',
    price: 3499,
    originalPrice: 3999,
    rating: 5.0,
    reviewsCount: 77,
    inStock: true,
    stockCount: 6,
    featured: true,
    deal: false,
    badge: 'Pro Cinematography',
    description: 'Designed for visionary filmmakers and high-end commercial photographers with real-time AI subject recognition autofocus and internal 16-bit RAW cinema recording.',
    model3dType: 'camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Magnesium', hex: '#8B9095' },
      { name: 'Teal Limited Edition', hex: '#0E4D57' },
      { name: 'Stealth Black', hex: '#0B0F14' }
    ],
    specs: {
      sensor: '61.0MP 35mm full-frame Exmor R CMOS BSI sensor',
      display: '3.2" 4-axis multi-angle touch LCD with 2.1M dots',
      processor: 'Dual BIONZ XR image processing engine with AI unit',
      connectivity: 'Full-size HDMI, USB-C 3.2 Gen 2 (10Gbps), Dual CFexpress Type A',
      weight: '723g (body only)',
      warranty: '3-Year Pro Master Warranty'
    },
    keyFeatures: [
      '8K 24p/25p and 4K 120p high frame rate without thermal throttling',
      '8-step optical in-body 5-axis image stabilization (IBIS)',
      'Next-gen AI real-time autofocus tracking humans, animals, birds, vehicles',
      'S-Cinetone color science with 15+ stops of dynamic range'
    ]
  },

  // 7. Premium Headphone
  {
    id: 'bose-quietcomfort-ultra-lux',
    name: 'QuietComfort Ultra Horizon',
    subtitle: 'World-Class Noise Cancellation • CustomTune • Spatial Audio',
    category: 'audio',
    brand: 'Bose',
    price: 429,
    originalPrice: 479,
    rating: 4.8,
    reviewsCount: 390,
    inStock: true,
    stockCount: 22,
    featured: true,
    deal: true,
    discountPercentage: 10,
    badge: 'Editor Choice',
    description: 'Immersive sound with breakthrough spatial audio that places music right in front of you. Ultra-plush protein leather ear cushions and custom tuned active cancellation.',
    model3dType: 'earbuds',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Teal Harbor', hex: '#0E4D57' },
      { name: 'Matte Silver', hex: '#8B9095' },
      { name: 'White Smoke', hex: '#F3F4F6' }
    ],
    specs: {
      battery: '24 Hours battery life (18 hrs with Immersive Audio)',
      audio: 'CustomTune acoustic calibration tailored to user ear shape',
      connectivity: 'Bluetooth 5.3 with Snapdragon Sound & aptX Adaptive',
      weight: '252 grams'
    },
    keyFeatures: [
      'Proprietary Bose Immersive Audio spatialized acoustic stage',
      'SimpleSync connectivity with Bose Smart Soundbars',
      'Touch controls with volume capacitive strip'
    ]
  },

  // 8. MacBook Pro
  {
    id: 'macbook-pro-16-m3max',
    name: 'MacBook Pro 16 Liquid M3 Max',
    subtitle: '16-core CPU • 40-core GPU • 48GB Unified Memory • 1TB SSD',
    category: 'laptops',
    brand: 'Apple',
    price: 3499,
    originalPrice: 3799,
    rating: 4.9,
    reviewsCount: 184,
    inStock: true,
    stockCount: 11,
    featured: true,
    deal: false,
    badge: 'Pro Creator',
    description: 'The most advanced Mac laptop ever built. Features Liquid Retina XDR display, up to 22 hours of battery life, and revolutionary hardware-accelerated ray tracing.',
    model3dType: 'laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Space Black', hex: '#1C1D1F' },
      { name: 'Silver Metallic', hex: '#D1D5DB' }
    ],
    specs: {
      display: '16.2" Liquid Retina XDR (3456 x 2234), 1600 nits peak, ProMotion 120Hz',
      processor: 'Apple M3 Max chip with 16-core CPU and 40-core GPU',
      battery: 'Up to 22 hours Apple TV app movie playback',
      audio: 'High-fidelity six-speaker sound system with force-cancelling woofers'
    },
    keyFeatures: [
      'Hardware-accelerated ray tracing and mesh shading',
      'Dynamic Caching allocating GPU memory in real-time',
      'Three Thunderbolt 4 ports, HDMI port, SDXC card slot, MagSafe 3'
    ]
  },

  // 9. ROG Zephyrus G16
  {
    id: 'rog-zephyrus-g16-oled',
    name: 'ROG Zephyrus G16 OLED',
    subtitle: 'Intel Core Ultra 9 • RTX 4080 • 2.5K 240Hz ROG Nebula OLED',
    category: 'gaming',
    brand: 'Asus ROG',
    price: 2699,
    originalPrice: 2999,
    rating: 4.8,
    reviewsCount: 115,
    inStock: true,
    stockCount: 7,
    featured: false,
    deal: true,
    discountPercentage: 10,
    badge: 'Slash Lighting',
    description: 'Precision CNC-machined aluminum with signature Slash Lighting diagonal matrix on the lid, ROG Intelligent Cooling with tri-fan technology and vapor chamber.',
    model3dType: 'laptop',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Eclipse Gray', hex: '#8B9095' },
      { name: 'Platinum White', hex: '#E5E7EB' }
    ],
    specs: {
      display: '16" 2.5K (2560x1600) 240Hz 0.2ms OLED Nebula Display',
      processor: 'Intel Core Ultra 9 185H with integrated Intel AI Boost NPU',
      storage: '2TB PCIe 4.0 NVMe SSD + 32GB LPDDR5X RAM'
    },
    keyFeatures: [
      'Sub-1.5cm thin form factor weighing only 1.85 kg',
      'Slash Lighting LED array with customizable matrix animations',
      'Wi-Fi 7 certification with ultra-low ping latency'
    ]
  },

  // 10. iPhone 16 Pro Max
  {
    id: 'iphone-16-pro-max-natural',
    name: 'iPhone 16 Pro Max',
    subtitle: 'Grade 5 Titanium • A18 Pro Bionic • Camera Control • 5x Optical',
    category: 'smartphones',
    brand: 'Apple',
    price: 1399,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 460,
    inStock: true,
    stockCount: 18,
    featured: true,
    deal: false,
    badge: 'Apple Intelligence',
    description: 'Strong and light titanium design with thinner borders, innovative Camera Control haptic sensor, and industry-leading battery longevity with A18 Pro chip.',
    model3dType: 'phone',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C2A88F' },
      { name: 'Natural Titanium', hex: '#8B9095' },
      { name: 'Deep Teal Special', hex: '#0E4D57' }
    ],
    specs: {
      display: '6.9" Super Retina XDR with ProMotion 120Hz & Always-On',
      processor: 'A18 Pro with 6-core GPU & 16-core Neural Engine',
      camera: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto'
    },
    keyFeatures: [
      'Action Button and dedicated tactile Camera Control interface',
      '4K 120 fps Dolby Vision cinematic video recording',
      'Spatial video & audio capture for Apple Vision Pro'
    ]
  },

  // 11. Canon EOS R5 Mark II
  {
    id: 'canon-eos-r5-mk2',
    name: 'Canon EOS R5 Mark II',
    subtitle: '45MP Back-Illuminated Stacked Sensor • Accelerated Capture • Eye Control AF',
    category: 'cameras',
    brand: 'Canon',
    price: 4299,
    originalPrice: 4599,
    rating: 4.9,
    reviewsCount: 64,
    inStock: true,
    stockCount: 5,
    featured: false,
    deal: true,
    discountPercentage: 7,
    badge: 'Pro Tier',
    description: 'Dual DIGIC Accelerator + DIGIC X processors for lightning 30fps burst shooting with eye-control autofocus that tracks where you look through the electronic viewfinder.',
    model3dType: 'camera',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#111827' },
      { name: 'Graphite Gray', hex: '#8B9095' }
    ],
    specs: {
      sensor: '45.0 Megapixel Full-Frame Back-Illuminated Stacked CMOS',
      display: '3.2" Vari-Angle Touchscreen LCD 2.1 million dots',
      video: '8K 60p RAW internal recording with Canon Log 2 and 3'
    },
    keyFeatures: [
      'Eye Control AF tracking subject wherever your pupil gazes',
      '8.5 stops Coordinated In-Body Image Stabilization',
      'Cinema EOS color profiles and waveform monitor tools'
    ]
  },

  // 12. Sony Bravia 9 Mini LED 85"
  {
    id: 'sony-bravia-9-mini-led-85',
    name: 'Sony BRAVIA 9 85" Flagship',
    subtitle: 'High Peak Luminance Mini LED • XR Backlight Master Drive • Studio Calibrated',
    category: 'tvs',
    brand: 'Sony',
    price: 4999,
    originalPrice: 5499,
    rating: 5.0,
    reviewsCount: 43,
    inStock: true,
    stockCount: 3,
    featured: false,
    deal: true,
    discountPercentage: 9,
    badge: 'Showroom Peak',
    description: 'Sony’s brightest 4K TV ever made with thousands of precisely controlled Mini LEDs delivering dazzling sunlight reflections and pitch black shadows.',
    model3dType: 'tv',
    image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Dark Silver Titanium', hex: '#8B9095' },
      { name: 'Showroom Teal Trim', hex: '#0E4D57' }
    ],
    specs: {
      display: '85" 4K Mini LED with XR Backlight Master Drive',
      audio: 'Acoustic Multi-Audio+ with Beam Tweeters in the upper frame',
      connectivity: 'Dual HDMI 2.1 4K 120Hz, Game Menu with crosshair overlay'
    },
    keyFeatures: [
      'XR Processor recognizing how humans see and hear in real life',
      'Anti-Reflection and X-Wide Angle glass panel for any room lighting',
      'Prime Video Calibrated Mode with Netflix Adaptive Calibrated Mode'
    ]
  }
];
