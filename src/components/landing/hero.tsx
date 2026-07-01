"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

export function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Cape Town&apos;s first event hire marketplace
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Plan your event.{" "}
            <span className="text-accent font-[family-name:var(--font-instrument)] italic">
              Find everything.
            </span>{" "}
            Book in minutes.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Submit your event brief and receive quotes from Cape Town&apos;s top
            hire suppliers within 24 hours. Marquees, furniture, barricades,
            lighting, generators — all in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                document
                  .getElementById("event-brief")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors text-base shadow-lg shadow-accent/20 cursor-pointer"
            >
              <FileText size={18} />
              Submit Your Event Brief
            </button>
            <button
              onClick={() => router.push("/search")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border border-border text-foreground hover:border-accent hover:text-accent transition-colors text-base cursor-pointer"
            >
              Browse Suppliers
              <ArrowRight size={18} />
            </button>
          </div>

          <p className="mt-6 text-sm text-muted">
            Free to use &middot; No obligation &middot; Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
