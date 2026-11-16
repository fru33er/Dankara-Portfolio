"use client";

import React, { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import { Trophy, Flame, RotateCcw, Sparkles } from "lucide-react";
import { updateBasket, subscribeCatch, type CatchEvent } from "@/lib/catcherState";
import {
  type ThemeId,
  THEMES,
  getActiveTheme,
  subscribeTheme,
} from "@/lib/themeState";

interface FloatingScore {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

export function BallCatcherSection() {
  const activeTheme = useSyncExternalStore(
    subscribeTheme,
    getActiveTheme,
    () => "yellow" as ThemeId
  );
  const themeConfig = THEMES[activeTheme] || THEMES.yellow;

  const runwayRef = useRef<HTMLDivElement | null>(null);
  const basketRef = useRef<HTMLDivElement | null>(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
  const [basketSpring, setBasketSpring] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Position of basket center relative to runway (0% to 100%)
  const [basketPercent, setBasketPercent] = useState(50);

  // Load high score from localStorage
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      try {
        const saved = localStorage.getItem("raka_catcher_highscore");
        if (saved) setHighScore(parseInt(saved, 10) || 0);
      } catch {
        // ignore
      }
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // Update basket bounding box for FallingCircles collision detection
  const syncBasketBounds = useCallback(() => {
    const basketEl = basketRef.current;
    if (!basketEl) return;

    const rect = basketEl.getBoundingClientRect();
    // Only active if in or near viewport
    const inView = rect.bottom > -100 && rect.top < window.innerHeight + 100;

    updateBasket({
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      active: inView,
    });
  }, []);

  // Keep basket position synced with physics engine
  useEffect(() => {
    syncBasketBounds();
    window.addEventListener("scroll", syncBasketBounds, { passive: true });
    window.addEventListener("resize", syncBasketBounds);

    const interval = setInterval(syncBasketBounds, 100);

    return () => {
      window.removeEventListener("scroll", syncBasketBounds);
      window.removeEventListener("resize", syncBasketBounds);
      clearInterval(interval);
      updateBasket({ left: -9999, right: -9999, top: -9999, bottom: -9999, active: false });
    };
  }, [syncBasketBounds]);

  // Handle pointer tracking across the runway
  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const runway = runwayRef.current;
    if (!runway) return;

    const rect = runway.getBoundingClientRect();
    let clientX = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const relX = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (relX / rect.width) * 100));
    setBasketPercent(pct);
  };

  // Re-sync bounding box when basket moves
  useEffect(() => {
    syncBasketBounds();
  }, [basketPercent, syncBasketBounds]);

  // Subscribe to live catch events from FallingCircles
  useEffect(() => {
    const unsubscribe = subscribeCatch((event: CatchEvent) => {
      // Visual bounce on basket
      setBasketSpring(true);
      setTimeout(() => setBasketSpring(false), 140);

      if (event.type === "green") {
        setCombo((prevCombo) => {
          const mult = prevCombo >= 5 ? 3 : prevCombo >= 3 ? 2 : 1;
          const pointsEarned = event.points * mult;

          setScore((prevScore) => {
            const nextScore = prevScore + pointsEarned;
            setHighScore((prevHigh) => {
              const nextHigh = Math.max(prevHigh, nextScore);
              try {
                localStorage.setItem("raka_catcher_highscore", nextHigh.toString());
              } catch {
                // ignore
              }
              return nextHigh;
            });
            return nextScore;
          });

          // Floating score indicator
          const id = Date.now() + Math.random();
          setFloatingScores((prev) => [
            ...prev.slice(-6),
            {
              id,
              x: event.x,
              y: event.y,
              text: `+${pointsEarned}${mult > 1 ? ` (${mult}x)` : ""}`,
              color: "var(--color-primary)",
            },
          ]);

          return prevCombo + 1;
        });
      } else {
        // Penalty catch: deduction & reset combo
        setCombo(1);
        setScore((prev) => Math.max(0, prev + event.points));

        const id = Date.now() + Math.random();
        setFloatingScores((prev) => [
          ...prev.slice(-6),
          {
            id,
            x: event.x,
            y: event.y,
            text: "-5",
            color: "var(--color-accent)",
          },
        ]);
      }

      // Cleanup floating scores after animation
      setTimeout(() => {
        setFloatingScores((prev) => prev.filter((item) => Date.now() - item.id < 900));
      }, 1000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleResetScore = () => {
    setScore(0);
    setCombo(1);
  };

  return (
    <section
      data-anchor="ball-catcher"
      aria-labelledby="ball-catcher-heading"
      className="relative w-full overflow-x-clip py-16 border-t border-line"
    >
      <div className="px-inline mx-auto w-full max-w-[1800px]">
        {/* Section Header */}
        <div data-field-protect="true" className="relative flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-mono text-xs text-page font-bold">
                03
              </span>
              <p
                data-chrome="true"
                className="text-label font-mono text-[length:var(--type-caption)] tracking-(--tracking-mono) uppercase"
              >
                Arcade // Live Gravity Physics
              </p>
            </div>
            <h2
              id="ball-catcher-heading"
              data-motion="heading"
              className="text-heading mt-2 leading-[0.85] font-bold"
              style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
            >
              CATCH THE FALL
            </h2>
            <p className="mt-3 max-w-xl font-mono text-xs uppercase tracking-wider text-label flex flex-wrap items-center gap-1.5">
              <span>Slide your mouse across the runway below to catch the live falling</span>
              <span className="inline-flex items-center gap-1 font-bold text-heading">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full border border-heading/30"
                  style={{ backgroundColor: themeConfig.positiveBallColor }}
                />
                {themeConfig.positiveBallName} circles (+10)
              </span>
              <span>and dodge</span>
              <span className="inline-flex items-center gap-1 font-bold text-accent">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full border border-heading/30"
                  style={{ backgroundColor: themeConfig.negativeBallColor }}
                />
                {themeConfig.negativeBallName} circles (-5)!
              </span>
            </p>
          </div>

          {/* HUD Badges */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-sm uppercase">
            <div className="flex items-center gap-2 rounded-xl border-2 border-heading bg-raised px-4 py-2 shadow-[2px_2px_0_var(--text-heading)]">
              <Flame className="h-4 w-4 text-primary" />
              <span>Streak: <strong className="tabular-nums text-base">{combo}x</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border-2 border-heading bg-raised px-4 py-2 shadow-[2px_2px_0_var(--text-heading)]">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Score: <strong className="tabular-nums text-base">{score}</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border-2 border-heading bg-raised px-4 py-2 shadow-[2px_2px_0_var(--text-heading)]">
              <Trophy className="h-4 w-4 text-heading" />
              <span>Best: <strong className="tabular-nums text-base">{highScore}</strong></span>
            </div>
            {score > 0 && (
              <button
                type="button"
                onClick={handleResetScore}
                title="Reset Score"
                className="flex items-center gap-1 rounded-xl border-2 border-heading bg-raised px-3 py-2 text-xs text-subtle hover:text-heading hover:bg-heading/10 transition-colors cursor-pointer shadow-[2px_2px_0_var(--text-heading)]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* The Live Interactive Runway Track */}
        <div
          ref={runwayRef}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="group relative mt-10 w-full select-none rounded-3xl border-4 border-heading bg-raised/70 p-6 md:p-8 shadow-[6px_6px_0_var(--text-heading)] overflow-hidden cursor-ew-resize min-h-[220px] flex flex-col justify-between"
        >
          {/* Subtle Runway Lane Markings */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-6 opacity-20">
            <div className="h-px w-full border-t-2 border-dashed border-heading" />
          </div>

          {/* Catch hints inside runway */}
          <div className="pointer-events-none flex items-center justify-between font-mono text-xs uppercase tracking-widest text-heading/60">
            <span>◀ SLIDE LEFT</span>
            <span className="flex items-center gap-2 font-mono text-[11px] font-bold">
              <span
                className="inline-block h-3 w-3 rounded-full border border-heading/40"
                style={{ backgroundColor: themeConfig.positiveBallColor }}
              />
              {themeConfig.positiveBallName.toUpperCase()} = +10
              <span
                className="ml-3 inline-block h-3 w-3 rounded-full border border-heading/40"
                style={{ backgroundColor: themeConfig.negativeBallColor }}
              />
              {themeConfig.negativeBallName.toUpperCase()} = -5
            </span>
            <span>SLIDE RIGHT ▶</span>
          </div>

          {/* Runway Base Track */}
          <div className="relative w-full h-16 flex items-end">
            {/* The Moving Basket Paddle (Polos / Clean) */}
            <div
              ref={basketRef}
              className={`absolute bottom-0 -translate-x-1/2 w-28 md:w-36 h-8 rounded-xl border-3 border-heading bg-primary shadow-[4px_4px_0_var(--text-heading)] transition-transform duration-75 ${
                basketSpring ? "translate-y-1 scale-95" : ""
              }`}
              style={{ left: `${basketPercent}%` }}
            >
              {/* Basket top catch rim */}
              <div className="absolute -top-1 inset-x-2 h-1.5 rounded-full bg-accent" />
            </div>
          </div>

          {/* Guidance cue */}
          <div className="pointer-events-none text-center font-mono text-[11px] uppercase tracking-wider text-subtle">
            {isHovering ? "Tracking Active — Intercept the falling balls!" : "Hover or drag finger here to guide the basket"}
          </div>
        </div>

        {/* Floating Score Popups */}
        <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
          {floatingScores.map((item) => (
            <div
              key={item.id}
              className="absolute font-mono text-lg font-bold tracking-tight animate-out fade-out slide-out-to-top-8 duration-700 select-none pointer-events-none"
              style={{
                left: `${item.x}px`,
                top: `${item.y - 20}px`,
                color: item.color,
                textShadow: "1px 1px 0 #111314",
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
