'use client';

import { useState } from 'react';
import { useConvex } from 'convex/react';
import { anyApi } from 'convex/server';

export default function Newsletter() {
  const convex = useConvex();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Backend optional: the signup still confirms locally when Convex isn't wired.
    if (process.env.NEXT_PUBLIC_CONVEX_URL) {
      try {
        await convex.mutation(anyApi.orders.subscribe, { email, source: 'homepage' });
      } catch {
        /* non-blocking — never trap a visitor on a newsletter box */
      }
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="jf-news">
      <div className="container jf-news-inner">
        <div className="jf-news-copy">
          <span className="jf-eyebrow">Stay connected</span>
          <h2 className="jf-news-title">First to know, first to wear</h2>
          <p className="jf-news-sub">
            New collections, artisan stories, and early access — no noise.
          </p>
        </div>

        <form className="jf-news-form" onSubmit={handleSubmit}>
          <label htmlFor="jf-news-email" className="sr-only">Email address</label>
          <input
            id="jf-news-email"
            type="email"
            className="jf-news-input"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="jf-btn jf-btn-primary" type="submit">
            {submitted ? '✓ Subscribed' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
