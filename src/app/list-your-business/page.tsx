"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/suppliers";

export default function ListYourBusinessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const categoryCheckboxes = form.querySelectorAll<HTMLInputElement>(
      'input[name="categories"]:checked'
    );
    const selectedCategories = Array.from(categoryCheckboxes).map((cb) => cb.value);

    const payload = {
      company_name: formData.get("company_name") as string,
      contact_name: formData.get("contact_name") as string,
      contact_email: formData.get("contact_email") as string,
      contact_phone: formData.get("contact_phone") as string,
      website: formData.get("website") as string,
      area: formData.get("area") as string,
      categories: selectedCategories,
      years_in_business: parseInt(formData.get("years_in_business") as string, 10) || 0,
      description: formData.get("description") as string,
    };

    try {
      const res = await fetch("/api/supplier-application", {
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
        <h1 className="text-3xl font-bold text-foreground">
          Application Received
        </h1>
        <p className="mt-4 text-muted text-lg max-w-md mx-auto">
          Thanks for applying to list your business on Hlela. We&apos;ll review
          your details and get back to you within 48 hours.
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
          List Your Business
        </h1>
        <p className="mt-2 text-muted">
          Get discovered by corporate event planners across Cape Town.
          Free to list — no setup fees, no contracts.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Business Details</h2>
          <Input
            id="company_name"
            name="company_name"
            label="Company Name"
            placeholder="e.g. Urbantonic"
            required
          />
          <Input
            id="website"
            name="website"
            label="Website (optional)"
            type="url"
            placeholder="https://yourcompany.co.za"
          />
          <Input
            id="area"
            name="area"
            label="Area / Suburb"
            placeholder="e.g. Paarden Eiland, Cape Town"
            required
          />
          <Input
            id="years_in_business"
            name="years_in_business"
            label="Years in Business"
            type="number"
            placeholder="e.g. 5"
            min={0}
            required
          />
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Contact Details</h2>
          <Input
            id="contact_name"
            name="contact_name"
            label="Your Name"
            placeholder="Full name"
            required
          />
          <Input
            id="contact_email"
            name="contact_email"
            label="Email"
            type="email"
            placeholder="you@company.co.za"
            required
          />
          <Input
            id="contact_phone"
            name="contact_phone"
            label="Phone"
            type="tel"
            placeholder="082 000 0000"
            required
          />
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">
            What do you hire out?
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <label
                key={cat.slug}
                className="flex items-center gap-2 text-sm text-muted cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="categories"
                  value={cat.name}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                {cat.name}
              </label>
            ))}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Tell us about your business
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="What makes your business stand out? What's your specialty?"
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
              required
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>

        <p className="text-xs text-muted text-center">
          Free to list. We&apos;ll review your application and get back to you
          within 48 hours.
        </p>
      </form>
    </div>
  );
}
