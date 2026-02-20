export type PortfolioItem = {
  title: string;
  role: string;
  description: string;
  highlights: string[];
  liveUrl: string;
  image?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Sweetwater',
    role: 'Frontend Engineer',
    description:
      'Contributed to frontend development for one of the largest online music retailers in the U.S., collaborating within a large engineering team to deliver performant and accessible UI at scale.',
    highlights: [
      'Large-scale UI systems',
      'Performance optimization',
      'Enterprise collaboration'
    ],
    liveUrl: 'https://sweetwater.com',
    image: '/sweetwater.png'
  },
  {
    title: 'Abandoned Hobby',
    role: 'Founder & Full-Stack Engineer',
    description:
      'Built a multi-tenant marketplace platform with Stripe Connect, real-time updates, and scalable full-stack architecture using modern tooling.',
    highlights: [
      'Stripe Connect marketplace',
      'tRPC + Payload CMS backend',
      'Real-time UX patterns'
    ],
    liveUrl: 'https://abandonedhobby.com',
    image: '/ah.png'
  },
  {
    title: 'Brown Bear Pedals',
    role: 'Founder & Developer',
    description:
      'Designed and developed a modern e-commerce platform for a boutique guitar pedal brand, combining performance-focused frontend architecture with bold visual design.',
    highlights: [
      'Custom Next.js storefront',
      'Stripe Checkout integration',
      'Performance-first architecture'
    ],
    liveUrl: 'https://brownbearpedals.com',
    image: '/bbp.png'
  }
];
