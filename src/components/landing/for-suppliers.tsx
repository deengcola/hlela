"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Users, BadgeCheck, ArrowRight } from "lucide-react";

const BENEFITS = [
  {
    icon: Users,
    title: "Access corporate clients you can't find yourself",
    desc: "Event planners at Allan Gray, Sanlam, and Capitec use Hlela to source equipment. Get in front of the clients who book repeatedly and pay on time.",
  },
  {
    icon: TrendingUp,
    title: "Qualified leads — not time-wasters",
    desc: "Every brief on Hlela includes the event date, size, venue, and budget. No more WhatsApp messages from people who want 200 chairs for R500 tomorrow.",
  },
  {
    icon: BadgeCheck,
    title: "A professional profile you don't have to build",
    desc: "Your Hlela profile looks better than most supplier websites. Share it with your own clients as a professional portfolio.",
  },
];

export function ForSuppliers() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="rounded-3xl bg-foreground text-background p-8 sm:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/5" />
              <div className="relative">
                <p className="text-background/60 text-sm font-medium uppercase tracking-wider mb-6">
                  Supplier snapshot
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Enquiries this month", value: "12", positive: true },
                    { label: "Profile views", value: "340", positive: true },
                    { label: "Avg. response time", value: "4 hrs", positive: true },
                    { label: "Commission only on confirmed", value: "15%", positive: null },
                  ].map(({ label, value, positive }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-background/10 last:border-0">
                      <span className="text-background/70 text-sm">{label}</span>
                      <span className={`font-bold text-lg ${positive === true ? "text-accent" : positive === false ? "text-red-400" : "text-background"}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 rounded-2xl bg-background/10">
                  <p className="text-background/80 text-sm">
                    <strong className="text-background">Free to list</strong> for the first 60 days. We only earn when you earn.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-accent text-white rounded-2xl px-5 py-3 shadow-lg shadow-accent/30">
              <p className="text-xs font-medium opacity-80">New enquiry</p>
              <p className="text-sm font-bold">Allan Gray — 450 guests</p>
            </div>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">
              For suppliers
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-6">
              Grow your hire business with{" "}
              <span className="text-accent font-[family-name:var(--font-instrument)] italic">
                zero upfront cost
              </span>
            </h2>

            <div className="space-y-8 mb-10">
              {BENEFITS.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <b.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/list-your-business"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-xl font-semibold hover:bg-foreground/80 transition-colors"
            >
              List Your Business
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
