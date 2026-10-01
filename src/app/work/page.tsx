import type { Metadata } from "next";
import { WorkList } from "@/components/WorkList";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Work", description: "Projects, publications, and products by Magnus Leu. Machine learning, agentic AI, and quantitative finance.", alternates: { canonical: "/work" } };

export default function WorkPage() {
  return <main id="content" className="archive-page section-shell"><p className="section-label">Projects, publications & products</p><h1>The full collection.</h1><p>Explorations in machine learning, agentic AI, biomedical signals, quantitative finance, and full-stack development.</p><WorkList items={getPosts().map(({ body, ...post }) => post)} /></main>;
}
