"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Icon from "./Icon";
import type { Screen } from "@/lib/screens";

type Open = (screen: Screen, caption?: string) => void;

const LightboxContext = createContext<Open>(() => {});

/** Opens a screenshot full size — the product screens are dense, so every shot can be enlarged. */
export const useLightbox = () => useContext(LightboxContext);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<{ screen: Screen; caption?: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback<Open>((screen, caption) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setItem({ screen, caption });
  }, []);

  const close = useCallback(() => {
    setItem(null);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!item) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("en-lock");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("en-lock");
    };
  }, [item, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {item && (
        <div
          className="en-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.caption || item.screen.alt}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button ref={closeRef} type="button" className="en-lightbox-close" onClick={close} aria-label="Close">
            <Icon name="x" size={22} />
          </button>
          <figure className="en-lightbox-figure">
            <div className="en-lightbox-scroll">
              <Image
                src={item.screen.src}
                alt={item.screen.alt}
                width={item.screen.w}
                height={item.screen.h}
                sizes="(max-width: 1700px) 96vw, 1600px"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
            <figcaption>{item.caption || item.screen.alt}</figcaption>
          </figure>
        </div>
      )}
    </LightboxContext.Provider>
  );
}
