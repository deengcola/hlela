import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Business",
  description: "List your event hire business on Hlela for free. Get discovered by corporate event planners across Cape Town.",
  alternates: {
    canonical: "/list-your-business",
  },
};

export default function ListYourBusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
