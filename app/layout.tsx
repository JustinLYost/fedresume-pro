import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "FedResume Pro — AI Federal Resume Optimization",
    description: "AI-powered USAJOBS resume optimization for veterans and federal job seekers. Built for current OPM Merit Hiring Plan rules.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}