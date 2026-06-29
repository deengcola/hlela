"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-foreground text-background px-8 py-16 sm:px-16 sm:py-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Ready to plan your next event?
            </h2>
            <p className="mt-4 text-lg text-background/70 max-w-lg mx-auto">
              Join the corporate planners who compare and book event hire in
              minutes, not days.
            </p>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors text-lg"
            >
              Find Suppliers
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
