import type { ReactNode } from 'react';
import './FeaturedBand.css';

type FeaturedBandProps = {
  children?: ReactNode;
};

// Full-width sky-blue band. The design leaves it empty, so it renders blank until
// content (for example a video or photo) is passed in as children.
export default function FeaturedBand({ children }: FeaturedBandProps) {
  return (
    <section className="band">
      <div className="band__inner">{children}</div>
    </section>
  );
}
