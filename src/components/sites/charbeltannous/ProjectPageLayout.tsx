"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  Terminal,
  Film,
  Image as ImageIcon,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CustomCursor } from "./CustomCursor";
import { FallingCircles } from "./FallingCircles";
import { ThemeSwitcher } from "./ThemeSwitcher";

export interface ProjectMediaItem {
  src: string;
  type?: "image" | "video";
  title?: string;
  caption?: string;
  alt?: string;
  poster?: string;
  aspectRatio?: "video" | "square" | "wide" | "tall" | "auto";
  span?: "full" | "half";
  fit?: "cover" | "contain";
  bg?: string;
}

export interface ProjectDetailProps {
  title: string;
  index: string;
  total?: string;
  year: string;
  role: string;
  tagline: string;
  tags: string[];
  overview: string;
  highlights: Array<{
    title: string;
    description: string;
  }>;
  techDetails: Array<{
    label: string;
    value: string;
  }>;
  media?: ProjectMediaItem[];
  mediaSectionTitle?: string;
  mediaSectionSubtitle?: string;
  externalUrl?: string;
  externalLabel?: string;
  prevUrl?: string;
  prevTitle?: string;
  nextUrl?: string;
  nextTitle?: string;
}

function isVideoMedia(item: ProjectMediaItem): boolean {
  if (item.type === "video") return true;
  if (item.type === "image") return false;
  const clean = item.src.toLowerCase().split("?")[0];
  return (
    clean.endsWith(".mp4") ||
    clean.endsWith(".webm") ||
    clean.endsWith(".ogg") ||
    clean.endsWith(".mov") ||
    item.src.includes("youtube.com") ||
    item.src.includes("youtu.be") ||
    item.src.includes("vimeo.com")
  );
}

function getEmbedVideoUrl(url: string): string | null {
  if (url.includes("youtube.com/watch")) {
    const match = url.match(/[?&]v=([^&]+)/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=0&rel=0`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=0&rel=0`;
  }
  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    if (id) return `https://player.vimeo.com/video/${id}`;
  }
  return null;
}

