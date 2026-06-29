import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hlela — Compare & Book Event Hire in South Africa",
    template: "%s | Hlela",
  },
  description:
    "Stop chasing quotes. Compare Cape Town's top event hire companies — pricing, availability, reviews — in one place. Book in minutes, not days.",
  keywords: [
    "event hire",
    "Cape Town",
    "marquee hire",
    "furniture hire",
    "event equipment rental",
    "South Africa",
    "corporate events",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
