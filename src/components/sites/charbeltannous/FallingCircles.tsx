"use client";

import React, { useEffect, useRef } from "react";
import { getLineSegments } from "@/lib/guestbookLines";
import { getBasket, emitCatch } from "@/lib/catcherState";
import { subscribeTheme, THEMES, getStoredTheme } from "@/lib/themeState";

interface CatchParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Obstacle {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function FallingCircles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking for physics collisions
    const mouse = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      radius: 20, // collision radius of the cursor
      active: false,
    };

    let prevMouseX = -9999;
    let prevMouseY = -9999;

    const onMouseMove = (e: MouseEvent) => {
      mouse.active = true;
      if (prevMouseX !== -9999) {
        // Measure mouse speed
        mouse.vx = (e.clientX - prevMouseX) * 0.5;
        mouse.vy = (e.clientY - prevMouseY) * 0.5;
        // Cap max flick speed
        const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
        if (speed > 18) {
          mouse.vx = (mouse.vx / speed) * 18;
          mouse.vy = (mouse.vy / speed) * 18;
        }
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
      prevMouseX = -9999;
      prevMouseY = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    // Active theme colors
    let currentThemeConfig = THEMES[getStoredTheme()];

    // Number of balls: 12 balls (smooth, continuous gravity flow)
    const ballCount = 12;
    const balls: Ball[] = Array.from({ length: ballCount }, (_, i) => ({
      x: (width / (ballCount + 1)) * (i + 1) + (Math.random() - 0.5) * 60,
      y: -20 - i * 60, // Staggered drop from top
      vx: (Math.random() - 0.5) * 1.5,
      vy: Math.random() * 1.5,
      // Random compact radius between 9px and 17px (diameter 18px to 34px)
      radius: Math.floor(Math.random() * 9) + 9,
      color: currentThemeConfig.ballColors[i % currentThemeConfig.ballColors.length],
    }));

    // Subscribe to theme palette changes
    const unsubscribeTheme = subscribeTheme((newTheme) => {
      currentThemeConfig = THEMES[newTheme];
      for (let i = 0; i < balls.length; i++) {
        balls[i].color =
          currentThemeConfig.ballColors[i % currentThemeConfig.ballColors.length];
      }
    });

    // Cache obstacle rects from visible interactive & text elements
    let obstacles: Obstacle[] = [];
    let guestbookRect: DOMRect | null = null;
    let frameCount = 0;

    const catchParticles: CatchParticle[] = [];
    const addBurst = (x: number, y: number, color: string, count = 12) => {
      for (let k = 0; k < count; k++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 4 + 1.5;
        catchParticles.push({
          x,
          y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1,
          size: Math.random() * 4 + 2,
          color,
          alpha: 1,
        });
      }
    };

    const updateObstacles = () => {
      const list: Obstacle[] = [];

      // Update Guestbook canvas bounding box for hand-drawn line physics
      const gbCanvas = document.querySelector<HTMLCanvasElement>(
        "section[data-anchor='guestbook'] canvas"
      );
      guestbookRect = gbCanvas ? gbCanvas.getBoundingClientRect() : null;

      // 1. Precise bounding boxes for "RAKA" and "ANDHIKA" individually
      // "RAKA" only covers the upper left letters, leaving the upper-right area 100% open
      const rakaEl = document.querySelector("[data-wordmark='raka']");
      const andhikaEl = document.querySelector("[data-wordmark='andhika']");

      if (rakaEl) {
        const rRect = rakaEl.getBoundingClientRect();
        if (
          rRect.width > 20 &&
          rRect.height > 10 &&
          rRect.bottom > -50 &&
          rRect.top < height + 50
        ) {
          list.push({
            left: rRect.left,
            top: rRect.top,
            right: rRect.right,
            bottom: rRect.bottom,
          });
        }
      }

      if (andhikaEl) {
        const aRect = andhikaEl.getBoundingClientRect();
        if (
          aRect.width > 20 &&
          aRect.height > 10 &&
          aRect.bottom > -50 &&
          aRect.top < height + 50
        ) {
          list.push({
            left: aRect.left,
            top: aRect.top,
            right: aRect.right,
            bottom: aRect.bottom,
          });
        }
      }

      // Fallback if SVG paths not rendered yet
      if (!rakaEl && !andhikaEl) {
        const headlineEl = document.querySelector("[data-motion='headline']");
        if (headlineEl) {
          const rect = headlineEl.getBoundingClientRect();
          if (
            rect.width > 20 &&
            rect.height > 10 &&
            rect.bottom > -50 &&
            rect.top < height + 50
          ) {
            list.push({
              left: rect.left,
              top: rect.top,
              right: rect.left + rect.width * 0.622,
              bottom: rect.top + rect.height * 0.49,
            });
            list.push({
              left: rect.left,
              top: rect.top + rect.height * 0.51,
              right: rect.right,
              bottom: rect.bottom,
            });
          }
        }
      }

      // 2. Generic content obstacles (excluding full headline to avoid mid-air blocking)
      const selectors = [
        "h2",
        "h3",
        ".open-to-work",
        "ol > li",
        "article",
        "aside > div",
        "header nav",
      ];
      const elements = document.querySelectorAll(selectors.join(", "));

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];

        // Do not block balls inside the arcade catch section so balls fall directly into the runway/basket
        if (
          el.closest("section[data-anchor='ball-catcher']") ||
          el.id === "ball-catcher-heading"
        ) {
          continue;
        }

        const rect = el.getBoundingClientRect();

        // Only include elements currently in or near viewport with valid dimensions
        if (
          rect.width > 20 &&
          rect.height > 10 &&
          rect.bottom > -50 &&
          rect.top < height + 50
        ) {
          list.push({
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
          });
        }
      }
      obstacles = list;
    };

    // Initial query
    updateObstacles();

    // Physics parameters
    const gravity = 0.22;
    const bounce = 0.55; // Restitution
    const friction = 0.985; // Surface & air friction

    const render = () => {
      frameCount++;
      // Decay mouse velocity gradually when stationary
      mouse.vx *= 0.82;
      mouse.vy *= 0.82;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];

        // 1. Apply gravity & air resistance
        b.vy += gravity;
        b.vx *= friction;
        b.vy *= friction;

        // Terminal velocity cap
        if (b.vy > 12) b.vy = 12;

        // 2. Cursor collision (physical bounce & flicking impulse)
        if (mouse.active) {
          const cdx = b.x - mouse.x;
          const cdy = b.y - mouse.y;
          const cdistSq = cdx * cdx + cdy * cdy;
          const cMinDist = b.radius + mouse.radius;

          if (cdistSq < cMinDist * cMinDist && cdistSq > 0.0001) {
            const cdist = Math.sqrt(cdistSq);
            const cnx = cdx / cdist;
            const cny = cdy / cdist;

            // Separate ball from cursor
            const coverlap = cMinDist - cdist;
            b.x += cnx * coverlap;
            b.y += cny * coverlap;

            // Relative velocity
            const relVx = b.vx - mouse.vx;
            const relVy = b.vy - mouse.vy;
            const dot = relVx * cnx + relVy * cny;

            if (dot < 0) {
              const impulse = -(1 + 0.7) * dot;
              b.vx += cnx * impulse;
              b.vy += cny * impulse;
            }

            // Transfer momentum from mouse movement
            b.vx += mouse.vx * 0.7;
            b.vy += mouse.vy * 0.7;
          }
        }

        // 3. Update position
        b.x += b.vx;
        b.y += b.vy;

        // 4. Obstacle collision detection & response (text, buttons, cards)
        for (let j = 0; j < obstacles.length; j++) {
          const obs = obstacles[j];

          // Nearest point on AABB to circle center
          const nearestX = Math.max(obs.left, Math.min(b.x, obs.right));
          const nearestY = Math.max(obs.top, Math.min(b.y, obs.bottom));

          const dx = b.x - nearestX;
          const dy = b.y - nearestY;
          const distSq = dx * dx + dy * dy;

          if (distSq < b.radius * b.radius) {
            // Collision detected
            let nx = 0;
            let ny = 0;
            let dist = Math.sqrt(distSq);

            if (dist > 0.001) {
              nx = dx / dist;
              ny = dy / dist;
            } else {
              // Ball center inside box: pop out via closest edge
              const toLeft = Math.abs(b.x - obs.left);
              const toRight = Math.abs(b.x - obs.right);
              const toTop = Math.abs(b.y - obs.top);
              const toBottom = Math.abs(b.y - obs.bottom);
              const min = Math.min(toLeft, toRight, toTop, toBottom);

              if (min === toTop) {
                ny = -1;
              } else if (min === toBottom) {
                ny = 1;
              } else if (min === toLeft) {
                nx = -1;
              } else {
                nx = 1;
              }
              dist = 0;
            }

            // Penetration resolution
            const penetration = b.radius - dist;
            b.x += nx * penetration;
            b.y += ny * penetration;

            // Reflect velocity along normal
            const dot = b.vx * nx + b.vy * ny;
            if (dot < 0) {
              b.vx = (b.vx - (1 + bounce) * dot * nx) * 0.9;
              b.vy = (b.vy - (1 + bounce) * dot * ny) * 0.9;

              // If resting on top of a surface, gently roll towards closest edge so it rolls off!
              if (ny < -0.7) {
                const center = (obs.left + obs.right) / 2;
                const rollDir = b.x >= center ? 1 : -1;
                const distToEdge = Math.min(Math.abs(b.x - obs.left), Math.abs(b.x - obs.right));
                const rollPower = distToEdge < 120 ? 0.42 : 0.28;
                b.vx += rollDir * rollPower;
              }
            }
          }
        }

        // 4b. Collide with user-drawn line strokes in the Guestbook section
        if (
          guestbookRect &&
          b.y + b.radius >= guestbookRect.top &&
          b.y - b.radius <= guestbookRect.bottom &&
          b.x + b.radius >= guestbookRect.left &&
          b.x - b.radius <= guestbookRect.right
        ) {
          const drawnSegments = getLineSegments();
          const strokeRadius = 3;
          const effectiveRadius = b.radius + strokeRadius;
          const effectiveRadiusSq = effectiveRadius * effectiveRadius;

          for (let s = 0; s < drawnSegments.length; s++) {
            const seg = drawnSegments[s];
            const sx1 = guestbookRect.left + seg.x1;
            const sy1 = guestbookRect.top + seg.y1;
            const sx2 = guestbookRect.left + seg.x2;
            const sy2 = guestbookRect.top + seg.y2;

            // Fast bounding box rejection for each segment
            const minX = Math.min(sx1, sx2) - effectiveRadius;
            const maxX = Math.max(sx1, sx2) + effectiveRadius;
            if (b.x < minX || b.x > maxX) continue;

            const minY = Math.min(sy1, sy2) - effectiveRadius;
            const maxY = Math.max(sy1, sy2) + effectiveRadius;
            if (b.y < minY || b.y > maxY) continue;

            // Vector math: find closest point on segment to ball center
            const segDx = sx2 - sx1;
            const segDy = sy2 - sy1;
            const segLenSq = segDx * segDx + segDy * segDy;
            if (segLenSq < 0.0001) continue;

            const toBallX = b.x - sx1;
            const toBallY = b.y - sy1;
            const t = Math.max(
              0,
              Math.min(1, (toBallX * segDx + toBallY * segDy) / segLenSq)
            );

            const closestX = sx1 + t * segDx;
            const closestY = sy1 + t * segDy;

            const distX = b.x - closestX;
            const distY = b.y - closestY;
            const distSq = distX * distX + distY * distY;

            if (distSq < effectiveRadiusSq) {
              let dist = Math.sqrt(distSq);
              let nx = 0;
              let ny = -1;

              if (dist > 0.001) {
                nx = distX / dist;
                ny = distY / dist;
              } else {
                const len = Math.sqrt(segLenSq);
                nx = -segDy / len;
                ny = segDx / len;
                if (ny > 0) {
                  nx = -nx;
                  ny = -ny;
                }
                dist = 0;
              }

              // Positional separation
              const penetration = effectiveRadius - dist;
              b.x += nx * penetration;
              b.y += ny * penetration;

              // Reflect velocity along line normal
              const dot = b.vx * nx + b.vy * ny;
              if (dot < 0) {
                b.vx = (b.vx - (1 + bounce) * dot * nx) * 0.88;
                b.vy = (b.vy - (1 + bounce) * dot * ny) * 0.88;

                // Gentle slide along slope if supporting ball
                if (ny < -0.2) {
                  b.vx += nx * 0.3;
                }
              }
            }
          }
        }

        // 4c. Catch live falling balls with Basket in BallCatcherSection
        const basket = getBasket();
        if (
          basket.active &&
          b.y + b.radius >= basket.top - 6 &&
          b.y - b.radius <= basket.bottom + 12 &&
          b.x + b.radius >= basket.left &&
          b.x - b.radius <= basket.right
        ) {
          // Check if ball is positive (+10) or negative (-5) based on active theme
          const isPositive =
            b.color === currentThemeConfig.positiveBallColor ||
            b.color === currentThemeConfig.ballColors[1] ||
            b.color === currentThemeConfig.ballColors[3] ||
            b.color === currentThemeConfig.ballColors[5];

          if (isPositive) {
            emitCatch({ type: "green", x: b.x, y: b.y, points: 10 });
          } else {
            emitCatch({ type: "red", x: b.x, y: b.y, points: -5 });
          }

          addBurst(b.x, b.y, b.color, 14);

          // Recycle the caught ball back to the top of the webpage
          b.y = -b.radius - Math.random() * 40;
          b.x = Math.random() * width;
          b.vx = (Math.random() - 0.5) * 1.5;
          b.vy = Math.random() * 2;
          b.color =
            currentThemeConfig.ballColors[
              Math.floor(Math.random() * currentThemeConfig.ballColors.length)
            ];
          continue;
        }

        // 5. Ball-to-ball collisions
        for (let j = i + 1; j < balls.length; j++) {
          const b2 = balls[j];
          const dx = b2.x - b.x;
          const dy = b2.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b.radius + b2.radius;

          if (dist < minDist && dist > 0.001) {
            const overlap = (minDist - dist) * 0.5;
            const nx = dx / dist;
            const ny = dy / dist;

            b.x -= nx * overlap;
            b.y -= ny * overlap;
            b2.x += nx * overlap;
            b2.y += ny * overlap;

            // Normal impulse exchange
            const kx = b.vx - b2.vx;
            const ky = b.vy - b2.vy;
            const p = (2 * (nx * kx + ny * ky)) / 2;

            b.vx -= p * nx * bounce;
            b.vy -= p * ny * bounce;
            b2.vx += p * nx * bounce;
            b2.vy += p * ny * bounce;
          }
        }

        // 6. Left & Right viewport walls
        if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx = -b.vx * bounce;
        } else if (b.x + b.radius > width) {
          b.x = width - b.radius;
          b.vx = -b.vx * bounce;
        }

        // 7. Recycle ball when it falls past the bottom of the viewport
        if (b.y - b.radius > height) {
          b.y = -b.radius - Math.random() * 40;
          b.x = Math.random() * width;
          b.vx = (Math.random() - 0.5) * 1.5;
          b.vy = Math.random() * 2;
          b.color =
            currentThemeConfig.ballColors[
              Math.floor(Math.random() * currentThemeConfig.ballColors.length)
            ];
        }

        // 8. Render flat circle (NO border, NO shadow, NO effects)
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
      }

      // 9. Render Catch Burst Particles
      for (let pIdx = catchParticles.length - 1; pIdx >= 0; pIdx--) {
        const p = catchParticles[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.04;
        if (p.alpha <= 0) {
          catchParticles.splice(pIdx, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const onScroll = () => {
      updateObstacles();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      unsubscribeTheme();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 h-full w-full"
    />
  );
}
