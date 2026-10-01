import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { person, site, social } from "@/content/profile";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s — Magnus Leu" },
  description: site.description,
  authors: [{ name: person.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: person.name,
    type: "website",
    images: [{ url: "/images/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    alternateName: `${person.firstName} ${person.lastName}`,
    jobTitle: person.role,
    email: `mailto:${person.email}`,
    url: site.url,
    image: `${site.url}${person.avatar}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      addressCountry: "US",
    },
    knowsLanguage: person.languages,
    sameAs: social.filter((item) => item.href.startsWith("http")).map((item) => item.href),
  };

  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}
