import logo from '@/assets/kaleidoscope-logo.svg';
import './Footer.css';

const kaleidoscopeLinks = ['Overview', 'Our Mission', 'Club Events'];
const resourceLinks = ['Overview', 'Our Mission', 'Club Events'];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <section className="footer__top" aria-label="Footer links and sign up">
          <div className="footer__brand-col">
            <a href="#home" className="footer__brand" aria-label="Kaleidoscope home">
              <img src={logo} alt="" className="footer__brand-logo" aria-hidden="true" />
              <span>Kaleidoscope</span>
            </a>

            <h2 className="footer__title">Join Us</h2>
            <p className="footer__description">
              Add your club&apos;s email to be informed on all upcoming events and details!
            </p>

            <form className="footer__form" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="footer-email" className="footer__sr-only">
                Email Address
              </label>
              <input
                id="footer-email"
                type="email"
                className="footer__input"
                placeholder="Email Address"
                autoComplete="email"
              />
              <button type="submit" className="footer__button">
                Join <span aria-hidden="true">&rarr;</span>
              </button>
            </form>
          </div>

          <nav className="footer__links-grid" aria-label="Footer navigation">
            <div>
              <h3 className="footer__link-heading">KALEIDOSCOPE</h3>
              <ul className="footer__links-list">
                {kaleidoscopeLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="footer__link">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="footer__link-heading">RESOURCES</h3>
              <ul className="footer__links-list">
                {resourceLinks.map((item) => (
                  <li key={item}>
                    <a href="#" className="footer__link">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </section>

        <div className="footer__divider" aria-hidden="true" />

        <section className="footer__bottom" aria-label="Footer legal and social links">
          <div className="footer__legal">
            <button type="button" className="footer__lang">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="footer__icon">
                <path
                  d="M12 2.75a9.25 9.25 0 1 0 9.25 9.25A9.26 9.26 0 0 0 12 2.75Zm6.87 8.5h-3.01a14.87 14.87 0 0 0-1.14-5.22 7.77 7.77 0 0 1 4.15 5.22Zm-6.12-5.88c.83 1.07 1.47 3.18 1.66 5.88h-4.82c.19-2.7.83-4.81 1.66-5.88a2.14 2.14 0 0 1 1.5 0ZM9.25 6.03a14.87 14.87 0 0 0-1.11 5.22h-3a7.77 7.77 0 0 1 4.11-5.22Zm-4.11 6.72h3c.03 1.82.36 3.58.97 5.22a7.77 7.77 0 0 1-3.97-5.22Zm6.11 5.88c-.83-1.07-1.47-3.18-1.66-5.88h4.82c-.19 2.7-.83 4.81-1.66 5.88a2.14 2.14 0 0 1-1.5 0Zm3.47-.66a14.87 14.87 0 0 0 1.11-5.22h3a7.77 7.77 0 0 1-4.11 5.22Z"
                  fill="currentColor"
                />
              </svg>
              English
              <span aria-hidden="true" className="footer__chev">
              </span>
            </button>
            <a href="#" className="footer__legal-link">
              Terms &amp; privacy
            </a>
        
            <span className="footer__copyright">©{currentYear} Kaleidoscope</span>
          </div>

          <div className="footer__socials" aria-label="Social links">
            <a href="#" className="footer__social" aria-label="Slack">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="footer__icon">
                <path fill="#36C5F0" d="M10.3 2a2.3 2.3 0 1 1 0 4.6H8V4.3A2.3 2.3 0 0 1 10.3 2Z" />
                <path fill="#2EB67D" d="M10.3 8h2.3v2.3a2.3 2.3 0 1 1-4.6 0A2.3 2.3 0 0 1 10.3 8Z" />
                <path fill="#ECB22E" d="M22 10.3a2.3 2.3 0 1 1-4.6 0V8h2.3a2.3 2.3 0 0 1 2.3 2.3Z" />
                <path fill="#E01E5A" d="M16 10.3v2.3h-2.3a2.3 2.3 0 1 1 0-4.6A2.3 2.3 0 0 1 16 10.3Z" />
                <path fill="#36C5F0" d="M13.7 22a2.3 2.3 0 1 1 0-4.6H16v2.3a2.3 2.3 0 0 1-2.3 2.3Z" />
                <path fill="#2EB67D" d="M13.7 16h-2.3v-2.3a2.3 2.3 0 1 1 4.6 0 2.3 2.3 0 0 1-2.3 2.3Z" />
                <path fill="#ECB22E" d="M2 13.7a2.3 2.3 0 1 1 4.6 0V16H4.3A2.3 2.3 0 0 1 2 13.7Z" />
                <path fill="#E01E5A" d="M8 13.7v-2.3h2.3a2.3 2.3 0 1 1 0 4.6A2.3 2.3 0 0 1 8 13.7Z" />
              </svg>
            </a>
            <a href="#" className="footer__social" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="footer__icon">
                <path
                  d="M6.3 8.2a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM4.8 19.2h3V9.85h-3Zm5.3 0h2.95v-5.04c0-1.33.25-2.62 1.9-2.62 1.62 0 1.64 1.51 1.64 2.7v4.96h2.96v-5.55c0-2.73-.59-4.83-3.77-4.83a3.3 3.3 0 0 0-2.97 1.63h-.04V9.85h-2.67c.03.93 0 9.35 0 9.35Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a href="#" className="footer__social" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="footer__icon">
                <path
                  d="M7.2 3.6h9.6A3.6 3.6 0 0 1 20.4 7.2v9.6a3.6 3.6 0 0 1-3.6 3.6H7.2a3.6 3.6 0 0 1-3.6-3.6V7.2a3.6 3.6 0 0 1 3.6-3.6Zm9.3 1.8H7.5A2.1 2.1 0 0 0 5.4 7.5v9a2.1 2.1 0 0 0 2.1 2.1h9a2.1 2.1 0 0 0 2.1-2.1v-9a2.1 2.1 0 0 0-2.1-2.1ZM12 8.1A3.9 3.9 0 1 1 8.1 12 3.9 3.9 0 0 1 12 8.1Zm0 1.8A2.1 2.1 0 1 0 14.1 12 2.1 2.1 0 0 0 12 9.9Zm4.35-2.67a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}
