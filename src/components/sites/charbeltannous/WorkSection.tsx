"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  index: string;
  title: string;
  year: string;
  role: string;
  stackText: string;
  tags: string[];
  description: string;
  accent: string;
  image?: string;
  imageFit?: "cover" | "contain";
  exploreUrl?: string;
  externalUrl?: string;
  externalLabel?: string;
}

const PROJECTS: Project[] = [
  {
    id: "satubumi",
    index: "01",
    title: "Satubumi",
    year: "2026",
    role: "Backend & Geospatial Engineer",
    stackText: "Python · FastAPI · PostgreSQL · GIS & Satellite",
    tags: ["FastAPI", "PostgreSQL", "Google Earth Engine", "GIS / Shapefile", "Docker"],
    description:
      "Production-grade backend API and geospatial engine powering Nature-Based Solutions (NbS) and carbon feasibility. Ships automated Shapefile parsing, Google Earth Engine satellite telemetry, real-time ecological alerts, and automated MRV reports.",
    accent: "var(--surface-accent-1)",
    image: "/sites/charbeltannous/satubumi/satubumi.png",
    // imageFit: "cover", // pakai "contain" jika gambar PNG transparan / mockup
    exploreUrl: "/satubumi",
    externalUrl: "https://satubumi.org",
    externalLabel: "Visit Satubumi ↗",
  },
  {
    id: "uika-navigation",
    index: "02",
    title: "UIKA Navigator",
    year: "2026",
    role: "Lead Android & AR Engineer (Bachelor's Thesis)",
    stackText: "Kotlin · ARCore · ML Kit OCR · A* Pathfinding · Firestore",
    tags: ["Kotlin", "ARCore", "SceneView", "ML Kit OCR", "A* Pathfinding", "Firebase"],
    description:
      "Outdoor Augmented Reality campus navigation system designed to guide students and visitors across Universitas Ibn Khaldun Bogor to locate faculty buildings and campus facilities. Powered by Google ARCore, ML Kit OCR building plaque pose alignment, an A* spatial graph pathfinding engine with Bézier Spline trajectory smoothing, and real-time Firestore sync.",
    accent: "var(--surface-accent-1)",
    image: "/sites/charbeltannous/uika-navigation-system/Frame 1.png",
    imageFit: "contain",
    exploreUrl: "/UIKA-navigation-system",
  },
];

