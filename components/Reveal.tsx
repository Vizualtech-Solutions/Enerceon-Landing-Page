"use client";

import { useEffect } from "react";

/** Adds .is-visible to every .en-reveal element as it scrolls into view, plus a
 *  thin scroll-progress bar. Hiding only starts once this script runs, so the
 *  page is fully readable without JavaScript. */
export default function Reveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".en-reveal"));
    let observer: IntersectionObserver | null = null;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-visible"));
    } else {
      // What is already on screen stays visible (no flicker); only content
      // further down is hidden and faded in when it is scrolled to.
      const vh = window.innerHeight;
      nodes.forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) n.classList.add("is-visible");
      });
      document.documentElement.classList.add("en-anim");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      nodes.forEach((n) => {
        if (!n.classList.contains("is-visible")) observer!.observe(n);
      });
    }

    const bar = document.getElementById("en-progress");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, root.scrollTop / max) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    paint();

    return () => {
      document.documentElement.classList.remove("en-anim");
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div id="en-progress" className="en-progress" aria-hidden="true" />;
}
