import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  Building2,
  Instagram,
  Facebook,
  Lock,
  Grid3X3,
  Star,
} from "lucide-react";
import { suppliers } from "@/data/suppliers";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return suppliers.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supplier = suppliers.find((s) => s.slug === slug);
  if (!supplier) return {};
  const title = `${supplier.name} — ${supplier.categories[0]} in ${supplier.area}, Cape Town`;
  return {
    title,
    description: supplier.description,
    alternates: { canonical: `/suppliers/${supplier.slug}` },
    openGraph: {
      title,
      description: supplier.description,
      type: "website",
      url: `https://www.hlela.co.za/suppliers/${supplier.slug}`,
    },
  };
}

export default async function SupplierPage({ params }: PageProps) {
  const { slug } = await params;
  const supplier = suppliers.find((s) => s.slug === slug);
  if (!supplier) notFound();

  // Fetch catalogue items from Supabase
  const { data: catalogue } = await supabase
    .from("catalogue_items")
    .select("*")
    .eq("supplier_slug", slug)
    .eq("available", true)
    .order("sort_order", { ascending: true });

  const hasSubscription = supplier.subscription_active ?? false;
  const items = catalogue ?? [];

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: supplier.name,
    description: supplier.description,
    url: `https://www.hlela.co.za/suppliers/${supplier.slug}`,
    telephone: supplier.phone || undefined,
    email: supplier.email || undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: supplier.area,
      addressRegion: "Western Cape",
      addressCountry: "ZA",
    },
    areaServed: { "@type": "City", name: supplier.city },
    aggregateRating: supplier.review_count > 0 ? {
      "@type": "AggregateRating",
      ratingValue: supplier.rating,
      reviewCount: supplier.review_count,
    } : undefined,
    priceRange: supplier.price_range,
    knowsAbout: supplier.categories,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />

      <Link
        href="/search"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to suppliers
      </Link>

      {/* Cover Banner */}
      <div className="relative w-full h-48 sm:h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 mb-0">
        {supplier.cover_image_url ? (
          <Image
            src={supplier.cover_image_url}
            alt={`${supplier.name} cover`}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-accent/20 text-7xl font-bold select-none">
              {supplier.name.charAt(0)}
            </div>
          </div>
        )}
      </div>

      {/* Profile Header — Instagram style */}
      <div className="relative px-4 sm:px-6 pb-6 border-b border-border">
        {/* Avatar */}
        <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-background bg-card shadow-md overflow-hidden flex items-center justify-center">
          {supplier.logo_url ? (
            <Image
              src={supplier.logo_url}
              alt={supplier.name}
              width={96}
              height={96}
              className="object-contain p-2"
              unoptimized
            />
          ) : (
            <Building2 size={36} className="text-accent/40" />
          )}
        </div>

        {/* Action button — top right */}
        <div className="flex justify-end pt-3 mb-8">
          <Link
            href={`/book/${supplier.slug}`}
            className="px-6 py-2.5 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-dark transition-colors"
          >
            Request Quote
          </Link>
        </div>

        {/* Name + verification */}
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-foreground">{supplier.name}</h1>
          {hasSubscription && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
              ✓ Verified
            </span>
          )}
        </div>

        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {supplier.categories.map((cat) => (
            <Badge key={cat} className="text-xs">{cat}</Badge>
          ))}
        </div>

        {/* Stats row — Instagram-style */}
        <div className="flex gap-6 my-4">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{items.length || "—"}</p>
            <p className="text-xs text-muted">catalogue items</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{supplier.rating}</p>
            <p className="text-xs text-muted">rating</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{supplier.review_count}</p>
            <p className="text-xs text-muted">reviews</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{supplier.years_in_business}+</p>
            <p className="text-xs text-muted">years</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted leading-relaxed mb-4 max-w-xl">
          {supplier.bio || supplier.description}
        </p>

        {/* Contact row */}
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-muted">
            <MapPin size={14} />
            {supplier.area}, Cape Town
          </span>
          {supplier.phone && (
            <a href={`tel:${supplier.phone}`} className="flex items-center gap-1.5 text-accent hover:text-accent-dark">
              <Phone size={14} />
              {supplier.phone}
            </a>
          )}
          {supplier.email && (
            <a href={`mailto:${supplier.email}`} className="flex items-center gap-1.5 text-accent hover:text-accent-dark">
              <Mail size={14} />
              {supplier.email}
            </a>
          )}
          {supplier.website && (
            <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent hover:text-accent-dark">
              <Globe size={14} />
              Website
            </a>
          )}
          {supplier.instagram_url && (
            <a href={supplier.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted hover:text-foreground">
              <Instagram size={14} />
            </a>
          )}
          {supplier.facebook_url && (
            <a href={supplier.facebook_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted hover:text-foreground">
              <Facebook size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Catalogue Grid */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Grid3X3 size={18} className="text-muted" />
          <h2 className="text-base font-semibold text-foreground">Catalogue</h2>
        </div>

        {!hasSubscription ? (
          /* Locked state for free suppliers */
          <div className="relative">
            {/* Blurred placeholder grid */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 blur-sm pointer-events-none select-none">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center"
                >
                  <Building2 size={24} className="text-accent/20" />
                </div>
              ))}
            </div>
            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <Lock size={22} className="text-accent" />
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">Full catalogue not available</p>
              <p className="text-muted text-xs text-center max-w-xs mb-4">
                This supplier hasn&apos;t activated their full Hlela profile yet.
              </p>
              <Link
                href={`/book/${supplier.slug}`}
                className="px-5 py-2.5 bg-accent text-white rounded-xl font-medium text-sm hover:bg-accent-dark transition-colors"
              >
                Request Quote Directly
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-muted text-sm">
            Catalogue coming soon.
          </div>
        ) : (
          /* Instagram-style catalogue grid */
          <div className="grid grid-cols-3 gap-1 sm:gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-border"
              >
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-accent/5">
                    <Building2 size={28} className="text-accent/20" />
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-center px-3">
                    <p className="text-white text-xs font-semibold leading-tight">{item.title}</p>
                    {item.price && (
                      <p className="text-white/80 text-xs mt-1">
                        R{item.price.toLocaleString("en-ZA")} {item.unit}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reviews */}
      <div className="mt-10 border-t border-border pt-8">
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-muted" />
          <h2 className="text-base font-semibold text-foreground">
            {supplier.rating} · {supplier.review_count} reviews
          </h2>
        </div>
        <div className="bg-card rounded-2xl p-6 text-center text-sm text-muted">
          Reviews coming soon. Be the first to review {supplier.name}.
        </div>
      </div>
    </div>
  );
}
