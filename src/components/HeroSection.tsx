'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero-bg.png"
        alt="Mountain landscape"
        fill
        priority
        className="object-cover scale-105"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/80" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-tight">
            Web Design & Development
            <span className="block text-white/90">for Small Businesses</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
            Crafting high-performing websites that elevate your brand, drive
            results, and make a lasting impact.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/work"
              className="px-8 py-4 rounded-md font-medium text-white bg-[#B4532A] hover:bg-[#9e4623] transition-colors duration-300"
            >
              View Our Work
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 rounded-md font-medium text-white border border-white/30 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              Get a Free Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
