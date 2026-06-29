"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Event hire,{" "}
            <span className="text-accent font-[family-name:var(--font-instrument)] italic">
              simplified
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            Stop chasing quotes. Compare Cape Town&apos;s top event hire
            companies — pricing, reviews, availability — in one place.
          </p>

          <form onSubmit={handleSearch} className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search marquees, furniture, decor, lighting..."
                className="w-full pl-12 pr-32 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors text-sm cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted">
            <span>Popular:</span>
            {["Marquees", "Furniture", "Generators", "Decor"].map((term) => (
              <button
                key={term}
                onClick={() => router.push(`/search?q=${term}`)}
                className="text-accent hover:text-accent-dark transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
