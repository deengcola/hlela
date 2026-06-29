import Link from "next/link";
import { ArrowRight, Users, Building2, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Hlela is South Africa's first event hire marketplace. Compare, book, done.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
          Event hire,{" "}
          <span className="text-accent font-[family-name:var(--font-instrument)] italic">
            simplified
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Hlela is South Africa&apos;s first event hire marketplace. We connect
          corporate event planners with verified hire companies — transparent
          pricing, real reviews, one platform.
        </p>
      </div>

      <div className="space-y-20">
        {/* The Problem */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            The problem we&apos;re solving
          </h2>
          <p className="text-muted leading-relaxed">
            Planning a corporate event in South Africa means contacting 10+
            suppliers individually via WhatsApp, waiting days for quotes, and
            comparing prices manually in a spreadsheet. There&apos;s no
            transparency, no reviews, no way to know if you&apos;re getting a
            fair deal. Hlela changes that.
          </p>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            How Hlela works
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    For Event Planners
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    Browse verified suppliers, compare transparent pricing, read
                    reviews from other planners, and request bookings — all from
                    one platform. No more WhatsApp chaos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    For Suppliers
                  </h3>
                  <p className="mt-1 text-sm text-muted leading-relaxed">
                    Get discovered by corporate planners actively looking for
                    event equipment. Showcase your inventory, pricing, and
                    reviews. Receive structured booking requests instead of vague
                    WhatsApp messages.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                <Zap size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  Why &ldquo;Hlela&rdquo;?
                </h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  Hlela means &ldquo;to arrange&rdquo; in Zulu — exactly what
                  event planners do every day. We chose a name rooted in South
                  Africa because this platform is built for our market, by our
                  people.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-card-hover rounded-3xl px-8 py-16">
          <h2 className="text-2xl font-bold text-foreground">
            Ready to simplify your next event?
          </h2>
          <p className="mt-3 text-muted">
            Browse Cape Town&apos;s top event hire companies right now.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 mt-6 px-8 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors"
          >
            Find Suppliers
            <ArrowRight size={20} />
          </Link>
        </section>
      </div>
    </div>
  );
}
