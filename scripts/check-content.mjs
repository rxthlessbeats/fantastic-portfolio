import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import ts from "typescript";
import vm from "node:vm";

const root = path.resolve("src/content/posts");
const files = fs.readdirSync(root).filter((file) => file.endsWith(".mdx"));
assert.equal(files.length, 9, "All nine original case studies must be present");
const meta = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync("src/lib/post-meta.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, meta);
const counts = { Project: 0, Publication: 0, Product: 0 };
for (const file of files) {
  const slug = file.replace(/\.mdx$/, "");
  const kind = meta.exports.kindOf(slug);
  counts[kind]++;
  assert.ok(fs.existsSync(`src/app${meta.exports.collectionOf(kind).href}/page.tsx`), `${file} must link back to its collection`);
  const cover = fs.readFileSync(`public${meta.exports.coverOf(slug)}`);
  assert.equal(cover.toString("hex", 0, 8), "89504e470d0a1a0a", `${slug} must have a PNG cover`);
  assert.equal(cover.readUInt32BE(16), 1200);
  assert.equal(cover.readUInt32BE(20), 675);
  assert.ok(fs.existsSync(`public${meta.exports.coverOf(slug, true)}`), `${slug} must have its own thumbnail graphic`);
}
assert.equal(meta.exports.coverOf("future-project"), "/images/og.png", "New work without an assigned cover uses the site preview");
assert.deepEqual(counts, { Project: 7, Publication: 1, Product: 1 }, "Research projects must remain separate from open source");
const redirects = JSON.parse(fs.readFileSync("vercel.json", "utf8")).redirects;
for (const route of ["/about", "/projects", "/publications", "/open-sources", "/products"]) {
  assert.ok(!redirects.some((rule) => rule.source === route), `${route} must open its own page`);
}
const profile = fs.readFileSync("src/content/profile.ts", "utf8");
const posts = files.map((file) => fs.readFileSync(path.join(root, file), "utf8"));
const corpus = profile + "\n" + posts.join("\n");
for (const needle of ["Synopsys Inc.", "MediaTek Inc.", "Industrial Technology Research Institute", "Deloitte", "University of Southern California", "National Tsing Hua University", "lutinyu@gmail.com", "Learn deep.", "MenTeR", "BHS Grade A", "LanceDB", "Cityscapes", "Black–Scholes", "ATIS", "Trading Rookie", "Child Mind Institute", "cvxopt", "Chain-of-Nudge"]) {
  assert.ok(corpus.includes(needle), `Missing original content: ${needle}`);
}
for (let i = 0; i < files.length; i++) {
  const { data, content } = matter(posts[i]);
  assert.equal(typeof data.title, "string", `${files[i]} must have a title`);
  assert.equal(typeof data.summary, "string", `${files[i]} must have a summary`);
  assert.ok(!Number.isNaN(Date.parse(data.publishedAt)), `${files[i]} must have a valid date`);
  if (files[i] !== "trading_rookie.mdx") assert.ok(content.includes("## Introduction"), `${files[i]} must retain its research writeup`);
}
const images = [...corpus.matchAll(/(?:src=|image:|avatar:)\s*["'](\/images\/[^"']+)["']/g)].map((match) => match[1]);
for (const src of images) assert.ok(fs.existsSync(path.join("public", src)), `Missing image: ${src}`);
for (const file of files) {
  const { data } = matter(fs.readFileSync(path.join(root, file), "utf8"));
  for (const src of data.images ?? []) assert.ok(fs.existsSync(path.join("public", src)), `Missing gallery image: ${src}`);
}
console.log(`Content verified: ${files.length} case studies, original profile, and ${new Set(images).size} referenced images.`);
