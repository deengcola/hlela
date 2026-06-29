import Link from "next/link";
import Image from "next/image";
import { MapPin, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { Supplier } from "@/lib/types";
import { priceRangeLabel } from "@/lib/utils";

interface SupplierCardProps {
  supplier: Supplier;
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Link href={`/suppliers/${supplier.slug}`}>
      <Card hover className="h-full">
        <div className="aspect-[16/9] bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center p-6">
          {supplier.logo_url ? (
            <Image
              src={supplier.logo_url}
              alt={`${supplier.name} logo`}
              width={200}
              height={100}
              className="object-contain max-h-20"
              unoptimized
            />
          ) : (
            <Building2 size={48} className="text-accent/30" />
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {supplier.name}
            </h3>
            <Badge variant="muted" className="text-xs shrink-0">
              {supplier.price_range}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={supplier.rating} size={14} />
            <span className="text-sm text-muted">
              {supplier.rating} ({supplier.review_count})
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-3 text-sm text-muted">
            <MapPin size={14} />
            <span>{supplier.area}, {supplier.city}</span>
          </div>

          <p className="mt-3 text-sm text-muted line-clamp-2 leading-relaxed">
            {supplier.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {supplier.categories.slice(0, 3).map((cat) => (
              <Badge key={cat} variant="accent" className="text-xs">
                {cat}
              </Badge>
            ))}
            {supplier.categories.length > 3 && (
              <Badge variant="muted" className="text-xs">
                +{supplier.categories.length - 3}
              </Badge>
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted">
              {priceRangeLabel(supplier.price_range)}
            </span>
            <span className="text-xs text-muted">
              {supplier.years_in_business}+ years
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
