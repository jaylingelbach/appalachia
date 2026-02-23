import CTASection from '@/src/app/components/homepage/CTASection';
import HeroSection from '@/src/app/components/homepage/HeroSection';
import PortfolioSection from '@/src/app/components/homepage/PortfolioSection';
import ServicesSection from '@/src/app/components/homepage/ServicesSection';

export default function Home() {
  return (
    <div>
      <HeroSection />

      <div className="relative bg-[#0a0a0a] overflow-hidden">
        {/* Top Seam Blend */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />

        {/* Cinematic Warm Atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(180,83,42,0.18),rgba(180,83,42,0.07)_55%,transparent_90%)]" />
        </div>

        {/* Mountain Depth */}
        <div className="absolute bottom-0 left-0 w-full h-[600px] pointer-events-none">
          <div className="w-full h-full bg-[linear-gradient(to_top,#0a0a0a_20%,transparent_80%),radial-gradient(ellipse_at_30%_100%,#111_45%,transparent_60%),radial-gradient(ellipse_at_60%_100%,#141414_45%,transparent_60%),radial-gradient(ellipse_at_85%_100%,#121212_45%,transparent_60%)]" />
        </div>

        <div className="relative">
          <PortfolioSection />
          <ServicesSection />
          <CTASection />
        </div>
      </div>
    </div>
  );
}
