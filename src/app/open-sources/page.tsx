import type { Metadata } from "next";
import { Arrow } from "@/components/Arrow";
import { ProjectLink } from "@/components/ProjectLink";
import { openSource } from "@/content/profile";

export const metadata: Metadata = {
  title: "Open sources",
  description: openSource.summary,
  alternates: { canonical: "/open-sources" },
};

export default function OpenSourcesPage() {
  return (
    <main id="content" className="collection-page archive-page section-shell">
      <p className="section-label">Built in the open / 01 project</p>
      <h1>Open sources.</h1>
      <p>Tools for the way we build. Currently developing shared memory and collaboration across coding agents.</p>
      <ProjectLink className="project-feature acm-feature" href={openSource.repository}>
        <div className="project-art acm-art"><div className="acm-network" aria-hidden="true"><span className="acm-center">Shared<br />context</span>{["Codex", "Claude Code", "Cursor", "OpenCode"].map((agent, i) => <div className="agent-node" key={agent}><span className="agent-initial">0{i + 1}</span><span>{agent}</span><i /><i /></div>)}</div><span className="art-caption">One task. Four agents. Shared context.</span></div>
        <div className="project-feature-copy"><span className="project-meta">In active development / MIT</span><h2>{openSource.name}</h2><p>Pick up where<br />any agent left off.</p><p className="project-description">{openSource.summary}</p><span className="project-action">Explore ACM on GitHub <Arrow /></span></div>
      </ProjectLink>
      <section className="acm-details" aria-labelledby="acm-details-title"><div><p className="section-label">Python / MCP / CLI</p><h2 id="acm-details-title">Keep the context.<br />Keep building.</h2><p>Continue a chat in another agent, share decisions across a project, or delegate work with file claims to avoid collisions.</p></div><div className="acm-capabilities"><article><h3>Memory across agents</h3><p>Session state, short-term notes, and long-term project knowledge.</p></article><article><h3>Pick up a conversation</h3><p>Find and resume chats across Codex, Claude Code, Cursor, and OpenCode.</p></article><article><h3>Work together</h3><p>Delegate tasks and track who is working on which files.</p></article></div></section>
      <div className="acm-install"><div><h3>Start with a shared memory.</h3><p>Setup and agent-specific instructions are in the repository.</p></div><a className="text-link" href={`${openSource.repository}#install`} target="_blank" rel="noreferrer">Read the setup guide <Arrow /></a></div>
    </main>
  );
}
