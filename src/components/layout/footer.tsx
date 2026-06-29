import Link from "next/link";

const FOOTER_LINKS = {
  Platform: [
    { label: "Browse Suppliers", href: "/search" },
    { label: "Categories", href: "/categories" },
    { label: "How It Works", href: "/about" },
  ],
  "For Suppliers": [
    { label: "List Your Business", href: "/about" },
    { label: "Pricing", href: "/about" },
  ],
  Company: [
    { label: "About Hlela", href: "/about" },
    { label: "Contact", href: "/about" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-bold text-accent">Hlela</span>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              South Africa&apos;s first event hire marketplace. Compare, book, done.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Hlela. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Made in Cape Town 🇿🇦
          </p>
        </div>
      </div>
    </footer>
  );
}
