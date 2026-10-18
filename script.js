/**
 * Huzefa Electronics - Premium 3D Electronics Showroom
 * Main Application Logic & Interactivity
 */

(function () {
  'use strict';

  /* ==========================================================================
     0. LOADING SCREEN ANIMATION — % Counter
     ========================================================================== */
  (function initLoader() {
    const screen  = document.getElementById('loading-screen');
    const fill    = document.getElementById('loader-fill-bar');
    const pct     = document.getElementById('loader-percent');
    if (!screen || !fill || !pct) return;

    let progress = 0;
    const target = 100;
    // Simulate asset loading in ~2 seconds with slight randomness
    const interval = setInterval(() => {
      const step = Math.random() * 4 + 2;       // +2% to +6% per tick
      progress = Math.min(progress + step, target);
      fill.style.width = progress + '%';
      pct.textContent  = Math.floor(progress) + '%';
      if (progress >= target) {
        clearInterval(interval);
        // Short pause at 100%, then fade out
        setTimeout(() => {
          screen.classList.add('hidden');
          // Remove from DOM after transition ends (0.7s)
          setTimeout(() => screen.remove(), 750);
        }, 400);
      }
    }, 60);  // ~60ms ticks ≈ 2 seconds total to reach 100%
  })();

  /* ==========================================================================
     1. CATALOG DATA (Products, Categories, Deals, Reviews)
     ========================================================================== */
  const PRODUCTS = [
    {
      id: 'huzefa-titan-blade-rtx4090',
      name: 'Titan Blade 18 Pro',
      subtitle: 'Intel Core i9-14900HX • RTX 4090 16GB • 240Hz Mini-LED',
      category: 'gaming',
      brand: 'Huzefa Titan',
      price: 3299,
      originalPrice: 3899,
      rating: 4.9,
      reviewsCount: 142,
      inStock: true,
      stockCount: 8,
      featured: true,
      deal: true,
      discountPercentage: 15,
      badge: '40% OFF Gaming Promo',
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
        warranty: '3-Year Huzefa Platinum Care'
      },
      keyFeatures: [
        'NVIDIA GeForce RTX 4090 with 175W Max TGP',
        'Vapor Chamber Liquid Metal thermal matrix',
        'Ultra-thin 19.9mm CNC aluminum architecture',
        'Thunderbolt 4 with 140W USB-PD reverse charging'
      ]
    },
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
        storage: '512GB UFS 4.0 Storage + 16GB LPDDR5X RAM',
        audio: 'Stereo Spatial Audio with 32-bit Hi-Res DAC',
        connectivity: '5G Sub-6/mmWave, Wi-Fi 7, Bluetooth 5.4, UWB',
        warranty: '2-Year Worldwide Warranty'
      },
      keyFeatures: [
        'Space-grade Titanium Grade 5 frame with matte satin finish',
        'Corning Gorilla Armor anti-reflective glass',
        'Built-in S-Pen with 2.8ms low latency',
        'IP68 Submersion water & dust resistance'
      ]
    },
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
        { name: 'Deep Teal Accent', hex: '#0E4D57' },
        { name: 'Silver Bezel', hex: '#8B9095' },
        { name: 'Brushed Charcoal', hex: '#1E2328' }
      ],
      specs: {
        display: '77" 8K OLED evo (7680 x 4320) with Micro Lens Array',
        processor: 'Cognitive Processor XR Neural Engine',
        storage: '64GB Internal Storage + Android TV 14',
        audio: '60W 3.2 Channel Acoustic Surface Audio+ Dual Subs',
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
    {
      id: 'acoustic-pro-spatial-anc',
      name: 'Acoustic Pro Spatial ANC',
      subtitle: 'Lossless Hi-Res Audio • Dual Dynamic Drivers • 48dB ANC',
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
        display: 'OLED Smart Touch Charge Case Screen',
        processor: 'Sony V2 Integrated Audio Processor + QN2e',
        storage: 'N/A (36-Hour Case Battery Life)',
        audio: 'LDAC Lossless 24-bit/96kHz + DSEE Extreme Engine',
        connectivity: 'Bluetooth 5.4 Multipoint (pair 3 devices simultaneously)',
        warranty: '2-Year Replacement Warranty'
      },
      keyFeatures: [
        'Dual feedback Active Noise Cancelling eliminating 99.4% ambient rumble',
        'Bone conduction voice sensors for crystal-clear phone calls',
        'IPX4 Sweat and moisture resistance',
        'Qi Wireless fast charging (5 mins charge = 90 mins playback)'
      ]
    },
    {
      id: 'chronos-titanium-elite',
      name: 'Chronos Titanium Elite',
      subtitle: 'Sapphire Crystal • ECG & Blood Oxygen • 100m Dive Rated',
      category: 'watches',
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
        { name: 'Deep Sea Teal', hex: '#0E4D57' },
        { name: 'Natural Titanium', hex: '#8B9095' },
        { name: 'Space Black', hex: '#111827' }
      ],
      specs: {
        display: '1.92" Always-On Retina LTPO OLED 3000 nits peak',
        processor: 'Apple S9 SiP with 64-bit dual-core processor',
        storage: '64GB Internal Storage + eSIM 4G/5G Cellular',
        audio: 'Dual Directional Speakers + 86dB Emergency Siren',
        connectivity: 'Cellular LTE, Dual-frequency L1/L5 GPS, Bluetooth 5.3',
        warranty: '2-Year AppleCare+ Equivalent'
      },
      keyFeatures: [
        '49mm Aerospace grade titanium case with raised edge protection',
        'Customizable Action button with instant stopwatch or waypoint tracking',
        '86-decibel Siren audible up to 600 feet for emergency beacon',
        'MIL-STD 810H military shock and vibration certification'
      ]
    },
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
        { name: 'Teal Limited Edition', hex: '#0E4D57' },
        { name: 'Matte Magnesium', hex: '#8B9095' },
        { name: 'Stealth Black', hex: '#0B0F14' }
      ],
      specs: {
        display: '3.2" 4-axis multi-angle touch LCD with 2.1M dots',
        processor: 'Dual BIONZ XR image processing engine with AI unit',
        storage: 'Dual CFexpress Type A & SD UHS-II Slots',
        audio: 'Digital 24-bit 4-channel audio interface via Multi Interface Shoe',
        connectivity: 'Full-size HDMI, USB-C 3.2 Gen 2 (10Gbps), Wi-Fi 6',
        warranty: '3-Year Pro Master Warranty'
      },
      keyFeatures: [
        '8K 24p/25p and 4K 120p high frame rate without thermal throttling',
        '8-step optical in-body 5-axis image stabilization (IBIS)',
        'Next-gen AI real-time autofocus tracking humans, animals, birds, vehicles',
        'S-Cinetone color science with 15+ stops of dynamic range'
      ]
    },
    {
      id: 'leica-m11-monochrom-lux',
      name: 'Leica M11 Monochrom Titan',
      subtitle: '60MP Full-Frame BSI Sensor • ISO 125 to 200,000 • Pure Light',
      category: 'cameras',
      brand: 'Leica',
      price: 9195,
      originalPrice: 9495,
      rating: 5.0,
      reviewsCount: 34,
      inStock: true,
      stockCount: 2,
      featured: false,
      deal: false,
      badge: 'Collector Edition',
      description: 'The purest expression of black and white photography. Handcrafted in Wetzlar, Germany with solid titanium top plate and sapphire glass display.',
      model3dType: 'camera',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80',
      colors: [
        { name: 'Raw Titanium', hex: '#8B9095' },
        { name: 'Deep Teal Leatherette', hex: '#0E4D57' }
      ],
      specs: {
        display: '2.95" Active Matrix Touch LCD 2.33M dots',
        processor: 'Leica Maestro III Processor',
        storage: '256GB Internal High-Speed Storage + UHS-II SD',
        audio: 'N/A (Pure Still Photography)',
        connectivity: 'Apple MFi Certified, USB-C 3.1, Bluetooth 4.2',
        warranty: '5-Year Leica Heritage Guarantee'
      },
      keyFeatures: [
        'Triple Resolution Technology: 60MP, 36MP, or 18MP DNG RAW files',
        'Dedicated monochrome sensor without Bayer color filter array',
        'Solid titanium top and base plate CNC machined from single block',
        'Ultra-quiet mechanical shutter with 1/16,000s electronic shutter'
      ]
    },
    {
      id: 'studio-reference-soundbar-9',
      name: 'Studio Horizon 9.1.5 Soundbar',
      subtitle: 'Dolby Atmos • DTS:X • 1100W Peak System Power • Wireless Sub',
      category: 'audio',
      brand: 'Sony',
      price: 1899,
      originalPrice: 2199,
      rating: 4.9,
      reviewsCount: 115,
      inStock: true,
      stockCount: 9,
      featured: false,
      deal: true,
      discountPercentage: 14,
      badge: 'Spatial Audio Reference',
      description: 'World-first 5 upfiring channels creating a dome of acoustic immersion. Auto-room calibration tunes acoustic reflection waves in under 15 seconds.',
      model3dType: 'tv',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
      colors: [
        { name: 'Anodized Teal', hex: '#0E4D57' },
        { name: 'Matte Titanium', hex: '#8B9095' }
      ],
      specs: {
        display: 'OLED Status Display with capacitive touch control',
        processor: '32-Bit Floating Point DSP Audio Engine',
        storage: 'N/A (Network Audio Streaming)',
        audio: '9.1.5 Channel with 1100W Total Output Power',
        connectivity: 'HDMI eARC 2.1, AirPlay 2, Spotify Connect, Bluetooth LDAC',
        warranty: '3-Year Huzefa Platinum Care'
      },
      keyFeatures: [
        '10-inch Wireless Sealed Subwoofer with dual passive radiators',
        'Sound Field Optimization mapping ceiling height and reflections',
        'Acoustic Center Sync with Huzefa and Sony 8K TV series',
        'Hi-Res Audio Wireless certification with 24-bit 96kHz playback'
      ]
    },
    /* ── EXPANDED CATALOGUE (products 9–22) ─────────────────────── */
    {
      id: 'nova-slim-pro-14-oled',
      name: 'Nova Slim Pro 14 OLED',
      subtitle: 'Core Ultra 9 • OLED 2.8K 120Hz • 1.1 kg CNC Magnesium',
      category: 'gaming',
      brand: 'Huzefa Titan',
      price: 1899,
      originalPrice: 2199,
      rating: 4.8,
      reviewsCount: 204,
      inStock: true,
      stockCount: 14,
      featured: false,
      deal: true,
      discountPercentage: 14,
      badge: 'Ultra-thin Powerhouse',
      description: 'The thinnest 14-inch performance notebook ever engineered, wrapped in a single-piece CNC magnesium alloy chassis weighing just 1.1 kg.',
      model3dType: 'laptop',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Cosmic Slate', hex: '#1E2328' }, { name: 'Frost White', hex: '#F1F5F9' }],
      specs: { display: '14\" OLED 2.8K 120Hz 0.2ms', processor: 'Intel Core Ultra 9 185H 16c/22t', storage: '2TB PCIe Gen 5 + 32GB LPDDR5X', audio: 'Quad Smart Amp Spatial Audio', connectivity: 'Thunderbolt 4 x2, Wi-Fi 7, BT 5.4', warranty: '2-Year Global' },
      keyFeatures: ['1.1 kg vapor-phase magnesium', '100W GaN USB-C charging', 'Face unlock IR + fingerprint', 'Corning Gorilla Glass Victus lid']
    },
    {
      id: 'galaxy-fold-6-ultra',
      name: 'Galaxy Fold 6 Ultra',
      subtitle: 'Foldable 7.6\" AMOLED • Snapdragon 8 Gen 3 • S Pen Built-in',
      category: 'smartphones',
      brand: 'Samsung',
      price: 1999,
      originalPrice: 2199,
      rating: 4.8,
      reviewsCount: 187,
      inStock: true,
      stockCount: 10,
      featured: true,
      deal: true,
      discountPercentage: 9,
      badge: 'Fold Edition',
      description: 'The most advanced foldable on the planet – Galaxy AI, integrated S Pen, and a book-style 7.6-inch display that unfolds into a true tablet.',
      model3dType: 'phone',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Icy Blue', hex: '#94BDD5' }, { name: 'Phantom Black', hex: '#0B0F14' }],
      specs: { display: '7.6\" QXGA+ Dynamic AMOLED 2X 120Hz', processor: 'Snapdragon 8 Gen 3 for Galaxy', storage: '512GB UFS 4.0 + 12GB RAM', audio: 'Stereo Tuned by AKG', connectivity: '5G, Wi-Fi 7, Bluetooth 5.4, UWB', warranty: '2-Year Samsung Care' },
      keyFeatures: ['Armor Aluminum hinge with 200,000 fold cycles', 'AI-powered Live Translate in 13 languages', 'Flex mode split-screen productivity', 'Built-in S Pen magnetically latches']
    },
    {
      id: 'iphone-16-pro-max',
      name: 'iPhone 16 Pro Max',
      subtitle: 'A18 Pro Chip • 5x Tetraprism Camera • Titanium Design • 6.9\"',
      category: 'smartphones',
      brand: 'Apple',
      price: 1199,
      originalPrice: 1299,
      rating: 4.9,
      reviewsCount: 462,
      inStock: true,
      stockCount: 22,
      featured: true,
      deal: true,
      discountPercentage: 8,
      badge: 'Apple Pro Max',
      description: 'Desert-titanium finish, 48MP Fusion Camera with 5x optical zoom, ProRes 4K 120fps recording, and the revolutionary A18 Pro chip with Neural Engine.',
      model3dType: 'phone',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Desert Titanium', hex: '#9E8C7A' }, { name: 'Black Titanium', hex: '#1A1A1A' }, { name: 'White Titanium', hex: '#F2F2F0' }],
      specs: { display: '6.9\" Super Retina XDR ProMotion 120Hz Always-On', processor: 'Apple A18 Pro (3nm) 6-core GPU', storage: '1TB NVMe + 8GB RAM', audio: 'Spatial Audio Dolby Atmos 4 speaker', connectivity: '5G mmWave, Wi-Fi 7, BT 5.3, Ultra Wideband', warranty: '1-Year AppleCare included' },
      keyFeatures: ['Titanium aerospace Grade 5 unibody', 'ProRes 4K 120fps with 4K Dolby Vision', 'Emergency SOS via satellite', 'USB-C 3.2 Gen 2 10Gbps wired']
    },
    {
      id: 'pixel-9-pro-fold',
      name: 'Google Pixel 9 Pro XL',
      subtitle: 'Tensor G4 • 50MP Pro Triple Camera • Google AI Built-in',
      category: 'smartphones',
      brand: 'Google',
      price: 1099,
      originalPrice: 1199,
      rating: 4.7,
      reviewsCount: 231,
      inStock: true,
      stockCount: 17,
      featured: false,
      deal: true,
      discountPercentage: 8,
      badge: 'AI Photography',
      description: 'Powered by Google Tensor G4 and Gemini Nano on-device AI. Best-in-class camera system with Magic Eraser, Best Take, Photo Unblur and 7 years of OS updates.',
      model3dType: 'phone',
      image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Hazel', hex: '#8A8073' }, { name: 'Obsidian', hex: '#1A1D1E' }, { name: 'Porcelain', hex: '#EEE9E1' }],
      specs: { display: '6.8\" LTPO OLED 1-120Hz 2992×1344 1600 nits', processor: 'Google Tensor G4 (4nm)', storage: '256GB UFS 3.1 + 16GB RAM', audio: 'Stereo Spatial Audio dual speaker', connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, UWB, NFC', warranty: '1-Year + Pixel Protect' },
      keyFeatures: ['Gemini Nano on-device LLM for summarization', 'Real Tone tuned for diverse skin tones', 'Magic Eraser + Best Take AI photo editing', 'Earthquake & crisis alerts via Tensor']
    },
    {
      id: 'lg-c4-65-oled',
      name: 'LG C4 65\" OLED evo',
      subtitle: 'α9 AI Processor Gen7 • 4K 144Hz • ThinQ AI • WRGB OLED',
      category: 'tvs',
      brand: 'LG',
      price: 1799,
      originalPrice: 2299,
      rating: 4.9,
      reviewsCount: 341,
      inStock: true,
      stockCount: 7,
      featured: false,
      deal: true,
      discountPercentage: 22,
      badge: 'Gaming TV of the Year',
      description: 'Gallery-design OLED evo panel with perfect blacks and a 144Hz refresh rate. Preferred TV of PlayStation 5 and Xbox Series X gamers worldwide.',
      model3dType: 'tv',
      image: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Gallery Black', hex: '#111111' }],
      specs: { display: '65\" OLED evo 4K UHD 144Hz 0.1ms', processor: 'α9 AI Processor Gen7', storage: '40GB Internal + webOS 24', audio: '60W 4.2 Channel Dolby Atmos', connectivity: '4x HDMI 2.1, eARC, ALLM, VRR, Wi-Fi 6E', warranty: '5-Year OLED Panel Guarantee' },
      keyFeatures: ['4 HDMI 2.1 ports for 4 consoles simultaneously', 'Dolby Vision IQ + HDR10+ Adaptive', 'Game Dashboard with VRR/FreeSync/G-Sync', 'Perfect Black with OLED pixel-level dimming']
    },
    {
      id: 'bose-qc-ultra-headphones',
      name: 'Bose QC Ultra Headphones',
      subtitle: 'Immersive Audio • Dual Microphone ANC • 24h Battery',
      category: 'audio',
      brand: 'Bose',
      price: 349,
      originalPrice: 429,
      rating: 4.8,
      reviewsCount: 687,
      inStock: true,
      stockCount: 35,
      featured: false,
      deal: true,
      discountPercentage: 19,
      badge: 'ANC Champion',
      description: 'The gold standard of noise cancellation. Immersive Audio with head tracking delivers spatial sound as if you were physically inside the music.',
      model3dType: 'earbuds',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Cypress Green', hex: '#4A5D52' }, { name: 'Sandstone', hex: '#C9A98B' }, { name: 'Black', hex: '#1A1A1A' }],
      specs: { display: 'N/A', processor: 'Bose Ultra Audio Engine', storage: 'N/A', audio: 'TriPort acoustic + Active EQ + Immersive Audio', connectivity: 'Bluetooth 5.3 Multipoint, USB-C, 3.5mm analog', warranty: '1-Year Bose Warranty' },
      keyFeatures: ['World-leading Quiet Mode with CustomTune', 'Immersive Audio with head tracking', 'Shortcut button for voice assistant & modes', '24h wireless + 3h quick 15-min charge']
    },
    {
      id: 'apple-watch-ultra-2',
      name: 'Apple Watch Ultra 2',
      subtitle: '49mm Titanium • Dual Frequency GPS • 3000 nit MicroLED • 60h',
      category: 'watches',
      brand: 'Apple',
      price: 899,
      originalPrice: 999,
      rating: 4.9,
      reviewsCount: 334,
      inStock: true,
      stockCount: 8,
      featured: false,
      deal: true,
      discountPercentage: 10,
      badge: 'Adventure Edition',
      description: 'Engineered for extreme athletes and explorers. Certified to MIL-STD-810H, 100m dive rated, and packed with depth gauge, water temperature sensor, and Precision Finding.',
      model3dType: 'watch',
      image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Natural Titanium', hex: '#8B9095' }, { name: 'Black Titanium', hex: '#1A1A1A' }],
      specs: { display: '49mm Always-On Retina LTPO OLED 3000 nits', processor: 'Apple S9 SiP 64-bit dual-core', storage: '64GB + eSIM Cellular', audio: 'Dual speakers + 86dB emergency siren', connectivity: 'LTE, L1/L5 GPS, Bluetooth 5.3, Wi-Fi 6', warranty: '1-Year AppleCare' },
      keyFeatures: ['100m waterproof + Oceanic dive app', 'Dual-frequency L1/L5 GPS for peak accuracy', 'Action Button for instant sport tracking', '60h battery in Low Power Mode outdoors']
    },
    {
      id: 'samsung-galaxy-watch-7',
      name: 'Samsung Galaxy Watch 7',
      subtitle: 'BioActive Sensor • Sapphire Crystal • Sleep Coaching • Exynos W1000',
      category: 'watches',
      brand: 'Samsung',
      price: 399,
      originalPrice: 449,
      rating: 4.7,
      reviewsCount: 289,
      inStock: true,
      stockCount: 18,
      featured: false,
      deal: true,
      discountPercentage: 11,
      badge: 'Health Flagship',
      description: 'Advanced 3-in-1 BioActive sensor tracks heart rate, ECG, blood oxygen, and body composition with AI-powered coaching for sleep, fitness, and stress.',
      model3dType: 'watch',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Green', hex: '#3A6B50' }, { name: 'Cream', hex: '#E8DCC8' }, { name: 'Silver', hex: '#C0C0C0' }],
      specs: { display: '1.5\" Super AMOLED 480×480 2000 nits', processor: 'Exynos W1000 3nm 5-core', storage: '32GB + 2GB RAM', audio: 'Built-in Microphone & Speaker', connectivity: '4G LTE, Wi-Fi, BT 5.4, NFC, GPS', warranty: '2-Year Samsung Care+' },
      keyFeatures: ['3-in-1 BioActive sensor (5 health metrics)', 'AI-powered Energy Score for daily readiness', 'Sapphire crystal glass display', '40h battery with Advanced Power Saving']
    },
    {
      id: 'dji-osmo-action-5-pro',
      name: 'DJI Osmo Action 5 Pro',
      subtitle: '4K 120fps • 10-Bit D-Log M • 39m Waterproof • 4.5h Battery',
      category: 'cameras',
      brand: 'DJI',
      price: 549,
      originalPrice: 599,
      rating: 4.8,
      reviewsCount: 156,
      inStock: true,
      stockCount: 21,
      featured: false,
      deal: false,
      badge: 'Action Camera Elite',
      description: 'The most capable action camera ever made by DJI. Record in 4K 120fps with 10-bit D-Log M color profile, waterproof to 39 meters without any housing.',
      model3dType: 'camera',
      image: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Black', hex: '#1A1A1A' }],
      specs: { display: '2.5\" + 1.4\" Dual Touch Screens', processor: 'DJI Flagship 4K Image Processor', storage: 'MicroSD up to 2TB (UHS-I/II)', audio: '3-Channel Wind Noise Reduction', connectivity: 'Bluetooth 5.0, Wi-Fi 2.4/5GHz, USB-C', warranty: '1-Year DJI Care Express' },
      keyFeatures: ['39m waterproof without housing', '4.5h battery (longest in class)', 'RockSteady + HorizonSteady stabilization', '10-Bit D-Log M cinematic color profile']
    },
    {
      id: 'ipad-pro-m4-13',
      name: 'iPad Pro M4 13\"',
      subtitle: 'Apple M4 Chip • Ultra Retina XDR Tandem OLED • 5.1mm Thin',
      category: 'gaming',
      brand: 'Apple',
      price: 1299,
      originalPrice: 1499,
      rating: 4.9,
      reviewsCount: 392,
      inStock: true,
      stockCount: 11,
      featured: true,
      deal: true,
      discountPercentage: 13,
      badge: "World's Thinnest Tablet",
      description: 'The thinnest Apple product ever at 5.1mm. Powered by M4 chip with Tandem OLED Ultra Retina XDR display delivering 1000 nits sustained brightness.',
      model3dType: 'laptop',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Space Black', hex: '#1A1A1A' }, { name: 'Silver', hex: '#C0C0C0' }],
      specs: { display: '13\" Tandem OLED Ultra Retina XDR 2752×2064', processor: 'Apple M4 10-core CPU / 10-core GPU', storage: '2TB NVMe + 16GB Unified RAM', audio: 'Quad Speaker Array Spatial Audio', connectivity: 'Thunderbolt 4, Wi-Fi 6E, BT 5.3, 5G eSIM', warranty: '1-Year AppleCare' },
      keyFeatures: ['5.1mm thinnest Apple product ever made', 'Apple Pencil Pro + Magic Keyboard compatible', 'ProRes video with up to 4K 60fps capture', 'Face ID landscape or portrait unlocking']
    },
    {
      id: 'akg-n9-hybrid-anc',
      name: 'AKG N9 Hybrid ANC',
      subtitle: 'Reference Over-ear • 50mm XL Drivers • 30h Adaptive ANC',
      category: 'audio',
      brand: 'AKG',
      price: 449,
      originalPrice: 549,
      rating: 4.7,
      reviewsCount: 144,
      inStock: true,
      stockCount: 12,
      featured: false,
      deal: true,
      discountPercentage: 18,
      badge: 'Studio Reference',
      description: 'Audiophile-tuned 50mm XL drivers deliver ultra-wide soundstage. Adaptive ANC with transparency mode and 30h wireless battery life.',
      model3dType: 'earbuds',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Midnight Blue', hex: '#1E3A5F' }, { name: 'Champagne Gold', hex: '#C9A84C' }],
      specs: { display: 'N/A', processor: 'AKG AmbientAware DSP', storage: 'N/A', audio: '50mm XL drivers + AKG Adaptive ANC', connectivity: 'Bluetooth 5.2 Multipoint, 3.5mm, USB-C', warranty: '2-Year AKG Warranty' },
      keyFeatures: ['50mm XL drivers with 5–40,000Hz response', 'Adaptive 4-Microphone ANC hybrid', 'Foldable aviation-grade aluminum frame', '30h ANC-on / 40h ANC-off battery']
    },
    {
      id: 'razer-deathstalker-v2-pro',
      name: 'Razer DeathStalker V2 Pro',
      subtitle: 'Linear Red Switches • Ultra-Low Profile • 40h Battery • 2.4GHz',
      category: 'gaming',
      brand: 'Razer',
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviewsCount: 312,
      inStock: true,
      stockCount: 28,
      featured: false,
      deal: true,
      discountPercentage: 20,
      badge: 'Esports Wireless',
      description: 'Ultra-thin 22mm low-profile gaming keyboard with Razer HyperSpeed 2.4GHz wireless, optical switch actuation, and per-key Chroma RGB in an aluminum frame.',
      model3dType: 'laptop',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Stealth Black', hex: '#0D0D0D' }, { name: 'Mercury White', hex: '#E8E8E8' }],
      specs: { display: 'N/A', processor: 'HyperSpeed 2.4GHz Wireless', storage: 'N/A (Onboard 5 profile memory)', audio: 'N/A', connectivity: '2.4GHz + Bluetooth 5.0 dual-mode', warranty: '2-Year Razer Warranty' },
      keyFeatures: ['22mm ultra-low profile chassis', 'Optical Linear Red switches 0.2ms actuation', '40h battery per charge', 'Per-key Chroma RGB 16.8M colors']
    },
    {
      id: 'dell-u3223qe-4k-usbc',
      name: 'Dell UltraSharp 32 4K USB-C',
      subtitle: 'IPS Black Panel • 4K 60Hz • USB-C 90W • Thunderbolt 4 Hub',
      category: 'tvs',
      brand: 'Dell',
      price: 899,
      originalPrice: 1099,
      rating: 4.8,
      reviewsCount: 267,
      inStock: true,
      stockCount: 13,
      featured: false,
      deal: true,
      discountPercentage: 18,
      badge: 'Pro Creator Display',
      description: 'The world-class IPS Black panel delivers 2000:1 contrast ratio — double standard IPS — with factory-calibrated ΔE<2 color accuracy for creative professionals.',
      model3dType: 'tv',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a573d1b371?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Platinum Silver', hex: '#D0D3D4' }],
      specs: { display: '31.5\" IPS Black 4K UHD 3840×2160 60Hz', processor: 'N/A (Monitor)', storage: 'N/A', audio: 'N/A', connectivity: 'Thunderbolt 4, USB-C 90W, 4x USB-A, RJ-45', warranty: '3-Year Advanced Exchange' },
      keyFeatures: ['IPS Black 2000:1 contrast (2× standard IPS)', 'Factory-calibrated ΔE<2 accuracy', '90W USB-C power delivery to laptop', 'Built-in Thunderbolt 4 / USB hub']
    },
    {
      id: 'logitech-mx-master-3s',
      name: 'Logitech MX Master 3S',
      subtitle: 'Quiet Clicks • 8K DPI • MagSpeed Scroll • Multi-Device',
      category: 'gaming',
      brand: 'Logitech',
      price: 99,
      originalPrice: 119,
      rating: 4.8,
      reviewsCount: 1042,
      inStock: true,
      stockCount: 50,
      featured: false,
      deal: false,
      badge: 'Best Seller',
      description: 'The world\'s most advanced computer mouse. Electromagnetic MagSpeed scroll wheel, 8000 DPI Darkfield tracking on any surface including glass.',
      model3dType: 'laptop',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1000&q=80',
      colors: [{ name: 'Graphite', hex: '#404040' }, { name: 'Pale Grey', hex: '#D8D8D8' }, { name: 'Midnight Teal', hex: '#0E4D57' }],
      specs: { display: 'N/A', processor: 'N/A', storage: 'N/A', audio: 'N/A', connectivity: 'Bluetooth 5 + 2.4GHz USB-A Logi Bolt', warranty: '2-Year Logitech Hardware' },
      keyFeatures: ['8000 DPI optical sensor tracks on glass', 'MagSpeed electromagnet scroll 1000 lps', 'Connect up to 3 devices / flow between screens', '70-day battery on full charge']
    }
  ];

  const CATEGORIES = [
    {
      id: 'gaming',
      name: 'Gaming Workstations',
      description: 'Aerospace aluminum chassis with RTX 4090 vapor cooling and 240Hz Mini-LED calibrated panels.',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
      itemCount: 4
    },
    {
      id: 'smartphones',
      name: 'Flagship Smartphones',
      description: 'Titanium Grade 5 unibody frames, 200MP periscope sensors, and 120Hz LTPO Dynamic AMOLED.',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      itemCount: 6
    },
    {
      id: 'tvs',
      name: '8K OLED evo Displays',
      description: 'Micro Lens Array self-lit panels with infinite contrast, obsidian blacks, and acoustic surface audio.',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
      itemCount: 3
    },
    {
      id: 'audio',
      name: 'Lossless Hi-Fi Audio',
      description: 'Audiophile grade balanced armatures, LDAC 24-bit/96kHz transmission, and 48dB hybrid active cancellation.',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      itemCount: 5
    },
    {
      id: 'watches',
      name: 'Titanium Smart Watches',
      description: 'Sapphire crystal dials, 3000 nits peak brightness, ECG sensors, and 100m water submersion rating.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      itemCount: 4
    },
    {
      id: 'cameras',
      name: 'Cinema 8K Optics',
      description: 'Full-frame 61MP BSI sensors, internal 16-bit RAW capture, and 16 stops of dynamic range.',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      itemCount: 3
    }
  ];

  const HOTSPOTS_MAP = {
    laptop: [
      { x: 32, y: 35, title: '18" 4K Mini-LED 240Hz', desc: '100% DCI-P3 color calibrated at 1200 nits' },
      { x: 68, y: 65, title: 'RTX 4090 16GB VRAM', desc: 'Vapor chamber liquid metal cooling up to 175W TGP' },
      { x: 22, y: 72, title: 'Thunderbolt 4 & Wi-Fi 7', desc: 'High-throughput 40Gbps bidirectional transfer' }
    ],
    phone: [
      { x: 65, y: 28, title: '200MP Periscope ISOCELL', desc: '5x Optical Zoom with Dual OIS Stabilization' },
      { x: 42, y: 48, title: 'Dynamic AMOLED 2X 120Hz', desc: 'LTPO 1-120Hz with Corning Gorilla Armor' },
      { x: 50, y: 82, title: 'Grade-5 Titanium Frame', desc: 'Aerospace structural rigidity with satin finish' }
    ],
    tv: [
      { x: 50, y: 30, title: '8K OLED evo MLA+ Panel', desc: 'Micro Lens Array boosting brightness by 70%' },
      { x: 25, y: 70, title: 'Acoustic Surface Audio+', desc: 'Sound radiates directly through the vibrating panel' },
      { x: 75, y: 70, title: 'Cognitive Processor XR', desc: 'Neural AI upscaling of real-time 8K textures' }
    ],
    earbuds: [
      { x: 38, y: 40, title: 'Dual Balanced Armatures', desc: 'LDAC Lossless 24-bit/96kHz high-resolution audio' },
      { x: 62, y: 42, title: '48dB Hybrid ANC', desc: 'Bone conduction sensors eliminating 99.4% noise' },
      { x: 50, y: 75, title: 'Qi Wireless Capsule', desc: '36-Hour playback with aluminum hinge enclosure' }
    ],
    watch: [
      { x: 50, y: 38, title: 'Sapphire Crystal Dial', desc: 'Always-on LTPO OLED reaching 3000 nits' },
      { x: 30, y: 55, title: 'Titanium 49mm Unibody', desc: '100m water resistant with depth gauge sensors' },
      { x: 70, y: 60, title: 'ECG & Vital Array', desc: 'Continuous SpO2, skin temp, and heart monitoring' }
    ],
    camera: [
      { x: 42, y: 45, title: 'Full-Frame 8K Cinema Sensor', desc: '16 stops dynamic range with dual native ISO' },
      { x: 68, y: 48, title: 'Fluorite Multi-Coated Lens', desc: '0.001% chromatic aberration optical glass' },
      { x: 50, y: 78, title: 'Magnesium Weather Seal', desc: 'Active cooling exhaust for unlimited 8K capture' }
    ]
  };

  /* ==========================================================================
     2. APPLICATION STATE
     ========================================================================== */
  const state = {
    currentPage: 'home',
    heroProducts: PRODUCTS.slice(0, 6),
    heroIndex: 0,
    heroColorIndex: 0,
    heroViewMode: '3d', // 'photo' or '3d'
    isAutoPlaying: true,
    autoPlayTimer: null,
    
    // Shop Filters
    selectedCategory: 'all',
    selectedBrand: 'all',
    maxPrice: 5000,
    sortBy: 'featured',
    viewMode: 'grid', // 'grid' or 'list'
    inStockOnly: false,
    
    // Storage
    cart: JSON.parse(localStorage.getItem('huzefa_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('huzefa_wishlist') || '[]'),
    compareIds: ['huzefa-titan-blade-rtx4090', 'ultravision-pro-5g', 'cinematic-master-oled-77'],
    discountPercent: 0,
    appliedCoupon: '',
    
    // Active inspecting product
    inspectProduct: PRODUCTS[0],
    inspectColorIndex: 0,
    inspectQty: 1,
    
    // User
    user: JSON.parse(localStorage.getItem('huzefa_user') || 'null')
  };

  let heroViewer = null;
  let quickviewViewer = null;

  /* ==========================================================================
     3. INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initThreeHero();
    renderHeroContent();
    renderBestSellers();
    renderCuratedCategories();
    renderShopCatalog();
    renderCompareMatrix();
    updateBadges();
    initScrollListeners();
    initTimers();
    bindGlobalEvents();
  });

  /* ==========================================================================
     4. HERO 3D & CAROUSEL
     ========================================================================== */
  function initThreeHero() {
    const container = document.getElementById('hero-three-container');
    if (!container || !window.HuzefaShowroomViewer) return;

    const currentProduct = state.heroProducts[state.heroIndex];
    const currentColor = currentProduct.colors[state.heroColorIndex] || currentProduct.colors[0];

    heroViewer = new window.HuzefaShowroomViewer(container, {
      modelType: currentProduct.model3dType || 'laptop',
      accentColor: currentColor.hex,
      isAutoRotating: true,
      cameraZ: 4.5
    });
  }

  function renderHeroContent() {
    const product = state.heroProducts[state.heroIndex];
    if (!product) return;

    const activeColor = product.colors[state.heroColorIndex] || product.colors[0];

    // Text Elements
    document.getElementById('hero-badge').textContent = product.badge || 'Showroom Highlight';
    document.getElementById('hero-title').textContent = product.name;
    document.getElementById('hero-subtitle').textContent = product.subtitle;
    document.getElementById('hero-description').textContent = product.description;
    document.getElementById('hero-price').textContent = `$${product.price.toLocaleString()}`;

    const oldPriceEl = document.getElementById('hero-old-price');
    if (product.originalPrice) {
      oldPriceEl.textContent = `$${product.originalPrice.toLocaleString()}`;
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }

    const discountPill = document.getElementById('hero-discount-pill');
    if (product.discountPercentage) {
      discountPill.textContent = `${product.discountPercentage}% OFF`;
      discountPill.style.display = 'inline-block';
    } else {
      discountPill.style.display = 'none';
    }

    // Color Swatches
    const swatchesContainer = document.getElementById('hero-swatches-list');
    swatchesContainer.innerHTML = '';
    product.colors.forEach((color, idx) => {
      const btn = document.createElement('button');
      btn.className = `swatch-item-btn ${idx === state.heroColorIndex ? 'active' : ''}`;
      btn.title = color.name;
      btn.innerHTML = `<span class="swatch-color-circle" style="background-color: ${color.hex}"></span>`;
      btn.addEventListener('click', () => {
        state.heroColorIndex = idx;
        renderHeroContent();
        if (heroViewer) {
          heroViewer.setAccentColor(color.hex);
        }
      });
      swatchesContainer.appendChild(btn);
    });

    // Slider Pills
    const pillsContainer = document.getElementById('hero-slider-pills');
    pillsContainer.innerHTML = '';
    state.heroProducts.forEach((_, idx) => {
      const pill = document.createElement('button');
      pill.className = `slider-pill-btn ${idx === state.heroIndex ? 'active' : ''}`;
      pill.addEventListener('click', () => {
        goToHeroSlide(idx);
      });
      pillsContainer.appendChild(pill);
    });

    // Update 3D Model
    if (heroViewer) {
      heroViewer.loadModel(product.model3dType || 'laptop', activeColor.hex);
    }

    // Update Photo View & Hotspots
    const photoImg = document.getElementById('hero-photo-img');
    if (photoImg) {
      photoImg.src = product.image;
      photoImg.alt = product.name;
    }

    renderHotspots(product.model3dType);
  }

  function renderHotspots(modelType) {
    const container = document.getElementById('hero-hotspots-layer');
    if (!container) return;
    container.innerHTML = '';

    const hotspots = HOTSPOTS_MAP[modelType] || [
      { x: 40, y: 40, title: 'Calibrated Hardware', desc: 'Precision engineered showroom specifications' }
    ];

    hotspots.forEach((h) => {
      const pin = document.createElement('div');
      pin.className = 'hotspot-pin';
      pin.style.left = `${h.x}%`;
      pin.style.top = `${h.y}%`;
      pin.innerHTML = `
        <div class="hotspot-dot">
          <div class="hotspot-ripple"></div>
        </div>
        <div class="hotspot-card-popup">
          <div class="hotspot-title">${h.title}</div>
          <div class="hotspot-desc">${h.desc}</div>
        </div>
      `;
      container.appendChild(pin);
    });
  }

  function goToHeroSlide(index) {
    state.heroIndex = (index + state.heroProducts.length) % state.heroProducts.length;
    state.heroColorIndex = 0;
    renderHeroContent();
  }

  function setHeroViewMode(mode) {
    state.heroViewMode = mode;
    const photoView = document.getElementById('hero-photo-view-box');
    const threeView = document.getElementById('hero-three-container');
    const btnPhoto = document.getElementById('mode-btn-photo');
    const btn3D = document.getElementById('mode-btn-3d');

    if (mode === 'photo') {
      photoView.style.display = 'flex';
      threeView.style.display = 'none';
      btnPhoto.classList.add('active');
      btn3D.classList.remove('active');
    } else {
      photoView.style.display = 'none';
      threeView.style.display = 'block';
      btnPhoto.classList.remove('active');
      btn3D.classList.add('active');
    }
  }

  /* ==========================================================================
     5. NAVIGATION & VIEW ROUTING
     ========================================================================== */
  function navigateTo(pageId) {
    state.currentPage = pageId;

    // Hide all view pages
    const pages = document.querySelectorAll('.showroom-view-page');
    pages.forEach((p) => (p.style.display = 'none'));

    // Show target view page
    const target = document.getElementById(`view-${pageId}`);
    if (target) {
      target.style.display = 'block';
    }

    // Update Nav Link Active States
    document.querySelectorAll('.nav-link-btn').forEach((btn) => {
      if (btn.getAttribute('data-page') === pageId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Close mobile menu if open
    closeMobileMenu();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     6. PRODUCT RENDERING & CATALOG
     ========================================================================== */
  function createProductCardHTML(product) {
    const isWishlisted = state.wishlist.includes(product.id);
    const activeColor = product.colors[0];

    const swatchesHTML = product.colors
      .map((c) => `<span class="mini-swatch-circle" style="background-color: ${c.hex}" title="${c.name}"></span>`)
      .join('');

    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-card-top-badges">
          <span class="product-badge ${product.deal ? 'product-badge-deal' : ''}">${product.badge || product.brand}</span>
          <button class="product-wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" onclick="window.huzefaApp.toggleWishlist('${product.id}')" title="Wishlist">
            <svg width="16" height="16" fill="${isWishlisted ? '#ef4444' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>

        <div class="product-card-image-box">
          <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy" />
          <button class="product-quickview-hover-btn" onclick="window.huzefaApp.openQuickView('${product.id}')">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            Inspect 3D
          </button>
        </div>

        <div class="product-card-info">
          <span class="product-card-category">${product.category}</span>
          <h3 class="product-card-title">${product.name}</h3>
          <p class="product-card-subtitle">${product.subtitle}</p>

          <div class="product-card-meta-row">
            <div class="rating-stars-wrap">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span class="rating-number">${product.rating}</span>
              <span class="reviews-count">(${product.reviewsCount})</span>
            </div>
            <div class="stock-status-tag">
              <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
              ${product.inStock ? 'In Stock' : 'Pre-order'}
            </div>
          </div>

          <div class="product-card-swatches">
            ${swatchesHTML}
          </div>
        </div>

        <div class="product-card-bottom-row">
          <div class="product-card-pricing">
            <span class="card-current-price">$${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `<span class="card-old-price">$${product.originalPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="product-card-cart-btn" onclick="window.huzefaApp.addToCart('${product.id}')" title="Add to Cart">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  function renderBestSellers() {
    const grid = document.getElementById('bestsellers-grid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.slice(0, 4).map(createProductCardHTML).join('');
  }

  function renderCuratedCategories() {
    const grid = document.getElementById('curated-categories-grid');
    if (!grid) return;

    grid.innerHTML = CATEGORIES.map((cat) => `
      <div class="category-portfolio-card" onclick="window.huzefaApp.filterByCategory('${cat.id}')">
        <img src="${cat.image}" alt="${cat.name}" class="category-portfolio-img" loading="lazy" />
        <div class="category-portfolio-overlay"></div>
        <div class="category-card-top-content">
          <span class="category-models-count-tag">${cat.itemCount} Reference Models</span>
        </div>
        <div class="category-card-bottom-content">
          <h3 class="category-card-name">${cat.name}</h3>
          <p class="category-card-desc">${cat.description}</p>
          <span class="category-card-explore-btn">
            Explore Portfolio
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </div>
    `).join('');
  }

  function renderShopCatalog() {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;

    let filtered = PRODUCTS.filter((p) => {
      if (state.selectedCategory !== 'all' && p.category !== state.selectedCategory) return false;
      if (state.selectedBrand !== 'all' && p.brand !== state.selectedBrand) return false;
      if (p.price > state.maxPrice) return false;
      if (state.inStockOnly && !p.inStock) return false;
      return true;
    });

    if (state.sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    const countEl = document.getElementById('shop-results-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} devices`;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.2rem; color: #ffffff; margin-bottom: 0.5rem;">No devices match your criteria</p>
          <p style="color: #9CA3AF; font-size: 0.9rem;">Try adjusting your price ceiling or selecting another category.</p>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(createProductCardHTML).join('');
    }
  }

  /* ==========================================================================
     7. COMPARE LAB MATRIX
     ========================================================================== */
  function renderCompareMatrix() {
    const table = document.getElementById('compare-matrix-table');
    if (!table) return;

    const devices = state.compareIds
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean);

    if (devices.length === 0) {
      table.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 3rem;">No devices selected for comparison. Add products from the Shop!</td></tr>`;
      return;
    }

    let headerHTML = `<tr><th>Device</th>`;
    devices.forEach((d) => {
      headerHTML += `
        <th class="compare-col-header">
          <button class="compare-remove-btn" onclick="window.huzefaApp.removeFromCompare('${d.id}')" title="Remove">✕</button>
          <img src="${d.image}" alt="${d.name}" class="compare-device-thumb" />
          <div style="font-size: 1.05rem; font-weight: 700; color: #fff;">${d.name}</div>
          <div style="font-size: 0.85rem; color: #00E5FF; margin-top: 0.2rem;">$${d.price.toLocaleString()}</div>
        </th>
      `;
    });
    headerHTML += `</tr>`;

    const specRows = [
      { key: 'category', label: 'Category' },
      { key: 'display', label: 'Display Architecture', path: 'specs.display' },
      { key: 'processor', label: 'Core Processor / Chip', path: 'specs.processor' },
      { key: 'storage', label: 'Memory & Storage', path: 'specs.storage' },
      { key: 'audio', label: 'Acoustics & Spatial', path: 'specs.audio' },
      { key: 'connectivity', label: 'Wireless & I/O', path: 'specs.connectivity' },
      { key: 'warranty', label: 'Showroom Warranty', path: 'specs.warranty' }
    ];

    let rowsHTML = '';
    specRows.forEach((r) => {
      rowsHTML += `<tr><td>${r.label}</td>`;
      devices.forEach((d) => {
        let val = '';
        if (r.path) {
          const parts = r.path.split('.');
          val = d[parts[0]] ? d[parts[0]][parts[1]] || '—' : '—';
        } else {
          val = d[r.key] || '—';
        }
        rowsHTML += `<td>${val}</td>`;
      });
      rowsHTML += `</tr>`;
    });

    // Add to cart row
    let actionRow = `<tr><td>Action</td>`;
    devices.forEach((d) => {
      actionRow += `
        <td style="text-align: center;">
          <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" onclick="window.huzefaApp.addToCart('${d.id}')">
            Add to Cart
          </button>
        </td>
      `;
    });
    actionRow += `</tr>`;

    table.innerHTML = `<thead>${headerHTML}</thead><tbody>${rowsHTML}${actionRow}</tbody>`;
  }

  /* ==========================================================================
     8. QUICK VIEW / 3D INSPECTION MODAL
     ========================================================================== */
  function openQuickView(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    state.inspectProduct = product;
    state.inspectColorIndex = 0;
    state.inspectQty = 1;

    document.getElementById('qv-title').textContent = product.name;
    document.getElementById('qv-subtitle').textContent = product.subtitle;
    document.getElementById('qv-category').textContent = product.category;
    document.getElementById('qv-price').textContent = `$${product.price.toLocaleString()}`;
    document.getElementById('qv-rating').textContent = `${product.rating} (${product.reviewsCount} reviews)`;
    document.getElementById('qv-description').textContent = product.description;
    document.getElementById('qv-qty-num').textContent = '1';

    // Specs List
    const specsList = document.getElementById('qv-specs-list');
    specsList.innerHTML = '';
    if (product.specs) {
      Object.entries(product.specs).forEach(([k, v]) => {
        const item = document.createElement('div');
        item.style.fontSize = '0.8rem';
        item.style.padding = '0.35rem 0';
        item.style.borderBottom = '1px solid rgba(139, 144, 149, 0.15)';
        item.innerHTML = `<span style="color: #9CA3AF; text-transform: capitalize;">${k}:</span> <strong style="color: #fff;">${v}</strong>`;
        specsList.appendChild(item);
      });
    }

    // Color Swatches
    const swatchesContainer = document.getElementById('qv-swatches-list');
    swatchesContainer.innerHTML = '';
    product.colors.forEach((color, idx) => {
      const btn = document.createElement('button');
      btn.className = `swatch-item-btn ${idx === state.inspectColorIndex ? 'active' : ''}`;
      btn.title = color.name;
      btn.innerHTML = `<span class="swatch-color-circle" style="background-color: ${color.hex}"></span>`;
      btn.addEventListener('click', () => {
        state.inspectColorIndex = idx;
        document.querySelectorAll('#qv-swatches-list .swatch-item-btn').forEach((b, i) => {
          b.classList.toggle('active', i === idx);
        });
        if (quickviewViewer) {
          quickviewViewer.setAccentColor(color.hex);
        }
      });
      swatchesContainer.appendChild(btn);
    });

    // Mount 3D Scene
    const stageContainer = document.getElementById('quickview-three-container');
    if (stageContainer && window.HuzefaShowroomViewer) {
      if (quickviewViewer) {
        quickviewViewer.destroy();
      }
      quickviewViewer = new window.HuzefaShowroomViewer(stageContainer, {
        modelType: product.model3dType || 'laptop',
        accentColor: product.colors[0].hex,
        isAutoRotating: true,
        cameraZ: 4.5
      });
    }

    document.getElementById('quickview-modal-backdrop').classList.add('active');
  }

  function closeQuickView() {
    document.getElementById('quickview-modal-backdrop').classList.remove('active');
    if (quickviewViewer) {
      quickviewViewer.destroy();
      quickviewViewer = null;
    }
  }

  /* ==========================================================================
     9. CART & WISHLIST DRAWER
     ========================================================================== */
  function addToCart(productId, colorHex, quantity = 1) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const chosenColor = colorHex
      ? product.colors.find((c) => c.hex === colorHex) || product.colors[0]
      : product.colors[0];

    const existingIdx = state.cart.findIndex(
      (item) => item.product.id === product.id && item.color.hex === chosenColor.hex
    );

    if (existingIdx > -1) {
      state.cart[existingIdx].quantity += quantity;
    } else {
      state.cart.push({
        id: `${product.id}-${chosenColor.hex}`,
        product,
        color: chosenColor,
        quantity
      });
    }

    saveCart();
    renderCart();
    updateBadges();
    showToast(`Added ${product.name} to cart`);
  }

  function changeCartQuantity(itemIdx, delta) {
    if (!state.cart[itemIdx]) return;
    state.cart[itemIdx].quantity += delta;
    if (state.cart[itemIdx].quantity <= 0) {
      state.cart.splice(itemIdx, 1);
    }
    saveCart();
    renderCart();
    updateBadges();
  }

  function removeCartItem(itemIdx) {
    state.cart.splice(itemIdx, 1);
    saveCart();
    renderCart();
    updateBadges();
  }

  function saveCart() {
    localStorage.setItem('huzefa_cart', JSON.stringify(state.cart));
  }

  function renderCart() {
    const list = document.getElementById('cart-items-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    const discountEl = document.getElementById('cart-discount');
    const totalEl = document.getElementById('cart-total');
    const shippingBar = document.getElementById('shipping-bar-fill');
    const shippingText = document.getElementById('shipping-text');

    if (!list) return;

    if (state.cart.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: #9CA3AF;">
          <p style="font-size: 1.1rem; color: #fff; margin-bottom: 0.5rem;">Your Cart is Empty</p>
          <p style="font-size: 0.85rem;">Discover reference models in the Showroom.</p>
        </div>
      `;
      subtotalEl.textContent = '$0';
      discountEl.textContent = '-$0';
      totalEl.textContent = '$0';
      shippingBar.style.width = '0%';
      shippingText.textContent = 'Add $1,000 for Free Armored Express Shipping';
      return;
    }

    let subtotal = 0;
    list.innerHTML = state.cart
      .map((item, idx) => {
        const itemTotal = item.product.price * item.quantity;
        subtotal += itemTotal;
        return `
          <div class="cart-item-row">
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-thumb" />
            <div class="cart-item-info">
              <h4 class="cart-item-title">${item.product.name}</h4>
              <span style="font-size: 0.72rem; color: #9CA3AF;">Color: ${item.color.name}</span>
              <div class="cart-item-price">$${item.product.price.toLocaleString()}</div>
            </div>
            <div class="cart-qty-counter">
              <button class="qty-btn" onclick="window.huzefaApp.changeCartQuantity(${idx}, -1)">−</button>
              <span class="qty-num">${item.quantity}</span>
              <button class="qty-btn" onclick="window.huzefaApp.changeCartQuantity(${idx}, 1)">+</button>
            </div>
            <button onclick="window.huzefaApp.removeCartItem(${idx})" style="color: #8B9095; margin-left: 0.5rem;" title="Remove">✕</button>
          </div>
        `;
      })
      .join('');

    const discountAmount = Math.round(subtotal * (state.discountPercent / 100));
    const finalTotal = subtotal - discountAmount;

    subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    discountEl.textContent = `-$${discountAmount.toLocaleString()}`;
    totalEl.textContent = `$${finalTotal.toLocaleString()}`;

    // Free shipping threshold ($1,000)
    const pct = Math.min(Math.round((subtotal / 1000) * 100), 100);
    shippingBar.style.width = `${pct}%`;
    if (subtotal >= 1000) {
      shippingText.textContent = '🎉 Qualified for Free Armored White-Glove Shipping!';
    } else {
      shippingText.textContent = `Add $${(1000 - subtotal).toLocaleString()} for Free Armored Express Shipping`;
    }
  }

  function applyPromoCode(code) {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'TITAN40') {
      state.discountPercent = 40;
      state.appliedCoupon = 'TITAN40';
      showToast('TITAN40 applied: 40% discount!');
    } else if (trimmed === 'WELCOME10') {
      state.discountPercent = 10;
      state.appliedCoupon = 'WELCOME10';
      showToast('WELCOME10 applied: 10% discount!');
    } else if (trimmed === 'STUDIO8K') {
      state.discountPercent = 15;
      state.appliedCoupon = 'STUDIO8K';
      showToast('STUDIO8K applied: Special credit!');
    } else {
      showToast('Invalid promo code');
    }
    renderCart();
  }

  function handleCheckout() {
    if (state.cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }

    if (window.confetti) {
      window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    const orderId = `HZF-${Math.floor(100000 + Math.random() * 900000)}`;
    showToast(`Order Confirmed: ${orderId}`);
    state.cart = [];
    saveCart();
    renderCart();
    updateBadges();
    closeCartDrawer();
  }

  /* Wishlist */
  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast('Removed from wishlist');
    } else {
      state.wishlist.push(productId);
      showToast('Added to wishlist');
    }
    localStorage.setItem('huzefa_wishlist', JSON.stringify(state.wishlist));
    updateBadges();
    renderWishlist();
    renderShopCatalog();
    renderBestSellers();
  }

  function renderWishlist() {
    const list = document.getElementById('wishlist-items-list');
    if (!list) return;

    const items = state.wishlist.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

    if (items.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: #9CA3AF;">
          <p style="font-size: 1.1rem; color: #fff; margin-bottom: 0.5rem;">Your Wishlist is Empty</p>
          <p style="font-size: 0.85rem;">Save devices to view or order later.</p>
        </div>
      `;
      return;
    }

    list.innerHTML = items
      .map(
        (p) => `
        <div class="cart-item-row">
          <img src="${p.image}" alt="${p.name}" class="cart-item-thumb" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${p.name}</h4>
            <div class="cart-item-price">$${p.price.toLocaleString()}</div>
          </div>
          <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.75rem;" onclick="window.huzefaApp.addToCart('${p.id}')">
            Add to Cart
          </button>
          <button onclick="window.huzefaApp.toggleWishlist('${p.id}')" style="color: #8B9095; margin-left: 0.5rem;">✕</button>
        </div>
      `
      )
      .join('');
  }

  /* Compare Lab */
  function removeFromCompare(id) {
    state.compareIds = state.compareIds.filter((cid) => cid !== id);
    renderCompareMatrix();
    updateBadges();
  }

  function addToCompare(id) {
    if (state.compareIds.includes(id)) {
      showToast('Device already in comparison matrix');
      return;
    }
    if (state.compareIds.length >= 4) {
      showToast('Maximum 4 devices in comparison');
      return;
    }
    state.compareIds.push(id);
    renderCompareMatrix();
    updateBadges();
    showToast('Added to Compare Lab');
  }

  /* ==========================================================================
     10. DRAWER & MODAL CONTROLLERS
     ========================================================================== */
  function openCartDrawer() {
    renderCart();
    document.getElementById('cart-drawer-backdrop').classList.add('active');
  }
  function closeCartDrawer() {
    document.getElementById('cart-drawer-backdrop').classList.remove('active');
  }

  function openWishlistDrawer() {
    renderWishlist();
    document.getElementById('wishlist-drawer-backdrop').classList.add('active');
  }
  function closeWishlistDrawer() {
    document.getElementById('wishlist-drawer-backdrop').classList.remove('active');
  }

  function openAIDrawer() {
    document.getElementById('ai-drawer-backdrop').classList.add('active');
  }
  function closeAIDrawer() {
    document.getElementById('ai-drawer-backdrop').classList.remove('active');
  }

  function openSearchModal() {
    document.getElementById('search-modal-backdrop').classList.add('active');
    setTimeout(() => {
      document.getElementById('search-modal-input')?.focus();
    }, 100);
  }
  function closeSearchModal() {
    document.getElementById('search-modal-backdrop').classList.remove('active');
  }

  function openOrderTrackModal() {
    document.getElementById('ordertrack-modal-backdrop').classList.add('active');
  }
  function closeOrderTrackModal() {
    document.getElementById('ordertrack-modal-backdrop').classList.remove('active');
  }

  function openAuthModal() {
    document.getElementById('auth-modal-backdrop').classList.add('active');
  }
  function closeAuthModal() {
    document.getElementById('auth-modal-backdrop').classList.remove('active');
  }

  function toggleMobileMenu() {
    const sidebar  = document.getElementById('site-sidebar');
    const overlay  = document.getElementById('mobile-nav-drawer');
    const isOpen   = sidebar && sidebar.classList.contains('mobile-open');
    if (sidebar)  sidebar.classList.toggle('mobile-open', !isOpen);
    if (overlay)  overlay.classList.toggle('open', !isOpen);
    // Prevent body scroll when sidebar open
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }
  function closeMobileMenu() {
    const sidebar = document.getElementById('site-sidebar');
    const overlay = document.getElementById('mobile-nav-drawer');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* Badges Counter Update */
  function updateBadges() {
    const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistCount = state.wishlist.length;
    const compareCount = state.compareIds.length;

    const cartBadge = document.getElementById('nav-cart-badge');
    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }

    const wishBadge = document.getElementById('nav-wishlist-badge');
    if (wishBadge) {
      wishBadge.textContent = wishlistCount;
      wishBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
    }

    const compBadge = document.getElementById('nav-compare-badge');
    if (compBadge) {
      compBadge.textContent = compareCount;
      compBadge.style.display = compareCount > 0 ? 'flex' : 'none';
    }
  }

  /* ==========================================================================
     11. TIMERS & LIVE TICKERS
     ========================================================================== */
  function initTimers() {
    // 1. Hero Auto Carousel (4s)
    state.autoPlayTimer = setInterval(() => {
      if (state.isAutoPlaying) {
        goToHeroSlide(state.heroIndex + 1);
      }
    }, 4000);

    // 2. Flash Sale Countdown Timer
    let h = 13, m = 42, s = 19;
    setInterval(() => {
      s--;
      if (s < 0) {
        s = 59;
        m--;
        if (m < 0) {
          m = 59;
          h--;
          if (h < 0) h = 24;
        }
      }
      const hEl = document.getElementById('flash-sale-hours');
      const mEl = document.getElementById('flash-sale-mins');
      const sEl = document.getElementById('flash-sale-secs');
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  function initScrollListeners() {
    window.addEventListener('scroll', () => {
      // Header Blur
      const header = document.querySelector('.site-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }

      // Reading Progress Bar
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const prog = document.getElementById('scroll-progress-bar');
      if (prog) prog.style.width = `${scrolled}%`;

      // Scroll to top button
      const topBtn = document.getElementById('scroll-top-btn');
      if (topBtn) {
        topBtn.classList.toggle('visible', window.scrollY > 400);
      }
    });

    document.getElementById('scroll-top-btn')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     12. GLOBAL EVENT BINDINGS
     ========================================================================== */
  function bindGlobalEvents() {
    // Nav links
    document.querySelectorAll('.nav-link-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const page = e.currentTarget.getAttribute('data-page');
        if (page) navigateTo(page);
      });
    });

    // Hero prev/next
    document.getElementById('hero-prev-btn')?.addEventListener('click', () => {
      goToHeroSlide(state.heroIndex - 1);
    });
    document.getElementById('hero-next-btn')?.addEventListener('click', () => {
      goToHeroSlide(state.heroIndex + 1);
    });

    // Hero Auto Play Toggle
    document.getElementById('hero-autoplay-toggle')?.addEventListener('click', () => {
      state.isAutoPlaying = !state.isAutoPlaying;
      const textEl = document.getElementById('hero-autoplay-text');
      if (textEl) textEl.textContent = state.isAutoPlaying ? 'Auto-Slide: ON' : 'Auto-Slide: PAUSED';
    });

    // Hero mode switch
    document.getElementById('mode-btn-photo')?.addEventListener('click', () => setHeroViewMode('photo'));
    document.getElementById('mode-btn-3d')?.addEventListener('click', () => setHeroViewMode('3d'));

    // Hero inspect button
    document.getElementById('hero-inspect-btn')?.addEventListener('click', () => {
      const p = state.heroProducts[state.heroIndex];
      if (p) openQuickView(p.id);
    });

    // Hero add to cart button
    document.getElementById('hero-add-cart-btn')?.addEventListener('click', () => {
      const p = state.heroProducts[state.heroIndex];
      if (p) {
        const c = p.colors[state.heroColorIndex] || p.colors[0];
        addToCart(p.id, c.hex);
      }
    });

    // Quick View add to cart
    document.getElementById('qv-add-cart-btn')?.addEventListener('click', () => {
      if (!state.inspectProduct) return;
      const c = state.inspectProduct.colors[state.inspectColorIndex] || state.inspectProduct.colors[0];
      addToCart(state.inspectProduct.id, c.hex, state.inspectQty);
      closeQuickView();
    });

    // Quick View quantity buttons
    document.getElementById('qv-qty-minus')?.addEventListener('click', () => {
      if (state.inspectQty > 1) {
        state.inspectQty--;
        document.getElementById('qv-qty-num').textContent = state.inspectQty;
      }
    });
    document.getElementById('qv-qty-plus')?.addEventListener('click', () => {
      state.inspectQty++;
      document.getElementById('qv-qty-num').textContent = state.inspectQty;
    });

    // Keyboard shortcut (⌘K or Ctrl+K for search, Escape to close modals)
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeQuickView();
        closeCartDrawer();
        closeWishlistDrawer();
        closeAIDrawer();
        closeSearchModal();
        closeOrderTrackModal();
        closeAuthModal();
      }
    });

    // Search input typing
    document.getElementById('search-modal-input')?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const resultsContainer = document.getElementById('search-modal-results');
      if (!resultsContainer) return;

      if (!q) {
        resultsContainer.innerHTML = `<p style="text-align: center; color: #8B9095; padding: 2rem;">Type product name, category, or spec...</p>`;
        return;
      }

      const matches = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<p style="text-align: center; color: #8B9095; padding: 2rem;">No devices matching "${q}"</p>`;
        return;
      }

      resultsContainer.innerHTML = matches
        .map(
          (p) => `
        <div class="cart-item-row" style="cursor: pointer;" onclick="window.huzefaApp.openQuickView('${p.id}'); window.huzefaApp.closeSearchModal();">
          <img src="${p.image}" alt="${p.name}" class="cart-item-thumb" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${p.name}</h4>
            <span style="font-size: 0.75rem; color: #00E5FF;">$${p.price.toLocaleString()} • ${p.category}</span>
          </div>
          <span style="font-size: 0.8rem; color: #8B9095;">Inspect →</span>
        </div>
      `
        )
        .join('');
    });

    // Shop Filters
    document.querySelectorAll('.filter-category-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-category-btn').forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.selectedCategory = e.currentTarget.getAttribute('data-cat') || 'all';
        renderShopCatalog();
      });
    });

    document.getElementById('price-slider')?.addEventListener('input', (e) => {
      state.maxPrice = Number(e.target.value);
      document.getElementById('price-val-max').textContent = `$${state.maxPrice.toLocaleString()}`;
      renderShopCatalog();
    });

    document.getElementById('shop-sort-select')?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderShopCatalog();
    });

    document.getElementById('view-grid-btn')?.addEventListener('click', () => {
      state.viewMode = 'grid';
      document.getElementById('view-grid-btn').classList.add('active');
      document.getElementById('view-list-btn').classList.remove('active');
      document.getElementById('shop-products-grid').classList.remove('list-view');
    });

    document.getElementById('view-list-btn')?.addEventListener('click', () => {
      state.viewMode = 'list';
      document.getElementById('view-list-btn').classList.add('active');
      document.getElementById('view-grid-btn').classList.remove('active');
      document.getElementById('shop-products-grid').classList.add('list-view');
    });

    // AI Concierge Chat Form
    document.getElementById('ai-chat-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('ai-chat-input');
      const text = input.value.trim();
      if (!text) return;

      addChatMessage('user', text);
      input.value = '';

      // Simulate AI response
      setTimeout(() => {
        respondAsAI(text);
      }, 600);
    });

    // Contact Form submission with confetti
    document.getElementById('showroom-contact-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.confetti) {
        window.confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
      }
      showToast('Appointment requested! Concierge will call you within 2 hours.');
      e.target.reset();
    });
  }

  /* AI Concierge Chat Helpers */
  function addChatMessage(sender, text) {
    const box = document.getElementById('chat-messages-container');
    if (!box) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}`;
    bubble.textContent = text;
    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;
  }

  function respondAsAI(query) {
    const q = query.toLowerCase();
    let reply = 'Our master acoustic and display engineers recommend exploring our 8K OLED evo and Titan Blade 18 Pro series for uncompromising luxury.';

    if (q.includes('gaming') || q.includes('rtx') || q.includes('laptop')) {
      reply = 'For peak ray tracing performance, the Titan Blade 18 Pro with RTX 4090 16GB VRAM and 240Hz Mini-LED display is the definitive choice.';
    } else if (q.includes('audio') || q.includes('earbud') || q.includes('anc')) {
      reply = 'The Acoustic Pro Spatial ANC earbuds feature dual balanced armature drivers, LDAC lossless 24-bit audio, and 48dB active noise cancellation.';
    } else if (q.includes('phone') || q.includes('camera') || q.includes('zoom')) {
      reply = 'The UltraVision Pro 5G features a 200MP periscope ISOCELL optical sensor forged in space-grade titanium.';
    } else if (q.includes('tv') || q.includes('oled') || q.includes('screen')) {
      reply = 'The Cinematic Master 77" 8K OLED evo panel utilizes Micro Lens Array (MLA+) technology for 70% higher luminance and acoustic surface audio.';
    }

    addChatMessage('ai', reply);
  }

  /* Toast Notification */
  function showToast(message) {
    const toast = document.getElementById('site-toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => {
      toast.classList.remove('active');
    }, 2800);
  }

  /* Copy Voucher Code */
  function copyVoucherCode(code) {
    navigator.clipboard?.writeText(code);
    showToast(`Copied voucher code: ${code}`);
  }

  /* Expose Global Controller */
  window.huzefaApp = {
    navigateTo,
    openQuickView,
    closeQuickView,
    addToCart,
    changeCartQuantity,
    removeCartItem,
    toggleWishlist,
    addToCompare,
    removeFromCompare,
    openCartDrawer,
    closeCartDrawer,
    openWishlistDrawer,
    closeWishlistDrawer,
    openAIDrawer,
    closeAIDrawer,
    openSearchModal,
    closeSearchModal,
    openOrderTrackModal,
    closeOrderTrackModal,
    openAuthModal,
    closeAuthModal,
    toggleMobileMenu,
    closeMobileMenu,
    copyVoucherCode,
    applyPromoCode,
    handleCheckout,
    filterByCategory: (catId) => {
      state.selectedCategory = catId;
      navigateTo('shop');
      renderShopCatalog();
    }
  };
})();
