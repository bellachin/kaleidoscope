import type { ReactElement } from 'react';
   import CtaLink from '../buttons/CtaLink';
   import './WhatWeOffer.css';

type OfferIconId = 'funding' | 'community' | 'promotion' | 'resources';

type OfferItem = {
  id: OfferIconId;
  label: string;
};

type WhatWeOfferProps = {
  heading: string;
  /** Word inside `heading` that gets the gold underline. */
  highlight?: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image?: { src: string; alt: string };
  items: readonly OfferItem[];
};

const ICONS: Record<OfferIconId, ReactElement> = {
  funding: (
    <>
      <rect x="4" y="6" width="32" height="20" rx="3" />
      <path d="M22.5 13.2c-.9-1.2-4.8-1.4-4.8 1 0 2.8 5 1.4 5 4.2 0 2.4-4.1 2.5-5.2.9M20.2 11v1.6M20.2 19.4V21" />
      <path d="M12 30v4M20 30v6M28 30v4" />
    </>
  ),
  community: (
    <>
      <circle cx="20" cy="12" r="4.5" />
      <circle cx="8.5" cy="17" r="3.5" />
      <circle cx="31.5" cy="17" r="3.5" />
      <path d="M11.5 33c0-5.2 3.8-9 8.5-9s8.5 3.8 8.5 9" />
      <path d="M3 31c0-3.6 2.2-6.2 5.5-6.2M37 31c0-3.6-2.2-6.2-5.5-6.2" />
    </>
  ),
  promotion: (
    <>
      <path d="M6 16v8h6l12 7V9l-12 7H6z" />
      <path d="M12 24l2 8h4l-2-6" />
      <path d="M29 15.5c1.8 1.4 1.8 7.6 0 9M33 11.5c4 3.6 4 13.4 0 17" />
    </>
  ),
  resources: (
    <>
      <path d="M11.5 29.5A7 7 0 0 1 11 15.6 9.5 9.5 0 0 1 29.4 13.4 8 8 0 0 1 29.5 29.5z" />
      <circle cx="15" cy="22.5" r="2" />
      <circle cx="25" cy="19" r="2" />
      <circle cx="25" cy="26" r="2" />
      <path d="M16.8 21.6l6.4-2M16.8 23.4l6.4 2" />
    </>
  ),
};

export default function WhatWeOffer({
  heading,
  highlight,
  description,
  ctaLabel,
  ctaHref,
  image,
  items,
}: WhatWeOfferProps) {
  const index = highlight ? heading.indexOf(highlight) : -1;
  const hasMark = highlight !== undefined && index !== -1;
  const before = hasMark ? heading.slice(0, index) : heading;
  const marked = hasMark ? highlight : '';
  const after = hasMark ? heading.slice(index + highlight.length) : '';

  return (
    <section id="offer" className="offer" aria-labelledby="offer-heading">
      <div className="offer__inner">
        <div className="offer__top">
          <div className="offer__copy">
            <h2 id="offer-heading" className="offer__heading">
              {before}
              {hasMark && <span className="offer__mark">{marked}</span>}
              {after}
            </h2>
            <p className="offer__description">{description}</p>
            <CtaLink href={ctaHref}>{ctaLabel}</CtaLink>
          </div>

          {image ? (
            <img src={image.src} alt={image.alt} className="offer__photo" />
          ) : (
            <div className="offer__photo offer__photo--placeholder" aria-hidden="true" />
          )}
        </div>

        <ul className="offer__icons">
          {items.map((item) => (
            <li key={item.id} className="offer__icon-item">
              <svg
                className="offer__icon"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                {ICONS[item.id]}
              </svg>
              <span className="offer__sr-only">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}