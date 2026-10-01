import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { ProjectLink } from "@/components/ProjectLink";
import { ProjectVisual } from "@/components/ProjectVisual";

export const metadata: Metadata = {
  title: "Publications",
  description: "Published research by Magnus Leu, including MenTeR: multi-agent workflows for end-to-end RF/analog circuit netlist design.",
  alternates: { canonical: "/publications" },
};

export default function PublicationsPage() {
  return (
    <main id="content" className="collection-page archive-page section-shell">
      <p className="section-label">Research, written and shared</p>
      <h1>Publications.</h1>
      <p>Exploring how specialized AI agents can reason together and turn specifications into working circuit designs.</p>
      <ProjectLink className="project-feature" href="/work/menter-rf-analog-multi-agent-netlist-design">
        <div className="project-art"><ProjectVisual kind="agents" /><span className="art-caption">Specification → Reasoning → Circuit</span></div>
        <div className="project-feature-copy">
          <span className="project-meta">01 / IEEE ICLAD 2025</span>
          <h2>MenTeR</h2>
          <p>Specialized agents.<br />One complete circuit.</p>
          <p className="project-description">A fully automated multi-agent workflow for end-to-end RF/analog circuits netlist design, combining specification reasoning, optimization, and diagram-aware retrieval.</p>
          <span className="project-action">Read the research <Arrow /></span>
        </div>
      </ProjectLink>
      <div className="publication-reference"><p>MenTeR: A Fully-Automated Multi-Agent Workflow for End-to-End RF/Analog Circuits Netlist Design</p><div><a href="https://ieeexplore.ieee.org/abstract/document/11105933/" target="_blank" rel="noreferrer">IEEE Xplore <Arrow /></a><a href="https://arxiv.org/abs/2505.22990" target="_blank" rel="noreferrer">arXiv <Arrow /></a></div></div>
    </main>
  );
}
