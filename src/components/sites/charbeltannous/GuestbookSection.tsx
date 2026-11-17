"use client";

import React, { useRef, useState, useEffect } from "react";
import { PenLine, RotateCcw } from "lucide-react";
import { addLineSegment, clearLineSegments } from "@/lib/guestbookLines";
import { subscribeTheme, type ThemeId } from "@/lib/themeState";

const THEME_INKS: Record<ThemeId, Array<{ label: string; color: string }>> = {
  yellow: [
    { label: "Green", color: "#1a7444" },
    { label: "Red", color: "#cc1236" },
    { label: "Dark", color: "#111314" },
  ],
  mono: [
    { label: "Black", color: "#111111" },
    { label: "Charcoal", color: "#555555" },
    { label: "Silver", color: "#888888" },
  ],
  blue: [
    { label: "Blue", color: "#002BFF" },
    { label: "Coral", color: "#ef4444" },
    { label: "Navy", color: "#001fb3" },
  ],
};

export function GuestbookSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [signatureCount, setSignatureCount] = useState(0);
  const [theme, setThemeState] = useState<ThemeId>("yellow");
  const [currentColor, setCurrentColor] = useState("#1a7444");

  useEffect(() => {
    const unsubscribe = subscribeTheme((newTheme) => {
      setThemeState(newTheme);
      setCurrentColor(THEME_INKS[newTheme][0].color);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas to internal coordinate space
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(2, 2);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    lastPosRef.current = pos;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 3;
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    if (lastPosRef.current) {
      addLineSegment(lastPosRef.current.x, lastPosRef.current.y, pos.x, pos.y);
    }
    lastPosRef.current = pos;

    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    if (!hasDrawn) {
      setHasDrawn(true);
      setSignatureCount((prev) => prev + 1);
    }
  };

  const stopDrawing = () => {
    lastPosRef.current = null;
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearLineSegments();
    setHasDrawn(false);
    setSignatureCount(0);
  };

  return (
    <section
      data-anchor="guestbook"
      aria-labelledby="guestbook-heading"
      className="relative w-full overflow-x-clip py-16"
    >
      <div data-field-protect="true" className="relative">
        <h2
          id="guestbook-heading"
          data-motion="heading"
          data-reveal="clip"
          className="text-heading px-inline leading-[0.8] font-bold"
          style={{ fontSize: "clamp(5rem, 12vw, 11rem)" }}
        >
          <span className="sr-only">
            {signatureCount} signatures on the wall
          </span>
          <span aria-hidden="true" className="tabular-nums">
            {signatureCount}
          </span>
        </h2>
        <p
          data-chrome="true"
          data-reveal="up"
          data-reveal-delay="80"
          className="text-label px-inline mt-2 font-mono text-[length:var(--type-caption)] tracking-(--tracking-mono) uppercase"
        >
          Signatures
        </p>
      </div>

      {/* The interactive signature wall */}
      <div
        role="group"
        aria-label="The wall. Draw to sign it."
        data-reveal="scale"
        data-reveal-delay="120"
        className="group relative mt-8 w-full select-none cursor-crosshair border-y border-heading/20"
        style={{
          aspectRatio: "1600 / 820",
          touchAction: "none",
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full pointer-events-auto"
        />

        {/* Faint hint message when empty */}
        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <p className="font-mono text-sm tracking-(--tracking-mono) uppercase text-subtle">
              Click and drag to sign the wall
            </p>
          </div>
        )}
      </div>

      {/* Floating Pen Dock */}
      <div
        data-reveal="up"
        data-reveal-delay="180"
        className="pointer-events-none flex justify-center h-14 -mt-16 sticky bottom-6 z-10"
      >
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border-2 border-heading bg-raised px-4 py-2 shadow-[3px_3px_0_var(--text-heading)]">
          <div className="flex items-center gap-2">
            <PenLine className="h-4 w-4 text-heading" />
            <span className="font-mono text-xs uppercase tracking-wider text-heading font-medium">
              Draw to sign
            </span>
          </div>

          {/* Color pickers */}
          <div className="ml-2 flex items-center gap-1.5 border-l border-heading/30 pl-2">
            {(THEME_INKS[theme] || THEME_INKS.yellow).map((c) => (
              <button
                key={c.color}
                type="button"
                onClick={() => setCurrentColor(c.color)}
                aria-label={`Select ${c.label} ink`}
                className={`h-4 w-4 rounded-full transition-transform ${
                  currentColor === c.color ? "scale-125 ring-2 ring-heading" : ""
                }`}
                style={{ backgroundColor: c.color }}
              />
            ))}
          </div>

          {/* Reset button */}
          {hasDrawn && (
            <button
              type="button"
              onClick={clearCanvas}
              title="Clear drawings"
              className="ml-2 flex items-center gap-1 text-xs font-mono uppercase text-label hover:opacity-70 transition-opacity"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

