import { Arrow } from "@/components/Arrow";
import { person, social } from "@/content/profile";

export function Footer() {
  return <footer className="footer section-shell" id="contact"><div className="footer-top"><p className="section-label">Let’s make something worthwhile.</p><a className="back-top" href="#content">Back to top <Arrow /></a></div><a className="contact-heading" href={`mailto:${person.email}`}><span>Have something<br />in mind?</span><span className="contact-arrow"><Arrow /></span></a><div className="contact-bottom"><a className="contact-email" href={`mailto:${person.email}`}>{person.email}</a><div className="social-links">{social.filter((item) => item.name !== "Email").map((item) => <a key={item.name} href={item.href} target="_blank" rel="noreferrer">{item.name}<Arrow /></a>)}</div></div><div className="footer-legal"><span>© {new Date().getFullYear()} {person.name}</span><span>{person.location} · {person.languages.join(" & ")}</span><span>Learn deep. Build wide.</span><label className="motion-toggle"><input type="checkbox" id="pause-background" />Pause background motion</label></div></footer>;
}
