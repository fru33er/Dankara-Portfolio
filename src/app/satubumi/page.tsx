import type { Metadata } from "next";
import { ProjectPageLayout } from "@/components/sites/charbeltannous/ProjectPageLayout";

export const metadata: Metadata = {
  title: "Satubumi — Backend API & Digital MRV Engine | Raka Andhika",
  description:
    "Production-grade FastAPI backend & geospatial engine powering carbon project feasibility, Google Earth Engine telemetry, and digital MRV reporting.",
};

export default function SatubumiPage() {
  return (
    <ProjectPageLayout
      title="Satubumi"
      index="01"
      total="02"
      year="2026"
      role="Backend & Geospatial Engineer"
      tagline="Production Backend API, Rapid-FS Scoring Engine & Digital MRV Platform for Nature-Based Solutions."
      overview="Satubumi is an enterprise-grade backend ecosystem engineered to power digital ecological restoration, carbon project feasibility, and nature-based solutions (NbS). Built on a modern FastAPI and PostgreSQL stack, it bridges complex remote-sensing telemetry with clean, high-concurrency APIs. The system runs two mission-critical pillars: the Carbon Assessment Engine (featuring the 7-stage ICPFS feasibility pipeline) and Satubumi Monitor—a full-fledged Digital Measurement, Reporting, and Verification (MRV) platform tracking living ecosystems from satellite orbits down to individual tree survival on the ground."
      tags={[
        "Python 3.11+",
        "FastAPI",
        "PostgreSQL",
        "Google Earth Engine",
        "GIS / Shapefile",
        "PyProj",
        "ReportLab",
        "Docker",
        "JWT / RBAC",
        "Redis",
      ]}
      highlights={[
        {
          title: "Rapid-FS Carbon Feasibility Engine (7-Stage ICPFS)",
          description:
            "Engineered an automated 5-pillar scoring algorithm (Carbon, Legality, Biodiversity, Social, and Economy) that auto-unzips ESRI Shapefile archives, computes hectares via WGS84 coordinate reprojection, and projects carbon credit yield with zero manual data entry.",
        },
        {
          title: "Digital MRV & 7-Layer GIS Streaming",
          description:
            "Delivers optimized GeoJSON streaming across 7 spatial layers (project boundaries, permanent plots, tree locations, patrol routes, and biodiversity sightings), integrated with Google Earth Engine (Sentinel-2 & Hansen GFC) for live NDVI and forest cover dynamics.",
        },
        {
          title: "Real-Time Ecological Alert Engine",
          description:
            "Constructed a 5-rule heuristic engine that continuously evaluates field logs to detect critical survival drops (<70% and <50%) and overdue monitoring (>30 days), complete with a deduplication pipeline to prevent alert fatigue.",
        },
        {
          title: "Stateless JWT Security & Dynamic Masking",
          description:
            "Architected stateless JWT authentication with bcrypt password hashing and 4-tier Role-Based Access Control (Super Admin, Admin, Client, Field Officer), featuring automated data-masking and preview-blur workflows for unverified tenant accounts.",
        },
        {
          title: "Automated MRV Reporting & Currency Gateway",
          description:
            "Automated publication of official carbon feasibility and MRV executive dossiers using ReportLab, backed by a real-time USD ⇄ IDR currency conversion service with in-memory TTL caching and dynamic bilingual content APIs.",
        },
      ]}
      techDetails={[
        { label: "Architecture", value: "Layered Service Pattern (Router–Service–Model)" },
        { label: "Core Stack", value: "Python 3.11+ · FastAPI · Starlette · Pydantic v2" },
        { label: "Database", value: "PostgreSQL · SQLAlchemy 2.0 · Alembic" },
        { label: "Geospatial & Remote", value: "Shapely · PyProj · PyShp · Google Earth Engine" },
        { label: "Security & Auth", value: "PyJWT · Passlib (Bcrypt) · RBAC · SlowAPI" },
        { label: "Reporting & Docs", value: "ReportLab · xhtml2pdf · PyPDF" },
        { label: "DevOps & Caching", value: "Docker · Docker Compose · Redis & In-Memory TTL" },
      ]}
      mediaSectionTitle="Engineering Artifacts & System Visuals"
      mediaSectionSubtitle="High-resolution architecture blueprints, geospatial pipeline diagrams, and satellite MRV telemetry feeds."
      media={[
        {
          type: "image",
          src: "/sites/charbeltannous/satubumi/saatubumi2.webp",
          title: "Rapid-FS 7-Stage Carbon Feasibility Pipeline",
          caption:
            "Production architecture demonstrating automated ESRI Shapefile ingestion, PyProj WGS84 coordinate reprojection, 5-pillar carbon scoring, and automated PDF dossier publishing.",
          span: "full",
        },
        {
          type: "image",
          src: "/sites/charbeltannous/satubumi/satubumi3.webp",
          title: "Digital MRV Multi-Layer GIS Map & Heuristic Alert Engine",
          caption:
            "FastAPI streaming endpoints delivering 7 GeoJSON spatial layers (project boundaries, sample plots, ranger patrol GPS routes) alongside automated tree survival anomaly triggers.",
          span: "full",
        },
      ]}
      externalUrl="https://satubumi.org"
      externalLabel="Visit Satubumi ↗"
      nextUrl="/UIKA-navigation-system"
      nextTitle="UIKA Navigator"
    />
  );
}
