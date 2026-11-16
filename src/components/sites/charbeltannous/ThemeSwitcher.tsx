"use client";

import React, { useSyncExternalStore } from "react";
import { Palette } from "lucide-react";
import {
  type ThemeId,
  THEMES,
  setTheme,
  getActiveTheme,
  subscribeTheme,
} from "@/lib/themeState";

export function ThemeSwitcher() {
  const activeTheme = useSyncExternalStore(
    subscribeTheme,
    getActiveTheme,
    () => "yellow" as ThemeId
  );

  const themeList = Object.values(THEMES);

  return (
    <aside
      aria-label="Color Palette Switcher"
      className="fixed bottom-6 right-6 z-40 select-none"
    >
      <div className="flex items-center gap-2 rounded-full border-2 border-heading bg-raised p-1.5 shadow-[3px_3px_0_var(--text-heading)] backdrop-blur-sm transition-all duration-200">
        {/* Palette Icon & Static Label */}
        <div className="flex items-center gap-1.5 pl-2 pr-1 font-mono text-[11px] font-bold tracking-wider text-heading">
          <Palette className="h-3.5 w-3.5" />
          <span className="hidden sm:inline-block whitespace-nowrap lowercase">
            try other color
          </span>
        </div>

        {/* 3 Theme Swatch Buttons */}
        <div className="flex items-center gap-1.5 border-l border-heading/30 pl-2 pr-1">
          {themeList.map((t) => {
            const isSelected = activeTheme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                aria-label={`Select ${t.label} color theme (${t.sublabel})`}
                aria-pressed={isSelected}
                className={`group relative h-6 w-6 rounded-full border border-heading transition-all duration-200 cursor-pointer overflow-hidden ${
                  isSelected
                    ? "scale-115 ring-2 ring-heading shadow-[1px_1px_0_var(--text-heading)]"
                    : "opacity-75 hover:opacity-100 hover:scale-105"
                }`}
              >
                {/* Diagonal split swatch (50% primary, 50% secondary) */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block"
                  style={{
                    background: `linear-gradient(135deg, ${t.swatchPrimary} 50%, ${t.swatchSecondary} 50%)`,
                  }}
                />
                {/* Active inner dot */}
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_2px_rgba(0,0,0,0.8)]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
