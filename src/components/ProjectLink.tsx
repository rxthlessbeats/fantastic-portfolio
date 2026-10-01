"use client";

import Link from "next/link";
import type { ReactNode, PointerEvent } from "react";

export function ProjectLink({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = event.currentTarget;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    card.style.setProperty("--mouse-x", `${x * 100}%`);
    card.style.setProperty("--mouse-y", `${y * 100}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
  }
  return <Link href={href} className={className} onPointerMove={move} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); }}>{children}</Link>;
}
