import PortfolioItem from './PortfolioItem';
import { portfolioItems } from '@/src/data/portfolio';

/**
 * Renders the "Selected Work" portfolio section.
 *
 * Displays a header with a title and description, then renders all portfolio
 * items in sequence, alternating item layout based on their index.
 *
 * Important: do not apply a background color to this section — it inherits the
 * surrounding atmospheric wrapper.
 *
 * @returns The rendered section element containing the portfolio content.
 */

export default function PortfolioSection() {
  return (
    <section className="relative py-28 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Selected Work
          </h2>
          <p className="mt-6 text-lg text-white/70">
            A mix of founder-led products and professional engineering
            experience, demonstrating modern web architecture, scalable systems,
            and performance-driven development.
          </p>
        </div>

        <div className="space-y-28">
          {portfolioItems.map((item, index) => (
            <PortfolioItem
              key={item.title}
              item={item}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
