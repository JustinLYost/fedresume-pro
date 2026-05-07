import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fed-resume-pro.com";

  // Homepage — your highest-priority, most-visited page
  // Changes whenever you update pricing, copy, or add features
  const homepage = {
    url: baseUrl,
    lastModified: new Date("2026-05-07"),  // Update when you make significant homepage changes
    changeFrequency: "weekly" as const,
    priority: 1.0,
  };

  // About page — important for trust/credibility, but stable
  const about = {
    url: `${baseUrl}/about`,
    lastModified: new Date("2026-05-07"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };

  // Contact page — useful entry point, rarely changes
  const contact = {
    url: `${baseUrl}/contact`,
    lastModified: new Date("2026-05-07"),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  };

  // Legal pages — low priority but important for completeness
  const legal = ["terms", "privacy", "refunds"].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date("2026-05-07"),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [homepage, about, contact, ...legal];
}