"use client";

import { motion } from "framer-motion";
import { FileText, Building2 } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-foreground text-background px-8 py-16 sm:px-16 sm:py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10" />

          <div className="relative text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              The first place to go when planning your next event
            </h2>
            <p className="text-background/70 text-lg max-w-xl mx-auto mb-10">
              Whether you&apos;re organising a 50-person boardroom lunch or a
              5,000-person festival — Hlela connects you to the right Cape Town
              suppliers in hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  document
                    .getElementById("event-brief")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors text-base cursor-pointer"
              >
                <FileText size={18} />
                Submit an Event Brief
              </button>
              <a
                href="/list-your-business"
                className="inline-flex items-center gap-2 px-8 py-4 bg-background/10 text-background rounded-xl font-semibold hover:bg-background/20 transition-colors text-base border border-background/20"
              >
                <Building2 size={18} />
                List Your Business
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
