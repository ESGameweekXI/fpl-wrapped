"use client";

import StatCard from "@/components/StatCard";
import StampLabel from "@/components/StampLabel";

function getAccent(percentile) {
  if (percentile <= 10) return "green";
  if (percentile <= 25) return "gold";
  return "red";
}

function getStampVariant(percentile) {
  if (percentile <= 10) return "good";
  if (percentile <= 25) return "neutral";
  return "bad";
}

/**
 * TotalPointsSlide — season points, rank, and percentile at a glance.
 * Props are the spread WrappedData object: { season, ... }
 */
export default function TotalPointsSlide({ season }) {
  if (!season) return null;

  const accent = getAccent(season.percentile);
  const stampVariant = getStampVariant(season.percentile);
  const topPct = Math.ceil(season.percentile);

  // Colour token for the raw percentile callout box
  const accentVar = {
    green: "var(--green)",
    gold:  "var(--gold)",
    red:   "var(--red)",
  }[accent];

  return (
    <div className="relative flex flex-col justify-between bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none">

      {/* Paper grain overlay */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
            Season Review
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--black)] text-5xl leading-none tracking-wide">
            YOUR SEASON
          </h2>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative z-10">
        <hr className="dashed-separator" />
      </div>

      {/* ── HERO: Total points ── */}
      <div className="relative z-10 flex flex-col gap-1 my-2">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.6rem] uppercase tracking-[0.25em]">
          Total Points
        </p>
        <p
          className="font-[family-name:var(--font-display)] text-[var(--black)] leading-none tracking-wide"
          style={{ fontSize: "clamp(4rem, 22vw, 7rem)" }}
        >
          {season.totalPoints.toLocaleString()}
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-xs uppercase tracking-widest">
          points this season
        </p>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative z-10">
        <hr className="dashed-separator" />
      </div>

      {/* ── PERCENTILE CALLOUT ── */}
      <div className="relative z-10 flex items-center gap-4 my-2">
        {/* Big TOP X% box */}
        <div
          className="flex flex-col items-center justify-center border-2 px-4 py-3 shrink-0"
          style={{ borderColor: accentVar }}
        >
          <p
            className="font-[family-name:var(--font-mono)] text-[0.5rem] uppercase tracking-widest"
            style={{ color: accentVar }}
          >
            Finished
          </p>
          <p
            className="font-[family-name:var(--font-display)] leading-none text-4xl"
            style={{ color: accentVar }}
          >
            TOP {topPct}%
          </p>
        </div>

        {/* Stamp + context */}
        <div className="flex flex-col gap-2">
          <StampLabel text={`TOP ${topPct}%`} variant={stampVariant} />
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.6rem] leading-relaxed">
            out of{" "}
            <span className="text-[var(--black)] font-bold">
              {season.totalManagers.toLocaleString()}
            </span>{" "}
            managers
          </p>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative z-10">
        <hr className="dashed-separator" />
      </div>

      {/* ── RANK STAT CARD ── */}
      <div className="relative z-10 mt-2">
        <StatCard
          label="Overall Rank"
          value={season.finalRank.toLocaleString()}
          accent={accent}
        />
      </div>
    </div>
  );
}
