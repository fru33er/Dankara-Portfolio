import type { Metadata } from "next";
import { ProjectPageLayout } from "@/components/sites/charbeltannous/ProjectPageLayout";

export const metadata: Metadata = {
  title: "UIKA Navigator — Outdoor AR Campus Navigation & Wayfinding | Raka Andhika",
  description:
    "Undergraduate thesis project: Android Outdoor Augmented Reality campus navigation system combining Google ARCore, ML Kit OCR building plaque pose alignment, A* spatial walkway pathfinding, and Bézier Spline smoothing.",
};

export default function UIKANavigationSystemPage() {
  return (
    <ProjectPageLayout
      title="UIKA Navigator"
      index="02"
      total="02"
      year="2026"
      role="Lead Android & AR Engineer (Bachelor's Thesis)"
      tagline="Outdoor Augmented Reality & Computer Vision Campus Wayfinding System for Faculty Buildings & Landmark Discovery."
      overview="UIKA Navigator is an outdoor Augmented Reality (AR) campus wayfinding application engineered for Universitas Ibn Khaldun (UIKA) Bogor as an Undergraduate Thesis (Skripsi). Finding specific faculty buildings, auditoriums, administration centers, and campus facilities across sprawling university grounds can be daunting for freshmen, guests, and visiting academics. UIKA Navigator bridges the physical campus environment with intuitive spatial computing by projecting real-time 3D floating arrows, waypoints, and building landmark labels directly on top of the smartphone's camera stream. The system combines Google ARCore motion tracking, ML Kit Optical Text Recognition (OCR) to automatically scan outdoor building plaques for instant pose calibration, an A* spatial graph pathfinding engine, and Bézier Spline trajectory smoothing to guide pedestrians along campus walkways with fluid, video-game-like directional cues."
      tags={[
        "Kotlin",
        "Google ARCore",
        "SceneView 3D",
        "ML Kit OCR",
        "A* Pathfinding",
        "Bézier Splines",
        "Firebase Firestore",
        "Room SQLite",
        "Clean Architecture",
        "MVVM",
        "Dagger Hilt",
        "StateFlow & Coroutines",
      ]}
      highlights={[
        {
          title: "Outdoor Pose Alignment via ML Kit OCR",
          description:
            "Leveraged Google ML Kit Text Recognition to scan and identify outdoor faculty nameplates, building facade plaques, and campus landmark signs directly through the live camera feed. Once verified against Firestore's spatial graph database, the user's initial location and compass heading are anchored instantaneously without relying on imprecise mobile GPS or external hardware beacons.",
        },
        {
          title: "Outdoor Campus A* Spatial Graph Engine",
          description:
            "Modeled the entire UIKA campus walkway network into an interconnected spatial graph (walkway nodes, intersections, pedestrian plazas, and building entrance points). Developed a custom A* (A-Star) search algorithm to calculate the shortest walking trajectory between faculty complexes with sub-second recalculation upon route deviations.",
        },
        {
          title: "Bézier Spline Walkway Smoothing",
          description:
            "Eliminated rigid, angular line segments in the 3D camera projection by applying cubic Bézier Spline interpolation. The resulting AR visual guide curves naturally along winding campus footpaths, pedestrian crosswalks, and plaza turns, ensuring an organic walking guide.",
        },
        {
          title: "Dual-Flavored Architecture (Admin Mapping & User Wayfinder)",
          description:
            "Engineered two synchronized Android product flavors: an Admin App with interactive spatial anchor tools to survey outdoor campus landmarks, record coordinate nodes, and link walkway edges live to Firebase Firestore; and a responsive Student Wayfinder App for searching faculties, rectorate offices, and facilities.",
        },
        {
          title: "Reactive Clean Architecture & MVVM with Dagger-Hilt",
          description:
            "Implemented Clean Architecture with MVVM, Dagger-Hilt dependency injection, and Kotlin Coroutines/StateFlow. Asynchronous camera frame OCR processing and matrix transformations are kept completely off the UI thread to sustain a buttery-smooth 60 FPS AR rendering pipeline outdoors.",
        },
      ]}
      techDetails={[
        { label: "Project Scope", value: "Bachelor's Thesis (Skripsi) · Outdoor Campus Navigation" },
        { label: "Campus Venue", value: "Universitas Ibn Khaldun (UIKA) Bogor Grounds" },
        { label: "Core Stack", value: "Kotlin 100% · Android SDK (Min SDK 24) · Jetpack" },
        { label: "Architecture", value: "Clean Architecture · MVVM · Dagger-Hilt DI" },
        { label: "AR & 3D Engine", value: "Google ARCore SDK · SceneView (Filament Engine)" },
        { label: "Computer Vision", value: "Google ML Kit Vision (OCR Building Plaque Detection)" },
        { label: "Algorithms", value: "A* (A-Star) Walkway Graph · Bézier Spline Curves" },
        { label: "Data & Storage", value: "Firebase Firestore (Cloud) · Room SQLite (Cache)" },
        { label: "Design System", value: "Material Design 3 (Custom Emerald-Gold Theme)" },
      ]}
      mediaSectionTitle="Spatial Computing Visuals & Outdoor AR Pipeline"
      mediaSectionSubtitle="Interactive outdoor campus blueprints, faculty graph topologies, and ARCore camera tracking pipelines."
      media={[
        {
          type: "image",
          src: "/sites/charbeltannous/uika-navigation-system/Frame 1.png",
          title: "Outdoor ARCore & ML Kit Computer Vision Pipeline",
          caption:
            "Four-phase pipeline showing building plaque OCR pose alignment, outdoor A* walkway pathfinding, Bézier trajectory smoothing, and SceneView 3D rendering.",
          span: "full",
          aspectRatio: "video",
          fit: "contain",
        },
      ]}
      prevUrl="/satubumi"
      prevTitle="Satubumi"
    />
  );
}
