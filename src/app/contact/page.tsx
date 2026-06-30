"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-3xl font-bold text-foreground">Message Sent</h1>
        <p className="mt-4 text-muted text-lg max-w-md mx-auto">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 text-accent hover:text-accent-dark transition-colors"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Get in Touch
        </h1>
        <p className="mt-2 text-muted">
          Questions, feedback, or partnership enquiries — we&apos;d love to
          hear from you.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-card-hover">
        <Mail size={18} className="text-accent" />
        <a
          href="mailto:info@hlela.co.za"
          className="text-sm text-foreground hover:text-accent transition-colors"
        >
          info@hlela.co.za
        </a>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <Input id="name" name="name" label="Full Name" placeholder="Your name" required />
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="you@company.co.za"
            required
          />
          <Input
            id="subject"
            name="subject"
            label="Subject"
            placeholder="What's this about?"
            required
          />
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Tell us more..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
              required
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  );
}
