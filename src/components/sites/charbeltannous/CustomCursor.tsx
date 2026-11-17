"use client";

import React, { useEffect, useState, useRef, useSyncExternalStore } from "react";

function subscribeFinePointer(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia("(pointer: fine) and (hover: hover)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Exact mouse position (inner dot)
  const mousePos = useRef({ x: -100, y: -100 });
  // Trailing position (outer follower ring)
  const followerPos = useRef({ x: -100, y: -100 });

  const dotRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isFinePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setIsHovered(false);
        return;
      }

      // Check if mouse is hovering over any interactive object
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, article, [data-cursor], ol > li, canvas, select, label"
      );

      setIsHovered(!!interactive);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth animation loop for the trailing follower
    let animationFrameId: number;

    const animate = () => {
      // Linear interpolation (lerp) for smooth trailing
      const ease = 0.18;
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * ease;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * ease;

      // Direct placement for inner dot (zero latency click point)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth trailing for outer follower
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Precision Inner Dot (always at the center of the cursor) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-heading will-change-transform"
      />

      {/* 2. Outer Ring: Expands slightly when hovering any interactive object */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 will-change-transform"
      >
        <div
          className={`h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-heading transition-all duration-200 ease-out will-change-transform ${
            isHovered
              ? "scale-125 bg-heading/10"
              : "scale-75 bg-transparent"
          }`}
        />
      </div>
    </div>
  );
}
