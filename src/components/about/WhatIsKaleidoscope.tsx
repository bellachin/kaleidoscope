import CtaLink from '@/components/buttons/CtaLink';
import './WhatIsKaleidoscope.css';

type WhatIsKaleidoscopeProps = {
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
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
        <CtaLink href={ctaHref}>{ctaLabel}</CtaLink>
      </div>
    </section>
  );
}