import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const primaryNavItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Layout() {
  return (
    <>
      <Header navItems={primaryNavItems} />
      <Outlet />
      <Footer />
    </>
  );
}
