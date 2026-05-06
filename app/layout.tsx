import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FedResume Pro — AI Federal Resume Optimization for Veterans",
  description: "Built for the new 2-page USAJOBS rules (Sept 2025). AI-powered resume analysis and federal-formatted rewrites for veterans and federal job seekers. From $14.99 — vs $400+ for traditional services.",
  keywords: ["federal resume", "USAJOBS resume", "veteran resume", "GS resume", "federal application", "Merit Hiring", "KSA narrative", "OPM resume"],
  authors: [{ name: "FedResume Pro" }],
  metadataBase: new URL("https://fed-resume-pro.com"),
  openGraph: {
    title: "FedResume Pro — Built for the new 2-page federal resume rules",
    description: "AI-powered USAJOBS resume optimization. Federal-formatted rewrites in 90 seconds for $39 — vs $400+ for traditional services.",
    url: "https://fed-resume-pro.com",
    siteName: "FedResume Pro",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FedResume Pro — Built for the new 2-page federal resume rules",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FedResume Pro — AI Federal Resume Optimization",
    description: "AI-powered USAJOBS resume optimization for veterans and federal job seekers. Built for current OPM Merit Hiring Plan rules.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "FedResume Pro",
  "description": "AI-powered federal resume optimization for veterans and federal job seekers, built for the new 2-page OPM Merit Hiring Plan rules.",
  "url": "https://fed-resume-pro.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": [
    { "@type": "Offer", "name": "Resume Analysis", "price": "14.99", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Federal Rewrite", "price": "39.00", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Federal Application Bundle", "price": "79.00", "priceCurrency": "USD" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}