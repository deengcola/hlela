"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { suppliers } from "@/data/suppliers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EVENT_TYPES } from "@/lib/types";

export default function BookingPage() {
  const { slug } = useParams<{ slug: string }>();
  const supplier = suppliers.find((s) => s.slug === slug);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  if (!supplier) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-muted">Supplier not found.</p>
        <Link href="/search" className="text-accent mt-4 inline-block">
          Back to search
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const equipmentCheckboxes = form.querySelectorAll<HTMLInputElement>(
      'input[name="equipment"]:checked'
    );
    const equipment = Array.from(equipmentCheckboxes).map((cb) => cb.value);

    const payload = {
      supplier_slug: supplier.slug,
      supplier_name: supplier.name,
      contact_name: formData.get("contact_name") as string,
      contact_email: formData.get("contact_email") as string,
      contact_phone: formData.get("contact_phone") as string,
      event_date: formData.get("event_date") as string,
      event_type: formData.get("event_type") as string,
      guest_count: parseInt(formData.get("guest_count") as string, 10),
      venue_location: formData.get("venue_location") as string,
      equipment_needed: equipment,
      notes: formData.get("notes") as string,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      setReference(data.reference);
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
          Booking Request Sent
        </h1>
        <p className="mt-4 text-muted text-lg max-w-md mx-auto">
          Your request has been sent to {supplier.name}. They&apos;ll get back
          to you within 24 hours.
        </p>
        <div className="mt-6 inline-block bg-card-hover rounded-xl px-6 py-3">
          <span className="text-sm text-muted">Reference: </span>
          <span className="font-mono font-semibold text-foreground">
            {reference}
          </span>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/search"
            className="text-accent hover:text-accent-dark transition-colors"
          >
            Browse more suppliers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href={`/suppliers/${supplier.slug}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to {supplier.name}
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Request a Booking
        </h1>
        <p className="mt-2 text-muted">
          Send a structured booking request to{" "}
          <span className="text-foreground font-medium">{supplier.name}</span>.
          Free to enquire — no commitment.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">Your Details</h2>
          <Input
            id="contact_name"
            name="contact_name"
            label="Full Name"
            placeholder="Your full name"
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
          <h2 className="font-semibold text-foreground">Event Details</h2>

          <Input
            id="event_date"
            name="event_date"
            label="Event Date"
            type="date"
            required
          />

          <div>
            <label
              htmlFor="event_type"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Event Type
            </label>
            <select
              id="event_type"
              name="event_type"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            >
              <option value="">Select event type</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <Input
            id="guest_count"
            name="guest_count"
            label="Estimated Guests"
            type="number"
            placeholder="e.g. 150"
            min={1}
            required
          />

          <Input
            id="venue_location"
            name="venue_location"
            label="Venue / Location"
            placeholder="e.g. CTICC, Cape Town"
            required
          />
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 space-y-5">
          <h2 className="font-semibold text-foreground">
            Equipment Needed
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {supplier.categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-sm text-muted cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="equipment"
                  value={cat}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                {cat}
              </label>
            ))}
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              placeholder="Describe what you need, any specific requirements, setup/collection times..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none"
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
            "Send Booking Request"
          )}
        </Button>

        <p className="text-xs text-muted text-center">
          By submitting, you agree to share your details with {supplier.name}.
          Your request is not a confirmed booking.
        </p>
      </form>
    </div>
  );
}
