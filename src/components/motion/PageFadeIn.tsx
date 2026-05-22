"use client";

import { usePathname } from "next/navigation";
import { Flex } from "@once-ui-system/core";
import styles from "./PageFadeIn.module.scss";

interface PageFadeInProps {
  children: React.ReactNode;
}

export function PageFadeIn({ children }: PageFadeInProps) {
  const pathname = usePathname();

  return (
    <Flex key={pathname} fillWidth horizontal="center" className={styles.pageFadeIn}>
      {children}
    </Flex>
  );
}
