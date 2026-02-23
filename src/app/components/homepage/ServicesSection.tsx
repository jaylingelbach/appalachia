'use client';

import { motion } from 'framer-motion';
import { Code2, Palette, Gauge } from 'lucide-react';

/**
 * ServicesSection
 *
 * IMPORTANT:
 * This section intentionally has NO background layers.
 * It inherits its atmospheric styling from the parent wrapper.
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
  icon: React.ReactNode;
  title: string;
  description: string;
};

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
