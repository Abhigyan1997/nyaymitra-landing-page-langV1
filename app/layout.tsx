import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
// @ts-ignore: side-effect import for global CSS
import "./globals.css";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// ✅ SEO + METADATA UPDATED
export const metadata: Metadata = {
  title:
    "NyayMitra – Legal Operations & Compliance Support for Startups, MSMEs & Businesses",

  description:
    "NyayMitra helps startups, MSMEs, and growing businesses manage legal operations, compliance, registrations, documentation, contracts, trademarks, legal notices, and business execution through a single point of coordination.",

  keywords: [
    "startup legal services India",
    "startup compliance India",
    "legal operations India",
    "MSME compliance support",
    "business compliance services",
    "shop establishment registration",
    "trademark registration India",
    "startup documentation",
    "employment documentation",
    "vendor agreements",
    "compliance audit",
    "legal operations partner",
    "legal compliance India",
  ],

  // ✅ FIXED (removed www)
  metadataBase: new URL("https://nyaymitra.tech"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "NyayMitra – Legal Operations & Compliance Support for Growing Businesses",
    description:
      "Helping startups, MSMEs, and businesses manage compliance, contracts, registrations, documentation, trademarks, legal notices, and business execution.",
    url: "https://nyaymitra.tech",
    siteName: "NyayMitra",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "NyayMitra – Legal Operations & Compliance Support",
    description:
      "Helping startups and businesses manage legal operations, compliance, documentation, registrations, and execution.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

// ✅ VIEWPORT
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={playfair.variable}>
      <head>
        {/* ✅ JSON-LD UPDATED */}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: "NyayMitra",
            url: "https://nyaymitra.tech",
            description:
              "Legal Operations & Compliance Support Platform for Startups, MSMEs and Growing Businesses.",
            areaServed: "India",
            serviceType: [
              "Legal Operations",
              "Business Compliance",
              "Startup Documentation",
              "Employment Documentation",
              "Vendor Agreements",
              "Legal Notice Coordination",
              "Trademark Coordination",
              "Shop Establishment Registration",
              "Compliance Audit",
              "Multi-City Registration Support",
            ],
          })}
        </Script>

        {/* ✅ GOOGLE ANALYTICS */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ELBNW6EZET"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ELBNW6EZET');
          `}
        </Script>
      </head>

      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}