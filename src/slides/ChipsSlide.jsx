"use client";

import GWBadge from "@/components/GWBadge";
import StampLabel from "@/components/StampLabel";

const STANDARD_CHIPS = [
  { id: "wildcard", label: "Wildcard" },
  { id: "bboost",   label: "Bench Boost" },
  { id: "freehit",  label: "Free Hit" },
  { id: "3xc",      label: "Triple Captain" },
];

function verdictToVariant(verdict) {
  if (verdict === "great") return "good";
  if (verdict === "poor")  return "bad";
  return "neutral";
}

function verdictToLabel(verdict) {
  if (verdict === "great") return "GREAT TIMING";
  if (verdict === "poor")  return "POOR TIMING";
  return "SOLID";
}

/**
 * A single chip card — used or unused.
 */
function ChipCard({ chip, usedChip }) {
  const used = !!usedChip;

  return (
    <div
      className={`
        flex flex-col gap-2 border-2 p-3
        ${used ? "border-[var(--black)] bg-[var(--cream)]" : "border-[var(--faded-ink)] opacity-40"}
      `}
    >
      {/* Chip name */}
      <p
        className={`font-[family-name:var(--font-display)] text-xl leading-none tracking-wide ${
          used ? "text-[var(--black)]" : "text-[var(--faded-ink)]"
        }`}
      >
        {chip.label}
      </p>

      {used ? (
        <>
          <div className="flex items-center justify-between gap-2">
            <GWBadge gw={usedChip.gw} />
            <div className="text-right">
              <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-2xl leading-none">
                {usedChip.pointsScored}
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
                pts scored
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-1">
            <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.5rem] uppercase tracking-widest">
              avg: {usedChip.averageThatGW}
            </p>
            <StampLabel
              text={verdictToLabel(usedChip.verdict)}
              variant={verdictToVariant(usedChip.verdict)}
            />
          </div>
        </>
      ) : (
        <div className="mt-auto">
          <StampLabel text="UNUSED" variant="neutral" />
        </div>
      )}
    </div>
  );
}

/**
 * ChipsSlide — all chip plays across the season.
 * Props: { chips }
 */
export default function ChipsSlide({ chips }) {
  // chips may be undefined if no chips were used
  const usedChips = chips ?? [];

  // For wildcards, a manager can play two — handle duplicates by index
  const wildcardsUsed = usedChips.filter((c) => c.chip === "wildcard");

  function getUsedChip(chipId) {
    if (chipId === "wildcard") {
      // Return the first unused wildcard match each call
      return wildcardsUsed.shift() ?? null;
    }
    return usedChips.find((c) => c.chip === chipId) ?? null;
  }

  // Build display list — wildcards may appear twice
  const displayChips = [];
  const wildcardsInStandard = STANDARD_CHIPS.filter((c) => c.id === "wildcard");

  for (const chip of STANDARD_CHIPS) {
    if (chip.id === "wildcard") {
      // Add entries for however many wildcards were used (max 2), always at least 1
      const count = Math.max(1, wildcardsUsed.length);
      for (let i = 0; i < count; i++) {
        displayChips.push({ chip, usedChip: wildcardsUsed[i] ?? null });
      }
    } else {
      const usedChip = usedChips.find((c) => c.chip === chip.id) ?? null;
      displayChips.push({ chip, usedChip });
    }
  }

  const usedCount = usedChips.length;

  return (
    <div className="relative flex flex-col bg-[var(--cream)] min-h-[70vh] p-6 overflow-hidden select-none gap-4">

      {/* Paper grain */}
      <div className="absolute inset-0 halftone pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.55rem] uppercase tracking-[0.3em]">
            Special Weapons
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--black)] text-5xl leading-none tracking-wide">
            CHIPS PLAYED
          </h2>
        </div>
        <div className="border-2 border-[var(--black)] px-2 py-1 text-center shrink-0">
          <p className="font-[family-name:var(--font-display)] text-[var(--black)] text-3xl leading-none">
            {usedCount}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[var(--faded-ink)] text-[0.45rem] uppercase tracking-widest">
            used
          </p>
        </div>
      </div>

      <hr className="relative z-10 dashed-separator" />

      {/* ── CHIP CARDS GRID ── */}
      <div className="relative z-10 grid grid-cols-2 gap-3 flex-1">
        {displayChips.map(({ chip, usedChip }, i) => (
          <ChipCard key={`${chip.id}-${i}`} chip={chip} usedChip={usedChip} />
        ))}
      </div>
    </div>
  );
}
