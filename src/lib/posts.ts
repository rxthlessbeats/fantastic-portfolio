import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "src/content/posts");

import { kindOf, type Post } from "./post-meta";
export { formatDate, indexOf, yearOf } from "./post-meta";
export type { Post } from "./post-meta";

export function imageDimensions(src: string) {
  // ponytail: research figures are PNGs; add a format reader when other image formats are needed.
  const bytes = fs.readFileSync(path.join(process.cwd(), "public", src));
  if (bytes.length < 24 || bytes.toString("hex", 0, 8) !== "89504e470d0a1a0a") return {};
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function asString(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const text = String(value).trim();
  return text || undefined;
}

export function getPosts(): Post[] {
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      return {
        slug,
        title: asString(data.title) ?? slug,
        subtitle: asString(data.subtitle),
        summary: asString(data.summary) ?? "",
        publishedAt: asString(data.publishedAt) ?? "",
        tag: asString(data.tag),
        image: asString(data.image),
        images: Array.isArray(data.images) ? data.images.map(String) : undefined,
        link: asString(data.link),
        body: content,
        kind: kindOf(slug),
      };
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}
