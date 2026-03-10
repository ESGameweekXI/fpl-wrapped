"use client";

import GWBadge from "@/components/GWBadge";
import StampLabel from "@/components/StampLabel";

/**
 * A simple retro-style horizontal progress bar.
 */
function HitRateBar({ hitRate }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-baseline">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
          Hit Rate
        </p>
        <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-2xl leading-none">
          {hitRate}%
        </p>
      </div>
      {/* Outer track */}
      <div className="w-full h-3 border-2 border-[var(--black)] bg-[var(--cream)]">
        {/* Filled portion */}
        <div
          className="h-full bg-[var(--black)] transition-all"
          style={{ width: `${Math.min(hitRate, 100)}%` }}
        />
      </div>
      <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
        Weeks you picked your squad&apos;s top scorer as captain
      </p>
    </div>
  );
}

/**
 * CaptaincySlide — armband decisions across the season.
 * Props: { captaincy }
 */
export default function CaptaincySlide({ captaincy }) {
  if (!captaincy) return null;

  const { totalCaptainPoints, missedPoints, hitRate, bestCaptain, worstCaptain, mostCaptained } =
    captaincy;

  return (
    <div className="relative flex flex-col bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none gap-4">

      {/* Paper grain */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
          Armband Analysis
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[var(--black)] text-5xl leading-none tracking-wide">
          CAPTAINCY REPORT
        </h2>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── HERO: Total captain points ── */}
      <div className="relative z-10 flex items-end justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
            Captain Points
          </p>
          <p
            className="font-[family-name:var(--font-display)] text-[var(--black)] leading-none"
            style={{ fontSize: "clamp(3rem, 16vw, 4.5rem)" }}
          >
            {totalCaptainPoints.toLocaleString()}
          </p>
        </div>

        {/* Optimal gap aside */}
        <div className="border-2 border-[var(--red)] px-3 py-2 text-right shrink-0">
          <p className="font-[family-name:var(--font-mono)] text-[var(--red)] text-[0.5rem] uppercase tracking-widest">
            Optimal Gap
          </p>
          <p className="font-[family-name:var(--font-display)] text-[var(--red)] text-2xl leading-none">
            -{missedPoints}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.45rem] uppercase tracking-widest">
            vs picking optimal captain in your team
          </p>
        </div>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── BEST CAPTAIN ── */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="font-[family-name:var(--font-mono)] text-[var(--green)] text-[0.5rem] uppercase tracking-widest mb-0.5">
            Best Captain
          </p>
          <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-2xl leading-none tracking-wide truncate">
            {bestCaptain.player}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest mt-0.5">
            {bestCaptain.points} pts
          </p>
        </div>
        <GWBadge gw={bestCaptain.gw} />
      </div>

      {/* ── MOST CAPTAINED ── */}
      {mostCaptained && (
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex-1">
            <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest mb-0.5">
              Most Captained
            </p>
            <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-2xl leading-none tracking-wide truncate">
              {mostCaptained.player}
            </p>
          </div>
          <div className="border-2 border-[var(--black)] px-3 py-1 text-center shrink-0">
            <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-2xl leading-none">
              ×{mostCaptained.times}
            </p>
            <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.45rem] uppercase tracking-widest">
              times
            </p>
          </div>
        </div>
      )}

      {/* ── WORST CAPTAIN ── */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex-1">
          <p className="font-[family-name:var(--font-mono)] text-[var(--red)] text-[0.5rem] uppercase tracking-widest mb-0.5">
            Worst Captain
          </p>
          <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-2xl leading-none tracking-wide truncate">
            {worstCaptain.player}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest mt-0.5">
            {worstCaptain.points} pts
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <GWBadge gw={worstCaptain.gw} />
          <StampLabel text="REGRETS" variant="bad" />
        </div>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── HIT RATE BAR ── */}
      <div className="relative z-10">
        <HitRateBar hitRate={hitRate} />
      </div>
    </div>
  );
}
