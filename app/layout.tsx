import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// ✅ SEO + METADATA FIXED
export const metadata: Metadata = {
  title:
    "NyayMitra – Online Legal Help in India | Affidavit, Legal Notice & Lawyer Consultation",

  description:
    "Get legal help online in India. Create affidavits, send legal notices, and consult verified lawyers. Fast, affordable, and simple legal assistance with NyayMitra.",

  keywords: [
    "online legal help India",
    "affidavit online India",
    "legal notice online India",
    "consult lawyer online India",
    "legal documents India",
    "legal help Patna",
    "legal help Lucknow",
    "legal help Indore",
    "legal help Jaipur",
  ],

  // ✅ FIXED (removed www)
  metadataBase: new URL("https://nyaymitra.tech"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "NyayMitra – Online Legal Help | Legal Notice, Affidavit & Lawyers",
    description:
      "From confusion to clarity. Know what to do in your legal problem and take action instantly.",
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
      "NyayMitra – Legal Help Made Simple",
    description:
      "Know your next legal step instantly. Create documents & consult lawyers online.",
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
        {/* ✅ JSON-LD FIXED */}
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
              "Online legal help platform in India for affidavits, legal notices, and lawyer consultation.",
            areaServed: "India",
            serviceType: [
              "Legal Consultation",
              "Legal Document Services",
              "Online Lawyer",
              "Legal Notice",
              "Affidavit Creation",
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