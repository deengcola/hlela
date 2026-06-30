import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Hlela is free to browse and free to list. Suppliers pay a small commission only when a booking is confirmed.",
};

const PLANS = [
  {
    name: "Free Listing",
    price: "R0",
    period: "forever",
    description: "Get discovered by corporate event planners across Cape Town.",
    features: [
      "Full supplier profile",
      "Listed in search & categories",
      "Receive structured booking requests",
      "Respond directly to enquiries",
      "No setup fees, no contracts",
    ],
    cta: "List Your Business",
    href: "/list-your-business",
    highlighted: false,
  },
  {
    name: "Featured Supplier",
    price: "R500",
    period: "per month",
    description: "Priority placement for suppliers who want more enquiries.",
    features: [
      "Everything in Free Listing",
      "Top placement in search results",
      "Featured badge on your profile",
      "Priority placement in your category",
      "Monthly performance report",
    ],
    cta: "Get Featured",
    href: "/list-your-business",
    highlighted: true,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          Simple, transparent pricing
        </h1>
        <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
          Free for event planners. Free to list as a supplier. We only succeed
          when you do.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-8 ${
              plan.highlighted
                ? "border-accent bg-accent/5 relative"
                : "border-border bg-card"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-8 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                Most Popular
              </span>
            )}
            <h2 className="text-xl font-semibold text-foreground">
              {plan.name}
            </h2>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-foreground">
                {plan.price}
              </span>
              <span className="text-muted">/{plan.period}</span>
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {plan.description}
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check size={18} className="text-accent shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.href}
              className={`mt-8 flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-medium transition-colors ${
                plan.highlighted
                  ? "bg-accent text-white hover:bg-accent-dark"
                  : "border-2 border-border text-foreground hover:bg-card-hover"
              }`}
            >
              {plan.cta}
              <ArrowRight size={18} />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 max-w-2xl mx-auto text-center">
        <h2 className="text-xl font-semibold text-foreground mb-3">
          How commission works
        </h2>
        <p className="text-muted leading-relaxed">
          When a booking request you receive through Hlela turns into a
          confirmed event, we charge a 15% commission on the booking value.
          No commission on enquiries that don&apos;t convert. You only pay
          when you get paid.
        </p>
      </div>
    </div>
  );
}
