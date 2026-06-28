"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface HeroLightCtx {
  isLight: boolean;
  toggle: () => void;
}

const HeroLightContext = createContext<HeroLightCtx>({
  isLight: false,
  toggle: () => {},
});

export function HeroLightProvider({ children }: { children: ReactNode }) {
  const [isLight, setIsLight] = useState(false);
  return (
    <HeroLightContext.Provider value={{ isLight, toggle: () => setIsLight((v) => !v) }}>
      {children}
    </HeroLightContext.Provider>
  );
}

export const useHeroLight = () => useContext(HeroLightContext);
