'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';

// NEXT_PUBLIC_CONVEX_URL is injected by `convex deploy` at build time (Vercel).
// Guarded so the app still renders locally before the backend is provisioned.
const url = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = url ? new ConvexReactClient(url) : null;

export default function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!convex) return <>{children}</>;
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
