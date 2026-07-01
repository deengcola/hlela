import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
          <span className="text-sm font-bold text-foreground">Hlela Admin</span>
          <nav className="flex items-center gap-1">
            {[
              { href: "/admin/briefs", label: "Event Briefs" },
              { href: "/admin/bookings", label: "Bookings" },
              { href: "/admin/catalogue", label: "Catalogues" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-background transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
