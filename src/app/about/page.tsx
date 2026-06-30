import Link from "next/link";
import { ArrowRight, Users, Building2, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Hlela is South Africa's first event hire marketplace. Compare, book, done.",
  alternates: {
    canonical: "/about",
  },
};

const FAQS = [
  {
    question: "What is event hire?",
    answer:
      "Event hire is the rental of equipment and infrastructure needed to run an event — marquees, furniture, decor, linen, staging, sound and lighting, generators, and catering equipment. Instead of buying these items, event planners and hosts rent them for the duration of the event from specialist hire companies.",
  },
  {
    question: "How much does marquee hire cost in Cape Town?",
    answer:
      "Marquee hire in Cape Town typically ranges from R3,000 to R15,000+ depending on size, style (stretch tent, Bedouin, or aluminium-frame marquee), and additional extras like flooring, lighting, and walling. Prices also vary by supplier and season, with peak wedding and summer months commanding higher rates. Compare suppliers on Hlela to see transparent pricing in one place.",
  },
  {
    question: "How does Hlela's pricing work for event planners?",
    answer:
      "Hlela is completely free for event planners to browse, compare, and request bookings. There is no fee to search suppliers, view pricing, or submit a booking request.",
  },
  {
    question: "How does Hlela make money?",
    answer:
      "Hlela charges suppliers a 15% commission only on confirmed bookings that come through the platform. There is no charge for enquiries that don't convert into a booking, and listing on Hlela is free for suppliers.",
  },
  {
    question: "What event categories does Hlela cover?",
    answer:
      "Hlela covers nine categories of event hire in Cape Town: furniture hire, marquee and tent hire, decor and styling, linen and tableware, staging and lighting, sound and AV, generator hire, dance floors and entertainment, and catering equipment.",
  },
  {
    question: "Is Hlela only for corporate events?",
    answer:
      "Hlela's primary focus at launch is corporate event planners — conferences, gala dinners, product launches, and team building events in Cape Town. The platform may expand to weddings and private events in future phases.",
  },
  {
    question: "How long does it take to get a quote on Hlela?",
    answer:
      "Unlike traditional event hire sourcing, which can take 3-5 days of back-and-forth via WhatsApp and email, Hlela shows transparent pricing upfront where available, and structured booking requests are typically answered by suppliers within 24 hours.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.question} className="border-b border-border pb-6">
                <h3 className="font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
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
