import Link from 'next/link';

/**
 * Full-bleed navy statement band — breaks the ivory rhythm mid-page with a
 * single brand line, a gold rule, and the peacock mark as a quiet watermark.
 */
export default function StatementBand() {
  return (
    <section className="jf-statement">
      <img src="/images/JA logo.png" alt="" className="jf-statement-mark" aria-hidden="true" />
      <div className="container jf-statement-inner">
        <span className="jf-statement-rule" aria-hidden="true" />
        <h2 className="jf-statement-line">
          Heritage craft, <span className="gold">worn lightly.</span>
        </h2>
        <p className="jf-statement-sub">
          Block-printed, handloomed, and cut for real days — not just occasions.
        </p>
        <Link href="/shop" className="jf-statement-cta">
          Browse the collection
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
