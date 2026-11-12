import type { ReactNode } from 'react';
import './CtaLink.css';

type CtaLinkProps = {
  href: string;
  children: ReactNode;
};

export default function CtaLink({ href, children }: CtaLinkProps) {
  return (
    <a href={href} className="cta-link">
      {children}
      <svg
        className="cta-link__arrow"
        viewBox="0 0 16 12"
        width="16"
        height="12"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M1 6h13M9.5 1.5 14 6l-4.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}