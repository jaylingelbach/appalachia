'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * CTASection
 *
 * IMPORTANT:
 * This section also has NO background layers.
 * It relies entirely on the shared atmospheric wrapper.
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
          Let’s Build Something Great
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-white/60 text-lg"
        >
          If you're ready to elevate your online presence, let's talk about your
          vision.
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
