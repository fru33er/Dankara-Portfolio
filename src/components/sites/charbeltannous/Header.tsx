import React from "react";

export function Header() {
  return (
    <header
      data-field-protect="true"
      className="text-heading grid grid-cols-1 items-center pt-6 font-mono text-[length:var(--type-caption)] font-medium tracking-(--tracking-mono) uppercase md:grid-cols-3"
    >
      <span className="hidden justify-self-start md:block">
        Software Engineer, Graphic Designer
      </span>
      <span className="hidden justify-self-center md:block">2026</span>
      <nav
        aria-label="Profiles"
        className="flex justify-between gap-6 md:justify-self-end md:justify-end"
      >
        <a
          href="https://github.com/fru33er"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center transition-opacity duration-200 hover:opacity-50 md:min-h-0"
        >
          GitHub ↗
        </a>
        <a
          href="https://www.linkedin.com/in/rakaandhika"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center transition-opacity duration-200 hover:opacity-50 md:min-h-0"
        >
          LinkedIn ↗
        </a>
        <a
          href="/CV_Raka%20Andhika.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center transition-opacity duration-200 hover:opacity-50 md:min-h-0"
        >
          Résumé ↗
        </a>
      </nav>
    </header>
  );
}

