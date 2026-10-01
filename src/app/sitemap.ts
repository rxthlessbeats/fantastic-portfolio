import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    ...["about", "projects", "publications", "open-sources", "products", "work"].map((page) => ({ url: `${site.url}/${page}` })),
    ...getPosts().map((post) => ({
      url: `${site.url}/work/${post.slug}`,
      lastModified: post.publishedAt,
    })),
  ];
}
