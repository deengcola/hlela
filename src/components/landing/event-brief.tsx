"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2, Shield, Clock, Star } from "lucide-react";

const EVENT_TYPES = [
  "Corporate Conference",
  "Gala / Awards Dinner",
  "Product Launch",
  "Year-End Function",
  "Team Building",
  "Exhibition / Trade Show",
  "Concert / Festival",
  "Sporting Event",
  "Private Function",
  "Other",
];

const EQUIPMENT_CATEGORIES = [
  "Furniture Hire",
  "Marquee & Tent Hire",
  "Decor & Styling",
  "Linen & Tableware",
  "Staging & Lighting",
  "Sound & AV",
  "Generator Hire",
  "Barricades & Crowd Control",
  "Catering Equipment",
  "Dance Floors",
];

const GUEST_RANGES = [
  "Under 50",
  "50–100",
  "100–250",
  "250–500",
  "500–1,000",
  "1,000+",
];

const BUDGET_RANGES = [
  "Under R10,000",
  "R10,000–R25,000",
  "R25,000–R50,000",
  "R50,000–R100,000",
  "R100,000–R250,000",
  "R250,000+",
  "Prefer not to say",
];

export function EventBrief() {
  const [form, setForm] = useState({
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    company: "",
    event_type: "",
    event_date: "",
    guest_range: "",
    venue: "",
    budget_range: "",
    equipment: [] as string[],
    additional_notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const toggleEquipment = (item: string) => {
    setForm((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(item)
        ? prev.equipment.filter((e) => e !== item)
        : [...prev.equipment, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/event-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
      setTimeout(() => {
        document.getElementById("event-brief")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } catch {
      setError("Something went wrong. Please try again or email info@hlela.co.za");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSavePassword = async () => {
    if (password.length < 6) return;
    setSavingPassword(true);
    await fetch("/api/planner/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.contact_email, password }),
    });
    setSavingPassword(false);
    setPasswordSaved(true);
  };

  if (submitted) {
    return (
      <section id="event-brief" className="py-20 sm:py-28 bg-card">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-background rounded-3xl border border-border p-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Brief received!
            </h3>
            <p className="text-muted leading-relaxed mb-2">
              We&apos;ll be in touch within 24 hours with matched quotes from Cape Town&apos;s top suppliers.
            </p>
            <p className="text-sm text-muted mb-8">
              Check <strong>{form.contact_email}</strong>
            </p>

            {/* Silent account activation */}
            {!passwordSaved ? (
              <div className="border-t border-border pt-8">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Save your event history
                </p>
                <p className="text-sm text-muted mb-4">
                  We&apos;ve created a free Hlela account for you. Set a password to track your quotes and manage future events.
                </p>
                <div className="flex gap-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a password (min 6 chars)"
                    className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  />
                  <button
                    onClick={handleSavePassword}
                    disabled={password.length < 6 || savingPassword}
                    className="px-5 py-3 bg-accent text-white rounded-xl font-medium text-sm hover:bg-accent-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                  >
                    {savingPassword ? "Saving..." : "Activate"}
                  </button>
                </div>
                <button
                  onClick={() => setPasswordSaved(true)}
                  className="mt-3 text-xs text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  Skip for now
                </button>
              </div>
            ) : (
              <div className="border-t border-border pt-8">
                <p className="text-sm text-accent font-medium">
                  ✓ Account activated — we&apos;ll recognise you next time you visit.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="event-brief" className="py-20 sm:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: Pitch */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                Get quotes from{" "}
                <span className="text-accent font-[family-name:var(--font-instrument)] italic">
                  5 suppliers
                </span>{" "}
                in 24 hours
              </h2>
              <p className="mt-5 text-muted text-lg leading-relaxed">
                Tell us about your event. We do the legwork — matching your
                brief to the right Cape Town suppliers and collecting their
                quotes for you.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    icon: Clock,
                    title: "24-hour turnaround",
                    desc: "Quotes delivered to your inbox the next business day.",
                  },
                  {
                    icon: Star,
                    title: "Pre-vetted suppliers only",
                    desc: "Every supplier on Hlela is verified before they can quote.",
                  },
                  {
                    icon: Shield,
                    title: "No obligation",
                    desc: "Receive quotes, compare, and decide. Completely free.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <p className="text-muted text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-background rounded-3xl border border-border p-8 sm:p-10 shadow-sm"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Your event brief
              </h3>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Your name <span className="text-accent">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.contact_name}
                    onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Email address <span className="text-accent">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={form.contact_email}
                    onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                    placeholder="jane@company.co.za"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Phone number <span className="text-accent">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.contact_phone}
                    onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                    placeholder="071 234 5678"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  />
                </div>
              </div>

              <div className="border-t border-border pt-6 mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">Event Details</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Event type <span className="text-accent">*</span>
                  </label>
                  <select
                    required
                    value={form.event_type}
                    onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  >
                    <option value="">Select type...</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Event date <span className="text-accent">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    value={form.event_date}
                    onChange={(e) => setForm({ ...form, event_date: e.target.value })}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Number of guests <span className="text-accent">*</span>
                  </label>
                  <select
                    required
                    value={form.guest_range}
                    onChange={(e) => setForm({ ...form, guest_range: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  >
                    <option value="">Select range...</option>
                    {GUEST_RANGES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Approximate budget
                  </label>
                  <select
                    value={form.budget_range}
                    onChange={(e) => setForm({ ...form, budget_range: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                  >
                    <option value="">Select range...</option>
                    {BUDGET_RANGES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Venue / Location <span className="text-accent">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.venue}
                  onChange={(e) => setForm({ ...form, venue: e.target.value })}
                  placeholder="CTICC, Cape Town / TBD"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm"
                />
              </div>

              {/* Equipment Categories */}
              <div className="border-t border-border pt-6 mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-4">
                  What do you need? <span className="text-accent">*</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {EQUIPMENT_CATEGORIES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleEquipment(item)}
                      className={`text-left px-3 py-2.5 rounded-xl border text-sm transition-all cursor-pointer ${
                        form.equipment.includes(item)
                          ? "border-accent bg-accent/10 text-accent font-medium"
                          : "border-border text-muted hover:border-accent/50 hover:text-foreground"
                      }`}
                    >
                      {form.equipment.includes(item) ? "✓ " : ""}{item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mt-6 mb-6">
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Anything else we should know?
                </label>
                <textarea
                  rows={3}
                  value={form.additional_notes}
                  onChange={(e) => setForm({ ...form, additional_notes: e.target.value })}
                  placeholder="Specific requirements, style preferences, setup times, access constraints..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-sm resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting || form.equipment.length === 0}
                className="w-full py-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Brief — Get Quotes Within 24 Hours"
                )}
              </button>

              <p className="text-center text-xs text-muted mt-4">
                Free &middot; No obligation &middot; Your details are never shared without your permission
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
