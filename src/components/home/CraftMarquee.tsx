'use client';

/**
 * Thin kinetic band of fabrics & techniques — editorial texture between the
 * hero and the collections. Dark ink strip; loops via the shared .jf-slide
 * keyframe (paused under prefers-reduced-motion in globals.css).
 */
const WORDS = [
  'Organic Cotton',
  'Lucknowi Chikankari',
  'Slub Linen',
  'Mulmul',
  'Hand-Block Print',
  'Chanderi Weave',
  'Everyday Comfort',
];

export default function CraftMarquee() {
  const loop = [...WORDS, ...WORDS];
  return (
    <div className="jf-craft" aria-hidden="true">
      <div className="jf-craft-track">
        {loop.map((w, i) => (
          <span className="jf-craft-item" key={`${w}-${i}`}>
            <span>{w}</span>
            <span className="jf-craft-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
