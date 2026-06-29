"use client";

import { Search, GitCompareArrows, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: Search,
    title: "Search",
    description:
      "Browse Cape Town's top event hire companies by category, location, or equipment type.",
  },
  {
    icon: GitCompareArrows,
    title: "Compare",
    description:
      "See transparent pricing, read verified reviews, and compare suppliers side by side.",
  },
  {
    icon: CalendarCheck,
    title: "Book",
    description:
      "Request a booking with a structured form. No WhatsApp chaos. Get a response in hours, not days.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            How it works
          </h2>
          <p className="mt-4 text-muted text-lg max-w-lg mx-auto">
            From search to booking in minutes, not days.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-6">
                <step.icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
