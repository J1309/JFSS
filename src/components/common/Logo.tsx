'use client';

import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Logo({
  size = 'md',
  showText = true,
  showSubtitle = true,
  className = '',
  onClick,
}: LogoProps) {
  const iconSizes = {
    sm: { box: 32, svg: 20 },
    md: { box: 40, svg: 25 },
    lg: { box: 48, svg: 30 },
  };

  const currentSize = iconSizes[size];

  return (
    <Link href="/" className={`brand-logo brand-logo-${size} ${className}`} onClick={onClick}>
      {/* Monogram Diamond Symbol (JessAura J+A) */}
      <div className="logo-symbol" style={{ width: currentSize.box, height: currentSize.box }}>
        <svg
          width={currentSize.svg}
          height={currentSize.svg}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Diamond Frame */}
          <rect
            x="18"
            y="2"
            width="22.6"
            height="22.6"
            rx="3"
            transform="rotate(45 18 2)"
            stroke="currentColor"
            strokeWidth="1.6"
            className="symbol-frame"
          />
          {/* Stylized 'J' (Jess) */}
          <path
            d="M16 11V21C16 23.5 14 25 11.5 25C9.5 25 8 23.8 8 22"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="symbol-j"
          />
          {/* Stylized 'A' (Aura) */}
          <path
            d="M19.5 25L23.5 11L27.5 25M21 20H26"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="symbol-a"
          />
          {/* Aura Dot Accent */}
          <circle cx="18" cy="8" r="1.5" fill="var(--crimson)" />
        </svg>
      </div>

      {/* Brand Text Block (Optional) */}
      {showText && (
        <div className="logo-text-group">
          <span className="logo-title">JESSAURA</span>
          {showSubtitle && <span className="logo-subtitle">DAILYWEAR</span>}
        </div>
      )}
    </Link>
  );
}
