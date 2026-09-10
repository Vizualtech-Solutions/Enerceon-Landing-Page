"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Capabilities from "./Capabilities";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import IndustriesBanner from "./IndustriesBanner";
import Integration from "./Integration";
import ProductTour from "./ProductTour";
import Projects from "./Projects";
import Structure from "./Structure";
import Utilities from "./Utilities";
import UtilityStrip from "./UtilityStrip";
import Voices from "./Voices";
import Walkthrough from "./Walkthrough";
import { PROJECTS, SERIES, STEPS } from "@/lib/content";

const numberFormat = new Intl.NumberFormat("en-US");

export default function Landing() {
  const [series, setSeries] = useState(0);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState(0);
  const [project, setProject] = useState(0);
  const [meters, setMeters] = useState(1180);
  const [points, setPoints] = useState(2.31);
  const [scroll, setScroll] = useState(0);

  const scrollRef = useRef(0);
  const progressRef = useRef(0);

  // The theme lives on <html>, where the pre-paint script sets it and the stylesheet reads it.
  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("enerceon-theme", next);
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
  }, []);

  // Reveal on scroll.
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".en-reveal"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Scroll progress + parallax.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    let frame = 0;

    const paint = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      const pct = max > 0 ? Math.min(100, (root.scrollTop / max) * 100) : 0;
      if (Math.abs(pct - scrollRef.current) > 0.4) {
        scrollRef.current = pct;
        setScroll(pct);
      }
      if (reduced) return;

      const viewport = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2 - viewport / 2;
        el.style.transform = `translate3d(0,${(-mid * parseFloat(el.dataset.parallax!)).toFixed(1)}px,0)`;
      });
      document.querySelectorAll<HTMLElement>("[data-parallax-bg]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
        const amount = parseFloat(el.dataset.parallaxBg!);
        el.style.backgroundPosition = `center ${(50 - amount / 2 + ratio * amount).toFixed(1)}%`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Hero cursor glow and console tilt — pointer devices only.
  useEffect(() => {
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (!fine || reduced) return;

    const hero = document.getElementById("top");
    const glow = document.querySelector<HTMLElement>("[data-cursor]");
    const tilt = document.querySelector<HTMLElement>("[data-tilt]");
    if (!hero) return;

    const onMove = (event: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      if (glow) {
        glow.style.opacity = "1";
        glow.style.transform = `translate3d(${event.clientX - rect.left}px,${event.clientY - rect.top}px,0)`;
      }
      if (tilt) {
        const box = tilt.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) / box.width;
        const dy = (event.clientY - (box.top + box.height / 2)) / box.height;
        tilt.style.transform = `perspective(1100px) rotateY(${(dx * 4.5).toFixed(2)}deg) rotateX(${(-dy * 4.5).toFixed(2)}deg) translateZ(0)`;
      }
    };

    const onLeave = () => {
      if (glow) glow.style.opacity = "0";
      if (tilt) tilt.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Walkthrough auto-advance. The tick is held in a ref so the interval body stays a
  // plain callback: advancing the step from inside a setProgress updater makes that
  // updater impure, and StrictMode's double-invoke then advances two steps per wrap.
  useEffect(() => {
    const id = setInterval(() => {
      const next = progressRef.current + 4;
      if (next >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setStep((current) => (current + 1) % STEPS.length);
      } else {
        progressRef.current = next;
        setProgress(next);
      }
    }, 200);
    return () => clearInterval(id);
  }, []);

  // Chart series rotation.
  useEffect(() => {
    const id = setInterval(() => setSeries((current) => (current + 1) % SERIES.length), 5200);
    return () => clearInterval(id);
  }, []);

  // Project rotation, carrying the quote that belongs to each project.
  useEffect(() => {
    const id = setInterval(() => {
      setProject((current) => {
        const next = (current + 1) % PROJECTS.length;
        setQuote(PROJECTS[next].quote);
        return next;
      });
    }, 6500);
    return () => clearInterval(id);
  }, []);

  // Live counters in the hero.
  useEffect(() => {
    const id = setInterval(() => {
      setMeters((current) => Math.min(1245, current + Math.ceil(Math.random() * 9)));
      setPoints((current) => Math.min(2.45, Number((current + 0.01).toFixed(2))));
    }, 900);
    return () => clearInterval(id);
  }, []);

  const pickStep = useCallback((index: number) => {
    setStep(index);
    setProgress(0);
    progressRef.current = 0;
  }, []);

  const pickProject = useCallback((index: number) => {
    setProject(index);
    setQuote(PROJECTS[index].quote);
  }, []);

  const pickQuote = useCallback((index: number) => {
    setQuote(index);
    const match = PROJECTS.findIndex((item) => item.quote === index);
    if (match >= 0) setProject(match);
  }, []);

  return (
    <div
      className="en-root"
      style={{
        background: "#040D19",
        color: "#E9F2F9",
        lineHeight: 1.6,
        transition: "background .5s ease",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          zIndex: 100,
          background: "transparent",
        }}
      >
        <i
          style={{
            display: "block",
            height: "100%",
            width: `${scroll}%`,
            background: "linear-gradient(90deg,#007BFF,#00C8F5,#2ECC71)",
          }}
        />
      </div>

      <Header onToggleTheme={toggleTheme} />

      <main>
        <Hero
          series={series}
          onPickSeries={setSeries}
          meters={numberFormat.format(meters)}
          points={`${points.toFixed(2)} M`}
          demand={numberFormat.format(4800 + ((meters * 7) % 160))}
        />
        <UtilityStrip />
        <Walkthrough step={step} progress={progress} onPickStep={pickStep} />
        <ProductTour />
        <Structure />
        <Capabilities />
        <Utilities />
        <Integration />
        <Projects project={project} onPickProject={pickProject} />
        <Voices
          quote={quote}
          projectName={PROJECTS[project].name}
          onPickQuote={pickQuote}
        />
        <IndustriesBanner />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
