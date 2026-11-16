export type ThemeId = "yellow" | "mono" | "blue";

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  sublabel: string;
  swatchPrimary: string;
  swatchSecondary: string;
  ballColors: string[];
  positiveBallColor: string;
  negativeBallColor: string;
  positiveBallName: string;
  negativeBallName: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  yellow: {
    id: "yellow",
    label: "Kuning Hijau",
    sublabel: "Classic House",
    swatchPrimary: "#134a2a", // Green
    swatchSecondary: "#f8ed43", // Yellow
    ballColors: [
      "#cc1236", // Red (negative)
      "#1a7444", // Green (positive)
      "#cc1236", // Red (negative)
      "#1a7444", // Green (positive)
      "#a50e2c", // Deep Red (negative)
      "#134a2a", // Dark Green (positive)
    ],
    positiveBallColor: "#1a7444",
    negativeBallColor: "#cc1236",
    positiveBallName: "green",
    negativeBallName: "red",
  },
  mono: {
    id: "mono",
    label: "Hitam Putih",
    sublabel: "Monochrome Editorial",
    swatchPrimary: "#111111", // Black
    swatchSecondary: "#f5f5f5", // White
    ballColors: [
      "#888888", // Medium Gray (negative)
      "#111111", // Deep Black (positive)
      "#888888", // Medium Gray (negative)
      "#111111", // Deep Black (positive)
      "#aaaaaa", // Light Gray (negative)
      "#000000", // Pitch Black (positive)
    ],
    positiveBallColor: "#111111",
    negativeBallColor: "#888888",
    positiveBallName: "black",
    negativeBallName: "gray",
  },
  blue: {
    id: "blue",
    label: "Putih Biru",
    sublabel: "Cobalt & Ice",
    swatchPrimary: "#002BFF", // Electric Blue
    swatchSecondary: "#f0f5fc", // Ice White
    ballColors: [
      "#ef4444", // Coral Red (negative)
      "#002BFF", // Electric Blue (positive)
      "#ef4444", // Coral Red (negative)
      "#002BFF", // Electric Blue (positive)
      "#b91c1c", // Dark Red (negative)
      "#001fb3", // Deep Blue (positive)
    ],
    positiveBallColor: "#002BFF",
    negativeBallColor: "#ef4444",
    positiveBallName: "blue",
    negativeBallName: "red",
  },
};

type ThemeListener = (theme: ThemeId) => void;
const listeners = new Set<ThemeListener>();

export function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "yellow";
  try {
    const saved = localStorage.getItem("raka_theme");
    if (saved === "yellow" || saved === "mono" || saved === "blue") {
      return saved;
    }
  } catch {
    // ignore
  }
  return "yellow";
}

let currentTheme: ThemeId = typeof window !== "undefined" ? getStoredTheme() : "yellow";

export function getActiveTheme(): ThemeId {
  return currentTheme;
}

export function setTheme(theme: ThemeId) {
  currentTheme = theme;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("raka_theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    } catch {
      // ignore
    }
  }

  listeners.forEach((fn) => {
    try {
      fn(theme);
    } catch {
      // ignore
    }
  });
}

export function subscribeTheme(listener: ThemeListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
