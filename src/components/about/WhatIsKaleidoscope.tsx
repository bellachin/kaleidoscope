import CtaLink from '@/components/buttons/CtaLink';
import './WhatIsKaleidoscope.css';

type WhatIsKaleidoscopeProps = {
  heading: string;
  body: string;
  /** The button renders only when both label and href are provided. */
  ctaLabel?: string;
  ctaHref?: string;
};

export default function WhatIsKaleidoscope({
  heading,
  body,
  ctaLabel,
  ctaHref,
}: WhatIsKaleidoscopeProps) {
  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="about__inner">
        <h2 id="about-heading" className="about__heading">
          {heading}
        </h2>
        <p className="about__body">{body}</p>
        {ctaLabel && ctaHref && <CtaLink href={ctaHref}>{ctaLabel}</CtaLink>}
      </div>
    </section>
  );
}