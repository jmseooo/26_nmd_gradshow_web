"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties, ReactNode, MouseEvent } from "react";

interface Props {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function TransitionLink({ href, children, style, className }: Props) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href === "#") return;
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style} className={className}>
      {children}
    </a>
  );
}
