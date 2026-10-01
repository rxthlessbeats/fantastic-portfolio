import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Signal } from "@/components/Signal";
import { ProjectLink } from "@/components/ProjectLink";
import { ProjectVisual } from "@/components/ProjectVisual";
import { home, person } from "@/content/profile";
import { getPosts } from "@/lib/posts";

export default function Page() {
  const posts = getPosts();

  return (
    <main id="content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-top">
          <p>{person.role}</p>
          <p>Based in Los Angeles, CA</p>
        </div>
        <div className="hero-composition">
          <div className="hero-copy">
            <h1 id="hero-title"><span>{home.headline[0]}</span><span>{home.headline[1]}</span></h1>
            <p className="hero-intro">{home.subline}</p>
            <a className="hero-cta" href="#work"><span>Explore my work</span><Arrow /></a>
          </div>
          <Signal />
        </div>
        <div className="hero-bottom">
          <span>Research meets real-world engineering.</span>
          <span>Machine learning / Agentic AI / Quantitative finance</span>
        </div>
      </section>

      <section className="selected section-shell" id="work" aria-labelledby="work-title">
        <header className="section-heading">
          <div><p className="section-label">A few things I’ve built</p><h2 id="work-title">Ideas, put to work.</h2></div>
          <p>Circuit design, shared agent memory, and urban scene understanding. A few ways I turn research into working systems.</p>
        </header>
        <ProjectLink className="project-feature" href="/work/menter-rf-analog-multi-agent-netlist-design">
          <div className="project-art"><ProjectVisual kind="agents" /><span className="art-caption">Specification → Reasoning → Circuit</span></div>
          <div className="project-feature-copy">
            <span className="project-meta">Published at IEEE ICLAD 2025</span>
            <h3>MenTeR</h3>
            <p>Specialized agents.<br />One complete circuit.</p>
            <p className="project-description">A fully automated multi-agent workflow for end-to-end RF/analog netlist design, from specification reasoning to diagram-aware retrieval.</p>
            <span className="project-action">Explore the research <Arrow /></span>
          </div>
        </ProjectLink>
        <div className="project-pair">
          <ProjectLink className="project-card memory-card" href="/open-sources">
            <div className="project-art"><ProjectVisual kind="memory" /><span className="art-caption">One task. Four agents. Shared context.</span></div>
            <div className="project-card-copy"><div><span className="project-meta">Open source · In development</span><h3>ACM</h3><p>Agent Cowork Memory. Pick up where any agent left off.</p></div><span className="circle-arrow"><Arrow /></span></div>
          </ProjectLink>
          <ProjectLink className="project-card cityscapes-card" href="/work/cityscapes-traffic-safety-segmentation">
            <div className="project-art"><ProjectVisual kind="cityscapes" /><span className="art-caption">Road · Sidewalk · Human · Vehicle</span></div>
            <div className="project-card-copy"><div><span className="project-meta">Computer vision · Semantic segmentation</span><h3>Cityscapes</h3><p>Understanding urban scenes, one pixel at a time.</p></div><span className="circle-arrow"><Arrow /></span></div>
          </ProjectLink>
        </div>
        <nav className="collections" aria-label="Explore my work">
          {[
            { href: "/projects", label: "Projects", count: posts.filter((post) => post.kind === "Project").length, unit: "projects", line: "Experiments, methods, results." },
            { href: "/publications", label: "Publications", count: posts.filter((post) => post.kind === "Publication").length, unit: "paper", line: "Research, written and shared." },
            { href: "/open-sources", label: "Open sources", count: 1, unit: "project", line: "Agent Cowork Memory." },
            { href: "/products", label: "Products", count: posts.filter((post) => post.kind === "Product").length, unit: "product", line: "From an idea to an interface." },
          ].map((collection, i) => <Link key={collection.href} href={collection.href}><span className="collection-meta">0{i + 1}<span>{collection.count.toString().padStart(2, "0")} {collection.unit}</span></span><h3>{collection.label}</h3><span className="collection-bottom">{collection.line}<Arrow /></span></Link>)}
        </nav>
        <Link className="text-link" href="/about">Meet the person behind the projects <Arrow /></Link>
      </section>
    </main>
  );
}
