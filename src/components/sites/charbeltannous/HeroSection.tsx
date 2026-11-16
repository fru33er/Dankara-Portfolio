import React from "react";
import { Header } from "./Header";
import { Wordmark } from "./Wordmark";

export function HeroSection() {
  return (
    <section
      data-anchor="hero"
      tabIndex={-1}
      className="relative overflow-x-clip outline-none"
    >
      <div
        className="px-inline mx-auto w-full max-w-[1800px]"
        style={{ "--headline-aspect": 1.55566 } as React.CSSProperties}
      >
        <div data-field-protect="true" className="flex flex-col items-start justify-between md:flex-row md:gap-4">
          <div className="w-full min-w-0">
            <Header />
          </div>
        </div>

        <div className="relative flex flex-col justify-between pt-6 pb-6 min-h-[calc(100svh-5rem)]">
          {/* Headline Image occupying available space */}
          <div className="flex-1 flex items-center justify-center py-4 w-full">
            <div
              data-motion="headline"
              className="relative w-full select-none"
            >
              <h1 className="sr-only">Raka Andhika</h1>
              <Wordmark className="text-heading max-h-[60vh] md:max-h-[68vh]" />
            </div>
          </div>

          <div className="border-line relative border-t pt-4">
            <div
              data-motion="intro"
              className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-[600px] font-mono text-[length:var(--type-tagline)] leading-[1.5] font-medium tracking-(--tracking-mono) uppercase md:leading-[1.2]">
                <span className="block">Software engineer, graphic designer — Bogor, Indonesia</span>
                <span className="block">Part creator. Part coder. All Me.</span>
              </p>

            </div>
          </div>

          {/* Decorative physics ball reference rings */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute hidden rounded-full border border-heading/20 md:block"
            style={{
              left: "calc(87% - 72px)",
              top: "calc(22% - 72px)",
              width: "144px",
              height: "144px",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute hidden rounded-full border border-heading/20 md:block"
            style={{
              left: "calc(95% - 56px)",
              top: "calc(50% - 56px)",
              width: "112px",
              height: "112px",
            }}
          />
        </div>
      </div>
    </section>
  );
}

