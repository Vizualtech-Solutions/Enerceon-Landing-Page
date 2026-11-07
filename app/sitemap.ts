import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Fragment links (#features, #billing, …) are deliberately absent: they are part of the
// home page URL, not separate documents.
const PAGES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
