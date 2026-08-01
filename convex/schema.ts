import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// Mirrors the Product interface in src/data/products.ts.
// productId preserves the original 'p001' string id so cart matching and
// the /product/[id] route keep working when consumers migrate to Convex.
export default defineSchema({
  products: defineTable({
    productId: v.string(),
    name: v.string(),
    slug: v.string(),
    price: v.number(),
    originalPrice: v.optional(v.number()),
    description: v.string(),
    shortDescription: v.string(),
    category: v.union(v.literal('men'), v.literal('women')),
    subcategory: v.string(),
    type: v.union(v.literal('ready-to-wear'), v.literal('semi-stitched')),
    fabric: v.string(),
    colors: v.array(
      v.object({ name: v.string(), hex: v.string(), image: v.string() })
    ),
    sizes: v.array(v.string()),
    images: v.array(v.string()),
    tags: v.array(v.string()),
    featured: v.boolean(),
    new: v.boolean(),
    bestSeller: v.boolean(),
    clearance: v.optional(v.boolean()),
    rating: v.number(),
    reviews: v.number(),
  })
    .index('by_slug', ['slug'])
    .index('by_productId', ['productId'])
    .index('by_category', ['category'])
    .index('by_featured', ['featured']),
});
