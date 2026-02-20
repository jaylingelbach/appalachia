'use client';

import { motion } from 'framer-motion';
import type { PortfolioItem as PortfolioItemType } from '@/src/data/portfolio';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  item: PortfolioItemType;
  reverse?: boolean;
};

export default function PortfolioItem({ item, reverse }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`grid md:grid-cols-2 gap-12 items-center ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
    >
      {/* Image */}
      <div className="group relative h-[420px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        )}
      </div>

      {/* Content */}
      <div>
        <p className="text-sm uppercase tracking-wider text-white/50 mb-2">
          {item.role}
        </p>

        <h3 className="text-3xl md:text-4xl font-semibold text-white">
          {item.title}
        </h3>

        <p className="mt-4 text-white/70 leading-relaxed">{item.description}</p>

        <ul className="mt-6 space-y-2">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="text-white/60 text-sm">
              • {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Link
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[#B4532A] hover:text-[#d1683c] transition-colors font-medium"
          >
            Visit Site →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
