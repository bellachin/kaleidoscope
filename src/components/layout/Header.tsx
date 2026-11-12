import { useState } from 'react';
import logo from '@/assets/kaleidoscope-logo.svg';
import './Header.css';

type HeaderNavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  brandName?: string;
  brandHref?: string;
  navItems?: HeaderNavItem[];
};

const defaultNavItems: HeaderNavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Header({
  brandName = 'Kaleidoscope',
  brandHref = '/',
  navItems = defaultNavItems,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header" id="home">
      <div className="header__inner">
        <a href={brandHref} className="header__brand" onClick={handleNavClick}>
          <img src={logo} alt="" className="header__brand-logo" aria-hidden="true" />
          <span>{brandName}</span>
        </a>

        <button
          type="button"
          className="header__menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((previousState) => !previousState)}
        >
          <span className="header__menu-toggle-line" />
          <span className="header__menu-toggle-line" />
          <span className="header__menu-toggle-line" />
        </button>

        <nav
          id="site-navigation"
          className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`}
          aria-label="Primary"
        >
          <ul className="header__nav-list">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="header__nav-link" onClick={handleNavClick}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
