"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Armchair,
  Tent,
  Sparkles,
  UtensilsCrossed,
  Lightbulb,
  Speaker,
  Zap,
  Music,
  ChefHat,
} from "lucide-react";
import { categories } from "@/data/suppliers";

const ICON_MAP: Record<string, React.ElementType> = {
  Armchair,
  Tent,
  Sparkles,
  UtensilsCrossed,
  Lightbulb,
  Speaker,
  Zap,
  Music,
  ChefHat,
};

export function FeaturedCategories() {
  return (
    <section className="py-20 sm:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Browse by category
          </h2>
          <p className="mt-4 text-muted text-lg max-w-lg mx-auto">
            Everything you need for your next event, from a single teaspoon to a
            full stage setup.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/search?category=${cat.slug}`}
                  className="group flex flex-col items-center p-6 lg:p-8 rounded-2xl border border-border bg-background hover:border-accent/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground text-center text-sm lg:text-base">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {cat.supplier_count} suppliers
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
