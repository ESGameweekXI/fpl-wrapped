"use client";

/**
 * TitleSlide — the opening card.
 * Props are the spread WrappedData object: { manager, season, ... }
 */
export default function TitleSlide({ manager, season }) {
  if (!manager || !season) return null;

  return (
    <div className="relative flex flex-col justify-between bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none">

      {/* Paper grain overlay */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* "WRAPPED" diagonal rubber stamp — absolute, behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span
          className="rubber-stamp text-[var(--faded-ink)] text-5xl opacity-20"
          aria-hidden="true"
        >
          WRAPPED
        </span>
      </div>

      {/* ── TOP ROW: season tag + programme number ── */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
            Fantasy Premier League
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
            2025 / 26 Season
          </span>
        </div>

        {/* Stamp badge top-right */}
        <div className="border-2 border-[var(--red)] px-2 py-1 rotated-card">
          <span className="font-[family-name:var(--font-stamp)] text-[var(--red)] text-[0.6rem] uppercase tracking-wider">
            WRAPPED
          </span>
        </div>
      </div>

      {/* ── HERO: Team name ── */}
      <div className="relative z-10 flex flex-col gap-1 my-4">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.6rem] uppercase tracking-[0.25em]">
          The official review of
        </p>
        <h1
          className="font-[family-name:var(--font-display)] text-[var(--black)] leading-none tracking-wide break-words"
          style={{ fontSize: "clamp(2.8rem, 14vw, 5rem)" }}
        >
          {manager.teamName}
        </h1>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative z-10">
        <hr className="dashed-separator" />
      </div>

      {/* ── MIDDLE: Manager name ── */}
      <div className="relative z-10 flex flex-col gap-1 my-4">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
          Manager
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[var(--black)] text-lg font-bold leading-tight">
          {manager.name}
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
          Team ID #{manager.id}
        </p>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative z-10">
        <hr className="dashed-separator" />
      </div>

      {/* ── BOTTOM: Season points summary ── */}
      <div className="relative z-10 flex items-end justify-between mt-4">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-widest">
            Season Total
          </p>
          <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-4xl leading-none tracking-wide">
            {season.totalPoints.toLocaleString()}{" "}
            <span className="text-lg font-[family-name:var(--font-mono)] text-[var(--faded-ink)]">
              pts
            </span>
          </p>
        </div>

        {/* Rank pill */}
        <div className="border-2 border-[var(--black)] px-3 py-1 text-right">
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
            Rank
          </p>
          <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-xl leading-none">
            {season.finalRank.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
