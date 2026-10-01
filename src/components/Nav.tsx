"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { person, social } from "@/content/profile";
import { collectionOf, kindOf } from "@/lib/post-meta";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/open-sources", label: "Open sources" },
  { href: "/products", label: "Products" },
];

export function Nav() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const active = pathname.startsWith("/work/") ? collectionOf(kindOf(pathname.split("/")[2])).href : pathname;
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);
  useEffect(() => {
    dialog.current?.close();
    document.body.style.overflow = "";
  }, [pathname]);

  function close() { dialog.current?.close(); }

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <header className="nav" data-ready={ready || undefined}>
        <Link className="brand" href="/" aria-label="Magnus Leu, home"><svg className="brand-mark" width="44" height="44" viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M6 26V12m0 6c0-9 9-9 9 0v8m0-8c0-9 9-9 9 0v8" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" /><circle cx="30" cy="25" r="2.3" fill="currentColor" /></svg><span>{person.name}</span></Link>
        <nav className="nav-links" aria-label="Main navigation">{LINKS.map((link) => <Link key={link.href} href={link.href} aria-current={active === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>
        <a className="nav-contact" href={`mailto:${person.email}`}>Let’s talk <Arrow /></a>
        {ready && <button type="button" className="menu-btn" aria-haspopup="dialog" aria-controls="site-menu" onClick={() => { dialog.current?.showModal(); document.body.style.overflow = "hidden"; }}>Menu <span aria-hidden="true"><i /><i /></span></button>}
      </header>
      <dialog ref={dialog} className="mobile-menu" id="site-menu" aria-label="Site navigation" onClose={() => { document.body.style.overflow = ""; }} onClick={(event) => { if (event.target === dialog.current) close(); }}>
        <div className="menu-top"><span className="brand">{person.name}</span><button type="button" className="menu-close" onClick={close} autoFocus>Close <span aria-hidden="true">×</span></button></div>
        <nav aria-label="Mobile navigation">{LINKS.map((link) => <Link key={link.href} href={link.href} aria-current={active === link.href ? "page" : undefined} onClick={close}>{link.label}<Arrow /></Link>)}<a href="#contact" onClick={close}>Contact<Arrow /></a></nav>
        <div className="menu-bottom"><p>{person.role}<br />{person.location}</p><div>{social.map((item) => <a key={item.name} href={item.href} onClick={close} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{item.name}</a>)}</div></div>
      </dialog>
    </>
  );
}
