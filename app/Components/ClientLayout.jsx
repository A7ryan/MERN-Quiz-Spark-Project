// app/components/ClientLayout.jsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/quiz-start';

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}