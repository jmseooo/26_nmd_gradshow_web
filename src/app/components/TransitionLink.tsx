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

    const wrapper = document.getElementById("page-wrapper");
    if (!wrapper) {
      router.push(href);
      return;
    }

    const anim = wrapper.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(-10px)" },
      ],
      { duration: 220, easing: "ease-in", fill: "forwards" }
    );
    anim.onfinish = () => router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style} className={className}>
      {children}
    </a>
  );
}
