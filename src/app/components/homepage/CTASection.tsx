'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Render a centered call-to-action section with animated heading, supporting text, and a prominent "Get In Touch" button.
 *
 * The section uses framer-motion entrance animations for the heading, paragraph, and CTA container, and relies on the surrounding layout for background/atmosphere (it includes no background layers itself). The CTA navigates to `/contact`.
 *
 * @returns The CTA section element containing the animated heading, description, and link-styled button
 */

export default function CTASection() {
  return (
    <section className="relative py-28 text-white">
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Let&apos;s Build Something Great
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-white/60 text-lg"
        >
          If you&apos;re ready to elevate your online presence, let&apos;s talk
          about your vision.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-lg bg-[#B4532A] text-white font-medium 
                       hover:bg-[#d1683c] transition-all duration-300 
                       shadow-lg hover:shadow-[0_10px_40px_rgba(180,83,42,0.35)]"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
