'use client';

import { useState, useRef, useEffect } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submitted) {
      successRef.current?.focus();
    }
  }, [submitted]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(event.currentTarget);

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      message: String(formData.get('message') ?? '')
    };

    let controller = new AbortController();
    let timeoutId = setTimeout(() => controller.abort(), 10_000);

    try {
      timeoutId = setTimeout(() => controller.abort(), 10_000);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? 'Submission failed');
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      if (error instanceof DOMException && error.name === 'AbortError') {
        setErrorMsg('Request timed out. Please try again.');
        return;
      }
      const msg =
        error instanceof Error && error.message !== 'Submission failed'
          ? error.message
          : 'Something went wrong. Please try again.';
      setErrorMsg(msg);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="text-center py-16 border border-white/10 rounded-xl bg-[#111]"
        role="status"
        ref={successRef}
        tabIndex={-1}
      >
        <h2 className="text-2xl font-semibold mb-4">
          Thanks — I’ll be in touch soon.
        </h2>
        <p className="text-white/60">
          I typically respond within 1–2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="contact-form"
      aria-labelledby="contact-form-title"
      aria-busy={loading}
      className="p-10 rounded-xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#0f0f0f] shadow-[0_30px_80px_rgba(0,0,0,0.6)] space-y-6"
    >
      <h2 id="contact-form-title" className="sr-only">
        Contact form
      </h2>
      <Input label="Name" name="name" autoComplete="name" required />
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
      />
      <Input
        label="Company (Optional)"
        name="company"
        autoComplete="organization"
      />
      <Textarea label="Project Details" name="message" required />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-lg bg-[#B4532A] hover:bg-[#9e4623] transition-colors font-medium disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e07a4d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
      >
        {loading ? 'Sending…' : 'Send Message'}
      </button>
      {errorMsg && (
        <p role="alert" className="text-red-400 text-sm text-center">
          {errorMsg}
        </p>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {loading ? 'Sending your message.' : ''}
      </p>
    </form>
  );
}

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
      <label htmlFor={textareaId} className="block text-sm text-white/60 mb-2">
        {label}
      </label>
      <textarea
        id={textareaId}
        name={name}
        required={required}
        rows={5}
        className="w-full px-4 py-3 rounded-md bg-black/40 border border-white/10 focus:outline-hidden focus:ring-2 focus:ring-[#B4532A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] text-white resize-none"
      />
    </div>
  );
}
