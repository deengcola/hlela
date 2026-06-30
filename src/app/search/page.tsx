import { Suspense } from "react";
import { SearchContent } from "@/components/search/search-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Suppliers",
  description: "Compare Cape Town's top event hire companies — pricing, reviews, availability — in one place.",
  alternates: {
    canonical: "/search",
  },
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Browse Suppliers
          </h1>
          <p className="text-muted mt-1">Loading...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
