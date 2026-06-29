"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { suppliers, categories } from "@/data/suppliers";
import { SupplierCard } from "@/components/search/supplier-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SortOption = "rating" | "name" | "years";

export function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...suppliers];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.categories.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      const catName = categories.find((c) => c.slug === selectedCategory)?.name;
      if (catName) {
        result = result.filter((s) => s.categories.includes(catName));
      }
    }

    if (selectedPriceRange) {
      result = result.filter((s) => s.price_range === selectedPriceRange);
    }

    result.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return b.years_in_business - a.years_in_business;
    });

    return result;
  }, [query, selectedCategory, selectedPriceRange, sortBy]);

  const activeFilters =
    (selectedCategory ? 1 : 0) + (selectedPriceRange ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange("");
    setQuery("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Browse Suppliers
          </h1>
          <p className="text-muted mt-1">
            {filtered.length} supplier{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
            <option value="years">Most Established</option>
          </select>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "md:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors cursor-pointer",
              showFilters
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-foreground"
            )}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilters > 0 && (
              <span className="w-5 h-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        <aside
          className={cn(
            "w-full md:w-64 shrink-0 space-y-6",
            showFilters ? "block" : "hidden md:block"
          )}
        >
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search suppliers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Category
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => setSelectedCategory("")}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                  !selectedCategory
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted hover:text-foreground hover:bg-card-hover"
                )}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                    selectedCategory === cat.slug
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted hover:text-foreground hover:bg-card-hover"
                  )}
                >
                  {cat.name}
                  <span className="text-xs text-muted ml-1">
                    ({cat.supplier_count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Price Range
            </h3>
            <div className="space-y-1.5">
              {[
                { value: "", label: "All Prices" },
                { value: "R", label: "R — Budget-friendly" },
                { value: "RR", label: "RR — Mid-range" },
                { value: "RRR", label: "RRR — Premium" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedPriceRange(option.value)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                    selectedPriceRange === option.value
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-muted hover:text-foreground hover:bg-card-hover"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {activeFilters > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X size={14} />
              Clear all filters
            </button>
          )}
        </aside>

        <div className="flex-1 min-w-0">
          {activeFilters > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory && (
                <Badge variant="accent" className="flex items-center gap-1">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("")} className="cursor-pointer">
                    <X size={12} />
                  </button>
                </Badge>
              )}
              {selectedPriceRange && (
                <Badge variant="accent" className="flex items-center gap-1">
                  {selectedPriceRange}
                  <button onClick={() => setSelectedPriceRange("")} className="cursor-pointer">
                    <X size={12} />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted">
                No suppliers found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-accent hover:text-accent-dark transition-colors cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
