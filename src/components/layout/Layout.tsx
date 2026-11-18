import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const primaryNavItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Resources', href: '/resources' },
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
