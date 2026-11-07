"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import Icon from "./Icon";
import { useLightbox } from "./Lightbox";
import { SCREENS, type ScreenKey } from "@/lib/screens";

/**
 * A real Enerceon screenshot in a browser-style frame. Click (or Enter) opens it
 * full size. `chrome` adds the window bar; `title` shows in it.
 */
export default function Shot({
  k,
  title,
  chrome = true,
  sizes = "(max-width: 900px) 94vw, 720px",
  priority = false,
  className = "",
  style,
  tone = "light",
}: {
  k: ScreenKey;
  title?: string;
  chrome?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  /** frame colour: light screens on dark sections look best with the light frame */
  tone?: "light" | "dark";
}) {
  const screen = SCREENS[k];
  const open = useLightbox();
  return (
    <figure className={`en-shot en-shot-${tone} ${className}`} style={style}>
      {chrome && (
        <div className="en-shot-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          {title && <span>{title}</span>}
        </div>
      )}
      <button
        type="button"
        className="en-shot-btn"
        onClick={() => open(screen, title)}
        aria-label={`Enlarge screenshot: ${title || screen.alt}`}
      >
        <Image
          src={screen.src}
          alt={screen.alt}
          width={screen.w}
          height={screen.h}
          sizes={sizes}
          priority={priority}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <span className="en-shot-zoom" aria-hidden="true">
          <Icon name="zoom" size={16} />
        </span>
      </button>
    </figure>
  );
}
