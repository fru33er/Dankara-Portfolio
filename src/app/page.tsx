import React from "react";
import { CustomCursor } from "@/components/sites/charbeltannous/CustomCursor";
import { FallingCircles } from "@/components/sites/charbeltannous/FallingCircles";
import { HeroSection } from "@/components/sites/charbeltannous/HeroSection";
import { WorkSection } from "@/components/sites/charbeltannous/WorkSection";
import { GallerySection } from "@/components/sites/charbeltannous/GallerySection";
import { GuestbookSection } from "@/components/sites/charbeltannous/GuestbookSection";
import { BallCatcherSection } from "@/components/sites/charbeltannous/BallCatcherSection";
import { ThemeSwitcher } from "@/components/sites/charbeltannous/ThemeSwitcher";
import { Footer } from "@/components/sites/charbeltannous/Footer";

export default function Home() {
  return (
    <main className="contents">
      <CustomCursor />
      <FallingCircles />
      <ThemeSwitcher />
      <div data-panel-host="true" className="text-heading relative min-h-screen z-[1]">
        <HeroSection />
        <WorkSection />
        <GallerySection />
        <GuestbookSection />
        <BallCatcherSection />
        <Footer />
      </div>
    </main>
  );
}
