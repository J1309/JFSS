// Maps product IDs to their display images
export const productImageMap: Record<string, string> = {
  p001: '/images/hero-casual.png',
  p002: '/images/product-kurta.png',
  p003: '/images/womens-collection.png',
  p004: '/images/hero-casual.png',
  p005: '/images/product-sherwani.png',
  p006: '/images/product-saree.png',
  p007: '/images/product-nehru.png',
  p008: '/images/hero-casual.png',
  p009: '/images/product-kurta.png',
  p010: '/images/festive-collection.png',
  p011: '/images/product-kurta.png',
  p012: '/images/hero-casual.png',
};

export function getProductImage(productId: string): string {
  return productImageMap[productId] || '/images/hero-casual.png';
}
