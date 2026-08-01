'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
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
