import MarkedText from '@/components/ui/MarkedText';
import './ClubForms.css';

type FormCard = {
  id: string;
  title: string;
  headline: string;
  summary: string;
  items: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  /** Highlighted card (blue, taller). */
  featured?: boolean;
};

type ClubFormsProps = {
  heading: string;
  highlight?: string;
  intro: string;
  forms: readonly FormCard[];
};

export default function ClubForms({ heading, highlight, intro, forms }: ClubFormsProps) {
  return (
    <section id="forms" className="forms" aria-labelledby="forms-heading">
      <div className="forms__inner">
        <h2 id="forms-heading" className="forms__heading">
          <MarkedText text={heading} highlight={highlight} />
        </h2>
        <p className="forms__intro">{intro}</p>

        <ul className="forms__grid">
          {forms.map((form) => (
            <li
              key={form.id}
              className={`forms__card${form.featured ? ' forms__card--featured' : ''}`}
            >
              <h3 className="forms__card-title">{form.title}</h3>
              <p className="forms__card-headline">{form.headline}</p>
              <p className="forms__card-summary">{form.summary}</p>

              <ul className="forms__checklist">
                {form.items.map((item, i) => (
                  <li key={`${form.id}-${i}`} className="forms__check-item">
                    <svg
                      className="forms__check-icon"
                      viewBox="0 0 16 16"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <circle cx="8" cy="8" r="6.5" />
                      <path d="M5.2 8.2l1.9 1.9 3.7-3.8" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a className="forms__cta" href={form.ctaHref}>
                {form.ctaLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
