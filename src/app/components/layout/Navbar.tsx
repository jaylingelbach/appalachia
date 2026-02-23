'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

/**
 * Top navigation bar that animates into view and switches styling when the page is scrolled.
 *
 * Renders the site's header containing the logo and primary navigation links; the header
 * applies an entrance animation and toggles between transparent and translucent backgrounds
 * based on the vertical scroll position (threshold: 40px).
 *
 * @returns A React header element with logo and navigation links, styled and animated for the top of the page.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`transition-all duration-300 ${
        scrolled ? 'bg-black/70 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-light.svg"
            alt="Brown Bear Creative"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-white/80">
          <Link href="#work" className="hover:text-white transition-colors">
            Work
          </Link>

          <Link href="#services" className="hover:text-white transition-colors">
            Services
          </Link>

          <Link
            href="/contact"
            className="px-4 py-2 rounded-md bg-[#B4532A] text-white hover:bg-[#9e4623] transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
