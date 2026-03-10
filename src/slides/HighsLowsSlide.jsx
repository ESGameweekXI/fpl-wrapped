"use client";

import GWBadge from "@/components/GWBadge";
import StampLabel from "@/components/StampLabel";

/**
 * HighsLowsSlide — best and worst gameweeks side by side.
 * Props: { season }
 */
export default function HighsLowsSlide({ season }) {
  if (!season) return null;

  const { bestGW, worstGW } = season;

  return (
    <div className="relative flex flex-col bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none gap-4">

      {/* Paper grain */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
          Season Extremes
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[var(--black)] text-5xl leading-none tracking-wide">
          HIGHS &amp; LOWS
        </h2>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── TWO PANELS ── */}
      <div className="relative z-10 grid grid-cols-2 gap-3 flex-1">

        {/* LEFT: Best GW */}
        <div className="flex flex-col gap-3 border-2 border-[var(--green)] p-4 bg-[var(--cream)]">
          <div className="flex flex-col gap-0.5">
            <p className="font-[family-name:var(--font-mono)] text-[var(--green)] text-[0.5rem] uppercase tracking-widest">
              Best Week
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
              Season High
            </p>
          </div>

          <GWBadge gw={bestGW.number} />

          <div>
            <p
              className="font-[family-name:var(--font-display)] text-[var(--green)] leading-none"
              style={{ fontSize: "clamp(2.2rem, 10vw, 3rem)" }}
            >
              {bestGW.points}
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
              points
            </p>
          </div>

          {/* Chip badge if one was played */}
          {bestGW.chip ? (
            <div className="mt-auto">
              <StampLabel
                text={bestGW.chip.replace(/-/g, " ").toUpperCase()}
                variant="good"
              />
            </div>
          ) : (
            <div className="mt-auto">
              <StampLabel text="SEASON HIGH" variant="good" />
            </div>
          )}
        </div>

        {/* RIGHT: Worst GW */}
        <div className="flex flex-col gap-3 border-2 border-[var(--red)] p-4 bg-[var(--cream)]">
          <div className="flex flex-col gap-0.5">
            <p className="font-[family-name:var(--font-mono)] text-[var(--red)] text-[0.5rem] uppercase tracking-widest">
              Worst Week
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
              Season Low
            </p>
          </div>

          <GWBadge gw={worstGW.number} />

          <div>
            <p
              className="font-[family-name:var(--font-display)] text-[var(--red)] leading-none"
              style={{ fontSize: "clamp(2.2rem, 10vw, 3rem)" }}
            >
              {worstGW.points}
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
              points
            </p>
          </div>

          <div className="mt-auto">
            <StampLabel text="SEASON LOW" variant="bad" />
          </div>
        </div>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── FOOTER: Swing stat ── */}
      <div className="relative z-10 flex items-center justify-between">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
          Points swing
        </p>
        <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-2xl leading-none tracking-wide">
          {bestGW.points - worstGW.points}{" "}
          <span className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-xs">
            pts
          </span>
        </p>
      </div>
    </div>
  );
}
