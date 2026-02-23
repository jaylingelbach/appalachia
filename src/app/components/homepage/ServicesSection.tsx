'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Gauge } from 'lucide-react';

/**
 * Render the "Our Services" section containing three interactive service cards.
 *
 * This section provides a centered header and a responsive three-column grid of
 * service cards (Web Design, Development, SEO & Performance). It intentionally
 * defines no background layers and inherits atmospheric styling from its parent
 * wrapper.
 *
 * @returns A JSX element representing the services section
 */

export default function ServicesSection() {
  return (
    <section className="relative py-28 text-white">
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-center gap-6 mb-20">
          <div className="h-px w-16 bg-white/20" />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Our Services
          </h2>
          <div className="h-px w-16 bg-white/20" />
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          <ServiceCard
            icon={<Palette size={32} />}
            title="Web Design"
            description="Modern, brand-aligned website design focused on clarity, trust, and conversion."
          />

          <ServiceCard
            icon={<Code2 size={32} />}
            title="Development"
            description="High-performance, scalable builds using modern frameworks like Next.js."
          />

          <ServiceCard
            icon={<Gauge size={32} />}
            title="SEO & Performance"
            description="Technical optimization, analytics integration, and speed-first architecture."
          />
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

/**
 * Renders a service card displaying an icon, title, and description with hover elevation and an inner glow.
 *
 * @param icon - The visual icon element shown above the title.
 * @param title - The card's heading text.
 * @param description - The card's descriptive copy shown below the title.
 * @returns The JSX element for the styled, animated service card.
 */
function ServiceCard({ icon, title, description }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative p-8 rounded-xl border border-white/10 
                 bg-gradient-to-br from-[#141414] to-[#0f0f0f] 
                 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      {/* Subtle hover glow inside card only */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(180,83,42,0.18),transparent_70%)]" />

      <div className="relative">
        <div className="mb-6 text-[#B4532A]">{icon}</div>

        <h3 className="text-xl font-semibold mb-4">{title}</h3>

        <p className="text-white/60 leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
