import type { Metadata } from "next";
import Image from "next/image";
import { Arrow } from "@/components/Arrow";
import { about, jobs, person, skills, studies } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description: about.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="content">
      <section className="about section-shell" aria-labelledby="about-title">
        <div className="about-top"><p className="section-label">About me</p><span>{person.firstName} {person.lastName} / {person.name}</span></div>
        <div className="about-grid">
          <figure className="portrait"><Image src={person.avatar} alt="Magnus Leu outdoors by a riverside railing" preload width={891} height={891} sizes="(max-width: 760px) 80vw, 35vw" /><figcaption>From Taiwan. Now in Los Angeles.</figcaption></figure>
          <div className="about-text"><h1 id="about-title">Curiosity is<br />the common thread.</h1><p>{about.description}</p><div className="about-facts"><span>USC · MS in ML & Data Science</span><span>{person.languages.join(" & ")}</span></div><a className="text-link" href="#experience">Explore my experience <Arrow /></a></div>
        </div>
      </section>

      <section className="experience section-shell" id="experience" aria-labelledby="experience-title">
        <header className="section-heading"><div><p className="section-label">Experience</p><h2 id="experience-title">Where I’ve been.</h2></div><p>Building practical systems across semiconductors, biomedical research, knowledge management, and finance.</p></header>
        <div className="career">
          {jobs.map((job, index) => (
            <details className="career-entry" key={job.company} open={index === 0}>
              <summary><span className="career-date">{job.timeframe}</span><span className="career-title"><h3>{job.company}</h3><span>{job.role}</span></span><span className="expand-icon" aria-hidden="true" /></summary>
              <ul className="achievements">{job.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
            </details>
          ))}
        </div>
        <div className="education"><h3>Always learning.</h3><div className="education-list">{studies.map((study) => <article key={study.name}><p className="career-date">{study.timeframe}</p><h4>{study.name}</h4><p>{study.department}</p>{study.achievements.map((item) => <p className="coursework" key={item}>{item}</p>)}</article>)}</div></div>
        <div className="skills-section" id="skills"><h3>My working toolkit.</h3><div className="skills">{skills.map((group) => <article key={group.title}><h4>{group.title}</h4><p>{group.description}</p><ul>{group.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></article>)}</div></div>
      </section>
    </main>
  );
}
