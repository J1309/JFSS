import { mutation } from './_generated/server';
import { products } from '../src/data/products';

// One-time seed. Run from the Convex dashboard (Functions → seed → Run) after
// the first deploy. No-ops if products already exist, so it is safe to re-run.
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query('products').take(1);
    if (existing.length > 0) return 'already seeded';

    for (const { id, ...rest } of products) {
      // JSON round-trip strips undefined optionals (originalPrice, clearance),
      // which Convex rejects when passed explicitly.
      const doc = JSON.parse(JSON.stringify({ productId: id, ...rest }));
      await ctx.db.insert('products', doc);
    }
    return `seeded ${products.length} products`;
  },
});
