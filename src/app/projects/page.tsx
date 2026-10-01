import type { Metadata } from "next";
import { WorkList } from "@/components/WorkList";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Projects",
  description: "Machine learning, agentic AI, biomedical signal processing, and quantitative finance projects by Magnus Leu.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getPosts().filter((post) => post.kind === "Project");
  return (
    <main id="content" className="collection-page archive-page section-shell">
      <p className="section-label">Experiments, methods, results / {projects.length.toString().padStart(2, "0")} projects</p>
      <h1>Projects.</h1>
      <p>Explorations in machine learning, biomedical signals, knowledge management, and quantitative finance. The approach, the results, and what I learned along the way.</p>
      <WorkList items={projects.map(({ body, ...post }) => post)} filterable={false} />
    </main>
  );
}
