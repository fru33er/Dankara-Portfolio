export interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// In-memory store of line segments drawn on the Guestbook canvas
// Coordinates are in local CSS pixels of the guestbook canvas
let segments: LineSegment[] = [];

export function addLineSegment(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  // Ignore tiny jitters (< 3px)
  if (dx * dx + dy * dy < 9) return;

  segments.push({ x1, y1, x2, y2 });

  // Cap max segments to ensure collision calculation stays well under 0.1ms
  if (segments.length > 2500) {
    segments.splice(0, segments.length - 2500);
  }
}

export function getLineSegments(): readonly LineSegment[] {
  return segments;
}

export function clearLineSegments() {
  segments = [];
}

