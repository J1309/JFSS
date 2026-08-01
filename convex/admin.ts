import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Admin auth: every mutation takes adminKey and checks it against the
// ADMIN_KEY env var set in the Convex dashboard (Settings → Environment
// Variables). Not multi-user auth — honest protection for a small store.
function checkKey(adminKey: string) {
  const expected = process.env.ADMIN_KEY;
  if (!expected || adminKey !== expected) {
    throw new Error('Invalid admin key');
  }
}

const productFields = {
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
};

export const verifyKey = query({
  args: { adminKey: v.string() },
  handler: (_ctx, { adminKey }) => {
    checkKey(adminKey);
    return true;
  },
});

export const createProduct = mutation({
  args: { adminKey: v.string(), product: v.object(productFields) },
  handler: async (ctx, { adminKey, product }) => {
    checkKey(adminKey);
    const productId = `p${Date.now().toString(36)}`;
    return ctx.db.insert('products', { productId, ...product });
  },
});

export const updateProduct = mutation({
  args: {
    adminKey: v.string(),
    id: v.id('products'),
    patch: v.object({
      name: v.optional(v.string()),
      slug: v.optional(v.string()),
      price: v.optional(v.number()),
      originalPrice: v.optional(v.number()),
      description: v.optional(v.string()),
      shortDescription: v.optional(v.string()),
      category: v.optional(v.union(v.literal('men'), v.literal('women'))),
      subcategory: v.optional(v.string()),
      type: v.optional(
        v.union(v.literal('ready-to-wear'), v.literal('semi-stitched'))
      ),
      fabric: v.optional(v.string()),
      sizes: v.optional(v.array(v.string())),
      tags: v.optional(v.array(v.string())),
      featured: v.optional(v.boolean()),
      new: v.optional(v.boolean()),
      bestSeller: v.optional(v.boolean()),
      clearance: v.optional(v.boolean()),
      rating: v.optional(v.number()),
      reviews: v.optional(v.number()),
    }),
  },
  handler: async (ctx, { adminKey, id, patch }) => {
    checkKey(adminKey);
    await ctx.db.patch(id, patch);
  },
});

export const deleteProduct = mutation({
  args: { adminKey: v.string(), id: v.id('products') },
  handler: async (ctx, { adminKey, id }) => {
    checkKey(adminKey);
    await ctx.db.delete(id);
  },
});
