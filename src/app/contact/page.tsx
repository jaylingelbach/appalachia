import ContactForm from '@/src/app/components/contact/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Let's build something great — reach out to discuss your project."
};

export default function ContactPage() {
  return (
    <div className="relative bg-[#0a0a0a] min-h-screen text-white overflow-hidden">
      <a
        href="#contact-main"
        className="absolute left-4 top-4 -translate-y-24 focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a4d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] z-20 rounded-md bg-[#111] px-4 py-2 text-sm"
      >
        Skip to contact form
      </a>
      {/* Warm Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(180,83,42,0.18),rgba(180,83,42,0.06)_50%,transparent_85%)] pointer-events-none" />

      <main
        id="contact-main"
        className="relative max-w-3xl mx-auto px-6 py-32"
        tabIndex={-1}
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Let’s Build Something Great
          </h1>

          <p className="mt-6 text-white/60 text-lg">
            Tell me a bit about your project and I’ll get back to you within 1–2
            business days.
          </p>
        </div>

        <ContactForm />
      </main>
    </div>
  );
}
