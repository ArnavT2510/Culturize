import "@fontsource-variable/fraunces";
import "@fontsource-variable/dm-sans";
import "./globals.css";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Culturize — Cook the taste of home with ingredients near you",
  description:
    "Culturize scans the grocery stores near you and rebuilds your recipe with the closest-tasting swaps — aisle, price and flavor match included.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}