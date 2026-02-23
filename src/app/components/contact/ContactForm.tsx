'use client';

import { useState, useRef, useEffect } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      // TEMP: fake submit delay
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSubmitted(true);
    } catch {
      // TODO: surface an error message to the user
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Always-present live region — text change triggers announcement */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {submitted
          ? "Thanks — I'll be in touch soon. I typically respond within 1–2 business days."
          : ''}
      </div>

      {submitted ? (
        <div
          className="text-center py-16 border border-white/10 rounded-xl bg-[`#111`]"
          role="status"
          ref={successRef}
          tabIndex={-1}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Thanks — I'll be in touch soon.
          </h2>
          <p className="text-white/60">
            I typically respond within 1–2 business days.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          id="contact-form"
          aria-labelledby="contact-form-title"
          aria-busy={loading}
          className="p-10 rounded-xl border border-white/10 bg-gradient-to-br from-[`#141414`] to-[`#0f0f0f`] shadow-[0_30px_80px_rgba(0,0,0,0.6)] space-y-6"
        >
          {/* ... existing form content unchanged ... */}
        </form>
      )}
    </>
  );

  function Input({
    label,
    name,
    type = 'text',
    autoComplete,
    required = false
  }: {
    label: string;
    name: string;
    type?: React.HTMLInputTypeAttribute;
    autoComplete?: string;
    required?: boolean;
  }) {
    const inputId = `contact-${name}`;

    return (
      <div>
        <label htmlFor={inputId} className="block text-sm text-white/60 mb-2">
          {label}
        </label>
        <input
          id={inputId}
          type={type}
          name={name}
          autoComplete={autoComplete}
          required={required}
          className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-hidden focus:ring-2 focus:ring-[#B4532A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] text-white"
        />
      </div>
    );
  }

  function Textarea({
    label,
    name,
    required = false
  }: {
    label: string;
    name: string;
    required?: boolean;
  }) {
    const textareaId = `contact-${name}`;

    return (
      <div>
        <label
          htmlFor={textareaId}
          className="block text-sm text-white/60 mb-2"
        >
          {label}
        </label>
        <textarea
          id={textareaId}
          name={name}
          required={required}
          rows={5}
          className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-hidden focus:ring-2 focus:ring-[`#B4532A`] focus-visible:ring-offset-2 focus-visible:ring-offset-[`#111`] text-white resize-none"
        />
      </div>
    );
  }
}
