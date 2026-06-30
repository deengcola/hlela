import Link from "next/link";
import {
  Armchair, Tent, Sparkles, UtensilsCrossed, Lightbulb,
  Speaker, Zap, Music, ChefHat,
} from "lucide-react";
import { categories } from "@/data/suppliers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse event hire categories — marquees, furniture, decor, lighting, sound, generators, and more.",
  alternates: {
    canonical: "/categories",
  },
};

const ICON_MAP: Record<string, React.ElementType> = {
  Armchair, Tent, Sparkles, UtensilsCrossed, Lightbulb, Speaker, Zap, Music, ChefHat,
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
          All Categories
        </h1>
        <p className="mt-4 text-muted text-lg max-w-lg mx-auto">
          Everything you need for your next corporate event.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Sparkles;
          return (
            <Link
              key={cat.slug}
              href={`/search?category=${cat.slug}`}
              className="group flex items-start gap-5 p-6 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <Icon size={24} />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">
                  {cat.name}
                </h2>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  {cat.description}
                </p>
                <p className="mt-2 text-sm text-accent font-medium">
                  {cat.supplier_count} suppliers →
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
