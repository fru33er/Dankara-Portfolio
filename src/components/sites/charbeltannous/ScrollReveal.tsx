"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Robust Scroll Reveal Engine
 * Automatically detects and animates all headings, text blocks, cards,
 * list items, media containers, and interactive elements as the user scrolls down.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal-item").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const registered = new WeakSet<HTMLElement>();
    const trackedContainers = new Set<HTMLElement>();

    const revealElement = (el: HTMLElement) => {
      if (el.classList.contains("is-revealed")) return;

      const delayMs = Number(el.getAttribute("data-reveal-delay") || "0") || 0;
      if (delayMs > 0) {
        el.style.setProperty("--reveal-delay", `${delayMs}ms`);
      }

      el.classList.add("is-revealed");
      el.setAttribute("data-reveal-state", "visible");
    };

    // 2. IntersectionObserver configured to trigger visibly as the element scrolls into view
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            observer.unobserve(el);
            revealElement(el);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -70px 0px", // Triggers ~70px inside the viewport so the motion is clearly seen
      }
    );

    // Helper: check if element is inside an already registered container (avoid duplicate nested transforms)
    const hasRegisteredAncestor = (el: HTMLElement) => {
      let p = el.parentElement;
      while (p && p !== document.body) {
        if (trackedContainers.has(p)) return true;
        p = p.parentElement;
      }
      return false;
    };

    const registerItem = (el: HTMLElement, autoStaggerIndex = 0) => {
      if (registered.has(el)) return;
      registered.add(el);

      // Do not nest transforms if parent is already tracked as a container card/row
      if (hasRegisteredAncestor(el) && !el.hasAttribute("data-reveal")) {
        return;
      }

      trackedContainers.add(el);

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Calculate auto stagger delay if not explicitly set
      if (!el.hasAttribute("data-reveal-delay") && autoStaggerIndex > 0) {
        const stagger = (autoStaggerIndex % 5) * 85;
        el.style.setProperty("--reveal-delay", `${stagger}ms`);
      }

      // If already in the initial viewport on page load
      const isInInitialViewport = rect.top < vh * 0.82 && rect.bottom > 0;
      if (isInInitialViewport) {
        // Eager elements or above-the-fold elements reveal with a gentle load stagger
        if (el.hasAttribute("data-reveal-eager") || el.hasAttribute("data-reveal")) {
          el.classList.add("reveal-item");
          requestAnimationFrame(() => {
            requestAnimationFrame(() => revealElement(el));
          });
        } else {
          // Keep above-the-fold content immediately visible without flash
          el.classList.add("reveal-item", "is-revealed");
          el.setAttribute("data-reveal-state", "visible");
        }
        return;
      }

      // Below the fold: hide and observe for scroll down
      el.classList.add("reveal-item");
      el.setAttribute("data-reveal-state", "hidden");
      observer.observe(el);
    };

    const scanAndObserve = () => {
      // Priority 1: Explicitly marked elements
      const explicitElements = document.querySelectorAll<HTMLElement>(
        "[data-reveal], [data-motion]"
      );
      explicitElements.forEach((el, idx) => registerItem(el, idx));

      // Priority 2: Automatic semantic targeting for all content sections
      const targetContainers = document.querySelectorAll<HTMLElement>(
        "section, footer, [data-band-section], [data-project-layout]"
      );

      targetContainers.forEach((container) => {
        // Skip hero section (hero has its own dedicated entrance animation)
        if (container.getAttribute("data-anchor") === "hero") return;

        // Headings (H1, H2, H3, H4)
        const headings = container.querySelectorAll<HTMLElement>(
          "h1:not(.sr-only), h2:not(.sr-only), h3:not(.sr-only), h4:not(.sr-only)"
        );
        headings.forEach((h, idx) => registerItem(h, idx));

        // Subtitles, captions, and text paragraphs
        const paragraphs = container.querySelectorAll<HTMLElement>(
          "p:not(.sr-only)"
        );
        paragraphs.forEach((p, idx) => registerItem(p, idx));

        // Project list rows and list items
        const listItems = container.querySelectorAll<HTMLElement>(
          "ol > li, ul:not([role='listbox']) > li"
        );
        listItems.forEach((li, idx) => registerItem(li, idx));

        // Cards, articles, and interactive groups
        const cards = container.querySelectorAll<HTMLElement>(
          "article, [role='group']:not([data-nav])"
        );
        cards.forEach((card, idx) => registerItem(card, idx));

        // Media items and diagrams
        const mediaBlocks = container.querySelectorAll<HTMLElement>(
          "figure, [data-preview], .aspect-\\[16\\/10\\], .aspect-\\[4\\/3\\], .aspect-video"
        );
        mediaBlocks.forEach((m, idx) => registerItem(m, idx));

        // Action button rows
        const buttons = container.querySelectorAll<HTMLElement>(
          "a.rounded-full, a.rounded-xl, button.rounded-full, button.rounded-xl"
        );
        buttons.forEach((btn, idx) => registerItem(btn, idx));
      });
    };

    scanAndObserve();

    // Watch for dynamically mounted content (filter tabs, navigation, modals)
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNewNodes = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          hasNewNodes = true;
          break;
        }
      }
      if (hasNewNodes) {
        scanAndObserve();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Safety scroll fallback: ensures elements revealed even during rapid scrolling
    const handleScrollSafety = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const pending = document.querySelectorAll<HTMLElement>(
        ".reveal-item:not(.is-revealed)"
      );
      pending.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh - 20) {
          observer.unobserve(el);
          revealElement(el);
        }
      });
    };

    window.addEventListener("scroll", handleScrollSafety, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScrollSafety);
    };
  }, [pathname]);

  return null;
}