export function WorkSection() {
  const [selectedId, setSelectedId] = useState<string>("satubumi");
  const activeProject =
    PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];

  return (
    <section
      id="work"
      data-anchor="work"
      data-band-section="true"
      aria-labelledby="work-heading"
      className="section text-heading relative px-inline pt-16 pb-20"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          {/* Projects List */}
          <div className="min-w-0">
            <div className="relative">
              <p
                data-motion="heading"
                data-reveal="up"
                className="text-label font-mono text-[length:var(--type-caption)] font-medium tracking-(--tracking-mono) uppercase"
              >
                SELECTED WORK ({String(PROJECTS.length).padStart(2, "0")})
              </p>
              <h2
                id="work-heading"
                data-motion="heading"
                data-reveal="clip"
                data-reveal-delay="80"
                className="mt-3 text-[length:var(--type-h2)] leading-[1.1] font-bold text-balance md:max-w-[16ch]"
              >
                Products I&#x27;ve built and shipped.
              </h2>
            </div>

            <ol className="mt-8">
              {PROJECTS.map((project, idx) => {
                const isSelected = project.id === activeProject.id;
                return (
                  <li
                    key={project.id}
                    data-reveal="up"
                    data-reveal-delay={String(idx * 110)}
                    className="border-line border-t-rule last:border-b-rule transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedId(project.id)}
                      onMouseEnter={() => setSelectedId(project.id)}
                      className={`group min-h-11 py-row flex w-full flex-wrap md:flex-nowrap items-baseline justify-between gap-x-6 gap-y-2 text-left transition-all duration-200 cursor-pointer ${isSelected ? "opacity-100" : "opacity-80 hover:opacity-100"
                        }`}
                      style={
                        {
                          "--row-accent": project.accent,
                        } as React.CSSProperties
                      }
                    >
                      <span className="flex min-w-0 items-baseline gap-4 md:max-w-[62%]">
                        <span className="text-label font-mono text-[length:var(--type-caption)] tabular-nums shrink-0">
                          {project.index}
                        </span>
                        <span
                          className={`font-display min-w-0 origin-left leading-none font-bold break-words text-[length:var(--type-work)] transition-transform duration-200 group-hover:translate-x-1 ${isSelected ? "translate-x-1 text-heading" : ""
                            }`}
                        >
                          {project.title}
                        </span>
                      </span>
                      <span className="hidden min-w-0 flex-1 flex-col items-end gap-1 text-right md:flex">
                        <span className="text-subtle font-mono text-[length:var(--type-caption)] tabular-nums">
                          {project.year}
                        </span>
                        <span className="text-subtle font-mono text-[length:var(--type-caption)] tracking-(--tracking-mono) uppercase max-w-full">
                          {project.role} · {project.stackText}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="border-line pt-6 mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3 border-t-rule">
            </div>
          </div>

          {/* Sticky Sidebar Detail Panel */}
          <aside className="md:sticky md:top-24 md:self-start">
            {/* Interactive Preview Box */}
            <Link
              href={activeProject.exploreUrl || "#"}
              data-reveal="scale"
              data-reveal-delay="100"
              className="group relative block w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl border-2 border-heading p-6 overflow-hidden shadow-[4px_4px_0_var(--text-heading)] transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--text-heading)] cursor-pointer"
              style={{
                backgroundColor: "var(--surface-raised)",
              }}
            >
              {activeProject.image && (
                <>
                  <div
                    className={`pointer-events-none absolute ${activeProject.imageFit === "contain"
                      ? "inset-x-4 top-12 bottom-20"
                      : "inset-0"
                      }`}
                  >
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      unoptimized
                      className={`${activeProject.imageFit === "contain"
                        ? "object-contain"
                        : "object-cover"
                        } transition-transform duration-500 group-hover:scale-105`}
                    />
                  </div>
                  {activeProject.imageFit !== "contain" && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--surface-raised)] via-[var(--surface-raised)]/85 to-transparent"
                    />
                  )}
                </>
              )}

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span
                    className={`font-mono text-xs uppercase tracking-wider text-label font-bold ${activeProject.image && activeProject.imageFit !== "contain"
                      ? "rounded-md bg-raised/90 px-2 py-0.5 backdrop-blur-xs"
                      : ""
                      }`}
                  >
                    {activeProject.index} / {String(PROJECTS.length).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-mono text-xs uppercase tracking-wider text-subtle flex items-center gap-1 ${activeProject.image && activeProject.imageFit !== "contain"
                      ? "rounded-md bg-raised/90 px-2 py-0.5 backdrop-blur-xs"
                      : ""
                      }`}
                  >
                    {activeProject.year}
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-heading group-hover:underline">
                    {activeProject.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-label mt-1">
                    {activeProject.role}
                  </p>
                </div>
              </div>
            </Link>

            <div className="mt-6">
              <div data-motion="meta" data-reveal="up" data-reveal-delay="180">
                <p className="text-label font-mono text-[length:var(--type-caption)] tracking-(--tracking-mono) uppercase">
                  {activeProject.role} · {activeProject.title} · {activeProject.year}
                </p>
                <p className="text-body mt-3 text-[length:var(--type-body)] leading-[1.5]">
                  {activeProject.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border-line text-subtle rounded-pill border-rule px-3 py-1 font-mono text-[length:var(--type-caption)] border border-heading/30"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-4 items-center">
                  {activeProject.exploreUrl && (
                    <Link
                      href={activeProject.exploreUrl}
                      className="inline-flex items-center gap-1.5 rounded-full border-2 border-heading bg-raised px-4 py-1.5 text-heading font-mono text-[length:var(--type-caption)] font-bold tracking-(--tracking-mono) uppercase shadow-[2px_2px_0_var(--text-heading)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--text-heading)] transition-all"
                    >
                      Explore project →
                    </Link>
                  )}
                  {activeProject.externalUrl && (
                    <a
                      href={activeProject.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-heading font-mono text-[length:var(--type-caption)] font-medium tracking-(--tracking-mono) uppercase hover:opacity-60 transition-opacity"
                    >
                      {activeProject.externalLabel || "Visit site ↗"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

