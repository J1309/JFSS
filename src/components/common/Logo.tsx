'use client';

import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

/** The real peacock J+A mark. Same asset as the preloader and hero. */
export default function Logo({
  size = 'md',
  showText = true,
  showSubtitle = true,
  className = '',
  onClick,
}: LogoProps) {
  const boxSize = { sm: 36, md: 46, lg: 56 }[size];

  return (
    <Link href="/" className={`brand-logo brand-logo-${size} ${className}`} onClick={onClick}>
      <div className="logo-symbol" style={{ width: boxSize, height: boxSize }}>
        <img src="/images/JA logo.png" alt="" className="logo-mark" />
      </div>

      {showText && (
        <div className="logo-text-group">
          <span className="logo-title">JESSAURA</span>
          {showSubtitle && <span className="logo-subtitle">DAILYWEAR</span>}
        </div>
      )}
    </Link>
  );
}
