"use client";

import type {} from "react/canary";
import { useEffect, useRef, ViewTransition } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  useEffect(() => { previousPath.current = pathname; }, [pathname]);

  useEffect(() => {
    let frame = 0;
    let animation: Animation | undefined;
    let scrollBehavior: string | undefined;
    const restoreScrollBehavior = () => {
      if (scrollBehavior === undefined) return;
      document.documentElement.style.scrollBehavior = scrollBehavior;
      scrollBehavior = undefined;
    };
    // Next skips native transitions on popstate. Fade after its scroll restoration.
    const onPop = () => {
      if (previousPath.current === window.location.pathname) return;
      previousPath.current = window.location.pathname;
      cancelAnimationFrame(frame);
      animation?.cancel();
      restoreScrollBehavior();
      scrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      frame = requestAnimationFrame(() => {
        restoreScrollBehavior();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        animation = document.getElementById("content")?.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 350, easing: "cubic-bezier(.22, 1, .36, 1)" },
        );
      });
    };
    // Run before Next updates pathname during history navigation.
    window.addEventListener("popstate", onPop, true);
    return () => { window.removeEventListener("popstate", onPop, true); cancelAnimationFrame(frame); animation?.cancel(); restoreScrollBehavior(); };
  }, []);

  return <ViewTransition name={`page${pathname.replaceAll("/", "-")}`} default="route-transition">{children}</ViewTransition>;
}
