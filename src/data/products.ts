export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: 'men' | 'women';
  subcategory: string;
  type: 'ready-to-wear' | 'semi-stitched';
  fabric: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  tags: string[];
  featured: boolean;
  new: boolean;
  bestSeller: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 'p001',
    name: 'Aanya Printed Cotton Kurti',
    slug: 'aanya-printed-cotton-kurti',
    price: 49,
    originalPrice: 65,
    description: 'An ultra-breathable 100% pure organic cotton dailywear kurti featuring delicate hand-block floral prints in soft pastel tones. Designed with a relaxed straight fit, notched round collar, and convenient side pockets for all-day comfort at work or home.',
    shortDescription: '100% organic cotton kurti with block print',
    category: 'women',
    subcategory: 'Kurtis',
    type: 'ready-to-wear',
    fabric: 'Organic Cotton',
    colors: [
      { name: 'Sage Green', hex: '#7A9E6A', image: '/images/product-anarkali.png' },
      { name: 'Dusty Rose', hex: '#D4A0A0', image: '/images/hero-casual.png' },
      { name: 'Soft Ivory', hex: '#F5F0E8', image: '/images/hero-casual.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/images/hero-casual.png', '/images/product-anarkali.png'],
    tags: ['cotton', 'kurti', 'dailywear', 'casual', 'block-print'],
    featured: true,
    new: true,
    bestSeller: true,
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 'p002',
    name: 'Breezy Linen Short Kurta',
    slug: 'breezy-linen-short-kurta',
    price: 59,
    originalPrice: 75,
    description: 'A modern short-length kurta tailored from lightweight pure linen. Perfect for warm-weather dailywear, pairing effortlessly with denim or casual chinos. Features a band collar and mother-of-pearl buttons.',
    shortDescription: 'Pure linen short kurta for everyday comfort',
    category: 'men',
    subcategory: 'Short Kurtas',
    type: 'ready-to-wear',
    fabric: 'Pure Linen',
    colors: [
      { name: 'Sky Blue', hex: '#8BA5B5', image: '/images/product-kurta.png' },
      { name: 'Sand Beige', hex: '#C9A96E', image: '/images/product-sherwani.png' },
      { name: 'Charcoal', hex: '#2C2C2C', image: '/images/product-kurta.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/images/product-kurta.png', '/images/mens-collection.png'],
    tags: ['linen', 'short kurta', 'mens casual', 'everyday', 'breezy'],
    featured: true,
    new: true,
    bestSeller: false,
    rating: 4.8,
    reviews: 145,
  },
  {
    id: 'p003',
    name: 'Lucknowi Chikankari Daily Set',
    slug: 'lucknowi-chikankari-daily-set',
    price: 69,
    description: 'Soft, airy cotton A-line tunic set detailed with authentic Lucknowi chikankari embroidery along the neck and sleeve hem. Paired with lightweight ankle-length trousers for a clean, effortless daily look.',
    shortDescription: 'Airy cotton tunic with delicate chikankari',
    category: 'women',
    subcategory: 'Daily Sets',
    type: 'ready-to-wear',
    fabric: 'Soft Cotton',
    colors: [
      { name: 'Pure White', hex: '#FAFAFA', image: '/images/womens-collection.png' },
      { name: 'Peach', hex: '#EACBA8', image: '/images/hero-casual.png' },
      { name: 'Mint', hex: '#A8D8C8', image: '/images/womens-collection.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/images/womens-collection.png', '/images/product-saree.png'],
    tags: ['chikankari', 'cotton', 'dailywear', 'white', 'tunic'],
    featured: true,
    new: false,
    bestSeller: true,
    rating: 4.9,
    reviews: 318,
  },
  {
    id: 'p004',
    name: 'Linen Palazzo & Kurti Co-Ord',
    slug: 'linen-palazzo-kurti-coord',
    price: 79,
    originalPrice: 95,
    description: 'A relaxed two-piece co-ord set in slub linen featuring a mid-thigh kurti with relaxed wide-leg palazzo pants. Designed with an elastic waistband and deep side pockets for maximum daily utility.',
    shortDescription: 'Slub linen kurti and wide-leg palazzo co-ord',
    category: 'women',
    subcategory: 'Co-Ords',
    type: 'ready-to-wear',
    fabric: 'Slub Linen',
    colors: [
      { name: 'Dusty Rose', hex: '#D4A0A0', image: '/images/hero-casual.png' },
      { name: 'Mehendi Green', hex: '#5B7C4F', image: '/images/hero-casual.png' },
      { name: 'Navy Blue', hex: '#2E4A8A', image: '/images/hero-casual.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/images/hero-casual.png', '/images/womens-collection.png'],
    tags: ['palazzo', 'linen', 'co-ord', 'dailywear', 'relaxed'],
    featured: true,
    new: true,
    bestSeller: false,
    rating: 4.7,
    reviews: 94,
  },
  {
    id: 'p005',
    name: 'Relaxed Cotton Pathani Set',
    slug: 'relaxed-cotton-pathani-set',
    price: 65,
    description: 'A contemporary take on the classic Pathani suit in lightweight combed cotton. Features a relaxed shirt-style collar, roll-up sleeve tabs, and comfortable salwar pants for everyday leisure.',
    shortDescription: 'Combed cotton Pathani set with roll-up sleeves',
    category: 'men',
    subcategory: 'Pathani Sets',
    type: 'ready-to-wear',
    fabric: 'Combed Cotton',
    colors: [
      { name: 'Charcoal Grey', hex: '#2C2C2C', image: '/images/product-sherwani.png' },
      { name: 'Olive Green', hex: '#5B7C4F', image: '/images/product-nehru.png' },
      { name: 'Ivory', hex: '#F5F0E8', image: '/images/product-kurta.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/images/product-sherwani.png', '/images/product-kurta.png'],
    tags: ['pathani', 'cotton', 'mens dailywear', 'casual', 'relax'],
    featured: false,
    new: true,
    bestSeller: false,
    rating: 4.6,
    reviews: 82,
  },
  {
    id: 'p006',
    name: 'Chanderi Everyday Tunic',
    slug: 'chanderi-everyday-tunic',
    price: 45,
    description: 'Lightweight Chanderi cotton tunic with geometric self-weave patterns. Features a flattering A-line silhouette, 3/4 sleeves, and subtle wooden button detail.',
    shortDescription: 'Lightweight Chanderi tunic for everyday wear',
    category: 'women',
    subcategory: 'Tunics',
    type: 'ready-to-wear',
    fabric: 'Chanderi Cotton Blend',
    colors: [
      { name: 'Mustard Yellow', hex: '#E8A838', image: '/images/product-saree.png' },
      { name: 'Teal Blue', hex: '#2E6B6B', image: '/images/product-saree.png' },
      { name: 'Plum Rose', hex: '#6B2D3E', image: '/images/product-anarkali.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/images/product-saree.png', '/images/hero-casual.png'],
    tags: ['tunic', 'chanderi', 'dailywear', 'mustard', 'lightweight'],
    featured: false,
    new: false,
    bestSeller: true,
    rating: 4.8,
    reviews: 167,
  },
  {
    id: 'p007',
    name: 'Casual Cotton Nehru Vest',
    slug: 'casual-cotton-nehru-vest',
    price: 75,
    originalPrice: 89,
    description: 'A structured yet comfortable cotton-linen Nehru jacket/vest that adds effortless polish to any casual shirt or short kurta. Features pocket welt details and natural horn buttons.',
    shortDescription: 'Cotton-linen waistcoat for everyday layering',
    category: 'men',
    subcategory: 'Vests & Jackets',
    type: 'ready-to-wear',
    fabric: 'Cotton-Linen Blend',
    colors: [
      { name: 'Mehendi Green', hex: '#5B7C4F', image: '/images/product-nehru.png' },
      { name: 'Navy Blue', hex: '#2E4A8A', image: '/images/product-nehru.png' },
      { name: 'Khaki Sand', hex: '#C9A96E', image: '/images/product-nehru.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/images/product-nehru.png', '/images/mens-collection.png'],
    tags: ['nehru vest', 'mens casual', 'layering', 'cotton', 'smart-casual'],
    featured: true,
    new: false,
    bestSeller: true,
    rating: 4.8,
    reviews: 195,
  },
  {
    id: 'p008',
    name: 'Mulmul Cotton Floral Dupatta Set',
    slug: 'mulmul-cotton-floral-dupatta-set',
    price: 55,
    description: 'Ultra-soft mulmul cotton straight kurti paired with matching trousers and a hand-printed featherlight mulmul dupatta. Ideal for summer workwear and casual outings.',
    shortDescription: 'Featherlight mulmul cotton 3-piece daily set',
    category: 'women',
    subcategory: 'Daily Sets',
    type: 'ready-to-wear',
    fabric: 'Mulmul Cotton',
    colors: [
      { name: 'Dusty Rose', hex: '#D4A0A0', image: '/images/hero-casual.png' },
      { name: 'Sky Blue', hex: '#8BA5B5', image: '/images/product-anarkali.png' },
      { name: 'Soft Sage', hex: '#7A9E6A', image: '/images/hero-casual.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/images/hero-casual.png', '/images/product-anarkali.png'],
    tags: ['mulmul', 'dupatta set', 'cotton', 'summer', 'floral'],
    featured: false,
    new: true,
    bestSeller: false,
    rating: 4.7,
    reviews: 78,
  },
  {
    id: 'p009',
    name: 'Short Cotton-Denim Fusion Kurta',
    slug: 'short-cotton-denim-fusion-kurta',
    price: 49,
    description: 'A casual fusion short kurta crafted from soft indigo-dyed chambray cotton. Features a Mandarin collar, chest patch pocket, and wooden buttons for a cool contemporary look.',
    shortDescription: 'Chambray cotton fusion kurta with Mandarin collar',
    category: 'men',
    subcategory: 'Short Kurtas',
    type: 'ready-to-wear',
    fabric: 'Indigo Chambray Cotton',
    colors: [
      { name: 'Indigo Blue', hex: '#2E4A8A', image: '/images/product-kurta.png' },
      { name: 'Faded Black', hex: '#3C3C3C', image: '/images/product-sherwani.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/images/product-kurta.png', '/images/mens-collection.png'],
    tags: ['fusion', 'chambray', 'short kurta', 'denim look', 'everyday'],
    featured: false,
    new: true,
    bestSeller: false,
    rating: 4.6,
    reviews: 112,
  },
  {
    id: 'p010',
    name: 'Breezy Georgette Daily Kurti',
    slug: 'breezy-georgette-daily-kurti',
    price: 52,
    originalPrice: 68,
    description: 'Wrinkle-resistant georgette dailywear kurti featuring subtle thread embroidery around the neckline. Lightweight, fast-drying, and zero-fuss maintenance.',
    shortDescription: 'Wrinkle-resistant georgette dailywear kurti',
    category: 'women',
    subcategory: 'Kurtis',
    type: 'ready-to-wear',
    fabric: 'Poly Georgette',
    colors: [
      { name: 'Saffron Orange', hex: '#E8A838', image: '/images/festive-collection.png' },
      { name: 'Dusty Pink', hex: '#D4A0A0', image: '/images/hero-casual.png' },
      { name: 'Royal Navy', hex: '#1C2D4A', image: '/images/product-saree.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/images/festive-collection.png', '/images/hero-casual.png'],
    tags: ['georgette', 'dailywear', 'kurti', 'wrinkle-free', 'workwear'],
    featured: false,
    new: false,
    bestSeller: true,
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 'p011',
    name: 'Relaxed Lounge Pyjama Kurta Set',
    slug: 'relaxed-lounge-pyjama-kurta-set',
    price: 58,
    description: 'Ultra-soft washed cotton kurta with drawstring pyjama bottoms. Tailored specifically for at-home lounging, weekend coffee runs, and casual everyday wear.',
    shortDescription: 'Washed cotton relaxed lounge kurta set',
    category: 'men',
    subcategory: 'Lounge Sets',
    type: 'ready-to-wear',
    fabric: 'Washed Organic Cotton',
    colors: [
      { name: 'Soft Ivory', hex: '#F5F0E8', image: '/images/product-kurta.png' },
      { name: 'Sage Green', hex: '#7A9E6A', image: '/images/product-nehru.png' },
      { name: 'Slate Blue', hex: '#4A6B8A', image: '/images/product-kurta.png' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['/images/product-kurta.png', '/images/mens-collection.png'],
    tags: ['lounge', 'cotton', 'pyjama set', 'mens casual', 'home'],
    featured: false,
    new: false,
    bestSeller: true,
    rating: 4.9,
    reviews: 189,
  },
  {
    id: 'p012',
    name: 'Chanderi Dailywear Co-Ord Set',
    slug: 'chanderi-dailywear-coord-set',
    price: 72,
    description: 'A chic contemporary 2-piece set featuring a high-low tunic and straight cotton trousers in breathable Chanderi weave. Subtle piping details give it a polished touch.',
    shortDescription: 'High-low tunic & trouser co-ord set',
    category: 'women',
    subcategory: 'Co-Ords',
    type: 'semi-stitched',
    fabric: 'Chanderi Cotton',
    colors: [
      { name: 'Olive Green', hex: '#5B7C4F', image: '/images/hero-casual.png' },
      { name: 'Warm Cream', hex: '#FAF7F0', image: '/images/hero-casual.png' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['/images/hero-casual.png', '/images/product-anarkali.png'],
    tags: ['co-ord', 'chanderi', 'high-low', 'contemporary', 'casual'],
    featured: true,
    new: true,
    bestSeller: false,
    rating: 4.7,
    reviews: 64,
  },
];

export const collections = [
  {
    id: 'women',
    title: "Women's Dailywear",
    subtitle: 'Breezy & Effortless',
    description: 'Breathable cotton kurtis, linen palazzos & casual co-ords',
    image: '/images/hero-casual.png',
  },
  {
    id: 'men',
    title: "Men's Everyday",
    subtitle: 'Relaxed Heritage',
    description: 'Short linen kurtas, casual vests & comfortable lounge sets',
    image: '/images/mens-collection.png',
  },
  {
    id: 'cotton',
    title: 'Pure Cotton Edit',
    subtitle: '100% Organic & Breathable',
    description: 'Hand-block printed everyday essentials for warm days',
    image: '/images/womens-collection.png',
  },
  {
    id: 'festive',
    title: 'Casual Festive',
    subtitle: 'Light Celebration',
    description: 'Minimal embroidery pieces for family gatherings & dinners',
    image: '/images/festive-collection.png',
  },
];

export const testimonials = [
  {
    id: 't1',
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: 'JionaFashion cotton kurtis are my absolute daily staple for work! The fabric is so soft, breathable, and holds up incredibly well after multiple washes.',
    rating: 5,
    product: 'Aanya Printed Cotton Kurti',
  },
  {
    id: 't2',
    name: 'Arjun Mehta',
    location: 'Delhi',
    text: 'Finding good casual short kurtas for men used to be tough. JionaFashion linen short kurtas fit like a dream with jeans. Highly recommended!',
    rating: 5,
    product: 'Breezy Linen Short Kurta',
  },
  {
    id: 't3',
    name: 'Aisha Khan',
    location: 'Hyderabad',
    text: 'The Chikankari daily set is lightweight, elegant, and perfect for warm weather. Super comfortable for all-day wear!',
    rating: 5,
    product: 'Lucknowi Chikankari Daily Set',
  },
  {
    id: 't4',
    name: 'Rohan Patel',
    location: 'Bangalore',
    text: 'The Casual Nehru Vest instantly upgrades a simple shirt or kurta. Great stitch quality and horn buttons.',
    rating: 5,
    product: 'Casual Cotton Nehru Vest',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured);
}

export function getProductsByCategory(category: 'men' | 'women'): Product[] {
  return products.filter(p => p.category === category);
}
