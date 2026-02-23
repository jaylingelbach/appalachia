import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630
};

export const contentType = 'image/png';

/**
 * Generates the Open Graph image for the Brown Bear Creative brand.
 *
 * @returns An ImageResponse containing the rendered 1200×630 PNG image for use in social previews.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px',
        background:
          'radial-gradient(circle at 20% 30%, rgba(180,83,42,0.35), transparent 40%), linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)',
        color: 'white',
        fontFamily: 'sans-serif'
      }}
    >
      {/* Brand Name */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -1,
          lineHeight: 1.1
        }}
      >
        Brown Bear Creative
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 40,
          marginTop: 24,
          color: '#B4532A',
          fontWeight: 600
        }}
      >
        Modern Web Design & Development
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: 26,
          marginTop: 28,
          color: '#b3b3b3'
        }}
      >
        Remote-first. Performance-driven.
      </div>
    </div>,
    {
      ...size
    }
  );
}
