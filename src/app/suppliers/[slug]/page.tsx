import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ArrowLeft,
  Building2,
} from "lucide-react";
import { suppliers } from "@/data/suppliers";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { priceRangeLabel } from "@/lib/utils";

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
    alternates: {
      canonical: `/suppliers/${supplier.slug}`,
    },
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
    areaServed: {
      "@type": "City",
      name: supplier.city,
    },
    aggregateRating: supplier.review_count > 0 ? {
      "@type": "AggregateRating",
      ratingValue: supplier.rating,
      reviewCount: supplier.review_count,
    } : undefined,
    priceRange: supplier.price_range,
    knowsAbout: supplier.categories,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero */}
          <div className="aspect-[16/9] bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center p-8">
            {supplier.logo_url ? (
              <Image
                src={supplier.logo_url}
                alt={`${supplier.name} logo`}
                width={400}
                height={200}
                className="object-contain max-h-32"
                unoptimized
              />
            ) : (
              <Building2 size={80} className="text-accent/20" />
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {supplier.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={supplier.rating} />
                  <span className="text-sm text-muted">
                    {supplier.rating} ({supplier.review_count} reviews)
                  </span>
                </div>
              </div>
              <Badge variant="accent" className="text-sm">
                {priceRangeLabel(supplier.price_range)}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {supplier.categories.map((cat) => (
                <Badge key={cat}>{cat}</Badge>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              About
            </h2>
            <p className="text-muted leading-relaxed">{supplier.description}</p>
          </div>

          {/* Reviews placeholder */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Reviews
            </h2>
            <div className="bg-card-hover rounded-2xl p-8 text-center">
              <p className="text-muted">
                Reviews coming soon. Be the first to review {supplier.name}.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Book CTA */}
          <div className="sticky top-24 space-y-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <Link
                href={`/book/${supplier.slug}`}
                className="block w-full px-6 py-4 bg-accent text-white rounded-xl font-medium hover:bg-accent-dark transition-colors text-center text-lg"
              >
                Request Booking
              </Link>
              <p className="text-xs text-muted text-center mt-3">
                Free to enquire. No commitment required.
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Contact</h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-muted shrink-0" />
                  <span className="text-muted">
                    {supplier.area}, {supplier.city}
                  </span>
                </div>

                {supplier.phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-muted shrink-0" />
                    <a
                      href={`tel:${supplier.phone}`}
                      className="text-accent hover:text-accent-dark"
                    >
                      {supplier.phone}
                    </a>
                  </div>
                )}

                {supplier.email && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-muted shrink-0" />
                    <a
                      href={`mailto:${supplier.email}`}
                      className="text-accent hover:text-accent-dark"
                    >
                      {supplier.email}
                    </a>
                  </div>
                )}

                {supplier.website && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe size={16} className="text-muted shrink-0" />
                    <a
                      href={supplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-dark truncate"
                    >
                      Visit website
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-3 text-sm">
                  <Clock size={16} className="text-muted shrink-0" />
                  <span className="text-muted">
                    {supplier.years_in_business}+ years in business
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
