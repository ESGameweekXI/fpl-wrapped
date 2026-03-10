"use client";

import StampLabel from "@/components/StampLabel";

/**
 * TransfersSlide — transfer activity summary.
 * Props: { transfers }
 */
export default function TransfersSlide({ transfers }) {
  if (!transfers) return null;

  const { totalMade, totalHits, netPoints, mostTransferredIn, mostTransferredOut } = transfers;
  const hasHits = totalHits > 0;

  return (
    <div className="relative flex flex-col bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none gap-4">

      {/* Paper grain */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10">
        <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
          Season Activity
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[var(--black)] text-5xl leading-none tracking-wide">
          TRANSFER ACTIVITY
        </h2>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── HERO STATS ROW ── */}
      <div className="relative z-10 grid grid-cols-3 gap-2">
        {/* Total transfers */}
        <div className="flex flex-col gap-0.5 border-2 border-[var(--black)] p-3">
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
            Transfers
          </p>
          <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-3xl leading-none">
            {totalMade}
          </p>
        </div>

        {/* Hits taken */}
        <div
          className={`flex flex-col gap-0.5 border-2 p-3 ${
            hasHits ? "border-[var(--red)]" : "border-[var(--black)]"
          }`}
        >
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
            Hits
          </p>
          <p
            className={`font-[family-name:var(--font-display)] text-3xl leading-none ${
              hasHits ? "text-[var(--red)]" : "text-[var(--black)]"
            }`}
          >
            {totalHits}
          </p>
        </div>

        {/* Net points from hits */}
        <div
          className={`flex flex-col gap-0.5 border-2 p-3 ${
            hasHits ? "border-[var(--red)]" : "border-[var(--black)]"
          }`}
        >
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
            Pts Cost
          </p>
          <p
            className={`font-[family-name:var(--font-display)] text-3xl leading-none ${
              hasHits ? "text-[var(--red)]" : "text-[var(--black)]"
            }`}
          >
            {netPoints}
          </p>
        </div>
      </div>

      {/* Hits stamp */}
      {hasHits && (
        <div className="relative z-10">
          <StampLabel text={`${totalHits} HIT${totalHits > 1 ? "S" : ""} TAKEN`} variant="bad" />
        </div>
      )}

      <hr className="relative z-10 dashed-separator" />

      {/* ── TRANSFER LISTS ── */}
      <div className="relative z-10 grid grid-cols-2 gap-4 flex-1">

        {/* IN list */}
        <div className="flex flex-col gap-2">
          <p className="font-[family-name:var(--font-mono)] text-[var(--green)] text-[0.55rem] uppercase tracking-widest border-b-2 border-[var(--green)] pb-1">
            ↑ Most In
          </p>
          {mostTransferredIn.map(({ player, times }, i) => (
            <div key={player} className="flex items-baseline justify-between gap-1">
              <p
                className="font-[family-name:var(--font-mono)] text-[var(--black)] text-[0.65rem] leading-tight truncate"
                title={player}
              >
                {i + 1}. {player}
              </p>
              <span className="font-[family-name:var(--font-display)] text-[var(--green)] text-base leading-none shrink-0">
                ×{times}
              </span>
            </div>
          ))}
        </div>

        {/* OUT list */}
        <div className="flex flex-col gap-2">
          <p className="font-[family-name:var(--font-mono)] text-[var(--red)] text-[0.55rem] uppercase tracking-widest border-b-2 border-[var(--red)] pb-1">
            ↓ Most Out
          </p>
          {mostTransferredOut.map(({ player, times }, i) => (
            <div key={player} className="flex items-baseline justify-between gap-1">
              <p
                className="font-[family-name:var(--font-mono)] text-[var(--black)] text-[0.65rem] leading-tight truncate"
                title={player}
              >
                {i + 1}. {player}
              </p>
              <span className="font-[family-name:var(--font-display)] text-[var(--red)] text-base leading-none shrink-0">
                ×{times}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