export function ProjectPageLayout(props: ProjectDetailProps) {
  const {
    title,
    index,
    total = "03",
    year,
    role,
    tagline,
    tags,
    overview,
    highlights,
    techDetails,
    media,
    mediaSectionTitle,
    mediaSectionSubtitle,
    externalUrl,
    externalLabel = "Visit Live Site ↗",
    prevUrl,
    prevTitle,
    nextUrl,
    nextTitle,
  } = props;

  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeMediaIndex === null) return;
    const mediaCount = media?.length || 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMediaIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveMediaIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : mediaCount - 1
        );
      } else if (e.key === "ArrowRight") {
        setActiveMediaIndex((prev) =>
          prev !== null && prev < mediaCount - 1 ? prev + 1 : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeMediaIndex, media]);

  return (
    <main className="relative min-h-screen bg-page text-heading selection:bg-heading selection:text-page font-body">
      <CustomCursor />
      <FallingCircles />
      <ThemeSwitcher />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16 pt-8 pb-24">
        {/* Top Navigation */}
        <header className="flex items-center justify-between border-b-2 border-heading pb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-heading bg-raised px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-heading shadow-[2px_2px_0_var(--text-heading)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--text-heading)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-4 font-mono text-xs font-bold uppercase tracking-widest text-subtle">
            <span className="rounded-full border border-heading/30 px-3 py-1 bg-raised/50">
              {index} / {total}
            </span>
            <span className="hidden sm:inline-block">{year}</span>
          </div>
        </header>

        {/* Project Hero Header */}
        <section className="pt-12 pb-10">
          <div className="flex items-center gap-3 animate-hero-in">
            <span className="inline-block h-3 w-3 rounded-full bg-primary" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-label">
              Project Case Study {"//"} {role}
            </span>
          </div>

          <h1
            className="mt-4 font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] text-heading animate-hero-in"
            style={{ animationDelay: "70ms" }}
          >
            {title}
          </h1>

          <p
            className="mt-6 max-w-3xl font-mono text-base sm:text-lg uppercase tracking-wide text-subtle font-medium animate-hero-in"
            style={{ animationDelay: "140ms" }}
          >
            {tagline}
          </p>

          {/* Action CTAs */}
          <div
            className="mt-8 flex flex-wrap gap-4 items-center animate-hero-in"
            style={{ animationDelay: "210ms" }}
          >
            {externalUrl && (
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-heading bg-heading text-page px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_var(--text-heading)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--text-heading)] hover:opacity-90 cursor-pointer"
              >
                <span>{externalLabel}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-heading bg-raised px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-heading shadow-[3px_3px_0_var(--text-heading)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--text-heading)] cursor-pointer"
            >
              <span>View All Projects</span>
            </Link>
          </div>
        </section>

        {/* Overview & Key Highlights Grid */}
        <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Overview & Highlights */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Overview Card */}
            <div
              data-reveal="up"
              className="rounded-3xl border-3 border-heading bg-raised p-8 shadow-[6px_6px_0_var(--text-heading)]"
            >
              <div className="flex items-center gap-2.5 border-b-2 border-heading/30 pb-4 font-mono text-xs font-bold uppercase tracking-widest text-heading">
                <Terminal className="h-4 w-4 text-primary" />
                <span>Executive Overview</span>
              </div>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-heading font-medium">
                {overview}
              </p>
            </div>

            {/* Highlights Grid */}
            <div
              data-reveal="up"
              data-reveal-delay="80"
              className="rounded-3xl border-3 border-heading bg-raised p-8 shadow-[6px_6px_0_var(--text-heading)]"
            >
              <div className="flex items-center gap-2.5 border-b-2 border-heading/30 pb-4 font-mono text-xs font-bold uppercase tracking-widest text-heading">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>Key Engineering Highlights</span>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    data-reveal="scale"
                    data-reveal-delay={String((idx % 2) * 90)}
                    className="flex flex-col justify-between rounded-2xl border-2 border-heading bg-page p-5 shadow-[3px_3px_0_var(--text-heading)]"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-label">
                        0{idx + 1} {"//"}
                      </span>
                      <h4 className="mt-1 font-display text-lg font-bold text-heading">
                        {item.title}
                      </h4>
                      <p className="mt-2 font-mono text-xs leading-normal text-subtle">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column: Specifications & Tags */}
          <div className="flex flex-col gap-8">
            {/* Project Specifications */}
            <div
              data-reveal="up"
              data-reveal-delay="100"
              className="rounded-3xl border-3 border-heading bg-raised p-6 shadow-[6px_6px_0_var(--text-heading)]"
            >
              <div className="flex items-center gap-2.5 border-b-2 border-heading/30 pb-4 font-mono text-xs font-bold uppercase tracking-widest text-heading">
                <Layers className="h-4 w-4 text-primary" />
                <span>Specifications</span>
              </div>

              <dl className="mt-5 flex flex-col divide-y divide-heading/20 font-mono text-xs">
                <div className="py-2.5 flex justify-between items-baseline">
                  <dt className="text-subtle uppercase">Index</dt>
                  <dd className="font-bold text-heading tabular-nums">{index}</dd>
                </div>
                <div className="py-2.5 flex justify-between items-baseline">
                  <dt className="text-subtle uppercase">Role</dt>
                  <dd className="font-bold text-heading text-right">{role}</dd>
                </div>
                <div className="py-2.5 flex justify-between items-baseline">
                  <dt className="text-subtle uppercase">Year</dt>
                  <dd className="font-bold text-heading tabular-nums">{year}</dd>
                </div>
                {techDetails.map((detail, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-baseline gap-4">
                    <dt className="text-subtle uppercase whitespace-nowrap">{detail.label}</dt>
                    <dd className="font-bold text-heading text-right break-words">{detail.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Tech Stack Pills */}
            <div
              data-reveal="up"
              data-reveal-delay="180"
              className="rounded-3xl border-3 border-heading bg-raised p-6 shadow-[6px_6px_0_var(--text-heading)]"
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-label border-b-2 border-heading/30 pb-3">
                Technologies & Tools
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border-2 border-heading bg-page px-3 py-1 font-mono text-xs font-bold text-heading shadow-[2px_2px_0_var(--text-heading)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Visual Showcase Section (Images & Videos) */}
        {media && media.length > 0 && (
          <section className="mt-12">
            {/* Showcase Header */}
            <div
              data-reveal="up"
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-heading pb-6"
            >
              <div>
                <div className="flex items-center gap-2.5 font-mono text-xs font-bold uppercase tracking-widest text-primary">
                  <Film className="h-4 w-4" />
                  <span>Visual Showcase {"//"} Media & Artifacts</span>
                </div>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-heading">
                  {mediaSectionTitle || "Project Gallery & Demos"}
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs sm:text-sm text-subtle">
                {mediaSectionSubtitle ||
                  "High-resolution screenshots, architectural diagrams, telemetry maps, and product walkthroughs."}
              </p>
            </div>

            {/* Media Grid */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {media.map((item, idx) => {
                const isVideo = isVideoMedia(item);
                const embedUrl = isVideo ? getEmbedVideoUrl(item.src) : null;
                const isFull = item.span === "full";

                let aspectClass = "aspect-video";
                if (item.aspectRatio === "square") aspectClass = "aspect-square";
                if (item.aspectRatio === "wide") aspectClass = "aspect-[21/9]";
                if (item.aspectRatio === "tall") aspectClass = "aspect-[4/5]";
                if (item.aspectRatio === "auto") aspectClass = "aspect-auto min-h-[300px]";

                return (
                  <div
                    key={idx}
                    data-reveal="scale"
                    data-reveal-delay={String((idx % 2) * 100)}
                    className={`flex flex-col justify-between rounded-3xl border-3 border-heading bg-raised p-5 sm:p-6 shadow-[6px_6px_0_var(--text-heading)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0_var(--text-heading)] ${
                      isFull ? "lg:col-span-2" : "lg:col-span-1"
                    }`}
                  >
                    {/* Media Card Top Bar */}
                    <div className="flex items-center justify-between border-b-2 border-heading/20 pb-3 mb-4 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-heading/30 bg-page px-2 py-0.5 font-bold uppercase tracking-wider text-heading text-[10px]">
                          {isVideo ? (
                            <>
                              <Film className="h-3 w-3 text-accent" />
                              <span>Video</span>
                            </>
                          ) : (
                            <>
                              <ImageIcon className="h-3 w-3 text-primary" />
                              <span>Image</span>
                            </>
                          )}
                        </span>
                        <span className="font-bold text-subtle">0{idx + 1}</span>
                        {item.title && (
                          <span className="font-bold text-heading truncate max-w-[180px] sm:max-w-[320px]">
                            {"//"} {item.title}
                          </span>
                        )}
                      </div>

                      {/* Enlarge / Fullscreen Button */}
                      <button
                        type="button"
                        onClick={() => setActiveMediaIndex(idx)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-heading/40 bg-page px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-heading shadow-[2px_2px_0_var(--text-heading)] hover:bg-heading hover:text-page transition-colors cursor-pointer"
                        title="Open fullscreen preview"
                      >
                        <Maximize2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Preview</span>
                      </button>
                    </div>

                    {/* Media Canvas Box */}
                    <div
                      className={`relative w-full ${aspectClass} overflow-hidden rounded-2xl border-2 border-heading ${
                        item.bg || "bg-transparent"
                      } shadow-inner flex items-center justify-center`}
                    >
                      {isVideo ? (
                        embedUrl ? (
                          <iframe
                            src={embedUrl}
                            title={item.title || `Video showcase ${idx + 1}`}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={item.src}
                            poster={item.poster}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <div
                          className="group relative w-full h-full cursor-pointer overflow-hidden flex items-center justify-center"
                          onClick={() => setActiveMediaIndex(idx)}
                        >
                          <Image
                            src={item.src}
                            alt={item.alt || item.title || `Project media ${idx + 1}`}
                            fill
                            sizes={
                              isFull
                                ? "(max-width: 1200px) 100vw, 1300px"
                                : "(max-width: 768px) 100vw, 650px"
                            }
                            unoptimized={true}
                            className={`${
                              item.fit === "cover" ? "object-cover" : "object-contain"
                            } transition-transform duration-500 group-hover:scale-105`}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full border-2 border-white bg-black/85 px-4 py-2 font-mono text-xs font-bold text-white shadow-lg flex items-center gap-2">
                              <Maximize2 className="h-3.5 w-3.5" />
                              Click to Enlarge
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Media Footer / Caption */}
                    {(item.caption || item.title) && (
                      <div className="mt-4 pt-3 border-t border-heading/15">
                        {item.title && (
                          <h4 className="font-display text-base sm:text-lg font-bold text-heading">
                            {item.title}
                          </h4>
                        )}
                        {item.caption && (
                          <p className="mt-1 font-mono text-xs sm:text-sm text-subtle leading-relaxed">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Footer Navigation (Prev / Next Projects) */}
        <nav
          aria-label="Project Navigation"
          data-reveal="up"
          className="mt-16 border-t-2 border-heading pt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevUrl ? (
              <Link
                href={prevUrl}
                className="group flex items-center gap-3 rounded-2xl border-2 border-heading bg-raised px-5 py-3 font-mono text-xs font-bold uppercase text-heading shadow-[3px_3px_0_var(--text-heading)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--text-heading)] w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <span className="block text-[10px] text-subtle font-normal">Previous Project</span>
                  <span className="block font-bold">{prevTitle}</span>
                </div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}

            <Link
              href="/"
              className="font-mono text-xs font-bold uppercase tracking-widest text-heading hover:underline underline-offset-4"
            >
              Back to All Projects ↑
            </Link>

            {nextUrl ? (
              <Link
                href={nextUrl}
                className="group flex items-center gap-3 rounded-2xl border-2 border-heading bg-raised px-5 py-3 font-mono text-xs font-bold uppercase text-heading shadow-[3px_3px_0_var(--text-heading)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--text-heading)] w-full sm:w-auto justify-end"
              >
                <div className="text-right">
                  <span className="block text-[10px] text-subtle font-normal">Next Project</span>
                  <span className="block font-bold">{nextTitle}</span>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </nav>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeMediaIndex !== null && media && media[activeMediaIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Media Preview Modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-8 backdrop-blur-md"
          onClick={() => setActiveMediaIndex(null)}
        >
          {/* Modal Card */}
          <div
            className="relative flex flex-col max-w-6xl w-full max-h-[92vh] rounded-3xl border-3 border-heading bg-raised text-heading p-4 sm:p-6 shadow-[10px_10px_0_var(--text-heading)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-heading/20 pb-4 mb-4 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="rounded-full border-2 border-heading/40 bg-page px-3 py-1 font-bold text-heading">
                  {activeMediaIndex + 1} / {media.length}
                </span>
                <span className="font-bold uppercase tracking-wider text-heading hidden sm:inline">
                  {media[activeMediaIndex].title || "Media Preview"}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveMediaIndex(null)}
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-heading bg-heading text-page px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0_var(--text-heading)] hover:opacity-90 transition-opacity cursor-pointer"
              >
                <X className="h-4 w-4" />
                <span>Close (ESC)</span>
              </button>
            </div>

            {/* Modal Media Display */}
            <div className="relative flex-1 min-h-[300px] max-h-[66vh] w-full flex items-center justify-center overflow-hidden rounded-2xl bg-page border-2 border-heading shadow-inner">
              {isVideoMedia(media[activeMediaIndex]) ? (
                getEmbedVideoUrl(media[activeMediaIndex].src) ? (
                  <iframe
                    src={getEmbedVideoUrl(media[activeMediaIndex].src)!}
                    title={media[activeMediaIndex].title || "Video preview"}
                    className="w-full h-full aspect-video border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={media[activeMediaIndex].src}
                    poster={media[activeMediaIndex].poster}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full max-h-[64vh] object-contain"
                  />
                )
              ) : (
                <div className="relative w-full h-full min-h-[320px] sm:min-h-[480px]">
                  <Image
                    src={media[activeMediaIndex].src}
                    alt={
                      media[activeMediaIndex].alt ||
                      media[activeMediaIndex].title ||
                      "Full preview"
                    }
                    fill
                    sizes="100vw"
                    unoptimized={true}
                    className="object-contain p-2 sm:p-4"
                  />
                </div>
              )}

              {/* Prev / Next Modal Buttons */}
              {media.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMediaIndex((prev) =>
                        prev !== null && prev > 0 ? prev - 1 : media.length - 1
                      )
                    }
                    aria-label="Previous media"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border-2 border-heading bg-raised p-2.5 text-heading hover:bg-heading hover:text-page transition-colors cursor-pointer shadow-[3px_3px_0_var(--text-heading)]"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveMediaIndex((prev) =>
                        prev !== null && prev < media.length - 1 ? prev + 1 : 0
                      )
                    }
                    aria-label="Next media"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border-2 border-heading bg-raised p-2.5 text-heading hover:bg-heading hover:text-page transition-colors cursor-pointer shadow-[3px_3px_0_var(--text-heading)]"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Caption */}
            {(media[activeMediaIndex].caption || media[activeMediaIndex].title) && (
              <div className="mt-4 pt-3 border-t-2 border-heading/20 font-mono text-xs text-heading">
                {media[activeMediaIndex].title && (
                  <p className="font-display font-bold text-base sm:text-lg text-heading">
                    {media[activeMediaIndex].title}
                  </p>
                )}
                {media[activeMediaIndex].caption && (
                  <p className="mt-1 font-mono text-xs sm:text-sm text-subtle leading-relaxed">
                    {media[activeMediaIndex].caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
