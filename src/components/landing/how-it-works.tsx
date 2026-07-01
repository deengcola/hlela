"use client";

import { FileText, Users, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: FileText,
    step: "01",
    title: "Submit your brief",
    description:
      "Tell us your event date, size, venue, and what you need. Takes 3 minutes. No account required.",
  },
  {
    icon: Users,
    step: "02",
    title: "We match you to suppliers",
    description:
      "Within 24 hours, we send your brief to the best-matched Cape Town suppliers and collect their quotes for you.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "Compare and confirm",
    description:
      "Review quotes side by side. Ask questions. Confirm your bookings — all through one platform, no WhatsApp chaos.",
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
            From brief to booked in under 24 hours.
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
              className="relative"
            >
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
              )}
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-6">
                  <step.icon size={26} />
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
