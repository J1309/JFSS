import Link from 'next/link';
import Logo from '@/components/common/Logo';

export default function Footer() {
  return (
    <footer className="footer paisley-bg">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo size="lg" />
            <p style={{ marginTop: 'var(--space-md)' }}>
              Effortless South Asian dailywear & casual fashion for men and women.
              Crafted with breathable cottons, relaxed linens, and modern silhouettes for everyday comfort.
            </p>
          </div>

          <div className="footer-column">
            <h4>Shop Casuals</h4>
            <Link href="/shop?category=women">Women&apos;s Dailywear</Link>
            <Link href="/shop?category=men">Men&apos;s Everyday</Link>
            <Link href="/shop?type=ready-to-wear">Cotton Kurtis</Link>
            <Link href="/shop?type=semi-stitched">Short Kurtas</Link>
            <Link href="/shop">New Arrivals</Link>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">Our Story</a>
            <a href="#">Sustainable Cottons</a>
            <a href="#">Artisan Craft</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <a href="#">Contact Us</a>
            <a href="#">Size Guide</a>
            <a href="#">Shipping & Returns</a>
            <a href="#">Fabric Care</a>
            <a href="#">FAQ</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 JionaFashion. All rights reserved. Designed for everyday comfort & style.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter / X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
