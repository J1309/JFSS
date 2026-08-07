/**
 * Four service promises under the hero. Every claim matches what the site
 * already commits to elsewhere — the utility bar in Navbar and the $75 free
 * shipping threshold applied in CheckoutForm — so nothing here is invented.
 */
const ico = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ITEMS = [
  {
    title: 'Free Shipping',
    note: 'On orders over $75',
    icon: (
      <svg {...ico}><path d="M1 3h13v13H1z" /><path d="M14 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="17.5" cy="18.5" r="2.5" /></svg>
    ),
  },
  {
    title: 'Easy Returns',
    note: '30-day return policy',
    icon: (
      <svg {...ico}><path d="M3 12a9 9 0 019-9 9 9 0 016.36 2.64L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 01-9 9 9 9 0 01-6.36-2.64L3 16" /><path d="M3 21v-5h5" /></svg>
    ),
  },
  {
    title: 'Small-Batch Craft',
    note: 'Handcrafted, never mass-made',
    icon: (
      <svg {...ico}><path d="M12 2l2.4 6.9H21l-5.4 4 2 6.9-5.6-4.2-5.6 4.2 2-6.9-5.4-4h6.6z" /></svg>
    ),
  },
  {
    title: 'Secure Checkout',
    note: 'Your details stay private',
    icon: (
      <svg {...ico}><rect x="3" y="10" width="18" height="11" rx="2" /><path d="M7 10V7a5 5 0 0110 0v3" /></svg>
    ),
  },
];

export default function TrustBar() {
  return (
    <section className="jf-trust" aria-label="Service promises">
      <div className="container jf-trust-grid">
        {ITEMS.map((item) => (
          <div className="jf-trust-item" key={item.title}>
            <span className="jf-trust-icon" aria-hidden="true">{item.icon}</span>
            <span className="jf-trust-text">
              <span className="jf-trust-title">{item.title}</span>
              <span className="jf-trust-note">{item.note}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
