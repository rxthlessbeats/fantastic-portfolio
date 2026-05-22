"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, Line, Row } from "@once-ui-system/core";
import { routes, display, about, projects, publications, work } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./NavBar.module.scss";

type NavItem = {
  href: string;
  prefixIcon: string;
  label?: string;
  match: (pathname: string) => boolean;
};

type IndicatorStyle = {
  left: number;
  width: number;
  opacity: number;
};

export function NavBar() {
  const pathname = usePathname() ?? "";
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLElement | null)[]>([]);
  const wasOnHomeRef = useRef(false);
  const [instantPlace, setInstantPlace] = useState(false);
  const [indicator, setIndicator] = useState<IndicatorStyle>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const pillNavItems = useMemo(() => {
    const items: NavItem[] = [];

    if (routes["/about"]) {
      items.push({
        href: "/about",
        prefixIcon: "person",
        label: about.label,
        match: (p) => p === "/about",
      });
    }
    if (routes["/work"]) {
      items.push({
        href: "/work",
        prefixIcon: "grid",
        label: work.label,
        match: (p) => p.startsWith("/work"),
      });
    }
    if (routes["/projects"]) {
      items.push({
        href: "/projects",
        prefixIcon: "book",
        label: projects.label,
        match: (p) => p.startsWith("/projects"),
      });
    }
    if (routes["/publications"]) {
      items.push({
        href: "/publications",
        prefixIcon: "document",
        label: publications.label,
        match: (p) => p.startsWith("/publications"),
      });
    }

    return items;
  }, []);

  const activeIndex = pillNavItems.findIndex((item) => item.match(pathname));
  const isHome = pathname === "/";

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    if (!container || activeIndex < 0 || isHome) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeEl = buttonRefs.current[activeIndex];
    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    const next: IndicatorStyle = {
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
      opacity: 1,
    };

    if (wasOnHomeRef.current) {
      wasOnHomeRef.current = false;
      setInstantPlace(true);
      setIndicator(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setInstantPlace(false));
      });
      return;
    }

    setIndicator(next);
  }, [activeIndex, isHome]);

  useLayoutEffect(() => {
    if (isHome) {
      wasOnHomeRef.current = true;
    }
    updateIndicator();
  }, [pathname, pillNavItems, updateIndicator, isHome]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => updateIndicator());
    observer.observe(container);
    window.addEventListener("resize", updateIndicator);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [updateIndicator]);

  return (
    <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
      {routes["/"] && (
        <Button
          href="/"
          variant="tertiary"
          size="s"
          prefixIcon="home"
          aria-current={isHome ? "page" : undefined}
          className={styles.navLink}
        />
      )}
      {pillNavItems.length > 0 && (
        <Line background="neutral-alpha-medium" vert maxHeight="24" />
      )}
      <Row
        ref={containerRef}
        className={styles.navTrack}
        gap="4"
        vertical="center"
        fitHeight
      >
        <div
          className={`${styles.indicator} ${instantPlace ? styles.instant : ""}`}
          style={{
            left: indicator.left,
            width: indicator.width,
            opacity: indicator.opacity,
          }}
          aria-hidden
        />
        {pillNavItems.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <Button
              key={item.href}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              className={styles.navLink}
              href={item.href}
              variant="tertiary"
              size="s"
              prefixIcon={item.prefixIcon}
              label={item.label}
              aria-current={isActive ? "page" : undefined}
            />
          );
        })}
      </Row>
      {display.themeSwitcher && (
        <>
          <Line background="neutral-alpha-medium" vert maxHeight="24" />
          <ThemeToggle />
        </>
      )}
    </Row>
  );
}
