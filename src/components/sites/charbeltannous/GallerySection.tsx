"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, ChevronLeft, ChevronRight, Images } from "lucide-react";

export interface DesignItem {
  id: string;
  title: string;
  category: "Poster & Print" | "Branding" | "Typography" | "UI/UX" | "Illustration";
  year: string;
  image?: string;
  images?: string[];
  description: string;
  tags: string[];
  accentColor: string;
}

export function getDesignImages(item: DesignItem): string[] {
  if (item.images && item.images.length > 0) {
    return item.images;
  }
  if (item.image) {
    return [item.image];
  }
  return [];
}

const DESIGNS: DesignItem[] = [
  {
    id: "grrrl-gang",
    title: "GRRRL GANG",
    category: "Poster & Print",
    year: "2025",
    images: [
      "/sites/charbeltannous/grrrlgang/grrrlgang-submit.jpg",
      "/sites/charbeltannous/grrrlgang/grrrlgang-f.jpg",
      "/sites/charbeltannous/grrrlgang/grrrlgang2-f.jpg",
      "/sites/charbeltannous/grrrlgang/grrrlgang3-f.jpg",
      "/sites/charbeltannous/grrrlgang/grrrlgang4-f.jpg",
    ],
    description:
      "A personal poster design project experimenting with raw grunge style, distressed textures, and bold typography.",
    tags: ["Grunge Style", "Poster Design", "Personal Project"],
    accentColor: "#cc1236",
  },
  {
    id: "sandoithci",
    title: "SANDOITCHI",
    category: "Branding",
    year: "2025",
    images: [
      "/sites/charbeltannous/sandoitchi/sando.jpg",
      "/sites/charbeltannous/sandoitchi/sando-pastel.jpg",
      "/sites/charbeltannous/sandoitchi/sando-pastel2.jpg",
      "/sites/charbeltannous/sandoitchi/sando2.jpg",
    ],
    description:
      "Visual identity and promotional design created for my Japanese fruit sando (fruit sandwich) small business.",
    tags: ["Branding", "Fruit Sando", "Packaging"],
    accentColor: "#1a7444",
  },
  {
    id: "thumbnail",
    title: "YOUTUBE THUMBNAIL",
    category: "Poster & Print",
    year: "2025",
    images: [
      "/sites/charbeltannous/thumbnail/maxresdefault (1).jpg",
      "/sites/charbeltannous/thumbnail/maxresdefault (2).jpg",
      "/sites/charbeltannous/thumbnail/maxresdefault (3).jpg",
      "/sites/charbeltannous/thumbnail/maxresdefault (4).jpg",
      "/sites/charbeltannous/thumbnail/maxresdefault (5).jpg",
    ],
    description:
      "High-impact YouTube thumbnail artworks created while learning advanced photo manipulation and compositing techniques.",
    tags: ["Photo Manipulation", "Compositing", "Photoshop"],
    accentColor: "#a50e2c",
  },
  {
    id: "app-design-concept",
    title: "Soundscape Audio Interface",
    category: "UI/UX",
    year: "2025",
    description:
      "Minimalist mobile UI exploration with gestural interactions, tactile tactile dials, and brutalist dark mode aesthetics.",
    tags: ["Figma", "Design System", "Mobile App"],
    accentColor: "#134a2a",
  },
  {
    id: "exhibition-flyers",
    title: "Echo Underground Gig Posters",
    category: "Poster & Print",
    year: "2024",
    description:
      "Limited edition risograph printed posters featuring duotone textures, halftone photography, and raw photocopy effects.",
    tags: ["Risograph", "Printmaking", "Halftone"],
    accentColor: "#cc1236",
  },
  {
    id: "vector-illustrations",
    title: "Cyber Flora Graphic Artwork",
    category: "Illustration",
    year: "2024",
    description:
      "A digital vector art series blending botanical organic shapes with hard-edged circuit geometry and neon gradients.",
    tags: ["Vector Art", "Digital Art", "Merchandise"],
    accentColor: "#1a7444",
  },
];

