"use client";

import React, { useState } from "react";
import Image from "next/image";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("raka4100@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-labelledby="footer-heading"
      className="px-inline relative flex flex-col justify-between overflow-hidden pt-16 pb-12 bg-page text-heading min-h-[90vh]"
    >
      {/* Top CTA Area */}
      <div className="mx-auto w-full max-w-[1800px] flex flex-col gap-8">
        <h2
          id="footer-heading"
          data-reveal="clip"
          className="font-display text-heading w-fit text-[length:clamp(2.5rem,1rem+6vw,7rem)] leading-[0.92] font-bold"
        >
          <span className="block">Everything ends</span>
          <span className="block">
            <span>up here</span>
            <span aria-hidden="true" className="inline-block text-label">
              .
            </span>
          </span>
        </h2>

        <div
          data-reveal="up"
          data-reveal-delay="120"
          className="relative flex w-fit flex-col gap-2"
        >
          <p className="font-mono text-[length:var(--type-caption)] font-medium tracking-(--tracking-mono) uppercase">
            <span className="text-label">SAY HI</span>
          </p>

          <div className="relative flex flex-wrap items-baseline gap-4">
            <a
              href="mailto:hello@charbeltannous.com"
              className="font-display block text-[length:clamp(1.5rem,0.75rem+3.5vw,4.25rem)] leading-[1.05] font-bold hover:underline"
            >
              Raka4100@gmail.com
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
              className="border-heading rounded-full border-2 shadow-[2px_2px_0_var(--text-heading)] bg-page text-heading px-3.5 py-1.5 font-mono text-[length:var(--type-caption)] font-semibold tracking-(--tracking-mono) uppercase hover:bg-heading hover:text-page transition-colors cursor-pointer"
            >
              {copied ? "COPIED!" : "COPY"}
            </button>

            {/* <a
              href="https://cal.com/charbeltannous"
              target="_blank"
              rel="noreferrer"
              className="border-heading rounded-full border-2 shadow-[2px_2px_0_var(--text-heading)] font-mono text-[length:var(--type-caption)] font-medium tracking-(--tracking-mono) uppercase bg-heading text-page px-3.5 py-1.5 align-middle leading-none whitespace-nowrap inline-block md:hidden"
            >
              BOOK A CALL ↗
            </a> */}
          </div>

          <p className="text-heading mt-3 flex max-w-[42ch] flex-wrap items-baseline gap-x-3 gap-y-1 text-sm md:max-w-none md:text-base font-body">
            <span>
              Also freelancing — interactive sites for studios, full-stack products
              for founders. Remote.
            </span>
            {/* <a
              href="https://cal.com/charbeltannous"
              target="_blank"

              rel="noreferrer"
              className="hidden whitespace-nowrap underline decoration-2 underline-offset-4 hover:decoration-[3px] md:inline font-mono text-xs font-semibold tracking-(--tracking-mono) uppercase"
            >
              BOOK A CALL ↗
            </a> */}
          </p>
        </div>
      </div>

      {/* Floating Buoys Drain Area */}
      <div className="relative mt-24 pt-16 pb-8 border-t-2 border-heading/30">
        <p className="sr-only">© 2026 Raka Andhika</p>

        {/* Buoy Links Bar */}
        <nav
          aria-label="Footer links"
          data-reveal="up"
          data-reveal-delay="100"
          className="relative flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-8 items-center"
        >
          {/* GitHub Buoy */}
          <a
            href="https://github.com/fru33er"
            target="_blank"
            rel="noreferrer"
            className="group/buoy relative block rounded-full"
          >
            <span
              aria-hidden="true"
              className="border-heading/40 absolute top-[78%] left-1/2 -z-10 h-3 w-[128%] -translate-x-1/2 rounded-[50%] border-2"
            />
            <span className="border-heading rounded-full border-2 shadow-[2px_2px_0_var(--text-heading)] bg-page text-heading block px-3 py-1.5 font-mono text-[11px] leading-none font-semibold tracking-(--tracking-mono) whitespace-nowrap uppercase">
              GITHUB ↗
            </span>
          </a>

          {/* LinkedIn Buoy */}
          <a
            href="https://www.linkedin.com/in/rakaandhika"
            target="_blank"
            rel="noreferrer"
            className="group/buoy relative block rounded-full"
          >
            <span
              aria-hidden="true"
              className="border-heading/40 absolute top-[78%] left-1/2 -z-10 h-3 w-[128%] -translate-x-1/2 rounded-[50%] border-2"
            />
            <span className="border-heading rounded-full border-2 shadow-[2px_2px_0_var(--text-heading)] bg-page text-heading block px-3 py-1.5 font-mono text-[11px] leading-none font-semibold tracking-(--tracking-mono) whitespace-nowrap uppercase">
              LINKEDIN ↗
            </span>
          </a>

          {/* Resume Buoy */}
          <a
            href="/CV_Raka%20Andhika.pdf"
            target="_blank"
            rel="noreferrer"
            className="group/buoy relative block rounded-full"
          >
            <span
              aria-hidden="true"
              className="border-heading/40 absolute top-[78%] left-1/2 -z-10 h-3 w-[128%] -translate-x-1/2 rounded-[50%] border-2"
            />
            <span className="border-heading rounded-full border-2 shadow-[2px_2px_0_var(--text-heading)] bg-page text-heading block px-3 py-1.5 font-mono text-[11px] leading-none font-semibold tracking-(--tracking-mono) whitespace-nowrap uppercase">
              RÉSUMÉ ↗
            </span>
          </a>

          {/* Top Buoy */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to the top"
            className="group/buoy relative block rounded-full cursor-pointer"
          >
            <span
              aria-hidden="true"
              className="border-heading/40 absolute top-[78%] left-1/2 -z-10 h-3 w-[128%] -translate-x-1/2 rounded-[50%] border-2"
            />
            <span className="border-heading rounded-full border-2 shadow-[2px_2px_0_var(--text-heading)] bg-page text-heading block px-3 py-1.5 font-mono text-[11px] leading-none font-semibold tracking-(--tracking-mono) whitespace-nowrap uppercase">
              ↑ TOP
            </span>
          </button>

          <span className="text-subtle font-mono text-xs uppercase tracking-wider ml-auto hidden sm:block">
            © 2026 Raka Andhika
          </span>
        </nav>
      </div>

      {/* Vector Graphic at the very bottom of the website */}
      <div
        data-no-obstacle="true"
        data-reveal="up"
        data-reveal-delay="120"
        aria-hidden="true"
        className="pointer-events-none relative -mx-[var(--space-inline)] -mb-12 mt-16 w-[calc(100%+var(--space-inline)*2)] select-none overflow-hidden"
      >
        <Image
          src="/sites/charbeltannous/Vector.svg"
          alt=""
          width={4096}
          height={1353}
          unoptimized
          loading="lazy"
          className="footer-vector block h-auto w-full pointer-events-none select-none"
        />
      </div>
    </footer>
  );
}

