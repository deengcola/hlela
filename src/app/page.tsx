import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { FeaturedCategories } from "@/components/landing/featured-categories";
import { Stats } from "@/components/landing/stats";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <HowItWorks />
      <FeaturedCategories />
      <CTA />
    </>
  );
}
