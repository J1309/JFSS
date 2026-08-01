import { query } from './_generated/server';
import { v } from 'convex/values';

export const list = query({
  args: {},
  handler: (ctx) => ctx.db.query('products').collect(),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: (ctx, { slug }) =>
    ctx.db
      .query('products')
      .withIndex('by_slug', (q) => q.eq('slug', slug))
      .unique(),
});

export const getByProductId = query({
  args: { productId: v.string() },
  handler: (ctx, { productId }) =>
    ctx.db
      .query('products')
      .withIndex('by_productId', (q) => q.eq('productId', productId))
      .unique(),
});

export const featured = query({
  args: {},
  handler: (ctx) =>
    ctx.db
      .query('products')
      .withIndex('by_featured', (q) => q.eq('featured', true))
      .collect(),
});
