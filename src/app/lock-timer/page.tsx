import type { Metadata } from "next";
import { ProjectPageLayout } from "@/components/sites/charbeltannous/ProjectPageLayout";

export const metadata: Metadata = {
  title: "Lock-timer — Project Case Study | Raka Andhika",
  description:
    "Mindful digital wellbeing and distraction-locking mobile experience built with high-contrast brutalist analytics and focus workflows.",
};

export default function LockTimerPage() {
  return (
    <ProjectPageLayout
      title="Lock-timer"
      index="02"
      total="03"
      year="2026"
      role="Founder & Engineer"
      tagline="Distraction-locking time management mobile app built for peak focus and deep work."
      overview="Lock-timer is a mindful mobile productivity tool designed to help developers, students, and creators enter and sustain deep flow state. It tackles digital addiction and procrastination through strict device lockout sessions, customizable Pomodoro intervals, and high-contrast brutalist analytics that celebrate disciplined focus streaks."
      tags={["UI UX", "Figma", "Mobile App", "Interaction Design", "Prototyping", "Design System"]}
      highlights={[
        {
          title: "Hard Lockout Protocols",
          description:
            "Implemented an emergency-safe lockdown mode that blocks distracting apps and notifications until timer completion, enforcing commitment to focused tasks.",
        },
        {
          title: "Adaptive Focus Intervals",
          description:
            "Designed flexible work-rest rhythms ranging from 25-minute sprints to 90-minute ultradian cycles, tailored to user energy levels and daily goals.",
        },
        {
          title: "Brutalist Habit Analytics",
          description:
            "Crafted high-contrast, editorial data visualizations mapping focus streaks, peak productive hours, and weekly session milestones with zero visual fluff.",
        },
        {
          title: "Figma Component Architecture",
          description:
            "Constructed a comprehensive design system in Figma featuring reusable tactile components, haptic states, and dark/light token bindings.",
        },
      ]}
      techDetails={[
        { label: "Platform", value: "iOS & Android" },
        { label: "Design Tool", value: "Figma (Tokens & Auto Layout)" },
        { label: "Core Methodology", value: "Pomodoro & Deep Work" },
        { label: "Role Scope", value: "Product Ideation, UX/UI & Build" },
      ]}
      // Showcase Media (Foto & Video):
      // media={[
      //   {
      //     type: "image",
      //     src: "/sites/charbeltannous/lock-timer/screen1.png",
      //     title: "Mobile Interface & Flow",
      //     caption: "Brutalist dark-mode interface designed for distraction-free focus.",
      //     span: "half",
      //   },
      //   {
      //     type: "video", // Mendukung file .mp4 lokal atau link YouTube
      //     src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      //     title: "Prototype Interaction Walkthrough",
      //     caption: "Video demonstrasi alur penguncian timer.",
      //     span: "half",
      //   },
      // ]}
      prevUrl="/satubumi"
      prevTitle="Satubumi"
      nextUrl="/UIKA-navigation-system"
      nextTitle="UIKA navigation system"
    />
  );
}