const CATEGORIES = [
  "All",
  "Poster & Print",
  "Branding",
  "Typography",
  "UI/UX",
  "Illustration",
] as const;

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedDesign, setSelectedDesign] = useState<DesignItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleOpenDesign = (item: DesignItem) => {
    setSelectedDesign(item);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    if (!selectedDesign) return;

    const images = getDesignImages(selectedDesign);
    const hasMultiple = images.length > 1;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDesign(null);
      } else if (hasMultiple && e.key === "ArrowLeft") {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (hasMultiple && e.key === "ArrowRight") {
        setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedDesign]);

  const filteredDesigns =
    activeCategory === "All"
      ? DESIGNS
      : DESIGNS.filter((d) => d.category === activeCategory);

  return (
    <section
      id="gallery"
      data-anchor="gallery"
      className="relative px-inline pt-16 pb-24 border-t-2 border-line bg-page text-heading"
    >
      <div className="mx-auto w-full max-w-[1800px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p
              data-reveal="up"
              className="text-label font-mono text-[length:var(--type-caption)] font-medium tracking-(--tracking-mono) uppercase flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>DESIGN VAULT ({DESIGNS.length.toString().padStart(2, "0")})</span>
            </p>
            <h2
              data-reveal="clip"
              data-reveal-delay="80"
              className="mt-3 text-[length:var(--type-h2)] leading-[1.1] font-bold text-heading"
            >
              Graphic Design &amp; Visual Works.
            </h2>
          </div>

          <p
            data-reveal="up"
            data-reveal-delay="140"
            className="max-w-[45ch] text-sm md:text-base font-body text-heading/90 leading-relaxed"
          >
            Poster art, typography experiments, visual identity, and creative
            explorations created alongside code.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div
          data-reveal="up"
          data-reveal-delay="180"
          className="mt-8 flex flex-wrap gap-2 pt-2"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-(--tracking-mono) transition-all duration-200 cursor-pointer ${isActive
                  ? "bg-heading text-page shadow-[2px_2px_0_var(--text-heading)] font-semibold"
                  : "border border-heading/40 text-heading hover:border-heading hover:bg-heading/10"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Design Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredDesigns.map((item, idx) => {
            const itemImages = getDesignImages(item);
            const coverImage = itemImages[0];
            const hasMultiple = itemImages.length > 1;

            return (
              <article
                key={item.id}
                data-reveal="scale"
                data-reveal-delay={String((idx % 3) * 90)}
                data-reveal-eager="true"
                onClick={() => handleOpenDesign(item)}
                className="group relative rounded-2xl border-2 border-heading bg-raised p-4 flex flex-col justify-between overflow-hidden shadow-[4px_4px_0_var(--text-heading)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--text-heading)] cursor-pointer"
              >
                {/* Visual Thumbnail Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-heading/30 bg-page/60 flex items-center justify-center">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* Stylized Graphic Placeholder with Poster Aesthetics */
                    <div className="relative h-full w-full p-4 flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-heading/10 via-page to-raised">
                      <div className="flex justify-between items-start font-mono text-[10px] tracking-wider uppercase text-label font-bold">
                        <span>{(idx + 1).toString().padStart(2, "0")} / {item.year}</span>
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: item.accentColor }}
                        />
                      </div>
                      <div className="my-auto text-center py-4">
                        <span className="font-display font-extrabold text-2xl md:text-3xl uppercase tracking-tighter text-heading/90 block leading-tight">
                          {item.title}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-(--tracking-mono) text-label mt-1 block">
                          {item.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-end font-mono text-[10px] text-subtle uppercase">
                        <span>Preview Art</span>
                        <span className="underline group-hover:text-heading">Click to expand ↗</span>
                      </div>
                    </div>
                  )}

                  {/* Multi-image indicator badge */}
                  {hasMultiple && (
                    <span className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full border border-heading bg-raised/95 backdrop-blur-xs px-2.5 py-1 font-mono text-[10px] font-bold text-heading shadow-[1px_1px_0_var(--text-heading)] select-none">
                      <Images className="h-3 w-3 text-primary" />
                      <span>{itemImages.length} Slides</span>
                    </span>
                  )}
                </div>

                {/* Card Meta Content */}
                <div className="mt-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-(--tracking-mono) text-label font-semibold">
                        {item.category}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-subtle">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-display text-xl font-bold text-heading group-hover:text-label transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-heading/80 font-body line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tech / Tool Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-heading/20">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-heading/30 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-subtle"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Detail Modal / Lightbox with Multi-Image Slider */}
      {selectedDesign && (() => {
        const modalImages = getDesignImages(selectedDesign);
        const hasMultiple = modalImages.length > 1;
        const currentSrc = modalImages[activeImageIndex] || modalImages[0];

        return (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setSelectedDesign(null)}
          >
            <div
              className="relative w-full max-w-3xl rounded-2xl border-2 border-heading bg-page p-6 sm:p-8 shadow-[8px_8px_0_var(--text-heading)] animate-in zoom-in-95 duration-200 overflow-hidden max-h-[92vh] flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-heading/20">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-label">
                  <span>{selectedDesign.category}</span>
                  <span>·</span>
                  <span>{selectedDesign.year}</span>
                  {hasMultiple && (
                    <span className="ml-2 rounded-full border border-heading/30 bg-raised px-2.5 py-0.5 text-heading text-[10px]">
                      Slide {activeImageIndex + 1} of {modalImages.length}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedDesign(null)}
                  aria-label="Close design details"
                  className="rounded-full border-2 border-heading bg-raised p-1.5 text-heading hover:bg-heading hover:text-page transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image Carousel Container */}
              <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border-2 border-heading bg-raised flex items-center justify-center select-none group">
                {currentSrc ? (
                  <Image
                    key={currentSrc}
                    src={currentSrc}
                    alt={`${selectedDesign.title} - Slide ${activeImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 800px"
                    className="object-contain animate-in fade-in duration-150"
                  />
                ) : (
                  <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-(--tracking-mono) text-label">
                      {selectedDesign.category} · {selectedDesign.year}
                    </span>
                    <h4 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-heading">
                      {selectedDesign.title}
                    </h4>
                    <p className="font-mono text-xs text-subtle max-w-md mt-2">
                      Siapkan file gambarmu di folder <code>public/sites/charbeltannous/</code> lalu cantumkan path-nya di array <code>DESIGNS</code>!
                    </p>
                  </div>
                )}

                {/* Left & Right Carousel Arrows (if multiple images) */}
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : modalImages.length - 1));
                      }}
                      aria-label="Previous slide"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border-2 border-heading bg-page/90 p-2 text-heading shadow-[2px_2px_0_var(--text-heading)] hover:bg-heading hover:text-page transition-all cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex((prev) => (prev < modalImages.length - 1 ? prev + 1 : 0));
                      }}
                      aria-label="Next slide"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border-2 border-heading bg-page/90 p-2 text-heading shadow-[2px_2px_0_var(--text-heading)] hover:bg-heading hover:text-page transition-all cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail / Dot Navigation */}
              {hasMultiple && (
                <div className="mt-3 flex items-center justify-center gap-2">
                  {modalImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${i === activeImageIndex
                        ? "w-8 bg-primary border border-heading"
                        : "w-2.5 bg-heading/30 hover:bg-heading/60"
                        }`}
                      aria-label={`Jump to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Modal Info */}
              <div className="mt-4 flex flex-col gap-2">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-heading">
                  {selectedDesign.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-heading/90 leading-relaxed">
                  {selectedDesign.description}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedDesign.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-heading px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-heading font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}

